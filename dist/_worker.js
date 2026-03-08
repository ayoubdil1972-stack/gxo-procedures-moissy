var Ur=Object.defineProperty;var Ft=t=>{throw TypeError(t)};var Vr=(t,r,s)=>r in t?Ur(t,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[r]=s;var v=(t,r,s)=>Vr(t,typeof r!="symbol"?r+"":r,s),lt=(t,r,s)=>r.has(t)||Ft("Cannot "+s);var u=(t,r,s)=>(lt(t,r,"read from private field"),s?s.call(t):r.get(t)),E=(t,r,s)=>r.has(t)?Ft("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(t):r.set(t,s),w=(t,r,s,i)=>(lt(t,r,"write to private field"),i?i.call(t,s):r.set(t,s),s),T=(t,r,s)=>(lt(t,r,"access private method"),s);var Dt=(t,r,s,i)=>({set _(a){w(t,r,a,s)},get _(){return u(t,r,i)}});var ir={Stringify:1},O=(t,r)=>{const s=new String(t);return s.isEscaped=!0,s.callbacks=r,s},Hr=/[&<>'"]/,ar=async(t,r)=>{let s="";r||(r=[]);const i=await Promise.all(t);for(let a=i.length-1;s+=i[a],a--,!(a<0);a--){let n=i[a];typeof n=="object"&&r.push(...n.callbacks||[]);const l=n.isEscaped;if(n=await(typeof n=="object"?n.toString():n),typeof n=="object"&&r.push(...n.callbacks||[]),n.isEscaped??l)s+=n;else{const o=[s];te(n,o),s=o[0]}}return O(s,r)},te=(t,r)=>{const s=t.search(Hr);if(s===-1){r[0]+=t;return}let i,a,n=0;for(a=s;a<t.length;a++){switch(t.charCodeAt(a)){case 34:i="&quot;";break;case 39:i="&#39;";break;case 38:i="&amp;";break;case 60:i="&lt;";break;case 62:i="&gt;";break;default:continue}r[0]+=t.substring(n,a)+i,n=a+1}r[0]+=t.substring(n,a)},nr=t=>{const r=t.callbacks;if(!(r!=null&&r.length))return t;const s=[t],i={};return r.forEach(a=>a({phase:ir.Stringify,buffer:s,context:i})),s[0]},or=async(t,r,s,i,a)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(a?a[0]+=t:a=[t],Promise.all(n.map(o=>o({phase:r,buffer:a,context:i}))).then(o=>Promise.all(o.filter(Boolean).map(c=>or(c,r,!1,i,a))).then(()=>a[0]))):Promise.resolve(t)},Gr=(t,...r)=>{const s=[""];for(let i=0,a=t.length-1;i<a;i++){s[0]+=t[i];const n=Array.isArray(r[i])?r[i].flat(1/0):[r[i]];for(let l=0,o=n.length;l<o;l++){const c=n[l];if(typeof c=="string")te(c,s);else if(typeof c=="number")s[0]+=c;else{if(typeof c=="boolean"||c===null||c===void 0)continue;if(typeof c=="object"&&c.isEscaped)if(c.callbacks)s.unshift("",c);else{const d=c.toString();d instanceof Promise?s.unshift("",d):s[0]+=d}else c instanceof Promise?s.unshift("",c):te(c.toString(),s)}}}return s[0]+=t.at(-1),s.length===1?"callbacks"in s?O(nr(O(s[0],s.callbacks))):O(s[0]):ar(s,s.callbacks)},Ct=Symbol("RENDERER"),xt=Symbol("ERROR_HANDLER"),_=Symbol("STASH"),lr=Symbol("INTERNAL"),Qr=Symbol("MEMO"),rt=Symbol("PERMALINK"),Nt=t=>(t[lr]=!0,t),cr=t=>({value:r,children:s})=>{if(!s)return;const i={children:[{tag:Nt(()=>{t.push(r)}),props:{}}]};Array.isArray(s)?i.children.push(...s.flat()):i.children.push(s),i.children.push({tag:Nt(()=>{t.pop()}),props:{}});const a={tag:"",props:i,type:""};return a[xt]=n=>{throw t.pop(),n},a},dr=t=>{const r=[t],s=cr(r);return s.values=r,s.Provider=s,ke.push(s),s},ke=[],Tt=t=>{const r=[t],s=i=>{r.push(i.value);let a;try{a=i.children?(Array.isArray(i.children)?new fr("",{},i.children):i.children).toString():""}finally{r.pop()}return a instanceof Promise?a.then(n=>O(n,n.callbacks)):O(a)};return s.values=r,s.Provider=s,s[Ct]=cr(r),ke.push(s),s},Ce=t=>t.values.at(-1),Xe={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},vt={},We="data-precedence",ze=t=>Array.isArray(t)?t:[t],Pt=new WeakMap,jt=(t,r,s,i)=>({buffer:a,context:n})=>{if(!a)return;const l=Pt.get(n)||{};Pt.set(n,l);const o=l[t]||(l[t]=[]);let c=!1;const d=Xe[t];if(d.length>0){e:for(const[,m]of o)for(const h of d)if(((m==null?void 0:m[h])??null)===(s==null?void 0:s[h])){c=!0;break e}}if(c?a[0]=a[0].replaceAll(r,""):d.length>0?o.push([r,s,i]):o.unshift([r,s,i]),a[0].indexOf("</head>")!==-1){let m;if(i===void 0)m=o.map(([h])=>h);else{const h=[];m=o.map(([f,,g])=>{let x=h.indexOf(g);return x===-1&&(h.push(g),x=h.length-1),[f,x]}).sort((f,g)=>f[1]-g[1]).map(([f])=>f)}m.forEach(h=>{a[0]=a[0].replaceAll(h,"")}),a[0]=a[0].replace(/(?=<\/head>)/,m.join(""))}},Be=(t,r,s)=>O(new z(t,s,ze(r??[])).toString()),$e=(t,r,s,i)=>{if("itemProp"in s)return Be(t,r,s);let{precedence:a,blocking:n,...l}=s;a=i?a??"":void 0,i&&(l[We]=a);const o=new z(t,l,ze(r||[])).toString();return o instanceof Promise?o.then(c=>O(o,[...c.callbacks||[],jt(t,c,l,a)])):O(o,[jt(t,o,l,a)])},Xr=({children:t,...r})=>{const s=qt();if(s){const i=Ce(s);if(i==="svg"||i==="head")return new z("title",r,ze(t??[]))}return $e("title",t,r,!1)},Wr=({children:t,...r})=>{const s=qt();return["src","async"].some(i=>!r[i])||s&&Ce(s)==="head"?Be("script",t,r):$e("script",t,r,!1)},Yr=({children:t,...r})=>["href","precedence"].every(s=>s in r)?(r["data-href"]=r.href,delete r.href,$e("style",t,r,!0)):Be("style",t,r),Zr=({children:t,...r})=>["onLoad","onError"].some(s=>s in r)||r.rel==="stylesheet"&&(!("precedence"in r)||"disabled"in r)?Be("link",t,r):$e("link",t,r,"precedence"in r),Jr=({children:t,...r})=>{const s=qt();return s&&Ce(s)==="head"?Be("meta",t,r):$e("meta",t,r,!1)},ur=(t,{children:r,...s})=>new z(t,s,ze(r??[])),Kr=t=>(typeof t.action=="function"&&(t.action=rt in t.action?t.action[rt]:void 0),ur("form",t)),mr=(t,r)=>(typeof r.formAction=="function"&&(r.formAction=rt in r.formAction?r.formAction[rt]:void 0),ur(t,r)),es=t=>mr("input",t),ts=t=>mr("button",t);const ct=Object.freeze(Object.defineProperty({__proto__:null,button:ts,form:Kr,input:es,link:Zr,meta:Jr,script:Wr,style:Yr,title:Xr},Symbol.toStringTag,{value:"Module"}));var rs=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),st=t=>rs.get(t)||t,hr=(t,r)=>{for(const[s,i]of Object.entries(t)){const a=s[0]==="-"||!/[A-Z]/.test(s)?s:s.replace(/[A-Z]/g,n=>`-${n.toLowerCase()}`);r(a,i==null?null:typeof i=="number"?a.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${i}`:`${i}px`:i)}},Fe=void 0,qt=()=>Fe,ss=t=>/[A-Z]/.test(t)&&t.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?t.replace(/([A-Z])/g,"-$1").toLowerCase():t,is=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],as=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],St=(t,r)=>{for(let s=0,i=t.length;s<i;s++){const a=t[s];if(typeof a=="string")te(a,r);else{if(typeof a=="boolean"||a===null||a===void 0)continue;a instanceof z?a.toStringToBuffer(r):typeof a=="number"||a.isEscaped?r[0]+=a:a instanceof Promise?r.unshift("",a):St(a,r)}}},z=class{constructor(t,r,s){v(this,"tag");v(this,"props");v(this,"key");v(this,"children");v(this,"isEscaped",!0);v(this,"localContexts");this.tag=t,this.props=r,this.children=s}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var r,s;const t=[""];(r=this.localContexts)==null||r.forEach(([i,a])=>{i.values.push(a)});try{this.toStringToBuffer(t)}finally{(s=this.localContexts)==null||s.forEach(([i])=>{i.values.pop()})}return t.length===1?"callbacks"in t?nr(O(t[0],t.callbacks)).toString():t[0]:ar(t,t.callbacks)}toStringToBuffer(t){const r=this.tag,s=this.props;let{children:i}=this;t[0]+=`<${r}`;const a=Fe&&Ce(Fe)==="svg"?n=>ss(st(n)):n=>st(n);for(let[n,l]of Object.entries(s))if(n=a(n),n!=="children"){if(n==="style"&&typeof l=="object"){let o="";hr(l,(c,d)=>{d!=null&&(o+=`${o?";":""}${c}:${d}`)}),t[0]+=' style="',te(o,t),t[0]+='"'}else if(typeof l=="string")t[0]+=` ${n}="`,te(l,t),t[0]+='"';else if(l!=null)if(typeof l=="number"||l.isEscaped)t[0]+=` ${n}="${l}"`;else if(typeof l=="boolean"&&as.includes(n))l&&(t[0]+=` ${n}=""`);else if(n==="dangerouslySetInnerHTML"){if(i.length>0)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");i=[O(l.__html)]}else if(l instanceof Promise)t[0]+=` ${n}="`,t.unshift('"',l);else if(typeof l=="function"){if(!n.startsWith("on")&&n!=="ref")throw new Error(`Invalid prop '${n}' of type 'function' supplied to '${r}'.`)}else t[0]+=` ${n}="`,te(l.toString(),t),t[0]+='"'}if(is.includes(r)&&i.length===0){t[0]+="/>";return}t[0]+=">",St(i,t),t[0]+=`</${r}>`}},dt=class extends z{toStringToBuffer(t){const{children:r}=this,s={...this.props};r.length&&(s.children=r.length===1?r[0]:r);const i=this.tag.call(null,s);if(!(typeof i=="boolean"||i==null))if(i instanceof Promise)if(ke.length===0)t.unshift("",i);else{const a=ke.map(n=>[n,n.values.at(-1)]);t.unshift("",i.then(n=>(n instanceof z&&(n.localContexts=a),n)))}else i instanceof z?i.toStringToBuffer(t):typeof i=="number"||i.isEscaped?(t[0]+=i,i.callbacks&&(t.callbacks||(t.callbacks=[]),t.callbacks.push(...i.callbacks))):te(i,t)}},fr=class extends z{toStringToBuffer(t){St(this.children,t)}},Ot=(t,r,...s)=>{r??(r={}),s.length&&(r.children=s.length===1?s[0]:s);const i=r.key;delete r.key;const a=Ye(t,r,s);return a.key=i,a},Lt=!1,Ye=(t,r,s)=>{if(!Lt){for(const i in vt)ct[i][Ct]=vt[i];Lt=!0}return typeof t=="function"?new dt(t,r,s):ct[t]?new dt(ct[t],r,s):t==="svg"||t==="head"?(Fe||(Fe=Tt("")),new z(t,r,[new dt(Fe,{value:t},s)])):new z(t,r,s)},ns=({children:t})=>new fr("",{children:t},Array.isArray(t)?t:t?[t]:[]);function e(t,r,s){let i;if(!r||!("children"in r))i=Ye(t,r,[]);else{const a=r.children;i=Array.isArray(a)?Ye(t,r,a):Ye(t,r,[a])}return i.key=s,i}var It=(t,r,s)=>(i,a)=>{let n=-1;return l(0);async function l(o){if(o<=n)throw new Error("next() called multiple times");n=o;let c,d=!1,m;if(t[o]?(m=t[o][0][0],i.req.routeIndex=o):m=o===t.length&&a||void 0,m)try{c=await m(i,()=>l(o+1))}catch(h){if(h instanceof Error&&r)i.error=h,c=await r(h,i),d=!0;else throw h}else i.finalized===!1&&s&&(c=await s(i));return c&&(i.finalized===!1||d)&&(i.res=c),i}},os=Symbol(),ls=async(t,r=Object.create(null))=>{const{all:s=!1,dot:i=!1}=r,n=(t instanceof yr?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?cs(t,{all:s,dot:i}):{}};async function cs(t,r){const s=await t.formData();return s?ds(s,r):{}}function ds(t,r){const s=Object.create(null);return t.forEach((i,a)=>{r.all||a.endsWith("[]")?us(s,a,i):s[a]=i}),r.dot&&Object.entries(s).forEach(([i,a])=>{i.includes(".")&&(ms(s,i,a),delete s[i])}),s}var us=(t,r,s)=>{t[r]!==void 0?Array.isArray(t[r])?t[r].push(s):t[r]=[t[r],s]:r.endsWith("[]")?t[r]=[s]:t[r]=s},ms=(t,r,s)=>{let i=t;const a=r.split(".");a.forEach((n,l)=>{l===a.length-1?i[n]=s:((!i[n]||typeof i[n]!="object"||Array.isArray(i[n])||i[n]instanceof File)&&(i[n]=Object.create(null)),i=i[n])})},pr=t=>{const r=t.split("/");return r[0]===""&&r.shift(),r},hs=t=>{const{groups:r,path:s}=fs(t),i=pr(s);return ps(i,r)},fs=t=>{const r=[];return t=t.replace(/\{[^}]+\}/g,(s,i)=>{const a=`@${i}`;return r.push([a,s]),a}),{groups:r,path:t}},ps=(t,r)=>{for(let s=r.length-1;s>=0;s--){const[i]=r[s];for(let a=t.length-1;a>=0;a--)if(t[a].includes(i)){t[a]=t[a].replace(i,r[s][1]);break}}return t},Ge={},gs=(t,r)=>{if(t==="*")return"*";const s=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const i=`${t}#${r}`;return Ge[i]||(s[2]?Ge[i]=r&&r[0]!==":"&&r[0]!=="*"?[i,s[1],new RegExp(`^${s[2]}(?=/${r})`)]:[t,s[1],new RegExp(`^${s[2]}$`)]:Ge[i]=[t,s[1],!0]),Ge[i]}return null},At=(t,r)=>{try{return r(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return r(s)}catch{return s}})}},bs=t=>At(t,decodeURI),gr=t=>{const r=t.url,s=r.indexOf("/",r.indexOf(":")+4);let i=s;for(;i<r.length;i++){const a=r.charCodeAt(i);if(a===37){const n=r.indexOf("?",i),l=r.slice(s,n===-1?void 0:n);return bs(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(a===63)break}return r.slice(s,i)},xs=t=>{const r=gr(t);return r.length>1&&r.at(-1)==="/"?r.slice(0,-1):r},me=(t,r,...s)=>(s.length&&(r=me(r,...s)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${r==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(r==null?void 0:r[0])==="/"?r.slice(1):r}`}`),br=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const r=t.split("/"),s=[];let i="";return r.forEach(a=>{if(a!==""&&!/\:/.test(a))i+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){s.length===0&&i===""?s.push("/"):s.push(i);const n=a.replace("?","");i+="/"+n,s.push(i)}else i+="/"+a}),s.filter((a,n,l)=>l.indexOf(a)===n)},ut=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?At(t,vr):t):t,xr=(t,r,s)=>{let i;if(!s&&r&&!/[%+]/.test(r)){let l=t.indexOf("?",8);if(l===-1)return;for(t.startsWith(r,l+1)||(l=t.indexOf(`&${r}`,l+1));l!==-1;){const o=t.charCodeAt(l+r.length+1);if(o===61){const c=l+r.length+2,d=t.indexOf("&",c);return ut(t.slice(c,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";l=t.indexOf(`&${r}`,l+1)}if(i=/[%+]/.test(t),!i)return}const a={};i??(i=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const l=t.indexOf("&",n+1);let o=t.indexOf("=",n);o>l&&l!==-1&&(o=-1);let c=t.slice(n+1,o===-1?l===-1?void 0:l:o);if(i&&(c=ut(c)),n=l,c==="")continue;let d;o===-1?d="":(d=t.slice(o+1,l===-1?void 0:l),i&&(d=ut(d))),s?(a[c]&&Array.isArray(a[c])||(a[c]=[]),a[c].push(d)):a[c]??(a[c]=d)}return r?a[r]:a},vs=xr,ys=(t,r)=>xr(t,r,!0),vr=decodeURIComponent,Mt=t=>At(t,vr),pe,j,Q,wr,kr,yt,W,Jt,yr=(Jt=class{constructor(t,r="/",s=[[]]){E(this,Q);v(this,"raw");E(this,pe);E(this,j);v(this,"routeIndex",0);v(this,"path");v(this,"bodyCache",{});E(this,W,t=>{const{bodyCache:r,raw:s}=this,i=r[t];if(i)return i;const a=Object.keys(r)[0];return a?r[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):r[t]=s[t]()});this.raw=t,this.path=r,w(this,j,s),w(this,pe,{})}param(t){return t?T(this,Q,wr).call(this,t):T(this,Q,kr).call(this)}query(t){return vs(this.url,t)}queries(t){return ys(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const r={};return this.raw.headers.forEach((s,i)=>{r[i]=s}),r}async parseBody(t){var r;return(r=this.bodyCache).parsedBody??(r.parsedBody=await ls(this,t))}json(){return u(this,W).call(this,"text").then(t=>JSON.parse(t))}text(){return u(this,W).call(this,"text")}arrayBuffer(){return u(this,W).call(this,"arrayBuffer")}blob(){return u(this,W).call(this,"blob")}formData(){return u(this,W).call(this,"formData")}addValidatedData(t,r){u(this,pe)[t]=r}valid(t){return u(this,pe)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[os](){return u(this,j)}get matchedRoutes(){return u(this,j)[0].map(([[,t]])=>t)}get routePath(){return u(this,j)[0].map(([[,t]])=>t)[this.routeIndex].path}},pe=new WeakMap,j=new WeakMap,Q=new WeakSet,wr=function(t){const r=u(this,j)[0][this.routeIndex][1][t],s=T(this,Q,yt).call(this,r);return s&&/\%/.test(s)?Mt(s):s},kr=function(){const t={},r=Object.keys(u(this,j)[0][this.routeIndex][1]);for(const s of r){const i=T(this,Q,yt).call(this,u(this,j)[0][this.routeIndex][1][s]);i!==void 0&&(t[s]=/\%/.test(i)?Mt(i):i)}return t},yt=function(t){return u(this,j)[1]?u(this,j)[1][t]:t},W=new WeakMap,Jt),ws="text/plain; charset=UTF-8",mt=(t,r)=>({"Content-Type":t,...r}),Pe,je,U,ge,V,P,Oe,be,xe,ie,Le,Ie,Y,he,Kt,ks=(Kt=class{constructor(t,r){E(this,Y);E(this,Pe);E(this,je);v(this,"env",{});E(this,U);v(this,"finalized",!1);v(this,"error");E(this,ge);E(this,V);E(this,P);E(this,Oe);E(this,be);E(this,xe);E(this,ie);E(this,Le);E(this,Ie);v(this,"render",(...t)=>(u(this,be)??w(this,be,r=>this.html(r)),u(this,be).call(this,...t)));v(this,"setLayout",t=>w(this,Oe,t));v(this,"getLayout",()=>u(this,Oe));v(this,"setRenderer",t=>{w(this,be,t)});v(this,"header",(t,r,s)=>{this.finalized&&w(this,P,new Response(u(this,P).body,u(this,P)));const i=u(this,P)?u(this,P).headers:u(this,ie)??w(this,ie,new Headers);r===void 0?i.delete(t):s!=null&&s.append?i.append(t,r):i.set(t,r)});v(this,"status",t=>{w(this,ge,t)});v(this,"set",(t,r)=>{u(this,U)??w(this,U,new Map),u(this,U).set(t,r)});v(this,"get",t=>u(this,U)?u(this,U).get(t):void 0);v(this,"newResponse",(...t)=>T(this,Y,he).call(this,...t));v(this,"body",(t,r,s)=>T(this,Y,he).call(this,t,r,s));v(this,"text",(t,r,s)=>!u(this,ie)&&!u(this,ge)&&!r&&!s&&!this.finalized?new Response(t):T(this,Y,he).call(this,t,r,mt(ws,s)));v(this,"json",(t,r,s)=>T(this,Y,he).call(this,JSON.stringify(t),r,mt("application/json",s)));v(this,"html",(t,r,s)=>{const i=a=>T(this,Y,he).call(this,a,r,mt("text/html; charset=UTF-8",s));return typeof t=="object"?or(t,ir.Stringify,!1,{}).then(i):i(t)});v(this,"redirect",(t,r)=>{const s=String(t);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,r??302)});v(this,"notFound",()=>(u(this,xe)??w(this,xe,()=>new Response),u(this,xe).call(this,this)));w(this,Pe,t),r&&(w(this,V,r.executionCtx),this.env=r.env,w(this,xe,r.notFoundHandler),w(this,Ie,r.path),w(this,Le,r.matchResult))}get req(){return u(this,je)??w(this,je,new yr(u(this,Pe),u(this,Ie),u(this,Le))),u(this,je)}get event(){if(u(this,V)&&"respondWith"in u(this,V))return u(this,V);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,V))return u(this,V);throw Error("This context has no ExecutionContext")}get res(){return u(this,P)||w(this,P,new Response(null,{headers:u(this,ie)??w(this,ie,new Headers)}))}set res(t){if(u(this,P)&&t){t=new Response(t.body,t);for(const[r,s]of u(this,P).headers.entries())if(r!=="content-type")if(r==="set-cookie"){const i=u(this,P).headers.getSetCookie();t.headers.delete("set-cookie");for(const a of i)t.headers.append("set-cookie",a)}else t.headers.set(r,s)}w(this,P,t),this.finalized=!0}get var(){return u(this,U)?Object.fromEntries(u(this,U)):{}}},Pe=new WeakMap,je=new WeakMap,U=new WeakMap,ge=new WeakMap,V=new WeakMap,P=new WeakMap,Oe=new WeakMap,be=new WeakMap,xe=new WeakMap,ie=new WeakMap,Le=new WeakMap,Ie=new WeakMap,Y=new WeakSet,he=function(t,r,s){const i=u(this,P)?new Headers(u(this,P).headers):u(this,ie)??new Headers;if(typeof r=="object"&&"headers"in r){const n=r.headers instanceof Headers?r.headers:new Headers(r.headers);for(const[l,o]of n)l.toLowerCase()==="set-cookie"?i.append(l,o):i.set(l,o)}if(s)for(const[n,l]of Object.entries(s))if(typeof l=="string")i.set(n,l);else{i.delete(n);for(const o of l)i.append(n,o)}const a=typeof r=="number"?r:(r==null?void 0:r.status)??u(this,ge);return new Response(t,{status:a,headers:i})},Kt),R="ALL",Es="all",Cs=["get","post","put","delete","options","patch"],Er="Can not add a route since the matcher is already built.",Cr=class extends Error{},Ts="__COMPOSED_HANDLER",qs=t=>t.text("404 Not Found",404),zt=(t,r)=>{if("getResponse"in t){const s=t.getResponse();return r.newResponse(s.body,s)}return console.error(t),r.text("Internal Server Error",500)},L,F,Tr,I,re,Ze,Je,ve,Ss=(ve=class{constructor(r={}){E(this,F);v(this,"get");v(this,"post");v(this,"put");v(this,"delete");v(this,"options");v(this,"patch");v(this,"all");v(this,"on");v(this,"use");v(this,"router");v(this,"getPath");v(this,"_basePath","/");E(this,L,"/");v(this,"routes",[]);E(this,I,qs);v(this,"errorHandler",zt);v(this,"onError",r=>(this.errorHandler=r,this));v(this,"notFound",r=>(w(this,I,r),this));v(this,"fetch",(r,...s)=>T(this,F,Je).call(this,r,s[1],s[0],r.method));v(this,"request",(r,s,i,a)=>r instanceof Request?this.fetch(s?new Request(r,s):r,i,a):(r=r.toString(),this.fetch(new Request(/^https?:\/\//.test(r)?r:`http://localhost${me("/",r)}`,s),i,a)));v(this,"fire",()=>{addEventListener("fetch",r=>{r.respondWith(T(this,F,Je).call(this,r.request,r,void 0,r.request.method))})});[...Cs,Es].forEach(n=>{this[n]=(l,...o)=>(typeof l=="string"?w(this,L,l):T(this,F,re).call(this,n,u(this,L),l),o.forEach(c=>{T(this,F,re).call(this,n,u(this,L),c)}),this)}),this.on=(n,l,...o)=>{for(const c of[l].flat()){w(this,L,c);for(const d of[n].flat())o.map(m=>{T(this,F,re).call(this,d.toUpperCase(),u(this,L),m)})}return this},this.use=(n,...l)=>(typeof n=="string"?w(this,L,n):(w(this,L,"*"),l.unshift(n)),l.forEach(o=>{T(this,F,re).call(this,R,u(this,L),o)}),this);const{strict:i,...a}=r;Object.assign(this,a),this.getPath=i??!0?r.getPath??gr:xs}route(r,s){const i=this.basePath(r);return s.routes.map(a=>{var l;let n;s.errorHandler===zt?n=a.handler:(n=async(o,c)=>(await It([],s.errorHandler)(o,()=>a.handler(o,c))).res,n[Ts]=a.handler),T(l=i,F,re).call(l,a.method,a.path,n)}),this}basePath(r){const s=T(this,F,Tr).call(this);return s._basePath=me(this._basePath,r),s}mount(r,s,i){let a,n;i&&(typeof i=="function"?n=i:(n=i.optionHandler,i.replaceRequest===!1?a=c=>c:a=i.replaceRequest));const l=n?c=>{const d=n(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};a||(a=(()=>{const c=me(this._basePath,r),d=c==="/"?0:c.length;return m=>{const h=new URL(m.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,m)}})());const o=async(c,d)=>{const m=await s(a(c.req.raw),...l(c));if(m)return m;await d()};return T(this,F,re).call(this,R,me(r,"*"),o),this}},L=new WeakMap,F=new WeakSet,Tr=function(){const r=new ve({router:this.router,getPath:this.getPath});return r.errorHandler=this.errorHandler,w(r,I,u(this,I)),r.routes=this.routes,r},I=new WeakMap,re=function(r,s,i){r=r.toUpperCase(),s=me(this._basePath,s);const a={basePath:this._basePath,path:s,method:r,handler:i};this.router.add(r,s,[i,a]),this.routes.push(a)},Ze=function(r,s){if(r instanceof Error)return this.errorHandler(r,s);throw r},Je=function(r,s,i,a){if(a==="HEAD")return(async()=>new Response(null,await T(this,F,Je).call(this,r,s,i,"GET")))();const n=this.getPath(r,{env:i}),l=this.router.match(a,n),o=new ks(r,{path:n,matchResult:l,env:i,executionCtx:s,notFoundHandler:u(this,I)});if(l[0].length===1){let d;try{d=l[0][0][0][0](o,async()=>{o.res=await u(this,I).call(this,o)})}catch(m){return T(this,F,Ze).call(this,m,o)}return d instanceof Promise?d.then(m=>m||(o.finalized?o.res:u(this,I).call(this,o))).catch(m=>T(this,F,Ze).call(this,m,o)):d??u(this,I).call(this,o)}const c=It(l[0],this.errorHandler,u(this,I));return(async()=>{try{const d=await c(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return T(this,F,Ze).call(this,d,o)}})()},ve),qr=[];function As(t,r){const s=this.buildAllMatchers(),i=(a,n)=>{const l=s[a]||s[R],o=l[2][n];if(o)return o;const c=n.match(l[0]);if(!c)return[[],qr];const d=c.indexOf("",1);return[l[1][d],c]};return this.match=i,i(t,r)}var it="[^/]+",_e=".*",Re="(?:|/.*)",fe=Symbol(),_s=new Set(".\\+*[^]$()");function Rs(t,r){return t.length===1?r.length===1?t<r?-1:1:-1:r.length===1||t===_e||t===Re?1:r===_e||r===Re?-1:t===it?1:r===it?-1:t.length===r.length?t<r?-1:1:r.length-t.length}var ae,ne,M,ce,Fs=(ce=class{constructor(){E(this,ae);E(this,ne);E(this,M,Object.create(null))}insert(r,s,i,a,n){if(r.length===0){if(u(this,ae)!==void 0)throw fe;if(n)return;w(this,ae,s);return}const[l,...o]=r,c=l==="*"?o.length===0?["","",_e]:["","",it]:l==="/*"?["","",Re]:l.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const m=c[1];let h=c[2]||it;if(m&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw fe;if(d=u(this,M)[h],!d){if(Object.keys(u(this,M)).some(f=>f!==_e&&f!==Re))throw fe;if(n)return;d=u(this,M)[h]=new ce,m!==""&&w(d,ne,a.varIndex++)}!n&&m!==""&&i.push([m,u(d,ne)])}else if(d=u(this,M)[l],!d){if(Object.keys(u(this,M)).some(m=>m.length>1&&m!==_e&&m!==Re))throw fe;if(n)return;d=u(this,M)[l]=new ce}d.insert(o,s,i,a,n)}buildRegExpStr(){const s=Object.keys(u(this,M)).sort(Rs).map(i=>{const a=u(this,M)[i];return(typeof u(a,ne)=="number"?`(${i})@${u(a,ne)}`:_s.has(i)?`\\${i}`:i)+a.buildRegExpStr()});return typeof u(this,ae)=="number"&&s.unshift(`#${u(this,ae)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},ae=new WeakMap,ne=new WeakMap,M=new WeakMap,ce),at,Me,er,Ds=(er=class{constructor(){E(this,at,{varIndex:0});E(this,Me,new Fs)}insert(t,r,s){const i=[],a=[];for(let l=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const d=`@\\${l}`;return a[l]=[d,c],l++,o=!0,d}),!o)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let l=a.length-1;l>=0;l--){const[o]=a[l];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(o)!==-1){n[c]=n[c].replace(o,a[l][1]);break}}return u(this,Me).insert(n,r,i,u(this,at),s),i}buildRegExp(){let t=u(this,Me).buildRegExpStr();if(t==="")return[/^$/,[],[]];let r=0;const s=[],i=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,l)=>n!==void 0?(s[++r]=Number(n),"$()"):(l!==void 0&&(i[Number(l)]=++r),"")),[new RegExp(`^${t}`),s,i]}},at=new WeakMap,Me=new WeakMap,er),Ns=[/^$/,[],Object.create(null)],Ke=Object.create(null);function Sr(t){return Ke[t]??(Ke[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(r,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Ps(){Ke=Object.create(null)}function js(t){var d;const r=new Ds,s=[];if(t.length===0)return Ns;const i=t.map(m=>[!/\*|\/:/.test(m[0]),...m]).sort(([m,h],[f,g])=>m?1:f?-1:h.length-g.length),a=Object.create(null);for(let m=0,h=-1,f=i.length;m<f;m++){const[g,x,y]=i[m];g?a[x]=[y.map(([k])=>[k,Object.create(null)]),qr]:h++;let b;try{b=r.insert(x,h,g)}catch(k){throw k===fe?new Cr(x):k}g||(s[h]=y.map(([k,C])=>{const S=Object.create(null);for(C-=1;C>=0;C--){const[q,A]=b[C];S[q]=A}return[k,S]}))}const[n,l,o]=r.buildRegExp();for(let m=0,h=s.length;m<h;m++)for(let f=0,g=s[m].length;f<g;f++){const x=(d=s[m][f])==null?void 0:d[1];if(!x)continue;const y=Object.keys(x);for(let b=0,k=y.length;b<k;b++)x[y[b]]=o[x[y[b]]]}const c=[];for(const m in l)c[m]=s[l[m]];return[n,c,a]}function de(t,r){if(t){for(const s of Object.keys(t).sort((i,a)=>a.length-i.length))if(Sr(s).test(r))return[...t[s]]}}var Z,J,nt,Ar,tr,Os=(tr=class{constructor(){E(this,nt);v(this,"name","RegExpRouter");E(this,Z);E(this,J);v(this,"match",As);w(this,Z,{[R]:Object.create(null)}),w(this,J,{[R]:Object.create(null)})}add(t,r,s){var o;const i=u(this,Z),a=u(this,J);if(!i||!a)throw new Error(Er);i[t]||[i,a].forEach(c=>{c[t]=Object.create(null),Object.keys(c[R]).forEach(d=>{c[t][d]=[...c[R][d]]})}),r==="/*"&&(r="*");const n=(r.match(/\/:/g)||[]).length;if(/\*$/.test(r)){const c=Sr(r);t===R?Object.keys(i).forEach(d=>{var m;(m=i[d])[r]||(m[r]=de(i[d],r)||de(i[R],r)||[])}):(o=i[t])[r]||(o[r]=de(i[t],r)||de(i[R],r)||[]),Object.keys(i).forEach(d=>{(t===R||t===d)&&Object.keys(i[d]).forEach(m=>{c.test(m)&&i[d][m].push([s,n])})}),Object.keys(a).forEach(d=>{(t===R||t===d)&&Object.keys(a[d]).forEach(m=>c.test(m)&&a[d][m].push([s,n]))});return}const l=br(r)||[r];for(let c=0,d=l.length;c<d;c++){const m=l[c];Object.keys(a).forEach(h=>{var f;(t===R||t===h)&&((f=a[h])[m]||(f[m]=[...de(i[h],m)||de(i[R],m)||[]]),a[h][m].push([s,n-d+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(u(this,J)).concat(Object.keys(u(this,Z))).forEach(r=>{t[r]||(t[r]=T(this,nt,Ar).call(this,r))}),w(this,Z,w(this,J,void 0)),Ps(),t}},Z=new WeakMap,J=new WeakMap,nt=new WeakSet,Ar=function(t){const r=[];let s=t===R;return[u(this,Z),u(this,J)].forEach(i=>{const a=i[t]?Object.keys(i[t]).map(n=>[n,i[t][n]]):[];a.length!==0?(s||(s=!0),r.push(...a)):t!==R&&r.push(...Object.keys(i[R]).map(n=>[n,i[R][n]]))}),s?js(r):null},tr),K,H,rr,Ls=(rr=class{constructor(t){v(this,"name","SmartRouter");E(this,K,[]);E(this,H,[]);w(this,K,t.routers)}add(t,r,s){if(!u(this,H))throw new Error(Er);u(this,H).push([t,r,s])}match(t,r){if(!u(this,H))throw new Error("Fatal error");const s=u(this,K),i=u(this,H),a=s.length;let n=0,l;for(;n<a;n++){const o=s[n];try{for(let c=0,d=i.length;c<d;c++)o.add(...i[c]);l=o.match(t,r)}catch(c){if(c instanceof Cr)continue;throw c}this.match=o.match.bind(o),w(this,K,[o]),w(this,H,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,l}get activeRouter(){if(u(this,H)||u(this,K).length!==1)throw new Error("No active router has been determined yet.");return u(this,K)[0]}},K=new WeakMap,H=new WeakMap,rr),Se=Object.create(null),ee,N,oe,ye,D,G,se,we,Is=(we=class{constructor(r,s,i){E(this,G);E(this,ee);E(this,N);E(this,oe);E(this,ye,0);E(this,D,Se);if(w(this,N,i||Object.create(null)),w(this,ee,[]),r&&s){const a=Object.create(null);a[r]={handler:s,possibleKeys:[],score:0},w(this,ee,[a])}w(this,oe,[])}insert(r,s,i){w(this,ye,++Dt(this,ye)._);let a=this;const n=hs(s),l=[];for(let o=0,c=n.length;o<c;o++){const d=n[o],m=n[o+1],h=gs(d,m),f=Array.isArray(h)?h[0]:d;if(f in u(a,N)){a=u(a,N)[f],h&&l.push(h[1]);continue}u(a,N)[f]=new we,h&&(u(a,oe).push(h),l.push(h[1])),a=u(a,N)[f]}return u(a,ee).push({[r]:{handler:i,possibleKeys:l.filter((o,c,d)=>d.indexOf(o)===c),score:u(this,ye)}}),a}search(r,s){var c;const i=[];w(this,D,Se);let n=[this];const l=pr(s),o=[];for(let d=0,m=l.length;d<m;d++){const h=l[d],f=d===m-1,g=[];for(let x=0,y=n.length;x<y;x++){const b=n[x],k=u(b,N)[h];k&&(w(k,D,u(b,D)),f?(u(k,N)["*"]&&i.push(...T(this,G,se).call(this,u(k,N)["*"],r,u(b,D))),i.push(...T(this,G,se).call(this,k,r,u(b,D)))):g.push(k));for(let C=0,S=u(b,oe).length;C<S;C++){const q=u(b,oe)[C],A=u(b,D)===Se?{}:{...u(b,D)};if(q==="*"){const X=u(b,N)["*"];X&&(i.push(...T(this,G,se).call(this,X,r,u(b,D))),w(X,D,A),g.push(X));continue}const[Te,He,qe]=q;if(!h&&!(qe instanceof RegExp))continue;const B=u(b,N)[Te],$r=l.slice(d).join("/");if(qe instanceof RegExp){const X=qe.exec($r);if(X){if(A[He]=X[0],i.push(...T(this,G,se).call(this,B,r,u(b,D),A)),Object.keys(u(B,N)).length){w(B,D,A);const ot=((c=X[0].match(/\//))==null?void 0:c.length)??0;(o[ot]||(o[ot]=[])).push(B)}continue}}(qe===!0||qe.test(h))&&(A[He]=h,f?(i.push(...T(this,G,se).call(this,B,r,A,u(b,D))),u(B,N)["*"]&&i.push(...T(this,G,se).call(this,u(B,N)["*"],r,A,u(b,D)))):(w(B,D,A),g.push(B)))}}n=g.concat(o.shift()??[])}return i.length>1&&i.sort((d,m)=>d.score-m.score),[i.map(({handler:d,params:m})=>[d,m])]}},ee=new WeakMap,N=new WeakMap,oe=new WeakMap,ye=new WeakMap,D=new WeakMap,G=new WeakSet,se=function(r,s,i,a){const n=[];for(let l=0,o=u(r,ee).length;l<o;l++){const c=u(r,ee)[l],d=c[s]||c[R],m={};if(d!==void 0&&(d.params=Object.create(null),n.push(d),i!==Se||a&&a!==Se))for(let h=0,f=d.possibleKeys.length;h<f;h++){const g=d.possibleKeys[h],x=m[d.score];d.params[g]=a!=null&&a[g]&&!x?a[g]:i[g]??(a==null?void 0:a[g]),m[d.score]=!0}}return n},we),le,sr,Ms=(sr=class{constructor(){v(this,"name","TrieRouter");E(this,le);w(this,le,new Is)}add(t,r,s){const i=br(r);if(i){for(let a=0,n=i.length;a<n;a++)u(this,le).insert(t,i[a],s);return}u(this,le).insert(t,r,s)}match(t,r){return u(this,le).search(t,r)}},le=new WeakMap,sr),_r=class extends Ss{constructor(t={}){super(t),this.router=t.router??new Ls({routers:[new Os,new Ms]})}},zs=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Bt=(t,r=$s)=>{const s=/\.([a-zA-Z0-9]+?)$/,i=t.match(s);if(!i)return;let a=r[i[1]];return a&&a.startsWith("text")&&(a+="; charset=utf-8"),a},Bs={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},$s=Bs,Us=(...t)=>{let r=t.filter(a=>a!=="").join("/");r=r.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=r.split("/"),i=[];for(const a of s)a===".."&&i.length>0&&i.at(-1)!==".."?i.pop():a!=="."&&i.push(a);return i.join("/")||"."},Rr={br:".br",zstd:".zst",gzip:".gz"},Vs=Object.keys(Rr),Hs="index.html",Gs=t=>{const r=t.root??"./",s=t.path,i=t.join??Us;return async(a,n)=>{var m,h,f,g;if(a.finalized)return n();let l;if(t.path)l=t.path;else try{if(l=decodeURIComponent(a.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(l))throw new Error}catch{return await((m=t.onNotFound)==null?void 0:m.call(t,a.req.path,a)),n()}let o=i(r,!s&&t.rewriteRequestPath?t.rewriteRequestPath(l):l);t.isDir&&await t.isDir(o)&&(o=i(o,Hs));const c=t.getContent;let d=await c(o,a);if(d instanceof Response)return a.newResponse(d.body,d);if(d){const x=t.mimes&&Bt(o,t.mimes)||Bt(o);if(a.header("Content-Type",x||"application/octet-stream"),t.precompressed&&(!x||zs.test(x))){const y=new Set((h=a.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(b=>b.trim()));for(const b of Vs){if(!y.has(b))continue;const k=await c(o+Rr[b],a);if(k){d=k,a.header("Content-Encoding",b),a.header("Vary","Accept-Encoding",{append:!0});break}}}return await((f=t.onFound)==null?void 0:f.call(t,o,a)),a.body(d)}await((g=t.onNotFound)==null?void 0:g.call(t,o,a)),await n()}},Qs=async(t,r)=>{let s;r&&r.manifest?typeof r.manifest=="string"?s=JSON.parse(r.manifest):s=r.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let i;r&&r.namespace?i=r.namespace:i=__STATIC_CONTENT;const a=s[t];if(!a)return null;const n=await i.get(a,{type:"stream"});return n||null},Xs=t=>async function(s,i){return Gs({...t,getContent:async n=>Qs(n,{manifest:t.manifest,namespace:t.namespace?t.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,i)},Ws=t=>Xs(t),De="_hp",Ys={Change:"Input",DoubleClick:"DblClick"},Zs={svg:"2000/svg",math:"1998/Math/MathML"},Ne=[],wt=new WeakMap,Ee=void 0,Js=()=>Ee,$=t=>"t"in t,ht={onClick:["click",!1]},$t=t=>{if(!t.startsWith("on"))return;if(ht[t])return ht[t];const r=t.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(r){const[,s,i]=r;return ht[t]=[(Ys[s]||s).toLowerCase(),!!i]}},Ut=(t,r)=>Ee&&t instanceof SVGElement&&/[A-Z]/.test(r)&&(r in t.style||r.match(/^(?:o|pai|str|u|ve)/))?r.replace(/([A-Z])/g,"-$1").toLowerCase():r,Ks=(t,r,s)=>{var i;r||(r={});for(let a in r){const n=r[a];if(a!=="children"&&(!s||s[a]!==n)){a=st(a);const l=$t(a);if(l){if((s==null?void 0:s[a])!==n&&(s&&t.removeEventListener(l[0],s[a],l[1]),n!=null)){if(typeof n!="function")throw new Error(`Event handler for "${a}" is not a function`);t.addEventListener(l[0],n,l[1])}}else if(a==="dangerouslySetInnerHTML"&&n)t.innerHTML=n.__html;else if(a==="ref"){let o;typeof n=="function"?o=n(t)||(()=>n(null)):n&&"current"in n&&(n.current=t,o=()=>n.current=null),wt.set(t,o)}else if(a==="style"){const o=t.style;typeof n=="string"?o.cssText=n:(o.cssText="",n!=null&&hr(n,o.setProperty.bind(o)))}else{if(a==="value"){const c=t.nodeName;if(c==="INPUT"||c==="TEXTAREA"||c==="SELECT"){if(t.value=n==null||n===!1?null:n,c==="TEXTAREA"){t.textContent=n;continue}else if(c==="SELECT"){t.selectedIndex===-1&&(t.selectedIndex=0);continue}}}else(a==="checked"&&t.nodeName==="INPUT"||a==="selected"&&t.nodeName==="OPTION")&&(t[a]=n);const o=Ut(t,a);n==null||n===!1?t.removeAttribute(o):n===!0?t.setAttribute(o,""):typeof n=="string"||typeof n=="number"?t.setAttribute(o,n):t.setAttribute(o,n.toString())}}}if(s)for(let a in s){const n=s[a];if(a!=="children"&&!(a in r)){a=st(a);const l=$t(a);l?t.removeEventListener(l[0],n,l[1]):a==="ref"?(i=wt.get(t))==null||i():t.removeAttribute(Ut(t,a))}}},ei=(t,r)=>{r[_][0]=0,Ne.push([t,r]);const s=r.tag[Ct]||r.tag,i=s.defaultProps?{...s.defaultProps,...r.props}:r.props;try{return[s.call(null,i)]}finally{Ne.pop()}},Fr=(t,r,s,i,a)=>{var n,l;(n=t.vR)!=null&&n.length&&(i.push(...t.vR),delete t.vR),typeof t.tag=="function"&&((l=t[_][1][jr])==null||l.forEach(o=>a.push(o))),t.vC.forEach(o=>{var c;if($(o))s.push(o);else if(typeof o.tag=="function"||o.tag===""){o.c=r;const d=s.length;if(Fr(o,r,s,i,a),o.s){for(let m=d;m<s.length;m++)s[m].s=!0;o.s=!1}}else s.push(o),(c=o.vR)!=null&&c.length&&(i.push(...o.vR),delete o.vR)})},ti=t=>{for(;;t=t.tag===De||!t.vC||!t.pP?t.nN:t.vC[0]){if(!t)return null;if(t.tag!==De&&t.e)return t.e}},Dr=t=>{var r,s,i,a,n,l;$(t)||((s=(r=t[_])==null?void 0:r[1][jr])==null||s.forEach(o=>{var c;return(c=o[2])==null?void 0:c.call(o)}),(i=wt.get(t.e))==null||i(),t.p===2&&((a=t.vC)==null||a.forEach(o=>o.p=2)),(n=t.vC)==null||n.forEach(Dr)),t.p||((l=t.e)==null||l.remove(),delete t.e),typeof t.tag=="function"&&(Ae.delete(t),et.delete(t),delete t[_][3],t.a=!0)},Nr=(t,r,s)=>{t.c=r,Pr(t,r,s)},Vt=(t,r)=>{if(r){for(let s=0,i=t.length;s<i;s++)if(t[s]===r)return s}},Ht=Symbol(),Pr=(t,r,s)=>{var d;const i=[],a=[],n=[];Fr(t,r,i,a,n),a.forEach(Dr);const l=s?void 0:r.childNodes;let o,c=null;if(s)o=-1;else if(!l.length)o=0;else{const m=Vt(l,ti(t.nN));m!==void 0?(c=l[m],o=m):o=Vt(l,(d=i.find(h=>h.tag!==De&&h.e))==null?void 0:d.e)??-1,o===-1&&(s=!0)}for(let m=0,h=i.length;m<h;m++,o++){const f=i[m];let g;if(f.s&&f.e)g=f.e,f.s=!1;else{const x=s||!f.e;$(f)?(f.e&&f.d&&(f.e.textContent=f.t),f.d=!1,g=f.e||(f.e=document.createTextNode(f.t))):(g=f.e||(f.e=f.n?document.createElementNS(f.n,f.tag):document.createElement(f.tag)),Ks(g,f.props,f.pP),Pr(f,g,x))}f.tag===De?o--:s?g.parentNode||r.appendChild(g):l[o]!==g&&l[o-1]!==g&&(l[o+1]===g?r.appendChild(l[o]):r.insertBefore(g,c||l[o]||null))}if(t.pP&&delete t.pP,n.length){const m=[],h=[];n.forEach(([,f,,g,x])=>{f&&m.push(f),g&&h.push(g),x==null||x()}),m.forEach(f=>f()),h.length&&requestAnimationFrame(()=>{h.forEach(f=>f())})}},ri=(t,r)=>!!(t&&t.length===r.length&&t.every((s,i)=>s[1]===r[i][1])),et=new WeakMap,kt=(t,r,s)=>{var n,l,o,c,d,m;const i=!s&&r.pC;s&&(r.pC||(r.pC=r.vC));let a;try{s||(s=typeof r.tag=="function"?ei(t,r):ze(r.props.children)),((n=s[0])==null?void 0:n.tag)===""&&s[0][xt]&&(a=s[0][xt],t[5].push([t,a,r]));const h=i?[...r.pC]:r.vC?[...r.vC]:void 0,f=[];let g;for(let x=0;x<s.length;x++){Array.isArray(s[x])&&s.splice(x,1,...s[x].flat());let y=si(s[x]);if(y){typeof y.tag=="function"&&!y.tag[lr]&&(ke.length>0&&(y[_][2]=ke.map(k=>[k,k.values.at(-1)])),(l=t[5])!=null&&l.length&&(y[_][3]=t[5].at(-1)));let b;if(h&&h.length){const k=h.findIndex($(y)?C=>$(C):y.key!==void 0?C=>C.key===y.key&&C.tag===y.tag:C=>C.tag===y.tag);k!==-1&&(b=h[k],h.splice(k,1))}if(b)if($(y))b.t!==y.t&&(b.t=y.t,b.d=!0),y=b;else{const k=b.pP=b.props;if(b.props=y.props,b.f||(b.f=y.f||r.f),typeof y.tag=="function"){const C=b[_][2];b[_][2]=y[_][2]||[],b[_][3]=y[_][3],!b.f&&((b.o||b)===y.o||(c=(o=b.tag)[Qr])!=null&&c.call(o,k,b.props))&&ri(C,b[_][2])&&(b.s=!0)}y=b}else if(!$(y)&&Ee){const k=Ce(Ee);k&&(y.n=k)}if(!$(y)&&!y.s&&(kt(t,y),delete y.f),f.push(y),g&&!g.s&&!y.s)for(let k=g;k&&!$(k);k=(d=k.vC)==null?void 0:d.at(-1))k.nN=y;g=y}}r.vR=i?[...r.vC,...h||[]]:h||[],r.vC=f,i&&delete r.pC}catch(h){if(r.f=!0,h===Ht){if(a)return;throw h}const[f,g,x]=((m=r[_])==null?void 0:m[3])||[];if(g){const y=()=>tt([0,!1,t[2]],x),b=et.get(x)||[];b.push(y),et.set(x,b);const k=g(h,()=>{const C=et.get(x);if(C){const S=C.indexOf(y);if(S!==-1)return C.splice(S,1),y()}});if(k){if(t[0]===1)t[1]=!0;else if(kt(t,x,[k]),(g.length===1||t!==f)&&x.c){Nr(x,x.c,!1);return}throw Ht}}throw h}finally{a&&t[5].pop()}},si=t=>{if(!(t==null||typeof t=="boolean")){if(typeof t=="string"||typeof t=="number")return{t:t.toString(),d:!0};if("vR"in t&&(t={tag:t.tag,props:t.props,key:t.key,f:t.f,type:t.tag,ref:t.props.ref,o:t.o||t}),typeof t.tag=="function")t[_]=[0,[]];else{const r=Zs[t.tag];r&&(Ee||(Ee=dr("")),t.props.children=[{tag:Ee,props:{value:t.n=`http://www.w3.org/${r}`,children:t.props.children}}])}return t}},Gt=(t,r)=>{var s,i;(s=r[_][2])==null||s.forEach(([a,n])=>{a.values.push(n)});try{kt(t,r,void 0)}catch{return}if(r.a){delete r.a;return}(i=r[_][2])==null||i.forEach(([a])=>{a.values.pop()}),(t[0]!==1||!t[1])&&Nr(r,r.c,!1)},Ae=new WeakMap,Qt=[],tt=async(t,r)=>{t[5]||(t[5]=[]);const s=Ae.get(r);s&&s[0](void 0);let i;const a=new Promise(n=>i=n);if(Ae.set(r,[i,()=>{t[2]?t[2](t,r,n=>{Gt(n,r)}).then(()=>i(r)):(Gt(t,r),i(r))}]),Qt.length)Qt.at(-1).add(r);else{await Promise.resolve();const n=Ae.get(r);n&&(Ae.delete(r),n[1]())}return a},ii=(t,r,s)=>({tag:De,props:{children:t},key:s,e:r,p:1}),ft=0,jr=1,pt=2,gt=3,bt=new WeakMap,Or=(t,r)=>!t||!r||t.length!==r.length||r.some((s,i)=>s!==t[i]),ai=void 0,Xt=[],ni=t=>{var l;const r=()=>typeof t=="function"?t():t,s=Ne.at(-1);if(!s)return[r(),()=>{}];const[,i]=s,a=(l=i[_][1])[ft]||(l[ft]=[]),n=i[_][0]++;return a[n]||(a[n]=[r(),o=>{const c=ai,d=a[n];if(typeof o=="function"&&(o=o(d[0])),!Object.is(o,d[0]))if(d[0]=o,Xt.length){const[m,h]=Xt.at(-1);Promise.all([m===3?i:tt([m,!1,c],i),h]).then(([f])=>{if(!f||!(m===2||m===3))return;const g=f.vC;requestAnimationFrame(()=>{setTimeout(()=>{g===f.vC&&tt([m===3?1:0,!1,c],f)})})})}else tt([0,!1,c],i)}])},_t=(t,r)=>{var o;const s=Ne.at(-1);if(!s)return t;const[,i]=s,a=(o=i[_][1])[pt]||(o[pt]=[]),n=i[_][0]++,l=a[n];return Or(l==null?void 0:l[1],r)?a[n]=[t,r]:t=a[n][0],t},oi=t=>{const r=bt.get(t);if(r){if(r.length===2)throw r[1];return r[0]}throw t.then(s=>bt.set(t,[s]),s=>bt.set(t,[void 0,s])),t},li=(t,r)=>{var o;const s=Ne.at(-1);if(!s)return t();const[,i]=s,a=(o=i[_][1])[gt]||(o[gt]=[]),n=i[_][0]++,l=a[n];return Or(l==null?void 0:l[1],r)&&(a[n]=[t(),r]),a[n][0]},ci=dr({pending:!1,data:null,method:null,action:null}),Wt=new Set,di=t=>{Wt.add(t),t.finally(()=>Wt.delete(t))},Rt=(t,r)=>li(()=>s=>{let i;t&&(typeof t=="function"?i=t(s)||(()=>{t(null)}):t&&"current"in t&&(t.current=s,i=()=>{t.current=null}));const a=r(s);return()=>{a==null||a(),i==null||i()}},[t]),ue=Object.create(null),Qe=Object.create(null),Ue=(t,r,s,i,a)=>{if(r!=null&&r.itemProp)return{tag:t,props:r,type:t,ref:r.ref};const n=document.head;let{onLoad:l,onError:o,precedence:c,blocking:d,...m}=r,h=null,f=!1;const g=Xe[t];let x;if(g.length>0){const C=n.querySelectorAll(t);e:for(const S of C)for(const q of Xe[t])if(S.getAttribute(q)===r[q]){h=S;break e}if(!h){const S=g.reduce((q,A)=>r[A]===void 0?q:`${q}-${A}-${r[A]}`,t);f=!Qe[S],h=Qe[S]||(Qe[S]=(()=>{const q=document.createElement(t);for(const A of g)r[A]!==void 0&&q.setAttribute(A,r[A]),r.rel&&q.setAttribute("rel",r.rel);return q})())}}else x=n.querySelectorAll(t);c=i?c??"":void 0,i&&(m[We]=c);const y=_t(C=>{if(g.length>0){let S=!1;for(const q of n.querySelectorAll(t)){if(S&&q.getAttribute(We)!==c){n.insertBefore(C,q);return}q.getAttribute(We)===c&&(S=!0)}n.appendChild(C)}else if(x){let S=!1;for(const q of x)if(q===C){S=!0;break}S||n.insertBefore(C,n.contains(x[0])?x[0]:n.querySelector(t)),x=void 0}},[c]),b=Rt(r.ref,C=>{var A;const S=g[0];if(s===2&&(C.innerHTML=""),(f||x)&&y(C),!o&&!l)return;let q=ue[A=C.getAttribute(S)]||(ue[A]=new Promise((Te,He)=>{C.addEventListener("load",Te),C.addEventListener("error",He)}));l&&(q=q.then(l)),o&&(q=q.catch(o)),q.catch(()=>{})});if(a&&d==="render"){const C=Xe[t][0];if(r[C]){const S=r[C],q=ue[S]||(ue[S]=new Promise((A,Te)=>{y(h),h.addEventListener("load",A),h.addEventListener("error",Te)}));oi(q)}}const k={tag:t,type:t,props:{...m,ref:b},ref:b};return k.p=s,h&&(k.e=h),ii(k,n)},ui=t=>{const r=Js(),s=r&&Ce(r);return s!=null&&s.endsWith("svg")?{tag:"title",props:t,type:"title",ref:t.ref}:Ue("title",t,void 0,!1,!1)},mi=t=>!t||["src","async"].some(r=>!t[r])?{tag:"script",props:t,type:"script",ref:t.ref}:Ue("script",t,1,!1,!0),hi=t=>!t||!["href","precedence"].every(r=>r in t)?{tag:"style",props:t,type:"style",ref:t.ref}:(t["data-href"]=t.href,delete t.href,Ue("style",t,2,!0,!0)),fi=t=>!t||["onLoad","onError"].some(r=>r in t)||t.rel==="stylesheet"&&(!("precedence"in t)||"disabled"in t)?{tag:"link",props:t,type:"link",ref:t.ref}:Ue("link",t,1,"precedence"in t,!0),pi=t=>Ue("meta",t,void 0,!1,!1),Lr=Symbol(),gi=t=>{const{action:r,...s}=t;typeof r!="function"&&(s.action=r);const[i,a]=ni([null,!1]),n=_t(async d=>{const m=d.isTrusted?r:d.detail[Lr];if(typeof m!="function")return;d.preventDefault();const h=new FormData(d.target);a([h,!0]);const f=m(h);f instanceof Promise&&(di(f),await f),a([null,!0])},[]),l=Rt(t.ref,d=>(d.addEventListener("submit",n),()=>{d.removeEventListener("submit",n)})),[o,c]=i;return i[1]=!1,{tag:ci,props:{value:{pending:o!==null,data:o,method:o?"post":null,action:o?r:null},children:{tag:"form",props:{...s,ref:l},type:"form",ref:l}},f:c}},Ir=(t,{formAction:r,...s})=>{if(typeof r=="function"){const i=_t(a=>{a.preventDefault(),a.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[Lr]:r}}))},[]);s.ref=Rt(s.ref,a=>(a.addEventListener("click",i),()=>{a.removeEventListener("click",i)}))}return{tag:t,props:s,type:t,ref:s.ref}},bi=t=>Ir("input",t),xi=t=>Ir("button",t);Object.assign(vt,{title:ui,script:mi,style:hi,link:fi,meta:pi,form:gi,input:bi,button:xi});Tt(null);new TextEncoder;var vi=Tt(null),yi=(t,r,s,i)=>(a,n)=>{const l="<!DOCTYPE html>",o=s?Ot(d=>s(d,t),{Layout:r,...n},a):a,c=Gr`${O(l)}${Ot(vi.Provider,{value:t},o)}`;return t.html(c)},Mr=(t,r)=>function(i,a){const n=i.getLayout()??ns;return t&&i.setLayout(l=>t({...l,Layout:n},i)),i.setRenderer(yi(i,n,t)),a()};const wi=Mr(({children:t})=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"GXO Logistics - Intranet Moissy"}),e("script",{dangerouslySetInnerHTML:{__html:`
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
        `}})]}),e("body",{class:"bg-gray-50",children:[e("nav",{class:"bg-[#FF4500] text-white shadow-lg no-print sticky top-0 z-50",id:"main-nav",children:e("div",{class:"container mx-auto px-4 py-3 flex items-center justify-between",id:"nav-container",children:[e("a",{href:"/",class:"flex items-center space-x-3 hover:opacity-90 transition-opacity",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-10"}),e("div",{class:"border-l border-white/30 pl-3",children:[e("div",{class:"text-lg font-bold",children:"HUB Procédures Logistique"}),e("div",{class:"text-xs opacity-90",children:"Moissy-Cramayel"})]})]}),e("div",{class:"flex items-center space-x-4",id:"nav-links",children:[e("a",{href:"/?v=2",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-home mr-2"}),e("span",{children:"Accueil"})]}),e("a",{href:"/bibliotheque?v=2",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-book mr-2"}),e("span",{children:"Bibliothèque"})]}),e("a",{href:"/contacts?v=2",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-address-book mr-2"}),e("span",{children:"Contacts"})]}),e("a",{href:"/anomalies?v=2",class:"px-3 py-2 rounded-lg transition-all hover:bg-white/20 hover:shadow-md",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),e("span",{children:"Anomalies"})]})]})]})}),e("main",{class:"container mx-auto px-4 py-8",children:t}),e("div",{id:"review-modal",class:"hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 no-print",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto",children:[e("div",{class:"bg-[#FF4500] text-white p-6 rounded-t-lg",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h3",{class:"text-2xl font-bold",children:"Donner votre avis"}),e("p",{class:"text-sm opacity-75 mt-1",id:"review-modal-title",children:"Procédure"})]}),e("button",{onclick:"closeReviewModal()",class:"text-white hover:text-[#FF4500] transition-colors text-2xl",children:e("i",{class:"fas fa-times"})})]})}),e("div",{class:"p-6",children:[e("form",{id:"review-form",onsubmit:"submitReview(event)",class:"mb-6",children:[e("input",{type:"hidden",id:"review-procedure-id"}),e("div",{class:"mb-6",children:[e("label",{class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-star text-yellow-500 mr-2"}),"Votre note (optionnel)"]}),e("div",{id:"rating-stars"})]}),e("div",{class:"mb-4",children:[e("label",{for:"review-name",class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-user mr-2"}),"Votre nom (optionnel)"]}),e("input",{type:"text",id:"review-name",placeholder:"Anonyme",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none"})]}),e("div",{class:"mb-6",children:[e("label",{for:"review-comment",class:"block text-gray-700 font-semibold mb-2",children:[e("i",{class:"fas fa-comment mr-2"}),"Votre commentaire (optionnel)"]}),e("textarea",{id:"review-comment",rows:"4",placeholder:"Partagez votre expérience, des conseils, ou des suggestions d'amélioration...",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none resize-none"}),e("p",{class:"text-xs text-gray-500 mt-1",children:"Minimum 10 caractères recommandé"})]}),e("div",{class:"flex gap-3",children:[e("button",{type:"submit",class:"flex-1 bg-[#FF4500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5A1A] transition-colors",children:[e("i",{class:"fas fa-paper-plane mr-2"}),"Publier"]}),e("button",{type:"button",onclick:"closeReviewModal()",class:"px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors",children:"Annuler"})]})]}),e("div",{class:"border-t pt-6",children:[e("h4",{class:"text-xl font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-comments mr-2"}),"Avis de la communauté"]}),e("div",{id:"reviews-list"})]})]})]})}),e("footer",{class:"bg-gray-800 text-white py-6 mt-12 no-print",children:e("div",{class:"container mx-auto px-4 text-center",children:[e("p",{class:"text-sm",children:"© 2026 GXO Logistics - Site de Moissy-Cramayel"}),e("p",{class:"text-xs mt-2 opacity-75",children:"Intranet des procédures logistiques"})]})}),e("button",{id:"viewport-toggle",class:"viewport-toggle no-print",onclick:"toggleViewportMode()",title:"Mode adaptatif automatique - Cliquez pour forcer un mode",children:[e("i",{id:"viewport-icon",class:"fas fa-mobile-alt"}),e("span",{id:"auto-indicator",class:"auto-indicator",children:"AUTO"})]}),e("script",{src:"/static/auth.js"}),e("script",{src:"/static/app.v2.js"}),e("script",{src:"/static/reviews.js"}),e("script",{src:"/static/onboarding.js"}),e("script",{src:"/static/decision-tree.js"}),e("script",{dangerouslySetInnerHTML:{__html:`
          // Cache busting automatique - Ajouter ?v=2 à tous les liens internes
          document.addEventListener('DOMContentLoaded', function() {
            const CACHE_VERSION = '2';
            const links = document.querySelectorAll('a[href^="/"]');
            links.forEach(link => {
              const href = link.getAttribute('href');
              if (href && !href.includes('?v=') && !href.startsWith('/static/')) {
                const separator = href.includes('?') ? '&' : '?';
                link.setAttribute('href', href + separator + 'v=' + CACHE_VERSION);
              }
            });
          });
        `}}),e("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
        `}})]})]})),Ve=Mr(({children:t})=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Connexion - GXO Logistics Moissy"}),e("script",{dangerouslySetInnerHTML:{__html:`
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
        `}})]}),e("body",{children:[t,e("script",{src:"/static/auth.js"})]})]}));async function Et(t,r,s="auto",i){try{if(!i)return console.warn("⚠️ [TRADUCTION] Pas de clé API Google - mode dégradé"),t;const a=s==="autodetect"?"auto":s;console.log(`🔄 [TRADUCTION] Tentative Google: "${t.substring(0,50)}..." (${a} → ${r})`);const n=`https://translation.googleapis.com/language/translate/v2?key=${i}`,l={q:t,target:r,format:"text"};a!=="auto"&&(l.source=a);const o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!o.ok){const d=await o.text();return console.error("❌ [TRADUCTION] Erreur HTTP:",o.status,d),t}const c=await o.json();if(console.log("📦 [TRADUCTION] Réponse Google:",JSON.stringify(c).substring(0,200)),c&&c.data&&c.data.translations&&c.data.translations[0]){const d=c.data.translations[0].translatedText,m=c.data.translations[0].detectedSourceLanguage;return console.log(`✅ [TRADUCTION] Succès Google (${m||a} → ${r}): "${d.substring(0,50)}..."`),d}return console.warn("⚠️ [TRADUCTION] Format réponse Google inattendu:",c),t}catch(a){return console.error("❌ [TRADUCTION] Erreur exception Google:",a),t}}function ki(){const t=[{id:"reception",title:"Réception",icon:"fa-truck-loading",color:"bg-orange-500",description:"Base générale des procédures - Réception marchandises",processes:29},{id:"accueil-chauffeur",title:"Accueil Chauffeur",icon:"fa-truck",color:"bg-blue-500",description:"Procédures d'arrivée et livraison chauffeurs",processes:4},{id:"administrateur",title:"Administrateur",icon:"fa-user-tie",color:"bg-purple-500",description:"Gestion administrative et suivi documentaire",processes:5},{id:"controleur",title:"Contrôleur",icon:"fa-user-check",color:"bg-green-500",description:"Contrôle qualité et conformité réception",processes:5},{id:"agent-quai",title:"Agent de Quai",icon:"fa-hard-hat",color:"bg-yellow-500",description:"Opérations de déchargement et contrôle",processes:6},{id:"nouveau",title:"Nouvel Arrivant",icon:"fa-graduation-cap",color:"bg-pink-500",description:"Parcours d'intégration et formations de base",processes:6},{id:"anomalies",title:"Anomalies / FAQ",icon:"fa-exclamation-circle",color:"bg-red-500",description:"Gestion incidents, litiges, arbres de décision",processes:20}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white rounded-lg shadow-xl p-8 mb-8 relative overflow-hidden",children:[e("div",{class:"absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block",children:e("svg",{viewBox:"0 0 400 300",class:"w-full h-full",children:[e("rect",{x:"50",y:"80",width:"80",height:"40",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"50",y:"130",width:"80",height:"40",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"50",y:"180",width:"80",height:"40",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"150",y:"80",width:"80",height:"40",fill:"currentColor",opacity:"0.6"}),e("rect",{x:"150",y:"130",width:"80",height:"40",fill:"currentColor",opacity:"0.6"}),e("rect",{x:"150",y:"180",width:"80",height:"40",fill:"currentColor",opacity:"0.6"}),e("g",{transform:"translate(270, 180)",children:[e("rect",{x:"0",y:"20",width:"60",height:"30",fill:"#FF4500",opacity:"0.9"}),e("rect",{x:"35",y:"5",width:"25",height:"15",fill:"#FF4500",opacity:"0.9"}),e("circle",{cx:"15",cy:"55",r:"8",fill:"currentColor"}),e("circle",{cx:"50",cy:"55",r:"8",fill:"currentColor"}),e("rect",{x:"-15",y:"25",width:"10",height:"30",fill:"currentColor",opacity:"0.8"}),e("rect",{x:"-5",y:"-20",width:"5",height:"45",fill:"currentColor",opacity:"0.7"})]}),e("rect",{x:"60",y:"90",width:"15",height:"20",fill:"#FF4500",opacity:"0.7"}),e("rect",{x:"80",y:"90",width:"15",height:"20",fill:"#FF4500",opacity:"0.5"}),e("rect",{x:"160",y:"140",width:"15",height:"20",fill:"#FF4500",opacity:"0.6"})]})}),e("div",{class:"flex items-center justify-between relative z-10",children:[e("div",{class:"flex items-start space-x-6",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-16 mt-2",id:"hero-logo"}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:"HUB Procédures Logistiques"}),e("p",{class:"text-xl opacity-90",children:"Intranet Moissy-Cramayel"})]})]}),e("div",{class:"text-right",id:"hero-counter",children:[e("div",{class:"text-5xl font-bold",children:t.reduce((r,s)=>r+s.processes,0)}),e("div",{class:"text-sm opacity-75 mt-1",children:"Procédures disponibles"})]})]}),e("div",{class:"text-center text-xs opacity-75 mt-4 leading-tight",id:"hero-description",children:"Accès direct à tous les documents et contacts de l'équipe GXO Moissy-Cramayel"})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",children:[e("div",{class:"bg-white rounded-lg shadow p-4 border-l-4 border-orange-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-500 text-xs",children:"Accès rapide"}),e("p",{class:"text-xl font-bold text-gray-800",children:"En 2 clics"})]}),e("i",{class:"fas fa-mouse-pointer text-3xl text-orange-500"})]})}),e("div",{class:"bg-white rounded-lg shadow p-4 border-l-4 border-green-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-500 text-xs",children:"Assistance"}),e("p",{class:"text-xl font-bold text-gray-800",children:"24h/24"})]}),e("i",{class:"fas fa-headset text-3xl text-green-500"})]})}),e("div",{class:"bg-white rounded-lg shadow p-4 border-l-4 border-orange-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-500 text-xs",children:"Compatible"}),e("p",{class:"text-xl font-bold text-gray-800",children:"Mobile"})]}),e("i",{class:"fas fa-mobile-alt text-3xl text-orange-500"})]})})]}),e("div",{children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-briefcase mr-3 text-[#FF5A1A]"}),"Sélectionnez votre métier"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(r=>e("a",{href:`/${r.id}`,class:"block",children:e("div",{class:`gxo-card bg-white rounded-lg shadow-lg overflow-hidden border-t-4 ${r.color.replace("bg-","border-")}`,children:e("div",{class:"p-6",children:[e("div",{class:"flex items-start justify-between mb-4",children:[r.id==="cariste"?e("div",{class:"w-16 h-16 rounded-full overflow-hidden flex items-center justify-center",children:e("img",{src:"/static/ipl-icon.svg",alt:"IPL",class:"w-full h-full"})}):e("div",{class:`${r.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl`,children:e("i",{class:`fas ${r.icon}`})}),e("span",{class:"bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full",children:[r.processes," process"]})]}),e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("p",{class:"text-gray-600 text-sm mb-4",children:r.description}),e("div",{class:"flex items-center justify-between",children:[e("span",{class:`text-sm font-semibold ${r.color.replace("bg-","text-")}`,children:"Voir les procédures"}),e("i",{class:"fas fa-arrow-right text-gray-400"})]})]})})}))})]}),e("div",{class:"mt-12 bg-white rounded-lg shadow-lg p-8",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-bolt mr-3 text-yellow-500"}),"Accès rapide"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[e("a",{href:"/reception#reception-standard",class:"flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Réception standard"})]}),e("a",{href:"/agent-quai#chargement-camion",class:"flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors",children:[e("i",{class:"fas fa-dolly text-yellow-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Chargement camion"})]}),e("a",{href:"/controleur#controle-qualite",class:"flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Contrôle qualité"})]}),e("a",{href:"/accueil-chauffeur#accueil-standard",class:"flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors",children:[e("i",{class:"fas fa-truck text-blue-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Accueil chauffeur"})]}),e("a",{href:"/administrateur#gestion-documents",class:"flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors",children:[e("i",{class:"fas fa-file-invoice text-purple-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Gestion documents"})]}),e("a",{href:"/anomalies#retour-fournisseur",class:"flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors",children:[e("i",{class:"fas fa-undo text-red-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Retour fournisseur"})]}),e("a",{href:"/nouveau",class:"flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors",children:[e("i",{class:"fas fa-graduation-cap text-pink-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Parcours intégration"})]}),e("a",{href:"/contacts",class:"flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors",children:[e("i",{class:"fas fa-address-book text-indigo-500 text-2xl mr-3"}),e("span",{class:"font-semibold text-gray-800",children:"Annuaire contacts"})]})]})]}),e("div",{class:"mt-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-folder-open mr-3 text-gray-600"}),"Ressources & Documents"]}),e("div",{class:"flex flex-wrap gap-4",children:[e("a",{href:"/bibliotheque",class:"inline-block bg-[#FF5A1A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E53D00] transition-colors",children:[e("i",{class:"fas fa-book mr-2"}),"Bibliothèque de documents (34)"]}),e("a",{href:"/contacts",class:"inline-block bg-[#FF4500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5A1A] transition-colors",children:[e("i",{class:"fas fa-address-book mr-2"}),"Annuaire des contacts (20)"]})]})]})]})}function Ei(){return e("div",{children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:[e("i",{class:"fas fa-truck-loading mr-3"}),"Réception"]}),e("p",{class:"text-xl opacity-90",children:"Réception marchandises, contrôle BL, déchargement"})]}),e("a",{href:"/",class:"bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"bg-white rounded-lg shadow p-6 mb-8",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-info-circle mr-2 text-orange-500"}),"Niveaux de complexité"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e("div",{class:"flex items-center",children:[e("span",{class:"text-2xl mr-3",children:"🟢"}),e("div",{children:[e("div",{class:"font-semibold text-green-600",children:"Niveau 1 - Essentiel"}),e("div",{class:"text-sm text-gray-600",children:"Opérations de base quotidiennes"})]})]}),e("div",{class:"flex items-center",children:[e("span",{class:"text-2xl mr-3",children:"🟡"}),e("div",{children:[e("div",{class:"font-semibold text-yellow-600",children:"Niveau 2 - Standard"}),e("div",{class:"text-sm text-gray-600",children:"Procédures intermédiaires"})]})]}),e("div",{class:"flex items-center",children:[e("span",{class:"text-2xl mr-3",children:"🔴"}),e("div",{children:[e("div",{class:"font-semibold text-red-600",children:"Niveau 3 - Avancé"}),e("div",{class:"text-sm text-gray-600",children:"Cas complexes et rares"})]})]})]})]}),e("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[{id:"ewm-goods-receipt-manuel",title:"Manuel EWM Goods Receipt (Référence Complète)",icon:"fa-book",duration:"Manuel de référence",level:"🔴",vigilance:["Document de procédure complet EWM","Enregistrement des trucks entrants","Inspection physique des marchandises","Gestion des écarts de livraison","Processus de contrôle qualité","Flux administratif et physique"],document:"EWM Procedure document - 01. Goods Receipt - FR.pdf",description:"Ce document de procédure EWM décrit en détail tous les processus de réception des marchandises au DC : enregistrement trucks, aiguillage vers quais, réception et inspection physique, enregistrement système, signalement/résolution des écarts, et présentation du flux marchandises."},{id:"reception-standard",title:"Réception palette fournisseur",icon:"fa-truck-loading",duration:"15-20 min",level:"🟢",vigilance:["Vérifier état emballage","Scanner BL complet","Contrôle quantité"],document:"Assigner camion à quai-2.docx",checklist:["Vérifier BL du fournisseur (quantité, références)","Inspecter visuellement l'état de l'emballage","Scanner le code-barres du BL","Contrôler le nombre de palettes reçues","Vérifier la température si produits frais","Apposer étiquette si nécessaire","Ranger la palette en zone appropriée","Clôturer la réception dans le système"]},{id:"dechargement",title:"Déchargement camion",icon:"fa-dolly-flatbed",duration:"30-45 min",level:"🟢",vigilance:["Sécurité chauffeur","Respect zone déchargement","Vérifier température si requis"],document:"Assigner camion à quai-2.docx",checklist:["Vérifier l'assignation du camion au quai","Sécuriser la zone (calles, signalisation)","Briefing sécurité avec le chauffeur","Ouvrir les portes du camion","Inspecter visuellement le chargement","Décharger palette par palette avec chariot","Vérifier chaque palette (état, quantité)","Ranger les palettes en zone dédiée","Faire signer le BL au chauffeur","Libérer le quai et fermer la porte"]},{id:"cloture-livraison",title:"Clôture livraison",icon:"fa-check-circle",duration:"5-10 min",level:"🟡",vigilance:["Vérifier ASN","Statut NOT STARTED → COMPLETED","Récupérer TU"],document:"cloture livraison new.docx",checklist:["Ouvrir EWM et accéder à l'ASN","Vérifier le statut de la livraison (NOT STARTED)","Passer le statut à COMPLETED","Récupérer le numéro TU généré","Vérifier les HU associés au TU","Contrôler les quantités","Valider la clôture","Imprimer étiquette TU si nécessaire"]},{id:"cloture-tu",title:"Clôture TU actif",icon:"fa-clipboard-check",duration:"10-15 min",level:"🟡",vigilance:["Filtrer date J-1","Exclure date du jour","Vérifier articles, HU et statut"],document:"Cloture TU actif.docx",checklist:["Accéder à MON → Transport Unit Overview","Filtrer par date J-1 (exclure date du jour)",'Identifier les TU en statut "Active"',"Vérifier les articles associés","Vérifier les HU (Handling Units)","Vérifier le statut de chaque TU","Action : Unload + Finish unloading","Alternative : Arrival + Departure","Valider la clôture",'Vérifier que le statut passe à "Completed"']},{id:"creer-tu",title:"Créer TU",icon:"fa-plus-circle",duration:"5 min",level:"🟢",vigilance:["Numéro de document ou ERP","Vérifier zone destination"],document:"Créer TU.docx",checklist:["Récupérer le numéro de document ou ERP","Accéder à la transaction de création TU","Saisir le numéro de document","Sélectionner la zone de destination","Vérifier les articles à inclure","Valider la création du TU","Noter le numéro TU généré","Imprimer l'étiquette TU"]},{id:"verification-dossier",title:"Vérification dossier après contrôle",icon:"fa-folder-open",duration:"10-15 min",level:"🔴",vigilance:["Vérifier manco/surplus","Comparer avec BL","Déclarer surplus sous 48h"],document:"Verification dossier aprés control.docx",checklist:["Récupérer le BL et le dossier de réception","Comparer les quantités BL vs réception physique","Identifier les mancos (manquants)","Identifier les surplus (excédents)","Si surplus : créer fichier GDS pour re-contrôle","Si manco : signaler à Invoice Moissy sous 48h","Prendre des photos si nécessaire","Remplir le rapport d'écart","Informer le chef d'équipe","Archiver le dossier complété"]},{id:"etiquette",title:"Rééditer une étiquette",icon:"fa-barcode",duration:"2-3 min",level:"🟢",vigilance:["Récupérer HU correct","Vérifier imprimante","Contrôler impression"],document:"Réediter une étiquette.docx",checklist:["Récupérer le numéro HU (Handling Unit)","Accéder à la transaction MON","Rechercher le HU dans le système","Vérifier les informations du HU",`Sélectionner l'option "Imprimer étiquette"`,"Choisir l'imprimante (contrôleur ou bureau)","Lancer l'impression","Contrôler la qualité de l'étiquette imprimée","Apposer l'étiquette sur la palette"]},{id:"fermer-quai",title:"Fermer une porte de quai",icon:"fa-door-closed",duration:"2 min",level:"🟢",vigilance:["Vérifier absence camion","RFUI transaction"],document:"Fermer une porte de quai.docx",checklist:["Vérifier l'absence de camion au quai","Vérifier que toutes les palettes sont déchargées","Fermer les portes du quai","Accéder à la transaction RFUI","Saisir le numéro de quai",`Sélectionner l'action "Fermer quai"`,"Valider la fermeture",'Vérifier le statut "Quai fermé" dans le système']},{id:"etetage-container",title:"Étêtage et container",icon:"fa-file-excel",duration:"20-30 min",level:"🔴",vigilance:["Filtrer containers uniquement","Trier par date appointment","Export Excel"],document:"Mettre en forme et renseigner le fichier étêtage et container.docx",checklist:['Ouvrir le fichier modèle "Étêtage et container"',"Accéder au portail Action","Filtrer les containers uniquement (exclure palettes)","Trier par date d'appointment","Exporter les données en Excel","Copier les données dans le fichier modèle","Mettre en forme (couleurs, bordures)","Vérifier les informations (quantités, dates)","Ajouter commentaires si nécessaire","Enregistrer et partager avec le chef d'équipe"]},{id:"charger-batterie",title:"Changement / Charge batterie",icon:"fa-battery-three-quarters",duration:"10-15 min",level:"🟢",vigilance:["Sécurité électrique","Niveau charge > 20%","Brancher correctement"],checklist:["Surveiller le niveau de batterie du chariot","Si niveau < 20% → aller à la zone de charge","Stationner le chariot sur zone de charge","Couper le contact du chariot","Ouvrir le compartiment batterie","Débrancher les câbles (respecter l'ordre)","Soulever la batterie avec le palan","Installer la batterie chargée","Brancher les câbles (respecter polarité)","Vérifier le voyant de charge","Refermer le compartiment","Tester le chariot"]}].map(r=>e("div",{id:r.id,class:"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4",children:e("div",{class:"flex items-start justify-between",children:e("div",{class:"flex-1",children:[e("div",{class:"flex items-center mb-2",children:[e("div",{class:"flex flex-col items-center mr-4",children:[e("i",{class:`fas ${r.icon} text-3xl mb-2`}),e("div",{class:"flex gap-1 cursor-pointer",onclick:`showReviewModal('${r.id}', '${r.title}')`,title:"Cliquez pour donner votre avis",children:e("span",{class:"star-display text-yellow-300 hover:text-yellow-400 transition-colors","data-procedure-id":r.id,children:"☆☆☆☆☆"})}),e("div",{class:"text-xs mt-1 opacity-75","data-procedure-rating":r.id,children:"Pas encore noté"})]}),e("h3",{class:"text-xl font-bold flex-1",children:r.title})]}),e("div",{class:"flex items-center space-x-4 text-sm opacity-90",children:[e("span",{children:[e("i",{class:"far fa-clock mr-1"}),r.duration]}),e("span",{children:["Niveau ",r.level]})]})]})})}),e("div",{class:"p-6",children:[e("div",{class:"mb-4",children:[e("h4",{class:"font-semibold text-gray-800 mb-2 flex items-center",children:[e("i",{class:"fas fa-exclamation-triangle text-orange-500 mr-2"}),"Points de vigilance"]}),e("ul",{class:"space-y-1",children:r.vigilance.map(s=>e("li",{class:"text-sm text-gray-600 flex items-start",children:[e("i",{class:"fas fa-check text-green-500 mr-2 mt-1"}),e("span",{children:s})]}))})]}),e("div",{class:"flex flex-wrap gap-2 mt-4",children:[r.checklist?e("button",{onclick:`showChecklistInteractive('${r.id}', ${JSON.stringify(r.checklist)})`,class:"gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist interactive"]}):e("button",{onclick:`showChecklist('${r.id}')`,class:"gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center",children:[e("i",{class:"fas fa-list-check mr-2"}),"Checklist"]}),r.document&&e("a",{href:`/static/documents/${r.document}`,target:"_blank",class:"gxo-btn bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 flex items-center",children:[e("i",{class:"fas fa-file-download mr-2"}),"Document"]}),e("button",{onclick:"showDecisionTree('root')",class:"gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center",children:[e("i",{class:"fas fa-sitemap mr-2"}),"Que faire si..."]})]})]})]}))}),e("div",{id:"modal-container",class:"hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:e("div",{id:"modal-content"})})})]})}function Ci(){const t=[{id:"arrivee-chauffeur",title:"Arrivée et enregistrement",icon:"fa-truck",duration:"10-15 min",level:"🟢",vigilance:["Se présenter à l'accueil","Préparer documents","Suivre signalisation"],document:"Assigner camion à quai-2.docx"},{id:"procedures-securite",title:"Procédures de sécurité",icon:"fa-shield-alt",duration:"5 min",level:"🟡",vigilance:["Port EPI obligatoire","Respecter zones","Signaler anomalies"]},{id:"dechargement-chauffeur",title:"Opération de déchargement",icon:"fa-dolly",duration:"30-60 min",level:"🟢",vigilance:["Attendre autorisation","Ouvrir portes si demandé","Rester disponible"]},{id:"depart-chauffeur",title:"Clôture et départ",icon:"fa-sign-out-alt",duration:"10 min",level:"🟢",vigilance:["Récupérer documents signés","Vérifier camion vide","Signaler départ"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-truck text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Accueil Chauffeur"}),e("p",{class:"text-xl opacity-90",children:"Procédures d'arrivée et livraison"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"mb-8",children:[e("div",{class:"flex space-x-2 mb-6",children:[e("button",{id:"tab-chauffeurs",onclick:"switchTab('chauffeurs')",class:"flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-3",children:[e("i",{class:"fas fa-users-cog text-2xl"}),e("div",{class:"text-left",children:[e("div",{class:"text-lg",children:"Chauffeurs Actifs"}),e("div",{class:"text-xs opacity-75",children:"Suivi en temps réel"})]}),e("div",{class:"bg-white/20 rounded-lg px-3 py-1",children:e("span",{class:"text-2xl font-bold",id:"tab-stat-chauffeurs",children:"0"})})]}),e("button",{id:"tab-quais",onclick:"switchTab('quais')",class:"flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl shadow-lg hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center space-x-3",children:[e("i",{class:"fas fa-warehouse text-2xl"}),e("div",{class:"text-left",children:[e("div",{class:"text-lg",children:"Gestion des Quais"}),e("div",{class:"text-xs opacity-75",children:"45 quais GXO Moissy"})]}),e("div",{class:"bg-gray-100 rounded-lg px-3 py-1",children:e("span",{class:"text-2xl font-bold text-green-600",id:"tab-stat-quais-disponibles",children:"0"})})]})]}),e("div",{id:"content-chauffeurs",class:"tab-content",children:e("div",{id:"dashboard-chauffeurs-container",children:[e("div",{class:"bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-xl p-6 mb-6",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h2",{class:"text-2xl font-bold mb-2 flex items-center",children:[e("i",{class:"fas fa-users-cog mr-3"}),"Chauffeurs Actifs en Temps Réel"]}),e("p",{class:"text-sm opacity-90",children:"Suivi de la progression des tâches de déchargement"})]}),e("div",{class:"flex space-x-4",children:[e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold",id:"stat-total-chauffeurs",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Total"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-green-300",id:"stat-complets",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Prêts"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-orange-200",id:"stat-en-cours",children:"0"}),e("div",{class:"text-xs opacity-75",children:"En cours"})]})]})]})}),e("div",{id:"dashboard-chauffeurs-grid",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6",children:e("div",{class:"col-span-full flex justify-center py-12",children:e("div",{class:"animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"})})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-info-circle text-blue-500 mr-2"}),"Légende des Tâches"]}),e("div",{class:"grid grid-cols-2 md:grid-cols-5 gap-4",children:[e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🦺"}),e("span",{class:"text-sm text-gray-700",children:"EPI Porté"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🚚"}),e("span",{class:"text-sm text-gray-700",children:"Placement Quai"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"📦"}),e("span",{class:"text-sm text-gray-700",children:"Échange Palettes"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🔔"}),e("span",{class:"text-sm text-gray-700",children:"Accueil Notifié"})]}),e("div",{class:"flex items-center space-x-2",children:[e("span",{class:"text-2xl",children:"🔑"}),e("span",{class:"text-sm text-gray-700",children:"Remise Clés"})]})]})]})]})}),e("div",{id:"content-quais",class:"tab-content hidden",children:[e("div",{class:"bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-xl p-6 mb-6",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h2",{class:"text-2xl font-bold mb-2 flex items-center",children:[e("i",{class:"fas fa-warehouse mr-3"}),"Gestion des Quais de Déchargement"]}),e("p",{class:"text-sm opacity-90",children:"Visualisation et gestion de l'état des 45 quais GXO Moissy en temps réel"})]}),e("div",{class:"flex space-x-4",children:[e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-green-300",id:"stat-quais-disponibles",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Disponibles"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-yellow-300",id:"stat-quais-en-cours",children:"0"}),e("div",{class:"text-xs opacity-75",children:"En cours"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-blue-300",id:"stat-quais-fin-dechargement",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Fin déchargement"})]}),e("div",{class:"bg-white/20 rounded-xl px-4 py-2 text-center",children:[e("div",{class:"text-3xl font-bold text-red-300",id:"stat-quais-indisponibles",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Indisponibles"})]})]})]})}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6",children:[e("div",{class:"lg:col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-xl p-6",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full animate-pulse",children:e("i",{class:"fas fa-barcode text-3xl"})}),e("div",{children:[e("h3",{class:"text-2xl font-bold mb-1",children:"Scanner Code-Barres Actif"}),e("p",{class:"text-sm opacity-90",children:"Scannez un code-barres (ex: D075) pour démarrer automatiquement le timer du quai"}),e("div",{class:"mt-2 flex items-center space-x-2 text-xs opacity-75",children:[e("i",{class:"fas fa-info-circle"}),e("span",{children:"45 quais configurés • Détection automatique • Timer en temps réel"})]})]})]}),e("div",{class:"text-right",children:e("div",{class:"bg-white/20 rounded-xl px-4 py-2",children:[e("div",{class:"text-3xl font-bold",id:"scan-counter",children:"0"}),e("div",{class:"text-xs opacity-75",children:"Scans"})]})})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center justify-between",children:[e("span",{children:[e("i",{class:"fas fa-history text-blue-500 mr-2"}),"Derniers Scans"]}),e("button",{onclick:"loadScanHistory()",class:"text-blue-500 hover:text-blue-700 text-xs",children:e("i",{class:"fas fa-sync-alt"})})]}),e("div",{id:"scan-history-list",class:"space-y-2 max-h-48 overflow-y-auto",children:e("div",{class:"text-center text-gray-400 py-8",children:[e("i",{class:"fas fa-inbox text-4xl mb-2"}),e("p",{class:"text-sm",children:"Aucun scan enregistré"})]})})]})]}),e("div",{class:"bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl p-6 mb-6",children:e("div",{class:"flex flex-col md:flex-row items-center gap-4",children:[e("div",{class:"flex-shrink-0",children:e("div",{class:"bg-white/20 rounded-full p-4",children:e("i",{class:"fas fa-qrcode text-white text-4xl"})})}),e("div",{class:"flex-1 text-center md:text-left",children:[e("h3",{class:"text-2xl font-bold text-white mb-2",children:"Scanner un Code-Barres"}),e("p",{class:"text-white/90 text-sm",children:"Tapez ou collez le code (ex: D075, D001) puis appuyez sur Entrée ou Scanner"})]}),e("div",{class:"flex-1 max-w-md",children:[e("div",{class:"flex gap-2",children:[e("input",{type:"text",id:"manual-scan-input",placeholder:"Code-barres (ex: D075)",class:"flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 font-mono text-lg uppercase",onkeypress:"if(event.key==='Enter') triggerManualScan()"}),e("button",{onclick:"triggerManualScan()",class:"bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2",children:[e("i",{class:"fas fa-search"}),"Scanner"]})]}),e("div",{id:"manual-scan-result",class:"mt-2 text-sm"})]})]})}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-map-marker-alt text-blue-500 mr-2"}),"Zone A (Quais 1-10)"]}),e("div",{id:"quais-zone-1-10",class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"})]}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-map-marker-alt text-purple-500 mr-2"}),"Zone B (Quais 32-38)"]}),e("div",{id:"quais-zone-32-38",class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"})]}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2"}),"Zone C (Quais 45-49)"]}),e("div",{id:"quais-zone-45-49",class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"})]}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-map-marker-alt text-teal-500 mr-2"}),"Zone D (Quais 60-62, 67-69)"]}),e("div",{id:"quais-zone-60-69",class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"})]}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-map-marker-alt text-pink-500 mr-2"}),"Zone E (Quais 75-79, 81-87)"]}),e("div",{id:"quais-zone-75-87",class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"})]}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-map-marker-alt text-indigo-500 mr-2"}),"Zone F (Quais 99-103)"]}),e("div",{id:"quais-zone-99-103",class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"})]}),e("div",{id:"quais-grid",class:"hidden"})]}),e("div",{id:"modal-quai",class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center hidden",children:e("div",{class:"bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden",children:[e("div",{class:"bg-gradient-to-r from-green-500 to-green-600 text-white p-6",children:e("h3",{class:"text-2xl font-bold flex items-center",children:[e("i",{class:"fas fa-warehouse mr-3"}),"Gestion du Quai ",e("span",{id:"modal-quai-numero",class:"ml-2"})]})}),e("div",{class:"p-6",children:[e("div",{class:"mb-6",children:[e("label",{class:"block text-sm font-bold text-gray-700 mb-3",children:[e("i",{class:"fas fa-traffic-light mr-2 text-green-500"}),"Changer le statut"]}),e("div",{class:"space-y-3",children:[e("button",{onclick:"setQuaiStatus('disponible')",class:"w-full bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-xl hover:from-green-500 hover:to-green-600 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center",children:[e("span",{class:"text-2xl mr-3",children:"✅"}),"Disponible - Prêt pour chargement"]}),e("button",{onclick:"setQuaiStatus('en_cours')",class:"w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center",children:[e("span",{class:"text-2xl mr-3",children:"⏱️"}),"En cours d'utilisation - Timer actif"]}),e("button",{onclick:"setQuaiStatus('fin_dechargement')",class:"w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center",children:[e("span",{class:"text-2xl mr-3",children:"📋"}),"Fin de déchargement - Timer figé"]}),e("button",{onclick:"toggleCommentaire()",class:"w-full bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-500 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center",children:[e("span",{class:"text-2xl mr-3",children:"🚫"}),"Indisponible - Problème signalé"]})]})]}),e("div",{id:"commentaire-section",class:"hidden mb-6",children:[e("label",{class:"block text-sm font-bold text-gray-700 mb-2",children:[e("i",{class:"fas fa-comment-alt mr-2 text-red-500"}),"Commentaire obligatoire"]}),e("textarea",{id:"quai-commentaire",rows:"3",class:"w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none",placeholder:"Décrivez le problème (obligatoire pour marquer indisponible)..."}),e("button",{onclick:"setQuaiStatus('indisponible')",class:"w-full mt-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-semibold",children:[e("i",{class:"fas fa-check mr-2"}),"Confirmer l'indisponibilité"]})]}),e("div",{class:"flex space-x-3",children:e("button",{onclick:"closeQuaiModal()",class:"flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold",children:[e("i",{class:"fas fa-times mr-2"}),"Annuler"]})})]})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6",children:[e("h3",{class:"font-bold text-gray-800 mb-4 flex items-center",children:[e("i",{class:"fas fa-info-circle text-green-500 mr-2"}),"Légende des Statuts"]}),e("div",{class:"grid grid-cols-2 md:grid-cols-3 gap-3",children:[e("div",{class:"flex items-center space-x-2 p-3 bg-green-50 rounded-lg",children:[e("div",{class:"w-4 h-4 bg-green-500 rounded-full flex-shrink-0"}),e("span",{class:"text-lg mr-1",children:"✅"}),e("span",{class:"text-xs font-semibold text-gray-700",children:"Disponible"})]}),e("div",{class:"flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg",children:[e("div",{class:"w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"}),e("span",{class:"text-lg mr-1",children:"⏱️"}),e("span",{class:"text-xs font-semibold text-gray-700",children:"En cours"})]}),e("div",{class:"flex items-center space-x-2 p-3 bg-blue-50 rounded-lg",children:[e("div",{class:"w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"}),e("span",{class:"text-lg mr-1",children:"📋"}),e("span",{class:"text-xs font-semibold text-gray-700",children:"Fin de déchargement"})]}),e("div",{class:"flex items-center space-x-2 p-3 bg-orange-50 rounded-lg",children:[e("div",{class:"w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"}),e("span",{class:"text-lg mr-1",children:"🔍"}),e("span",{class:"text-xs font-semibold text-gray-700",children:"En contrôle"})]}),e("div",{class:"flex items-center space-x-2 p-3 bg-purple-50 rounded-lg",children:[e("div",{class:"w-4 h-4 bg-purple-400 rounded-full flex-shrink-0"}),e("span",{class:"text-lg mr-1",children:"📝"}),e("span",{class:"text-xs font-semibold text-gray-700",children:"Fin de contrôle"})]}),e("div",{class:"flex items-center space-x-2 p-3 bg-red-50 rounded-lg",children:[e("div",{class:"w-4 h-4 bg-red-500 rounded-full flex-shrink-0"}),e("span",{class:"text-lg mr-1",children:"🚫"}),e("span",{class:"text-xs font-semibold text-gray-700",children:"Indisponible"})]})]})]})]})]}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500",children:[e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-blue-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-blue-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-blue-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(s=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:s})]}))})]}),e("div",{class:"mt-4",children:e("button",{class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 w-full justify-center",onclick:"alert('Fonctionnalité Vidéo tutoriel à venir')",children:[e("i",{class:"fas fa-video"}),e("span",{class:"font-semibold",children:"Vidéo tutoriel"})]})})]})]})}),e("div",{class:"flex flex-wrap gap-2",children:r.document&&e("a",{href:`/static/documents/${r.document}`,target:"_blank",class:"gxo-btn bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 flex items-center",children:[e("i",{class:"fas fa-file-download mr-2"}),"Document"]})})]}))}),e("script",{src:"/static/accueil-chauffeur-tabs.js"}),e("script",{src:"/static/accueil-chauffeur-dashboard.js"}),e("script",{src:"/static/accueil-chauffeur-quais.js"}),e("script",{dangerouslySetInnerHTML:{__html:`
        function triggerManualScan() {
          const input = document.getElementById('manual-scan-input');
          const resultDiv = document.getElementById('manual-scan-result');
          const barcode = input.value.trim().toUpperCase();
          
          if (!barcode) {
            resultDiv.innerHTML = '<span class="text-red-200">⚠️ Veuillez saisir un code-barres</span>';
            return;
          }
          
          console.log('🔍 Scan manuel déclenché:', barcode);
          resultDiv.innerHTML = '<span class="text-yellow-200">⏳ Traitement en cours...</span>';
          
          // Appeler la fonction de scan du barcode-scanner.js
          if (typeof handleBarcodeScan === 'function') {
            handleBarcodeScan(barcode);
            resultDiv.innerHTML = '<span class="text-green-200">✅ Code scanné : ' + barcode + '</span>';
            
            // Effacer l'input après 1 seconde
            setTimeout(function() {
              input.value = '';
              resultDiv.innerHTML = '';
            }, 2000);
          } else {
            resultDiv.innerHTML = '<span class="text-red-200">❌ Scanner non initialisé. Rechargez la page.</span>';
            console.error('handleBarcodeScan non disponible');
          }
        }
        
        // Auto-focus sur l'input au chargement
        window.addEventListener('load', function() {
          const input = document.getElementById('manual-scan-input');
          if (input) {
            // Focus uniquement si on est sur l'onglet Quais
            const quaisTab = document.getElementById('tab-quais');
            if (quaisTab && quaisTab.classList.contains('tab-active')) {
              setTimeout(function() { input.focus(); }, 500);
            }
          }
        });
      `}}),e("script",{src:"/static/barcode-scanner.js"})]})}function Ti(){const t=[{id:"gestion-asn",title:"Gestion des ASN (Advanced Shipping Notice)",icon:"fa-file-alt",duration:"10-15 min",level:"🟡",vigilance:["Vérifier données fournisseur","Contrôler références","Valider quantités"]},{id:"cloture-livraison-admin",title:"Clôture administrative livraison",icon:"fa-clipboard-check",duration:"15-20 min",level:"🟡",vigilance:["Rapprocher BL physique et système","Gérer écarts","Archiver documents"]},{id:"gestion-ecarts",title:"Gestion des écarts de livraison",icon:"fa-exclamation-triangle",duration:"20-30 min",level:"🔴",vigilance:["Documenter précisément","Photos si dommages","Notification rapide"]},{id:"reporting",title:"Reporting et suivi activité",icon:"fa-chart-line",duration:"30-45 min",level:"🟢",vigilance:["Données à jour","Respect délais","Indicateurs précis"]},{id:"gestion-documents",title:"Gestion documentaire",icon:"fa-folder-open",duration:"15-20 min",level:"🟢",vigilance:["Classement correct","Numérisation qualité","Archivage sécurisé"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-user-tie text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Administrateur Réception"}),e("p",{class:"text-xl opacity-90",children:"Gestion administrative et suivi"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-purple-500",children:e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-purple-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-purple-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-purple-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(s=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:s})]}))})]}),e("div",{class:"mt-4",children:e("button",{class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 w-full justify-center",onclick:"alert('Fonctionnalité Vidéo tutoriel à venir')",children:[e("i",{class:"fas fa-video"}),e("span",{class:"font-semibold",children:"Vidéo tutoriel"})]})})]})]})})}))})]})}function qi(){const t=[{id:"controle-qualite",title:"Contrôle qualité marchandises",icon:"fa-search",duration:"20-30 min",level:"🟡",vigilance:["Inspection visuelle","Vérifier température","Documenter anomalies"]},{id:"controle-quantitatif",title:"Contrôle quantitatif",icon:"fa-calculator",duration:"15-25 min",level:"🟢",vigilance:["Recompter si doute","Vérifier unités","Noter écarts"]},{id:"controle-conformite",title:"Contrôle de conformité produit",icon:"fa-clipboard-check",duration:"25-35 min",level:"🔴",vigilance:["Références exactes","Dates limite","Normes qualité"]},{id:"gestion-non-conformites",title:"Gestion des non-conformités",icon:"fa-times-circle",duration:"30-45 min",level:"🔴",vigilance:["Isoler produits","Traçabilité","Notification rapide"]},{id:"audit-reception",title:"Audit aléatoire réception",icon:"fa-random",duration:"30-40 min",level:"🟡",vigilance:["Sélection aléatoire","Objectivité","Reporting précis"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-user-check text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Contrôleur Qualité"}),e("p",{class:"text-xl opacity-90",children:"Contrôle et conformité réception"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-green-500",children:e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-green-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-green-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-green-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(s=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:s})]}))})]}),e("div",{class:"mt-4",children:e("button",{class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 w-full justify-center",onclick:"alert('Fonctionnalité Vidéo tutoriel à venir')",children:[e("i",{class:"fas fa-video"}),e("span",{class:"font-semibold",children:"Vidéo tutoriel"})]})})]})]})})}))})]})}function Si(){const t=[{id:"accueil-camion",title:"Accueil camion et préparation quai",icon:"fa-hand-paper",duration:"10-15 min",level:"🟢",vigilance:["Vérifier assignation","Sécuriser zone","Briefing chauffeur"]},{id:"dechargement-quai",title:"Déchargement et contrôle",icon:"fa-dolly-flatbed",duration:"30-60 min",level:"🟢",vigilance:["Respect sécurité","Vérifier palettes","Noter anomalies"]},{id:"verification-conformite-quai",title:"Vérification conformité",icon:"fa-check-double",duration:"15-20 min",level:"🟡",vigilance:["BL vs physique","Références correctes","Températures"]},{id:"rangement-palettes",title:"Rangement et étiquetage",icon:"fa-warehouse",duration:"15-20 min",level:"🟢",vigilance:["Zone appropriée","Étiquettes claires","Stabilité palettes"]},{id:"cloture-quai",title:"Clôture quai et libération",icon:"fa-door-closed",duration:"10 min",level:"🟢",vigilance:["Documents complets","Zone propre","Quai libre"]},{id:"gestion-urgences-quai",title:"Gestion des situations d'urgence",icon:"fa-ambulance",duration:"Variable",level:"🔴",vigilance:["Sécurité prioritaire","Alerter secours","Évacuer zone"]}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 p-4 rounded-full",children:e("i",{class:"fas fa-hard-hat text-4xl"})}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Agent de Quai"}),e("p",{class:"text-xl opacity-90",children:"Opérations de déchargement et contrôle"})]})]}),e("div",{class:"text-right",children:[e("div",{class:"text-5xl font-bold",children:t.length}),e("div",{class:"text-sm opacity-75",children:"Procédures"})]})]})}),e("div",{class:"grid grid-cols-1 gap-6",children:t.map(r=>e("div",{class:"bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-yellow-500",children:e("div",{class:"flex items-start justify-between mb-4",children:e("div",{class:"flex items-start space-x-4 flex-1",children:[e("div",{class:"bg-yellow-100 p-3 rounded-lg",children:e("i",{class:`fas ${r.icon} text-2xl text-yellow-600`})}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-2",children:r.title}),e("div",{class:"flex items-center space-x-4 text-sm text-gray-600 mb-3",children:[e("span",{class:"flex items-center",children:[e("i",{class:"fas fa-clock mr-2 text-yellow-500"}),r.duration]}),e("span",{class:"flex items-center",children:[e("span",{class:"mr-2",children:"Niveau:"}),e("span",{class:"text-lg",children:r.level})]})]}),r.vigilance&&e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3",children:[e("p",{class:"text-sm font-semibold text-yellow-800 mb-2",children:[e("i",{class:"fas fa-exclamation-triangle mr-2"}),"Points de vigilance:"]}),e("ul",{class:"text-sm text-yellow-700 space-y-1",children:r.vigilance.map(s=>e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-chevron-right mr-2 mt-1 text-xs"}),e("span",{children:s})]}))})]}),e("div",{class:"mt-4",children:e("button",{class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 w-full justify-center",onclick:"alert('Fonctionnalité Vidéo tutoriel à venir')",children:[e("i",{class:"fas fa-video"}),e("span",{class:"font-semibold",children:"Vidéo tutoriel"})]})})]})]})})}))})]})}function Ai(){return e("div",{children:[e("div",{class:"bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:[e("i",{class:"fas fa-graduation-cap mr-3"}),"Nouvel Arrivant"]}),e("p",{class:"text-xl opacity-90",children:"Parcours d'intégration et formations de base"})]}),e("a",{href:"/",class:"bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 mb-8",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-route mr-3 text-pink-500"}),"Bienvenue chez GXO Logistics !"]}),e("p",{class:"text-gray-700 text-lg mb-6",children:"Pour vous guider au mieux, merci de sélectionner votre situation :"}),e("div",{id:"situation-selection",class:"space-y-4",children:[e("div",{class:"bg-white rounded-lg p-6 shadow-md",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-clipboard-question mr-2 text-pink-500"}),"Quelle est votre situation ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("button",{onclick:"showSituationQuestionnaire('nouveau')",class:"p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-user-plus text-2xl mb-2"}),e("div",{class:"font-bold",children:"Nouvelle intégration"}),e("div",{class:"text-sm opacity-90",children:"Premier jour dans l'entreprise"})]}),e("button",{onclick:"showSituationQuestionnaire('changement-poste')",class:"p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-exchange-alt text-2xl mb-2"}),e("div",{class:"font-bold",children:"Changement de poste"}),e("div",{class:"text-sm opacity-90",children:"Mutation interne vers un nouveau métier"})]}),e("button",{onclick:"showSituationQuestionnaire('changement-site')",class:"p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-building text-2xl mb-2"}),e("div",{class:"font-bold",children:"Changement de site"}),e("div",{class:"text-sm opacity-90",children:"Transfert depuis un autre site GXO"})]}),e("button",{onclick:"showSituationQuestionnaire('retour-conge')",class:"p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-calendar-check text-2xl mb-2"}),e("div",{class:"font-bold",children:"Retour après absence"}),e("div",{class:"text-sm opacity-90",children:"Retour après congé longue durée ou arrêt"})]}),e("button",{onclick:"showSituationQuestionnaire('interim')",class:"p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-clock text-2xl mb-2"}),e("div",{class:"font-bold",children:"Intérimaire / CDD"}),e("div",{class:"text-sm opacity-90",children:"Mission temporaire sur le site"})]}),e("button",{onclick:"showSituationQuestionnaire('formation')",class:"p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-graduation-cap text-2xl mb-2"}),e("div",{class:"font-bold",children:"Formation / Montée en compétence"}),e("div",{class:"text-sm opacity-90",children:"Apprentissage d'un nouveau processus"})]})]})]}),e("div",{id:"situation-questionnaire",class:"hidden bg-white rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-clipboard-list mr-2 text-pink-500"}),e("span",{id:"questionnaire-title",children:"Profil et compétences"})]}),e("button",{onclick:"resetQuestionnaire()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-arrow-left mr-1"}),"Retour"]})]}),e("div",{id:"question-poste",class:"mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-3",children:[e("i",{class:"fas fa-briefcase mr-2 text-blue-500"}),"Quel poste allez-vous occuper ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",children:[e("button",{onclick:"selectPoste('reception')",class:"p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-orange-300",children:[e("i",{class:"fas fa-truck-loading text-orange-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Réception"})]}),e("button",{onclick:"selectPoste('agent-quai')",class:"p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-yellow-300",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Agent de Quai"})]}),e("button",{onclick:"selectPoste('controleur')",class:"p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-green-300",children:[e("i",{class:"fas fa-clipboard-check text-green-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Contrôleur"})]}),e("button",{onclick:"selectPoste('administrateur')",class:"p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-purple-300",children:[e("i",{class:"fas fa-user-tie text-purple-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Administrateur"})]}),e("button",{onclick:"selectPoste('accueil-chauffeur')",class:"p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-blue-300",children:[e("i",{class:"fas fa-truck text-blue-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Accueil Chauffeur"})]}),e("button",{onclick:"selectPoste('autre')",class:"p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-gray-300",children:[e("i",{class:"fas fa-ellipsis-h text-gray-500 mr-2"}),e("span",{class:"font-semibold text-gray-800",children:"Autre"})]})]})]}),e("div",{id:"question-experience",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-3",children:[e("i",{class:"fas fa-history mr-2 text-green-500"}),"Quelle est votre expérience dans la logistique ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("button",{onclick:"selectExperience('aucune')",class:"p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-red-300",children:[e("div",{class:"font-bold text-gray-800",children:"Aucune expérience"}),e("div",{class:"text-sm text-gray-600",children:"Première expérience en logistique"})]}),e("button",{onclick:"selectExperience('debutant')",class:"p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-orange-300",children:[e("div",{class:"font-bold text-gray-800",children:"Débutant (moins d'1 an)"}),e("div",{class:"text-sm text-gray-600",children:"Quelques mois d'expérience"})]}),e("button",{onclick:"selectExperience('intermediaire')",class:"p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-blue-300",children:[e("div",{class:"font-bold text-gray-800",children:"Intermédiaire (1-3 ans)"}),e("div",{class:"text-sm text-gray-600",children:"Bonne connaissance du secteur"})]}),e("button",{onclick:"selectExperience('experimente')",class:"p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-green-300",children:[e("div",{class:"font-bold text-gray-800",children:"Expérimenté (3+ ans)"}),e("div",{class:"text-sm text-gray-600",children:"Expertise confirmée"})]})]})]}),e("div",{id:"question-competences",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-3",children:[e("i",{class:"fas fa-check-circle mr-2 text-purple-500"}),"Quelles compétences possédez-vous déjà ?"]}),e("div",{class:"text-sm text-gray-600 mb-3",children:[e("i",{class:"fas fa-info-circle mr-1"}),"Sélectionnez toutes les compétences que vous maîtrisez"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"sap"}),e("i",{class:"fas fa-desktop text-blue-500 mr-2"}),e("span",{children:"SAP / S4HANA"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"rf"}),e("i",{class:"fas fa-mobile-alt text-green-500 mr-2"}),e("span",{children:"Terminal RF / Scanner"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"caces"}),e("i",{class:"fas fa-forklift text-orange-500 mr-2"}),e("span",{children:"CACES (Chariot élévateur)"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"controle"}),e("i",{class:"fas fa-clipboard-check text-purple-500 mr-2"}),e("span",{children:"Contrôle qualité"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"admin"}),e("i",{class:"fas fa-file-alt text-indigo-500 mr-2"}),e("span",{children:"Gestion administrative"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e("input",{type:"checkbox",class:"competence-checkbox mr-3",value:"securite"}),e("i",{class:"fas fa-shield-alt text-red-500 mr-2"}),e("span",{children:"Sécurité / EPI"})]})]}),e("button",{onclick:"validateCompetences()",class:"mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-arrow-right mr-2"}),"Voir mes formations recommandées"]})]})]}),e("div",{id:"formations-recommandees",class:"hidden bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-graduation-cap mr-2 text-green-500"}),"Vos formations recommandées"]}),e("button",{onclick:"resetQuestionnaire()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-redo mr-1"}),"Recommencer"]})]}),e("div",{class:"bg-white rounded-lg p-4 mb-4",children:[e("h4",{class:"font-semibold text-gray-800 mb-2",children:[e("i",{class:"fas fa-user mr-2 text-blue-500"}),"Votre profil"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-3 text-sm",children:[e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-briefcase text-orange-500 mr-2"}),e("span",{children:[e("strong",{children:"Poste :"})," ",e("span",{id:"profil-poste"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-history text-green-500 mr-2"}),e("span",{children:[e("strong",{children:"Expérience :"})," ",e("span",{id:"profil-experience"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-check-circle text-purple-500 mr-2"}),e("span",{children:[e("strong",{children:"Compétences :"})," ",e("span",{id:"profil-competences"})]})]})]})]}),e("div",{id:"formations-list",class:"space-y-3"}),e("div",{class:"mt-6 grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("a",{href:"/bibliotheque",class:"flex items-center justify-center p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-book mr-2"}),"Consulter la bibliothèque"]}),e("a",{href:"/contacts",class:"flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-phone mr-2"}),"Contacter un responsable"]})]})]}),e("div",{id:"metier-selection-step",class:"hidden bg-white rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-briefcase mr-2 text-pink-500"}),"Étape 1 : Quel est votre métier ?"]}),e("button",{onclick:"resetOnboarding()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-redo mr-1"}),"Recommencer"]})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[e("button",{onclick:"selectMetier('reception')",class:"p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-orange-200",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Réception"}),e("div",{class:"text-sm text-gray-600",children:"Déchargement et contrôle"})]}),e("button",{onclick:"selectMetier('agent-quai')",class:"p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-yellow-200",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Agent de Quai"}),e("div",{class:"text-sm text-gray-600",children:"Opérations de quai"})]}),e("button",{onclick:"selectMetier('controleur')",class:"p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-green-200",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Contrôleur"}),e("div",{class:"text-sm text-gray-600",children:"Contrôle qualité"})]}),e("button",{onclick:"selectMetier('administrateur')",class:"p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-purple-200",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Administrateur"}),e("div",{class:"text-sm text-gray-600",children:"Gestion administrative"})]}),e("button",{onclick:"selectMetier('accueil-chauffeur')",class:"p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-blue-200",children:[e("i",{class:"fas fa-truck text-blue-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Accueil Chauffeur"}),e("div",{class:"text-sm text-gray-600",children:"Arrivée et livraison"})]}),e("button",{onclick:"selectMetier('autre')",class:"p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-gray-200",children:[e("i",{class:"fas fa-ellipsis-h text-gray-500 text-2xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Autre métier"}),e("div",{class:"text-sm text-gray-600",children:"Support, maintenance..."})]})]})]}),e("div",{id:"formation-selection-step",class:"hidden bg-white rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-graduation-cap mr-2 text-pink-500"}),"Étape 2 : Quelle formation souhaitez-vous ?"]}),e("button",{onclick:"backToMetierSelection()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-arrow-left mr-1"}),"Retour"]})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("button",{onclick:"selectFormation('initiale')",class:"p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-book-open text-2xl mb-2"}),e("div",{class:"font-bold",children:"Formation initiale"}),e("div",{class:"text-sm opacity-90",children:"Apprendre les bases du métier"})]}),e("button",{onclick:"selectFormation('perfectionnement')",class:"p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-chart-line text-2xl mb-2"}),e("div",{class:"font-bold",children:"Perfectionnement"}),e("div",{class:"text-sm opacity-90",children:"Approfondir mes compétences"})]}),e("button",{onclick:"selectFormation('recyclage')",class:"p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-sync-alt text-2xl mb-2"}),e("div",{class:"font-bold",children:"Recyclage"}),e("div",{class:"text-sm opacity-90",children:"Mise à jour des procédures"})]}),e("button",{onclick:"selectFormation('caces')",class:"p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-forklift text-2xl mb-2"}),e("div",{class:"font-bold",children:"CACES / Habilitations"}),e("div",{class:"text-sm opacity-90",children:"Certifications réglementaires"})]}),e("button",{onclick:"selectFormation('securite')",class:"p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-shield-alt text-2xl mb-2"}),e("div",{class:"font-bold",children:"Sécurité"}),e("div",{class:"text-sm opacity-90",children:"EPI, gestes et postures, incendie"})]}),e("button",{onclick:"selectFormation('systeme')",class:"p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-left",children:[e("i",{class:"fas fa-desktop text-2xl mb-2"}),e("div",{class:"font-bold",children:"Systèmes informatiques"}),e("div",{class:"text-sm opacity-90",children:"SAP, WMS, terminal RF"})]})]})]}),e("div",{id:"final-result",class:"hidden bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-md",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("h3",{class:"text-lg font-bold text-gray-800",children:[e("i",{class:"fas fa-check-circle mr-2 text-green-500"}),"Votre parcours de formation personnalisé"]}),e("button",{onclick:"resetOnboarding()",class:"text-sm text-gray-500 hover:text-gray-700",children:[e("i",{class:"fas fa-redo mr-1"}),"Recommencer"]})]}),e("div",{id:"final-content",class:"space-y-4"})]})]})]}),e("div",{id:"metier-selection",class:"hidden mb-8",children:e("div",{class:"bg-white rounded-lg p-6 shadow-md",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-4",children:[e("i",{class:"fas fa-briefcase mr-2 text-pink-500"}),"Quel est votre métier ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e("button",{onclick:"showMetierPath('reception')",class:"p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-orange-200",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Réception"}),e("div",{class:"text-sm text-gray-600",children:"Déchargement et contrôle"})]}),e("button",{onclick:"showMetierPath('agent-quai')",class:"p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-yellow-200",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Agent de Quai"}),e("div",{class:"text-sm text-gray-600",children:"Opérations quai"})]}),e("button",{onclick:"showMetierPath('controleur')",class:"p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-green-200",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Contrôleur"}),e("div",{class:"text-sm text-gray-600",children:"Contrôle qualité"})]}),e("button",{onclick:"showMetierPath('administrateur')",class:"p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-purple-200",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Administrateur"}),e("div",{class:"text-sm text-gray-600",children:"Support et coordination"})]}),e("button",{onclick:"showMetierPath('accueil-chauffeur')",class:"p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-blue-200",children:[e("i",{class:"fas fa-truck text-blue-500 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Accueil Chauffeur"}),e("div",{class:"text-sm text-gray-600",children:"Arrivée et livraison"})]}),e("button",{onclick:"showMetierPath('chef')",class:"p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors border-2 border-indigo-200",children:[e("i",{class:"fas fa-user-cog text-indigo-600 text-xl mb-2"}),e("div",{class:"font-bold text-gray-800",children:"Chef d'équipe"}),e("div",{class:"text-sm text-gray-600",children:"Management terrain"})]})]})]})}),e("div",{class:"grid grid-cols-1 gap-6 mb-8",children:[e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"1"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Sécurité et EPI"}),e("ul",{class:"space-y-2 text-gray-600",children:[e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Port du casque et chaussures de sécurité OBLIGATOIRE dans toutes les zones"})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Gilet haute visibilité à porter en permanence"})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Localiser les issues de secours et points de rassemblement"})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-check-circle text-green-500 mr-2 mt-1"}),e("span",{children:"Connaître les numéros d'urgence : Secours (15), Sécurité interne (poste 999)"})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"2"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Comprendre le site"}),e("ul",{class:"space-y-2 text-gray-600",children:[e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Réception :"})," Quais 1-30, déchargement camions"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Stockage :"})," Allées A à Z, stockage palettes"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Hazardous :"})," Zone rouge, produits dangereux (accès restreint)"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-map-marker-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Zone Expédition :"})," Quais 50-80, chargement camions"]})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"3"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Premiers gestes métiers"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3 mt-4",children:[e("a",{href:"/agent-quai",class:"flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Agent de Quai"})]}),e("a",{href:"/controleur",class:"flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Contrôleur"})]}),e("a",{href:"/administrateur",class:"flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Administrateur"})]}),e("a",{href:"/accueil-chauffeur",class:"flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors",children:[e("i",{class:"fas fa-truck text-blue-500 text-xl mr-3"}),e("span",{class:"font-semibold text-gray-700",children:"Accueil Chauffeur"})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"4"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Utiliser les outils"}),e("ul",{class:"space-y-2 text-gray-600",children:[e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-mobile-alt text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Terminal RF :"})," Scanner codes-barres, confirmer actions"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-desktop text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"SAP / S4HANA :"})," Système de gestion (formation requise)"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-globe text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Portail Action :"})," Appointments et tracking"]})]}),e("li",{class:"flex items-start",children:[e("i",{class:"fas fa-book text-orange-500 mr-2 mt-1"}),e("span",{children:[e("strong",{children:"Cet intranet :"})," Toutes les procédures en un clic !"]})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500",children:e("div",{class:"flex items-start",children:[e("div",{class:"bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0",children:"5"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-xl font-bold text-gray-800 mb-3",children:"Qui contacter ?"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3 mt-4",children:[e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"Chef d'équipe"}),e("div",{class:"text-sm text-gray-600",children:"Questions quotidiennes et support terrain"})]}),e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"RH"}),e("div",{class:"text-sm text-gray-600",children:"Contrat, planning, congés"})]}),e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"Sécurité"}),e("div",{class:"text-sm text-gray-600",children:"Incidents, EPI, formations sécurité"})]}),e("div",{class:"p-3 bg-gray-50 rounded-lg",children:[e("div",{class:"font-semibold text-gray-800 mb-1",children:"IT Support"}),e("div",{class:"text-sm text-gray-600",children:"Problèmes terminal, PC, accès systèmes"})]})]})]})]})})]}),e("div",{class:"bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 text-center",children:[e("i",{class:"fas fa-thumbs-up text-5xl mb-4"}),e("h2",{class:"text-2xl font-bold mb-3",children:"Vous êtes prêt(e) !"}),e("p",{class:"text-lg opacity-90 mb-6",children:"N'hésitez pas à consulter cet intranet à tout moment pour retrouver une procédure."}),e("a",{href:"/",class:"inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour à l'accueil"]})]}),e("div",{id:"questionnaire-modal",class:"hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",onclick:"closeQuestionnaireModal(event)",children:e("div",{class:"bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",onclick:"event.stopPropagation()",children:[e("div",{id:"modal-header",class:"sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-lg",children:e("div",{class:"flex items-center justify-between",children:[e("h3",{class:"text-2xl font-bold",children:[e("i",{class:"fas fa-clipboard-list mr-3"}),e("span",{id:"modal-questionnaire-title",children:"Questionnaire de formation"})]}),e("button",{onclick:"closeQuestionnaireModal()",class:"text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all",children:e("i",{class:"fas fa-times text-2xl"})})]})}),e("div",{class:"p-6",children:[e("div",{id:"modal-question-poste",class:"mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-briefcase mr-2 text-blue-500"}),"Question 1/3 : Quel poste allez-vous occuper ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",children:[e("button",{onclick:"selectPosteModal('reception')",class:"p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-orange-500 hover:shadow-md",children:[e("i",{class:"fas fa-truck-loading text-orange-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Réception"}),e("div",{class:"text-sm text-gray-600",children:"Déchargement et contrôle"})]}),e("button",{onclick:"selectPosteModal('agent-quai')",class:"p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-yellow-500 hover:shadow-md",children:[e("i",{class:"fas fa-hard-hat text-yellow-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Agent de Quai"}),e("div",{class:"text-sm text-gray-600",children:"Opérations de quai"})]}),e("button",{onclick:"selectPosteModal('controleur')",class:"p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-green-500 hover:shadow-md",children:[e("i",{class:"fas fa-clipboard-check text-green-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Contrôleur"}),e("div",{class:"text-sm text-gray-600",children:"Contrôle qualité"})]}),e("button",{onclick:"selectPosteModal('administrateur')",class:"p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-purple-500 hover:shadow-md",children:[e("i",{class:"fas fa-user-tie text-purple-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Administrateur"}),e("div",{class:"text-sm text-gray-600",children:"Gestion administrative"})]}),e("button",{onclick:"selectPosteModal('accueil-chauffeur')",class:"p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-blue-500 hover:shadow-md",children:[e("i",{class:"fas fa-truck text-blue-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Accueil Chauffeur"}),e("div",{class:"text-sm text-gray-600",children:"Accueil et livraison"})]}),e("button",{onclick:"selectPosteModal('autre')",class:"p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-gray-500 hover:shadow-md",children:[e("i",{class:"fas fa-ellipsis-h text-gray-500 text-2xl mb-2"}),e("div",{class:"font-semibold text-gray-800",children:"Autre"}),e("div",{class:"text-sm text-gray-600",children:"Autres postes"})]})]})]}),e("div",{id:"modal-question-experience",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-history mr-2 text-green-500"}),"Question 2/3 : Quelle est votre expérience dans la logistique ?"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("button",{onclick:"selectExperienceModal('aucune')",class:"p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-red-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Aucune expérience"}),e("div",{class:"text-sm text-gray-600",children:"Première expérience en logistique"})]}),e("button",{onclick:"selectExperienceModal('debutant')",class:"p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-orange-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Débutant (moins d'1 an)"}),e("div",{class:"text-sm text-gray-600",children:"Quelques mois d'expérience"})]}),e("button",{onclick:"selectExperienceModal('intermediaire')",class:"p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-blue-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Intermédiaire (1-3 ans)"}),e("div",{class:"text-sm text-gray-600",children:"Bonne connaissance du secteur"})]}),e("button",{onclick:"selectExperienceModal('experimente')",class:"p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg text-left transition-all border-2 border-transparent hover:border-green-500 hover:shadow-md",children:[e("div",{class:"font-bold text-gray-800",children:"Expérimenté (3+ ans)"}),e("div",{class:"text-sm text-gray-600",children:"Expertise confirmée"})]})]})]}),e("div",{id:"modal-question-competences",class:"hidden mb-6",children:[e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-check-circle mr-2 text-purple-500"}),"Question 3/3 : Quelles compétences possédez-vous déjà ?"]}),e("div",{class:"text-sm text-gray-600 mb-3",children:[e("i",{class:"fas fa-info-circle mr-1"}),"Sélectionnez toutes les compétences que vous maîtrisez"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"sap"}),e("i",{class:"fas fa-desktop text-blue-500 mr-2"}),e("span",{children:"SAP / S4HANA"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"rf"}),e("i",{class:"fas fa-mobile-alt text-green-500 mr-2"}),e("span",{children:"Terminal RF / Scanner"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"caces"}),e("i",{class:"fas fa-forklift text-orange-500 mr-2"}),e("span",{children:"CACES (Chariot élévateur)"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"controle"}),e("i",{class:"fas fa-clipboard-check text-purple-500 mr-2"}),e("span",{children:"Contrôle qualité"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"admin"}),e("i",{class:"fas fa-file-alt text-indigo-500 mr-2"}),e("span",{children:"Gestion administrative"})]}),e("label",{class:"flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors",children:[e("input",{type:"checkbox",class:"modal-competence-checkbox mr-3",value:"securite"}),e("i",{class:"fas fa-shield-alt text-red-500 mr-2"}),e("span",{children:"Sécurité / EPI"})]})]}),e("button",{onclick:"validateCompetencesModal()",class:"mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg",children:[e("i",{class:"fas fa-arrow-right mr-2"}),"Voir mes formations recommandées"]})]}),e("div",{id:"modal-formations-recommandees",class:"hidden",children:[e("div",{class:"bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-4",children:[e("h4",{class:"font-semibold text-gray-800 mb-3 text-lg",children:[e("i",{class:"fas fa-user mr-2 text-blue-500"}),"Votre profil"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-3 text-sm",children:[e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-briefcase text-orange-500 mr-2"}),e("span",{children:[e("strong",{children:"Poste :"})," ",e("span",{id:"modal-profil-poste"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-history text-green-500 mr-2"}),e("span",{children:[e("strong",{children:"Expérience :"})," ",e("span",{id:"modal-profil-experience"})]})]}),e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-check-circle text-purple-500 mr-2"}),e("span",{children:[e("strong",{children:"Compétences :"})," ",e("span",{id:"modal-profil-competences"})]})]})]})]}),e("h4",{class:"font-semibold text-gray-800 mb-4 text-lg",children:[e("i",{class:"fas fa-graduation-cap mr-2 text-green-500"}),"Vos formations recommandées"]}),e("div",{id:"modal-formations-list",class:"space-y-3 mb-6"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e("a",{href:"/bibliotheque",class:"flex items-center justify-center p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-book mr-2"}),"Consulter la bibliothèque"]}),e("a",{href:"/contacts",class:"flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all",children:[e("i",{class:"fas fa-phone mr-2"}),"Contacter un responsable"]})]})]})]})]})})]})}function _i(){const t=[{id:"retour-fournisseur",title:"Retour fournisseur",icon:"fa-undo",level:"🔴",document:"RETOUR FOURNISSEUR.docx",description:"Procédure complète pour gérer un retour marchandise vers le fournisseur"},{id:"decision-tree-broken",title:"Produits cassés/expirés",icon:"fa-exclamation-triangle",level:"🔴",document:"0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf",description:"Arbre de décision pour gérer les produits endommagés ou périmés"},{id:"mail-fournisseur",title:"Contact fournisseur (retard/absence)",icon:"fa-envelope",level:"🟢",document:"Mail fournisseur.docx",description:"Modèle de mail pour informer un fournisseur en cas de retard ou no-show"}],r=[{question:"Le film de la palette est déchiré",reponse:"Zone quarantaine → Prise de photo → Signalement au chef d'équipe → Ne pas mettre en stock",urgence:"high"},{question:"Écart quantité entre BL et réception physique",reponse:"1. Vérifier BL → 2. Compter à nouveau → 3. Si surplus : fichier GDS pour re-contrôle → 4. Si manco : signalement Invoice Moissy sous 48h",urgence:"high"},{question:"Produit avec BBD expiré",reponse:"Ne PAS accepter → Faire signer le BL par le chauffeur → Photo obligatoire → Créer return line (ME22N) → Stock Control change type de stock en B2",urgence:"high"},{question:"Camion en retard (> 2h)",reponse:'Vérifier portail → Si no-show : demander au fournisseur de rebooker via portal Action → Envoyer mail type "Mail fournisseur.docx"',urgence:"medium"},{question:"Étiquette illisible ou manquante",reponse:"Vérifier BL pour retrouver info → Rééditer étiquette via HU dans MON → Imprimer sur imprimante contrôleur ou bureau",urgence:"medium"},{question:'TU bloqué en statut "Active"',reponse:"Transaction EWM → MON → Transport Unit Overview → Filtrer date J-1 → Vérifier articles/HU/statut → Action : Unload + Finish unloading → Ou : Arrival + Departure",urgence:"medium"},{question:"Palette hazardous non signalée",reponse:"STOP immédiat → Isoler la palette → Vérifier fiche sécurité → Apposer signalétique hazardous → Ranger uniquement en zone T220/T120 → Informer chef d'équipe",urgence:"high"},{question:"Produit non référencé dans le système",reponse:"Vérifier code article sur BL → Chercher dans MAT1 → Si inexistant : contacter Order Planning → Créer conditionnement via ZMM42 si nécessaire",urgence:"medium"}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("h1",{class:"text-4xl font-bold mb-3",children:[e("i",{class:"fas fa-exclamation-circle mr-3"}),"Anomalies & FAQ"]}),e("p",{class:"text-xl opacity-90",children:"Gestion incidents, litiges, arbres de décision"})]}),e("a",{href:"/",class:"bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"mb-12",children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-folder-open mr-3 text-red-500"}),"Procédures anomalies"]}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:t.map(s=>e("div",{id:s.id,class:"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",children:[e("div",{class:"bg-gradient-to-r from-red-500 to-red-600 text-white p-4",children:[e("div",{class:"flex items-center mb-2",children:[e("div",{class:"flex flex-col items-center mr-4",children:[e("i",{class:`fas ${s.icon} text-3xl mb-2`}),e("div",{class:"flex gap-1 cursor-pointer",onclick:`showReviewModal('${s.id}', '${s.title}')`,title:"Cliquez pour donner votre avis",children:e("span",{class:"star-display text-yellow-300 hover:text-yellow-400 transition-colors","data-procedure-id":s.id,children:"☆☆☆☆☆"})}),e("div",{class:"text-xs mt-1 opacity-75","data-procedure-rating":s.id,children:"Pas encore noté"})]}),e("h3",{class:"text-xl font-bold flex-1",children:s.title})]}),e("div",{class:"text-sm opacity-90",children:["Niveau ",s.level]})]}),e("div",{class:"p-6",children:[e("p",{class:"text-gray-600 text-sm mb-4",children:s.description}),e("a",{href:`/static/documents/${s.document}`,target:"_blank",class:"gxo-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 flex items-center justify-center w-full",children:[e("i",{class:"fas fa-file-download mr-2"}),"Voir la procédure"]})]})]}))})]}),e("div",{children:[e("h2",{class:"text-2xl font-bold text-gray-800 mb-6 flex items-center",children:[e("i",{class:"fas fa-question-circle mr-3 text-orange-500"}),"FAQ - Que faire si..."]}),e("div",{class:"space-y-4",children:r.map((s,i)=>e("div",{class:"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",children:[e("button",{onclick:`toggleFaq(${i})`,class:"w-full text-left p-6 flex items-start justify-between hover:bg-gray-50 transition-colors",children:[e("div",{class:"flex-1 flex items-start",children:[s.urgence==="high"&&e("i",{class:"fas fa-exclamation-triangle text-red-500 text-xl mr-4 mt-1"}),s.urgence==="medium"&&e("i",{class:"fas fa-info-circle text-orange-500 text-xl mr-4 mt-1"}),e("div",{children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-1",children:s.question}),s.urgence==="high"&&e("span",{class:"inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold",children:"URGENT"})]})]}),e("i",{class:"fas fa-chevron-down text-gray-400 text-xl ml-4 transition-transform",id:`faq-icon-${i}`})]}),e("div",{id:`faq-content-${i}`,class:"hidden p-6 pt-0 border-t border-gray-100",children:e("div",{class:"bg-orange-50 rounded-lg p-4",children:[e("h4",{class:"font-semibold text-blue-800 mb-2 flex items-center",children:[e("i",{class:"fas fa-arrow-right mr-2"}),"Solution"]}),e("p",{class:"text-gray-700 whitespace-pre-line",children:s.reponse})]})})]}))})]}),e("div",{class:"mt-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8",children:[e("h2",{class:"text-2xl font-bold mb-4 flex items-center",children:[e("i",{class:"fas fa-phone-alt mr-3"}),"En cas d'urgence"]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e("div",{class:"bg-white bg-opacity-20 rounded-lg p-4",children:[e("div",{class:"text-3xl font-bold mb-1",children:"15"}),e("div",{class:"text-sm opacity-90",children:"SAMU / Urgences médicales"})]}),e("div",{class:"bg-white bg-opacity-20 rounded-lg p-4",children:[e("div",{class:"text-3xl font-bold mb-1",children:"18"}),e("div",{class:"text-sm opacity-90",children:"Pompiers"})]}),e("div",{class:"bg-white bg-opacity-20 rounded-lg p-4",children:[e("div",{class:"text-3xl font-bold mb-1",children:"999"}),e("div",{class:"text-sm opacity-90",children:"Sécurité interne GXO"})]})]})]})]})}function Ri(){const t=[{id:1,name:"EWM Procédures Goods Receipt (Manuel Complet)",file:"EWM Procedure document - 01. Goods Receipt - FR.pdf",category:"Réception",type:"pdf",description:"Document de procédure EWM complet pour la réception des marchandises - Enregistrement trucks, inspection, contrôle qualité, flux marchandises",keywords:"EWM, goods receipt, réception, trucks, quai, inspection, contrôle qualité, SAP, manuel, procédures complètes",level:"🔴"},{id:3,name:"Assigner camion à quai",file:"Assigner camion à quai-2.docx",category:"Réception",type:"docx",description:"Procédure d'assignation de camion aux quais de déchargement",keywords:"camion, quai, assignation, réception",level:"🟢"},{id:3,name:"Clôture livraison",file:"cloture livraison new.docx",category:"Réception",type:"docx",description:"Procédure de clôture de livraison dans le système",keywords:"clôture, livraison, réception",level:"🟢"},{id:3,name:"Clôture TU actif",file:"Cloture TU actif.docx",category:"Réception",type:"docx",description:"Clôture des unités de transport actives",keywords:"TU, clôture, transport",level:"🟡"},{id:34,name:"Créer TU",file:"Créer TU.docx",category:"Réception",type:"docx",description:"Création d'une unité de transport dans SAP",keywords:"TU, création, SAP",level:"🟢"},{id:5,name:"Fermer une porte de quai",file:"Fermer une porte de quai.docx",category:"Réception",type:"docx",description:"Procédure de fermeture d'une porte de quai",keywords:"quai, porte, fermeture",level:"🟢"},{id:6,name:"Mail fournisseur",file:"Mail fournisseur.docx",category:"Réception",type:"docx",description:"Modèle de communication avec les fournisseurs",keywords:"mail, fournisseur, communication",level:"🟢"},{id:7,name:"Vérification dossier après contrôle",file:"Verification dossier aprés control.docx",category:"Réception",type:"docx",description:"Vérification du dossier après contrôle qualité",keywords:"vérification, contrôle, dossier",level:"🟡"},{id:8,name:"Fausses étiquettes",file:"Fausses  étiquettes.docx",category:"Réception",type:"docx",description:"Procédure de gestion des fausses étiquettes",keywords:"étiquettes, impression, réception",level:"🟢"},{id:9,name:"Fausses étiquettes date du jour",file:"Fausses  étiquettes date du jour .docx",category:"Réception",type:"docx",description:"Impression d'étiquettes avec date du jour",keywords:"étiquettes, date, impression",level:"🟢"},{id:10,name:"Rééditer une étiquette",file:"Réediter une étiquette.docx",category:"Réception",type:"docx",description:"Réimpression d'une étiquette existante",keywords:"étiquette, réédition, impression",level:"🟢"},{id:11,name:"Affectation de tâche dans LTRMS",file:"Affectation de tache a un cariste dans le LTRMS.docx",category:"Accueil Chauffeur",type:"docx",description:"Affectation d'une tâche à un cariste via LTRMS",keywords:"LTRMS, tâche, affectation, cariste",level:"🟢"},{id:12,name:"Annuler une tâche affectée",file:"Annuler une tache affecter.docx",category:"Accueil Chauffeur",type:"docx",description:"Procédure d'annulation d'une tâche affectée",keywords:"annulation, tâche, LTRMS",level:"🟡"},{id:13,name:"Connexion terminal",file:"CONNECTION.docx",category:"Accueil Chauffeur",type:"docx",description:"Connexion et déconnexion au terminal cariste",keywords:"connexion, terminal, cariste",level:"🟢"},{id:14,name:"Priorisation de tâches LTRMS",file:"Priorisation de taches dans le LTRMS.docx",category:"Accueil Chauffeur",type:"docx",description:"Gestion des priorités de tâches dans LTRMS",keywords:"priorisation, LTRMS, tâche",level:"🟡"},{id:15,name:"Sortir une tâche du LTRA",file:"Sortir une tache du LTRA.docx",category:"Accueil Chauffeur",type:"docx",description:"Extraction d'une tâche du système LTRA",keywords:"LTRA, tâche, extraction",level:"🟡"},{id:16,name:"Visualisation des stocks LS03N",file:"Visualisation des stocks LS03N.docx",category:"Accueil Chauffeur",type:"docx",description:"Consultation des stocks via transaction LS03N",keywords:"LS03N, stocks, SAP",level:"🟢"},{id:17,name:"Relancer tâche cariste",file:"relancer tache cariste.docx",category:"Accueil Chauffeur",type:"docx",description:"Relance d'une tâche cariste bloquée",keywords:"relance, tâche, cariste",level:"🟡"},{id:18,name:"Passation des anomalies",file:"Passation des anomalies.xlsx",category:"Accueil Chauffeur",type:"xlsx",description:"Fichier de suivi des anomalies et passation",keywords:"anomalies, passation, suivi",level:"🟡"},{id:19,name:"Workload planning",file:"workload.xltm",category:"Accueil Chauffeur",type:"xltm",description:"Template Excel de planification de charge de travail",keywords:"workload, planning, charge",level:"🟡"},{id:20,name:"Cartons vides Dernier Prélèvement",file:"Cartons vides Dernier Prelevement_1.docx",category:"Administrateur",type:"docx",description:"Transaction LT24 - Dernier prélèvement",keywords:"LT24, prélèvement, cartons",level:"🟢"},{id:21,name:"Écart premier/dernier prélèvement",file:"Ecart premier dernier prélèvement_1.docx",category:"Administrateur",type:"docx",description:"Analyse des écarts de prélèvement",keywords:"écart, prélèvement, analyse",level:"🟡"},{id:22,name:"Quai fictif - Affichage",file:"Quai fictif - Affichage_1.docx",category:"Administrateur",type:"docx",description:"Localisation et utilisation du quai fictif 91A",keywords:"quai fictif, affichage, zone",level:"🟢"},{id:23,name:"Process Monteur de Rolls",file:"Process Monteur de Rolls.docx",category:"Administrateur",type:"docx",description:"Procédure de montage des rolls",keywords:"rolls, montage, préparation",level:"🟢"},{id:24,name:"Création conditionnement PRD",file:"CREATION CONDITTIONNEMENT PRD .docx",category:"Réception",type:"docx",description:"Création de conditionnement produit",keywords:"conditionnement, PRD, création",level:"🟡"},{id:26,name:"Créer packspeck",file:"Créer packspeck.docx",category:"Réception",type:"docx",description:"Création d'un packspeck dans le système",keywords:"packspeck, création, système",level:"🟡"},{id:27,name:"EOP checks",file:"EOP checks.docx",category:"Réception",type:"docx",description:"Contrôles de fin de production (End Of Production)",keywords:"EOP, contrôle, production",level:"🟢"},{id:28,name:"Extraction ICPE",file:"EXTRACTION ICPE.docx",category:"Réception",type:"docx",description:"Extraction de données ICPE",keywords:"ICPE, extraction, données",level:"🟡"},{id:29,name:"Étêtage et container",file:"Mettre en forme et renseigner le fichier étêtage et container.docx",category:"Réception",type:"docx",description:"Renseignement du fichier étêtage et container",keywords:"étêtage, container, fichier",level:"🟡"},{id:30,name:"Retour fournisseur",file:"RETOUR FOURNISSEUR.docx",category:"Anomalies",type:"docx",description:"Procédure de retour marchandises au fournisseur",keywords:"retour, fournisseur, marchandises",level:"🟡"},{id:30,name:"Decision tree produits cassés/expirés",file:"0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf",category:"Anomalies",type:"pdf",description:"Arbre de décision pour produits cassés ou expirés",keywords:"decision tree, cassés, expirés, anomalies",level:"🔴"},{id:31,name:"Assigner camion à quai",file:"Assigner camion à quai-2.docx",category:"Agent de Quai",type:"docx",description:"Procédure d'assignation de camion aux quais de déchargement",keywords:"camion, quai, assignation, réception",level:"🟢"},{id:32,name:"Fermer une porte de quai",file:"Fermer une porte de quai.docx",category:"Agent de Quai",type:"docx",description:"Procédure de fermeture d'une porte de quai",keywords:"quai, porte, fermeture",level:"🟢"},{id:33,name:"Déchargement camion",file:"Assigner camion à quai-2.docx",category:"Agent de Quai",type:"docx",description:"Procédure de déchargement des camions",keywords:"déchargement, camion, quai",level:"🟢"},{id:34,name:"Contrôle qualité réception",file:"Verification dossier aprés control.docx",category:"Agent de Quai",type:"docx",description:"Vérification du dossier après contrôle qualité",keywords:"vérification, contrôle, dossier",level:"🟡"},{id:35,name:"Gestion des palettes",file:"Créer TU.docx",category:"Agent de Quai",type:"docx",description:"Création et gestion des unités de transport",keywords:"palette, TU, transport",level:"🟢"},{id:36,name:"Clôture livraison",file:"cloture livraison new.docx",category:"Agent de Quai",type:"docx",description:"Procédure de clôture de livraison dans le système",keywords:"clôture, livraison, réception",level:"🟢"},{id:37,name:"Rappel petits contenants PAPREC/BIONERVAL",file:"Rappel des petits contenants installés par PAPREC ou BIONERVAL.docx",category:"Contrôleur",type:"docx",description:"Collecte biodéchets (9 palboxs rouges) et déchets spéciaux",keywords:"PAPREC, BIONERVAL, biodéchets, palbox, collecte",level:"🟢"},{id:32,name:"Clôture livraison retour",file:"cloture livraison new.docx",category:"Contrôleur",type:"docx",description:"Clôture de livraison retour via portail ASN",keywords:"clôture, livraison, retour, ASN, reject",level:"🟢"},{id:33,name:"Procédure transfert roll",file:"procédure transfert.docx",category:"Contrôleur",type:"docx",description:"Transfert de rolls via TRM Manipulation (RET_PICK_01)",keywords:"transfert, roll, TRM, RET_PICK_01, manipulation",level:"🟡"}];return e("div",{children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white rounded-lg shadow-xl p-8 mb-8",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("i",{class:"fas fa-folder-open text-5xl"}),e("div",{children:[e("h1",{class:"text-4xl font-bold mb-2",children:"Bibliothèque de Documents"}),e("p",{class:"text-xl opacity-90",children:[t.length," documents disponibles • Classés par rubrique"]})]})]}),e("a",{href:"/",class:"bg-white text-[#FF4500] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors",children:[e("i",{class:"fas fa-home mr-2"}),"Retour"]})]})}),e("div",{class:"bg-white rounded-lg shadow-lg p-6 mb-8",children:[e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"flex-1 relative",children:[e("i",{class:"fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"}),e("input",{type:"text",id:"search-input",placeholder:"Rechercher un document (nom, catégorie, mots-clés)...",class:"w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none",onkeyup:"filterDocuments()"})]}),e("button",{onclick:"clearSearch()",class:"bg-gray-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors",children:[e("i",{class:"fas fa-times mr-2"}),"Effacer"]})]}),e("div",{class:"mt-4 flex flex-wrap gap-2",children:[e("button",{onclick:"filterByCategory('all')",class:"filter-btn bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors","data-category":"all",children:[e("i",{class:"fas fa-th mr-2"}),"Tous (",t.length,")"]}),e("button",{onclick:"filterByCategory('Réception')",class:"filter-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors","data-category":"Réception",children:[e("i",{class:"fas fa-truck-loading mr-2"}),"Réception (",t.filter(r=>r.category==="Réception").length,")"]}),e("button",{onclick:"filterByCategory('Accueil Chauffeur')",class:"filter-btn bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors","data-category":"Accueil Chauffeur",children:[e("i",{class:"fas fa-truck mr-2"}),"Accueil Chauffeur (",t.filter(r=>r.category==="Accueil Chauffeur").length,")"]}),e("button",{onclick:"filterByCategory('Administrateur')",class:"filter-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors","data-category":"Administrateur",children:[e("i",{class:"fas fa-user-tie mr-2"}),"Administrateur (",t.filter(r=>r.category==="Administrateur").length,")"]}),e("button",{onclick:"filterByCategory('Contrôleur')",class:"filter-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors","data-category":"Contrôleur",children:[e("i",{class:"fas fa-clipboard-check mr-2"}),"Contrôleur (",t.filter(r=>r.category==="Contrôleur").length,")"]}),e("button",{onclick:"filterByCategory('Agent de Quai')",class:"filter-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors","data-category":"Agent de Quai",children:[e("i",{class:"fas fa-hard-hat mr-2"}),"Agent de Quai (",t.filter(r=>r.category==="Agent de Quai").length,")"]}),e("button",{onclick:"filterByCategory('Anomalies')",class:"filter-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors","data-category":"Anomalies",children:[e("i",{class:"fas fa-exclamation-circle mr-2"}),"Anomalies (",t.filter(r=>r.category==="Anomalies").length,")"]})]})]}),e("div",{id:"documents-container",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(r=>{const s={Réception:"border-orange-500 bg-orange-50","Accueil Chauffeur":"border-blue-500 bg-blue-50",Administrateur:"border-purple-500 bg-purple-50",Contrôleur:"border-green-500 bg-green-50","Agent de Quai":"border-yellow-500 bg-yellow-50",Anomalies:"border-red-500 bg-red-50"},i={Réception:"fa-truck-loading","Accueil Chauffeur":"fa-truck",Administrateur:"fa-user-tie",Contrôleur:"fa-clipboard-check","Agent de Quai":"fa-hard-hat",Anomalies:"fa-exclamation-circle"},a={docx:"fa-file-word text-orange-600",pdf:"fa-file-pdf text-red-600",xlsx:"fa-file-excel text-green-600",xltm:"fa-file-excel text-green-600"};return e("div",{class:`document-card bg-white rounded-lg shadow-lg border-l-4 ${s[r.category]} overflow-hidden hover:shadow-xl transition-shadow`,"data-category":r.category,"data-keywords":r.keywords,"data-name":r.name.toLowerCase(),"data-description":r.description.toLowerCase(),children:e("div",{class:"p-6",children:[e("div",{class:"flex items-start justify-between mb-4",children:[e("div",{class:"flex-1",children:[e("div",{class:"flex items-center mb-2",children:[e("i",{class:`fas ${i[r.category]} text-2xl mr-3`}),e("span",{class:"text-xs font-semibold text-gray-600 uppercase",children:r.category})]}),e("h3",{class:"text-lg font-bold text-gray-800 mb-2",children:r.name})]}),e("span",{class:"text-2xl",children:r.level})]}),e("p",{class:"text-sm text-gray-600 mb-4 min-h-[40px]",children:r.description}),e("div",{class:"flex items-center justify-between mb-4 pb-4 border-b border-gray-200",children:[e("div",{class:"flex items-center text-gray-500 text-sm",children:[e("i",{class:`fas ${a[r.type]} text-2xl mr-2`}),e("span",{class:"uppercase font-semibold",children:r.type})]}),e("span",{class:"text-xs text-gray-400 truncate max-w-[150px]",title:r.file,children:r.file})]}),e("div",{class:"flex gap-2",children:[e("button",{onclick:`openDocumentPreview('${r.file}', '${r.type}', '${r.name.replace(/'/g,"\\'")}')`,class:"flex-1 bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors text-center",children:[e("i",{class:"fas fa-eye mr-2"}),"Aperçu"]}),e("a",{href:`/static/documents/${r.file}`,download:!0,class:"bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors",title:"Télécharger",children:e("i",{class:"fas fa-download"})})]})]})})})}),e("div",{id:"no-results",class:"hidden text-center py-12",children:[e("i",{class:"fas fa-search text-6xl text-gray-300 mb-4"}),e("h3",{class:"text-2xl font-bold text-gray-600 mb-2",children:"Aucun document trouvé"}),e("p",{class:"text-gray-500",children:"Essayez avec d'autres mots-clés ou filtres"})]}),e("div",{id:"preview-modal",class:"hidden fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4",children:e("div",{class:"bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col",children:[e("div",{class:"flex items-center justify-between p-4 border-b border-gray-200",children:[e("div",{class:"flex-1",children:[e("h3",{id:"preview-title",class:"text-xl font-bold text-gray-800"}),e("p",{class:"text-sm text-gray-500 mt-1",children:"Aperçu du document"})]}),e("div",{class:"flex items-center gap-2",children:[e("a",{id:"preview-download-btn",href:"#",download:!0,class:"bg-[#FF4500] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors",children:[e("i",{class:"fas fa-download mr-2"}),"Télécharger"]}),e("button",{onclick:"closePreview()",class:"text-gray-500 hover:text-gray-700 text-2xl px-3",children:e("i",{class:"fas fa-times"})})]})]}),e("div",{id:"preview-content",class:"flex-1 overflow-hidden bg-gray-100"})]})})]})}function Fi(){const t=[{id:1,nom:"NGUIDJOL",prenom:"Gabriel",fonction:"Directeur Opérationnel",service:"Direction",telephone:"06 26 39 00 52",extension:"",email:"gabriel.nguidjol@gxo.com",mobile:"06 26 39 00 52",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur operationnel direction management"},{id:2,nom:"MOUNAIM",prenom:"Hassan",fonction:"Directeur de site",service:"Direction",telephone:"06 23 36 29 99",extension:"",email:"hassan.mounaim@gxo.com",mobile:"06 23 36 29 99",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur site direction management"},{id:3,nom:"GUSSIE",prenom:"Rocky",fonction:"Directeur d'Exploitation IPL/Réception",service:"Direction",telephone:"06 22 11 97 45",extension:"",email:"rocky.gussie@gxo.com",mobile:"06 22 11 97 45",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur exploitation ipl reception"},{id:4,nom:"MEBTOUL",prenom:"Nabelle",fonction:"Directeur d'Exploitation Préparation/Expédition",service:"Direction",telephone:"06 30 24 58 17",extension:"",email:"nabelle.mebtoul@gxo.com",mobile:"06 30 24 58 17",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur exploitation preparation expedition"},{id:5,nom:"BARSOUM",prenom:"Rafik",fonction:"Directeur d'Exploitation GDS/Process Control/Retour",service:"Direction",telephone:"06 23 36 99 37",extension:"",email:"rafik.barsoum@gxo.com",mobile:"06 23 36 99 37",horaires:"Lun-Ven 08h-18h",bureau:"Direction",keywords:"directeur exploitation gds process control retour"},{id:6,nom:"LE BRIS",prenom:"Fabrice",fonction:"Responsable maintenance",service:"Direction",telephone:"06 22 92 23 02",extension:"",email:"fabrice.lebris@gxo.com",mobile:"06 22 92 23 02",horaires:"Lun-Ven 08h-17h",bureau:"Direction",keywords:"responsable maintenance direction"},{id:7,nom:"HADDOUCHANE",prenom:"Houssam",fonction:"Ingénieur Méthode",service:"Direction",telephone:"07 76 11 44 11",extension:"",email:"houssam.haddouchane@gxo.com",mobile:"07 76 11 44 11",horaires:"Lun-Ven 08h-17h",bureau:"Direction",keywords:"ingenieur methode direction"},{id:8,nom:"VALY",prenom:"Thierry",fonction:"RQHSSE",service:"Direction",telephone:"07 77 82 73 30",extension:"",email:"thierry.valy@gxo.com",mobile:"07 77 82 73 30",horaires:"Lun-Ven 08h-17h",bureau:"Direction",keywords:"rqhsse qualite securite environnement"},{id:200,nom:"",prenom:"",fonction:"Admin",service:"Réception",telephone:"",extension:"150327",email:"admin.reception@gxo.com",mobile:"",horaires:"Lun-Ven 08h-17h",bureau:"Zone Réception",keywords:"admin reception"},{id:201,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150321",email:"agent.quai1@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:202,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150325",email:"agent.quai2@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:203,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150310",email:"agent.quai3@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:204,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150347",email:"agent.quai4@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:205,nom:"",prenom:"",fonction:"Agent de quai",service:"Réception",telephone:"",extension:"150328",email:"agent.quai5@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"agent quai reception"},{id:206,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150352",email:"controleur1@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:207,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150240",email:"controleur2@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:208,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150313",email:"controleur3@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:209,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150344",email:"controleur4@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:210,nom:"",prenom:"",fonction:"Contrôleur",service:"Réception",telephone:"",extension:"150226",email:"controleur5@gxo.com",mobile:"",horaires:"Variable",bureau:"Zone Réception",keywords:"controleur reception"},{id:211,nom:"",prenom:"",fonction:"Accueil chauffeur",service:"Réception",telephone:"",extension:"140148",email:"accueil.chauffeur@gxo.com",mobile:"",horaires:"Lun-Ven 07h-17h",bureau:"Zone Réception",keywords:"accueil chauffeur reception"}],r=[{name:"Tous",icon:"fa-address-book",color:"bg-gray-500",count:t.length},{name:"Direction",icon:"fa-building",color:"bg-orange-500",count:t.filter(s=>s.service==="Direction").length},{name:"Process Control",icon:"fa-clipboard-check",color:"bg-green-500",count:t.filter(s=>s.service==="Process Control").length},{name:"Réception",icon:"fa-truck-loading",color:"bg-orange-600",count:t.filter(s=>s.service==="Réception").length},{name:"IPL",icon:"fa-forklift",color:"bg-teal-500",count:t.filter(s=>s.service==="IPL").length},{name:"Préparation",icon:"fa-dolly",color:"bg-purple-500",count:t.filter(s=>s.service==="Préparation").length},{name:"Expédition",icon:"fa-shipping-fast",color:"bg-indigo-500",count:t.filter(s=>s.service==="Expédition").length},{name:"Retours",icon:"fa-undo-alt",color:"bg-cyan-500",count:t.filter(s=>s.service==="Retours").length},{name:"Maintenance",icon:"fa-tools",color:"bg-orange-500",count:t.filter(s=>s.service==="Maintenance").length},{name:"RH",icon:"fa-users",color:"bg-pink-500",count:t.filter(s=>s.service==="RH").length}];return e("div",{class:"min-h-screen bg-gray-50 pb-12",children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white py-12 px-6 mb-8 shadow-lg",children:e("div",{class:"max-w-7xl mx-auto",children:e("div",{class:"flex items-center mb-4",children:[e("i",{class:"fas fa-address-book text-5xl mr-4"}),e("div",{children:[e("h1",{class:"text-4xl font-bold",children:"Annuaire Complet GXO Moissy-Cramayel"}),e("p",{class:"text-lg mt-2 text-gray-200",children:["Annuaire GXO Moissy-Cramayel - ",t.length," contacts"]})]})]})})}),e("div",{class:"max-w-7xl mx-auto px-6",children:[e("div",{class:"bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 rounded-lg",children:e("div",{class:"flex items-start",children:[e("i",{class:"fas fa-file-pdf text-3xl text-red-600 mr-4 mt-1"}),e("div",{class:"flex-1",children:[e("h3",{class:"text-lg font-bold text-gray-800 mb-2",children:[e("i",{class:"fas fa-info-circle mr-2"}),"Documents de Référence"]}),e("p",{class:"text-gray-700 mb-4",children:"Consultez les documents PDF officiels pour la liste complète et mise à jour des contacts GXO Moissy-Cramayel."}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("a",{href:"/static/documents/Contacts_Page1.pdf",target:"_blank",class:"flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200",children:[e("i",{class:"fas fa-file-pdf text-4xl text-red-600 mr-4"}),e("div",{children:[e("div",{class:"font-semibold text-gray-800",children:"Contacts - Page 1"}),e("div",{class:"text-sm text-gray-600",children:"915 KB • PDF"})]}),e("i",{class:"fas fa-external-link-alt ml-auto text-gray-400"})]}),e("a",{href:"/static/documents/Contacts_Page2.pdf",target:"_blank",class:"flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200",children:[e("i",{class:"fas fa-file-pdf text-4xl text-red-600 mr-4"}),e("div",{children:[e("div",{class:"font-semibold text-gray-800",children:"Contacts - Page 2"}),e("div",{class:"text-sm text-gray-600",children:"655 KB • PDF"})]}),e("i",{class:"fas fa-external-link-alt ml-auto text-gray-400"})]})]})]})]})}),e("div",{class:"bg-white rounded-lg shadow-md p-6 mb-8",children:[e("div",{class:"flex items-center mb-4",children:[e("i",{class:"fas fa-search text-2xl text-gray-600 mr-3"}),e("h2",{class:"text-2xl font-bold text-gray-800",children:"Recherche de Contact"})]}),e("div",{class:"relative",children:[e("input",{type:"text",id:"search-input",placeholder:"Rechercher par nom, prénom, fonction, service, téléphone...",class:"w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-[#FF4500] focus:outline-none",onkeyup:"filterContacts()"}),e("i",{class:"fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"})]}),e("button",{onclick:"clearSearch()",class:"mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors",children:[e("i",{class:"fas fa-times mr-2"}),"Effacer"]})]}),e("div",{class:"bg-white rounded-lg shadow-md p-6 mb-8",children:[e("div",{class:"flex items-center mb-4",children:[e("i",{class:"fas fa-filter text-2xl text-gray-600 mr-3"}),e("h2",{class:"text-2xl font-bold text-gray-800",children:"Filtrer par Service"})]}),e("div",{class:"flex flex-wrap gap-3",children:r.map(s=>e("button",{onclick:`filterByService('${s.name}')`,class:`filter-btn ${s.color} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity shadow`,"data-service":s.name,children:[e("i",{class:`${s.icon} mr-2`}),s.name," (",s.count,")"]}))})]}),e("div",{class:"mb-4",children:e("div",{class:"text-sm text-gray-600",children:[e("i",{class:"fas fa-info-circle mr-2"}),e("span",{id:"contacts-count",children:t.length})," contact(s) affiché(s)"]})}),e("div",{id:"contacts-container",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(s=>{const i=r.find(n=>n.name===s.service),a=i?i.color:"bg-gray-500";return i&&i.icon,e("div",{class:`contact-card bg-white rounded-lg shadow-lg border-l-4 ${a.replace("bg-","border-")} overflow-hidden hover:shadow-xl transition-shadow`,"data-service":s.service,"data-keywords":s.keywords,"data-nom":s.nom.toLowerCase(),"data-prenom":s.prenom.toLowerCase(),"data-fonction":s.fonction.toLowerCase(),"data-telephone":s.telephone,"data-email":s.email,children:e("div",{class:"p-6",children:[e("div",{class:"flex items-start justify-between mb-4",children:[e("div",{class:"flex-1",children:[e("div",{class:"flex items-center mb-2",children:e("span",{class:`text-xs font-bold ${a.replace("bg-","text-")} uppercase tracking-wide`,children:["Service : ",s.service]})}),e("h3",{class:"text-xl font-bold text-gray-800",children:[s.prenom," ",s.nom]}),e("p",{class:"text-sm text-gray-600 font-medium mt-1",children:s.fonction})]}),s.service==="Urgence"&&e("span",{class:"text-3xl animate-pulse",children:"🚨"})]}),e("div",{class:"space-y-3 mb-4 pb-4 border-b border-gray-200",children:[e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-phone text-green-600 w-6 mr-3"}),e("a",{href:`tel:${s.telephone}`,class:"hover:text-[#FF4500] font-medium",children:s.telephone})]}),s.extension&&e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-hashtag text-orange-600 w-6 mr-3"}),e("span",{class:"text-sm",children:["Ext. ",s.extension]})]}),s.mobile&&e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-mobile-alt text-purple-600 w-6 mr-3"}),e("a",{href:`tel:${s.mobile}`,class:"hover:text-[#FF4500] font-medium",children:s.mobile})]}),e("div",{class:"flex items-center text-gray-700",children:[e("i",{class:"fas fa-envelope text-red-600 w-6 mr-3"}),e("a",{href:`mailto:${s.email}`,class:"hover:text-[#FF4500] text-sm break-all",children:s.email})]})]}),e("div",{class:"space-y-2 text-sm",children:[e("div",{class:"flex items-start text-gray-600",children:[e("i",{class:"fas fa-clock text-orange-600 w-6 mr-3 mt-1"}),e("span",{class:"flex-1",children:s.horaires})]}),e("div",{class:"flex items-start text-gray-600",children:[e("i",{class:"fas fa-map-marker-alt text-teal-600 w-6 mr-3 mt-1"}),e("span",{class:"flex-1",children:s.bureau})]})]}),e("div",{class:"mt-6 flex gap-2",children:[e("a",{href:`tel:${s.telephone}`,class:"flex-1 bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors text-center",children:[e("i",{class:"fas fa-phone mr-2"}),"Appeler"]}),e("a",{href:`mailto:${s.email}`,class:"bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors",title:"Envoyer un email",children:e("i",{class:"fas fa-envelope"})})]})]})})})}),e("div",{id:"no-results",class:"hidden text-center py-12",children:[e("i",{class:"fas fa-search text-6xl text-gray-300 mb-4"}),e("p",{class:"text-xl text-gray-600 font-semibold",children:"Aucun contact trouvé"}),e("p",{class:"text-gray-500 mt-2",children:"Essayez avec d'autres mots-clés ou filtres"})]})]}),e("script",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function Di(){return e("div",{class:"min-h-screen relative flex items-center justify-center px-4",children:[e("div",{class:"absolute inset-0 bg-cover bg-center",style:"background-image: url('/static/warehouse-bg-hd.jpg');"}),e("div",{class:"absolute inset-0 bg-gradient-to-br from-[#FF4500]/70 via-[#FF5A1A]/70 to-[#E53D00]/70"}),e("div",{class:"absolute inset-0 opacity-10",children:e("svg",{class:"w-full h-full",viewBox:"0 0 100 100",preserveAspectRatio:"none",children:[e("defs",{children:e("pattern",{id:"grid",width:"10",height:"10",patternUnits:"userSpaceOnUse",children:e("path",{d:"M 10 0 L 0 0 0 10",fill:"none",stroke:"white","stroke-width":"0.5"})})}),e("rect",{width:"100",height:"100",fill:"url(#grid)"})]})}),e("div",{class:"relative z-10 w-full max-w-md",children:[e("div",{id:"error-message",class:"hidden mb-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-shake",children:e("div",{class:"flex items-center",children:[e("i",{class:"fas fa-exclamation-circle mr-3 text-xl"}),e("span",{id:"error-text"})]})}),e("div",{class:"bg-white rounded-2xl shadow-2xl overflow-hidden",children:[e("div",{class:"bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] p-20 flex items-center justify-center relative overflow-hidden min-h-[320px]",children:[e("div",{class:"absolute inset-0 opacity-30",children:e("div",{class:"absolute left-1/4 top-1/2 -translate-y-1/2 animate-forklift-move",children:e("i",{class:"fas fa-forklift text-5xl text-white/70"})})}),e("div",{class:"relative z-10",style:"margin-left: 0.5cm;",children:e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-28 w-auto mx-auto"})})]}),e("div",{class:"p-8",children:[e("form",{id:"login-form",class:"space-y-6",children:[e("div",{children:[e("label",{for:"username",class:"block text-sm font-semibold text-gray-700 mb-2",children:[e("i",{class:"fas fa-user mr-2 text-[#FF4500]"}),"Identifiant GXO"]}),e("input",{type:"text",id:"username",name:"username",required:!0,autocomplete:"username",class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none transition-colors",placeholder:"Votre identifiant"})]}),e("div",{children:[e("label",{for:"password",class:"block text-sm font-semibold text-gray-700 mb-2",children:[e("i",{class:"fas fa-lock mr-2 text-[#FF4500]"}),"Mot de passe"]}),e("div",{class:"relative",children:[e("input",{type:"password",id:"password",name:"password",required:!0,autocomplete:"current-password",class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none transition-colors pr-12",placeholder:"••••••••"}),e("button",{type:"button",onclick:"togglePassword()",class:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF4500] transition-colors",children:e("i",{id:"password-icon",class:"fas fa-eye"})})]})]}),e("div",{class:"flex items-center",children:[e("input",{type:"checkbox",id:"remember",name:"remember",class:"w-4 h-4 text-[#FF4500] border-gray-300 rounded focus:ring-[#FF4500]"}),e("label",{for:"remember",class:"ml-2 text-sm text-gray-600",children:"Se souvenir de moi"})]}),e("button",{type:"submit",class:"w-full bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]",children:[e("i",{class:"fas fa-sign-in-alt mr-2"}),"Se connecter"]})]}),e("div",{class:"mt-6 pt-6 border-t border-gray-200",children:e("div",{class:"flex items-start text-xs text-gray-500",children:[e("i",{class:"fas fa-shield-alt mr-2 mt-1 text-green-600"}),e("div",{children:[e("p",{class:"font-semibold text-gray-700 mb-1",children:"Connexion sécurisée"}),e("p",{children:"Vos identifiants sont protégés par cryptage. Cette plateforme est réservée aux employés GXO autorisés."})]})]})}),e("div",{class:"mt-4 text-center",children:e("a",{href:"#",onclick:"showHelp(); return false;",class:"text-sm text-[#FF4500] hover:underline",children:[e("i",{class:"fas fa-question-circle mr-1"}),"Besoin d'aide pour vous connecter ?"]})})]})]}),e("div",{class:"text-center mt-6 text-white/60 text-sm",children:[e("p",{children:"© 2026 GXO Logistics - Tous droits réservés"}),e("p",{class:"mt-1",children:"Plateforme interne confidentielle"})]})]})]})}function Ni(){return e("div",{class:"min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-3 md:p-4",children:[e("div",{class:"bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md",children:[e("div",{class:"text-center mb-6 md:mb-8",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-16 md:h-20 mx-auto mb-3 md:mb-4"}),e("h1",{class:"text-2xl md:text-3xl font-bold text-gray-800 mb-2",children:[e("i",{class:"fas fa-truck text-[#FF5A1A] mr-2"}),"Accès Chauffeur"]}),e("p",{class:"text-sm md:text-base text-gray-600",children:"Scannez le QR Code pour accéder au système"})]}),e("div",{class:"bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 md:p-8 mb-4 md:mb-6 text-center",children:[e("div",{class:"bg-white inline-block p-3 md:p-4 rounded-lg shadow-md",children:e("div",{id:"qrcode-container"})}),e("p",{class:"text-gray-700 font-semibold mt-3 md:mt-4 text-xs md:text-sm",children:"🇧🇬 🇨🇿 🇩🇰 🇩🇪 🇭🇷 🇮🇹 🇵🇱 🇵🇹 🇷🇴"}),e("p",{class:"text-gray-600 text-xs mt-2",children:"Système multilingue disponible"})]}),e("div",{class:"bg-blue-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6",children:[e("h3",{class:"font-bold text-gray-800 mb-2 flex items-center text-sm md:text-base",children:[e("i",{class:"fas fa-info-circle text-blue-500 mr-2"}),"Instructions"]}),e("ol",{class:"text-xs md:text-sm text-gray-700 space-y-2",children:[e("li",{class:"flex items-start",children:[e("span",{class:"bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0",children:"1"}),e("span",{children:"Ouvrez l'appareil photo de votre smartphone"})]}),e("li",{class:"flex items-start",children:[e("span",{class:"bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0",children:"2"}),e("span",{children:"Pointez vers le QR Code ci-dessus"})]}),e("li",{class:"flex items-start",children:[e("span",{class:"bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0",children:"3"}),e("span",{children:"Suivez les instructions à l'écran"})]})]})]}),e("div",{class:"text-center",children:[e("p",{class:"text-gray-600 text-xs md:text-sm mb-2 md:mb-3",children:"Ou cliquez directement :"}),e("a",{href:"/chauffeur/langue",class:"inline-block bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-sm md:text-base active:scale-95",children:[e("i",{class:"fas fa-mobile-alt mr-2"}),"Accéder au système"]})]}),e("div",{class:"mt-6 md:mt-8 text-center text-gray-500 text-xs",children:[e("p",{children:"GXO Logistics Moissy-Cramayel"}),e("p",{class:"mt-1",children:"Système d'accueil chauffeurs"})]})]}),e("script",{src:"https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"}),e("script",{dangerouslySetInnerHTML:{__html:`
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
        `}})]})}function Pi(){return e("div",{class:"min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4",children:e("div",{class:"bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-3xl",children:[e("div",{class:"text-center mb-6 md:mb-8",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO Logistics",class:"h-12 md:h-16 mx-auto mb-4"}),e("h1",{class:"text-2xl md:text-3xl font-bold text-gray-800 mb-2",children:"Bienvenue / Welcome / Tervetuloa / Welkom"}),e("p",{class:"text-sm md:text-base text-gray-600",children:"Sélectionnez votre langue / Select your language / Valitse kielesi / Kies uw taal"})]}),e("div",{class:"grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4",children:[{code:"fr",nom:"Français",drapeau:"🇫🇷"},{code:"nl",nom:"Nederlands",drapeau:"🇳🇱"},{code:"fi",nom:"Suomi",drapeau:"🇫🇮"},{code:"de",nom:"Deutsch",drapeau:"🇩🇪"},{code:"it",nom:"Italiano",drapeau:"🇮🇹"},{code:"pl",nom:"Polski",drapeau:"🇵🇱"},{code:"pt",nom:"Português",drapeau:"🇵🇹"},{code:"bg",nom:"Български",drapeau:"🇧🇬"},{code:"cs",nom:"Čeština",drapeau:"🇨🇿"},{code:"da",nom:"Dansk",drapeau:"🇩🇰"},{code:"hr",nom:"Hrvatski",drapeau:"🇭🇷"},{code:"ro",nom:"Română",drapeau:"🇷🇴"}].map(r=>e("a",{href:`/chauffeur/consignes?lang=${r.code}`,class:"group block bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 rounded-xl p-4 md:p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-[#FF5A1A] active:scale-95",children:[e("div",{class:"text-4xl md:text-6xl mb-2 md:mb-3",children:r.drapeau}),e("h3",{class:"text-base md:text-xl font-bold text-gray-800 mb-1",children:r.nom}),e("div",{class:"text-[#FF5A1A] font-semibold opacity-0 group-hover:opacity-100 transition-opacity",children:e("i",{class:"fas fa-arrow-right"})})]}))}),e("div",{class:"mt-6 md:mt-8 bg-blue-50 rounded-lg p-3 md:p-4",children:e("div",{class:"flex items-center justify-center text-gray-700 text-sm md:text-base",children:[e("i",{class:"fas fa-hand-pointer text-xl md:text-2xl text-blue-500 mr-2 md:mr-3"}),e("span",{children:"Cliquez sur votre langue / Click on your language / Valitse kielesi / Kies uw taal"})]})})]})})}const Yt={fr:{inscriptionTitre:"Inscription Chauffeur",inscriptionSousTitre:"Veuillez remplir les informations suivantes",nom:"Nom",prenom:"Prénom",nomComplet:"Nom complet",entreprise:"Entreprise",telephone:"Téléphone",numeroPlaque:"Numéro de plaque",typeCamion:"Type de camion",champsObligatoires:"Tous les champs sont obligatoires",btnValider:"Valider et continuer",btnRetour:"Retour",erreurChamps:"Veuillez remplir tous les champs",tachesTitre:"Mes Tâches",tachesSousTitre:"Suivez vos tâches en temps réel",tachesEnCours:"Tâches en cours",tachesTerminees:"Tâches terminées",aucuneTache:"Aucune tâche assignée",marquerComplete:"Marquer comme terminée",tacheComplete:"Tâche terminée",chargement:"Chargement",dechargement:"Déchargement",attente:"En attente",enCours:"En cours",termine:"Terminé",quaiNumero:"Quai n°",porte:"Porte",statut:"Statut",heureDebut:"Heure de début",heureFin:"Heure de fin",duree:"Durée",support:"Support",nouveauMessage:"Nouveau message",aucunMessage:"Aucun message",envoyerMessage:"Envoyer un message",taper:"Tapez votre message...",envoyer:"Envoyer",messageEnvoye:"Message envoyé",messageVu:"Vu",messageNonVu:"Non lu"},nl:{inscriptionTitre:"Chauffeur Registratie",inscriptionSousTitre:"Vul de volgende informatie in",nom:"Achternaam",prenom:"Voornaam",nomComplet:"Volledige naam",entreprise:"Bedrijf",telephone:"Telefoon",numeroPlaque:"Kentekenplaat",typeCamion:"Type vrachtwagen",champsObligatoires:"Alle velden zijn verplicht",btnValider:"Valideren en doorgaan",btnRetour:"Terug",erreurChamps:"Vul alle velden in",tachesTitre:"Mijn Taken",tachesSousTitre:"Volg uw taken in real-time",tachesEnCours:"Lopende taken",tachesTerminees:"Voltooide taken",aucuneTache:"Geen toegewezen taken",marquerComplete:"Markeren als voltooid",tacheComplete:"Taak voltooid",chargement:"Laden",dechargement:"Lossen",attente:"Wachten",enCours:"Bezig",termine:"Voltooid",quaiNumero:"Dock nr",porte:"Poort",statut:"Status",heureDebut:"Starttijd",heureFin:"Eindtijd",duree:"Duur",support:"Ondersteuning",nouveauMessage:"Nieuw bericht",aucunMessage:"Geen berichten",envoyerMessage:"Stuur een bericht",taper:"Typ uw bericht...",envoyer:"Verstuur",messageEnvoye:"Bericht verzonden",messageVu:"Gezien",messageNonVu:"Ongelezen"},de:{inscriptionTitre:"Fahrerregistrierung",inscriptionSousTitre:"Bitte füllen Sie die folgenden Informationen aus",nom:"Nachname",prenom:"Vorname",nomComplet:"Vollständiger Name",entreprise:"Unternehmen",telephone:"Telefon",numeroPlaque:"Kennzeichen",typeCamion:"LKW-Typ",champsObligatoires:"Alle Felder sind Pflichtfelder",btnValider:"Validieren und fortfahren",btnRetour:"Zurück",erreurChamps:"Bitte füllen Sie alle Felder aus",tachesTitre:"Meine Aufgaben",tachesSousTitre:"Verfolgen Sie Ihre Aufgaben in Echtzeit",tachesEnCours:"Laufende Aufgaben",tachesTerminees:"Abgeschlossene Aufgaben",aucuneTache:"Keine zugewiesenen Aufgaben",marquerComplete:"Als abgeschlossen markieren",tacheComplete:"Aufgabe abgeschlossen",chargement:"Laden",dechargement:"Entladen",attente:"Warten",enCours:"In Bearbeitung",termine:"Abgeschlossen",quaiNumero:"Dock Nr",porte:"Tor",statut:"Status",heureDebut:"Startzeit",heureFin:"Endzeit",duree:"Dauer",support:"Support",nouveauMessage:"Neue Nachricht",aucunMessage:"Keine Nachrichten",envoyerMessage:"Nachricht senden",taper:"Geben Sie Ihre Nachricht ein...",envoyer:"Senden",messageEnvoye:"Nachricht gesendet",messageVu:"Gesehen",messageNonVu:"Ungelesen"},it:{inscriptionTitre:"Registrazione Autista",inscriptionSousTitre:"Si prega di compilare le seguenti informazioni",nom:"Cognome",prenom:"Nome",nomComplet:"Nome completo",entreprise:"Azienda",telephone:"Telefono",numeroPlaque:"Targa",typeCamion:"Tipo di camion",champsObligatoires:"Tutti i campi sono obbligatori",btnValider:"Conferma e continua",btnRetour:"Indietro",erreurChamps:"Si prega di compilare tutti i campi",tachesTitre:"I Miei Compiti",tachesSousTitre:"Segui i tuoi compiti in tempo reale",tachesEnCours:"Compiti in corso",tachesTerminees:"Compiti completati",aucuneTache:"Nessun compito assegnato",marquerComplete:"Segna come completato",tacheComplete:"Compito completato",chargement:"Carico",dechargement:"Scarico",attente:"In attesa",enCours:"In corso",termine:"Completato",quaiNumero:"Banchina n°",porte:"Porta",statut:"Stato",heureDebut:"Ora di inizio",heureFin:"Ora di fine",duree:"Durata",support:"Supporto",nouveauMessage:"Nuovo messaggio",aucunMessage:"Nessun messaggio",envoyerMessage:"Invia un messaggio",taper:"Digita il tuo messaggio...",envoyer:"Invia",messageEnvoye:"Messaggio inviato",messageVu:"Visto",messageNonVu:"Non letto"},bg:{inscriptionTitre:"Регистрация на шофьор",inscriptionSousTitre:"Моля, попълнете следната информация",nom:"Фамилия",prenom:"Име",nomComplet:"Пълно име",entreprise:"Компания",telephone:"Телефон",numeroPlaque:"Регистрационен номер",typeCamion:"Тип камион",champsObligatoires:"Всички полета са задължителни",btnValider:"Потвърди и продължи",btnRetour:"Назад",erreurChamps:"Моля, попълнете всички полета",tachesTitre:"Моите Задачи",tachesSousTitre:"Следете задачите си в реално време",tachesEnCours:"Текущи задачи",tachesTerminees:"Завършени задачи",aucuneTache:"Няма назначени задачи",marquerComplete:"Маркирай като завършена",tacheComplete:"Задачата завършена",chargement:"Товарене",dechargement:"Разтоварване",attente:"Изчакване",enCours:"В процес",termine:"Завършено",quaiNumero:"Док №",porte:"Врата",statut:"Статус",heureDebut:"Начален час",heureFin:"Краен час",duree:"Продължителност",support:"Поддръжка",nouveauMessage:"Ново съобщение",aucunMessage:"Няма съобщения",envoyerMessage:"Изпрати съобщение",taper:"Напишете съобщението си...",envoyer:"Изпрати",messageEnvoye:"Съобщение изпратено",messageVu:"Видяно",messageNonVu:"Непрочетено"},cs:{inscriptionTitre:"Registrace řidiče",inscriptionSousTitre:"Vyplňte prosím následující informace",nom:"Příjmení",prenom:"Jméno",nomComplet:"Celé jméno",entreprise:"Společnost",telephone:"Telefon",numeroPlaque:"Registrační značka",typeCamion:"Typ nákladního automobilu",champsObligatoires:"Všechna pole jsou povinná",btnValider:"Potvrdit a pokračovat",btnRetour:"Zpět",erreurChamps:"Vyplňte prosím všechna pole",tachesTitre:"Moje úkoly",tachesSousTitre:"Sledujte své úkoly v reálném čase",tachesEnCours:"Probíhající úkoly",tachesTerminees:"Dokončené úkoly",aucuneTache:"Žádné přiřazené úkoly",marquerComplete:"Označit jako dokončené",tacheComplete:"Úkol dokončen",chargement:"Nakládka",dechargement:"Vykládka",attente:"Čekání",enCours:"Probíhá",termine:"Dokončeno",quaiNumero:"Rampa č.",porte:"Brána",statut:"Stav",heureDebut:"Čas zahájení",heureFin:"Čas ukončení",duree:"Trvání",support:"Podpora",nouveauMessage:"Nová zpráva",aucunMessage:"Žádné zprávy",envoyerMessage:"Odeslat zprávu",taper:"Napište svou zprávu...",envoyer:"Odeslat",messageEnvoye:"Zpráva odeslána",messageVu:"Viděno",messageNonVu:"Nepřečteno"},da:{inscriptionTitre:"Chaufførregistrering",inscriptionSousTitre:"Udfyld venligst følgende oplysninger",nom:"Efternavn",prenom:"Fornavn",nomComplet:"Fulde navn",entreprise:"Firma",telephone:"Telefon",numeroPlaque:"Nummerplade",typeCamion:"Lastbiltype",champsObligatoires:"Alle felter er obligatoriske",btnValider:"Bekræft og fortsæt",btnRetour:"Tilbage",erreurChamps:"Udfyld venligst alle felter",tachesTitre:"Mine opgaver",tachesSousTitre:"Følg dine opgaver i realtid",tachesEnCours:"Igangværende opgaver",tachesTerminees:"Afsluttede opgaver",aucuneTache:"Ingen tildelte opgaver",marquerComplete:"Marker som færdig",tacheComplete:"Opgave færdig",chargement:"Lastning",dechargement:"Losning",attente:"Venter",enCours:"I gang",termine:"Færdig",quaiNumero:"Kaj nr.",porte:"Port",statut:"Status",heureDebut:"Starttid",heureFin:"Sluttid",duree:"Varighed",support:"Support",nouveauMessage:"Ny besked",aucunMessage:"Ingen beskeder",envoyerMessage:"Send en besked",taper:"Skriv din besked...",envoyer:"Send",messageEnvoye:"Besked sendt",messageVu:"Set",messageNonVu:"Ulæst"},fi:{inscriptionTitre:"Kuljettajan rekisteröinti",inscriptionSousTitre:"Täytä seuraavat tiedot",nom:"Sukunimi",prenom:"Etunimi",nomComplet:"Koko nimi",entreprise:"Yritys",telephone:"Puhelin",numeroPlaque:"Rekisterinumero",typeCamion:"Kuorma-auton tyyppi",champsObligatoires:"Kaikki kentät ovat pakollisia",btnValider:"Vahvista ja jatka",btnRetour:"Takaisin",erreurChamps:"Täytä kaikki kentät",tachesTitre:"Tehtäväni",tachesSousTitre:"Seuraa tehtäviäsi reaaliajassa",tachesEnCours:"Meneillään olevat tehtävät",tachesTerminees:"Valmiit tehtävät",aucuneTache:"Ei määrättyjä tehtäviä",marquerComplete:"Merkitse valmiiksi",tacheComplete:"Tehtävä valmis",chargement:"Lastaus",dechargement:"Purku",attente:"Odottaa",enCours:"Käynnissä",termine:"Valmis",quaiNumero:"Laituri nro",porte:"Portti",statut:"Tila",heureDebut:"Aloitusaika",heureFin:"Päättymisaika",duree:"Kesto",support:"Tuki",nouveauMessage:"Uusi viesti",aucunMessage:"Ei viestejä",envoyerMessage:"Lähetä viesti",taper:"Kirjoita viestisi...",envoyer:"Lähetä",messageEnvoye:"Viesti lähetetty",messageVu:"Nähty",messageNonVu:"Lukematon"},hr:{inscriptionTitre:"Registracija vozača",inscriptionSousTitre:"Molimo ispunite sljedeće podatke",nom:"Prezime",prenom:"Ime",nomComplet:"Puno ime",entreprise:"Tvrtka",telephone:"Telefon",numeroPlaque:"Registarska oznaka",typeCamion:"Tip kamiona",champsObligatoires:"Sva polja su obavezna",btnValider:"Potvrdi i nastavi",btnRetour:"Natrag",erreurChamps:"Molimo ispunite sva polja",tachesTitre:"Moji zadaci",tachesSousTitre:"Pratite svoje zadatke u stvarnom vremenu",tachesEnCours:"Tekući zadaci",tachesTerminees:"Završeni zadaci",aucuneTache:"Nema dodijeljenih zadataka",marquerComplete:"Označi kao završeno",tacheComplete:"Zadatak završen",chargement:"Utovar",dechargement:"Istovar",attente:"Čekanje",enCours:"U tijeku",termine:"Završeno",quaiNumero:"Gatanje br.",porte:"Vrata",statut:"Status",heureDebut:"Vrijeme početka",heureFin:"Vrijeme završetka",duree:"Trajanje",support:"Podrška",nouveauMessage:"Nova poruka",aucunMessage:"Nema poruka",envoyerMessage:"Pošalji poruku",taper:"Upišite svoju poruku...",envoyer:"Pošalji",messageEnvoye:"Poruka poslana",messageVu:"Viđeno",messageNonVu:"Nepročitano"},pl:{inscriptionTitre:"Rejestracja kierowcy",inscriptionSousTitre:"Proszę wypełnić następujące informacje",nom:"Nazwisko",prenom:"Imię",nomComplet:"Pełne imię i nazwisko",entreprise:"Firma",telephone:"Telefon",numeroPlaque:"Numer rejestracyjny",typeCamion:"Typ ciężarówki",champsObligatoires:"Wszystkie pola są wymagane",btnValider:"Potwierdź i kontynuuj",btnRetour:"Wstecz",erreurChamps:"Proszę wypełnić wszystkie pola",tachesTitre:"Moje zadania",tachesSousTitre:"Śledź swoje zadania w czasie rzeczywistym",tachesEnCours:"Bieżące zadania",tachesTerminees:"Ukończone zadania",aucuneTache:"Brak przypisanych zadań",marquerComplete:"Oznacz jako ukończone",tacheComplete:"Zadanie ukończone",chargement:"Załadunek",dechargement:"Rozładunek",attente:"Oczekiwanie",enCours:"W trakcie",termine:"Ukończone",quaiNumero:"Rampa nr",porte:"Brama",statut:"Status",heureDebut:"Czas rozpoczęcia",heureFin:"Czas zakończenia",duree:"Czas trwania",support:"Wsparcie",nouveauMessage:"Nowa wiadomość",aucunMessage:"Brak wiadomości",envoyerMessage:"Wyślij wiadomość",taper:"Wpisz swoją wiadomość...",envoyer:"Wyślij",messageEnvoye:"Wiadomość wysłana",messageVu:"Odczytane",messageNonVu:"Nieodczytane"},pt:{inscriptionTitre:"Registo de Motorista",inscriptionSousTitre:"Por favor preencha as seguintes informações",nom:"Apelido",prenom:"Nome",nomComplet:"Nome completo",entreprise:"Empresa",telephone:"Telefone",numeroPlaque:"Matrícula",typeCamion:"Tipo de caminhão",champsObligatoires:"Todos os campos são obrigatórios",btnValider:"Confirmar e continuar",btnRetour:"Voltar",erreurChamps:"Por favor preencha todos os campos",tachesTitre:"As Minhas Tarefas",tachesSousTitre:"Acompanhe as suas tarefas em tempo real",tachesEnCours:"Tarefas em curso",tachesTerminees:"Tarefas concluídas",aucuneTache:"Nenhuma tarefa atribuída",marquerComplete:"Marcar como concluída",tacheComplete:"Tarefa concluída",chargement:"Carregamento",dechargement:"Descarregamento",attente:"Em espera",enCours:"Em curso",termine:"Concluído",quaiNumero:"Cais nº",porte:"Porta",statut:"Estado",heureDebut:"Hora de início",heureFin:"Hora de fim",duree:"Duração",support:"Suporte",nouveauMessage:"Nova mensagem",aucunMessage:"Nenhuma mensagem",envoyerMessage:"Enviar uma mensagem",taper:"Digite a sua mensagem...",envoyer:"Enviar",messageEnvoye:"Mensagem enviada",messageVu:"Visto",messageNonVu:"Não lido"},ro:{inscriptionTitre:"Înregistrare Șofer",inscriptionSousTitre:"Vă rugăm completați următoarele informații",nom:"Nume",prenom:"Prenume",nomComplet:"Nume complet",entreprise:"Companie",telephone:"Telefon",numeroPlaque:"Număr de înmatriculare",typeCamion:"Tip camion",champsObligatoires:"Toate câmpurile sunt obligatorii",btnValider:"Confirmă și continuă",btnRetour:"Înapoi",erreurChamps:"Vă rugăm completați toate câmpurile",tachesTitre:"Sarcinile mele",tachesSousTitre:"Urmăriți sarcinile în timp real",tachesEnCours:"Sarcini în curs",tachesTerminees:"Sarcini finalizate",aucuneTache:"Nicio sarcină atribuită",marquerComplete:"Marchează ca finalizată",tacheComplete:"Sarcină finalizată",chargement:"Încărcare",dechargement:"Descărcare",attente:"În așteptare",enCours:"În curs",termine:"Finalizat",quaiNumero:"Cheu nr",porte:"Poartă",statut:"Status",heureDebut:"Ora de început",heureFin:"Ora de încheiere",duree:"Durată",support:"Suport",nouveauMessage:"Mesaj nou",aucunMessage:"Niciun mesaj",envoyerMessage:"Trimite un mesaj",taper:"Tastați mesajul...",envoyer:"Trimite",messageEnvoye:"Mesaj trimis",messageVu:"Văzut",messageNonVu:"Necitit"}};function ji(t){return Yt[t]||Yt.fr}function Oi({lang:t}){const r=ji(t);return`<!DOCTYPE html>
