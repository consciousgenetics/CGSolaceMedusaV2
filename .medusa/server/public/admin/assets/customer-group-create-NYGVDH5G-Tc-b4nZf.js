import{a2 as x,a4 as h,j as e,b as j,a8 as p,a9 as f,dP as C,t as l,H as g,T as v,w as a,x as y,B as i}from"./index-DIBacnQv.js";import{K as b}from"./chunk-6HTZNHPT-DAb7JPK7.js";import{R as s,u as F}from"./chunk-JGQGO74V-Dqr_xQiI.js";import"./prompt-HaF8rRCy.js";var G=x({name:h().min(1)}),T=()=>{const{t:r}=j(),{handleSuccess:c}=F(),o=p({defaultValues:{name:""},resolver:f(G)}),{mutateAsync:m,isPending:d}=C(),u=o.handleSubmit(async n=>{await m({name:n.name},{onSuccess:({customer_group:t})=>{l.success(r("customerGroups.create.successToast",{name:t.name})),c(`/customer-groups/${t.id}`)},onError:t=>{l.error(t.message)}})});return e.jsx(s.Form,{form:o,children:e.jsxs(b,{className:"flex h-full flex-col overflow-hidden",onSubmit:u,children:[e.jsx(s.Header,{}),e.jsx(s.Body,{className:"flex flex-col items-center pt-[72px]",children:e.jsxs("div",{className:"flex size-full max-w-[720px] flex-col gap-y-8",children:[e.jsxs("div",{children:[e.jsx(s.Title,{asChild:!0,children:e.jsx(g,{children:r("customerGroups.create.header")})}),e.jsx(s.Description,{asChild:!0,children:e.jsx(v,{size:"small",className:"text-ui-fg-subtle",children:r("customerGroups.create.hint")})})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:e.jsx(a.Field,{control:o.control,name:"name",render:({field:n})=>e.jsxs(a.Item,{children:[e.jsx(a.Label,{children:r("fields.name")}),e.jsx(a.Control,{children:e.jsx(y,{...n})}),e.jsx(a.ErrorMessage,{})]})})})]})}),e.jsxs(s.Footer,{children:[e.jsx(s.Close,{asChild:!0,children:e.jsx(i,{variant:"secondary",size:"small",children:r("actions.cancel")})}),e.jsx(i,{type:"submit",variant:"primary",size:"small",isLoading:d,children:r("actions.create")})]})]})})},R=()=>e.jsx(s,{children:e.jsx(T,{})});export{R as Component};
