import{u as b}from"./chunk-XWO5BP42-BDb6zuiM.js";import{a as g,j as t,b as m,dr as j,k as C,H as h,T,L as y,B as v,r as k,ds as w,A as P}from"./index-CMquYl3T.js";import{u as S,_ as A}from"./chunk-X3LH6P65-CZbKG1Vd.js";import"./lodash-DmOxPbQm.js";import{u as D}from"./chunk-EMNHBSFU-B71BFDWg.js";import{u as _}from"./chunk-GW6TVOAA-CwyrnE4z.js";import"./chunk-TMAS4ILY-CVpDEbRj.js";import{S as E}from"./chunk-2RQLKDBF-BPnRXTye.js";import{u as z}from"./use-prompt-BeKr1Vgs.js";import{P as L}from"./pencil-square-DXHIVjIt.js";import{T as H}from"./trash-DnTthMMY.js";import{C as B}from"./container-2yPQYTKd.js";import{c as I}from"./index-DjlpDhrk.js";import"./chunk-MSDRGCRR-1sZcBoQ6.js";import"./chunk-P3UUX2T6-DSrinnpG.js";import"./chunk-YEDAFXMB-CjWsU7_5.js";import"./chunk-AOFGTNG6-Bt8UKVnN.js";import"./table-0Zn9HLeV.js";import"./chunk-WX2SMNCD-DTYaks6U.js";import"./plus-mini-6wYRjZFG.js";import"./command-bar-BxS-yusB.js";import"./index-D6p17UlJ.js";import"./chunk-C76H5USB-BdXJwsWt.js";import"./chunk-W7625H47-DgemhH3v.js";import"./chunk-DV5RB7II-BeCML-tP.js";import"./format-ClAAOws9.js";import"./_isIndex-BuTFrvAV.js";import"./x-mark-mini-DSqtVCFj.js";import"./date-picker-CVHe40oy.js";import"./clsx-B-dksMZM.js";import"./popover-BCc5T8_7.js";import"./triangle-left-mini-BruUy0v2.js";import"./index-Ddr0DIQF.js";import"./Trans-D_xESVC1.js";import"./check-CtIpGCHx.js";import"./prompt-C_aL4Bp7.js";var N=({collection:e})=>{const{t:o}=m(),r=z(),{mutateAsync:s}=w(e.id),i=async()=>{await r({title:o("general.areYouSure"),description:o("collections.deleteWarning",{title:e.title}),verificationText:e.title,verificationInstruction:o("general.typeToConfirm"),confirmText:o("actions.delete"),cancelText:o("actions.cancel")})&&await s()};return t.jsx(P,{groups:[{actions:[{label:o("actions.edit"),to:`/collections/${e.id}/edit`,icon:t.jsx(L,{})}]},{actions:[{label:o("actions.delete"),onClick:i,icon:t.jsx(H,{}),disabled:!e.id}]}]})},l=20,R=()=>{const{t:e}=m(),{searchParams:o,raw:r}=D({pageSize:l}),{collections:s,count:i,isError:n,error:p,isLoading:d}=j({...o,fields:"+products.id"},{placeholderData:C}),u=_(),c=q(),{table:f}=S({data:s??[],columns:c,count:i,enablePagination:!0,getRowId:(a,x)=>a.id??`${x}`,pageSize:l});if(n)throw p;return t.jsxs(B,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsxs("div",{children:[t.jsx(h,{children:e("collections.domain")}),t.jsx(T,{className:"text-ui-fg-subtle",size:"small",children:e("collections.subtitle")})]}),t.jsx(y,{to:"/collections/create",children:t.jsx(v,{size:"small",variant:"secondary",children:e("actions.create")})})]}),t.jsx(A,{table:f,columns:c,pageSize:l,count:i,filters:u,orderBy:[{key:"title",label:e("fields.title")},{key:"handle",label:e("fields.handle")},{key:"created_at",label:e("fields.createdAt")},{key:"updated_at",label:e("fields.updatedAt")}],search:!0,navigateTo:a=>`/collections/${a.original.id}`,queryObject:r,isLoading:d})]})},$=I(),q=()=>{const e=b();return k.useMemo(()=>[...e,$.display({id:"actions",cell:({row:o})=>t.jsx(N,{collection:o.original})})],[e])},ve=()=>{const{getWidgets:e}=g();return t.jsx(E,{widgets:{after:e("product_collection.list.after"),before:e("product_collection.list.before")},children:t.jsx(R,{})})};export{ve as Component};
