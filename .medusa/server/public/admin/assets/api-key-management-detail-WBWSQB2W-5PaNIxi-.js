import{b as P,a as E,p as v}from"./chunk-G22WWLPG-C9g-VuwI.js";import{U as B}from"./chunk-IC72XMDJ-BhZccAbP.js";import{u as K,a as L,b as R,c as H}from"./chunk-UVGNHHSZ-DhBwtiGD.js";import{S as q}from"./chunk-2RQLKDBF-BPnRXTye.js";import{u as F}from"./chunk-DV5RB7II-BeCML-tP.js";import{d as Y,R as O,a as Q,f0 as A,j as e,dv as U,q as X,b as h,u as N,eX as I,eY as J,H as G,A as $,T as o,Y as j,cS as W,az as S,r as g,J as Z,f1 as D,t as m,f2 as V,s as ee,k as se}from"./index-CMquYl3T.js";import{D as ae,c as te}from"./chunk-MGPZHEOT-Bwmikx5J.js";import{u as b}from"./use-prompt-BeKr1Vgs.js";import{T as M}from"./trash-DnTthMMY.js";import{X as ne}from"./x-circle-cBUqc4z8.js";import{P as _}from"./pencil-square-DXHIVjIt.js";import{C as z}from"./container-2yPQYTKd.js";import{S as ie}from"./status-badge-xv5zxOX0.js";import{C as re}from"./copy-cf36CaJK.js";import{c as le}from"./create-data-table-command-helper-C3wntDfO.js";import"./chunk-FFVOUYTF-DBIEZKou.js";import"./chunk-C76H5USB-BdXJwsWt.js";import"./Trans-D_xESVC1.js";import"./x-mark-mini-DSqtVCFj.js";import"./check-CtIpGCHx.js";import"./format-ClAAOws9.js";import"./checkbox-CKopA8ZP.js";import"./index-DjlpDhrk.js";import"./command-bar-BxS-yusB.js";import"./index-D6p17UlJ.js";import"./table-0Zn9HLeV.js";import"./arrow-up-mini-uPya8svL.js";import"./date-picker-CVHe40oy.js";import"./clsx-B-dksMZM.js";import"./popover-BCc5T8_7.js";import"./triangle-left-mini-BruUy0v2.js";import"./prompt-C_aL4Bp7.js";var oe=({apiKey:a})=>{const{t:s}=h(),t=N(),n=b(),{getFullDate:r}=F(),{mutateAsync:l}=I(a.id),{mutateAsync:c}=J(a.id),i=async()=>{await n({title:s("general.areYouSure"),description:s("apiKeyManagement.delete.warning",{title:a.title}),confirmText:s("actions.delete"),cancelText:s("actions.cancel")})&&await c(void 0,{onSuccess:()=>{m.success(s("apiKeyManagement.delete.successToast",{title:a.title})),t("..",{replace:!0})},onError:y=>{m.error(y.message)}})},u=async()=>{await n({title:s("general.areYouSure"),description:s("apiKeyManagement.revoke.warning",{title:a.title}),confirmText:s("apiKeyManagement.actions.revoke"),cancelText:s("actions.cancel")})&&await l(void 0,{onSuccess:()=>{m.success(s("apiKeyManagement.revoke.successToast",{title:a.title}))},onError:y=>{m.error(y.message)}})},d=[{icon:e.jsx(M,{}),label:s("actions.delete"),onClick:i,disabled:!a.revoked_at}];a.revoked_at||d.unshift({icon:e.jsx(ne,{}),label:s("apiKeyManagement.actions.revoke"),onClick:u,disabled:!!a.revoked_at});const x=P(a.revoked_at,s),f=E(a.type,s);return e.jsxs(z,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsx(G,{children:a.title}),e.jsxs("div",{className:"flex items-center gap-x-4",children:[e.jsx("div",{className:"flex items-center gap-x-2",children:e.jsx(ie,{color:x.color,children:x.label})}),e.jsx($,{groups:[{actions:[{label:s("actions.edit"),icon:e.jsx(_,{}),to:"edit"}]},{actions:d}]})]})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(o,{size:"small",leading:"compact",weight:"plus",children:s("fields.key")}),a.type==="secret"?e.jsx(j,{size:"2xsmall",className:"inline-block w-fit",children:v(a.redacted)}):e.jsx(re,{asChild:!0,content:a.token,className:"cursor-pointer",children:e.jsx(j,{size:"2xsmall",className:"text-ui-tag-neutral-text",children:v(a.redacted)})})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(o,{size:"small",leading:"compact",weight:"plus",children:s("fields.type")}),e.jsx(o,{size:"small",leading:"compact",children:f.label})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(o,{size:"small",leading:"compact",weight:"plus",children:s("apiKeyManagement.fields.lastUsedAtLabel")}),e.jsx(o,{size:"small",leading:"compact",children:a.last_used_at?r({date:a.last_used_at,includeTime:!0}):"-"})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(o,{size:"small",leading:"compact",weight:"plus",children:s("apiKeyManagement.fields.createdByLabel")}),e.jsx(k,{userId:a.created_by})]}),a.revoked_at&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(o,{size:"small",leading:"compact",weight:"plus",children:s("apiKeyManagement.fields.revokedAtLabel")}),e.jsx(o,{size:"small",leading:"compact",children:r({date:a.revoked_at,includeTime:!0})})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(o,{size:"small",leading:"compact",weight:"plus",children:s("apiKeyManagement.fields.revokedByLabel")}),e.jsx(k,{userId:a.revoked_by})]})]})]})},k=({userId:a})=>{const{user:s,isLoading:t,isError:n,error:r}=W(a,void 0,{enabled:!!a});if(!a)return e.jsx(o,{size:"small",className:"text-ui-fg-subtle",children:"-"});if(n)throw r;return t?e.jsxs("div",{className:"grid grid-cols-[20px_1fr]",children:[e.jsx(S,{className:"h-5 w-5 rounded-full"}),e.jsx(S,{className:"w-full max-w-[220px]"})]}):s?e.jsx(B,{...s}):e.jsx(o,{size:"small",className:"text-ui-fg-subtle",children:"-"})},w=10,C="sc",ce=({apiKey:a})=>{const[s,t]=g.useState({}),{t:n}=h(),r=K({pageSize:w,prefix:C}),{sales_channels:l,count:c,isPending:i}=Z({...r,publishable_key_id:a.id},{placeholderData:se}),u=de(a.id),d=L(),x=ue(a.id,t),f=R();return e.jsx(z,{className:"divide-y p-0",children:e.jsx(ae,{data:l,columns:u,filters:d,commands:x,heading:n("salesChannels.domain"),getRowId:p=>p.id,rowCount:c,isLoading:i,emptyState:f,rowSelection:{state:s,onRowSelectionChange:t},rowHref:p=>`/settings/sales-channels/${p.id}`,action:{label:n("actions.add"),to:"sales-channels"},prefix:C,pageSize:w})})},T=te(),de=a=>{const{t:s}=h(),t=N(),n=b(),r=H(),{mutateAsync:l}=D(a),c=g.useCallback(async i=>{await n({title:s("general.areYouSure"),description:s("apiKeyManagement.removeSalesChannel.warning",{name:i.name}),confirmText:s("actions.delete"),cancelText:s("actions.cancel")})&&await l([i.id],{onSuccess:()=>{m.success(s("apiKeyManagement.removeSalesChannel.successToast",{count:1}))},onError:d=>{m.error(d.message)}})},[l,n,s]);return g.useMemo(()=>[T.select(),...r,T.action({actions:i=>[[{label:s("actions.edit"),icon:e.jsx(_,{}),onClick:()=>{t(`/settings/sales-channels/${i.row.original.id}/edit`)}}],[{icon:e.jsx(M,{}),label:s("actions.delete"),onClick:()=>c(i.row.original)}]]})],[r,c,t,s])},me=le(),ue=(a,s)=>{const{t}=h(),n=b(),{mutateAsync:r}=D(a),l=g.useCallback(async c=>{const i=Object.keys(c);await n({title:t("general.areYouSure"),description:t("apiKeyManagement.removeSalesChannel.warningBatch",{count:i.length}),confirmText:t("actions.continue"),cancelText:t("actions.cancel")})&&await r(i,{onSuccess:()=>{m.success(t("apiKeyManagement.removeSalesChannel.successToastBatch",{count:i.length})),s({})},onError:d=>{m.error(d.message)}})},[r,n,t,s]);return g.useMemo(()=>[me.command({action:l,label:t("actions.remove"),shortcut:"r"})],[l,t])},Xe=()=>{const a=Y(),{id:s}=O(),{getWidgets:t}=Q(),{api_key:n,isLoading:r,isError:l,error:c}=A(s,{initialData:a});if(r||!n)return e.jsx(U,{showJSON:!0,sections:1});const i=(n==null?void 0:n.type)==="publishable";if(l)throw c;return e.jsxs(q,{hasOutlet:!0,showJSON:!0,widgets:{before:t("api_key.details.before"),after:t("api_key.details.after")},data:n,children:[e.jsx(oe,{apiKey:n}),i&&e.jsx(ce,{apiKey:n})]})},Ie=a=>{const{id:s}=a.params||{},{api_key:t}=A(s,{initialData:a.data,enabled:!!s});return t?e.jsx("span",{children:t.title}):null},pe=a=>({queryKey:V.detail(a),queryFn:async()=>ee.admin.apiKey.retrieve(a)}),Je=async({params:a})=>{const s=a.id,t=pe(s);return X.ensureQueryData(t)};export{Ie as Breadcrumb,Xe as Component,Je as loader};
