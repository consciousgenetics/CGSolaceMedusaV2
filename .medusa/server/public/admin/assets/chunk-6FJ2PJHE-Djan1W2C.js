import{b as n,eR as a,t}from"./index-CMquYl3T.js";import{u}from"./use-prompt-BeKr1Vgs.js";var m=s=>{const{t:e}=n(),o=u(),{mutateAsync:r}=a(s);return async()=>{await o({title:e("general.areYouSure"),description:e("productTypes.delete.confirmation"),confirmText:e("actions.delete"),cancelText:e("actions.cancel")})&&await r(void 0,{onSuccess:()=>{t.success(e("productTypes.delete.successToast"))},onError:c=>{t.error(c.message)}})}};export{m as u};
