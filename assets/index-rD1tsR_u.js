import{j as e,r as o,a3 as n,a4 as t,a5 as r,a6 as s,a7 as i,a8 as c,a9 as d,a0 as l}from"./vendor-1grrXN3N.js";import{u as a,S as u}from"./vendor-notistack-UZIesxaW.js";import{S as h,B as x,G as g,g as k,a as p,T as f,b,d as P,u as j,P as m,e as L,f as R,M as E,h as T,L as C,i as I,j as y,C as N,k as v}from"./vendor-%40mui%2Fmaterial-xT2yfLRe.js";import{L as S,D as O,S as _}from"./vendor-%40mui%2Ficons-material-5juoTG9O.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&o(e)})).observe(document,{childList:!0,subtree:!0})}function o(e){if(e.ep)return;e.ep=!0;const o=function(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?o.credentials="include":"anonymous"===e.crossOrigin?o.credentials="omit":o.credentials="same-origin",o}(e);fetch(e.href,o)}}();var w=(e=>(e[e.EOF=0]="EOF",e[e.SYMBOL=1]="SYMBOL",e[e.KEYWORD=2]="KEYWORD",e[e.WHITE_SPACE=3]="WHITE_SPACE",e[e.LEFT_PAREN=4]="LEFT_PAREN",e[e.RIGHT_PAREN=5]="RIGHT_PAREN",e[e.LEFT_CURLY=6]="LEFT_CURLY",e[e.RIGHT_CURLY=7]="RIGHT_CURLY",e[e.SEMICOLON=8]="SEMICOLON",e))(w||{});const F=["for","if","else","while","do"],Y={"{":6,"}":7,"(":4,")":5,";":8},A=e=>{const o={kind:0,text:"",lineNumber:e.lineNumber,charNumber:e.charNumber};if(e.cursorPos>=e.contentLength)return o;if(o.text=e.content[e.cursorPos],e.cursorPos++,e.charNumber++,/\s/.test(o.text))return o.kind=3,"\n"===o.text&&(e.lineNumber++,e.charNumber=1),o;if(o.text in Y)return o.kind=Y[o.text],o;for(;e.cursorPos<e.contentLength&&!(e.content[e.cursorPos]in Y)&&!/\s/.test(e.content[e.cursorPos]);)o.text+=e.content[e.cursorPos],e.cursorPos++,e.charNumber++;return F.includes(o.text)?(o.kind=2,o):(o.kind=1,o)};var U=(e=>(e[e.END=0]="END",e[e.ERROR=1]="ERROR",e[e.PROCESS=2]="PROCESS",e[e.LOOP_FIRST=3]="LOOP_FIRST",e[e.LOOP_LAST=4]="LOOP_LAST",e[e.IF_ELSE=5]="IF_ELSE",e[e.FUNCTION=6]="FUNCTION",e))(U||{});const G=e=>({tokens:e,tokenLength:e.length,cursorPos:0}),H=(e,o,n)=>{if(e.cursorPos>=e.tokenLength)return[];if(e.tokens[e.cursorPos].kind!==o)return[];e.cursorPos++;const t=[];let r,s=-1;for(;e.cursorPos<e.tokenLength&&(r=e.tokens[e.cursorPos],e.cursorPos++,t.push(r),r.kind===o&&s--,r.kind===n&&s++,0!==s););return t},B=e=>{if(!(e.cursorPos>=e.tokenLength)&&e.tokens[e.cursorPos].kind===w.WHITE_SPACE)for(;e.tokens[e.cursorPos].kind===w.WHITE_SPACE;)if(e.cursorPos++,e.cursorPos>=e.tokenLength)return},W=(e,o,n)=>{const{text:t,lineNumber:r,charNumber:s}=e;return{kind:1,reason:`Incomplete ${o} declaration. Missing a "${n}" token.`,context:t,caretOffset:t.length,lineNumber:r,charNumber:s}},$=(e,o,n,t)=>{const{text:r}=e,{text:s,lineNumber:i,charNumber:c}=o;return{kind:1,reason:`Unexpected token found in ${n} declaration. Expected a "${t}" token but found "${s}" instead.`,context:`${r} ${s}`,caretOffset:r.length+1,lineNumber:i,charNumber:c}},M=e=>{if(B(e),e.cursorPos>=e.tokenLength)return{kind:0};const o=e.tokens[e.cursorPos];if(e.cursorPos++,o.kind===w.KEYWORD)switch(o.text){case"for":case"while":return(e=>{const o={kind:3,body:[],condition:[]};let n=e.tokens[e.cursorPos-1];if(B(e),e.cursorPos>=e.tokenLength)return W(n,"test-first loop","(");if(e.tokens[e.cursorPos].kind!==w.LEFT_PAREN)return $(n,e.tokens[e.cursorPos],"test-first loop","(");if(n=e.tokens[e.cursorPos],o.condition=H(e,w.LEFT_PAREN,w.RIGHT_PAREN),o.condition.length>0&&(n=o.condition[o.condition.length-1]),0===o.condition.length||n.kind!==w.RIGHT_PAREN)return W(n,"test-first loop",")");if(o.condition.pop(),B(e),e.cursorPos>=e.tokenLength)return W(n,"test-first loop","{");if(e.tokens[e.cursorPos].kind!==w.LEFT_CURLY)return $(n,e.tokens[e.cursorPos],"test-first loop","{");n=e.tokens[e.cursorPos];const t=H(e,w.LEFT_CURLY,w.RIGHT_CURLY);return t.length>0&&(n=t[t.length-1]),0===t.length||n.kind!==w.RIGHT_CURLY?W(n,"test-first loop","}"):(t.pop(),o.body=D(G(t)),o)})(e);case"do":return(e=>{const o={kind:4,body:[],condition:[]};let n=e.tokens[e.cursorPos-1];if(B(e),e.cursorPos>=e.tokenLength)return W(n,"test-last loop","{");if(e.tokens[e.cursorPos].kind!==w.LEFT_CURLY)return $(n,e.tokens[e.cursorPos],"test-last loop","{");n=e.tokens[e.cursorPos];const t=H(e,w.LEFT_CURLY,w.RIGHT_CURLY);return t.length>0&&(n=t[t.length-1]),0===t.length||n.kind!==w.RIGHT_CURLY?W(n,"test-last loop","}"):(t.pop(),B(e),e.cursorPos>=e.tokenLength?W(n,"test-last loop","while"):e.tokens[e.cursorPos].kind!==w.KEYWORD||"while"!==e.tokens[e.cursorPos].text?$(n,e.tokens[e.cursorPos],"test-last loop","while"):(n=e.tokens[e.cursorPos],e.cursorPos++,B(e),e.cursorPos>=e.tokenLength?W(n,"test-last loop","("):e.tokens[e.cursorPos].kind!==w.LEFT_PAREN?$(n,e.tokens[e.cursorPos],"test-last loop","("):(n=e.tokens[e.cursorPos],o.condition=H(e,w.LEFT_PAREN,w.RIGHT_PAREN),o.condition.length>0&&(n=o.condition[o.condition.length-1]),0===o.condition.length||n.kind!==w.RIGHT_PAREN?W(n,"test-last loop",")"):(o.condition.pop(),B(e),e.cursorPos>=e.tokenLength?W(n,"test-last loop",";"):e.tokens[e.cursorPos].kind!==w.SEMICOLON?$(n,e.tokens[e.cursorPos],"test-last loop",";"):(e.cursorPos++,o.body=D(G(t)),o)))))})(e);case"if":return(e=>{const o={kind:5,condition:[],bodyIf:[],bodyElse:[]};let n=e.tokens[e.cursorPos-1];if(B(e),e.cursorPos>=e.tokenLength)return W(n,"branching block (if)","(");if(e.tokens[e.cursorPos].kind!==w.LEFT_PAREN)return $(n,e.tokens[e.cursorPos],"branching block (if)","(");if(n=e.tokens[e.cursorPos],o.condition=H(e,w.LEFT_PAREN,w.RIGHT_PAREN),o.condition.length>0&&(n=o.condition[o.condition.length-1]),0===o.condition.length||n.kind!==w.RIGHT_PAREN)return W(n,"branching block (if)",")");if(o.condition.pop(),B(e),e.cursorPos>=e.tokenLength)return W(n,"branching block (if)","{");if(e.tokens[e.cursorPos].kind!==w.LEFT_CURLY)return $(n,e.tokens[e.cursorPos],"branching block (if)","{");n=e.tokens[e.cursorPos];const t=H(e,w.LEFT_CURLY,w.RIGHT_CURLY);if(t.length>0&&(n=t[t.length-1]),0===t.length||n.kind!==w.RIGHT_CURLY)return W(n,"branching block (if)","}");if(t.pop(),o.bodyIf=D(G(t)),B(e),e.cursorPos>=e.tokenLength||e.tokens[e.cursorPos].kind!==w.KEYWORD||"else"!==e.tokens[e.cursorPos].text)return o;if(n=e.tokens[e.cursorPos],e.cursorPos++,B(e),e.cursorPos>=e.tokenLength)return W(n,"branching block (if-else)","{");if(e.tokens[e.cursorPos].kind!==w.LEFT_CURLY)return $(n,e.tokens[e.cursorPos],"branching block (if-else)","{");n=e.tokens[e.cursorPos];const r=H(e,w.LEFT_CURLY,w.RIGHT_CURLY);return r.length>0&&(n=r[r.length-1]),0===r.length||n.kind!==w.RIGHT_CURLY?W(n,"branching block (if-else)","}"):(r.pop(),o.bodyElse=D(G(r)),o)})(e)}const n=[o];let t=o;if(t.kind===w.SEMICOLON)return{kind:2,body:[]};for(;e.cursorPos<e.tokenLength&&e.tokens[e.cursorPos].kind!==w.SEMICOLON&&e.tokens[e.cursorPos].kind!==w.LEFT_CURLY;)t=e.tokens[e.cursorPos],n.push(e.tokens[e.cursorPos]),e.cursorPos++;if(e.cursorPos>=e.tokenLength||e.tokens[e.cursorPos].kind!==w.LEFT_CURLY&&e.tokens[e.cursorPos].kind!==w.SEMICOLON)return W(t,"process",";");if(e.tokens[e.cursorPos].kind===w.SEMICOLON)return e.cursorPos++,{kind:2,body:n};t=e.tokens[e.cursorPos];const r=H(e,w.LEFT_CURLY,w.RIGHT_CURLY);return r.length>0&&(t=r[r.length-1]),0===r.length||t.kind!==w.RIGHT_CURLY?W(t,"function","}"):(r.pop(),{kind:6,declaration:n,body:D(G(r))})},D=e=>{const o=[];let n;for(;0!==(n=M(e)).kind&&(o.push(n),1!==n.kind););return o},z=o=>{const{sx:n}=o;return e.jsx(h,{sx:{position:"absolute",width:"100%",height:"100%",...n},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",fill:"none",viewBox:"0 0 5 5",strokeWidth:"0.1",children:e.jsx("line",{x1:"0",y1:"0",x2:"5",y2:"5",stroke:"currentColor",strokeLinecap:"round"})})})},K=o=>{const{sx:n}=o;return e.jsx(h,{sx:{position:"absolute",width:"100%",height:"100%",...n},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",fill:"none",viewBox:"0 0 5 5",strokeWidth:"0.1",children:e.jsx("line",{x1:"0",y1:"5",x2:"5",y2:"0",stroke:"currentColor",strokeLinecap:"round"})})})},V=o=>{const{children:n,borderTop:t,borderBottom:r,borderLeft:s,borderRight:i}=o;return e.jsx(x,{sx:{borderStyle:"solid",borderLeftWidth:s?2:0,borderTopWidth:t?2:0,borderBottomWidth:r?2:0,borderRightWidth:i?2:0},children:n})},q=o=>{const{children:n,...t}=o;return e.jsx(f,{padding:1.5,...t,sx:{fontFamily:"Fira Code",wordBreak:"break-word",fontVariantLigatures:"contextual",...t.sx},children:n??"-"})},J=o=>{const{bodyTokens:n,...t}=o;let r;return void 0!==n&&(r=n.map((e=>e.text)).join("").trim(),0===r.length&&(r=void 0)),e.jsx(V,{...t,children:e.jsx(q,{children:r})})},X=o=>{const{conditionTokens:n,body:t,...r}=o;let s;void 0!==n&&n.length>0&&(s=n.map((e=>e.text)).join("").trim());let i=e.jsx(J,{borderTop:!0,borderLeft:!0});return t.length>0&&(i=t.map(((o,n)=>e.jsx(ne,{borderTop:!0,borderLeft:!0,node:o},`subnode-${n}`)))),e.jsxs(V,{...r,children:[e.jsx(q,{children:s}),e.jsx(x,{paddingLeft:2,children:i})]})},Q=o=>{const{conditionTokens:n,body:t,...r}=o;let s;void 0!==n&&n.length>0&&(s=n.map((e=>e.text)).join("").trim());let i=e.jsx(J,{borderBottom:!0,borderLeft:!0});return t.length>0&&(i=t.map(((o,n)=>e.jsx(ne,{node:o,borderBottom:!0,borderLeft:!0},`subnode-${n}`)))),e.jsxs(V,{...r,children:[e.jsx(x,{paddingLeft:2,children:i}),e.jsx(q,{children:s})]})},Z=o=>{const{conditionTokens:n,bodyIf:t,bodyElse:r,...s}=o;let i;void 0!==n&&n.length>0&&(i=n.map((e=>e.text)).join("").trim());let c=e.jsx(J,{borderTop:!0});t.length>0&&(c=t.map(((o,n)=>e.jsx(ne,{borderTop:!0,node:o},`index-${n}`))));let d=e.jsx(J,{borderTop:!0});return r.length>0&&(d=r.map(((o,n)=>e.jsx(ne,{borderTop:!0,node:o},`index-${n}`)))),e.jsx(V,{...s,children:e.jsxs(g,{container:!0,height:"100%",children:[e.jsx(g,{item:!0,xs:12,children:e.jsx(q,{align:"center",children:i})}),e.jsx(g,{item:!0,xs:6,children:e.jsxs(x,{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",children:[e.jsx(q,{sx:{zIndex:2,backgroundColor:k[300]},children:"True"}),e.jsx(z,{htmlColor:"black"})]})}),e.jsx(g,{item:!0,xs:6,children:e.jsxs(x,{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",children:[e.jsx(K,{}),e.jsx(q,{sx:{zIndex:2,backgroundColor:k[300]},children:"False"})]})}),e.jsx(g,{item:!0,xs:6,children:e.jsx(p,{height:"100%",sx:{borderColor:"inherit",borderRightStyle:"solid",borderRightWidth:2},children:c})}),e.jsx(g,{item:!0,xs:6,children:e.jsx(p,{height:"100%",children:d})})]})})},ee=o=>{const{declarationTokens:n,body:t,...r}=o;let s;void 0!==n&&n.length>0&&(s=n.map((e=>e.text)).join("").trim());let i=e.jsx(J,{borderTop:!0,borderLeft:!0,borderRight:!0});return t.length>0&&(i=t.map(((o,n)=>e.jsx(ne,{node:o,borderTop:!0,borderLeft:!0,borderRight:!0},`subnode-${n}`)))),e.jsxs(V,{...r,children:[e.jsx(q,{align:"center",children:s}),e.jsx(x,{paddingX:2,children:i})]})},oe=o=>{const{context:n,reason:t,lineNumber:r,charNumber:s,caretOffset:i,...c}=o,d=`At line ${r}, character ${s}: ${t}`,l="~".repeat(i)+"^";return e.jsxs(V,{...c,children:[e.jsx(q,{children:d}),e.jsx(q,{paddingY:0,children:n}),e.jsx(q,{paddingY:0,children:l})]})},ne=n=>{const{node:t,...r}=n;switch(t.kind){case U.ERROR:return e.jsx(oe,{...r,caretOffset:t.caretOffset,context:t.context,reason:t.reason,lineNumber:t.lineNumber,charNumber:t.charNumber});case U.FUNCTION:return e.jsx(ee,{declarationTokens:t.declaration,body:t.body,...r});case U.LOOP_FIRST:return e.jsx(X,{...r,conditionTokens:t.condition,body:t.body});case U.LOOP_LAST:return e.jsx(Q,{...r,conditionTokens:t.condition,body:t.body});case U.IF_ELSE:return e.jsx(Z,{...r,conditionTokens:t.condition,bodyIf:t.bodyIf,bodyElse:t.bodyElse});case U.PROCESS:return e.jsx(J,{...r,bodyTokens:t.body})}return e.jsx(o.Fragment,{})},te=o=>{const{nodes:n,id:t,boxProps:r}=o;let s=e.jsx(f,{fontFamily:"Fira Code",fontStyle:"italic",children:"Nothing to display."});return n.length>0&&(s=n.map(((o,t)=>e.jsx(ne,{node:o,borderLeft:!0,borderTop:!0,borderRight:!0,borderBottom:t===n.length-1},`top-level-node-${t}`)))),e.jsx(x,{sx:{...r,backgroundColor:k[300],borderColor:k[700],height:"100%"},children:e.jsx(x,{id:t,sx:{maxWidth:"640px",backgroundColor:k[300],borderColor:k[700]},children:s})})},re=o=>{const{value:r,onValueChange:s}=o;return e.jsx(n,{value:r,onChange:s,theme:"dark",extensions:[t.lineWrapping]})},se=o=>{const{collapsed:n,...t}=o;return n?e.jsx(b,{title:t.children,children:e.jsxs(P,{...t,startIcon:void 0,endIcon:void 0,children:[t.startIcon,t.endIcon]})}):e.jsx(P,{...t,startIcon:t.startIcon,endIcon:t.endIcon,children:t.children})},ie=n=>{const{slotAppBar:t,slotPanelLeft:r,slotPanelRight:s}=n,i=o.useRef(null),[c,d]=o.useState(0),[l,a]=o.useState((e=>{const o=new URL(e).searchParams.get("preview");return null!==o&&"true"===o})(window.location.href)),u=j((e=>e.breakpoints.down("md")));return o.useEffect((()=>{null!==i.current&&d(i.current.getBoundingClientRect().height)}),[i]),e.jsxs(x,{children:[e.jsx(m,{ref:i,square:!0,elevation:0,sx:{padding:1},children:e.jsxs(p,{display:"flex",direction:"row",justifyContent:"space-between",children:[e.jsxs(L,{variant:"outlined",children:[e.jsx(P,{onClick:()=>{a((e=>!e))},children:l?"Show code":"Hide code"})," ",e.jsx(P,{href:"https://eurydia.github.io/project-nassi-shneiderman-diagram-builder-online-docs/",component:"a",target:"_blank",endIcon:e.jsx(S,{}),children:"docs"})]}),t]})}),e.jsx(x,{children:e.jsxs(g,{container:!0,children:[e.jsx(g,{item:!0,xs:12,lg:6,display:l?"none":void 0,children:e.jsx(x,{overflow:"auto",height:`calc(100vh - ${c}px)`,children:r})}),e.jsx(g,{item:!0,xs:!0,lg:!0,display:u&&!l?"none":void 0,children:e.jsx(x,{overflow:"auto",height:`calc(100vh - ${c}px)`,children:s})})]})})]})},ce=()=>{const{enqueueSnackbar:n}=a(),{exportJPEG:t,exportPNG:d,exportSVG:l}=(u="structogram-preview-region",{exportSVG:async()=>{const e=document.getElementById(u);return null!==e&&r(e).then((e=>null!==e&&(s.saveAs(e,"structogram"),!0)))},exportJPEG:async()=>{const e=document.getElementById(u);return null!==e&&c(e).then((e=>null!==e&&(s.saveAs(e,"structogram"),!0)))},exportPNG:async()=>{const e=document.getElementById(u);return null!==e&&i(e).then((e=>null!==e&&(s.saveAs(e,"structogram"),!0)))}});var u;const{editorContent:h,setEditorContent:x}=((e,n)=>{const[t,r]=o.useState((()=>{const o=new URL(e).searchParams.get("content");if(null!==o)return window.localStorage.setItem(n,o),o;const t=window.localStorage.getItem(n);return null!==t?t:""}));return{editorContent:t,setEditorContent:e=>{r(e),window.localStorage.setItem(n,e)}}})(window.location.href,"autosaveContent"),g=j((e=>e.breakpoints.down("md"))),[k,p]=o.useState([]),[f,b]=o.useState(null);o.useEffect((()=>{const e=(e=>{const o=[];let n;for(;0!==(n=A(e)).kind;)o.push(n);return o})((e=>{const o=(e=>{let o="",n=0;for(;n<e.length;){if(n+1<e.length&&"/"===e[n]&&"/"===e[n+1])for(;n<e.length&&"\n"!==e[n];)n++;o+=e[n],n++}return o})(e.normalize());return{content:o,contentLength:o.length,cursorPos:0,lineNumber:1,charNumber:1}})(h)),o=D(G(e));p(o)}),[h]);const P=async e=>{e().then((e=>{e?n("Diagram exported",{variant:"info"}):n("Failed to export diagram",{variant:"error"})}))};return e.jsxs(o.Fragment,{children:[e.jsx(ie,{slotAppBar:e.jsxs(L,{variant:"outlined",children:[e.jsx(se,{collapsed:g,startIcon:e.jsx(O,{}),onClick:e=>{b(e.currentTarget)},children:"EXPORT"}),e.jsx(se,{collapsed:g,endIcon:e.jsx(_,{}),onClick:()=>{navigator.clipboard.writeText(((e,o)=>{const n=new URL(o);return n.searchParams.set("preview","true"),n.searchParams.set("content",e),n.href})(h,window.location.href)),n("Link copied to clipboard",{variant:"info"})},children:"SHARE"})]}),slotPanelLeft:e.jsx(re,{value:h,onValueChange:x}),slotPanelRight:e.jsx(te,{nodes:k,id:"structogram-preview-region",boxProps:{padding:4,userSelect:"none"}})}),e.jsx(R,{anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},anchorEl:f,open:null!==f,onClose:()=>{b(null)},children:e.jsx(m,{sx:{padding:1},children:e.jsxs(E,{children:[e.jsxs(T,{onClick:()=>P(t),children:[e.jsx(C,{children:e.jsx(O,{fontSize:"small"})}),e.jsx(I,{children:"Save as JPEG"})]}),e.jsxs(T,{onClick:()=>P(d),children:[e.jsx(C,{children:e.jsx(O,{fontSize:"small"})}),e.jsx(I,{children:"Save as PNG"})]}),e.jsxs(T,{onClick:()=>P(l),children:[e.jsx(C,{children:e.jsx(O,{fontSize:"small"})}),e.jsx(I,{children:"Save as SVG"})]})]})})})]})},de=y({palette:{mode:"dark"}}),le=()=>e.jsxs(o.Fragment,{children:[e.jsx(N,{}),e.jsx(v,{theme:de,children:e.jsx(u,{preventDuplicate:!0,autoHideDuration:2e3,anchorOrigin:{vertical:"top",horizontal:"center"},children:e.jsx(ce,{})})})]});d.createRoot(document.getElementById("root")).render(e.jsx(l.StrictMode,{children:e.jsx(le,{})}));
//# sourceMappingURL=index-rD1tsR_u.js.map
