import{D as j}from"./chunk-7I5DQGWY-CwOWioty.js";import{a2 as f,a4 as p,b as u,R as y,aS as E,j as e,H as b,a8 as v,a9 as F,d5 as g,t as m,w as i,x as S,B as c}from"./index-DIBacnQv.js";import{K as w}from"./chunk-6HTZNHPT-DAb7JPK7.js";import{b as r,u as O}from"./chunk-JGQGO74V-Dqr_xQiI.js";import"./prompt-HaF8rRCy.js";var C=f({email:p().email()});function D({order:t}){const{t:s}=u(),{handleSuccess:o}=O(),a=v({defaultValues:{email:t.email||""},resolver:F(C)}),{mutateAsync:n,isPending:d}=g(t.id),x=a.handleSubmit(async l=>{try{await n({email:l.email}),m.success(s("orders.edit.email.requestSuccess",{email:l.email})),o()}catch(h){m.error(h.message)}});return e.jsx(r.Form,{form:a,children:e.jsxs(w,{onSubmit:x,className:"flex size-full flex-col overflow-hidden",children:[e.jsx(r.Body,{className:"flex-1 overflow-auto",children:e.jsx(i.Field,{control:a.control,name:"email",render:({field:l})=>e.jsxs(i.Item,{children:[e.jsx(i.Label,{children:s("fields.email")}),e.jsx(i.Control,{children:e.jsx(S,{type:"email",...l})}),e.jsx(i.ErrorMessage,{})]})})}),e.jsx(r.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(r.Close,{asChild:!0,children:e.jsx(c,{variant:"secondary",size:"small",children:s("actions.cancel")})}),e.jsx(c,{isLoading:d,type:"submit",variant:"primary",size:"small",children:s("actions.save")})]})})]})})}var H=()=>{const{t}=u(),s=y(),{order:o,isPending:a,isError:n,error:d}=E(s.id,{fields:j});if(!a&&n)throw d;return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(b,{children:t("orders.edit.email.title")})}),o&&e.jsx(D,{order:o})]})};export{H as Component};
