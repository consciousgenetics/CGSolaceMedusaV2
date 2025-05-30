"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPlacedTemplate = exports.InviteUserEmail = exports.EmailTemplates = void 0;
exports.generateEmailTemplate = generateEmailTemplate;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@medusajs/framework/utils");
const invite_user_1 = require("./invite-user");
Object.defineProperty(exports, "InviteUserEmail", { enumerable: true, get: function () { return invite_user_1.InviteUserEmail; } });
const order_placed_1 = require("./order-placed");
Object.defineProperty(exports, "OrderPlacedTemplate", { enumerable: true, get: function () { return order_placed_1.OrderPlacedTemplate; } });
const order_cancelled_1 = require("./order-cancelled");
exports.EmailTemplates = {
    INVITE_USER: invite_user_1.INVITE_USER,
    ORDER_PLACED: order_placed_1.ORDER_PLACED,
    ORDER_CANCELLED: order_cancelled_1.ORDER_CANCELLED
};
function generateEmailTemplate(templateKey, data) {
    switch (templateKey) {
        case exports.EmailTemplates.INVITE_USER:
            if (!(0, invite_user_1.isInviteUserData)(data)) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Invalid data for template "${exports.EmailTemplates.INVITE_USER}"`);
            }
            return (0, jsx_runtime_1.jsx)(invite_user_1.InviteUserEmail, { ...data });
        case exports.EmailTemplates.ORDER_PLACED:
            if (!(0, order_placed_1.isOrderPlacedTemplateData)(data)) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Invalid data for template "${exports.EmailTemplates.ORDER_PLACED}"`);
            }
            return (0, jsx_runtime_1.jsx)(order_placed_1.OrderPlacedTemplate, { ...data });
        case exports.EmailTemplates.ORDER_CANCELLED:
            if (!(0, order_cancelled_1.isOrderCancelledTemplateData)(data)) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Invalid data for template "${exports.EmailTemplates.ORDER_CANCELLED}"`);
            }
            return (0, jsx_runtime_1.jsx)(order_cancelled_1.OrderCancelledTemplate, { ...data });
        default:
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Unknown template key: "${templateKey}"`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9lbWFpbC1ub3RpZmljYXRpb25zL3RlbXBsYXRlcy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBY0Esc0RBbUNDOztBQWhERCxxREFBdUQ7QUFDdkQsK0NBQThFO0FBaURyRSxnR0FqREEsNkJBQWUsT0FpREE7QUFoRHhCLGlEQUE2RjtBQWdEbkUsb0dBaERqQixrQ0FBbUIsT0FnRGlCO0FBL0M3Qyx1REFBeUc7QUFFNUYsUUFBQSxjQUFjLEdBQUc7SUFDNUIsV0FBVyxFQUFYLHlCQUFXO0lBQ1gsWUFBWSxFQUFaLDJCQUFZO0lBQ1osZUFBZSxFQUFmLGlDQUFlO0NBQ1AsQ0FBQTtBQUlWLFNBQWdCLHFCQUFxQixDQUFDLFdBQW1CLEVBQUUsSUFBYTtJQUN0RSxRQUFRLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssc0JBQWMsQ0FBQyxXQUFXO1lBQzdCLElBQUksQ0FBQyxJQUFBLDhCQUFnQixFQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDhCQUE4QixzQkFBYyxDQUFDLFdBQVcsR0FBRyxDQUM1RCxDQUFBO1lBQ0gsQ0FBQztZQUNELE9BQU8sdUJBQUMsNkJBQWUsT0FBSyxJQUFJLEdBQUksQ0FBQTtRQUV0QyxLQUFLLHNCQUFjLENBQUMsWUFBWTtZQUM5QixJQUFJLENBQUMsSUFBQSx3Q0FBeUIsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5Qiw4QkFBOEIsc0JBQWMsQ0FBQyxZQUFZLEdBQUcsQ0FDN0QsQ0FBQTtZQUNILENBQUM7WUFDRCxPQUFPLHVCQUFDLGtDQUFtQixPQUFLLElBQUksR0FBSSxDQUFBO1FBRTFDLEtBQUssc0JBQWMsQ0FBQyxlQUFlO1lBQ2pDLElBQUksQ0FBQyxJQUFBLDhDQUE0QixFQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDhCQUE4QixzQkFBYyxDQUFDLGVBQWUsR0FBRyxDQUNoRSxDQUFBO1lBQ0gsQ0FBQztZQUNELE9BQU8sdUJBQUMsd0NBQXNCLE9BQUssSUFBSSxHQUFJLENBQUE7UUFFN0M7WUFDRSxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5QiwwQkFBMEIsV0FBVyxHQUFHLENBQ3pDLENBQUE7SUFDTCxDQUFDO0FBQ0gsQ0FBQyJ9