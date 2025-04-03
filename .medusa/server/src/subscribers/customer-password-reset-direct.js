"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = customerPasswordResetHandler;
const utils_1 = require("@medusajs/framework/utils");
// Keep track of recently sent emails to prevent duplicates
const emailTokensSent = new Set();
async function customerPasswordResetHandler({ event, container, }) {
    console.log("Customer password reset event triggered:", event.name);
    console.log("Event data:", JSON.stringify(event.data, null, 2));
    // Only handle customer-specific events in this handler
    // Skip if the event is explicitly for an admin user
    if (event.name.includes("admin.") ||
        event.name.includes("user.") ||
        (event.data.actor_type === "user") ||
        (event.data.type === "user") ||
        (event.data.path && !event.data.path.includes("/customer/"))) {
        console.log(`Skipping admin event in customer handler: ${event.name}`);
        return;
    }
    // Extract the email from various possible formats
    const email = event.data.email ||
        event.data.entity_id ||
        (event.data.customer && event.data.customer.email);
    if (!email) {
        console.log("No email found in event data");
        return;
    }
    // Get token if available in the event data
    let token = event.data.token || event.data.password_reset_token;
    // Special handling for the case where token isn't available in the event
    if (!token && container) {
        try {
            console.log("No token in event data, trying to retrieve it from customer password service...");
            const customerPasswordService = container.resolve("customerPasswordService");
            if (customerPasswordService) {
                // First, try to generate a token if not already present
                try {
                    console.log("Attempting to generate reset token for customer:", email);
                    await customerPasswordService.generateResetToken(email);
                }
                catch (err) {
                    console.log("Note: Token may already exist:", err.message || err);
                }
                // Now retrieve the token
                const tokenInfo = await customerPasswordService.retrieveByEmail(email);
                if (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.token) {
                    token = tokenInfo.token;
                    console.log("Successfully retrieved token for customer", email);
                }
            }
        }
        catch (err) {
            console.error("Error retrieving token:", err);
        }
    }
    if (!token) {
        console.log("No token available for email:", email);
        return;
    }
    // Create a unique key for this email + token combination
    const dedupeKey = `${email}:${token}`;
    // Check if we've sent this exact email+token combination already
    if (emailTokensSent.has(dedupeKey)) {
        console.log(`Already sent customer password reset email to ${email} with token ${token}, skipping duplicate`);
        return;
    }
    // Add to sent set
    emailTokensSent.add(dedupeKey);
    // Clean up set after 30 seconds to prevent memory leaks
    setTimeout(() => {
        emailTokensSent.delete(dedupeKey);
    }, 30000);
    // Customer password reset should always use the customer template
    const templateId = process.env.SENDGRID_CUSTOMER_PASSWORD_RESET_ID;
    console.log("Using CUSTOMER password reset template:", templateId);
    try {
        const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
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
                    subject: "Reset Your Password"
                },
                preview: 'Reset your password to continue shopping'
            },
        });
        console.log(`Customer password reset email sent to ${email} using template ${templateId}`);
    }
    catch (error) {
        console.error("Error sending customer password reset email:", error);
    }
}
exports.config = {
    // Listen to all possible customer password reset events
    event: [
        "auth.password_reset", // This might trigger for both customer and admin
        "customer.password_reset",
        "customer.password_reset_token_created",
        // This wildcard catches all customer-related events
        "customer.*"
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItcGFzc3dvcmQtcmVzZXQtZGlyZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2N1c3RvbWVyLXBhc3N3b3JkLXJlc2V0LWRpcmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSwrQ0E2R0M7QUFuSEQscURBQW1EO0FBR25ELDJEQUEyRDtBQUMzRCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0FBRTNCLEtBQUssVUFBVSw0QkFBNEIsQ0FBQyxFQUN2RCxLQUFLLEVBQ0wsU0FBUyxHQUNTO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUUvRCx1REFBdUQ7SUFDdkQsb0RBQW9EO0lBQ3BELElBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUM1QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztRQUNsQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztRQUM1QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQzlELENBQUM7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN0RSxPQUFNO0lBQ1YsQ0FBQztJQUVE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