import{a as x}from"./chunk-WYX5PIA3-CxJlsxoY.js";import{T as p,a as b}from"./chunk-MSDRGCRR-DaBEiFJy.js";import{P as h}from"./chunk-P3UUX2T6-DZIRbW4U.js";import{b as c,r as j,j as a,a as T,da as w,k as y,H as _,L as N,B as P,dl as D,A as S,t as g}from"./index-DIBacnQv.js";import{c as v}from"./index-Dm7vz1c8.js";import{u as H,_ as k}from"./chunk-X3LH6P65-CuOHUr1J.js";import"./lodash-PHt2tz0a.js";import{u as A}from"./chunk-C76H5USB-lBXwGVgG.js";import"./chunk-TMAS4ILY-BsjY-zeo.js";import{S as E}from"./chunk-2RQLKDBF-TEW8jZCy.js";import{u as q}from"./use-prompt-DC8heNFH.js";import{P as L}from"./pencil-square-CcENMOri.js";import{T as O}from"./trash-B2ZMeBqG.js";import{C as z}from"./container-7gTgkh6-.js";import"./chunk-DV5RB7II-CbVZVKEm.js";import"./format-DMijeSkG.js";import"./chunk-YEDAFXMB-CakAyp57.js";import"./chunk-AOFGTNG6-B3fU9i5d.js";import"./table-BPY1yxCw.js";import"./chunk-WX2SMNCD-BxINj6_l.js";import"./plus-mini-BPTFLsGM.js";import"./command-bar-B35CUgNE.js";import"./index-n1fEXBg4.js";import"./_isIndex-DKPwOz9w.js";import"./x-mark-mini-DM1cv0WP.js";import"./date-picker-DpnhxKPv.js";import"./clsx-B-dksMZM.js";import"./popover-DvWmO2RY.js";import"./triangle-left-mini-B8pNWBxT.js";import"./index-CGa0o9rK.js";import"./Trans-BO-uC1TI.js";import"./check-6bxrK_xH.js";import"./prompt-HaF8rRCy.js";var B=({prefix:e,pageSize:t=20})=>{const r=A(["offset","q","order","created_at","updated_at"],e),{offset:s,q:i,order:l,created_at:n,updated_at:m}=r;return{searchParams:{limit:t,offset:s?Number(s):0,order:l,created_at:n?JSON.parse(n):void 0,updated_at:m?JSON.parse(m):void 0,q:i},raw:r}},I=({description:e})=>e?a.jsx("div",{className:"flex h-full w-full items-center overflow-hidden",children:a.jsx("span",{className:"truncate",children:e})}):a.jsx(h,{}),M=()=>{const{t:e}=c();return a.jsx("div",{className:"flex h-full w-full items-center",children:a.jsx("span",{className:"truncate",children:e("fields.description")})})},J=({name:e})=>e?a.jsx("div",{className:"flex h-full w-full items-center overflow-hidden",children:a.jsx("span",{className:"truncate",children:e})}):a.jsx(h,{}),Q=()=>{const{t:e}=c();return a.jsx("div",{className:"flex h-full w-full items-center",children:a.jsx("span",{className:"truncate",children:e("fields.name")})})},o=v(),R=()=>{const{t:e}=c();return j.useMemo(()=>[o.accessor("name",{header:()=>a.jsx(Q,{}),cell:({getValue:t})=>a.jsx(J,{name:t()})}),o.accessor("description",{header:()=>a.jsx(M,{}),cell:({getValue:t})=>a.jsx(I,{description:t()})}),o.accessor("campaign_identifier",{header:()=>a.jsx(p,{text:e("campaigns.fields.identifier")}),cell:({getValue:t})=>{const r=t();return a.jsx(b,{text:r})}}),o.accessor("starts_at",{header:()=>a.jsx(p,{text:e("campaigns.fields.start_date")}),cell:({getValue:t})=>{const r=t();if(!r)return;const s=new Date(r);return a.jsx(x,{date:s})}}),o.accessor("ends_at",{header:()=>a.jsx(p,{text:e("campaigns.fields.end_date")}),cell:({getValue:t})=>{const r=t();if(!r)return;const s=new Date(r);return a.jsx(x,{date:s})}})],[e])},f=20,W=()=>{const{t:e}=c(),{raw:t,searchParams:r}=B({pageSize:f}),{campaigns:s,count:i,isPending:l,isError:n,error:m}=w(r,{placeholderData:y}),d=Y(),{table:C}=H({data:s??[],columns:d,count:i,enablePagination:!0,getRowId:u=>u.id,pageSize:f});if(n)throw m;return a.jsxs(z,{className:"divide-y p-0",children:[a.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[a.jsx(_,{level:"h2",children:e("campaigns.domain")}),a.jsx(N,{to:"/campaigns/create",children:a.jsx(P,{size:"small",variant:"secondary",children:e("actions.create")})})]}),a.jsx(k,{table:C,columns:d,count:i,pageSize:f,pagination:!0,search:!0,navigateTo:u=>u.id,isLoading:l,queryObject:t,orderBy:[{key:"name",label:e("fields.name")},{key:"created_at",label:e("fields.createdAt")},{key:"updated_at",label:e("fields.updatedAt")}]})]})},$=({campaign:e})=>{const{t}=c(),r=q(),{mutateAsync:s}=D(e.id),i=async()=>{await r({title:t("general.areYouSure"),description:t("campaigns.deleteCampaignWarning",{name:e.name}),verificationInstruction:t("general.typeToConfirm"),verificationText:e.name,confirmText:t("actions.delete"),cancelText:t("actions.cancel")})&&await s(void 0,{onSuccess:()=>{g.success(t("campaigns.delete.successToast",{name:e.name}))},onError:n=>{g.error(n.message)}})};return a.jsx(S,{groups:[{actions:[{icon:a.jsx(L,{}),label:t("actions.edit"),to:`/campaigns/${e.id}/edit`}]},{actions:[{icon:a.jsx(O,{}),label:t("actions.delete"),onClick:i}]}]})},G=v(),Y=()=>{const e=R();return j.useMemo(()=>[...e,G.display({id:"actions",cell:({row:t})=>a.jsx($,{campaign:t.original})})],[e])},Pe=()=>{const{getWidgets:e}=T();return a.jsx(E,{widgets:{after:e("campaign.list.after"),before:e("campaign.list.before")},hasOutlet:!0,children:a.jsx(W,{})})};export{Pe as Component};