<html lang="${t}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${r.inscriptionTitre} - GXO Logistics</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <!-- Header -->
  <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10">
      <div class="text-white font-bold text-lg">${r.inscriptionTitre}</div>
    </div>
  </div>

  <!-- Conteneur principal -->
  <div class="container mx-auto p-4 max-w-lg">
    <div class="bg-white rounded-2xl shadow-xl p-8 my-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-3">
        <i class="fas fa-user-plus text-[#FF5A1A]"></i>
        <span>${r.inscriptionTitre}</span>
      </h2>
      <p class="text-center text-gray-600 mb-6">${r.inscriptionSousTitre}</p>

      <form id="form-inscription" class="space-y-5">
        <!-- Pseudo / Nom -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            <i class="fas fa-user mr-2 text-[#FF5A1A]"></i>
            ${r.nomComplet}
          </label>
          <input 
            type="text" 
            id="pseudo" 
            name="pseudo"
            placeholder="Entrez votre nom..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors"
          />
        </div>

        <!-- Entreprise -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            <i class="fas fa-building mr-2 text-[#FF5A1A]"></i>
            ${r.entreprise}
          </label>
          <input 
            type="text" 
            id="entreprise" 
            name="entreprise"
            placeholder="Nom de votre entreprise..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors"
          />
        </div>

        <!-- Numéro de Quai -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            <i class="fas fa-warehouse mr-2 text-[#FF5A1A]"></i>
            Numéro de quai attribué
          </label>
          <select 
            id="numero-quai" 
            name="numero_quai"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"
          >
            <option value="">-- Sélectionner un quai --</option>
            ${Array.from({length:30},(s,i)=>`<option value="Q${i+1}">Quai ${i+1}</option>`).join("")}
          </select>
        </div>

        <!-- Message d'erreur -->
        <div id="error-message" class="hidden bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div class="flex">
            <i class="fas fa-exclamation-triangle text-red-500 mr-3 mt-0.5"></i>
            <p class="text-sm text-red-700">${r.erreurChamps}</p>
          </div>
        </div>

        <!-- Bouton de soumission -->
        <button 
          type="submit"
          id="btn-submit"
          class="w-full bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="fas fa-check-circle mr-2"></i>
          ${r.btnValider}
        </button>
      </form>
    </div>
  </div>

  <!-- Footer -->
  <div class="bg-gray-900 text-gray-400 text-center p-4 text-sm">
    <p>© 2026 GXO Logistics</p>
  </div>

  <script>
    const lang = '${t}';
    const form = document.getElementById('form-inscription');
    const btnSubmit = document.getElementById('btn-submit');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Désactiver le bouton pendant l'envoi
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>${r.chargement}...';
      
      // Cacher le message d'erreur
      errorMessage.classList.add('hidden');

      const formData = new FormData(form);
      const data = {
        pseudo: formData.get('pseudo') || '',
        entreprise: formData.get('entreprise') || '',
        numero_quai: formData.get('numero_quai') || '',
        langue: lang,
        video_completed: 1
      };

      try {
        const response = await fetch('/api/chauffeur/inscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.id) {
          // Rediriger vers la page des tâches avec l'ID du chauffeur
          window.location.href = \`/chauffeur/taches?id=\${result.id}&lang=\${lang}\`;
        } else {
          throw new Error(result.error || 'Erreur inscription');
        }
      } catch (error) {
        console.error('Erreur:', error);
        errorMessage.classList.remove('hidden');
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fas fa-check-circle mr-2"></i>${r.btnValider}';
      }
    });
  <\/script>
</body>
</html>`}function Li(){return e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{"data-i18n":"pageTitle",children:"Mes Tâches - GXO Chauffeur"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"})]}),e("body",{class:"min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",children:[e("div",{class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg",children:e("div",{class:"container mx-auto flex items-center justify-between",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO",class:"h-10"}),e("div",{class:"text-white font-bold text-lg","data-i18n":"pageTitle",children:"Mes Tâches"}),e("button",{id:"btn-chat",class:"text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors relative",children:[e("i",{class:"fas fa-comments mr-2"}),e("span",{"data-i18n":"support",children:"Support"}),e("span",{id:"chat-badge",class:"hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",children:"0"})]})]})}),e("div",{class:"container mx-auto p-4 max-w-4xl",children:[e("div",{class:"bg-white rounded-xl shadow-lg p-6 mb-6",children:[e("div",{class:"flex items-center gap-4",children:[e("div",{class:"w-16 h-16 bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] rounded-full flex items-center justify-center",children:e("i",{class:"fas fa-user text-white text-2xl"})}),e("div",{class:"flex-1",children:[e("h2",{class:"text-2xl font-bold text-gray-800",id:"chauffeur-pseudo",children:"Chargement..."}),e("p",{class:"text-gray-600",id:"chauffeur-entreprise"}),e("p",{class:"text-sm text-gray-500",children:["Quai: ",e("span",{id:"chauffeur-quai",class:"font-bold text-[#FF5A1A]",children:"--"})]})]}),e("div",{class:"text-center",children:[e("div",{class:"text-4xl font-bold text-[#FF5A1A]",id:"progression-percent",children:"0%"}),e("div",{class:"text-xs text-gray-500","data-i18n":"completed",children:"Complétée"})]})]}),e("div",{class:"mt-4 w-full bg-gray-200 rounded-full h-3",children:e("div",{id:"barre-progression",class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] h-full rounded-full transition-all duration-500",style:"width: 0%"})})]}),e("div",{class:"space-y-4",id:"liste-taches",children:e("div",{class:"text-center py-8",children:e("i",{class:"fas fa-spinner fa-spin text-4xl text-white"})})}),e("div",{id:"message-complet",class:"hidden bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xl p-8 text-center text-white",children:[e("i",{class:"fas fa-check-circle text-6xl mb-4"}),e("h3",{class:"text-3xl font-bold mb-2","data-i18n":"congratulations",children:"Félicitations !"}),e("p",{class:"text-lg","data-i18n":"allTasksCompleted",children:"Toutes les tâches sont terminées"}),e("p",{class:"text-sm opacity-90 mt-2",children:"Un agent va venir vous voir"})]})]}),e("div",{id:"modal-chat",class:"hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e("div",{class:"bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col",children:[e("div",{class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 rounded-t-xl",children:e("div",{class:"flex items-center justify-between",children:[e("h3",{class:"text-xl font-bold text-white flex items-center gap-2",children:[e("i",{class:"fas fa-headset"}),e("span",{"data-i18n":"chat.title",children:"Support GXO"})]}),e("button",{id:"btn-fermer-chat",class:"text-white hover:bg-white/20 p-2 rounded-lg transition-colors",children:e("i",{class:"fas fa-times text-xl"})})]})}),e("div",{id:"messages-container",class:"flex-1 p-4 overflow-y-auto space-y-3 min-h-[300px]"}),e("div",{class:"p-4 border-t",children:e("form",{id:"form-message",class:"flex gap-2",children:[e("input",{type:"text",id:"message-input","data-i18n-placeholder":"chat.placeholder",placeholder:"Tapez votre message...",class:"flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none"}),e("button",{type:"submit",class:"bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all",children:e("i",{class:"fas fa-paper-plane"})})]})})]})}),e("script",{src:"/static/chauffeur-taches.js"})]})]})}const Ii=()=>e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Dashboard Chauffeurs - GXO Admin"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("link",{rel:"stylesheet",href:"/static/animations.css"}),e("link",{rel:"preload",href:"/static/gxo-logo-official.svg",as:"image"}),e("link",{rel:"preload",href:"/static/accueil-chauffeur-dashboard.js",as:"script"})]}),e("body",{class:"bg-gray-100",children:[e("div",{class:"bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg",children:e("div",{class:"max-w-7xl mx-auto px-4 py-4",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-4",children:[e("img",{src:"/static/gxo-logo-official.svg",alt:"GXO",class:"h-10"}),e("div",{children:[e("h1",{class:"text-2xl font-bold",children:"Dashboard Chauffeurs"}),e("p",{class:"text-sm opacity-90",children:"Suivi en temps réel"})]})]}),e("div",{class:"flex items-center space-x-4",children:[e("div",{class:"bg-white/20 rounded-xl px-4 py-2",children:[e("div",{class:"text-xs opacity-90",children:"Chauffeurs actifs"}),e("div",{class:"text-2xl font-bold",id:"count-actifs",children:"0"})]}),e("a",{href:"/",class:"bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 transition",children:[e("i",{class:"fas fa-home mr-2"}),"Accueil"]})]})]})})}),e("div",{class:"max-w-7xl mx-auto px-4 py-6",children:[e("div",{class:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",children:[e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"Tâches Complètes"}),e("p",{class:"text-3xl font-bold text-green-600",id:"stat-completes",children:"0"})]}),e("i",{class:"fas fa-check-circle text-4xl text-green-500 opacity-20"})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"En Cours"}),e("p",{class:"text-3xl font-bold text-orange-600",id:"stat-en-cours",children:"0"})]}),e("i",{class:"fas fa-clock text-4xl text-orange-500 opacity-20"})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"Nouveaux"}),e("p",{class:"text-3xl font-bold text-blue-600",id:"stat-nouveaux",children:"0"})]}),e("i",{class:"fas fa-plus-circle text-4xl text-blue-500 opacity-20"})]})}),e("div",{class:"bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500",children:e("div",{class:"flex items-center justify-between",children:[e("div",{children:[e("p",{class:"text-gray-600 text-sm",children:"Messages Non Lus"}),e("p",{class:"text-3xl font-bold text-red-600",id:"stat-messages",children:"0"})]}),e("i",{class:"fas fa-envelope text-4xl text-red-500 opacity-20"})]})})]}),e("div",{id:"notifications-live",class:"mb-6"}),e("div",{class:"bg-white rounded-xl shadow-lg overflow-hidden",children:[e("div",{class:"bg-gray-50 px-6 py-4 border-b flex items-center justify-between",children:[e("h2",{class:"text-xl font-bold text-gray-800",children:[e("i",{class:"fas fa-users mr-2"}),"Chauffeurs Actifs"]}),e("button",{onclick:"chargerChauffeurs()",class:"bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition",children:[e("i",{class:"fas fa-sync-alt mr-2"}),"Actualiser"]})]}),e("div",{class:"overflow-x-auto",children:e("table",{class:"w-full",children:[e("thead",{class:"bg-gray-100 border-b",children:e("tr",{children:[e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Chauffeur"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Quai"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Progression"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tâches"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Durée"}),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Actions"})]})}),e("tbody",{id:"table-chauffeurs",class:"divide-y divide-gray-200",children:e("tr",{children:e("td",{colspan:"6",class:"px-6 py-12 text-center",children:e("div",{class:"flex flex-col items-center space-y-3",children:[e("div",{class:"animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"}),e("p",{class:"text-gray-500",children:"Chargement des chauffeurs..."})]})})})})]})})]})]}),e("div",{id:"modal-chat",class:"hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e("div",{class:"bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col",style:"max-height: 80vh",children:[e("div",{class:"bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl",children:e("div",{class:"flex items-center justify-between",children:[e("div",{class:"flex items-center space-x-3",children:[e("i",{class:"fas fa-user-circle text-3xl"}),e("div",{children:[e("h3",{class:"font-bold text-xl",id:"chat-chauffeur-nom",children:"Chauffeur"}),e("p",{class:"text-sm opacity-90",children:["Quai ",e("span",{id:"chat-chauffeur-quai",children:"--"})," •",e("span",{id:"chat-chauffeur-entreprise",children:"--"})]})]})]}),e("button",{id:"btn-fermer-chat",class:"hover:bg-white/20 rounded-full p-2 transition",children:e("i",{class:"fas fa-times text-2xl"})})]})}),e("div",{id:"chat-messages",class:"flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50",children:e("div",{class:"text-center text-gray-500 py-12",children:[e("i",{class:"fas fa-comments text-5xl mb-3 opacity-30"}),e("p",{children:"Aucun message"})]})}),e("div",{class:"p-6 bg-white border-t rounded-b-2xl",children:e("div",{class:"flex space-x-3",children:[e("input",{type:"text",id:"input-admin-message",placeholder:"Écrivez un message au chauffeur...",class:"flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"}),e("button",{id:"btn-envoyer-admin-message",class:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition",children:e("i",{class:"fas fa-paper-plane"})})]})})]})}),e("script",{src:"/static/admin-dashboard-chauffeurs.js"})]})]});function Mi(){return e("html",{lang:"fr",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:"Gestion des Quais - GXO Moissy"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("style",{children:`
          .slide-container {
            display: flex;
            width: 200%;
            transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
          }
          .slide-view {
            width: 50%;
            min-height: 100vh;
          }
          .slide-left {
            transform: translateX(0);
          }
          .slide-right {
            transform: translateX(-50%);
          }
          .quai-card {
            transition: all 0.3s ease;
          }
          .quai-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          .timer-display {
            font-family: 'Courier New', monospace;
            font-size: 1.5rem;
            font-weight: bold;
          }
        `})]}),e("body",{class:"bg-gray-100",children:[e("div",{class:"slide-container slide-left",id:"slide-container",children:[e("div",{class:"slide-view",id:"view-chauffeurs",children:e("div",{class:"min-h-screen bg-gray-100 p-6",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"flex items-center justify-between mb-6",children:[e("h1",{class:"text-3xl font-bold text-gray-800",children:[e("i",{class:"fas fa-users mr-2"}),"Chauffeurs Actifs"]}),e("button",{onclick:"switchToQuais()",class:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg",children:[e("span",{children:"Gestion des Quais"}),e("i",{class:"fas fa-arrow-right"})]})]}),e("div",{id:"chauffeurs-content",class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:e("div",{class:"text-center py-12 col-span-full",children:[e("i",{class:"fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"}),e("p",{class:"text-gray-500",children:"Chargement des chauffeurs actifs..."})]})})]})})}),e("div",{class:"slide-view",id:"view-quais",children:e("div",{class:"min-h-screen bg-gray-100 p-6",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"flex items-center justify-between mb-6",children:[e("button",{onclick:"switchToChauffeurs()",class:"bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg",children:[e("i",{class:"fas fa-arrow-left"}),e("span",{children:"Chauffeurs Actifs"})]}),e("h1",{class:"text-3xl font-bold text-gray-800",children:[e("i",{class:"fas fa-warehouse mr-2"}),"Gestion des Quais"]}),e("div",{class:"w-48"})," "]}),e("div",{class:"bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-center gap-6",children:[e("div",{class:"flex items-center gap-2",children:[e("div",{class:"w-4 h-4 bg-green-500 rounded-full"}),e("span",{class:"text-sm font-medium text-gray-700",children:"Disponible"})]}),e("div",{class:"flex items-center gap-2",children:[e("div",{class:"w-4 h-4 bg-yellow-500 rounded-full"}),e("span",{class:"text-sm font-medium text-gray-700",children:"En cours d'utilisation"})]}),e("div",{class:"flex items-center gap-2",children:[e("div",{class:"w-4 h-4 bg-blue-500 rounded-full"}),e("span",{class:"text-sm font-medium text-gray-700",children:"Fin de déchargement"})]}),e("div",{class:"flex items-center gap-2",children:[e("div",{class:"w-4 h-4 bg-red-500 rounded-full"}),e("span",{class:"text-sm font-medium text-gray-700",children:"Indisponible"})]})]}),e("div",{id:"quais-grid",class:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"})]})})})]}),e("div",{id:"modal-quai",class:"fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50",children:e("div",{class:"bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4",children:[e("div",{class:"flex items-center justify-between mb-6",children:[e("h2",{class:"text-2xl font-bold text-gray-800",id:"modal-title",children:"Quai #"}),e("button",{onclick:"closeModal()",class:"text-gray-400 hover:text-gray-600",children:e("i",{class:"fas fa-times text-2xl"})})]}),e("form",{id:"form-quai-status",class:"space-y-4",children:[e("div",{children:[e("label",{class:"block text-sm font-medium text-gray-700 mb-2",children:"Statut"}),e("select",{id:"input-statut",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",children:[e("option",{value:"disponible",children:"🟢 Disponible"}),e("option",{value:"en_cours",children:"🟡 En cours d'utilisation"}),e("option",{value:"indisponible",children:"🔴 Indisponible"})]})]}),e("div",{id:"section-commentaire",class:"hidden",children:[e("label",{class:"block text-sm font-medium text-gray-700 mb-2",children:["Raison de l'indisponibilité ",e("span",{class:"text-red-500",children:"*"})]}),e("textarea",{id:"input-commentaire",rows:"3",placeholder:"Ex: Haillon cassé, porte endommagée...",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),e("div",{id:"section-auteur",class:"hidden",children:[e("label",{class:"block text-sm font-medium text-gray-700 mb-2",children:["Votre nom ",e("span",{class:"text-red-500",children:"*"})]}),e("input",{type:"text",id:"input-auteur",placeholder:"Ex: Jean Dupont",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),e("div",{class:"flex gap-3 pt-4",children:[e("button",{type:"button",onclick:"closeModal()",class:"flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors",children:"Annuler"}),e("button",{type:"submit",class:"flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors",children:"Valider"})]})]})]})}),e("script",{src:"/static/gestion-quais.js"})]})]})}function zi(){return`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codes-Barres GXO Moissy - Génération PDF</title>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .status {
            margin-top: 20px;
            padding: 15px;
            background: #f0f0f0;
            border-radius: 8px;
            display: none;
        }
        .status.show {
            display: block;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .info { background: #d1ecf1; color: #0c5460; }
        #barcodes-container {
            display: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏭 Codes-Barres GXO Moissy</h1>
        <p>Génération automatique de PDF avec 45 codes-barres</p>
    </div>

    <div style="text-align: center;">
        <button class="btn" onclick="generatePDF()">📥 Télécharger PDF</button>
    </div>

    <div id="status" class="status"></div>

    <div id="barcodes-container"></div>

    <script>
        const QUAIS_CONFIG = {
            'Zone A': Array.from({length: 10}, (_, i) => i + 1),
            'Zone B': Array.from({length: 7}, (_, i) => i + 32),
            'Zone C': Array.from({length: 5}, (_, i) => i + 45),
            'Zone D': [60, 61, 62, 67, 68, 69],
            'Zone E': [75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87],
            'Zone F': Array.from({length: 5}, (_, i) => i + 99)
        };

        const ZONE_COLORS = {
            'Zone A': '#FF6B6B',
            'Zone B': '#4ECDC4',
            'Zone C': '#45B7D1',
            'Zone D': '#FFA07A',
            'Zone E': '#98D8C8',
            'Zone F': '#F7DC6F'
        };

        function showStatus(message, type = 'info') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = \`status show \${type}\`;
        }

        async function generatePDF() {
            showStatus('🔄 Génération du PDF en cours...', 'info');

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pageWidth = 210;
                const pageHeight = 297;
                const margin = 15;
                const barcodeWidth = 80;
                const barcodeHeight = 30;
                const cols = 2;
                const rowsPerPage = 8;
                
                let currentX = margin;
                let currentY = margin;
                let itemCount = 0;
                let pageCount = 1;

                // Titre de la première page
                pdf.setFontSize(16);
                pdf.setFont(undefined, 'bold');
                pdf.text('Codes-Barres GXO Moissy - 45 Quais', pageWidth / 2, currentY, { align: 'center' });
                currentY += 10;
                pdf.setFontSize(10);
                pdf.setFont(undefined, 'normal');
                pdf.text(\`Généré le \${new Date().toLocaleDateString('fr-FR')}\`, pageWidth / 2, currentY, { align: 'center' });
                currentY += 10;

                // Génération de tous les codes-barres
                for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
                    for (const quai of quais) {
                        const barcode = \`D\${String(quai).padStart(3, '0')}\`;
                        
                        // Créer un canvas temporaire pour le code-barres
                        const canvas = document.createElement('canvas');
                        JsBarcode(canvas, barcode, {
                            format: 'CODE128',
                            width: 2,
                            height: 80,
                            displayValue: true,
                            fontSize: 16,
                            margin: 10
                        });

                        // Convertir en image
                        const imgData = canvas.toDataURL('image/png');

                        // Vérifier si on doit changer de ligne ou de page
                        if (itemCount > 0 && itemCount % cols === 0) {
                            currentX = margin;
                            currentY += barcodeHeight + 15;
                        }

                        if (itemCount > 0 && itemCount % (cols * rowsPerPage) === 0) {
                            pdf.addPage();
                            pageCount++;
                            currentY = margin;
                            currentX = margin;
                        }

                        // Ajouter le code-barres au PDF
                        pdf.setFillColor(ZONE_COLORS[zone]);
                        pdf.rect(currentX - 2, currentY - 2, barcodeWidth + 4, barcodeHeight + 14, 'F');
                        
                        pdf.setTextColor(0, 0, 0);
                        pdf.setFontSize(10);
                        pdf.setFont(undefined, 'bold');
                        pdf.text(\`\${zone} - Quai \${quai}\`, currentX + barcodeWidth / 2, currentY + 3, { align: 'center' });
                        
                        pdf.addImage(imgData, 'PNG', currentX, currentY + 5, barcodeWidth, barcodeHeight - 5);

                        currentX += barcodeWidth + 10;
                        itemCount++;
                    }
                }

                // Sauvegarder le PDF
                const filename = \`GXO-Moissy-Codes-Barres-\${new Date().toISOString().split('T')[0]}.pdf\`;
                pdf.save(filename);

                showStatus(\`✅ PDF généré avec succès ! \${itemCount} codes-barres sur \${pageCount} pages. Fichier: \${filename}\`, 'success');

            } catch (error) {
                console.error('Erreur génération PDF:', error);
                showStatus(\`❌ Erreur lors de la génération du PDF: \${error.message}\`, 'error');
            }
        }

        // Auto-génération au chargement (optionnel)
        window.addEventListener('load', () => {
            showStatus('✨ Prêt à générer le PDF avec 45 codes-barres', 'success');
        });
    <\/script>
</body>
</html>`}function Bi(){return`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Générateur QR Codes - GXO Moissy</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2">
            <i class="fas fa-qrcode mr-3"></i>
            Générateur QR Codes Automatiques
          </h1>
          <p class="text-lg opacity-90">
            QR Codes avec URL pour scan automatique - GXO Moissy
          </p>
          <div class="mt-4 bg-white/20 rounded-lg p-4">
            <p class="text-sm font-semibold mb-2">
              <i class="fas fa-check-circle mr-2"></i>
              Fonctionnalités :
            </p>
            <ul class="text-sm space-y-1">
              <li>✅ Scan avec n'importe quelle app mobile (QRbot, Camera, etc.)</li>
              <li>✅ Démarrage automatique du timer (aucun clic requis)</li>
              <li>✅ URL sécurisée embarquée dans chaque QR Code</li>
              <li>✅ Export PDF prêt à imprimer (300 DPI)</li>
            </ul>
          </div>
        </div>
        <div class="text-right">
          <div class="bg-white/20 rounded-xl px-6 py-4">
            <div class="text-5xl font-bold">45</div>
            <div class="text-sm opacity-75">Quais</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuration -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-cog text-blue-500 mr-2"></i>
          Configuration
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">URL de base</label>
            <input 
              type="text" 
              id="base-url" 
              value="https://gxomoissyprocedures.com"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Taille QR Code (px)</label>
            <input 
              type="number" 
              id="qr-size" 
              value="300"
              min="200"
              max="600"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
            <select 
              id="qr-color" 
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="#000000">Noir (standard)</option>
              <option value="#1E40AF">Bleu foncé</option>
              <option value="#7C3AED">Violet</option>
              <option value="#059669">Vert</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-info-circle text-green-500 mr-2"></i>
          Format QR Code
        </h3>
        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
          <p class="text-sm font-mono text-blue-900 break-all" id="example-url">
            https://gxomoissyprocedures.com/scan?quai=75
          </p>
        </div>
        <div class="text-sm text-gray-700 space-y-2">
          <p><strong>Fonctionnement :</strong></p>
          <ol class="list-decimal list-inside space-y-1 text-xs">
            <li>Scanner le QR Code avec n'importe quelle app</li>
            <li>L'app ouvre automatiquement l'URL</li>
            <li>La page détecte le paramètre <code class="bg-gray-200 px-1 rounded">?quai=75</code></li>
            <li>JavaScript démarre automatiquement le timer</li>
            <li>Redirection vers le tableau des quais</li>
          </ol>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-download text-purple-500 mr-2"></i>
          Actions
        </h3>
        <div class="space-y-3">
          <button 
            onclick="generateAllQRCodes()"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
          >
            <i class="fas fa-qrcode mr-2"></i>
            Générer tous les QR Codes
          </button>
          <button 
            onclick="downloadPDF()"
            class="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
          >
            <i class="fas fa-file-pdf mr-2"></i>
            Télécharger PDF
          </button>
          <button 
            onclick="testScan()"
            class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
          >
            <i class="fas fa-play mr-2"></i>
            Tester un scan
          </button>
        </div>
        <div id="status" class="mt-4 text-sm text-center"></div>
      </div>
    </div>

    <!-- Grille des QR Codes -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="font-bold text-gray-800 mb-6 flex items-center justify-between">
        <span>
          <i class="fas fa-th text-blue-500 mr-2"></i>
          QR Codes Générés (45 quais)
        </span>
        <span class="text-sm font-normal text-gray-500" id="qr-count">0/45</span>
      </h3>
      <div id="qr-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <!-- QR Codes will be inserted here -->
      </div>
    </div>
  </div>

  <script>
    // Configuration des quais GXO Moissy
    const QUAIS_CONFIG = {
      'Zone A': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      'Zone B': [32, 33, 34, 35, 36, 37, 38],
      'Zone C': [45, 46, 47, 48, 49],
      'Zone D': [60, 61, 62, 67, 68, 69],
      'Zone E': [75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87],
      'Zone F': [99, 100, 101, 102, 103]
    };

    const ZONE_COLORS = {
      'Zone A': '#3B82F6',
      'Zone B': '#8B5CF6',
      'Zone C': '#F59E0B',
      'Zone D': '#14B8A6',
      'Zone E': '#EC4899',
      'Zone F': '#6366F1'
    };

    let generatedQRCodes = [];

    // Générer tous les QR Codes
    async function generateAllQRCodes() {
      const baseUrl = document.getElementById('base-url').value;
      const qrSize = parseInt(document.getElementById('qr-size').value);
      const qrColor = document.getElementById('qr-color').value;
      const grid = document.getElementById('qr-grid');
      const status = document.getElementById('status');
      
      status.innerHTML = '<span class="text-blue-600"><i class="fas fa-spinner fa-spin mr-2"></i>Génération en cours...</span>';
      grid.innerHTML = '';
      generatedQRCodes = [];
      
      let count = 0;
      const totalQuais = Object.values(QUAIS_CONFIG).flat().length;
      
      for (const [zone, quais] of Object.entries(QUAIS_CONFIG)) {
        for (const quaiNumero of quais) {
          const url = \`\${baseUrl}/scan?quai=\${quaiNumero}\`;
          const canvas = document.createElement('canvas');
          
          try {
            await QRCode.toCanvas(canvas, url, {
              width: qrSize,
              margin: 2,
              color: {
                dark: qrColor,
                light: '#FFFFFF'
              }
            });
            
            const container = document.createElement('div');
            container.className = 'bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow';
            container.innerHTML = \`
              <div class="text-center mb-2">
                <span class="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  \${zone}
                </span>
              </div>
              <div class="mb-2">
                <div class="w-full" style="background: white; padding: 8px; border-radius: 8px;"></div>
              </div>
              <div class="text-center">
                <p class="font-bold text-lg text-gray-800">Quai \${quaiNumero}</p>
                <p class="text-xs text-gray-500 font-mono break-all mt-1">\${url}</p>
              </div>
            \`;
            
            const canvasContainer = container.querySelector('div > div');
            canvasContainer.appendChild(canvas);
            grid.appendChild(container);
            
            generatedQRCodes.push({
              quai: quaiNumero,
              zone: zone,
              url: url,
              canvas: canvas
            });
            
            count++;
            document.getElementById('qr-count').textContent = \`\${count}/\${totalQuais}\`;
          } catch (error) {
            console.error('Erreur génération QR Code', quaiNumero, error);
          }
        }
      }
      
      status.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>45 QR Codes générés avec succès !</span>';
    }

    // Télécharger le PDF
    async function downloadPDF() {
      if (generatedQRCodes.length === 0) {
        alert('⚠️ Veuillez d\\'abord générer les QR Codes');
        return;
      }
      
      const status = document.getElementById('status');
      status.innerHTML = '<span class="text-blue-600"><i class="fas fa-spinner fa-spin mr-2"></i>Création du PDF...</span>';
      
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const qrWidth = 80;
      const qrHeight = 80;
      const cols = 2;
      const margin = 10;
      const spacing = 10;
      const labelHeight = 20;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('QR Codes GXO Moissy - Scan Automatique', pageWidth / 2, 15, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const date = new Date().toLocaleDateString('fr-FR');
      pdf.text(\`Généré le \${date}\`, pageWidth / 2, 22, { align: 'center' });
      
      let currentY = 30;
      let col = 0;
      let pageCount = 1;
      
      for (const qr of generatedQRCodes) {
        if (currentY + qrHeight + labelHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
          col = 0;
          pageCount++;
        }
        
        const x = margin + col * (qrWidth + spacing);
        
        // Cadre
        pdf.setDrawColor(200);
        pdf.setLineWidth(0.5);
        pdf.rect(x, currentY, qrWidth, qrHeight + labelHeight);
        
        // Zone colorée
        const zoneColor = ZONE_COLORS[qr.zone];
        const r = parseInt(zoneColor.slice(1, 3), 16);
        const g = parseInt(zoneColor.slice(3, 5), 16);
        const b = parseInt(zoneColor.slice(5, 7), 16);
        pdf.setFillColor(r, g, b);
        pdf.rect(x, currentY, qrWidth, 8, 'F');
        
        // Label zone
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(qr.zone, x + qrWidth / 2, currentY + 5.5, { align: 'center' });
        
        // QR Code
        const imgData = qr.canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', x + 5, currentY + 10, qrWidth - 10, qrWidth - 10);
        
        // Label quai
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(\`Quai \${qr.quai}\`, x + qrWidth / 2, currentY + qrHeight + 5, { align: 'center' });
        
        // URL
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        pdf.text(qr.url, x + qrWidth / 2, currentY + qrHeight + 10, { align: 'center', maxWidth: qrWidth - 4 });
        
        col++;
        if (col >= cols) {
          col = 0;
          currentY += qrHeight + labelHeight + spacing;
        }
      }
      
      // Footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128);
        pdf.text(\`Page \${i}/\${totalPages} - GXO Moissy - QR Codes Automatiques\`, pageWidth / 2, pageHeight - 5, { align: 'center' });
      }
      
      const filename = \`GXO-Moissy-QR-Codes-\${new Date().toISOString().split('T')[0]}.pdf\`;
      pdf.save(filename);
      
      status.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-2"></i>PDF téléchargé : ' + filename + '</span>';
    }

    // Tester un scan
    function testScan() {
      const baseUrl = document.getElementById('base-url').value;
      const testUrl = \`\${baseUrl}/scan?quai=75\`;
      window.open(testUrl, '_blank');
    }

    // Générer automatiquement au chargement
    window.addEventListener('load', () => {
      setTimeout(generateAllQRCodes, 500);
    });
    
    // Mise à jour de l'exemple d'URL
    document.getElementById('base-url').addEventListener('input', (e) => {
      document.getElementById('example-url').textContent = \`\${e.target.value}/scan?quai=75\`;
    });
  <\/script>
</body>
</html>
  `}async function $i(t){try{const{nom:r,entreprise:s,telephone:i,plaque:a,type_camion:n,langue:l}=await t.req.json();if(!r||!s||!i||!a||!n)return t.json({error:"Tous les champs sont obligatoires"},400);const c=(await t.env.DB.prepare(`
      INSERT INTO chauffeurs_v2 (
        nom, entreprise, telephone, plaque, type_camion, langue, 
        statut, date_arrivee
      )
      VALUES (?, ?, ?, ?, ?, ?, 'actif', CURRENT_TIMESTAMP)
    `).bind(r,s,i,a,n,l||"fr").run()).meta.last_row_id;return t.json({success:!0,id:c,message:"Inscription réussie"})}catch(r){return console.error("Erreur inscription chauffeur:",r),t.json({error:"Erreur lors de l'inscription"},500)}}async function Ui(t){try{const r=t.req.param("id"),s=await t.env.DB.prepare(`
      SELECT id, nom, entreprise, telephone, plaque, type_camion, langue, statut, date_arrivee
      FROM chauffeurs_v2
      WHERE id = ?
    `).bind(r).first();return s?t.json(s):t.json({error:"Chauffeur non trouvé"},404)}catch(r){return console.error("Erreur récupération chauffeur:",r),t.json({error:"Erreur serveur"},500)}}async function Vi(t){try{const r=t.req.param("id"),s=await t.env.DB.prepare(`
      SELECT id, type, quai, porte, statut, heure_debut, heure_fin
      FROM taches_v2
      WHERE chauffeur_id = ? AND statut = 'en_cours'
      ORDER BY heure_debut DESC
    `).bind(r).all(),i=await t.env.DB.prepare(`
      SELECT id, type, quai, porte, statut, heure_debut, heure_fin
      FROM taches_v2
      WHERE chauffeur_id = ? AND statut = 'termine'
      ORDER BY heure_fin DESC
      LIMIT 10
    `).bind(r).all();return t.json({taches_en_cours:s.results||[],taches_terminees:i.results||[]})}catch(r){return console.error("Erreur récupération tâches:",r),t.json({error:"Erreur serveur"},500)}}async function Hi(t){try{const r=t.req.param("id");return await t.env.DB.prepare(`
      UPDATE taches_v2
      SET statut = 'termine', heure_fin = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(r).run(),t.json({success:!0,message:"Tâche terminée"})}catch(r){return console.error("Erreur complétion tâche:",r),t.json({error:"Erreur serveur"},500)}}async function Gi(t){try{const r=t.req.param("id"),s=await t.env.DB.prepare(`
      SELECT id, expediteur, message, date_envoi, vu
      FROM messages_v2
      WHERE chauffeur_id = ?
      ORDER BY date_envoi ASC
    `).bind(r).all();return t.json({messages:s.results||[]})}catch(r){return console.error("Erreur récupération messages:",r),t.json({error:"Erreur serveur"},500)}}async function Qi(t){try{const{chauffeur_id:r,message:s,expediteur:i}=await t.req.json();if(!r||!s||!i)return t.json({error:"Données manquantes"},400);const a=await t.env.DB.prepare(`
      INSERT INTO messages_v2 (chauffeur_id, expediteur, message, date_envoi, vu)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)
    `).bind(r,i,s).run();return t.json({success:!0,id:a.meta.last_row_id,message:"Message envoyé"})}catch(r){return console.error("Erreur envoi message:",r),t.json({error:"Erreur serveur"},500)}}async function Xi(t){try{const r=t.req.param("id");return await t.env.DB.prepare(`
      UPDATE messages_v2
      SET vu = 1
      WHERE id = ?
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur marquage message:",r),t.json({error:"Erreur serveur"},500)}}async function Wi(t){try{const r=await t.env.DB.prepare(`
      SELECT 
        c.id, c.nom, c.entreprise, c.telephone, c.plaque, c.type_camion, 
        c.langue, c.statut, c.date_arrivee,
        COUNT(CASE WHEN t.statut = 'en_cours' THEN 1 END) as taches_en_cours,
        COUNT(CASE WHEN t.statut = 'termine' THEN 1 END) as taches_terminees,
        (SELECT COUNT(*) FROM messages_v2 WHERE chauffeur_id = c.id AND expediteur = 'chauffeur' AND vu = 0) as messages_non_lus
      FROM chauffeurs_v2 c
      LEFT JOIN taches_v2 t ON c.id = t.chauffeur_id
      WHERE c.statut = 'actif'
      GROUP BY c.id
      ORDER BY c.date_arrivee DESC
    `).all();return t.json({chauffeurs:r.results||[]})}catch(r){return console.error("Erreur récupération chauffeurs actifs:",r),t.json({error:"Erreur serveur"},500)}}async function Yi(t){try{const{chauffeur_id:r,type:s,quai:i,porte:a}=await t.req.json();if(!r||!s||!i)return t.json({error:"Données manquantes"},400);const n=await t.env.DB.prepare(`
      INSERT INTO taches_v2 (chauffeur_id, type, quai, porte, statut, heure_debut)
      VALUES (?, ?, ?, ?, 'en_cours', CURRENT_TIMESTAMP)
    `).bind(r,s,i,a||null).run();return t.json({success:!0,id:n.meta.last_row_id,message:"Tâche assignée"})}catch(r){return console.error("Erreur assignation tâche:",r),t.json({error:"Erreur serveur"},500)}}const p=new _r;p.use("/static/*",Ws({root:"./",onNotFound:(t,r)=>(console.log("Fichier non trouvé:",t),r.notFound())}));p.get("/login",Ve,t=>t.render(e(Di,{})));p.get("/qrcode-chauffeur",Ve,t=>t.render(e(Ni,{})));p.get("/chauffeur/langue",Ve,t=>t.render(e(Pi,{})));p.get("/gestion-quais",Ve,t=>t.render(e(Mi,{})));p.get("/pdf-barcodes",t=>t.html(zi()));p.get("/qrcode-generator",t=>t.html(Bi()));p.get("/scan",t=>{const r=t.req.query("quai"),s=t.req.query("action")||"start";return r?t.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scan Quai ${r} - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <!-- État de chargement -->
        <div id="loading" class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            <i class="fas fa-qrcode text-blue-500 mr-2"></i>
            Traitement du scan...
          </h1>
          <p class="text-gray-600">Quai ${r}</p>
        </div>
        
        <!-- Succès -->
        <div id="success" class="hidden text-center">
          <div class="text-6xl mb-4">✅</div>
          <h1 class="text-2xl font-bold text-green-600 mb-2">Scan réussi !</h1>
          <p class="text-gray-600 mb-4">Quai <span class="font-bold text-2xl text-blue-600">${r}</span></p>
          <div class="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6">
            <p class="text-sm text-green-800 font-semibold mb-2">
              <i class="fas fa-check-circle mr-2"></i>
              Timer démarré
            </p>
            <p class="text-xs text-green-700">Le quai est maintenant marqué comme "En cours d'utilisation"</p>
          </div>
          <div class="space-y-3">
            <a href="/accueil-chauffeur" class="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
              <i class="fas fa-home mr-2"></i>
              Voir le tableau des quais
            </a>
            <button onclick="window.location.reload()" class="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
              <i class="fas fa-redo mr-2"></i>
              Scanner un autre quai
            </button>
          </div>
        </div>
        
        <!-- Erreur -->
        <div id="error" class="hidden text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-2">Erreur</h1>
          <p class="text-gray-600 mb-4" id="error-message">Une erreur s'est produite</p>
          <div class="space-y-3">
            <button onclick="window.location.reload()" class="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
              <i class="fas fa-redo mr-2"></i>
              Réessayer
            </button>
            <a href="/accueil-chauffeur" class="block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
              <i class="fas fa-home mr-2"></i>
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
      
      <script>
        // Auto-démarrage du timer pour le quai scanné
        async function autoStartQuai() {
          const quaiNumero = ${r};
          const action = '${s}';
          
          console.log('🎯 Scan automatique détecté:', quaiNumero);
          console.log('📍 URL:', window.location.href);
          console.log('⚡ Action:', action);
          
          try {
            // Appel API pour démarrer le timer
            const response = await fetch('/api/quais/' + quaiNumero, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                statut: 'en_cours',
                commentaire: null,
                commentaire_auteur: 'Scan QR Code'
              })
            });
            
            const data = await response.json();
            console.log('✅ Réponse API:', data);
            
            if (data.success) {
              // Enregistrer le scan dans l'historique
              await fetch('/api/quai/scan', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  barcode: 'D' + String(quaiNumero).padStart(3, '0'),
                  quai: quaiNumero,
                  action: 'start_timer',
                  timestamp: new Date().toISOString()
                })
              });
              
              // Afficher le succès
              document.getElementById('loading').classList.add('hidden');
              document.getElementById('success').classList.remove('hidden');
              
              // Notification sonore (si disponible)
              try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKXi7LhjHgU7k9nyw3YpBSh+zPDajToJFl628ux8JAU2jdXzxnwsBS1+zPDajToJF2628ux8JAU2jdXzxnwsBS1+zPDajToJF2628ux8JAU=');
                audio.play().catch(() => console.log('Audio non disponible'));
              } catch (e) {
                console.log('Notification sonore non disponible');
              }
              
              // PAS de redirection automatique - l'agent reste sur la page de confirmation
              // Il peut cliquer manuellement sur "Voir le tableau des quais" s'il le souhaite
              console.log('✅ Scan terminé - Restez sur cette page ou cliquez sur un bouton pour naviguer');
            } else {
              throw new Error(data.error || 'Erreur inconnue');
            }
          } catch (error) {
            console.error('❌ Erreur:', error);
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('error-message').textContent = error.message || 'Impossible de démarrer le timer';
          }
        }
        
        // Démarrage automatique au chargement de la page
        window.addEventListener('load', autoStartQuai);
      <\/script>
    </body>
    </html>
  `):t.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Scanner GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Code-barres invalide</h1>
          <p class="text-gray-600 mb-6">Le QR Code scanné ne contient pas de numéro de quai valide.</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `)});p.get("/scan-fin-dechargement",t=>{const r=t.req.query("quai");if(!r)return t.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Scanner GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Code-barres invalide</h1>
          <p class="text-gray-600 mb-6">Le QR Code scanné ne contient pas de numéro de quai valide.</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `);const s=Array.from({length:68},(i,a)=>{const n=a+1;return`<option value="${n}">${n} palette${n>1?"s":""}</option>`}).join("");return t.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fin Déchargement Quai ${r} - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .checkbox-item:hover {
          border-color: #3b82f6;
          background-color: #eff6ff;
        }
        .checkbox-item input:checked + label {
          font-weight: 600;
          color: #2563eb;
        }
        .checkbox-item input:checked ~ .checkbox-border {
          border-color: #2563eb;
          background-color: #dbeafe;
        }
      </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-clipboard-check text-green-600 mr-3"></i>
                Fin de Déchargement
              </h1>
              <p class="text-gray-600 mt-2">Quai n°${r}</p>
            </div>
            <div class="text-5xl">📦</div>
          </div>
        </div>

        <!-- Formulaire -->
        <form id="fin-dechargement-form" class="space-y-6">
          <!-- Informations agent et fournisseur -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="grid md:grid-cols-3 gap-4">
              <!-- Nom -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-user text-blue-600 mr-2"></i>
                  Nom de l'agent
                </label>
                <input 
                  type="text" 
                  id="nom-agent" 
                  name="nom_agent"
                  required
                  placeholder="Entrez votre nom"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <!-- N°ID -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-id-card text-purple-600 mr-2"></i>
                  N°ID
                </label>
                <input 
                  type="text" 
                  id="numero-id" 
                  name="numero_id"
                  required
                  placeholder="1827314"
                  pattern="[0-9]{7}"
                  maxlength="7"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  style="font-family: monospace;"
                />
              </div>

              <!-- Fournisseur -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-building text-indigo-600 mr-2"></i>
                  Fournisseur
                </label>
                <input 
                  type="text" 
                  id="fournisseur" 
                  name="fournisseur"
                  required
                  placeholder="Nom du fournisseur"
                  list="fournisseurs-datalist"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <datalist id="fournisseurs-datalist">
                  <!-- Suggestions seront chargées dynamiquement -->
                </datalist>
              </div>
            </div>
          </div>

          <!-- Nombre de palettes -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Palettes attendues -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-truck-loading text-orange-600 mr-2"></i>
                  Palettes attendues
                </label>
                <select 
                  id="palettes-attendues" 
                  name="palettes_attendues"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">Sélectionner...</option>
                  ${s}
                </select>
              </div>

              <!-- Palettes reçues -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-check-circle text-green-600 mr-2"></i>
                  Palettes reçues
                </label>
                <select 
                  id="palettes-recues" 
                  name="palettes_recues"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">Sélectionner...</option>
                  ${s}
                </select>
              </div>
            </div>
          </div>

          <!-- Palettes à rendre -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              <i class="fas fa-exchange-alt text-purple-600 mr-2"></i>
              Les palettes sont à rendre ?
            </label>
            <div class="flex gap-4">
              <label class="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="palettes_a_rendre" 
                  value="oui" 
                  required
                  class="peer hidden"
                />
                <div class="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300">
                  <i class="fas fa-check-circle text-2xl text-green-600 mb-2"></i>
                  <div>Oui</div>
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="palettes_a_rendre" 
                  value="non" 
                  required
                  class="peer hidden"
                />
                <div class="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300">
                  <i class="fas fa-times-circle text-2xl text-red-600 mb-2"></i>
                  <div>Non</div>
                </div>
              </label>
            </div>
          </div>


          <!-- Vérifications des 7 points de contrôle -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between cursor-pointer mb-4" id="verification-header">
              <label class="text-sm font-semibold text-gray-700 flex items-center">
                <i class="fas fa-clipboard-list text-blue-600 mr-2"></i>
                Vérifications des 7 points de contrôle <span class="text-red-500 ml-1">*</span>
              </label>
              <i id="verification-icon" class="fas fa-chevron-down text-gray-500 transition-transform"></i>
            </div>
            
            <div id="verification-content">
              <!-- Points obligatoires (1-7) -->
              <div class="border-2 border-blue-200 rounded-lg p-4 bg-blue-50 mb-4">
                <h3 class="text-sm font-bold text-blue-800 mb-3">Points obligatoires <span class="text-red-500">*</span></h3>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">1. Extérieur / Essieux (vérifier le plombage du camion) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_1" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_1" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_1" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">2. Côtés gauche et droit (ex : déchirures, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_2" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_2" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_2" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">3. Paroi avant (ex : double fond, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_3" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_3" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_3" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">4. Plancher (ex : trappes, plancher amovible, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_4" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_4" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_4" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">5. Plafond / Toit (ex : déchirures, usures, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_5" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_5" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_5" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">6. Portes intérieures / extérieures (herméticité, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_6" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_6" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_6" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">7. Cales roues bien positionnées <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_7" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_7" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_7" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              <!-- Points optionnels (8-11) -->
              <div class="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
                <h3 class="text-sm font-bold text-orange-800 mb-2">Points optionnels (marchandises alimentaires)</h3>
                <p class="text-xs text-orange-700 mb-3">À remplir uniquement en cas de réception de marchandises alimentaires</p>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">8. Nuisibles</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_8" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_8" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_8" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">9. Corps étranger</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_9" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_9" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_9" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">10. Propreté</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_10" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_10" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_10" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">11. Odeur</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_11" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_11" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_11" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Problématiques -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between cursor-pointer mb-3" id="problematiques-header">
              <label class="text-sm font-semibold text-gray-700 flex items-center">
                <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                Problématiques rencontrées (cocher si applicable)
              </label>
              <i id="problematiques-icon" class="fas fa-chevron-down text-gray-500 transition-transform"></i>
            </div>
            <div id="problematiques-content" class="hidden">
            <div class="space-y-2">
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_largeur"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes chargées en largeur</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_instables"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes instables / chargées de manière incorrecte</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_mal_dechargees"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes mal déchargées</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="marchandises_dangereuses"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Marchandises dangereuses non chargées à l'arrière</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_mal_filmees"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes mal filmées</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="mauvais_formulaire_tu"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Mauvais formulaire TU entrant</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="autres"
                  id="probleme-autres"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700 font-semibold">Autres</span>
              </label>
            </div>

            <!-- Champ Autres (affiché si "Autres" coché) -->
            <div id="autres-details" class="mt-4 hidden">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-edit text-orange-600 mr-2"></i>
                Précisez la problématique
              </label>
              <textarea 
                id="autres-commentaire"
                name="autres_commentaire"
                rows="3"
                placeholder="Décrivez la problématique..."
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              ></textarea>
            </div>
            </div>
          </div>

          <!-- Remarques -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <i class="fas fa-comment text-indigo-600 mr-2"></i>
              Remarques / Commentaires
            </label>
            <textarea 
              id="remarques"
              name="remarques"
              rows="4"
              placeholder="Ajoutez vos remarques ou commentaires..."
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            ></textarea>
          </div>

          <!-- Boutons -->
          <div class="flex gap-4">
            <button 
              type="submit"
              class="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              <i class="fas fa-check-circle mr-2"></i>
              Valider le Déchargement
            </button>
            <a 
              href="/accueil-chauffeur"
              class="bg-gray-200 text-gray-800 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              <i class="fas fa-times mr-2"></i>
              Annuler
            </a>
          </div>
        </form>

        <!-- Messages de succès/erreur -->
        <div id="success-message" class="hidden mt-6 bg-green-100 border-2 border-green-500 rounded-xl p-6 text-center">
          <div class="text-5xl mb-4">✅</div>
          <h2 class="text-2xl font-bold text-green-800 mb-2">Déchargement Validé !</h2>
          <p class="text-green-700 mb-4">Les informations ont été enregistrées avec succès.</p>
          <div class="flex gap-4 justify-center">
            <a href="/accueil-chauffeur" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
              <i class="fas fa-home mr-2"></i>
              Retour à l'accueil
            </a>
            <button onclick="window.location.reload()" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all">
              <i class="fas fa-redo mr-2"></i>
              Nouveau formulaire
            </button>
          </div>
        </div>

        <div id="error-message" class="hidden mt-6 bg-red-100 border-2 border-red-500 rounded-xl p-6 text-center">
          <div class="text-5xl mb-4">❌</div>
          <h2 class="text-2xl font-bold text-red-800 mb-2">Erreur</h2>
          <p id="error-text" class="text-red-700 mb-4"></p>
          <button onclick="document.getElementById('error-message').classList.add('hidden')" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all">
            <i class="fas fa-times mr-2"></i>
            Fermer
          </button>
        </div>
      </div>

      <script>
        // ===== GESTION AUTOCOMPLETE NOMS ET FOURNISSEURS =====
        
        // Charger les noms et fournisseurs depuis localStorage
        function loadStoredData() {
          const storedNoms = JSON.parse(localStorage.getItem('gxo_agent_names') || '[]');
          const storedFournisseurs = JSON.parse(localStorage.getItem('gxo_fournisseurs') || '[]');
          
          // Créer datalist pour les noms
          const nomsDatalist = document.createElement('datalist');
          nomsDatalist.id = 'noms-datalist';
          storedNoms.forEach(nom => {
            const option = document.createElement('option');
            option.value = nom;
            nomsDatalist.appendChild(option);
          });
          document.body.appendChild(nomsDatalist);
          document.getElementById('nom-agent').setAttribute('list', 'noms-datalist');
          
          // Créer datalist pour les fournisseurs
          const fournisseursDatalist = document.getElementById('fournisseurs-datalist');
          storedFournisseurs.forEach(fournisseur => {
            const option = document.createElement('option');
            option.value = fournisseur;
            fournisseursDatalist.appendChild(option);
          });
          
          console.log('📋 Chargé:', storedNoms.length, 'noms et', storedFournisseurs.length, 'fournisseurs');
        }
        
        // Sauvegarder un nouveau nom
        function saveAgentName(nom) {
          if (!nom || nom.trim() === '') return;
          const stored = JSON.parse(localStorage.getItem('gxo_agent_names') || '[]');
          if (!stored.includes(nom.trim())) {
            stored.push(nom.trim());
            localStorage.setItem('gxo_agent_names', JSON.stringify(stored));
            console.log('💾 Nom sauvegardé:', nom);
          }
        }
        
        // Sauvegarder un nouveau fournisseur
        function saveFournisseur(fournisseur) {
          if (!fournisseur || fournisseur.trim() === '') return;
          const stored = JSON.parse(localStorage.getItem('gxo_fournisseurs') || '[]');
          if (!stored.includes(fournisseur.trim())) {
            stored.push(fournisseur.trim());
            localStorage.setItem('gxo_fournisseurs', JSON.stringify(stored));
            console.log('💾 Fournisseur sauvegardé:', fournisseur);
          }
        }
        
        // Charger au démarrage
        loadStoredData();
        

        
        // ===== GESTION SECTIONS REPLIABLES =====
        
        // Toggle section vérification
        document.getElementById('verification-header').addEventListener('click', function() {
          const content = document.getElementById('verification-content');
          const icon = document.getElementById('verification-icon');
          
          if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          } else {
            content.classList.add('hidden');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
        });
        
        // Toggle section problématiques
        document.getElementById('problematiques-header').addEventListener('click', function() {
          const content = document.getElementById('problematiques-content');
          const icon = document.getElementById('problematiques-icon');
          
          if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          } else {
            content.classList.add('hidden');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
        });

        // ===== GESTION DU FORMULAIRE =====
        
        // Afficher le champ "Autres" si coché
        document.getElementById('probleme-autres').addEventListener('change', function() {
          const autresDetails = document.getElementById('autres-details');
          if (this.checked) {
            autresDetails.classList.remove('hidden');
            document.getElementById('autres-commentaire').setAttribute('required', 'required');
          } else {
            autresDetails.classList.add('hidden');
            document.getElementById('autres-commentaire').removeAttribute('required');
            document.getElementById('autres-commentaire').value = '';
          }
        });

        // Soumission du formulaire
        document.getElementById('fin-dechargement-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          // ===== VALIDATION DES 7 POINTS OBLIGATOIRES =====
          const requiredPoints = [1, 2, 3, 4, 5, 6, 7];
          const missingPoints = [];
          
          for (const pointNum of requiredPoints) {
            const pointName = 'point_' + pointNum;
            const checkedRadio = document.querySelector('input[name="' + pointName + '"]:checked');
            if (!checkedRadio) {
              missingPoints.push(pointNum);
            }
          }
          
          if (missingPoints.length > 0) {
            alert('⚠️ Veuillez remplir tous les points de contrôle obligatoires.

Points manquants : ' + missingPoints.join(', '));
            // Déplier la section si elle est repliée
            const verificationContent = document.getElementById('verification-content');
            const verificationIcon = document.getElementById('verification-icon');
            verificationContent.classList.remove('hidden');
            verificationIcon.classList.remove('fa-chevron-down');
            verificationIcon.classList.add('fa-chevron-up');
            // Scroll vers la section
            document.getElementById('verification-header').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          
          // Récupérer les points de contrôle
          const verificationPoints = {};
          for (let i = 1; i <= 11; i++) {
            const pointValue = formData.get('point_' + i);
            if (pointValue) {
              verificationPoints['point_' + i] = pointValue;
            }
          }

          
          const formData = new FormData(this);
          const nomAgent = formData.get('nom_agent');
          const numeroId = formData.get('numero_id');
          const fournisseur = formData.get('fournisseur');
          
          // Sauvegarder les nouvelles données
          saveAgentName(nomAgent);
          saveFournisseur(fournisseur);
          
          const data = {
            quai_numero: ${r},
            nom_agent: nomAgent,
            numero_id: numeroId,
            fournisseur: fournisseur,
            palettes_attendues: parseInt(formData.get('palettes_attendues')),
            palettes_recues: parseInt(formData.get('palettes_recues')),
            palettes_a_rendre: formData.get('palettes_a_rendre'),
            verification_points: verificationPoints,
            problemes: formData.getAll('probleme[]'),
            autres_commentaire: formData.get('autres_commentaire'),
            remarques: formData.get('remarques'),
            timestamp: new Date().toISOString()
          };

          console.log('📦 Données du formulaire:', data);

          try {
            const response = await fetch('/api/fin-dechargement', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('✅ Réponse API:', result);

            if (result.success) {
              // Cacher le formulaire
              document.getElementById('fin-dechargement-form').classList.add('hidden');
              // Afficher le message de succès
              document.getElementById('success-message').classList.remove('hidden');
              // Scroll vers le haut
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              throw new Error(result.error || 'Erreur inconnue');
            }
          } catch (error) {
            console.error('❌ Erreur:', error);
            document.getElementById('error-text').textContent = error.message || 'Impossible d\\'enregistrer les données';
            document.getElementById('error-message').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      <\/script>
    </body>
    </html>
  `)});p.get("/scan-controle",async t=>{const r=t.req.query("quai");if(!r)return t.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Scanner GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Code-barres invalide</h1>
          <p class="text-gray-600 mb-6">Le QR Code scanné ne contient pas de numéro de quai valide.</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `);try{const s=await t.env.DB.prepare(`
      SELECT commentaire FROM quai_status WHERE quai_numero = ?
    `).bind(r).first();let i=null,a=null;if(s!=null&&s.commentaire){const n=s.commentaire.split(" - ");if(n.length>=3&&(i=n[2]),n.length>=4){const l=n[3].match(/ID:(\d+)/);l&&(a=l[1])}}return await t.env.DB.prepare(`
      UPDATE quai_status 
      SET statut = 'en_controle',
          timer_controle_start = datetime('now'),
          timer_controle_duration = NULL,
          controle_debut_timestamp = datetime('now'),
          controle_fournisseur = ?,
          controle_id_chauffeur = ?,
          updated_at = datetime('now')
      WHERE quai_numero = ?
    `).bind(i,a,r).run(),console.log(`✅ Quai ${r} passé en contrôle - Timer contrôle démarré - Fournisseur: ${i}, ID: ${a}`),t.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contrôle Démarré - GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center transform hover:scale-105 transition-transform">
          <div class="text-7xl mb-4 animate-bounce">🔍</div>
          <h1 class="text-3xl font-bold text-orange-600 mb-4">Contrôle Démarré</h1>
          <p class="text-2xl font-bold text-gray-800 mb-6">Quai n°${r}</p>
          <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
            <p class="text-orange-800 font-semibold">
              <i class="fas fa-clock mr-2"></i>
              Le timer de contrôle est maintenant actif
            </p>
          </div>
          <a href="/accueil-chauffeur" class="bg-orange-500 text-white px-8 py-4 rounded-xl inline-block hover:bg-orange-600 transition-colors font-bold text-lg shadow-lg">
            <i class="fas fa-warehouse mr-2"></i>
            Retour à la gestion des quais
          </a>
        </div>
      </body>
      </html>
    `)}catch(s){return console.error(`❌ Erreur scan contrôle quai ${r}:`,s),t.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">⚠️</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Erreur de traitement</h1>
          <p class="text-gray-600 mb-6">${s.message}</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `)}});p.get("/scan-fin-controle",async t=>{const r=t.req.query("quai");return r?t.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fin de Contrôle - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="text-7xl mb-4">📝</div>
          <h1 class="text-3xl font-bold text-purple-600 mb-2">Fin de Contrôle</h1>
          <p class="text-2xl font-bold text-gray-800">Quai n°${r}</p>
        </div>

        <form id="finControleForm" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <i class="fas fa-user mr-2 text-purple-600"></i>
              Nom du contrôleur <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="controleurNom"
              name="controleurNom"
              list="savedControleurs"
              required
              placeholder="Ex: Jean Dupont"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            >
            <datalist id="savedControleurs"></datalist>
            <p class="text-xs text-gray-500 mt-1">Votre nom sera enregistré pour un remplissage rapide</p>
          </div>

          <div id="errorMessage" class="hidden bg-red-50 border-l-4 border-red-500 p-4 text-red-700"></div>
          
          <button 
            type="submit"
            class="w-full bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-600 transition-colors font-bold text-lg shadow-lg flex items-center justify-center"
          >
            <i class="fas fa-check-circle mr-2"></i>
            Terminer le contrôle
          </button>
        </form>

        <div class="mt-6 text-center">
          <a href="/accueil-chauffeur" class="text-gray-500 hover:text-gray-700 text-sm">
            <i class="fas fa-arrow-left mr-1"></i>
            Retour
          </a>
        </div>
      </div>

      <script>
        // Charger les noms sauvegardés depuis localStorage
        const savedControleurs = JSON.parse(localStorage.getItem('gxo_controleurs') || '[]');
        const datalist = document.getElementById('savedControleurs');
        savedControleurs.forEach(nom => {
          const option = document.createElement('option');
          option.value = nom;
          datalist.appendChild(option);
        });

        // Gestion du formulaire
        document.getElementById('finControleForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const controleurNom = document.getElementById('controleurNom').value.trim();
          const errorDiv = document.getElementById('errorMessage');
          const submitBtn = e.target.querySelector('button[type="submit"]');
          
          if (!controleurNom) {
            errorDiv.textContent = 'Veuillez saisir votre nom';
            errorDiv.classList.remove('hidden');
            return;
          }

          // Désactiver le bouton pendant la soumission
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...';
          errorDiv.classList.add('hidden');

          try {
            // Envoyer les données au backend
            const response = await fetch('/api/fin-controle', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                quai: ${r},
                controleurNom: controleurNom
              })
            });

            if (!response.ok) {
              throw new Error('Erreur lors de l\\'enregistrement');
            }

            const result = await response.json();

            // Sauvegarder le nom dans localStorage
            if (!savedControleurs.includes(controleurNom)) {
              savedControleurs.push(controleurNom);
              // Garder seulement les 10 derniers noms
              if (savedControleurs.length > 10) savedControleurs.shift();
              localStorage.setItem('gxo_controleurs', JSON.stringify(savedControleurs));
            }

            // Rediriger vers la page de succès avec toutes les infos
            const params = new URLSearchParams({
              quai: '${r}',
              duree: result.dureeControle,
              nom: controleurNom,
              fournisseur: result.fournisseur || '',
              id: result.idChauffeur || '',
              debut: result.debutTimestamp || ''
            });
            window.location.href = '/scan-fin-controle-success?' + params.toString();
          } catch (error) {
            console.error('Erreur:', error);
            errorDiv.textContent = 'Erreur lors de l\\'enregistrement. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Terminer le contrôle';
          }
        });
      <\/script>
    </body>
    </html>
  `):t.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Scanner GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Code-barres invalide</h1>
          <p class="text-gray-600 mb-6">Le QR Code scanné ne contient pas de numéro de quai valide.</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `)});p.post("/api/fin-controle",async t=>{try{const r=await t.req.json(),{quai:s,controleurNom:i}=r;if(!s||!i)return t.json({error:"Données manquantes"},400);const a=await t.env.DB.prepare(`
      SELECT 
        timer_controle_start,
        controle_fournisseur,
        controle_id_chauffeur,
        controle_debut_timestamp
      FROM quai_status 
      WHERE quai_numero = ?
    `).bind(s).first();let n=null;if(a!=null&&a.timer_controle_start){const l=new Date(a.timer_controle_start.replace(" ","T")+"Z").getTime(),o=Date.now();n=Math.floor((o-l)/1e3),console.log(`⏱️ Durée contrôle calculée: ${n}s`)}return await t.env.DB.prepare(`
      UPDATE quai_status 
      SET statut = 'fin_controle',
          timer_controle_start = NULL,
          timer_controle_duration = ?,
          controleur_nom = ?,
          updated_at = datetime('now')
      WHERE quai_numero = ?
    `).bind(n,i,s).run(),console.log(`✅ Quai ${s} passé en fin de contrôle - Timer figé à ${n}s - Contrôleur: ${i}`),t.json({success:!0,quai:s,dureeControle:n,controleurNom:i,fournisseur:(a==null?void 0:a.controle_fournisseur)||"",idChauffeur:(a==null?void 0:a.controle_id_chauffeur)||"",debutTimestamp:(a==null?void 0:a.controle_debut_timestamp)||""})}catch(r){return console.error("❌ Erreur fin contrôle:",r),t.json({error:"Erreur serveur"},500)}});p.get("/scan-fin-controle-success",t=>{const r=t.req.query("quai"),s=parseInt(t.req.query("duree")||"0"),i=t.req.query("nom")||"",a=t.req.query("fournisseur")||"",n=t.req.query("id")||"",l=t.req.query("debut")||"",o=Math.floor(s/3600),c=Math.floor(s%3600/60),d=s%60,m=`${String(o).padStart(2,"0")}:${String(c).padStart(2,"0")}:${String(d).padStart(2,"0")}`;let h="";if(l)try{const f=new Date(l.replace(" ","T")+"Z"),g=String(f.getDate()).padStart(2,"0"),x=String(f.getMonth()+1).padStart(2,"0"),y=f.getFullYear(),b=String(f.getHours()).padStart(2,"0"),k=String(f.getMinutes()).padStart(2,"0");h=`${g}/${x}/${y} à ${b}h${k}`}catch{h=l}return t.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contrôle Terminé - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center transform hover:scale-105 transition-transform">
        <div class="text-7xl mb-4 animate-bounce">📝</div>
        <h1 class="text-3xl font-bold text-purple-600 mb-4">Contrôle Terminé</h1>
        <p class="text-2xl font-bold text-gray-800 mb-4">Quai n°${r}</p>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
          <p class="text-purple-800 font-semibold mb-2">
            <i class="fas fa-stopwatch mr-2"></i>
            Durée du contrôle
          </p>
          <p class="text-3xl font-mono font-bold text-purple-900">${m}</p>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p class="text-blue-800 font-semibold mb-2">
            <i class="fas fa-user mr-2"></i>
            Contrôleur
          </p>
          <p class="text-xl font-bold text-blue-900">${i}</p>
        </div>

        ${a?`
          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
            <p class="text-indigo-800 font-semibold mb-2">
              <i class="fas fa-truck mr-2"></i>
              Fournisseur
            </p>
            <p class="text-lg font-bold text-indigo-900">${a}</p>
          </div>
        `:""}

        ${n?`
          <div class="bg-teal-50 border-l-4 border-teal-500 p-4 mb-4">
            <p class="text-teal-800 font-semibold mb-2">
              <i class="fas fa-id-card mr-2"></i>
              ID Chauffeur
            </p>
            <p class="text-lg font-bold text-teal-900">${n}</p>
          </div>
        `:""}

        ${h?`
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <p class="text-amber-800 font-semibold mb-2">
              <i class="fas fa-clock mr-2"></i>
              Début du contrôle
            </p>
            <p class="text-lg font-bold text-amber-900">${h}</p>
          </div>
        `:""}
        
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p class="text-green-800 font-semibold">
            <i class="fas fa-check-circle mr-2"></i>
            Le timer de contrôle est maintenant figé
          </p>
        </div>
        <a href="/accueil-chauffeur" class="bg-purple-500 text-white px-8 py-4 rounded-xl inline-block hover:bg-purple-600 transition-colors font-bold text-lg shadow-lg">
          <i class="fas fa-warehouse mr-2"></i>
          Retour à la gestion des quais
        </a>
      </div>
    </body>
    </html>
  `)});p.get("/download-qr-controle",t=>t.html(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Codes Début de Contrôle - GXO Moissy</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
</head>
<body class="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-qrcode text-orange-600 mr-3"></i>
                        QR Codes - Début de Contrôle
                    </h1>
                    <p class="text-gray-600">GXO Moissy - 45 QR codes pour les quais</p>
                </div>
                <div class="text-6xl">🔍</div>
            </div>
            
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center mb-6">
                <div class="text-white mb-4">
                    <i class="fas fa-file-pdf text-6xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Générer le PDF</h2>
                    <p class="text-lg opacity-90">45 QR codes - Format A4 - Haute qualité</p>
                </div>
                <button 
                    id="generatePDF"
                    onclick="generatePDF()"
                    class="inline-block bg-white text-orange-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                    <i class="fas fa-file-pdf mr-2"></i>
                    Générer et Télécharger le PDF
                </button>
                <div id="loading" class="hidden mt-4 text-white">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Génération en cours...
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-orange-50 rounded-xl p-6">
                    <h3 class="font-bold text-orange-900 mb-3">
                        <i class="fas fa-info-circle mr-2"></i>
                        Contenu du PDF
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>45 QR codes (C001-C103)</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Organisés par zones (A-F)</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Format A4 portrait</li>
                    </ul>
                </div>

                <div class="bg-blue-50 rounded-xl p-6">
                    <h3 class="font-bold text-blue-900 mb-3">
                        <i class="fas fa-clipboard-check mr-2"></i>
                        Fonctionnalité
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Démarre le timer de contrôle</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Statut "En contrôle"</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Conservation des données</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <a href="/accueil-chauffeur" class="inline-block bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à la gestion des quais
            </a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"><\/script>
    <script>
        const quaisGXO = [1,2,3,4,5,6,7,8,9,10,32,33,34,35,36,37,38,45,46,47,48,49,60,61,62,67,68,69,75,76,77,78,79,81,82,83,84,85,86,87,99,100,101,102,103];

        async function generatePDF() {
            const button = document.getElementById('generatePDF');
            const loading = document.getElementById('loading');
            
            button.disabled = true;
            button.classList.add('opacity-50');
            loading.classList.remove('hidden');

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 10;
                const qrSize = 50;
                const cols = 3;
                const rows = 5;
                const spacingX = (pageWidth - 2 * margin - cols * qrSize) / (cols - 1);
                const spacingY = (pageHeight - 2 * margin - rows * qrSize) / (rows - 1);

                let currentRow = 0;
                let currentCol = 0;

                for (let i = 0; i < quaisGXO.length; i++) {
                    const quaiNum = quaisGXO[i];
                    const qrCode = String(quaiNum).padStart(3, '0');
                    const url = window.location.origin + '/scan-controle?quai=' + quaiNum;

                    if (i > 0 && i % (cols * rows) === 0) {
                        pdf.addPage();
                        currentRow = 0;
                        currentCol = 0;
                    }

                    const x = margin + currentCol * (qrSize + spacingX);
                    const y = margin + currentRow * (qrSize + spacingY);

                    const canvas = document.createElement('canvas');
                    new QRious({ element: canvas, value: url, size: 400, level: 'H' });
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, qrSize, qrSize);

                    pdf.setFontSize(12);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('C' + qrCode, x + qrSize / 2, y + qrSize + 5, { align: 'center' });
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text('Quai ' + quaiNum, x + qrSize / 2, y + qrSize + 9, { align: 'center' });
                    pdf.text('Début contrôle', x + qrSize / 2, y + qrSize + 12, { align: 'center' });

                    currentCol++;
                    if (currentCol >= cols) {
                        currentCol = 0;
                        currentRow++;
                    }
                }

                const today = new Date().toISOString().split('T')[0];
                pdf.save('GXO-Moissy-QR-Codes-Debut-Controle-' + today + '.pdf');

                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
                alert('✅ PDF généré avec succès !');
            } catch (error) {
                console.error('Erreur:', error);
                alert('❌ Erreur lors de la génération du PDF');
                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
            }
        }
    <\/script>
</body>
</html>`));p.get("/download-qr-fin-controle",t=>t.html(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Codes Fin de Contrôle - GXO Moissy</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
</head>
<body class="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-qrcode text-purple-600 mr-3"></i>
                        QR Codes - Fin de Contrôle
                    </h1>
                    <p class="text-gray-600">GXO Moissy - 45 QR codes pour les quais</p>
                </div>
                <div class="text-6xl">📝</div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-8 text-center mb-6">
                <div class="text-white mb-4">
                    <i class="fas fa-file-pdf text-6xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Générer le PDF</h2>
                    <p class="text-lg opacity-90">45 QR codes - Format A4 - Haute qualité</p>
                </div>
                <button 
                    id="generatePDF"
                    onclick="generatePDF()"
                    class="inline-block bg-white text-purple-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                    <i class="fas fa-file-pdf mr-2"></i>
                    Générer et Télécharger le PDF
                </button>
                <div id="loading" class="hidden mt-4 text-white">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Génération en cours...
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-purple-50 rounded-xl p-6">
                    <h3 class="font-bold text-purple-900 mb-3">
                        <i class="fas fa-info-circle mr-2"></i>
                        Contenu du PDF
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>45 QR codes (FC001-FC103)</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Organisés par zones (A-F)</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Format A4 portrait</li>
                    </ul>
                </div>

                <div class="bg-blue-50 rounded-xl p-6">
                    <h3 class="font-bold text-blue-900 mb-3">
                        <i class="fas fa-clipboard-check mr-2"></i>
                        Fonctionnalité
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Arrête le timer de contrôle</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Statut "Fin de contrôle"</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Timer figé</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <a href="/accueil-chauffeur" class="inline-block bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à la gestion des quais
            </a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"><\/script>
    <script>
        const quaisGXO = [1,2,3,4,5,6,7,8,9,10,32,33,34,35,36,37,38,45,46,47,48,49,60,61,62,67,68,69,75,76,77,78,79,81,82,83,84,85,86,87,99,100,101,102,103];

        async function generatePDF() {
            const button = document.getElementById('generatePDF');
            const loading = document.getElementById('loading');
            
            button.disabled = true;
            button.classList.add('opacity-50');
            loading.classList.remove('hidden');

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 10;
                const qrSize = 50;
                const cols = 3;
                const rows = 5;
                const spacingX = (pageWidth - 2 * margin - cols * qrSize) / (cols - 1);
                const spacingY = (pageHeight - 2 * margin - rows * qrSize) / (rows - 1);

                let currentRow = 0;
                let currentCol = 0;

                for (let i = 0; i < quaisGXO.length; i++) {
                    const quaiNum = quaisGXO[i];
                    const qrCode = String(quaiNum).padStart(3, '0');
                    const url = window.location.origin + '/scan-fin-controle?quai=' + quaiNum;

                    if (i > 0 && i % (cols * rows) === 0) {
                        pdf.addPage();
                        currentRow = 0;
                        currentCol = 0;
                    }

                    const x = margin + currentCol * (qrSize + spacingX);
                    const y = margin + currentRow * (qrSize + spacingY);

                    const canvas = document.createElement('canvas');
                    new QRious({ element: canvas, value: url, size: 400, level: 'H' });
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, qrSize, qrSize);

                    pdf.setFontSize(12);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('FC' + qrCode, x + qrSize / 2, y + qrSize + 5, { align: 'center' });
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text('Quai ' + quaiNum, x + qrSize / 2, y + qrSize + 9, { align: 'center' });
                    pdf.text('Fin contrôle', x + qrSize / 2, y + qrSize + 12, { align: 'center' });

                    currentCol++;
                    if (currentCol >= cols) {
                        currentCol = 0;
                        currentRow++;
                    }
                }

                const today = new Date().toISOString().split('T')[0];
                pdf.save('GXO-Moissy-QR-Codes-Fin-Controle-' + today + '.pdf');

                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
                alert('✅ PDF généré avec succès !');
            } catch (error) {
                console.error('Erreur:', error);
                alert('❌ Erreur lors de la génération du PDF');
                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
            }
        }
    <\/script>
</body>
</html>`));p.get("/chauffeur/consignes",t=>{const r=t.req.query("lang")||"fr";return t.redirect(`/consignes/${r}`)});p.get("/chauffeur/video",t=>t.redirect("/chauffeur/consignes?lang="+(t.req.query("lang")||"fr")));p.get("/chauffeur/inscription",t=>{const r=t.req.query("lang")||"fr";return t.html(Oi({lang:r}))});p.get("/chauffeur/taches",Ve,t=>t.render(e(Li,{})));p.post("/api/chauffeur/inscription",async t=>{try{const{pseudo:r,entreprise:s,numero_quai:i,langue:a,video_completed:n}=await t.req.json(),l=await t.env.DB.prepare(`
      INSERT INTO chauffeur_arrivals (
        pseudo, entreprise, numero_quai, langue, video_completed, 
        status, arrival_time
      )
      VALUES (?, ?, ?, ?, ?, 'in_progress', CURRENT_TIMESTAMP)
    `).bind(r,s,i,a,n?1:0).run();return t.json({success:!0,id:l.meta.last_row_id})}catch(r){return console.error("Erreur inscription:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/chauffeur/valider-tache",async t=>{try{const{chauffeur_id:r,tache:s}=await t.req.json(),i={epi:"task_epi_porte",task_epi_porte:"task_epi_porte",placement:"task_placement_quai",task_placement_quai:"task_placement_quai",palette:"task_palette_change",task_palette_change:"task_palette_change",accueil:"task_accueil_notifie",task_accueil_notifie:"task_accueil_notifie",clefs:"task_clefs_remises",task_clefs_remises:"task_clefs_remises"},a={epi:"task_epi_time",task_epi_porte:"task_epi_time",placement:"task_placement_time",task_placement_quai:"task_placement_time",palette:"task_palette_time",task_palette_change:"task_palette_time",accueil:"task_accueil_time",task_accueil_notifie:"task_accueil_time",clefs:"task_clefs_time",task_clefs_remises:"task_clefs_time"},n=i[s],l=a[s];return!n||!l?t.json({success:!1,error:"Tâche invalide"},400):(await t.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET ${n} = 1, ${l} = datetime('now')
      WHERE id = ?
    `).bind(r).run(),t.json({success:!0}))}catch(r){return console.error("Erreur validation tâche:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/chauffeur/progression",async t=>{try{const r=t.req.query("id"),s=await t.env.DB.prepare(`
      SELECT * FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first();return t.json({success:!0,...s})}catch(r){return console.error("Erreur progression:",r),t.json({success:!1,error:r.message},500)}});async function zr(t){try{await t.prepare(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chauffeur_id INTEGER NOT NULL,
        sender TEXT NOT NULL DEFAULT 'chauffeur',
        message TEXT NOT NULL,
        original_lang TEXT DEFAULT 'fr',
        translated_fr TEXT,
        translated_chauffeur TEXT,
        read_by_admin INTEGER DEFAULT 0,
        read_by_chauffeur INTEGER DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
      )
    `).run(),await t.prepare("CREATE INDEX IF NOT EXISTS idx_chat_messages_chauffeur_id ON chat_messages(chauffeur_id)").run(),await t.prepare("CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp)").run(),console.log("✅ Table chat_messages prête avec colonnes de traduction")}catch(r){console.error("⚠️ Erreur auto-migration chat_messages:",r.message)}}p.post("/api/chauffeur/chat",async t=>{try{await zr(t.env.DB);const{chauffeur_id:r,message:s,sender:i,lang:a}=await t.req.json();if(!r||!s)return t.json({success:!1,error:"Données manquantes"},400);let n=a||"fr";if(!a){const m=await t.env.DB.prepare(`
        SELECT langue FROM chauffeur_arrivals WHERE id = ?
      `).bind(r).first();n=(m==null?void 0:m.langue)||"fr"}const l=i||"chauffeur";console.log(`📝 [CHAT] Message reçu - Sender: ${l}, Langue: ${n} (source: ${a?"frontend":"DB"})`);let o=s,c=s,d=n;return l==="chauffeur"?(console.log(`🌐 [CHAT] Chauffeur → Admin - Message: "${s.substring(0,50)}..."`),n!=="fr"?(o=await Et(s,"fr","auto",t.env.GOOGLE_TRANSLATE_API_KEY),console.log(`✅ [CHAT] Traduction FR: "${o.substring(0,50)}..."`)):console.log("ℹ️ [CHAT] Chauffeur français - pas de traduction nécessaire"),d=n,c=s):(console.log(`🌐 [CHAT] Admin → Chauffeur - Message: "${s.substring(0,50)}..."`),n!=="fr"?(c=await Et(s,n,"fr",t.env.GOOGLE_TRANSLATE_API_KEY),console.log(`✅ [CHAT] Traduction ${n}: "${c.substring(0,50)}..."`)):console.log("ℹ️ [CHAT] Chauffeur français - pas de traduction nécessaire"),d="fr",o=s),console.log(`💾 [CHAT] Insertion DB - message: "${s.substring(0,30)}...", translated_fr: "${o.substring(0,30)}...", translated_chauffeur: "${c.substring(0,30)}..."`),await t.env.DB.prepare(`
      INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_fr, translated_chauffeur, read_by_admin, read_by_chauffeur)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,l,s,d,o,c,l==="chauffeur"?0:1,l==="admin"?0:1).run(),console.log(`✅ [CHAT] Message enregistré avec succès - ID chauffeur: ${r}`),t.json({success:!0,translated_fr:o,translated_chauffeur:c})}catch(r){return console.error("Erreur envoi message:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/chauffeur/chat",async t=>{try{await zr(t.env.DB);const r=t.req.query("id")||t.req.query("chauffeur_id"),s=t.req.query("viewer")||"chauffeur";console.log(`📥 [CHAT GET] Récupération messages - Chauffeur: ${r}, Viewer: ${s}`);const i=await t.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first(),a=(i==null?void 0:i.langue)||"fr";console.log(`ℹ️ [CHAT GET] Langue chauffeur: ${a}`);const{results:n}=await t.env.DB.prepare(`
      SELECT * FROM chat_messages 
      WHERE chauffeur_id = ? 
      ORDER BY timestamp ASC
    `).bind(r).all();console.log(`📊 [CHAT GET] Nombre de messages: ${n.length}`);const l=n.map(o=>{var d,m,h,f;const c={...o,message:o.message,translated_fr:o.translated_fr||o.message,translated_chauffeur:o.translated_chauffeur||o.message,original_lang:o.original_lang||"fr"};return o.id===((d=n[0])==null?void 0:d.id)&&console.log(`📝 [CHAT GET] Premier message - message: "${(m=o.message)==null?void 0:m.substring(0,30)}...", translated_fr: "${(h=o.translated_fr)==null?void 0:h.substring(0,30)}...", translated_chauffeur: "${(f=o.translated_chauffeur)==null?void 0:f.substring(0,30)}..."`),c});return t.json({success:!0,messages:l,chauffeur_langue:a})}catch(r){return console.error("Erreur récupération messages:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/chat/heartbeat",async t=>{try{const{chauffeur_id:r,page_url:s}=await t.req.json();try{await t.env.DB.prepare(`
        INSERT INTO chauffeur_sessions (chauffeur_id, last_heartbeat, is_online, page_url)
        VALUES (?, datetime('now'), 1, ?)
        ON CONFLICT(chauffeur_id) 
        DO UPDATE SET 
          last_heartbeat = datetime('now'),
          is_online = 1,
          page_url = excluded.page_url
      `).bind(r,s||"").run()}catch{console.log("Table chauffeur_sessions not found, heartbeat skipped")}return t.json({success:!0,online:!0,timestamp:new Date().toISOString()})}catch(r){return console.error("Erreur heartbeat:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/chat/online-status",async t=>{try{const r=t.req.query("chauffeur_id");try{const s=await t.env.DB.prepare(`
        SELECT last_heartbeat, is_online,
               (julianday('now') - julianday(last_heartbeat)) * 86400 as seconds_ago
        FROM chauffeur_sessions
        WHERE chauffeur_id = ?
      `).bind(r).first(),i=s&&s.seconds_ago<30;return t.json({success:!0,online:i,last_heartbeat:(s==null?void 0:s.last_heartbeat)||null,seconds_ago:(s==null?void 0:s.seconds_ago)||null})}catch{return console.log("Table chauffeur_sessions not found, returning offline"),t.json({success:!0,online:!1,last_heartbeat:null,seconds_ago:null})}}catch(r){return console.error("Erreur statut en ligne:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/chauffeur/liste",async t=>{try{let r=`
      SELECT 
        ca.*,
        0 as online_status
      FROM chauffeur_arrivals ca
      WHERE ca.status = 'in_progress' 
      ORDER BY ca.arrival_time DESC
    `;try{const{results:s}=await t.env.DB.prepare(`
        SELECT 
          ca.*,
          cs.last_heartbeat,
          cs.is_online,
          cs.page_url,
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
      `).all();return t.json({success:!0,chauffeurs:s})}catch{console.log("Table chauffeur_sessions not found, using simple query");const{results:i}=await t.env.DB.prepare(r).all();return t.json({success:!0,chauffeurs:i})}}catch(r){return console.error("Erreur liste chauffeurs:",r),t.json({success:!1,error:r.message},500)}});p.use("*",async(t,r)=>{const s=t.req.path;if(["/login","/test-questionnaire","/qrcode-chauffeur","/chauffeur/langue","/chauffeur/video","/chauffeur/inscription","/chauffeur/taches"].includes(s)||s.startsWith("/static/")||s.startsWith("/api/chauffeur/")){await r();return}await r()});p.use(wi);p.get("/",t=>t.render(e(ki,{})));p.get("/reception",t=>t.render(e(Ei,{})));p.get("/accueil-chauffeur",t=>t.render(e(Ci,{})));p.get("/administrateur",t=>t.render(e(Ti,{})));p.get("/controleur",t=>t.render(e(qi,{})));p.get("/agent-quai",t=>t.render(e(Si,{})));p.get("/nouveau",t=>t.render(e(Ai,{})));p.get("/anomalies",t=>t.render(e(_i,{})));p.get("/bibliotheque",t=>t.render(e(Ri,{})));p.get("/contacts",t=>t.render(e(Fi,{})));p.get("/admin/chauffeurs-dashboard",t=>t.render(e(Ii,{})));p.post("/api/admin/chat",async t=>{try{const{chauffeur_id:r,message:s}=await t.req.json();if(!r||!s)return t.json({success:!1,error:"Données manquantes"},400);const i=await t.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(r).first(),a=(i==null?void 0:i.langue)||"fr";let n=s;a!=="fr"&&(n=await Et(s,a,"fr"));try{await t.env.DB.prepare(`
        INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_fr, translated_chauffeur, read_by_admin, read_by_chauffeur)
        VALUES (?, 'admin', ?, 'fr', ?, ?, 1, 0)
      `).bind(r,s,s,n).run()}catch{console.log("Using simple chat_messages structure for admin"),await t.env.DB.prepare(`
        INSERT INTO chat_messages (chauffeur_id, sender, message, read)
        VALUES (?, 'admin', ?, 0)
      `).bind(r,s).run()}return t.json({success:!0,translated:n})}catch(r){return console.error("Erreur envoi message admin:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/chauffeur/chat/mark-read",async t=>{try{const{chauffeur_id:r,reader:s}=await t.req.json(),i=s==="admin"?"read_by_admin":"read_by_chauffeur";return await t.env.DB.prepare(`
      UPDATE chat_messages 
      SET ${i} = 1, read_at = datetime('now')
      WHERE chauffeur_id = ? AND ${i} = 0
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur marquage lu:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/admin/cloturer-chauffeur",async t=>{try{const{chauffeur_id:r}=await t.req.json();return await t.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET status = 'completed', 
          completed = 1,
          completion_time = datetime('now')
      WHERE id = ?
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur clôture chauffeur:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/notifications/non-lues",async t=>{try{const{results:r}=await t.env.DB.prepare(`
      SELECT * FROM notifications 
      WHERE read = 0 
      ORDER BY timestamp DESC
      LIMIT 10
    `).all();return t.json({success:!0,notifications:r})}catch(r){return console.error("Erreur notifications:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/notification/mark-read",async t=>{try{const{notification_id:r}=await t.req.json();return await t.env.DB.prepare(`
      UPDATE notifications SET read = 1 WHERE id = ?
    `).bind(r).run(),t.json({success:!0})}catch(r){return console.error("Erreur marquage notification:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/admin/cloturer-chauffeur",async t=>{try{const{chauffeur_id:r}=await t.req.json();return await t.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET status = 'completed', 
          departure_time = datetime('now')
      WHERE id = ?
    `).bind(r).run(),console.log(`✅ Chauffeur ${r} clôturé`),t.json({success:!0})}catch(r){return console.error("Erreur clôture chauffeur:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/chauffeur/notification",async t=>{try{const{chauffeur_id:r,type:s,titre:i,message:a}=await t.req.json();return await t.env.DB.prepare(`
      INSERT INTO notifications (chauffeur_id, type, titre, message)
      VALUES (?, ?, ?, ?)
    `).bind(r,s,i,a).run(),t.json({success:!0})}catch(r){return console.error("Erreur création notification:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/chauffeurs/inscription",$i);p.get("/api/chauffeurs/:id",Ui);p.get("/api/chauffeurs/:id/taches",Vi);p.post("/api/taches/:id/completer",Hi);p.get("/api/chauffeurs/:id/messages",Gi);p.post("/api/messages",Qi);p.post("/api/messages/:id/marquer-vu",Xi);p.get("/api/admin/chauffeurs-actifs",Wi);p.post("/api/admin/taches/assigner",Yi);p.get("/api/quais",async t=>{try{const{results:r}=await t.env.DB.prepare(`
      SELECT * FROM quai_status ORDER BY quai_numero ASC
    `).all();return t.json({success:!0,quais:r})}catch(r){return console.error("Erreur récupération quais:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/fin-dechargement",async t=>{try{const r=await t.req.json();if(console.log("📦 Données reçues fin déchargement:",r),!r.quai_numero||!r.nom_agent||!r.numero_id||!r.fournisseur||!r.palettes_attendues||!r.palettes_recues||!r.palettes_a_rendre)return t.json({success:!1,error:"Données manquantes"},400);const s={numero_id:r.numero_id,fournisseur:r.fournisseur,remarques_utilisateur:r.remarques||""},i=JSON.stringify(s),a=JSON.stringify(r.problemes||[]);await t.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS fin_dechargement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quai_numero INTEGER NOT NULL,
        nom_agent TEXT NOT NULL,
        palettes_attendues INTEGER NOT NULL,
        palettes_recues INTEGER NOT NULL,
        palettes_a_rendre TEXT NOT NULL,
        problemes TEXT,
        autres_commentaire TEXT,
        remarques TEXT,
        timestamp TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run(),console.log("✅ Table fin_dechargement vérifiée (structure de base)");const n=await t.env.DB.prepare(`
      INSERT INTO fin_dechargement (
        quai_numero, nom_agent, palettes_attendues, palettes_recues,
        palettes_a_rendre, problemes, autres_commentaire, remarques, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(r.quai_numero,r.nom_agent,r.palettes_attendues,r.palettes_recues,r.palettes_a_rendre,a,r.autres_commentaire||null,i).run();console.log("✅ Fin de déchargement enregistrée - ID:",n.meta.last_row_id);try{const l=await t.env.DB.prepare(`
        SELECT timer_start FROM quai_status WHERE quai_numero = ?
      `).bind(r.quai_numero).first();console.log("📊 Quai data:",l);let o=null;if(l!=null&&l.timer_start){const c=new Date(l.timer_start.replace(" ","T")+"Z").getTime(),d=Date.now();o=Math.floor((d-c)/1e3),console.log(`⏱️ Durée calculée: ${o}s (${Math.floor(o/3600)}h ${Math.floor(o%3600/60)}m ${o%60}s)`)}console.log("💾 UPDATE avec:",{timerDuration:o,commentaire:`Déchargement terminé - ${r.nom_agent} - ${r.fournisseur} - ID:${r.numero_id}`,commentaire_auteur:r.nom_agent,quai_numero:r.quai_numero}),await t.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = 'fin_dechargement',
            timer_start = NULL,
            timer_duration = ?,
            commentaire = ?,
            commentaire_auteur = ?,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(o,`Déchargement terminé - ${r.nom_agent} - ${r.fournisseur} - ID:${r.numero_id}`,r.nom_agent,r.quai_numero).run(),console.log("✅ Quai",r.quai_numero,"marqué comme fin de déchargement - Timer figé à",o,"secondes (timer_start supprimé)")}catch(l){console.warn("⚠️ Contrainte CHECK - Fallback vers disponible:",l.message),await t.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = 'disponible',
            timer_start = timer_start,
            commentaire = ?,
            commentaire_auteur = ?,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(`✅ Déchargement terminé - ${r.nom_agent} - ${r.fournisseur} - ID:${r.numero_id} - Timer: voir historique`,r.nom_agent,r.quai_numero).run(),console.log("✅ Quai",r.quai_numero,"marqué comme disponible (fallback) - Timer conservé dans commentaire")}return t.json({success:!0,id:n.meta.last_row_id,message:"Déchargement enregistré avec succès"})}catch(r){return console.error("❌ Erreur enregistrement fin déchargement:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/fin-dechargement",async t=>{try{const r=t.req.query("quai"),s=parseInt(t.req.query("limit")||"50");let i="SELECT * FROM fin_dechargement",a=[];r&&(i+=" WHERE quai_numero = ?",a.push(parseInt(r))),i+=" ORDER BY created_at DESC LIMIT ?",a.push(s);const{results:n}=await t.env.DB.prepare(i).bind(...a).all(),l=n.map(o=>{let c=null;try{c=JSON.parse(o.remarques||"{}")}catch{c={remarques_utilisateur:o.remarques||""}}return{...o,problemes:JSON.parse(o.problemes||"[]"),numero_id:c.numero_id||null,fournisseur:c.fournisseur||null,remarques:c.remarques_utilisateur||o.remarques||""}});return t.json({success:!0,data:l})}catch(r){return console.error("❌ Erreur récupération fins déchargement:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/quais/:numero",async t=>{try{const r=parseInt(t.req.param("numero")),{statut:s,commentaire:i,commentaire_auteur:a}=await t.req.json(),n=[1,2,3,4,5,6,7,8,9,10,32,33,34,35,36,37,38,45,46,47,48,49,60,61,62,67,68,69,75,76,77,78,79,81,82,83,84,85,86,87,99,100,101,102,103];if(!n.includes(r))return t.json({success:!1,error:`Numéro de quai invalide. Quais valides : ${n.join(", ")}`},400);if(!["disponible","en_cours","indisponible","fin_dechargement"].includes(s))return t.json({success:!1,error:"Statut invalide"},400);if(s==="indisponible"&&!i)return t.json({success:!1,error:"Commentaire obligatoire pour statut indisponible"},400);s==="en_cours"?await t.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = datetime('now'),
            commentaire = NULL,
            commentaire_auteur = NULL,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(s,r).run():s==="disponible"?await t.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = NULL,
            commentaire = NULL,
            commentaire_auteur = NULL,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(s,r).run():await t.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = NULL,
            commentaire = ?, 
            commentaire_auteur = ?,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(s,i||null,a||null,r).run();const l=await t.env.DB.prepare(`
      SELECT * FROM quai_status WHERE quai_numero = ?
    `).bind(r).first();return t.json({success:!0,quai:l})}catch(r){return console.error("Erreur mise à jour quai:",r),t.json({success:!1,error:r.message},500)}});p.post("/api/quai/scan",async t=>{try{const{barcode:r,quai:s,action:i,timestamp:a}=await t.req.json();if(!r||!s||!i)return t.json({success:!1,error:"Paramètres manquants (barcode, quai, action requis)"},400);await t.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS quai_scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        barcode TEXT NOT NULL,
        quai_numero INTEGER NOT NULL,
        action TEXT NOT NULL,
        scan_timestamp TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `).run();const n=await t.env.DB.prepare(`
      INSERT INTO quai_scans (barcode, quai_numero, action, scan_timestamp)
      VALUES (?, ?, ?, ?)
    `).bind(r,s,i,a||new Date().toISOString()).run(),l=await t.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_scans,
        COUNT(DISTINCT quai_numero) as unique_quais,
        MAX(scan_timestamp) as last_scan
      FROM quai_scans
      WHERE date(scan_timestamp) = date('now')
    `).first();return t.json({success:!0,scan_id:n.meta.last_row_id,barcode:r,quai:s,action:i,timestamp:a,stats:l})}catch(r){return console.error("Erreur enregistrement scan:",r),t.json({success:!1,error:r.message},500)}});p.get("/api/quai/scans",async t=>{var r;try{const s=parseInt(t.req.query("limit")||"50"),i=t.req.query("quai");let a=`
      SELECT * FROM quai_scans 
      ${i?"WHERE quai_numero = ?":""}
      ORDER BY created_at DESC 
      LIMIT ?
    `;const{results:n}=i?await t.env.DB.prepare(a).bind(parseInt(i),s).all():await t.env.DB.prepare(a).bind(s).all(),l=`
      SELECT COUNT(*) as total FROM quai_scans
      ${i?"WHERE quai_numero = ?":""}
    `,o=i?await t.env.DB.prepare(l).bind(parseInt(i)).first():await t.env.DB.prepare(l).first(),c=(o==null?void 0:o.total)||0;return t.json({success:!0,scans:n,total:c,limit:s})}catch(s){return(r=s.message)!=null&&r.includes("no such table")?t.json({success:!0,scans:[],total:0,limit:0}):(console.error("Erreur récupération scans:",s),t.json({success:!1,error:s.message},500))}});const Zt=new _r,Zi=Object.assign({"/src/index.tsx":p});let Br=!1;for(const[,t]of Object.entries(Zi))t&&(Zt.route("/",t),Zt.notFound(t.notFoundHandler),Br=!0);if(!Br)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{Zt as default};
