import{C as q,b as A,u as ie,S as se,a as re}from"./chunk-X4NONLSC-BGjiFupm.js";import{S as ne,C as V}from"./chunk-PYIO3TDQ-D8Zv8hXV.js";import{f as oe}from"./chunk-IR5DHEKS-aVJcUHa1.js";import{u as H}from"./chunk-6CNRNROJ-CjTed3-P.js";import{C as G}from"./chunk-3LLQ6F7F-DGG3HbNF.js";import{D as te}from"./chunk-GE4APTT2-D78rH_tY.js";import{a6 as a,R as ae,a0 as ce,a_ as le,ar as W,j as e,r as O,b as Q,a8 as pe,a9 as de,v as U,eC as ue,t as Z,B as K,s as J,H as me,T as he,w as n,x as ge,D as fe,g as xe,i as _e,l as je}from"./index-DIBacnQv.js";import{b as be}from"./chunk-BF3VCHXD-tFkU-SCC.js";import{S as ye}from"./chunk-CBJWO6K6-0MUayxBn.js";import{c as M}from"./chunk-6GU6IDUA-CDc7wW5L.js";import{K as Ce}from"./chunk-6HTZNHPT-DAb7JPK7.js";import{R as w,u as X,a as Se,S as ve}from"./chunk-JGQGO74V-Dqr_xQiI.js";import{P}from"./progress-tabs-DX0vEGwi.js";import{R as B}from"./radio-group-DUCr6uw1.js";import{S as N}from"./select-BlHfW7LE.js";import"./chunk-PDWBYQOW-BedvhUOI.js";import"./chunk-MWVM4TYO-bKUcYSnf.js";import"./index.esm-DQOIeFzl.js";import"./x-mark-mini-DM1cv0WP.js";import"./Trans-BO-uC1TI.js";import"./currency-input-CzBQo2cL.js";import"./triangles-mini-DxIV-8bt.js";import"./plus-mini-BPTFLsGM.js";import"./_isIndex-DKPwOz9w.js";import"./index-Dm7vz1c8.js";import"./checkbox-DbvaBbDr.js";import"./prompt-HaF8rRCy.js";import"./index-CGa0o9rK.js";import"./check-6bxrK_xH.js";var Oe=({form:l,isReturn:g=!1,zone:j,locationId:y,fulfillmentProviderOptions:m,selectedProviderId:_,type:b})=>{const{t}=Q(),d=b==="pickup",u=H({queryFn:i=>J.admin.shippingProfile.list(i),queryKey:["shipping_profiles"],getOptions:i=>i.shipping_profiles.map(o=>({label:o.name,value:o.id}))}),s=H({queryFn:i=>J.admin.fulfillmentProvider.list({...i,stock_location_id:y}),queryKey:["fulfillment_providers"],getOptions:i=>i.fulfillment_providers.map(o=>({label:oe(o.id),value:o.id}))});return e.jsx("div",{className:"flex flex-1 flex-col items-center overflow-y-auto",children:e.jsxs("div",{className:"flex w-full max-w-[720px] flex-col gap-y-8 px-6 py-16",children:[e.jsxs("div",{children:[e.jsx(me,{children:t(`stockLocations.shippingOptions.create.${d?"pickup":g?"returns":"shipping"}.header`,{zone:j.name})}),e.jsx(he,{size:"small",className:"text-ui-fg-subtle",children:t(`stockLocations.shippingOptions.create.${g?"returns":d?"pickup":"shipping"}.hint`)})]}),!d&&e.jsx(n.Field,{control:l.control,name:"price_type",render:({field:i})=>e.jsxs(n.Item,{children:[e.jsx(n.Label,{children:t("stockLocations.shippingOptions.fields.priceType.label")}),e.jsx(n.Control,{children:e.jsxs(B,{className:"grid grid-cols-1 gap-4 md:grid-cols-2",...i,onValueChange:i.onChange,children:[e.jsx(B.ChoiceBox,{className:"flex-1",value:"flat",label:t("stockLocations.shippingOptions.fields.priceType.options.fixed.label"),description:t("stockLocations.shippingOptions.fields.priceType.options.fixed.hint")}),e.jsx(B.ChoiceBox,{className:"flex-1",value:"calculated",label:t("stockLocations.shippingOptions.fields.priceType.options.calculated.label"),description:t("stockLocations.shippingOptions.fields.priceType.options.calculated.hint")})]})}),e.jsx(n.ErrorMessage,{})]})}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",children:[e.jsx(n.Field,{control:l.control,name:"name",render:({field:i})=>e.jsxs(n.Item,{children:[e.jsx(n.Label,{children:t("fields.name")}),e.jsx(n.Control,{children:e.jsx(ge,{...i})}),e.jsx(n.ErrorMessage,{})]})}),e.jsx(n.Field,{control:l.control,name:"shipping_profile_id",render:({field:i})=>e.jsxs(n.Item,{children:[e.jsx(n.Label,{children:t("stockLocations.shippingOptions.fields.profile")}),e.jsx(n.Control,{children:e.jsx(G,{...i,options:u.options,searchValue:u.searchValue,onSearchValueChange:u.onSearchValueChange,disabled:u.disabled})}),e.jsx(n.ErrorMessage,{})]})})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",children:[e.jsx(n.Field,{control:l.control,name:"provider_id",render:({field:i})=>e.jsxs(n.Item,{children:[e.jsx(n.Label,{tooltip:t("stockLocations.fulfillmentProviders.shippingOptionsTooltip"),children:t("stockLocations.shippingOptions.fields.provider")}),e.jsx(n.Control,{children:e.jsx(G,{...i,onChange:o=>{i.onChange(o),l.setValue("fulfillment_option_id","")},options:s.options,searchValue:s.searchValue,onSearchValueChange:s.onSearchValueChange,disabled:s.disabled})}),e.jsx(n.ErrorMessage,{})]})}),e.jsx(n.Field,{control:l.control,name:"fulfillment_option_id",render:({field:i})=>e.jsxs(n.Item,{children:[e.jsx(n.Label,{children:t("stockLocations.shippingOptions.fields.fulfillmentOption")}),e.jsx(n.Control,{children:O.createElement(N,{...i,onValueChange:i.onChange,disabled:!_,key:_},e.jsx(N.Trigger,{ref:i.ref,children:e.jsx(N.Value,{})}),e.jsx(N.Content,{children:m==null?void 0:m.filter(o=>!!o.is_return===g).map(o=>e.jsx(N.Item,{value:o.id,children:o.name||o.id},o.id))}))}),e.jsx(n.ErrorMessage,{})]})})]}),e.jsx(fe,{}),e.jsx(ye,{control:l.control,name:"enabled_in_store",label:t("stockLocations.shippingOptions.fields.enableInStore.label"),description:t("stockLocations.shippingOptions.fields.enableInStore.hint")})]})})},Pe=({form:l,type:g})=>{const j=g==="pickup",{getIsOpen:y,setIsOpen:m}=Se(),[_,b]=O.useState(null),t=c=>{m(V,!0),b(c)},d=()=>{m(V,!1),b(null)},{store:u,isLoading:s,isError:i,error:o}=xe(),f=O.useMemo(()=>{var c;return((c=u==null?void 0:u.supported_currencies)==null?void 0:c.map(S=>S.currency_code))||[]},[u]),{regions:x,isLoading:T,isError:F,error:L}=_e({fields:"id,name,currency_code",limit:999}),{price_preferences:z}=je({}),{setCloseOnEscape:R}=X(),I=U({control:l.control,name:"name"}),D=ie({name:I,currencies:f,regions:x,pricePreferences:z}),r=s||!u||T||!x,C=O.useMemo(()=>[[...f||[],...x||[]]],[f,x]);if(O.useEffect(()=>{!r&&j&&(f.length>0&&f.forEach(c=>{l.setValue(`currency_prices.${c}`,"0")}),x.length>0&&x.forEach(c=>{l.setValue(`region_prices.${c.id}`,"0")}))},[r,j]),i)throw o;if(F)throw L;return e.jsx(ve,{id:V,onOpenChangeCallback:c=>{c||b(null)},children:e.jsx(se,{onOpenConditionalPricesModal:t,onCloseConditionalPricesModal:d,children:e.jsxs("div",{className:"flex size-full flex-col divide-y overflow-hidden",children:[e.jsx(te,{isLoading:r,data:C,columns:D,state:l,onEditingChange:c=>R(!c),disableInteractions:y(V)}),_&&e.jsx(re,{info:_,variant:"create"})]})})})},Y=a.object({name:a.string().min(1),price_type:a.nativeEnum(ne),enabled_in_store:a.boolean(),shipping_profile_id:a.string().min(1),provider_id:a.string().min(1),fulfillment_option_id:a.string().min(1)}),we=a.object({conditional_region_prices:a.record(a.string(),a.array(q).optional()),conditional_currency_prices:a.record(a.string(),a.array(q).optional())}),Le=a.object({region_prices:a.record(a.string(),a.string().optional()),currency_prices:a.record(a.string(),a.string().optional())}).merge(Y).merge(we);function Ee({zone:l,isReturn:g,locationId:j,type:y}){var I,D;const[m,_]=O.useState("details"),[b,t]=O.useState(!1),{t:d}=Q(),{handleSuccess:u}=X(),s=pe({defaultValues:{name:"",price_type:"flat",enabled_in_store:!0,shipping_profile_id:"",provider_id:"",fulfillment_option_id:"",region_prices:{},currency_prices:{},conditional_region_prices:{},conditional_currency_prices:{}},resolver:de(Le)}),i=U({control:s.control,name:"provider_id"}),{fulfillment_options:o}=ue(i,{enabled:!!i}),f=s.watch("price_type")==="calculated",{mutateAsync:x,isPending:T}=be(),F=s.handleSubmit(async r=>{const C=Object.entries(r.currency_prices).map(([p,h])=>{if(h)return{currency_code:p,amount:M(h)}}).filter(p=>!!p),c=Object.entries(r.region_prices).map(([p,h])=>{if(h)return{region_id:p,amount:M(h)}}).filter(p=>!!p),S=Object.entries(r.conditional_region_prices).flatMap(([p,h])=>{const v=(h==null?void 0:h.map(k=>({region_id:p,amount:M(k.amount),rules:A(k)})))||[];return v==null?void 0:v.filter(Boolean)}),E=Object.entries(r.conditional_currency_prices).flatMap(([p,h])=>{const v=(h==null?void 0:h.map(k=>({currency_code:p,amount:M(k.amount),rules:A(k)})))||[];return v==null?void 0:v.filter(Boolean)}),$=[...C,...E,...c,...S],ee=o==null?void 0:o.find(p=>p.id===r.fulfillment_option_id);await x({name:r.name,price_type:r.price_type,service_zone_id:l.id,shipping_profile_id:r.shipping_profile_id,provider_id:r.provider_id,prices:$,data:ee,rules:[{value:g?"true":"false",attribute:"is_return",operator:"eq"},{value:r.enabled_in_store?"true":"false",attribute:"enabled_in_store",operator:"eq"}],type:{label:"Type label",description:"Type description",code:"type-code"}},{onSuccess:({shipping_option:p})=>{Z.success(d(`stockLocations.shippingOptions.create.${g?"returns":"shipping"}.successToast`,{name:p.name})),u(`/settings/locations/${j}`)},onError:p=>{Z.error(p.message)}})}),L=r=>{if(r==="pricing"){s.clearErrors();const C=Y.safeParse({...s.getValues()});if(!C.success){const[c,...S]=C.error.errors;for(const E of S){const $=E.path.join(".");s.setError($,{message:E.message,type:E.code})}s.setError(c.path.join("."),{message:c.message,type:c.code},{shouldFocus:!0}),t(!1);return}t(!0)}_(r)},z=(I=s.getFieldState("currency_prices"))!=null&&I.isDirty||(D=s.getFieldState("region_prices"))!=null&&D.isDirty||m==="pricing"?"in-progress":"not-started",R=b?"completed":"in-progress";return e.jsx(w.Form,{form:s,children:e.jsx(Ce,{className:"flex h-full flex-col",onSubmit:F,onKeyDown:r=>{const C=r.key==="Enter",c=r.metaKey||r.ctrlKey,S=m!=="pricing"&&!f;if(C&&(r.preventDefault(),!!c)){if(S){r.stopPropagation(),L("pricing");return}F()}},children:e.jsxs(P,{value:m,className:"flex h-full flex-col overflow-hidden",onValueChange:r=>L(r),children:[e.jsx(w.Header,{children:e.jsxs(P.List,{className:"border-ui-border-base -my-2 ml-2 min-w-0 flex-1 border-l",children:[e.jsx(P.Trigger,{value:"details",status:R,className:"w-full max-w-[200px]",children:e.jsx("span",{className:"w-full cursor-auto overflow-hidden text-ellipsis whitespace-nowrap",children:d("stockLocations.shippingOptions.create.tabs.details")})}),!f&&e.jsx(P.Trigger,{value:"pricing",status:z,className:"w-full max-w-[200px]",children:e.jsx("span",{className:"w-full overflow-hidden text-ellipsis whitespace-nowrap",children:d("stockLocations.shippingOptions.create.tabs.prices")})})]})}),e.jsxs(w.Body,{className:"size-full overflow-hidden",children:[e.jsx(P.Content,{value:"details",className:"size-full overflow-y-auto",children:e.jsx(Oe,{form:s,zone:l,isReturn:g,type:y,locationId:j,fulfillmentProviderOptions:o||[],selectedProviderId:i})}),e.jsx(P.Content,{value:"pricing",className:"size-full",children:e.jsx(Pe,{form:s,type:y})})]}),e.jsx(w.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(w.Close,{asChild:!0,children:e.jsx(K,{variant:"secondary",size:"small",children:d("actions.cancel")})}),m==="pricing"||f?e.jsx(K,{size:"small",className:"whitespace-nowrap",isLoading:T,type:"submit",children:d("actions.save")},"submit-btn"):e.jsx(K,{size:"small",className:"whitespace-nowrap",isLoading:T,onClick:()=>L("pricing"),type:"button",children:d("actions.continue")},"continue-btn")]})})]})})})}var ke="*fulfillment_sets,*fulfillment_sets.service_zones,*fulfillment_sets.service_zones.shipping_options";function ti(){var o,f;const{location_id:l,fset_id:g,zone_id:j}=ae(),[y]=ce(),m=y.has("is_return"),{stock_location:_,isPending:b,isFetching:t,isError:d,error:u}=le(l,{fields:ke}),s=(o=_==null?void 0:_.fulfillment_sets)==null?void 0:o.find(x=>x.id===g);if(!b&&!t&&!s)throw W({message:`Fulfillment set with ID ${g} was not found`},404);const i=(f=s==null?void 0:s.service_zones)==null?void 0:f.find(x=>x.id===j);if(!b&&!t&&!i)throw W({message:`Service zone with ID ${j} was not found`},404);if(d)throw u;return e.jsx(w,{prev:`/settings/locations/${l}`,children:i&&e.jsx(Ee,{zone:i,isReturn:m,locationId:l,type:s.type})})}export{ti as Component};
