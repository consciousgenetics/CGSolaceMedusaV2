import{T as A,c as V,a as re,b as ae}from"./chunk-52GEX6O5-BjgOWGZj.js";import{T as g}from"./chunk-V3MOBCDF-Fr8ItIPO.js";import{a6 as u,b as $,R as oe,j as e,H as K,e as le,dr as ie,bg as ne,bf as de,dC as ce,a8 as ue,a9 as pe,t as z,y as B,v as me,w as i,x as G,z as xe,T as he,E as ge,B as O,m as fe,bv as be,D as je}from"./index-CMquYl3T.js";import{P as ve}from"./chunk-YRY2CZ6I-BW2uArLT.js";import"./chunk-X3LH6P65-CZbKG1Vd.js";import"./lodash-DmOxPbQm.js";import"./chunk-TMAS4ILY-CVpDEbRj.js";import{c as ye,d as _e}from"./chunk-5OOAHPXU-DDcPJw4-.js";import{S as Re}from"./chunk-CBJWO6K6-CUFqrVHs.js";import{K as Te}from"./chunk-6HTZNHPT-L-2RZl81.js";import{b as j,u as Ce,a as Oe,c as _}from"./chunk-JGQGO74V-Duan6PnE.js";import{S as N}from"./select-D3c3XExV.js";import"./chunk-W6676YBU-DsSqmqiA.js";import"./chunk-WYX5PIA3-CQ_zUvhE.js";import"./chunk-P3UUX2T6-DSrinnpG.js";import"./chunk-DV5RB7II-BeCML-tP.js";import"./format-ClAAOws9.js";import"./chunk-MSDRGCRR-1sZcBoQ6.js";import"./index-DjlpDhrk.js";import"./chunk-QQGBEPB7-OD4KevEm.js";import"./chunk-C76H5USB-BdXJwsWt.js";import"./chunk-W7625H47-DgemhH3v.js";import"./chunk-ZJRFL6ZN-DtBiIn3r.js";import"./chunk-XWO5BP42-BDb6zuiM.js";import"./chunk-G3QXMPRB-DyqD97OV.js";import"./chunk-IQBAUTU5-DvBI6WBZ.js";import"./chunk-ADOCJB6L-DBBcrTgg.js";import"./chunk-EMNHBSFU-B71BFDWg.js";import"./chunk-GW6TVOAA-CwyrnE4z.js";import"./chunk-U6CSGYH6-DJeSY9Pv.js";import"./x-mark-mini-DSqtVCFj.js";import"./checkbox-CKopA8ZP.js";import"./index.esm-DGzek94e.js";import"./chunk-YEDAFXMB-CjWsU7_5.js";import"./chunk-AOFGTNG6-Bt8UKVnN.js";import"./table-0Zn9HLeV.js";import"./chunk-WX2SMNCD-DTYaks6U.js";import"./plus-mini-6wYRjZFG.js";import"./command-bar-BxS-yusB.js";import"./index-D6p17UlJ.js";import"./_isIndex-BuTFrvAV.js";import"./date-picker-CVHe40oy.js";import"./clsx-B-dksMZM.js";import"./popover-BCc5T8_7.js";import"./triangle-left-mini-BruUy0v2.js";import"./index-Ddr0DIQF.js";import"./prompt-C_aL4Bp7.js";import"./triangles-mini-vtUpWMDZ.js";import"./check-CtIpGCHx.js";var Ne="tr",H=d=>`${Ne}-${d}`,Pe=u.object({name:u.string().min(1),code:u.string().min(1),rate:u.object({float:u.number().optional(),value:u.string().optional()}),is_combinable:u.boolean().optional(),enabled_rules:u.object({product:u.boolean(),product_type:u.boolean()}),product:u.array(A).optional(),product_type:u.array(A).optional()}),we=({taxRate:d,isCombinable:C=!1,initialValues:c})=>{var M;const{t:a}=$(),{handleSuccess:f}=Ce(),{setIsOpen:v}=Oe(),l=ue({defaultValues:{name:d.name,code:d.code,rate:{value:((M=d.rate)==null?void 0:M.toString())||""},is_combinable:d.is_combinable,enabled_rules:{product:c.product.length>0,product_type:c.product_type.length>0},product:c.product,product_type:c.product_type},resolver:pe(Pe)}),{mutateAsync:r,isPending:t}=_e(d.id),x=l.handleSubmit(async s=>{var R;const{product:n,product_type:o}=s,b=V({reference_type:"product",references:n||[]}),y=V({reference_type:"product_type",references:o||[]}),p=[b,y].filter(h=>!!h).flatMap(h=>h);await r({name:s.name,code:s.code||null,rate:(R=s.rate)==null?void 0:R.float,is_combinable:s.is_combinable,rules:p},{onSuccess:()=>{z.success(a("taxRegions.taxRates.edit.successToast")),f()},onError:h=>{z.error(h.message)}})}),P=B({control:l.control,name:"product"}),q=B({control:l.control,name:"product_type"}),k=s=>{switch(s){case"product":return P;case"product_type":return q}},I=[{value:"product",label:a("taxRegions.fields.targets.options.product")},{value:"product_type",label:a("taxRegions.fields.targets.options.productType")}],W={product:a("taxRegions.fields.targets.placeholders.product"),product_type:a("taxRegions.fields.targets.placeholders.productType")},J=s=>{const{fields:n,remove:o,append:b}=k(s),y=H(s);return p=>{if(!p.length){l.setValue(s,[],{shouldDirty:!0}),v(y,!1);return}const R=p.map(m=>m.value),h=p.filter(m=>!n.some(S=>S.value===m.value));for(const m of n)R.includes(m.value)||o(n.indexOf(m));b(h),v(y,!1)}},D=new Set(["product"]),F=s=>{l.setValue(s,[],{shouldDirty:!0}),l.setValue(`enabled_rules.${s}`,!1,{shouldDirty:!0}),D.delete(s)},L=s=>{l.setValue(`enabled_rules.${s}`,!0,{shouldDirty:!0}),l.setValue(s,[],{shouldDirty:!0}),D.add(s)},w=me({control:l.control,name:"enabled_rules"}),Q=()=>{const s=Object.keys(w).find(n=>!w[n]);s&&L(s)},E=I.filter(s=>w[s.value]).sort((s,n)=>{const o=Array.from(D);return o.indexOf(s.value)-o.indexOf(n.value)}),X=s=>I.filter(n=>!E.some(o=>o.value===n.value)||n.value===s),Y=Object.values(w).some(s=>!s);return e.jsx(j.Form,{form:l,children:e.jsxs(Te,{className:"flex flex-1 flex-col overflow-hidden",onSubmit:x,children:[e.jsxs(j.Body,{className:"flex flex-1 flex-col gap-y-6 overflow-auto",children:[e.jsxs("div",{className:"flex flex-col gap-y-4",children:[e.jsx(i.Field,{control:l.control,name:"name",render:({field:s})=>e.jsxs(i.Item,{children:[e.jsx(i.Label,{children:a("fields.name")}),e.jsx(i.Control,{children:e.jsx(G,{...s})}),e.jsx(i.ErrorMessage,{})]})}),e.jsx(i.Field,{control:l.control,name:"code",render:({field:s})=>e.jsxs(i.Item,{children:[e.jsx(i.Label,{children:a("taxRegions.fields.taxCode")}),e.jsx(i.Control,{children:e.jsx(G,{...s})}),e.jsx(i.ErrorMessage,{})]})}),e.jsx(i.Field,{control:l.control,name:"rate",render:({field:{value:s,onChange:n,...o}})=>e.jsxs(i.Item,{children:[e.jsx(i.Label,{children:a("taxRegions.fields.taxRate")}),e.jsx(i.Control,{children:e.jsx(ve,{...o,value:s==null?void 0:s.value,onValueChange:(b,y,p)=>n({value:b,float:p==null?void 0:p.float})})}),e.jsx(i.ErrorMessage,{})]})})]}),C&&e.jsx(Re,{control:l.control,name:"is_combinable",label:a("taxRegions.fields.isCombinable.label"),description:a("taxRegions.fields.isCombinable.hint")}),e.jsxs("div",{className:"flex flex-col gap-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between gap-x-4",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"flex items-center gap-x-1",children:[e.jsx(xe,{id:"tax_region_rules_label",htmlFor:"tax_region_rules",children:a("taxRegions.fields.targets.label")}),e.jsxs(he,{size:"small",leading:"compact",className:"text-ui-fg-muted",children:["(",a("fields.optional"),")"]})]}),e.jsx(ge,{id:"tax_region_rules_description",className:"text-pretty",children:a("taxRegions.fields.targets.hint")})]}),Y&&e.jsx(O,{onClick:Q,type:"button",size:"small",variant:"transparent",className:"text-ui-fg-interactive hover:text-ui-fg-interactive-hover flex-shrink-0",children:a("taxRegions.fields.targets.action")})]}),e.jsx("div",{id:"tax_region_rules","aria-labelledby":"tax_region_rules_label","aria-describedby":"tax_region_rules_description",role:"application",className:"flex flex-col gap-y-3",children:E.map((s,n)=>{const o=s.value,b=s.label,y=n===E.length-1,p=W[o],R=X(o),h=H(o),{fields:m,remove:S}=k(o),Z=J(o),ee=U=>{F(o),L(U)};return e.jsx("div",{children:e.jsx(i.Field,{control:l.control,name:s.value,render:({field:{value:U,onChange:Ee,...se}})=>e.jsxs(i.Item,{className:"space-y-0",children:[e.jsx(i.Label,{className:"sr-only",children:b}),e.jsxs("div",{className:fe("bg-ui-bg-component shadow-elevation-card-rest transition-fg grid gap-1.5 rounded-xl py-1.5","aria-[invalid='true']:shadow-borders-error"),role:"application",...se,children:[e.jsxs("div",{className:"text-ui-fg-subtle grid gap-1.5 px-1.5 md:grid-cols-2",children:[y?e.jsxs(N,{value:o,onValueChange:ee,children:[e.jsx(N.Trigger,{className:"bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",children:e.jsx(N.Value,{})}),e.jsx(N.Content,{children:R.map(T=>e.jsx(N.Item,{value:T.value,children:T.label},T.value))})]}):e.jsx("div",{className:"bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5",children:b}),e.jsx("div",{className:"bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5",children:a("taxRegions.fields.targets.operators.in")})]}),e.jsxs("div",{className:"flex items-center gap-1.5 px-1.5",children:[e.jsxs(_,{id:h,children:[e.jsx(_.Trigger,{asChild:!0,children:e.jsxs("button",{type:"button",className:"bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover shadow-borders-base txt-compact-small text-ui-fg-muted transition-fg focus-visible:shadow-borders-interactive-with-active flex flex-1 items-center gap-x-2 rounded-md px-2 py-1.5 outline-none",children:[e.jsx(be,{}),p]})}),e.jsx(_.Trigger,{asChild:!0,children:e.jsx(O,{variant:"secondary",children:a("actions.browse")})}),e.jsxs(_.Content,{children:[e.jsxs(_.Header,{children:[e.jsx(_.Title,{asChild:!0,children:e.jsx(K,{children:a("taxRegions.fields.targets.modal.header")})}),e.jsx(_.Description,{className:"sr-only",children:a("taxRegions.fields.targets.hint")})]}),e.jsx(re,{type:"drawer",referenceType:o,state:m,setState:Z})]})]}),e.jsx(O,{variant:"secondary",onClick:()=>F(o),type:"button",children:a("actions.delete")})]}),m.length>0?e.jsxs("div",{className:"flex flex-col gap-y-1.5",children:[e.jsx(je,{variant:"dashed"}),e.jsx("div",{className:"flex flex-col gap-y-1.5 px-1.5",children:m.map((T,te)=>e.jsx(ae,{index:te,label:T.label,onRemove:S},T.id))})]}):null]}),e.jsx(i.ErrorMessage,{className:"mt-2"})]})})},o)})})]})]}),e.jsx(j.Footer,{className:"shrink-0",children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(j.Close,{asChild:!0,children:e.jsx(O,{size:"small",variant:"secondary",children:a("actions.cancel")})}),e.jsx(O,{size:"small",type:"submit",isLoading:t,children:a("actions.save")})]})})]})})},Ns=()=>{const{t:d}=$(),{tax_rate_id:C}=oe(),{tax_rate:c,isPending:a,isError:f,error:v}=ye(C),{initialValues:l,isPending:r}=De(c),t=!a&&!!c&&!r&&!!l;if(f)throw v;return e.jsxs(j,{children:[e.jsxs(j.Header,{children:[e.jsx(j.Title,{asChild:!0,children:e.jsx(K,{children:d("taxRegions.taxOverrides.edit.header")})}),e.jsx(j.Description,{className:"sr-only",children:d("taxRegions.taxOverrides.edit.hint")})]}),t&&e.jsx(we,{taxRate:c,isCombinable:!0,initialValues:l})]})},De=d=>{const C=(d==null?void 0:d.rules)||[],c={product:[],[g.PRODUCT_COLLECTION]:[],[g.PRODUCT_TAG]:[],product_type:[],[g.CUSTOMER_GROUP]:[]};C.forEach(r=>{var x;const t=r.reference;(x=c[t])==null||x.push(r.reference_id)});const a=[{ids:c.product,hook:le,key:"product",getResult:r=>r.products.map(t=>({label:t.title,value:t.id}))},{ids:c[g.PRODUCT_COLLECTION],hook:ie,key:g.PRODUCT_COLLECTION,getResult:r=>r.collections.map(t=>({label:t.title,value:t.id}))},{ids:c[g.PRODUCT_TAG],hook:ne,key:g.PRODUCT_TAG,getResult:r=>r.tags.map(t=>({label:t.value,value:t.id}))},{ids:c.product_type,hook:de,key:"product_type",getResult:r=>r.product_types.map(t=>({label:t.value,value:t.id}))},{ids:c[g.CUSTOMER_GROUP],hook:ce,key:g.CUSTOMER_GROUP,getResult:r=>r.customer_groups.map(t=>({label:t.name,value:t.id}))}],f=a.map(({ids:r,hook:t})=>{const x=r.length>0;return{result:t({id:r,limit:r.length},{enabled:x}),enabled:x}});if(!d)return{isPending:!0};const v=f.some(({result:r,enabled:t})=>t&&r.isPending);return v?{isPending:v}:(f.forEach(({result:r,enabled:t})=>{if(t&&r.isError)throw r.error}),{initialValues:a.reduce((r,{key:t,getResult:x},P)=>({...r,[t]:f[P].enabled?x(f[P].result):[]}),{}),isPending:!1})};export{Ns as Component};
