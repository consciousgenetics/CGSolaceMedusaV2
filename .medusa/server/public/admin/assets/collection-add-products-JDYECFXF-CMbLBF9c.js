import{u as _}from"./chunk-G3QXMPRB-DyqD97OV.js";import{a2 as z,ad as D,a4 as B,R as H,du as M,j as e,b as S,a8 as L,a9 as N,dw as O,r as f,e as V,k as K,t as y,E as q,B as b,V as G}from"./index-CMquYl3T.js";import{u as Q,_ as U}from"./chunk-X3LH6P65-CZbKG1Vd.js";import"./lodash-DmOxPbQm.js";import{u as X,a as Z}from"./chunk-U6CSGYH6-DJeSY9Pv.js";import"./chunk-TMAS4ILY-CVpDEbRj.js";import{K as $}from"./chunk-6HTZNHPT-L-2RZl81.js";import{R as u,u as J}from"./chunk-JGQGO74V-Duan6PnE.js";import{C as j}from"./checkbox-CKopA8ZP.js";import{c as W}from"./index-DjlpDhrk.js";import"./chunk-IQBAUTU5-DvBI6WBZ.js";import"./chunk-ADOCJB6L-DBBcrTgg.js";import"./chunk-P3UUX2T6-DSrinnpG.js";import"./chunk-YEDAFXMB-CjWsU7_5.js";import"./chunk-AOFGTNG6-Bt8UKVnN.js";import"./table-0Zn9HLeV.js";import"./chunk-WX2SMNCD-DTYaks6U.js";import"./plus-mini-6wYRjZFG.js";import"./command-bar-BxS-yusB.js";import"./index-D6p17UlJ.js";import"./chunk-C76H5USB-BdXJwsWt.js";import"./chunk-DV5RB7II-BeCML-tP.js";import"./format-ClAAOws9.js";import"./_isIndex-BuTFrvAV.js";import"./x-mark-mini-DSqtVCFj.js";import"./date-picker-CVHe40oy.js";import"./clsx-B-dksMZM.js";import"./popover-BCc5T8_7.js";import"./triangle-left-mini-BruUy0v2.js";import"./index-Ddr0DIQF.js";import"./prompt-C_aL4Bp7.js";var Y=z({add:D(B()).min(1)}),p=50,h="p",ee=({collection:i})=>{const{t}=S(),{handleSuccess:o}=J(),s=L({defaultValues:{add:[]},resolver:N(Y)}),{setValue:l}=s,{mutateAsync:d,isPending:m}=O(i.id),[a,c]=f.useState({}),C=r=>{const n=typeof r=="function"?r(a):r;l("add",Object.keys(n).filter(F=>n[F]),{shouldDirty:!0,shouldTouch:!0}),c(n)};f.useEffect(()=>{l("add",Object.keys(a).filter(r=>a[r]),{shouldDirty:!0,shouldTouch:!0})},[a,l]);const{searchParams:P,raw:v}=X({prefix:h,pageSize:p}),{products:T,count:g,isLoading:k,isError:A,error:R}=V({fields:"*variants,*sales_channels",...P},{placeholderData:K}),x=oe(),w=Z(["collections"]),{table:E}=Q({data:T??[],columns:x,count:g,pageSize:p,prefix:h,getRowId:r=>r.id,enableRowSelection:!0,rowSelection:{state:a,updater:C},enablePagination:!0,meta:{collectionId:i.id}}),I=s.handleSubmit(async r=>{await d({add:r.add},{onSuccess:()=>{y.success(t("collections.products.add.successToast",{count:r.add.length})),o()},onError:n=>{y.error(n.message)}})});if(A)throw R;return e.jsx(u.Form,{form:s,children:e.jsxs($,{onSubmit:I,className:"flex h-full flex-col overflow-hidden",children:[e.jsx(u.Header,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[s.formState.errors.add&&e.jsx(q,{variant:"error",children:s.formState.errors.add.message}),e.jsx(u.Close,{asChild:!0,children:e.jsx(b,{size:"small",variant:"secondary",children:t("actions.cancel")})}),e.jsx(b,{size:"small",type:"submit",isLoading:m,children:t("actions.save")})]})}),e.jsx(u.Body,{className:"size-full overflow-hidden",children:e.jsx(U,{table:E,columns:x,pageSize:p,count:g,queryObject:v,filters:w,orderBy:[{key:"title",label:t("fields.title")},{key:"created_at",label:t("fields.createdAt")},{key:"updated_at",label:t("fields.updatedAt")}],prefix:h,isLoading:k,layout:"fill",pagination:!0,search:"autofocus"})})]})})},te=W(),oe=()=>{const{t:i}=S(),t=_();return f.useMemo(()=>[te.display({id:"select",header:({table:o})=>e.jsx(j,{checked:o.getIsSomePageRowsSelected()?"indeterminate":o.getIsAllPageRowsSelected(),onCheckedChange:s=>o.toggleAllPageRowsSelected(!!s)}),cell:({row:o,table:s})=>{const{collectionId:l}=s.options.meta,d=o.original.collection_id===l,m=o.getIsSelected()||d,a=e.jsx(j,{checked:m,disabled:d,onCheckedChange:c=>o.toggleSelected(!!c),onClick:c=>{c.stopPropagation()}});return d?e.jsx(G,{content:i("salesChannels.productAlreadyAdded"),side:"right",children:a}):a}}),...t],[i,t])},ze=()=>{const{id:i}=H(),{collection:t,isLoading:o,isError:s,error:l}=M(i);if(s)throw l;return e.jsx(u,{children:!o&&t&&e.jsx(ee,{collection:t})})};export{ze as Component};
