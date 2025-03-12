import{a2 as u,a4 as t,a5 as f,j as e,b as p,a8 as C,a9 as b,ej as g,t as o,H as y,T as v,w as s,x as S,ab as F,B as c}from"./index-DIBacnQv.js";import{K as N}from"./chunk-6HTZNHPT-DAb7JPK7.js";import{R as l,u as w}from"./chunk-JGQGO74V-Dqr_xQiI.js";import{T}from"./textarea-CTuD2QWQ.js";import"./prompt-HaF8rRCy.js";var H=u({name:t().min(1),description:t().min(1),enabled:f()}),z=()=>{const{t:a}=p(),{handleSuccess:d}=w(),r=C({defaultValues:{name:"",description:"",enabled:!0},resolver:b(H)}),{mutateAsync:x,isPending:m}=g(),h=r.handleSubmit(async n=>{await x({name:n.name,description:n.description,is_disabled:!n.enabled},{onSuccess:({sales_channel:i})=>{o.success(a("salesChannels.toast.create")),d(`../${i.id}`)},onError:i=>o.error(i.message)})});return e.jsx(l.Form,{form:r,children:e.jsxs(N,{onSubmit:h,className:"flex h-full flex-col overflow-hidden",children:[e.jsx(l.Header,{}),e.jsx(l.Body,{className:"flex flex-1 flex-col overflow-hidden",children:e.jsx("div",{className:"flex flex-1 flex-col items-center overflow-y-auto",children:e.jsxs("div",{className:"flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16",children:[e.jsxs("div",{children:[e.jsx(y,{className:"capitalize",children:a("salesChannels.createSalesChannel")}),e.jsx(v,{size:"small",className:"text-ui-fg-subtle",children:a("salesChannels.createSalesChannelHint")})]}),e.jsxs("div",{className:"flex flex-col gap-y-4",children:[e.jsx("div",{className:"grid grid-cols-2",children:e.jsx(s.Field,{control:r.control,name:"name",render:({field:n})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:a("fields.name")}),e.jsx(s.Control,{children:e.jsx(S,{size:"small",...n})}),e.jsx(s.ErrorMessage,{})]})})}),e.jsx(s.Field,{control:r.control,name:"description",render:({field:n})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:a("fields.description")}),e.jsx(s.Control,{children:e.jsx(T,{...n})}),e.jsx(s.ErrorMessage,{})]})})]}),e.jsx(s.Field,{control:r.control,name:"enabled",render:({field:{value:n,onChange:i,...j}})=>e.jsxs(s.Item,{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(s.Label,{children:a("general.enabled")}),e.jsx(s.Control,{children:e.jsx(F,{...j,checked:n,onCheckedChange:i})})]}),e.jsx(s.Hint,{children:a("salesChannels.enabledHint")}),e.jsx(s.ErrorMessage,{})]})})]})})}),e.jsx(l.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(l.Close,{asChild:!0,children:e.jsx(c,{size:"small",variant:"secondary",children:a("actions.cancel")})}),e.jsx(c,{size:"small",type:"submit",isLoading:m,children:a("actions.save")})]})})]})})},B=()=>e.jsx(l,{children:e.jsx(z,{})});export{B as Component};
