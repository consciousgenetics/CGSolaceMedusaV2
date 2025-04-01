import{C as T}from"./chunk-3DY3IL33-Dv-s9cd4.js";import{u as j}from"./chunk-6CNRNROJ-BiDQt502.js";import{C as y}from"./chunk-3LLQ6F7F-DZ0q9B2g.js";import{a2 as L,a4 as u,ad as C,R as O,b as V,Q as q,j as e,H as D,a as I,n as K,U as M,t as F,w as o,F as N,B as S,s as b}from"./index-CMquYl3T.js";import{K as R}from"./chunk-6HTZNHPT-L-2RZl81.js";import{b as n,u as w}from"./chunk-JGQGO74V-Duan6PnE.js";import{P as B}from"./chunk-B3XEMIUY-o3YLObt0.js";import"./x-mark-mini-DSqtVCFj.js";import"./triangles-mini-vtUpWMDZ.js";import"./Trans-D_xESVC1.js";import"./index-D6p17UlJ.js";import"./plus-mini-6wYRjZFG.js";import"./prompt-C_aL4Bp7.js";var H=L({type_id:u().nullable(),collection_id:u().nullable(),category_ids:C(u()),tag_ids:C(u())}),U=({product:a})=>{var f,_;const{t:r}=V(),{handleSuccess:c}=w(),{getFormConfigs:m,getFormFields:p}=I(),h=m("product","organize"),v=p("product","organize"),x=j({queryKey:["product_collections"],queryFn:s=>b.admin.productCollection.list(s),getOptions:s=>s.collections.map(t=>({label:t.title,value:t.id}))}),d=j({queryKey:["product_types"],queryFn:s=>b.admin.productType.list(s),getOptions:s=>s.product_types.map(t=>({label:t.value,value:t.id}))}),g=j({queryKey:["product_tags"],queryFn:s=>b.admin.productTag.list(s),getOptions:s=>s.product_tags.map(t=>({label:t.value,value:t.id}))}),i=K({defaultValues:{type_id:a.type_id??"",collection_id:a.collection_id??"",category_ids:((f=a.categories)==null?void 0:f.map(s=>s.id))||[],tag_ids:((_=a.tags)==null?void 0:_.map(s=>s.id))||[]},schema:H,configs:h,data:a}),{mutateAsync:E,isPending:P}=M(a.id),z=i.handleSubmit(async s=>{var t;await E({type_id:s.type_id||null,collection_id:s.collection_id||null,categories:s.category_ids.map(l=>({id:l})),tags:(t=s.tag_ids)==null?void 0:t.map(l=>({id:l}))},{onSuccess:({product:l})=>{F.success(r("products.organization.edit.toasts.success",{title:l.title})),c()},onError:l=>{F.error(l.message)}})});return e.jsx(n.Form,{form:i,children:e.jsxs(R,{onSubmit:z,className:"flex h-full flex-col",children:[e.jsx(n.Body,{children:e.jsxs("div",{className:"flex h-full flex-col gap-y-4",children:[e.jsx(o.Field,{control:i.control,name:"type_id",render:({field:s})=>e.jsxs(o.Item,{children:[e.jsx(o.Label,{optional:!0,children:r("products.fields.type.label")}),e.jsx(o.Control,{children:e.jsx(y,{...s,options:d.options,searchValue:d.searchValue,onSearchValueChange:d.onSearchValueChange,fetchNextPage:d.fetchNextPage})}),e.jsx(o.ErrorMessage,{})]})}),e.jsx(o.Field,{control:i.control,name:"collection_id",render:({field:s})=>e.jsxs(o.Item,{children:[e.jsx(o.Label,{optional:!0,children:r("products.fields.collection.label")}),e.jsx(o.Control,{children:e.jsx(y,{...s,multiple:!1,options:x.options,onSearchValueChange:x.onSearchValueChange,searchValue:x.searchValue})}),e.jsx(o.ErrorMessage,{})]})}),e.jsx(o.Field,{control:i.control,name:"category_ids",render:({field:s})=>e.jsxs(o.Item,{children:[e.jsx(o.Label,{optional:!0,children:r("products.fields.categories.label")}),e.jsx(o.Control,{children:e.jsx(T,{...s})}),e.jsx(o.ErrorMessage,{})]})}),e.jsx(o.Field,{control:i.control,name:"tag_ids",render:({field:s})=>e.jsxs(o.Item,{children:[e.jsx(o.Label,{optional:!0,children:r("products.fields.tags.label")}),e.jsx(o.Control,{children:e.jsx(y,{...s,multiple:!0,options:g.options,onSearchValueChange:g.onSearchValueChange,searchValue:g.searchValue})}),e.jsx(o.ErrorMessage,{})]})}),e.jsx(N,{fields:v,form:i})]})}),e.jsx(n.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(n.Close,{asChild:!0,children:e.jsx(S,{size:"small",variant:"secondary",children:r("actions.cancel")})}),e.jsx(S,{size:"small",type:"submit",isLoading:P,children:r("actions.save")})]})})]})})},te=()=>{const{id:a}=O(),{t:r}=V(),{product:c,isLoading:m,isError:p,error:h}=q(a,{fields:B});if(p)throw h;return e.jsxs(n,{children:[e.jsx(n.Header,{children:e.jsx(n.Title,{asChild:!0,children:e.jsx(D,{children:r("products.organization.edit.header")})})}),!m&&c&&e.jsx(U,{product:c})]})};export{te as Component};
