import{T as c,a as z}from"./chunk-MSDRGCRR-DaBEiFJy.js";import{u as P}from"./chunk-R7V6PQES-C9Pz5N82.js";import{g as N,a as w,b as E}from"./chunk-54IEHX46-DWMq7yL7.js";import{S as x}from"./chunk-ADOCJB6L-DX5CAA2z.js";import{a as S,j as e,b as p,ag as D,k as H,H as I,T as u,B as f,L as h,r as v,m as j,I as q,aj as A,A as R}from"./index-DIBacnQv.js";import{u as k,_ as L}from"./chunk-X3LH6P65-CuOHUr1J.js";import"./lodash-PHt2tz0a.js";import"./chunk-TMAS4ILY-BsjY-zeo.js";import{S as M}from"./chunk-2RQLKDBF-TEW8jZCy.js";import{u as B}from"./chunk-C76H5USB-lBXwGVgG.js";import{P as O}from"./pencil-square-CcENMOri.js";import{T as Q}from"./trash-B2ZMeBqG.js";import{C as $}from"./container-7gTgkh6-.js";import{c as b}from"./index-Dm7vz1c8.js";import"./chunk-P3UUX2T6-DZIRbW4U.js";import"./use-prompt-DC8heNFH.js";import"./prompt-HaF8rRCy.js";import"./chunk-YEDAFXMB-CakAyp57.js";import"./chunk-AOFGTNG6-B3fU9i5d.js";import"./table-BPY1yxCw.js";import"./chunk-WX2SMNCD-BxINj6_l.js";import"./plus-mini-BPTFLsGM.js";import"./command-bar-B35CUgNE.js";import"./index-n1fEXBg4.js";import"./chunk-DV5RB7II-CbVZVKEm.js";import"./format-DMijeSkG.js";import"./_isIndex-DKPwOz9w.js";import"./x-mark-mini-DM1cv0WP.js";import"./date-picker-DpnhxKPv.js";import"./clsx-B-dksMZM.js";import"./popover-DvWmO2RY.js";import"./triangle-left-mini-B8pNWBxT.js";import"./index-CGa0o9rK.js";import"./Trans-BO-uC1TI.js";import"./check-6bxrK_xH.js";var d=b(),G=()=>{const{t}=p();return v.useMemo(()=>[d.accessor("name",{header:()=>e.jsx(c,{text:t("fields.name")}),cell:({getValue:s,row:a})=>{const i=a.getToggleExpandedHandler();if(a.original.parent_category!==void 0){const r=N(a.original);return e.jsx("div",{className:"flex size-full items-center gap-1 overflow-hidden",children:r.map((o,l)=>e.jsxs("div",{className:j("overflow-hidden",{"text-ui-fg-muted flex items-center gap-x-1":l!==r.length-1}),children:[e.jsx(u,{size:"small",leading:"compact",className:"truncate",children:o.name}),l!==r.length-1&&e.jsx(u,{size:"small",leading:"compact",children:"/"})]},o.id))})}return e.jsxs("div",{className:"flex size-full items-center gap-x-3 overflow-hidden",children:[e.jsx("div",{className:"flex size-7 items-center justify-center",children:a.getCanExpand()?e.jsx(q,{type:"button",onClick:r=>{r.stopPropagation(),r.preventDefault(),i()},size:"small",variant:"transparent",className:"text-ui-fg-subtle",children:e.jsx(A,{className:j({"rotate-90 transition-transform will-change-transform":a.getIsExpanded()})})}):null}),e.jsx("span",{className:"truncate",children:s()})]})}}),d.accessor("handle",{header:()=>e.jsx(c,{text:t("fields.handle")}),cell:({getValue:s})=>e.jsx(z,{text:`/${s()}`})}),d.accessor("is_active",{header:()=>e.jsx(c,{text:t("fields.status")}),cell:({getValue:s})=>{const{color:a,label:i}=w(s(),t);return e.jsx(x,{color:a,children:i})}}),d.accessor("is_internal",{header:()=>e.jsx(c,{text:t("categories.fields.visibility.label")}),cell:({getValue:s})=>{const{color:a,label:i}=E(s(),t);return e.jsx(x,{color:a,children:i})}})],[t])},W=({pageSize:t=20,prefix:s})=>{const a=B(["q","offset","order"],s),i={q:a.q,limit:t,offset:a.offset?Number(a.offset):0,order:a.order};return{raw:a,searchParams:i}},m=20,Z=()=>{const{t}=p(),{raw:s,searchParams:a}=W({pageSize:m}),i=s.q?{include_ancestors_tree:!0,fields:"id,name,handle,is_active,is_internal,parent_category",...a}:{include_descendants_tree:!0,parent_category_id:"null",fields:"id,name,category_children,handle,is_internal,is_active",...a},{product_categories:r,count:o,isLoading:l,isError:y,error:C}=D({...i},{placeholderData:H}),g=K(),{table:_}=k({data:r||[],columns:g,count:o,getRowId:n=>n.id,getSubRows:n=>n.category_children,enableExpandableRows:!0,pageSize:m}),T=!!r&&r.length>0;if(y)throw C;return e.jsxs($,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsxs("div",{children:[e.jsx(I,{children:t("categories.domain")}),e.jsx(u,{className:"text-ui-fg-subtle",size:"small",children:t("categories.subtitle")})]}),e.jsxs("div",{className:"flex items-center gap-x-2",children:[T&&e.jsx(f,{size:"small",variant:"secondary",asChild:!0,children:e.jsx(h,{to:"organize",children:t("categories.organize.action")})}),e.jsx(f,{size:"small",variant:"secondary",asChild:!0,children:e.jsx(h,{to:"create",children:t("actions.create")})})]})]}),e.jsx(L,{table:_,columns:g,count:o,pageSize:m,isLoading:l,navigateTo:n=>n.id,queryObject:s,search:!0,pagination:!0})]})},F=({category:t})=>{const{t:s}=p(),a=P(t);return e.jsx(R,{groups:[{actions:[{label:s("actions.edit"),icon:e.jsx(O,{}),to:`${t.id}/edit`}]},{actions:[{label:s("actions.delete"),icon:e.jsx(Q,{}),onClick:a}]}]})},J=b(),K=()=>{const t=G();return v.useMemo(()=>[...t,J.display({id:"actions",cell:({row:s})=>e.jsx(F,{category:s.original})})],[t])},De=()=>{const{getWidgets:t}=S();return e.jsx(M,{widgets:{after:t("product_category.list.after"),before:t("product_category.list.before")},hasOutlet:!0,children:e.jsx(Z,{})})};export{De as Component};
