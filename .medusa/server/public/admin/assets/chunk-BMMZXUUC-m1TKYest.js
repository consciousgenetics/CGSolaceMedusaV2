import{u}from"./chunk-DV5RB7II-CbVZVKEm.js";import{b as o,j as e,T as t,m}from"./index-DIBacnQv.js";var p=({startsAt:s,endsAt:l,showTime:a=!1})=>{const n=s?new Date(s):null,i=l?new Date(l):null,{t:r}=o(),{getFullDate:d}=u();return e.jsxs("div",{className:"grid gap-3 md:grid-cols-2",children:[e.jsxs("div",{className:"shadow-elevation-card-rest bg-ui-bg-component text-ui-fg-subtle flex items-center gap-x-3 rounded-md px-3 py-1.5",children:[e.jsx(c,{date:n}),e.jsxs("div",{children:[e.jsx(t,{weight:"plus",size:"small",children:r("fields.startDate")}),e.jsx(t,{size:"small",className:"tabular-nums",children:n?d({date:n,includeTime:a}):"-"})]})]}),e.jsxs("div",{className:"shadow-elevation-card-rest bg-ui-bg-component text-ui-fg-subtle flex items-center gap-x-3 rounded-md px-3 py-1.5",children:[e.jsx(c,{date:i}),e.jsxs("div",{children:[e.jsx(t,{size:"small",weight:"plus",children:r("fields.endDate")}),e.jsx(t,{size:"small",className:"tabular-nums",children:i?d({date:i,includeTime:a}):"-"})]})]})]})},c=({date:s})=>{const a=s&&s>new Date;return e.jsx("div",{className:m("bg-ui-tag-neutral-icon h-8 w-1 rounded-full",{"bg-ui-tag-orange-icon":a})})};export{p as D};
