import{L as M}from"./chunk-6WKBBTKM-DYbzdfda.js";import{u as I}from"./chunk-R7V6PQES-C9Pz5N82.js";import{a as O,b as q,g as F,c as H}from"./chunk-54IEHX46-DWMq7yL7.js";import{u as Q}from"./chunk-G3QXMPRB-D7Yx-Bv0.js";import{aN as x,j as e,R as K,d as $,a as G,S as J,q as V,b as h,H as b,A as w,T as l,r as g,az as z,V as Y,aj as f,Y as U,L as W,e as Z,k as X,aO as ee,aK as se,s as te,t as P}from"./index-DIBacnQv.js";import{u as ae,_ as re}from"./chunk-X3LH6P65-CuOHUr1J.js";import"./lodash-PHt2tz0a.js";import{u as ie,a as oe}from"./chunk-U6CSGYH6-Di2WVjKL.js";import"./chunk-TMAS4ILY-BsjY-zeo.js";import{T as y}from"./chunk-2RQLKDBF-TEW8jZCy.js";import{P as T}from"./pencil-square-CcENMOri.js";import{T as le}from"./trash-B2ZMeBqG.js";import{F as N}from"./folder-illustration-34lC5Zdo.js";import{u as ne}from"./use-prompt-DC8heNFH.js";import{P as ce}from"./plus-mini-BPTFLsGM.js";import{C}from"./container-7gTgkh6-.js";import{S as _}from"./status-badge-D-qvIpY5.js";import{C as p}from"./command-bar-B35CUgNE.js";import{C as k}from"./checkbox-DbvaBbDr.js";import{c as de}from"./index-Dm7vz1c8.js";import"./chunk-IQBAUTU5-ChJkKeZb.js";import"./chunk-ADOCJB6L-DX5CAA2z.js";import"./chunk-P3UUX2T6-DZIRbW4U.js";import"./chunk-YEDAFXMB-CakAyp57.js";import"./chunk-AOFGTNG6-B3fU9i5d.js";import"./table-BPY1yxCw.js";import"./chunk-WX2SMNCD-BxINj6_l.js";import"./chunk-C76H5USB-lBXwGVgG.js";import"./chunk-DV5RB7II-CbVZVKEm.js";import"./format-DMijeSkG.js";import"./_isIndex-DKPwOz9w.js";import"./x-mark-mini-DM1cv0WP.js";import"./index-n1fEXBg4.js";import"./date-picker-DpnhxKPv.js";import"./clsx-B-dksMZM.js";import"./popover-DvWmO2RY.js";import"./triangle-left-mini-B8pNWBxT.js";import"./index-CGa0o9rK.js";import"./Trans-BO-uC1TI.js";import"./check-6bxrK_xH.js";import"./prompt-HaF8rRCy.js";var ls=t=>{const{id:s}=t.params||{},{product_category:a}=x(s,{fields:"name"},{initialData:t.data,enabled:!!s});return a?e.jsx("span",{children:a.name}):null},me=({category:t})=>{const{t:s}=h(),a=O(t.is_active,s),r=q(t.is_internal,s),o=I(t);return e.jsxs(C,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsx(b,{children:t.name}),e.jsxs("div",{className:"flex items-center gap-x-4",children:[e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(_,{color:a.color,children:a.label}),e.jsx(_,{color:r.color,children:r.label})]}),e.jsx(w,{groups:[{actions:[{label:s("actions.edit"),icon:e.jsx(T,{}),to:"edit"}]},{actions:[{label:s("actions.delete"),icon:e.jsx(le,{}),onClick:o}]}]})]})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 gap-3 px-6 py-4",children:[e.jsx(l,{size:"small",leading:"compact",weight:"plus",children:s("fields.description")}),e.jsx(l,{size:"small",leading:"compact",children:t.description||"-"})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 gap-3 px-6 py-4",children:[e.jsx(l,{size:"small",leading:"compact",weight:"plus",children:s("fields.handle")}),e.jsxs(l,{size:"small",leading:"compact",children:["/",t.handle]})]})]})},ue=({category:t})=>{const{t:s}=h();return e.jsxs(C,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsx(b,{level:"h2",children:s("categories.organize.header")}),e.jsx(w,{groups:[{actions:[{label:s("categories.organize.action"),icon:e.jsx(T,{}),to:"organize"}]}]})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-start gap-3 px-6 py-4",children:[e.jsx(l,{size:"small",leading:"compact",weight:"plus",children:s("categories.fields.path.label")}),e.jsx(pe,{category:t})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-start gap-3 px-6 py-4",children:[e.jsx(l,{size:"small",leading:"compact",weight:"plus",children:s("categories.fields.children.label")}),e.jsx(ge,{category:t})]})]})},pe=({category:t})=>{const[s,a]=g.useState(!1),{t:r}=h(),{product_category:o,isLoading:d,isError:n,error:j}=x(t.id,{include_ancestors_tree:!0,fields:"id,name,*parent_category"}),i=g.useMemo(()=>F(o),[o]);if(d||!o)return e.jsx(z,{className:"h-5 w-16"});if(n)throw j;return i.length?i.length>1&&!s?e.jsxs("div",{className:"grid grid-cols-[20px_1fr] items-start gap-x-2",children:[e.jsx(N,{}),e.jsxs("div",{className:"flex w-full items-center gap-x-0.5 overflow-hidden",children:[e.jsx(Y,{content:r("categories.fields.path.tooltip"),children:e.jsx("button",{className:"outline-none",type:"button",onClick:()=>a(!0),children:e.jsx(l,{size:"xsmall",leading:"compact",weight:"plus",children:"..."})})}),e.jsx("div",{className:"flex size-[15px] shrink-0 items-center justify-center",children:e.jsx(f,{})}),e.jsx(l,{size:"xsmall",leading:"compact",weight:"plus",className:"truncate",children:i[i.length-1].name})]})]}):i.length>1&&s?e.jsxs("div",{className:"grid grid-cols-[20px_1fr] items-start gap-x-2",children:[e.jsx(N,{}),e.jsx("div",{className:"gap- flex flex-wrap items-center gap-x-0.5 gap-y-1",children:i.map((c,u)=>e.jsxs("div",{className:"flex items-center gap-x-0.5",children:[u===i.length-1?e.jsx(l,{size:"xsmall",leading:"compact",weight:"plus",children:c.name}):e.jsx(M,{to:`/categories/${c.id}`,className:"txt-compact-xsmall-plus text-ui-fg-subtle hover:text-ui-fg-base focus-visible:text-ui-fg-base",children:c.name}),u<i.length-1&&e.jsx(f,{})]},c.id))})]}):e.jsx("div",{className:"grid grid-cols-1 items-start gap-x-2",children:i.map((c,u)=>e.jsxs("div",{className:"flex items-center gap-x-0.5",children:[e.jsx(l,{size:"xsmall",leading:"compact",weight:"plus",children:c.name}),u<i.length-1&&e.jsx(f,{})]},c.id))}):e.jsx(l,{size:"small",leading:"compact",children:"-"})},ge=({category:t})=>{const{product_category:s,isLoading:a,isError:r,error:o}=x(t.id,{include_descendants_tree:!0,fields:"id,name,category_children"}),d=g.useMemo(()=>H(s),[s]);if(a||!s)return e.jsx(z,{className:"h-5 w-16"});if(r)throw o;return d.length?e.jsx("div",{className:"flex w-full flex-wrap gap-1",children:d.map(n=>e.jsx(U,{size:"2xsmall",className:"max-w-full",asChild:!0,children:e.jsx(W,{to:`/categories/${n.id}`,children:e.jsx("span",{className:"truncate",children:n.name})})},n.id))}):e.jsx(l,{size:"small",leading:"compact",children:"-"})},v=10,xe=({category:t})=>{const{t:s}=h(),a=ne(),[r,o]=g.useState({}),{raw:d,searchParams:n}=ie({pageSize:v}),{products:j,count:i,isLoading:c,isError:u,error:D}=Z({...n,category_id:[t.id]},{placeholderData:X}),S=je(),A=oe(["categories"]),{table:E}=ae({data:j||[],columns:S,count:i,getRowId:m=>m.id,pageSize:v,enableRowSelection:!0,enablePagination:!0,rowSelection:{state:r,updater:o}}),{mutateAsync:R}=ee(t.id),B=async()=>{const m=Object.keys(r);await a({title:s("general.areYouSure"),description:s("categories.products.remove.confirmation",{count:m.length}),confirmText:s("actions.remove"),cancelText:s("actions.cancel")})&&await R({remove:m},{onSuccess:()=>{P.success(s("categories.products.remove.successToast",{count:m.length})),o({})},onError:L=>{P.error(L.message)}})};if(u)throw D;return e.jsxs(C,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsx(b,{level:"h2",children:s("products.domain")}),e.jsx(w,{groups:[{actions:[{label:s("actions.add"),icon:e.jsx(ce,{}),to:"products"}]}]})]}),e.jsx(re,{table:E,filters:A,columns:S,orderBy:[{key:"title",label:s("fields.title")},{key:"created_at",label:s("fields.createdAt")},{key:"updated_at",label:s("fields.updatedAt")}],pageSize:v,count:i,navigateTo:m=>`/products/${m.id}`,isLoading:c,queryObject:d,noRecords:{message:s("categories.products.list.noRecordsMessage")}}),e.jsx(p,{open:!!Object.keys(r).length,children:e.jsxs(p.Bar,{children:[e.jsx(p.Value,{children:s("general.countSelected",{count:Object.keys(r).length})}),e.jsx(p.Seperator,{}),e.jsx(p.Command,{action:B,label:s("actions.remove"),shortcut:"r"})]})})]})},he=de(),je=()=>{const t=Q();return g.useMemo(()=>[he.display({id:"select",header:({table:s})=>e.jsx(k,{checked:s.getIsSomePageRowsSelected()?"indeterminate":s.getIsAllPageRowsSelected(),onCheckedChange:a=>s.toggleAllPageRowsSelected(!!a)}),cell:({row:s})=>e.jsx(k,{checked:s.getIsSelected(),onCheckedChange:a=>s.toggleSelected(!!a),onClick:a=>{a.stopPropagation()}})}),...t],[t])},ns=()=>{const{id:t}=K(),s=$(),{getWidgets:a}=G(),{product_category:r,isLoading:o,isError:d,error:n}=x(t,void 0,{initialData:s});if(o||!r)return e.jsx(J,{mainSections:2,sidebarSections:1,showJSON:!0,showMetadata:!0});if(d)throw n;return e.jsxs(y,{widgets:{after:a("product_category.details.after"),before:a("product_category.details.before"),sideAfter:a("product_category.details.side.after"),sideBefore:a("product_category.details.side.before")},showJSON:!0,showMetadata:!0,data:r,children:[e.jsxs(y.Main,{children:[e.jsx(me,{category:r}),e.jsx(xe,{category:r})]}),e.jsx(y.Sidebar,{children:e.jsx(ue,{category:r})})]})},fe=t=>({queryKey:se.detail(t),queryFn:async()=>te.admin.productCategory.retrieve(t)}),cs=async({params:t})=>{const s=t.id,a=fe(s);return V.ensureQueryData(a)};export{ls as Breadcrumb,ns as Component,cs as loader};
