import{u as O}from"./chunk-C76H5USB-lBXwGVgG.js";import{u as P,L as M}from"./chunk-JHNHXN7U-CLi0polC.js";import{T as B}from"./chunk-V3MOBCDF-Fr8ItIPO.js";import{f as w}from"./chunk-3WXBLS2P-MKHj1mOQ.js";import{D}from"./chunk-YEDAFXMB-CakAyp57.js";import{D as k}from"./chunk-AOFGTNG6-B3fU9i5d.js";import{a as A,N as E}from"./chunk-WX2SMNCD-BxINj6_l.js";import{b as g,j as e,T as u,A as R,f7 as I,L,B as q,a0 as V,r as v,b7 as $,b8 as Q,I as J,aj as K,b9 as F,D as U,Y as N,V as Y,e as G,bf as H}from"./index-DIBacnQv.js";import{u as W,g as X,a as Z}from"./index-Dm7vz1c8.js";import{P as _}from"./pencil-square-CcENMOri.js";import{T as z}from"./trash-B2ZMeBqG.js";import{A as ee}from"./arrow-down-right-mini-R3dgz8z1.js";import{S as C}from"./status-badge-D-qvIpY5.js";var ve=({prefix:s,pageSize:t=20})=>{const a=O(["offset","q","order","created_at","updated_at"],s),{offset:r,q:o,order:l,created_at:i,updated_at:n}=a;return{searchParams:{limit:t,offset:r?Number(r):0,order:l,created_at:i?JSON.parse(i):void 0,updated_at:n?JSON.parse(n):void 0,q:o},raw:a}},Ne=({taxRate:s,isSublevelTaxRate:t})=>{const{t:a}=g();return e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-[1fr_1fr_auto] items-center gap-4 px-6 py-4",children:[e.jsxs("div",{className:"flex items-center gap-x-1.5",children:[e.jsx(u,{size:"small",weight:"plus",leading:"compact",children:s.name}),s.code&&e.jsxs("div",{className:"flex items-center gap-x-1.5",children:[e.jsx(u,{size:"small",leading:"compact",children:"·"}),e.jsx(u,{size:"small",leading:"compact",children:s.code})]})]}),e.jsx(u,{size:"small",leading:"compact",children:w(s.rate)}),e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[t&&e.jsx(C,{color:s.is_combinable?"green":"grey",children:s.is_combinable?a("taxRegions.fields.isCombinable.true"):a("taxRegions.fields.isCombinable.false")}),e.jsx(se,{taxRate:s})]})]})},se=({taxRate:s})=>{const{t}=g(),a=P(s);return e.jsx(R,{groups:[{actions:[{label:t("actions.edit"),icon:e.jsx(_,{}),to:`tax-rates/${s.id}/edit`}]},{actions:[{label:t("actions.delete"),icon:e.jsx(z,{}),onClick:a}]}]})},ae=({taxRate:s})=>{const{t}=g(),a=P(s);if(s.is_default)return null;const r=s.rules.reduce((i,n)=>(i[n.reference]||(i[n.reference]=[]),i[n.reference].push(n.reference_id),i),{}),o=Object.values(B),l=Object.keys(r).map(i=>o.includes(i)).length;return e.jsxs($,{children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-3",children:[e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(Q,{asChild:!0,children:e.jsx(J,{size:"2xsmall",variant:"transparent",className:"group",children:e.jsx(K,{className:"text-ui-fg-muted transition-transform group-data-[state='open']:rotate-90"})})}),e.jsxs("div",{className:"flex items-center gap-x-1.5",children:[e.jsx(u,{size:"small",weight:"plus",leading:"compact",children:s.name}),s.code&&e.jsxs("div",{className:"text-ui-fg-subtle flex items-center gap-x-1.5",children:[e.jsx(u,{size:"small",leading:"compact",children:"·"}),e.jsx(u,{size:"small",leading:"compact",children:s.code})]})]})]}),e.jsxs("div",{className:"flex items-center gap-x-3",children:[e.jsx(u,{size:"small",leading:"compact",className:"text-ui-fg-subtle",children:t("taxRegions.fields.targets.numberOfTargets",{count:l})}),e.jsx("div",{className:"bg-ui-border-base h-3 w-px"}),e.jsx(C,{color:s.is_combinable?"green":"grey",children:s.is_combinable?t("taxRegions.fields.isCombinable.true"):t("taxRegions.fields.isCombinable.false")}),e.jsx(R,{groups:[{actions:[{label:t("actions.edit"),icon:e.jsx(_,{}),to:`overrides/${s.id}/edit`}]},{actions:[{label:t("actions.delete"),icon:e.jsx(z,{}),onClick:a}]}]})]})]}),e.jsx(F,{children:e.jsxs("div",{className:"bg-ui-bg-subtle",children:[e.jsx(U,{variant:"dashed"}),e.jsx("div",{className:"px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-x-3",children:[e.jsx("div",{className:"text-ui-fg-muted flex size-5 items-center justify-center",children:e.jsx(ee,{})}),e.jsxs("div",{className:"flex flex-wrap items-center gap-x-1.5 gap-y-2",children:[e.jsx(N,{size:"2xsmall",children:w(s.rate)}),e.jsx(u,{size:"small",leading:"compact",className:"text-ui-fg-subtle",children:t("taxRegions.fields.targets.operators.on")}),Object.entries(r).map(([i,n],c)=>e.jsxs("div",{className:"flex items-center gap-x-1.5",children:[e.jsx(te,{reference:i,ids:n},i),c<Object.keys(r).length-1&&e.jsx(u,{size:"small",leading:"compact",className:"text-ui-fg-subtle",children:t("taxRegions.fields.targets.operators.and")})]},i))]})]})})]})})]})},te=({reference:s,ids:t})=>e.jsxs("div",{className:"flex items-center gap-x-1.5",children:[e.jsx(re,{reference:s}),e.jsx(ie,{type:s,ids:t})]}),re=({reference:s})=>{const{t}=g();let a=null;switch(s){case"product":a=t("taxRegions.fields.targets.tags.product");break;case"product_type":a=t("taxRegions.fields.targets.tags.productType");break}return a?e.jsx(N,{size:"2xsmall",children:a}):null},ie=({type:s,ids:t})=>{const{t:a}=g(),{isPending:r,additional:o,labels:l,isError:i,error:n}=ne(s,t);if(i)throw n;return r?e.jsx("div",{className:"bg-ui-tag-neutral-bg border-ui-tag-neutral-border h-5 w-14 animate-pulse rounded-md"}):e.jsx(Y,{content:e.jsxs("ul",{children:[l==null?void 0:l.map((c,d)=>e.jsx("li",{children:c},d)),o>0&&e.jsx("li",{children:a("taxRegions.fields.targets.additionalValues",{count:o})})]}),children:e.jsx(N,{size:"2xsmall",children:a("taxRegions.fields.targets.values",{count:t.length})})})},ne=(s,t)=>{var o,l;const a=G({id:t,limit:10},{enabled:!!t.length&&s==="product"}),r=H({id:t,limit:10},{enabled:!!t.length&&s==="product_type"});switch(s){case"product":return{labels:(o=a.products)==null?void 0:o.map(i=>i.title),isPending:a.isPending,additional:a.products&&a.count?a.count-a.products.length:0,isError:a.isError,error:a.error};case"product_type":return{labels:(l=r.product_types)==null?void 0:l.map(i=>i.value),isPending:r.isPending,additional:r.product_types&&r.count?r.count-r.product_types.length:0,isError:r.isError,error:r.error}}},ye=({isPending:s,action:t,count:a=0,table:r,queryObject:o,prefix:l,children:i})=>{if(s)return e.jsxs("div",{className:"flex flex-col divide-y",children:[Array.from({length:3}).map((m,h)=>e.jsx("div",{className:"bg-ui-bg-field-component h-[52px] w-full animate-pulse"},h)),e.jsx(I,{layout:"fit"})]});const n=Object.values(o).filter(m=>!!m).length===0,c=!s&&a===0&&!n,d=!s&&a===0&&n,{pageIndex:p,pageSize:f}=r.getState().pagination;return e.jsxs("div",{className:"flex flex-col divide-y",children:[e.jsxs("div",{className:"flex flex-col justify-between gap-x-4 gap-y-3 px-6 py-4 md:flex-row md:items-center",children:[e.jsx("div",{children:i}),e.jsxs("div",{className:"flex items-center gap-x-2",children:[!d&&e.jsxs("div",{className:"flex w-full items-center gap-x-2 md:w-fit",children:[e.jsx("div",{className:"w-full md:w-fit",children:e.jsx(D,{prefix:l})}),e.jsx(k,{keys:["name","rate","code","updated_at","created_at"],prefix:l})]}),e.jsx(L,{to:t.to,children:e.jsx(q,{size:"small",variant:"secondary",children:t.label})})]})]}),c&&e.jsx(A,{}),d&&e.jsx(E,{}),!d&&!c?s?Array.from({length:3}).map((m,h)=>e.jsx("div",{className:"bg-ui-bg-field-component h-[60px] w-full animate-pulse"},h)):r.getRowModel().rows.map(m=>e.jsx(ae,{taxRate:m.original,role:"row","aria-rowindex":m.index},m.id)):null,!d&&e.jsx(M,{prefix:l,canNextPage:r.getCanNextPage(),canPreviousPage:r.getCanPreviousPage(),count:a,nextPage:r.nextPage,previousPage:r.previousPage,pageCount:r.getPageCount(),pageIndex:p,pageSize:f})]})},Te=({data:s=[],count:t=0,pageSize:a=10,prefix:r})=>{const[o,l]=V(),i=`${r?`${r}_`:""}offset`,n=o.get(i),[{pageIndex:c,pageSize:d},p]=v.useState({pageIndex:n?Math.ceil(Number(n)/a):0,pageSize:a}),f=v.useMemo(()=>({pageIndex:c,pageSize:d}),[c,d]);v.useEffect(()=>{const j=n?Math.ceil(Number(n)/a):0;j!==c&&p(x=>({...x,pageIndex:j}))},[n,a,c]);const m=j=>{const x=j(f),{pageIndex:y,pageSize:S}=x;return l(b=>{if(!y)return b.delete(i),b;const T=new URLSearchParams(b);return T.set(i,String(y*S)),T}),p(x),x};return{table:W({data:s,columns:[],pageCount:Math.ceil(t/d),state:{pagination:f},getCoreRowModel:X(),onPaginationChange:m,getPaginationRowModel:Z(),manualPagination:!0})}};export{Ne as T,Te as a,ye as b,ve as u};
