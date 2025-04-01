import{C as b}from"./chunk-3LLQ6F7F-DZ0q9B2g.js";import{a2 as E,a4 as j,af as z,a0 as M,j as e,b as P,aM as $,a8 as A,a9 as B,dV as H,cZ as V,c$ as I,t as g,H as K,w as t,x as O,B as _,T as q}from"./index-CMquYl3T.js";import{K as G}from"./chunk-6HTZNHPT-L-2RZl81.js";import{R as u,u as Q}from"./chunk-JGQGO74V-Duan6PnE.js";import{T as Z}from"./textarea-BFqby4_u.js";import"./x-mark-mini-DSqtVCFj.js";import"./triangles-mini-vtUpWMDZ.js";import"./plus-mini-6wYRjZFG.js";import"./prompt-C_aL4Bp7.js";var D=E({inventory_item_id:j().min(1),location_id:j().min(1),quantity:z().min(1),description:j().optional()}),v=({title:l,value:a})=>e.jsxs("div",{className:"grid grid-cols-2 divide-x",children:[e.jsx(q,{className:"px-2 py-1.5",size:"small",leading:"compact",children:l}),e.jsx(q,{className:"px-2 py-1.5",size:"small",leading:"compact",children:a})]}),J=l=>{var y,p;const{t:a}=P(),{handleSuccess:C}=Q(),[w,S]=$.useState(null),o=A({defaultValues:{inventory_item_id:l.inventoryItemId||"",location_id:"",quantity:0,description:""},resolver:B(D)}),{inventory_items:m}=H({q:w}),x=o.watch("inventory_item_id"),n=m==null?void 0:m.find(i=>i.id===x),h=o.watch("location_id"),r=(y=n==null?void 0:n.location_levels)==null?void 0:y.find(i=>i.location_id===h),F=o.watch("quantity"),{stock_locations:R}=V({id:((p=n==null?void 0:n.location_levels)==null?void 0:p.map(i=>i.location_id))??[]},{enabled:!!n}),{mutateAsync:N,isPending:T}=I(),k=o.handleSubmit(async i=>{const d=r!=null&&r.available_quantity?r.available_quantity:0;if(!(r!=null&&r.available_quantity)){o.setError("quantity",{type:"manual",message:a("inventory.reservation.errors.noAvaliableQuantity")});return}if(i.quantity<1||i.quantity>d){o.setError("quantity",{type:"manual",message:a("inventory.reservation.errors.quantityOutOfRange",{max:d})});return}await N(i,{onSuccess:({reservation:s})=>{g.success(a("inventory.reservation.successToast")),C(l.inventoryItemId?`/inventory/${l.inventoryItemId}`:`/reservations/${s.id}`)},onError:s=>{g.error(s.message)}})});return e.jsx(u.Form,{form:o,children:e.jsxs(G,{onSubmit:k,className:"flex size-full flex-col overflow-hidden",children:[e.jsx(u.Header,{}),e.jsx(u.Body,{className:"flex flex-1 flex-col items-center overflow-auto py-16",children:e.jsxs("div",{className:"flex w-full max-w-[720px] flex-col gap-y-8",children:[e.jsx(K,{children:a("inventory.reservation.create")}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(t.Field,{control:o.control,name:"inventory_item_id",render:({field:{value:i,onChange:c,...d}})=>e.jsxs(t.Item,{children:[e.jsx(t.Label,{children:a("inventory.reservation.itemToReserve")}),e.jsx(t.Control,{children:e.jsx(b,{onSearchValueChange:s=>S(s),value:i,onChange:s=>{c(s)},...d,disabled:!!l.inventoryItemId,options:(m??[]).map(s=>({label:s.title??s.sku,value:s.id}))})})]})},"inventory_item_id"),e.jsx(t.Field,{control:o.control,name:"location_id",render:({field:{value:i,onChange:c,...d}})=>e.jsxs(t.Item,{children:[e.jsx(t.Label,{children:a("fields.location")}),e.jsx(t.Control,{children:e.jsx(b,{value:i,onChange:s=>{c(s)},...d,disabled:!x,options:(R??[]).map(s=>({label:s.name,value:s.id}))})})]})},"location_id")]}),e.jsxs("div",{className:"text-ui-fg-subtle shadow-elevation-card-rest grid grid-rows-4 divide-y rounded-lg",children:[e.jsx(v,{title:a("fields.title"),value:(n==null?void 0:n.title)??(n==null?void 0:n.sku)??"-"}),e.jsx(v,{title:a("fields.sku"),value:(n==null?void 0:n.sku)??"-"}),e.jsx(v,{title:a("fields.inStock"),value:(r==null?void 0:r.stocked_quantity)??"-"}),e.jsx(v,{title:a("inventory.available"),value:r!=null&&r.available_quantity?r.available_quantity-(F||0):"-"})]}),e.jsx("div",{className:"w-full lg:w-1/2",children:e.jsx(t.Field,{control:o.control,name:"quantity",render:({field:{onChange:i,value:c,...d}})=>e.jsxs(t.Item,{children:[e.jsx(t.Label,{children:a("fields.quantity")}),e.jsx(t.Control,{children:e.jsx(O,{type:"number",placeholder:a("inventory.reservation.quantityPlaceholder"),value:c||"",onChange:s=>{const f=s.target.value;i(f===""?null:parseFloat(f))},...d,disabled:!x||!h})}),e.jsx(t.ErrorMessage,{})]})})}),e.jsx(t.Field,{control:o.control,name:"description",render:({field:i})=>e.jsxs(t.Item,{children:[e.jsx(t.Label,{optional:!0,children:a("fields.description")}),e.jsx(t.Control,{children:e.jsx(Z,{...i,disabled:!x||!h,placeholder:a("inventory.reservation.descriptionPlaceholder")})}),e.jsx(t.ErrorMessage,{})]})})]})}),e.jsx(u.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(u.Close,{asChild:!0,children:e.jsx(_,{variant:"secondary",size:"small",children:a("actions.cancel")})}),e.jsx(_,{type:"submit",variant:"primary",size:"small",isLoading:T,children:a("actions.create")})]})})]})})},te=()=>{const[l]=M(),a=l.get("item_id");return e.jsx(u,{children:e.jsx(J,{inventoryItemId:a})})};export{te as Component};
