import{c as g}from"./chunk-GVRV2SOJ-d15qXuGK.js";import{a2 as S,a4 as b,b as v,R as y,a_ as w,ar as F,j as e,H as z,a8 as L,t as j,w as r,x as Z,G as _,B as p}from"./index-CMquYl3T.js";import{K as E}from"./chunk-6HTZNHPT-L-2RZl81.js";import{b as o,u as I}from"./chunk-JGQGO74V-Duan6PnE.js";import"./chunk-BF3VCHXD-C4gPijbG.js";import"./prompt-C_aL4Bp7.js";S({name:b().min(1)});var N=({zone:l,fulfillmentSetId:i,locationId:c})=>{const{t:s}=v(),{handleSuccess:a}=I(),t=L({defaultValues:{name:l.name}}),{mutateAsync:m,isPending:u}=g(i,l.id),x=t.handleSubmit(async n=>{await m({name:n.name},{onSuccess:()=>{j.success(s("stockLocations.serviceZones.edit.successToast",{name:n.name})),a(`/settings/locations/${c}`)},onError:d=>{j.error(d.message)}})});return e.jsx(o.Form,{form:t,children:e.jsxs(E,{onSubmit:x,className:"flex size-full flex-col overflow-hidden",children:[e.jsx(o.Body,{className:"flex-1 overflow-auto",children:e.jsxs("div",{className:"flex flex-col gap-y-8",children:[e.jsx("div",{className:"flex flex-col gap-y-4",children:e.jsx(r.Field,{control:t.control,name:"name",render:({field:n})=>e.jsxs(r.Item,{children:[e.jsx(r.Label,{children:s("fields.name")}),e.jsx(r.Control,{children:e.jsx(Z,{...n})}),e.jsx(r.ErrorMessage,{})]})})}),e.jsx(_,{label:s("general.tip"),children:s("stockLocations.serviceZones.fields.tip")})]})}),e.jsx(o.Footer,{children:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(o.Close,{asChild:!0,children:e.jsx(p,{size:"small",variant:"secondary",children:s("actions.cancel")})}),e.jsx(p,{size:"small",type:"submit",isLoading:u,children:s("actions.save")})]})})]})})},P=()=>{var d,h;const{t:l}=v(),{location_id:i,fset_id:c,zone_id:s}=y(),{stock_location:a,isPending:t,isFetching:m,isError:u,error:x}=w(i,{fields:"*fulfillment_sets.service_zones"}),n=(h=(d=a==null?void 0:a.fulfillment_sets)==null?void 0:d.find(f=>f.id===c))==null?void 0:h.service_zones.find(f=>f.id===s);if(!t&&!m&&!n)throw F({message:`Service zone with ID ${s} was not found`},404);if(u)throw x;return e.jsxs(o,{prev:`/settings/locations/${i}`,children:[e.jsx(o.Header,{children:e.jsx(z,{children:l("stockLocations.serviceZones.edit.header")})}),n&&e.jsx(N,{zone:n,fulfillmentSetId:c,locationId:i})]})};export{P as Component};
