import{c as i}from"./chunk-6GU6IDUA-CDc7wW5L.js";import{a6 as r,an as o}from"./index-DIBacnQv.js";var p=r.union([r.string(),r.number()]).optional().refine(e=>e===""||e===void 0?!0:Number.isInteger(i(e)),{message:o.t("validation.mustBeInt")}).refine(e=>e===""||e===void 0?!0:i(e)>=0,{message:o.t("validation.mustBePositive")}),c=r.union([r.string(),r.number()]).optional().refine(e=>e===""||e===void 0?!0:i(e)>=0,{message:o.t("validation.mustBePositive")});r.array(r.object({key:r.string(),value:r.unknown(),isInitial:r.boolean().optional(),isDeleted:r.boolean().optional(),isIgnored:r.boolean().optional()}));function g(e,a,u){e.clearErrors(a);const l=a.reduce((n,t)=>(n[t]=e.getValues(t),n),{}),s=u.safeParse(l);return s.success?!0:(s.error.errors.forEach(({path:n,message:t,code:d})=>{e.setError(n.join("."),{type:d,message:t})}),!1)}export{c as a,p as o,g as p};
