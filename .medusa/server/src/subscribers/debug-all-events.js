"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = debugAllEventsHandler;
async function debugAllEventsHandler({ event, container, }) {
    var _a, _b;
    // Only log payment-related events to avoid spam
    if (((_a = event.name) === null || _a === void 0 ? void 0 : _a.includes('payment')) || ((_b = event.name) === null || _b === void 0 ? void 0 : _b.includes('capture'))) {
        console.log("🎯 DEBUG - Event fired:", event.name);
        console.log("🎯 DEBUG - Event data:", JSON.stringify(event.data || {}, null, 2));
    }
}
exports.config = {
    event: "*", // Listen to ALL events
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctYWxsLWV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9kZWJ1Zy1hbGwtZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHdDQVNDO0FBVGMsS0FBSyxVQUFVLHFCQUFxQixDQUFDLEVBQ2xELEtBQUssRUFDTCxTQUFTLEdBQ1c7O0lBQ3BCLGdEQUFnRDtJQUNoRCxJQUFJLENBQUEsTUFBQSxLQUFLLENBQUMsSUFBSSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQUksTUFBQSxLQUFLLENBQUMsSUFBSSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUEsRUFBRSxDQUFDO1FBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsR0FBRyxFQUFFLHVCQUF1QjtDQUNwQyxDQUFDIn0=