"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelledTemplate = exports.isOrderCancelledTemplateData = exports.ORDER_CANCELLED = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const base_1 = require("./base");
exports.ORDER_CANCELLED = 'order-cancelled';
const isOrderCancelledTemplateData = (data) => typeof data.order === 'object' &&
    typeof data.customer === 'object' &&
    typeof data.order_link === 'string';
exports.isOrderCancelledTemplateData = isOrderCancelledTemplateData;
const OrderCancelledTemplate = ({ order, customer, order_link, preview = 'Your order has been cancelled' }) => {
    return ((0, jsx_runtime_1.jsx)(base_1.Base, { preview: preview, children: (0, jsx_runtime_1.jsxs)(components_1.Section, { children: [(0, jsx_runtime_1.jsx)("div", { style: { backgroundColor: '#d32f2f', color: '#ffffff', textAlign: 'center', padding: '10px', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }, children: "Order Cancelled" }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: { margin: '0 0 15px' }, children: ["Hi ", customer.first_name, ","] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: { margin: '0 0 15px' }, children: "We regret to inform you that your order has been cancelled. Below are the details:" }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: { margin: '0 0 20px', fontWeight: 'bold' }, children: ["Order #: ", order.display_id, " (", new Date(order.canceled_at).toLocaleDateString(), ")"] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                        width: '100%',
                        borderCollapse: 'collapse',
                        margin: '10px 0'
                    }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                backgroundColor: '#f8f8f8',
                                padding: '10px',
                                border: '1px solid #ddd'
                            }, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: { fontWeight: 'bold' }, children: "Product" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: { fontWeight: 'bold' }, children: "Quantity" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: { fontWeight: 'bold' }, children: "Price" })] }), order.items.map((item) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                border: '1px solid #ddd'
                            }, children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { children: [item.title, item.product_title ? ` - ${item.product_title}` : ''] }), (0, jsx_runtime_1.jsx)(components_1.Text, { children: item.quantity }), (0, jsx_runtime_1.jsxs)(components_1.Text, { children: [item.unit_price, " ", order.currency_code] })] }, item.id)))] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: { margin: '20px 0 5px' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "Subtotal:" }), " $", order.discount_total] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: { margin: '0 0 20px' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "Payment Status:" }), " ", order.payment_status] }), (0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', margin: '20px 0' }, children: (0, jsx_runtime_1.jsx)("a", { href: order_link, style: {
                            display: 'inline-block',
                            width: '200px',
                            textAlign: 'center',
                            backgroundColor: '#782B8D',
                            color: '#ffffff',
                            padding: '10px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }, children: "View Order Details" }) }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: { margin: '20px 0 5px' }, children: "If you have any questions, feel free to reach out." }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: { margin: '0 0 0' }, children: ["Cheers,", (0, jsx_runtime_1.jsx)("br", {}), " Your Company Team"] })] }) }));
};
exports.OrderCancelledTemplate = OrderCancelledTemplate;
exports.OrderCancelledTemplate.PreviewProps = {
    order: {
        id: 'test-order-id',
        display_id: 'ORD-123',
        canceled_at: new Date().toISOString(),
        email: 'test@example.com',
        currency_code: 'USD',
        payment_status: 'Refunded',
        items: [
            { id: 'item-1', title: 'Product 1', quantity: 2, unit_price: 10 },
            { id: 'item-2', title: 'Product 2', quantity: 1, unit_price: 25 }
        ],
        discount_total: 45
    },
    customer: {
        first_name: 'Test',
        last_name: 'User'
    },
    order_link: 'https://example.com/orders/ORD-123'
};
exports.default = exports.OrderCancelledTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FuY2VsbGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZW1haWwtbm90aWZpY2F0aW9ucy90ZW1wbGF0ZXMvb3JkZXItY2FuY2VsbGVkLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsd0RBQTJEO0FBRTNELGlDQUE2QjtBQUdoQixRQUFBLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQTtBQTJDekMsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLElBQVMsRUFBdUMsRUFBRSxDQUM3RixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtJQUM5QixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUTtJQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFBO0FBSHhCLFFBQUEsNEJBQTRCLGdDQUdKO0FBRTlCLE1BQU0sc0JBQXNCLEdBRS9CLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEdBQUcsK0JBQStCLEVBQUUsRUFBRSxFQUFFO0lBQ2pGLE9BQU8sQ0FDTCx1QkFBQyxXQUFJLElBQUMsT0FBTyxFQUFFLE9BQU8sWUFDcEIsd0JBQUMsb0JBQU8sZUFDTixnQ0FBSyxLQUFLLEVBQUUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGdDQUV4SixFQUVOLHdCQUFDLGlCQUFJLElBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxvQkFDN0IsUUFBUSxDQUFDLFVBQVUsU0FDbEIsRUFFUCx1QkFBQyxpQkFBSSxJQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsbUdBRTVC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