/*! JsRender v1.0.0-beta: http://github.com/BorisMoore/jsrender and http://jsviews.com/jsviews
informal pre V1.0 commit counter: 61 */
(function(n,t,i){"use strict";function et(n,t){for(var i in t.props)bt.test(i)&&(n[i]=t.props[i])}function ot(n){return n}function rr(n){return n}function gt(n){s._dbgMode=n;wt=n?"Unavailable (nested view): use #getIndex()":"";yt("dbg",li.dbg=tt.dbg=n?rr:ot)}function st(n){this.name=(r.link?"JsViews":"JsRender")+" Error";this.message=n||this.name}function f(n,t){for(var i in t)n[i]=t[i];return n}function d(n){return typeof n=="function"}function ni(n,t,i){return(!o.rTag||n)&&(p=n?n.charAt(0):p,w=n?n.charAt(1):w,h=t?t.charAt(0):h,v=t?t.charAt(1):v,nt=i||nt,n="\\"+p+"(\\"+nt+")?\\"+w,t="\\"+h+"\\"+v,y="(?:(?:(\\w+(?=[\\/\\s\\"+h+"]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))\\s*((?:[^\\"+h+"]|\\"+h+"(?!\\"+v+"))*?)",o.rTag=y+")",y=new RegExp(n+y+"(\\/)?|(?:\\/(\\w+)))"+t,"g"),pt=new RegExp("<.*>|([^\\\\]|^)[{}]|"+n+".*"+t)),[p,w,h,v,nt]}function ur(n,t){t||(t=n,n=i);var e,f,o,u,r=this,s=!t||t==="root";if(n){if(u=r.type===t?r:i,!u)if(e=r.views,r._.useKey){for(f in e)if(u=e[f].get(n,t))break}else for(f=0,o=e.length;!u&&f<o;f++)u=e[f].get(n,t)}else if(s)while(r.parent.parent)u=r=r.parent;else while(r&&!u)u=r.type===t?r:i,r=r.parent;return u}function ti(){var n=this.get("item");return n?n.index:i}function ii(){return this.index}function fr(t){var u,e=this,o=e.linkCtx,r=(e.ctx||{})[t];return r===i&&o&&o.ctx&&(r=o.ctx[t]),r===i&&(r=li[t]),r&&d(r)&&!r._wrp&&(u=function(){return r.apply(!this||this===n?e:this,arguments)},u._wrp=!0,f(u,r)),u||r}function er(n,t,r,f){var e,s,c=+r===r&&t.tmpl.bnds[r-1],h=t.linkCtx;return f=f!==i&&{props:{},args:[f]},r=f||(c?c(t.data,t,u):r),s=r.args[0],(n||c)&&(e=h&&h.tag,e||(e={_:{inline:!h,bnd:c},tagName:":",cvt:n,flow:!0,tagCtx:r,_is:"tag"},h&&(h.tag=e,e.linkCtx=h),r.ctx=a(r.ctx,(h?h.view:t).ctx),o._lnk(e)),e._er=f&&s,et(e,r),r.view=t,e.ctx=r.ctx||{},delete r.ctx,t._.tag=e,s=ht(e,e.convert||n!=="true"&&n)[0],s=c&&t._.onRender?t._.onRender(s,t,c):s,t._.tag=i),s!=i?s:""}function ht(n,t){var r=n.tagCtx,u=r.view,i=r.args;return t=t&&(""+t===t?u.getRsc("converters",t)||c("Unknown converter: '"+t+"'"):t),i=!i.length&&!r.index?[u.data]:t?i.slice():i,t&&(t.depends&&(n.depends=o.getDeps(n.depends,n,t.depends,t)),i[0]=t.apply(n,i)),i}function or(n,t){for(var f,e,r=this;f===i&&r;)e=r.tmpl[n],f=e&&e[t],r=r.parent;return f||u[n][t]}function sr(n,t,r,s,h,l){var v,lt,at,ot,p,vt,nt,y,st,rt,it,yt,pt,d,k,ct,wt,g="",w=t.linkCtx||0,ut=t.ctx,bt=r||t.tmpl,ft=+s===s&&bt.bnds[s-1];for(n._is==="tag"&&(v=n,n=v.tagName,s=v.tagCtxs),v=v||w.tag,l=l!==i&&(g+=l,[{props:{},args:[]}]),s=l||(ft?ft(t.data,t,u):s),vt=s.length,p=0;p<vt;p++)p||r&&v||(it=t.getRsc("tags",n)||c("Unknown tag: {{"+n+"}}")),y=s[p],(!w.tag||v._er)&&(rt=y.tmpl,rt=y.content=rt&&bt.tmpls[rt-1],f(y,{tmpl:(v?v:it).template||rt,render:oi,index:p,view:t,ctx:a(y.ctx,ut)})),(r=y.props.tmpl)&&(r=""+r===r?t.getRsc("templates",r)||e(r):r,y.tmpl=r),v||(it._ctr?(v=new it._ctr,yt=!!v.init):o._lnk(v={render:it.render}),v._={inline:!w},w&&(w.tag=v,v.linkCtx=w),(v._.bnd=ft||w.fn)?v._.arrVws={}:v.dataBoundOnly&&c("{^{"+n+"}} tag must be data-bound"),v.tagName=n,v.parent=ot=ut&&ut.tag,v._is="tag",v._def=it,v.tagCtxs=s),y.tag=v,v.dataMap&&v.tagCtxs&&(y.map=v.tagCtxs[p].map),v.flow||(st=y.ctx=y.ctx||{},lt=v.parents=st.parentTags=ut&&a(st.parentTags,ut.parentTags)||{},ot&&(lt[ot.tagName]=ot),lt[v.tagName]=st.tag=v);if(t._.tag=v,!(v._er=l)){for(et(v,s[0]),v.rendering={},p=0;p<vt;p++)y=v.tagCtx=v.tagCtxs[p],ct=y.props,k=ht(v,v.convert),(pt=ct.dataMap||v.dataMap)&&(k.length||ct.dataMap)&&(d=y.map,(!d||d.src!==k[0]||h)&&(d&&d.src&&d.unmap(),d=y.map=pt.map(k[0],ct)),k=[d.tgt]),v.ctx=y.ctx,!p&&yt&&(wt=v.template,v.init(y,w,v.ctx),yt=i,v.template!==wt&&(v._.tmpl=v.template),w&&(w.attr=v.attr=w.attr||v.attr)),nt=i,v.render&&(nt=v.render.apply(v,k)),k=k.length?k:[t],nt=nt!==i?nt:y.render(k[0],!0)||(h?i:""),g=g?g+(nt||""):nt;delete v.rendering}return v.tagCtx=v.tagCtxs[0],v.ctx=v.tagCtx.ctx,v._.inline&&(at=v.attr)&&at!==b&&(g=at==="text"?tt.html(g):""),ft&&t._.onRender?t._.onRender(g,t,ft):g}function g(n,t,i,r,u,f,e,o){var a,h,c,s=this,v=t==="array",l={key:0,useKey:v?0:1,id:""+ir++,onRender:o,bnds:{}};s.data=r;s.tmpl=u;s.content=e;s.views=v?[]:{};s.parent=i;s.type=t||"top";s._=l;s.linked=!!o;i?(a=i.views,h=i._,h.useKey?(a[l.key="_"+h.useKey++]=s,s.index=wt,s.getIndex=ti,c=h.tag,l.bnd=v&&(!c||!!c._.bnd&&c)):a.splice(l.key=s.index=f,0,s),s.ctx=n||i.ctx):s.ctx=n}function hr(n){var i,r,t,u,e,f,s;for(i in k)if(e=k[i],(f=e.compile)&&(r=n[i+"s"]))for(t in r)u=r[t]=f(t,r[t],n),u&&(s=o.onStore[i])&&s(t,u,f)}function cr(n,t,u){var h,s,o;return d(t)?t={depends:t.depends,render:t}:((o=t.baseTag)&&(t.baseTag=o=""+o===o?u&&u.tags[o]||r.views.tags[o]:o,t.flow=!!t.flow,t=f(f({},o),t)),(s=t.template)!==i&&(t.template=""+s===s?e[s]||e(s):s),t.init!==!1&&(h=t._ctr=function(){},(h.prototype=t).constructor=h)),u&&(t._parentTmpl=u),t}function ri(r,u,f,o){function c(u){if(""+u===u||u.nodeType>0){try{h=u.nodeType>0?u:!pt.test(u)&&t&&t(n.document).find(u)[0]}catch(s){}return h&&(u=e[r=r||h.getAttribute(ft)],u||(r=r||"_"+tr++,h.setAttribute(ft,r),u=e[r]=ri(r,h.innerHTML,f,o)),h=i),u}}var s,h;return u=u||"",s=c(u),o=o||(u.markup?u:{}),o.tmplName=r,f&&(o._parentTmpl=f),!s&&u.markup&&(s=c(u.markup))&&s.fn&&(s.debug!==u.debug||s.allowCode!==u.allowCode)&&(s=s.markup),s!==i?(r&&!f&&(dt[r]=function(){return u.render.apply(u,arguments)}),s.fn||u.fn?s.fn&&(u=r&&r!==s.tmplName?a(o,s):s):(u=fi(s,o),lt(s.replace(wi,"\\$&"),u)),hr(o),u):void 0}function ui(n){function t(t,i){this.tgt=n.getTgt(t,i)}return d(n)&&(n={getTgt:n}),n.baseMap&&(n=f(f({},n.baseMap),n)),n.map=function(n,i){return new t(n,i)},n}function fi(n,t){var i,e=s.wrapMap||{},u=f({markup:n,tmpls:[],links:{},tags:{},bnds:[],_is:"template",render:ei},t);return t.htmlTag||(i=di.exec(n),u.htmlTag=i?i[1].toLowerCase():""),i=e[u.htmlTag],i&&i!==e.div&&(u.markup=r.trim(u.markup)),u}function lr(n,t){function r(e,s,h){var v,c,l,a;if(e&&typeof e===ut&&!e.nodeType&&!e.markup&&!e.getTgt){for(l in e)r(l,e[l],s);return u}return s===i&&(s=e,e=i),e&&""+e!==e&&(h=s,s=e,e=i),a=h?h[f]=h[f]||{}:r,c=t.compile,s===null?e&&delete a[e]:(s=c?s=c(e,s,h):s,e&&(a[e]=s)),c&&s&&(s._is=n),s&&(v=o.onStore[n])&&v(e,s,c),s}var f=n+"s";u[f]=r;k[n]=t}function ar(n,t,i){var r=this.jquery&&(this[0]||c('Unknown template: "'+this.selector+'"')),u=r.getAttribute(ft);return ei.call(u?e[u]:e(r),n,t,i)}function ct(n,t,i){if(s._dbgMode)try{return n.fn(t,i,u)}catch(r){return c(r,i)}return n.fn(t,i,u)}function ei(n,t,i,u,f,e){var o=this;return!u&&o.fn._nvw&&!r.isArray(n)?ct(o,n,{tmpl:o}):oi.call(o,n,t,i,u,f,e)}function oi(n,t,u,f,o,s){var y,ft,d,l,nt,tt,it,p,v,rt,w,et,h,ot,c=this,k="";if(!!t===t&&(u=t,t=i),typeof t!==ut&&(t=i),o===!0&&(it=!0,o=0),c.tag?(p=c,c=c.tag,rt=c._,et=c.tagName,h=rt.tmpl||p.tmpl,ot=c.attr&&c.attr!==b,t=a(t,c.ctx),v=p.content,p.props.link===!1&&(t=t||{},t.link=!1),f=f||p.view,n=arguments.length?n:f):h=c,h&&(!f&&n&&n._is==="view"&&(f=n),f&&(v=v||f.content,s=s||f._.onRender,n===f&&(n=f.data),t=a(t,f.ctx)),f&&f.type!=="top"||((t=t||{}).root=n),h.fn||(h=e[h]||e(h)),h)){if(s=(t&&t.link)!==!1&&!ot&&s,w=s,s===!0&&(w=i,s=f._.onRender),t=h.helpers?a(h.helpers,t):t,r.isArray(n)&&!u)for(l=it?f:o!==i&&f||new g(t,"array",f,n,h,o,v,s),y=0,ft=n.length;y<ft;y++)d=n[y],nt=new g(t,"item",l,d,h,(o||0)+y,v,s),tt=ct(h,d,nt),k+=l._.onRender?l._.onRender(tt,nt):tt;else(f||!h.fn._nvw)&&(l=it?f:new g(t,et||"data",f,n,h,o,v,s),rt&&!c.flow&&(l.tag=c)),k+=ct(h,n,l);return w?w(k,l):k}return""}function c(n,t,i){var r=s.onError(n,t,i);if(""+n===n)throw new o.Err(r);return!t.linkCtx&&t.linked?tt.html(r):r}function l(n){c("Syntax error\n"+n)}function lt(n,t,i,r){function k(t){t-=f;t&&h.push(n.substr(f,t).replace(rt,"\\n"))}function c(t){t&&l('Unmatched or missing tag: "{{/'+t+'}}" in template:\n'+n)}function d(e,o,v,y,p,d,nt,tt,it,ut,ft,et){d&&(p=":",y=b);ut=ut||i;var ot=(o||i)&&[[]],ht="",ct="",lt="",at="",vt="",yt="",pt="",wt="",st=!ut&&!p&&!nt;v=v||(it=it||"#data",p);k(et);f=et+e.length;tt?g&&h.push(["*","\n"+it.replace(pi,"$1")+"\n"]):v?(v==="else"&&(ki.test(it)&&l('for "{{else if expr}}" use "{{else expr}}"'),ot=u[7],u[8]=n.substring(u[8],et),u=s.pop(),h=u[2],st=!0),it&&(ci(it.replace(rt," "),ot,t).replace(bi,function(n,t,i,r,u,f,e,o){return e?(ct+=f+",",at+="'"+o+"',"):i?(lt+=r+f+",",yt+=r+"'"+o+"',"):t?pt+=f:(u==="trigger"&&(wt+=f),ht+=r+f+",",vt+=r+"'"+o+"',",w=w||bt.test(u)),""}).slice(0,-1),ot&&ot[0]&&ot.pop()),a=[v,y||!!r||w||"",st&&[],si(at,vt,yt),si(ct,ht,lt),pt,wt,ot||0],h.push(a),st&&(s.push(u),u=a,u[8]=f)):ft&&(c(ft!==u[0]&&u[0]!=="else"&&ft),u[8]=n.substring(u[8],et),u=s.pop());c(!u&&ft);h=u[2]}var o,a,w,g=t&&t.allowCode,e=[],f=0,s=[],h=e,u=[,,e];return i&&(n=p+n+v),c(s[0]&&s[0][2].pop()[0]),n.replace(y,d),k(n.length),(f=e[e.length-1])&&c(""+f!==f&&+f[8]===f[8]&&f[0]),i?(o=vt(e,n,i),at(o,e[0][7])):o=vt(e,t),o._nvw&&(o._nvw=!/[~#]/.test(n)),o}function at(n,t){n.deps=[];for(var i in t)i!=="_jsvto"&&t[i].length&&(n.deps=n.deps.concat(t[i]));n.paths=t}function si(n,t,i){return[n.slice(0,-1),t.slice(0,-1),i.slice(0,-1)]}function hi(n,t){return"\n\t"+(t?t+":{":"")+"args:["+n[0]+"]"+(n[1]||!t?",\n\tprops:{"+n[1]+"}":"")+(n[2]?",\n\tctx:{"+n[2]+"}":"")}function ci(n,t,i){function d(d,g,nt,tt,it,rt,ut,ft,et,ot,st,ht,ct,at,vt,yt,pt,wt,bt,kt){function ri(n,i,o,s,h,c,l,a){var y=o===".";if(o&&(it=it.slice(i.length),y||(n=(s?'view.hlp("'+s+'")':h?"view":"data")+(a?(c?"."+c:s?"":h?"":"."+o)+(l||""):(a=s?"":h?c||"":o,"")),n=n+(a?"."+a:""),n=i+(n.slice(0,9)==="view.data"?n.slice(5):n)),u)){if(gt=e==="linkTo"?v=t._jsvto=t._jsvto||[]:f.bd,dt=y&&gt[gt.length-1]){if(dt._jsv){while(dt.sb)dt=dt.sb;dt.bnd&&(it="^"+it.slice(1));dt.sb=it;dt.bnd=dt.bnd||it.charAt(0)==="^"}}else gt.push(it);k[r]=bt+(y?1:0)}return n}tt&&!ft&&(it=tt+it);rt=rt||"";nt=nt||g||ht;it=it||et;ot=ot||pt||"";var ii,ti,gt,dt,ni;if(!ut||s||o){if(u&&yt&&!s&&!o&&(!e||p||v)&&(ii=k[r-1],kt.length-1>bt-(ii||0))){if(ii=kt.slice(ii,bt+d.length),ti!==!0)if(gt=v||c[r-1].bd,dt=gt[gt.length-1],dt&&dt.prm){while(dt.sb&&dt.sb.prm)dt=dt.sb;ni=dt.sb={path:dt.sb,bnd:dt.bnd}}else gt.push(ni={path:gt.pop()});yt=w+":"+ii+" onerror=''"+h;ti=b[yt];ti||(b[yt]=!0,b[yt]=ti=lt(yt,i,!0));ti!==!0&&ni&&(ni._jsv=ti,ni.prm=f.bd,ni.bnd=ni.bnd||ni.path&&ni.path.indexOf("^")>=0)}return s?(s=!ct,s?d:'"'):o?(o=!at,o?d:'"'):(nt?(k[r]=bt++,f=c[++r]={bd:[]},nt):"")+(wt?r?"":(a=kt.slice(a,bt),e?(e=p=v=!1,"\b"):"\b,")+a+(a=bt+d.length,u&&t.push(f.bd=[]),"\b"):ft?(r&&l(n),u&&t.pop(),e=it,p=tt,a=bt+d.length,tt&&(u=f.bd=t[e]=[]),it+":"):it?it.split("^").join(".").replace(vi,ri)+(ot?(f=c[++r]={bd:[]},y[r]=!0,ot):rt):rt?rt:vt?(y[r]=!1,f=c[--r],vt)+(ot?(f=c[++r],y[r]=!0,ot):""):st?(y[r]||l(n),","):g?"":(s=ct,o=at,'"'))}l(n)}var e,v,p,o,s,u=t&&t[0],f={bd:u},c={0:f},a=0,b=i?i.links:u&&(u.links=u.links||{}),r=0,y={},k={};return(n+(i?" ":"")).replace(yi,d)}function vt(n,t,r){var p,f,e,c,g,yt,pt,ni,wt,nt,ot,w,s,st,tt,it,v,ht,y,ut,k,ft,bt,d,kt,dt,ct,h,a,lt,gt,o=0,u="",et={},ti=n.length;for(""+t===t?(y=r?'data-link="'+t.replace(rt," ").slice(1,-1)+'"':t,t=0):(y=t.tmplName||"unnamed",t.allowCode&&(et.allowCode=!0),t.debug&&(et.debug=!0),w=t.bnds,ht=t.tmpls),p=0;p<ti;p++)if(f=n[p],""+f===f)u+='\n+"'+f+'"';else if(e=f[0],e==="*")u+=";\n"+f[1]+"\nret=ret";else{if(c=f[1],ft=f[2],g=hi(f[3],"params")+"},"+hi(st=f[4]),a=f[5],gt=f[6],bt=f[8],(dt=e==="else")||(o=0,w&&(s=f[7])&&(o=w.push(s))),(ct=e===":")?c&&(e=c===b?">":c+e):(ft&&(ut=fi(bt,et),ut.tmplName=y+"/"+e,vt(ft,ut),ht.push(ut)),dt||(k=e,kt=u,u=""),d=n[p+1],d=d&&d[0]==="else"),lt=a?";\ntry{\nret+=":"\n+",tt="",it="",ct&&(s||gt||c&&c!==b)){if(h="return {"+g+"};",v='c("'+c+'",view,',h=new Function("data,view,j,u"," // "+y+" "+o+" "+e+"\n"+h),h._er=a,tt=v+o+",",it=")",h._tag=e,r)return h;at(h,s);ot=!0}if(u+=ct?(r?(a?"\ntry{\n":"")+"return ":lt)+(ot?(ot=i,nt=wt=!0,v+(s?(w[o-1]=h,o):"{"+g+"}")+")"):e===">"?(pt=!0,"h("+st[0]+")"):(ni=!0,"((v="+(st[0]||"data")+')!=null?v:"")')):(nt=yt=!0,"\n{view:view,tmpl:"+(ft?ht.length:"0")+","+g+"},"),k&&!d){if(u="["+u.slice(0,-1)+"]",v='t("'+k+'",view,this,',r||s){if(u=new Function("data,view,j,u"," // "+y+" "+o+" "+k+"\nreturn "+u+";"),u._er=a,u._tag=e,s&&at(w[o-1]=u,s),r)return u;tt=v+o+",undefined,";it=")"}u=kt+lt+v+(o||u)+")";s=0;k=0}a&&(nt=!0,u+=";\n}catch(e){ret"+(r?"urn ":"+=")+tt+"j._err(e,view,"+a+")"+it+";}"+(r?"":"ret=ret"))}u="// "+y+"\nvar v"+(yt?",t=j._tag":"")+(wt?",c=j._cnvt":"")+(pt?",h=j.converters.html":"")+(r?";\n":',ret=""\n')+(et.debug?"debugger;":"")+u+(r?"\n":";\nreturn ret;");try{u=new Function("data,view,j,u",u)}catch(ii){l("Compiled template code:\n\n"+u+'\n: "'+ii.message+'"')}return t&&(t.fn=u),nt||(u._nvw=!0),u}function a(n,t){return n&&n!==t?t?f(f({},t),n):n:t&&f({},t)}function vr(n){return kt[n]||(kt[n]="&#"+n.charCodeAt(0)+";")}function yr(n){var i,t,r=[];if(typeof n===ut)for(i in n)t=n[i],t&&t.toJSON&&!t.toJSON()||d(t)||r.push({key:i,prop:t});return r}function ai(n){return n!=null?gi.test(n)&&(""+n).replace(nr,vr)||n:""}if((!t||!t.render)&&!n.jsviews){var r,it,y,pt,wt,p="{",w="{",h="}",v="}",nt="^",vi=/^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,yi=/(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^\(\[])|[)\]])([([]?))|(\s+)/g,rt=/[ \t]*(\r\n|\n|\r)/g,pi=/\\(['"])/g,wi=/['"\\]/g,bi=/(?:\x08|^)(onerror:)?(?:(~?)(([\w$]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,ki=/^if\s/,di=/<(\w+)[>\s]/,gi=/[\x00`><\"'&]/,bt=/^on[A-Z]|^convert(Back)?$/,nr=/[\x00`><"'&]/g,tr=0,ir=0,kt={"&":"&amp;","<":"&lt;",">":"&gt;","\x00":"&#0;","'":"&#39;",'"':"&#34;","`":"&#96;"},b="html",ut="object",ft="data-jsv-tmpl",dt={},k={template:{compile:ri},tag:{compile:cr},helper:{},converter:{}},u={jsviews:"v1.0.0-beta",settings:function(n){f(s,n);gt(s._dbgMode);s.jsv&&s.jsv()},sub:{View:g,Err:st,tmplFn:lt,cvt:ht,parse:ci,extend:f,syntaxErr:l,onStore:{},_lnk:ot,_ths:et},map:ui,_cnvt:er,_tag:sr,_err:c};(st.prototype=new Error).constructor=st;ti.depends=function(){return[this.get("item"),"index"]};ii.depends="index";g.prototype={get:ur,getIndex:ii,getRsc:or,hlp:fr,_is:"view"};for(it in k)lr(it,k[it]);var e=u.templates,tt=u.converters,li=u.helpers,yt=u.tags,o=u.sub,s=u.settings;t?(r=t,r.fn.render=ar,r.observable&&(f(o,r.views.sub),u.map=r.views.map)):(r=n.jsviews={},r.isArray=Array&&Array.isArray||function(n){return Object.prototype.toString.call(n)==="[object Array]"});r.render=dt;r.views=u;r.templates=e=u.templates;s({debugMode:gt,delimiters:ni,onError:function(n,t,r){return t&&(n=r===i?"{Error: "+n+"}":d(r)?r(n,t):r),n==i?"":n},_dbgMode:!0});yt({"else":function(){},"if":{render:function(n){var t=this;return t.rendering.done||!n&&(arguments.length||!t.tagCtx.index)?"":(t.rendering.done=!0,t.selected=t.tagCtx.index,t.tagCtx.render(t.tagCtx.view,!0))},onUpdate:function(n,t,i){for(var r,f,u=0;(r=this.tagCtxs[u])&&r.args.length;u++)if(r=r.args[0],f=!r!=!i[u].args[0],!this.convert&&!!r||f)return f;return!1},flow:!0},"for":{render:function(n){var f,t=this,u=t.tagCtx,e="",o=0;return t.rendering.done||((f=!arguments.length)&&(n=u.view.data),n!==i&&(e+=u.render(n,f),o+=r.isArray(n)?n.length:1),(t.rendering.done=o)&&(t.selected=u.index)),e},flow:!0},include:{flow:!0},"*":{render:ot,flow:!0}});yt("props",{baseTag:"for",dataMap:ui(yr)});tt({html:ai,attr:ai,url:function(n){return n!=i?encodeURI(""+n):n===null?n:""}});ni()}})(this,this.jQuery);
/*
//# sourceMappingURL=jsrender.min.js.map
*/
//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return Bb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){vb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return o(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){sc[a]||(e(b),sc[a]=!0)}function h(a,b){return function(c){return r(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function k(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function l(){}function m(a,b){b!==!1&&H(a),p(this,a),this._d=new Date(+a._d),uc===!1&&(uc=!0,vb.updateOffset(this),uc=!1)}function n(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=vb.localeData(),this._bubble()}function o(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function p(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Kb.length>0)for(c in Kb)d=Kb[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function s(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function t(a,b){var c;return b=M(b,a),a.isBefore(b)?c=s(a,b):(c=s(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function u(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=vb.duration(c,d),v(this,e,a),this}}function v(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&pb(a,"Date",ob(a,"Date")+f*c),g&&nb(a,ob(a,"Month")+g*c),d&&vb.updateOffset(a,f||g)}function w(a){return"[object Array]"===Object.prototype.toString.call(a)}function x(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function y(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&C(a[d])!==C(b[d]))&&g++;return g+f}function z(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=lc[a]||mc[b]||b}return a}function A(a){var b,d,e={};for(d in a)c(a,d)&&(b=z(d),b&&(e[b]=a[d]));return e}function B(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}vb[b]=function(e,f){var g,h,i=vb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=vb().utc().set(d,a);return i.call(vb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function C(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function D(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function E(a,b,c){return jb(vb([a,11,31+b-c]),b,c).week}function F(a){return G(a)?366:365}function G(a){return a%4===0&&a%100!==0||a%400===0}function H(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Db]<0||a._a[Db]>11?Db:a._a[Eb]<1||a._a[Eb]>D(a._a[Cb],a._a[Db])?Eb:a._a[Fb]<0||a._a[Fb]>24||24===a._a[Fb]&&(0!==a._a[Gb]||0!==a._a[Hb]||0!==a._a[Ib])?Fb:a._a[Gb]<0||a._a[Gb]>59?Gb:a._a[Hb]<0||a._a[Hb]>59?Hb:a._a[Ib]<0||a._a[Ib]>999?Ib:-1,a._pf._overflowDayOfYear&&(Cb>b||b>Eb)&&(b=Eb),a._pf.overflow=b)}function I(b){return null==b._isValid&&(b._isValid=!isNaN(b._d.getTime())&&b._pf.overflow<0&&!b._pf.empty&&!b._pf.invalidMonth&&!b._pf.nullInput&&!b._pf.invalidFormat&&!b._pf.userInvalidated,b._strict&&(b._isValid=b._isValid&&0===b._pf.charsLeftOver&&0===b._pf.unusedTokens.length&&b._pf.bigHour===a)),b._isValid}function J(a){return a?a.toLowerCase().replace("_","-"):a}function K(a){for(var b,c,d,e,f=0;f<a.length;){for(e=J(a[f]).split("-"),b=e.length,c=J(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=L(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&y(e,c,!0)>=b-1)break;b--}f++}return null}function L(a){var b=null;if(!Jb[a]&&Lb)try{b=vb.locale(),require("./locale/"+a),vb.locale(b)}catch(c){}return Jb[a]}function M(a,b){var c,d;return b._isUTC?(c=b.clone(),d=(vb.isMoment(a)||x(a)?+a:+vb(a))-+c,c._d.setTime(+c._d+d),vb.updateOffset(c,!1),c):vb(a).local()}function N(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function O(a){var b,c,d=a.match(Pb);for(b=0,c=d.length;c>b;b++)d[b]=rc[d[b]]?rc[d[b]]:N(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function P(a,b){return a.isValid()?(b=Q(b,a.localeData()),nc[b]||(nc[b]=O(b)),nc[b](a)):a.localeData().invalidDate()}function Q(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Qb.lastIndex=0;d>=0&&Qb.test(a);)a=a.replace(Qb,c),Qb.lastIndex=0,d-=1;return a}function R(a,b){var c,d=b._strict;switch(a){case"Q":return _b;case"DDDD":return bc;case"YYYY":case"GGGG":case"gggg":return d?cc:Tb;case"Y":case"G":case"g":return ec;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?dc:Ub;case"S":if(d)return _b;case"SS":if(d)return ac;case"SSS":if(d)return bc;case"DDD":return Sb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Wb;case"a":case"A":return b._locale._meridiemParse;case"x":return Zb;case"X":return $b;case"Z":case"ZZ":return Xb;case"T":return Yb;case"SSSS":return Vb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?ac:Rb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Rb;case"Do":return d?b._locale._ordinalParse:b._locale._ordinalParseLenient;default:return c=new RegExp($(Z(a.replace("\\","")),"i"))}}function S(a){a=a||"";var b=a.match(Xb)||[],c=b[b.length-1]||[],d=(c+"").match(jc)||["-",0,0],e=+(60*d[1])+C(d[2]);return"+"===d[0]?e:-e}function T(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Db]=3*(C(b)-1));break;case"M":case"MM":null!=b&&(e[Db]=C(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b,a,c._strict),null!=d?e[Db]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Eb]=C(b));break;case"Do":null!=b&&(e[Eb]=C(parseInt(b.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=C(b));break;case"YY":e[Cb]=vb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Cb]=C(b);break;case"a":case"A":c._meridiem=b;break;case"h":case"hh":c._pf.bigHour=!0;case"H":case"HH":e[Fb]=C(b);break;case"m":case"mm":e[Gb]=C(b);break;case"s":case"ss":e[Hb]=C(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Ib]=C(1e3*("0."+b));break;case"x":c._d=new Date(C(b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=S(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=C(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=vb.parseTwoDigitYear(b)}}function U(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Cb],jb(vb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Cb],jb(vb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=kb(d,e,f,h,g),a._a[Cb]=i.year,a._dayOfYear=i.dayOfYear}function V(a){var c,d,e,f,g=[];if(!a._d){for(e=X(a),a._w&&null==a._a[Eb]&&null==a._a[Db]&&U(a),a._dayOfYear&&(f=b(a._a[Cb],e[Cb]),a._dayOfYear>F(f)&&(a._pf._overflowDayOfYear=!0),d=fb(f,0,a._dayOfYear),a._a[Db]=d.getUTCMonth(),a._a[Eb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];24===a._a[Fb]&&0===a._a[Gb]&&0===a._a[Hb]&&0===a._a[Ib]&&(a._nextDay=!0,a._a[Fb]=0),a._d=(a._useUTC?fb:eb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Fb]=24)}}function W(a){var b;a._d||(b=A(a._i),a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],V(a))}function X(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function Y(b){if(b._f===vb.ISO_8601)return void ab(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Q(b._f,b._locale).match(Pb)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(R(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),rc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),T(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[Fb]<=12&&(b._pf.bigHour=a),b._a[Fb]=k(b._locale,b._a[Fb],b._meridiem),V(b),H(b)}function Z(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function $(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function _(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=p({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],Y(b),I(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));o(a,c||b)}function ab(a){var b,c,d=a._i,e=fc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=hc.length;c>b;b++)if(hc[b][1].exec(d)){a._f=hc[b][0]+(e[6]||" ");break}for(b=0,c=ic.length;c>b;b++)if(ic[b][1].exec(d)){a._f+=ic[b][0];break}d.match(Xb)&&(a._f+="Z"),Y(a)}else a._isValid=!1}function bb(a){ab(a),a._isValid===!1&&(delete a._isValid,vb.createFromInputFallback(a))}function cb(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function db(b){var c,d=b._i;d===a?b._d=new Date:x(d)?b._d=new Date(+d):null!==(c=Mb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?bb(b):w(d)?(b._a=cb(d.slice(0),function(a){return parseInt(a,10)}),V(b)):"object"==typeof d?W(b):"number"==typeof d?b._d=new Date(d):vb.createFromInputFallback(b)}function eb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function fb(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function gb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function hb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function ib(a,b,c){var d=vb.duration(a).abs(),e=Ab(d.as("s")),f=Ab(d.as("m")),g=Ab(d.as("h")),h=Ab(d.as("d")),i=Ab(d.as("M")),j=Ab(d.as("y")),k=e<oc.s&&["s",e]||1===f&&["m"]||f<oc.m&&["mm",f]||1===g&&["h"]||g<oc.h&&["hh",g]||1===h&&["d"]||h<oc.d&&["dd",h]||1===i&&["M"]||i<oc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,hb.apply({},k)}function jb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=vb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function kb(a,b,c,d,e){var f,g,h=fb(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:F(a-1)+g}}function lb(b){var c,d=b._i,e=b._f;return b._locale=b._locale||vb.localeData(b._l),null===d||e===a&&""===d?vb.invalid({nullInput:!0}):("string"==typeof d&&(b._i=d=b._locale.preparse(d)),vb.isMoment(d)?new m(d,!0):(e?w(e)?_(b):Y(b):db(b),c=new m(b),c._nextDay&&(c.add(1,"d"),c._nextDay=a),c))}function mb(a,b){var c,d;if(1===b.length&&w(b[0])&&(b=b[0]),!b.length)return vb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function nb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),D(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function ob(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function pb(a,b,c){return"Month"===b?nb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function qb(a,b){return function(c){return null!=c?(pb(this,a,c),vb.updateOffset(this,b),this):ob(this,a)}}function rb(a){return 400*a/146097}function sb(a){return 146097*a/400}function tb(a){vb.duration.fn[a]=function(){return this._data[a]}}function ub(a){"undefined"==typeof ender&&(wb=zb.moment,zb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",vb):vb)}for(var vb,wb,xb,yb="2.9.0",zb="undefined"==typeof global||"undefined"!=typeof window&&window!==global.window?this:global,Ab=Math.round,Bb=Object.prototype.hasOwnProperty,Cb=0,Db=1,Eb=2,Fb=3,Gb=4,Hb=5,Ib=6,Jb={},Kb=[],Lb="undefined"!=typeof module&&module&&module.exports,Mb=/^\/?Date\((\-?\d+)/i,Nb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ob=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Pb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Qb=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Rb=/\d\d?/,Sb=/\d{1,3}/,Tb=/\d{1,4}/,Ub=/[+\-]?\d{1,6}/,Vb=/\d+/,Wb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Xb=/Z|[\+\-]\d\d:?\d\d/gi,Yb=/T/i,Zb=/[\+\-]?\d+/,$b=/[\+\-]?\d+(\.\d{1,3})?/,_b=/\d/,ac=/\d\d/,bc=/\d{3}/,cc=/\d{4}/,dc=/[+-]?\d{6}/,ec=/[+-]?\d+/,fc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,gc="YYYY-MM-DDTHH:mm:ssZ",hc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],ic=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],jc=/([\+\-]|\d\d)/gi,kc=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),lc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},mc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},nc={},oc={s:45,m:45,h:22,d:26,M:11},pc="DDD w W M D d".split(" "),qc="M D H h m s w W".split(" "),rc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return r(this.year()%100,2)},YYYY:function(){return r(this.year(),4)},YYYYY:function(){return r(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+r(Math.abs(a),6)},gg:function(){return r(this.weekYear()%100,2)},gggg:function(){return r(this.weekYear(),4)},ggggg:function(){return r(this.weekYear(),5)},GG:function(){return r(this.isoWeekYear()%100,2)},GGGG:function(){return r(this.isoWeekYear(),4)},GGGGG:function(){return r(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return C(this.milliseconds()/100)},SS:function(){return r(C(this.milliseconds()/10),2)},SSS:function(){return r(this.milliseconds(),3)},SSSS:function(){return r(this.milliseconds(),3)},Z:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+":"+r(C(a)%60,2)},ZZ:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+r(C(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},sc={},tc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"],uc=!1;pc.length;)xb=pc.pop(),rc[xb+"o"]=i(rc[xb],xb);for(;qc.length;)xb=qc.pop(),rc[xb+xb]=h(rc[xb],2);rc.DDDD=h(rc.DDD,3),o(l.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=vb.utc([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=vb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.apply(b,[c]):d},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(a){return a},postformat:function(a){return a},week:function(a){return jb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},firstDayOfWeek:function(){return this._week.dow},firstDayOfYear:function(){return this._week.doy},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),vb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),lb(g)},vb.suppressDeprecationWarnings=!1,vb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),vb.min=function(){var a=[].slice.call(arguments,0);return mb("isBefore",a)},vb.max=function(){var a=[].slice.call(arguments,0);return mb("isAfter",a)},vb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),lb(g).utc()},vb.unix=function(a){return vb(1e3*a)},vb.duration=function(a,b){var d,e,f,g,h=a,i=null;return vb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Nb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:C(i[Eb])*d,h:C(i[Fb])*d,m:C(i[Gb])*d,s:C(i[Hb])*d,ms:C(i[Ib])*d}):(i=Ob.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):null==h?h={}:"object"==typeof h&&("from"in h||"to"in h)&&(g=t(vb(h.from),vb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new n(h),vb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},vb.version=yb,vb.defaultFormat=gc,vb.ISO_8601=function(){},vb.momentProperties=Kb,vb.updateOffset=function(){},vb.relativeTimeThreshold=function(b,c){return oc[b]===a?!1:c===a?oc[b]:(oc[b]=c,!0)},vb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return vb.locale(a,b)}),vb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?vb.defineLocale(a,b):vb.localeData(a),c&&(vb.duration._locale=vb._locale=c)),vb._locale._abbr},vb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Jb[a]||(Jb[a]=new l),Jb[a].set(b),vb.locale(a),Jb[a]):(delete Jb[a],null)},vb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return vb.localeData(a)}),vb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return vb._locale;if(!w(a)){if(b=L(a))return b;a=[a]}return K(a)},vb.isMoment=function(a){return a instanceof m||null!=a&&c(a,"_isAMomentObject")},vb.isDuration=function(a){return a instanceof n};for(xb=tc.length-1;xb>=0;--xb)B(tc[xb]);vb.normalizeUnits=function(a){return z(a)},vb.invalid=function(a){var b=vb.utc(0/0);return null!=a?o(b._pf,a):b._pf.userInvalidated=!0,b},vb.parseZone=function(){return vb.apply(null,arguments).parseZone()},vb.parseTwoDigitYear=function(a){return C(a)+(C(a)>68?1900:2e3)},vb.isDate=x,o(vb.fn=m.prototype,{clone:function(){return vb(this)},valueOf:function(){return+this._d-6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=vb(this).utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():P(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):P(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return I(this)},isDSTShifted:function(){return this._a?this.isValid()&&y(this._a,(this._isUTC?vb.utc(this._a):vb(this._a)).toArray())>0:!1},parsingFlags:function(){return o({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.utcOffset(0,a)},local:function(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(this._dateUtcOffset(),"m")),this},format:function(a){var b=P(this,a||vb.defaultFormat);return this.localeData().postformat(b)},add:u(1,"add"),subtract:u(-1,"subtract"),diff:function(a,b,c){var d,e,f=M(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=j(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:q(e)},from:function(a,b){return vb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(vb(),a)},calendar:function(a){var b=a||vb(),c=M(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,vb(b)))},isLeapYear:function(){return G(this.year())},isDST:function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=gb(a,this.localeData()),this.add(a-b,"d")):b},month:qb("Month",!0),startOf:function(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(b){return b=z(b),b===a||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")},isAfter:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this>+a):(c=vb.isMoment(a)?+a:+vb(a),c<+this.clone().startOf(b))},isBefore:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+a>+this):(c=vb.isMoment(a)?+a:+vb(a),+this.clone().endOf(b)<c)},isBetween:function(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)},isSame:function(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this===+a):(c=+vb(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),a>this?this:a}),zone:f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",function(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}),utcOffset:function(a,b){var c,d=this._offset||0;return null!=a?("string"==typeof a&&(a=S(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateUtcOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.add(c,"m"),d!==a&&(!b||this._changeInProgress?v(this,vb.duration(a-d,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,vb.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?d:this._dateUtcOffset()},isLocal:function(){return!this._isUTC},isUtcOffset:function(){return this._isUTC},isUtc:function(){return this._isUTC&&0===this._offset},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(S(this._i)),this},hasAlignedHourOffset:function(a){return a=a?vb(a).utcOffset():0,(this.utcOffset()-a)%60===0},daysInMonth:function(){return D(this.year(),this.month())},dayOfYear:function(a){var b=Ab((vb(this).startOf("day")-vb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=jb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=jb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=jb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return E(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return E(this.year(),a.dow,a.doy)},get:function(a){return a=z(a),this[a]()},set:function(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else a=z(a),"function"==typeof this[a]&&this[a](b);return this},locale:function(b){var c;return b===a?this._locale._abbr:(c=vb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateUtcOffset:function(){return 15*-Math.round(this._d.getTimezoneOffset()/15)}}),vb.fn.millisecond=vb.fn.milliseconds=qb("Milliseconds",!1),vb.fn.second=vb.fn.seconds=qb("Seconds",!1),vb.fn.minute=vb.fn.minutes=qb("Minutes",!1),vb.fn.hour=vb.fn.hours=qb("Hours",!0),vb.fn.date=qb("Date",!0),vb.fn.dates=f("dates accessor is deprecated. Use date instead.",qb("Date",!0)),vb.fn.year=qb("FullYear",!0),vb.fn.years=f("years accessor is deprecated. Use year instead.",qb("FullYear",!0)),vb.fn.days=vb.fn.day,vb.fn.months=vb.fn.month,vb.fn.weeks=vb.fn.week,vb.fn.isoWeeks=vb.fn.isoWeek,vb.fn.quarters=vb.fn.quarter,vb.fn.toJSON=vb.fn.toISOString,vb.fn.isUTC=vb.fn.isUtc,o(vb.duration.fn=n.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=q(d/1e3),g.seconds=a%60,b=q(a/60),g.minutes=b%60,c=q(b/60),g.hours=c%24,e+=q(c/24),h=q(rb(e)),e-=q(sb(h)),f+=q(e/30),e%=30,h+=q(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return q(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*C(this._months/12)
},humanize:function(a){var b=ib(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=vb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=vb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=z(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=z(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*rb(b),"month"===a?c:c/12;switch(b=this._days+Math.round(sb(this._months/12)),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:vb.fn.lang,locale:vb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale},toJSON:function(){return this.toISOString()}}),vb.duration.fn.toString=vb.duration.fn.toISOString;for(xb in kc)c(kc,xb)&&tb(xb.toLowerCase());vb.duration.fn.asMilliseconds=function(){return this.as("ms")},vb.duration.fn.asSeconds=function(){return this.as("s")},vb.duration.fn.asMinutes=function(){return this.as("m")},vb.duration.fn.asHours=function(){return this.as("h")},vb.duration.fn.asDays=function(){return this.as("d")},vb.duration.fn.asWeeks=function(){return this.as("weeks")},vb.duration.fn.asMonths=function(){return this.as("M")},vb.duration.fn.asYears=function(){return this.as("y")},vb.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===C(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Lb?module.exports=vb:"function"==typeof define&&define.amd?(define(function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(zb.moment=wb),vb}),ub(!0)):ub()}).call(this);
/*global jQuery */
/*!
* FlexVerticalCenter.js 1.0
*
* Copyright 2011, Paul Sprangers http://paulsprangers.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Fri Oct 28 19:12:00 2011 +0100
*/
(function( $ ){

  $.fn.flexVerticalCenter = function( options ) {
    var settings = $.extend({
      cssAttribute:   'margin-top', // the attribute to apply the calculated value to
      verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
      parentSelector: null,         // a selector representing the parent to vertically center this element within
      debounceTimeout: 25           // a default debounce timeout in milliseconds
    }, options || {});

    return this.each(function(){
      var $this   = $(this); // store the object
      var debounce;

      // recalculate the distance to the top of the element to keep it centered
      var resizer = function () {

        var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
          $this.parents(settings.parentSelector).first().height() : $this.parent().height();

        $this.css(
          settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
        );
      };

      // Call on resize. Opera debounces their resize by default.
      $(window).resize(function () {
          clearTimeout(debounce);
          debounce = setTimeout(resizer, settings.debounceTimeout);
      });

      // Call once to set after window loads.
      $(window).load(function () {
          resizer();
      });

      // Apply a load event to images within the element so it fires again after an image is loaded
      $this.find('img').load(resizer);

    });

  };

})( jQuery );



/*!
 * @preserve
 * jquery.scrolldepth.js | v0.7.1
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */
;(function ( $, window, document, undefined ) {

  "use strict";

  var defaults = {
    minHeight: 0,
    elements: [],
    percentage: true,
    userTiming: true,
    pixelDepth: true,
    nonInteraction: true
  };

  var $window = $(window),
    cache = [],
    lastPixelDepth = 0,
    universalGA,
    classicGA,
    standardEventHandler;

  /*
   * Plugin
   */

  $.scrollDepth = function(options) {

    var startTime = +new Date;

    options = $.extend({}, defaults, options);

    // Return early if document height is too small
    if ( $(document).height() < options.minHeight ) {
      return;
    }

    /*
     * Determine which version of GA is being used
     * "ga", "_gaq", and "dataLayer" are the possible globals
     */

    if (typeof ga === "function") {
      universalGA = true;
    }

    if (typeof _gaq !== "undefined" && typeof _gaq.push === "function") {
      classicGA = true;
    }

    if (typeof options.eventHandler === "function") {
      standardEventHandler = options.eventHandler;
    } else if (typeof dataLayer !== "undefined" && typeof dataLayer.push === "function") {
      standardEventHandler = dataLayer.push;
    }

    if (options.percentage) {
      // Establish baseline (0% scroll)
      sendBaseline('Percentage');
    } else if (options.elements) {
      sendBaseline('Elements');
    }

    /*
     * Functions
     */

    /*
     * Putting this in a separate function because the Baseline event may soon be removed entirely
     */
    function sendBaseline(action, label) {

      if (standardEventHandler) {

        standardEventHandler({'event': 'ScrollDistance', 'eventCategory': 'Scroll Depth', 'eventAction': action, 'eventLabel': 'Baseline', 'eventValue': 1, 'eventNonInteraction': true });

      } else {

        if (universalGA) {

          ga('send', 'event', 'Scroll Depth', action, 'Baseline', 1, {'nonInteraction': true });

        }

        if (classicGA) {

          _gaq.push(['_trackEvent', 'Scroll Depth', action, 'Baseline', 1, true]);

        }

      }

    }

    function sendEvent(action, label, scrollDistance, timing) {

      if (standardEventHandler) {

        standardEventHandler({'event': 'ScrollDistance', 'eventCategory': 'Scroll Depth', 'eventAction': action, 'eventLabel': label, 'eventValue': 1, 'eventNonInteraction': options.nonInteraction});

        if (options.pixelDepth && arguments.length > 2 && scrollDistance > lastPixelDepth) {
          lastPixelDepth = scrollDistance;
          standardEventHandler({'event': 'ScrollDistance', 'eventCategory': 'Scroll Depth', 'eventAction': 'Pixel Depth', 'eventLabel': rounded(scrollDistance), 'eventValue': 1, 'eventNonInteraction': options.nonInteraction});
        }

        if (options.userTiming && arguments.length > 3) {
          standardEventHandler({'event': 'ScrollTiming', 'eventCategory': 'Scroll Depth', 'eventAction': action, 'eventLabel': label, 'eventTiming': timing});
        }

      } else {

        if (universalGA) {

          ga('send', 'event', 'Scroll Depth', action, label, 1, {'nonInteraction': options.nonInteraction});

          if (options.pixelDepth && arguments.length > 2 && scrollDistance > lastPixelDepth) {
            lastPixelDepth = scrollDistance;
            ga('send', 'event', 'Scroll Depth', 'Pixel Depth', rounded(scrollDistance), 1, {'nonInteraction': options.nonInteraction});
          }

          if (options.userTiming && arguments.length > 3) {
            ga('send', 'timing', 'Scroll Depth', action, timing, label);
          }

        }

        if (classicGA) {

          _gaq.push(['_trackEvent', 'Scroll Depth', action, label, 1, options.nonInteraction]);

          if (options.pixelDepth && arguments.length > 2 && scrollDistance > lastPixelDepth) {
            lastPixelDepth = scrollDistance;
            _gaq.push(['_trackEvent', 'Scroll Depth', 'Pixel Depth', rounded(scrollDistance), 1, options.nonInteraction]);
          }

          if (options.userTiming && arguments.length > 3) {
            _gaq.push(['_trackTiming', 'Scroll Depth', action, timing, label, 100]);
          }

        }

      }

    }

    function calculateMarks(docHeight) {
      return {
        '25%' : parseInt(docHeight * 0.25, 10),
        '50%' : parseInt(docHeight * 0.50, 10),
        '75%' : parseInt(docHeight * 0.75, 10),
        // 1px cushion to trigger 100% event in iOS
        '100%': docHeight - 5
      };
    }

    function checkMarks(marks, scrollDistance, timing) {
      // Check each active mark
      $.each(marks, function(key, val) {
        if ( $.inArray(key, cache) === -1 && scrollDistance >= val ) {
          sendEvent('Percentage', key, scrollDistance, timing);
          cache.push(key);
        }
      });
    }

    function checkElements(elements, scrollDistance, timing) {
      $.each(elements, function(index, elem) {
        if ( $.inArray(elem, cache) === -1 && $(elem).length ) {
          if ( scrollDistance >= $(elem).offset().top ) {
            sendEvent('Elements', elem, scrollDistance, timing);
            cache.push(elem);
          }
        }
      });
    }

    function rounded(scrollDistance) {
      // Returns String
      return (Math.floor(scrollDistance/250) * 250).toString();
    }

    /*
     * Throttle function borrowed from:
     * Underscore.js 1.5.2
     * http://underscorejs.org
     * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Underscore may be freely distributed under the MIT license.
     */

    function throttle(func, wait) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      var later = function() {
        previous = new Date;
        timeout = null;
        result = func.apply(context, args);
      };
      return function() {
        var now = new Date;
        if (!previous) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

    /*
     * Scroll Event
     */

    $window.on('scroll.scrollDepth', throttle(function() {
      /*
       * We calculate document and window height on each scroll event to
       * account for dynamic DOM changes.
       */

      var docHeight = $(document).height(),
        winHeight = window.innerHeight ? window.innerHeight : $window.height(),
        scrollDistance = $window.scrollTop() + winHeight,

        // Recalculate percentage marks
        marks = calculateMarks(docHeight),

        // Timing
        timing = +new Date - startTime;

      // If all marks already hit, unbind scroll event
      if (cache.length >= 4 + options.elements.length) {
        $window.off('scroll.scrollDepth');
        return;
      }

      // Check specified DOM elements
      if (options.elements) {
        checkElements(options.elements, scrollDistance, timing);
      }

      // Check standard marks
      if (options.percentage) {
        checkMarks(marks, scrollDistance, timing);
      }
    }, 500));

  };

})( jQuery, window, document );