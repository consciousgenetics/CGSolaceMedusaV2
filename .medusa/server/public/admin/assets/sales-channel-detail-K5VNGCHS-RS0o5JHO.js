import{u as q}from"./chunk-G3QXMPRB-DyqD97OV.js";import{h as S,j as t,q as B,d as L,R as z,a as M,dv as $,p as H,s as O,b as p,u as Q,ek as W,H as y,A as j,T as h,r as b,e as F,k as G,el as v,L as J,B as K,t as l}from"./index-CMquYl3T.js";import{u as Y,_ as Z}from"./chunk-X3LH6P65-CZbKG1Vd.js";import"./lodash-DmOxPbQm.js";import{u as U,a as V}from"./chunk-U6CSGYH6-DJeSY9Pv.js";import"./chunk-TMAS4ILY-CVpDEbRj.js";import{S as X}from"./chunk-2RQLKDBF-BPnRXTye.js";import{u as C}from"./use-prompt-BeKr1Vgs.js";import{P}from"./pencil-square-DXHIVjIt.js";import{T as w}from"./trash-DnTthMMY.js";import{C as k}from"./container-2yPQYTKd.js";import{S as ee}from"./status-badge-xv5zxOX0.js";import{C as x}from"./checkbox-CKopA8ZP.js";import{c as se}from"./index-DjlpDhrk.js";import"./chunk-IQBAUTU5-DvBI6WBZ.js";import"./chunk-ADOCJB6L-DBBcrTgg.js";import"./chunk-P3UUX2T6-DSrinnpG.js";import"./chunk-YEDAFXMB-CjWsU7_5.js";import"./chunk-AOFGTNG6-Bt8UKVnN.js";import"./table-0Zn9HLeV.js";import"./chunk-WX2SMNCD-DTYaks6U.js";import"./plus-mini-6wYRjZFG.js";import"./command-bar-BxS-yusB.js";import"./index-D6p17UlJ.js";import"./chunk-C76H5USB-BdXJwsWt.js";import"./chunk-DV5RB7II-BeCML-tP.js";import"./format-ClAAOws9.js";import"./_isIndex-BuTFrvAV.js";import"./x-mark-mini-DSqtVCFj.js";import"./date-picker-CVHe40oy.js";import"./clsx-B-dksMZM.js";import"./popover-BCc5T8_7.js";import"./triangle-left-mini-BruUy0v2.js";import"./index-Ddr0DIQF.js";import"./Trans-D_xESVC1.js";import"./check-CtIpGCHx.js";import"./prompt-C_aL4Bp7.js";var Fe=s=>{const{id:e}=s.params||{},{sales_channel:a}=S(e,{initialData:s.data,enabled:!!e});return a?t.jsx("span",{children:a.name}):null},te=s=>({queryKey:H.detail(s),queryFn:async()=>O.admin.salesChannel.retrieve(s)}),Ge=async({params:s})=>{const e=s.id,a=te(e);return B.ensureQueryData(a)},ae=({salesChannel:s})=>{const{t:e}=p(),a=C(),r=Q(),{mutateAsync:o}=W(s.id),c=async()=>{await a({title:e("general.areYouSure"),description:e("salesChannels.deleteSalesChannelWarning",{name:s.name}),verificationInstruction:e("general.typeToConfirm"),verificationText:s.name,confirmText:e("actions.delete"),cancelText:e("actions.cancel")})&&await o(void 0,{onSuccess:()=>{l.success(e("salesChannels.toast.delete")),r("/settings/sales-channels",{replace:!0})},onError:u=>{l.error(u.message)}})};return t.jsxs(k,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsx(y,{children:s.name}),t.jsxs("div",{className:"flex items-center gap-x-2",children:[t.jsx(ee,{color:s.is_disabled?"red":"green",children:e(`general.${s.is_disabled?"disabled":"enabled"}`)}),t.jsx(j,{groups:[{actions:[{icon:t.jsx(P,{}),label:e("actions.edit"),to:`/settings/sales-channels/${s.id}/edit`}]},{actions:[{icon:t.jsx(w,{}),label:e("actions.delete"),onClick:c}]}]})]})]}),t.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4",children:[t.jsx(h,{size:"small",leading:"compact",weight:"plus",children:e("fields.description")}),t.jsx(h,{size:"small",leading:"compact",children:s.description||"-"})]})]})},m=10,ne=({salesChannel:s})=>{const[e,a]=b.useState({}),{searchParams:r,raw:o}=U({pageSize:m}),{products:c,count:d,isPending:u,isError:T,error:_}=F({...r,sales_channel_id:[s.id]},{placeholderData:G}),g=re(),D=V(["sales_channel_id"]),{table:R}=Y({data:c??[],columns:g,count:d,enablePagination:!0,enableRowSelection:!0,pageSize:m,getRowId:i=>i.id,rowSelection:{state:e,updater:a},meta:{salesChannelId:s.id}}),{mutateAsync:A}=v(s.id),E=C(),{t:n}=p(),N=async()=>{const i=Object.keys(e);await E({title:n("general.areYouSure"),description:n("salesChannels.removeProductsWarning",{count:i.length,sales_channel:s.name}),confirmText:n("actions.delete"),cancelText:n("actions.cancel")})&&await A(i,{onSuccess:()=>{l.success(n("salesChannels.toast.update")),a({})},onError:I=>{l.error(I.message)}})};if(T)throw _;return t.jsxs(k,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsx(y,{level:"h2",children:n("products.domain")}),t.jsx(J,{to:`/settings/sales-channels/${s.id}/add-products`,children:t.jsx(K,{size:"small",variant:"secondary",children:n("general.add")})})]}),t.jsx(Z,{table:R,columns:g,pageSize:m,commands:[{action:N,label:n("actions.remove"),shortcut:"r"}],count:d,pagination:!0,search:!0,filters:D,navigateTo:i=>`/products/${i.id}`,isLoading:u,orderBy:[{key:"title",label:n("fields.title")},{key:"status",label:n("fields.status")},{key:"created_at",label:n("fields.createdAt")},{key:"updated_at",label:n("fields.updatedAt")}],queryObject:o,noRecords:{message:n("salesChannels.products.list.noRecordsMessage")}})]})},f=se(),re=()=>{const s=q();return b.useMemo(()=>[f.display({id:"select",header:({table:e})=>t.jsx(x,{checked:e.getIsSomePageRowsSelected()?"indeterminate":e.getIsAllPageRowsSelected(),onCheckedChange:a=>e.toggleAllPageRowsSelected(!!a)}),cell:({row:e})=>t.jsx(x,{checked:e.getIsSelected(),onCheckedChange:a=>e.toggleSelected(!!a),onClick:a=>{a.stopPropagation()}})}),...s,f.display({id:"actions",cell:({row:e,table:a})=>{const{salesChannelId:r}=a.options.meta;return t.jsx(oe,{productId:e.original.id,salesChannelId:r})}})],[s])},oe=({salesChannelId:s,productId:e})=>{const{t:a}=p(),{mutateAsync:r}=v(s),o=async()=>{await r([e],{onSuccess:()=>{l.success(a("salesChannels.toast.update"))},onError:c=>{l.error(c.message)}})};return t.jsx(j,{groups:[{actions:[{icon:t.jsx(P,{}),label:a("actions.edit"),to:`/products/${e}`}]},{actions:[{icon:t.jsx(w,{}),label:a("actions.remove"),onClick:o}]}]})},Je=()=>{const s=L(),{id:e}=z(),{sales_channel:a,isPending:r}=S(e,{initialData:s}),{getWidgets:o}=M();return r||!a?t.jsx($,{sections:2,showJSON:!0,showMetadata:!0}):t.jsxs(X,{widgets:{before:o("sales_channel.details.before"),after:o("sales_channel.details.after")},showJSON:!0,showMetadata:!0,data:a,children:[t.jsx(ae,{salesChannel:a}),t.jsx(ne,{salesChannel:a})]})};export{Fe as Breadcrumb,Je as Component,Ge as loader};
