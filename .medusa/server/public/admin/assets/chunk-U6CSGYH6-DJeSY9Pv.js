import{u as b}from"./chunk-C76H5USB-BdXJwsWt.js";import{b as y,bf as m,bg as g,J as h}from"./index-CMquYl3T.js";var v="id,title,handle,status,*collection,*sales_channels,variants.id",F=({prefix:t,pageSize:s=20})=>{const r=b(["offset","order","q","created_at","updated_at","sales_channel_id","category_id","collection_id","is_giftcard","tag_id","type_id","status","id"],t),{offset:d,sales_channel_id:o,created_at:n,updated_at:u,category_id:i,collection_id:e,tag_id:c,type_id:p,is_giftcard:l,status:a,order:f,q:_}=r;return{searchParams:{limit:s,offset:d?Number(d):0,sales_channel_id:o==null?void 0:o.split(","),created_at:n?JSON.parse(n):void 0,updated_at:u?JSON.parse(u):void 0,category_id:i==null?void 0:i.split(","),collection_id:e==null?void 0:e.split(","),is_giftcard:l?l==="true":void 0,order:f,tag_id:c?c.split(","):void 0,type_id:p==null?void 0:p.split(","),status:a==null?void 0:a.split(","),q:_,fields:v},raw:r}},T=t=>{const{t:s}=y(),r=t==null?void 0:t.includes("product_types"),{product_types:d}=m({limit:1e3,offset:0},{enabled:!r}),o=t==null?void 0:t.includes("product_tags"),{product_tags:n}=g({limit:1e3,offset:0}),u=t==null?void 0:t.includes("sales_channel_id"),{sales_channels:i}=h({limit:1e3,fields:"id,name"},{enabled:!u});t==null||t.includes("categories"),t==null||t.includes("collections");let e=[];if(d&&!r){const l={key:"type_id",label:s("fields.type"),type:"select",multiple:!0,options:d.map(a=>({label:a.value,value:a.id}))};e=[...e,l]}if(n&&!o){const l={key:"tag_id",label:s("fields.tag"),type:"select",multiple:!0,options:n.map(a=>({label:a.value,value:a.id}))};e=[...e,l]}if(i){const l={key:"sales_channel_id",label:s("fields.salesChannel"),type:"select",multiple:!0,options:i.map(a=>({label:a.name,value:a.id}))};e=[...e,l]}const c={key:"status",label:s("fields.status"),type:"select",multiple:!0,options:[{label:s("products.productStatus.draft"),value:"draft"},{label:s("products.productStatus.proposed"),value:"proposed"},{label:s("products.productStatus.published"),value:"published"},{label:s("products.productStatus.rejected"),value:"rejected"}]},p=[{label:s("fields.createdAt"),key:"created_at"},{label:s("fields.updatedAt"),key:"updated_at"}].map(l=>({key:l.key,label:l.label,type:"date"}));return e=[...e,c,...p],e};export{T as a,F as u};
