import{I as x}from"./chunk-GEGIBWTP-BXxYbU1m.js";import{S as d}from"./chunk-LFLGEXIG-D_GOjayr.js";import{T as c}from"./chunk-2RQLKDBF-TEW8jZCy.js";import{dW as v,j as t,q as f,R as j,d as p,dX as y,a as _,S as b,cV as h,s as I,b as S,a_ as g,H as w,A as q}from"./index-DIBacnQv.js";import{P as k}from"./pencil-square-CcENMOri.js";import{C as D}from"./container-7gTgkh6-.js";import"./Trans-BO-uC1TI.js";import"./x-mark-mini-DM1cv0WP.js";import"./check-6bxrK_xH.js";var G=i=>{var r,s;const{id:n}=i.params||{},{reservation:e}=v(n,void 0,{initialData:i.data,enabled:!!n});if(!e)return null;const l=((r=e==null?void 0:e.inventory_item)==null?void 0:r.title)??((s=e==null?void 0:e.inventory_item)==null?void 0:s.sku)??e.id;return t.jsx("span",{children:l})},P=i=>({queryKey:h.detail(i),queryFn:async()=>I.admin.reservation.retrieve(i)}),H=async({params:i})=>{const n=i.id,e=P(n);return f.ensureQueryData(e)},R=({reservation:i})=>{const{t:n}=S(),{inventory_item:e,isPending:l}=y(i.inventory_item_id),{stock_location:r,isPending:s}=g(i.location_id);if(l||!e||s||!r)return t.jsx("div",{children:"Loading..."});const a=e.location_levels.find(o=>o.location_id===i.location_id);return t.jsxs(D,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsx(w,{children:n("inventory.reservation.header",{itemName:e.title??e.sku})}),t.jsx(q,{groups:[{actions:[{icon:t.jsx(k,{}),label:n("actions.edit"),to:"edit"}]}]})]}),t.jsx(d,{title:n("inventory.reservation.lineItemId"),value:i.line_item_id}),t.jsx(d,{title:n("inventory.reservation.description"),value:i.description}),t.jsx(d,{title:n("inventory.reservation.location"),value:r==null?void 0:r.name}),t.jsx(d,{title:n("inventory.reservation.inStockAtLocation"),value:a==null?void 0:a.stocked_quantity}),t.jsx(d,{title:n("inventory.reservation.availableAtLocation"),value:a==null?void 0:a.available_quantity}),t.jsx(d,{title:n("inventory.reservation.reservedAtLocation"),value:a==null?void 0:a.reserved_quantity})]})},J=()=>{var u,m;const{id:i}=j(),n=p(),{reservation:e,isLoading:l,isError:r,error:s}=v(i,void 0,{initialData:n}),{inventory_item:a}=y((u=e==null?void 0:e.inventory_item)==null?void 0:u.id,void 0,{enabled:!!((m=e==null?void 0:e.inventory_item)!=null&&m.id)}),{getWidgets:o}=_();if(l||!e)return t.jsx(b,{mainSections:1,sidebarSections:1,showJSON:!0,showMetadata:!0});if(r)throw s;return t.jsxs(c,{widgets:{before:o("reservation.details.before"),after:o("reservation.details.after"),sideBefore:o("reservation.details.side.before"),sideAfter:o("reservation.details.side.after")},data:e,showJSON:!0,showMetadata:!0,children:[t.jsx(c.Main,{children:t.jsx(R,{reservation:e})}),t.jsx(c.Sidebar,{children:a&&t.jsx(x,{inventoryItem:a})})]})};export{G as Breadcrumb,J as Component,H as loader};
