"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = productCreateHandler;
const utils_1 = require("@medusajs/framework/utils");
async function productCreateHandler({ event: { data }, container, }) {
    const notificationModuleService = container.resolve(utils_1.Modules.NOTIFICATION);
    await notificationModuleService.createNotifications({
        to: "info@consciousgenetics.com",
        channel: "email",
        template: process.env.SENDGRID_PRODUCT_CREATED_ID,
        data,
    });
}
exports.config = {
    event: "product.created",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1jcmVhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL3Byb2R1Y3QtY3JlYXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSx1Q0FhQztBQWhCRCxxREFBbUQ7QUFHcEMsS0FBSyxVQUFVLG9CQUFvQixDQUFDLEVBQy9DLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUNmLFNBQVMsR0FDb0I7SUFDN0IsTUFBTSx5QkFBeUIsR0FDM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFM0MsTUFBTSx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUNoRCxFQUFFLEVBQUUsNEJBQTRCO1FBQ2hDLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQjtRQUNqRCxJQUFJO0tBQ1AsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUNwQyxLQUFLLEVBQUUsaUJBQWlCO0NBQzNCLENBQUEifQ==