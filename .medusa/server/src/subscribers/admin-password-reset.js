"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = adminPasswordResetHandler;
const utils_1 = require("@medusajs/framework/utils");
// Keep track of recently sent emails to prevent duplicates
const emailTokensSent = new Set();
async function adminPasswordResetHandler({ event, container, }) {
    console.log("Admin password reset event triggered:", event.name);
    console.log("Event data:", JSON.stringify(event.data, null, 2));
    // IMPORTANT: Only handle admin-specific events in this handler
    // Skip if the event is explicitly for a customer
    if (event.name.includes("customer.") ||
        (event.data.actor_type === "customer") ||
        (event.data.type === "customer") ||
        // Check for customer endpoint in path if present
        (event.data.path && event.data.path.includes("/customer/"))) {
        console.log(`Skipping customer event in admin handler: ${event.name}`);
        return;
    }
    // Extract the email from various possible formats
    const email = event.data.email ||
        event.data.entity_id ||
        (event.data.user && event.data.user.email);
    if (!email) {
        console.log("No email found in event data");
        return;
    }
    // Get token if available in the event data
    let token = event.data.token || event.data.password_reset_token;
    // Special handling for the case where token isn't available in the event
    if (!token && container) {
        try {
            console.log("No token in event data, trying to retrieve it from password service...");
            const userPasswordService = container.resolve("userPasswordService");
            if (userPasswordService) {
                // First, try to generate a token if not already present
                try {
                    console.log("Attempting to generate reset token for:", email);
                    await userPasswordService.generateResetToken(email);
                }
                catch (err) {
                    console.log("Note: Token may already exist:", err.message || err);
                }
                // Now retrieve the token
                const tokenInfo = await userPasswordService.retrieveByEmail(email);
                if (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.token) {
                    token = tokenInfo.token;
                    console.log("Successfully retrieved token for", email);
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
        console.log(`Already sent admin password reset email to ${email} with token ${token}, skipping duplicate`);
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
                    subject: "Reset Your Admin Password"
                },
                preview: 'Reset your admin password to continue'
            },
        });
        console.log(`Admin password reset email sent to ${email} using template ${templateId}`);
    }
    catch (error) {
        console.error("Error sending admin password reset email:", error);
    }
}
exports.config = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tcGFzc3dvcmQtcmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvYWRtaW4tcGFzc3dvcmQtcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsNENBNkdDO0FBbkhELHFEQUFtRDtBQUduRCwyREFBMkQ7QUFDM0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztBQUUzQixLQUFLLFVBQVUseUJBQXlCLENBQUMsRUFDcEQsS0FBSyxFQUNMLFNBQVMsR0FDUztJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFL0QsK0RBQStEO0lBQy9ELGlEQUFpRDtJQUNqRCxJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUNoQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQztRQUN0QyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztRQUNoQyxpREFBaUQ7UUFDakQsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDN0QsQ0FBQztRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3RFLE9BQU07SUFDVixDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELE1BQU0sS0FBSyxHQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNo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