"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = customerSignupHandler;
const utils_1 = require("@medusajs/framework/utils");
async function customerSignupHandler({ event: { data }, container, }) {
    const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
    try {
        await notificationModuleService.createNotifications({
            to: data.email,
            channel: 'email',
            template: process.env.SENDGRID_CUSTOMER_SIGNUP_ID,
            data: {
                id: data.id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                emailOptions: {
                    replyTo: process.env.SENDGRID_FROM_EMAIL || 'info@example.com',
                    subject: "Welcome to our store!"
                },
                preview: 'Thank you for creating an account with us!',
                loginLink: `${process.env.FRONTEND_URL || 'https://example.com'}/account/login`
            }
        });
    }
    catch (error) {
        console.error('Error sending customer signup notification:', error);
    }
}
exports.config = {
    event: 'customer.created'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItc2lnbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2N1c3RvbWVyLXNpZ251cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSx3Q0E2QkM7QUFoQ0QscURBQW1EO0FBR3BDLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxFQUNsRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFDZixTQUFTLEdBQ1c7SUFDcEIsTUFBTSx5QkFBeUIsR0FBK0IsU0FBUyxDQUFDLE9BQU8sQ0FDN0UsZUFBTyxDQUFDLFlBQVksQ0FDckIsQ0FBQTtJQUVELElBQUksQ0FBQztRQUNILE1BQU0seUJBQXlCLENBQUMsbUJBQW1CLENBQUM7WUFDbEQsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCO1lBQ2pELElBQUksRUFBRTtnQkFDSixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsWUFBWSxFQUFFO29CQUNaLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixJQUFJLGtCQUFrQjtvQkFDOUQsT0FBTyxFQUFFLHVCQUF1QjtpQkFDakM7Z0JBQ0QsT0FBTyxFQUFFLDRDQUE0QztnQkFDckQsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUkscUJBQXFCLGdCQUFnQjthQUNoRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsa0JBQWtCO0NBQzFCLENBQUEifQ==