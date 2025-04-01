import{P}from"./chunk-6BM34M4S-vYZNBgLx.js";import{a6 as m,b as S,R as F,dD as E,dC as T,j as s,H as D,a8 as G,a9 as I,y as M,dG as k,t as L,w as r,D as C,m as H,bv as O,B as w,T as R,I as z,X as B}from"./index-CMquYl3T.js";import"./chunk-X3LH6P65-CZbKG1Vd.js";import"./lodash-DmOxPbQm.js";import"./chunk-TMAS4ILY-CVpDEbRj.js";import{K}from"./chunk-6HTZNHPT-L-2RZl81.js";import{b as c,u as V,a as X,c as u}from"./chunk-JGQGO74V-Duan6PnE.js";import{D as A}from"./date-picker-CVHe40oy.js";import"./chunk-ZJRFL6ZN-DtBiIn3r.js";import"./chunk-C76H5USB-BdXJwsWt.js";import"./chunk-MSDRGCRR-1sZcBoQ6.js";import"./chunk-P3UUX2T6-DSrinnpG.js";import"./index-DjlpDhrk.js";import"./checkbox-CKopA8ZP.js";import"./chunk-YEDAFXMB-CjWsU7_5.js";import"./chunk-AOFGTNG6-Bt8UKVnN.js";import"./table-0Zn9HLeV.js";import"./chunk-WX2SMNCD-DTYaks6U.js";import"./plus-mini-6wYRjZFG.js";import"./command-bar-BxS-yusB.js";import"./index-D6p17UlJ.js";import"./chunk-DV5RB7II-BeCML-tP.js";import"./format-ClAAOws9.js";import"./_isIndex-BuTFrvAV.js";import"./x-mark-mini-DSqtVCFj.js";import"./index-Ddr0DIQF.js";import"./prompt-C_aL4Bp7.js";import"./clsx-B-dksMZM.js";import"./popover-BCc5T8_7.js";import"./triangle-left-mini-BruUy0v2.js";var U=m.object({ends_at:m.date().nullable(),starts_at:m.date().nullable(),customer_group_id:m.array(m.object({id:m.string(),name:m.string()}))}),N="cg",$=({priceList:d,customerGroups:g})=>{const{t:e}=S(),{handleSuccess:x}=V(),{setIsOpen:h}=X(),l=G({defaultValues:{ends_at:d.ends_at?new Date(d.ends_at):null,starts_at:d.starts_at?new Date(d.starts_at):null,customer_group_id:g},resolver:I(U)}),{fields:t,remove:p,append:j}=M({control:l.control,name:"customer_group_id",keyName:"cg_id"}),b=i=>{if(!i.length){l.setValue("customer_group_id",[]),h(N,!1);return}const n=i.map(a=>a.id),o=i.filter(a=>!t.some(f=>f.id===a.id));for(const a of t)n.includes(a.id)||p(t.indexOf(a));j(o),h(N,!1)},{mutateAsync:y}=k(d.id),v=l.handleSubmit(async i=>{var a,f;const n=i.customer_group_id.map(_=>_.id),o={...d.rules};n.length?o["customer.groups.id"]=n:delete o["customer.groups.id"],await y({starts_at:((a=i.starts_at)==null?void 0:a.toISOString())||null,ends_at:((f=i.ends_at)==null?void 0:f.toISOString())||null,rules:o},{onSuccess:()=>{L.success(e("priceLists.configuration.edit.successToast")),x()},onError:_=>L.error(_.message)})});return s.jsxs(c.Form,{form:l,children:[s.jsx(c.Description,{className:"sr-only",children:e("priceLists.configuration.edit.description")}),s.jsxs(K,{className:"flex flex-1 flex-col overflow-hidden",onSubmit:v,children:[s.jsxs(c.Body,{className:"flex flex-1 flex-col gap-y-8 overflow-auto",children:[s.jsx(r.Field,{control:l.control,name:"starts_at",render:({field:i})=>s.jsxs(r.Item,{children:[s.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[s.jsxs("div",{className:"flex flex-col",children:[s.jsx(r.Label,{optional:!0,children:e("priceLists.fields.startsAt.label")}),s.jsx(r.Hint,{children:e("priceLists.fields.startsAt.hint")})]}),s.jsx(r.Control,{children:s.jsx(A,{granularity:"minute",shouldCloseOnSelect:!1,...i})})]}),s.jsx(r.ErrorMessage,{})]})}),s.jsx(C,{}),s.jsx(r.Field,{control:l.control,name:"ends_at",render:({field:i})=>s.jsxs(r.Item,{children:[s.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[s.jsxs("div",{className:"flex flex-col",children:[s.jsx(r.Label,{optional:!0,children:e("priceLists.fields.endsAt.label")}),s.jsx(r.Hint,{children:e("priceLists.fields.endsAt.hint")})]}),s.jsx(r.Control,{children:s.jsx(A,{granularity:"minute",shouldCloseOnSelect:!1,...i})})]}),s.jsx(r.ErrorMessage,{})]})}),s.jsx(C,{}),s.jsx(r.Field,{control:l.control,name:"customer_group_id",render:({field:i})=>s.jsxs(r.Item,{children:[s.jsxs("div",{children:[s.jsx(r.Label,{optional:!0,children:e("priceLists.fields.customerAvailability.label")}),s.jsx(r.Hint,{children:e("priceLists.fields.customerAvailability.hint")})]}),s.jsx(r.Control,{children:s.jsxs("div",{className:H("bg-ui-bg-component shadow-elevation-card-rest transition-fg grid gap-1.5 rounded-xl py-1.5","aria-[invalid='true']:shadow-borders-error"),role:"application",ref:i.ref,children:[s.jsxs("div",{className:"text-ui-fg-subtle grid gap-1.5 px-1.5 md:grid-cols-2",children:[s.jsx("div",{className:"bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5",children:e("priceLists.fields.customerAvailability.attribute")}),s.jsx("div",{className:"bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5",children:e("operators.in")})]}),s.jsx("div",{className:"flex items-center gap-1.5 px-1.5",children:s.jsxs(u,{id:N,children:[s.jsx(u.Trigger,{asChild:!0,children:s.jsxs("button",{type:"button",className:"bg-ui-bg-field shadow-borders-base txt-compact-small text-ui-fg-muted flex flex-1 items-center gap-x-2 rounded-md px-2 py-1.5",children:[s.jsx(O,{}),e("priceLists.fields.customerAvailability.placeholder")]})}),s.jsx(u.Trigger,{asChild:!0,children:s.jsx(w,{variant:"secondary",children:e("actions.browse")})}),s.jsxs(u.Content,{children:[s.jsxs(u.Header,{children:[s.jsx(u.Title,{asChild:!0,children:s.jsx(D,{children:e("priceLists.fields.customerAvailability.header")})}),s.jsx(u.Description,{className:"sr-only",children:e("priceLists.fields.customerAvailability.hint")})]}),s.jsx(P,{type:"drawer",setState:b,state:t})]})]})}),t.length>0?s.jsxs("div",{className:"flex flex-col gap-y-1.5",children:[s.jsx(C,{variant:"dashed"}),s.jsx("div",{className:"flex flex-col gap-y-1.5 px-1.5",children:t.map((n,o)=>s.jsxs("div",{className:"bg-ui-bg-field-component shadow-borders-base flex items-center justify-between gap-2 rounded-md px-2 py-0.5",children:[s.jsx(R,{size:"small",leading:"compact",children:n.name}),s.jsx(z,{size:"small",variant:"transparent",type:"button",onClick:()=>p(o),children:s.jsx(B,{})})]},n.cg_id))})]}):null]})}),s.jsx(r.ErrorMessage,{})]})})]}),s.jsx(c.Footer,{className:"shrink-0",children:s.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[s.jsx(c.Close,{asChild:!0,children:s.jsx(w,{size:"small",variant:"secondary",children:e("actions.cancel")})}),s.jsx(w,{size:"small",type:"submit",children:e("actions.save")})]})})]})]})},ws=()=>{var o;const{t:d}=S(),{id:g}=F(),{price_list:e,isPending:x,isError:h,error:l}=E(g),t=(o=e==null?void 0:e.rules)==null?void 0:o["customer.groups.id"],{customer_groups:p,isPending:j,isError:b,error:y}=T({id:t},{enabled:!!(t!=null&&t.length)}),v=(p==null?void 0:p.map(a=>({id:a.id,name:a.name})))||[],i=x?!1:!(t!=null&&t.length&&j),n=!x&&!!e&&i;if(h)throw l;if(b)throw y;return s.jsxs(c,{children:[s.jsx(c.Header,{children:s.jsx(c.Title,{asChild:!0,children:s.jsx(D,{children:d("priceLists.configuration.edit.header")})})}),n&&s.jsx($,{priceList:e,customerGroups:v})]})};export{ws as Component};
