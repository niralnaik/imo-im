
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}
YAHOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO;for(j=(d[0]=="YAHOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};YAHOO.log=function(msg,cat,src){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};YAHOO.register=function(name,mainClass,data){var mods=YAHOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=YAHOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{YAHOO.log("mainClass is undefined for module "+name,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(name){return YAHOO.env.modules[name]||null;};YAHOO.env.ua=function(){var o={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var ua=navigator.userAgent,m;if((/KHTML/).test(ua)){o.webkit=1;}
m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=parseFloat(m[1]);if(/ Mobile\//.test(ua)){o.mobile="Apple";}else{m=ua.match(/NokiaN[^\/]*/);if(m){o.mobile=m[0];}}
m=ua.match(/AdobeAIR\/([^\s]*)/);if(m){o.air=m[0];}}
if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=parseFloat(m[1]);m=ua.match(/Opera Mini[^;]*/);if(m){o.mobile=m[0];}}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=parseFloat(m[1]);}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=parseFloat(m[1]);}}}}}
return o;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var l=YAHOO_config.listener,ls=YAHOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var L=YAHOO.lang,ADD=["toString","valueOf"],OB={isArray:function(o){if(o){return L.isNumber(o.length)&&L.isFunction(o.splice);}
return false;},isBoolean:function(o){return typeof o==='boolean';},isFunction:function(o){return typeof o==='function';},isNull:function(o){return o===null;},isNumber:function(o){return typeof o==='number'&&isFinite(o);},isObject:function(o){return(o&&(typeof o==='object'||L.isFunction(o)))||false;},isString:function(o){return typeof o==='string';},isUndefined:function(o){return typeof o==='undefined';},_IEEnumFix:(YAHOO.env.ua.ie)?function(r,s){for(var i=0;i<ADD.length;i=i+1){var fname=ADD[i],f=s[fname];if(L.isFunction(f)&&f!=Object.prototype[fname]){r[fname]=f;}}}:function(){},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){if(L.hasOwnProperty(overrides,i)){subc.prototype[i]=overrides[i];}}
L._IEEnumFix(subc.prototype,overrides);}},augmentObject:function(r,s){if(!s||!r){throw new Error("Absorb failed, verify dependencies.");}
var a=arguments,i,p,override=a[2];if(override&&override!==true){for(i=2;i<a.length;i=i+1){r[a[i]]=s[a[i]];}}else{for(p in s){if(override||!(p in r)){r[p]=s[p];}}
L._IEEnumFix(r,s);}},augmentProto:function(r,s){if(!s||!r){throw new Error("Augment failed, verify dependencies.");}
var a=[r.prototype,s.prototype];for(var i=2;i<arguments.length;i=i+1){a.push(arguments[i]);}
L.augmentObject.apply(this,a);},dump:function(o,d){var i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=', ',ARROW=' => ';if(!L.isObject(o)){return o+"";}else if(o instanceof Date||("nodeType"in o&&"tagName"in o)){return o;}else if(L.isFunction(o)){return FUN;}
d=(L.isNumber(d))?d:3;if(L.isArray(o)){s.push("[");for(i=0,len=o.length;i<len;i=i+1){if(L.isObject(o[i])){s.push((d>0)?L.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}
if(s.length>1){s.pop();}
s.push("]");}else{s.push("{");for(i in o){if(L.hasOwnProperty(o,i)){s.push(i+ARROW);if(L.isObject(o[i])){s.push((d>0)?L.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}}
if(s.length>1){s.pop();}
s.push("}");}
return s.join("");},substitute:function(s,o,f){var i,j,k,key,v,meta,saved=[],token,DUMP='dump',SPACE=' ',LBRACE='{',RBRACE='}';for(;;){i=s.lastIndexOf(LBRACE);if(i<0){break;}
j=s.indexOf(RBRACE,i);if(i+1>=j){break;}
token=s.substring(i+1,j);key=token;meta=null;k=key.indexOf(SPACE);if(k>-1){meta=key.substring(k+1);key=key.substring(0,k);}
v=o[key];if(f){v=f(key,v,meta);}
if(L.isObject(v)){if(L.isArray(v)){v=L.dump(v,parseInt(meta,10));}else{meta=meta||"";var dump=meta.indexOf(DUMP);if(dump>-1){meta=meta.substring(4);}
if(v.toString===Object.prototype.toString||dump>-1){v=L.dump(v,parseInt(meta,10));}else{v=v.toString();}}}else if(!L.isString(v)&&!L.isNumber(v)){v="~-"+saved.length+"-~";saved[saved.length]=token;}
s=s.substring(0,i)+v+s.substring(j+1);}
for(i=saved.length-1;i>=0;i=i-1){s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g");}
return s;},trim:function(s){try{return s.replace(/^\s+|\s+$/g,"");}catch(e){return s;}},merge:function(){var o={},a=arguments;for(var i=0,l=a.length;i<l;i=i+1){L.augmentObject(o,a[i],true);}
return o;},later:function(when,o,fn,data,periodic){when=when||0;o=o||{};var m=fn,d=data,f,r;if(L.isString(fn)){m=o[fn];}
if(!m){throw new TypeError("method undefined");}
if(!L.isArray(d)){d=[data];}
f=function(){m.apply(o,d);};r=(periodic)?setInterval(f,when):setTimeout(f,when);return{interval:periodic,cancel:function(){if(this.interval){clearInterval(r);}else{clearTimeout(r);}}};},isValue:function(o){return(L.isObject(o)||L.isString(o)||L.isNumber(o)||L.isBoolean(o));}};L.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(o,prop){return o&&o.hasOwnProperty(prop);}:function(o,prop){return!L.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop];};OB.augmentObject(L,OB,true);YAHOO.util.Lang=L;L.augment=L.augmentProto;YAHOO.augment=L.augmentProto;YAHOO.extend=L.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.5.2",build:"1076"});(function(){var Y=YAHOO.util,getStyle,setStyle,propertyCache={},reClassNameCache={},document=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var isOpera=YAHOO.env.ua.opera,isSafari=YAHOO.env.ua.webkit,isGecko=YAHOO.env.ua.gecko,isIE=YAHOO.env.ua.ie;var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};var getClassRegEx=function(className){var re=reClassNameCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');reClassNameCache[className]=re;}
return re;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=el.ownerDocument.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
var testElement=function(node,method){return node&&node.nodeType==1&&(!method||method(node));};YAHOO.util.Dom={get:function(el){if(el&&(el.nodeType||el.item)){return el;}
if(YAHOO.lang.isString(el)||!el){return document.getElementById(el);}
if(el.length!==undefined){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
return el;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=el.ownerDocument.body){return false;}
return getXY(el);};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=el.ownerDocument.body){return false;}
var region=Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag),re=getClassRegEx(className);for(var i=0,len=elements.length;i<len;++i){if(re.test(elements[i].className)){nodes[nodes.length]=elements[i];if(apply){apply.call(elements[i],elements[i]);}}}
return nodes;},hasClass:function(el,className){var re=getClassRegEx(className);var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return false;}
el.className=YAHOO.lang.trim([el.className,className].join(' '));return true;};return Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=getClassRegEx(className);var f=function(el){if(!className||!this.hasClass(el,className)){return false;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(!newClassName||oldClassName===newClassName){return false;}
var re=getClassRegEx(oldClassName);var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return true;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';var f=function(el){if(el&&el.id){return el.id;}
var id=prefix+YAHOO.env._id_counter++;if(el){el.id=id;}
return id;};return Y.Dom.batch(el,f,Y.Dom,true)||f.apply(Y.Dom,arguments);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);needle=Y.Dom.get(needle);if(!haystack||!needle){return false;}
if(haystack.contains&&needle.nodeType&&!isSafari){return haystack.contains(needle);}
else if(haystack.compareDocumentPosition&&needle.nodeType){return!!(haystack.compareDocumentPosition(needle)&16);}else if(needle.nodeType){return!!this.getAncestorBy(needle,function(el){return el==haystack;});}
return false;},inDocument:function(el){return this.isAncestor(document.documentElement,el);},getElementsBy:function(method,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag);for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];if(apply){apply(elements[i]);}}}
return nodes;},batch:function(el,method,o,override){el=(el&&(el.tagName||el.item))?el:Y.Dom.get(el);if(!el||!method){return false;}
var scope=(override)?o:window;if(el.tagName||el.length===undefined){return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;},getAncestorBy:function(node,method){while(node=node.parentNode){if(testElement(node,method)){return node;}}
return null;},getAncestorByClassName:function(node,className){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getAncestorBy(node,method);},getAncestorByTagName:function(node,tagName){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return el.tagName&&el.tagName.toUpperCase()==tagName.toUpperCase();};return Y.Dom.getAncestorBy(node,method);},getPreviousSiblingBy:function(node,method){while(node){node=node.previousSibling;if(testElement(node,method)){return node;}}
return null;},getPreviousSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getPreviousSiblingBy(node);},getNextSiblingBy:function(node,method){while(node){node=node.nextSibling;if(testElement(node,method)){return node;}}
return null;},getNextSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getNextSiblingBy(node);},getFirstChildBy:function(node,method){var child=(testElement(node.firstChild,method))?node.firstChild:null;return child||Y.Dom.getNextSiblingBy(node.firstChild,method);},getFirstChild:function(node,method){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getFirstChildBy(node);},getLastChildBy:function(node,method){if(!node){return null;}
var child=(testElement(node.lastChild,method))?node.lastChild:null;return child||Y.Dom.getPreviousSiblingBy(node.lastChild,method);},getLastChild:function(node){node=Y.Dom.get(node);return Y.Dom.getLastChildBy(node);},getChildrenBy:function(node,method){var child=Y.Dom.getFirstChildBy(node,method);var children=child?[child]:[];Y.Dom.getNextSiblingBy(child,function(node){if(!method||method(node)){children[children.length]=node;}
return false;});return children;},getChildren:function(node){node=Y.Dom.get(node);if(!node){}
return Y.Dom.getChildrenBy(node);},getDocumentScrollLeft:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);},getDocumentScrollTop:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);},insertBefore:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
return referenceNode.parentNode.insertBefore(newNode,referenceNode);},insertAfter:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
if(referenceNode.nextSibling){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}else{return referenceNode.parentNode.appendChild(newNode);}},getClientRegion:function(){var t=Y.Dom.getDocumentScrollTop(),l=Y.Dom.getDocumentScrollLeft(),r=Y.Dom.getViewportWidth()+l,b=Y.Dom.getViewportHeight()+t;return new Y.Region(t,r,b,l);}};var getXY=function(){if(document.documentElement.getBoundingClientRect){return function(el){var box=el.getBoundingClientRect();var rootNode=el.ownerDocument;return[box.left+Y.Dom.getDocumentScrollLeft(rootNode),box.top+
Y.Dom.getDocumentScrollTop(rootNode)];};}else{return function(el){var pos=[el.offsetLeft,el.offsetTop];var parentNode=el.offsetParent;var accountForBody=(isSafari&&Y.Dom.getStyle(el,'position')=='absolute'&&el.offsetParent==el.ownerDocument.body);if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(!accountForBody&&isSafari&&Y.Dom.getStyle(parentNode,'position')=='absolute'){accountForBody=true;}
parentNode=parentNode.offsetParent;}}
if(accountForBody){pos[0]-=el.ownerDocument.body.offsetLeft;pos[1]-=el.ownerDocument.body.offsetTop;}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(parentNode.scrollTop||parentNode.scrollLeft){if(!patterns.OP_SCROLL.test(Y.Dom.getStyle(parentNode,'display'))){if(!isOpera||Y.Dom.getStyle(parentNode,'overflow')!=='visible'){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}}}
parentNode=parentNode.parentNode;}
return pos;};}}()})();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(YAHOO.lang.isArray(x)){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.2",build:"1076"});YAHOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new YAHOO.util.CustomEvent(onsubscribeType,this,true);}
this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new YAHOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){this.lastError=null;var errors=[],len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[].slice.call(arguments,0),ret=true,i,rebuild=false;if(!this.silent){}
var subs=this.subscribers.slice(),throwErrors=YAHOO.util.Event.throwErrors;for(i=0;i<len;++i){var s=subs[i];if(!s){rebuild=true;}else{if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
try{ret=s.fn.call(scope,param,s.obj);}catch(e){this.lastError=e;if(throwErrors){throw e;}}}else{try{ret=s.fn.call(scope,this.type,args,s.obj);}catch(ex){this.lastError=ex;if(throwErrors){throw ex;}}}
if(false===ret){if(!this.silent){}
break;}}}
return(ret!==false);},unsubscribeAll:function(){for(var i=this.subscribers.length-1;i>-1;i--){this._delete(i);}
this.subscribers=[];return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers.splice(index,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=YAHOO.lang.isUndefined(obj)?null:obj;this.override=override;};YAHOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var loadComplete=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var webkitKeymap={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:true,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override,checkContent){var a=(YAHOO.lang.isString(p_id))?[p_id]:p_id;for(var i=0;i<a.length;i=i+1){onAvailStack.push({id:a[i],fn:p_fn,obj:p_obj,override:p_override,checkReady:checkContent});}
retryCount=this.POLL_RETRYS;this.startInterval();},onContentReady:function(p_id,p_fn,p_obj,p_override){this.onAvailable(p_id,p_fn,p_obj,p_override,true);},onDOMReady:function(p_fn,p_obj,p_override){if(this.DOMReady){setTimeout(function(){var s=window;if(p_override){if(p_override===true){s=p_obj;}else{s=p_override;}}
p_fn.call(s,"DOMReady",[],p_obj);},0);}else{this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);}},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(YAHOO.lang.isString(el)){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){YAHOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,YAHOO.util.Event.getEvent(e,el),obj);};var li=[el,sType,fn,wrappedFn,scope,obj,override];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex].slice();for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len,li;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=el.length-1;i>-1;i--){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=unloadListeners.length-1;i>-1;i--){li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners.splice(i,1);return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"===typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist.splice(i,1);break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners.splice(index,1);return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(n){try{if(n&&3==n.nodeType){return n.parentNode;}}catch(e){}
return n;},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e,boundEl){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){var code=ev.keyCode||ev.charCode||0;if(YAHOO.env.ua.webkit&&(code in webkitKeymap)){code=webkitKeymap[code];}
return code;},_getCacheIndex:function(el,sType,fn){for(var i=0,l=listeners.length;i<l;i=i+1){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){try{return(o&&typeof o!=="string"&&o.length&&!o.tagName&&!o.alert&&typeof o[0]!=="undefined");}catch(ex){return false;}},elCache:{},getEl:function(id){return(typeof id==="string")?document.getElementById(id):id;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=YAHOO.util.Event;EU._ready();EU._tryPreloadAttach();}},_ready:function(e){var EU=YAHOO.util.Event;if(!EU.DOMReady){EU.DOMReady=true;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(onAvailStack.length===0){retryCount=0;clearInterval(this._interval);this._interval=null;return;}
if(this.locked){return;}
if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0&&onAvailStack.length>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el,ready=[];for(i=0,len=onAvailStack.length;i<len;i=i+1){item=onAvailStack[i];if(item){el=this.getEl(item.id);if(el){if(item.checkReady){if(loadComplete||el.nextSibling||!tryAgain){ready.push(item);onAvailStack[i]=null;}}else{executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
for(i=0,len=ready.length;i<len;i=i+1){item=ready[i];executeItem(this.getEl(item.id),item);}
retryCount--;if(tryAgain){for(i=onAvailStack.length-1;i>-1;i--){item=onAvailStack[i];if(!item||!item.id){onAvailStack.splice(i,1);}}
this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;},purgeElement:function(el,recurse,sType){var oEl=(YAHOO.lang.isString(el))?this.getEl(el):el;var elListeners=this.getListeners(oEl,sType),i,len;if(elListeners){for(i=elListeners.length-1;i>-1;i--){var l=elListeners[i];this.removeListener(oEl,l.type,l.fn);}}
if(recurse&&oEl&&oEl.childNodes){for(i=0,len=oEl.childNodes.length;i<len;++i){this.purgeElement(oEl.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType==="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
var oEl=(YAHOO.lang.isString(el))?this.getEl(el):el;for(var j=0;j<searchLists.length;j=j+1){var searchList=searchLists[j];if(searchList){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===oEl&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.OVERRIDE],scope:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=YAHOO.util.Event,i,j,l,len,index,ul=unloadListeners.slice();for(i=0,len=unloadListeners.length;i<len;++i){l=ul[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.UNLOAD_OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e,l[EU.EL]),l[EU.UNLOAD_OBJ]);ul[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners){for(j=listeners.length-1;j>-1;j--){l=listeners[j];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],j);}}
l=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement('p');EU._dri=setInterval(function(){try{n.doScroll('left');clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var evts=this.__yui_events;if(p_type){var ce=evts[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}}else{var ret=true;for(var i in evts){if(YAHOO.lang.hasOwnProperty(evts,i)){ret=ret&&evts[i].unsubscribe(p_fn,p_obj);}}
return ret;}
return false;},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=(opts.silent);var ce=new YAHOO.util.CustomEvent(p_type,scope,silent,YAHOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(!ce){return null;}
var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.5.2",build:"1076"});YAHOO.widget.LogMsg=function(oConfigs){this.msg=this.time=this.category=this.source=this.sourceDetail=null;if(oConfigs&&(oConfigs.constructor==Object)){for(var param in oConfigs){this[param]=oConfigs[param];}}};YAHOO.widget.LogWriter=function(sSource){if(!sSource){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return;}
this._source=sSource;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(sMsg,sCategory){YAHOO.widget.Logger.log(sMsg,sCategory,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._sSource;};YAHOO.widget.LogWriter.prototype.setSource=function(sSource){if(!sSource){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return;}
else{this._sSource=sSource;}};YAHOO.widget.LogWriter.prototype._source=null;YAHOO.widget.LogReader=function(elContainer,oConfigs){this._sName=YAHOO.widget.LogReader._index;YAHOO.widget.LogReader._index++;this._buffer=[];this._filterCheckboxes={};this._lastTime=YAHOO.widget.Logger.getStartTime();if(oConfigs&&(oConfigs.constructor==Object)){for(var param in oConfigs){this[param]=oConfigs[param];}}
this._initContainerEl(elContainer);if(!this._elContainer){YAHOO.log("Could not instantiate LogReader due to an invalid container element "+
elContainer,"error",this.toString());return;}
this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initDragDrop();this._initCategories();this._initSources();YAHOO.widget.Logger.newLogEvent.subscribe(this._onNewLog,this);YAHOO.widget.Logger.logResetEvent.subscribe(this._onReset,this);YAHOO.widget.Logger.categoryCreateEvent.subscribe(this._onCategoryCreate,this);YAHOO.widget.Logger.sourceCreateEvent.subscribe(this._onSourceCreate,this);this._filterLogs();YAHOO.log("LogReader initialized",null,this.toString());};YAHOO.lang.augmentObject(YAHOO.widget.LogReader,{_index:0,ENTRY_TEMPLATE:(function(){var t=document.createElement('pre');YAHOO.util.Dom.addClass(t,'yui-log-entry');return t;})(),VERBOSE_TEMPLATE:"<span class='{category}'>{label}</span>{totalTime}ms (+{elapsedTime}) {localTime}:</p><p>{sourceAndDetail}</p><p>{message}</p>",BASIC_TEMPLATE:"<p><span class='{category}'>{label}</span>{totalTime}ms (+{elapsedTime}) {localTime}: {sourceAndDetail}: {message}</p>"});YAHOO.widget.LogReader.prototype={logReaderEnabled:true,width:null,height:null,top:null,left:null,right:null,bottom:null,fontSize:null,footerEnabled:true,verboseOutput:true,entryFormat:null,newestOnTop:true,outputBuffer:100,thresholdMax:500,thresholdMin:100,isCollapsed:false,isPaused:false,draggable:true,toString:function(){return"LogReader instance"+this._sName;},pause:function(){this.isPaused=true;this._btnPause.value="Resume";this._timeout=null;this.logReaderEnabled=false;},resume:function(){this.isPaused=false;this._btnPause.value="Pause";this.logReaderEnabled=true;this._printBuffer();},hide:function(){this._elContainer.style.display="none";},show:function(){this._elContainer.style.display="block";},collapse:function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}
this._btnCollapse.value="Expand";this.isCollapsed=true;},expand:function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}
this._btnCollapse.value="Collapse";this.isCollapsed=false;},getCheckbox:function(filter){return this._filterCheckboxes[filter];},getCategories:function(){return this._categoryFilters;},showCategory:function(sCategory){var filtersArray=this._categoryFilters;if(filtersArray.indexOf){if(filtersArray.indexOf(sCategory)>-1){return;}}
else{for(var i=0;i<filtersArray.length;i++){if(filtersArray[i]===sCategory){return;}}}
this._categoryFilters.push(sCategory);this._filterLogs();var elCheckbox=this.getCheckbox(sCategory);if(elCheckbox){elCheckbox.checked=true;}},hideCategory:function(sCategory){var filtersArray=this._categoryFilters;for(var i=0;i<filtersArray.length;i++){if(sCategory==filtersArray[i]){filtersArray.splice(i,1);break;}}
this._filterLogs();var elCheckbox=this.getCheckbox(sCategory);if(elCheckbox){elCheckbox.checked=false;}},getSources:function(){return this._sourceFilters;},showSource:function(sSource){var filtersArray=this._sourceFilters;if(filtersArray.indexOf){if(filtersArray.indexOf(sSource)>-1){return;}}
else{for(var i=0;i<filtersArray.length;i++){if(sSource==filtersArray[i]){return;}}}
filtersArray.push(sSource);this._filterLogs();var elCheckbox=this.getCheckbox(sSource);if(elCheckbox){elCheckbox.checked=true;}},hideSource:function(sSource){var filtersArray=this._sourceFilters;for(var i=0;i<filtersArray.length;i++){if(sSource==filtersArray[i]){filtersArray.splice(i,1);break;}}
this._filterLogs();var elCheckbox=this.getCheckbox(sSource);if(elCheckbox){elCheckbox.checked=false;}},clearConsole:function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var elConsole=this._elConsole;elConsole.innerHTML='';},setTitle:function(sTitle){this._title.innerHTML=this.html2Text(sTitle);},getLastTime:function(){return this._lastTime;},formatMsg:function(entry){var Static=YAHOO.widget.LogReader,entryFormat=this.entryFormat||(this.verboseOutput?Static.VERBOSE_TEMPLATE:Static.BASIC_TEMPLATE),info={category:entry.category,label:entry.category.substring(0,4).toUpperCase(),sourceAndDetail:entry.sourceDetail?entry.source+" "+entry.sourceDetail:entry.source,message:this.html2Text(entry.msg||entry.message||'')};if(entry.time&&entry.time.getTime){info.localTime=entry.time.toLocaleTimeString?entry.time.toLocaleTimeString():entry.time.toString();info.elapsedTime=entry.time.getTime()-this.getLastTime();info.totalTime=entry.time.getTime()-
YAHOO.widget.Logger.getStartTime();}
var msg=Static.ENTRY_TEMPLATE.cloneNode(true);if(this.verboseOutput){msg.className+=' yui-log-verbose';}
msg.innerHTML=YAHOO.lang.substitute(entryFormat,info);return msg;},html2Text:function(sHtml){if(sHtml){sHtml+="";return sHtml.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");}
return"";},_sName:null,_buffer:null,_consoleMsgCount:0,_lastTime:null,_timeout:null,_filterCheckboxes:null,_categoryFilters:null,_sourceFilters:null,_elContainer:null,_elHd:null,_elCollapse:null,_btnCollapse:null,_title:null,_elConsole:null,_elFt:null,_elBtns:null,_elCategoryFilters:null,_elSourceFilters:null,_btnPause:null,_btnClear:null,_initContainerEl:function(elContainer){elContainer=YAHOO.util.Dom.get(elContainer);if(elContainer&&elContainer.tagName&&(elContainer.tagName.toLowerCase()=="div")){this._elContainer=elContainer;YAHOO.util.Dom.addClass(this._elContainer,"yui-log");}
else{this._elContainer=document.body.appendChild(document.createElement("div"));YAHOO.util.Dom.addClass(this._elContainer,"yui-log");YAHOO.util.Dom.addClass(this._elContainer,"yui-log-container");var containerStyle=this._elContainer.style;if(this.width){containerStyle.width=this.width;}
if(this.right){containerStyle.right=this.right;}
if(this.top){containerStyle.top=this.top;}
if(this.left){containerStyle.left=this.left;containerStyle.right="auto";}
if(this.bottom){containerStyle.bottom=this.bottom;containerStyle.top="auto";}
if(this.fontSize){containerStyle.fontSize=this.fontSize;}
if(navigator.userAgent.toLowerCase().indexOf("opera")!=-1){document.body.style+='';}}},_initHeaderEl:function(){var oSelf=this;if(this._elHd){YAHOO.util.Event.purgeElement(this._elHd,true);this._elHd.innerHTML="";}
this._elHd=this._elContainer.appendChild(document.createElement("div"));this._elHd.id="yui-log-hd"+this._sName;this._elHd.className="yui-log-hd";this._elCollapse=this._elHd.appendChild(document.createElement("div"));this._elCollapse.className="yui-log-btns";this._btnCollapse=document.createElement("input");this._btnCollapse.type="button";this._btnCollapse.className="yui-log-button";this._btnCollapse.value="Collapse";this._btnCollapse=this._elCollapse.appendChild(this._btnCollapse);YAHOO.util.Event.addListener(oSelf._btnCollapse,'click',oSelf._onClickCollapseBtn,oSelf);this._title=this._elHd.appendChild(document.createElement("h4"));this._title.innerHTML="Logger Console";},_initConsoleEl:function(){if(this._elConsole){YAHOO.util.Event.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}
this._elConsole=this._elContainer.appendChild(document.createElement("div"));this._elConsole.className="yui-log-bd";if(this.height){this._elConsole.style.height=this.height;}},_initFooterEl:function(){var oSelf=this;if(this.footerEnabled){if(this._elFt){YAHOO.util.Event.purgeElement(this._elFt,true);this._elFt.innerHTML="";}
this._elFt=this._elContainer.appendChild(document.createElement("div"));this._elFt.className="yui-log-ft";this._elBtns=this._elFt.appendChild(document.createElement("div"));this._elBtns.className="yui-log-btns";this._btnPause=document.createElement("input");this._btnPause.type="button";this._btnPause.className="yui-log-button";this._btnPause.value="Pause";this._btnPause=this._elBtns.appendChild(this._btnPause);YAHOO.util.Event.addListener(oSelf._btnPause,'click',oSelf._onClickPauseBtn,oSelf);this._btnClear=document.createElement("input");this._btnClear.type="button";this._btnClear.className="yui-log-button";this._btnClear.value="Clear";this._btnClear=this._elBtns.appendChild(this._btnClear);YAHOO.util.Event.addListener(oSelf._btnClear,'click',oSelf._onClickClearBtn,oSelf);this._elCategoryFilters=this._elFt.appendChild(document.createElement("div"));this._elCategoryFilters.className="yui-log-categoryfilters";this._elSourceFilters=this._elFt.appendChild(document.createElement("div"));this._elSourceFilters.className="yui-log-sourcefilters";}},_initDragDrop:function(){if(YAHOO.util.DD&&this.draggable&&this._elHd){var ylog_dd=new YAHOO.util.DD(this._elContainer);ylog_dd.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}},_initCategories:function(){this._categoryFilters=[];var aInitialCategories=YAHOO.widget.Logger.categories;for(var j=0;j<aInitialCategories.length;j++){var sCategory=aInitialCategories[j];this._categoryFilters.push(sCategory);if(this._elCategoryFilters){this._createCategoryCheckbox(sCategory);}}},_initSources:function(){this._sourceFilters=[];var aInitialSources=YAHOO.widget.Logger.sources;for(var j=0;j<aInitialSources.length;j++){var sSource=aInitialSources[j];this._sourceFilters.push(sSource);if(this._elSourceFilters){this._createSourceCheckbox(sSource);}}},_createCategoryCheckbox:function(sCategory){var oSelf=this;if(this._elFt){var elParent=this._elCategoryFilters;var elFilter=elParent.appendChild(document.createElement("span"));elFilter.className="yui-log-filtergrp";var chkCategory=document.createElement("input");chkCategory.id="yui-log-filter-"+sCategory+this._sName;chkCategory.className="yui-log-filter-"+sCategory;chkCategory.type="checkbox";chkCategory.category=sCategory;chkCategory=elFilter.appendChild(chkCategory);chkCategory.checked=true;YAHOO.util.Event.addListener(chkCategory,'click',oSelf._onCheckCategory,oSelf);var lblCategory=elFilter.appendChild(document.createElement("label"));lblCategory.htmlFor=chkCategory.id;lblCategory.className=sCategory;lblCategory.innerHTML=sCategory;this._filterCheckboxes[sCategory]=chkCategory;}},_createSourceCheckbox:function(sSource){var oSelf=this;if(this._elFt){var elParent=this._elSourceFilters;var elFilter=elParent.appendChild(document.createElement("span"));elFilter.className="yui-log-filtergrp";var chkSource=document.createElement("input");chkSource.id="yui-log-filter"+sSource+this._sName;chkSource.className="yui-log-filter"+sSource;chkSource.type="checkbox";chkSource.source=sSource;chkSource=elFilter.appendChild(chkSource);chkSource.checked=true;YAHOO.util.Event.addListener(chkSource,'click',oSelf._onCheckSource,oSelf);var lblSource=elFilter.appendChild(document.createElement("label"));lblSource.htmlFor=chkSource.id;lblSource.className=sSource;lblSource.innerHTML=sSource;this._filterCheckboxes[sSource]=chkSource;}},_filterLogs:function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(YAHOO.widget.Logger.getStack());}},_printBuffer:function(){this._timeout=null;if(this._elConsole!==null){var thresholdMax=this.thresholdMax;thresholdMax=(thresholdMax&&!isNaN(thresholdMax))?thresholdMax:500;if(this._consoleMsgCount<thresholdMax){var entries=[];for(var i=0;i<this._buffer.length;i++){entries[i]=this._buffer[i];}
this._buffer=[];this._printToConsole(entries);}
else{this._filterLogs();}
if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}},_printToConsole:function(aEntries){var entriesLen=aEntries.length,df=document.createDocumentFragment(),msgHTML=[],thresholdMin=this.thresholdMin,sourceFiltersLen=this._sourceFilters.length,categoryFiltersLen=this._categoryFilters.length,entriesStartIndex,i,j,msg,before;if(isNaN(thresholdMin)||(thresholdMin>this.thresholdMax)){thresholdMin=0;}
entriesStartIndex=(entriesLen>thresholdMin)?(entriesLen-thresholdMin):0;for(i=entriesStartIndex;i<entriesLen;i++){var okToPrint=false;var okToFilterCats=false;var entry=aEntries[i];var source=entry.source;var category=entry.category;for(j=0;j<sourceFiltersLen;j++){if(source==this._sourceFilters[j]){okToFilterCats=true;break;}}
if(okToFilterCats){for(j=0;j<categoryFiltersLen;j++){if(category==this._categoryFilters[j]){okToPrint=true;break;}}}
if(okToPrint){msg=this.formatMsg(entry);if(typeof msg==='string'){msgHTML[msgHTML.length]=msg;}else{df.insertBefore(msg,this.newestOnTop?df.firstChild||null:null);}
this._consoleMsgCount++;this._lastTime=entry.time.getTime();}}
if(msgHTML.length){msgHTML.splice(0,0,this._elConsole.innerHTML);this._elConsole.innerHTML=this.newestOnTop?msgHTML.reverse().join(''):msgHTML.join('');}else if(df.firstChild){this._elConsole.insertBefore(df,this.newestOnTop?this._elConsole.firstChild||null:null);}},_onCategoryCreate:function(sType,aArgs,oSelf){var category=aArgs[0];oSelf._categoryFilters.push(category);if(oSelf._elFt){oSelf._createCategoryCheckbox(category);}},_onSourceCreate:function(sType,aArgs,oSelf){var source=aArgs[0];oSelf._sourceFilters.push(source);if(oSelf._elFt){oSelf._createSourceCheckbox(source);}},_onCheckCategory:function(v,oSelf){var category=this.category;if(!this.checked){oSelf.hideCategory(category);}
else{oSelf.showCategory(category);}},_onCheckSource:function(v,oSelf){var source=this.source;if(!this.checked){oSelf.hideSource(source);}
else{oSelf.showSource(source);}},_onClickCollapseBtn:function(v,oSelf){if(!oSelf.isCollapsed){oSelf.collapse();}
else{oSelf.expand();}},_onClickPauseBtn:function(v,oSelf){if(!oSelf.isPaused){oSelf.pause();}
else{oSelf.resume();}},_onClickClearBtn:function(v,oSelf){oSelf.clearConsole();},_onNewLog:function(sType,aArgs,oSelf){var logEntry=aArgs[0];oSelf._buffer.push(logEntry);if(oSelf.logReaderEnabled===true&&oSelf._timeout===null){oSelf._timeout=setTimeout(function(){oSelf._printBuffer();},oSelf.outputBuffer);}},_onReset:function(sType,aArgs,oSelf){oSelf._filterLogs();}};if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null,_windowErrorsHandled:false,_origOnWindowError:null};YAHOO.widget.Logger.log=function(sMsg,sCategory,sSource){if(this.loggerEnabled){if(!sCategory){sCategory="info";}
else{sCategory=sCategory.toLocaleLowerCase();if(this._isNewCategory(sCategory)){this._createNewCategory(sCategory);}}
var sClass="global";var sDetail=null;if(sSource){var spaceIndex=sSource.indexOf(" ");if(spaceIndex>0){sClass=sSource.substring(0,spaceIndex);sDetail=sSource.substring(spaceIndex,sSource.length);}
else{sClass=sSource;}
if(this._isNewSource(sClass)){this._createNewSource(sClass);}}
var timestamp=new Date();var logEntry=new YAHOO.widget.LogMsg({msg:sMsg,time:timestamp,category:sCategory,source:sClass,sourceDetail:sDetail});var stack=this._stack;var maxStackEntries=this.maxStackEntries;if(maxStackEntries&&!isNaN(maxStackEntries)&&(stack.length>=maxStackEntries)){stack.shift();}
stack.push(logEntry);this.newLogEvent.fire(logEntry);if(this._browserConsoleEnabled){this._printToBrowserConsole(logEntry);}
return true;}
else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.handleWindowErrors=function(){if(!YAHOO.widget.Logger._windowErrorsHandled){if(window.error){YAHOO.widget.Logger._origOnWindowError=window.onerror;}
window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger._windowErrorsHandled=true;YAHOO.log("Logger handling of window.onerror has been enabled.");}
else{YAHOO.log("Logger handling of window.onerror had already been enabled.");}};YAHOO.widget.Logger.unhandleWindowErrors=function(){if(YAHOO.widget.Logger._windowErrorsHandled){if(YAHOO.widget.Logger._origOnWindowError){window.onerror=YAHOO.widget.Logger._origOnWindowError;YAHOO.widget.Logger._origOnWindowError=null;}
else{window.onerror=null;}
YAHOO.widget.Logger._windowErrorsHandled=false;YAHOO.log("Logger handling of window.onerror has been disabled.");}
else{YAHOO.log("Logger handling of window.onerror had already been disabled.");}};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(sCategory){this.categories.push(sCategory);this.categoryCreateEvent.fire(sCategory);};YAHOO.widget.Logger._isNewCategory=function(sCategory){for(var i=0;i<this.categories.length;i++){if(sCategory==this.categories[i]){return false;}}
return true;};YAHOO.widget.Logger._createNewSource=function(sSource){this.sources.push(sSource);this.sourceCreateEvent.fire(sSource);};YAHOO.widget.Logger._isNewSource=function(sSource){if(sSource){for(var i=0;i<this.sources.length;i++){if(sSource==this.sources[i]){return false;}}
return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(oEntry){if(window.console&&console.log){var category=oEntry.category;var label=oEntry.category.substring(0,4).toUpperCase();var time=oEntry.time;var localTime;if(time.toLocaleTimeString){localTime=time.toLocaleTimeString();}
else{localTime=time.toString();}
var msecs=time.getTime();var elapsedTime=(YAHOO.widget.Logger._lastTime)?(msecs-YAHOO.widget.Logger._lastTime):0;YAHOO.widget.Logger._lastTime=msecs;var output=localTime+" ("+
elapsedTime+"ms): "+
oEntry.source+": ";console.log(output,oEntry.msg);}};YAHOO.widget.Logger._onWindowError=function(sMsg,sUrl,sLine){try{YAHOO.widget.Logger.log(sMsg+' ('+sUrl+', line '+sLine+')',"window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}
catch(e){return false;}};YAHOO.widget.Logger.log("Logger initialized");}
YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.5.2",build:"1076"});YAHOO.util.Connect={_msxml_progid:['Microsoft.XMLHTTP','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:'application/x-www-form-urlencoded; charset=UTF-8',_default_form_header:'application/x-www-form-urlencoded',_use_default_xhr_header:true,_default_xhr_header:'XMLHttpRequest',_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function()
{if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,'click',function(e){var obj=YAHOO.util.Event.getTarget(e);if(obj.nodeName.toLowerCase()=='input'&&(obj.type&&obj.type.toLowerCase()=='submit')){YAHOO.util.Connect._submitElementValue=encodeURIComponent(obj.name)+"="+encodeURIComponent(obj.value);}});return true;}
return false;})(),startEvent:new YAHOO.util.CustomEvent('start'),completeEvent:new YAHOO.util.CustomEvent('complete'),successEvent:new YAHOO.util.CustomEvent('success'),failureEvent:new YAHOO.util.CustomEvent('failure'),uploadEvent:new YAHOO.util.CustomEvent('upload'),abortEvent:new YAHOO.util.CustomEvent('abort'),_customEvents:{onStart:['startEvent','start'],onComplete:['completeEvent','complete'],onSuccess:['successEvent','success'],onFailure:['failureEvent','failure'],onUpload:['uploadEvent','upload'],onAbort:['abortEvent','abort']},setProgId:function(id)
{this._msxml_progid.unshift(id);},setDefaultPostHeader:function(b)
{if(typeof b=='string'){this._default_post_header=b;}
else if(typeof b=='boolean'){this._use_default_post_header=b;}},setDefaultXhrHeader:function(b)
{if(typeof b=='string'){this._default_xhr_header=b;}
else{this._use_default_xhr_header=b;}},setPollingInterval:function(i)
{if(typeof i=='number'&&isFinite(i)){this._polling_interval=i;}},createXhrObject:function(transactionId)
{var obj,http;try
{http=new XMLHttpRequest();obj={conn:http,tId:transactionId};}
catch(e)
{for(var i=0;i<this._msxml_progid.length;++i){try
{http=new ActiveXObject(this._msxml_progid[i]);obj={conn:http,tId:transactionId};break;}
catch(e){}}}
finally
{return obj;}},getConnectionObject:function(isFileUpload)
{var o;var tId=this._transaction_id;try
{if(!isFileUpload){o=this.createXhrObject(tId);}
else{o={};o.tId=tId;o.isUpload=true;}
if(o){this._transaction_id++;}}
catch(e){}
finally
{return o;}},asyncRequest:function(method,uri,callback,postData)
{var o=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();var args=(callback&&callback.argument)?callback.argument:null;if(!o){return null;}
else{if(callback&&callback.customevents){this.initCustomEvents(o,callback);}
if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(o,callback,uri,postData);return o;}
if(method.toUpperCase()=='GET'){if(this._sFormData.length!==0){uri+=((uri.indexOf('?')==-1)?'?':'&')+this._sFormData;}}
else if(method.toUpperCase()=='POST'){postData=postData?this._sFormData+"&"+postData:this._sFormData;}}
if(method.toUpperCase()=='GET'&&(callback&&callback.cache===false)){uri+=((uri.indexOf('?')==-1)?'?':'&')+"rnd="+new Date().valueOf().toString();}
o.conn.open(method,uri,true);if(this._use_default_xhr_header){if(!this._default_headers['X-Requested-With']){this.initHeader('X-Requested-With',this._default_xhr_header,true);}}
if((method.toUpperCase()=='POST'&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader('Content-Type',this._default_post_header);}
if(this._has_default_headers||this._has_http_headers){this.setHeader(o);}
this.handleReadyState(o,callback);o.conn.send(postData||'');if(this._isFormSubmit===true){this.resetFormState();}
this.startEvent.fire(o,args);if(o.startEvent){o.startEvent.fire(o,args);}
return o;}},initCustomEvents:function(o,callback)
{for(var prop in callback.customevents){if(this._customEvents[prop][0]){o[this._customEvents[prop][0]]=new YAHOO.util.CustomEvent(this._customEvents[prop][1],(callback.scope)?callback.scope:null);o[this._customEvents[prop][0]].subscribe(callback.customevents[prop]);}}},handleReadyState:function(o,callback)
{var oConn=this;var args=(callback&&callback.argument)?callback.argument:null;if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
this._poll[o.tId]=window.setInterval(function(){if(o.conn&&o.conn.readyState===4){window.clearInterval(oConn._poll[o.tId]);delete oConn._poll[o.tId];if(callback&&callback.timeout){window.clearTimeout(oConn._timeOut[o.tId]);delete oConn._timeOut[o.tId];}
oConn.completeEvent.fire(o,args);if(o.completeEvent){o.completeEvent.fire(o,args);}
oConn.handleTransactionResponse(o,callback);}},this._polling_interval);},handleTransactionResponse:function(o,callback,isAbort)
{var httpStatus,responseObject;var args=(callback&&callback.argument)?callback.argument:null;try
{if(o.conn.status!==undefined&&o.conn.status!==0){httpStatus=o.conn.status;}
else{httpStatus=13030;}}
catch(e){httpStatus=13030;}
if(httpStatus>=200&&httpStatus<300||httpStatus===1223){responseObject=this.createResponseObject(o,args);if(callback&&callback.success){if(!callback.scope){callback.success(responseObject);}
else{callback.success.apply(callback.scope,[responseObject]);}}
this.successEvent.fire(responseObject);if(o.successEvent){o.successEvent.fire(responseObject);}}
else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=this.createExceptionObject(o.tId,args,(isAbort?isAbort:false));if(callback&&callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=this.createResponseObject(o,args);if(callback&&callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}}
this.failureEvent.fire(responseObject);if(o.failureEvent){o.failureEvent.fire(responseObject);}}
this.releaseObject(o);responseObject=null;},createResponseObject:function(o,callbackArg)
{var obj={};var headerObj={};try
{var headerStr=o.conn.getAllResponseHeaders();var header=headerStr.split('\n');for(var i=0;i<header.length;i++){var delimitPos=header[i].indexOf(':');if(delimitPos!=-1){headerObj[header[i].substring(0,delimitPos)]=header[i].substring(delimitPos+2);}}}
catch(e){}
obj.tId=o.tId;obj.status=(o.conn.status==1223)?204:o.conn.status;obj.statusText=(o.conn.status==1223)?"No Content":o.conn.statusText;obj.getResponseHeader=headerObj;obj.getAllResponseHeaders=headerStr;obj.responseText=o.conn.responseText;obj.responseXML=o.conn.responseXML;if(callbackArg){obj.argument=callbackArg;}
return obj;},createExceptionObject:function(tId,callbackArg,isAbort)
{var COMM_CODE=0;var COMM_ERROR='communication failure';var ABORT_CODE=-1;var ABORT_ERROR='transaction aborted';var obj={};obj.tId=tId;if(isAbort){obj.status=ABORT_CODE;obj.statusText=ABORT_ERROR;}
else{obj.status=COMM_CODE;obj.statusText=COMM_ERROR;}
if(callbackArg){obj.argument=callbackArg;}
return obj;},initHeader:function(label,value,isDefault)
{var headerObj=(isDefault)?this._default_headers:this._http_headers;headerObj[label]=value;if(isDefault){this._has_default_headers=true;}
else{this._has_http_headers=true;}},setHeader:function(o)
{if(this._has_default_headers){for(var prop in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,prop)){o.conn.setRequestHeader(prop,this._default_headers[prop]);}}}
if(this._has_http_headers){for(var prop in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,prop)){o.conn.setRequestHeader(prop,this._http_headers[prop]);}}
delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(formId,isUpload,secureUri)
{this.resetFormState();var oForm;if(typeof formId=='string'){oForm=(document.getElementById(formId)||document.forms[formId]);}
else if(typeof formId=='object'){oForm=formId;}
else{return;}
if(isUpload){var io=this.createFrame((window.location.href.toLowerCase().indexOf("https")===0||secureUri)?true:false);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=oForm;return;}
var oElement,oName,oValue,oDisabled;var hasSubmit=false;for(var i=0;i<oForm.elements.length;i++){oElement=oForm.elements[i];oDisabled=oElement.disabled;oName=oElement.name;oValue=oElement.value;if(!oDisabled&&oName)
{switch(oElement.type)
{case'select-one':case'select-multiple':for(var j=0;j<oElement.options.length;j++){if(oElement.options[j].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].attributes['value'].specified?oElement.options[j].value:oElement.options[j].text)+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].hasAttribute('value')?oElement.options[j].value:oElement.options[j].text)+'&';}}}
break;case'radio':case'checkbox':if(oElement.checked){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
break;case'file':case undefined:case'reset':case'button':break;case'submit':if(hasSubmit===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
hasSubmit=true;}
break;default:this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}}}
this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);this.initHeader('Content-Type',this._default_form_header);return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(secureUri){var frameId='yuiIO'+this._transaction_id;var io;if(window.ActiveXObject){io=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');if(typeof secureUri=='boolean'){io.src='javascript:false';}}
else{io=document.createElement('iframe');io.id=frameId;io.name=frameId;}
io.style.position='absolute';io.style.top='-1000px';io.style.left='-1000px';document.body.appendChild(io);},appendPostData:function(postData)
{var formElements=[];var postMessage=postData.split('&');for(var i=0;i<postMessage.length;i++){var delimitPos=postMessage[i].indexOf('=');if(delimitPos!=-1){formElements[i]=document.createElement('input');formElements[i].type='hidden';formElements[i].name=postMessage[i].substring(0,delimitPos);formElements[i].value=postMessage[i].substring(delimitPos+1);this._formNode.appendChild(formElements[i]);}}
return formElements;},uploadFile:function(o,callback,uri,postData){var oConn=this;var frameId='yuiIO'+o.tId;var uploadEncoding='multipart/form-data';var io=document.getElementById(frameId);var args=(callback&&callback.argument)?callback.argument:null;var rawFormAttributes={action:this._formNode.getAttribute('action'),method:this._formNode.getAttribute('method'),target:this._formNode.getAttribute('target')};this._formNode.setAttribute('action',uri);this._formNode.setAttribute('method','POST');this._formNode.setAttribute('target',frameId);if(YAHOO.env.ua.ie){this._formNode.setAttribute('encoding',uploadEncoding);}
else{this._formNode.setAttribute('enctype',uploadEncoding);}
if(postData){var oElements=this.appendPostData(postData);}
this._formNode.submit();this.startEvent.fire(o,args);if(o.startEvent){o.startEvent.fire(o,args);}
if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
if(oElements&&oElements.length>0){for(var i=0;i<oElements.length;i++){this._formNode.removeChild(oElements[i]);}}
for(var prop in rawFormAttributes){if(YAHOO.lang.hasOwnProperty(rawFormAttributes,prop)){if(rawFormAttributes[prop]){this._formNode.setAttribute(prop,rawFormAttributes[prop]);}
else{this._formNode.removeAttribute(prop);}}}
this.resetFormState();var uploadCallback=function()
{if(callback&&callback.timeout){window.clearTimeout(oConn._timeOut[o.tId]);delete oConn._timeOut[o.tId];}
oConn.completeEvent.fire(o,args);if(o.completeEvent){o.completeEvent.fire(o,args);}
var obj={};obj.tId=o.tId;obj.argument=callback.argument;try
{obj.responseText=io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:io.contentWindow.document.documentElement.textContent;obj.responseXML=io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;}
catch(e){}
if(callback&&callback.upload){if(!callback.scope){callback.upload(obj);}
else{callback.upload.apply(callback.scope,[obj]);}}
oConn.uploadEvent.fire(obj);if(o.uploadEvent){o.uploadEvent.fire(obj);}
YAHOO.util.Event.removeListener(io,"load",uploadCallback);setTimeout(function(){document.body.removeChild(io);oConn.releaseObject(o);},100);};YAHOO.util.Event.addListener(io,"load",uploadCallback);},abort:function(o,callback,isTimeout)
{var abortStatus;var args=(callback&&callback.argument)?callback.argument:null;if(o&&o.conn){if(this.isCallInProgress(o)){o.conn.abort();window.clearInterval(this._poll[o.tId]);delete this._poll[o.tId];if(isTimeout){window.clearTimeout(this._timeOut[o.tId]);delete this._timeOut[o.tId];}
abortStatus=true;}}
else if(o&&o.isUpload===true){var frameId='yuiIO'+o.tId;var io=document.getElementById(frameId);if(io){YAHOO.util.Event.removeListener(io,"load");document.body.removeChild(io);if(isTimeout){window.clearTimeout(this._timeOut[o.tId]);delete this._timeOut[o.tId];}
abortStatus=true;}}
else{abortStatus=false;}
if(abortStatus===true){this.abortEvent.fire(o,args);if(o.abortEvent){o.abortEvent.fire(o,args);}
this.handleTransactionResponse(o,callback,true);}
return abortStatus;},isCallInProgress:function(o)
{if(o&&o.conn){return o.conn.readyState!==4&&o.conn.readyState!==0;}
else if(o&&o.isUpload===true){var frameId='yuiIO'+o.tId;return document.getElementById(frameId)?true:false;}
else{return false;}},releaseObject:function(o)
{if(o&&o.conn){o.conn=null;o=null;}}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.5.2",build:"1076"});YAHOO.widget.AutoComplete=function(elInput,elContainer,oDataSource,oConfigs){if(elInput&&elContainer&&oDataSource){if(oDataSource instanceof YAHOO.widget.DataSource){this.dataSource=oDataSource;}
else{return;}
if(YAHOO.util.Dom.inDocument(elInput)){if(YAHOO.lang.isString(elInput)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+elInput;this._elTextbox=document.getElementById(elInput);}
else{this._sName=(elInput.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+elInput.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=elInput;}
YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}
else{return;}
if(YAHOO.util.Dom.inDocument(elContainer)){if(YAHOO.lang.isString(elContainer)){this._elContainer=document.getElementById(elContainer);}
else{this._elContainer=elContainer;}
if(this._elContainer.style.display=="none"){}
var elParent=this._elContainer.parentNode;var elTag=elParent.tagName.toLowerCase();if(elTag=="div"){YAHOO.util.Dom.addClass(elParent,"yui-ac");}
else{}}
else{return;}
if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){if(sConfig){this[sConfig]=oConfigs[sConfig];}}}
this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var oSelf=this;var elTextbox=this._elTextbox;var elContent=this._elContent;YAHOO.util.Event.addListener(elTextbox,"keyup",oSelf._onTextboxKeyUp,oSelf);YAHOO.util.Event.addListener(elTextbox,"keydown",oSelf._onTextboxKeyDown,oSelf);YAHOO.util.Event.addListener(elTextbox,"focus",oSelf._onTextboxFocus,oSelf);YAHOO.util.Event.addListener(elTextbox,"blur",oSelf._onTextboxBlur,oSelf);YAHOO.util.Event.addListener(elContent,"mouseover",oSelf._onContainerMouseover,oSelf);YAHOO.util.Event.addListener(elContent,"mouseout",oSelf._onContainerMouseout,oSelf);YAHOO.util.Event.addListener(elContent,"scroll",oSelf._onContainerScroll,oSelf);YAHOO.util.Event.addListener(elContent,"resize",oSelf._onContainerResize,oSelf);YAHOO.util.Event.addListener(elTextbox,"keypress",oSelf._onTextboxKeyPress,oSelf);YAHOO.util.Event.addListener(window,"unload",oSelf._onWindowUnload,oSelf);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);elTextbox.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}
else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.AutoComplete.prototype.getListItemData=function(oListItem){if(oListItem._oResultData){return oListItem._oResultData;}
else{return false;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(sHeader){if(this._elHeader){var elHeader=this._elHeader;if(sHeader){elHeader.innerHTML=sHeader;elHeader.style.display="block";}
else{elHeader.innerHTML="";elHeader.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(sFooter){if(this._elFooter){var elFooter=this._elFooter;if(sFooter){elFooter.innerHTML=sFooter;elFooter.style.display="block";}
else{elFooter.innerHTML="";elFooter.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(sBody){if(this._elBody){var elBody=this._elBody;if(sBody){elBody.innerHTML=sBody;elBody.style.display="block";elBody.style.display="block";}
else{elBody.innerHTML="";elBody.style.display="none";}
this._maxResultsDisplayed=0;}};YAHOO.widget.AutoComplete.prototype.formatResult=function(oResultItem,sQuery){var sResult=oResultItem[0];if(sResult){return sResult;}
else{return"";}};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(elTextbox,elContainer,sQuery,aResults){return true;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(sQuery){this._sendQuery(sQuery);};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(sQuery){return sQuery;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var instanceName=this.toString();var elInput=this._elTextbox;var elContainer=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(elInput,true);YAHOO.util.Event.purgeElement(elContainer,true);elContainer.innerHTML="";for(var key in this){if(YAHOO.lang.hasOwnProperty(this,key)){this[key]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=true;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._aListItems=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;YAHOO.widget.AutoComplete.prototype._oCurItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var minQueryLength=this.minQueryLength;if(!YAHOO.lang.isNumber(minQueryLength)){this.minQueryLength=1;}
var maxResultsDisplayed=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(maxResultsDisplayed)||(maxResultsDisplayed<1)){this.maxResultsDisplayed=10;}
var queryDelay=this.queryDelay;if(!YAHOO.lang.isNumber(queryDelay)||(queryDelay<0)){this.queryDelay=0.2;}
var delimChar=this.delimChar;if(YAHOO.lang.isString(delimChar)&&(delimChar.length>0)){this.delimChar=[delimChar];}
else if(!YAHOO.lang.isArray(delimChar)){this.delimChar=null;}
var animSpeed=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(animSpeed)||(animSpeed<0)){this.animSpeed=0.3;}
if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}
else{this._oAnim.duration=this.animSpeed;}}
if(this.forceSelection&&delimChar){}};YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._elShadow){var elShadow=document.createElement("div");elShadow.className="yui-ac-shadow";this._elShadow=this._elContainer.appendChild(elShadow);}
if(this.useIFrame&&!this._elIFrame){var elIFrame=document.createElement("iframe");elIFrame.src=this._iFrameSrc;elIFrame.frameBorder=0;elIFrame.scrolling="no";elIFrame.style.position="absolute";elIFrame.style.width="100%";elIFrame.style.height="100%";elIFrame.tabIndex=-1;this._elIFrame=this._elContainer.appendChild(elIFrame);}};YAHOO.widget.AutoComplete.prototype._initContainer=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var elContent=document.createElement("div");elContent.className="yui-ac-content";elContent.style.display="none";this._elContent=this._elContainer.appendChild(elContent);var elHeader=document.createElement("div");elHeader.className="yui-ac-hd";elHeader.style.display="none";this._elHeader=this._elContent.appendChild(elHeader);var elBody=document.createElement("div");elBody.className="yui-ac-bd";this._elBody=this._elContent.appendChild(elBody);var elFooter=document.createElement("div");elFooter.className="yui-ac-ft";elFooter.style.display="none";this._elFooter=this._elContent.appendChild(elFooter);}
else{}};YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];while(this._elBody.hasChildNodes()){var oldListItems=this.getListItems();if(oldListItems){for(var oldi=oldListItems.length-1;oldi>=0;oldi--){oldListItems[oldi]=null;}}
this._elBody.innerHTML="";}
var oList=document.createElement("ul");oList=this._elBody.appendChild(oList);for(var i=0;i<this.maxResultsDisplayed;i++){var oItem=document.createElement("li");oItem=oList.appendChild(oItem);this._aListItems[i]=oItem;this._initListItem(oItem,i);}
this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.AutoComplete.prototype._initListItem=function(oItem,nItemIndex){var oSelf=this;oItem.style.display="none";oItem._nItemIndex=nItemIndex;oItem.mouseover=oItem.mouseout=oItem.onclick=null;YAHOO.util.Event.addListener(oItem,"mouseover",oSelf._onItemMouseover,oSelf);YAHOO.util.Event.addListener(oItem,"mouseout",oSelf._onItemMouseout,oSelf);YAHOO.util.Event.addListener(oItem,"click",oSelf._onItemMouseclick,oSelf);};YAHOO.widget.AutoComplete.prototype._onIMEDetected=function(oSelf){oSelf._enableIntervalDetection();};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var currValue=this._elTextbox.value;var lastValue=this._sLastTextboxValue;if(currValue!=lastValue){this._sLastTextboxValue=currValue;this._sendQuery(currValue);}};YAHOO.widget.AutoComplete.prototype._cancelIntervalDetection=function(oSelf){if(oSelf._queryInterval){clearInterval(oSelf._queryInterval);}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(nKeyCode){if((nKeyCode==9)||(nKeyCode==13)||(nKeyCode==16)||(nKeyCode==17)||(nKeyCode>=18&&nKeyCode<=20)||(nKeyCode==27)||(nKeyCode>=33&&nKeyCode<=35)||(nKeyCode>=36&&nKeyCode<=40)||(nKeyCode>=44&&nKeyCode<=45)){return true;}
return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(sQuery){if(this.minQueryLength==-1){this._toggleContainer(false);return;}
var aDelimChar=(this.delimChar)?this.delimChar:null;if(aDelimChar){var nDelimIndex=-1;for(var i=aDelimChar.length-1;i>=0;i--){var nNewIndex=sQuery.lastIndexOf(aDelimChar[i]);if(nNewIndex>nDelimIndex){nDelimIndex=nNewIndex;}}
if(aDelimChar[i]==" "){for(var j=aDelimChar.length-1;j>=0;j--){if(sQuery[nDelimIndex-1]==aDelimChar[j]){nDelimIndex--;break;}}}
if(nDelimIndex>-1){var nQueryStart=nDelimIndex+1;while(sQuery.charAt(nQueryStart)==" "){nQueryStart+=1;}
this._sSavedQuery=sQuery.substring(0,nQueryStart);sQuery=sQuery.substr(nQueryStart);}
else if(sQuery.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}
if((sQuery&&(sQuery.length<this.minQueryLength))||(!sQuery&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}
this._toggleContainer(false);return;}
sQuery=encodeURIComponent(sQuery);this._nDelayID=-1;sQuery=this.doBeforeSendQuery(sQuery);this.dataRequestEvent.fire(this,sQuery);this.dataSource.getResults(this._populateList,sQuery,this);};YAHOO.widget.AutoComplete.prototype._populateList=function(sQuery,aResults,oSelf){if(aResults===null){oSelf.dataErrorEvent.fire(oSelf,sQuery);}
if(!oSelf._bFocused||!aResults){return;}
var isOpera=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var contentStyle=oSelf._elContent.style;contentStyle.width=(!isOpera)?null:"";contentStyle.height=(!isOpera)?null:"";var sCurQuery=decodeURIComponent(sQuery);oSelf._sCurQuery=sCurQuery;oSelf._bItemSelected=false;if(oSelf._maxResultsDisplayed!=oSelf.maxResultsDisplayed){oSelf._initList();}
var nItems=Math.min(aResults.length,oSelf.maxResultsDisplayed);oSelf._nDisplayedItems=nItems;if(nItems>0){oSelf._initContainerHelpers();var aItems=oSelf._aListItems;for(var i=nItems-1;i>=0;i--){var oItemi=aItems[i];var oResultItemi=aResults[i];oItemi.innerHTML=oSelf.formatResult(oResultItemi,sCurQuery);oItemi.style.display="list-item";oItemi._sResultKey=oResultItemi[0];oItemi._oResultData=oResultItemi;}
for(var j=aItems.length-1;j>=nItems;j--){var oItemj=aItems[j];oItemj.innerHTML=null;oItemj.style.display="none";oItemj._sResultKey=null;oItemj._oResultData=null;}
var ok=oSelf.doBeforeExpandContainer(oSelf._elTextbox,oSelf._elContainer,sQuery,aResults);oSelf._toggleContainer(ok);if(oSelf.autoHighlight){var oFirstItem=aItems[0];oSelf._toggleHighlight(oFirstItem,"to");oSelf.itemArrowToEvent.fire(oSelf,oFirstItem);oSelf._typeAhead(oFirstItem,sQuery);}
else{oSelf._oCurItem=null;}}
else{oSelf._toggleContainer(false);}
oSelf.dataReturnEvent.fire(oSelf,sQuery,aResults);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var sValue=this._elTextbox.value;var sChar=(this.delimChar)?this.delimChar[0]:null;var nIndex=(sChar)?sValue.lastIndexOf(sChar,sValue.length-2):-1;if(nIndex>-1){this._elTextbox.value=sValue.substring(0,nIndex);}
else{this._elTextbox.value="";}
this._sSavedQuery=this._elTextbox.value;this.selectionEnforceEvent.fire(this);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var foundMatch=null;for(var i=this._nDisplayedItems-1;i>=0;i--){var oItem=this._aListItems[i];var sMatch=oItem._sResultKey.toLowerCase();if(sMatch==this._sCurQuery.toLowerCase()){foundMatch=oItem;break;}}
return(foundMatch);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(oItem,sQuery){if(!this.typeAhead||(this._nKeyCode==8)){return;}
var elTextbox=this._elTextbox;var sValue=this._elTextbox.value;if(!elTextbox.setSelectionRange&&!elTextbox.createTextRange){return;}
var nStart=sValue.length;this._updateValue(oItem);var nEnd=elTextbox.value.length;this._selectText(elTextbox,nStart,nEnd);var sPrefill=elTextbox.value.substr(nStart,nEnd);this.typeAheadEvent.fire(this,sQuery,sPrefill);};YAHOO.widget.AutoComplete.prototype._selectText=function(elTextbox,nStart,nEnd){if(elTextbox.setSelectionRange){elTextbox.setSelectionRange(nStart,nEnd);}
else if(elTextbox.createTextRange){var oTextRange=elTextbox.createTextRange();oTextRange.moveStart("character",nStart);oTextRange.moveEnd("character",nEnd-elTextbox.value.length);oTextRange.select();}
else{elTextbox.select();}};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(bShow){var bFireEvent=false;var width=this._elContent.offsetWidth+"px";var height=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){bFireEvent=true;if(bShow){this._elIFrame.style.width=width;this._elIFrame.style.height=height;}
else{this._elIFrame.style.width=0;this._elIFrame.style.height=0;}}
if(this.useShadow&&this._elShadow){bFireEvent=true;if(bShow){this._elShadow.style.width=width;this._elShadow.style.height=height;}
else{this._elShadow.style.width=0;this._elShadow.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(bShow){var elContainer=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return;}
if(!bShow){this._elContent.scrollTop=0;var aItems=this._aListItems;if(aItems&&(aItems.length>0)){for(var i=aItems.length-1;i>=0;i--){aItems[i].style.display="none";}}
if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}
this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}
if(!bShow&&!this._bContainerOpen){this._elContent.style.display="none";return;}
var oAnim=this._oAnim;if(oAnim&&oAnim.getEl()&&(this.animHoriz||this.animVert)){if(!bShow){this._toggleContainerHelpers(bShow);}
if(oAnim.isAnimated()){oAnim.stop();}
var oClone=this._elContent.cloneNode(true);elContainer.appendChild(oClone);oClone.style.top="-9000px";oClone.style.display="block";var wExp=oClone.offsetWidth;var hExp=oClone.offsetHeight;var wColl=(this.animHoriz)?0:wExp;var hColl=(this.animVert)?0:hExp;oAnim.attributes=(bShow)?{width:{to:wExp},height:{to:hExp}}:{width:{to:wColl},height:{to:hColl}};if(bShow&&!this._bContainerOpen){this._elContent.style.width=wColl+"px";this._elContent.style.height=hColl+"px";}
else{this._elContent.style.width=wExp+"px";this._elContent.style.height=hExp+"px";}
elContainer.removeChild(oClone);oClone=null;var oSelf=this;var onAnimComplete=function(){oAnim.onComplete.unsubscribeAll();if(bShow){oSelf.containerExpandEvent.fire(oSelf);}
else{oSelf._elContent.style.display="none";oSelf.containerCollapseEvent.fire(oSelf);}
oSelf._toggleContainerHelpers(bShow);};this._elContent.style.display="block";oAnim.onComplete.subscribe(onAnimComplete);oAnim.animate();this._bContainerOpen=bShow;}
else{if(bShow){this._elContent.style.display="block";this.containerExpandEvent.fire(this);}
else{this._elContent.style.display="none";this.containerCollapseEvent.fire(this);}
this._toggleContainerHelpers(bShow);this._bContainerOpen=bShow;}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(oNewItem,sType){var sHighlight=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,sHighlight);}
if((sType=="to")&&sHighlight){YAHOO.util.Dom.addClass(oNewItem,sHighlight);this._oCurItem=oNewItem;}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(oNewItem,sType){if(oNewItem==this._oCurItem){return;}
var sPrehighlight=this.prehighlightClassName;if((sType=="mouseover")&&sPrehighlight){YAHOO.util.Dom.addClass(oNewItem,sPrehighlight);}
else{YAHOO.util.Dom.removeClass(oNewItem,sPrehighlight);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(oItem){var elTextbox=this._elTextbox;var sDelimChar=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var sSavedQuery=this._sSavedQuery;var sResultKey=oItem._sResultKey;elTextbox.focus();elTextbox.value="";if(sDelimChar){if(sSavedQuery){elTextbox.value=sSavedQuery;}
elTextbox.value+=sResultKey+sDelimChar;if(sDelimChar!=" "){elTextbox.value+=" ";}}
else{elTextbox.value=sResultKey;}
if(elTextbox.type=="textarea"){elTextbox.scrollTop=elTextbox.scrollHeight;}
var end=elTextbox.value.length;this._selectText(elTextbox,end,end);this._oCurItem=oItem;};YAHOO.widget.AutoComplete.prototype._selectItem=function(oItem){this._bItemSelected=true;this._updateValue(oItem);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,oItem,oItem._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._oCurItem){this._selectItem(this._oCurItem);}
else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(nKeyCode){if(this._bContainerOpen){var oCurItem=this._oCurItem;var nCurItemIndex=-1;if(oCurItem){nCurItemIndex=oCurItem._nItemIndex;}
var nNewItemIndex=(nKeyCode==40)?(nCurItemIndex+1):(nCurItemIndex-1);if(nNewItemIndex<-2||nNewItemIndex>=this._nDisplayedItems){return;}
if(oCurItem){this._toggleHighlight(oCurItem,"from");this.itemArrowFromEvent.fire(this,oCurItem);}
if(nNewItemIndex==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._elTextbox.value=this._sSavedQuery;}
else{this._elTextbox.value=this._sSavedQuery+this._sCurQuery;}}
else{this._elTextbox.value=this._sCurQuery;}
this._oCurItem=null;return;}
if(nNewItemIndex==-2){this._toggleContainer(false);return;}
var oNewItem=this._aListItems[nNewItemIndex];var elContent=this._elContent;var scrollOn=((YAHOO.util.Dom.getStyle(elContent,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(elContent,"overflowY")=="auto"));if(scrollOn&&(nNewItemIndex>-1)&&(nNewItemIndex<this._nDisplayedItems)){if(nKeyCode==40){if((oNewItem.offsetTop+oNewItem.offsetHeight)>(elContent.scrollTop+elContent.offsetHeight)){elContent.scrollTop=(oNewItem.offsetTop+oNewItem.offsetHeight)-elContent.offsetHeight;}
else if((oNewItem.offsetTop+oNewItem.offsetHeight)<elContent.scrollTop){elContent.scrollTop=oNewItem.offsetTop;}}
else{if(oNewItem.offsetTop<elContent.scrollTop){this._elContent.scrollTop=oNewItem.offsetTop;}
else if(oNewItem.offsetTop>(elContent.scrollTop+elContent.offsetHeight)){this._elContent.scrollTop=(oNewItem.offsetTop+oNewItem.offsetHeight)-elContent.offsetHeight;}}}
this._toggleHighlight(oNewItem,"to");this.itemArrowToEvent.fire(this,oNewItem);if(this.typeAhead){this._updateValue(oNewItem);}}};YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(v,oSelf){if(oSelf.prehighlightClassName){oSelf._togglePrehighlight(this,"mouseover");}
else{oSelf._toggleHighlight(this,"to");}
oSelf.itemMouseOverEvent.fire(oSelf,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(v,oSelf){if(oSelf.prehighlightClassName){oSelf._togglePrehighlight(this,"mouseout");}
else{oSelf._toggleHighlight(this,"from");}
oSelf.itemMouseOutEvent.fire(oSelf,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(v,oSelf){oSelf._toggleHighlight(this,"to");oSelf._selectItem(this);};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(v,oSelf){oSelf._bOverContainer=true;};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(v,oSelf){oSelf._bOverContainer=false;if(oSelf._oCurItem){oSelf._toggleHighlight(oSelf._oCurItem,"to");}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(v,oSelf){oSelf._elTextbox.focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(v,oSelf){oSelf._toggleContainerHelpers(oSelf._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(v,oSelf){var nKeyCode=v.keyCode;switch(nKeyCode){case 9:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(oSelf._oCurItem){if(oSelf.delimChar&&(oSelf._nKeyCode!=nKeyCode)){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}}
break;case 13:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(oSelf._oCurItem){if(oSelf._nKeyCode!=nKeyCode){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}}
break;case 27:oSelf._toggleContainer(false);return;case 39:oSelf._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(v);oSelf._moveSelection(nKeyCode);break;case 40:YAHOO.util.Event.stopEvent(v);oSelf._moveSelection(nKeyCode);break;default:break;}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(v,oSelf){var nKeyCode=v.keyCode;if((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)){switch(nKeyCode){case 9:if(oSelf._oCurItem){if(oSelf.delimChar&&(oSelf._nKeyCode!=nKeyCode)){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}
break;case 13:if(oSelf._oCurItem){if(oSelf._nKeyCode!=nKeyCode){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}
break;default:break;}}
else if(nKeyCode==229){oSelf._queryInterval=setInterval(function(){oSelf._onIMEDetected(oSelf);},500);}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(v,oSelf){oSelf._initProps();var nKeyCode=v.keyCode;oSelf._nKeyCode=nKeyCode;var sText=this.value;if(oSelf._isIgnoreKey(nKeyCode)||(sText.toLowerCase()==oSelf._sCurQuery)){return;}
else{oSelf._bItemSelected=false;YAHOO.util.Dom.removeClass(oSelf._oCurItem,oSelf.highlightClassName);oSelf._oCurItem=null;oSelf.textboxKeyEvent.fire(oSelf,nKeyCode);}
if(oSelf.queryDelay>0){var nDelayID=setTimeout(function(){oSelf._sendQuery(sText);},(oSelf.queryDelay*1000));if(oSelf._nDelayID!=-1){clearTimeout(oSelf._nDelayID);}
oSelf._nDelayID=nDelayID;}
else{oSelf._sendQuery(sText);}};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(v,oSelf){oSelf._elTextbox.setAttribute("autocomplete","off");oSelf._bFocused=true;oSelf.textboxFocusEvent.fire(oSelf);};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(v,oSelf){if(!oSelf._bOverContainer||(oSelf._nKeyCode==9)){if(!oSelf._bItemSelected){var oMatch=oSelf._textMatchesOption();if(!oSelf._bContainerOpen||(oSelf._bContainerOpen&&(oMatch===null))){if(oSelf.forceSelection){oSelf._clearSelection();}
else{oSelf.unmatchedItemSelectEvent.fire(oSelf);}}
else{if(oSelf.forceSelection){oSelf._selectItem(oMatch);}}}
if(oSelf._bContainerOpen){oSelf._toggleContainer(false);}
oSelf._cancelIntervalDetection(oSelf);oSelf._bFocused=false;oSelf.textboxBlurEvent.fire(oSelf);}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(v,oSelf){if(oSelf&&oSelf._elTextbox&&oSelf.allowBrowserAutocomplete){oSelf._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(oCallbackFn,sQuery,oParent){var aResults=this._doQueryCache(oCallbackFn,sQuery,oParent);if(aResults.length===0){this.queryEvent.fire(this,oParent,sQuery);this.doQuery(oCallbackFn,sQuery,oParent);}};YAHOO.widget.DataSource.prototype.doQuery=function(oCallbackFn,sQuery,oParent){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}
if(this._aCacheHelper){this._aCacheHelper=[];}
this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var maxCacheEntries=this.maxCacheEntries;if(!YAHOO.lang.isNumber(maxCacheEntries)||(maxCacheEntries<0)){maxCacheEntries=0;}
if(maxCacheEntries>0&&!this._aCache){this._aCache=[];}
this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(oResult){var aCache=this._aCache;if(!aCache||!oResult||!oResult.query||!oResult.results){return;}
if(aCache.length>=this.maxCacheEntries){aCache.shift();}
aCache.push(oResult);};YAHOO.widget.DataSource.prototype._doQueryCache=function(oCallbackFn,sQuery,oParent){var aResults=[];var bMatchFound=false;var aCache=this._aCache;var nCacheLength=(aCache)?aCache.length:0;var bMatchContains=this.queryMatchContains;var sOrigQuery;if((this.maxCacheEntries>0)&&aCache&&(nCacheLength>0)){this.cacheQueryEvent.fire(this,oParent,sQuery);if(!this.queryMatchCase){sOrigQuery=sQuery;sQuery=sQuery.toLowerCase();}
for(var i=nCacheLength-1;i>=0;i--){var resultObj=aCache[i];var aAllResultItems=resultObj.results;var matchKey=(!this.queryMatchCase)?encodeURIComponent(resultObj.query).toLowerCase():encodeURIComponent(resultObj.query);if(matchKey==sQuery){bMatchFound=true;aResults=aAllResultItems;if(i!=nCacheLength-1){aCache.splice(i,1);this._addCacheElem(resultObj);}
break;}
else if(this.queryMatchSubset){for(var j=sQuery.length-1;j>=0;j--){var subQuery=sQuery.substr(0,j);if(matchKey==subQuery){bMatchFound=true;for(var k=aAllResultItems.length-1;k>=0;k--){var aRecord=aAllResultItems[k];var sKeyIndex=(this.queryMatchCase)?encodeURIComponent(aRecord[0]).indexOf(sQuery):encodeURIComponent(aRecord[0]).toLowerCase().indexOf(sQuery);if((!bMatchContains&&(sKeyIndex===0))||(bMatchContains&&(sKeyIndex>-1))){aResults.unshift(aRecord);}}
resultObj={};resultObj.query=sQuery;resultObj.results=aResults;this._addCacheElem(resultObj);break;}}
if(bMatchFound){break;}}}
if(bMatchFound){this.getCachedResultsEvent.fire(this,oParent,sOrigQuery,aResults);oCallbackFn(sOrigQuery,aResults,oParent);}}
return aResults;};YAHOO.widget.DS_XHR=function(sScriptURI,aSchema,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isArray(aSchema)||!YAHOO.lang.isString(sScriptURI)){return;}
this.schema=aSchema;this.scriptURI=sScriptURI;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var isXML=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var sUri=this.scriptURI+"?"+this.scriptQueryParam+"="+sQuery;if(this.scriptQueryAppend.length>0){sUri+="&"+this.scriptQueryAppend;}
var oResponse=null;var oSelf=this;var responseSuccess=function(oResp){if(!oSelf._oConn||(oResp.tId!=oSelf._oConn.tId)){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
for(var foo in oResp){}
if(!isXML){oResp=oResp.responseText;}
else{oResp=oResp.responseXML;}
if(oResp===null){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
var aResults=oSelf.parseResponse(sQuery,oResp,oParent);var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;if(aResults===null){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}
else{oSelf.getResultsEvent.fire(oSelf,oParent,sQuery,aResults);oSelf._addCacheElem(resultObj);}
oCallbackFn(sQuery,aResults,oParent);};var responseFailure=function(oResp){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return;};var oCallback={success:responseSuccess,failure:responseFailure};if(YAHOO.lang.isNumber(this.connTimeout)&&(this.connTimeout>0)){oCallback.timeout=this.connTimeout;}
if(this._oConn){this.connMgr.abort(this._oConn);}
oSelf._oConn=this.connMgr.asyncRequest("GET",sUri,oCallback,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}
switch(this.responseType){case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList,jsonObjParsed;if(YAHOO.lang.JSON){jsonObjParsed=YAHOO.lang.JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}
else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
catch(e){bError=true;break;}}}
else if(oResponse.parseJSON){jsonObjParsed=oResponse.parseJSON();if(!jsonObjParsed){bError=true;}
else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
catch(e){bError=true;break;}}}
else if(window.JSON){jsonObjParsed=JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}
else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
catch(e){bError=true;break;}}}
else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}
if(oResponse.indexOf("{")<0){bError=true;break;}
if(oResponse.indexOf("{}")===0){break;}
var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}
jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}
catch(e){bError=true;break;}}
if(!jsonList){bError=true;break;}
if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}
for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}
aResultItem.unshift(dataFieldValue);}
if(aResultItem.length==1){aResultItem.push(jsonResult);}
aResults.unshift(aResultItem);}
break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);if(!xmlList){bError=true;break;}
for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}
else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}
else{sValue="";}}
aFieldSet.unshift(sValue);}
aResults.unshift(aFieldSet);}
break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}
if(oResponse.length>0){var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){if(aRecords[n].length>0){aResults[n]=aRecords[n].split(aSchema[1]);}}}}
break;default:break;}
sQuery=null;oResponse=null;oParent=null;if(bError){return null;}
else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_ScriptNode=function(sUri,aSchema,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isArray(aSchema)||!YAHOO.lang.isString(sUri)){return;}
this.schema=aSchema;this.scriptURI=sUri;this._init();};YAHOO.widget.DS_ScriptNode.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_ScriptNode.prototype.getUtility=YAHOO.util.Get;YAHOO.widget.DS_ScriptNode.prototype.scriptURI=null;YAHOO.widget.DS_ScriptNode.prototype.scriptQueryParam="query";YAHOO.widget.DS_ScriptNode.prototype.asyncMode="allowAll";YAHOO.widget.DS_ScriptNode.prototype.scriptCallbackParam="callback";YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;YAHOO.widget.DS_ScriptNode._nPending=0;YAHOO.widget.DS_ScriptNode.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var oSelf=this;if(YAHOO.widget.DS_ScriptNode._nPending===0){YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;}
var id=YAHOO.widget.DS_ScriptNode._nId;YAHOO.widget.DS_ScriptNode._nId++;YAHOO.widget.DS_ScriptNode.callbacks[id]=function(oResponse){if((oSelf.asyncMode!=="ignoreStaleResponses")||(id===YAHOO.widget.DS_ScriptNode.callbacks.length-1)){oSelf.handleResponse(oResponse,oCallbackFn,sQuery,oParent);}
else{}
delete YAHOO.widget.DS_ScriptNode.callbacks[id];};YAHOO.widget.DS_ScriptNode._nPending++;var sUri=this.scriptURI+"&"+this.scriptQueryParam+"="+sQuery+"&"+
this.scriptCallbackParam+"=YAHOO.widget.DS_ScriptNode.callbacks["+id+"]";this.getUtility.script(sUri,{autopurge:true,onsuccess:YAHOO.widget.DS_ScriptNode._bumpPendingDown,onfail:YAHOO.widget.DS_ScriptNode._bumpPendingDown});};YAHOO.widget.DS_ScriptNode.prototype.handleResponse=function(oResponse,oCallbackFn,sQuery,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var jsonList,jsonObjParsed;try{jsonList=eval("(oResponse."+aSchema[0]+")");}
catch(e){bError=true;}
if(!jsonList){bError=true;jsonList=[];}
else if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}
for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}
aResultItem.unshift(dataFieldValue);}
if(aResultItem.length==1){aResultItem.push(jsonResult);}
aResults.unshift(aResultItem);}
if(bError){aResults=null;}
if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}
else{var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);}
oCallbackFn(sQuery,aResults,oParent);};YAHOO.widget.DS_ScriptNode._bumpPendingDown=function(){YAHOO.widget.DS_ScriptNode._nPending--;};YAHOO.widget.DS_JSFunction=function(oFunction,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isFunction(oFunction)){return;}
else{this.dataFunction=oFunction;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var oFunction=this.dataFunction;var aResults=[];aResults=oFunction(sQuery);if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);oCallbackFn(sQuery,aResults,oParent);return;};YAHOO.widget.DS_JSArray=function(aData,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isArray(aData)){return;}
else{this.data=aData;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var i;var aData=this.data;var aResults=[];var bMatchFound=false;var bMatchContains=this.queryMatchContains;if(sQuery){if(!this.queryMatchCase){sQuery=sQuery.toLowerCase();}
for(i=aData.length-1;i>=0;i--){var aDataset=[];if(YAHOO.lang.isString(aData[i])){aDataset[0]=aData[i];}
else if(YAHOO.lang.isArray(aData[i])){aDataset=aData[i];}
if(YAHOO.lang.isString(aDataset[0])){var sKeyIndex=(this.queryMatchCase)?encodeURIComponent(aDataset[0]).indexOf(sQuery):encodeURIComponent(aDataset[0]).toLowerCase().indexOf(sQuery);if((!bMatchContains&&(sKeyIndex===0))||(bMatchContains&&(sKeyIndex>-1))){aResults.unshift(aDataset);}}}}
else{for(i=aData.length-1;i>=0;i--){if(YAHOO.lang.isString(aData[i])){aResults.unshift([aData[i]]);}
else if(YAHOO.lang.isArray(aData[i])){aResults.unshift(aData[i]);}}}
this.getResultsEvent.fire(this,oParent,sQuery,aResults);oCallbackFn(sQuery,aResults,oParent);};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.5.2",build:"1076"});JSON=new function(){var useHasOwn={}.hasOwnProperty?true:false;var pad=function(n){return n<10?'0'+n:n;};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+s+'"';};var encodeArray=function(o){var a=['['],b,i,l=o.length,v;for(i=0;i<l;i+=1){v=o[i];switch(typeof v){case'undefined':case'function':case'unknown':break;default:if(b){a.push(',');}
a.push(v===null?"null":JSON.encode(v));b=true;}}
a.push(']');return a.join('');};var encodeDate=function(o){return'"'+o.getFullYear()+'-'+
pad(o.getMonth()+1)+'-'+
pad(o.getDate())+'T'+
pad(o.getHours())+':'+
pad(o.getMinutes())+':'+
pad(o.getSeconds())+'"';};this.encode=function(o){if(typeof o=='undefined'||o===null){return'null';}else if(o instanceof Array){return encodeArray(o);}else if(o instanceof Date){return encodeDate(o);}else if(typeof o=='string'){return encodeString(o);}else if(typeof o=='number'){return isFinite(o)?String(o):"null";}else if(typeof o=='boolean'){return String(o);}else{var a=['{'],b,i,v;for(var i in o){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];switch(typeof v){case'undefined':case'function':case'unknown':break;default:if(b){a.push(',');}
a.push(this.encode(i),':',v===null?"null":this.encode(v));b=true;}}}
a.push('}');return a.join('');}};this.decode=function(json){return eval('('+json+')');};}();var niftyOk=(document.getElementById&&document.createElement&&Array.prototype.push);var niftyCss=true;String.prototype.find=function(what){return(this.indexOf(what)>=0?true:false);}
var oldonload=window.onload;if(typeof(NiftyLoad)!='function')NiftyLoad=function(){};if(typeof(oldonload)=='function')
window.onload=function(){oldonload();NiftyLoad()};else window.onload=function(){NiftyLoad()};function AddCss(){niftyCss=true;var l=CreateEl("link");l.setAttribute("type","text/css");l.setAttribute("rel","stylesheet");l.setAttribute("href","css/niftyCorners.css");l.setAttribute("media","screen");document.getElementsByTagName("head")[0].appendChild(l);}
function Nifty(selector,options){if(niftyOk==false)return;if(niftyCss==false)AddCss();var i,v=selector.split(","),h=0;if(options==null)options="";if(options.find("fixed-height"))
h=getElementsBySelector(v[0])[0].offsetHeight;for(i=0;i<v.length;i++)
Rounded(v[i],options);if(options.find("height"))SameHeight(selector,h);}
function Rounded(selector,options){var i,top="",bottom="",v=new Array();if(options!=""){options=options.replace("left","tl bl");options=options.replace("right","tr br");options=options.replace("top","tr tl");options=options.replace("bottom","br bl");options=options.replace("transparent","alias");if(options.find("tl")){top="both";if(!options.find("tr"))top="left";}
else if(options.find("tr"))top="right";if(options.find("bl")){bottom="both";if(!options.find("br"))bottom="left";}
else if(options.find("br"))bottom="right";}
if(top==""&&bottom==""&&!options.find("none")){top="both";bottom="both";}
v=getElementsBySelector(selector);for(i=0;i<v.length;i++){FixIE(v[i]);if(top!="")AddTop(v[i],top,options);if(bottom!="")AddBottom(v[i],bottom,options);}}
function AddTop(el,side,options){var d=CreateEl("b"),lim=4,border="",p,i,btype="r",bk,color;d.style.marginLeft="-"+getPadding(el,"Left")+"px";d.style.marginRight="-"+getPadding(el,"Right")+"px";if(options.find("alias")||(color=getBk(el))=="transparent"){color="transparent";bk="transparent";border=getParentBk(el);btype="t";}
else{bk=getParentBk(el);border=Mix(color,bk);}
d.style.background=bk;d.className="niftycorners";p=getPadding(el,"Top");if(options.find("small")){d.style.marginBottom=(p-2)+"px";btype+="s";lim=2;}
else if(options.find("big")){d.style.marginBottom=(p-10)+"px";btype+="b";lim=8;}
else d.style.marginBottom=(p-5)+"px";for(i=1;i<=lim;i++)
d.appendChild(CreateStrip(i,side,color,border,btype));el.style.paddingTop="0";el.insertBefore(d,el.firstChild);}
function AddBottom(el,side,options){var d=CreateEl("b"),lim=4,border="",p,i,btype="r",bk,color;d.style.marginLeft="-"+getPadding(el,"Left")+"px";d.style.marginRight="-"+getPadding(el,"Right")+"px";if(options.find("alias")||(color=getBk(el))=="transparent"){color="transparent";bk="transparent";border=getParentBk(el);btype="t";}
else{bk=getParentBk(el);border=Mix(color,bk);}
d.style.background=bk;d.className="niftycorners";p=getPadding(el,"Bottom");if(options.find("small")){d.style.marginTop=(p-2)+"px";btype+="s";lim=2;}
else if(options.find("big")){d.style.marginTop=(p-10)+"px";btype+="b";lim=8;}
else d.style.marginTop=(p-5)+"px";for(i=lim;i>0;i--)
d.appendChild(CreateStrip(i,side,color,border,btype));el.style.paddingBottom=0;el.appendChild(d);}
function CreateStrip(index,side,color,border,btype){var x=CreateEl("b");x.className=btype+index;x.style.backgroundColor=color;x.style.borderColor=border;if(side=="left"){x.style.borderRightWidth="0";x.style.marginRight="0";}
else if(side=="right"){x.style.borderLeftWidth="0";x.style.marginLeft="0";}
return(x);}
function CreateEl(x){return(document.createElement(x));}
function FixIE(el){if(el.currentStyle!=null&&el.currentStyle.hasLayout!=null&&el.currentStyle.hasLayout==false)
el.style.display="inline-block";}
function SameHeight(selector,maxh){var i,v=selector.split(","),t,j,els=[],gap;for(i=0;i<v.length;i++){t=getElementsBySelector(v[i]);els=els.concat(t);}
for(i=0;i<els.length;i++){if(els[i].offsetHeight>maxh)maxh=els[i].offsetHeight;els[i].style.height="auto";}
for(i=0;i<els.length;i++){gap=maxh-els[i].offsetHeight;if(gap>0){t=CreateEl("b");t.className="niftyfill";t.style.height=gap+"px";nc=els[i].lastChild;if(nc.className=="niftycorners")
els[i].insertBefore(t,nc);else els[i].appendChild(t);}}}
function getElementsBySelector(selector){var i,j,selid="",selclass="",tag=selector,tag2="",v2,k,f,a,s=[],objlist=[],c;if(selector.find("#")){if(selector.find(" ")){s=selector.split(" ");var fs=s[0].split("#");if(fs.length==1)return(objlist);f=document.getElementById(fs[1]);if(f){v=f.getElementsByTagName(s[1]);for(i=0;i<v.length;i++)objlist.push(v[i]);}
return(objlist);}
else{s=selector.split("#");tag=s[0];selid=s[1];if(selid!=""){f=document.getElementById(selid);if(f)objlist.push(f);return(objlist);}}}
if(selector.find(".")){s=selector.split(".");tag=s[0];selclass=s[1];if(selclass.find(" ")){s=selclass.split(" ");selclass=s[0];tag2=s[1];}}
var v=document.getElementsByTagName(tag);if(selclass==""){for(i=0;i<v.length;i++)objlist.push(v[i]);return(objlist);}
for(i=0;i<v.length;i++){c=v[i].className.split(" ");for(j=0;j<c.length;j++){if(c[j]==selclass){if(tag2=="")objlist.push(v[i]);else{v2=v[i].getElementsByTagName(tag2);for(k=0;k<v2.length;k++)objlist.push(v2[k]);}}}}
return(objlist);}
function getParentBk(x){var el=x.parentNode,c;while(el.tagName.toUpperCase()!="HTML"&&(c=getBk(el))=="transparent")
el=el.parentNode;if(c=="transparent")c="#FFFFFF";return(c);}
function getBk(x){var c=getStyleProp(x,"backgroundColor");if(c==null||c=="transparent"||c.find("rgba(0, 0, 0, 0)"))
return("transparent");if(c.find("rgb"))c=rgb2hex(c);return(c);}
function getPadding(x,side){var p=getStyleProp(x,"padding"+side);if(p==null||!p.find("px"))return(0);return(parseInt(p));}
function getStyleProp(x,prop){if(x.currentStyle)
return(x.currentStyle[prop]);if(document.defaultView.getComputedStyle)
return(document.defaultView.getComputedStyle(x,'')[prop]);return(null);}
function rgb2hex(value){var hex="",v,h,i;var regexp=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;var h=regexp.exec(value);for(i=1;i<4;i++){v=parseInt(h[i]).toString(16);if(v.length==1)hex+="0"+v;else hex+=v;}
return("#"+hex);}
function Mix(c1,c2){var i,step1,step2,x,y,r=new Array(3);if(c1.length==4)step1=1;else step1=2;if(c2.length==4)step2=1;else step2=2;for(i=0;i<3;i++){x=parseInt(c1.substr(1+step1*i,step1),16);if(step1==1)x=16*x+x;y=parseInt(c2.substr(1+step2*i,step2),16);if(step2==1)y=16*y+y;r[i]=Math.floor((x*50+y*50)/100);r[i]=r[i].toString(16);if(r[i].length==1)r[i]="0"+r[i];}
return("#"+r[0]+r[1]+r[2]);}
if(typeof IMO=="undefined"||!IMO){var IMO={};IMO.Manager={};IMO.Widget={};}
IMO.env=(function()
{var env={flash:0,os:null,detectFlash:function()
{_detectFlash();}}
function _detectFlash()
{MSDetect="false";if(navigator.plugins&&navigator.plugins.length)
{x=navigator.plugins["Shockwave Flash"];if(x&&x.description)
{var version=x.description.match(/Shockwave Flash (\d*)\./)[1];env.flash=parseInt(version)||0;}}
else if(navigator.mimeTypes&&navigator.mimeTypes.length)
{x=navigator.mimeTypes['application/x-shockwave-flash'];if(x&&x.enabledPlugin)
{env.flash=1;}}
else
{MSDetect="true";}
if(MSDetect=="true")
{for(var i=20;i>0;i--)
{try
{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);env.flash=(i==0?1:i);break;}
catch(e){}}}}
function _detectOS()
{var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1)
{env.os="windows";}
else if(ua.indexOf("macintosh")!=-1)
{env.os="mac";}
else if(ua.indexOf("linux")!=-1)
{env.os="linux";}}
_detectFlash();_detectOS();return env;}());function createCookie(name,value,days)
{if(days)
{var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else
{var expires="";}
document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++)
{var c=ca[i];while(c.charAt(0)==' ')
{c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)==0)
{return c.substring(nameEQ.length,c.length);}}
return null;}
function eraseCookie(name)
{createCookie(name,"",-1);}

IMO.UI=function()
{this.ssid=create_ssid();this.fast_polling=false;this.client_mode=false;this.client_ver=null;this.surf_mode=false;this.facebook=false;this.non_imo_vc=null;this.modules={};this.widgets={};};IMO.UI.prototype={constructor:IMO.UI,init:function()
{this.preProcess();this.initModules();if(this.fastLogin())
{return;}
this.initUI();this.postProcess();},preProcess:function()
{this._addWidget(IMO.Widget.LoadingDiv,new IMO.Widget.LoadingDiv(document.body));},postProcess:function()
{this.getWidget(IMO.Widget.LoadingDiv).remove();},initUI:function()
{this.initWidgets();this.migrate();},_addModule:function(m,o)
{o=typeof o=="undefined"?new m():o;this.modules[o.NAME]=o;return o;},initModules:function()
{this._addModule(IMO.Ajax,new IMO.Ajax("","/amy",this.ssid));this._addModule(IMO.i18nAjax,new IMO.i18nAjax("","/translate",this.ssid));this._addModule(IMO.Manager.Notification);this._addModule(IMO.Manager.Account);this._addModule(IMO.Manager.Preference);this._addModule(IMO.Manager.Monitor);this._addModule(IMO.Manager.Away);this._addModule(IMO.Manager.Blist);this._addModule(IMO.Manager.Browser);this._addModule(IMO.Manager.Pulse);this._addModule(IMO.Manager.Keyboard);this._addModule(IMO.Manager.Alert);this._addModule(IMO.Manager.Sound);this._addModule(IMO.Manager.Hints);this._addModule(IMO.Manager.Imo);this._addModule(IMO.Manager.Conv.Im);this._addModule(IMO.Manager.Conv.Vc);this._addModule(IMO.Manager.i18n);this._addModule(IMO.Manager.Event);this._addModule(IMO.Migrate);},getModule:function(m)
{return this.modules[m.prototype.NAME];},fastLogin:function()
{var fast_ssid=readCookie(IMO.Constants.COOKIE_FAST_LOGIN);var open=readCookie(IMO.Constants.COOKIE_OPEN);if(fast_ssid&&!open)
{YAHOO.log("fast_ssid:"+fast_ssid);this.fast_polling=true;this.ssid=fast_ssid.split(":")[0];var ajax=this.getModule(IMO.Ajax);ajax.setSsid(this.ssid);ajax.poll();ajax.exec("fast_login",JSON.encode({"ssid":this.ssid}));return true;}
return false;},_addWidget:function(w,o)
{o=typeof o=="undefined"?new w():o;this.widgets[o.NAME]=o;return o;},initWidgets:function(){},getWidget:function(w)
{return this.widgets[w.prototype.NAME];},migrate:function(){}};IMO.i18n={rtlLangs:{'ar':null,'fa':null,'ha':null,'he':null,'kk':null,'ku':null,'tg':null,'tt':null,'ur':null,'yi':null},lang:'en-US',secLang:'es-MX',totalStrings:0,dict:{},Functions:{},nodes:{},codeToLang:{},langData:{}};(function(){IMO.Widget.ITabs=function(dom_base,id)
{this.dom_base=dom_base;this.id=id;this.tabs={};this.active_tabs=[];this.focus_index=0;this.ev_focus=new YAHOO.util.CustomEvent("focus_tab");this.dom_node=document.createElement("div");this.dom_node.id=this.id;YAHOO.util.Dom.addClass(this.dom_node,this.CSS);this.headers_dom_node=document.createElement("div");YAHOO.util.Dom.addClass(this.headers_dom_node,this.CSS_HEADER);this.body_dom_node=document.createElement("div");YAHOO.util.Dom.addClass(this.body_dom_node,this.CSS_BODY);this.dom_node.appendChild(this.headers_dom_node);this.dom_node.appendChild(this.body_dom_node);this.dom_base.appendChild(this.dom_node);};IMO.Widget.ITabs.prototype={NAME:"IMO.Widget.ITabs",CSS:"",CSS_HEADER:"",CSS_BODY:"",AddTab:function(id,title,allow_close,allow_tab)
{allow_close=(typeof(allow_close)!="undefined"?allow_close:true);allow_tab=typeof(allow_tab)!="undefined"?allow_tab:true;var itab=new IMO.Widget.ITab(this,id,title,allow_close,allow_tab);this.tabs[id]=itab;this.active_tabs.push(itab);if(this.active_tabs.length==1)
{this.focus_index=0;this.FocusTab(itab);}
return itab;},RemoveTab:function(id)
{},GetTab:function(id)
{return this.tabs[id];},HideTab:function(id)
{var tab=this.GetTab(id);var index=this.GetActiveTabsIndex(tab);this.headers_dom_node.removeChild(tab.header_dom_node);this.active_tabs.splice(index,1);tab.Unfocus();if(this.active_tabs.length==0)
return;if(index<this.focus_index||(index==this.focus_index&&this.active_tabs.length<=index))
{this.focus_index=Math.max(0,this.focus_index-1);}
this.FocusTab(this.active_tabs[this.focus_index]);},ShowTab:function(tab,index)
{if(this.GetActiveTabsIndex(tab)!=-1)
return;index=(typeof(index)!="undefined"?index:this.active_tabs.length);this.active_tabs.splice(index,0,tab);if(index==this.active_tabs.length-1)
{this.headers_dom_node.appendChild(tab.header_dom_node);}
else
{var node=this.headers_dom_node.childNodes[index];this.headers_dom_node.insertBefore(tab.header_dom_node,node);}},FocusTab:function(tab,index)
{var otab=this.active_tabs[this.focus_index];if(otab)
{otab.Unfocus();}
this.ShowTab(tab,index);var tab_index=this.GetActiveTabsIndex(tab);tab.Focus();this.focus_index=tab_index;this.ev_focus.fire(tab);},GetActiveTabsIndex:function(itab)
{for(var i=0;i<this.active_tabs.length;i++)
{if(this.active_tabs[i]==itab)
{return i;}}
return-1;},GetFocusedTab:function()
{return this.active_tabs[this.focus_index];},FocusNext:function()
{var index=this.focus_index+1;index=index<this.active_tabs.length?index:0;var itab=this.active_tabs[index];if(itab)
{this.FocusTab(this.active_tabs[index]);}},FocusPrev:function()
{var index=this.focus_index-1;index=index>=0?index:this.active_tabs.length-1;var itab=this.active_tabs[index];if(itab)
{this.FocusTab(this.active_tabs[index]);}}};IMO.Widget.ITab=function(itabs,id,title,allow_close,allow_tab)
{this.itabs=itabs;this.title=title;this.id=id;this.allow_close=allow_close;this.allow_tab=allow_tab;this.close_id=YAHOO.util.Dom.generateId();this.header_dom_node=this.CreateHeaderDomNode();YAHOO.util.Dom.addClass(this.header_dom_node,this.CSS_HEADER);this.body_dom_node=document.createElement("div");YAHOO.util.Dom.addClass(this.body_dom_node,this.CSS_BODY);this.Unfocus();this.itabs.headers_dom_node.appendChild(this.header_dom_node);this.itabs.body_dom_node.appendChild(this.body_dom_node);YAHOO.util.Event.addListener(this.header_dom_node,"click",this.ClickCb,this,true);if(this.allow_close)
{YAHOO.util.Event.addListener($(this.close_id),"click",this.CloseClickCb,this,true);}};IMO.Widget.ITab.prototype={NAME:"IMO.Widget.ITab",CSS_HEADER:"itab_header",CSS_HEADER_FOCUS:"itab_header_focus",CSS_HEADER_ACTIVITY:"itab_header_activity",CSS_BODY:"itab_body",ClickCb:function(ev,obj)
{this.itabs.FocusTab(this);},CloseClickCb:function(ev,obj)
{this.itabs.HideTab(this.id);YAHOO.util.Event.stopPropagation(ev);},CreateHeaderDomNode:function()
{var header=document.createElement("div");if(this.allow_close)
{header.innerHTML=this.title+'<img id='+this.close_id+' class="itab_close" src="/images/close12_1.gif" />';}
else
{header.innerHTML='<div>'+this.title+'</div>';}
return header;},Focus:function()
{YAHOO.util.Dom.addClass(this.header_dom_node,this.CSS_HEADER_FOCUS);this.body_dom_node.style.display="";},Unfocus:function()
{YAHOO.util.Dom.removeClass(this.header_dom_node,this.CSS_HEADER_FOCUS);this.body_dom_node.style.display="none";}};}());(function(){IMO.Widget.INode=function(data)
{this.data=data;this.parent=null;this.children=[];this.guide=null;this.dom_node=null;this.element_id=null;}
IMO.Widget.INode.unique_inode_counter=0;IMO.Widget.INode.prototype={NAME:"IMO.Widget.INode",GetDomNode:function()
{if(this.dom_node==null)
{if(this.element_id==null)
{return null;}
else
{this.dom_node=document.getElementById(this.element_id);}}
return this.dom_node;},GetMakeDomNode:function()
{var dom_node=this.GetDomNode();if(dom_node==null)
{this.dom_node=document.createElement("div");this.dom_node.innerHTML=this.GetHTMLString(false);dom_node=this.dom_node;}
return dom_node;},GetHTMLDomNode:function()
{var dom_node=this.GetDomNode();if(dom_node==null)
{return null;}
return dom_node.firstChild;},GetChildrenDomNode:function()
{var dom_node=this.GetDomNode();if(dom_node==null)
{return null;}
return dom_node.lastChild;},Draw:function()
{var dom_node=this.GetDomNode();var ihtml=this.GetHTMLString(false);dom_node.innerHTML=ihtml;},FindPlace:function(guide)
{for(var c=0;c<this.children.length;c++)
{if(guide<this.children[c].guide)
{return this.children[c];}}
return null;},GetHTMLString:function(include_node_div)
{this.element_id="inode"+IMO.Widget.INode.unique_inode_counter++;var result="";if(include_node_div)
{result+="<div id="+this.element_id+">";}
if(this.data)
{if(this.data["CSS_CLASS"])
{result+='<div class="'+this.data.CSS_CLASS+'">';}
else
{result+='<div>';}
if(this.data["GetHTML"]!=null)
{result+=this.data.GetHTML();}
else if(this.data["html"]!=null)
{result+=this.data.html;}
else
{result+=this.data;}
result+="</div>";}
else
{result+="<div></div>";}
if(this.children.length)
{result+=' <div style="display:inline">';var child_results=[];for(var c=0;c<this.children.length;c++)
{child_results[c]=this.children[c].GetHTMLString(true);}
var children_results=child_results.join("");result+=children_results;result+="</div>";}
else
{result+=' <div style="display:none"></div>';}
if(include_node_div)
{result+="</div>";}
return result;}}
IMO.Widget.ITree=function(dom_base,tree_name)
{this.dom_base=dom_base;this.root=new IMO.Widget.INode(tree_name);this.incremental=false;this.guide_map={};}
IMO.Widget.ITree.prototype={NAME:"IMO.Widget.ITree",InsertBefore:function(node,before_node)
{if(node.parent!=null)
{return;}
var parent=before_node.parent;for(var c=0;c<parent.children.length;c++)
{if(parent.children[c]==before_node)
{break;}}
parent.children.splice(c,0,node);node.parent=parent;if(this.incremental==true)
{var parent_children_dom_node=parent.GetChildrenDomNode();dom_node=node.GetMakeDomNode();parent_children_dom_node.insertBefore(dom_node,before_node.GetDomNode());}},InsertAsLastChild:function(node,parent)
{if(node.parent!=null)
{return;}
parent.children[parent.children.length]=node;node.parent=parent;if(this.incremental==true)
{var parent_children_dom_node=parent.GetChildrenDomNode();var dom_node=node.GetMakeDomNode();parent_children_dom_node.appendChild(dom_node);if(parent_children_dom_node.childNodes.length==1)
{parent_children_dom_node.style.display="inline";}}},DetachNode:function(node)
{var parent=node.parent;if(parent==null)
{return;}
for(var c=0;c<parent.children.length;c++)
{if(parent.children[c]==node)
{break;}}
parent.children.splice(c,1);node.parent=null;if(this.incremental==true)
{var dom_node=node.GetDomNode();if(dom_node==null)
{return;}
var children_dom_node=dom_node.parentNode;children_dom_node.removeChild(dom_node);if(children_dom_node.length==0)
{children_dom_node.style.display="none";}}},Draw:function()
{var ihtml=this.root.GetHTMLString(true);this.dom_base.innerHTML=ihtml;},SetIncremental:function(value)
{this.incremental=value;},AddObjectByGuide:function(obj,guide)
{var node=new IMO.Widget.INode(obj);this.AddByGuide(node,guide);return node;},AddByGuide:function(node,guide){var parent_node=this.root;var last_slash=guide.lastIndexOf("/");var first_guide=guide.substring(0,last_slash);if(last_slash!=0)
{parent_node=this.guide_map[first_guide];}
var last_guide=guide.substring(last_slash,guide.length);node.guide=last_guide;var before_node=parent_node.FindPlace(node.guide);if(!before_node)
{this.InsertAsLastChild(node,parent_node);}
else
{this.InsertBefore(node,before_node);}
this.guide_map[guide]=node;},GetNodeByGuide:function(guide)
{return this.guide_map[guide];},RemoveByGuide:function(guide)
{var node=this.guide_map[guide];this.DetachNode(node);delete this.guide_map[guide];return node;},MoveByGuide:function(oldguide,newguide)
{var thenode=this.RemoveByGuide(oldguide);this.AddByGuide(thenode,newguide);return thenode;}}}());IMO.Constants=(function(){return{VERSION:"1221692038",PROTO_AIM:"prpl-aim",PROTO_YAHOO:"prpl-yahoo",PROTO_MSN:"prpl-msn",PROTO_GTALK:"prpl-jabber",PROTO_FB:"prpl-facebook",PROTO_SKYPE:"prpl-skype",PROTO_MYSPACE:"prpl-myspace",PRIM_OFFLINE:"offline",PRIM_AWAY:"away",PRIM_BUSY:"busy",PRIM_AVAILABLE:"available",PRIM_INVISIBLE:"invisible",OFFLINE_GROUP:"Offline",BUDDY_DIFF:0,GROUP_DIFF:1,SSID_LENGTH:16,COOKIE_FBIM:"fbim",COOKIE_FAST_LOGIN:"imo",COOKIE_OPEN:"open",COOKIE_PROTO:"proto",APPEAR_TIME:333,SHOW_TIME:10000,HIDE_TIME:333}}());function create_ssid()
{var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789";var ssid=[];for(var i=0;i<=IMO.Constants.SSID_LENGTH;i++)
{var index=Math.floor(Math.random()*c.length);ssid.push(c.substring(index,index+1));}
return ssid.join("");}
function $()
{var elements=new Array();for(var i=0;i<arguments.length;i++)
{var element=arguments[i];if(typeof element=='string')
{element=document.getElementById(element);}
if(arguments.length==1)
{return element;}
elements.push(element);}
return elements;}
function $$(type)
{return document.createElement(type);}
function __()
{var args=[];for(var i=0;i<arguments.length;i++)
{args.push(arguments[i]);}
return args.join("#");}
function trim_string(s)
{return s.replace(/^\s*|\s*$/g,'');}
function get_mouse_selection()
{var txt='';var foundIn='';if(window.getSelection)
{txt=window.getSelection();}
else if(document.getSelection)
{txt=document.getSelection();}
else if(document.selection)
{txt=document.selection.createRange().text;}
return txt;}
function get_computed_style(el,attribute)
{if(el.currentStyle)
{return el.currentStyle[attribute];}
else
{return window.getComputedStyle(el,null).getPropertyValue(attribute);}}
function fixPng(img)
{var env=IMO.env;if(env.os=="windows"&&YAHOO.env.ua.ie&&img.src.match(/\.png$/i)!=null)
{var src=img.src;if(img.width)
{img.style.width=img.width+"px";}
if(img.height)
{img.style.height=img.height+"px";}
img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader("+"src='"+src+"', sizingMethod='scale')";img.src=get_img_src("blank.gif");}}
function get_resource(buid,proto)
{var resource="";if(proto==IMO.Constants.PROTO_GTALK)
{var i=buid.indexOf("/");if(i!=-1)
{resource=buid.substring(i);}}
return resource;}
function remove_resource(buid,proto)
{if(proto==IMO.Constants.PROTO_GTALK)
{var i=buid.indexOf("/");if(i!=-1)
{buid=buid.substring(0,i);}}
return buid;}
function pretty_uid(str)
{var i=str.indexOf("@");if(i!=-1)
{str=str.substring(0,i);}
return str;}
function get_buddy_picon(proto,prim,gif)
{if(!proto)
{return"";}
if(proto==IMO.Constants.PROTO_MYSPACE)
{proto=IMO.Constants.PROTO_GTALK;}
var src=[];src[src.length]=proto.substring(5);src[src.length]="_";if(prim==IMO.Constants.PRIM_OFFLINE||prim==IMO.Constants.PRIM_INVISIBLE)
{src[src.length]="offline";}
else if(prim==IMO.Constants.PRIM_AWAY)
{src[src.length]="away";}
else if(prim==IMO.Constants.PRIM_BUSY)
{src[src.length]="busy";}
else if(prim==IMO.Constants.PRIM_AVAILABLE)
{src[src.length]="available";}
src[src.length]=gif?".gif":".png";return get_img_src(src.join(""));}
function get_iproto(uid,proto)
{return uid.match(/@fb\d+\.imo\.im/)?IMO.Constants.PROTO_FB:proto;}
function get_proto_icon(proto)
{return get_img_src(proto.substring(5)+".png");}
function get_small_proto_icon(proto)
{return get_img_src(proto.substring(5)+"_sm.png");}
function get_proto_name(proto)
{if(proto==IMO.Constants.PROTO_GTALK)
{proto="Google Talk";}
else if(proto==IMO.Constants.PROTO_AIM)
{proto="AIM / ICQ";}
else if(proto==IMO.Constants.PROTO_MSN)
{proto="MSN";}
else if(proto==IMO.Constants.PROTO_YAHOO)
{proto="Yahoo";}
else if(proto==IMO.Constants.PROTO_SKYPE)
{proto="Skype";}
else if(proto==IMO.Constants.PROTO_MYSPACE)
{proto="MySpace";}
return proto;}
function get_movie(name)
{if(YAHOO.env.ua.ie)
{return window[name];}
else
{return document[name];}}
function parse_query_string(str)
{var keyvals={};str=decodeURIComponent(str);var pairs=str.split(/\&/);for(var i=0;i<pairs.length;i++)
{var kv=pairs[i].split(/\=/);keyvals[kv[0]]=(typeof kv[1]=='undefined')?null:kv[1];}
return keyvals;}
function htmlify_string(str)
{var str_array=[];var words=str.split(" ");for(var i=0;i<words.length;i++)
{var word=words[i];if(word.length<=15)
{str_array.push(linkify_string(html_encode(word)));}
else
{var tmp=[];while(word.length>15)
{tmp.push(html_encode(word.substring(0,15)));tmp.push("<wbr/>");word=word.substring(15);}
tmp.push(html_encode(word));str_array.push(linkify_string(html_encode(words[i]),tmp.join("")));}}
return str_array.join(" ");}
function html_encode(str)
{if(!str)
return str;str=str.replace(/&/g,"&amp;");str=str.replace(/</g,"&lt;");str=str.replace(/>/g,"&gt;");str=str.replace(/"/g,"&quot;");return str;}
function linkify_string(str,text)
{if(!str)
return str;text=typeof(text)!="undefined"?text:str;var email=/(\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)/;var url=/(^|[ \t\r\n])((((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([a-z0-9$_+!*(),;/?:@&~=-])|%[a-f0-9]{2}|[.](?![.])){2,})|(([a-z0-9$_+!*():@~-]|[.](?![.])){2,}\.(ac|ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|asia|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cat|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|info|int|io|iq|ir|is|it|je|jm|jo|jobs|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mobi|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|travel|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)(?=$|[^a-z0-9_.]))|([0-9]{1,3}\.){3}[0-9]{1,3})([a-z0-9$_+!*();/?:~-]|%[a-f0-9]{2}|[.](?![.]))*(#([a-z0-9][a-z0-9$_+!*(),;/?@~=%-]*))?)/i;var unshortened_url=/(^|[ \t\r\n])(ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):.*/i;var result=str.split(/\s+/);var linkified=false;for(var i=0;i<result.length;i++)
{if(result[i].match(email))
{result[i]=result[i].replace(email,'<a href="mailto:'+
str+'">'+text+'</a>');linkified=true;}
else if(result[i].match(url))
{var prefix="";if(!result[i].match(unshortened_url)){prefix="http://";}
if(IMO.UI.X.surf_mode&&YAHOO.env.ua.gecko)
{result[i]='<a href="javascript:void(0)" '+'onclick="open_url_ff(\''+prefix+str+'\')">'+
text+'</a>';}
else
{result[i]=result[i].replace(url,'<a '+'href="'+prefix+str+'" target="_blank" '+'onclick="YAHOO.util.Event.stopPropagation(event);">'+
text+'</a>');}
linkified=true;}}
if(linkified){return result.join(" ");}
return text;}
function open_url_ff(url)
{var width=self.screen.availWidth-YAHOO.util.Dom.getViewportWidth();var height=self.screen.availHeight;var screenX=self.screenX<self.screen.availWidth/2?YAHOO.util.Dom.getViewportWidth():0;var screenY=0;var win=window.open(url,'_blank','width='+width+', height='+height+', screenX='+screenX+', screenY='+screenY+', toolbar=yes, location=yes, directories=yes'+', status=yes, menubar=yes, scrollbars=yes, copyhistory=no'+', resizable=yes');}
function switch_tab(id)
{var itabs=IMO.UI.X.getWidget(IMO.Widget.SurfTabs);itabs.show_tab(id);}
function client_signoff()
{}
function getDayOfWeek(d)
{switch(d.getDay())
{case 0:return _("Sunday");break;case 1:day=_("Monday");break;case 2:day=_("Tuesday");break;case 3:day=_("Wednesday");break;case 4:day=_("Thursday");break;case 5:day=_("Friday");break;case 6:day=_("Saturday");break;}
return day;}
function _(s)
{s=s.replace(/(^\s*)|(\s*$)/g,"");var t=s;if(IMO.i18n.dict&&IMO.i18n.dict[s])
{t=IMO.i18n.dict[t];t=t.replace(/</g,"&lt;");t=t.replace(/>/g,"&gt;");}
var fn=null,prop=null,node=null,noHTML=false;for(var i=1;i<arguments.length;i++)
{if(arguments[i]instanceof Function)
{fn=arguments[i];}
else if(arguments[i]===false)
{noHTML=true;break;}
else
{node=arguments[i];prop=arguments[++i];}}
if(fn)
{t=fn(t);}
if(noHTML)
{return t;}
if(prop&&node)
{if(!node.id)
{node.id=YAHOO.util.Dom.generateId();}
IMO.i18n.nodes[node.id]={node:node,enString:s,fn:fn,prop:prop};node[prop]=t;return t;}
var id=YAHOO.util.Dom.generateId();var span='<span '+'id="'+id+'">'+
t+'</span>';IMO.i18n.nodes[id]={enString:s,fn:fn,prop:"innerHTML"};return span;}
function sprintf()
{if(!arguments||arguments.length<1||!RegExp||!arguments[0])
{return"";}
var s=arguments[0];for(var index=1;index<arguments.length;index++)
{if(typeof arguments[index]=="object"&&!(arguments[index]instanceof String)&&!(arguments[index]instanceof Number)){for(var tag in arguments[index]){var exp=tag.replace(/\[/g,"\\[");exp=exp.replace(/\]/g,"\\]");s=s.replace(new RegExp(exp,"g"),arguments[index][tag]||"");}}
else{s=s.replace(new RegExp("%"+index,"g"),arguments[index]||"");}}
return s;}
function ie_css_persistence_save(attribute,value,storename)
{var memory=document.createElement("div");document.body.appendChild(memory);memory.style.behavior="url('#default#userData')";memory.setAttribute(attribute,value);memory.save(storename);document.body.removeChild(memory);}
function ie_css_persistence_load(attribute,storename)
{var memory=document.createElement("div");document.body.appendChild(memory);memory.style.behavior="url('#default#userData')";memory.load(storename);var value=memory.getAttribute(attribute);document.body.removeChild(memory);return value;}
function object_to_string(obj){x='{';for(var i in obj){if(x!='{'){x+=",";}
x+=i+":'"+obj[i]+"'";}
x+='}';return x;}
function wrapPlaceholders(s,refString)
{if(!refString)
{refString=s;}
var pHolders=getPlaceholders(refString),result=s;for(var i in pHolders)
{result=result.replace(pHolders[i],'<span class="i18nPlaceholder">'+
pHolders[i]+'</span>');}
return result;}
function getPlaceholders(s)
{var match,pHolders=[],regex=/\[\/?[A-Z0-9]+\]|%[0-9]+/g;while(match=regex.exec(s))
{pHolders.push(match[0]);}
return pHolders;}
(function(){IMO.Ajax=function(host,path,ssid)
{this.host=host;this.path=path;this.ssid=ssid;this.queue=[];this.down=false;this.poll_obj=null;this.shutdown_poll=false;this.shutdown_all=false;this.execCBs=new IMO.Ajax.ExecCallback(this);this.pollCBs=new IMO.Ajax.PollCallback(this);this.pingCBs=new IMO.Ajax.PingCallback(this);this.evEvent=new YAHOO.util.CustomEvent("events");this.evPingSuccess=new YAHOO.util.CustomEvent("pingSuccess");this.evPingFailure=new YAHOO.util.CustomEvent("pingFailure");this.evPingExpire=new YAHOO.util.CustomEvent("pingExpire");this.evSignoffAll=new YAHOO.util.CustomEvent("signoffAll");this.evPollShutdown=new YAHOO.util.CustomEvent("pollShutdown");};IMO.Ajax.prototype={NAME:"IMO.Ajax",MAX_TRIES:20,_exec:function(post_data,callback,force)
{if(this.shutdown_all==true)
{return null;}
else if(this.down==false||force==true)
{return YAHOO.util.Connect.asyncRequest("POST",this.path,callback,post_data);}
else
{this.queue.push({"post_data":post_data,"callback":callback});return null;}},_process_events:function(json_events)
{try
{var events=eval("("+json_events+")");}
catch(e)
{YAHOO.log("error process_events:"+json_events);return;}
this.evEvent.fire(events);},_failureHelper:function(post_data,callback)
{YAHOO.log("ajax failed:"+post_data);this.queue.push({"post_data":post_data,"callback":callback});if(this.down==false)
{this.down=true;this.ping(1);}},setSsid:function(ssid)
{this.ssid=ssid;},exec:function(method,data)
{var post_data=["id="+encodeURIComponent(this.ssid),"method="+encodeURIComponent(method),"data="+encodeURIComponent(data)].join("&");this._exec(post_data,this.execCBs.getCallback(post_data,method));},poll:function()
{if(YAHOO.util.Connect.isCallInProgress(this.poll_obj))
{YAHOO.log("already polling");return;}
YAHOO.log("poll ssid:"+this.ssid);var post_data="method=poll&data={}&id="+
encodeURIComponent(this.ssid);this.poll_obj=this._exec(post_data,this.pollCBs.getCallback(post_data));},ping:function(tries)
{var data=JSON.encode({"s":"ping"})
var post_data=["id="+encodeURIComponent(this.ssid),"method=echo","data="+encodeURIComponent(data)].join("&");this._exec(post_data,this.pingCBs.getCallback(post_data,tries),true);},pollShutdown:function()
{this.shutdown_poll=true;YAHOO.util.Connect.abort(this.poll_obj);this.poll_obj=null;this.evPollShutdown.fire();},shutdownAjax:function()
{this.shutdown_all=true;this.pollShutdown();}};IMO.Ajax.ExecCallback=function(ajax)
{this.TIMEOUT=10000;this.ajax=ajax;};IMO.Ajax.ExecCallback.prototype={getCallback:function(post_data,method)
{return{success:this.success,failure:this.failure,argument:{"post_data":post_data,"method":method},scope:this};},success:function(co)
{if(co.responseText!="ok")
{this.ajax._process_events(co.responseText);}
else if(co.argument.method=="signoff_all")
{this.ajax.evSignoffAll.fire();}},failure:function(co)
{var post_data=co.argument.post_data;var method=co.argument.method;this.ajax._failureHelper(post_data,this.getCallback(post_data,method));}};IMO.Ajax.PollCallback=function(ajax)
{this.TIMEOUT=70000;this.ajax=ajax;};IMO.Ajax.PollCallback.prototype={getCallback:function(post_data)
{return{success:this.success,failure:this.failure,argument:{"post_data":post_data},scope:this,timeout:this.TIMEOUT};},success:function(co)
{YAHOO.log("poll:"+co.responseText);if(co.responseText!="ping")
{this.ajax._process_events(co.responseText);}
if(!this.ajax.shutdown_poll)
{this.ajax.poll();}
this.ajax.shutdown_poll=false;},failure:function(co)
{this.ajax.poll_obj=null;var post_data=co.argument.post_data;this.ajax._failureHelper(post_data,this.getCallback(post_data));}};IMO.Ajax.PingCallback=function(ajax)
{this.TIMEOUT=5000;this.ajax=ajax;};IMO.Ajax.PingCallback.prototype={getCallback:function(post_data,tries)
{return{success:this.success,failure:this.failure,argument:{"post_data":post_data,"tries":tries},scope:this,timeout:this.TIMEOUT};},success:function(co)
{this.ajax.down=false;this.ajax.evPingSuccess.fire(co.argument.tries);var post_data,callback,req;while(this.ajax.queue.length>0)
{req=this.ajax.queue.shift();this.ajax._exec(req["post_data"],req["callback"]);}},failure:function(co)
{var tries=co.argument.tries;this.ajax.evPingFailure.fire(co.argument.tries);if(tries<this.ajax.MAX_TRIES)
{YAHOO.lang.later(5000,this.ajax,this.ajax.ping,tries+1);}
else
{this.ajax.evPingExpire.fire(co.argument.tries);}}};}());IMO.Buddy=function(uid,proto,alias,account,group,status,primitive,resource)
{this.uid=uid;this.proto=proto;this.iproto=get_iproto(uid,proto);this.alias=alias;this.account=account;this.group=group;this.status=status;this.primitive=primitive;this.resource=resource;};IMO.Buddy.prototype={clone:function()
{return new IMO.Buddy(this.uid,this.proto,this.alias,this.account,this.group,this.status,this.primitive,this.resource);},get_guide:function()
{var guide=[];guide[guide.length]=this.group.get_guide();guide[guide.length]="/";if(this.primitive==IMO.Constants.PRIM_AVAILABLE||this.primitive==IMO.Constants.PRIM_INVISIBLE){guide[guide.length]="0-";}
else if(this.primitive==IMO.Constants.PRIM_BUSY){guide[guide.length]="1-";}
else if(this.primitive==IMO.Constants.PRIM_AWAY){guide[guide.length]="2-";}
else if(this.primitive==IMO.Constants.PRIM_OFFLINE){guide[guide.length]="3-";}
guide[guide.length]=this.alias.toLowerCase().replace(/\//g,".");guide[guide.length]="-";guide[guide.length]=this.uid.replace(/\//g,".");guide[guide.length]="-";guide[guide.length]=this.account.uid.replace(/\//g,".");guide[guide.length]="-";guide[guide.length]=this.proto;return guide.join("");},GetHTML:function()
{var display_status=this.status?"":"none";html=[];html[html.length]='<div><img align="top" src="';html[html.length]=get_buddy_picon(this.iproto,this.primitive,true);html[html.length]='" /><span>';html[html.length]=html_encode(this.alias);html[html.length]='</span></div>'
if(this.status&&this.status!=""){html[html.length]='<span class="blist_status"';html[html.length]=' style="display:';html[html.length]=display_status;html[html.length]='" >';html[html.length]=htmlify_string(this.status);html[html.length]='</span>';}
return html.join("");},GetStatus:function()
{if(this.status)
return htmlify_string(this.status);if(this.primitive==IMO.Constants.PRIM_AWAY)
return _('Away');else if(this.primitive==IMO.Constants.PRIM_AVAILABLE)
return _('Available');else if(this.primitive==IMO.Constants.PRIM_BUSY)
return _('Busy');else if(this.primitive==IMO.Constants.PRIM_INVISIBLE)
return _('Invisible');else if(this.primitive==IMO.Constants.PRIM_MOBILE)
return _('Mobile');else
return _('Offline');},CSS_CLASS:"blist_buddy"}
IMO.Group=function(name,buddies)
{this.name=name;this.buddies=buddies;}
IMO.Group.prototype={GetHTML:function()
{html=[];html[html.length]='<img style="padding-right:.25em" '
html[html.length]='src="';html[html.length]=get_img_src("collapse.gif");html[html.length]='" />';html[html.length]=html_encode(this.name);return html.join("");},get_guide:function()
{var guide=[];guide[guide.length]="/";if(this.name==IMO.Constants.OFFLINE_GROUP)
guide[guide.length]="z-";else
guide[guide.length]="a-";guide[guide.length]=this.name.replace(/\//g,".");return guide.join("");},CSS_CLASS:"blist_group"}
IMO.Diff=function(type,old_guide,new_guide,data)
{this.type=type;this.old_guide=old_guide;this.new_guide=new_guide;this.data=data;}
IMO.Account=function(uid,proto,autologin,alias,online)
{this.uid=uid;this.proto=proto;this.iproto=get_iproto(uid,proto);this.autologin=autologin;this.alias=alias;this.online=online;this.get=false;this.status_initialized=false;this.signon_start_time=null;};IMO.Account.prototype={report_signon_time:function()
{if(this.signon_start_time!=null)
{var ns="js.account_signon";if(IMO.UI.X.surf_mode)
{ns="js.surf.account_signon";}
var monitor=IMO.UI.X.getModule(IMO.Manager.Monitor);monitor.log_event(ns,{"uid":this.uid,"proto":this.proto},true,this.signon_start_time,(new Date()).getTime());}
this.signon_start_time=null;}};(function(){var ui;var imManager;var panelManager;var blistManager;IMO.Widget.BuddySearcher=function(parent)
{this.parent=parent;this.init();};IMO.Widget.BuddySearcher.prototype={NAME:"IMO.Widget.BuddySearcher",container_class:"buddy_searcher",sbox_class:"sbox",format_result:function(aResultItem,sQuery)
{var buddy=aResultItem[1];var r='<div><img onload="fixPng(this)" align="top" src="'+
get_buddy_picon(buddy.iproto,buddy.primitive)+'" />'+
buddy.alias+'</div>';return r;},search_box_focus_cb:function(ev,obj)
{this.search_box.value="";this.search_box.style.color="black";},search_box_blur_cb:function(ev,obj)
{this.search_box.style.color="gray";_('Search Buddies',this.search_box,'value');},position_results_div:function()
{this.results_div.style.top=YAHOO.util.Dom.getY(this.search_box)-
YAHOO.util.Dom.getY(this.parent)+
this.search_box.offsetHeight+"px";},on_selected:function(name,args,me)
{var buddy=args[2][1];var uid=buddy.account.uid;var proto=buddy.account.proto;var im_conv=imManager.get_conv(uid,proto,buddy.uid);if(!im_conv)
{im_conv=imManager.create_conv(uid,proto,buddy.uid);}
if(ui.surf_mode)
{im_conv.focus();}
else
{im_conv.show();panelManager.focus(im_conv.imp);}},get_buddies:function(sQuery)
{var buddies=[];sQuery=decodeURIComponent(sQuery);var key,buddy;for(key in blistManager.buddies)
{buddy=blistManager.buddies[key];if(buddy.alias.toLowerCase().substring(0,sQuery.length)==sQuery.toLowerCase()&&buddy.primitive!=IMO.Constants.PRIM_OFFLINE)
{buddies.push([buddy.alias,buddy]);}}
return buddies;},init:function()
{ui=IMO.UI.X;blistManager=ui.getModule(IMO.Manager.Blist);imManager=ui.getModule(IMO.Manager.Conv.Im);if(!ui.surf_mode)
{panelManager=ui.getModule(IMO.Manager.Panel);}
var sbid=YAHOO.util.Dom.generateId();var rdid=YAHOO.util.Dom.generateId();this.bs_div=document.createElement("div");YAHOO.util.Dom.addClass(this.bs_div,this.container_class);this.bs_div.innerHTML='<input id="'+sbid+'" '+'class="'+this.sbox_class+'" />'+'<div class="results" id="'+rdid+'"></div>';this.parent.appendChild(this.bs_div);this.search_box=$(sbid);this.results_div=$(rdid);_('Search Buddies',this.search_box,"value");if(!ui.surf_mode)
{this.position_results_div();}
this.data_source=new YAHOO.widget.DS_JSFunction(this.get_buddies);this.data_source.maxCacheEntries=0;this.auto_comp=new YAHOO.widget.AutoComplete(this.search_box,this.results_div,this.data_source);this.auto_comp.queryDelay=0;this.auto_comp.maxCacheEntries=0;this.auto_comp.autoHighlight=true;this.auto_comp.formatResult=this.format_result;this.auto_comp.itemSelectEvent.subscribe(this.on_selected,this,true);this.auto_comp.textboxFocusEvent.subscribe(this.search_box_focus_cb,this,true);this.auto_comp.textboxBlurEvent.subscribe(this.search_box_blur_cb,this,true);}};}());(function(){IMO.Widget.Chooser=function(dom_base)
{this.dom_base=dom_base;this.selected_item=null;this.count=0;this.init();};IMO.Widget.Chooser.prototype={get_selected:function()
{return this.selected_item;},add_item:function(text,src,data)
{var li=document.createElement("li");YAHOO.util.Dom.addClass(li,"choo_li");var img="";if(src)
{img='<img align="top" src="'+src+'" />';}
li.innerHTML=img+'<span>'+text+'</span>';if(data)
{for(key in data)
{li.setAttribute(key,data[key]);}}
this.items_list.appendChild(li);this.count+=1;if(this.selected_item==null)
{this.set_selected_item(li.cloneNode(true));}
YAHOO.util.Event.addListener(li,"click",this.item_selected_cb,li,this);YAHOO.util.Event.addListener(li,"mouseover",this.mouseover_cb,li,this);YAHOO.util.Event.addListener(li,"mouseout",this.mouseout_cb,li,this);},clear:function()
{this.count=0;this.selected_item=null;var children=this.items_list.childNodes;for(var i=children.length-1;i>=0;i--)
{this.items_list.removeChild(children[i]);}},set_selected_item:function(item)
{var children=this.selected_div.childNodes;for(var i=children.length-1;i>=0;i--)
{this.selected_div.removeChild(children[i]);}
var ul=document.createElement("ul");ul.appendChild(item);this.selected_div.appendChild(ul);this.selected_item=item;},item_selected_cb:function(ev,obj)
{this.items_div.style.display="none";var li=obj.cloneNode(true);li.style.background="white";this.set_selected_item(li);},mouseover_cb:function(ev,obj)
{obj.style.background="lightblue";},mouseout_cb:function(ev,obj)
{obj.style.background="white";},dom_mousedown_cb:function(ev,obj)
{var t=YAHOO.util.Event.getTarget(ev);if(t!=this.menu_open&&t!=this.menu_open.firstChild)
{this.items_div.style.display="none";if(YAHOO.env.ua.ie)
{this.dom_base.style.zoom=0;}}},show_hide_items:function(ev,obj)
{var display=this.items_div.style.display;if(display=="")
{this.items_div.style.display="none";if(YAHOO.env.ua.ie==6)
{this.dom_base.style.zoom=0;}}
else
{this.items_div.style.display="";if(YAHOO.env.ua.ie==6)
{this.dom_base.style.zoom=1;}}},init:function()
{var siid=YAHOO.util.Dom.generateId();var moid=YAHOO.util.Dom.generateId();var idid=YAHOO.util.Dom.generateId();var ilid=YAHOO.util.Dom.generateId();this.container=document.createElement("div");this.container.innerHTML='<div id="'+siid+'" class="choo_sel" ></div>'+'<div id="'+moid+'" class="choo_mop" >'+'<img class="btn" src="'+get_img_src('menuopen.gif')+'" /></div>'+'<div id="'+idid+'"class="choo_items" style="display:none">'+'<ul id="'+ilid+'" ></ul></div>'+'<div style="clear:both"></div>';this.dom_base.appendChild(this.container);this.menu_open=$(moid);this.selected_div=$(siid);this.items_div=$(idid);this.items_list=$(ilid);this.items_div.style.top=YAHOO.util.Dom.getY(this.selected_div)-
YAHOO.util.Dom.getY(this.dom_base)+
this.selected_div.offsetHeight+"px";YAHOO.util.Event.addListener(this.menu_open,"mousedown",this.show_hide_items,this,true);YAHOO.util.Event.addListener(document,"click",this.dom_mousedown_cb,this,true);}};}());(function(){var ui;var ajax;var accountManager;var soundManager;var notificationManager;var prefManager;var monitor;var env=IMO.env;IMO.Widget.LoginConsole=function(dom_base)
{this.dom_base=dom_base;this.mdiv=null;this.uid=null;this.passwd=null;this.error=null;this.remember_cbox=null;this.sound_control=null;this.undo=null
this.proto_aim=null;this.proto_yahoo=null;this.proto_msn=null;this.proto_gtalk=null;this.proto_skype=null;this.init();};IMO.Widget.LoginConsole.prototype={NAME:"IMO.Widget.LoginConsole",REMEMBER_TIME:7,bad_passwd_cb:function(type,args,me)
{accountManager.ev_signed_on.unsubscribe(this.signed_on_cb,this);this.display_err(_("Incorrect username and/or password."));},signed_on_cb:function(type,args,me)
{accountManager.ev_signed_on.unsubscribe(this.signed_on_cb,this);if(this.remember_cbox.checked&&(!ui.surf_mode||!ui.facebook))
{this._do_remember_me();}
else
{createCookie(IMO.Constants.COOKIE_FAST_LOGIN,ui.ssid+":0",0);}},signon_cb:function(ev,obj)
{if(ev.type=="keypress"&&ev.keyCode!=13)
{return;}
var proto="";if(this.proto_aim.checked)
{proto=IMO.Constants.PROTO_AIM;}
else if(this.proto_yahoo.checked)
{proto=IMO.Constants.PROTO_YAHOO;}
else if(this.proto_msn.checked)
{proto=IMO.Constants.PROTO_MSN;}
else if(this.proto_gtalk.checked)
{proto=IMO.Constants.PROTO_GTALK;}
else if(this.proto_skype.checked)
{proto=IMO.Constants.PROTO_SKYPE;}
else if(this.proto_myspace.checked)
{proto=IMO.Constants.PROTO_MYSPACE;}
var err_msg="";if(!this.uid.value)
{this.display_err(_("Please enter a username."));return;}
else if(!this.passwd.value)
{this.display_err(_("Please enter a password."));return;}
else if(!proto)
{this.display_err(_("Please select a protocol."));return;}
this.error.style.display="none";accountManager.signon(this.uid.value,proto,this.passwd.value);this.passwd.value="";createCookie(IMO.Constants.COOKIE_PROTO,proto,7);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);},display_err:function(msg)
{this.error.innerHTML=msg;this.error.style.display="";},mute_pref_cb:function(name,args,me)
{var setting=args[0].mute?"off":"on";if(setting!=this.sound_control.getAttribute("sound"))
{this._sound_cb();}},sound_cb:function(ev,obj)
{var mute=prefManager.prefs.mute?false:true;prefManager.setPrefs({'mute':mute});},_sound_cb:function(ev,obj)
{if(this.sound_control.getAttribute("sound")=="on")
{soundManager.set_mute(true);this.sound_control.setAttribute("sound","off");this.sound_control.src=get_img_src("sound_off.png");}
else
{soundManager.set_mute(false);this.sound_control.setAttribute("sound","on");this.sound_control.src=get_img_src("sound_on.png");}},_add_protocol:function(proto,colspan)
{colspanattr=''
if(colspan)
colspanattr=' colspan="'+colspan+'"';return'<td'+colspanattr+'>'+'<input id="'+proto+'" name="proto" type="radio"/>'+'<img align="top" onload="fixPng(this)" src="'+
get_proto_icon(proto)+'"/>'+'<span class="proto_label">'+get_proto_name(proto)+'</span></td>';},_undo:function()
{var account=accountManager.get_any_account();if(account==null)
{return;}
eraseCookie(IMO.Constants.COOKIE_FAST_LOGIN);createCookie(IMO.Constants.COOKIE_FAST_LOGIN,ui.ssid+":0",0);ajax.exec("remember_me",JSON.encode({"uid":account.uid,"proto":account.proto,"ssid":ui.ssid,"val":false}));var msg=_('You will no longer stay signed into this computer.');notificationManager.notify(msg,notificationManager.INFO,30000);},_do_remember_me:function()
{var account=accountManager.get_any_account();if(account==null)
{return;}
createCookie(IMO.Constants.COOKIE_FAST_LOGIN,ui.ssid+":1",this.REMEMBER_TIME);var signoff_text=_('sign off all');if(ui.surf_mode)
{signoff_text=_('Sign off');}
var msg='<div style="width:300px;text-align:left">'+
_('You will stay signed into this computer '+'until you click "[BUTTON]".',function(s){return sprintf(s,{'[BUTTON]':signoff_text});})+' <span id="undo_remember" class="action">'+
_('Undo')+'</span></div>';if(env.os=="windows"&&(!ui.surf_mode||!ui.client_mode))
{msg+='<div style="padding-top: 1em;text-align:left">'+
_('You may want to [LINK]download '+'imo.im for Windows.[/LINK]',function(s){return sprintf(s,{'[LINK]':'<a target="_blank" '+'href="/download.html">','[/LINK]':'</a> '})})+'</div>';}
ajax.exec("remember_me",JSON.encode({"uid":account.uid,"proto":account.proto,"ssid":ui.ssid,"val":true}));notificationManager.notify(msg,notificationManager.INFO,30000);YAHOO.util.Event.removeListener(this.undo,"click",this.undo_cb);this.undo=$("undo_remember");YAHOO.util.Event.addListener(this.undo,"click",this.undo_cb,this,true);},undo_cb:function(ev,obj)
{this.remember_cbox.checked=false;this._undo();},remember_cb:function(ev,obj)
{if(accountManager.get_online_accounts().length==0)
{return;}
if(this.remember_cbox.checked)
{this._do_remember_me();}
else
{this._undo();}},default_proto:function()
{var proto=readCookie(IMO.Constants.COOKIE_PROTO);if(proto==IMO.Constants.PROTO_MSN)
{this.proto_msn.checked=true;}
else if(proto==IMO.Constants.PROTO_GTALK)
{this.proto_gtalk.checked=true;}
else if(proto==IMO.Constants.PROTO_YAHOO)
{this.proto_yahoo.checked=true;}
else if(proto==IMO.Constants.PROTO_AIM)
{this.proto_aim.checked=true;}
else if(proto==IMO.Constants.PROTO_SKYPE)
{this.proto_skype.checked=true;}},get_mdiv:function()
{return this.mdiv;},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);soundManager=ui.getModule(IMO.Manager.Sound);notificationManager=ui.getModule(IMO.Manager.Notification);prefManager=ui.getModule(IMO.Manager.Preference);monitor=ui.getModule(IMO.Manager.Monitor);this.mdiv=document.createElement("div");this.mdiv.id="signon_box";YAHOO.util.Dom.addClass(this.mdiv,"signon_box");var remember_me_html='';if(!ui.surf_mode||!ui.facebook)
{remember_me_html='<tr>'+'<td>'+'</td>'+'<td class="rememberme">'+'<input type="checkbox" id="rememberme" />'+'<span>'+
_('Remember me')+'</span>'+'</td>'+'</tr>';}
this.mdiv.innerHTML=''+'<table>'+'<tr>'+'<td>'+
_('Username')+':</td>'+'<td><input type="text" id="uid" name="uid" '+'autocomplete="off" value=""/></td>'+'</tr>'+'<tr>'+'<td>'+
_('Password')+':</td>'+'<td><input type="password" id="passwd" name="passwd" '+'autocomplete="off" value=""/></td>'+'</tr>'+
remember_me_html+'</table><table>'+'<tr>'+
this._add_protocol(IMO.Constants.PROTO_MSN)+
this._add_protocol(IMO.Constants.PROTO_YAHOO)+'</tr>'+'<tr>'+
this._add_protocol(IMO.Constants.PROTO_AIM)+
this._add_protocol(IMO.Constants.PROTO_GTALK)+'</tr>'+'<tr>'+
this._add_protocol(IMO.Constants.PROTO_MYSPACE)+
this._add_protocol(IMO.Constants.PROTO_SKYPE)+'</tr>'+'<tr>'+'<td><span class="sound_control">'+'<img id="sound_control" onload="fixPng(this)" sound="on" '+'style="cursor:pointer" '+'src="'+get_img_src("sound_on.png")+'" /></span></td>'+'<td align="right"><button id="signon" '+'name="signon">'+_('sign on')+'</button></td>'+'</tr>'+'</table>'+'<div id="signon_error" style="display:none; color:red"></div>';if(!ui.surf_mode)
{document.body.appendChild(this.mdiv);}
else
{this.dom_base.appendChild(this.mdiv);var dummy=document.createElement("div");dummy.style.clear="both";this.dom_base.appendChild(dummy);}
if(YAHOO.env.ua.ie)
this.mdiv.style.width=this.mdiv.offsetWidth+"px";Nifty("div#"+this.mdiv.id,"transparent");this.uid=$("uid");this.uid.focus();this.passwd=$("passwd");this.error=$("signon_error");this.proto_aim=$(IMO.Constants.PROTO_AIM);this.proto_yahoo=$(IMO.Constants.PROTO_YAHOO);this.proto_msn=$(IMO.Constants.PROTO_MSN);this.proto_gtalk=$(IMO.Constants.PROTO_GTALK);this.proto_skype=$(IMO.Constants.PROTO_SKYPE);this.proto_myspace=$(IMO.Constants.PROTO_MYSPACE);this.default_proto();if(!ui.surf_mode||!ui.facebook)
{this.remember_cbox=$("rememberme");var fast_ssid=readCookie(IMO.Constants.COOKIE_FAST_LOGIN);if(fast_ssid&&fast_ssid.split(":")[1]=="1")
{createCookie(IMO.Constants.COOKIE_FAST_LOGIN,ui.ssid+":1",this.REMEMBER_TIME);this.remember_cbox.checked=true;}
YAHOO.util.Event.addListener(this.remember_cbox,"click",this.remember_cb,this,true);}
YAHOO.util.Event.addListener(this.passwd,"keypress",this.signon_cb,this,true);YAHOO.util.Event.addListener($("signon"),"click",this.signon_cb,this,true);this.sound_control=$("sound_control");YAHOO.util.Event.addListener(this.sound_control,"click",this.sound_cb,this,true);accountManager.ev_bad_passwd.subscribe(this.bad_passwd_cb,this,true);prefManager.subscribeToPref("mute",this.mute_pref_cb,this,true);}};}());(function(){var ui;var ajax;var accountManager;var notificationManager;var panelManager;var monitor;var loginConsole;IMO.Widget.AccountConsole=function(dom_base)
{this.mdiv=null;this.acc_tbody=null;this.linkbtn=null;this.lp=null;this.lptb=null;this.lperror=null;this.visible=false;this.accounts={};this.dom_base=dom_base;this.init();};IMO.Widget.AccountConsole.prototype={NAME:"IMO.Widget.AccountConsole",SIGNED_OFF:-1,SIGNING_OFF:0,SIGNING_ON:1,SIGNED_ON:2,hide_show_linkbtn:function()
{var display=accountManager.get_online_accounts().length>1?"":"none";this.linkbtn.style.display=display;},signing_on_cb:function(name,args,me)
{var uid=args[0];var proto=args[1];this.show();if(!this.accounts[__(uid,proto)])
{this.mdiv.style.display="";this.add_account(uid,proto,this.SIGNING_ON);}
else
{this.update_account(uid,proto,this.SIGNING_ON,false);}},signed_on_cb:function(name,args,me)
{var uid=args[0];var proto=args[1];this.update_account(uid,proto,this.SIGNED_ON,false);},signing_off_cb:function(name,args,me)
{var uid=args[0];var proto=args[1];this.update_account(uid,proto,this.SIGNING_OFF,false);},signed_off_cb:function(name,args,me)
{var uid=args[0];var proto=args[1];this.update_account(uid,proto,this.SIGNED_OFF,false);},bad_passwd_cb:function(name,args,me)
{YAHOO.log("console bad password:"+args[0]+":"+args[1]);var uid=args[0];var proto=args[1];var key=__(uid,proto);var account=this.accounts[key];account.aptr.parentNode.removeChild(account.aptr);delete this.accounts[key];if(accountManager.get_online_accounts().length==0)
{this.mdiv.style.display="none";}},link_cb:function(name,args,me)
{YAHOO.log("console link:"+args[0]+":"+args[1]);var uid=args[0];var proto=args[1];var autologin=args[2];if(!this.accounts[__(uid,proto)])
{if(autologin==1)
{this.add_account(uid,proto,this.SIGNING_ON);}
else
{this.add_account(uid,proto,this.SIGNED_OFF);}}
else
{}},add_account:function(uid,proto,state,link)
{if(state==this.SIGNING_ON)
{var tr=document.createElement("tr");var td_wait=document.createElement("td");td_wait.innerHTML='<img align="top" src="'+
get_img_src('wait.gif')+'" />';var td_proto=document.createElement("td");var img=document.createElement("img");img.setAttribute("align","top");img.onload=function(){fixPng(img)};img.src=get_proto_icon(get_iproto(uid,proto));td_proto.appendChild(img);var td_uid=document.createElement("td");td_uid.innerHTML='<span class="account_uid">'+uid+'</span>';tr.appendChild(td_wait);tr.appendChild(td_proto);tr.appendChild(td_uid);this.acc_tbody.appendChild(tr);this.accounts[__(uid,proto)]={"aptr":tr,"lptr":null};}
else if(state==this.SIGNED_OFF)
{}},update_account:function(uid,proto,state,link)
{var account=this.accounts[__(uid,proto)];if(!account)
{return;}
var tr=account.aptr;if(state==this.SIGNED_ON)
{var alias=accountManager.get_account(uid,proto).alias;var display_name=html_encode(alias?alias:uid);tr.lastChild.innerHTML=display_name;var td_cb=document.createElement("td");var id=YAHOO.util.Dom.generateId();td_cb.innerHTML='<input id="'+id+'" type="checkbox" '+'checked="checked" uid="'+uid+'" proto="'+proto+'"/>';tr.replaceChild(td_cb,tr.firstChild);YAHOO.util.Event.addListener(id,"click",this.cbox_click_cb,this,true);var ltr=document.createElement("tr");var td_lcb=document.createElement("td");td_lcb.innerHTML='<input type="checkbox" checked="checked" '+'uid="'+uid+'" proto="'+proto+'"/>';var td_proto=document.createElement("td");var img=document.createElement("img");img.setAttribute("align","top");img.onload=function(){fixPng(img)};img.src=get_proto_icon(get_iproto(uid,proto));td_proto.appendChild(img);var td_uid=document.createElement("td");td_uid.innerHTML='<span class="account_uid">'+
display_name+'</span>';ltr.appendChild(td_lcb);ltr.appendChild(td_proto);ltr.appendChild(td_uid);this.lptb.appendChild(ltr);account.lptr=ltr;this.hide_show_linkbtn();}
else if(state==this.SIGNING_ON||state==this.SIGNING_OFF)
{var td_wait=document.createElement("td");td_wait.innerHTML='<img align="top" src="'
+get_img_src('wait.gif')+'" />';tr.replaceChild(td_wait,tr.firstChild);}
else if(state==this.SIGNED_OFF)
{var td_cb=document.createElement("td");var id=YAHOO.util.Dom.generateId();td_cb.innerHTML='<input id="'+id+'" type="checkbox" '+'uid="'+uid+'" proto="'+proto+'"/>';tr.replaceChild(td_cb,tr.firstChild);YAHOO.util.Event.addListener(id,"click",this.cbox_click_cb,this,true);var ltr=account.lptr;if(ltr)
{ltr.parentNode.removeChild(ltr);}
account.lptr=null;var displaying_lp=false;if(ui.surf_mode)
{displaying_lp=this.lp.style.display=="";}
else
{displaying_lp=this.lp.cfg.getProperty("visible")==true;}
if(this.lptb.childNodes.length<2&&displaying_lp)
{cancel_link_cb();notificationManager.notify(_("You need at least 2 online "+"accounts in order to link accounts."));}
this.hide_show_linkbtn();}},cbox_click_cb:function(ev,obj)
{var cbox=YAHOO.util.Event.getTarget(ev);var uid=cbox.getAttribute("uid");var proto=cbox.getAttribute("proto");if(cbox.checked==true)
{accountManager.signon(uid,proto,null);}
else
{accountManager.signoff(uid,proto);}},show_link_panel:function(ev,obj)
{var length=this.lptb.childNodes.length;for(var i=0;i<length;i++)
{this.lptb.childNodes[i].firstChild.firstChild.checked="checked";}
this.lperror.style.display="none";if(!ui.surf_mode)
{this.lp.cfg.setProperty("fixedcenter",true);this.lp.cfg.setProperty("constraintoviewport",true);this.lp.show();panelManager.focus(this.lp);}
else
{this.lp.style.display="";}
var link_event="js.link_accounts";if(ui.surf_mode)
{link_event="js.surf.link_accounts";}
monitor.log_event(link_event);},hide_link_panel:function()
{if(!ui.surf_mode)
{this.lp.hide();this.lp.cfg.setProperty("fixedcenter",false);this.lp.cfg.setProperty("constraintoviewport",false);this.lp.cfg.setProperty("xy",[-5000,-5000]);}
else
{this.lp.style.display="none";}},link_accounts_cb:function(ev,obj)
{var count=0;var linked_accounts=[];var cbox,uid,proto,link;var length=this.lptb.childNodes.length;for(var i=0;i<length;i++)
{cbox=this.lptb.childNodes[i].firstChild.firstChild;uid=cbox.getAttribute("uid");proto=cbox.getAttribute("proto");link=0;if(cbox.checked==true)
{link=1;count+=1;}
linked_accounts.push({"uid":uid,"proto":proto,"autologin":1,"link":link});}
if(count<2)
{this.lperror.style.display="";return;}
this.lperror.style.display="none";ajax.exec("link_accounts",JSON.encode({"uid":uid,"proto":proto,"ssid":ui.ssid,"accounts":linked_accounts}));this.hide_link_panel();},cancel_link_cb:function(ev,obj)
{this.hide_link_panel();},unlink_accounts_cb:function(ev,obj)
{var ua=[]
var accounts=accountManager.get_online_accounts();for(var i=0;i<accounts.length;i++)
{account=accounts[i];ua.push({"uid":account.uid,"proto":account.proto});}
ajax.exec("unlink_accounts",JSON.encode({"ssid":ui.ssid,"uid":account.uid,"proto":account.proto,"accounts":ua}));this.hide_link_panel();},create_link_panel:function()
{var config={width:"300px",height:"275px",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:false,maximize:false,close:false,resizable:false,layout:{},fixWindowResize:true};if(!ui.surf_mode)
{this.lp=new IMO.Widget.BasePanel("link_panel",config);this.lp.setTitle(_("Link Accounts"));this.lp.setBody("");this.lp.setFooter("&nbsp;");this.lp.render(document.body);this.hide_link_panel();}
else
{this.lp=document.createElement("div");this.lp.id="link_accounts";YAHOO.util.Dom.addClass(this.lp,"link_panel");this.lp.style.display="none";this.dom_base.appendChild(this.lp);}
var lid=YAHOO.util.Dom.generateId();var ubid=YAHOO.util.Dom.generateId();var cid=YAHOO.util.Dom.generateId();var tid=YAHOO.util.Dom.generateId();var eid=YAHOO.util.Dom.generateId();if(!ui.surf_mode)
{this.lp.north.innerHTML='<div style="padding: .5em"><span>'+
_('Link your accounts to enable single sign on.')+'</span></div>'+'<div style="height:145px; margin:.5em 0 .5em; '+'overflow:auto;">'+'<table><tbody id="'+tid+'"></tbody></table></div>'+'<div id="'+eid+'" style="padding: .5em; '+'display:none">'+'<span class="error">'+
_('You must link at least 2 accounts.')+'</span></div>'+'<div style="position:absolute; bottom:0pt; '+'left:0pt; padding:.5em">'+'<button id="'+ubid+'"> '+
_('Unlink all accounts')+'</button></div>'+'<div style="position:absolute; bottom:0pt; '+'right:0pt; padding:.5em;">'+'<button id="'+lid+'" style="margin-right:.25em">'+
_('Link')+'</button><button id="'+cid+'">'+
_('Cancel')+'</button></div>';}
else
{this.lp.innerHTML='<div style="padding: .5em">'+'<span style="font-weight:bold">'+
_('Link accounts to enable single sign on.')+'</span></div>'+'<div style="margin:.5em 0 .5em; overflow:auto;">'+'<table><tbody id="'+tid+'"></tbody></table>'+'</div>'+'<div id="'+eid+'" style="padding: .5em; display:none">'+'<span class="error">'+
_('You must link at least 2 accounts.')+'</span></div>'+'<div style="text-align:right; padding:.5em;">'+'<button id="'+lid+'" style="margin-right:.25em">'+
_('Link')+'</button><button id="'+cid+'">'+_('Cancel')+'</button></div>'+'<div style="text-align:left; padding:.5em">'+'<button id="'+ubid+'">'+
_('Unlink all accounts')+'</button></div>';}
this.lptb=$(tid);this.lperror=$(eid);if(ui.surf_mode)
{Nifty("div#"+this.lp.id,"transparent");}
YAHOO.util.Event.addListener(lid,"click",this.link_accounts_cb,this,true);YAHOO.util.Event.addListener(cid,"click",this.cancel_link_cb,this,true);YAHOO.util.Event.addListener(ubid,"click",this.unlink_accounts_cb,this,true);},show:function()
{if(this.visible)
{return;}
this.visible=true;this.mdiv=document.createElement("div");this.mdiv.id="accounts_console";YAHOO.util.Dom.addClass(this.mdiv,"accounts_console");var title=document.createElement("span");title.innerHTML='<span style="font-weight:bold">'+
_('Accounts')+'</span>';YAHOO.util.Dom.addClass(title,"accounts_title");if(!ui.surf_mode)
{var signoff=document.createElement("button");signoff.innerHTML=_("sign off all");YAHOO.util.Dom.addClass(signoff,"accounts_signoff");}
this.linkbtn=document.createElement("button");this.linkbtn.innerHTML=_("link accounts");this.linkbtn.style.display="none";YAHOO.util.Dom.addClass(this.linkbtn,"accounts_linkbtn");var idiv=document.createElement("div");YAHOO.util.Dom.addClass(idiv,"accounts_info");idiv.appendChild(title);if(!ui.surf_mode)
{idiv.appendChild(signoff);}
idiv.appendChild(this.linkbtn);this.mdiv.appendChild(idiv);var acc_table=document.createElement("table");YAHOO.util.Dom.addClass(acc_table,"accounts_table");this.acc_tbody=document.createElement("tbody");acc_table.appendChild(this.acc_tbody);this.mdiv.appendChild(acc_table);if(!ui.surf_mode)
{document.body.appendChild(this.mdiv);}
else
{this.dom_base.appendChild(this.mdiv);}
this.mdiv.appendChild(acc_table);var login_console_mdiv=loginConsole.get_mdiv();var xy=YAHOO.util.Dom.getXY(login_console_mdiv);YAHOO.util.Dom.setXY(this.mdiv,[xy[0],xy[1]+login_console_mdiv.offsetHeight]);this.mdiv.style.marginTop="2em";Nifty("div#"+this.mdiv.id,"transparent");this.create_link_panel();if(!ui.surf_mode)
{YAHOO.util.Event.addListener(signoff,"click",accountManager.signoff_all_cb,accountManager,true);}
YAHOO.util.Event.addListener(this.linkbtn,"click",this.show_link_panel,this,true);},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);notificationManager=ui.getModule(IMO.Manager.Notification);monitor=ui.getModule(IMO.Manager.Monitor);loginConsole=ui.getWidget(IMO.Widget.LoginConsole);if(!ui.surf_mode)
{panelManager=ui.getModule(IMO.Manager.Panel);}
accountManager.ev_signing_on.subscribe(this.signing_on_cb,this,true);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);accountManager.ev_signing_off.subscribe(this.signing_off_cb,this,true);accountManager.ev_signed_off.subscribe(this.signed_off_cb,this,true);accountManager.ev_bad_passwd.subscribe(this.bad_passwd_cb,this,true);accountManager.ev_link.subscribe(this.link_cb,this,true);}};}());(function(){var ui;var notificationManager;IMO.Widget.SystemConsole=function(dom_base)
{this.dom_base=dom_base;this.timer=null;this.init();};IMO.Widget.SystemConsole.prototype={NAME:"IMO.Widget.SystemConsole",MSG_TIMEOUT:15000,clear_msg:function()
{if(ui.surf_mode)
{sdiv.style.display="none";}
msgs_div.innerHTML='';this.timer=null;},display_msg:function(msg,time)
{if(this.timer!=null)
{this.timer.cancel();}
if(ui.surf_mode)
{sdiv.style.display="";}
msgs_div.style.background="#99FFCC";msgs_div.innerHTML='<div class="sys_msg">'+msg+'</div>';Nifty("div#"+msgs_div.id,"transparent");time=typeof(time)!="undefined"?time:this.MSG_TIMEOUT;if(time!=0)
{this.timer=YAHOO.lang.later(time,this,this.clear_msg,[]);}},display_warning:function(msg,time)
{if(this.timer!=null)
{this.timer.cancel();this.timer=null;}
if(ui.surf_mode)
{sdiv.style.display="";}
msgs_div.style.background="orange";msgs_div.innerHTML='<div class="sys_msg">'+msg+'</div>';Nifty("div#"+msgs_div.id,"transparent");if(time)
{this.timer=YAHOO.lang.later(time,this,this.clear_msg,this.MSG_TIMEOUT);}},display_err:function(msg,time)
{if(this.timer!=null)
{this.timer.cancel();this.timer=null;}
if(ui.surf_mode)
{sdiv.style.display="";}
msgs_div.style.background="red";msgs_div.innerHTML='<div class="sys_msg">'+msg+'</div>';Nifty("div#"+msgs_div.id,"transparent");if(time&&time>0)
{this.timer=YAHOO.lang.later(time,this,this.clear_msg,this.MSG_TIMEOUT);}},displayMsgCb:function(type,args,me)
{msg=args[0];time=args[1];this.display_msg(msg,time);},displayWarningCb:function(type,args,me)
{msg=args[0];time=args[1];this.display_warning(msg,time);},displayErrorCb:function(type,args,me)
{msg=args[0];time=args[1];this.display_err(msg,time);},init:function()
{ui=IMO.UI.X;notificationManager=ui.getModule(IMO.Manager.Notification);sdiv=document.createElement("div");if(ui.surf_mode)
{YAHOO.util.Dom.addClass(sdiv,"sys_div");sdiv.setAttribute("align","center");}
else
{sdiv.style.position="absolute";sdiv.style.width="100%";}
var mid=YAHOO.util.Dom.generateId();if(ui.surf_mode)
{sdiv.innerHTML='<table cellspacing=0 cellpadding=0><tbody>'+'<tr><td>'+'<div id="'+mid+'" class="sys_msgs"></div>'+'</td></tr>'+'</tbody></table>';}
else
{sdiv.innerHTML='<div align="center">'+'<table cellspacing=0 cellpadding=0><tbody>'+'<tr><td>'+'<div id="'+mid+'" class="sys_msgs"></div>'+'</td></tr>'+'</tbody></table></div>';}
if(ui.surf_mode)
{this.dom_base.appendChild(sdiv);}
else
{document.body.insertBefore(sdiv,$("logo"));}
msgs_div=$(mid);notificationManager.eventInfo.subscribe(this.displayMsgCb,this,true);notificationManager.eventWarning.subscribe(this.displayWarningCb,this,true);notificationManager.eventError.subscribe(this.displayErrorCb,this,true);notificationManager.eventClear.subscribe(this.clear_msg,this,true);}};}());(function(){var me;var accountManager;var awayManager;var prefManager;var notificationManager;IMO.Widget.StatusConsole=function(parent)
{me=this;this.parent=parent;this.prim=IMO.Constants.PRIM_AVAILABLE;this.old_prim=IMO.Constants.PRIM_AVAILABLE;this.status="";this.old_status="";this.no_ad_status="";this.saved_statuses=[];this.init();};IMO.Widget.StatusConsole.prototype={NAME:"IMO.Widget.StatusConsole",edit_status_text:function(ev,obj)
{this.show_div.style.display="none";this.saved_div.style.display="none";this.edit_div.style.display="";this.mopen_div.style.display="none";this.text_input.select();this.text_input.focus();},set_status_text_cb:function(ev,obj)
{if(ev.keyCode==13||ev.type=="blur")
{YAHOO.util.Event.preventDefault(ev);this.edit_div.style.display="none";this.show_div.style.display="";this.mopen_div.style.display="";this.text_input.value=trim_string(this.text_input.value);prefManager.setPrefs({'currentStatus':this.text_input.value});}},saved_status_cb:function(ev,obj)
{var status="";var prim=obj.getAttribute("prim");me.saved_div.style.display="none";if(obj!=me.available_div&&obj!=me.busy_div&&obj!=me.invisible_div)
{status=obj.lastChild.innerHTML;}
prefManager.setPrefs({'currentStatus':status,'currentPrim':prim});},set_status_prim:function(status,prim)
{status=trim_string(status);this.no_ad_status=status;if(prefManager.prefs.imoStatus&&!status.match(/imo\.im/))
{var ad=_('on https://imo.im',false);if(status.length){status+=" -- "+ad;}
else{status=ad;}}
if(status.length>0)
{this.status_set_div.innerHTML=status;this.status_set_div.style.display="";this.status_unset_div.style.display="none";}
else
{this.status_set_div.style.display="none";this.status_unset_div.style.display="";}
if(prim==IMO.Constants.PRIM_AVAILABLE)
{this.prim_div.setAttribute("src",get_img_src("jabber_available.png"));}
else if(prim==IMO.Constants.PRIM_BUSY)
{this.prim_div.setAttribute("src",get_img_src("jabber_busy.png"));}
else if(prim==IMO.Constants.PRIM_AWAY)
{this.prim_div.setAttribute("src",get_img_src("jabber_away.png"));}
else if(prim==IMO.Constants.PRIM_INVISIBLE)
{this.prim_div.setAttribute("src",get_img_src("jabber_offline.png"));}
if(prim==this.prim&&status==this.status)
{YAHOO.log("nothing changed");return;}
this.prim=prim;this.status=status;this.text_input.value=this.no_ad_status;accountManager.set_status_prim(status,prim);},mouseover_cb:function(ev,obj)
{obj.style.background="lightblue";},mouseout_cb:function(ev,obj)
{obj.style.background="";},show_saved_status:function(ev,obj)
{this.saved_div.style.display=this.saved_div.style.display==""?"none":"";},save_status:function(status)
{if(status.length==0)
{return;}
status=html_encode(status)
var st;for(var i=0;i<this.saved_statuses.length;i++)
{st=this.saved_statuses[i];if(st==status)
{this.saved_statuses.splice(i,1);break;}}
this.saved_statuses.unshift(status);if(this.saved_statuses.length>4)
{this.saved_statuses.splice(4);}
prefManager.setPrefs({'savedStatuses':this.saved_statuses});},_show_saved_statuses:function()
{while(this.available_div.nextSibling!=this.busy_div)
{this.saved_div.removeChild(this.available_div.nextSibling);this.saved_div.removeChild(this.busy_div.nextSibling);}
while(this.invisible_div.nextSibling!=null)
{this.saved_div.removeChild(this.invisible_div.nextSibling);}
if(!this.saved_statuses.length)
{return;}
var div;for(var i=this.saved_statuses.length-1;i>=0;i--)
{st=this.saved_statuses[i];div=document.createElement("div");div.setAttribute("prim",IMO.Constants.PRIM_AVAILABLE);div.innerHTML='<img align="top" '+'src="'+get_img_src('jabber_available.gif')+'"/><span>'+st+'</span>';this.saved_div.insertBefore(div,this.available_div.nextSibling);this.add_saved_status_cbs(div);div=document.createElement("div");div.setAttribute("prim",IMO.Constants.PRIM_BUSY);div.innerHTML='<img align="top" '+'src="'+get_img_src('jabber_busy.gif')+'"/><span>'+st+'</span>';this.saved_div.insertBefore(div,this.busy_div.nextSibling);this.add_saved_status_cbs(div);}
div=document.createElement("div");div.innerHTML='<hr size="1" noshade="true" />';this.saved_div.insertBefore(div,this.busy_div);div=document.createElement("div");div.innerHTML='<hr size="1" noshade="true" />';this.saved_div.insertBefore(div,this.invisible_div);div=document.createElement("div");div.innerHTML='<hr size="1" noshade="true"/>';this.saved_div.appendChild(div);div=document.createElement("div");div.innerHTML='<span>'+_('Clear saved status messages')+'</span>';this.saved_div.appendChild(div);this.add_saved_status_cbs(div,true);},add_saved_status_cbs:function(el,clear)
{if(clear)
{fn=this.clear_statuses_cb;}
else
{fn=this.saved_status_cb;}
YAHOO.util.Event.addListener(el,"click",fn,el,true);YAHOO.util.Event.addListener(el,"mouseover",this.mouseover_cb,el,true);YAHOO.util.Event.addListener(el,"mouseout",this.mouseout_cb,el,true);},clear_statuses_cb:function()
{me.saved_statuses=[];while(me.available_div.nextSibling!=me.busy_div)
{me.saved_div.removeChild(me.available_div.nextSibling);me.saved_div.removeChild(me.busy_div.nextSibling);}
if(me.invisible_div.nextSibling!=null)
{me.saved_div.removeChild(me.invisible_div.nextSibling);}
me.saved_div.style.display="none";me.text_input.value="";prefManager.setPrefs({'currentStatus':me.text_input.value,'currentPrim':me.prim,'savedStatuses':[]});},imo_status_click_cb:function()
{var imoStatus=this.advertise_check.checked;if(imoStatus&&!('imoStatus'in prefManager.prefs))
{notificationManager.notify(_('We\'ve added [PHRASE] to your '+'status. Thanks for helping us grow!',function(s){return sprintf(s,{'[PHRASE]':'"'+_('on https://imo.im',false)
+'"'});}),notificationManager.INFO,10000);}
prefManager.setPrefs({'imoStatus':imoStatus});},status_pref_cb:function(name,args,obj){var prefs=args[0];if(prefs.currentStatus!=this.no_ad_status)
{var prim=this.prim;if('currentPrim'in prefs)
{prim=prefs.currentPrim;}
this.set_status_prim(prefs.currentStatus,prim);this.save_status(prefs.currentStatus);}},prim_pref_cb:function(name,args,obj){var prefs=args[0];if(prefs.currentPrim!=this.prim)
{var status=this.no_ad_status;if('currentStatus'in prefs)
{status=prefs.currentStatus;}
this.set_status_prim(status,prefs.currentPrim);this.save_status(status);}},saved_statuses_pref_cb:function(name,args,obj){var prefs=args[0];this.saved_statuses=prefs.savedStatuses.slice();this._show_saved_statuses();},imo_status_pref_cb:function(name,args,obj){var imoStatus=args[0].imoStatus;this.set_status_prim(this.no_ad_status,this.prim);this.advertise_check.checked=imoStatus;},away_cb:function(name,args,me)
{if(this.prim!=IMO.Constants.PRIM_INVISIBLE){this.set_status_prim(this.no_ad_status,IMO.Constants.PRIM_AWAY);}},active_cb:function(name,args,me)
{this.set_status_prim(this.no_ad_status,args[0]);},init:function()
{var ui=IMO.UI.X;awayManager=ui.getModule(IMO.Manager.Away);accountManager=ui.getModule(IMO.Manager.Account);prefManager=ui.getModule(IMO.Manager.Preference);notificationManager=ui.getModule(IMO.Manager.Notification);this.sconsole_div=document.createElement("div");YAHOO.util.Dom.addClass(this.sconsole_div,"st_console");this.sconsole_div.id=YAHOO.util.Dom.generateId();var aid=YAHOO.util.Dom.generateId();var bid=YAHOO.util.Dom.generateId();var invid=YAHOO.util.Dom.generateId();var pid=YAHOO.util.Dom.generateId();var sid=YAHOO.util.Dom.generateId();var eid=YAHOO.util.Dom.generateId();var iid=YAHOO.util.Dom.generateId();var usid=YAHOO.util.Dom.generateId();var stid=YAHOO.util.Dom.generateId();var moid=YAHOO.util.Dom.generateId();var ssid=YAHOO.util.Dom.generateId();var adid=YAHOO.util.Dom.generateId();if(YAHOO.env.ua.gecko)
{var img_style="margin-top:.1em; position:absolute";var padding="1.25em";var wrap="white-space: nowrap"}
else
{img_style="margin-top:.1em";padding=".25em";wrap="";}
this.sconsole_div.innerHTML=''+'<div id="'+sid+'" class="stext">'+'<img id="'+pid+'" align="top" '+'style="'+img_style+'" onload="fixPng(this)" '+'src="'+get_img_src('jabber_available.png')+'" />'+'<span id="'+usid+'" style="padding-left:'+padding+'">'+
_('Set your status here')+'</span>'+'<span id="'+stid+'" style="padding-left:'+padding+'; display:none'+wrap+'">'+'</span></div>'+'<div id="'+moid+'" class="mopen"><img class="btn" '+'src="'+get_img_src('menuopen.gif')+'" /></div>'+'<div id="'+eid+'" style="display:none; float:left">'+'<input id="'+iid+'"style="width:155px;"/></div>'+'<div style="clear:both" ></div>'+'<div id="'+ssid+'" class="saved" style="display:none">'+'<div id="'+aid+'" prim="'+IMO.Constants.PRIM_AVAILABLE+'">'+'<img align="top" src="'+get_img_src('jabber_available.gif')+'"/><span>'+
_('Available')+'</span></div>'+'<div id="'+bid+'" prim="'+IMO.Constants.PRIM_BUSY+'">'+'<img align="top" src="'+get_img_src('jabber_busy.gif')+'"/>'+'<span>'+
_('Busy')+'</span></div>'+'<div id="'+invid+'" prim="'+IMO.Constants.PRIM_INVISIBLE+'">'+'<img align="top" src="'+get_img_src('jabber_offline.gif')+'"/>'+'<span>'+
_('Invisible')+'</span></div>'+'</div>';this.parent.appendChild(this.sconsole_div);var d=document.createElement("div");d.style.clear="both";this.parent.appendChild(d);this.prim_div=$(pid);this.show_div=$(sid);this.status_unset_div=$(usid);this.status_set_div=$(stid);this.mopen_div=$(moid);this.edit_div=$(eid);this.text_input=$(iid);this.saved_div=$(ssid);this.available_div=$(aid);this.busy_div=$(bid);this.invisible_div=$(invid);var div=document.createElement('div');div.innerHTML='<input type="checkbox" id="'+adid+'" '+'style="vertical-align: middle;">'+
_('Tell your friends! Add imo to your status.');this.parent.appendChild(div);this.advertise_check=$(adid);this.add_saved_status_cbs(this.available_div);this.add_saved_status_cbs(this.busy_div);this.add_saved_status_cbs(this.invisible_div);YAHOO.util.Event.addListener(this.show_div,"click",this.edit_status_text,this,true);YAHOO.util.Event.addListener(this.status_set_div,"click",this.edit_status_text,this,true);YAHOO.util.Event.addListener(this.mopen_div,"click",this.show_saved_status,this,true);YAHOO.util.Event.addListener(this.text_input,"keypress",this.set_status_text_cb,this,true);YAHOO.util.Event.addListener(this.text_input,"blur",this.set_status_text_cb,this,true);YAHOO.util.Event.addListener(this.advertise_check,"click",this.imo_status_click_cb,this,true);awayManager.evAway.subscribe(this.away_cb,this,true);awayManager.evActive.subscribe(this.active_cb,this,true);prefManager.subscribeToPref("currentStatus",this.status_pref_cb,this,true);prefManager.subscribeToPref("currentPrim",this.prim_pref_cb,this,true);prefManager.subscribeToPref("imoStatus",this.imo_status_pref_cb,this,true);prefManager.subscribeToPref("savedStatuses",this.saved_statuses_pref_cb,this,true);}};}());(function(){var i18nManager;var prefManager;var i18nAjax;var monitor;var env=IMO.env;var ui;IMO.Widget.NavigationConsole=function()
{this.feedback=new IMO.Widget.Feedback();this.init();};IMO.Widget.NavigationConsole.prototype={NAME:"IMO.Widget.Navigation.Console",feedback_cb:function(ev,obj)
{YAHOO.util.Event.stopEvent(ev);this.feedback.show();},translate_cb:function(ev,obj)
{YAHOO.util.Event.stopEvent(ev);i18nManager.show();monitor.log_event('js.click_translate');},english_cb:function(ev,obj)
{YAHOO.util.Event.stopEvent(ev);prefManager.setPrefs({'lang':'en-US'});monitor.log_event('js.change_lang.english');},second_cb:function(ev,obj)
{YAHOO.util.Event.stopEvent(ev);prefManager.setPrefs({'lang':IMO.i18n.secLang});monitor.log_event('js.change_lang.prediction');},showSelect:function()
{this.langSelect.style.display="";},hideSelect:function()
{this.langSelect.style.display="none";},other_lang_cb:function(ev,obj)
{YAHOO.util.Event.stopEvent(ev);this.showSelect();if(!this.langSelect.options.length){if(IMO.i18n.langData){IMO.i18n.Functions.fillLangChooser(this.langSelect,null);}
else{i18nAjax.exec("getLangData",JSON.encode({}));}}
this.langSelect.selectedIndex=0;this.langSelect.focus();},change_lang_cb:function(ev,obj){var value=this.langSelect.options[this.langSelect.selectedIndex].value;var lang=value?value:"en-US";prefManager.setPrefs({'lang':lang});monitor.log_event('js.change_lang.other');},lang_pref_cb:function(name,args,me){this.setLangIndicator();},lang_data_cb:function(name,args,me)
{this.setLangIndicator();IMO.i18n.Functions.fillLangChooser(this.langSelect,null);},setLangIndicator:function()
{var enId=YAHOO.util.Dom.generateId();var secId=YAHOO.util.Dom.generateId();var otherId=YAHOO.util.Dom.generateId();IMO.i18n.Functions.destroyChildren(this.langDiv);this.langDiv.innerHTML=_('imo.im in [LANGUAGE]',function(s){var langName="";var progressDisplay="";if(IMO.i18n.codeToLang&&IMO.i18n.lang in IMO.i18n.codeToLang&&IMO.i18n.lang!='en-US'){langName=IMO.i18n.codeToLang[IMO.i18n.lang];var progress=IMO.i18n.langData[IMO.i18n.lang].progress;if(progress<IMO.i18n.totalStrings){progressDisplay=' ('+
Math.floor(progress/IMO.i18n.totalStrings*100)+'%)';}}
else{langName='English (US)';}
var rtl="";if(IMO.i18n.lang in IMO.i18n.rtlLangs){rtl=" style='unicode-bidi:embed; direction:rtl;' ";}
return sprintf(s,{'[LANGUAGE]':'<b><span'+rtl+'>'
+langName+progressDisplay+'</span></b>'});});if(IMO.i18n.lang!='en-US'){this.langDiv.innerHTML+='<a href="" id="'+
enId+'">English (US)</a> ';}
if(IMO.i18n.secLang in IMO.i18n.codeToLang&&IMO.i18n.lang!=IMO.i18n.secLang){var progress=IMO.i18n.langData[IMO.i18n.secLang].progress;var progressDisplay="";if(progress<IMO.i18n.totalStrings){progressDisplay=' ('+
Math.floor(progress/IMO.i18n.totalStrings*100)+'%)';}
this.langDiv.innerHTML+='<a href="" id="'+secId+'">'+
IMO.i18n.codeToLang[IMO.i18n.secLang]+'</a>'+progressDisplay;}
this.langDiv.innerHTML+='<a href="" id="'+otherId+'">'+_('Other...')+'</a> ';this.langDiv.appendChild(this.langSelect);this.hideSelect();YAHOO.util.Event.addListener($(enId),"click",this.english_cb,this,true);YAHOO.util.Event.addListener($(secId),"click",this.second_cb,this,true);YAHOO.util.Event.addListener($(otherId),"click",this.other_lang_cb,this,true);},init:function()
{ui=IMO.UI.X;i18nManager=ui.getModule(IMO.Manager.i18n);i18nAjax=ui.getModule(IMO.i18nAjax);monitor=ui.getModule(IMO.Manager.Monitor);prefManager=ui.getModule(IMO.Manager.Preference);ndiv=document.createElement("div");ndiv.setAttribute("align","center");YAHOO.util.Dom.addClass(ndiv,"nav_box");var download="";if(env.os=="windows")
{if(!ui.surf_mode)
{download='<div>'+
_('[LINK]Download[/LINK] imo.im for Windows.',function(s){return sprintf(s,{'[LINK]':'<a target="_blank" href="/download.html">','[/LINK]':'</a> '});})+'</div>';}
else
{download='<div style="padding-bottom:.25em">'+'<span style="color:red">'+
_('New!')+'</span> '+
_('[LINK]Download[/LINK] imo.im for Windows.',function(s){return sprintf(s,{'[LINK]':'<a target="_blank" href="/download.html">','[/LINK]':'</a> '});})+'</div>';}}
var id=YAHOO.util.Dom.generateId();var tid=YAHOO.util.Dom.generateId();var divId=YAHOO.util.Dom.generateId();var translate="";if(!ui.surf_mode){translate='<div><span style="color:red">'+
_('New!')+'</span> '+
_('Help us [LINK]translate imo[/LINK] '+'into [LANGUAGE]!',function(s){if(IMO.i18n.lang!=""&&IMO.i18n.lang!="en-US"&&IMO.i18n.codeToLang&&IMO.i18n.lang in IMO.i18n.codeToLang){var lang=IMO.i18n.codeToLang[IMO.i18n.lang];}
else{var lang='your language';}
return sprintf(s,{'[LINK]':'<a id="'+tid+'" href="">','[/LINK]':'</a> ','[LANGUAGE]':'<span>'+lang+'</span>'});})+'</div>';}
ndiv.innerHTML='<div>'+
_('Send us [LINK]feedback[/LINK]',function(s){return sprintf(s,{'[LINK]':'<a id="'+id+'" href="">','[/LINK]':'</a></div>'});})+
download+translate+'<div class="nav_links" id="'+divId+'">'+'</div>'+'<div class="nav_links">'+'<a target="_blank" href="/about.html">'+_('About')+'</a> '+'<a target="_blank" href="/privacy.html">'+
_('Privacy')+'</a> '+'<a target="_blank" href="/jobs.html">'+_('Jobs')+'</a> '+'<a target="_blank" href="/help.html">'+_('Help')+'</a> '+'<a target="_blank" href="http://imoim.blogspot.com/">'+
_('Blog')+'</a> '+'</div>';document.body.insertBefore(ndiv,$("logo"));this.langSelect=document.createElement('select');this.langSelect.style.marginLeft=".5em";this.hideSelect();this.langDiv=$(divId);i18nAjax.exec("getLangData",JSON.encode({}));YAHOO.util.Event.addListener($(id),"click",this.feedback_cb,this,true);YAHOO.util.Event.addListener($(tid),"click",this.translate_cb,this,true);YAHOO.util.Event.addListener(this.langSelect,"change",this.change_lang_cb,this,true);YAHOO.util.Event.addListener(this.langSelect,"blur",this.hideSelect,this,true);prefManager.subscribeToPref('lang',this.lang_pref_cb,this,true);i18nManager.ev_lang_data.subscribe(this.lang_data_cb,this,true);}};}());(function(){var ui;var ajax;var accountManager;var notificationManager;IMO.Widget.Feedback=function()
{this.fp=null;this.init();};IMO.Widget.Feedback.prototype={NAME:"IMO.Widget.Feedback",create:function()
{var eid=YAHOO.util.Dom.generateId();var mid=YAHOO.util.Dom.generateId();var sid=YAHOO.util.Dom.generateId();var privacy=_('For debugging purposes your feedback '+'will include your username and browser version.');var html='<table style="width:300px; padding-left:.25em">'+'<tr><td>'+_('Your Email')+':</td></tr>'+'<tr><td>'+'<input id="'+eid+'" style="width:99%" '+'value="'+this.guessEmail()+'" />'+'</td></tr>'+'<tr><td>'+_('Message')+':</td></tr>'+'<tr><td>'+'<textarea id="'+mid+'" style="width:99%" rows="7" class="feedback_message">'+'</textarea>'+'</td></tr>'+'<tr><td align="right">'+'<button id="'+sid+'">'+
_('Send')+'</button>'+'</td></tr>'+'<tr><td><span style="font-size:10px">'+
privacy+'</span></td></tr>'+'</table>';if(ui.surf_mode)
{this.itabs=ui.getWidget(IMO.Widget.SurfTabs);this.fp=this.itabs.tabs.AddTab("feedback",_("Feedback"));var div=document.createElement("div");div.style.background="lightblue";div.innerHTML=html;this.fp.body_dom_node.appendChild(div);this.itabs.show_tab("feedback");}
else
{var config={width:"320px",height:"285px",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:false,maximize:false,close:true,resizable:false,fixedcenter:true,layout:{},fixWindowResize:true};this.fp=new IMO.Widget.BasePanel(YAHOO.util.Dom.generateId(),config);this.fp.setTitle(_('Feedback'));this.fp.setBody("");this.fp.setFooter("&nbsp;");this.fp.render(document.body);this.fp.north.innerHTML=html;}
this.email=$(eid);this.message=$(mid);YAHOO.util.Event.addListener(sid,"click",this.send_cb,this,true);},guessEmail:function()
{var email="";for(var key in accountManager.accounts)
{var account=accountManager.accounts[key];var proto=account.proto;if(proto==IMO.Constants.PROTO_AIM)
{return account.uid+"@aim.com";}
else if(proto==IMO.Constants.PROTO_YAHOO)
{return account.uid+"@yahoo.com";}
else
{return account.uid;}}
return email;},show:function()
{if(this.fp==null)
{this.create();}
if(ui.surf_mode)
{this.itabs.show_tab("feedback");}
else
{this.fp.show();}
if(this.email.value=="")
{this.email.value=this.guessEmail();}
if(this.email.value=="")
{this.email.focus();}
else
{this.message.focus();}},send_cb:function(ev,obj)
{var uid="";var proto="";for(var key in accountManager.accounts)
{var account=accountManager.accounts[key];uid=account.uid;proto=account.proto;break;}
if(this.message.value!="")
{ajax.exec("feedback",JSON.encode({"uid":uid,"proto":proto,"ssid":ui.ssid,"email":this.email.value,"ua":navigator.userAgent.toLowerCase(),"version":IMO.Constants.VERSION,"lang":IMO.i18n.lang,"message":this.message.value}));this.message.value="";notificationManager.notify(_("Thanks for the feedback!"),notificationManager.INFO);}
if(ui.surf_mode)
{this.itabs.close_focused_tab();}
else
{this.fp.hide();}},init:function()
{ui=IMO.UI.X;accountManager=ui.getModule(IMO.Manager.Account);notificationManager=ui.getModule(IMO.Manager.Notification);ajax=ui.getModule(IMO.Ajax);}};}());(function(){var ui;var ajax;var blistManager;IMO.Widget.AuthBuddyConsole=function(uid,proto,buid,balias,msg)
{this.uid=uid;this.proto=proto;this.buid=buid;this.balias=balias;this.msg=msg;this.init();};IMO.Widget.AuthBuddyConsole.prototype={show:function()
{this.ap.show();},add_buddy_cb:function(ev,obj)
{var select=this.group_selector.firstChild;var opt=select.options[select.selectedIndex];var group=opt.value;ajax.exec("auth_add",JSON.encode({"ssid":ui.ssid,"uid":this.uid,"proto":this.proto,"buid":this.buid,"alias":this.buid,"group":group}));if(!ui.surf_mode)
{this.ap.hide();this.ap.destroy();}
else
{document.body.removeChild(this.div);}},deny_cb:function(ev,obj)
{ajax.exec("auth_deny",JSON.encode({"ssid":ui.ssid,"uid":this.uid,"proto":this.proto,"buid":this.buid}));if(!ui.surf_mode)
{this.ap.hide();this.ap.destroy();}
else
{document.body.removeChild(this.div);}},populate_group_selector:function()
{var group;var html='<select>';var groups=blistManager.groups;if(groups.length==0||(groups.length==1&&groups[0].name==IMO.Constants.OFFLINE_GROUP))
{groups=[new IMO.Group(_("Buddies",false),[])];}
for(var i=0;i<groups.length;i++)
{group=groups[i];if(group.name==IMO.Constants.OFFLINE_GROUP)
{continue;}
html+='<option value="'+group.name+'" >'+
group.name+'</option>';}
html+='</select>';this.group_selector.innerHTML=html;},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);blistManager=ui.getModule(IMO.Manager.Blist);if(!ui.surf_mode)
{var config={width:"300px",height:"150px",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:false,maximize:false,close:false,resizable:false,fixedcenter:true,layout:{},fixWindowResize:true};var id=YAHOO.util.Dom.generateId(null,"auth_buddy_panel");this.ap=new IMO.Widget.BasePanel(id,config);this.ap.setTitle("Add Buddy");this.ap.setBody("");this.ap.setFooter("&nbsp;");this.ap.render(document.body);}
var aid=YAHOO.util.Dom.generateId();var did=YAHOO.util.Dom.generateId();var gsid=YAHOO.util.Dom.generateId();var buddy=this.buid;if(!ui.surf_mode)
{this.ap.north.innerHTML='<div class="ad_info">'+
_('[BUDDY] wants to add you as a buddy.',function(s){return sprintf(s,{'[BUDDY]':buddy});})+'</div>'+'<div><table><tbody>'+'<tr align="right"><td class="ad_label">'+
_('Account')+':</td>'+'<td align="left">'+this.uid+'</td></tr>'+'<tr align="right"><td class="ad_label">'+
_('Group')+':</td>'+'<td align="left"><div id="'+gsid+'"></div></td></tr>'+'</tbody></table></div>'+'<div style="position:absolute; bottom:0pt; '+'right:0pt; padding:.5em;">'+'<button id="'+aid+'" style="margin-right:.25em">'+
_('Add')+'</button>'+'<button id="'+did+'">'+
_('Deny')+'</button>'+'</div>';}
else
{this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"auth_buddy_console");this.div.innerHTML='<div style="background:lightblue; '+'color:white; font-weight: bold; padding: .25em;">'+
_('Add Buddy')+'</div>'+'<div class="add_info">'+
_('[BUDDY] wants to add you as a buddy.',function(s){return sprintf(s,{'[BUDDY]':buddy});})+'</div>'+'<div style="padding:.25em"><table><tbody>'+'<tr align="right"><td class="add_label">'+
_('Account')+':</td>'+'<td align="left">'+this.uid+'</td></tr>'+'<tr align="right"><td class="add_label">'+
_('Group')+':</td>'+'<td align="left"><div id="'+gsid+'"></div></td></tr>'+'</tbody></table></div>'+'<div style="text-align:right; padding:.5em;">'+'<button id="'+aid+'" style="margin-right:.25em">'+
_('Add')+'</button>'+'<button id="'+did+'">'+
_('Deny')+'</button>'+'</div>';document.body.appendChild(this.div);}
this.group_selector=$(gsid);this.populate_group_selector();YAHOO.util.Event.addListener(aid,"click",this.add_buddy_cb,this,true);YAHOO.util.Event.addListener(did,"click",this.deny_cb,this,true);}};}());(function(){var ui;var accountManager;var blistManager;var imManager;var panelManager;var deleteBuddyConsole;IMO.Widget.Blist=function(dom_base)
{this.dom_base=dom_base;this.bp=null;this.btree_div=null;this.control_panel=null;this.itree=null;this.status_console=null;this.buddy_searcher=null;this.visible=false;this.init();};IMO.Widget.Blist.prototype={NAME:"IMO.Widget.Blist",get_status_console:function()
{return this.status_console;},get_buddy_searcher:function()
{return this.buddy_searcher;},buddy_click_cb:function(ev,obj)
{var uid=obj.data.account.uid;var buid=obj.data.uid;var proto=obj.data.proto;var im_conv=imManager.get_conv(uid,proto,buid);if(!im_conv)
{im_conv=imManager.create_conv(uid,proto,buid);}
if(!ui.surf_mode)
{im_conv.show();panelManager.focus(im_conv.imp);}
else
{YAHOO.log("im_conv:"+im_conv);im_conv.focus();}},mouseover_cb:function(ev,obj)
{obj.style.background="lightblue";},mouseout_cb:function(ev,obj)
{obj.style.background="white";},group_click_cb:function(ev,obj)
{var dom_node=obj.GetDomNode();var img_node=dom_node.firstChild.firstChild;var cinode=obj.GetChildrenDomNode();if(cinode.style.display=="inline")
{cinode.style.display="none";img_node.src=get_img_src("expand.gif");}
else
{cinode.style.display="inline";img_node.src=get_img_src("collapse.gif");}},blist_change_cb:function(name,args,me)
{var bldiff=args[0];var diff;for(var i=0;i<bldiff.length;i++)
{diff=bldiff[i];if(diff.type==IMO.Constants.BUDDY_DIFF)
{if(diff.old_guide==null)
{var inode=this.itree.AddObjectByGuide(diff.data,diff.new_guide);var dom_node=inode.GetDomNode();YAHOO.util.Event.addListener(dom_node,"click",this.buddy_click_cb,inode,true);YAHOO.util.Event.addListener(dom_node,"mouseover",this.mouseover_cb,dom_node,true);YAHOO.util.Event.addListener(dom_node,"mouseout",this.mouseout_cb,dom_node,true);}
else if(diff.new_guide==null)
{var guide=diff.old_guide;var inode=this.itree.GetNodeByGuide(guide);var dom_node=inode.GetDomNode();YAHOO.util.Event.removeListener(dom_node,"click",this.buddy_click_cb);YAHOO.util.Event.removeListener(dom_node,"mouseover",this.mouseover_cb);YAHOO.util.Event.removeListener(dom_node,"mouseout",this.mouseout_cb);this.itree.RemoveByGuide(guide);}
else
{var inode=this.itree.MoveByGuide(diff.old_guide,diff.new_guide);inode.Draw();}}
else if(diff.type==IMO.Constants.GROUP_DIFF)
{if(diff.old_guide==null)
{var group=diff.data;var inode=this.itree.AddObjectByGuide(group,diff.new_guide);var dom_node=inode.GetDomNode();YAHOO.util.Event.addListener(dom_node.firstChild,"click",this.group_click_cb,inode,true);}
else if(diff.new_guide==null)
{var group=diff.data;var grp_inode=this.itree.GetNodeByGuide(diff.old_guide);var len=grp_inode.children.length;for(var j=0;j<len;j++)
{var dom_node=grp_inode.children[j].GetDomNode();YAHOO.util.Event.removeListener(dom_node,"click",this.buddy_click_cb);YAHOO.util.Event.removeListener(dom_node,"mouseover",this.mouseover_cb);YAHOO.util.Event.removeListener(dom_node,"mouseout",this.mouseout_cb);}
this.itree.RemoveByGuide(diff.old_guide);}}}},signed_on_cb:function(name,args,me)
{if(!this.visible)
{if(ui.surf_mode)
{this.bp.style.display="";}
else
{this.bp.show();}
this.visible=true;}},resize_cb:function(evt,cb)
{this.resize();},resize:function()
{this.btree_div.style.height=this.bp.body.offsetHeight-
this.control_panel.offsetHeight+"px";},add_buddy_cb:function(ev,obj)
{var add_buddy=null;if(ui.surf_mode)
{add_buddy=new IMO.Widget.AddBuddy.Tabs();}
else
{add_buddy=new IMO.Widget.AddBuddy.Panels();}
add_buddy.show();},delete_buddy_cb:function(ev,obj)
{deleteBuddyConsole.show();},init:function()
{ui=IMO.UI.X;accountManager=ui.getModule(IMO.Manager.Account);blistManager=ui.getModule(IMO.Manager.Blist);imManager=ui.getModule(IMO.Manager.Conv.Im);ui.getModule(IMO.Manager.Keyboard).setBlist(this);if(!ui.surf_mode)
{deleteBuddyConsole=ui.getWidget(IMO.Widget.DeleteBuddy);panelManager=ui.getModule(IMO.Manager.Panel);}
var config={width:"285px",height:YAHOO.util.Dom.getViewportHeight()-20+"px",xy:[YAHOO.util.Dom.getViewportWidth()-285-10,10],minw:"275",minh:"200",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:false,maximize:false,close:false,resizable:true,layout:{},fixWindowResize:true};if(!ui.surf_mode)
{this.bp=new IMO.Widget.BasePanel("blist_panel",config);this.bp.setTitle(_("Buddy List"));this.bp.setBody("");this.bp.setFooter("&nbsp;");this.bp.render(document.body);}
else
{this.bp=document.createElement("div");this.bp.style.display="none";this.dom_base.appendChild(this.bp);}
this.control_panel=document.createElement("div");YAHOO.util.Dom.addClass(this.control_panel,"blist_control_panel");var ctrl_panel_dest=this.bp.north;if(ui.surf_mode)
{ctrl_panel_dest=this.bp;}
ctrl_panel_dest.appendChild(this.control_panel);if(!ui.surf_mode)
{var abid=YAHOO.util.Dom.generateId();var dbid=YAHOO.util.Dom.generateId();var actions_panel=document.createElement("div");YAHOO.util.Dom.addClass(actions_panel,"blist_actions");actions_panel.innerHTML=''+'<button id="'+abid+'">'+
_('Add Buddy')+'</button>'+'<button id="'+dbid+'">'+
_('Delete Buddy')+'</button>';this.control_panel.appendChild(actions_panel);}
else
{var add_buddy_div=document.createElement("div");YAHOO.util.Dom.addClass(add_buddy_div,"blist_add_buddy");add_buddy_div.innerHTML='<span class="action">'+_('Add Buddy')+'</span>';this.control_panel.appendChild(add_buddy_div);}
this.status_console=new IMO.Widget.StatusConsole(this.control_panel);this.buddy_searcher=new IMO.Widget.BuddySearcher(this.control_panel);this.btree_div=document.createElement("div");YAHOO.util.Dom.addClass(this.btree_div,"treemenu");YAHOO.util.Dom.addClass(this.btree_div,"blist_tree");var tree_dest=this.bp.north;if(ui.surf_mode)
{tree_dest=this.bp;}
tree_dest.appendChild(this.btree_div);this.itree=new IMO.Widget.ITree(this.btree_div,"");this.itree.Draw();this.itree.SetIncremental(true);if(!ui.surf_mode)
{this.resize();this.bp.resizeEvent.subscribe(this.resize_cb,this,true);}
if(!ui.surf_mode)
{var add_buddy_thing=$(abid);}
else
{var add_buddy_thing=add_buddy_div;}
YAHOO.util.Event.addListener(add_buddy_thing,"click",this.add_buddy_cb,this,true);if(!ui.surf_mode)
{YAHOO.util.Event.addListener($(dbid),"click",this.delete_buddy_cb,this,true);}
blistManager.ev_blist.subscribe(this.blist_change_cb,this,true);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);}};}());IMO.Manager.Notification=function()
{this.eventInfo=new YAHOO.util.CustomEvent("eventInfo");this.eventWarning=new YAHOO.util.CustomEvent("eventWarning");this.eventError=new YAHOO.util.CustomEvent("eventError");this.eventClear=new YAHOO.util.CustomEvent("eventClear");};IMO.Manager.Notification.prototype={NAME:"IMO.Manager.Notification",INFO:0,WARNING:1,ERROR:2,notify:function(msg,level,time)
{var ev=this.eventInfo;if(level==this.WARNING)
{ev=this.eventWarning;}
else if(level==this.ERROR)
{ev=this.eventError;}
ev.fire(msg,time);},clear:function()
{var ev=this.eventClear;ev.fire();}};(function(){var ui;var ajax;var accountManager;IMO.Manager.Monitor=function()
{this.start_time=(new Date()).getTime();this.events={};this.init();};IMO.Manager.Monitor.prototype={NAME:"IMO.Manager.Monitor",MONITOR_SEND_INTERVAL:5*60*1000,_skip_authentication:function(namespace)
{if(ui.surf_mode)
{return(namespace=="js.surf.mute"||namespace=="js.surf.unmute"||namespace=="js.surf.load_time");}
return(namespace=="js.mute"||namespace=="js.unmute"||namespace=="js.load_time");},_send_event:function(namespace,data,start_time,end_time)
{var uid=null;var proto=null;var ssid=null;if(!this._skip_authentication(namespace))
{var account=null;for(var key in accountManager.accounts)
{account=accountManager.accounts[key];uid=account.uid;proto=account.proto;ssid=ui.ssid;break;}}
start_time/=1000;end_time/=1000;ajax.exec("monitor_event",JSON.encode({"ssid":ssid,"uid":uid,"proto":proto,"namespace":namespace,"data":data,"start_time":start_time,"end_time":end_time}));},log_event:function(namespace,data,immediate,start_time,end_time)
{immediate=typeof(immediate)!="undefined"?immediate:false;if(immediate==true)
{end_time=(typeof(end_time)!="undefined"?end_time:start_time);this._send_event(namespace,data,start_time,end_time);}
else
{if(!(namespace in this.events))
{this.events[namespace]=0;}
this.events[namespace]=this.events[namespace]+1;}},send_events:function()
{var end_time=(new Date()).getTime();for(var namespace in this.events)
{var data=this.events[namespace];this._send_event(namespace,data,this.start_time,end_time);}
this.events={};this.start_time=(new Date()).getTime();},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);YAHOO.lang.later(this.MONITOR_SEND_INTERVAL,this,this.send_events,[],true);}};}());(function(){var ajax;var browserManager;var notificationManager;IMO.Manager.Pulse=function()
{this.NAME="IMO.Manager.Pulse";this.pulse=null;this.revive=false;this.timer=null;this.init();};IMO.Manager.Pulse.prototype={PULSE_INTERVAL:5000,DEAD_TIME:45000,start:function()
{this.pulse=(new Date()).getTime();this.timer=YAHOO.lang.later(this.PULSE_INTERVAL,this,this.check_pulse,[],true);},stop:function()
{this.timer.cancel();},check_pulse:function()
{var now=(new Date()).getTime();if(now-this.pulse>this.DEAD_TIME)
{eraseCookie(IMO.Constants.COOKIE_FBIM);eraseCookie(IMO.Constants.COOKIE_OPEN);this.revive=true;if(ajax.down==false)
{ajax.down=true;ajax.ping(1);}
notificationManager.notify(_("Reconnecting..."),notificationManager.WARNING);this.stop();return;}
this.pulse=now;},pingSuccessCb:function(type,args,me)
{var tries=args[0];YAHOO.log("ping success cb");if(this.revive==true)
{browserManager.reload();}
else if(tries>2)
{notificationManager.notify(_("Network has reconnected."));}},pingFailureCb:function(type,args,me)
{var tries=args[0];if(this.revive==true)
{YAHOO.log("ping failed on revive tries:"+tries);}
else if(tries>2)
{YAHOO.log("ping failure tries:"+tries);notificationManager.notify(_("Network problem. "+"Unable to send/receive messages. "+"Trying to reconnect."),notificationManager.WARNING);}},pingExpireCb:function(type,args,me)
{browserManager.expired(_("Network failure. "+"Your imo session has expired. "+"Please refresh the page and login again."));},init:function()
{var ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);browserManager=ui.getModule(IMO.Manager.Browser);notificationManager=ui.getModule(IMO.Manager.Notification);ajax.evPollShutdown.subscribe(this.stop,this,true);ajax.evPingSuccess.subscribe(this.pingSuccessCb,this,true);ajax.evPingFailure.subscribe(this.pingFailureCb,this,true);ajax.evPingExpire.subscribe(this.pingExpireCb,this,true);this.start();}};}());(function(){var ui;var ajax;var accountManager;var blistManager;var imManager;var imoManager;var vcManager;var monitor;IMO.Manager.Event=function()
{this.sh=null;this.oev=null;this.init();};IMO.Manager.Event.prototype={NAME:"IMO.Manager.Event",checkSH:function(ev)
{if(this.sh==null)
{this.sh=ev.sh;this.oev=JSON.encode(ev);return;}
if(this.sh!=ev.sh)
{monitor.log_event("js.sh_diff",{"osh":this.sh,"nsh":ev.sh,"ssid":ui.ssid},true,(new Date()).getTime());}},handleEvents:function(type,args,obj)
{var events=args[0];for(var i=0;i<events.length;i++)
{var ev=events[i]
if(ev)
{if(ui.fast_polling)
{if(ev.type=="imo"&&(ev.name=="fast_login"||ev.name=="fast_login_expire"))
{this.sh=null;ui.fast_polling=false;imoManager.handle_event(ev);continue;}
return;}
this.checkSH(ev);if(ev.type=="account")
{accountManager.handle_event(ev);}
else if(ev.type=="blist")
{blistManager.handle_event(ev);}
else if(ev.type=="conv")
{imManager.handle_event(ev);}
else if(ev.type=="video"||ev.type=="call")
{vcManager.handle_event(ev);}
else if(ev.type=="imo")
{imoManager.handle_event(ev,this.sh);}
else
{YAHOO.log("Bad type:"+ev.type);}}
else
{YAHOO.log("Bad response:"+ev.type+":"+ev.name);}}},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);ajax.evEvent.subscribe(this.handleEvents,this,true);accountManager=ui.getModule(IMO.Manager.Account);blistManager=ui.getModule(IMO.Manager.Blist);imManager=ui.getModule(IMO.Manager.Conv.Im);imoManager=ui.getModule(IMO.Manager.Imo);vcManager=ui.getModule(IMO.Manager.Conv.Vc);monitor=ui.getModule(IMO.Manager.Monitor);}};}());(function(){var ui;var ajax;var accountManager;var hintsManager;var browserManager;var notificationManager;var monitor;IMO.Manager.Imo=function()
{this.init();};IMO.Manager.Imo.prototype={NAME:"IMO.Manager.Imo",handle_event:function(ev,osh)
{if(ev.name=="kill")
{browserManager.reload(true);}
else if(ev.name=="expired")
{monitor.log_event("js.expired",{"osh":osh,"nsh":ev.sh,"reason":ev.error},true,0,0);browserManager.expired();}
else if(ev.name=="fast_login")
{hintsManager.set_accounts_linked(true);ui.initUI();ui.postProcess();var accounts=ev.edata.accounts;for(var i=0;i<accounts.length;i++)
{var a=accounts[i];accountManager.signon(a.uid,a.proto,null,false);}}
else if(ev.name=="fast_login_expire")
{ajax.pollShutdown();eraseCookie(IMO.Constants.COOKIE_FAST_LOGIN);ui.ssid=create_ssid();ajax.setSsid(ui.ssid);ui.initUI();ui.postProcess();}
else if(ev.name=="syntax")
{YAHOO.log("syntax error:"+ev.edata["msg"]);}
else if(ev.name=="failure")
{notificationManager.notify(_("Oops, imo is experiencing problems. "+"Hold on a second!"),notificationManager.WARNING,true);}
else if(ev.name=="broadcast")
{var level=ev.edata.level;var msg=ev.edata.msg;if(level=="info")
{notificationManager.notify(msg);}
else if(level=="warning")
{notificationManager.notify(msg);}
else if(level=="error")
{notificationManager.notify(msg);}}},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);hintsManager=ui.getModule(IMO.Manager.Hints);browserManager=ui.getModule(IMO.Manager.Browser);notificationManager=ui.getModule(IMO.Manager.Notification);monitor=ui.getModule(IMO.Manager.Monitor);}};}());(function(){var ui;var ajax;var notificationManager;var _normalize_uid=function(uid,proto)
{uid=uid.toLowerCase();if(proto==IMO.Constants.PROTO_MSN&&(uid.indexOf("@")==-1))
{uid+="@hotmail.com";}
else if(proto==IMO.Constants.PROTO_GTALK&&(uid.indexOf("@")==-1))
{uid+="@gmail.com";}
return uid;}
IMO.Manager.Account=function()
{this.init();};IMO.Manager.Account.prototype={NAME:"IMO.Manager.Account",accounts:{},primitive:IMO.Constants.PRIM_AVAILABLE,status:"",ev_signing_on:new YAHOO.util.CustomEvent("account_signing_on"),ev_signed_on:new YAHOO.util.CustomEvent("account_signed_on"),ev_signing_off:new YAHOO.util.CustomEvent("account_signing_off"),ev_signed_off:new YAHOO.util.CustomEvent("account_signed_off"),ev_bad_passwd:new YAHOO.util.CustomEvent("account_bad_passwd"),ev_sign_off_all:new YAHOO.util.CustomEvent("account_signed_off_all"),ev_status_prim:new YAHOO.util.CustomEvent("account_status_prim"),ev_link:new YAHOO.util.CustomEvent("account_link"),get_account:function(uid,proto)
{return this.accounts[__(uid,proto)];},get_any_account:function()
{var account=null;for(var key in this.accounts)
{account=this.accounts[key];break;}
return account;},get_num_accounts:function()
{var num=0;for(var key in this.accounts)
{num++;}
return num;},get_online_accounts:function()
{var account;var online=[];for(var key in this.accounts)
{account=this.accounts[key];if(account.online==true)
{online.push(account);}}
return online;},get_status:function()
{return this.status;},get_primitive:function()
{return this.primitive;},init_status_prim:function(account)
{if(account.status_initialized==false)
{account.status_initialized=true;this.set_status_prim(this.status,this.primitive);}},set_status_prim:function(status,primitive)
{this.status=status;this.primitive=primitive;var account;for(var key in this.accounts)
{account=this.accounts[key];var setStatus=this.status;if(account.proto==IMO.Constants.PROTO_YAHOO)
{setStatus=sprintf(this.status,{'https://imo.im':'www imo im'});}
if(account.online==true&&account.get==true)
{ajax.exec("set_status",JSON.encode({"uid":account.uid,"proto":account.proto,"ssid":ui.ssid,"primitive":this.primitive,"status":setStatus}));}}
this.ev_status_prim.fire(this.status,this.primitive);},signon:function(uid,proto,passwd,exec)
{uid=_normalize_uid(uid,proto);var account=this.get_account(uid,proto);if(!account)
{account=new IMO.Account(uid,proto,false,null,false);this.accounts[__(uid,proto)]=account;}
if(account.online)
{return;}
account.signon_start_time=(new Date()).getTime();var exec=typeof(exec)!="undefined"?exec:true;if(exec)
{YAHOO.log('login ssid:'+ui.ssid);ajax.exec("account_login",JSON.encode({"uid":uid,"proto":proto,"passwd":passwd,"ssid":ui.ssid}));}
this.ev_signing_on.fire(uid,proto);ajax.poll();},signoff:function(uid,proto)
{if(this.get_account(uid,proto))
{ajax.exec("account_logout",JSON.encode({"ssid":ui.ssid,"uid":uid,"proto":proto}));this.ev_signing_off.fire(uid,proto);}},signoff_all_cb:function()
{this.signoff_all();},signoff_all:function()
{eraseCookie(IMO.Constants.COOKIE_FBIM);eraseCookie(IMO.Constants.COOKIE_OPEN);eraseCookie(IMO.Constants.COOKIE_FAST_LOGIN);if(YAHOO.env.ua.ie)
{ie_css_persistence_save(IMO.Constants.COOKIE_FBIM,0,IMO.Constants.COOKIE_FBIM);}
window.opener=null;ajax.exec("signoff_all",JSON.encode({"ssid":ui.ssid}));},handle_event:function(ev)
{var ename=ev.name;var auid=ev.uid.toLowerCase();var proto=ev.proto;if(ename=="signed_on")
{var account=this.get_account(auid,proto);if(account)
{account.online=true;account.alias=ev.edata.alias;account.report_signon_time();createCookie(IMO.Constants.COOKIE_OPEN,1,0);this.ev_signed_on.fire(auid,proto);}}
else if(ename=="signed_off")
{var account=this.get_account(auid,proto);if(account)
{account.status_initialized=false;account.get=false;account.online=false;this.ev_signed_off.fire(auid,proto);}}
else if(ename=="disconnect")
{var msg=ev.edata.msg;var account=this.get_account(auid,proto);if(account)
{account.online=false;}
if(msg=="uid"||msg=="password"||msg=="uidpassword")
{this.ev_bad_passwd.fire(auid,proto);}
else if(msg=="location")
{notificationManager.notify(_("[BUDDY] on [SERVICE] has been signed off. "+"It's possible you have signed on elsewhere.",function(s){return sprintf(s,{'[BUDDY]':auid,'[SERVICE]':get_proto_name(proto)})}),notificationManager.INFO);}
else if(msg=="protocol"||msg=="protocol temporary"||msg=="connect")
{notificationManager.notify(_("imo is having "+"problems with [SERVICE]. Please try again later.",function(s){return sprintf(s,{'[SERVICE]':get_proto_name(proto)})}),notificationManager.ERROR,20000);}
else if(msg=="capacity"&&proto=="prpl-skype")
{notificationManager.notify(_("Sorry, our experimental "+"Skype service has reached full capacity. "+"Please try again later."),notificationManager.ERROR,60000);}
this.ev_signed_off.fire(auid,proto);}
else if(ename=="status")
{YAHOO.log("event:"+ename);}
else if(ename=="linked_accounts")
{YAHOO.log("event:"+ename);var account,la;var accounts=ev.edata.accounts;for(var i=0;i<accounts.length;i++)
{la=accounts[i];account=this.get_account(la.uid,la.proto);if(account)
{account.autologin=la.autologin;}
else
{var luid=la.uid.toLowerCase();this.accounts[__(luid,la.proto)]=new IMO.Account(luid,la.proto,la.autologin,null,false);}
this.ev_link.fire(la.uid,la.proto,la.autologin);}}
else if(ename=="link_success")
{notificationManager.notify(_('Your passwords have been encrypted '+'and saved. Your accounts are now linked.'),notificationManager.INFO);YAHOO.log("event:"+ename);}
else if(ename=="unlink_success")
{notificationManager.notify(_('Your passwords have been deleted. '+'Your accounts are no longer linked.'),notificationManager.INFO);}
else if(ename=="link_error")
{notificationManager.notify(_('Sorry we were unable to link your accounts.'),notificationManager.ERROR,20000);}
else if(ename=="error_link")
{YAHOO.log("event:"+ename);}
else if(ename=="error_login_max")
{YAHOO.log("event:"+ename);}
else
{YAHOO.log("Bad account event:"+ename);}},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);notificationManager=ui.getModule(IMO.Manager.Notification);}};}());(function(){var accountManager;IMO.Manager.Away=function()
{this.timer=null;this.primitive=null;this.is_away=false;this.evAway=new YAHOO.util.CustomEvent("user_away");this.evActive=new YAHOO.util.CustomEvent("user_active");this.init();};IMO.Manager.Away.prototype={NAME:"IMO.Manager.Away",AWAY_TIMEOUT:12*60*1000,user_activity:function()
{if(this.timer!=null)
{this.timer.cancel();}
this.timer=YAHOO.lang.later(this.AWAY_TIMEOUT,this,this.user_away,[]);if(this.is_away)
{var el=YAHOO.env.ua.ie?document:window;YAHOO.util.Event.removeListener(el,"mousemove",this.user_activity);this.evActive.fire(this.primitive);}
this.is_away=false;},user_away:function()
{this.is_away=true;var el=YAHOO.env.ua.ie?document:window;YAHOO.util.Event.addListener(el,"mousemove",this.user_activity,this,true);this.evAway.fire();},statusPrimCb:function(name,args,me)
{var prim=args[1];if(prim!=IMO.Constants.PRIM_AWAY)
{this.primitive=prim;this.user_activity();}},init:function()
{accountManager=IMO.UI.X.getModule(IMO.Manager.Account);accountManager.ev_status_prim.subscribe(this.statusPrimCb,this,true);this.primitive=accountManager.primitive;YAHOO.util.Event.addListener(window,"click",this.user_activity,this,true);YAHOO.util.Event.addListener(document.body,"keypress",this.user_activity,this,true);this.timer=YAHOO.lang.later(this.AWAY_TIMEOUT,this,this.user_away,[]);}};}());(function(){var ui;var ajax;var accountManager;var notificationManager;IMO.Manager.Blist=function()
{this.buddies={};this.groups=[];this.ev_blist=new YAHOO.util.CustomEvent("blist_change");this.init();},IMO.Manager.Blist.prototype={NAME:"IMO.Manager.Blist",__buddy_added:function(ev)
{var ename=ev.name;var auid=ev.uid.toLowerCase();var proto=ev.proto;var bldiff=[];var buddy,ebuddy,buid,group;var account=accountManager.get_account(auid,proto);var ebuddies=ev.edata;for(var i=0;i<ebuddies.length;i++)
{ebuddy=ebuddies[i];buid=ebuddy.buid.toLowerCase();buid=buid.replace(/\s*/g,"");if(this.get_buddy(auid,proto,buid))
{continue;}
if(ebuddy.primitive==IMO.Constants.PRIM_OFFLINE)
{ebuddy.group=IMO.Constants.OFFLINE_GROUP;}
group=this.get_group(ebuddy.group);if(!group)
{group=this.create_group(ebuddy.group,bldiff);}
buddy=new IMO.Buddy(buid,proto,ebuddy.alias,account,group,ebuddy.status,ebuddy.primitive,null);this.buddies[__(auid,proto,buid)]=buddy;group.buddies.push(buddy);bldiff.push(new IMO.Diff(IMO.Constants.BUDDY_DIFF,null,buddy.get_guide(),buddy));}
account.get=true;accountManager.init_status_prim(account);this.ev_blist.fire(bldiff);},get_buddy:function(uid,proto,buid)
{buid=buid.replace(/\s*/g,"");return this.buddies[__(uid.toLowerCase(),proto,buid.toLowerCase())];},get_group:function(name)
{for(var i=0;i<this.groups.length;i++)
{if(this.groups[i].name==name)
{return this.groups[i];}}
return null;},create_group:function(name,bldiff)
{var group=new IMO.Group(name,[]);this.groups.push(group);bldiff.push(new IMO.Diff(IMO.Constants.GROUP_DIFF,null,group.get_guide(),group));return group;},_remove_group:function(group)
{for(var i=0;i<this.groups.length;i++)
{if(this.groups[i]==group)
{this.groups.splice(i,1);return;}}},_remove_buddy_from_group:function(buddy,bldiff,diff_buddy)
{var buddies=buddy.group.buddies;for(var i=0;i<buddies.length;i++)
{if(buddies[i]==buddy)
{buddies.splice(i,1);break;}}
diff_buddy=diff_buddy?diff_buddy:buddy;bldiff.push(new IMO.Diff(IMO.Constants.BUDDY_DIFF,diff_buddy.get_guide(),null,buddy));if(buddies.length==0)
{bldiff.push(new IMO.Diff(IMO.Constants.GROUP_DIFF,diff_buddy.group.get_guide(),null,diff_buddy.group));this._remove_group(diff_buddy.group);}},find_buddy:function(uid,proto,accounts)
{if(!accounts)
{accounts=accountManager.get_online_accounts();}
var buddy=null;for(var i=0;i<accounts.length;i++)
{account=accounts[i];if(account.proto==proto)
{buddy=this.get_buddy(account.uid,account.proto,uid);if(buddy!=null)
{break;}}}
return buddy;},signed_off_cb:function(name,args,me)
{var bldiff=[];var buddy;var account=accountManager.get_account(args[0],args[1]);for(var key in this.buddies)
{buddy=this.buddies[key];if(buddy.account==account)
{this._remove_buddy_from_group(buddy,bldiff);delete this.buddies[__(account.uid,buddy.proto,buddy.uid)];}}
this.ev_blist.fire(bldiff);},handle_event:function(ev)
{var ename=ev.name;var auid=ev.uid.toLowerCase();var proto=ev.proto;if(ename=="buddy_added")
{this.__buddy_added(ev);}
else if(ename=="buddy_status")
{var bldiff=[];var buddy,ebuddy,obuddy,buid;var blist_change=false;var account=accountManager.get_account(auid,proto);var ebuddies=ev.edata;var group_name;for(var i=0;i<ebuddies.length;i++)
{ebuddy=ebuddies[i];buid=ebuddy.buid.toLowerCase();buddy=this.get_buddy(auid,proto,buid);if(!buddy)
{YAHOO.log("WARNING: buddy null:"+
auid+":"+proto+":"+buid);this.__buddy_added(ev);buddy=this.get_buddy(auid,proto,buid);}
obuddy=buddy.clone();buddy.status=ebuddy.status;buddy.primitive=ebuddy.primitive;buddy.alias=ebuddy.alias;group_name=ebuddy.group;if(ebuddy.primitive==IMO.Constants.PRIM_OFFLINE)
{group_name=IMO.Constants.OFFLINE_GROUP;}
if(ebuddy.primitive==IMO.Constants.PRIM_INVISIBLE)
{buddy.status=_('Invisible',false);}
if(buddy.group.name!=group_name)
{this._remove_buddy_from_group(buddy,bldiff,obuddy);var group=this.get_group(group_name);if(!group)
{group=this.create_group(group_name,bldiff);}
group.buddies.push(buddy);buddy.group=group;bldiff.push(new IMO.Diff(IMO.Constants.BUDDY_DIFF,null,buddy.get_guide(),buddy));}
else if(obuddy.primitive!=buddy.primitive||obuddy.status!=buddy.status||obuddy.alias!=buddy.alias)
{bldiff.push(new IMO.Diff(IMO.Constants.BUDDY_DIFF,obuddy.get_guide(),buddy.get_guide(),buddy));}}
this.ev_blist.fire(bldiff);}
else if(ename=="buddy_request")
{var buid=ev.edata.buid.toLowerCase();var auth_buddy_console=new IMO.Widget.AuthBuddyConsole(auid,proto,buid,ev.edata.alias,ev.edata.msg);if(!ui.surf_mode)
{auth_buddy_console.show();}}
else if(ename=="buddy_removed")
{var buid=ev.edata.buid.toLowerCase();var bldiff=[];var buddy=this.get_buddy(auid,proto,buid);if(!buddy)
{YAHOO.log("WARNING: r buddy null:"+
auid+":"+proto+":"+buid);return;}
this._remove_buddy_from_group(buddy,bldiff);delete this.buddies[__(auid,proto,buid)];notificationManager.notify(_('[BUDDY] has been deleted.',function(s){return sprintf(s,{'[BUDDY]':buid});}));this.ev_blist.fire(bldiff);}
else
{YAHOO.log("Bad response:"+ename);}},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);notificationManager=ui.getModule(IMO.Manager.Notification);accountManager.ev_signed_off.subscribe(this.signed_off_cb,this,true);}};}());(function(){var accountManager;var blistManager;var env=IMO.env;IMO.Manager.Conv=function(convWidget)
{this.convWidget=convWidget;this.convs={};this.init();};IMO.Manager.Conv.prototype={constructor:IMO.Manager.Conv,NAME:"IMO.Manager.Conv",create_conv:function(uid,proto,buid)
{var buddy=blistManager.get_buddy(uid,proto,buid);var conv=new this.convWidget(uid,proto,buid,buddy.alias);this.convs[__(uid,proto,buid)]=conv;return conv;},delete_conv:function(uid,proto,buid)
{delete this.convs[__(uid,proto,buid)];},get_conv:function(uid,proto,buid)
{return this.convs[__(uid,proto,buid)];},get_convs:function()
{return this.convs;},signed_off_cb:function(name,args,me)
{var k=__(args[0],args[1]);for(var key in this.convs)
{if(key.substring(0,k.length)==k)
{var conv=this.convs[key];conv.hide();}}},blist_change_cb:function(name,args,me)
{var bldiff=args[0];var diff,buddy,conv;for(var i=0;i<bldiff.length;i++)
{diff=bldiff[i];if(diff.type==IMO.Constants.BUDDY_DIFF)
{buddy=diff.data;conv=this.get_conv(buddy.account.uid,buddy.proto,buddy.uid);if(conv)
{conv.buddy_change(buddy);}}}},handle_event:function(ev)
{YAHOO.log("handling event");},init:function()
{var ui=IMO.UI.X;accountManager=ui.getModule(IMO.Manager.Account);blistManager=ui.getModule(IMO.Manager.Blist);accountManager.ev_signed_off.subscribe(this.signed_off_cb,this,true);blistManager.ev_blist.subscribe(this.blist_change_cb,this,true);}};IMO.Manager.Conv.Im=function(convWidget)
{IMO.Manager.Conv.Im.superclass.constructor.call(this,convWidget);};YAHOO.lang.extend(IMO.Manager.Conv.Im,IMO.Manager.Conv,{NAME:"IMO.Manager.Conv.Im",handle_event:function(ev)
{var ename=ev.name;var auid=ev.uid.toLowerCase();var proto=ev.proto;if(ename=="recv_im")
{var buid=ev.edata.buid.toLowerCase();var resource=get_resource(buid,proto);buid=remove_resource(buid,proto);var buddy=blistManager.get_buddy(auid,proto,buid);if(!buddy)
{return;}
buddy.resource=resource;var conv=this.get_conv(auid,proto,buddy.uid);if(!conv)
{conv=this.create_conv(auid,proto,buddy.uid);}
conv.append_message(buddy.alias,ev.edata.msg);conv.show();conv.alert(buddy,ev.edata.msg);}
else if(ename=="typing"||ename=="typed"||ename=="not_typing")
{var buid=ev.edata.buid.toLowerCase();buid=remove_resource(buid,proto);var conv=this.get_conv(auid,proto,buid);if(conv)
{conv.set_typing_state(ename);}}
else if(ename=="sendmsg")
{}
else
{YAHOO.log("Bad im conv event:"+ename);}}});IMO.Manager.Conv.Vc=function(convWidget)
{IMO.Manager.Conv.Vc.superclass.constructor.call(this,convWidget);this.non_imo=false;};YAHOO.lang.extend(IMO.Manager.Conv.Vc,IMO.Manager.Conv,{NAME:"IMO.Manager.Conv.Vc",create_conv:function(uid,proto,buid,recv_stream,send_stream,type)
{var buddy=blistManager.get_buddy(uid,proto,buid);var conv=new this.convWidget(uid,proto,buid,recv_stream,send_stream,type);this.convs[__(uid,proto,buid)]=conv;return conv;},recv_video:function(recv_stream,uid,proto,buid,send_stream,type)
{env.detectFlash();var conv=this.get_conv(uid,proto,buid);if(!conv)
{conv=this.create_conv(uid,proto,buid,recv_stream,send_stream,type);}
conv.show();return conv;},set_non_imo:function()
{this.non_imo=true;},handle_event:function(ev)
{var ename=ev.name;var auid=ev.uid.toLowerCase();var proto=ev.proto;if(ev.type=="video"&&ename=="recv")
{var buid=ev.edata.buid;var stream=ev.edata.stream;var send_stream=ev.edata.send_stream;this.recv_video(stream,auid,proto,buid,send_stream);}else if(ev.type=="call"){var buid=ev.edata.buid;var stream=ev.edata.stream;var send_stream=ev.edata.send_stream;if(ename=="send"){var conv=this.recv_video(stream,auid,proto,buid,send_stream,"voicecall-outgoing");}else if(ename=="recv"){var conv=this.recv_video(stream,auid,proto,buid,send_stream,"voicecall-incoming");}else if(ename=="ended"){function addbuid(s){return sprintf(s,{'[BUDDY]':buid});}
var reason=ev.edata.reason;var ui=IMO.UI.X;var notificationManager=ui.getModule(IMO.Manager.Notification);var conv=this.get_conv(auid,proto,buid);if(conv){try{conv.hide("js.call_ended");if(conv.vcp&&!ui.surf_mode)
{conv.vcp.doHide(null,conv.vcp);}}catch(e){}}
var endedtext;switch(reason){case"offline":endedtext=_("[BUDDY] is offline, or you are not authorized to contact them.",addbuid);break;case"flashaudio":endedtext=_("Flash was not able to connect to [BUDDY]'s stream. "+"Make sure you have Flash player 8 or higher installed.",addbuid);break;case"failed":endedtext=_("imo is having problems with voice calls. Please try again later.");break;case"cancelled":endedtext=_("You have cancelled the voice call with [BUDDY]",addbuid);break;case"missed":endedtext=_("[BUDDY] has cancelled the voice call",addbuid);break;case"refused":endedtext=_("[BUDDY] did not answer your voice call",addbuid);break;case"pstn":endedtext=_("imo does not yet allow calls to real telephone numbers.");break;default:endedtext=_("The voice call with [BUDDY] has ended",addbuid);break;};var notifytype,notifytime;if(reason=="offline"||reason=="flashaudio"||reason=="failed"){notifytype=notificationManager.WARNING;}else{notifytype=notificationManager.INFO;}
if(reason=="flashaudio"||reason=="missed"||reason=="failed"){notifytime=40000;}else{notifytime=20000;}
notificationManager.notify(endedtext,notifytype,notifytime);}}}});}());(function(){var ui;var itabs;var monitor;var blist;IMO.Manager.Keyboard=function()
{this.shift_key=false;this.init();};IMO.Manager.Keyboard.prototype={NAME:"IMO.Manager.Keyboard",handle_tab_key:function(ev,obj)
{if(ui.surf_mode)
{var target=YAHOO.util.Event.getTarget(ev);if(target.name)
{return;}
if(this.shift_key)
{itabs.focus_prev_tab();monitor.log_event("js.surf.shift_tab");}
else
{var ftab=itabs.tabs.GetTab("feedback");if(itabs.is_focused_tab(ftab))
{return;}
itabs.focus_next_tab();monitor.log_event("js.surf.tab");}
YAHOO.util.Event.stopEvent(ev);}},handle_escape_key:function(ev,obj)
{if(ui.surf_mode)
{itabs.close_focused_tab();}
if(!YAHOO.env.ua.ie)
{YAHOO.util.Event.stopEvent(ev);}},handle_slash_key:function(ev,obj)
{if(blist.get_buddy_searcher()&&YAHOO.util.Event.getTarget(ev).nodeName=="HTML")
{YAHOO.util.Event.stopEvent(ev);var buddy_searcher=blist.get_buddy_searcher();buddy_searcher.search_box.focus();}},keypress_cb:function(ev,obj)
{if(ev.keyCode==9)
{this.handle_tab_key(ev,obj);}
else if(ev.keyCode==27)
{this.handle_escape_key(ev,obj);}},keydown_cb:function(ev,obj)
{if(ev.keyCode==9)
{if(YAHOO.env.ua.ie||YAHOO.env.ua.webkit)
{this.handle_tab_key(ev,obj);}}
else if(ev.keyCode==16)
{this.shift_key=true;}
else if(ev.keyCode==191)
{this.handle_slash_key(ev,obj);}
else if(ev.keyCode==27&&YAHOO.env.ua.webkit)
{this.handle_escape_key(ev,obj);}},keyup_cb:function(ev,obj)
{if(ev.keyCode==16)
{this.shift_key=false;}},setItabs:function(tabs)
{itabs=tabs;},setBlist:function(_blist)
{blist=_blist;},init:function()
{ui=IMO.UI.X;monitor=ui.getModule(IMO.Manager.Monitor);if(ui.surf_mode)
{itabs=ui.getWidget(IMO.Widget.SurfTabs);}
YAHOO.util.Event.addListener(document,"keypress",this.keypress_cb,this,true);YAHOO.util.Event.addListener(document,"keydown",this.keydown_cb,this,true);YAHOO.util.Event.addListener(document,"keyup",this.keyup_cb,this,true);}};}());IMO.Manager.Alert=function()
{this.aliases=[];this.index=0;this.timer=null;};IMO.Manager.Alert.prototype={NAME:"IMO.Manager.Alert",set_title:function()
{if(this.index<this.aliases.length)
{var buddy=this.aliases[this.index];_("[BUDDY] says...",document,'title',function(s){return sprintf(s,{'[BUDDY]':buddy});});this.index+=1;}
else
{document.title="imo";this.index=0;}},alert:function(alias)
{this.aliases.push(alias);if(this.timer==null)
{this.timer=YAHOO.lang.later(1000,this,this.set_title,[],true);}},stop:function()
{if(this.timer!=null)
{this.timer.cancel();this.timer=null;document.title="imo";this.index=0;this.aliases=[];}}};(function(){var me;var ui;var ajax;var accountManager;var notificationManager;var monitor;IMO.Manager.Browser=function()
{me=this;this.timer=null;this.signed_on_flag=false;this.init();};IMO.Manager.Browser.prototype={NAME:"IMO.Manager.Browser",unset_onunload:function()
{window.onunload=null;},cleanup:function(rm_cookie)
{eraseCookie(IMO.Constants.COOKIE_OPEN);if(ui.surf_mode&&YAHOO.env.ua.ie)
{ie_css_persistence_save(IMO.Constants.COOKIE_FBIM,0,IMO.Constants.COOKIE_FBIM);}
rm_cookie=typeof(rm_cookie)!="undefined"?rm_cookie:false;if(rm_cookie==true)
{eraseCookie(IMO.Constants.COOKIE_FAST_LOGIN);}
this.unset_onunload();ajax.shutdownAjax();},reload:function(rm_cookie)
{this.cleanup(rm_cookie);if(ui.non_imo_vc)
{location.href="/";}
else
{location.href=location.href;}},reloadCb:function()
{this.reload();},expired:function(msg)
{ajax.shutdownAjax();var m=_('Your session has expired. '+'Refresh the page and log in again.');if(msg)
{m=msg;}
notificationManager.notify(m,notificationManager.ERROR,-1);},log_browser_resize:function()
{if(!this.signed_on_flag)
{return;}
var ns="js.browser_resize";if(ui.surf_mode)
{ns="js.surf.browser_resize";}
monitor.log_event(ns,{"bwidth":YAHOO.util.Dom.getViewportWidth(),"bheight":YAHOO.util.Dom.getViewportHeight(),"swidth":self.screen.width,"sheight":self.screen.height},true,0,0);this.timer=null;},monitor_browser_resize:function(type,args,obj)
{if(this.timer!=null)
{this.timer.cancel();}
this.timer=YAHOO.lang.later(5000,this,this.log_browser_resize,[]);},signed_on_cb:function(name,args,me)
{if(this.signed_on_flag)
{return;}
this.signed_on_flag=true;this.monitor_browser_resize();monitor.log_event("js.version",{"version":IMO.Constants.VERSION},true,0,0);monitor.log_event("js.flash",{"version":IMO.env.flash},true,0,0);window.onunload=function()
{me.cleanup();}},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);notificationManager=ui.getModule(IMO.Manager.Notification);monitor=ui.getModule(IMO.Manager.Monitor);ajax.evSignoffAll.subscribe(this.reloadCb,this,true);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);YAHOO.util.Event.addListener(window,"resize",this.monitor_browser_resize,this,true);}};}());(function(){var env;var ui;var monitor;IMO.Manager.Sound=function()
{this.beep_obj=null;this.mute=false;this.init();};IMO.Manager.Sound.prototype={NAME:"IMO.Manager.Sound",createBeepObj:function()
{if(!env.flash)
{return;}
var beep_div=document.createElement("div");document.body.appendChild(beep_div);var name="whistle";var swf_file="images/beep.swf";beep_div.innerHTML='<object '+'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '+'id="'+name+'" width="1" height="1">'+'<param name="allowScriptAccess" value="sameDomain"/>'+'<param name="movie" value="'+swf_file+'"/>'+'<param name="quality" value="high"/>'+'<embed src="'+swf_file+'" name="'+name+'" width="1" height="1" '+'quality="high" swLiveConnect=true '+'type="application/x-shockwave-flash"/>'+'</object>';this.beep_obj=get_movie(name);},beep:function()
{if(env.flash&&this.beep_obj.playSound&&!this.mute)
{this.beep_obj.playSound();}},set_mute:function(bool)
{this.mute=bool?true:false;if(this.mute)
{if(ui.surf_mode)
{monitor.log_event("js.surf.mute",1,true,(new Date()).getTime());}
else
{monitor.log_event("js.mute",1,true,(new Date()).getTime());}}
else
{if(ui.surf_mode)
{monitor.log_event("js.surf.unmute",1,true,(new Date()).getTime());}
else
{monitor.log_event("js.unmute",1,true,(new Date()).getTime());}}},init:function()
{env=IMO.env;ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);monitor=ui.getModule(IMO.Manager.Monitor);this.createBeepObj();}};}());(function(){var ui;var ajax;var accountManager;var notificationManager;IMO.Manager.Hints=function()
{this.accounts_linked=false;this.no_link=null;this.yes_link=null;this.init();};IMO.Manager.Hints.prototype={NAME:"IMO.Manager.Hints",yes_link_cb:function(ev,obj)
{notificationManager.clear();this.accounts_linked=true;YAHOO.util.Event.removeListener(this.yes_link,"click",this.yes_link_cb);var linked_accounts=[];for(var key in accountManager.accounts)
{var account=accountManager.accounts[key];linked_accounts.push({"uid":account.uid,"proto":account.proto,"autologin":1,"link":1});}
ajax.exec("link_accounts",JSON.encode({"uid":account.uid,"proto":account.proto,"ssid":ui.ssid,"accounts":linked_accounts}));},no_link_cb:function(ev,obj)
{notificationManager.clear();this.accounts_linked=true;YAHOO.util.Event.removeListener(this.no_link,"click",this.no_link_cb);},signed_on_cb:function(name,args,me)
{if(this.accounts_linked||accountManager.get_online_accounts().length<2)
{return;}
var yesid=YAHOO.util.Dom.generateId();var noid=YAHOO.util.Dom.generateId();var msg='<span class="hint_link">'+
_('Link your accounts?')+' '+'<span id="'+yesid+'" class="hint_action">'+
_('yes').toUpperCase()+'</span> '+
_('or')+' <span id="'+noid+'" class="hint_action">'+
_('no').toUpperCase()+'</span></span>'+'<div class="hint_link_exp">'+
_('Linking accounts saves you time. It allows you '+'to automatically sign into all of your accounts '+'when you sign into any one of them.')+'</div>';notificationManager.notify(msg,notificationManager.INFO,30000);this.yes_link=$(yesid);this.no_link=$(noid);YAHOO.util.Event.addListener(this.yes_link,"click",this.yes_link_cb,this,true);YAHOO.util.Event.addListener(this.no_link,"click",this.no_link_cb,this,true);},link_cb:function(ev,obj)
{YAHOO.log("already linked");this.accounts_linked=true;},set_accounts_linked:function(state)
{this.accounts_linked=state;},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);notificationManager=ui.getModule(IMO.Manager.Notification);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);accountManager.ev_link.subscribe(this.link_cb,this,true);}};}());(function(){var wo;var woGetModule;var woAccountManager;var woBlistManager;var woImManager;var woPrefManager;var ui;var ajax;var accountManager;var hintsManager;var blistManager;var imManager;var prefManager;IMO.Migrate=function()
{this.init();};IMO.Migrate.prototype={NAME:"IMO.Migrate",migrateAccountManager:function()
{hintsManager.set_accounts_linked(true);for(var key in woAccountManager.accounts)
{var woAccount=woAccountManager.accounts[key];var account=new IMO.Account(woAccount.uid,woAccount.proto,woAccount.autologin,woAccount.alias,woAccount.online);account.get=true;var k=__(account.uid,account.proto);accountManager.accounts[k]=account;if(account.online==true)
{accountManager.ev_signing_on.fire(account.uid,account.proto);accountManager.ev_signed_on.fire(account.uid,account.proto);}
else
{accountManager.ev_signing_on.fire(account.uid,account.proto);accountManager.ev_signed_on.fire(account.uid,account.proto);accountManager.ev_signed_off.fire(account.uid,account.proto);}}
accountManager.status=woAccountManager.status;accountManager.primitive=woAccountManager.primitive;},migrateBlistManager:function()
{var woGroups=woBlistManager.groups;for(var i=0;i<woGroups.length;i++)
{var group=new IMO.Group(woGroups[i].name,[]);blistManager.groups.push(group);}
var woBuddies=woBlistManager.buddies;for(var key in woBuddies)
{var woBuddy=woBuddies[key];var account=accountManager.get_account(woBuddy.account.uid,woBuddy.account.proto);var group=blistManager.get_group(woBuddy.group.name);var buddy=new IMO.Buddy(woBuddy.uid,woBuddy.proto,woBuddy.alias,account,group,woBuddy.status,woBuddy.primitive,woBuddy.resource);var k=__(account.uid,account.proto,buddy.uid);blistManager.buddies[k]=buddy;group.buddies.push(buddy);}
var bldiff=[];for(var i=0;i<blistManager.groups.length;i++)
{var group=blistManager.groups[i];bldiff.push(new IMO.Diff(IMO.Constants.GROUP_DIFF,null,group.get_guide(),group));}
for(var key in blistManager.buddies)
{var buddy=blistManager.buddies[key];bldiff.push(new IMO.Diff(IMO.Constants.BUDDY_DIFF,null,buddy.get_guide(),buddy));}
blistManager.ev_blist.fire(bldiff);},migrateImManager:function()
{var imList=woImManager.get_convs()
for(var key in imList)
{var woImConv=imList[key];var imConv=imManager.create_conv(woImConv.uid,woImConv.proto,woImConv.buid);for(var i=0;i<woImConv.messages.length;i++)
{var uid_msg=woImConv.messages[i];imConv.append_message(uid_msg[0],uid_msg[1]);}
if(woImConv.is_visible())
{imConv.show();}
else
{imConv.hide();}}},migrateAjax:function()
{ui.ssid=wo.IMO.UI.X.ssid;ajax.setSsid(ui.ssid);if(accountManager.get_num_accounts()>0)
{ajax.poll();}},migrateLanguage:function()
{IMO.i18n.lang=wo.IMO.i18n.lang;IMO.i18n.langData=wo.IMO.i18n.langData;IMO.i18n.codeToLang=wo.IMO.i18n.codeToLang;IMO.i18n.dict=wo.IMO.i18n.dict;IMO.i18n.totalStrings=wo.IMO.i18n.totalStrings;IMO.i18n.Functions.updateLang_cb(wo.IMO.i18n.dict);},migratePreferences:function()
{prefManager.prefs=woPrefManager.prefs;prefManager.id=woPrefManager.id;prefManager.firePrefs(prefManager.prefs);},migrate:function()
{wo=window.opener;woui=wo.IMO.UI.X;woAccountManager=woui.getModule(wo.IMO.Manager.Account);woBlistManager=woui.getModule(wo.IMO.Manager.Blist);woImManager=woui.getModule(wo.IMO.Manager.Conv.Im);woPrefManager=woui.getModule(wo.IMO.Manager.Preference);this.migrateLanguage();this.migratePreferences();this.migrateAccountManager();this.migrateBlistManager();this.migrateImManager();this.migrateAjax();woui.getModule(wo.IMO.Manager.Browser).unset_onunload();},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);hintsManager=ui.getModule(IMO.Manager.Hints);blistManager=ui.getModule(IMO.Manager.Blist);imManager=ui.getModule(IMO.Manager.Conv.Im);prefManager=ui.getModule(IMO.Manager.Preference);}};}());(function(){var ui;var ajax;var alertManager;var soundManager;var awayManager;var blistManager;var vcManager;var panelManager;var itabs;var env=IMO.env;IMO.Widget.Conv=function(uid,proto,buid,balias)
{this.uid=uid;this.proto=proto;this.buid=buid;this.balias=html_encode(balias);this.timer=null;this.ts_timer=null;this.messages=[];this.msg_history=null;this.msg_boxy=null;this.init();};IMO.Widget.Conv.prototype={NAME:"IMO.Widget.Conv",constructor:IMO.Widget.Conv,TYPING_TIMEOUT:5000,TIMESTAMP_TIMEOUT:60000,append_message:function(uid,msg)
{this.messages.push([uid,msg]);var sender=uid==this.uid?_('me'):pretty_uid(uid);var html_msg=htmlify_string(msg);var div=document.createElement("div");div.innerHTML='<b style="padding-right:.2em">'+
sender+':</b><span>'+html_msg+'</span>';this.msg_history.appendChild(div);this.msg_history.scrollTop=this.msg_history.scrollHeight;if(this.ts_timer)
{this.ts_timer.cancel();}
this.ts_timer=YAHOO.lang.later(this.TIMESTAMP_TIMEOUT,this,this.append_timestamp,[]);},append_timestamp:function()
{var d=(new Date());var ts=d.toLocaleTimeString().replace(/(\d+)\:(\d+)\:\d+/,"$1:$2");var div=document.createElement("div");div.innerHTML='<span class="msg_timestamp">'+
_('Sent at [TIME] on [DAY]',function(s){return sprintf(s,{'[TIME]':ts,'[DAY]':getDayOfWeek(d)});})+'</span>';this.msg_history.appendChild(div);this.msg_history.scrollTop=this.msg_history.scrollHeight;},set_typing_state:function(state)
{var html='';var balias=this.balias;if(state=="typing")
{html='<span class="im_typing">'+
_('[BUDDY] is typing...',function(s){return sprintf(s,{'[BUDDY]':balias});})+'</span>';}
else if(state=="typed")
{html='<span class="im_typing">'+
_('[BUDDY] has entered text',function(s){return sprintf(s,{'[BUDDY]':balias});})+'</span>';}
else if(state=="not_typing")
{html='&nbsp;';}
this._set_footer(html);},buddy_change:function(buddy)
{this._buddy_change(buddy);},alert:function(buddy,msg)
{if(this.in_focus()==false)
{alertManager.alert(buddy.alias);soundManager.beep();}
else if(awayManager.is_away==true)
{soundManager.beep();}},show:function(){},hide:function(){},focus:function(){},is_visible:function(){},in_focus:function(){},init:function()
{if(!ui)
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);blistManager=ui.getModule(IMO.Manager.Blist);vcManager=ui.getModule(IMO.Manager.Conv.Vc);alertManager=ui.getModule(IMO.Manager.Alert);soundManager=ui.getModule(IMO.Manager.Sound);awayManager=ui.getModule(IMO.Manager.Away);}},_set_footer:function(){},_buddy_change:function(buddy){},_send_typing_state:function(state)
{ajax.exec("im_typing",JSON.encode({"uid":this.uid,"proto":this.proto,"ssid":ui.ssid,"buid":this.buid,"status":state}));},_msg_box_keypress_cb:function(ev,obj)
{if(ev.keyCode==13)
{YAHOO.util.Event.preventDefault(ev);if(this.timer!=null)
{this.timer.cancel();this.timer=null;}
var msg=this.msg_box.value.replace(/\s+$/,'');if(msg.length>0)
{this.append_message(this.uid,msg);ajax.exec("send_im",JSON.encode({"ssid":ui.ssid,"uid":this.uid,"proto":this.proto,"buid":this.buid,"msg":msg}));}
this.msg_box.value="";}
else if(ev.keyCode==8&&(this.msg_box.value.length==1||this.msg_box.value.length==0))
{YAHOO.log("backspace to beginning");if(this.timer!=null)
{this.timer.cancel();this.timer=null;this._send_typing_state("not_typing");}}
else if(ev.keyCode!=9&&ev.keyCode!=27)
{if(this.timer==null)
{this._send_typing_state("typing");}
else
{this.timer.cancel();}
this.timer=YAHOO.lang.later(this.TYPING_TIMEOUT,this,this._send_typing_state,"typed",true);}},_start_call_cb:function(ev,obj)
{YAHOO.util.Event.preventDefault(ev);env.detectFlash();if(env.flash>=8)
{ajax.exec("start_call",JSON.encode({"uid":this.uid,"proto":this.proto,"ssid":ui.ssid,"buid":this.buid}));}},_send_video_cb:function(ev,obj)
{YAHOO.util.Event.preventDefault(ev);env.detectFlash();var vc_conv=vcManager.get_conv(this.uid,this.proto,this.buid);if(!vc_conv)
{vc_conv=vcManager.create_conv(this.uid,this.proto,this.buid);}
vc_conv.show();if(env.flash>=8)
{vc_conv.send_video();}}};IMO.Widget.Conv.Panels=function(uid,proto,buid,balias)
{IMO.Widget.Conv.Panels.superclass.constructor.call(this,uid,proto,buid,balias);};YAHOO.lang.extend(IMO.Widget.Conv.Panels,IMO.Widget.Conv,{NAME:"IMO.Widget.Conv.Panels",start_positions:[[250,20],[275,60],[300,100],[350,40],[375,80],[400,120]],alert:function(buddy,msg)
{IMO.Widget.Conv.Panels.superclass.alert.call(this,buddy,msg);if(this.in_focus()==false)
{this.imp.setHeaderColor("#FF9900");}},show:function()
{this.imp.show();},hide:function()
{this.imp.hide();},is_visible:function()
{return this.imp.cfg.getProperty("visible");},in_focus:function()
{return this.imp.infocus;},_set_footer:function(html)
{this.imp.setFooter(html);},resize_cb:function(evt,obj)
{this.resize();},resize:function()
{this.msg_box.style.width=(this.imp.south.offsetWidth-4)+"px";this.msg_box.style.height=(this.imp.south.offsetHeight-4)+"px";},msg_history_mouse_down_cb:function(ev,obj)
{YAHOO.util.Event.stopPropagation(ev);},msg_history_mouse_up_cb:function(ev,obj)
{if(get_mouse_selection()=="")
{panelManager.focus(this.imp);}},hide_cb:function(ev,obj)
{this.msg_history.style.overflowY="hidden";},show_cb:function(ev,obj)
{this.msg_history.style.overflowY="auto";},_buddy_change:function(buddy)
{this.header_div.firstChild.setAttribute("src",get_buddy_picon(buddy.iproto,buddy.primitive));},init:function()
{IMO.Widget.Conv.Panels.superclass.init.call(this);panelManager=ui.getModule(IMO.Manager.Panel);var pos=this.start_positions.shift();this.start_positions.push(pos);var config={xy:pos,width:"300px",height:"200px",minw:"225",minh:"225",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:true,maximize:true,close:true,resizable:true,layout:{south:[50,25,75]},fixWindowResize:true};this.imp=new IMO.Widget.ImPanel(YAHOO.util.Dom.generateId(),config);var buddy=blistManager.get_buddy(this.uid,this.proto,this.buid);this.header_div=document.createElement("div");YAHOO.util.Dom.addClass(this.header_div,"title");var buddy_name=html_encode(buddy.alias);if(this.proto==IMO.Constants.PROTO_MSN||buddy.alias==buddy.uid)
buddy_name=pretty_uid(buddy.uid);this.header_div.innerHTML=''+'<img align="top" onload="fixPng(this)" src="'+
get_buddy_picon(buddy.iproto,buddy.primitive)+'" />'+'<span style="padding-left:.2em">'+buddy_name+'</span>';this.imp.setHeader(this.header_div);this.imp.setBody("");this.imp.setFooter("&nbsp;");this.imp.render(document.body);this.actions_div=document.createElement("div");YAHOO.util.Dom.addClass(this.actions_div,"im_actions");this.send_video=document.createElement("span");this.send_video.style.paddingLeft="2px";this.send_video.style.paddingRight="2px";this.send_video.innerHTML='<a href="">'+_('Start Webcam')+'</a>';this.actions_div.appendChild(this.send_video);if(this.proto=='prpl-skype'){this.start_call=document.createElement("span");this.start_call.style.paddingLeft="2px";this.start_call.style.paddingRight="2px";this.start_call.innerHTML='<a href="">'+_('Start Call')+'</a>';this.actions_div.appendChild(this.start_call);}
this.imp.southResizer.appendChild(this.actions_div);this.msg_history=document.createElement("div");YAHOO.util.Dom.addClass(this.msg_history,"msg_history");this.imp.north.appendChild(this.msg_history);this.msg_box=document.createElement("textarea");YAHOO.util.Dom.addClass(this.msg_box,"msg_box");this.imp.south.appendChild(this.msg_box);this.resize();this.imp.layoutEvent.subscribe(this.resize_cb,this,true);this.imp.resizeEvent.subscribe(this.resize_cb,this,true);this.imp.hideEvent.subscribe(this.hide_cb,this,true);this.imp.showEvent.subscribe(this.show_cb,this,true);this.imp.set_focus_element(this.msg_box);YAHOO.util.Event.addListener(this.msg_box,"keypress",this._msg_box_keypress_cb,this,true);YAHOO.util.Event.addListener(this.msg_history,"mousedown",this.msg_history_mouse_down_cb,this,true);YAHOO.util.Event.addListener(this.msg_history,"mouseup",this.msg_history_mouse_up_cb,this,true);YAHOO.util.Event.addListener(this.send_video,"click",this._send_video_cb,this,true);if(this.proto=='prpl-skype'){YAHOO.util.Event.addListener(this.start_call,"click",this._start_call_cb,this,true);}}});IMO.Widget.Conv.Tabs=function(uid,proto,buid,balias)
{IMO.Widget.Conv.Tabs.superclass.constructor.call(this,uid,proto,buid,balias);};YAHOO.lang.extend(IMO.Widget.Conv.Tabs,IMO.Widget.Conv,{NAME:"IMO.Widget.Conv.Tabs",focus:function()
{itabs.show_tab(this.id);},alert:function(buddy,msg)
{IMO.Widget.Conv.Tabs.superclass.alert.call(this,buddy,msg);if(this.in_focus()==false)
{YAHOO.util.Dom.addClass(this.itab.header_dom_node,this.itab.CSS_HEADER_ACTIVITY);var imPreview=ui.getWidget(IMO.Widget.ImPreview);imPreview.preview_im(buddy,msg);}
if(ui.client_mode)
{var HTML=this._assembleHTMLMessage(buddy,msg);window.external.HTMLPopup(HTML,this.itab.id,250,75,IMO.Constants.APPEAR_TIME,IMO.Constants.SHOW_TIME,IMO.Constants.HIDE_TIME);}},show:function()
{itabs.tabs.ShowTab(this.itab);},hide:function()
{itabs.tabs.HideTab(this.itab.id);},is_visible:function()
{return(itabs.tabs.GetActiveTabsIndex(this.itab)!=-1);},in_focus:function()
{return itabs.is_focused_tab(this.itab);},_buddy_change:function(buddy)
{this.buddy_picon.setAttribute("src",get_buddy_picon(buddy.iproto,buddy.primitive));this.buddy_status_div.innerHTML=buddy.GetStatus();},_set_footer:function(html)
{this.footer.innerHTML=html;},msg_history_mouse_up_cb:function(ev,obj)
{if(get_mouse_selection()=="")
{this.msg_box.focus();}},del_buddy_cb:function(ev,obj)
{if(!this.delete_buddy_console)
{this.delete_buddy_console=new IMO.Widget.DeleteBuddyConsole();}
var buddy=blistManager.get_buddy(this.uid,this.proto,this.buid);this.delete_buddy_console.show(this.uid,buddy);},_assembleHTMLMessage:function(buddy,message)
{var html_msg=htmlify_string(message);var HTML=''+'<html>'+'<head>'+'<style type="text/css">'+'*'+'{'+'  font-family: arial, sans-serif;'+'  font-size: 12px;'+'}'+'.win_box'+'{'+'    position:absolute;'+'    top:0px;'+'    left:0px;'+'    width:249px;'+'    height:100%;'+'    border-top: 2px solid lightblue;'+'    border-left: 2px solid lightblue;'+'    border-right: 2px solid lightblue;'+'    cursor: pointer;'+'}'+'.win_msg'+'{ '+'    float:left;'+'    width:170px;'+'    font-size:12px;'+'    padding-left:.2em;'+'}'+'</style>'+'</head>'+'<body>'+'<div class="win_box">'+'<div style="float:left;">'+'<img src="https://imo.im/images/imo_75.gif">'+'</div>'+'<div class="win_msg">'+'<b>'+
_('[BUDDY] says:',function(s){return sprintf(s,{'[BUDDY]':html_encode(pretty_uid(buddy.alias))});})+'</b><br/>'+'<div style="padding-top:1em;">'+html_msg+'</div>'+'</div>'+'</div>'+'</body>'+'</html>';return HTML;},init:function()
{IMO.Widget.Conv.Tabs.superclass.init.call(this);if(!itabs)
{itabs=ui.getWidget(IMO.Widget.SurfTabs);}
this.id=__(this.uid,this.proto,this.buid);this.div=document.createElement("div");var buddy=blistManager.get_buddy(this.uid,this.proto,this.buid);var buddy_name=html_encode(buddy.alias);if(this.proto==IMO.Constants.PROTO_MSN||buddy.alias==buddy.uid)
{buddy_name=pretty_uid(buddy.uid);}
this.del_buddy_div=document.createElement("div");YAHOO.util.Dom.addClass(this.del_buddy_div,"del_buddy");this.del_buddy_div.innerHTML='<span class="action">'+
_('Delete Buddy')+'</span>';this.div.appendChild(this.del_buddy_div);this.actions_div=document.createElement("div");YAHOO.util.Dom.addClass(this.actions_div,"im_actions");this.send_video=document.createElement("span");YAHOO.util.Dom.addClass(this.send_video,"action");this.send_video.style.paddingLeft="2px";this.send_video.style.paddingRight="2px";this.send_video.innerHTML=_('Start Webcam');this.actions_div.appendChild(this.send_video);if(this.proto=='prpl-skype'){this.start_call=document.createElement("span");YAHOO.util.Dom.addClass(this.start_call,"action");this.start_call.style.paddingLeft="2px";this.start_call.style.paddingRight="2px";this.start_call.innerHTML=_('Start Call');this.actions_div.appendChild(this.start_call);}
this.div.appendChild(this.actions_div);var bsid=YAHOO.util.Dom.generateId();this.buddy_info=document.createElement("div");YAHOO.util.Dom.addClass(this.buddy_info,"im_buddy_info");var buddy_info_name=(buddy.iproto==IMO.Constants.PROTO_FB?html_encode(buddy.alias):this.buid);this.buddy_info.innerHTML='<span class="im_buid">'+
buddy_info_name+': </span><span id="'+bsid+'" >'+
buddy.GetStatus()+'</span>';this.div.appendChild(this.buddy_info);this.msg_history=document.createElement("div");YAHOO.util.Dom.addClass(this.msg_history,"msg_history");this.div.appendChild(this.msg_history);this.msg_box=document.createElement("textarea");YAHOO.util.Dom.addClass(this.msg_box,"msg_box");this.fieldset=document.createElement("fieldset");YAHOO.util.Dom.addClass(this.fieldset,"msg_box_fieldset");this.fieldset.appendChild(this.msg_box);this.div.appendChild(this.fieldset);this.footer=document.createElement("div");this.div.appendChild(this.footer);this.itab=itabs.tabs.AddTab(this.id,buddy_name);this.itab.body_dom_node.appendChild(this.div);var tmp=document.createElement("div");tmp.innerHTML='<img style="margin-top:.1em" '+'align="top" onload="fixPng(this)" src="'+
get_buddy_picon(buddy.iproto,buddy.primitive)+'" />';this.buddy_picon=tmp.firstChild;this.itab.header_dom_node.insertBefore(this.buddy_picon,this.itab.header_dom_node.firstChild);this.buddy_status_div=$(bsid);YAHOO.util.Event.addListener(this.msg_box,"keypress",this._msg_box_keypress_cb,this,true);YAHOO.util.Event.addListener(this.msg_history,"mousedown",this.msg_history_mouse_down_cb,this,true);YAHOO.util.Event.addListener(this.msg_history,"mouseup",this.msg_history_mouse_up_cb,this,true);YAHOO.util.Event.addListener(this.del_buddy_div,"click",this.del_buddy_cb,this,true);YAHOO.util.Event.addListener(this.send_video,"click",this._send_video_cb,this,true);if(this.proto=='prpl-skype'){YAHOO.util.Event.addListener(this.start_call,"click",this._start_call_cb,this,true);}}});}());var flash_shutdown_vc;(function(){var ui;var ajax;var vcManager;var blistManager;var notificationManager;var vcConsole;var monitor;var env=IMO.env;IMO.Widget.VcConv=function(uid,proto,buid,recv_stream,send_stream,type)
{this.uid=uid;this.proto=proto;this.buid=buid;this.recv_stream=recv_stream;this.swf_id=null;this.swf=null;if(!send_stream){send_stream=create_ssid();}
if(!type){type="videochat";}
this.send_stream=send_stream;if(type.substr(0,10)=="voicecall-"){this.flashfile="voicecall.swf?v="+VOICECALL_VERSION;this.type="voicecall";this.height=160;this.flashvars="send_stream="+this.send_stream+"&"+"recv_stream="+this.recv_stream+"&"+"call_type="+type.substr(10)}else{this.flashfile="ivc.swf?v="+IVC_VERSION;this.height=265;this.flashvars="send_stream="+this.send_stream+"&"+"recv_stream="+this.recv_stream}
this.flashvars=this.flashvars.replace(/&/g,'&amp;');this.init();};IMO.Widget.VcConv.prototype={constructor:IMO.Widget.VcConv,NAME:"IMO.Widget.VcConv",show:function(){},hide:function(namespace)
{if(this.swf)
{try{var myswf=this.swf;this.swf=null;myswf.sd();}catch(err){}}
namespace=namespace?namespace:"js.video_close";this._close(namespace);vcManager.delete_conv(this.uid,this.proto,this.buid);},buddy_change:function(buddy){},send_video:function()
{ajax.exec("send_video",JSON.encode({"uid":this.uid,"proto":this.proto,"buid":this.buid,"stream":this.send_stream,"ssid":ui.ssid}));},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);vcManager=ui.getModule(IMO.Manager.Conv.Vc);blistManager=ui.getModule(IMO.Manager.Blist);notificationManager=ui.getModule(IMO.Manager.Notification);monitor=ui.getModule(IMO.Manager.Monitor);},_close:function(namespace){},_get_swf_html:function()
{return'<object '+'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'+'width="215" height="'+this.height+'" id="'+this.swf_id+'" ><param name="FlashVars" value="'+this.flashvars+'" />'+'<param name="allowScriptAccess" value="sameDomain" />'+'<param name="movie" value="/images/'+this.flashfile+'"/>'+'<param name="quality" value="high" /><param name="bgcolor" '+'value="#ADD8E6" /><embed src="/images/'+this.flashfile+'" FlashVars="'+this.flashvars+'" quality="high" bgcolor="#ADD8E6" '+'width="215" height="'+this.height+'" '+'name="'+this.swf_id+'" allowScriptAccess="sameDomain" '+'type="application/x-shockwave-flash" /></object>';},_no_flash_html:'<h2>Video chat requires Adobe Flash '+'player 8 or higher.<br /><a target="_blank" '+'href="http://macromedia.com/go/getflashplayer">'+'Get the latest Flash player</a>.</h2>'};IMO.Widget.VcConv.Panels=function(uid,proto,buid,recv_stream,send_stream,type)
{IMO.Widget.VcConv.Panels.superclass.constructor.call(this,uid,proto,buid,recv_stream,send_stream,type);};YAHOO.lang.extend(IMO.Widget.VcConv.Panels,IMO.Widget.VcConv,{NAME:"IMO.Widget.VcConv.Panels",start_positions:[[10,320],[10,10],[240,320],[470,320]],show:function()
{this.vcp.show();monitor.log_event("js.recv_video_im",{"imo":1},true,0,0);},buddy_change:function(buddy)
{if(buddy.primitive==IMO.Constants.PRIM_OFFLINE)
{this.hide();}
else
{this.header_div.firstChild.setAttribute("src",get_buddy_picon(buddy.proto,buddy.primitive));}},_close_cb:function(ev,obj)
{this.hide("js.video_close_x");},_close:function(namespace)
{if(namespace)
{monitor.log_event(namespace,{"imo":1},true,0,0);}},init:function()
{IMO.Widget.VcConv.Panels.superclass.init.call(this);var count=0;for(var key in vcManager.convs){count++;};var pos=this.start_positions[count%this.start_positions.length];var config={xy:pos,width:"225px",height:(this.height+40)+"px",visible:true,draggable:true,underlay:"none",constraintoviewport:true,minimize:false,maximize:false,close:true,resizable:false,layout:{},fixWindowResize:true};this.vcp=new IMO.Widget.VcPanel(YAHOO.util.Dom.generateId(),config);var buddy=blistManager.get_buddy(this.uid,this.proto,this.buid);this.header_div=document.createElement("div");YAHOO.util.Dom.addClass(this.header_div,"title");if(buddy)
{var buddy_name=buddy.alias;if(this.proto==IMO.Constants.PROTO_MSN||buddy.alias==buddy.uid)
buddy_name=pretty_uid(buddy.uid);this.header_div.innerHTML=''+'<img align="top" onload="fixPng(this)" src="'+
get_buddy_picon(this.proto,buddy.primitive)+'" />'+'<span style="padding-left:.2em">'+buddy_name+'</span>';}
else
{this.header_div.innerHTML=''+'<img align="top" onload="fixPng(this)" src="'+
get_buddy_picon(this.proto,IMO.Constants.PRIM_AVAILABLE)+'" />'+'<span style="padding-left:.2em">'+this.buid+'</span>';}
this.vcp.setHeader(this.header_div);this.vcp.setBody("");this.vcp.setFooter("&nbsp;");this.vcp.render(document.body);this.vcp.hideEvent.subscribe(this._close_cb,this,true);this.swf_id=YAHOO.util.Dom.generateId(null,"imo");this.vcp.north.setAttribute("align","center");this.vcp.north.style.top="5px";this.vcp.north.style.background="lightblue";if(env.flash<8)
{this.vcp.north.innerHTML=this._no_flash_html;}
else
{this.vcp.north.innerHTML=this._get_swf_html();this.swf=get_movie(this.swf_id);}}});IMO.Widget.VcConv.Tabs=function(uid,proto,buid,recv_stream,send_stream,type)
{IMO.Widget.VcConv.Tabs.superclass.constructor.call(this,uid,proto,buid,recv_stream,send_stream,type);};YAHOO.lang.extend(IMO.Widget.VcConv.Tabs,IMO.Widget.VcConv,{NAME:"IMO.Widget.VcConv.Tabs",show:function()
{monitor.log_event("js.recv_video_im",{"surf":1},true,0,0);},buddy_change:function(buddy)
{if(buddy.primitive==IMO.Constants.PRIM_OFFLINE)
{this.hide();}
else
{}},_close_cb:function(ev,obj)
{this.hide("js.video_close_x");},_close:function(namespace)
{if(namespace)
{monitor.log_event(namespace,{"surf":1},true,0,0);}
vcConsole.remove_vc(this.video_div);},init:function()
{IMO.Widget.VcConv.Tabs.superclass.init.call(this);vcConsole=ui.getWidget(IMO.Widget.SurfVideo);this.video_div=document.createElement("div");YAHOO.util.Dom.addClass(this.video_div,"vc_conv");vcConsole.add_vc(this.video_div);this.close_div=document.createElement("div");YAHOO.util.Dom.addClass(this.close_div,"vc_close");var close_id=YAHOO.util.Dom.generateId();this.close_div.innerHTML='<img class="vc_close_img" '+'id="'+close_id+'" src="/images/close12_1.gif" />';this.video_div.appendChild(this.close_div);this.swf_id=YAHOO.util.Dom.generateId(null,"imo");this.content_div=document.createElement("div");this.video_div.appendChild(this.content_div);if(env.flash<8)
{this.content_div.innerHTML=this._no_flash_html;}
else
{this.content_div.innerHTML=this._get_swf_html();this.swf=get_movie(this.swf_id);}
YAHOO.util.Event.addListener($(close_id),"click",this._close_cb,this,true);}});IMO.Widget.VcConv.VideoDiv=function(dom_base)
{this.dom_base=dom_base;this.init();};IMO.Widget.VcConv.VideoDiv.prototype={NAME:"IMO.Widget.VcConv.VideoDiv",add_vc:function(el)
{this.dom_base.insertBefore(el,this.div);},remove_vc:function(el)
{this.dom_base.removeChild(el);},init:function()
{this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"vc_console");this.dom_base.appendChild(this.div);}};flash_shutdown_vc=function(stream)
{var vc_conv=null;for(var key in vcManager.convs)
{if(vcManager.convs[key].send_stream==stream)
{vc_conv=vcManager.convs[key];break;}}
if(vc_conv!=null)
{vc_conv.hide();if(!ui.surf_mode)
{vc_conv.vcp.doHide(null,vc_conv.vcp);}
notificationManager.notify(_('[BUDDY] has closed the video chat',function(s){return sprintf(s,{'[BUDDY]':vc_conv.buid});}));}};}());IMO.Widget.LoadingDiv=function(dom_base)
{this.dom_base=dom_base;this.loading_div=dom_base;this.init();};IMO.Widget.LoadingDiv.prototype={NAME:"IMO.Widget.LoadingDiv",remove:function()
{this.dom_base.removeChild(this.loading_div);},init:function()
{this.loading_div=document.createElement("div");YAHOO.util.Dom.addClass(this.loading_div,"loading_div");this.loading_div.innerHTML=_("Loading...");this.dom_base.appendChild(this.loading_div);}};(function(){var ui;var ajax;var accountManager;var blistManager;var panelManager;IMO.Widget.AddBuddy=function()
{this.init();};IMO.Widget.AddBuddy.prototype={NAME:"IMO.Widget.AddBuddy",constructor:IMO.Widget.AddBuddy,show:function()
{accountManager.ev_signed_off.subscribe(this.signed_off_cb,this,true);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);blistManager.ev_blist.subscribe(this.blist_change_cb,this,true);this.populate_account_chooser();this.populate_group_chooser();this._show();},_show:function()
{},cancel_add_cb:function()
{accountManager.ev_signed_off.unsubscribe(this.signed_off_cb,this);accountManager.ev_signed_on.unsubscribe(this.signed_on_cb,this);blistManager.ev_blist.unsubscribe(this.blist_change_cb,this);this._hide();},_hide:function()
{},add_buddy_cb:function()
{this.aperror.style.display="none";var buddy=trim_string(this.buddy_input.value);if(!buddy)
{this.aperror.style.display="";return;}
var item=this.account_chooser.get_selected();var uid=item.getAttribute("uid");var proto=item.getAttribute("proto");item=this.group_chooser.get_selected();item=this.group_chooser.get_selected();var group=item.getAttribute("name");ajax.exec("add_buddy",JSON.encode({"ssid":ui.ssid,"uid":uid,"proto":proto,"buid":buddy,"group":group}));this.buddy_input.value='';this._hide();},signed_off_cb:function()
{this.populate_account_chooser();},signed_on_cb:function()
{this.populate_account_chooser();},blist_change_cb:function()
{this.populate_group_chooser();},populate_account_chooser:function()
{this.account_chooser.clear();var account;var prim=accountManager.primitive;var accounts=accountManager.get_online_accounts();for(var i=0;i<accounts.length;i++)
{account=accounts[i];this.account_chooser.add_item(account.uid,get_buddy_picon(account.iproto,prim,true),{"uid":account.uid,"proto":account.proto});}
if(this.account_chooser.count==0)
{this.cancel_add_cb();}},populate_group_chooser:function()
{this.group_chooser.clear();var group;var groups=blistManager.groups;if(groups.length==0||(groups.length==1&&groups[0].name==IMO.Constants.OFFLINE_GROUP))
{groups=[new IMO.Group(_('Buddies',false),[])];}
for(var i=0;i<groups.length;i++)
{group=groups[i];if(group.name==IMO.Constants.OFFLINE_GROUP)
{continue;}
this.group_chooser.add_item(html_encode(group.name),null,{"name":group.name});}},keypress_cb:function(ev,obj)
{if(ev.type=="keypress"&&ev.keyCode==13)
{this.add_buddy_cb();}},_create_ap:function()
{},_set_ap_html:function()
{},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);accountManager=ui.getModule(IMO.Manager.Account);blistManager=ui.getModule(IMO.Manager.Blist);if(!ui.surf_mode)
{panelManager=ui.getModule(IMO.Manager.Panel);}
this.ap=this._create_ap();var aid=YAHOO.util.Dom.generateId();var cid=YAHOO.util.Dom.generateId();var eid=YAHOO.util.Dom.generateId();var acid=YAHOO.util.Dom.generateId();var gcid=YAHOO.util.Dom.generateId();var biid=YAHOO.util.Dom.generateId();this._set_ap_html(aid,cid,eid,acid,gcid,biid);this.account_chooser=new IMO.Widget.Chooser($(acid));this.group_chooser=new IMO.Widget.Chooser($(gcid));this.buddy_input=$(biid);this.aperror=$(eid);YAHOO.util.Event.addListener(aid,"click",this.add_buddy_cb,this,true);YAHOO.util.Event.addListener(cid,"click",this.cancel_add_cb,this,true);YAHOO.util.Event.addListener(this.buddy_input,"keypress",this.keypress_cb,this,true);}};IMO.Widget.AddBuddy.Panels=function()
{IMO.Widget.AddBuddy.Panels.superclass.constructor.call(this);};YAHOO.lang.extend(IMO.Widget.AddBuddy.Panels,IMO.Widget.AddBuddy,{NAME:"IMO.Widget.AddBuddy.Panels",_show:function()
{IMO.Widget.AddBuddy.Panels.superclass._show.call(this);this.ap.show();this.buddy_input.focus();panelManager.focus(this.ap);},_hide:function()
{panelManager.remove(this.ap);this.ap.destroy();},_create_ap:function()
{var config={width:"300px",height:"175px",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:false,maximize:false,close:false,resizable:false,fixedcenter:true,layout:{},fixWindowResize:true};var id=YAHOO.util.Dom.generateId(null,"add_buddy");var ap=new IMO.Widget.BasePanel(id,config);ap.setTitle(_('Add Buddy'));ap.setBody("");ap.setFooter("&nbsp;");ap.render(document.body);return ap},_set_ap_html:function(aid,cid,eid,acid,gcid,biid)
{var html='<div><table><tbody>'+'<tr align="right"><td class="ad_label">'+
_('Account')+':</td>'+'<td align="left"><div style="position:relative;" id="'+
acid+'"></div></td></tr>'+'<tr align="right"><td class="ad_label">'+
_('Group')+':</td>'+'<td align="left"><div style="position:relative;" id="'+
gcid+'"></div></td></tr>'+'<tr align="right"><td class="ad_label">'+
_('Buddy')+':</td>'+'<td align="left"><input id="'+biid+'" size="29"/></td></tr>'+'</tbody></table></div>'+'<div id="'+eid+'" style="padding: .5em; display:none">'+'<span class="error">'+
_('Please specify a buddy.')+'</span>'+'</div>'+'<div style="position:absolute; bottom:0pt; '+'right:0pt; padding:.5em;">'+'<button id="'+aid+'" style="margin-right:.25em">'+
_('Add')+'</button>'+'<button id="'+cid+'">'+
_('Cancel')+'</button></div>';this.ap.north.innerHTML=html;}});IMO.Widget.AddBuddy.Tabs=function()
{IMO.Widget.AddBuddy.Tabs.superclass.constructor.call(this);};YAHOO.lang.extend(IMO.Widget.AddBuddy.Tabs,IMO.Widget.AddBuddy,{NAME:"IMO.Widget.AddBuddy.Tabs",_show:function()
{IMO.Widget.AddBuddy.Tabs.superclass._show.call(this);this.ap.style.display="";this.buddy_input.focus();},_hide:function()
{this.buddy_input.value='';this.ap.style.display="none";},_create_ap:function()
{var ap=document.createElement("div");YAHOO.util.Dom.addClass(ap,"add_buddy_console");document.body.appendChild(ap);return ap},_set_ap_html:function(aid,cid,eid,acid,gcid,biid)
{var html='<div style="background:lightblue; '+'color:white; font-weight: bold; padding: .25em;">'+
_('Add Buddy')+'</div>'+'<div><table><tbody>'+'<tr align="right"><td class="ad_label">'+
_('Account')+':</td>'+'<td align="left"><div style="position:relative;" id="'+
acid+'"></div></td></tr>'+'<tr align="right"><td class="ad_label">'+
_('Group')+':</td>'+'<td align="left"><div style="position:relative;" id="'+
gcid+'"></div></td></tr>'+'<tr align="right"><td class="ad_label">'+
_('Buddy')+':</td>'+'<td align="left"><input id="'+biid+'" size="29"/></td></tr>'+'</tbody></table></div>'+'<div id="'+eid+'" style="padding: .5em; display:none">'+'<span class="error">'+
_('Please specify a buddy.')+'</span></div>'+'<div style="padding:.5em; text-align: right">'+'<button id="'+aid+'" style="margin-right:.25em">'+
_('Add')+'</button>'+'<button id="'+cid+'">'+
_('Cancel')+'</button></div>';this.ap.innerHTML=html;}});}());(function(){var ajax;var ssid;IMO.Widget.DeleteBuddyConsole=function()
{this.buddy=null;this.uid=null;this.init();};IMO.Widget.DeleteBuddyConsole.prototype={show:function(uid,buddy)
{this.uid=uid;this.buddy=buddy;this.text_div.innerHTML=_('Delete buddy')+' '+'<span style="font-weight:bold">'+this.buddy.uid+'</span>?';this.div.style.display="";},delete_buddy_cb:function(ev,obj)
{ajax.exec("del_buddy",JSON.encode({"ssid":ssid,"uid":this.uid,"proto":this.buddy.proto,"buid":this.buddy.uid,"group":this.buddy.group.name}));this.uid=null;this.buddy=null;this.div.style.display="none";},cancel_delete_cb:function(ev,obj)
{this.uid=null;this.buddy=null;this.div.style.display="none";},init:function()
{var ui=IMO.UI.X;ssid=ui.ssid;ajax=ui.getModule(IMO.Ajax);var tid=YAHOO.util.Dom.generateId();var yid=YAHOO.util.Dom.generateId();var nid=YAHOO.util.Dom.generateId();this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"del_buddy_console");this.div.innerHTML='<div style="background:lightblue; '+'color:white; font-weight: bold; padding: .25em;">'+
_('Delete Buddy')+'</div>'+'<div id="'+tid+'" style="padding-left:.25em"></div>'+'<div style="padding:.5em; text-align:right">'+'<button id="'+yid+'" style="margin-right:.25em">'+
_('yes',function(s){return s.toUpperCase()})+'</button>'+'<button id="'+nid+'">'+
_('No')+'</button></div>';document.body.appendChild(this.div);this.text_div=$(tid);YAHOO.util.Event.addListener($(yid),"click",this.delete_buddy_cb,this,true);YAHOO.util.Event.addListener($(nid),"click",this.cancel_delete_cb,this,true);}};}());(function(){IMO.Widget.ImPreview=function(dom_base)
{this.dom_base=dom_base;this.div=null;this.init();};IMO.Widget.ImPreview.prototype={NAME:"IMO.Widget.ImPreview",MSG_TIMEOUT:7000,preview_im:function(buddy,im)
{this.div.style.display="";var msg_div=document.createElement("div");msg_div.setAttribute("tabid",__(buddy.account.uid,buddy.proto,buddy.uid));var html_msg=htmlify_string(im);msg_div.innerHTML='<b style="padding-right:.2em">'+
pretty_uid(buddy.alias)+':</b>'+'<span>'+html_msg+'</span>';this.div.appendChild(msg_div);YAHOO.lang.later(this.MSG_TIMEOUT,this,this.clear_msg,msg_div);},init:function()
{this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"im_preview");this.div.style.display="none";this.dom_base.appendChild(this.div);YAHOO.util.Event.addListener(this.div,"click",this.click_cb,this,true);},click_cb:function(ev,obj)
{this.div.style.display="none";var tabid=this.div.firstChild.getAttribute("tabid");var itabs=IMO.UI.X.getWidget(IMO.Widget.SurfTabs);itabs.show_tab(tabid);},clear_msg:function(msg_div)
{if(this.div.childNodes.length==1)
{this.div.style.display="none";}
this.div.removeChild(msg_div);}};}());(function(){var ui;var ajax;var monitor;IMO.Widget.Switch2Amy=function(dom_base)
{this.dom_base=dom_base;this.init();};IMO.Widget.Switch2Amy.prototype={NAME:"IMO.Widget.Switch2Amy",full_screen:function(ev,obj)
{monitor.log_event("js.surf.full_screen",1,true,(new Date()).getTime());ajax.shutdownAjax();var win=window.open('/index.html','_blank','width='+self.screen.availWidth+', height='+self.screen.availHeight+','+'toolbar=yes, location=yes, directories=yes,'+'status=yes, menubar=yes, scrollbars=yes, copyhistory=no,'+'resizable=yes');},init:function()
{ui=IMO.UI.X;ajax=ui.getModule(IMO.Ajax);monitor=ui.getModule(IMO.Manager.Monitor);var fsid=YAHOO.util.Dom.generateId();this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"surf_switch");this.dom_base.appendChild(this.div);if(ui.client_mode)
{return;}
this.div.innerHTML='<button id="'+fsid+'">'+
_('switch to full screen')+'</button>';YAHOO.util.Event.addListener($(fsid),"click",this.full_screen,this,true);}};}());(function(){var ui;var itabs;var accountManager;IMO.Widget.SurfActions=function(dom_base)
{this.links_initialized=false;this.dom_base=dom_base;this.init();};IMO.Widget.SurfActions.prototype={NAME:"IMO.Widget.SurfActions",blist_cb:function(ev,obj)
{if(!itabs)
{itabs=ui.getWidget(IMO.Widget.SurfTabs);}
itabs.show_tab("tabs_blist");},signon_cb:function(ev,obj)
{if(!itabs)
{itabs=ui.getWidget(IMO.Widget.SurfTabs);}
itabs.show_tab("tabs_sign_on");},signoff_cb:function(ev,obj)
{accountManager.signoff_all();},signed_on_cb:function(name,args,me)
{if(!this.links_initialized)
{this.actions_links.style.visibility="visible";YAHOO.util.Event.addListener(this.actions_blist,"click",this.blist_cb,this,true);YAHOO.util.Event.addListener(this.actions_sign_on,"click",this.signon_cb,this,true);YAHOO.util.Event.addListener(this.actions_sign_off,"click",this.signoff_cb,this,true);this.links_initialized=true;}},init:function()
{ui=IMO.UI.X;accountManager=ui.getModule(IMO.Manager.Account);this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"actions");this.div.innerHTML=''+'<img class="logo" onload="fixPng(this)" '+'src="/images/logo_50x100.png" /> '+'<div id="actions_links" style="visibility:hidden">'+'<span class="action" id="actions_blist">'+
_('Buddy List')+'</span> - '+'<span class="action" id="actions_sign_on">'+
_('Sign on')+'</span> - '+'<span class="action" id="actions_sign_off">'+
_('Sign off')+'</span>'+'</div>'+'<div class="actions_divider"></div>';this.dom_base.appendChild(this.div);this.actions_links=$("actions_links");this.actions_blist=$("actions_blist");this.actions_sign_on=$("actions_sign_on");this.actions_sign_off=$("actions_sign_off");accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);}};}());(function(){var alertManager;var accountManager;var imManager;IMO.Widget.SurfTabs=function(dom_base)
{this.dom_base=dom_base;this.init();};IMO.Widget.SurfTabs.prototype={NAME:"IMO.Widget.SurfTabs",signed_on_cb:function(name,args,me)
{this.tabs.FocusTab(this.blist_tab);},show_tab:function(id)
{var tab=this.tabs.GetTab(id);if(tab)
{if(id=="tabs_sign_on")
{this.tabs.FocusTab(tab,0);}
else if(id=="tabs_blist")
{var stab=this.tabs.GetTab("tabs_sign_on");var index=this.tabs.GetActiveTabsIndex(stab);if(index==-1)
{this.tabs.FocusTab(tab,0);}
else
{this.tabs.FocusTab(tab,1);}}
else
{this.tabs.FocusTab(tab);}}},is_focused_tab:function(tab)
{return this.tabs.GetFocusedTab()==tab;},close_focused_tab:function()
{var tab=this.tabs.GetFocusedTab();if(tab)
{this.tabs.HideTab(tab.id);}},focus_next_tab:function()
{this.tabs.FocusNext();},focus_prev_tab:function()
{this.tabs.FocusPrev();},focus_tab_cb:function(name,args,me)
{alertManager.stop();var tab=args[0];YAHOO.util.Dom.removeClass(tab.header_dom_node,tab.CSS_HEADER_ACTIVITY);var im_conv=imManager.get_convs()[tab.id];if(im_conv)
{im_conv.msg_box.focus();var mh=im_conv.msg_history;mh.scrollTop=mh.scrollHeight;}},init:function()
{var ui=IMO.UI.X;accountManager=ui.getModule(IMO.Manager.Account);alertManager=ui.getModule(IMO.Manager.Alert);imManager=ui.getModule(IMO.Manager.Conv.Im);ui.getModule(IMO.Manager.Keyboard).setItabs(this);this.tabs=new IMO.Widget.ITabs(this.dom_base,"tabs");this.acc_tab=this.tabs.AddTab("tabs_sign_on",_("Sign on"));this.blist_tab=this.tabs.AddTab("tabs_blist",_("Buddy List"));this.tabs.HideTab(this.blist_tab.id);this.tabs.ev_focus.subscribe(this.focus_tab_cb,this,true);accountManager.ev_signed_on.subscribe(this.signed_on_cb,this,true);}};}());(function(){IMO.Widget.SurfVideo=function(dom_base)
{this.dom_base=dom_base;this.init();};IMO.Widget.SurfVideo.prototype={NAME:"IMO.Widget.SurfVideo",add_vc:function(el)
{this.dom_base.insertBefore(el,this.div);},remove_vc:function(el)
{this.dom_base.removeChild(el);},init:function()
{this.div=document.createElement("div");YAHOO.util.Dom.addClass(this.div,"vc_console");this.dom_base.appendChild(this.div);}};}());IMO.UI.Surf=function()
{IMO.UI.Surf.superclass.constructor.call(this);this.surf_mode=true;};YAHOO.lang.extend(IMO.UI.Surf,IMO.UI,{preProcess:function()
{IMO.UI.Surf.superclass.preProcess.call(this);var query=location.search.substring(1);if(query)
{var keyvals=parse_query_string(query);if(keyvals["client_ver"])
{this.client_mode=true;this.client_ver=keyvals["client_ver"];}}},postProcess:function()
{IMO.UI.Surf.superclass.postProcess.call(this);var monitor=this.getModule(IMO.Manager.Monitor);monitor.log_event("js.surf.load_time",{"user-agent":navigator.userAgent.toLowerCase()},true,g_start_time,(new Date()).getTime());if(this.client_mode)
{monitor.log_event("client.load_page",{"version":this.client_ver},true,0,0);}
g_image_preloader.preload_imo_images();},initModules:function()
{IMO.UI.Surf.superclass.initModules.call(this);var convIm=this.getModule(IMO.Manager.Conv.Im);convIm.convWidget=IMO.Widget.Conv.Tabs;var convVc=this.getModule(IMO.Manager.Conv.Vc);convVc.convWidget=IMO.Widget.VcConv.Tabs;},initWidgets:function()
{IMO.UI.Surf.superclass.initWidgets.call(this);this._addWidget(IMO.Widget.SurfActions,new IMO.Widget.SurfActions(document.body));this._addWidget(IMO.Widget.SystemConsole,new IMO.Widget.SystemConsole(document.body));this._addWidget(IMO.Widget.SurfVideo,new IMO.Widget.SurfVideo(document.body));this._addWidget(IMO.Widget.SurfTabs,new IMO.Widget.SurfTabs(document.body));this._addWidget(IMO.Widget.ImPreview,new IMO.Widget.ImPreview(document.body));this._addWidget(IMO.Widget.NavigationConsole);var itabs=this.getWidget(IMO.Widget.SurfTabs);this._addWidget(IMO.Widget.Switch2Amy,new IMO.Widget.Switch2Amy(itabs.acc_tab.body_dom_node));this._addWidget(IMO.Widget.LoginConsole,new IMO.Widget.LoginConsole(itabs.acc_tab.body_dom_node));this._addWidget(IMO.Widget.AccountConsole,new IMO.Widget.AccountConsole(itabs.acc_tab.body_dom_node));this._addWidget(IMO.Widget.Blist,new IMO.Widget.Blist(itabs.blist_tab.body_dom_node));},migrate:function()
{IMO.UI.Surf.superclass.migrate.call(this);var wo=window.opener;if(wo&&!wo.closed)
{var uid;var do_migrate;try
{uid=wo.g_fb_uid;}
catch(ex)
{uid=false;}
try
{do_migrate=wo.IMO;}
catch(ex)
{do_migrate=false;}
if(uid)
{var ajax=this.getModule(IMO.Ajax);this.ssid=wo.g_ssid;ajax.setSsid(this.ssid);window.opener=null;var proto=IMO.Constants.PROTO_GTALK;var account=new IMO.Account(uid,proto,false,null,false);var accountManager=this.getModule(IMO.Manager.Account);accountManager.accounts[__(uid,proto)]=account;ajax.exec("account_login_os",JSON.encode({"uid":uid,"proto":proto,"ssid":this.ssid}));accountManager.ev_signing_on.fire(uid,proto);ajax.poll();createCookie(IMO.Constants.COOKIE_FAST_LOGIN,this.ssid+":0",0);self.focus();}
else if(do_migrate)
{this.getModule(IMO.Migrate).migrate();if(wo.home)
{wo.home();}
else
{wo.location="about:home";}
self.focus();}}}});IMO.UI.X=new IMO.UI.Surf();(function(){var ui;var prefManager;var blistManager;var accountManager;var notificationManager;var i18nAjax;IMO.Manager.i18n=function()
{this.init();this.ad_timer=null;};IMO.Manager.i18n.prototype={NAME:"IMO.Manager.i18n",ev_lang_data:new YAHOO.util.CustomEvent("lang_data"),AD_TIMEOUT:360000,handle_events:function(type,args,obj)
{var events=args[0];for(var i=0;i<events.length;i++)
{var ev=events[i]
if(ev&&ev.type=='translate')
{this.handle_event(ev);}
else
{YAHOO.log("Bad response:"+ev.type+":"+ev.name);}}},handle_event:function(ev)
{if(this.tPanel&&ev.name=="randomQuestion"){if(ev.questionType=="mc"){this.tPanel.questions.showMcQuestion(ev.question);}
else if(ev.questionType=="string"){this.tPanel.questions.stringQuestion(ev.string);}
else{this.tPanel.questions.noQuestions();}}
else if(this.tPanel&&ev.name=="getContext"){this.tPanel.questions.showContext(ev.context);}
else if(ev.name=="getLangData"){IMO.i18n.codeToLang={};for(var code in ev.langData){if(ev.langData[code]["native"]!=''){IMO.i18n.codeToLang[code]=ev.langData[code]["native"];}
else{IMO.i18n.codeToLang[code]=ev.langData[code].english;}}
IMO.i18n.langData=ev.langData;IMO.i18n.totalStrings=ev.totalStrings;if(ev.secLang){IMO.i18n.secLang=ev.secLang;}
this.ev_lang_data.fire();}
else if(ev.name=="finalDict"){IMO.i18n.Functions.updateLang_cb(ev.dict);}
else
{YAHOO.log("Bad translate response:"+ev.name);}},lang_pref_cb:function(name,args,me)
{var lang=args[0].lang;if(lang=='en-US'){IMO.i18n.Functions.updateLang_cb({});}
else if(lang!=IMO.i18n.lang){i18nAjax.exec('finalDict',JSON.encode({'lang':lang}));if(IMO.i18n.langData[lang].progress<IMO.i18n.totalStrings)
{var aid=YAHOO.util.Dom.generateId();var props=' href="" ';notificationManager.notify(_('Your language isn\'t fully translated yet! '+'Click [LINK]here[/LINK] to help translate.',function(s){return sprintf(s,{'[LINK]':'<a '+props+' id="'+aid+'">','[/LINK]':'</a>'})}),notificationManager.INFO);var fn;if(ui.surf_mode)
{fn=function(ev,obj){YAHOO.util.Event.preventDefault(ev);window.open('/translate.html?lang='+
lang+'#questions','_blank');};}
else
{fn=function(ev,obj){YAHOO.util.Event.preventDefault(ev);this.show();notificationManager.clear();};}
YAHOO.util.Event.addListener($(aid),'click',fn,this,true);}}
IMO.i18n.lang=lang;},check_imo_status:function()
{var imoStatus=prefManager.prefs.imoStatus;var prim=accountManager.primitive;var user=prefManager.getID();if(imoStatus&&prim!=IMO.Constants.PRIM_INVISIBLE&&prim!=IMO.Constants.PRIM_OFFLINE)
{var availableBuddies=0;var buddies=blistManager.buddies;for(var i in buddies)
{if(buddies[i].primitive==IMO.Constants.PRIM_AVAILABLE)
{availableBuddies++;}}
if(user){i18nAjax.exec('logUserAds',JSON.encode({'user':user,'prim':prim,'availableBuddies':availableBuddies}));}}},imo_status_pref_cb:function(name,args,me)
{var imoStatus=args[0].imoStatus;if(this.ad_timer)
{this.ad_timer.cancel();}
if(imoStatus)
{this.ad_timer=YAHOO.lang.later(this.AD_TIMEOUT,this,this.check_imo_status,[],true);}},init:function()
{if(!ui){ui=IMO.UI.X;prefManager=ui.getModule(IMO.Manager.Preference);blistManager=ui.getModule(IMO.Manager.Blist);accountManager=ui.getModule(IMO.Manager.Account);notificationManager=ui.getModule(IMO.Manager.Notification);i18nAjax=ui.getModule(IMO.i18nAjax);}
prefManager.subscribeToPref('lang',this.lang_pref_cb,this,true);prefManager.subscribeToPref('imoStatus',this.imo_status_pref_cb,this,true);i18nAjax.evEvent.subscribe(this.handle_events,this,true);},show:function()
{if(!this.tPanel)
this.tPanel=new IMO.Widget.i18n.Panels;this.tPanel.show();}};}());(function(){var ui;var i18nAjax;var i18nManager;var blistManager;var panelManager;var accountManager;var prefManager;var itabs;var id=null;IMO.Widget.i18n=function()
{this.feedback=new IMO.Widget.Feedback;this.msg_boxy=null;this.init();};IMO.Widget.i18n.prototype={NAME:"IMO.Widget.i18n",constructor:IMO.Widget.i18n,show:function(){},hide:function(){},focus:function(){},is_visible:function(){},in_focus:function(){},lang_pref_cb:function(name,args,me)
{var lang=args[0].lang;this.questions.setLang(lang);},lang_data_cb:function()
{this.questions.lang_data_cb();},init:function()
{if(!ui)
{ui=IMO.UI.X;i18nAjax=ui.getModule(IMO.i18nAjax);i18nManager=ui.getModule(IMO.Manager.i18n);blistManager=ui.getModule(IMO.Manager.Blist);panelManager=ui.getModule(IMO.Manager.Panel);accountManager=ui.getModule(IMO.Manager.Account);prefManager=ui.getModule(IMO.Manager.Preference);}},_set_footer:function(){}};IMO.Widget.i18n.Panels=function(uid,proto,buid,balias)
{IMO.Widget.i18n.Panels.superclass.constructor.call(this,uid,proto,buid,balias);};YAHOO.lang.extend(IMO.Widget.i18n.Panels,IMO.Widget.i18n,{NAME:"IMO.Widget.i18n.Panels",_create_panel:function(){var config={xy:[310,50],width:"529px",height:"370px",visible:false,draggable:true,underlay:"none",constraintoviewport:true,minimize:true,maximize:true,close:true,resizable:true,layout:{},fixWindowResize:true};var tp=new IMO.Widget.BasePanel('i18n_panel',config);tp.setTitle(_('Help translate imo!'));tp.setBody("");tp.setFooter("&nbsp;");tp.render(document.body);return tp},show:function()
{this.tp.show();panelManager.focus(this.tp);this.questions.showStart();},hide:function()
{this.tp.hide();},is_visible:function()
{return this.tp.cfg.getProperty("visible");},in_focus:function()
{return this.tp.infocus;},_set_footer:function(html)
{this.tp.setFooter(html);},resize_cb:function(evt,obj)
{this.resize();},resize:function()
{this.questions.resize(this.tp.north.offsetHeight-25);},hide_cb:function(ev,obj)
{},show_cb:function(ev,obj)
{},init:function()
{IMO.Widget.i18n.Panels.superclass.init.call(this);this.tp=this._create_panel();this.tp.north.style.background='lightblue';this.tp.north.style.top='10px';this.questions=new IMO.i18n.Questions.Panel(this.tp.north,i18nAjax,prefManager.getID());this.questions.setLang(IMO.i18n.lang);this.resize();this.tp.layoutEvent.subscribe(this.resize_cb,this,true);this.tp.resizeEvent.subscribe(this.resize_cb,this,true);this.tp.hideEvent.subscribe(this.hide_cb,this,true);this.tp.showEvent.subscribe(this.show_cb,this,true);prefManager.subscribeToPref('lang',this.lang_pref_cb,this,true);i18nManager.ev_lang_data.subscribe(this.lang_data_cb,this,true);}});}());(function(){IMO.i18nAjax=function(host,path,ssid){IMO.i18nAjax.superclass.constructor.call(this,host,path,ssid);}
YAHOO.lang.extend(IMO.i18nAjax,IMO.Ajax,{NAME:"IMO.i18nAjax"});}());(function(){IMO.i18n.Functions={copyListeners:function(fromEl,toEl){var listeners=YAHOO.util.Event.getListeners(fromEl);for(var i in listeners){YAHOO.util.Event.addListener(toEl,listeners[i].type,listeners[i].fn,listeners[i].obj,listeners[i].scope);}},updateLang_cb:function(dict){if(dict)
{IMO.i18n.dict=dict;}
for(var key in IMO.i18n.nodes)
{if(IMO.i18n.nodes[key].node)
{var node=IMO.i18n.nodes[key].node;}
else
{var node=$(key);}
if(!node)
{continue;}
var prop=IMO.i18n.nodes[key].prop;var s=IMO.i18n.nodes[key].enString;var t=IMO.i18n.dict[s]||s;t=t.replace(/</g,'&lt;');t=t.replace(/>/g,'&gt;');if(IMO.i18n.nodes[key].fn)
{t=IMO.i18n.nodes[key].fn(t);}
if(prop=="innerHTML")
{var span=document.createElement("span");span.innerHTML=t;for(var i in span.childNodes)
{if(span.childNodes[i].tagName=='A')
{for(var j=0;j<node.childNodes.length;j++)
{if(node.childNodes[j].tagName=='A')
{IMO.i18n.Functions.copyListeners(node.childNodes[j],span.childNodes[i]);}
if(node.childNodes[j]&&node.childNodes[j]in IMO.i18n.nodes)
{delete IMO.i18n.nodes[node.childNodes[j--]];}
else if(node.childNodes[j].id&&node.childNodes[j].id in IMO.i18n.nodes)
{delete IMO.i18n.nodes[node.childNodes[j--].id];}}
break;}}
IMO.i18n.Functions.removeChildren(node);while(span.childNodes.length)
{node.appendChild(span.removeChild(span.firstChild));}}
else
{node[prop]=t;}}},removeChildren:function(node){while(node.childNodes.length)
node.removeChild(node.childNodes[0]);},destroyChildren:function(node){while(node.childNodes.length){if(node.firstChild.id&&node.firstChild.id in IMO.i18n.nodes)
{delete IMO.i18n.nodes[node.firstChild.id];}
var tmp=node.removeChild(node.childNodes[0]);delete tmp;}},appendOption:function(select,option){try{select.add(option,null);}
catch(ex){select.add(option);}},fillLangChooser:function(chooser,choice){IMO.i18n.Functions.destroyChildren(chooser);var sorted=[];for(var code in IMO.i18n.langData)
{if(code=='en-US')
{continue;}
sorted.push([code,IMO.i18n.langData[code]["native"],IMO.i18n.langData[code].english,IMO.i18n.langData[code].progress]);}
var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);_("Select Your Language:",op,"innerHTML");var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);_('Top Languages',function(s){return"------ "+s+" ------";},op,"innerHTML");var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);sorted.sort(function(a,b){return b[3]-a[3];});var count=0;for(var i in sorted){var progress=(Math.floor(sorted[i][3]/IMO.i18n.totalStrings*100));if(progress<20){break;}
var display=((count+1)+': '+sorted[i][1]+' ('+progress+'%)');var op=new Option(display,sorted[i][0]);if(sorted[i][0]in IMO.i18n.rtlLangs){op.style.direction='rtl';op.style.unicodeBidi='embed';}
if(sorted[i][0]==choice){op.selected=true;}
IMO.i18n.Functions.appendOption(chooser,op);count++;}
var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);var op=new Option("------------------------","");IMO.i18n.Functions.appendOption(chooser,op);var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);sorted.sort();for(var i in sorted){var progress=(Math.floor(sorted[i][3]/IMO.i18n.totalStrings*100));var display=sorted[i][1]+' ('+progress+'%)';var op=new Option(display,sorted[i][0]);if(sorted[i][0]in IMO.i18n.rtlLangs){op.style.direction='rtl';op.style.unicodeBidi='embed';}
if(!chooser.selectedIndex&&sorted[i][0]==choice){op.selected=true;}
IMO.i18n.Functions.appendOption(chooser,op);}
var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);var op=new Option("------------------------","");IMO.i18n.Functions.appendOption(chooser,op);var op=new Option("","");IMO.i18n.Functions.appendOption(chooser,op);sorted.sort(function(a,b){return a[2]<b[2]?-1:1;});for(var i in sorted){var progress=(Math.floor(sorted[i][3]/IMO.i18n.totalStrings*100));var display=sorted[i][2]+' ('+progress+'%)';var op=new Option(display,sorted[i][0]);IMO.i18n.Functions.appendOption(chooser,op);}}};}());(function(){IMO.i18n.Questions=function(parentNode,ajax,user)
{this.init(parentNode,ajax,user);};IMO.i18n.Questions.prototype={constructor:IMO.i18n.Questions,interface:'widget',init:function(parentNode,ajax,user)
{if(IMO.i18n.lang!='en-US')
{this.lang=IMO.i18n.lang;}
else
{this.lang=null;}
this.ajax=ajax;this.user=user?user:null;this.selfDiv=$$('div');YAHOO.util.Dom.addClass(this.selfDiv,'widgetContent');parentNode.appendChild(this.selfDiv);},switchTo:function(div)
{IMO.i18n.Functions.removeChildren(this.selfDiv);this.selfDiv.appendChild(div);this.currentView=div;},setLang:function(lang)
{if(lang=="en-US")
{return;}
this.lang=lang;this.request_question();},noQuestions:function(){if(!this.noQuestion)
{var lid=YAHOO.util.Dom.generateId();this.noQuestion=$$('div');this.noQuestion.style.padding='20px 10px 20px 50px';var lang=this.lang;this.noQuestion.innerHTML=_('We think we\'re done '+'translating our site into this language!')+'<br /><br />'+
_('If you want, you can [LINK]check our work[/LINK].',function(s){return sprintf(s,{'[LINK]':'<a href="/translate.html?lang='+lang+'" target="_blank" id='+lid+'">','[/LINK]':'</a>'});});this.switchTo(this.noQuestion);YAHOO.util.Event.addListener($(lid),"click",this.viewTable_cb,this,true);}
else
{this.switchTo(this.noQuestion);}},createMcDiv:function()
{this.mcDiv=$$('div');var pid=YAHOO.util.Dom.generateId();var pdid=YAHOO.util.Dom.generateId();var clid=YAHOO.util.Dom.generateId();var blid=YAHOO.util.Dom.generateId();var bdid=YAHOO.util.Dom.generateId();var bids=[];var toids=[];var orids=[];var slids=[];var html=['<div class="i18nQuestion">',_('Which of these is the best '+'translation for this phrase?'),'</div><div class="i18nPhrase" id="',pdid,'"><span id="',pid,'"></span><wbr /><a href="" id="',clid,'" class="contextLink"></a></div>','<table class="mcOptions"><tbody>'];for(var i=0;i<3;i++){bids[i]=YAHOO.util.Dom.generateId();toids[i]=YAHOO.util.Dom.generateId();slids[i]=YAHOO.util.Dom.generateId();orids[i]=YAHOO.util.Dom.generateId();html.push('<tr id="',orids[i],'"><td align="center" width=50><button id="',bids[i],'" value=',i+1,'>',i+1,'</button></td><td><span id="',toids[i],'"></span><wbr /><a href="" id="',slids[i],'"></a></td></tr>');}
html.push('</tbody></table><div class="addBetter" id="',bdid,'"><a href="" id="',blid,'">',_('I have a better translation.'),'</a></div>');this.mcDiv.innerHTML=html.join('');this.switchTo(this.mcDiv);this.mcDiv.betterLinkDiv=$(bdid);this.mcDiv.contextLink=$(clid);this.mcDiv.phrase=$(pid);this.mcDiv.phraseDiv=$(pdid);YAHOO.util.Event.addListener(this.mcDiv.contextLink,'click',this.contextLink_cb,this.mcDiv,this);YAHOO.util.Event.addListener($(blid),"click",this.addBetter_cb,this,true);this.mcDiv.spamLinks=[];this.mcDiv.options=[];this.mcDiv.optionRows=[];for(var i in bids)
{this.mcDiv.spamLinks[i]=$(slids[i]);this.mcDiv.options[i]=$(toids[i]);this.mcDiv.optionRows[i]=$(orids[i]);YAHOO.util.Event.addListener($(bids[i]),'click',this.chooseOption_cb,parseInt(i),this);YAHOO.util.Event.addListener(this.mcDiv.spamLinks[i],'click',this.reportSpam_cb,i,this);}},createStringDiv:function()
{var pid=YAHOO.util.Dom.generateId();var pdid=YAHOO.util.Dom.generateId();var clid=YAHOO.util.Dom.generateId();var iid=YAHOO.util.Dom.generateId();var sbid=YAHOO.util.Dom.generateId();this.stringDiv=$$('div');var html=['<div class="i18nQuestion">',_('What\'s a good translation of this phrase?'),'</div><div class="i18nPhrase" id="',pdid,'"><span id="',pid,'"></span><wbr /><a id="',clid,'" class="contextLink" href=""></a></div>','<div class="inputDiv"><textarea id="',iid,'" rows=3></textarea><button id="',sbid,'">',_('Submit'),'</button></div>'];this.stringDiv.innerHTML=html.join('');this.switchTo(this.stringDiv);this.stringDiv.phrase=$(pid);this.stringDiv.phraseDiv=$(pdid);this.stringDiv.contextLink=$(clid);this.stringDiv.input=$(iid);YAHOO.util.Event.addListener($(sbid),"click",this.submitString_cb,this,true);YAHOO.util.Event.addListener(this.stringDiv.contextLink,'click',this.contextLink_cb,this.stringDiv,this);YAHOO.util.Event.addListener(this.stringDiv.input,"keypress",function(ev,obj){if(ev.keyCode==13){this.submitString_cb(ev,obj);}},this,true);},showMcQuestion:function(mcQuestion)
{if(!this.mcDiv)
{this.createMcDiv();}
this.mcQuestion=mcQuestion;this.enString=mcQuestion.enString;this.mcDiv.phrase.innerHTML=wrapPlaceholders(this.enString);this.showingContext=false;this.context=null;this.hideContext(this.mcDiv);this.resetLinks();if(this.mcDiv.lastChild==this.mcDiv.inputDiv)
{this.mcDiv.removeChild(this.mcDiv.inputDiv);this.mcDiv.appendChild(this.mcDiv.betterLinkDiv);}
for(var i in this.mcDiv.optionRows)
{var num=i.toString();if(num in mcQuestion.choices)
{this.mcDiv.options[i].innerHTML=wrapPlaceholders(mcQuestion.choices[num],this.enString);this.mcDiv.optionRows[i].style.display="";}
else
{this.mcDiv.optionRows[i].style.display="none";}}
this.switchTo(this.mcDiv);},addBetter_cb:function(ev,obj){if(ev){YAHOO.util.Event.preventDefault(ev);}
if(!this.mcDiv.inputDiv)
{var iid=YAHOO.util.Dom.generateId();var sbid=YAHOO.util.Dom.generateId();this.mcDiv.inputDiv=document.createElement('div');YAHOO.util.Dom.addClass(this.mcDiv.inputDiv,'inputDiv');var html=['<textarea id="',iid,'" rows=3></textarea><button id="',sbid,'">',_('Submit'),'</button>'];this.mcDiv.inputDiv.innerHTML=html.join('');this.mcDiv.removeChild(this.mcDiv.lastChild);this.mcDiv.appendChild(this.mcDiv.inputDiv);this.mcDiv.input=$(iid);YAHOO.util.Event.addListener($(sbid),"click",this.submitBetter_cb,this,true);YAHOO.util.Event.addListener(this.mcDiv.input,"keypress",function(ev,obj){if(ev.keyCode==13){this.submitBetter_cb(ev,obj);}},this,true);}
else
{this.mcDiv.removeChild(this.mcDiv.lastChild);this.mcDiv.appendChild(this.mcDiv.inputDiv);}
this.mcDiv.input.value="";this.selfDiv.scrollTop=this.selfDiv.scrollHeight;this.mcDiv.input.focus();},stringQuestion:function(stringPrompt){if(!this.stringDiv)
{this.createStringDiv();}
this.enString=stringPrompt;this.stringDiv.phrase.innerHTML=wrapPlaceholders(stringPrompt);this.context=null;this.stringDiv.input.value="";this.hideContext(this.stringDiv);this.resetLinks();this.switchTo(this.stringDiv);this.stringDiv.input.focus();},submitString_cb:function(ev,obj){if(ev){YAHOO.util.Event.preventDefault(ev);}
var answer=this.stringDiv.input.value;if(answer)
{if(this.checkPlaceholders(answer))
{this.ajax.exec("addTranslation",JSON.encode({'lang':this.lang,'enString':this.enString,'translation':answer,'user':this.user,'interface':this.interface}));this.request_question();}
else
{this.badPlaceholders();}}},chooseOption_cb:function(ev,obj)
{if(ev)
{YAHOO.util.Event.preventDefault(ev);}
if(typeof(obj)!='number')
{return;}
var answer=this.mcQuestion.choices[obj];this.ajax.exec("answerQuestion",JSON.encode({'question':this.mcQuestion,'lang':this.lang,'answer':answer,'user':this.user,'interface':this.interface}));this.request_question();},submitBetter_cb:function(ev,obj)
{if(ev){YAHOO.util.Event.preventDefault(ev);}
var answer=this.mcDiv.input.value;if(!answer)
{return;}
if(this.checkPlaceholders(answer))
{this.ajax.exec("answerQuestion",JSON.encode({'question':this.mcQuestion,'lang':this.lang,'answer':answer,'user':this.user,'interface':this.interface}));this.request_question();}
else
{this.badPlaceholders();}},request_question:function(ev,obj){if(ev){YAHOO.util.Event.preventDefault(ev);}
if(IMO.i18n.lang&&IMO.i18n.lang!=""){this.ajax.exec("randomQuestion",JSON.encode({'lang':this.lang}));}},reportSpam_cb:function(ev,obj)
{if(ev){YAHOO.util.Event.preventDefault(ev);}
if(!this.mcDiv.spamLinks[obj].reported){this.ajax.exec("reportSpam",JSON.encode({'enString':this.enString,'translation':this.mcQuestion.choices[obj],'lang':this.lang,'user':this.user,'interface':this.interface}));this.mcDiv.spamLinks[obj].reported=true;_('Reported as Spam',this.mcDiv.spamLinks[obj],'innerHTML');this.mcDiv.spamLinks[obj].style.color='red';}
else{this.ajax.exec("undoReportSpam",JSON.encode({'enString':this.enString,'translation':this.mcQuestion.choices[obj],'lang':this.lang,'user':this.user,'interface':this.interface}));this.mcDiv.spamLinks[obj].reported=false;_('This is Spam',this.mcDiv.spamLinks[obj],'innerHTML',function(s){return'('+s+')';});this.mcDiv.spamLinks[obj].style.color='gray';}},contextLink_cb:function(ev,obj)
{YAHOO.util.Event.preventDefault(ev);if(this.showingContext)
{this.hideContext(obj);}
else if(this.context){this._showContext(obj);}
else{this.ajax.exec("getContext",JSON.encode({'enString':this.enString,'lang':this.lang}));}},createContextList:function()
{this.contextList=$$('dl');for(var str in this.context)
{if(str==this.enString)
{continue;}
var item=$$('dt');item.innerHTML=wrapPlaceholders(str);this.contextList.appendChild(item);if(this.context[str])
{var trans=$$('dd');trans.innerHTML=wrapPlaceholders(this.context[str],str);this.contextList.appendChild(trans);}}},showContext:function(dict)
{if(this.contextList)
{this.contextList.parentNode.removeChild(this.contextList);}
this.context=dict;this.createContextList();this._showContext(this.currentView);},_showContext:function(viewDiv)
{if(!this.contextList)
{this.createContextList();}
viewDiv.phraseDiv.appendChild(this.contextList);this.contextList.style.display="";_('Hide context',viewDiv.contextLink,'innerHTML',function(s){return'('+s+')';});this.showingContext=true;},hideContext:function(viewDiv)
{if(this.contextList)
{this.contextList.style.display="none";}
_('Show me the context',viewDiv.contextLink,'innerHTML',function(s){return'('+s+')';});this.showingContext=false;},resetLinks:function()
{if(!this.mcDiv)
{return;}
for(var i in this.mcDiv.spamLinks){_('This is Spam',this.mcDiv.spamLinks[i],'innerHTML',function(s){return'('+s+')';});this.mcDiv.spamLinks[i].style.color='gray';this.mcDiv.spamLinks[i].reported=false;}},checkPlaceholders:function(s)
{var pHolders=getPlaceholders(this.enString);for(var i in pHolders)
{if(s.indexOf(pHolders[i])==-1)
{return false;}}
return true;},badPlaceholders:function(s)
{var pHolders=getPlaceholders(this.enString);alert(_('Your translation must contain the following '+'placeholders:',false)+'\n\t'+
pHolders.join('\n\t'));}};IMO.i18n.Questions.Panel=function(parentNode,ajax,id)
{IMO.i18n.Questions.Panel.superclass.constructor.call(this,parentNode,ajax,id);};YAHOO.lang.extend(IMO.i18n.Questions.Panel,IMO.i18n.Questions,{interface:'imowidget',init:function(parentNode,ajax,user)
{this.controlDiv=$$('div');var lcid=YAHOO.util.Dom.generateId();var vbid=YAHOO.util.Dom.generateId();var sbid=YAHOO.util.Dom.generateId();var html=['<select id="',lcid,'"></select><button id="',vbid,'">',_('View all phrases at once'),'</button><button id="',sbid,'">',_('Skip question'),'</button><hr />'];this.controlDiv.innerHTML=html.join('');parentNode.appendChild(this.controlDiv);this.langChooser=$(lcid);var viewAllButton=$(vbid);var skipButton=$(sbid);viewAllButton.style.marginLeft="5px";skipButton.style.marginLeft="5px";IMO.i18n.Questions.Panel.superclass.init.call(this,parentNode,ajax,user);if(IMO.i18n.langData)
{IMO.i18n.Functions.fillLangChooser(this.langChooser,IMO.i18n.lang);}
else
{this.ajax.exec("getLangData",JSON.encode({}));}
YAHOO.util.Event.addListener(this.langChooser,"change",this.changeLang_cb,this,true);YAHOO.util.Event.addListener(skipButton,"click",this.request_question,this,true);YAHOO.util.Event.addListener(viewAllButton,"click",function(ev,obj){var value=this.langChooser.options[this.langChooser.selectedIndex].value;if(value&&value!="")
{window.open('/translate.html?lang='+value);}
else
{window.open('/translate.html');}},this,true);},setLang:function(lang)
{if(lang=="en-US")
{return;}
this.lang=lang;for(var i=0;i<this.langChooser.options.length;i++)
{if(this.langChooser.options[i].value==this.lang)
{this.langChooser.selectedIndex=i;break;}}
this.request_question();},changeLang_cb:function(ev,obj)
{var value=this.langChooser.options[this.langChooser.selectedIndex].value;if(value&&value!='en-US')
{this.lang=value;this.request_question();}},lang_data_cb:function()
{var value=this.langChooser.options[this.langChooser.selectedIndex].value;var lang=value?value:IMO.i18n.lang;IMO.i18n.Functions.fillLangChooser(this.langChooser,lang);},createIntro:function()
{this.introDiv=$$('div');var id=YAHOO.util.Dom.generateId();this.feedbackID=id;_('If your language is missing or misspelt, '+'send us [LINK]feedback[/LINK] and let us know!',this.introDiv,'innerHTML',function(s){return sprintf(s,{'[LINK]':'<a href="" id="'+id+'">','[/LINK]':'</a>'});});},showStart:function()
{if(this.lang&&this.lang!='en-US')
{this.request_question();return;}
if(!this.introDiv)
{this.createIntro();}
this.switchTo(this.introDiv);YAHOO.util.Event.addListener($(this.feedbackID),'click',this.feedback_cb,this,true);this.langChooser.focus();},feedback_cb:function(ev,obj)
{YAHOO.util.Event.stopEvent(ev);if(!this.feedback)
{this.feedback=new IMO.Widget.Feedback;}
this.feedback.show();},resize:function(height)
{if(this.controlDiv)
{this.selfDiv.style.height=height-this.controlDiv.offsetHeight+'px';}}});IMO.i18n.Questions.Tab=function(parentNode,ajax,user,tabs)
{IMO.i18n.Questions.Tab.superclass.constructor.call(this,parentNode,ajax,user);this.tabs=tabs;};YAHOO.lang.extend(IMO.i18n.Questions.Tab,IMO.i18n.Questions,{interface:'company-questions',init:function(parentNode,ajax,user)
{IMO.i18n.Questions.Tab.superclass.init.call(this,parentNode,ajax,user);this.selfDiv.style.maxWidth="600px";},createStringDiv:function()
{IMO.i18n.Questions.Panel.superclass.createStringDiv.call(this);var skipButton=$$('Button');_('Skip question',skipButton,'innerHTML');skipButton.style.marginLeft='10px';this.stringDiv.firstChild.appendChild(skipButton);YAHOO.util.Event.addListener(skipButton,'click',this.request_question,this,true);},createMcDiv:function()
{IMO.i18n.Questions.Panel.superclass.createMcDiv.call(this);var skipButton=$$('Button');_('Skip question',skipButton,'innerHTML');skipButton.style.marginLeft='10px';this.mcDiv.firstChild.appendChild(skipButton);YAHOO.util.Event.addListener(skipButton,'click',this.request_question,this,true);},noQuestions:function(){if(!this.noQuestion)
{var lid=YAHOO.util.Dom.generateId();this.noQuestion=$$('div');this.noQuestion.style.padding='10px 20px 20px 20px';this.noQuestion.innerHTML=_('We think we\'re done '+'translating our site into this language!')+'<br /><br />'+
_('If you want, you can [LINK]check our work[/LINK].',function(s){return sprintf(s,{'[LINK]':'<a href="" id="'+lid+'">','[/LINK]':'</a>'});});this.switchTo(this.noQuestion);YAHOO.util.Event.addListener($(lid),"click",function(ev,obj){YAHOO.util.Event.preventDefault(ev);this.tabs.switchToTab('#table');},this,true);}
else
{this.switchTo(this.noQuestion);}},badPlaceholders:function(s)
{var pHolders=getPlaceholders(this.enString);IMO.msgs.display_error(_('Your translation must contain the '+'following placeholders:',false)+'<ul><li>'+
pHolders.join('</li><li>')+'</li></ul>',30000);}});}());(function(){var ui;var prefAjax;var accountManager;IMO.Manager.Preference=function()
{this.init();};IMO.Manager.Preference.prototype={NAME:"IMO.Manager.Preference",prefs:{},prefEvents:{},id:null,handleEvents:function(type,args,obj)
{var events=args[0];for(var i=0;i<events.length;i++)
{var ev=events[i]
if(ev&&ev.type=='preference')
{this.handle_event(ev);}
else
{YAHOO.log("Bad response:"+ev.type+":"+ev.name);}}},handle_event:function(ev)
{if(ev.name=='getPrefs')
{if(ev.dict){IMO.i18n.dict=ev.dict;}
if(ev.prefs){for(var pref in ev.prefs){this.prefs[pref]=ev.prefs[pref];}}
else{ev.prefs={};}
this.firePrefs(ev.prefs);}
else
{YAHOO.log("Bad preference event:"+ename);}},firePrefs:function(prefs)
{for(var pref in prefs)
{if(pref in this.prefEvents)
{this.prefEvents[pref].fire(prefs);}}},subscribeToPref:function(pref,fn,obj,override)
{if(!(pref in this.prefEvents))
{this.prefEvents[pref]=new YAHOO.util.CustomEvent("pref_updated_"+pref);}
this.prefEvents[pref].subscribe(fn,obj,override);},getPrefs:function(){if(this.id||(this.id=this.getID())){prefAjax.exec('getPrefs',JSON.encode({'user':this.id}));}},setPrefs:function(prefs){var changed=false;for(var pref in prefs){if(this.prefs[pref]!=prefs[pref])
{changed=true;this.prefs[pref]=prefs[pref];}}
if(!changed)
{return;}
var users=this.allIDs();if(users)
{prefAjax.exec('setPrefs',JSON.encode({'users':users,'prefs':prefs}));}
this.firePrefs(prefs);},allIDs:function(){var ids=[];for(var key in accountManager.accounts){var account=accountManager.accounts[key];if(account.online){ids.push(account.uid+'::'+account.proto);}}
return ids;},getID:function(){var id=null;for(var key in accountManager.accounts){var account=accountManager.accounts[key];if(!account.online){continue;}
var tmp_id=account.uid+'::'+account.proto;if(!id){id=tmp_id;continue;}
if(tmp_id<id){id=tmp_id;}}
return(id?id:null);},signon_cb:function(ev,args,obj){var newID=this.getID();if(newID!=this.id)
{this.id=newID;this.getPrefs();}},init:function(){if(!ui){ui=IMO.UI.X;prefAjax=new IMO.Ajax("","/preference",ui.ssid);accountManager=ui.getModule(IMO.Manager.Account);}
accountManager.ev_signed_on.subscribe(this.signon_cb,this,true);prefAjax.evEvent.subscribe(this.handleEvents,this,true);}}}());