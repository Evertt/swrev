(()=>{var M=Object.create,p=Object.defineProperty,j=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty,A=Object.getOwnPropertyNames,V=Object.getOwnPropertyDescriptor,T=i=>p(i,"__esModule",{value:!0}),L=(i,e,t)=>{if(T(i),e&&typeof e=="object"||typeof e=="function")for(let r of A(e))!F.call(i,r)&&r!=="default"&&p(i,r,{get:()=>e[r],enumerable:!(t=V(e,r))||t.enumerable});return i},N=i=>i&&i.__esModule?i:L(p(i!=null?M(j(i)):{},"default",{value:i,enumerable:!0}),i),f=N(require("rxjs")),l=class{constructor(){this.subjects={}}listen(e,t){return this.subjects[e]||(this.subjects[e]=new f.Subject),this.subjects[e].subscribe(t)}emit(e,t){this.subjects[e]||(this.subjects[e]=new f.Subject),this.subjects[e].next(t)}dispose(){for(let e in this.subjects)this.subjects[e].complete();this.subjects={}}};var q={broadcast:!1},X={broadcast:!1},d=class{constructor({data:e,expiresAt:t=null}){this.data=e,this.expiresAt=t}isResolving(){return this.data instanceof Promise}hasExpired(){return this.expiresAt===null||this.expiresAt<new Date}expiresIn(e){return this.expiresAt=new Date,this.expiresAt.setMilliseconds(this.expiresAt.getMilliseconds()+e),this}},v=class{constructor(){this.elements=new Map;this.event=new l}resolve(e,t){Promise.resolve(t.data).then(r=>{if(r==null)return this.remove(e);t.data=r,this.broadcast(e,r)})}get(e){return this.elements.get(e)}set(e,t){this.elements.set(e,t),this.resolve(e,t)}remove(e,t){let{broadcast:r}={...q,...t};r&&this.broadcast(e,void 0),this.elements.delete(e)}clear(e){let{broadcast:t}={...X,...e};if(t)for(let r of this.elements.keys())this.broadcast(r,void 0);this.elements.clear()}has(e){return this.elements.has(e)}subscribe(e,t){return this.event.listen(e,t)}broadcast(e,t){this.event.emit(e,t)}};var H=i=>fetch(i).then(e=>{if(!e.ok)throw Error("Not a 2XX response.");return e.json()}),D={cache:new v,errors:new l,fetcher:H,initialData:void 0,loadInitialCache:!0,revalidateOnStart:!0,dedupingInterval:2e3,revalidateOnFocus:!0,focusThrottleInterval:5e3,revalidateOnReconnect:!0},R={...D,force:!1},b={revalidate:!0,revalidateOptions:{...R}},m={broadcast:!1};var z=class{constructor(e){this.options={...D,...e}}get cache(){return this.options.cache}get errors(){return this.options.errors}requestData(e,t){return t(e).catch(r=>{this.errors.emit(e,r);return})}resolveKey(e){if(typeof e=="function")try{return e()}catch{return}return e}clear(e,t){let r={...m,...t};if(e==null)return this.cache.clear(r);if(!Array.isArray(e))return this.cache.remove(e,r);for(let n of e)this.cache.remove(n,r)}revalidate(e,t){if(!e)return;let{fetcher:r,dedupingInterval:n}=this.options,{force:a,fetcher:s,dedupingInterval:c}={...R,fetcher:r,dedupingInterval:n,...t},o;(a||!this.cache.has(e)||this.cache.get(e).hasExpired())&&(o=this.requestData(e,s)),o!==void 0&&this.mutate(e,new d({data:o}).expiresIn(c),{revalidate:!1})}mutate(e,t,r){if(!e)return;let{revalidate:n,revalidateOptions:a}={...b,...r},s;if(typeof t=="function"){let c=null;if(this.cache.has(e)){let o=this.cache.get(e);o.isResolving()||(c=o.data)}s=t(c)}else s=t;this.cache.set(e,s instanceof d?s:new d({data:s})),n&&this.revalidate(e,a)}subscribe(e,t){if(e){let r=this.cache.subscribe(e,t);return()=>r.unsubscribe()}return()=>{}}subscribeErrors(e,t){if(e){let r=this.errors.listen(e,t);return()=>r.unsubscribe()}return()=>{}}subscribeVisibility(e,{throttleInterval:t=5e3,enabled:r=!0}={}){if(r&&typeof window!="undefined"){let n=null,a=()=>{let s=Date.now();(n===null||s-n>t)&&(n=s,e())};return window.addEventListener("focus",a),()=>window.removeEventListener("focus",a)}return()=>{}}subscribeNetwork(e,{enabled:t=!0}={}){return t&&typeof window!="undefined"?(window.addEventListener("online",e),()=>window.removeEventListener("online",e)):()=>{}}get(e){if(e&&this.cache.has(e)){let t=this.cache.get(e);if(!t.isResolving())return t.data}return}getOrWait(e){return new Promise(t=>{let r=this.get(e);if(r)return t(r);let n=this.subscribe(e,a=>(n(),t(a)))})}use(e,t,r,n){let{fetcher:a,initialData:s,loadInitialCache:c,revalidateOnStart:o,dedupingInterval:S,revalidateOnFocus:W,focusThrottleInterval:O,revalidateOnReconnect:C}={...this.options,...n},y=(u,P)=>this.mutate(this.resolveKey(e),u,P),x=u=>this.revalidate(this.resolveKey(e),u),h=()=>x({fetcher:a,dedupingInterval:S});o&&h();let K=this.subscribe(this.resolveKey(e),t),w=this.subscribeErrors(this.resolveKey(e),r),g=this.subscribeVisibility(h,{throttleInterval:O,enabled:W}),I=this.subscribeNetwork(h,{enabled:C}),E=()=>{K(),w(),g(),I()};if(s&&y(s,{revalidate:!1}),c){let u=this.get(this.resolveKey(e));u&&t(u)}return{unsubscribe:E}}};})();
/*! Copyright (c) Èrik C. Forés - MIT */
