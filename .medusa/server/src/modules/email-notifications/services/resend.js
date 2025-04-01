"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendNotificationService = void 0;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("resend");
const templates_1 = require("../templates");
/**
 * Service to handle email notifications using the Resend API.
 */
class ResendNotificationService extends utils_1.AbstractNotificationProviderService {
    constructor({ logger }, options) {
        super();
        this.config_ = {
            apiKey: options.api_key,
            from: options.from
        };
        this.logger_ = logger;
        this.resend = new resend_1.Resend(this.config_.apiKey);
    }
    async send(notification) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!notification) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `No notification information provided`);
        }
        if (notification.channel === 'sms') {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `SMS notification not supported`);
        }
        // Generate the email content using the template
        let emailContent;
        try {
            emailContent = (0, templates_1.generateEmailTemplate)(notification.template, notification.data);
        }
        catch (error) {
            if (error instanceof utils_1.MedusaError) {
                throw error; // Re-throw MedusaError for invalid template data
            }
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, `Failed to generate email content for template: ${notification.template}`);
        }
        const emailOptions = notification.data.emailOptions;
        // Compose the message body to send via API to Resend
        const message = {
            to: notification.to,
            from: (_b = (_a = notification.from) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : this.config_.from,
            react: emailContent,
            subject: (_c = emailOptions.subject) !== null && _c !== void 0 ? _c : 'You have a new notification',
            headers: emailOptions.headers,
            replyTo: emailOptions.replyTo,
            cc: emailOptions.cc,
            bcc: emailOptions.bcc,
            tags: emailOptions.tags,
            text: emailOptions.text,
            attachments: Array.isArray(notification.attachments)
                ? notification.attachments.map((attachment) => {
                    var _a, _b;
                    return ({
                        content: attachment.content,
                        filename: attachment.filename,
                        content_type: attachment.content_type,
                        disposition: (_a = attachment.disposition) !== null && _a !== void 0 ? _a : 'attachment',
                        id: (_b = attachment.id) !== null && _b !== void 0 ? _b : undefined
                    });
                })
                : undefined,
            scheduledAt: emailOptions.scheduledAt
        };
        // Send the email via Resend
        try {
            await this.resend.emails.send(message);
            this.logger_.log(`Successfully sent "${notification.template}" email to ${notification.to} via Resend`);
            return {}; // Return an empty object on success
        }
        catch (error) {
            const errorCode = error.code;
            const responseError = (_f = (_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.body) === null || _e === void 0 ? void 0 : _e.errors) === null || _f === void 0 ? void 0 : _f[0];
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, `Failed to send "${notification.template}" email to ${notification.to} via Resend: ${errorCode} - ${(_g = responseError === null || responseError === void 0 ? void 0 : responseError.message) !== null && _g !== void 0 ? _g : 'unknown error'}`);
        }
    }
}
exports.ResendNotificationService = ResendNotificationService;
ResendNotificationService.identifier = "RESEND_NOTIFICATION_SERVICE";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZW1haWwtbm90aWZpY2F0aW9ucy9zZXJ2aWNlcy9yZXNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQTRGO0FBQzVGLG1DQUFtRDtBQUVuRCw0Q0FBb0Q7QUFxQnBEOztHQUVHO0FBQ0gsTUFBYSx5QkFBMEIsU0FBUSwyQ0FBbUM7SUFNaEYsWUFBWSxFQUFFLE1BQU0sRUFBd0IsRUFBRSxPQUF5QztRQUNyRixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDdkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1NBQ25CLENBQUE7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQ1IsWUFBMkQ7O1FBRTNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksbUJBQVcsQ0FBQyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsc0NBQXNDLENBQUMsQ0FBQTtRQUMvRixDQUFDO1FBQ0QsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ25DLE1BQU0sSUFBSSxtQkFBVyxDQUFDLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFBO1FBQ3pGLENBQUM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxZQUF1QixDQUFBO1FBRTNCLElBQUksQ0FBQztZQUNILFlBQVksR0FBRyxJQUFBLGlDQUFxQixFQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hGLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxLQUFLLFlBQVksbUJBQVcsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLEtBQUssQ0FBQSxDQUFDLGlEQUFpRDtZQUMvRCxDQUFDO1lBQ0QsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUNsQyxrREFBa0QsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUMxRSxDQUFBO1FBQ0gsQ0FBQztRQUVELE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBd0MsQ0FBQTtRQUUvRSxxREFBcUQ7UUFDckQsTUFBTSxPQUFPLEdBQXVCO1lBQ2xDLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUNuQixJQUFJLEVBQUUsTUFBQSxNQUFBLFlBQVksQ0FBQyxJQUFJLDBDQUFFLElBQUksRUFBRSxtQ0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDcEQsS0FBSyxFQUFFLFlBQVk7WUFDbkIsT0FBTyxFQUFFLE1BQUEsWUFBWSxDQUFDLE9BQU8sbUNBQUksNkJBQTZCO1lBQzlELE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztZQUM3QixPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU87WUFDN0IsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFO1lBQ25CLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRztZQUNyQixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7WUFDdkIsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO1lBQ3ZCLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFOztvQkFBQyxPQUFBLENBQUM7d0JBQzVDLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTzt3QkFDM0IsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO3dCQUM3QixZQUFZLEVBQUUsVUFBVSxDQUFDLFlBQVk7d0JBQ3JDLFdBQVcsRUFBRSxNQUFBLFVBQVUsQ0FBQyxXQUFXLG1DQUFJLFlBQVk7d0JBQ25ELEVBQUUsRUFBRSxNQUFBLFVBQVUsQ0FBQyxFQUFFLG1DQUFJLFNBQVM7cUJBQy9CLENBQUMsQ0FBQTtpQkFBQSxDQUFDO2dCQUNMLENBQUMsQ0FBQyxTQUFTO1lBQ2IsV0FBVyxFQUFFLFlBQVksQ0FBQyxXQUFXO1NBQ3RDLENBQUE7UUFFRCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2Qsc0JBQXNCLFlBQVksQ0FBQyxRQUFRLGNBQWMsWUFBWSxDQUFDLEVBQUUsYUFBYSxDQUN0RixDQUFBO1lBQ0QsT0FBTyxFQUFFLENBQUEsQ0FBQyxvQ0FBb0M7UUFDaEQsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1lBQzVCLE1BQU0sYUFBYSxHQUFHLE1BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLDBDQUFFLElBQUksMENBQUUsTUFBTSwwQ0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2RCxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQ2xDLG1CQUFtQixZQUFZLENBQUMsUUFBUSxjQUFjLFlBQVksQ0FBQyxFQUFFLGdCQUFnQixTQUFTLE1BQU0sTUFBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsT0FBTyxtQ0FBSSxlQUFlLEVBQUUsQ0FDaEosQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDOztBQWxGSCw4REFtRkM7QUFsRlEsb0NBQVUsR0FBRyw2QkFBNkIsQ0FBQSJ9