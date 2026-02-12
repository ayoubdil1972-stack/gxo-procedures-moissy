var Vr=Object.defineProperty;var Tt=t=>{throw TypeError(t)};var zr=(t,r,i)=>r in t?Vr(t,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[r]=i;var b=(t,r,i)=>zr(t,typeof r!="symbol"?r+"":r,i),lt=(t,r,i)=>r.has(t)||Tt("Cannot "+i);var u=(t,r,i)=>(lt(t,r,"read from private field"),i?i.call(t):r.get(t)),k=(t,r,i)=>r.has(t)?Tt("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(t):r.set(t,i),y=(t,r,i,s)=>(lt(t,r,"write to private field"),s?s.call(t,i):r.set(t,i),i),A=(t,r,i)=>(lt(t,r,"access private method"),i);var jt=(t,r,i,s)=>({set _(n){y(t,r,n,i)},get _(){return u(t,r,s)}});var ir={Stringify:1},I=(t,r)=>{const i=new String(t);return i.isEscaped=!0,i.callbacks=r,i},$r=/[&<>'"]/,sr=async(t,r)=>{let i="";r||(r=[]);const s=await Promise.all(t);for(let n=s.length-1;i+=s[n],n--,!(n<0);n--){let a=s[n];typeof a=="object"&&r.push(...a.callbacks||[]);const l=a.isEscaped;if(a=await(typeof a=="object"?a.toString():a),typeof a=="object"&&r.push(...a.callbacks||[]),a.isEscaped??l)i+=a;else{const o=[i];te(a,o),i=o[0]}}return I(i,r)},te=(t,r)=>{const i=t.search($r);if(i===-1){r[0]+=t;return}let s,n,a=0;for(n=i;n<t.length;n++){switch(t.charCodeAt(n)){case 34:s="&quot;";break;case 39:s="&#39;";break;case 38:s="&amp;";break;case 60:s="&lt;";break;case 62:s="&gt;";break;default:continue}r[0]+=t.substring(a,n)+s,a=n+1}r[0]+=t.substring(a,n)},nr=t=>{const r=t.callbacks;if(!(r!=null&&r.length))return t;const i=[t],s={};return r.forEach(n=>n({phase:ir.Stringify,buffer:i,context:s})),i[0]},ar=async(t,r,i,s,n)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const a=t.callbacks;return a!=null&&a.length?(n?n[0]+=t:n=[t],Promise.all(a.map(o=>o({phase:r,buffer:n,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(c=>ar(c,r,!1,s,n))).then(()=>n[0]))):Promise.resolve(t)},Ur=(t,...r)=>{const i=[""];for(let s=0,n=t.length-1;s<n;s++){i[0]+=t[s];const a=Array.isArray(r[s])?r[s].flat(1/0):[r[s]];for(let l=0,o=a.length;l<o;l++){const c=a[l];if(typeof c=="string")te(c,i);else if(typeof c=="number")i[0]+=c;else{if(typeof c=="boolean"||c===null||c===void 0)continue;if(typeof c=="object"&&c.isEscaped)if(c.callbacks)i.unshift("",c);else{const d=c.toString();d instanceof Promise?i.unshift("",d):i[0]+=d}else c instanceof Promise?i.unshift("",c):te(c.toString(),i)}}}return i[0]+=t.at(-1),i.length===1?"callbacks"in i?I(nr(I(i[0],i.callbacks))):I(i[0]):sr(i,i.callbacks)},kt=Symbol("RENDERER"),xt=Symbol("ERROR_HANDLER"),q=Symbol("STASH"),lr=Symbol("INTERNAL"),Hr=Symbol("MEMO"),tt=Symbol("PERMALINK"),Lt=t=>(t[lr]=!0,t),or=t=>({value:r,children:i})=>{if(!i)return;const s={children:[{tag:Lt(()=>{t.push(r)}),props:{}}]};Array.isArray(i)?s.children.push(...i.flat()):s.children.push(i),s.children.push({tag:Lt(()=>{t.pop()}),props:{}});const n={tag:"",props:s,type:""};return n[xt]=a=>{throw t.pop(),a},n},cr=t=>{const r=[t],i=or(r);return i.values=r,i.Provider=i,ke.push(i),i},ke=[],Ct=t=>{const r=[t],i=(s=>{r.push(s.value);let n;try{n=s.children?(Array.isArray(s.children)?new fr("",{},s.children):s.children).toString():""}finally{r.pop()}return n instanceof Promise?n.then(a=>I(a,a.callbacks)):I(n)});return i.values=r,i.Provider=i,i[kt]=or(r),ke.push(i),i},Ee=t=>t.values.at(-1),Qe={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},bt={},We="data-precedence",Be=t=>Array.isArray(t)?t:[t],Mt=new WeakMap,Ot=(t,r,i,s)=>({buffer:n,context:a})=>{if(!n)return;const l=Mt.get(a)||{};Mt.set(a,l);const o=l[t]||(l[t]=[]);let c=!1;const d=Qe[t];if(d.length>0){e:for(const[,h]of o)for(const f of d)if(((h==null?void 0:h[f])??null)===(i==null?void 0:i[f])){c=!0;break e}}if(c?n[0]=n[0].replaceAll(r,""):d.length>0?o.push([r,i,s]):o.unshift([r,i,s]),n[0].indexOf("</head>")!==-1){let h;if(s===void 0)h=o.map(([f])=>f);else{const f=[];h=o.map(([m,,g])=>{let x=f.indexOf(g);return x===-1&&(f.push(g),x=f.length-1),[m,x]}).sort((m,g)=>m[1]-g[1]).map(([m])=>m)}h.forEach(f=>{n[0]=n[0].replaceAll(f,"")}),n[0]=n[0].replace(/(?=<\/head>)/,h.join(""))}},Ve=(t,r,i)=>I(new B(t,i,Be(r??[])).toString()),ze=(t,r,i,s)=>{if("itemProp"in i)return Ve(t,r,i);let{precedence:n,blocking:a,...l}=i;n=s?n??"":void 0,s&&(l[We]=n);const o=new B(t,l,Be(r||[])).toString();return o instanceof Promise?o.then(c=>I(o,[...c.callbacks||[],Ot(t,c,l,n)])):I(o,[Ot(t,o,l,n)])},Gr=({children:t,...r})=>{const i=Et();if(i){const s=Ee(i);if(s==="svg"||s==="head")return new B("title",r,Be(t??[]))}return ze("title",t,r,!1)},Qr=({children:t,...r})=>{const i=Et();return["src","async"].some(s=>!r[s])||i&&Ee(i)==="head"?Ve("script",t,r):ze("script",t,r,!1)},Wr=({children:t,...r})=>["href","precedence"].every(i=>i in r)?(r["data-href"]=r.href,delete r.href,ze("style",t,r,!0)):Ve("style",t,r),Xr=({children:t,...r})=>["onLoad","onError"].some(i=>i in r)||r.rel==="stylesheet"&&(!("precedence"in r)||"disabled"in r)?Ve("link",t,r):ze("link",t,r,"precedence"in r),Zr=({children:t,...r})=>{const i=Et();return i&&Ee(i)==="head"?Ve("meta",t,r):ze("meta",t,r,!1)},dr=(t,{children:r,...i})=>new B(t,i,Be(r??[])),Kr=t=>(typeof t.action=="function"&&(t.action=tt in t.action?t.action[tt]:void 0),dr("form",t)),ur=(t,r)=>(typeof r.formAction=="function"&&(r.formAction=tt in r.formAction?r.formAction[tt]:void 0),dr(t,r)),Yr=t=>ur("input",t),Jr=t=>ur("button",t);const ot=Object.freeze(Object.defineProperty({__proto__:null,button:Jr,form:Kr,input:Yr,link:Xr,meta:Zr,script:Qr,style:Wr,title:Gr},Symbol.toStringTag,{value:"Module"}));var ei=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),rt=t=>ei.get(t)||t,hr=(t,r)=>{for(const[i,s]of Object.entries(t)){const n=i[0]==="-"||!/[A-Z]/.test(i)?i:i.replace(/[A-Z]/g,a=>`-${a.toLowerCase()}`);r(n,s==null?null:typeof s=="number"?n.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${s}`:`${s}px`:s)}},Te=void 0,Et=()=>Te,ti=t=>/[A-Z]/.test(t)&&t.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?t.replace(/([A-Z])/g,"-$1").toLowerCase():t,ri=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],ii=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],At=(t,r)=>{for(let i=0,s=t.length;i<s;i++){const n=t[i];if(typeof n=="string")te(n,r);else{if(typeof n=="boolean"||n===null||n===void 0)continue;n instanceof B?n.toStringToBuffer(r):typeof n=="number"||n.isEscaped?r[0]+=n:n instanceof Promise?r.unshift("",n):At(n,r)}}},B=class{constructor(t,r,i){b(this,"tag");b(this,"props");b(this,"key");b(this,"children");b(this,"isEscaped",!0);b(this,"localContexts");this.tag=t,this.props=r,this.children=i}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var r,i;const t=[""];(r=this.localContexts)==null||r.forEach(([s,n])=>{s.values.push(n)});try{this.toStringToBuffer(t)}finally{(i=this.localContexts)==null||i.forEach(([s])=>{s.values.pop()})}return t.length===1?"callbacks"in t?nr(I(t[0],t.callbacks)).toString():t[0]:sr(t,t.callbacks)}toStringToBuffer(t){const r=this.tag,i=this.props;let{children:s}=this;t[0]+=`<${r}`;const n=Te&&Ee(Te)==="svg"?a=>ti(rt(a)):a=>rt(a);for(let[a,l]of Object.entries(i))if(a=n(a),a!=="children"){if(a==="style"&&typeof l=="object"){let o="";hr(l,(c,d)=>{d!=null&&(o+=`${o?";":""}${c}:${d}`)}),t[0]+=' style="',te(o,t),t[0]+='"'}else if(typeof l=="string")t[0]+=` ${a}="`,te(l,t),t[0]+='"';else if(l!=null)if(typeof l=="number"||l.isEscaped)t[0]+=` ${a}="${l}"`;else if(typeof l=="boolean"&&ii.includes(a))l&&(t[0]+=` ${a}=""`);else if(a==="dangerouslySetInnerHTML"){if(s.length>0)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");s=[I(l.__html)]}else if(l instanceof Promise)t[0]+=` ${a}="`,t.unshift('"',l);else if(typeof l=="function"){if(!a.startsWith("on")&&a!=="ref")throw new Error(`Invalid prop '${a}' of type 'function' supplied to '${r}'.`)}else t[0]+=` ${a}="`,te(l.toString(),t),t[0]+='"'}if(ri.includes(r)&&s.length===0){t[0]+="/>";return}t[0]+=">",At(s,t),t[0]+=`</${r}>`}},ct=class extends B{toStringToBuffer(t){const{children:r}=this,i={...this.props};r.length&&(i.children=r.length===1?r[0]:r);const s=this.tag.call(null,i);if(!(typeof s=="boolean"||s==null))if(s instanceof Promise)if(ke.length===0)t.unshift("",s);else{const n=ke.map(a=>[a,a.values.at(-1)]);t.unshift("",s.then(a=>(a instanceof B&&(a.localContexts=n),a)))}else s instanceof B?s.toStringToBuffer(t):typeof s=="number"||s.isEscaped?(t[0]+=s,s.callbacks&&(t.callbacks||(t.callbacks=[]),t.callbacks.push(...s.callbacks))):te(s,t)}},fr=class extends B{toStringToBuffer(t){At(this.children,t)}},It=(t,r,...i)=>{r??(r={}),i.length&&(r.children=i.length===1?i[0]:i);const s=r.key;delete r.key;const n=Xe(t,r,i);return n.key=s,n},Nt=!1,Xe=(t,r,i)=>{if(!Nt){for(const s in bt)ot[s][kt]=bt[s];Nt=!0}return typeof t=="function"?new ct(t,r,i):ot[t]?new ct(ot[t],r,i):t==="svg"||t==="head"?(Te||(Te=Ct("")),new B(t,r,[new ct(Te,{value:t},i)])):new B(t,r,i)},si=({children:t})=>new fr("",{children:t},Array.isArray(t)?t:t?[t]:[]);function e(t,r,i){let s;if(!r||!("children"in r))s=Xe(t,r,[]);else{const n=r.children;s=Array.isArray(n)?Xe(t,r,n):Xe(t,r,[n])}return s.key=i,s}var _t=(t,r,i)=>(s,n)=>{let a=-1;return l(0);async function l(o){if(o<=a)throw new Error("next() called multiple times");a=o;let c,d=!1,h;if(t[o]?(h=t[o][0][0],s.req.routeIndex=o):h=o===t.length&&n||void 0,h)try{c=await h(s,()=>l(o+1))}catch(f){if(f instanceof Error&&r)s.error=f,c=await r(f,s),d=!0;else throw f}else s.finalized===!1&&i&&(c=await i(s));return c&&(s.finalized===!1||d)&&(s.res=c),s}},ni=Symbol(),ai=async(t,r=Object.create(null))=>{const{all:i=!1,dot:s=!1}=r,a=(t instanceof vr?t.raw.headers:t.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?li(t,{all:i,dot:s}):{}};async function li(t,r){const i=await t.formData();return i?oi(i,r):{}}function oi(t,r){const i=Object.create(null);return t.forEach((s,n)=>{r.all||n.endsWith("[]")?ci(i,n,s):i[n]=s}),r.dot&&Object.entries(i).forEach(([s,n])=>{s.includes(".")&&(di(i,s,n),delete i[s])}),i}var ci=(t,r,i)=>{t[r]!==void 0?Array.isArray(t[r])?t[r].push(i):t[r]=[t[r],i]:r.endsWith("[]")?t[r]=[i]:t[r]=i},di=(t,r,i)=>{let s=t;const n=r.split(".");n.forEach((a,l)=>{l===n.length-1?s[a]=i:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},mr=t=>{const r=t.split("/");return r[0]===""&&r.shift(),r},ui=t=>{const{groups:r,path:i}=hi(t),s=mr(i);return fi(s,r)},hi=t=>{const r=[];return t=t.replace(/\{[^}]+\}/g,(i,s)=>{const n=`@${s}`;return r.push([n,i]),n}),{groups:r,path:t}},fi=(t,r)=>{for(let i=r.length-1;i>=0;i--){const[s]=r[i];for(let n=t.length-1;n>=0;n--)if(t[n].includes(s)){t[n]=t[n].replace(s,r[i][1]);break}}return t},He={},mi=(t,r)=>{if(t==="*")return"*";const i=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(i){const s=`${t}#${r}`;return He[s]||(i[2]?He[s]=r&&r[0]!==":"&&r[0]!=="*"?[s,i[1],new RegExp(`^${i[2]}(?=/${r})`)]:[t,i[1],new RegExp(`^${i[2]}$`)]:He[s]=[t,i[1],!0]),He[s]}return null},Rt=(t,r)=>{try{return r(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,i=>{try{return r(i)}catch{return i}})}},gi=t=>Rt(t,decodeURI),gr=t=>{const r=t.url,i=r.indexOf("/",r.indexOf(":")+4);let s=i;for(;s<r.length;s++){const n=r.charCodeAt(s);if(n===37){const a=r.indexOf("?",s),l=r.slice(i,a===-1?void 0:a);return gi(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63)break}return r.slice(i,s)},pi=t=>{const r=gr(t);return r.length>1&&r.at(-1)==="/"?r.slice(0,-1):r},he=(t,r,...i)=>(i.length&&(r=he(r,...i)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${r==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(r==null?void 0:r[0])==="/"?r.slice(1):r}`}`),pr=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const r=t.split("/"),i=[];let s="";return r.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){i.length===0&&s===""?i.push("/"):i.push(s);const a=n.replace("?","");s+="/"+a,i.push(s)}else s+="/"+n}),i.filter((n,a,l)=>l.indexOf(n)===a)},dt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Rt(t,br):t):t,xr=(t,r,i)=>{let s;if(!i&&r&&!/[%+]/.test(r)){let l=t.indexOf("?",8);if(l===-1)return;for(t.startsWith(r,l+1)||(l=t.indexOf(`&${r}`,l+1));l!==-1;){const o=t.charCodeAt(l+r.length+1);if(o===61){const c=l+r.length+2,d=t.indexOf("&",c);return dt(t.slice(c,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";l=t.indexOf(`&${r}`,l+1)}if(s=/[%+]/.test(t),!s)return}const n={};s??(s=/[%+]/.test(t));let a=t.indexOf("?",8);for(;a!==-1;){const l=t.indexOf("&",a+1);let o=t.indexOf("=",a);o>l&&l!==-1&&(o=-1);let c=t.slice(a+1,o===-1?l===-1?void 0:l:o);if(s&&(c=dt(c)),a=l,c==="")continue;let d;o===-1?d="":(d=t.slice(o+1,l===-1?void 0:l),s&&(d=dt(d))),i?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(d)):n[c]??(n[c]=d)}return r?n[r]:n},xi=xr,bi=(t,r)=>xr(t,r,!0),br=decodeURIComponent,Dt=t=>Rt(t,br),ge,O,Q,yr,wr,vt,X,Kt,vr=(Kt=class{constructor(t,r="/",i=[[]]){k(this,Q);b(this,"raw");k(this,ge);k(this,O);b(this,"routeIndex",0);b(this,"path");b(this,"bodyCache",{});k(this,X,t=>{const{bodyCache:r,raw:i}=this,s=r[t];if(s)return s;const n=Object.keys(r)[0];return n?r[n].then(a=>(n==="json"&&(a=JSON.stringify(a)),new Response(a)[t]())):r[t]=i[t]()});this.raw=t,this.path=r,y(this,O,i),y(this,ge,{})}param(t){return t?A(this,Q,yr).call(this,t):A(this,Q,wr).call(this)}query(t){return xi(this.url,t)}queries(t){return bi(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const r={};return this.raw.headers.forEach((i,s)=>{r[s]=i}),r}async parseBody(t){var r;return(r=this.bodyCache).parsedBody??(r.parsedBody=await ai(this,t))}json(){return u(this,X).call(this,"text").then(t=>JSON.parse(t))}text(){return u(this,X).call(this,"text")}arrayBuffer(){return u(this,X).call(this,"arrayBuffer")}blob(){return u(this,X).call(this,"blob")}formData(){return u(this,X).call(this,"formData")}addValidatedData(t,r){u(this,ge)[t]=r}valid(t){return u(this,ge)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[ni](){return u(this,O)}get matchedRoutes(){return u(this,O)[0].map(([[,t]])=>t)}get routePath(){return u(this,O)[0].map(([[,t]])=>t)[this.routeIndex].path}},ge=new WeakMap,O=new WeakMap,Q=new WeakSet,yr=function(t){const r=u(this,O)[0][this.routeIndex][1][t],i=A(this,Q,vt).call(this,r);return i&&/\%/.test(i)?Dt(i):i},wr=function(){const t={},r=Object.keys(u(this,O)[0][this.routeIndex][1]);for(const i of r){const s=A(this,Q,vt).call(this,u(this,O)[0][this.routeIndex][1][i]);s!==void 0&&(t[i]=/\%/.test(s)?Dt(s):s)}return t},vt=function(t){return u(this,O)[1]?u(this,O)[1][t]:t},X=new WeakMap,Kt),vi="text/plain; charset=UTF-8",ut=(t,r)=>({"Content-Type":t,...r}),Me,Oe,$,pe,U,M,Ie,xe,be,se,Ne,_e,Z,fe,Yt,yi=(Yt=class{constructor(t,r){k(this,Z);k(this,Me);k(this,Oe);b(this,"env",{});k(this,$);b(this,"finalized",!1);b(this,"error");k(this,pe);k(this,U);k(this,M);k(this,Ie);k(this,xe);k(this,be);k(this,se);k(this,Ne);k(this,_e);b(this,"render",(...t)=>(u(this,xe)??y(this,xe,r=>this.html(r)),u(this,xe).call(this,...t)));b(this,"setLayout",t=>y(this,Ie,t));b(this,"getLayout",()=>u(this,Ie));b(this,"setRenderer",t=>{y(this,xe,t)});b(this,"header",(t,r,i)=>{this.finalized&&y(this,M,new Response(u(this,M).body,u(this,M)));const s=u(this,M)?u(this,M).headers:u(this,se)??y(this,se,new Headers);r===void 0?s.delete(t):i!=null&&i.append?s.append(t,r):s.set(t,r)});b(this,"status",t=>{y(this,pe,t)});b(this,"set",(t,r)=>{u(this,$)??y(this,$,new Map),u(this,$).set(t,r)});b(this,"get",t=>u(this,$)?u(this,$).get(t):void 0);b(this,"newResponse",(...t)=>A(this,Z,fe).call(this,...t));b(this,"body",(t,r,i)=>A(this,Z,fe).call(this,t,r,i));b(this,"text",(t,r,i)=>!u(this,se)&&!u(this,pe)&&!r&&!i&&!this.finalized?new Response(t):A(this,Z,fe).call(this,t,r,ut(vi,i)));b(this,"json",(t,r,i)=>A(this,Z,fe).call(this,JSON.stringify(t),r,ut("application/json",i)));b(this,"html",(t,r,i)=>{const s=n=>A(this,Z,fe).call(this,n,r,ut("text/html; charset=UTF-8",i));return typeof t=="object"?ar(t,ir.Stringify,!1,{}).then(s):s(t)});b(this,"redirect",(t,r)=>{const i=String(t);return this.header("Location",/[^\x00-\xFF]/.test(i)?encodeURI(i):i),this.newResponse(null,r??302)});b(this,"notFound",()=>(u(this,be)??y(this,be,()=>new Response),u(this,be).call(this,this)));y(this,Me,t),r&&(y(this,U,r.executionCtx),this.env=r.env,y(this,be,r.notFoundHandler),y(this,_e,r.path),y(this,Ne,r.matchResult))}get req(){return u(this,Oe)??y(this,Oe,new vr(u(this,Me),u(this,_e),u(this,Ne))),u(this,Oe)}get event(){if(u(this,U)&&"respondWith"in u(this,U))return u(this,U);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,U))return u(this,U);throw Error("This context has no ExecutionContext")}get res(){return u(this,M)||y(this,M,new Response(null,{headers:u(this,se)??y(this,se,new Headers)}))}set res(t){if(u(this,M)&&t){t=new Response(t.body,t);for(const[r,i]of u(this,M).headers.entries())if(r!=="content-type")if(r==="set-cookie"){const s=u(this,M).headers.getSetCookie();t.headers.delete("set-cookie");for(const n of s)t.headers.append("set-cookie",n)}else t.headers.set(r,i)}y(this,M,t),this.finalized=!0}get var(){return u(this,$)?Object.fromEntries(u(this,$)):{}}},Me=new WeakMap,Oe=new WeakMap,$=new WeakMap,pe=new WeakMap,U=new WeakMap,M=new WeakMap,Ie=new WeakMap,xe=new WeakMap,be=new WeakMap,se=new WeakMap,Ne=new WeakMap,_e=new WeakMap,Z=new WeakSet,fe=function(t,r,i){const s=u(this,M)?new Headers(u(this,M).headers):u(this,se)??new Headers;if(typeof r=="object"&&"headers"in r){const a=r.headers instanceof Headers?r.headers:new Headers(r.headers);for(const[l,o]of a)l.toLowerCase()==="set-cookie"?s.append(l,o):s.set(l,o)}if(i)for(const[a,l]of Object.entries(i))if(typeof l=="string")s.set(a,l);else{s.delete(a);for(const o of l)s.append(a,o)}const n=typeof r=="number"?r:(r==null?void 0:r.status)??u(this,pe);return new Response(t,{status:n,headers:s})},Yt),F="ALL",wi="all",ki=["get","post","put","delete","options","patch"],kr="Can not add a route since the matcher is already built.",Cr=class extends Error{},Ci="__COMPOSED_HANDLER",Ei=t=>t.text("404 Not Found",404),Bt=(t,r)=>{if("getResponse"in t){const i=t.getResponse();return r.newResponse(i.body,i)}return console.error(t),r.text("Internal Server Error",500)},N,T,Er,_,re,Ze,Ke,ve,Ai=(ve=class{constructor(r={}){k(this,T);b(this,"get");b(this,"post");b(this,"put");b(this,"delete");b(this,"options");b(this,"patch");b(this,"all");b(this,"on");b(this,"use");b(this,"router");b(this,"getPath");b(this,"_basePath","/");k(this,N,"/");b(this,"routes",[]);k(this,_,Ei);b(this,"errorHandler",Bt);b(this,"onError",r=>(this.errorHandler=r,this));b(this,"notFound",r=>(y(this,_,r),this));b(this,"fetch",(r,...i)=>A(this,T,Ke).call(this,r,i[1],i[0],r.method));b(this,"request",(r,i,s,n)=>r instanceof Request?this.fetch(i?new Request(r,i):r,s,n):(r=r.toString(),this.fetch(new Request(/^https?:\/\//.test(r)?r:`http://localhost${he("/",r)}`,i),s,n)));b(this,"fire",()=>{addEventListener("fetch",r=>{r.respondWith(A(this,T,Ke).call(this,r.request,r,void 0,r.request.method))})});[...ki,wi].forEach(a=>{this[a]=(l,...o)=>(typeof l=="string"?y(this,N,l):A(this,T,re).call(this,a,u(this,N),l),o.forEach(c=>{A(this,T,re).call(this,a,u(this,N),c)}),this)}),this.on=(a,l,...o)=>{for(const c of[l].flat()){y(this,N,c);for(const d of[a].flat())o.map(h=>{A(this,T,re).call(this,d.toUpperCase(),u(this,N),h)})}return this},this.use=(a,...l)=>(typeof a=="string"?y(this,N,a):(y(this,N,"*"),l.unshift(a)),l.forEach(o=>{A(this,T,re).call(this,F,u(this,N),o)}),this);const{strict:s,...n}=r;Object.assign(this,n),this.getPath=s??!0?r.getPath??gr:pi}route(r,i){const s=this.basePath(r);return i.routes.map(n=>{var l;let a;i.errorHandler===Bt?a=n.handler:(a=async(o,c)=>(await _t([],i.errorHandler)(o,()=>n.handler(o,c))).res,a[Ci]=n.handler),A(l=s,T,re).call(l,n.method,n.path,a)}),this}basePath(r){const i=A(this,T,Er).call(this);return i._basePath=he(this._basePath,r),i}mount(r,i,s){let n,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?n=c=>c:n=s.replaceRequest));const l=a?c=>{const d=a(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};n||(n=(()=>{const c=he(this._basePath,r),d=c==="/"?0:c.length;return h=>{const f=new URL(h.url);return f.pathname=f.pathname.slice(d)||"/",new Request(f,h)}})());const o=async(c,d)=>{const h=await i(n(c.req.raw),...l(c));if(h)return h;await d()};return A(this,T,re).call(this,F,he(r,"*"),o),this}},N=new WeakMap,T=new WeakSet,Er=function(){const r=new ve({router:this.router,getPath:this.getPath});return r.errorHandler=this.errorHandler,y(r,_,u(this,_)),r.routes=this.routes,r},_=new WeakMap,re=function(r,i,s){r=r.toUpperCase(),i=he(this._basePath,i);const n={basePath:this._basePath,path:i,method:r,handler:s};this.router.add(r,i,[s,n]),this.routes.push(n)},Ze=function(r,i){if(r instanceof Error)return this.errorHandler(r,i);throw r},Ke=function(r,i,s,n){if(n==="HEAD")return(async()=>new Response(null,await A(this,T,Ke).call(this,r,i,s,"GET")))();const a=this.getPath(r,{env:s}),l=this.router.match(n,a),o=new yi(r,{path:a,matchResult:l,env:s,executionCtx:i,notFoundHandler:u(this,_)});if(l[0].length===1){let d;try{d=l[0][0][0][0](o,async()=>{o.res=await u(this,_).call(this,o)})}catch(h){return A(this,T,Ze).call(this,h,o)}return d instanceof Promise?d.then(h=>h||(o.finalized?o.res:u(this,_).call(this,o))).catch(h=>A(this,T,Ze).call(this,h,o)):d??u(this,_).call(this,o)}const c=_t(l[0],this.errorHandler,u(this,_));return(async()=>{try{const d=await c(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return A(this,T,Ze).call(this,d,o)}})()},ve),Ar=[];function Ri(t,r){const i=this.buildAllMatchers(),s=((n,a)=>{const l=i[n]||i[F],o=l[2][a];if(o)return o;const c=a.match(l[0]);if(!c)return[[],Ar];const d=c.indexOf("",1);return[l[1][d],c]});return this.match=s,s(t,r)}var it="[^/]+",qe=".*",Fe="(?:|/.*)",me=Symbol(),Si=new Set(".\\+*[^]$()");function Pi(t,r){return t.length===1?r.length===1?t<r?-1:1:-1:r.length===1||t===qe||t===Fe?1:r===qe||r===Fe?-1:t===it?1:r===it?-1:t.length===r.length?t<r?-1:1:r.length-t.length}var ne,ae,D,ce,qi=(ce=class{constructor(){k(this,ne);k(this,ae);k(this,D,Object.create(null))}insert(r,i,s,n,a){if(r.length===0){if(u(this,ne)!==void 0)throw me;if(a)return;y(this,ne,i);return}const[l,...o]=r,c=l==="*"?o.length===0?["","",qe]:["","",it]:l==="/*"?["","",Fe]:l.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const h=c[1];let f=c[2]||it;if(h&&c[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw me;if(d=u(this,D)[f],!d){if(Object.keys(u(this,D)).some(m=>m!==qe&&m!==Fe))throw me;if(a)return;d=u(this,D)[f]=new ce,h!==""&&y(d,ae,n.varIndex++)}!a&&h!==""&&s.push([h,u(d,ae)])}else if(d=u(this,D)[l],!d){if(Object.keys(u(this,D)).some(h=>h.length>1&&h!==qe&&h!==Fe))throw me;if(a)return;d=u(this,D)[l]=new ce}d.insert(o,i,s,n,a)}buildRegExpStr(){const i=Object.keys(u(this,D)).sort(Pi).map(s=>{const n=u(this,D)[s];return(typeof u(n,ae)=="number"?`(${s})@${u(n,ae)}`:Si.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof u(this,ne)=="number"&&i.unshift(`#${u(this,ne)}`),i.length===0?"":i.length===1?i[0]:"(?:"+i.join("|")+")"}},ne=new WeakMap,ae=new WeakMap,D=new WeakMap,ce),st,De,Jt,Fi=(Jt=class{constructor(){k(this,st,{varIndex:0});k(this,De,new qi)}insert(t,r,i){const s=[],n=[];for(let l=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const d=`@\\${l}`;return n[l]=[d,c],l++,o=!0,d}),!o)break}const a=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let l=n.length-1;l>=0;l--){const[o]=n[l];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(o)!==-1){a[c]=a[c].replace(o,n[l][1]);break}}return u(this,De).insert(a,r,s,u(this,st),i),s}buildRegExp(){let t=u(this,De).buildRegExpStr();if(t==="")return[/^$/,[],[]];let r=0;const i=[],s=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,a,l)=>a!==void 0?(i[++r]=Number(a),"$()"):(l!==void 0&&(s[Number(l)]=++r),"")),[new RegExp(`^${t}`),i,s]}},st=new WeakMap,De=new WeakMap,Jt),Ti=[/^$/,[],Object.create(null)],Ye=Object.create(null);function Rr(t){return Ye[t]??(Ye[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(r,i)=>i?`\\${i}`:"(?:|/.*)")}$`))}function ji(){Ye=Object.create(null)}function Li(t){var d;const r=new Fi,i=[];if(t.length===0)return Ti;const s=t.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,f],[m,g])=>h?1:m?-1:f.length-g.length),n=Object.create(null);for(let h=0,f=-1,m=s.length;h<m;h++){const[g,x,v]=s[h];g?n[x]=[v.map(([w])=>[w,Object.create(null)]),Ar]:f++;let p;try{p=r.insert(x,f,g)}catch(w){throw w===me?new Cr(x):w}g||(i[f]=v.map(([w,C])=>{const S=Object.create(null);for(C-=1;C>=0;C--){const[R,P]=p[C];S[R]=P}return[w,S]}))}const[a,l,o]=r.buildRegExp();for(let h=0,f=i.length;h<f;h++)for(let m=0,g=i[h].length;m<g;m++){const x=(d=i[h][m])==null?void 0:d[1];if(!x)continue;const v=Object.keys(x);for(let p=0,w=v.length;p<w;p++)x[v[p]]=o[x[v[p]]]}const c=[];for(const h in l)c[h]=i[l[h]];return[a,c,n]}function de(t,r){if(t){for(const i of Object.keys(t).sort((s,n)=>n.length-s.length))if(Rr(i).test(r))return[...t[i]]}}var K,Y,nt,Sr,er,Mi=(er=class{constructor(){k(this,nt);b(this,"name","RegExpRouter");k(this,K);k(this,Y);b(this,"match",Ri);y(this,K,{[F]:Object.create(null)}),y(this,Y,{[F]:Object.create(null)})}add(t,r,i){var o;const s=u(this,K),n=u(this,Y);if(!s||!n)throw new Error(kr);s[t]||[s,n].forEach(c=>{c[t]=Object.create(null),Object.keys(c[F]).forEach(d=>{c[t][d]=[...c[F][d]]})}),r==="/*"&&(r="*");const a=(r.match(/\/:/g)||[]).length;if(/\*$/.test(r)){const c=Rr(r);t===F?Object.keys(s).forEach(d=>{var h;(h=s[d])[r]||(h[r]=de(s[d],r)||de(s[F],r)||[])}):(o=s[t])[r]||(o[r]=de(s[t],r)||de(s[F],r)||[]),Object.keys(s).forEach(d=>{(t===F||t===d)&&Object.keys(s[d]).forEach(h=>{c.test(h)&&s[d][h].push([i,a])})}),Object.keys(n).forEach(d=>{(t===F||t===d)&&Object.keys(n[d]).forEach(h=>c.test(h)&&n[d][h].push([i,a]))});return}const l=pr(r)||[r];for(let c=0,d=l.length;c<d;c++){const h=l[c];Object.keys(n).forEach(f=>{var m;(t===F||t===f)&&((m=n[f])[h]||(m[h]=[...de(s[f],h)||de(s[F],h)||[]]),n[f][h].push([i,a-d+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(u(this,Y)).concat(Object.keys(u(this,K))).forEach(r=>{t[r]||(t[r]=A(this,nt,Sr).call(this,r))}),y(this,K,y(this,Y,void 0)),ji(),t}},K=new WeakMap,Y=new WeakMap,nt=new WeakSet,Sr=function(t){const r=[];let i=t===F;return[u(this,K),u(this,Y)].forEach(s=>{const n=s[t]?Object.keys(s[t]).map(a=>[a,s[t][a]]):[];n.length!==0?(i||(i=!0),r.push(...n)):t!==F&&r.push(...Object.keys(s[F]).map(a=>[a,s[F][a]]))}),i?Li(r):null},er),J,H,tr,Oi=(tr=class{constructor(t){b(this,"name","SmartRouter");k(this,J,[]);k(this,H,[]);y(this,J,t.routers)}add(t,r,i){if(!u(this,H))throw new Error(kr);u(this,H).push([t,r,i])}match(t,r){if(!u(this,H))throw new Error("Fatal error");const i=u(this,J),s=u(this,H),n=i.length;let a=0,l;for(;a<n;a++){const o=i[a];try{for(let c=0,d=s.length;c<d;c++)o.add(...s[c]);l=o.match(t,r)}catch(c){if(c instanceof Cr)continue;throw c}this.match=o.match.bind(o),y(this,J,[o]),y(this,H,void 0);break}if(a===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,l}get activeRouter(){if(u(this,H)||u(this,J).length!==1)throw new Error("No active router has been determined yet.");return u(this,J)[0]}},J=new WeakMap,H=new WeakMap,tr),Se=Object.create(null),ee,L,le,ye,j,G,ie,we,Ii=(we=class{constructor(r,i,s){k(this,G);k(this,ee);k(this,L);k(this,le);k(this,ye,0);k(this,j,Se);if(y(this,L,s||Object.create(null)),y(this,ee,[]),r&&i){const n=Object.create(null);n[r]={handler:i,possibleKeys:[],score:0},y(this,ee,[n])}y(this,le,[])}insert(r,i,s){y(this,ye,++jt(this,ye)._);let n=this;const a=ui(i),l=[];for(let o=0,c=a.length;o<c;o++){const d=a[o],h=a[o+1],f=mi(d,h),m=Array.isArray(f)?f[0]:d;if(m in u(n,L)){n=u(n,L)[m],f&&l.push(f[1]);continue}u(n,L)[m]=new we,f&&(u(n,le).push(f),l.push(f[1])),n=u(n,L)[m]}return u(n,ee).push({[r]:{handler:s,possibleKeys:l.filter((o,c,d)=>d.indexOf(o)===c),score:u(this,ye)}}),n}search(r,i){var c;const s=[];y(this,j,Se);let a=[this];const l=mr(i),o=[];for(let d=0,h=l.length;d<h;d++){const f=l[d],m=d===h-1,g=[];for(let x=0,v=a.length;x<v;x++){const p=a[x],w=u(p,L)[f];w&&(y(w,j,u(p,j)),m?(u(w,L)["*"]&&s.push(...A(this,G,ie).call(this,u(w,L)["*"],r,u(p,j))),s.push(...A(this,G,ie).call(this,w,r,u(p,j)))):g.push(w));for(let C=0,S=u(p,le).length;C<S;C++){const R=u(p,le)[C],P=u(p,j)===Se?{}:{...u(p,j)};if(R==="*"){const W=u(p,L)["*"];W&&(s.push(...A(this,G,ie).call(this,W,r,u(p,j))),y(W,j,P),g.push(W));continue}const[Ae,Ue,Re]=R;if(!f&&!(Re instanceof RegExp))continue;const V=u(p,L)[Ae],Br=l.slice(d).join("/");if(Re instanceof RegExp){const W=Re.exec(Br);if(W){if(P[Ue]=W[0],s.push(...A(this,G,ie).call(this,V,r,u(p,j),P)),Object.keys(u(V,L)).length){y(V,j,P);const at=((c=W[0].match(/\//))==null?void 0:c.length)??0;(o[at]||(o[at]=[])).push(V)}continue}}(Re===!0||Re.test(f))&&(P[Ue]=f,m?(s.push(...A(this,G,ie).call(this,V,r,P,u(p,j))),u(V,L)["*"]&&s.push(...A(this,G,ie).call(this,u(V,L)["*"],r,P,u(p,j)))):(y(V,j,P),g.push(V)))}}a=g.concat(o.shift()??[])}return s.length>1&&s.sort((d,h)=>d.score-h.score),[s.map(({handler:d,params:h})=>[d,h])]}},ee=new WeakMap,L=new WeakMap,le=new WeakMap,ye=new WeakMap,j=new WeakMap,G=new WeakSet,ie=function(r,i,s,n){const a=[];for(let l=0,o=u(r,ee).length;l<o;l++){const c=u(r,ee)[l],d=c[i]||c[F],h={};if(d!==void 0&&(d.params=Object.create(null),a.push(d),s!==Se||n&&n!==Se))for(let f=0,m=d.possibleKeys.length;f<m;f++){const g=d.possibleKeys[f],x=h[d.score];d.params[g]=n!=null&&n[g]&&!x?n[g]:s[g]??(n==null?void 0:n[g]),h[d.score]=!0}}return a},we),oe,rr,Ni=(rr=class{constructor(){b(this,"name","TrieRouter");k(this,oe);y(this,oe,new Ii)}add(t,r,i){const s=pr(r);if(s){for(let n=0,a=s.length;n<a;n++)u(this,oe).insert(t,s[n],i);return}u(this,oe).insert(t,r,i)}match(t,r){return u(this,oe).search(t,r)}},oe=new WeakMap,rr),Pr=class extends Ai{constructor(t={}){super(t),this.router=t.router??new Oi({routers:[new Mi,new Ni]})}},_i=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Vt=(t,r=Bi)=>{const i=/\.([a-zA-Z0-9]+?)$/,s=t.match(i);if(!s)return;let n=r[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},Di={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Bi=Di,Vi=(...t)=>{let r=t.filter(n=>n!=="").join("/");r=r.replace(new RegExp("(?<=\\/)\\/+","g"),"");const i=r.split("/"),s=[];for(const n of i)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},qr={br:".br",zstd:".zst",gzip:".gz"},zi=Object.keys(qr),$i="index.html",Ui=t=>{const r=t.root??"./",i=t.path,s=t.join??Vi;return async(n,a)=>{var h,f,m,g;if(n.finalized)return a();let l;if(t.path)l=t.path;else try{if(l=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(l))throw new Error}catch{return await((h=t.onNotFound)==null?void 0:h.call(t,n.req.path,n)),a()}let o=s(r,!i&&t.rewriteRequestPath?t.rewriteRequestPath(l):l);t.isDir&&await t.isDir(o)&&(o=s(o,$i));const c=t.getContent;let d=await c(o,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const x=t.mimes&&Vt(o,t.mimes)||Vt(o);if(n.header("Content-Type",x||"application/octet-stream"),t.precompressed&&(!x||_i.test(x))){const v=new Set((f=n.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(p=>p.trim()));for(const p of zi){if(!v.has(p))continue;const w=await c(o+qr[p],n);if(w){d=w,n.header("Content-Encoding",p),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=t.onFound)==null?void 0:m.call(t,o,n)),n.body(d)}await((g=t.onNotFound)==null?void 0:g.call(t,o,n)),await a()}},Hi=async(t,r)=>{let i;r&&r.manifest?typeof r.manifest=="string"?i=JSON.parse(r.manifest):i=r.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?i=JSON.parse(__STATIC_CONTENT_MANIFEST):i=__STATIC_CONTENT_MANIFEST;let s;r&&r.namespace?s=r.namespace:s=__STATIC_CONTENT;const n=i[t];if(!n)return null;const a=await s.get(n,{type:"stream"});return a||null},Gi=t=>async function(i,s){return Ui({...t,getContent:async a=>Hi(a,{manifest:t.manifest,namespace:t.namespace?t.namespace:i.env?i.env.__STATIC_CONTENT:void 0})})(i,s)},Qi=t=>Gi(t),je="_hp",Wi={Change:"Input",DoubleClick:"DblClick"},Xi={svg:"2000/svg",math:"1998/Math/MathML"},Le=[],yt=new WeakMap,Ce=void 0,Zi=()=>Ce,z=t=>"t"in t,ht={onClick:["click",!1]},zt=t=>{if(!t.startsWith("on"))return;if(ht[t])return ht[t];const r=t.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(r){const[,i,s]=r;return ht[t]=[(Wi[i]||i).toLowerCase(),!!s]}},$t=(t,r)=>Ce&&t instanceof SVGElement&&/[A-Z]/.test(r)&&(r in t.style||r.match(/^(?:o|pai|str|u|ve)/))?r.replace(/([A-Z])/g,"-$1").toLowerCase():r,Ki=(t,r,i)=>{var s;r||(r={});for(let n in r){const a=r[n];if(n!=="children"&&(!i||i[n]!==a)){n=rt(n);const l=zt(n);if(l){if((i==null?void 0:i[n])!==a&&(i&&t.removeEventListener(l[0],i[n],l[1]),a!=null)){if(typeof a!="function")throw new Error(`Event handler for "${n}" is not a function`);t.addEventListener(l[0],a,l[1])}}else if(n==="dangerouslySetInnerHTML"&&a)t.innerHTML=a.__html;else if(n==="ref"){let o;typeof a=="function"?o=a(t)||(()=>a(null)):a&&"current"in a&&(a.current=t,o=()=>a.current=null),yt.set(t,o)}else if(n==="style"){const o=t.style;typeof a=="string"?o.cssText=a:(o.cssText="",a!=null&&hr(a,o.setProperty.bind(o)))}else{if(n==="value"){const c=t.nodeName;if(c==="INPUT"||c==="TEXTAREA"||c==="SELECT"){if(t.value=a==null||a===!1?null:a,c==="TEXTAREA"){t.textContent=a;continue}else if(c==="SELECT"){t.selectedIndex===-1&&(t.selectedIndex=0);continue}}}else(n==="checked"&&t.nodeName==="INPUT"||n==="selected"&&t.nodeName==="OPTION")&&(t[n]=a);const o=$t(t,n);a==null||a===!1?t.removeAttribute(o):a===!0?t.setAttribute(o,""):typeof a=="string"||typeof a=="number"?t.setAttribute(o,a):t.setAttribute(o,a.toString())}}}if(i)for(let n in i){const a=i[n];if(n!=="children"&&!(n in r)){n=rt(n);const l=zt(n);l?t.removeEventListener(l[0],a,l[1]):n==="ref"?(s=yt.get(t))==null||s():t.removeAttribute($t(t,n))}}},Yi=(t,r)=>{r[q][0]=0,Le.push([t,r]);const i=r.tag[kt]||r.tag,s=i.defaultProps?{...i.defaultProps,...r.props}:r.props;try{return[i.call(null,s)]}finally{Le.pop()}},Fr=(t,r,i,s,n)=>{var a,l;(a=t.vR)!=null&&a.length&&(s.push(...t.vR),delete t.vR),typeof t.tag=="function"&&((l=t[q][1][Mr])==null||l.forEach(o=>n.push(o))),t.vC.forEach(o=>{var c;if(z(o))i.push(o);else if(typeof o.tag=="function"||o.tag===""){o.c=r;const d=i.length;if(Fr(o,r,i,s,n),o.s){for(let h=d;h<i.length;h++)i[h].s=!0;o.s=!1}}else i.push(o),(c=o.vR)!=null&&c.length&&(s.push(...o.vR),delete o.vR)})},Ji=t=>{for(;;t=t.tag===je||!t.vC||!t.pP?t.nN:t.vC[0]){if(!t)return null;if(t.tag!==je&&t.e)return t.e}},Tr=t=>{var r,i,s,n,a,l;z(t)||((i=(r=t[q])==null?void 0:r[1][Mr])==null||i.forEach(o=>{var c;return(c=o[2])==null?void 0:c.call(o)}),(s=yt.get(t.e))==null||s(),t.p===2&&((n=t.vC)==null||n.forEach(o=>o.p=2)),(a=t.vC)==null||a.forEach(Tr)),t.p||((l=t.e)==null||l.remove(),delete t.e),typeof t.tag=="function"&&(Pe.delete(t),Je.delete(t),delete t[q][3],t.a=!0)},jr=(t,r,i)=>{t.c=r,Lr(t,r,i)},Ut=(t,r)=>{if(r){for(let i=0,s=t.length;i<s;i++)if(t[i]===r)return i}},Ht=Symbol(),Lr=(t,r,i)=>{var d;const s=[],n=[],a=[];Fr(t,r,s,n,a),n.forEach(Tr);const l=i?void 0:r.childNodes;let o,c=null;if(i)o=-1;else if(!l.length)o=0;else{const h=Ut(l,Ji(t.nN));h!==void 0?(c=l[h],o=h):o=Ut(l,(d=s.find(f=>f.tag!==je&&f.e))==null?void 0:d.e)??-1,o===-1&&(i=!0)}for(let h=0,f=s.length;h<f;h++,o++){const m=s[h];let g;if(m.s&&m.e)g=m.e,m.s=!1;else{const x=i||!m.e;z(m)?(m.e&&m.d&&(m.e.textContent=m.t),m.d=!1,g=m.e||(m.e=document.createTextNode(m.t))):(g=m.e||(m.e=m.n?document.createElementNS(m.n,m.tag):document.createElement(m.tag)),Ki(g,m.props,m.pP),Lr(m,g,x))}m.tag===je?o--:i?g.parentNode||r.appendChild(g):l[o]!==g&&l[o-1]!==g&&(l[o+1]===g?r.appendChild(l[o]):r.insertBefore(g,c||l[o]||null))}if(t.pP&&delete t.pP,a.length){const h=[],f=[];a.forEach(([,m,,g,x])=>{m&&h.push(m),g&&f.push(g),x==null||x()}),h.forEach(m=>m()),f.length&&requestAnimationFrame(()=>{f.forEach(m=>m())})}},es=(t,r)=>!!(t&&t.length===r.length&&t.every((i,s)=>i[1]===r[s][1])),Je=new WeakMap,wt=(t,r,i)=>{var a,l,o,c,d,h;const s=!i&&r.pC;i&&(r.pC||(r.pC=r.vC));let n;try{i||(i=typeof r.tag=="function"?Yi(t,r):Be(r.props.children)),((a=i[0])==null?void 0:a.tag)===""&&i[0][xt]&&(n=i[0][xt],t[5].push([t,n,r]));const f=s?[...r.pC]:r.vC?[...r.vC]:void 0,m=[];let g;for(let x=0;x<i.length;x++){Array.isArray(i[x])&&i.splice(x,1,...i[x].flat());let v=ts(i[x]);if(v){typeof v.tag=="function"&&!v.tag[lr]&&(ke.length>0&&(v[q][2]=ke.map(w=>[w,w.values.at(-1)])),(l=t[5])!=null&&l.length&&(v[q][3]=t[5].at(-1)));let p;if(f&&f.length){const w=f.findIndex(z(v)?C=>z(C):v.key!==void 0?C=>C.key===v.key&&C.tag===v.tag:C=>C.tag===v.tag);w!==-1&&(p=f[w],f.splice(w,1))}if(p)if(z(v))p.t!==v.t&&(p.t=v.t,p.d=!0),v=p;else{const w=p.pP=p.props;if(p.props=v.props,p.f||(p.f=v.f||r.f),typeof v.tag=="function"){const C=p[q][2];p[q][2]=v[q][2]||[],p[q][3]=v[q][3],!p.f&&((p.o||p)===v.o||(c=(o=p.tag)[Hr])!=null&&c.call(o,w,p.props))&&es(C,p[q][2])&&(p.s=!0)}v=p}else if(!z(v)&&Ce){const w=Ee(Ce);w&&(v.n=w)}if(!z(v)&&!v.s&&(wt(t,v),delete v.f),m.push(v),g&&!g.s&&!v.s)for(let w=g;w&&!z(w);w=(d=w.vC)==null?void 0:d.at(-1))w.nN=v;g=v}}r.vR=s?[...r.vC,...f||[]]:f||[],r.vC=m,s&&delete r.pC}catch(f){if(r.f=!0,f===Ht){if(n)return;throw f}const[m,g,x]=((h=r[q])==null?void 0:h[3])||[];if(g){const v=()=>et([0,!1,t[2]],x),p=Je.get(x)||[];p.push(v),Je.set(x,p);const w=g(f,()=>{const C=Je.get(x);if(C){const S=C.indexOf(v);if(S!==-1)return C.splice(S,1),v()}});if(w){if(t[0]===1)t[1]=!0;else if(wt(t,x,[w]),(g.length===1||t!==m)&&x.c){jr(x,x.c,!1);return}throw Ht}}throw f}finally{n&&t[5].pop()}},ts=t=>{if(!(t==null||typeof t=="boolean")){if(typeof t=="string"||typeof t=="number")return{t:t.toString(),d:!0};if("vR"in t&&(t={tag:t.tag,props:t.props,key:t.key,f:t.f,type:t.tag,ref:t.props.ref,o:t.o||t}),typeof t.tag=="function")t[q]=[0,[]];else{const r=Xi[t.tag];r&&(Ce||(Ce=cr("")),t.props.children=[{tag:Ce,props:{value:t.n=`http://www.w3.org/${r}`,children:t.props.children}}])}return t}},Gt=(t,r)=>{var i,s;(i=r[q][2])==null||i.forEach(([n,a])=>{n.values.push(a)});try{wt(t,r,void 0)}catch{return}if(r.a){delete r.a;return}(s=r[q][2])==null||s.forEach(([n])=>{n.values.pop()}),(t[0]!==1||!t[1])&&jr(r,r.c,!1)},Pe=new WeakMap,Qt=[],et=async(t,r)=>{t[5]||(t[5]=[]);const i=Pe.get(r);i&&i[0](void 0);let s;const n=new Promise(a=>s=a);if(Pe.set(r,[s,()=>{t[2]?t[2](t,r,a=>{Gt(a,r)}).then(()=>s(r)):(Gt(t,r),s(r))}]),Qt.length)Qt.at(-1).add(r);else{await Promise.resolve();const a=Pe.get(r);a&&(Pe.delete(r),a[1]())}return n},rs=(t,r,i)=>({tag:je,props:{children:t},key:i,e:r,p:1}),ft=0,Mr=1,mt=2,gt=3,pt=new WeakMap,Or=(t,r)=>!t||!r||t.length!==r.length||r.some((i,s)=>i!==t[s]),is=void 0,Wt=[],ss=t=>{var l;const r=()=>typeof t=="function"?t():t,i=Le.at(-1);if(!i)return[r(),()=>{}];const[,s]=i,n=(l=s[q][1])[ft]||(l[ft]=[]),a=s[q][0]++;return n[a]||(n[a]=[r(),o=>{const c=is,d=n[a];if(typeof o=="function"&&(o=o(d[0])),!Object.is(o,d[0]))if(d[0]=o,Wt.length){const[h,f]=Wt.at(-1);Promise.all([h===3?s:et([h,!1,c],s),f]).then(([m])=>{if(!m||!(h===2||h===3))return;const g=m.vC;requestAnimationFrame(()=>{setTimeout(()=>{g===m.vC&&et([h===3?1:0,!1,c],m)})})})}else et([0,!1,c],s)}])},St=(t,r)=>{var o;const i=Le.at(-1);if(!i)return t;const[,s]=i,n=(o=s[q][1])[mt]||(o[mt]=[]),a=s[q][0]++,l=n[a];return Or(l==null?void 0:l[1],r)?n[a]=[t,r]:t=n[a][0],t},ns=t=>{const r=pt.get(t);if(r){if(r.length===2)throw r[1];return r[0]}throw t.then(i=>pt.set(t,[i]),i=>pt.set(t,[void 0,i])),t},as=(t,r)=>{var o;const i=Le.at(-1);if(!i)return t();const[,s]=i,n=(o=s[q][1])[gt]||(o[gt]=[]),a=s[q][0]++,l=n[a];return Or(l==null?void 0:l[1],r)&&(n[a]=[t(),r]),n[a][0]},ls=cr({pending:!1,data:null,method:null,action:null}),Xt=new Set,os=t=>{Xt.add(t),t.finally(()=>Xt.delete(t))},Pt=(t,r)=>as(()=>i=>{let s;t&&(typeof t=="function"?s=t(i)||(()=>{t(null)}):t&&"current"in t&&(t.current=i,s=()=>{t.current=null}));const n=r(i);return()=>{n==null||n(),s==null||s()}},[t]),ue=Object.create(null),Ge=Object.create(null),$e=(t,r,i,s,n)=>{if(r!=null&&r.itemProp)return{tag:t,props:r,type:t,ref:r.ref};const a=document.head;let{onLoad:l,onError:o,precedence:c,blocking:d,...h}=r,f=null,m=!1;const g=Qe[t];let x;if(g.length>0){const C=a.querySelectorAll(t);e:for(const S of C)for(const R of Qe[t])if(S.getAttribute(R)===r[R]){f=S;break e}if(!f){const S=g.reduce((R,P)=>r[P]===void 0?R:`${R}-${P}-${r[P]}`,t);m=!Ge[S],f=Ge[S]||(Ge[S]=(()=>{const R=document.createElement(t);for(const P of g)r[P]!==void 0&&R.setAttribute(P,r[P]),r.rel&&R.setAttribute("rel",r.rel);return R})())}}else x=a.querySelectorAll(t);c=s?c??"":void 0,s&&(h[We]=c);const v=St(C=>{if(g.length>0){let S=!1;for(const R of a.querySelectorAll(t)){if(S&&R.getAttribute(We)!==c){a.insertBefore(C,R);return}R.getAttribute(We)===c&&(S=!0)}a.appendChild(C)}else if(x){let S=!1;for(const R of x)if(R===C){S=!0;break}S||a.insertBefore(C,a.contains(x[0])?x[0]:a.querySelector(t)),x=void 0}},[c]),p=Pt(r.ref,C=>{var P;const S=g[0];if(i===2&&(C.innerHTML=""),(m||x)&&v(C),!o&&!l)return;let R=ue[P=C.getAttribute(S)]||(ue[P]=new Promise((Ae,Ue)=>{C.addEventListener("load",Ae),C.addEventListener("error",Ue)}));l&&(R=R.then(l)),o&&(R=R.catch(o)),R.catch(()=>{})});if(n&&d==="render"){const C=Qe[t][0];if(r[C]){const S=r[C],R=ue[S]||(ue[S]=new Promise((P,Ae)=>{v(f),f.addEventListener("load",P),f.addEventListener("error",Ae)}));ns(R)}}const w={tag:t,type:t,props:{...h,ref:p},ref:p};return w.p=i,f&&(w.e=f),rs(w,a)},cs=t=>{const r=Zi(),i=r&&Ee(r);return i!=null&&i.endsWith("svg")?{tag:"title",props:t,type:"title",ref:t.ref}:$e("title",t,void 0,!1,!1)},ds=t=>!t||["src","async"].some(r=>!t[r])?{tag:"script",props:t,type:"script",ref:t.ref}:$e("script",t,1,!1,!0),us=t=>!t||!["href","precedence"].every(r=>r in t)?{tag:"style",props:t,type:"style",ref:t.ref}:(t["data-href"]=t.href,delete t.href,$e("style",t,2,!0,!0)),hs=t=>!t||["onLoad","onError"].some(r=>r in t)||t.rel==="stylesheet"&&(!("precedence"in t)||"disabled"in t)?{tag:"link",props:t,type:"link",ref:t.ref}:$e("link",t,1,"precedence"in t,!0),fs=t=>$e("meta",t,void 0,!1,!1),Ir=Symbol(),ms=t=>{const{action:r,...i}=t;typeof r!="function"&&(i.action=r);const[s,n]=ss([null,!1]),a=St(async d=>{const h=d.isTrusted?r:d.detail[Ir];if(typeof h!="function")return;d.preventDefault();const f=new FormData(d.target);n([f,!0]);const m=h(f);m instanceof Promise&&(os(m),await m),n([null,!0])},[]),l=Pt(t.ref,d=>(d.addEventListener("submit",a),()=>{d.removeEventListener("submit",a)})),[o,c]=s;return s[1]=!1,{tag:ls,props:{value:{pending:o!==null,data:o,method:o?"post":null,action:o?r:null},children:{tag:"form",props:{...i,ref:l},type:"form",ref:l}},f:c}},Nr=(t,{formAction:r,...i})=>{if(typeof r=="function"){const s=St(n=>{n.preventDefault(),n.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[Ir]:r}}))},[]);i.ref=Pt(i.ref,n=>(n.addEventListener("click",s),()=>{n.removeEventListener("click",s)}))}return{tag:t,props:i,type:t,ref:i.ref}},gs=t=>Nr("input",t),ps=t=>Nr("button",t);Object.assign(bt,{title:cs,script:ds,style:us,link:hs,meta:fs,form:ms,input:gs,button:ps});Ct(null);new TextEncoder;var xs=Ct(null),bs=(t,r,i,s)=>(n,a)=>{const l="<!DOCTYPE html>",o=i?It(d=>i(d,t),{Layout:r,...a},n):n,c=Ur`${I(l)}${It(xs.Provider,{value:t},o)}`;return t.html(c)},qt=(t,r)=>function(s,n){const a=s.getLayout()??si;return t&&s.setLayout(l=>t({...l,Layout:a},s)),s.setRenderer(bs(s,a,t)),n()};const vs=qt(({children:t})=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"GXO Logistics - Intranet Moissy"}),e("script",{dangerouslySetInnerHTML:{__html:`
          // Désactiver l'avertissement Tailwind CDN
          const originalWarn = console.warn;
          console.warn = function(...args) {
            if (args[0] && args[0].includes && args[0].includes('cdn.tailwindcss.com')) return;
            originalWarn.apply(console, args);
          };
        `}}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("link",{href:"/static/style.css",rel:"stylesheet"}),e("style",{dangerouslySetInnerHTML:{__html:`
          :root {
            --gxo-blue: #FF4500;
            --gxo-orange: #FF4500;
            --gxo-dark: #1a1a1a;
            --gxo-light: #f5f5f5;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          }
          .gxo-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .gxo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 61, 165, 0.2);
          }
          .gxo-btn {
            transition: all 0.2s ease;
          }
          .gxo-btn:hover {
            transform: scale(1.05);
          }
          .checklist-item {
            transition: all 0.3s ease;
          }
          .checklist-item.checked {
            opacity: 0.6;
            text-decoration: line-through;
          }
          @media print {
            .no-print { display: none !important; }
          }
          
          /* Animations pour notifications */
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fade-out {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          .animate-fade-out {
            animation: fade-out 0.3s ease-out;
          }
          
          /* Styles pour les étoiles */
          .star-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
          }
          .star-btn:hover {
            filter: brightness(1.2);
          }
          
          /* Animations pour le logo de connexion */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-shimmer {
            animation: shimmer 3s ease-in-out infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          /* Animations pour la scène logistique de connexion */
          @keyframes truck-bounce {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes box-slide {
            0% {
              transform: translateX(0) translateY(0);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(30px) translateY(-10px);
              opacity: 0;
            }
          }
          
          @keyframes forklift-move {
            0%, 100% {
              transform: translateX(0) translateY(-50%);
            }
            50% {
              transform: translateX(15px) translateY(-50%);
            }
          }
          
          @keyframes worker-wave {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(15deg);
            }
            75% {
              transform: rotate(-15deg);
            }
          }
          
          @keyframes check-pop {
            0%, 100% {
              transform: scale(1);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
            }
            90% {
              opacity: 1;
            }
          }
          
          @keyframes arrow-flow {
            0%, 100% {
              opacity: 0.3;
              transform: translateX(0);
            }
            50% {
              opacity: 1;
              transform: translateX(10px);
            }
          }
          
          .animate-truck-bounce {
            animation: truck-bounce 2s ease-in-out infinite;
          }
          
          .animate-box-slide {
            animation: box-slide 2s ease-in-out infinite;
          }
          
          .animate-forklift-move {
            animation: forklift-move 4s ease-in-out infinite;
          }
          
          .animate-worker-wave {
            animation: worker-wave 1.5s ease-in-out infinite;
          }
          
          .animate-check-pop {
            animation: check-pop 3s ease-in-out infinite;
          }
          
          .animate-check-1 {
            animation: fade-in 0.5s ease-out;
          }
          
          .animate-check-2 {
            animation: fade-in 0.5s ease-out 1s;
          }
          
          .animate-check-3 {
            animation: fade-in 0.5s ease-out 2s;
          }
          
          .animate-arrow-flow {
            animation: arrow-flow 2s ease-in-out infinite;
          }
          
          /* Titre de navigation - Desktop */
          nav {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: #FF4500;
          }
          nav .text-lg {
            font-size: 1.125rem;
            line-height: 1.4;
            font-weight: 700;
            letter-spacing: 0.3px;
          }
          nav .text-xs {
            font-size: 0.75rem;
            opacity: 0.9;
            font-weight: 400;
          }
          
          /* Mode Mobile Simulator */
          /* Mode Mobile - Optimisé pour petits écrans */
          body.mobile-mode {
            max-width: 430px;
            margin: 0 auto;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
            font-size: 15px;
            line-height: 1.6;
          }
          body.mobile-mode .container {
            max-width: 100%;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          /* Navigation mobile compacte */
          body.mobile-mode nav {
            border-radius: 0;
          }
          body.mobile-mode nav #nav-container {
            flex-direction: column;
            padding: 0.75rem;
            gap: 0.75rem;
            align-items: center;
          }
          
          /* Logo et titre centrés en mobile */
          body.mobile-mode nav #nav-container > a {
            width: 100%;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode nav #nav-container > a .flex {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          body.mobile-mode nav img {
            height: 40px;
            margin: 0 auto;
          }
          body.mobile-mode nav .border-l {
            border-left: none;
            padding-left: 0;
            text-align: center;
            width: 100%;
          }
          
          /* Titre en mobile - Plus lisible */
          body.mobile-mode nav .text-lg {
            font-size: 1.1rem;
            line-height: 1.3;
          }
          body.mobile-mode nav .text-xs {
            font-size: 0.85rem;
            margin-top: 0.125rem;
          }
          
          /* Menu de navigation mobile */
          body.mobile-mode nav #nav-links {
            flex-direction: column;
            width: 100%;
            margin-top: 0;
            gap: 0;
            align-items: stretch;
          }
          body.mobile-mode nav #nav-links a {
            width: 100%;
            text-align: left;
            padding: 0.875rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            min-height: 48px;
          }
          body.mobile-mode nav #nav-links a:last-child {
            border-bottom: none;
          }
          body.mobile-mode nav #nav-links a i {
            margin-right: 0.75rem;
            width: 24px;
            text-align: center;
            font-size: 1.1rem;
          }
          body.mobile-mode nav #nav-links a span {
            font-size: 1rem;
          }
          
          /* Typographie mobile */
          body.mobile-mode h1 {
            font-size: 1.75rem;
            line-height: 1.3;
            margin-bottom: 1rem;
          }
          body.mobile-mode h2 {
            font-size: 1.4rem;
            line-height: 1.3;
            margin-bottom: 0.875rem;
          }
          body.mobile-mode h3 {
            font-size: 1.15rem;
            line-height: 1.3;
            margin-bottom: 0.75rem;
          }
          
          /* Cartes mobile */
          body.mobile-mode .gxo-card,
          body.mobile-mode .bg-white.rounded-lg.shadow-md {
            padding: 1rem;
            margin-bottom: 0.875rem;
          }
          
          /* Alignement des éléments dans les cartes */
          body.mobile-mode .gxo-card > *,
          body.mobile-mode .bg-white > * {
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: left;
          }
          
          /* Flex items en mobile - tout aligner à gauche */
          body.mobile-mode .flex {
            align-items: flex-start;
          }
          body.mobile-mode .flex.items-center {
            align-items: center;
          }
          
          /* Corriger les marges négatives */
          body.mobile-mode [class*="-mx-"],
          body.mobile-mode [class*="mx-"] {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          /* Corriger les paddings négatifs */
          body.mobile-mode [class*="-px-"] {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          /* Boutons mobile */
          body.mobile-mode button,
          body.mobile-mode .gxo-btn {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            min-height: 44px;
          }
          
          /* Inputs mobile */
          body.mobile-mode input,
          body.mobile-mode textarea,
          body.mobile-mode select {
            font-size: 16px !important;
            padding: 0.75rem !important;
            min-height: 48px;
            width: 100%;
            box-sizing: border-box;
          }
          
          /* Groupes de formulaire mobile */
          body.mobile-mode .form-group,
          body.mobile-mode .input-group {
            margin-bottom: 1rem;
            width: 100%;
          }
          
          /* Labels mobile plus lisibles */
          body.mobile-mode label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
            font-weight: 500;
          }
          
          /* Grilles mobile - empilage vertical */
          body.mobile-mode .grid {
            grid-template-columns: 1fr !important;
            gap: 0.875rem;
          }
          
          /* Espacement mobile réduit */
          body.mobile-mode main {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          
          /* Tableaux mobile - scroll horizontal */
          body.mobile-mode table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
            font-size: 0.9rem;
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }
          body.mobile-mode table td,
          body.mobile-mode table th {
            padding: 0.5rem 0.75rem;
            min-width: 100px;
          }
          
          /* Listes mobile */
          body.mobile-mode ul,
          body.mobile-mode ol {
            padding-left: 1.25rem;
            margin-bottom: 1rem;
          }
          body.mobile-mode li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
          }
          
          /* Images mobile responsive */
          body.mobile-mode img {
            max-width: 100%;
            height: auto;
          }
          
          /* Header/Ruban page d'accueil - Mobile */
          body.mobile-mode .bg-gradient-to-r {
            padding: 1.5rem 1rem 2rem;
          }
          
          /* Conteneur principal en colonne */
          body.mobile-mode .bg-gradient-to-r .flex.items-center.justify-between {
            flex-direction: column;
            gap: 1.25rem;
            align-items: stretch;
            width: 100%;
          }
          
          /* Logo GXO centré en haut */
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.5rem;
            width: 100%;
          }
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 img {
            height: 3rem;
          }
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
          }
          body.mobile-mode .bg-gradient-to-r h1 {
            font-size: 1.5rem;
            text-align: center;
            line-height: 1.3;
            margin: 0;
          }
          body.mobile-mode .bg-gradient-to-r p {
            font-size: 0.95rem;
            text-align: center;
            margin: 0;
          }
          
          /* Texte descriptif au milieu */
          body.mobile-mode .bg-gradient-to-r #hero-description {
            order: 2;
            text-align: center;
            font-size: 0.75rem;
            line-height: 1.4;
            padding: 0.75rem 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            margin: 0.5rem 0;
          }
          
          /* Compteur en bas */
          body.mobile-mode .bg-gradient-to-r #hero-counter {
            order: 3;
            text-align: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
          }
          body.mobile-mode .bg-gradient-to-r .text-5xl {
            font-size: 3rem;
            line-height: 1;
            margin: 0;
          }
          body.mobile-mode .bg-gradient-to-r .text-sm {
            font-size: 0.65rem;
            margin: 0;
            line-height: 1.2;
            opacity: 0.85;
          }
          
          /* Ajouter de l'espace pour le sous-titre */
          body.mobile-mode .bg-gradient-to-r .flex.items-center.justify-between {
            padding-bottom: 2rem;
          }
          
          /* Footer mobile compact */
          body.mobile-mode footer {
            font-size: 0.85rem;
            padding: 1rem 0.75rem;
          }
          
          /* Modals mobile plein écran */
          body.mobile-mode .fixed.inset-0 > div {
            max-width: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          
          /* Badges et tags mobile */
          body.mobile-mode .badge,
          body.mobile-mode .inline-flex.items-center {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
          }
          
          /* Icônes mobile légèrement plus grandes */
          body.mobile-mode i.fas,
          body.mobile-mode i.far {
            font-size: 1.1em;
          }
          
          /* Liens mobile avec zone tactile */
          body.mobile-mode a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
          
          /* PAGE CONTACTS - Mobile optimisé */
          body.mobile-mode #contacts-grid {
            grid-template-columns: 1fr !important;
          }
          body.mobile-mode .contact-card {
            padding: 1rem;
          }
          body.mobile-mode .contact-card h3 {
            font-size: 1.1rem;
          }
          body.mobile-mode .contact-info {
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode .contact-actions {
            flex-direction: column;
            width: 100%;
          }
          body.mobile-mode .contact-actions button {
            width: 100%;
          }
          
          /* PAGE BIBLIOTHÈQUE - Mobile optimisé */
          body.mobile-mode #documents-grid {
            grid-template-columns: 1fr !important;
          }
          body.mobile-mode .document-card {
            padding: 1rem;
          }
          body.mobile-mode .document-card h3 {
            font-size: 1rem;
            line-height: 1.3;
          }
          body.mobile-mode .document-actions {
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode .document-actions button {
            width: 100%;
          }
          
          /* Filtres mobile - Stack vertical */
          body.mobile-mode .filter-buttons,
          body.mobile-mode .service-filters {
            flex-direction: column !important;
            gap: 0.5rem;
          }
          body.mobile-mode .filter-buttons button {
            width: 100%;
            justify-content: center;
          }
          
          /* Barre de recherche mobile */
          body.mobile-mode .search-container {
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode .search-container input {
            width: 100%;
          }
          body.mobile-mode .search-container button {
            width: 100%;
          }
          
          /* Checklist mobile */
          body.mobile-mode .checklist-item {
            padding: 0.75rem;
            font-size: 0.95rem;
          }
          body.mobile-mode .checklist-item input[type="checkbox"] {
            width: 20px;
            height: 20px;
          }
          
          /* Arbre de décision mobile */
          body.mobile-mode .decision-tree-node {
            padding: 0.875rem;
            font-size: 0.95rem;
          }
          body.mobile-mode .decision-tree-option {
            padding: 0.75rem;
            margin: 0.5rem 0;
          }
          
          /* Bouton Toggle Desktop/Mobile */
          .viewport-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: linear-gradient(135deg, #FF4500 0%, #FF5A1A 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 56px;
            height: 56px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 32, 91, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            position: relative;
          }
          .viewport-toggle:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 6px 20px rgba(0, 32, 91, 0.6);
          }
          .viewport-toggle:active {
            transform: scale(0.95);
          }
          
          /* Indicateur AUTO */
          .auto-indicator {
            position: absolute;
            bottom: -20px;
            right: 50%;
            transform: translateX(50%);
            background: #FF4500;
            color: white;
            font-size: 8px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 10px;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 6px rgba(255, 107, 53, 0.4);
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          .auto-indicator.hidden {
            opacity: 0;
            pointer-events: none;
          }
          
          @media print {
            .viewport-toggle { display: none; }
          }
        `}})]}),e("body",{class:"bg-gray-50",children:[e("nav",{class:"bg-[#FF4500] text-white shadow-lg no-print sticky top-0 z-50",id:"main-nav",children:e("div",{class:"container mx-auto px-4 py-3 flex items-center justify-between",id:"nav-container",children:[e("a",{href:"/",class:"flex items-center space-x-3 hover:opacity-90 transition-opacity",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-10"}),e("div",{class:"border-l border-white/30 pl-3",children:[e("div",{class:"text-lg font-bold",children:"HUB Procédures Logistique"}),e("div",{class:"text-xs opacity-90",children:"Moissy-Cramayel"})]})]}),e("div",{class:"flex items-center space-x-4",id:"nav-links",children:[e("a",{href:"/",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-home mr-2"}),e("span",{children:"Accueil"})]}),e("a",{href:"/bibliotheque",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-book mr-2"}),e("span",{children:"Bibliothèque"})]}),e("a",{href:"/contacts",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-address-book mr-2"}),e("span",{children:"Contacts"})]}),e("a",{href:"/anomalies",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),e("span",{children:"Anomalies"})]})]})]})}),e("main",{class:"container mx-auto px-4 py-8",children:t}),e("div",{id:"review-modal",class:"hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 no-print",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto",children:[e("div",{class:"bg-[#FF4500] text-white p-6 rounded-t-lg",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h3",{class:"text-2xl font-bold",children:"Donner votre avis"}),e("p",{class:"text-sm opacity-75 mt-1",id:"review-modal-title",children:"Procédure"})]}),e("button",{onclick:"closeReviewModal()",class:"text-white hover:text-[#FF4500] transition-colors text-2xl",children:e("i",{class:"fas fa-times"})})]})}),e("div",{class:"p-6",children:[e("form",{id:"review-form",onsubmit:"submitReview(event)",class:"mb-6",children:[e("input",{type:"hidden",id:"review-procedure-id"}),e("div",{class:"mb-6",children:[e("label",{class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-star text-yellow-500 mr-2"}),"Votre note (optionnel)"]}),e("div",{id:"rating-stars"})]}),e("div",{class:"mb-4",children:[e("label",{for:"review-name",class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-user mr-2"}),"Votre nom (optionnel)"]}),e("input",{type:"text",id:"review-name",placeholder:"Anonyme",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none"})]}),e("div",{class:"mb-6",children:[e("label",{for:"review-comment",class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-comment mr-2"}),"Votre commentaire (optionnel)"]}),e("textarea",{id:"review-comment",rows:"4",placeholder:"Partagez votre expérience, des conseils, ou des suggestions d'amélioration...",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none resize-none"}),e("p",{class:"text-xs text-gray-500 mt-1",children:"Minimum 10 caractères recommandé"})]}),e("div",{class:"flex gap-3",children:[e("button",{type:"submit",class:"flex-1 bg-[#FF4500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5A1A] transition-colors",children:[e("i",{class:"fas fa-paper-plane mr-2"}),"Publier"]}),e("button",{type:"button",onclick:"closeReviewModal()",class:"px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors",children:"Annuler"})]})]}),e("div",{class:"border-t pt-6",children:[e("h4",{class:"text-xl font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-comments mr-2"}),"Avis de la communauté"]}),e("div",{id:"reviews-list"})]})]})]})}),e("footer",{class:"bg-gray-800 text-white py-6 mt-12 no-print",children:e("div",{class:"container mx-auto px-4 text-center",children:[e("p",{class:"text-sm",children:"© 2026 GXO Logistics - Site de Moissy-Cramayel"}),e("p",{class:"text-xs mt-2 opacity-75",children:"Intranet des procédures logistiques"})]})}),e("button",{id:"viewport-toggle",class:"viewport-toggle no-print",onclick:"toggleViewportMode()",title:"Mode adaptatif automatique - Cliquez pour forcer un mode",children:[e("i",{id:"viewport-icon",class:"fas fa-mobile-alt"}),e("span",{id:"auto-indicator",class:"auto-indicator",children:"AUTO"})]}),e("script",{src:"/static/auth.js"}),e("script",{src:"/static/app.js"}),e("script",{src:"/static/reviews.js"}),e("script",{src:"/static/onboarding.js"}),e("script",{src:"/static/decision-tree.js"}),e("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
        `}})]})]})),Ft=qt(({children:t})=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Connexion - GXO Logistics Moissy"}),e("script",{dangerouslySetInnerHTML:{__html:`
          // Désactiver l'avertissement Tailwind CDN
          const originalWarn = console.warn;
          console.warn = function(...args) {
            if (args[0] && args[0].includes && args[0].includes('cdn.tailwindcss.com')) return;
            originalWarn.apply(console, args);
          };
        `}}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("style",{dangerouslySetInnerHTML:{__html:`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
        `}})]}),e("body",{children:[t,e("script",{src:"/static/auth.js"})]})]})),ys=qt(({children:t})=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"GXO Logistics - Chauffeur"}),e("script",{dangerouslySetInnerHTML:{__html:`
          const originalWarn = console.warn;
          console.warn = function(...args) {
            if (args[0] && args[0].includes && args[0].includes('cdn.tailwindcss.com')) return;
            originalWarn.apply(console, args);
          };
        `}}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"})]}),e("body",{class:"bg-black",children:t})]}));function ws(){const t=[{id:"reception",title:"Réception",icon:"fa-truck-loading",color:"bg-orange-500",description:"Base générale des procédures - Réception marchandises",processes:29},{id:"accueil-chauffeur",title:"Accueil Chauffeur",icon:"fa-truck",color:"bg-blue-500",description:"Procédures d'arrivée et livraison chauffeurs",processes:4},{id:"administrateur",title:"Administrateur",icon:"fa-user-tie",color:"bg-purple-500",description:"Gestion administrative et suivi documentaire",processes:5},{id:"controleur",title:"Contrôleur",icon:"fa-user-check",color:"bg-green-500",description:"Contrôle qualité et conformité réception",processes:5},{id:"agent-quai",title:"Agent de Quai",icon:"fa-hard-hat",color:"bg-yellow-500",description:"Opérations de déchargement et contrôle",processes:6},{id:"nouveau",title:"Nouvel Arrivant",icon:"fa-graduation-cap",color:"bg-pink-500",description:"Parcours d'intégration et formations de base",processes:6},{id:"anomalies",title:"Anomalies / FAQ",icon:"fa-exclamation-circle",color:"bg-red-500",description:"Gestion incidents, litiges, arbres de décision",processes:20}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white rounded-lg shadow-xl p-8 mb-8 relative overflow-hidden",children:[e("div",{class:"absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block",children:e("svg",{viewBox:"0 0 400 300",class:"w-full h-full",children:[e("rect",{x:"50",y:"80",width:"80",height:"40",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"50",y:"130",width:"80",height:"40",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"50",y:"180",width:"80",height:"40",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"150",y:"80",width:"80",height:"40",fill:"currentColor",opacity:"0.6"}),e("rect",{x:"150",y:"130",width:"80",height:"40",fill:"currentColor",opacity:"0.6"}),e("rect",{x:"150",y:"180",width:"80",height:"40",fill:"currentColor",opacity:"0.6"}),e("g",{transform:"translate(270, 180)",children:[e("rect",{x:"0",y:"20",width:"60",height:"30",fill:"#FF4500",opacity:"0.9"}),e("rect",{x:"35",y:"5",width:"25",height:"15",fill:"#FF4500",opacity:"0.9"}),e("circle",{cx:"15",cy:"55",r:"8",fill:"currentColor"}),e("circle",{cx:"50",cy:"55",r:"8",fill:"currentColor"}),e("rect",{x:"-15",y:"25",width:"10",height:"30",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"-5",y:"-20",width:"5",height:"45",fill:"currentColor",opacity:"0.7"})]}),e("rect",{x:"60",y:"90",width:"15",height:"20",fill:"#FF4500",opacity:"0.7"}),e("rect",{x:"80",y:"90",width:"15",height:"20",fill:"#FF4500",opacity:"0.5"}),e("rect",{x:"160",y:"140",width:"15",height:"20",fill:"#FF4500",opacity:"0.6"})]})}),e("div",{class:"flex items-center justify-between relative z-10",children:[e("div",{class:"flex items-start space-x-6",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-16 mt-2",id:"hero-logo"}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:"HUB Procédures Logistiques"}),e("p",{class:"text-xl opacity-90",children:"Intranet Moissy-Cramayel"})]})]}),e("div",{class:"text-right",id:"hero-counter",children:[e("div",{class:"text-5xl font-bold",children:t.reduce((r,i)=>r+i.processes,0)}),e("div",{class:"text-sm opacity-75 mt-1",children:"Procédures disponibles"})]})]}),e("div",{class:"text-center text-xs opacity-75 mt-4 leading-tight",id:"hero-description",children:"Accès direct à tous les documents et contacts de l'équipe GXO Moissy-Cramayel"})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",children:[e("div",{class:"bg-white rounded-lg shadow p-4 border-l-4 border-orange-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-500 text-xs",children:"Accès rapide"}),e("p",{class:"text-xl font-bold text-gray-800",children:"En 2 clics"})]}),e("i",{class:"fas fa-mouse-pointer text-3xl text-orange-500"})]})}),e("div",{class:"bg-white rounded-lg shadow p-4 border-l-4 border-green-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-500 text-xs",children:"Assistance"}),e("p",{class:"text-xl font-bold text-gray-800",children:"24h/24"})]}),e("i",{class:"fas fa-headset text-3xl text-green-500"})]})}),e("div",{class:"bg-white rounded-lg shadow p-4 border-l-4 border-orange-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-500 text-xs",children:"Compatible"}),e("p",{class:"text-xl font-bold text-gray-800",children:"Mobile"})]}),e("i",{class:"fas fa-mobile-alt text-3xl text-orange-500"})]})})]}),e("div",{children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-briefcase mr-3 text-[#FF5A1A]"}),"Sélectionnez votre métier"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(r=>e("a",{href:`/${r.id}`,class:"block",children:e("div",{class:`gxo-card bg-white rounded-lg shadow-lg overflow-hidden border-t-4 ${r.color.replace("bg-","border-")}`,children:e("div",{class:"p-6",children:[e("div",{class:"flex items-start justify-between mb-4",children:[r.id==="cariste"?e("div",{class:"w-16 h-16 rounded-full overflow-hidden flex items-center justify-center",children:e("img",{src:"/static/ipl-icon.svg",alt:"IPL",class:"w-full h-full"})}):e("div",{class:`${r.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl`,children:e("i",{class:`fas ${r.icon}`})}),e("span",{class:"bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full",children:[r.processes," process"]})]}),e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("p",{class:"text-gray-600 text-sm mb-4",children:r.description}),e("div",{class:"flex items-center justify-between",children:[e("span",{class:`text-sm font-semibold ${r.color.replace("bg-","text-")}`,children:"Voir les procédures"}),e("i",{class:"fas fa-arrow-right text-gray-400"})]})]})})}))})]}),e("div",{class:"mt-12 bg-white rounded-lg shadow-lg p-8",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-bolt mr-3 text-yellow-500"}),"Accès rapide"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[e("a",{href:"/reception#reception-standard",class:"flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Réception standard"})]}),e("a",{href:"/agent-quai#chargement-camion",class:"flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors",children:[e("i",{class:"fas fa-dolly text-yellow-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Chargement camion"})]}),e("a",{href:"/controleur#controle-qualite",class:"flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Contrôle qualité"})]}),e("a",{href:"/accueil-chauffeur#accueil-standard",class:"flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors",children:[e("i",{class:"fas fa-truck text-blue-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Accueil chauffeur"})]}),e("a",{href:"/administrateur#gestion-documents",class:"flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors",children:[e("i",{class:"fas fa-file-invoice text-purple-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Gestion documents"})]}),e("a",{href:"/anomalies#retour-fournisseur",class:"flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors",children:[e("i",{class:"fas fa-undo text-red-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Retour fournisseur"})]}),e("a",{href:"/nouveau",class:"flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors",children:[e("i",{class:"fas fa-graduation-cap text-pink-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Parcours intégration"})]}),e("a",{href:"/contacts",class:"flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors",children:[e("i",{class:"fas fa-address-book text-indigo-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Annuaire contacts"})]})]})]}),e("div",{class:"mt-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-folder-open mr-3 text-gray-600"}),"Ressources & Documents"]}),e("div",{class:"flex flex-wrap gap-4",children:[e("a",{href:"/bibliotheque",class:"inline-block bg-[#FF5A1A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E53D00] transition-colors",children:[e("i",{class:"fas fa-book mr-2"}),"Bibliothèque de documents (34)"]}),e("a",{href:"/contacts",class:"inline-block bg-[#FF4500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5A1A] transition-colors",children:[e("i",{class:"fas fa-address-book mr-2"}),"Annuaire des contacts (20)"]})]})]})]})}function ks(){return e("div",{children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:[e("i",{class:"fas fa-truck-loading mr-3"}),"Réception"]}),e("p",{class:"text-xl opacity-90",children:"Réception marchandises, contrôle BL, déchargement"})]}),e("a",{href:"/",class:"bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"bg-white rounded-lg shadow p-6 mb-8",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-info-circle mr-2 text-orange-500"}),"Niveaux de complexité"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e("div",{class:"flex items-center",children:[e("span",{class:"text-2xl mr-3",children:"🟢"}),e("div",{children:[e("div",{class:"font-semibold text-green-600",children:"Niveau 1 - Essentiel"}),e("div",{class:"text-sm text-gray-600",children:"Opérations de base quotidiennes"})]})]}),e("div",{class:"flex items-center",children:[e("span",{class:"text-2xl mr-3",children:"🟡"}),e("div",{children:[e("div",{class:"font-semibold text-yellow-600",children:"Niveau 2 - Standard"}),e("div",{class:"text-sm text-gray-600",children:"Procédures intermédiaires"})]})]}),e("div",{class:"flex items-center",children:[e("span",{class:"text-2xl mr-3",children:"🔴"}),e("div",{children:[e("div",{class:"font-semibold text-red-600",children:"Niveau 3 - Avancé"}),e("div",{class:"text-sm text-gray-600",children:"Cas complexes et rares"})]})]})]})]}),e("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[{id:"ewm-goods-receipt-manuel",title:"Manuel EWM Goods Receipt (Référence Complète)",icon:"fa-book",duration:"Manuel de référence",level:"🔴",vigilance:["Document de procédure complet EWM","Enregistrement des trucks entrants","Inspection physique des marchandises","Gestion des écarts de livraison","Processus de contrôle qualité","Flux administratif et physique"],document:"EWM Procedure document - 01. Goods Receipt - FR.pdf",description:"Ce document de procédure EWM décrit en détail tous les processus de réception des marchandises au DC : enregistrement trucks, aiguillage vers quais, réception et inspection physique, enregistrement système, signalement/résolution des écarts, et présentation du flux marchandises."},{id:"reception-standard",title:"Réception palette fournisseur",icon:"fa-truck-loading",duration:"15-20 min",level:"🟢",vigilance:["Vérifier état emballage","Scanner BL complet","Contrôle quantité"],document:"Assigner camion à quai-2.docx",checklist:["Vérifier BL du fournisseur (quantité, références)","Inspecter visuellement l'état de l'emballage","Scanner le code-barres du BL","Contrôler le nombre de palettes reçues","Vérifier la température si produits frais","Apposer étiquette si nécessaire","Ranger la palette en zone appropriée","Clôturer la réception dans le système"]},{id:"dechargement",title:"Déchargement camion",icon:"fa-dolly-flatbed",duration:"30-45 min",level:"🟢",vigilance:["Sécurité chauffeur","Respect zone déchargement","Vérifier température si requis"],document:"Assigner camion à quai-2.docx",checklist:["Vérifier l'assignation du camion au quai","Sécuriser la zone (calles, signalisation)","Briefing sécurité avec le chauffeur","Ouvrir les portes du camion","Inspecter visuellement le chargement","Décharger palette par palette avec chariot","Vérifier chaque palette (état, quantité)","Ranger les palettes en zone dédiée","Faire signer le BL au chauffeur","Libérer le quai et fermer la porte"]},{id:"cloture-livraison",title:"Clôture livraison",icon:"fa-check-circle",duration:"5-10 min",level:"🟡",vigilance:["Vérifier ASN","Statut NOT STARTED → COMPLETED","Récupérer TU"],document:"cloture livraison new.docx",checklist:["Ouvrir EWM et accéder à l'ASN","Vérifier le statut de la livraison (NOT STARTED)","Passer le statut à COMPLETED","Récupérer le numéro TU généré","Vérifier les HU associés au TU","Contrôler les quantités","Valider la clôture","Imprimer étiquette TU si nécessaire"]},{id:"cloture-tu",title:"Clôture TU actif",icon:"fa-clipboard-check",duration:"10-15 min",level:"🟡",vigilance:["Filtrer date J-1","Exclure date du jour","Vérifier articles, HU et statut"],document:"Cloture TU actif.docx",checklist:["Accéder à MON → Transport Unit Overview","Filtrer par date J-1 (exclure date du jour)",'Identifier les TU en statut "Active"',"Vérifier les articles associés","Vérifier les HU (Handling Units)","Vérifier le statut de chaque TU","Action : Unload + Finish unloading","Alternative : Arrival + Departure","Valider la clôture",'Vérifier que le statut passe à "Completed"']},{id:"creer-tu",title:"Créer TU",icon:"fa-plus-circle",duration:"5 min",level:"🟢",vigilance:["Numéro de document ou ERP","Vérifier zone destination"],document:"Créer TU.docx",checklist:["Récupérer le numéro de document ou ERP","Accéder à la transaction de création TU","Saisir le numéro de document","Sélectionner la zone de destination","Vérifier les articles à inclure","Valider la création du TU","Noter le numéro TU généré","Imprimer l'étiquette TU"]},{id:"verification-dossier",title:"Vérification dossier après contrôle",icon:"fa-folder-open",duration:"10-15 min",level:"🔴",vigilance:["Vérifier manco/surplus","Comparer avec BL","Déclarer surplus sous 48h"],document:"Verification dossier aprés control.docx",checklist:["Récupérer le BL et le dossier de réception","Comparer les quantités BL vs réception physique","Identifier les mancos (manquants)","Identifier les surplus (excédents)","Si surplus : créer fichier GDS pour re-contrôle","Si manco : signaler à Invoice Moissy sous 48h","Prendre des photos si nécessaire","Remplir le rapport d'écart","Informer le chef d'équipe","Archiver le dossier complété"]},{id:"etiquette",title:"Rééditer une étiquette",icon:"fa-barcode",duration:"2-3 min",level:"🟢",vigilance:["Récupérer HU correct","Vérifier imprimante","Contrôler impression"],document:"Réediter une étiquette.docx",checklist:["Récupérer le numéro HU (Handling Unit)","Accéder à la transaction MON","Rechercher le HU dans le système","Vérifier les informations du HU",`Sélectionner l'option "Imprimer étiquette"`,"Choisir l'imprimante (contrôleur ou bureau)","Lancer l'impression","Contrôler la qualité de l'étiquette imprimée","Apposer l'étiquette sur la palette"]},{id:"fermer-quai",title:"Fermer une porte de quai",icon:"fa-door-closed",duration:"2 min",level:"🟢",vigilance:["Vérifier absence camion","RFUI transaction"],document:"Fermer une porte de quai.docx",checklist:["Vérifier l'absence de camion au quai","Vérifier que toutes les palettes sont déchargées","Fermer les portes du quai","Accéder à la transaction RFUI","Saisir le numéro de quai",`Sélectionner l'action "Fermer quai"`,"Valider la fermeture",'Vérifier le statut "Quai fermé" dans le système']},{id:"etetage-container",title:"Étêtage et container",icon:"fa-file-excel",duration:"20-30 min",level:"🔴",vigilance:["Filtrer containers uniquement","Trier par date appointment","Export Excel"],document:"Mettre en forme et renseigner le fichier étêtage et container.docx",checklist:['Ouvrir le fichier modèle "Étêtage et container"',"Accéder au portail Action","Filtrer les containers uniquement (exclure palettes)","Trier par date d'appointment","Exporter les données en Excel","Copier les données dans le fichier modèle","Mettre en forme (couleurs, bordures)","Vérifier les informations (quantités, dates)","Ajouter commentaires si nécessaire","Enregistrer et partager avec le chef d'équipe"]},{id:"charger-batterie",title:"Changement / Charge batterie",icon:"fa-battery-three-quarters",duration:"10-15 min",level:"🟢",vigilance:["Sécurité électrique","Niveau charge > 20%","Brancher correctement"],checklist:["Surveiller le niveau de batterie du chariot","Si niveau < 20% → aller à la zone de charge","Stationner le chariot sur zone de charge","Couper le contact du chariot","Ouvrir le compartiment batterie","Débrancher les câbles (respecter l'ordre)","Soulever la batterie avec le palan","Installer la batterie chargée","Brancher les câbles (respecter polarité)","Vérifier le voyant de charge","Refermer le compartiment","Tester le chariot"]}].map(r=>e("div",{id:r.id,class:"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4",children:e("div",{class:"flex items-start justify-between",children:e("div",{class:"flex-1",children:[e("div",{class:"flex items-center mb-2",children:[e("div",{class:"flex flex-col items-center mr-4",children:[e("i",{class:`fas ${r.icon} text-3xl mb-2`}),e("div",{class:"flex gap-1 cursor-pointer",onclick:`showReviewModal('${r.id}', '${r.title}')`,title:"Cliquez pour donner votre avis",children:e("span",{class:"star-display text-yellow-300 hover:text-yellow-400 transition-colors","data-procedure-id":r.id,children:"☆☆☆☆☆"})}),e("div",{class:"text-xs mt-1 opacity-75","data-procedure-rating":r.id,children:"Pas encore noté"})]}),e("h3",{class:"text-xl font-bold flex-1",children:r.title})]}),e("div",{class:"flex items-center space-x-4 text-sm opacity-90",children:[e("span",{children:[e("i",{class:"far fa-clock mr-1"}),r.duration]}),e("span",{children:["Niveau ",r.level]})]})]})})}),e("div",{class:"p-6",children:[e("div",{class:"mb-4",children:[e("h4",{class:"font-semibold text-gray-800 mb-2 flex items-center",children:[e("i",{class:"fas fa-exclamation-triangle text-orange-500 mr-2"}),"Points de vigilance"]}),e("ul",{class:"space-y-1",children:r.vigilance.map(i=>e("li",{class:"text-sm text-gray-600 flex items-start",children:[e("i",{class:"fas fa-check text-green-500 mr-2 mt-1"}),e("span",{children:i})]}))})]}),e("div",{class:"flex flex-wrap gap-2 mt-4",children:[r.checklist?e("button",{onclick:`showChecklistInteractive('${r.id}', ${JSON.stringify(r.checklist)})`,class:"gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist interactive"]}):e("button",{onclick:`showChecklist('${r.id}')`,class:"gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist"]}),r.document&&e("a",{href:`/static/documents/${r.document}`,target:"_blank",class:"gxo-btn bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 flex items-center",children:[e("i",{class:"fas fa-file-download mr-2"}),"Document"]}),e("button",{onclick:"showDecisionTree('root')",class:"gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center",children:[e("i",{class:"fas fa-sitemap mr-2"}),"Que faire si..."]})]})]})]}))}),e("div",{id:"modal-container",class:"hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:e("div",{id:"modal-content"})})})]})}function Cs(){const t=[{id:"arrivee-chauffeur",title:"Arrivée et enregistrement",icon:"fa-truck",duration:"10-15 min",level:"🟢",vigilance:["Se présenter à l'accueil","Préparer documents","Suivre signalisation"],document:"Assigner camion à quai-2.docx",checklist:["Se présenter à l'accueil réception","Présenter CMR et bon de livraison","Indiquer le numéro de commande","Recevoir l'assignation du quai","Suivre la signalisation vers le quai","Stationner au quai assigné","Attendre autorisation de déchargement"]},{id:"procedures-securite",title:"Procédures de sécurité",icon:"fa-shield-alt",duration:"5 min",level:"🟡",vigilance:["Port EPI obligatoire","Respecter zones","Signaler anomalies"],checklist:["Porter gilet haute visibilité","Porter chaussures de sécurité","Respecter les zones piétonnes","Ne pas entrer dans l'entrepôt","Signaler toute anomalie","Suivre instructions personnel GXO"]},{id:"dechargement-chauffeur",title:"Opération de déchargement",icon:"fa-dolly",duration:"30-60 min",level:"🟢",vigilance:["Attendre autorisation","Ouvrir portes si demandé","Rester disponible"],checklist:["Attendre signal de l'agent de quai","Ouvrir les portes arrière si demandé","Faciliter l'accès aux marchandises","Rester disponible pour questions","Vérifier les quantités déchargées","Signaler tout écart ou dommage","Attendre signature des documents"]},{id:"depart-chauffeur",title:"Clôture et départ",icon:"fa-sign-out-alt",duration:"10 min",level:"🟢",vigilance:["Récupérer documents signés","Vérifier camion vide","Signaler départ"],checklist:["Récupérer BL signé","Vérifier que tout est déchargé","Fermer et sécuriser le camion","Se présenter à l'accueil pour départ","Rendre badge visiteur si applicable","Sortir par la voie indiquée"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-truck text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Accueil Chauffeur"}),e("p",{class:"text-xl opacity-90",children:"Procédures d'arrivée et livraison"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{id:"dashboard-chauffeurs-container",class:"mb-8",children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-xl p-6 mb-6",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h2",{class:"text-2xl font-bold mb-2 flex items-center",children:[e("i",{class:"fas fa-users-cog mr-3"}),"Chauffeurs Actifs en Temps Réel"]}),e("p",{class:"text-sm opacity-90",children:"Suivi de la progression des tâches de déchargement"})]}),e("div",{class:"flex space-x-4",children:[e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold",id:"stat-total-chauffeurs",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Total"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-green-300",id:"stat-complets",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Prêts"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-orange-200",id:"stat-en-cours",children:"0"}),e("div",{class:"text-xs opacity-75",children:"En cours"})]})]})]})}),e("div",{id:"dashboard-chauffeurs-grid",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6",children:e("div",{class:"col-span-full flex justify-center py-12",children:e("div",{class:"animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"})})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-info-circle text-blue-500 mr-2"}),"Légende des Tâches"]}),e("div",{class:"grid grid-cols-2 md:grid-cols-5 gap-4",children:[e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🦺"}),e("span",{class:"text-sm text-gray-700",children:"EPI Porté"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🚚"}),e("span",{class:"text-sm text-gray-700",children:"Placement Quai"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"📦"}),e("span",{class:"text-sm text-gray-700",children:"Échange Palettes"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🔔"}),e("span",{class:"text-sm text-gray-700",children:"Accueil Notifié"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🔑"}),e("span",{class:"text-sm text-gray-700",children:"Remise Clés"})]})]})]})]}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500",children:[e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-blue-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-blue-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-blue-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(i=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:i})]}))})]})]})]})}),e("div",{class:"flex flex-wrap gap-2",children:[r.checklist&&e("button",{onclick:`showChecklist('${r.id}')`,class:"gxo-btn bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist"]}),r.document&&e("a",{href:`/static/documents/${r.document}`,target:"_blank",class:"gxo-btn bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 flex items-center",children:[e("i",{class:"fas fa-file-download mr-2"}),"Document"]})]}),r.checklist&&e("div",{id:`checklist-${r.id}`,class:"hidden",children:JSON.stringify(r.checklist)})]}))}),e("div",{id:"modal-container",class:"hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:e("div",{id:"modal-content"})})}),e("script",{src:"/static/accueil-chauffeur-dashboard.js"})]})}function Es(){const t=[{id:"gestion-asn",title:"Gestion des ASN (Advanced Shipping Notice)",icon:"fa-file-alt",duration:"10-15 min",level:"🟡",vigilance:["Vérifier données fournisseur","Contrôler références","Valider quantités"],checklist:["Ouvrir EWM et accéder module ASN","Vérifier la réception de l'ASN","Contrôler les informations fournisseur","Valider les références produits","Vérifier les quantités annoncées","Assigner au quai approprié","Créer TU si nécessaire","Notifier équipe de réception"]},{id:"cloture-livraison-admin",title:"Clôture administrative livraison",icon:"fa-clipboard-check",duration:"15-20 min",level:"🟡",vigilance:["Rapprocher BL physique et système","Gérer écarts","Archiver documents"],checklist:["Récupérer BL signé de l'agent de quai","Vérifier signature chauffeur","Rapprocher avec ASN dans EWM","Traiter les écarts si présents","Valider la clôture dans le système","Scanner et archiver le BL","Mettre à jour le statut livraison","Envoyer notification fournisseur"]},{id:"gestion-ecarts",title:"Gestion des écarts de livraison",icon:"fa-exclamation-triangle",duration:"20-30 min",level:"🔴",vigilance:["Documenter précisément","Photos si dommages","Notification rapide"],checklist:["Identifier la nature de l'écart","Prendre photos si dommages visibles","Remplir formulaire écart dans EWM","Indiquer quantités exactes","Contacter fournisseur si nécessaire","Créer ticket litige","Informer responsable exploitation","Suivre résolution écart"]},{id:"reporting",title:"Reporting et suivi activité",icon:"fa-chart-line",duration:"30-45 min",level:"🟢",vigilance:["Données à jour","Respect délais","Indicateurs précis"],checklist:["Extraire données EWM journalières","Compiler nombre de livraisons","Calculer taux d'écarts","Vérifier respect délais déchargement","Préparer rapport quotidien","Envoyer au responsable exploitation","Archiver rapports","Préparer tableau de bord hebdomadaire"]},{id:"gestion-documents",title:"Gestion documentaire",icon:"fa-folder-open",duration:"15-20 min",level:"🟢",vigilance:["Classement correct","Numérisation qualité","Archivage sécurisé"],checklist:["Scanner tous les BL de la journée","Vérifier qualité numérisation","Nommer fichiers selon nomenclature","Classer dans arborescence réseau","Archiver documents papier","Mettre à jour registre livraisons","Vérifier accessibilité documents","Purger anciens documents selon règles"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-user-tie text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Administrateur Réception"}),e("p",{class:"text-xl opacity-90",children:"Gestion administrative et suivi"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-purple-500",children:[e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-purple-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-purple-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-purple-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(i=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:i})]}))})]})]})]})}),e("div",{class:"flex flex-wrap gap-2",children:r.checklist&&e("button",{onclick:`showChecklist('${r.id}')`,class:"gxo-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist"]})}),r.checklist&&e("div",{id:`checklist-${r.id}`,class:"hidden",children:JSON.stringify(r.checklist)})]}))}),e("div",{id:"modal-container",class:"hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:e("div",{id:"modal-content"})})})]})}function As(){const t=[{id:"controle-qualite",title:"Contrôle qualité marchandises",icon:"fa-search",duration:"20-30 min",level:"🟡",vigilance:["Inspection visuelle","Vérifier température","Documenter anomalies"],checklist:["Prélever échantillon selon procédure","Inspecter visuellement la marchandise","Vérifier conformité emballage","Contrôler étiquetage produit","Vérifier température si applicable","Tester fonctionnalité si requis","Documenter résultats contrôle","Valider ou refuser lot"]},{id:"controle-quantitatif",title:"Contrôle quantitatif",icon:"fa-calculator",duration:"15-25 min",level:"🟢",vigilance:["Recompter si doute","Vérifier unités","Noter écarts"],checklist:["Comparer quantité BL vs physique","Compter palettes reçues","Vérifier nombre de colis par palette","Contrôler unités par colis","Recompter si écart détecté","Noter tous les écarts","Remplir formulaire contrôle","Signer et dater le BL"]},{id:"controle-conformite",title:"Contrôle de conformité produit",icon:"fa-clipboard-check",duration:"25-35 min",level:"🔴",vigilance:["Références exactes","Dates limite","Normes qualité"],checklist:["Vérifier références produit vs commande","Contrôler dates de péremption","Vérifier numéros de lot","Inspecter conditionnement","Valider conformité réglementaire","Vérifier certificats si requis","Prendre photos si non-conformité","Compléter rapport de contrôle"]},{id:"gestion-non-conformites",title:"Gestion des non-conformités",icon:"fa-times-circle",duration:"30-45 min",level:"🔴",vigilance:["Isoler produits","Traçabilité","Notification rapide"],checklist:["Identifier et isoler produits non-conformes","Apposer étiquette de blocage","Photographier non-conformité","Remplir fiche de non-conformité","Enregistrer dans système qualité","Notifier responsable qualité","Informer fournisseur","Suivre traitement (retour, destruction, etc.)"]},{id:"audit-reception",title:"Audit aléatoire réception",icon:"fa-random",duration:"30-40 min",level:"🟡",vigilance:["Sélection aléatoire","Objectivité","Reporting précis"],checklist:["Sélectionner aléatoirement réceptions","Vérifier traçabilité complète","Contrôler documentation","Auditer conformité process","Vérifier étiquetage et stockage","Interviewer agents de quai","Documenter observations","Rédiger rapport d'audit"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-user-check text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Contrôleur Qualité"}),e("p",{class:"text-xl opacity-90",children:"Contrôle et conformité réception"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-green-500",children:[e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-green-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-green-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-green-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(i=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:i})]}))})]})]})]})}),e("div",{class:"flex flex-wrap gap-2",children:r.checklist&&e("button",{onclick:`showChecklist('${r.id}')`,class:"gxo-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist"]})}),r.checklist&&e("div",{id:`checklist-${r.id}`,class:"hidden",children:JSON.stringify(r.checklist)})]}))}),e("div",{id:"modal-container",class:"hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:e("div",{id:"modal-content"})})})]})}function Rs(){const t=[{id:"accueil-camion",title:"Accueil camion et préparation quai",icon:"fa-hand-paper",duration:"10-15 min",level:"🟢",vigilance:["Vérifier assignation","Sécuriser zone","Briefing chauffeur"],checklist:["Vérifier assignation camion/quai dans système","Guider le camion jusqu'au quai","Installer calles de sécurité","Sécuriser la zone de déchargement","Briefing sécurité avec le chauffeur","Vérifier documents transport","Noter heure d'arrivée","Autoriser ouverture portes"]},{id:"dechargement-quai",title:"Déchargement et contrôle",icon:"fa-dolly-flatbed",duration:"30-60 min",level:"🟢",vigilance:["Respect sécurité","Vérifier palettes","Noter anomalies"],checklist:["Inspecter visuellement le chargement","Décharger palette par palette","Vérifier état de chaque palette","Scanner code-barres BL","Compter quantités physiques","Noter tout écart ou dommage","Ranger palettes en zone dédiée","Photographier anomalies","Faire signer BL au chauffeur"]},{id:"verification-conformite-quai",title:"Vérification conformité",icon:"fa-check-double",duration:"15-20 min",level:"🟡",vigilance:["BL vs physique","Références correctes","Températures"],checklist:["Comparer BL avec marchandises reçues","Vérifier références produits","Contrôler nombre de palettes","Vérifier emballages non endommagés","Contrôler température si produits frais","Vérifier dates de péremption visibles","Signaler écarts à l'administrateur","Remplir formulaire réception"]},{id:"rangement-palettes",title:"Rangement et étiquetage",icon:"fa-warehouse",duration:"15-20 min",level:"🟢",vigilance:["Zone appropriée","Étiquettes claires","Stabilité palettes"],checklist:["Identifier zone de rangement appropriée","Vérifier stabilité des palettes","Apposer étiquettes réception","Scanner code-barres emplacement","Ranger palettes de manière sécurisée","Respecter hauteurs maximales","Laisser allées de circulation dégagées","Mettre à jour système de localisation"]},{id:"cloture-quai",title:"Clôture quai et libération",icon:"fa-door-closed",duration:"10 min",level:"🟢",vigilance:["Documents complets","Zone propre","Quai libre"],checklist:["Vérifier que tout est déchargé","Récupérer tous les documents signés","Retirer calles de sécurité","Fermer porte du quai","Nettoyer zone si nécessaire","Remettre documents à l'administrateur","Libérer le quai dans le système","Noter heure de départ"]},{id:"gestion-urgences-quai",title:"Gestion des situations d'urgence",icon:"fa-ambulance",duration:"Variable",level:"🔴",vigilance:["Sécurité prioritaire","Alerter secours","Évacuer zone"],checklist:["Arrêter immédiatement opérations","Sécuriser la zone","Alerter secours si nécessaire (18 / 112)","Prévenir responsable exploitation","Évacuer personnel si danger","Ne pas déplacer blessé sans formation","Utiliser extincteur si petit feu","Rédiger rapport d'incident"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-hard-hat text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Agent de Quai"}),e("p",{class:"text-xl opacity-90",children:"Opérations de déchargement et contrôle"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-yellow-500",children:[e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-yellow-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-yellow-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-yellow-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(i=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:i})]}))})]})]})]})}),e("div",{class:"flex flex-wrap gap-2",children:r.checklist&&e("button",{onclick:`showChecklist('${r.id}')`,class:"gxo-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist"]})}),r.checklist&&e("div",{id:`checklist-${r.id}`,class:"hidden",children:JSON.stringify(r.checklist)})]}))}),e("div",{id:"modal-container",class:"hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:e("div",{id:"modal-content"})})})]})}function Ss(){return e("div",{children:[e("div",{class:"bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:[e("i",{class:"fas fa-graduation-cap mr-3"}),"Nouvel Arrivant"]}),e("p",{class:"text-xl opacity-90",children:"Parcours d'intégration et formations de base"})]}),e("a",{href:"/",class:"bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 mb-8",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-route mr-3 text-pink-500"}),"Bienvenue chez GXO Logistics !"]}),e("p",{class:"text-gray-700 text-lg mb-6",children:"Pour vous guider au mieux, merci de sélectionner votre situation :"}),e("div",{id:"situation-selection",class:"space-y-4",children:[e("div",{class:"bg-white rounded-lg p-6 shadow-md",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-clipboard-question mr-2 text-pink-500"}),"Quelle est votre situation ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("button",{onclick:"showSituationQuestionnaire('nouveau')",class:"p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-user-plus text-2xl mb-2"}),e("div",{class:"font-bold",children:"Nouvelle intégration"}),e("div",{class:"text-sm opacity-90",children:"Premier jour dans l'entreprise"})]}),e("button",{onclick:"showSituationQuestionnaire('changement-poste')",class:"p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-exchange-alt text-2xl mb-2"}),e("div",{class:"font-bold",children:"Changement de poste"}),e("div",{class:"text-sm opacity-90",children:"Mutation interne vers un nouveau métier"})]}),e("button",{onclick:"showSituationQuestionnaire('changement-site')",class:"p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-building text-2xl mb-2"}),e("div",{class:"font-bold",children:"Changement de site"}),e("div",{class:"text-sm opacity-90",children:"Transfert depuis un autre site GXO"})]}),e("button",{onclick:"showSituationQuestionnaire('retour-conge')",class:"p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-calendar-check text-2xl mb-2"}),e("div",{class:"font-bold",children:"Retour après absence"}),e("div",{class:"text-sm opacity-90",children:"Retour après congé longue durée ou arrêt"})]}),e("button",{onclick:"showSituationQuestionnaire('interim')",class:"p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-clock text-2xl mb-2"}),e("div",{class:"font-bold",children:"Intérimaire / CDD"}),e("div",{class:"text-sm opacity-90",children:"Mission temporaire sur le site"})]}),e("button",{onclick:"showSituationQuestionnaire('formation')",class:"p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-graduation-cap text-2xl mb-2"}),e("div",{class:"font-bold",children:"Formation / Montée en compétence"}),e("div",{class:"text-sm opacity-90",children:"Apprentissage d'un nouveau processus"})]})]})]}),e("div",{id:"situation-questionnaire",class:"hidden bg-white rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-clipboard-list mr-2 text-pink-500"}),e("span",{id:"questionnaire-title",children:"Profil et compétences"})]}),e("button",{onclick:"resetQuestionnaire()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-arrow-left mr-1"}),"Retour"]})]}),e("div",{id:"question-poste",class:"mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-3",children:[e("i",{class:"fas fa-briefcase mr-2 text-blue-500"}),"Quel poste allez-vous occuper ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",children:[e("button",{onclick:"selectPoste('reception')",class:"p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-orange-300",children:[e("i",{class:"fas fa-truck-loading text-orange-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Réception"})]}),e("button",{onclick:"selectPoste('agent-quai')",class:"p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-yellow-300",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Agent de Quai"})]}),e("button",{onclick:"selectPoste('controleur')",class:"p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-green-300",children:[e("i",{class:"fas fa-clipboard-check text-green-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Contrôleur"})]}),e("button",{onclick:"selectPoste('administrateur')",class:"p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-purple-300",children:[e("i",{class:"fas fa-user-tie text-purple-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Administrateur"})]}),e("button",{onclick:"selectPoste('accueil-chauffeur')",class:"p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-blue-300",children:[e("i",{class:"fas fa-truck text-blue-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Accueil Chauffeur"})]}),e("button",{onclick:"selectPoste('autre')",class:"p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-gray-300",children:[e("i",{class:"fas fa-ellipsis-h text-gray-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Autre"})]})]})]}),e("div",{id:"question-experience",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-3",children:[e("i",{class:"fas fa-history mr-2 text-green-500"}),"Quelle est votre expérience dans la logistique ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("button",{onclick:"selectExperience('aucune')",class:"p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-red-300",children:[e("div",{class:"font-bold text-gray-800",children:"Aucune expérience"}),e("div",{class:"text-sm text-gray-600",children:"Première expérience en logistique"})]}),e("button",{onclick:"selectExperience('debutant')",class:"p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-orange-300",children:[e("div",{class:"font-bold text-gray-800",children:"Débutant (moins d'1 an)"}),e("div",{class:"text-sm text-gray-600",children:"Quelques mois d'expérience"})]}),e("button",{onclick:"selectExperience('intermediaire')",class:"p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-blue-300",children:[e("div",{class:"font-bold text-gray-800",children:"Intermédiaire (1-3 ans)"}),e("div",{class:"text-sm text-gray-600",children:"Bonne connaissance du secteur"})]}),e("button",{onclick:"selectExperience('experimente')",class:"p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-green-300",children:[e("div",{class:"font-bold text-gray-800",children:"Expérimenté (3+ ans)"}),e("div",{class:"text-sm text-gray-600",children:"Expertise confirmée"})]})]})]}),e("div",{id:"question-competences",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-3",children:[e("i",{class:"fas fa-check-circle mr-2 text-purple-500"}),"Quelles compétences possédez-vous déjà ?"]}),e("div",{class:"text-sm text-gray-600 mb-3",children:[e("i",{class:"fas fa-info-circle mr-1"}),"Sélectionnez toutes les compétences que vous maîtrisez"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"sap"}),e("i",{class:"fas fa-desktop text-blue-500 mr-2"}),e("span",{children:"SAP / S4HANA"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"rf"}),e("i",{class:"fas fa-mobile-alt text-green-500 mr-2"}),e("span",{children:"Terminal RF / Scanner"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"caces"}),e("i",{class:"fas fa-forklift text-orange-500 mr-2"}),e("span",{children:"CACES (Chariot élévateur)"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"controle"}),e("i",{class:"fas fa-clipboard-check text-purple-500 mr-2"}),e("span",{children:"Contrôle qualité"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"admin"}),e("i",{class:"fas fa-file-alt text-indigo-500 mr-2"}),e("span",{children:"Gestion administrative"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"securite"}),e("i",{class:"fas fa-shield-alt text-red-500 mr-2"}),e("span",{children:"Sécurité / EPI"})]})]}),e("button",{onclick:"validateCompetences()",class:"mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-arrow-right mr-2"}),"Voir mes formations recommandées"]})]})]}),e("div",{id:"formations-recommandees",class:"hidden bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-graduation-cap mr-2 text-green-500"}),"Vos formations recommandées"]}),e("button",{onclick:"resetQuestionnaire()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-redo mr-1"}),"Recommencer"]})]}),e("div",{class:"bg-white rounded-lg p-4 mb-4",children:[e("h4",{class:"font-semibold text-gray-800 mb-2",children:[e("i",{class:"fas fa-user mr-2 text-blue-500"}),"Votre profil"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-3 text-sm",children:[e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-briefcase text-orange-500 mr-2"}),e("span",{children:[e("strong",{children:"Poste :"})," ",e("span",{id:"profil-poste"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-history text-green-500 mr-2"}),e("span",{children:[e("strong",{children:"Expérience :"})," ",e("span",{id:"profil-experience"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-check-circle text-purple-500 mr-2"}),e("span",{children:[e("strong",{children:"Compétences :"})," ",e("span",{id:"profil-competences"})]})]})]})]}),e("div",{id:"formations-list",class:"space-y-3"}),e("div",{class:"mt-6 grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("a",{href:"/bibliotheque",class:"flex items-center justify-center p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-book mr-2"}),"Consulter la bibliothèque"]}),e("a",{href:"/contacts",class:"flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-phone mr-2"}),"Contacter un responsable"]})]})]}),e("div",{id:"metier-selection-step",class:"hidden bg-white rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-briefcase mr-2 text-pink-500"}),"Étape 1 : Quel est votre métier ?"]}),e("button",{onclick:"resetOnboarding()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-redo mr-1"}),"Recommencer"]})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[e("button",{onclick:"selectMetier('reception')",class:"p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-orange-200",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Réception"}),e("div",{class:"text-sm text-gray-600",children:"Déchargement et contrôle"})]}),e("button",{onclick:"selectMetier('agent-quai')",class:"p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-yellow-200",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Agent de Quai"}),e("div",{class:"text-sm text-gray-600",children:"Opérations de quai"})]}),e("button",{onclick:"selectMetier('controleur')",class:"p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-green-200",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Contrôleur"}),e("div",{class:"text-sm text-gray-600",children:"Contrôle qualité"})]}),e("button",{onclick:"selectMetier('administrateur')",class:"p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-purple-200",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Administrateur"}),e("div",{class:"text-sm text-gray-600",children:"Gestion administrative"})]}),e("button",{onclick:"selectMetier('accueil-chauffeur')",class:"p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-blue-200",children:[e("i",{class:"fas fa-truck text-blue-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Accueil Chauffeur"}),e("div",{class:"text-sm text-gray-600",children:"Arrivée et livraison"})]}),e("button",{onclick:"selectMetier('autre')",class:"p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-gray-200",children:[e("i",{class:"fas fa-ellipsis-h text-gray-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Autre métier"}),e("div",{class:"text-sm text-gray-600",children:"Support, maintenance..."})]})]})]}),e("div",{id:"formation-selection-step",class:"hidden bg-white rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-graduation-cap mr-2 text-pink-500"}),"Étape 2 : Quelle formation souhaitez-vous ?"]}),e("button",{onclick:"backToMetierSelection()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-arrow-left mr-1"}),"Retour"]})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("button",{onclick:"selectFormation('initiale')",class:"p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-book-open text-2xl mb-2"}),e("div",{class:"font-bold",children:"Formation initiale"}),e("div",{class:"text-sm opacity-90",children:"Apprendre les bases du métier"})]}),e("button",{onclick:"selectFormation('perfectionnement')",class:"p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-chart-line text-2xl mb-2"}),e("div",{class:"font-bold",children:"Perfectionnement"}),e("div",{class:"text-sm opacity-90",children:"Approfondir mes compétences"})]}),e("button",{onclick:"selectFormation('recyclage')",class:"p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-sync-alt text-2xl mb-2"}),e("div",{class:"font-bold",children:"Recyclage"}),e("div",{class:"text-sm opacity-90",children:"Mise à jour des procédures"})]}),e("button",{onclick:"selectFormation('caces')",class:"p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-forklift text-2xl mb-2"}),e("div",{class:"font-bold",children:"CACES / Habilitations"}),e("div",{class:"text-sm opacity-90",children:"Certifications réglementaires"})]}),e("button",{onclick:"selectFormation('securite')",class:"p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-shield-alt text-2xl mb-2"}),e("div",{class:"font-bold",children:"Sécurité"}),e("div",{class:"text-sm opacity-90",children:"EPI, gestes et postures, incendie"})]}),e("button",{onclick:"selectFormation('systeme')",class:"p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-desktop text-2xl mb-2"}),e("div",{class:"font-bold",children:"Systèmes informatiques"}),e("div",{class:"text-sm opacity-90",children:"SAP, WMS, terminal RF"})]})]})]}),e("div",{id:"final-result",class:"hidden bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-check-circle mr-2 text-green-500"}),"Votre parcours de formation personnalisé"]}),e("button",{onclick:"resetOnboarding()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-redo mr-1"}),"Recommencer"]})]}),e("div",{id:"final-content",class:"space-y-4"})]})]})]}),e("div",{id:"metier-selection",class:"hidden mb-8",children:e("div",{class:"bg-white rounded-lg p-6 shadow-md",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-briefcase mr-2 text-pink-500"}),"Quel est votre métier ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e("button",{onclick:"showMetierPath('reception')",class:"p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-orange-200",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Réception"}),e("div",{class:"text-sm text-gray-600",children:"Déchargement et contrôle"})]}),e("button",{onclick:"showMetierPath('agent-quai')",class:"p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-yellow-200",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Agent de Quai"}),e("div",{class:"text-sm text-gray-600",children:"Opérations quai"})]}),e("button",{onclick:"showMetierPath('controleur')",class:"p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-green-200",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Contrôleur"}),e("div",{class:"text-sm text-gray-600",children:"Contrôle qualité"})]}),e("button",{onclick:"showMetierPath('administrateur')",class:"p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-purple-200",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Administrateur"}),e("div",{class:"text-sm text-gray-600",children:"Support et coordination"})]}),e("button",{onclick:"showMetierPath('accueil-chauffeur')",class:"p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-blue-200",children:[e("i",{class:"fas fa-truck text-blue-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Accueil Chauffeur"}),e("div",{class:"text-sm text-gray-600",children:"Arrivée et livraison"})]}),e("button",{onclick:"showMetierPath('chef')",class:"p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors border-2 border-indigo-200",children:[e("i",{class:"fas fa-user-cog text-indigo-600 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Chef d'équipe"}),e("div",{class:"text-sm text-gray-600",children:"Management terrain"})]})]})]})}),e("div",{class:"grid grid-cols-1 gap-6 mb-8",children:[e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"1"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Sécurité et EPI"}),e("ul",{class:"space-y-2 text-gray-600",children:[e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Port du casque et chaussures de sécurité OBLIGATOIRE dans toutes les zones"})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Gilet haute visibilité à porter en permanence"})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Localiser les issues de secours et points de rassemblement"})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Connaître les numéros d'urgence : Secours (15), Sécurité interne (poste 999)"})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"2"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Comprendre le site"}),e("ul",{class:"space-y-2 text-gray-600",children:[e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Réception :"})," Quais 1-30, déchargement camions"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Stockage :"})," Allées A à Z, stockage palettes"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Hazardous :"})," Zone rouge, produits dangereux (accès restreint)"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Expédition :"})," Quais 50-80, chargement camions"]})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"3"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Premiers gestes métiers"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3 mt-4",children:[e("a",{href:"/agent-quai",class:"flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Agent de Quai"})]}),e("a",{href:"/controleur",class:"flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Contrôleur"})]}),e("a",{href:"/administrateur",class:"flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Administrateur"})]}),e("a",{href:"/accueil-chauffeur",class:"flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors",children:[e("i",{class:"fas fa-truck text-blue-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Accueil Chauffeur"})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"4"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Utiliser les outils"}),e("ul",{class:"space-y-2 text-gray-600",children:[e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-mobile-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Terminal RF :"})," Scanner codes-barres, confirmer actions"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-desktop text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"SAP / S4HANA :"})," Système de gestion (formation requise)"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-globe text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Portail Action :"})," Appointments et tracking"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-book text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Cet intranet :"})," Toutes les procédures en un clic !"]})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"5"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Qui contacter ?"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3 mt-4",children:[e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"Chef d'équipe"}),e("div",{class:"text-sm text-gray-600",children:"Questions quotidiennes et support terrain"})]}),e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"RH"}),e("div",{class:"text-sm text-gray-600",children:"Contrat, planning, congés"})]}),e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"Sécurité"}),e("div",{class:"text-sm text-gray-600",children:"Incidents, EPI, formations sécurité"})]}),e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"IT Support"}),e("div",{class:"text-sm text-gray-600",children:"Problèmes terminal, PC, accès systèmes"})]})]})]})]})})]}),e("div",{class:"bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 text-center",children:[e("i",{class:"fas fa-thumbs-up text-5xl mb-4"}),e("h2",{class:"text-2xl font-bold mb-3",children:"Vous êtes prêt(e) !"}),e("p",{class:"text-lg opacity-90 mb-6",children:"N'hésitez pas à consulter cet intranet à tout moment pour retrouver une procédure."}),e("a",{href:"/",class:"inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour à l'accueil"]})]}),e("div",{id:"questionnaire-modal",class:"hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",onclick:"closeQuestionnaireModal(event)",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",onclick:"event.stopPropagation()",children:[e("div",{id:"modal-header",class:"sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-lg",children:e("div",{class:"flex items-center justify-between",children:[e("h3",{class:"text-2xl font-bold",children:[e("i",{class:"fas fa-clipboard-list mr-3"}),e("span",{id:"modal-questionnaire-title",children:"Questionnaire de formation"})]}),e("button",{onclick:"closeQuestionnaireModal()",class:"text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all",children:e("i",{class:"fas fa-times text-2xl"})})]})}),e("div",{class:"p-6",children:[e("div",{id:"modal-question-poste",class:"mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-briefcase mr-2 text-blue-500"}),"Question 1/3 : Quel poste allez-vous occuper ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",children:[e("button",{onclick:"selectPosteModal('reception')",class:"p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-orange-500 hover:shadow-md",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Réception"}),e("div",{class:"text-sm text-gray-600",children:"Déchargement et contrôle"})]}),e("button",{onclick:"selectPosteModal('agent-quai')",class:"p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-yellow-500 hover:shadow-md",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Agent de Quai"}),e("div",{class:"text-sm text-gray-600",children:"Opérations de quai"})]}),e("button",{onclick:"selectPosteModal('controleur')",class:"p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-green-500 hover:shadow-md",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Contrôleur"}),e("div",{class:"text-sm text-gray-600",children:"Contrôle qualité"})]}),e("button",{onclick:"selectPosteModal('administrateur')",class:"p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-purple-500 hover:shadow-md",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Administrateur"}),e("div",{class:"text-sm text-gray-600",children:"Gestion administrative"})]}),e("button",{onclick:"selectPosteModal('accueil-chauffeur')",class:"p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-blue-500 hover:shadow-md",children:[e("i",{class:"fas fa-truck text-blue-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Accueil Chauffeur"}),e("div",{class:"text-sm text-gray-600",children:"Accueil et livraison"})]}),e("button",{onclick:"selectPosteModal('autre')",class:"p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-gray-500 hover:shadow-md",children:[e("i",{class:"fas fa-ellipsis-h text-gray-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Autre"}),e("div",{class:"text-sm text-gray-600",children:"Autres postes"})]})]})]}),e("div",{id:"modal-question-experience",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-history mr-2 text-green-500"}),"Question 2/3 : Quelle est votre expérience dans la logistique ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("button",{onclick:"selectExperienceModal('aucune')",class:"p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-red-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Aucune expérience"}),e("div",{class:"text-sm text-gray-600",children:"Première expérience en logistique"})]}),e("button",{onclick:"selectExperienceModal('debutant')",class:"p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-orange-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Débutant (moins d'1 an)"}),e("div",{class:"text-sm text-gray-600",children:"Quelques mois d'expérience"})]}),e("button",{onclick:"selectExperienceModal('intermediaire')",class:"p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-blue-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Intermédiaire (1-3 ans)"}),e("div",{class:"text-sm text-gray-600",children:"Bonne connaissance du secteur"})]}),e("button",{onclick:"selectExperienceModal('experimente')",class:"p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-green-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Expérimenté (3+ ans)"}),e("div",{class:"text-sm text-gray-600",children:"Expertise confirmée"})]})]})]}),e("div",{id:"modal-question-competences",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-check-circle mr-2 text-purple-500"}),"Question 3/3 : Quelles compétences possédez-vous déjà ?"]}),e("div",{class:"text-sm text-gray-600 mb-3",children:[e("i",{class:"fas fa-info-circle mr-1"}),"Sélectionnez toutes les compétences que vous maîtrisez"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"sap"}),e("i",{class:"fas fa-desktop text-blue-500 mr-2"}),e("span",{children:"SAP / S4HANA"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"rf"}),e("i",{class:"fas fa-mobile-alt text-green-500 mr-2"}),e("span",{children:"Terminal RF / Scanner"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"caces"}),e("i",{class:"fas fa-forklift text-orange-500 mr-2"}),e("span",{children:"CACES (Chariot élévateur)"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"controle"}),e("i",{class:"fas fa-clipboard-check text-purple-500 mr-2"}),e("span",{children:"Contrôle qualité"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"admin"}),e("i",{class:"fas fa-file-alt text-indigo-500 mr-2"}),e("span",{children:"Gestion administrative"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"securite"}),e("i",{class:"fas fa-shield-alt text-red-500 mr-2"}),e("span",{children:"Sécurité / EPI"})]})]}),e("button",{onclick:"validateCompetencesModal()",class:"mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg",children:[e("i",{class:"fas fa-arrow-right mr-2"}),"Voir mes formations recommandées"]})]}),e("div",{id:"modal-formations-recommandees",class:"hidden",children:[e("div",{class:"bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-4",children:[e("h4",{class:"font-semibold text-gray-800 mb-3 text-lg",children:[e("i",{class:"fas fa-user mr-2 text-blue-500"}),"Votre profil"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-3 text-sm",children:[e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-briefcase text-orange-500 mr-2"}),e("span",{children:[e("strong",{children:"Poste :"})," ",e("span",{id:"modal-profil-poste"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-history text-green-500 mr-2"}),e("span",{children:[e("strong",{children:"Expérience :"})," ",e("span",{id:"modal-profil-experience"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-check-circle text-purple-500 mr-2"}),e("span",{children:[e("strong",{children:"Compétences :"})," ",e("span",{id:"modal-profil-competences"})]})]})]})]}),e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-graduation-cap mr-2 text-green-500"}),"Vos formations recommandées"]}),e("div",{id:"modal-formations-list",class:"space-y-3 mb-6"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("a",{href:"/bibliotheque",class:"flex items-center justify-center p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-book mr-2"}),"Consulter la bibliothèque"]}),e("a",{href:"/contacts",class:"flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-phone mr-2"}),"Contacter un responsable"]})]})]})]})]})})]})}function Ps(){const t=[{id:"retour-fournisseur",title:"Retour fournisseur",icon:"fa-undo",level:"🔴",document:"RETOUR FOURNISSEUR.docx",description:"Procédure complète pour gérer un retour marchandise vers le fournisseur"},{id:"decision-tree-broken",title:"Produits cassés/expirés",icon:"fa-exclamation-triangle",level:"🔴",document:"0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf",description:"Arbre de décision pour gérer les produits endommagés ou périmés"},{id:"mail-fournisseur",title:"Contact fournisseur (retard/absence)",icon:"fa-envelope",level:"🟢",document:"Mail fournisseur.docx",description:"Modèle de mail pour informer un fournisseur en cas de retard ou no-show"}],r=[{question:"Le film de la palette est déchiré",reponse:"Zone quarantaine → Prise de photo → Signalement au chef d'équipe → Ne pas mettre en stock",urgence:"high"},{question:"Écart quantité entre BL et réception physique",reponse:"1. Vérifier BL → 2. Compter à nouveau → 3. Si surplus : fichier GDS pour re-contrôle → 4. Si manco : signalement Invoice Moissy sous 48h",urgence:"high"},{question:"Produit avec BBD expiré",reponse:"Ne PAS accepter → Faire signer le BL par le chauffeur → Photo obligatoire → Créer return line (ME22N) → Stock Control change type de stock en B2",urgence:"high"},{question:"Camion en retard (> 2h)",reponse:'Vérifier portail → Si no-show : demander au fournisseur de rebooker via portal Action → Envoyer mail type "Mail fournisseur.docx"',urgence:"medium"},{question:"Étiquette illisible ou manquante",reponse:"Vérifier BL pour retrouver info → Rééditer étiquette via HU dans MON → Imprimer sur imprimante contrôleur ou bureau",urgence:"medium"},{question:'TU bloqué en statut "Active"',reponse:"Transaction EWM → MON → Transport Unit Overview → Filtrer date J-1 → Vérifier articles/HU/statut → Action : Unload + Finish unloading → Ou : Arrival + Departure",urgence:"medium"},{question:"Palette hazardous non signalée",reponse:"STOP immédiat → Isoler la palette → Vérifier fiche sécurité → Apposer signalétique hazardous → Ranger uniquement en zone T220/T120 → Informer chef d'équipe",urgence:"high"},{question:"Produit non référencé dans le système",reponse:"Vérifier code article sur BL → Chercher dans MAT1 → Si inexistant : contacter Order Planning → Créer conditionnement via ZMM42 si nécessaire",urgence:"medium"}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:[e("i",{class:"fas fa-exclamation-circle mr-3"}),"Anomalies & FAQ"]}),e("p",{class:"text-xl opacity-90",children:"Gestion incidents, litiges, arbres de décision"})]}),e("a",{href:"/",class:"bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"mb-12",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-folder-open mr-3 text-red-500"}),"Procédures anomalies"]}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:t.map(i=>e("div",{id:i.id,class:"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",children:[e("div",{class:"bg-gradient-to-r from-red-500 to-red-600 text-white p-4",children:[e("div",{class:"flex items-center mb-2",children:[e("div",{class:"flex flex-col items-center mr-4",children:[e("i",{class:`fas ${i.icon} text-3xl mb-2`}),e("div",{class:"flex gap-1 cursor-pointer",onclick:`showReviewModal('${i.id}', '${i.title}')`,title:"Cliquez pour donner votre avis",children:e("span",{class:"star-display text-yellow-300 hover:text-yellow-400 transition-colors","data-procedure-id":i.id,children:"☆☆☆☆☆"})}),e("div",{class:"text-xs mt-1 opacity-75","data-procedure-rating":i.id,children:"Pas encore noté"})]}),e("h3",{class:"text-xl font-bold flex-1",children:i.title})]}),e("div",{class:"text-sm opacity-90",children:["Niveau ",i.level]})]}),e("div",{class:"p-6",children:[e("p",{class:"text-gray-600 text-sm mb-4",children:i.description}),e("a",{href:`/static/documents/${i.document}`,target:"_blank",class:"gxo-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 flex items-center justify-center w-full",children:[e("i",{class:"fas fa-file-download mr-2"}),"Voir la procédure"]})]})]}))})]}),e("div",{children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-question-circle mr-3 text-orange-500"}),"FAQ - Que faire si..."]}),e("div",{class:"space-y-4",children:r.map((i,s)=>e("div",{class:"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",children:[e("button",{onclick:`toggleFaq(${s})`,class:"w-full text-left p-6 flex items-start justify-between hover:bg-gray-50 transition-colors",children:[e("div",{class:"flex-1 flex items-start",children:[i.urgence==="high"&&e("i",{class:"fas fa-exclamation-triangle text-red-500 text-xl mr-4 mt-1"}),i.urgence==="medium"&&e("i",{class:"fas fa-info-circle text-orange-500 text-xl mr-4 mt-1"}),e("div",{children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-1",children:i.question}),i.urgence==="high"&&e("span",{class:"inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold",children:"URGENT"})]})]}),e("i",{class:"fas fa-chevron-down text-gray-400 text-xl ml-4 transition-transform",id:`faq-icon-${s}`})]}),e("div",{id:`faq-content-${s}`,class:"hidden p-6 pt-0 border-t border-gray-100",children:e("div",{class:"bg-orange-50 rounded-lg p-4",children:[e("h4",{class:"font-semibold text-blue-800 mb-2 flex items-center",children:[e("i",{class:"fas fa-arrow-right mr-2"}),"Solution"]}),e("p",{class:"text-gray-700 whitespace-pre-line",children:i.reponse})]})})]}))})]}),e("div",{class:"mt-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8",children:[e("h2",{class:"text-2xl font-bold mb-4 flex items-center",children:[e("i",{class:"fas fa-phone-alt mr-3"}),"En cas d'urgence"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e("div",{class:"bg-white bg-opacity-20 rounded-lg p-4",children:[e("div",{class:"text-3xl font-bold mb-1",children:"15"}),e("div",{class:"text-sm opacity-90",children:"SAMU / Urgences médicales"})]}),e("div",{class:"bg-white bg-opacity-20 rounded-lg p-4",children:[e("div",{class:"text-3xl font-bold mb-1",children:"18"}),e("div",{class:"text-sm opacity-90",children:"Pompiers"})]}),e("div",{class:"bg-white bg-opacity-20 rounded-lg p-4",children:[e("div",{class:"text-3xl font-bold mb-1",children:"999"}),e("div",{class:"text-sm opacity-90",children:"Sécurité interne GXO"})]})]})]})]})}function qs(){const t=[{id:1,name:"EWM Procédures Goods Receipt (Manuel Complet)",file:"EWM Procedure document - 01. Goods Receipt - FR.pdf",category:"Réception",type:"pdf",description:"Document de procédure EWM complet pour la réception des marchandises - Enregistrement trucks, inspection, contrôle qualité, flux marchandises",keywords:"EWM, goods receipt, réception, trucks, quai, inspection, contrôle qualité, SAP, manuel, procédures complètes",level:"🔴"},{id:3,name:"Assigner camion à quai",file:"Assigner camion à quai-2.docx",category:"Réception",type:"docx",description:"Procédure d'assignation de camion aux quais de déchargement",keywords:"camion, quai, assignation, réception",level:"🟢"},{id:3,name:"Clôture livraison",file:"cloture livraison new.docx",category:"Réception",type:"docx",description:"Procédure de clôture de livraison dans le système",keywords:"clôture, livraison, réception",level:"🟢"},{id:3,name:"Clôture TU actif",file:"Cloture TU actif.docx",category:"Réception",type:"docx",description:"Clôture des unités de transport actives",keywords:"TU, clôture, transport",level:"🟡"},{id:34,name:"Créer TU",file:"Créer TU.docx",category:"Réception",type:"docx",description:"Création d'une unité de transport dans SAP",keywords:"TU, création, SAP",level:"🟢"},{id:5,name:"Fermer une porte de quai",file:"Fermer une porte de quai.docx",category:"Réception",type:"docx",description:"Procédure de fermeture d'une porte de quai",keywords:"quai, porte, fermeture",level:"🟢"},{id:6,name:"Mail fournisseur",file:"Mail fournisseur.docx",category:"Réception",type:"docx",description:"Modèle de communication avec les fournisseurs",keywords:"mail, fournisseur, communication",level:"🟢"},{id:7,name:"Vérification dossier après contrôle",file:"Verification dossier aprés control.docx",category:"Réception",type:"docx",description:"Vérification du dossier après contrôle qualité",keywords:"vérification, contrôle, dossier",level:"🟡"},{id:8,name:"Fausses étiquettes",file:"Fausses  étiquettes.docx",category:"Réception",type:"docx",description:"Procédure de gestion des fausses étiquettes",keywords:"étiquettes, impression, réception",level:"🟢"},{id:9,name:"Fausses étiquettes date du jour",file:"Fausses  étiquettes date du jour .docx",category:"Réception",type:"docx",description:"Impression d'étiquettes avec date du jour",keywords:"étiquettes, date, impression",level:"🟢"},{id:10,name:"Rééditer une étiquette",file:"Réediter une étiquette.docx",category:"Réception",type:"docx",description:"Réimpression d'une étiquette existante",keywords:"étiquette, réédition, impression",level:"🟢"},{id:11,name:"Affectation de tâche dans LTRMS",file:"Affectation de tache a un cariste dans le LTRMS.docx",category:"Accueil Chauffeur",type:"docx",description:"Affectation d'une tâche à un cariste via LTRMS",keywords:"LTRMS, tâche, affectation, cariste",level:"🟢"},{id:12,name:"Annuler une tâche affectée",file:"Annuler une tache affecter.docx",category:"Accueil Chauffeur",type:"docx",description:"Procédure d'annulation d'une tâche affectée",keywords:"annulation, tâche, LTRMS",level:"🟡"},{id:13,name:"Connexion terminal",file:"CONNECTION.docx",category:"Accueil Chauffeur",type:"docx",description:"Connexion et déconnexion au terminal cariste",keywords:"connexion, terminal, cariste",level:"🟢"},{id:14,name:"Priorisation de tâches LTRMS",file:"Priorisation de taches dans le LTRMS.docx",category:"Accueil Chauffeur",type:"docx",description:"Gestion des priorités de tâches dans LTRMS",keywords:"priorisation, LTRMS, tâche",level:"🟡"},{id:15,name:"Sortir une tâche du LTRA",file:"Sortir une tache du LTRA.docx",category:"Accueil Chauffeur",type:"docx",description:"Extraction d'une tâche du système LTRA",keywords:"LTRA, tâche, extraction",level:"🟡"},{id:16,name:"Visualisation des stocks LS03N",file:"Visualisation des stocks LS03N.docx",category:"Accueil Chauffeur",type:"docx",description:"Consultation des stocks via transaction LS03N",keywords:"LS03N, stocks, SAP",level:"🟢"},{id:17,name:"Relancer tâche cariste",file:"relancer tache cariste.docx",category:"Accueil Chauffeur",type:"docx",description:"Relance d'une tâche cariste bloquée",keywords:"relance, tâche, cariste",level:"🟡"},{id:18,name:"Passation des anomalies",file:"Passation des anomalies.xlsx",category:"Accueil Chauffeur",type:"xlsx",description:"Fichier de suivi des anomalies et passation",keywords:"anomalies, passation, suivi",level:"🟡"},{id:19,name:"Workload planning",file:"workload.xltm",category:"Accueil Chauffeur",type:"xltm",description:"Template Excel de planification de charge de travail",keywords:"workload, planning, charge",level:"🟡"},{id:20,name:"Cartons vides Dernier Prélèvement",file:"Cartons vides Dernier Prelevement_1.docx",category:"Administrateur",type:"docx",description:"Transaction LT24 - Dernier prélèvement",keywords:"LT24, prélèvement, cartons",level:"🟢"},{id:21,name:"Écart premier/dernier prélèvement",file:"Ecart premier dernier prélèvement_1.docx",category:"Administrateur",type:"docx",description:"Analyse des écarts de prélèvement",keywords:"écart, prélèvement, analyse",level:"🟡"},{id:22,name:"Quai fictif - Affichage",file:"Quai fictif - Affichage_1.docx",category:"Administrateur",type:"docx",description:"Localisation et utilisation du quai fictif 91A",keywords:"quai fictif, affichage, zone",level:"🟢"},{id:23,name:"Process Monteur de Rolls",file:"Process Monteur de Rolls.docx",category:"Administrateur",type:"docx",description:"Procédure de montage des rolls",keywords:"rolls, montage, préparation",level:"🟢"},{id:24,name:"Création conditionnement PRD",file:"CREATION CONDITTIONNEMENT PRD .docx",category:"Réception",type:"docx",description:"Création de conditionnement produit",keywords:"conditionnement, PRD, création",level:"🟡"},{id:26,name:"Créer packspeck",file:"Créer packspeck.docx",category:"Réception",type:"docx",description:"Création d'un packspeck dans le système",keywords:"packspeck, création, système",level:"🟡"},{id:27,name:"EOP checks",file:"EOP checks.docx",category:"Réception",type:"docx",description:"Contrôles de fin de production (End Of Production)",keywords:"EOP, contrôle, production",level:"🟢"},{id:28,name:"Extraction ICPE",file:"EXTRACTION ICPE.docx",category:"Réception",type:"docx",description:"Extraction de données ICPE",keywords:"ICPE, extraction, données",level:"🟡"},{id:29,name:"Étêtage et container",file:"Mettre en forme et renseigner le fichier étêtage et container.docx",category:"Réception",type:"docx",description:"Renseignement du fichier étêtage et container",keywords:"étêtage, container, fichier",level:"🟡"},{id:30,name:"Retour fournisseur",file:"RETOUR FOURNISSEUR.docx",category:"Anomalies",type:"docx",description:"Procédure de retour marchandises au fournisseur",keywords:"retour, fournisseur, marchandises",level:"🟡"},{id:30,name:"Decision tree produits cassés/expirés",file:"0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf",category:"Anomalies",type:"pdf",description:"Arbre de décision pour produits cassés ou expirés",keywords:"decision tree, cassés, expirés, anomalies",level:"🔴"},{id:31,name:"Assigner camion à quai",file:"Assigner camion à quai-2.docx",category:"Agent de Quai",type:"docx",description:"Procédure d'assignation de camion aux quais de déchargement",keywords:"camion, quai, assignation, réception",level:"🟢"},{id:32,name:"Fermer une porte de quai",file:"Fermer une porte de quai.docx",category:"Agent de Quai",type:"docx",description:"Procédure de fermeture d'une porte de quai",keywords:"quai, porte, fermeture",level:"🟢"},{id:33,name:"Déchargement camion",file:"Assigner camion à quai-2.docx",category:"Agent de Quai",type:"docx",description:"Procédure de déchargement des camions",keywords:"déchargement, camion, quai",level:"🟢"},{id:34,name:"Contrôle qualité réception",file:"Verification dossier aprés control.docx",category:"Agent de Quai",type:"docx",description:"Vérification du dossier après contrôle qualité",keywords:"vérification, contrôle, dossier",level:"🟡"},{id:35,name:"Gestion des palettes",file:"Créer TU.docx",category:"Agent de Quai",type:"docx",description:"Création et gestion des unités de transport",keywords:"palette, TU, transport",level:"🟢"},{id:36,name:"Clôture livraison",file:"cloture livraison new.docx",category:"Agent de Quai",type:"docx",description:"Procédure de clôture de livraison dans le système",keywords:"clôture, livraison, réception",level:"🟢"},{id:37,name:"Rappel petits contenants PAPREC/BIONERVAL",file:"Rappel des petits contenants installés par PAPREC ou BIONERVAL.docx",category:"Contrôleur",type:"docx",description:"Collecte biodéchets (9 palboxs rouges) et déchets spéciaux",keywords:"PAPREC, BIONERVAL, biodéchets, palbox, collecte",level:"🟢"},{id:32,name:"Clôture livraison retour",file:"cloture livraison new.docx",category:"Contrôleur",type:"docx",description:"Clôture de livraison retour via portail ASN",keywords:"clôture, livraison, retour, ASN, reject",level:"🟢"},{id:33,name:"Procédure transfert roll",file:"procédure transfert.docx",category:"Contrôleur",type:"docx",description:"Transfert de rolls via TRM Manipulation (RET_PICK_01)",keywords:"transfert, roll, TRM, RET_PICK_01, manipulation",level:"🟡"}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("i",{class:"fas fa-folder-open text-5xl"}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Bibliothèque de Documents"}),e("p",{class:"text-xl opacity-90",children:[t.length," documents disponibles • Classés par rubrique"]})]})]}),e("a",{href:"/",class:"bg-white text-[#FF4500] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 mb-8",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"flex-1 relative",children:[e("i",{class:"fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"}),e("input",{type:"text",id:"search-input",placeholder:"Rechercher un document (nom, catégorie, mots-clés)...",class:"w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none",onkeyup:"filterDocuments()"})]}),e("button",{onclick:"clearSearch()",class:"bg-gray-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors",children:[e("i",{class:"fas fa-times mr-2"}),"Effacer"]})]}),e("div",{class:"mt-4 flex flex-wrap gap-2",children:[e("button",{onclick:"filterByCategory('all')",class:"filter-btn bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors","data-category":"all",children:[e("i",{class:"fas fa-th mr-2"}),"Tous (",t.length,")"]}),e("button",{onclick:"filterByCategory('Réception')",class:"filter-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors","data-category":"Réception",children:[e("i",{class:"fas fa-truck-loading mr-2"}),"Réception (",t.filter(r=>r.category==="Réception").length,")"]}),e("button",{onclick:"filterByCategory('Accueil Chauffeur')",class:"filter-btn bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors","data-category":"Accueil Chauffeur",children:[e("i",{class:"fas fa-truck mr-2"}),"Accueil Chauffeur (",t.filter(r=>r.category==="Accueil Chauffeur").length,")"]}),e("button",{onclick:"filterByCategory('Administrateur')",class:"filter-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors","data-category":"Administrateur",children:[e("i",{class:"fas fa-user-tie mr-2"}),"Administrateur (",t.filter(r=>r.category==="Administrateur").length,")"]}),e("button",{onclick:"filterByCategory('Contrôleur')",class:"filter-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors","data-category":"Contrôleur",children:[e("i",{class:"fas fa-clipboard-check mr-2"}),"Contrôleur (",t.filter(r=>r.category==="Contrôleur").length,")"]}),e("button",{onclick:"filterByCategory('Agent de Quai')",class:"filter-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors","data-category":"Agent de Quai",children:[e("i",{class:"fas fa-hard-hat mr-2"}),"Agent de Quai (",t.filter(r=>r.category==="Agent de Quai").length,")"]}),e("button",{onclick:"filterByCategory('Anomalies')",class:"filter-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors","data-category":"Anomalies",children:[e("i",{class:"fas fa-exclamation-circle mr-2"}),"Anomalies (",t.filter(r=>r.category==="Anomalies").length,")"]})]})]}),e("div",{id:"documents-container",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(r=>{const i={Réception:"border-orange-500 bg-orange-50","Accueil Chauffeur":"border-blue-500 bg-blue-50",Administrateur:"border-purple-500 bg-purple-50",Contrôleur:"border-green-500 bg-green-50","Agent de Quai":"border-yellow-500 bg-yellow-50",Anomalies:"border-red-500 bg-red-50"},s={Réception:"fa-truck-loading","Accueil Chauffeur":"fa-truck",Administrateur:"fa-user-tie",Contrôleur:"fa-clipboard-check","Agent de Quai":"fa-hard-hat",Anomalies:"fa-exclamation-circle"},n={docx:"fa-file-word text-orange-600",pdf:"fa-file-pdf text-red-600",xlsx:"fa-file-excel text-green-600",xltm:"fa-file-excel text-green-600"};return e("div",{class:`document-card bg-white rounded-lg shadow-lg border-l-4 ${i[r.category]} overflow-hidden hover:shadow-xl transition-shadow`,"data-category":r.category,"data-keywords":r.keywords,"data-name":r.name.toLowerCase(),"data-description":r.description.toLowerCase(),children:e("div",{class:"p-6",children:[e("div",{class:"flex items-start justify-between mb-4",children:[e("div",{class:"flex-1",children:[e("div",{class:"flex items-center mb-2",children:[e("i",{class:`fas ${s[r.category]} text-2xl mr-3`}),e("span",{class:"text-xs font-semibold text-gray-600 uppercase",children:r.category})]}),e("h3",{class:"text-lg font-bold text-gray-800 mb-2",children:r.name})]}),e("span",{class:"text-2xl",children:r.level})]}),e("p",{class:"text-sm text-gray-600 mb-4 min-h-[40px]",children:r.description}),e("div",{class:"flex items-center justify-between mb-4 pb-4 border-b border-gray-200",children:[e("div",{class:"flex items-center text-gray-500 text-sm",children:[e("i",{class:`fas ${n[r.type]} text-2xl mr-2`}),e("span",{class:"uppercase font-semibold",children:r.type})]}),e("span",{class:"text-xs text-gray-400 truncate max-w-[150px]",title:r.file,children:r.file})]}),e("div",{class:"flex gap-2",children:[e("button",{onclick:`openDocumentPreview('${r.file}', '${r.type}', '${r.name.replace(/'/g,"\\'")}')`,class:"flex-1 bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors text-center",children:[e("i",{class:"fas fa-eye mr-2"}),"Aperçu"]}),e("a",{href:`/static/documents/${r.file}`,download:!0,class:"bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors",title:"Télécharger",children:e("i",{class:"fas fa-download"})})]})]})})})}),e("div",{id:"no-results",class:"hidden text-center py-12",children:[e("i",{class:"fas fa-search text-6xl text-gray-300 mb-4"}),e("h3",{class:"text-2xl font-bold text-gray-600 mb-2",children:"Aucun document trouvé"}),e("p",{class:"text-gray-500",children:"Essayez avec d'autres mots-clés ou filtres"})]}),e("div",{id:"preview-modal",class:"hidden fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4",children:e("div",{class:"bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col",children:[e("div",{class:"flex items-center justify-between p-4 border-b border-gray-200",children:[e("div",{class:"flex-1",children:[e("h3",{id:"preview-title",class:"text-xl font-bold text-gray-800"}),e("p",{class:"text-sm text-gray-500 mt-1",children:"Aperçu du document"})]}),e("div",{class:"flex items-center gap-2",children:[e("a",{id:"preview-download-btn",href:"#",download:!0,class:"bg-[#FF4500] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors",children:[e("i",{class:"fas fa-download mr-2"}),"Télécharger"]}),e("button",{onclick:"closePreview()",class:"text-gray-500 hover:text-gray-700 text-2xl px-3",children:e("i",{class:"fas fa-times"})})]})]}),e("div",{id:"preview-content",class:"flex-1 overflow-hidden bg-gray-100"})]})})]})}function Fs(){const t=[{id:1,nom:"NGUIDJOL",prenom:"Gabriel",fonction:"Directeur Opérationnel",service:"Direction",telephone:"06 26 39 00 52",extension:"",email:"gabriel.nguidjol@gxo.com",mobile:"06 26 39 00 52",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur operationnel direction management"},{id:2,nom:"MOUNAIM",prenom:"Hassan",fonction:"Directeur de site",service:"Direction",telephone:"06 23 36 29 99",extension:"",email:"hassan.mounaim@gxo.com",mobile:"06 23 36 29 99",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur site direction management"},{id:3,nom:"GUSSIE",prenom:"Rocky",fonction:"Directeur d'Exploitation IPL/Réception",service:"Direction",telephone:"06 22 11 97 45",extension:"",email:"rocky.gussie@gxo.com",mobile:"06 22 11 97 45",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur exploitation ipl reception"},{id:4,nom:"MEBTOUL",prenom:"Nabelle",fonction:"Directeur d'Exploitation Préparation/Expédition",service:"Direction",telephone:"06 30 24 58 17",extension:"",email:"nabelle.mebtoul@gxo.com",mobile:"06 30 24 58 17",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur exploitation preparation expedition"},{id:5,nom:"BARSOUM",prenom:"Rafik",fonction:"Directeur d'Exploitation GDS/Process Control/Retour",service:"Direction",telephone:"06 23 36 99 37",extension:"",email:"rafik.barsoum@gxo.com",mobile:"06 23 36 99 37",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur exploitation gds process control retour"},{id:6,nom:"LE BRIS",prenom:"Fabrice",fonction:"Responsable maintenance",service:"Direction",telephone:"06 22 92 23 02",extension:"",email:"fabrice.lebris@gxo.com",mobile:"06 22 92 23 02",horaires:"Lun-Ven 08h-17h",bureau:"Direction",keywords:"responsable maintenance direction"},{id:7,nom:"HADDOUCHANE",prenom:"Houssam",fonction:"Ingénieur Méthode",service:"Direction",telephone:"07 76 11 44 11",extension:"",email:"houssam.haddouchane@gxo.com",mobile:"07 76 11 44 11",horaires:"Lun-Ven 08h-17h",bureau:"Direction",keywords:"ingenieur methode direction"},{id:8,nom:"VALY",prenom:"Thierry",fonction:"RQHSSE",service:"Direction",telephone:"07 77 82 73 30",extension:"",email:"thierry.valy@gxo.com",mobile:"07 77 82 73 30",horaires:"Lun-Ven 08h-17h",bureau:"Direction",keywords:"rqhsse qualite securite environnement"},{id:200,nom:"",prenom:"",fonction:"Admin",service:"Réception",telephone:"",extension:"150327",email:"admin.reception@gxo.com",mobile:"",horaires:"Lun-Ven 08h-17h",bureau:"Zone Réception",keywords:"admin reception"},{id:201,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150321",email:"agent.quai1@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:202,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150325",email:"agent.quai2@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:203,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150310",email:"agent.quai3@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:204,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150347",email:"agent.quai4@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:205,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150328",email:"agent.quai5@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:206,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150352",email:"controleur1@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:207,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150240",email:"controleur2@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:208,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150313",email:"controleur3@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:209,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150344",email:"controleur4@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:210,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150226",email:"controleur5@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:211,nom:"",prenom:"",fonction:"Accueil chauffeur",service:"Réception",telephone:"",extension:"140148",email:"accueil.chauffeur@gxo.com",mobile:"",horaires:"Lun-Ven 07h-17h",bureau:"Zone Réception",keywords:"accueil chauffeur reception"}],r=[{name:"Tous",icon:"fa-address-book",color:"bg-gray-500",count:t.length},{name:"Direction",icon:"fa-building",color:"bg-orange-500",count:t.filter(i=>i.service==="Direction").length},{name:"Process Control",icon:"fa-clipboard-check",color:"bg-green-500",count:t.filter(i=>i.service==="Process Control").length},{name:"Réception",icon:"fa-truck-loading",color:"bg-orange-600",count:t.filter(i=>i.service==="Réception").length},{name:"IPL",icon:"fa-forklift",color:"bg-teal-500",count:t.filter(i=>i.service==="IPL").length},{name:"Préparation",icon:"fa-dolly",color:"bg-purple-500",count:t.filter(i=>i.service==="Préparation").length},{name:"Expédition",icon:"fa-shipping-fast",color:"bg-indigo-500",count:t.filter(i=>i.service==="Expédition").length},{name:"Retours",icon:"fa-undo-alt",color:"bg-cyan-500",count:t.filter(i=>i.service==="Retours").length},{name:"Maintenance",icon:"fa-tools",color:"bg-orange-500",count:t.filter(i=>i.service==="Maintenance").length},{name:"RH",icon:"fa-users",color:"bg-pink-500",count:t.filter(i=>i.service==="RH").length}];return e("div",{class:"min-h-screen bg-gray-50 pb-12",children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white py-12 px-6 mb-8 shadow-lg",children:e("div",{class:"max-w-7xl mx-auto",children:e("div",{class:"flex items-center mb-4",children:[e("i",{class:"fas fa-address-book text-5xl mr-4"}),e("div",{children:[e("h1",{class:"text-4xl font-bold",children:"Annuaire Complet GXO Moissy-Cramayel"}),e("p",{class:"text-lg mt-2 text-gray-200",children:["Annuaire GXO Moissy-Cramayel - ",t.length," contacts"]})]})]})})}),e("div",{class:"max-w-7xl mx-auto px-6",children:[e("div",{class:"bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 rounded-lg",children:e("div",{class:"flex items-start",children:[e("i",{class:"fas fa-file-pdf text-3xl text-red-600 mr-4 mt-1"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-2",children:[e("i",{class:"fas fa-info-circle mr-2"}),"Documents de Référence"]}),e("p",{class:"text-gray-700 mb-4",children:"Consultez les documents PDF officiels pour la liste complète et mise à jour des contacts GXO Moissy-Cramayel."}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("a",{href:"/static/documents/Contacts_Page1.pdf",target:"_blank",class:"flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200",children:[e("i",{class:"fas fa-file-pdf text-4xl text-red-600 mr-4"}),e("div",{children:[e("div",{class:"font-semibold text-gray-800",children:"Contacts - Page 1"}),e("div",{class:"text-sm text-gray-600",children:"915 KB • PDF"})]}),e("i",{class:"fas fa-external-link-alt ml-auto text-gray-400"})]}),e("a",{href:"/static/documents/Contacts_Page2.pdf",target:"_blank",class:"flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200",children:[e("i",{class:"fas fa-file-pdf text-4xl text-red-600 mr-4"}),e("div",{children:[e("div",{class:"font-semibold text-gray-800",children:"Contacts - Page 2"}),e("div",{class:"text-sm text-gray-600",children:"655 KB • PDF"})]}),e("i",{class:"fas fa-external-link-alt ml-auto text-gray-400"})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-md p-6 mb-8",children:[e("div",{class:"flex items-center mb-4",children:[e("i",{class:"fas fa-search text-2xl text-gray-600 mr-3"}),e("h2",{class:"text-2xl font-bold text-gray-800",children:"Recherche de Contact"})]}),e("div",{class:"relative",children:[e("input",{type:"text",id:"search-input",placeholder:"Rechercher par nom, prénom, fonction, service, téléphone...",class:"w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-[#FF4500] focus:outline-none",onkeyup:"filterContacts()"}),e("i",{class:"fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"})]}),e("button",{onclick:"clearSearch()",class:"mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors",children:[e("i",{class:"fas fa-times mr-2"}),"Effacer"]})]}),e("div",{class:"bg-white rounded-lg shadow-md p-6 mb-8",children:[e("div",{class:"flex items-center mb-4",children:[e("i",{class:"fas fa-filter text-2xl text-gray-600 mr-3"}),e("h2",{class:"text-2xl font-bold text-gray-800",children:"Filtrer par Service"})]}),e("div",{class:"flex flex-wrap gap-3",children:r.map(i=>e("button",{onclick:`filterByService('${i.name}')`,class:`filter-btn ${i.color} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity shadow`,"data-service":i.name,children:[e("i",{class:`${i.icon} mr-2`}),i.name," (",i.count,")"]}))})]}),e("div",{class:"mb-4",children:e("div",{class:"text-sm text-gray-600",children:[e("i",{class:"fas fa-info-circle mr-2"}),e("span",{id:"contacts-count",children:t.length})," contact(s) affiché(s)"]})}),e("div",{id:"contacts-container",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(i=>{const s=r.find(a=>a.name===i.service),n=s?s.color:"bg-gray-500";return s&&s.icon,e("div",{class:`contact-card bg-white rounded-lg shadow-lg border-l-4 ${n.replace("bg-","border-")} overflow-hidden hover:shadow-xl transition-shadow`,"data-service":i.service,"data-keywords":i.keywords,"data-nom":i.nom.toLowerCase(),"data-prenom":i.prenom.toLowerCase(),"data-fonction":i.fonction.toLowerCase(),"data-telephone":i.telephone,"data-email":i.email,children:e("div",{class:"p-6",children:[e("div",{class:"flex items-start justify-between mb-4",children:[e("div",{class:"flex-1",children:[e("div",{class:"flex items-center mb-2",children:e("span",{class:`text-xs font-bold ${n.replace("bg-","text-")} uppercase tracking-wide`,children:["Service : ",i.service]})}),e("h3",{class:"text-xl font-bold text-gray-800",children:[i.prenom," ",i.nom]}),e("p",{class:"text-sm text-gray-600 font-medium mt-1",children:i.fonction})]}),i.service==="Urgence"&&e("span",{class:"text-3xl animate-pulse",children:"🚨"})]}),e("div",{class:"space-y-3 mb-4 pb-4 border-b border-gray-200",children:[e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-phone text-green-600 w-6 mr-3"}),e("a",{href:`tel:${i.telephone}`,class:"hover:text-[#FF4500] font-medium",children:i.telephone})]}),i.extension&&e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-hashtag text-orange-600 w-6 mr-3"}),e("span",{class:"text-sm",children:["Ext. ",i.extension]})]}),i.mobile&&e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-mobile-alt text-purple-600 w-6 mr-3"}),e("a",{href:`tel:${i.mobile}`,class:"hover:text-[#FF4500] font-medium",children:i.mobile})]}),e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-envelope text-red-600 w-6 mr-3"}),e("a",{href:`mailto:${i.email}`,class:"hover:text-[#FF4500] text-sm break-all",children:i.email})]})]}),e("div",{class:"space-y-2 text-sm",children:[e("div",{class:"flex items-start text-gray-600",children:[e("i",{class:"fas fa-clock text-orange-600 w-6 mr-3 mt-1"}),e("span",{class:"flex-1",children:i.horaires})]}),e("div",{class:"flex items-start text-gray-600",children:[e("i",{class:"fas fa-map-marker-alt text-teal-600 w-6 mr-3 mt-1"}),e("span",{class:"flex-1",children:i.bureau})]})]}),e("div",{class:"mt-6 flex gap-2",children:[e("a",{href:`tel:${i.telephone}`,class:"flex-1 bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors text-center",children:[e("i",{class:"fas fa-phone mr-2"}),"Appeler"]}),e("a",{href:`mailto:${i.email}`,class:"bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors",title:"Envoyer un email",children:e("i",{class:"fas fa-envelope"})})]})]})})})}),e("div",{id:"no-results",class:"hidden text-center py-12",children:[e("i",{class:"fas fa-search text-6xl text-gray-300 mb-4"}),e("p",{class:"text-xl text-gray-600 font-semibold",children:"Aucun contact trouvé"}),e("p",{class:"text-gray-500 mt-2",children:"Essayez avec d'autres mots-clés ou filtres"})]})]}),e("script",{dangerouslySetInnerHTML:{__html:`
        function filterContacts() {
          const searchTerm = document.getElementById('search-input').value.toLowerCase()
          const cards = document.querySelectorAll('.contact-card')
          let visibleCount = 0

          cards.forEach(card => {
            const nom = card.dataset.nom || ''
            const prenom = card.dataset.prenom || ''
            const fonction = card.dataset.fonction || ''
            const service = card.dataset.service.toLowerCase()
            const keywords = card.dataset.keywords || ''
            const telephone = card.dataset.telephone || ''
            const email = card.dataset.email || ''

            const matches = nom.includes(searchTerm) ||
                          prenom.includes(searchTerm) ||
                          fonction.includes(searchTerm) ||
                          service.includes(searchTerm) ||
                          keywords.includes(searchTerm) ||
                          telephone.includes(searchTerm) ||
                          email.includes(searchTerm)

            if (matches) {
              card.style.display = 'block'
              visibleCount++
            } else {
              card.style.display = 'none'
            }
          })

          updateCount(visibleCount)
        }

        function filterByService(serviceName) {
          const cards = document.querySelectorAll('.contact-card')
          let visibleCount = 0

          // Clear search input
          document.getElementById('search-input').value = ''

          cards.forEach(card => {
            const cardService = card.dataset.service

            if (serviceName === 'Tous' || cardService === serviceName) {
              card.style.display = 'block'
              visibleCount++
            } else {
              card.style.display = 'none'
            }
          })

          // Update active filter button
          document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.service === serviceName) {
              btn.style.opacity = '1'
              btn.style.transform = 'scale(1.05)'
            } else {
              btn.style.opacity = '0.7'
              btn.style.transform = 'scale(1)'
            }
          })

          updateCount(visibleCount)
        }

        function clearSearch() {
          document.getElementById('search-input').value = ''
          filterByService('Tous')
        }

        function updateCount(count) {
          document.getElementById('contacts-count').textContent = count
          const noResults = document.getElementById('no-results')
          const container = document.getElementById('contacts-container')

          if (count === 0) {
            noResults.classList.remove('hidden')
            container.classList.add('hidden')
          } else {
            noResults.classList.add('hidden')
            container.classList.remove('hidden')
          }
        }

        // Initialize - show all contacts
        filterByService('Tous')
      `}})]})}function Ts(){return e("div",{class:"min-h-screen relative flex items-center justify-center px-4",children:[e("div",{class:"absolute inset-0 bg-cover bg-center",style:"background-image: url('/static/warehouse-bg-hd.jpg');"}),e("div",{class:"absolute inset-0 bg-gradient-to-br from-[#FF4500]/70 via-[#FF5A1A]/70 to-[#E53D00]/70"}),e("div",{class:"absolute inset-0 opacity-10",children:e("svg",{class:"w-full h-full",viewBox:"0 0 100 100",preserveAspectRatio:"none",children:[e("defs",{children:e("pattern",{id:"grid",width:"10",height:"10",patternUnits:"userSpaceOnUse",children:e("path",{d:"M 10 0 L 0 0 0 10",fill:"none",stroke:"white","stroke-width":"0.5"})})}),e("rect",{width:"100",height:"100",fill:"url(#grid)"})]})}),e("div",{class:"relative z-10 w-full max-w-md",children:[e("div",{id:"error-message",class:"hidden mb-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-shake",children:e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-exclamation-circle mr-3 text-xl"}),e("span",{id:"error-text"})]})}),e("div",{class:"bg-white rounded-2xl shadow-2xl overflow-hidden",children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] p-20 flex items-center justify-center relative overflow-hidden min-h-[320px]",children:[e("div",{class:"absolute inset-0 opacity-30",children:e("div",{class:"absolute left-1/4 top-1/2 -translate-y-1/2 animate-forklift-move",children:e("i",{class:"fas fa-forklift text-5xl text-white/70"})})}),e("div",{class:"relative z-10",style:"margin-left: 0.5cm;",children:e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-28 w-auto mx-auto"})})]}),e("div",{class:"p-8",children:[e("form",{id:"login-form",class:"space-y-6",children:[e("div",{children:[e("label",{for:"username",class:"block text-sm font-semibold text-gray-700 mb-2",children:[e("i",{class:"fas fa-user mr-2 text-[#FF4500]"}),"Identifiant GXO"]}),e("input",{type:"text",id:"username",name:"username",required:!0,autocomplete:"username",class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none transition-colors",placeholder:"Votre identifiant"})]}),e("div",{children:[e("label",{for:"password",class:"block text-sm font-semibold text-gray-700 mb-2",children:[e("i",{class:"fas fa-lock mr-2 text-[#FF4500]"}),"Mot de passe"]}),e("div",{class:"relative",children:[e("input",{type:"password",id:"password",name:"password",required:!0,autocomplete:"current-password",class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none transition-colors pr-12",placeholder:"••••••••"}),e("button",{type:"button",onclick:"togglePassword()",class:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF4500] transition-colors",children:e("i",{id:"password-icon",class:"fas fa-eye"})})]})]}),e("div",{class:"flex items-center",children:[e("input",{type:"checkbox",id:"remember",name:"remember",class:"w-4 h-4 text-[#FF4500] border-gray-300 rounded focus:ring-[#FF4500]"}),e("label",{for:"remember",class:"ml-2 text-sm text-gray-600",children:"Se souvenir de moi"})]}),e("button",{type:"submit",class:"w-full bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]",children:[e("i",{class:"fas fa-sign-in-alt mr-2"}),"Se connecter"]})]}),e("div",{class:"mt-6 pt-6 border-t border-gray-200",children:e("div",{class:"flex items-start text-xs text-gray-500",children:[e("i",{class:"fas fa-shield-alt mr-2 mt-1 text-green-600"}),e("div",{children:[e("p",{class:"font-semibold text-gray-700 mb-1",children:"Connexion sécurisée"}),e("p",{children:"Vos identifiants sont protégés par cryptage. Cette plateforme est réservée aux employés GXO autorisés."})]})]})}),e("div",{class:"mt-4 text-center",children:e("a",{href:"#",onclick:"showHelp(); return false;",class:"text-sm text-[#FF4500] hover:underline",children:[e("i",{class:"fas fa-question-circle mr-1"}),"Besoin d'aide pour vous connecter ?"]})})]})]}),e("div",{class:"text-center mt-6 text-white/60 text-sm",children:[e("p",{children:"© 2026 GXO Logistics - Tous droits réservés"}),e("p",{class:"mt-1",children:"Plateforme interne confidentielle"})]})]})]})}function js(){return e("div",{class:"min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-3 md:p-4",children:[e("div",{class:"bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md",children:[e("div",{class:"text-center mb-6 md:mb-8",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-16 md:h-20 mx-auto mb-3 md:mb-4"}),e("h1",{class:"text-2xl md:text-3xl font-bold text-gray-800 mb-2",children:[e("i",{class:"fas fa-truck text-[#FF5A1A] mr-2"}),"Accès Chauffeur"]}),e("p",{class:"text-sm md:text-base text-gray-600",children:"Scannez le QR Code pour accéder au système"})]}),e("div",{class:"bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 md:p-8 mb-4 md:mb-6 text-center",children:[e("div",{class:"bg-white inline-block p-3 md:p-4 rounded-lg shadow-md",children:e("div",{id:"qrcode-container"})}),e("p",{class:"text-gray-700 font-semibold mt-3 md:mt-4 text-xs md:text-sm",children:"🇧🇬 🇨🇿 🇩🇰 🇩🇪 🇭🇷 🇮🇹 🇵🇱 🇵🇹 🇷🇴"}),e("p",{class:"text-gray-600 text-xs mt-2",children:"Système multilingue disponible"})]}),e("div",{class:"bg-blue-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6",children:[e("h3",{class:"font-bold text-gray-800 mb-2 flex items-center text-sm md:text-base",children:[e("i",{class:"fas fa-info-circle text-blue-500 mr-2"}),"Instructions"]}),e("ol",{class:"text-xs md:text-sm text-gray-700 space-y-2",children:[e("li",{class:"flex items-start",children:[e("span",{class:"bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0",children:"1"}),e("span",{children:"Ouvrez l'appareil photo de votre smartphone"})]}),e("li",{class:"flex items-start",children:[e("span",{class:"bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0",children:"2"}),e("span",{children:"Pointez vers le QR Code ci-dessus"})]}),e("li",{class:"flex items-start",children:[e("span",{class:"bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0",children:"3"}),e("span",{children:"Suivez les instructions à l'écran"})]})]})]}),e("div",{class:"text-center",children:[e("p",{class:"text-gray-600 text-xs md:text-sm mb-2 md:mb-3",children:"Ou cliquez directement :"}),e("a",{href:"/chauffeur/langue",class:"inline-block bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-sm md:text-base active:scale-95",children:[e("i",{class:"fas fa-mobile-alt mr-2"}),"Accéder au système"]})]}),e("div",{class:"mt-6 md:mt-8 text-center text-gray-500 text-xs",children:[e("p",{children:"GXO Logistics Moissy-Cramayel"}),e("p",{class:"mt-1",children:"Système d'accueil chauffeurs"})]})]}),e("script",{src:"https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"}),e("script",{dangerouslySetInnerHTML:{__html:`
          document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('qrcode-container');
            if (container && typeof QRCode !== 'undefined') {
              // URL pointant directement vers la sélection de langue
              const url = window.location.origin + '/chauffeur/langue';
              
              new QRCode(container, {
                text: url,
                width: 200,
                height: 200,
                colorDark: '#FF5A1A',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              });
            }
          });
        `}})]})}function Ls(){return e("div",{class:"min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4",children:e("div",{class:"bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-3xl",children:[e("div",{class:"text-center mb-6 md:mb-8",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-12 md:h-16 mx-auto mb-4"}),e("h1",{class:"text-2xl md:text-3xl font-bold text-gray-800 mb-2",children:"Bienvenue / Welcome / Tervetuloa / Welkom"}),e("p",{class:"text-sm md:text-base text-gray-600",children:"Sélectionnez votre langue / Select your language / Valitse kielesi / Kies uw taal"})]}),e("div",{class:"grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4",children:[{code:"fr",nom:"Français",drapeau:"🇫🇷"},{code:"nl",nom:"Nederlands",drapeau:"🇳🇱"},{code:"fi",nom:"Suomi",drapeau:"🇫🇮"},{code:"de",nom:"Deutsch",drapeau:"🇩🇪"},{code:"it",nom:"Italiano",drapeau:"🇮🇹"},{code:"pl",nom:"Polski",drapeau:"🇵🇱"},{code:"pt",nom:"Português",drapeau:"🇵🇹"},{code:"bg",nom:"Български",drapeau:"🇧🇬"},{code:"cs",nom:"Čeština",drapeau:"🇨🇿"},{code:"da",nom:"Dansk",drapeau:"🇩🇰"},{code:"hr",nom:"Hrvatski",drapeau:"🇭🇷"},{code:"ro",nom:"Română",drapeau:"🇷🇴"}].map(r=>e("a",{href:`/chauffeur/video?lang=${r.code}`,class:"group block bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 rounded-xl p-4 md:p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-[#FF5A1A] active:scale-95",children:[e("div",{class:"text-4xl md:text-6xl mb-2 md:mb-3",children:r.drapeau}),e("h3",{class:"text-base md:text-xl font-bold text-gray-800 mb-1",children:r.nom}),e("div",{class:"text-[#FF5A1A] font-semibold opacity-0 group-hover:opacity-100 transition-opacity",children:e("i",{class:"fas fa-arrow-right"})})]}))}),e("div",{class:"mt-6 md:mt-8 bg-blue-50 rounded-lg p-3 md:p-4",children:e("div",{class:"flex items-center justify-center text-gray-700 text-sm md:text-base",children:[e("i",{class:"fas fa-hand-pointer text-xl md:text-2xl text-blue-500 mr-2 md:mr-3"}),e("span",{children:"Cliquez sur votre langue / Click on your language / Valitse kielesi / Kies uw taal"})]})})]})})}function Ms(){return e("div",{class:"min-h-screen bg-black flex flex-col",children:[e("div",{class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-3 md:p-4 shadow-lg",children:e("div",{class:"container mx-auto",children:[e("div",{class:"flex items-center justify-between mb-2",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO",class:"h-8 md:h-10"}),e("div",{class:"text-white font-bold text-sm md:text-base",id:"langue-selectionnee"})]}),e("div",{class:"text-center",children:e("h1",{class:"text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2",children:[e("i",{class:"fas fa-play-circle"}),e("span",{id:"titre-instructions",children:"Instructions"})]})})]})}),e("div",{class:"flex-1 flex items-center justify-center p-2 md:p-4",children:e("div",{class:"w-full max-w-5xl",children:[e("div",{class:"relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl",style:"min-height: 200px;",children:[e("video",{id:"video-instructions",class:"w-full h-auto mx-auto",style:"max-height: 70vh; object-fit: contain; display: block;",controls:!0,controlsList:"nodownload",disablePictureInPicture:!0,onContextMenu:"return false;",playsinline:!0,"webkit-playsinline":"true","x-webkit-airplay":"allow",preload:"metadata",crossorigin:"anonymous",children:[e("source",{src:"",type:"video/mp4",id:"video-source"}),"Votre navigateur ne supporte pas la lecture vidéo."]}),e("div",{id:"video-placeholder",class:"absolute inset-0 flex items-center justify-center p-4 md:p-8 bg-gray-900",children:e("div",{class:"text-center",children:[e("div",{class:"relative inline-block",children:e("svg",{class:"animate-spin h-16 w-16 md:h-20 md:w-20 text-orange-500 mb-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})}),e("p",{class:"text-white text-lg md:text-xl mb-2 font-semibold",children:"Chargement de la vidéo..."}),e("p",{class:"text-gray-400 text-xs md:text-sm",children:"Patientez quelques instants"})]})}),e("button",{id:"fullscreen-btn",onclick:"toggleFullscreen()",class:"hidden absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg transition-all z-10 text-sm md:text-base",children:[e("i",{class:"fas fa-expand mr-1",id:"fullscreen-icon"}),e("span",{id:"fullscreen-text",children:"Plein écran"})]})]}),e("div",{class:"mt-3 md:mt-4 bg-gray-800 rounded-full h-2 md:h-3 overflow-hidden",children:e("div",{id:"progress-bar",class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] h-full transition-all duration-300 flex items-center justify-center text-white text-xs font-bold",style:"width: 0%"})}),e("div",{class:"text-center mt-2 md:mt-3 text-gray-400 text-xs md:text-sm",id:"video-timer",children:"00:00 / 00:00"}),e("div",{id:"message-bloquant",class:"mt-4 md:mt-6 bg-yellow-500 text-black p-3 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base",children:[e("i",{class:"fas fa-lock mr-2"}),e("span",{id:"message-text",children:"Veuillez regarder la vidéo complète avant de continuer"})]}),e("div",{id:"btn-continuer-container",class:"hidden mt-4 md:mt-6 text-center",children:e("button",{id:"btn-continuer",onclick:"handleContinue()",class:"inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-lg transition-all cursor-pointer",children:[e("i",{class:"fas fa-check-circle mr-2"}),e("span",{id:"btn-continuer-text",children:"Continuer vers l'inscription"})]})})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
          // Animation pulse pour bouton mobile
          const style = document.createElement('style');
          style.textContent = \`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          \`;
          document.head.appendChild(style);
          
          // Récupérer la langue depuis l'URL
          const urlParams = new URLSearchParams(window.location.search);
          const langue = urlParams.get('lang') || 'bg';
          
          // Stocker la langue pour la suite
          sessionStorage.setItem('chauffeur_langue', langue);
          
          // Traductions
          const translations = {
            bg: { 
              header: '🇧🇬 Български', 
              titre: 'Инструкции',
              message: 'Моля, гледайте цялото видео преди да продължите',
              btn: 'Продължи към регистрацията',
              fullscreen: 'Цял екран'
            },
            cs: { 
              header: '🇨🇿 Čeština', 
              titre: 'Pokyny',
              message: 'Prosím sledujte celé video před pokračováním',
              btn: 'Pokračovat k registraci',
              fullscreen: 'Celá obrazovka'
            },
            da: { 
              header: '🇩🇰 Dansk', 
              titre: 'Instruktioner',
              message: 'Se venligst hele videoen før du fortsætter',
              btn: 'Fortsæt til registrering',
              fullscreen: 'Fuld skærm'
            },
            de: { 
              header: '🇩🇪 Deutsch', 
              titre: 'Anweisungen',
              message: 'Bitte sehen Sie sich das gesamte Video an, bevor Sie fortfahren',
              btn: 'Weiter zur Registrierung',
              fullscreen: 'Vollbild'
            },
            hr: { 
              header: '🇭🇷 Hrvatski', 
              titre: 'Upute',
              message: 'Molimo pogledajte cijeli video prije nastavka',
              btn: 'Nastavi s registracijom',
              fullscreen: 'Puni zaslon'
            },
            it: { 
              header: '🇮🇹 Italiano', 
              titre: 'Istruzioni',
              message: 'Si prega di guardare l\\'intero video prima di continuare',
              btn: 'Continua con la registrazione',
              fullscreen: 'Schermo intero'
            },
            pl: { 
              header: '🇵🇱 Polski', 
              titre: 'Instrukcje',
              message: 'Proszę obejrzeć cały film przed kontynuowaniem',
              btn: 'Przejdź do rejestracji',
              fullscreen: 'Pełny ekran'
            },
            pt: { 
              header: '🇵🇹 Português', 
              titre: 'Instruções',
              message: 'Por favor, assista ao vídeo completo antes de continuar',
              btn: 'Continuar para o registo',
              fullscreen: 'Ecrã inteiro'
            },
            ro: { 
              header: '🇷🇴 Română', 
              titre: 'Instrucțiuni',
              message: 'Vă rugăm să vizionați întregul video înainte de a continua',
              btn: 'Continuă către înregistrare',
              fullscreen: 'Ecran complet'
            },
            fr: { 
              header: '🇫🇷 Français', 
              titre: 'Instructions',
              message: 'Veuillez regarder la vidéo complète avant de continuer',
              btn: 'Continuer vers l\\'inscription',
              fullscreen: 'Plein écran'
            },
            nl: { 
              header: '🇳🇱 Nederlands', 
              titre: 'Instructies',
              message: 'Bekijk de volledige video voordat u doorgaat',
              btn: 'Doorgaan naar registratie',
              fullscreen: 'Volledig scherm'
            },
            fi: { 
              header: '🇫🇮 Suomi', 
              titre: 'Ohjeet',
              message: 'Katso koko video ennen jatkamista',
              btn: 'Jatka rekisteröintiin',
              fullscreen: 'Koko näyttö'
            }
          };
          
          const t = translations[langue] || translations.bg;
          document.getElementById('langue-selectionnee').textContent = t.header;
          document.getElementById('titre-instructions').textContent = t.titre;
          document.getElementById('message-text').textContent = t.message;
          document.getElementById('btn-continuer-text').textContent = t.btn;
          document.getElementById('fullscreen-text').textContent = t.fullscreen;
          
          // URLs des vidéos par langue (12 langues disponibles !)
          const videoUrls = {
            'fr': '/static/videos/instructions-fr.mp4',
            'nl': '/static/videos/instructions-nl.mp4',
            'fi': '/static/videos/instructions-fi.mp4',
            'bg': '/static/videos/instructions-bg.mp4',
            'cs': '/static/videos/instructions-cs.mp4',
            'da': '/static/videos/instructions-da.mp4',
            'de': '/static/videos/instructions-de.mp4',
            'hr': '/static/videos/instructions-hr.mp4',
            'it': '/static/videos/instructions-it.mp4',
            'pl': '/static/videos/instructions-pl.mp4',
            'pt': '/static/videos/instructions-pt.mp4',
            'ro': '/static/videos/instructions-ro.mp4'
          };
          
          const video = document.getElementById('video-instructions');
          const videoSource = document.getElementById('video-source');
          const progressBar = document.getElementById('progress-bar');
          const videoTimer = document.getElementById('video-timer');
          const messageBloquant = document.getElementById('message-bloquant');
          const btnContinuerContainer = document.getElementById('btn-continuer-container');
          const placeholder = document.getElementById('video-placeholder');
          const fullscreenBtn = document.getElementById('fullscreen-btn');
          

          
          // Fonction plein écran AMÉLIORÉE (support mobile)
          window.toggleFullscreen = function() {
            const videoContainer = video.parentElement;
            
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
              // Entrer en plein écran
              const requestFullscreen = videoContainer.requestFullscreen || 
                                       videoContainer.webkitRequestFullscreen || 
                                       videoContainer.mozRequestFullScreen || 
                                       videoContainer.msRequestFullscreen;
              
              if (requestFullscreen) {
                requestFullscreen.call(videoContainer).then(() => {
                  // Sur mobile, laisser l'orientation naturelle (portrait ou paysage)
                  console.log('✅ Mode plein écran activé');
                }).catch((err) => {
                  console.error('❌ Erreur plein écran:', err);
                });
              }
              
              document.getElementById('fullscreen-icon').className = 'fas fa-compress mr-1';
              document.getElementById('fullscreen-text').textContent = 'Quitter';
            } else {
              // Quitter le plein écran
              const exitFullscreen = document.exitFullscreen || 
                                    document.webkitExitFullscreen || 
                                    document.mozCancelFullScreen || 
                                    document.msExitFullscreen;
              
              if (exitFullscreen) {
                exitFullscreen.call(document).then(() => {
                  // Unlock orientation
                  if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                  }
                });
              }
              
              document.getElementById('fullscreen-icon').className = 'fas fa-expand mr-1';
              const t = translations[langue] || translations.bg;
              document.getElementById('fullscreen-text').textContent = t.fullscreen;
            }
          };
          
          // Écouter les changements de plein écran
          document.addEventListener('fullscreenchange', updateFullscreenButton);
          document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
          
          function updateFullscreenButton() {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
              document.getElementById('fullscreen-icon').className = 'fas fa-compress mr-1';
              document.getElementById('fullscreen-text').textContent = 'Quitter';
            } else {
              document.getElementById('fullscreen-icon').className = 'fas fa-expand mr-1';
              const t = translations[langue] || translations.bg;
              document.getElementById('fullscreen-text').textContent = t.fullscreen;
            }
          }
          
          // Fonction appelée quand la vidéo est terminée
          function videoCompleted() {
            progressBar.style.width = '100%';
            messageBloquant.classList.add('hidden');
            btnContinuerContainer.classList.remove('hidden');
            sessionStorage.setItem('video_completed', 'true');
          }
          
          // Fonction pour gérer le clic sur "Continuer"
          window.handleContinue = function() {
            canLeave = true;
            
            // Vérifier si le chauffeur est déjà inscrit (a un ID en session)
            const chauffeurId = sessionStorage.getItem('chauffeur_id');
            
            if (chauffeurId) {
              // Chauffeur déjà inscrit → Rediriger vers ses tâches
              console.log('✅ Chauffeur inscrit, redirection vers tâches:', chauffeurId);
              window.location.href = '/chauffeur/taches?id=' + chauffeurId;
            } else {
              // Nouveau chauffeur → Rediriger vers l'inscription
              console.log('✅ Nouveau chauffeur, redirection vers inscription');
              window.location.href = '/chauffeur/inscription';
            }
          };
          
          // Si une vidéo existe pour cette langue
          if (videoUrls[langue]) {
            videoSource.src = videoUrls[langue];
            
            let videoDisplayed = false;
            let isSeekingLocked = false;
            
            // Détection mobile
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // Fonction pour afficher la vidéo
            function afficherVideo() {
              if (videoDisplayed) return;
              videoDisplayed = true;
              console.log('✅ Vidéo chargée:', langue);
              placeholder.classList.add('hidden');
              video.classList.remove('hidden');
              fullscreenBtn.classList.remove('hidden');
            }
            
            // STRATÉGIE UNIVERSELLE : Même code pour MOBILE et PC
            // Charger la vidéo
            video.load();
            
            // Afficher le bouton PLAY sur mobile
            if (isMobile) {
              placeholder.innerHTML = \`
                <div class="text-center">
                  <button 
                    id="mobile-play-btn"
                    class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 active:scale-95"
                    style="animation: pulse 2s ease-in-out infinite;"
                  >
                    <i class="fas fa-play-circle text-5xl mb-3"></i>
                    <div class="text-lg">▶ Lancer la vidéo</div>
                  </button>
                  <p class="text-gray-400 text-sm mt-4">Appuyez pour démarrer</p>
                </div>
              \`;
              
              // Attendre que la vidéo soit prête
              video.addEventListener('canplaythrough', function() {
                console.log('✅ Vidéo prête pour lecture');
              });
              
              // Clic sur le bouton PLAY
              document.getElementById('mobile-play-btn').addEventListener('click', function() {
                console.log('🎬 Clic mobile - Lancement lecture');
                
                // Afficher la vidéo
                afficherVideo();
                
                // Activer le son
                video.muted = false;
                video.volume = 1.0;
                
                // Lancer la lecture
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                  playPromise.then(function() {
                    console.log('✅ Lecture démarrée');
                  }).catch(function(err) {
                    console.error('❌ Erreur lecture:', err.name, '-', err.message);
                    placeholder.classList.remove('hidden');
                    placeholder.innerHTML = \`
                      <div class="text-center px-4">
                        <i class="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                        <p class="text-white text-lg mb-2">Erreur de lecture</p>
                        <p class="text-gray-400 text-xs mb-4">\${err.name}: \${err.message}</p>
                        <button 
                          onclick="location.reload()"
                          class="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold"
                        >
                          <i class="fas fa-redo mr-2"></i>Réessayer
                        </button>
                      </div>
                    \`;
                  });
                }
              });
            } else {
              // PC : Autoplay direct
              video.muted = true;
              video.play().then(function() {
                setTimeout(function() { video.muted = false; }, 100);
              }).catch(function() {
                video.muted = false;
              });
            }
            
            // Événements de chargement (PC uniquement)
            if (!isMobile) {
              video.addEventListener('loadedmetadata', function() {
                console.log('✅ Métadonnées chargées');
                afficherVideo();
              });
              
              video.addEventListener('canplay', function() {
                console.log('✅ Vidéo prête');
                afficherVideo();
              });
              
              // Timeout secours
              setTimeout(function() {
                if (!videoDisplayed) {
                  console.log('⏰ Timeout - Affichage forcé');
                  afficherVideo();
                }
              }, 2000);
            }
            
            // Gestion erreurs
            video.addEventListener('error', function(e) {
              console.error('❌ Erreur chargement vidéo:', e);
              placeholder.innerHTML = \`
                <div class="text-center">
                  <i class="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                  <p class="text-white text-lg mb-4">Erreur de chargement</p>
                  <button 
                    onclick="location.reload()"
                    class="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600"
                  >
                    <i class="fas fa-redo mr-2"></i>Recharger
                  </button>
                </div>
              \`;
            });
            
            // Mise à jour progression (avec protection NaN)
            video.addEventListener('timeupdate', function() {
              if (isNaN(video.duration) || video.duration === 0) return;
              
              const percent = (video.currentTime / video.duration) * 100;
              progressBar.style.width = percent + '%';
              
              const currentMin = Math.floor(video.currentTime / 60);
              const currentSec = Math.floor(video.currentTime % 60);
              const durationMin = Math.floor(video.duration / 60);
              const durationSec = Math.floor(video.duration % 60);
              
              videoTimer.textContent = 
                String(currentMin).padStart(2, '0') + ':' + String(currentSec).padStart(2, '0') +
                ' / ' +
                String(durationMin).padStart(2, '0') + ':' + String(durationSec).padStart(2, '0');
            });
            
            // Vidéo terminée
            video.addEventListener('ended', videoCompleted);
            
            // Empêcher skip (avec protection boucle)
            video.addEventListener('seeking', function() {
              if (isSeekingLocked) return;
              if (video.currentTime > video.duration - 5) return;
              if (video.currentTime > (this.dataset.lastTime || 0)) {
                isSeekingLocked = true;
                video.currentTime = this.dataset.lastTime || 0;
                setTimeout(function() { isSeekingLocked = false; }, 100);
              }
            });
            
            video.addEventListener('timeupdate', function() {
              this.dataset.lastTime = this.currentTime;
            });
            
            console.log('✅ Vidéo prête. ' + (isMobile ? 'Appuyez sur PLAY.' : 'Chargement auto.'));
          } else {
            console.error('❌ Pas de vidéo pour la langue:', langue);
            placeholder.innerHTML = \`
              <div class="text-center">
                <i class="fas fa-film text-gray-500 text-5xl mb-4"></i>
                <p class="text-white text-lg">Vidéo non disponible</p>
                <p class="text-gray-400 text-sm mt-2">Langue : \${langue}</p>
              </div>
            \`;
          }
          
          // Empêcher de quitter la page
          let canLeave = false;
          
          window.addEventListener('beforeunload', function(e) {
            if (!canLeave && !sessionStorage.getItem('video_completed')) {
              e.preventDefault();
              e.returnValue = '';
              return '';
            }
          });
          
          if (btnContinuerContainer) {
            btnContinuerContainer.addEventListener('click', function() {
              canLeave = true;
            });
          }
          
          // Empêcher le back button pendant la vidéo
          history.pushState(null, null, location.href);
          window.addEventListener('popstate', function() {
            if (!sessionStorage.getItem('video_completed')) {
              history.pushState(null, null, location.href);
              const t = translations[langue] || translations.bg;
              alert(t.message);
            }
          });
        `}})]})}function Os(){return e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Inscription - GXO Chauffeur"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"})]}),e("body",{class:"min-h-screen bg-gray-100",children:[e("div",{class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg",children:e("div",{class:"container mx-auto flex items-center justify-between",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO",class:"h-10"}),e("div",{class:"text-white font-bold",id:"header-titre",children:"Inscription"})]})}),e("div",{class:"container mx-auto p-4 max-w-lg",children:e("div",{class:"bg-white rounded-2xl shadow-xl p-8 mb-6",children:[e("h2",{class:"text-3xl font-bold text-gray-800 mb-6 text-center",children:[e("i",{class:"fas fa-user-plus text-[#FF5A1A] mr-3"}),e("span",{id:"titre-inscription",children:"Inscription Chauffeur"})]}),e("form",{id:"form-inscription",class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-user mr-2 text-[#FF5A1A]"}),e("span",{id:"label-pseudo",children:"Pseudo / Nom"}),e("span",{class:"text-red-500",children:"*"})]}),e("input",{type:"text",id:"pseudo",required:!0,class:"w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"})]}),e("div",{children:[e("label",{class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-building mr-2 text-[#FF5A1A]"}),e("span",{id:"label-entreprise",children:"Entreprise de transport"}),e("span",{class:"text-red-500",children:"*"})]}),e("input",{type:"text",id:"entreprise",required:!0,class:"w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"})]}),e("div",{children:[e("label",{class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-warehouse mr-2 text-[#FF5A1A]"}),e("span",{id:"label-quai",children:"Numéro de quai attribué"}),e("span",{class:"text-red-500",children:"*"})]}),e("select",{id:"numero-quai",required:!0,class:"w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg",children:[e("option",{value:"",id:"option-select",children:"-- Sélectionner --"}),Array.from({length:20},(t,r)=>r+1).map(t=>e("option",{value:`Q${t}`,children:["Quai ",t]}))]})]}),e("button",{type:"submit",class:"w-full bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white py-4 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95",children:[e("i",{class:"fas fa-check-circle mr-2"}),e("span",{id:"btn-valider",children:"Valider et Commencer"})]})]}),e("div",{class:"mt-6 text-center text-sm text-gray-500",children:[e("i",{class:"fas fa-info-circle mr-1"}),e("span",{id:"info-message",children:"Après validation, vous accéderez à vos tâches de déchargement"})]})]})}),e("script",{src:"/static/chauffeur-inscription.js"})]})]})}const Is=()=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Mes Tâches - GXO Chauffeur"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("link",{rel:"stylesheet",href:"/static/animations.css"}),e("link",{rel:"preload",href:"/static/gxo-logo-official.svg",as:"image"}),e("link",{rel:"preload",href:"/static/chauffeur-taches.js",as:"script"})]}),e("body",{class:"bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen",children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg sticky top-0 z-50",children:e("div",{class:"flex items-center justify-between max-w-4xl mx-auto",children:[e("div",{class:"flex items-center space-x-3",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO",class:"h-8"}),e("div",{children:[e("div",{class:"text-xs opacity-90",children:"Bienvenue"}),e("div",{class:"font-bold text-lg",id:"chauffeur-pseudo",children:"Chauffeur"})]})]}),e("div",{class:"flex items-center space-x-3",children:[e("div",{id:"langue-indicator",class:"bg-white/20 rounded-full px-3 py-2 flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🇫🇷"}),e("span",{class:"font-bold",children:"FR"})]}),e("button",{id:"btn-chat",class:"relative bg-white/20 hover:bg-white/30 rounded-full p-3 transition",children:[e("i",{class:"fas fa-comments text-xl"}),e("span",{id:"chat-badge",class:"hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold",children:"0"})]})]})]})}),e("div",{class:"max-w-4xl mx-auto p-4 pb-24",children:[e("div",{class:"bg-white rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-orange-500",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("div",{children:[e("h2",{class:"text-2xl font-bold text-gray-800",children:"Votre Progression"}),e("p",{class:"text-gray-600 text-sm",children:["Quai ",e("span",{id:"info-quai",class:"font-bold text-orange-600",children:"--"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-4xl font-bold text-orange-600",id:"progression-percent",children:"0%"}),e("div",{class:"text-xs text-gray-500",children:"Complétée"})]})]}),e("div",{class:"w-full bg-gray-200 rounded-full h-4 overflow-hidden",children:e("div",{id:"barre-progression",class:"bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500",style:"width: 0%"})}),e("div",{class:"mt-4 flex items-center text-sm text-gray-600",children:[e("i",{class:"fas fa-clock mr-2"}),e("span",{children:["Temps écoulé: ",e("span",{id:"temps-ecoule",class:"font-bold",children:"0 min"})]})]})]}),e("div",{class:"space-y-4",id:"liste-taches",children:e("div",{class:"flex justify-center py-12",children:e("div",{class:"animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"})})}),e("div",{id:"message-complet",class:"hidden bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white",children:[e("i",{class:"fas fa-check-circle text-6xl mb-4"}),e("h3",{class:"text-3xl font-bold mb-2",children:"Félicitations !"}),e("p",{class:"text-lg mb-4",children:"Toutes les tâches sont terminées"}),e("p",{class:"text-sm opacity-90",children:"Un agent va venir vous voir pour le déchargement"})]})]}),e("div",{id:"modal-chat",class:"hidden fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center",children:e("div",{class:"bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col",style:"max-height: 90vh",children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between sm:rounded-t-2xl rounded-t-2xl",children:[e("div",{class:"flex items-center space-x-3",children:[e("i",{class:"fas fa-headset text-2xl"}),e("div",{children:[e("div",{class:"font-bold text-lg",children:"Support GXO"}),e("div",{class:"text-xs opacity-90 flex items-center gap-1",children:[e("span",{id:"admin-online-indicator",class:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),e("span",{id:"admin-online-text",children:"En ligne"})]})]})]}),e("button",{id:"btn-fermer-chat",class:"hover:bg-white/20 rounded-full p-2 transition",children:e("i",{class:"fas fa-times text-xl"})})]}),e("div",{id:"chat-messages",class:"flex-1 overflow-y-auto p-4 space-y-3",style:"max-height: 60vh",children:e("div",{class:"text-center text-gray-500 text-sm py-8",children:[e("i",{class:"fas fa-comments text-4xl mb-2 opacity-30"}),e("p",{children:"Commencez une conversation"})]})}),e("div",{id:"typing-indicator-chauffeur",class:"px-4 py-2 bg-gray-100 hidden border-t",children:e("div",{class:"flex items-center gap-2 text-gray-600 text-sm",children:[e("div",{class:"flex gap-1",children:[e("span",{class:"w-2 h-2 bg-orange-400 rounded-full animate-bounce",style:"animation-delay: 0ms"}),e("span",{class:"w-2 h-2 bg-orange-400 rounded-full animate-bounce",style:"animation-delay: 150ms"}),e("span",{class:"w-2 h-2 bg-orange-400 rounded-full animate-bounce",style:"animation-delay: 300ms"})]}),e("span",{id:"typing-indicator-chauffeur-text",children:"L'admin écrit..."})]})}),e("div",{class:"border-t p-4 bg-gray-50 sm:rounded-b-2xl rounded-b-2xl",children:e("div",{class:"flex space-x-2",children:[e("input",{type:"text",id:"input-message",placeholder:"Écrivez votre message...",class:"flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all",oninput:"notifierFrappeChauffeur()"}),e("button",{id:"btn-envoyer-message",class:"bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-bold transition-all shadow-md hover:shadow-lg",children:e("i",{class:"fas fa-paper-plane"})})]})})]})}),e("script",{src:"/static/chauffeur-taches.js"})]})]}),Ns=()=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Dashboard Chauffeurs - GXO Admin"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("link",{rel:"stylesheet",href:"/static/animations.css"}),e("link",{rel:"preload",href:"/static/gxo-logo-official.svg",as:"image"}),e("link",{rel:"preload",href:"/static/accueil-chauffeur-dashboard.js",as:"script"})]}),e("body",{class:"bg-gray-100",children:[e("div",{class:"bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg",children:e("div",{class:"max-w-7xl mx-auto px-4 py-4",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO",class:"h-10"}),e("div",{children:[e("h1",{class:"text-2xl font-bold",children:"Dashboard Chauffeurs"}),e("p",{class:"text-sm opacity-90",children:"Suivi en temps réel"})]})]}),e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 rounded-xl px-4 py-2",children:[e("div",{class:"text-xs opacity-90",children:"Chauffeurs actifs"}),e("div",{class:"text-2xl font-bold",id:"count-actifs",children:"0"})]}),e("a",{href:"/",class:"bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 transition",children:[e("i",{class:"fas fa-home mr-2"}),"Accueil"]})]})]})})}),e("div",{class:"max-w-7xl mx-auto px-4 py-6",children:[e("div",{class:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",children:[e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"Tâches Complètes"}),e("p",{class:"text-3xl font-bold text-green-600",id:"stat-completes",children:"0"})]}),e("i",{class:"fas fa-check-circle text-4xl text-green-500 opacity-20"})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"En Cours"}),e("p",{class:"text-3xl font-bold text-orange-600",id:"stat-en-cours",children:"0"})]}),e("i",{class:"fas fa-clock text-4xl text-orange-500 opacity-20"})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"Nouveaux"}),e("p",{class:"text-3xl font-bold text-blue-600",id:"stat-nouveaux",children:"0"})]}),e("i",{class:"fas fa-plus-circle text-4xl text-blue-500 opacity-20"})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"Messages Non Lus"}),e("p",{class:"text-3xl font-bold text-red-600",id:"stat-messages",children:"0"})]}),e("i",{class:"fas fa-envelope text-4xl text-red-500 opacity-20"})]})})]}),e("div",{id:"notifications-live",class:"mb-6"}),e("div",{class:"bg-white rounded-xl shadow-lg overflow-hidden",children:[e("div",{class:"bg-gray-50 px-6 py-4 border-b flex items-center justify-between",children:[e("h2",{class:"text-xl font-bold text-gray-800",children:[e("i",{class:"fas fa-users mr-2"}),"Chauffeurs Actifs"]}),e("button",{onclick:"chargerChauffeurs()",class:"bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition",children:[e("i",{class:"fas fa-sync-alt mr-2"}),"Actualiser"]})]}),e("div",{class:"overflow-x-auto",children:e("table",{class:"w-full",children:[e("thead",{class:"bg-gray-100 border-b",children:e("tr",{children:[e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Chauffeur"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Quai"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Progression"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tâches"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Durée"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Actions"})]})}),e("tbody",{id:"table-chauffeurs",class:"divide-y divide-gray-200",children:e("tr",{children:e("td",{colspan:"6",class:"px-6 py-12 text-center",children:e("div",{class:"flex flex-col items-center space-y-3",children:[e("div",{class:"animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"}),e("p",{class:"text-gray-500",children:"Chargement des chauffeurs..."})]})})})})]})})]})]}),e("div",{id:"modal-chat",class:"hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e("div",{class:"bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col",style:"max-height: 80vh",children:[e("div",{class:"bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-3",children:[e("i",{class:"fas fa-user-circle text-3xl"}),e("div",{children:[e("h3",{class:"font-bold text-xl",id:"chat-chauffeur-nom",children:"Chauffeur"}),e("p",{class:"text-sm opacity-90",children:["Quai ",e("span",{id:"chat-chauffeur-quai",children:"--"})," •",e("span",{id:"chat-chauffeur-entreprise",children:"--"})]})]})]}),e("button",{id:"btn-fermer-chat",class:"hover:bg-white/20 rounded-full p-2 transition",children:e("i",{class:"fas fa-times text-2xl"})})]})}),e("div",{id:"chat-messages",class:"flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50",children:e("div",{class:"text-center text-gray-500 py-12",children:[e("i",{class:"fas fa-comments text-5xl mb-3 opacity-30"}),e("p",{children:"Aucun message"})]})}),e("div",{class:"p-6 bg-white border-t rounded-b-2xl",children:e("div",{class:"flex space-x-3",children:[e("input",{type:"text",id:"input-admin-message",placeholder:"Écrivez un message au chauffeur...",class:"flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"}),e("button",{id:"btn-envoyer-admin-message",class:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition",children:e("i",{class:"fas fa-paper-plane"})})]})})]})}),e("script",{src:"/static/admin-dashboard-chauffeurs.js"})]})]});async function _r(t,r,i="auto"){try{const s=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${i}&tl=${r}&dt=t&q=${encodeURIComponent(t)}`,a=await(await fetch(s)).json();return a&&a[0]&&a[0][0]&&a[0][0][0]?a[0][0][0]:t}catch(s){return console.error("Erreur traduction:",s),t}}const E=new Pr;E.use("/static/*",Qi({root:"./",onNotFound:(t,r)=>(console.log("Fichier non trouvé:",t),r.notFound())}));E.get("/login",Ft,t=>t.render(e(Ts,{})));E.get("/qrcode-chauffeur",Ft,t=>t.render(e(js,{})));E.get("/chauffeur/langue",Ft,t=>t.render(e(Ls,{})));E.get("/chauffeur/video",ys,t=>t.render(e(Ms,{})));E.get("/chauffeur/inscription",t=>t.render(e(Os,{})));E.get("/chauffeur/taches",t=>t.render(e(Is,{})));E.post("/api/chauffeur/inscription",async t=>{try{const{pseudo:r,entreprise:i,numero_quai:s,langue:n,video_completed:a}=await t.req.json(),l=await t.env.DB.prepare(`
      INSERT INTO chauffeur_arrivals (pseudo, entreprise, numero_quai, langue, video_completed)
      VALUES (?, ?, ?, ?, ?)
    `).bind(r,i,s,n,a?1:0).run();return t.json({success:!0,id:l.meta.last_row_id})}catch(r){return console.error("Erreur inscription:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/chauffeur/valider-tache",async t=>{try{const{chauffeur_id:r,tache:i}=await t.req.json(),s={epi:"task_epi_porte",placement:"task_placement_quai",palette:"task_palette_change",accueil:"task_accueil_notifie",clefs:"task_clefs_remises"},n={epi:"task_epi_time",placement:"task_placement_time",palette:"task_palette_time",accueil:"task_accueil_time",clefs:"task_clefs_time"},a=s[i],l=n[i];return!a||!l?t.json({success:!1,error:"Tâche invalide"},400):(await t.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET ${a} = 1, ${l} = datetime('now')
      WHERE id = ?
    `).bind(r).run(),t.json({success:!0}))}catch(r){return console.error("Erreur validation tâche:",r),t.json({success:!1,error:r.message},500)}});E.get("/api/chauffeur/progression",async t=>{try{const r=t.req.query("id"),i=await t.env.DB.prepare(`
      SELECT * FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first();return t.json({success:!0,...i})}catch(r){return console.error("Erreur progression:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/chauffeur/chat",async t=>{try{const{chauffeur_id:r,message:i}=await t.req.json(),s=await t.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first(),n=(s==null?void 0:s.langue)||"fr";let a=i;return n!=="fr"&&(a=await _r(i,"fr",n)),await t.env.DB.prepare(`
      INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_fr, delivered_at, sender_online)
      VALUES (?, 'chauffeur', ?, ?, ?, datetime('now'), 1)
    `).bind(r,i,n,a).run(),t.json({success:!0})}catch(r){return console.error("Erreur envoi message:",r),t.json({success:!1,error:r.message},500)}});E.get("/api/chauffeur/chat",async t=>{try{const r=t.req.query("chauffeur_id"),i=await t.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first(),s=(i==null?void 0:i.langue)||"fr",{results:n}=await t.env.DB.prepare(`
      SELECT * FROM chat_messages 
      WHERE chauffeur_id = ? 
      ORDER BY timestamp ASC
    `).bind(r).all();return t.json({success:!0,messages:n,chauffeur_langue:s})}catch(r){return console.error("Erreur récupération messages:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/chat/heartbeat",async t=>{try{const{chauffeur_id:r,page_url:i}=await t.req.json();return await t.env.DB.prepare(`
      INSERT INTO chauffeur_sessions (chauffeur_id, last_heartbeat, is_online, page_url)
      VALUES (?, datetime('now'), 1, ?)
      ON CONFLICT(chauffeur_id) 
      DO UPDATE SET 
        last_heartbeat = datetime('now'),
        is_online = 1,
        page_url = excluded.page_url
    `).bind(r,i||"").run(),t.json({success:!0,online:!0,timestamp:new Date().toISOString()})}catch(r){return console.error("Erreur heartbeat:",r),t.json({success:!1,error:r.message},500)}});E.get("/api/chat/online-status",async t=>{try{const r=t.req.query("chauffeur_id"),i=await t.env.DB.prepare(`
      SELECT last_heartbeat, is_online,
             (julianday('now') - julianday(last_heartbeat)) * 86400 as seconds_ago
      FROM chauffeur_sessions
      WHERE chauffeur_id = ?
    `).bind(r).first(),s=i&&i.seconds_ago<30;return t.json({success:!0,online:s,last_heartbeat:(i==null?void 0:i.last_heartbeat)||null,seconds_ago:(i==null?void 0:i.seconds_ago)||null})}catch(r){return console.error("Erreur statut en ligne:",r),t.json({success:!1,error:r.message},500)}});E.get("/api/chauffeur/liste",async t=>{try{const{results:r}=await t.env.DB.prepare(`
      SELECT 
        ca.*,
        cs.last_heartbeat,
        cs.is_online,
        CASE 
          WHEN cs.last_heartbeat IS NOT NULL 
            AND (julianday('now') - julianday(cs.last_heartbeat)) * 86400 < 30 
          THEN 1 
          ELSE 0 
        END as online_status
      FROM chauffeur_arrivals ca
      LEFT JOIN chauffeur_sessions cs ON ca.id = cs.chauffeur_id
      WHERE ca.status = 'in_progress' 
      ORDER BY ca.arrival_time DESC
    `).all();return t.json({success:!0,chauffeurs:r})}catch(r){return console.error("Erreur liste chauffeurs:",r),t.json({success:!1,error:r.message},500)}});E.use("*",async(t,r)=>{const i=t.req.path;if(["/login","/test-questionnaire","/qrcode-chauffeur","/chauffeur/langue","/chauffeur/video","/chauffeur/inscription","/chauffeur/taches"].includes(i)||i.startsWith("/static/")||i.startsWith("/api/chauffeur/")){await r();return}await r()});E.use(vs);E.get("/",t=>t.render(e(ws,{})));E.get("/reception",t=>t.render(e(ks,{})));E.get("/accueil-chauffeur",t=>t.render(e(Cs,{})));E.get("/administrateur",t=>t.render(e(Es,{})));E.get("/controleur",t=>t.render(e(As,{})));E.get("/agent-quai",t=>t.render(e(Rs,{})));E.get("/nouveau",t=>t.render(e(Ss,{})));E.get("/anomalies",t=>t.render(e(Ps,{})));E.get("/bibliotheque",t=>t.render(e(qs,{})));E.get("/contacts",t=>t.render(e(Fs,{})));E.get("/admin/chauffeurs-dashboard",t=>t.render(e(Ns,{})));E.post("/api/admin/chat",async t=>{try{const{chauffeur_id:r,message:i}=await t.req.json(),s=await t.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first(),n=(s==null?void 0:s.langue)||"fr";let a=i;return n!=="fr"&&(a=await _r(i,n,"fr")),await t.env.DB.prepare(`
      INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_chauffeur, delivered_at, sender_online)
      VALUES (?, 'admin', ?, 'fr', ?, datetime('now'), 1)
    `).bind(r,i,a).run(),t.json({success:!0})}catch(r){return console.error("Erreur envoi message admin:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/chauffeur/chat/mark-read",async t=>{try{const{chauffeur_id:r,reader:i}=await t.req.json(),s=i==="admin"?"read_by_admin":"read_by_chauffeur";return await t.env.DB.prepare(`
      UPDATE chat_messages 
      SET ${s} = 1, read_at = datetime('now')
      WHERE chauffeur_id = ? AND ${s} = 0
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur marquage lu:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/admin/cloturer-chauffeur",async t=>{try{const{chauffeur_id:r}=await t.req.json();return await t.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET status = 'completed', 
          completed = 1,
          completion_time = datetime('now')
      WHERE id = ?
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur clôture chauffeur:",r),t.json({success:!1,error:r.message},500)}});E.get("/api/notifications/non-lues",async t=>{try{const{results:r}=await t.env.DB.prepare(`
      SELECT * FROM notifications 
      WHERE read = 0 
      ORDER BY timestamp DESC
      LIMIT 10
    `).all();return t.json({success:!0,notifications:r})}catch(r){return console.error("Erreur notifications:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/notification/mark-read",async t=>{try{const{notification_id:r}=await t.req.json();return await t.env.DB.prepare(`
      UPDATE notifications SET read = 1 WHERE id = ?
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur marquage notification:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/admin/cloturer-chauffeur",async t=>{try{const{chauffeur_id:r}=await t.req.json();return await t.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET status = 'completed', 
          departure_time = datetime('now')
      WHERE id = ?
    `).bind(r).run(),console.log(`✅ Chauffeur ${r} clôturé`),t.json({success:!0})}catch(r){return console.error("Erreur clôture chauffeur:",r),t.json({success:!1,error:r.message},500)}});E.post("/api/chauffeur/notification",async t=>{try{const{chauffeur_id:r,type:i,titre:s,message:n}=await t.req.json();return await t.env.DB.prepare(`
      INSERT INTO notifications (chauffeur_id, type, titre, message)
      VALUES (?, ?, ?, ?)
    `).bind(r,i,s,n).run(),t.json({success:!0})}catch(r){return console.error("Erreur création notification:",r),t.json({success:!1,error:r.message},500)}});const Zt=new Pr,_s=Object.assign({"/src/index.tsx":E});let Dr=!1;for(const[,t]of Object.entries(_s))t&&(Zt.all("*",r=>{let i;try{i=r.executionCtx}catch{}return t.fetch(r.req.raw,r.env,i)}),Zt.notFound(r=>{let i;try{i=r.executionCtx}catch{}return t.fetch(r.req.raw,r.env,i)}),Dr=!0);if(!Dr)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Zt as default};
