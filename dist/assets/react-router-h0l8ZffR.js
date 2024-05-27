import{r as n}from"./react-CZZ3WKnm.js";import{i as d,g as O,r as L,j as E,p as j,m as T,A as I,s as _}from"./@remix-run-S0eZGtat.js";/**
 * React Router v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},P.apply(this,arguments)}const B=n.createContext(null),H=n.createContext(null),g=n.createContext(null),b=n.createContext(null),m=n.createContext({outlet:null,matches:[],isDataRoute:!1});function ee(e,t){let{relative:r}=t===void 0?{}:t;y()||d(!1);let{basename:a,navigator:s}=n.useContext(g),{hash:l,pathname:o,search:f}=D(e,{relative:r}),u=o;return a!=="/"&&(u=o==="/"?a:E([a,o])),s.createHref({pathname:u,search:f,hash:l})}function y(){return n.useContext(b)!=null}function U(){return y()||d(!1),n.useContext(b).location}function M(e){n.useContext(g).static||n.useLayoutEffect(e)}function te(){let{isDataRoute:e}=n.useContext(m);return e?X():F()}function F(){y()||d(!1);let e=n.useContext(B),{basename:t,future:r,navigator:a}=n.useContext(g),{matches:s}=n.useContext(m),{pathname:l}=U(),o=JSON.stringify(O(s,r.v7_relativeSplatPath)),f=n.useRef(!1);return M(()=>{f.current=!0}),n.useCallback(function(i,c){if(c===void 0&&(c={}),!f.current)return;if(typeof i=="number"){a.go(i);return}let h=L(i,JSON.parse(o),l,c.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:E([t,h.pathname])),(c.replace?a.replace:a.push)(h,c.state,c)},[t,a,o,l,e])}const w=n.createContext(null);function z(e){let t=n.useContext(m).outlet;return t&&n.createElement(w.Provider,{value:e},t)}function D(e,t){let{relative:r}=t===void 0?{}:t,{future:a}=n.useContext(g),{matches:s}=n.useContext(m),{pathname:l}=U(),o=JSON.stringify(O(s,a.v7_relativeSplatPath));return n.useMemo(()=>L(e,JSON.parse(o),l,r==="path"),[e,o,l,r])}function V(e,t){return W(e,t)}function W(e,t,r,a){y()||d(!1);let{navigator:s}=n.useContext(g),{matches:l}=n.useContext(m),o=l[l.length-1],f=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let i=U(),c;if(t){var h;let p=typeof t=="string"?j(t):t;u==="/"||(h=p.pathname)!=null&&h.startsWith(u)||d(!1),c=p}else c=i;let C=c.pathname||"/",v=C;if(u!=="/"){let p=u.replace(/^\//,"").split("/");v="/"+C.replace(/^\//,"").split("/").slice(p.length).join("/")}let R=T(e,{pathname:v}),x=A(R&&R.map(p=>Object.assign({},p,{params:Object.assign({},f,p.params),pathname:E([u,s.encodeLocation?s.encodeLocation(p.pathname).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?u:E([u,s.encodeLocation?s.encodeLocation(p.pathnameBase).pathname:p.pathnameBase])})),l,r);return t&&x?n.createElement(b.Provider,{value:{location:P({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:I.Pop}},x):x}function q(e){let{routeContext:t,match:r,children:a}=e,s=n.useContext(B);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(m.Provider,{value:t},a)}function A(e,t,r,a){var s;if(t===void 0&&(t=[]),r=null,e==null){var l;if((l=r)!=null&&l.errors)e=r.matches;else return null}let o=e,f=(s=r)==null?void 0:s.errors;if(f!=null){let u=o.findIndex(i=>i.route.id&&(f==null?void 0:f[i.route.id]));u>=0||d(!1),o=o.slice(0,Math.min(o.length,u+1))}return o.reduceRight((u,i,c)=>{let h=t.concat(o.slice(0,c+1));return(()=>{let v;return i.route.Component?v=n.createElement(i.route.Component,null):i.route.element?v=i.route.element:v=u,n.createElement(q,{match:i,routeContext:{outlet:u,matches:h,isDataRoute:r!=null},children:v})})()},null)}var J=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(J||{}),S=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(S||{});function G(e){let t=n.useContext(B);return t||d(!1),t}function K(e){let t=n.useContext(m);return t||d(!1),t}function Q(e){let t=K(),r=t.matches[t.matches.length-1];return r.route.id||d(!1),r.route.id}function X(){let{router:e}=G(J.UseNavigateStable),t=Q(S.UseNavigateStable),r=n.useRef(!1);return M(()=>{r.current=!0}),n.useCallback(function(s,l){l===void 0&&(l={}),r.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,P({fromRouteId:t},l)))},[e,t])}function ae(e){return z(e.context)}function Y(e){d(!1)}function ne(e){let{basename:t="/",children:r=null,location:a,navigationType:s=I.Pop,navigator:l,static:o=!1,future:f}=e;y()&&d(!1);let u=t.replace(/^\/*/,"/"),i=n.useMemo(()=>({basename:u,navigator:l,static:o,future:P({v7_relativeSplatPath:!1},f)}),[u,f,l,o]);typeof a=="string"&&(a=j(a));let{pathname:c="/",search:h="",hash:C="",state:v=null,key:R="default"}=a,x=n.useMemo(()=>{let p=_(c,u);return p==null?null:{location:{pathname:p,search:h,hash:C,state:v,key:R},navigationType:s}},[u,c,h,C,v,R,s]);return x==null?null:n.createElement(g.Provider,{value:i},n.createElement(b.Provider,{children:r,value:x}))}function re(e){let{children:t,location:r}=e;return V(N(t),r)}new Promise(()=>{});function N(e,t){t===void 0&&(t=[]);let r=[];return n.Children.forEach(e,(a,s)=>{if(!n.isValidElement(a))return;let l=[...t,s];if(a.type===n.Fragment){r.push.apply(r,N(a.props.children,l));return}a.type!==Y&&d(!1),!a.props.index||!a.props.children||d(!1);let o={id:a.props.id||l.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(o.children=N(a.props.children,l)),r.push(o)}),r}export{H as D,g as N,ae as O,ne as R,te as a,U as b,D as c,B as d,re as e,Y as f,ee as u};
