import{C as p}from"./chunk-MW4K5NNY-BVs13gha.js";import{a2 as i,a4 as n,j as e,b as f,a8 as y,a9 as g,eq as C,t as c,H as b,T as v,w as s,x as a,B as x}from"./index-DIBacnQv.js";import{K as F}from"./chunk-6HTZNHPT-DAb7JPK7.js";import{R as t,u as L}from"./chunk-JGQGO74V-Dqr_xQiI.js";import"./triangles-mini-DxIV-8bt.js";import"./prompt-HaF8rRCy.js";var z=i({name:n().min(1),address:i({address_1:n().min(1),address_2:n().optional(),country_code:n().min(2).max(2),city:n().optional(),postal_code:n().optional(),province:n().optional(),company:n().optional(),phone:n().optional()})}),_=()=>{const{t:o}=f(),{handleSuccess:m}=L(),l=y({defaultValues:{name:"",address:{address_1:"",address_2:"",city:"",company:"",country_code:"",phone:"",postal_code:"",province:""}},resolver:g(z)}),{mutateAsync:j,isPending:h}=C(),u=l.handleSubmit(async r=>{await j({name:r.name,address:r.address},{onSuccess:({stock_location:d})=>{c.success(o("locations.toast.create")),m(`/settings/locations/${d.id}`)},onError:d=>{c.error(d.message)}})});return e.jsx(t.Form,{form:l,children:e.jsxs(F,{onSubmit:u,className:"flex h-full flex-col overflow-hidden",children:[e.jsx(t.Header,{}),e.jsx(t.Body,{className:"flex flex-1 flex-col overflow-hidden",children:e.jsx("div",{className:"flex flex-1 flex-col items-center overflow-y-auto",children:e.jsxs("div",{className:"flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16",children:[e.jsxs("div",{children:[e.jsx(b,{className:"capitalize",children:o("stockLocations.create.header")}),e.jsx(v,{size:"small",className:"text-ui-fg-subtle",children:o("stockLocations.create.hint")})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:e.jsx(s.Field,{control:l.control,name:"name",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:o("fields.name")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(s.Field,{control:l.control,name:"address.address_1",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:o("fields.address")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.address_2",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:o("fields.address2")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.postal_code",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:o("fields.postalCode")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.city",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:o("fields.city")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.country_code",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:o("fields.country")}),e.jsx(s.Control,{children:e.jsx(p,{...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.province",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:o("fields.state")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.company",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:o("fields.company")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:l.control,name:"address.phone",render:({field:r})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:o("fields.phone")}),e.jsx(s.Control,{children:e.jsx(a,{size:"small",...r})}),e.jsx(s.ErrorMessage,{})]})})]})]})})}),e.jsx(t.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(t.Close,{asChild:!0,children:e.jsx(x,{size:"small",variant:"secondary",children:o("actions.cancel")})}),e.jsx(x,{type:"submit",size:"small",isLoading:h,children:o("actions.save")})]})})]})})},T=()=>e.jsx(t,{children:e.jsx(_,{})});export{T as Component};
