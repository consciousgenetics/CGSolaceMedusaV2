import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { INotificationModuleService } from "@medusajs/framework/types"

// Keep track of recently sent emails to prevent duplicates
const emailTokensSent = new Set<string>();

export default async function adminPasswordResetHandler({
    event,
    container,
}: SubscriberArgs<any>) {
    console.log("Admin password reset event triggered:", event.name)
    console.log("Event data:", JSON.stringify(event.data, null, 2))
    
    // IMPORTANT: Only handle admin-specific events in this handler
    // Skip if the event is explicitly for a customer
    if (
        event.name.includes("customer.") || 
        (event.data.actor_type === "customer") || 
        (event.data.type === "customer") ||
        // Check for customer endpoint in path if present
        (event.data.path && event.data.path.includes("/customer/"))
    ) {
        console.log(`Skipping customer event in admin handler: ${event.name}`)
        return
    }
    
    // Extract the email from various possible formats
    const email = 
        event.data.email || 
        event.data.entity_id || 
        (event.data.user && event.data.user.email)
    
    if (!email) {
        console.log("No email found in event data")
        return
    }
    
    // Get token if available in the event data
    let token = event.data.token || event.data.password_reset_token
    
    // Special handling for the case where token isn't available in the event
    if (!token && container) {
        try {
            console.log("No token in event data, trying to retrieve it from password service...")
            const userPasswordService = container.resolve("userPasswordService") as any
            if (userPasswordService) {
                // First, try to generate a token if not already present
                try {
                    console.log("Attempting to generate reset token for:", email)
                    await userPasswordService.generateResetToken(email)
                } catch (err) {
                    console.log("Note: Token may already exist:", err.message || err)
                }
                
                // Now retrieve the token
                const tokenInfo = await userPasswordService.retrieveByEmail(email)
                if (tokenInfo?.token) {
                    token = tokenInfo.token
                    console.log("Successfully retrieved token for", email)
                }
            }
        } catch (err) {
            console.error("Error retrieving token:", err)
        }
    }
    
    if (!token) {
        console.log("No token available for email:", email)
        return
    }
    
    // Create a unique key for this email + token combination
    const dedupeKey = `${email}:${token}`;
    
    // Check if we've sent this exact email+token combination already
    if (emailTokensSent.has(dedupeKey)) {
        console.log(`Already sent admin password reset email to ${email} with token ${token}, skipping duplicate`)
        return;
    }
    
    // Add to sent set
    emailTokensSent.add(dedupeKey);
    
    // Clean up set after 30 seconds to prevent memory leaks
    setTimeout(() => {
        emailTokensSent.delete(dedupeKey);
    }, 30000);
    
    // Admin password reset should always use the admin template
    const templateId = process.env.SENDGRID_ADMIN_PASSWORD_RESET_ID;
    console.log("Using ADMIN password reset template:", templateId);
    
    try {
        const notificationModuleService: INotificationModuleService =
            container.resolve(Modules.NOTIFICATION)
    
        await notificationModuleService.createNotifications({
            to: email,
            channel: "email",
            template: templateId,
            data: {
                ...event.data,
                email,
                token,
                emailOptions: {
                    replyTo: process.env.SENDGRID_FROM || 'info@example.com',
                    subject: "Reset Your Admin Password"
                },
                preview: 'Reset your admin password to continue'
            },
        })
        console.log(`Admin password reset email sent to ${email} using template ${templateId}`)
    } catch(error) {
        console.error("Error sending admin password reset email:", error)
    }
}

export const config: SubscriberConfig = {
    // Listen to all possible admin password reset events
    event: [
        "auth.password_reset",
        "user.password_reset",
        "user.password_reset_token_created", 
        "admin.password_reset", 
        "user.password_reset_request",
        // This wildcard catches all user-related events
        "user.*"
    ]
} 