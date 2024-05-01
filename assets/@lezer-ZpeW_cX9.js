let Mt=0;class dt{constructor(t,e){this.from=t,this.to=e}}class S{constructor(t={}){this.id=Mt++,this.perNode=!!t.perNode,this.deserialize=t.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")})}add(t){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof t!="function"&&(t=K.match(t)),e=>{let r=t(e);return r===void 0?null:[this,r]}}}S.closedBy=new S({deserialize:l=>l.split(" ")});S.openedBy=new S({deserialize:l=>l.split(" ")});S.group=new S({deserialize:l=>l.split(" ")});S.contextHash=new S({perNode:!0});S.lookAhead=new S({perNode:!0});S.mounted=new S({perNode:!0});class ft{constructor(t,e,r){this.tree=t,this.overlay=e,this.parser=r}static get(t){return t&&t.props&&t.props[S.mounted.id]}}const Et=Object.create(null);class K{constructor(t,e,r,i=0){this.name=t,this.props=e,this.id=r,this.flags=i}static define(t){let e=t.props&&t.props.length?Object.create(null):Et,r=(t.top?1:0)|(t.skipped?2:0)|(t.error?4:0)|(t.name==null?8:0),i=new K(t.name||"",e,t.id,r);if(t.props){for(let n of t.props)if(Array.isArray(n)||(n=n(i)),n){if(n[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");e[n[0].id]=n[1]}}return i}prop(t){return this.props[t.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(t){if(typeof t=="string"){if(this.name==t)return!0;let e=this.prop(S.group);return e?e.indexOf(t)>-1:!1}return this.id==t}static match(t){let e=Object.create(null);for(let r in t)for(let i of r.split(" "))e[i]=t[r];return r=>{for(let i=r.prop(S.group),n=-1;n<(i?i.length:0);n++){let s=e[n<0?r.name:i[n]];if(s)return s}}}}K.none=new K("",Object.create(null),0,8);const st=new WeakMap,Nt=new WeakMap;var z;(function(l){l[l.ExcludeBuffers=1]="ExcludeBuffers",l[l.IncludeAnonymous=2]="IncludeAnonymous",l[l.IgnoreMounts=4]="IgnoreMounts",l[l.IgnoreOverlays=8]="IgnoreOverlays"})(z||(z={}));class q{constructor(t,e,r,i,n){if(this.type=t,this.children=e,this.positions=r,this.length=i,this.props=null,n&&n.length){this.props=Object.create(null);for(let[s,h]of n)this.props[typeof s=="number"?s:s.id]=h}}toString(){let t=ft.get(this);if(t&&!t.overlay)return t.tree.toString();let e="";for(let r of this.children){let i=r.toString();i&&(e&&(e+=","),e+=i)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(e.length?"("+e+")":""):e}cursor(t=0){return new mt(this.topNode,t)}cursorAt(t,e=0,r=0){let i=st.get(this)||this.topNode,n=new mt(i);return n.moveTo(t,e),st.set(this,n._tree),n}get topNode(){return new M(this,0,0,null)}resolve(t,e=0){let r=it(st.get(this)||this.topNode,t,e,!1);return st.set(this,r),r}resolveInner(t,e=0){let r=it(Nt.get(this)||this.topNode,t,e,!0);return Nt.set(this,r),r}resolveStack(t,e=0){return Tt(this,t,e)}iterate(t){let{enter:e,leave:r,from:i=0,to:n=this.length}=t,s=t.mode||0,h=(s&z.IncludeAnonymous)>0;for(let f=this.cursor(s|z.IncludeAnonymous);;){let u=!1;if(f.from<=n&&f.to>=i&&(!h&&f.type.isAnonymous||e(f)!==!1)){if(f.firstChild())continue;u=!0}for(;u&&r&&(h||!f.type.isAnonymous)&&r(f),!f.nextSibling();){if(!f.parent())return;u=!0}}}prop(t){return t.perNode?this.props?this.props[t.id]:void 0:this.type.prop(t)}get propValues(){let t=[];if(this.props)for(let e in this.props)t.push([+e,this.props[e]]);return t}balance(t={}){return this.children.length<=8?this:wt(K.none,this.children,this.positions,0,this.children.length,0,this.length,(e,r,i)=>new q(this.type,e,r,i,this.propValues),t.makeTree||((e,r,i)=>new q(K.none,e,r,i)))}static build(t){return Ht(t)}}q.empty=new q(K.none,[],[],0);class bt{constructor(t,e){this.buffer=t,this.index=e}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new bt(this.buffer,this.index)}}class ${constructor(t,e,r){this.buffer=t,this.length=e,this.set=r}get type(){return K.none}toString(){let t=[];for(let e=0;e<this.buffer.length;)t.push(this.childString(e)),e=this.buffer[e+3];return t.join(",")}childString(t){let e=this.buffer[t],r=this.buffer[t+3],i=this.set.types[e],n=i.name;if(/\W/.test(n)&&!i.isError&&(n=JSON.stringify(n)),t+=4,r==t)return n;let s=[];for(;t<r;)s.push(this.childString(t)),t=this.buffer[t+3];return n+"("+s.join(",")+")"}findChild(t,e,r,i,n){let{buffer:s}=this,h=-1;for(let f=t;f!=e&&!(zt(n,i,s[f+1],s[f+2])&&(h=f,r>0));f=s[f+3]);return h}slice(t,e,r){let i=this.buffer,n=new Uint16Array(e-t),s=0;for(let h=t,f=0;h<e;){n[f++]=i[h++],n[f++]=i[h++]-r;let u=n[f++]=i[h++]-r;n[f++]=i[h++]-t,s=Math.max(s,u)}return new $(n,s,this.set)}}function zt(l,t,e,r){switch(l){case-2:return e<t;case-1:return r>=t&&e<t;case 0:return e<t&&r>t;case 1:return e<=t&&r>t;case 2:return r>t;case 4:return!0}}function it(l,t,e,r){for(var i;l.from==l.to||(e<1?l.from>=t:l.from>t)||(e>-1?l.to<=t:l.to<t);){let s=!r&&l instanceof M&&l.index<0?null:l.parent;if(!s)return l;l=s}let n=r?0:z.IgnoreOverlays;if(r)for(let s=l,h=s.parent;h;s=h,h=s.parent)s instanceof M&&s.index<0&&((i=h.enter(t,e,n))===null||i===void 0?void 0:i.from)!=s.from&&(l=h);for(;;){let s=l.enter(t,e,n);if(!s)return l;l=s}}class Bt{cursor(t=0){return new mt(this,t)}getChild(t,e=null,r=null){let i=St(this,t,e,r);return i.length?i[0]:null}getChildren(t,e=null,r=null){return St(this,t,e,r)}resolve(t,e=0){return it(this,t,e,!1)}resolveInner(t,e=0){return it(this,t,e,!0)}matchContext(t){return gt(this,t)}enterUnfinishedNodesBefore(t){let e=this.childBefore(t),r=this;for(;e;){let i=e.lastChild;if(!i||i.to!=e.to)break;i.type.isError&&i.from==i.to?(r=e,e=i.prevSibling):e=i}return r}get node(){return this}get next(){return this.parent}}class M extends Bt{constructor(t,e,r,i){super(),this._tree=t,this.from=e,this.index=r,this._parent=i}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(t,e,r,i,n=0){for(let s=this;;){for(let{children:h,positions:f}=s._tree,u=e>0?h.length:-1;t!=u;t+=e){let m=h[t],y=f[t]+s.from;if(zt(i,r,y,y+m.length)){if(m instanceof $){if(n&z.ExcludeBuffers)continue;let d=m.findChild(0,m.buffer.length,e,r-y,i);if(d>-1)return new G(new Rt(s,m,t,y),null,d)}else if(n&z.IncludeAnonymous||!m.type.isAnonymous||kt(m)){let d;if(!(n&z.IgnoreMounts)&&(d=ft.get(m))&&!d.overlay)return new M(d.tree,y,t,s);let _=new M(m,y,t,s);return n&z.IncludeAnonymous||!_.type.isAnonymous?_:_.nextChild(e<0?m.children.length-1:0,e,r,i)}}}if(n&z.IncludeAnonymous||!s.type.isAnonymous||(s.index>=0?t=s.index+e:t=e<0?-1:s._parent._tree.children.length,s=s._parent,!s))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(t){return this.nextChild(0,1,t,2)}childBefore(t){return this.nextChild(this._tree.children.length-1,-1,t,-2)}enter(t,e,r=0){let i;if(!(r&z.IgnoreOverlays)&&(i=ft.get(this._tree))&&i.overlay){let n=t-this.from;for(let{from:s,to:h}of i.overlay)if((e>0?s<=n:s<n)&&(e<0?h>=n:h>n))return new M(i.tree,i.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,t,e,r)}nextSignificantParent(){let t=this;for(;t.type.isAnonymous&&t._parent;)t=t._parent;return t}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function St(l,t,e,r){let i=l.cursor(),n=[];if(!i.firstChild())return n;if(e!=null){for(;!i.type.is(e);)if(!i.nextSibling())return n}for(;;){if(r!=null&&i.type.is(r))return n;if(i.type.is(t)&&n.push(i.node),!i.nextSibling())return r==null?n:[]}}function gt(l,t,e=t.length-1){for(let r=l.parent;e>=0;r=r.parent){if(!r)return!1;if(!r.type.isAnonymous){if(t[e]&&t[e]!=r.name)return!1;e--}}return!0}class Rt{constructor(t,e,r,i){this.parent=t,this.buffer=e,this.index=r,this.start=i}}class G extends Bt{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(t,e,r){super(),this.context=t,this._parent=e,this.index=r,this.type=t.buffer.set.types[t.buffer.buffer[r]]}child(t,e,r){let{buffer:i}=this.context,n=i.findChild(this.index+4,i.buffer[this.index+3],t,e-this.context.start,r);return n<0?null:new G(this.context,this,n)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(t){return this.child(1,t,2)}childBefore(t){return this.child(-1,t,-2)}enter(t,e,r=0){if(r&z.ExcludeBuffers)return null;let{buffer:i}=this.context,n=i.findChild(this.index+4,i.buffer[this.index+3],e>0?1:-1,t-this.context.start,e);return n<0?null:new G(this.context,this,n)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(t){return this._parent?null:this.context.parent.nextChild(this.context.index+t,t,0,4)}get nextSibling(){let{buffer:t}=this.context,e=t.buffer[this.index+3];return e<(this._parent?t.buffer[this._parent.index+3]:t.buffer.length)?new G(this.context,this._parent,e):this.externalSibling(1)}get prevSibling(){let{buffer:t}=this.context,e=this._parent?this._parent.index+4:0;return this.index==e?this.externalSibling(-1):new G(this.context,this._parent,t.findChild(e,this.index,-1,0,4))}get tree(){return null}toTree(){let t=[],e=[],{buffer:r}=this.context,i=this.index+4,n=r.buffer[this.index+3];if(n>i){let s=r.buffer[this.index+1];t.push(r.slice(i,n,s)),e.push(0)}return new q(this.type,t,e,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Pt(l){if(!l.length)return null;let t=0,e=l[0];for(let n=1;n<l.length;n++){let s=l[n];(s.from>e.from||s.to<e.to)&&(e=s,t=n)}let r=e instanceof M&&e.index<0?null:e.parent,i=l.slice();return r?i[t]=r:i.splice(t,1),new jt(i,e)}class jt{constructor(t,e){this.heads=t,this.node=e}get next(){return Pt(this.heads)}}function Tt(l,t,e){let r=l.resolveInner(t,e),i=null;for(let n=r instanceof M?r:r.context.parent;n;n=n.parent)if(n.index<0){let s=n.parent;(i||(i=[r])).push(s.resolve(t,e)),n=s}else{let s=ft.get(n.tree);if(s&&s.overlay&&s.overlay[0].from<=t&&s.overlay[s.overlay.length-1].to>=t){let h=new M(s.tree,s.overlay[0].from+n.from,-1,n);(i||(i=[r])).push(it(h,t,e,!1))}}return i?Pt(i):r}class mt{get name(){return this.type.name}constructor(t,e=0){if(this.mode=e,this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,t instanceof M)this.yieldNode(t);else{this._tree=t.context.parent,this.buffer=t.context;for(let r=t._parent;r;r=r._parent)this.stack.unshift(r.index);this.bufferNode=t,this.yieldBuf(t.index)}}yieldNode(t){return t?(this._tree=t,this.type=t.type,this.from=t.from,this.to=t.to,!0):!1}yieldBuf(t,e){this.index=t;let{start:r,buffer:i}=this.buffer;return this.type=e||i.set.types[i.buffer[t]],this.from=r+i.buffer[t+1],this.to=r+i.buffer[t+2],!0}yield(t){return t?t instanceof M?(this.buffer=null,this.yieldNode(t)):(this.buffer=t.context,this.yieldBuf(t.index,t.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(t,e,r){if(!this.buffer)return this.yield(this._tree.nextChild(t<0?this._tree._tree.children.length-1:0,t,e,r,this.mode));let{buffer:i}=this.buffer,n=i.findChild(this.index+4,i.buffer[this.index+3],t,e-this.buffer.start,r);return n<0?!1:(this.stack.push(this.index),this.yieldBuf(n))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(t){return this.enterChild(1,t,2)}childBefore(t){return this.enterChild(-1,t,-2)}enter(t,e,r=this.mode){return this.buffer?r&z.ExcludeBuffers?!1:this.enterChild(1,t,e):this.yield(this._tree.enter(t,e,r))}parent(){if(!this.buffer)return this.yieldNode(this.mode&z.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let t=this.mode&z.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(t)}sibling(t){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+t,t,0,4,this.mode)):!1;let{buffer:e}=this.buffer,r=this.stack.length-1;if(t<0){let i=r<0?0:this.stack[r]+4;if(this.index!=i)return this.yieldBuf(e.findChild(i,this.index,-1,0,4))}else{let i=e.buffer[this.index+3];if(i<(r<0?e.buffer.length:e.buffer[this.stack[r]+3]))return this.yieldBuf(i)}return r<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+t,t,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(t){let e,r,{buffer:i}=this;if(i){if(t>0){if(this.index<i.buffer.buffer.length)return!1}else for(let n=0;n<this.index;n++)if(i.buffer.buffer[n+3]<this.index)return!1;({index:e,parent:r}=i)}else({index:e,_parent:r}=this._tree);for(;r;{index:e,_parent:r}=r)if(e>-1)for(let n=e+t,s=t<0?-1:r._tree.children.length;n!=s;n+=t){let h=r._tree.children[n];if(this.mode&z.IncludeAnonymous||h instanceof $||!h.type.isAnonymous||kt(h))return!1}return!0}move(t,e){if(e&&this.enterChild(t,0,4))return!0;for(;;){if(this.sibling(t))return!0;if(this.atLastNode(t)||!this.parent())return!1}}next(t=!0){return this.move(1,t)}prev(t=!0){return this.move(-1,t)}moveTo(t,e=0){for(;(this.from==this.to||(e<1?this.from>=t:this.from>t)||(e>-1?this.to<=t:this.to<t))&&this.parent(););for(;this.enterChild(1,t,e););return this}get node(){if(!this.buffer)return this._tree;let t=this.bufferNode,e=null,r=0;if(t&&t.context==this.buffer)t:for(let i=this.index,n=this.stack.length;n>=0;){for(let s=t;s;s=s._parent)if(s.index==i){if(i==this.index)return s;e=s,r=n+1;break t}i=this.stack[--n]}for(let i=r;i<this.stack.length;i++)e=new G(this.buffer,e,this.stack[i]);return this.bufferNode=new G(this.buffer,e,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(t,e){for(let r=0;;){let i=!1;if(this.type.isAnonymous||t(this)!==!1){if(this.firstChild()){r++;continue}this.type.isAnonymous||(i=!0)}for(;i&&e&&e(this),i=this.type.isAnonymous,!this.nextSibling();){if(!r)return;this.parent(),r--,i=!0}}}matchContext(t){if(!this.buffer)return gt(this.node,t);let{buffer:e}=this.buffer,{types:r}=e.set;for(let i=t.length-1,n=this.stack.length-1;i>=0;n--){if(n<0)return gt(this.node,t,i);let s=r[e.buffer[this.stack[n]]];if(!s.isAnonymous){if(t[i]&&t[i]!=s.name)return!1;i--}}return!0}}function kt(l){return l.children.some(t=>t instanceof $||!t.type.isAnonymous||kt(t))}function Ht(l){var t;let{buffer:e,nodeSet:r,maxBufferLength:i=1024,reused:n=[],minRepeatType:s=r.types.length}=l,h=Array.isArray(e)?new bt(e,e.length):e,f=r.types,u=0,m=0;function y(x,w,a,C,k,b){let{id:p,start:g,end:N,size:v}=h,B=m;for(;v<0;)if(h.next(),v==-1){let F=n[p];a.push(F),C.push(g-x);return}else if(v==-3){u=p;return}else if(v==-4){m=p;return}else throw new RangeError(`Unrecognized record size: ${v}`);let Q=f[p],tt,X,vt=g-x;if(N-g<=i&&(X=j(h.pos-w,k))){let F=new Uint16Array(X.size-X.skip),O=h.pos-X.size,H=F.length;for(;h.pos>O;)H=R(X.start,F,H);tt=new $(F,N-X.start,r),vt=X.start-x}else{let F=h.pos-v;h.next();let O=[],H=[],Y=p>=s?p:-1,et=0,nt=N;for(;h.pos>F;)Y>=0&&h.id==Y&&h.size>=0?(h.end<=nt-i&&(I(O,H,g,et,h.end,nt,Y,B),et=O.length,nt=h.end),h.next()):b>2500?d(g,F,O,H):y(g,F,O,H,Y,b+1);if(Y>=0&&et>0&&et<O.length&&I(O,H,g,et,g,nt,Y,B),O.reverse(),H.reverse(),Y>-1&&et>0){let Ct=_(Q);tt=wt(Q,O,H,0,O.length,0,N-g,Ct,Ct)}else tt=E(Q,O,H,N-g,B-N)}a.push(tt),C.push(vt)}function d(x,w,a,C){let k=[],b=0,p=-1;for(;h.pos>w;){let{id:g,start:N,end:v,size:B}=h;if(B>4)h.next();else{if(p>-1&&N<p)break;p<0&&(p=v-i),k.push(g,N,v),b++,h.next()}}if(b){let g=new Uint16Array(b*4),N=k[k.length-2];for(let v=k.length-3,B=0;v>=0;v-=3)g[B++]=k[v],g[B++]=k[v+1]-N,g[B++]=k[v+2]-N,g[B++]=B;a.push(new $(g,k[2]-N,r)),C.push(N-x)}}function _(x){return(w,a,C)=>{let k=0,b=w.length-1,p,g;if(b>=0&&(p=w[b])instanceof q){if(!b&&p.type==x&&p.length==C)return p;(g=p.prop(S.lookAhead))&&(k=a[b]+p.length+g)}return E(x,w,a,C,k)}}function I(x,w,a,C,k,b,p,g){let N=[],v=[];for(;x.length>C;)N.push(x.pop()),v.push(w.pop()+a-k);x.push(E(r.types[p],N,v,b-k,g-b)),w.push(k-a)}function E(x,w,a,C,k=0,b){if(u){let p=[S.contextHash,u];b=b?[p].concat(b):[p]}if(k>25){let p=[S.lookAhead,k];b=b?[p].concat(b):[p]}return new q(x,w,a,C,b)}function j(x,w){let a=h.fork(),C=0,k=0,b=0,p=a.end-i,g={size:0,start:0,skip:0};t:for(let N=a.pos-x;a.pos>N;){let v=a.size;if(a.id==w&&v>=0){g.size=C,g.start=k,g.skip=b,b+=4,C+=4,a.next();continue}let B=a.pos-v;if(v<0||B<N||a.start<p)break;let Q=a.id>=s?4:0,tt=a.start;for(a.next();a.pos>B;){if(a.size<0)if(a.size==-3)Q+=4;else break t;else a.id>=s&&(Q+=4);a.next()}k=tt,C+=v,b+=Q}return(w<0||C==x)&&(g.size=C,g.start=k,g.skip=b),g.size>4?g:void 0}function R(x,w,a){let{id:C,start:k,end:b,size:p}=h;if(h.next(),p>=0&&C<s){let g=a;if(p>4){let N=h.pos-(p-4);for(;h.pos>N;)a=R(x,w,a)}w[--a]=g,w[--a]=b-x,w[--a]=k-x,w[--a]=C}else p==-3?u=C:p==-4&&(m=C);return a}let P=[],A=[];for(;h.pos>0;)y(l.start||0,l.bufferStart||0,P,A,-1,0);let T=(t=l.length)!==null&&t!==void 0?t:P.length?A[0]+P[0].length:0;return new q(f[l.topID],P.reverse(),A.reverse(),T)}const At=new WeakMap;function at(l,t){if(!l.isAnonymous||t instanceof $||t.type!=l)return 1;let e=At.get(t);if(e==null){e=1;for(let r of t.children){if(r.type!=l||!(r instanceof q)){e=1;break}e+=at(l,r)}At.set(t,e)}return e}function wt(l,t,e,r,i,n,s,h,f){let u=0;for(let I=r;I<i;I++)u+=at(l,t[I]);let m=Math.ceil(u*1.5/8),y=[],d=[];function _(I,E,j,R,P){for(let A=j;A<R;){let T=A,x=E[A],w=at(l,I[A]);for(A++;A<R;A++){let a=at(l,I[A]);if(w+a>=m)break;w+=a}if(A==T+1){if(w>m){let a=I[T];_(a.children,a.positions,0,a.children.length,E[T]+P);continue}y.push(I[T])}else{let a=E[A-1]+I[A-1].length-x;y.push(wt(l,I,E,T,A,x,a,null,f))}d.push(x+P-n)}}return _(t,e,r,i,0),(h||f)(y,d,s)}class yt{constructor(t,e,r,i,n=!1,s=!1){this.from=t,this.to=e,this.tree=r,this.offset=i,this.open=(n?1:0)|(s?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(t,e=[],r=!1){let i=[new yt(0,t.length,t,0,!1,r)];for(let n of e)n.to>t.length&&i.push(n);return i}static applyChanges(t,e,r=128){if(!e.length)return t;let i=[],n=1,s=t.length?t[0]:null;for(let h=0,f=0,u=0;;h++){let m=h<e.length?e[h]:null,y=m?m.fromA:1e9;if(y-f>=r)for(;s&&s.from<y;){let d=s;if(f>=d.from||y<=d.to||u){let _=Math.max(d.from,f)-u,I=Math.min(d.to,y)-u;d=_>=I?null:new yt(_,I,d.tree,d.offset+u,h>0,!!m)}if(d&&i.push(d),s.to>y)break;s=n<t.length?t[n++]:null}if(!m)break;f=m.toA,u=m.toA-m.toB}return i}}class Gt{startParse(t,e,r){return typeof t=="string"&&(t=new Lt(t)),r=r?r.length?r.map(i=>new dt(i.from,i.to)):[new dt(0,0)]:[new dt(0,t.length)],this.createParse(t,e||[],r)}parse(t,e,r){let i=this.startParse(t,e,r);for(;;){let n=i.advance();if(n)return n}}}class Lt{constructor(t){this.string=t}get length(){return this.string.length}chunk(t){return this.string.slice(t)}get lineChunks(){return!1}read(t,e){return this.string.slice(t,e)}}new S({perNode:!0});let Dt=0;class W{constructor(t,e,r){this.set=t,this.base=e,this.modified=r,this.id=Dt++}static define(t){if(t!=null&&t.base)throw new Error("Can not derive from a modified tag");let e=new W([],null,[]);if(e.set.push(e),t)for(let r of t.set)e.set.push(r);return e}static defineModifier(){let t=new ut;return e=>e.modified.indexOf(t)>-1?e:ut.get(e.base||e,e.modified.concat(t).sort((r,i)=>r.id-i.id))}}let Ut=0;class ut{constructor(){this.instances=[],this.id=Ut++}static get(t,e){if(!e.length)return t;let r=e[0].instances.find(h=>h.base==t&&Wt(e,h.modified));if(r)return r;let i=[],n=new W(i,t,e);for(let h of e)h.instances.push(n);let s=qt(e);for(let h of t.set)if(!h.modified.length)for(let f of s)i.push(ut.get(h,f));return n}}function Wt(l,t){return l.length==t.length&&l.every((e,r)=>e==t[r])}function qt(l){let t=[[]];for(let e=0;e<l.length;e++)for(let r=0,i=t.length;r<i;r++)t.push(t[r].concat(l[e]));return t.sort((e,r)=>r.length-e.length)}function $t(l){let t=Object.create(null);for(let e in l){let r=l[e];Array.isArray(r)||(r=[r]);for(let i of e.split(" "))if(i){let n=[],s=2,h=i;for(let y=0;;){if(h=="..."&&y>0&&y+3==i.length){s=1;break}let d=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(h);if(!d)throw new RangeError("Invalid path: "+i);if(n.push(d[0]=="*"?"":d[0][0]=='"'?JSON.parse(d[0]):d[0]),y+=d[0].length,y==i.length)break;let _=i[y++];if(y==i.length&&_=="!"){s=0;break}if(_!="/")throw new RangeError("Invalid path: "+i);h=i.slice(y)}let f=n.length-1,u=n[f];if(!u)throw new RangeError("Invalid path: "+i);let m=new ct(r,s,f>0?n.slice(0,f):null);t[u]=m.sort(t[u])}}return Ot.add(t)}const Ot=new S;class ct{constructor(t,e,r,i){this.tags=t,this.mode=e,this.context=r,this.next=i}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(t){return!t||t.depth<this.depth?(this.next=t,this):(t.next=this.sort(t.next),t)}get depth(){return this.context?this.context.length:0}}ct.empty=new ct([],2,null);function Ft(l,t){let e=Object.create(null);for(let n of l)if(!Array.isArray(n.tag))e[n.tag.id]=n.class;else for(let s of n.tag)e[s.id]=n.class;let{scope:r,all:i=null}=t||{};return{style:n=>{let s=i;for(let h of n)for(let f of h.set){let u=e[f.id];if(u){s=s?s+" "+u:u;break}}return s},scope:r}}function Kt(l,t){let e=null;for(let r of l){let i=r.style(t);i&&(e=e?e+" "+i:i)}return e}function Qt(l,t,e,r=0,i=l.length){let n=new Jt(r,Array.isArray(t)?t:[t],e);n.highlightRange(l.cursor(),r,i,"",n.highlighters),n.flush(i)}class Jt{constructor(t,e,r){this.at=t,this.highlighters=e,this.span=r,this.class=""}startSpan(t,e){e!=this.class&&(this.flush(t),t>this.at&&(this.at=t),this.class=e)}flush(t){t>this.at&&this.class&&this.span(this.at,t,this.class)}highlightRange(t,e,r,i,n){let{type:s,from:h,to:f}=t;if(h>=r||f<=e)return;s.isTop&&(n=this.highlighters.filter(_=>!_.scope||_.scope(s)));let u=i,m=Vt(t)||ct.empty,y=Kt(n,m.tags);if(y&&(u&&(u+=" "),u+=y,m.mode==1&&(i+=(i?" ":"")+y)),this.startSpan(Math.max(e,h),u),m.opaque)return;let d=t.tree&&t.tree.prop(S.mounted);if(d&&d.overlay){let _=t.node.enter(d.overlay[0].from+h,1),I=this.highlighters.filter(j=>!j.scope||j.scope(d.tree.type)),E=t.firstChild();for(let j=0,R=h;;j++){let P=j<d.overlay.length?d.overlay[j]:null,A=P?P.from+h:f,T=Math.max(e,R),x=Math.min(r,A);if(T<x&&E)for(;t.from<x&&(this.highlightRange(t,T,x,i,n),this.startSpan(Math.min(x,t.to),u),!(t.to>=A||!t.nextSibling())););if(!P||A>r)break;R=P.to+h,R>e&&(this.highlightRange(_.cursor(),Math.max(e,P.from+h),Math.min(r,R),"",I),this.startSpan(Math.min(r,R),u))}E&&t.parent()}else if(t.firstChild()){d&&(i="");do if(!(t.to<=e)){if(t.from>=r)break;this.highlightRange(t,e,r,i,n),this.startSpan(Math.min(r,t.to),u)}while(t.nextSibling());t.parent()}}}function Vt(l){let t=l.type.prop(Ot);for(;t&&t.context&&!l.matchContext(t.context);)t=t.next;return t||null}const o=W.define,lt=o(),J=o(),_t=o(J),It=o(J),V=o(),ht=o(V),pt=o(V),U=o(),Z=o(U),L=o(),D=o(),xt=o(),rt=o(xt),ot=o(),c={comment:lt,lineComment:o(lt),blockComment:o(lt),docComment:o(lt),name:J,variableName:o(J),typeName:_t,tagName:o(_t),propertyName:It,attributeName:o(It),className:o(J),labelName:o(J),namespace:o(J),macroName:o(J),literal:V,string:ht,docString:o(ht),character:o(ht),attributeValue:o(ht),number:pt,integer:o(pt),float:o(pt),bool:o(V),regexp:o(V),escape:o(V),color:o(V),url:o(V),keyword:L,self:o(L),null:o(L),atom:o(L),unit:o(L),modifier:o(L),operatorKeyword:o(L),controlKeyword:o(L),definitionKeyword:o(L),moduleKeyword:o(L),operator:D,derefOperator:o(D),arithmeticOperator:o(D),logicOperator:o(D),bitwiseOperator:o(D),compareOperator:o(D),updateOperator:o(D),definitionOperator:o(D),typeOperator:o(D),controlOperator:o(D),punctuation:xt,separator:o(xt),bracket:rt,angleBracket:o(rt),squareBracket:o(rt),paren:o(rt),brace:o(rt),content:U,heading:Z,heading1:o(Z),heading2:o(Z),heading3:o(Z),heading4:o(Z),heading5:o(Z),heading6:o(Z),contentSeparator:o(U),list:o(U),quote:o(U),emphasis:o(U),strong:o(U),link:o(U),monospace:o(U),strikethrough:o(U),inserted:o(),deleted:o(),changed:o(),invalid:o(),meta:ot,documentMeta:o(ot),annotation:o(ot),processingInstruction:o(ot),definition:W.defineModifier(),constant:W.defineModifier(),function:W.defineModifier(),standard:W.defineModifier(),local:W.defineModifier(),special:W.defineModifier()};Ft([{tag:c.link,class:"tok-link"},{tag:c.heading,class:"tok-heading"},{tag:c.emphasis,class:"tok-emphasis"},{tag:c.strong,class:"tok-strong"},{tag:c.keyword,class:"tok-keyword"},{tag:c.atom,class:"tok-atom"},{tag:c.bool,class:"tok-bool"},{tag:c.url,class:"tok-url"},{tag:c.labelName,class:"tok-labelName"},{tag:c.inserted,class:"tok-inserted"},{tag:c.deleted,class:"tok-deleted"},{tag:c.literal,class:"tok-literal"},{tag:c.string,class:"tok-string"},{tag:c.number,class:"tok-number"},{tag:[c.regexp,c.escape,c.special(c.string)],class:"tok-string2"},{tag:c.variableName,class:"tok-variableName"},{tag:c.local(c.variableName),class:"tok-variableName tok-local"},{tag:c.definition(c.variableName),class:"tok-variableName tok-definition"},{tag:c.special(c.variableName),class:"tok-variableName2"},{tag:c.definition(c.propertyName),class:"tok-propertyName tok-definition"},{tag:c.typeName,class:"tok-typeName"},{tag:c.namespace,class:"tok-namespace"},{tag:c.className,class:"tok-className"},{tag:c.macroName,class:"tok-macroName"},{tag:c.propertyName,class:"tok-propertyName"},{tag:c.operator,class:"tok-operator"},{tag:c.comment,class:"tok-comment"},{tag:c.meta,class:"tok-meta"},{tag:c.invalid,class:"tok-invalid"},{tag:c.punctuation,class:"tok-punctuation"}]);export{z as I,K as N,Gt as P,q as T,S as a,Ft as b,yt as c,Qt as h,$t as s,c as t};
