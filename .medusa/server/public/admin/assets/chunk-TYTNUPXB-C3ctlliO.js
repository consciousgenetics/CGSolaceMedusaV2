import{r as n,j as r,m as O,am as T,T as u}from"./index-DIBacnQv.js";var U=({label:f,hint:i,multiple:p=!0,hasError:g,formats:b,onUploaded:x})=>{const[h,s]=n.useState(!1),l=n.useRef(null),a=n.useRef(null),m=()=>{var e;(e=l.current)==null||e.click()},D=e=>{var o;e.preventDefault(),e.stopPropagation(),(o=e.dataTransfer)!=null&&o.files&&s(!0)},j=e=>{e.preventDefault(),e.stopPropagation(),!(!a.current||a.current.contains(e.relatedTarget))&&s(!1)},d=e=>{if(!e)return;const o=Array.from(e).map(c=>{const y=Math.random().toString(36).substring(7),L=URL.createObjectURL(c);return{id:y,url:L,file:c}});x(o)},v=e=>{var t;e.preventDefault(),e.stopPropagation(),s(!1),d((t=e.dataTransfer)==null?void 0:t.files)},R=async e=>{d(e.target.files)};return r.jsxs("div",{children:[r.jsxs("button",{ref:a,type:"button",onClick:m,onDrop:v,onDragOver:e=>e.preventDefault(),onDragEnter:D,onDragLeave:j,className:O("bg-ui-bg-component border-ui-border-strong transition-fg group flex w-full flex-col items-center gap-y-2 rounded-lg border border-dashed p-8","hover:border-ui-border-interactive focus:border-ui-border-interactive","focus:shadow-borders-focus outline-none focus:border-solid",{"!border-ui-border-error":g,"!border-ui-border-interactive":h}),children:[r.jsxs("div",{className:"text-ui-fg-subtle group-disabled:text-ui-fg-disabled flex items-center gap-x-2",children:[r.jsx(T,{}),r.jsx(u,{children:f})]}),!!i&&r.jsx(u,{size:"small",leading:"compact",className:"text-ui-fg-muted group-disabled:text-ui-fg-disabled",children:i})]}),r.jsx("input",{hidden:!0,ref:l,onChange:R,type:"file",accept:b.join(","),multiple:p})]})};export{U as F};
