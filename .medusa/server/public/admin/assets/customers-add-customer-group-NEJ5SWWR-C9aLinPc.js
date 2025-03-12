import{u as F,a as z,b as B}from"./chunk-ZJRFL6ZN-CjndWj27.js";import{a2 as I,ad as D,a4 as H,R as M,j as e,b as j,r as p,dL as L,a8 as N,a9 as O,dC as V,t as S,E as K,B as x,V as $}from"./index-DIBacnQv.js";import{u as q,_ as Q}from"./chunk-X3LH6P65-CuOHUr1J.js";import"./lodash-PHt2tz0a.js";import"./chunk-TMAS4ILY-BsjY-zeo.js";import{K as Z}from"./chunk-6HTZNHPT-DAb7JPK7.js";import{R as c,u as J}from"./chunk-JGQGO74V-Dqr_xQiI.js";import{C as b}from"./checkbox-DbvaBbDr.js";import{c as U}from"./index-Dm7vz1c8.js";import"./chunk-C76H5USB-lBXwGVgG.js";import"./chunk-MSDRGCRR-DaBEiFJy.js";import"./chunk-P3UUX2T6-DZIRbW4U.js";import"./chunk-YEDAFXMB-CakAyp57.js";import"./chunk-AOFGTNG6-B3fU9i5d.js";import"./table-BPY1yxCw.js";import"./chunk-WX2SMNCD-BxINj6_l.js";import"./plus-mini-BPTFLsGM.js";import"./command-bar-B35CUgNE.js";import"./index-n1fEXBg4.js";import"./chunk-DV5RB7II-CbVZVKEm.js";import"./format-DMijeSkG.js";import"./_isIndex-DKPwOz9w.js";import"./x-mark-mini-DM1cv0WP.js";import"./date-picker-DpnhxKPv.js";import"./clsx-B-dksMZM.js";import"./popover-DvWmO2RY.js";import"./triangle-left-mini-B8pNWBxT.js";import"./index-CGa0o9rK.js";import"./prompt-HaF8rRCy.js";var W=I({customer_group_ids:D(H()).min(1)}),g=10,X=({customerId:a})=>{const{t:o}=j(),{handleSuccess:f}=J(),[r,i]=p.useState(!1),{mutateAsync:h}=L(a),u=N({defaultValues:{customer_group_ids:[]},resolver:O(W)}),{setValue:n}=u,[l,_]=p.useState({});p.useEffect(()=>{n("customer_group_ids",Object.keys(l).filter(t=>l[t]),{shouldDirty:!0,shouldTouch:!0})},[l,n]);const{searchParams:v,raw:R}=F({pageSize:g}),T=z(),{customer_groups:d,count:y,isPending:P,isError:k,error:w}=V({fields:"*customers",...v}),A=t=>{const s=typeof t=="function"?t(l):t,m=Object.keys(s);n("customer_group_ids",m,{shouldDirty:!0,shouldTouch:!0}),_(s)},C=ee(),{table:G}=q({data:d??[],columns:C,count:y,enablePagination:!0,enableRowSelection:t=>{var s;return!((s=t.original.customers)!=null&&s.map(m=>m.id).includes(a))},getRowId:t=>t.id,pageSize:g,rowSelection:{state:l,updater:A}}),E=u.handleSubmit(async t=>{i(!0);try{await h({add:t.customer_group_ids}),S.success(o("customers.groups.add.success",{groups:t.customer_group_ids.map(s=>d==null?void 0:d.find(m=>m.id===s)).filter(Boolean).map(s=>s==null?void 0:s.name)})),f(`/customers/${a}`)}catch(s){S.error(s.message)}finally{i(!1)}});if(k)throw w;return e.jsx(c.Form,{form:u,children:e.jsxs(Z,{className:"flex h-full flex-col overflow-hidden",onSubmit:E,children:[e.jsx(c.Header,{children:e.jsx("div",{className:"flex items-center justify-end gap-x-2",children:u.formState.errors.customer_group_ids&&e.jsx(K,{variant:"error",children:u.formState.errors.customer_group_ids.message})})}),e.jsx(c.Body,{className:"size-full overflow-hidden",children:e.jsx(Q,{table:G,columns:C,pageSize:g,count:y,filters:T,orderBy:[{key:"name",label:o("fields.name")},{key:"created_at",label:o("fields.createdAt")},{key:"updated_at",label:o("fields.updatedAt")}],isLoading:P,layout:"fill",search:"autofocus",queryObject:R,noRecords:{message:o("customers.groups.add.list.noRecordsMessage")}})}),e.jsxs(c.Footer,{children:[e.jsx(c.Close,{asChild:!0,children:e.jsx(x,{variant:"secondary",size:"small",children:o("actions.cancel")})}),e.jsx(x,{type:"submit",variant:"primary",size:"small",isLoading:r,children:o("actions.save")})]})]})})},Y=U(),ee=()=>{const{t:a}=j(),o=B();return p.useMemo(()=>[Y.display({id:"select",header:({table:r})=>e.jsx(b,{checked:r.getIsSomePageRowsSelected()?"indeterminate":r.getIsAllPageRowsSelected(),onCheckedChange:i=>r.toggleAllPageRowsSelected(!!i)}),cell:({row:r})=>{const i=!r.getCanSelect(),h=r.getIsSelected()||i,u=e.jsx(b,{checked:h,disabled:i,onCheckedChange:n=>r.toggleSelected(!!n),onClick:n=>{n.stopPropagation()}});return i?e.jsx($,{content:a("customers.groups.alreadyAddedTooltip"),side:"right",children:u}):u}}),...o],[a,o])},Ae=()=>{const{id:a}=M();return e.jsx(c,{children:e.jsx(X,{customerId:a})})};export{Ae as Component};
