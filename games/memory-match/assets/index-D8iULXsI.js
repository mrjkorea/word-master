(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qs="165",Sl=0,Sa=1,yl=2,gc=1,El=2,ln=3,Tn=0,Pt=1,Zt=2,En=0,pi=1,ya=2,Ea=3,wa=4,wl=5,Hn=100,bl=101,Tl=102,Al=103,Cl=104,Rl=200,Pl=201,Ll=202,Dl=203,Fs=204,Os=205,Il=206,Ul=207,Nl=208,Fl=209,Ol=210,Bl=211,zl=212,kl=213,Hl=214,Gl=0,Vl=1,Wl=2,Cr=3,Xl=4,ql=5,Yl=6,$l=7,_c=0,Kl=1,Jl=2,wn=0,Zl=1,jl=2,Ql=3,vc=4,eu=5,tu=6,nu=7,xc=300,_i=301,vi=302,Bs=303,zs=304,Br=306,ks=1e3,Vn=1001,Hs=1002,Dt=1003,iu=1004,ji=1005,Wt=1006,Kr=1007,Wn=1008,An=1009,ru=1010,su=1011,Rr=1012,Mc=1013,xi=1014,un=1015,zr=1016,Sc=1017,yc=1018,Mi=1020,au=35902,ou=1021,cu=1022,Qt=1023,lu=1024,uu=1025,mi=1026,Si=1027,Ec=1028,wc=1029,hu=1030,bc=1031,Tc=1033,Jr=33776,Zr=33777,jr=33778,Qr=33779,ba=35840,Ta=35841,Aa=35842,Ca=35843,Ra=36196,Pa=37492,La=37496,Da=37808,Ia=37809,Ua=37810,Na=37811,Fa=37812,Oa=37813,Ba=37814,za=37815,ka=37816,Ha=37817,Ga=37818,Va=37819,Wa=37820,Xa=37821,es=36492,qa=36494,Ya=36495,du=36283,$a=36284,Ka=36285,Ja=36286,fu=3200,pu=3201,Ac=0,mu=1,yn="",Ot="srgb",Pn="srgb-linear",ea="display-p3",kr="display-p3-linear",Pr="linear",at="srgb",Lr="rec709",Dr="p3",$n=7680,Za=519,gu=512,_u=513,vu=514,Cc=515,xu=516,Mu=517,Su=518,yu=519,ja=35044,Qa="300 es",hn=2e3,Ir=2001;class bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ts=Math.PI/180,Gs=180/Math.PI;function Ti(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function wt(i,e,t){return Math.max(e,Math.min(t,i))}function Eu(i,e){return(i%e+e)%e}function ns(i,e,t){return(1-t)*i+t*e}function Li(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class de{constructor(e=0,t=0){de.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,r,s,a,o,c,u){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,u)}set(e,t,n,r,s,a,o,c,u){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],u=n[1],h=n[4],d=n[7],p=n[2],m=n[5],_=n[8],g=r[0],f=r[3],l=r[6],S=r[1],x=r[4],y=r[7],N=r[2],C=r[5],R=r[8];return s[0]=a*g+o*S+c*N,s[3]=a*f+o*x+c*C,s[6]=a*l+o*y+c*R,s[1]=u*g+h*S+d*N,s[4]=u*f+h*x+d*C,s[7]=u*l+h*y+d*R,s[2]=p*g+m*S+_*N,s[5]=p*f+m*x+_*C,s[8]=p*l+m*y+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],h=e[8];return t*a*h-t*o*u-n*s*h+n*o*c+r*s*u-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],h=e[8],d=h*a-o*u,p=o*c-h*s,m=u*s-a*c,_=t*d+n*p+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(r*u-h*n)*g,e[2]=(o*n-r*a)*g,e[3]=p*g,e[4]=(h*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(n*c-u*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),u=Math.sin(s);return this.set(n*c,n*u,-n*(c*a+u*o)+a+e,-r*u,r*c,-r*(-u*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(is.makeScale(e,t)),this}rotate(e){return this.premultiply(is.makeRotation(-e)),this}translate(e,t){return this.premultiply(is.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const is=new He;function Rc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wu(){const i=Ur("canvas");return i.style.display="block",i}const eo={};function Pc(i){i in eo||(eo[i]=!0,console.warn(i))}function bu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const to=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),no=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qi={[Pn]:{transfer:Pr,primaries:Lr,toReference:i=>i,fromReference:i=>i},[Ot]:{transfer:at,primaries:Lr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[kr]:{transfer:Pr,primaries:Dr,toReference:i=>i.applyMatrix3(no),fromReference:i=>i.applyMatrix3(to)},[ea]:{transfer:at,primaries:Dr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(no),fromReference:i=>i.applyMatrix3(to).convertLinearToSRGB()}},Tu=new Set([Pn,kr]),tt={enabled:!0,_workingColorSpace:Pn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Tu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Qi[e].toReference,r=Qi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Qi[i].primaries},getTransfer:function(i){return i===yn?Pr:Qi[i].transfer}};function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Kn;class Au{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Kn===void 0&&(Kn=Ur("canvas")),Kn.width=e.width,Kn.height=e.height;const n=Kn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Kn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ur("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=gi(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gi(t[n]/255)*255):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cu=0;class Lc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Ti(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ss(r[a].image)):s.push(ss(r[a]))}else s=ss(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ss(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Au.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ru=0;class At extends bi{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=Vn,r=Vn,s=Wt,a=Wn,o=Qt,c=An,u=At.DEFAULT_ANISOTROPY,h=yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=Ti(),this.name="",this.source=new Lc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case Hs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case Hs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=xc;At.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,n=0,r=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,u=c[0],h=c[4],d=c[8],p=c[1],m=c[5],_=c[9],g=c[2],f=c[6],l=c[10];if(Math.abs(h-p)<.01&&Math.abs(d-g)<.01&&Math.abs(_-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+g)<.1&&Math.abs(_+f)<.1&&Math.abs(u+m+l-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(u+1)/2,y=(m+1)/2,N=(l+1)/2,C=(h+p)/4,R=(d+g)/4,D=(_+f)/4;return x>y&&x>N?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=C/n,s=R/n):y>N?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=C/r,s=D/r):N<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(N),n=R/s,r=D/s),this.set(n,r,s,t),this}let S=Math.sqrt((f-_)*(f-_)+(d-g)*(d-g)+(p-h)*(p-h));return Math.abs(S)<.001&&(S=1),this.x=(f-_)/S,this.y=(d-g)/S,this.z=(p-h)/S,this.w=Math.acos((u+m+l-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pu extends bi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new At(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends Pu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Dc extends At{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lu extends At{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],u=n[r+1],h=n[r+2],d=n[r+3];const p=s[a+0],m=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=c,e[t+1]=u,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=p,e[t+1]=m,e[t+2]=_,e[t+3]=g;return}if(d!==g||c!==p||u!==m||h!==_){let f=1-o;const l=c*p+u*m+h*_+d*g,S=l>=0?1:-1,x=1-l*l;if(x>Number.EPSILON){const N=Math.sqrt(x),C=Math.atan2(N,l*S);f=Math.sin(f*C)/N,o=Math.sin(o*C)/N}const y=o*S;if(c=c*f+p*y,u=u*f+m*y,h=h*f+_*y,d=d*f+g*y,f===1-o){const N=1/Math.sqrt(c*c+u*u+h*h+d*d);c*=N,u*=N,h*=N,d*=N}}e[t]=c,e[t+1]=u,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],u=n[r+2],h=n[r+3],d=s[a],p=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+h*d+c*m-u*p,e[t+1]=c*_+h*p+u*d-o*m,e[t+2]=u*_+h*m+o*p-c*d,e[t+3]=h*_-o*d-c*p-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(n/2),h=o(r/2),d=o(s/2),p=c(n/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=p*h*d+u*m*_,this._y=u*m*d-p*h*_,this._z=u*h*_+p*m*d,this._w=u*h*d-p*m*_;break;case"YXZ":this._x=p*h*d+u*m*_,this._y=u*m*d-p*h*_,this._z=u*h*_-p*m*d,this._w=u*h*d+p*m*_;break;case"ZXY":this._x=p*h*d-u*m*_,this._y=u*m*d+p*h*_,this._z=u*h*_+p*m*d,this._w=u*h*d-p*m*_;break;case"ZYX":this._x=p*h*d-u*m*_,this._y=u*m*d+p*h*_,this._z=u*h*_-p*m*d,this._w=u*h*d+p*m*_;break;case"YZX":this._x=p*h*d+u*m*_,this._y=u*m*d+p*h*_,this._z=u*h*_-p*m*d,this._w=u*h*d-p*m*_;break;case"XZY":this._x=p*h*d-u*m*_,this._y=u*m*d-p*h*_,this._z=u*h*_+p*m*d,this._w=u*h*d+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],u=t[2],h=t[6],d=t[10],p=n+o+d;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-u)*m,this._z=(a-r)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+u)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(s-u)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-r)/m,this._x=(s+u)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,u=t._z,h=t._w;return this._x=n*h+a*o+r*u-s*c,this._y=r*h+a*c+s*o-n*u,this._z=s*h+a*u+n*c-r*o,this._w=a*h-n*o-r*c-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const u=Math.sqrt(c),h=Math.atan2(u,o),d=Math.sin((1-t)*h)/u,p=Math.sin(t*h)/u;return this._w=a*d+this._w*p,this._x=n*d+this._x*p,this._y=r*d+this._y*p,this._z=s*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(io.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(io.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*u+a*d-o*h,this.y=n+c*h+o*u-s*d,this.z=r+c*d+s*h-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return as.copy(this).projectOnVector(e),this.sub(as)}reflect(e){return this.sub(as.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const as=new L,io=new qi;class Yn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ht):Ht.fromBufferAttribute(s,a),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Di),tr.subVectors(this.max,Di),Jn.subVectors(e.a,Di),Zn.subVectors(e.b,Di),jn.subVectors(e.c,Di),pn.subVectors(Zn,Jn),mn.subVectors(jn,Zn),In.subVectors(Jn,jn);let t=[0,-pn.z,pn.y,0,-mn.z,mn.y,0,-In.z,In.y,pn.z,0,-pn.x,mn.z,0,-mn.x,In.z,0,-In.x,-pn.y,pn.x,0,-mn.y,mn.x,0,-In.y,In.x,0];return!os(t,Jn,Zn,jn,tr)||(t=[1,0,0,0,1,0,0,0,1],!os(t,Jn,Zn,jn,tr))?!1:(nr.crossVectors(pn,mn),t=[nr.x,nr.y,nr.z],os(t,Jn,Zn,jn,tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const rn=[new L,new L,new L,new L,new L,new L,new L,new L],Ht=new L,er=new Yn,Jn=new L,Zn=new L,jn=new L,pn=new L,mn=new L,In=new L,Di=new L,tr=new L,nr=new L,Un=new L;function os(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Un.fromArray(i,s);const o=r.x*Math.abs(Un.x)+r.y*Math.abs(Un.y)+r.z*Math.abs(Un.z),c=e.dot(Un),u=t.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(c,u,h),Math.min(c,u,h))>o)return!1}return!0}const Du=new Yn,Ii=new L,cs=new L;class Yi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Du.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ii.subVectors(e,this.center);const t=Ii.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ii,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ii.copy(e.center).add(cs)),this.expandByPoint(Ii.copy(e.center).sub(cs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new L,ls=new L,ir=new L,gn=new L,us=new L,rr=new L,hs=new L;class Ic{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sn.copy(this.origin).addScaledVector(this.direction,t),sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ls.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),gn.copy(this.origin).sub(ls);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ir),o=gn.dot(this.direction),c=-gn.dot(ir),u=gn.lengthSq(),h=Math.abs(1-a*a);let d,p,m,_;if(h>0)if(d=a*c-o,p=a*o-c,_=s*h,d>=0)if(p>=-_)if(p<=_){const g=1/h;d*=g,p*=g,m=d*(d+a*p+2*o)+p*(a*d+p+2*c)+u}else p=s,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*c)+u;else p=-s,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*c)+u;else p<=-_?(d=Math.max(0,-(-a*s+o)),p=d>0?-s:Math.min(Math.max(-s,-c),s),m=-d*d+p*(p+2*c)+u):p<=_?(d=0,p=Math.min(Math.max(-s,-c),s),m=p*(p+2*c)+u):(d=Math.max(0,-(a*s+o)),p=d>0?s:Math.min(Math.max(-s,-c),s),m=-d*d+p*(p+2*c)+u);else p=a>0?-s:s,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*c)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ls).addScaledVector(ir,p),m}intersectSphere(e,t){sn.subVectors(e.center,this.origin);const n=sn.dot(this.direction),r=sn.dot(sn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const u=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return u>=0?(n=(e.min.x-p.x)*u,r=(e.max.x-p.x)*u):(n=(e.max.x-p.x)*u,r=(e.min.x-p.x)*u),h>=0?(s=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-p.z)*d,c=(e.max.z-p.z)*d):(o=(e.max.z-p.z)*d,c=(e.min.z-p.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,sn)!==null}intersectTriangle(e,t,n,r,s){us.subVectors(t,e),rr.subVectors(n,e),hs.crossVectors(us,rr);let a=this.direction.dot(hs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;gn.subVectors(this.origin,e);const c=o*this.direction.dot(rr.crossVectors(gn,rr));if(c<0)return null;const u=o*this.direction.dot(us.cross(gn));if(u<0||c+u>a)return null;const h=-o*gn.dot(hs);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,r,s,a,o,c,u,h,d,p,m,_,g,f){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,u,h,d,p,m,_,g,f)}set(e,t,n,r,s,a,o,c,u,h,d,p,m,_,g,f){const l=this.elements;return l[0]=e,l[4]=t,l[8]=n,l[12]=r,l[1]=s,l[5]=a,l[9]=o,l[13]=c,l[2]=u,l[6]=h,l[10]=d,l[14]=p,l[3]=m,l[7]=_,l[11]=g,l[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Qn.setFromMatrixColumn(e,0).length(),s=1/Qn.setFromMatrixColumn(e,1).length(),a=1/Qn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),u=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const p=a*h,m=a*d,_=o*h,g=o*d;t[0]=c*h,t[4]=-c*d,t[8]=u,t[1]=m+_*u,t[5]=p-g*u,t[9]=-o*c,t[2]=g-p*u,t[6]=_+m*u,t[10]=a*c}else if(e.order==="YXZ"){const p=c*h,m=c*d,_=u*h,g=u*d;t[0]=p+g*o,t[4]=_*o-m,t[8]=a*u,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=m*o-_,t[6]=g+p*o,t[10]=a*c}else if(e.order==="ZXY"){const p=c*h,m=c*d,_=u*h,g=u*d;t[0]=p-g*o,t[4]=-a*d,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*h,t[9]=g-p*o,t[2]=-a*u,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const p=a*h,m=a*d,_=o*h,g=o*d;t[0]=c*h,t[4]=_*u-m,t[8]=p*u+g,t[1]=c*d,t[5]=g*u+p,t[9]=m*u-_,t[2]=-u,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const p=a*c,m=a*u,_=o*c,g=o*u;t[0]=c*h,t[4]=g-p*d,t[8]=_*d+m,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-u*h,t[6]=m*d+_,t[10]=p-g*d}else if(e.order==="XZY"){const p=a*c,m=a*u,_=o*c,g=o*u;t[0]=c*h,t[4]=-d,t[8]=u*h,t[1]=p*d+g,t[5]=a*h,t[9]=m*d-_,t[2]=_*d-m,t[6]=o*h,t[10]=g*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Iu,e,Uu)}lookAt(e,t,n){const r=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),_n.crossVectors(n,Nt),_n.lengthSq()===0&&(Math.abs(n.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),_n.crossVectors(n,Nt)),_n.normalize(),sr.crossVectors(Nt,_n),r[0]=_n.x,r[4]=sr.x,r[8]=Nt.x,r[1]=_n.y,r[5]=sr.y,r[9]=Nt.y,r[2]=_n.z,r[6]=sr.z,r[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],u=n[12],h=n[1],d=n[5],p=n[9],m=n[13],_=n[2],g=n[6],f=n[10],l=n[14],S=n[3],x=n[7],y=n[11],N=n[15],C=r[0],R=r[4],D=r[8],w=r[12],M=r[1],P=r[5],q=r[9],B=r[13],K=r[2],j=r[6],Y=r[10],te=r[14],J=r[3],_e=r[7],Me=r[11],ve=r[15];return s[0]=a*C+o*M+c*K+u*J,s[4]=a*R+o*P+c*j+u*_e,s[8]=a*D+o*q+c*Y+u*Me,s[12]=a*w+o*B+c*te+u*ve,s[1]=h*C+d*M+p*K+m*J,s[5]=h*R+d*P+p*j+m*_e,s[9]=h*D+d*q+p*Y+m*Me,s[13]=h*w+d*B+p*te+m*ve,s[2]=_*C+g*M+f*K+l*J,s[6]=_*R+g*P+f*j+l*_e,s[10]=_*D+g*q+f*Y+l*Me,s[14]=_*w+g*B+f*te+l*ve,s[3]=S*C+x*M+y*K+N*J,s[7]=S*R+x*P+y*j+N*_e,s[11]=S*D+x*q+y*Y+N*Me,s[15]=S*w+x*B+y*te+N*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],u=e[13],h=e[2],d=e[6],p=e[10],m=e[14],_=e[3],g=e[7],f=e[11],l=e[15];return _*(+s*c*d-r*u*d-s*o*p+n*u*p+r*o*m-n*c*m)+g*(+t*c*m-t*u*p+s*a*p-r*a*m+r*u*h-s*c*h)+f*(+t*u*d-t*o*m-s*a*d+n*a*m+s*o*h-n*u*h)+l*(-r*o*h-t*c*d+t*o*p+r*a*d-n*a*p+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],h=e[8],d=e[9],p=e[10],m=e[11],_=e[12],g=e[13],f=e[14],l=e[15],S=d*f*u-g*p*u+g*c*m-o*f*m-d*c*l+o*p*l,x=_*p*u-h*f*u-_*c*m+a*f*m+h*c*l-a*p*l,y=h*g*u-_*d*u+_*o*m-a*g*m-h*o*l+a*d*l,N=_*d*c-h*g*c-_*o*p+a*g*p+h*o*f-a*d*f,C=t*S+n*x+r*y+s*N;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return e[0]=S*R,e[1]=(g*p*s-d*f*s-g*r*m+n*f*m+d*r*l-n*p*l)*R,e[2]=(o*f*s-g*c*s+g*r*u-n*f*u-o*r*l+n*c*l)*R,e[3]=(d*c*s-o*p*s-d*r*u+n*p*u+o*r*m-n*c*m)*R,e[4]=x*R,e[5]=(h*f*s-_*p*s+_*r*m-t*f*m-h*r*l+t*p*l)*R,e[6]=(_*c*s-a*f*s-_*r*u+t*f*u+a*r*l-t*c*l)*R,e[7]=(a*p*s-h*c*s+h*r*u-t*p*u-a*r*m+t*c*m)*R,e[8]=y*R,e[9]=(_*d*s-h*g*s-_*n*m+t*g*m+h*n*l-t*d*l)*R,e[10]=(a*g*s-_*o*s+_*n*u-t*g*u-a*n*l+t*o*l)*R,e[11]=(h*o*s-a*d*s-h*n*u+t*d*u+a*n*m-t*o*m)*R,e[12]=N*R,e[13]=(h*g*r-_*d*r+_*n*p-t*g*p-h*n*f+t*d*f)*R,e[14]=(_*o*r-a*g*r-_*n*c+t*g*c+a*n*f-t*o*f)*R,e[15]=(a*d*r-h*o*r+h*n*c-t*d*c-a*n*p+t*o*p)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,u=s*a,h=s*o;return this.set(u*a+n,u*o-r*c,u*c+r*o,0,u*o+r*c,h*o+n,h*c-r*a,0,u*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,u=s+s,h=a+a,d=o+o,p=s*u,m=s*h,_=s*d,g=a*h,f=a*d,l=o*d,S=c*u,x=c*h,y=c*d,N=n.x,C=n.y,R=n.z;return r[0]=(1-(g+l))*N,r[1]=(m+y)*N,r[2]=(_-x)*N,r[3]=0,r[4]=(m-y)*C,r[5]=(1-(p+l))*C,r[6]=(f+S)*C,r[7]=0,r[8]=(_+x)*R,r[9]=(f-S)*R,r[10]=(1-(p+g))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Qn.set(r[0],r[1],r[2]).length();const a=Qn.set(r[4],r[5],r[6]).length(),o=Qn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Gt.copy(this);const u=1/s,h=1/a,d=1/o;return Gt.elements[0]*=u,Gt.elements[1]*=u,Gt.elements[2]*=u,Gt.elements[4]*=h,Gt.elements[5]*=h,Gt.elements[6]*=h,Gt.elements[8]*=d,Gt.elements[9]*=d,Gt.elements[10]*=d,t.setFromRotationMatrix(Gt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=hn){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),p=(n+r)/(n-r);let m,_;if(o===hn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Ir)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=hn){const c=this.elements,u=1/(t-e),h=1/(n-r),d=1/(a-s),p=(t+e)*u,m=(n+r)*h;let _,g;if(o===hn)_=(a+s)*d,g=-2*d;else if(o===Ir)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qn=new L,Gt=new rt,Iu=new L(0,0,0),Uu=new L(1,1,1),_n=new L,sr=new L,Nt=new L,ro=new rt,so=new qi;class en{constructor(e=0,t=0,n=0,r=en.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],u=r[5],h=r[9],d=r[2],p=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,u),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ro.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ro,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return so.setFromEuler(this),this.setFromQuaternion(so,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class ta{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nu=0;const ao=new L,ei=new qi,an=new rt,ar=new L,Ui=new L,Fu=new L,Ou=new qi,oo=new L(1,0,0),co=new L(0,1,0),lo=new L(0,0,1),uo={type:"added"},Bu={type:"removed"},ti={type:"childadded",child:null},ds={type:"childremoved",child:null};class dt extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new L,t=new en,n=new qi,r=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new He}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ei.setFromAxisAngle(e,t),this.quaternion.multiply(ei),this}rotateOnWorldAxis(e,t){return ei.setFromAxisAngle(e,t),this.quaternion.premultiply(ei),this}rotateX(e){return this.rotateOnAxis(oo,e)}rotateY(e){return this.rotateOnAxis(co,e)}rotateZ(e){return this.rotateOnAxis(lo,e)}translateOnAxis(e,t){return ao.copy(e).applyQuaternion(this.quaternion),this.position.add(ao.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(oo,e)}translateY(e){return this.translateOnAxis(co,e)}translateZ(e){return this.translateOnAxis(lo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ar.copy(e):ar.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Ui,ar,this.up):an.lookAt(ar,Ui,this.up),this.quaternion.setFromRotationMatrix(an),r&&(an.extractRotation(r.matrixWorld),ei.setFromRotationMatrix(an),this.quaternion.premultiply(ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(uo),ti.child=e,this.dispatchEvent(ti),ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bu),ds.child=e,this.dispatchEvent(ds),ds.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(uo),ti.child=e,this.dispatchEvent(ti),ti.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,Fu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,Ou,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,h=c.length;u<h;u++){const d=c[u];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),u=a(e.textures),h=a(e.images),d=a(e.shapes),p=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),u.length>0&&(n.textures=u),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const c=[];for(const u in o){const h=o[u];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}dt.DEFAULT_UP=new L(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vt=new L,on=new L,fs=new L,cn=new L,ni=new L,ii=new L,ho=new L,ps=new L,ms=new L,gs=new L;class jt{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Vt.subVectors(e,t),r.cross(Vt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Vt.subVectors(r,t),on.subVectors(n,t),fs.subVectors(e,t);const a=Vt.dot(Vt),o=Vt.dot(on),c=Vt.dot(fs),u=on.dot(on),h=on.dot(fs),d=a*u-o*o;if(d===0)return s.set(0,0,0),null;const p=1/d,m=(u*c-o*h)*p,_=(a*h-o*c)*p;return s.set(1-m-_,_,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,cn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,cn.x),c.addScaledVector(a,cn.y),c.addScaledVector(o,cn.z),c)}static isFrontFacing(e,t,n,r){return Vt.subVectors(n,t),on.subVectors(e,t),Vt.cross(on).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vt.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Vt.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return jt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;ni.subVectors(r,n),ii.subVectors(s,n),ps.subVectors(e,n);const c=ni.dot(ps),u=ii.dot(ps);if(c<=0&&u<=0)return t.copy(n);ms.subVectors(e,r);const h=ni.dot(ms),d=ii.dot(ms);if(h>=0&&d<=h)return t.copy(r);const p=c*d-h*u;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ni,a);gs.subVectors(e,s);const m=ni.dot(gs),_=ii.dot(gs);if(_>=0&&m<=_)return t.copy(s);const g=m*u-c*_;if(g<=0&&u>=0&&_<=0)return o=u/(u-_),t.copy(n).addScaledVector(ii,o);const f=h*_-m*d;if(f<=0&&d-h>=0&&m-_>=0)return ho.subVectors(s,r),o=(d-h)/(d-h+(m-_)),t.copy(r).addScaledVector(ho,o);const l=1/(f+g+p);return a=g*l,o=p*l,t.copy(n).addScaledVector(ni,a).addScaledVector(ii,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Uc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},or={h:0,s:0,l:0};function _s(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=Eu(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=_s(a,s,e+1/3),this.g=_s(a,s,e),this.b=_s(a,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,t=Ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=Uc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return tt.fromWorkingColorSpace(Tt.copy(this),e),Math.round(wt(Tt.r*255,0,255))*65536+Math.round(wt(Tt.g*255,0,255))*256+Math.round(wt(Tt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,r=Tt.g,s=Tt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,u;const h=(o+a)/2;if(o===a)c=0,u=0;else{const d=a-o;switch(u=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=u,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=Ot){tt.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,r=Tt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(vn),this.setHSL(vn.h+e,vn.s+t,vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vn),e.getHSL(or);const n=ns(vn.h,or.h,t),r=ns(vn.s,or.s,t),s=ns(vn.l,or.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Ye;Ye.NAMES=Uc;let zu=0;class $i extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=pi,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fs,this.blendDst=Os,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==Tn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fs&&(n.blendSrc=this.blendSrc),this.blendDst!==Os&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Cr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xt extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=_c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new L,cr=new de;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Pc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix3(e),this.setXY(t,cr.x,cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ja&&(e.usage=this.usage),e}}class Nc extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Fc extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class st extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ku=0;const kt=new rt,vs=new dt,ri=new L,Ft=new Yn,Ni=new Yn,Et=new L;class It extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rc(e)?Fc:Nc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new He().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kt.makeRotationFromQuaternion(e),this.applyMatrix4(kt),this}rotateX(e){return kt.makeRotationX(e),this.applyMatrix4(kt),this}rotateY(e){return kt.makeRotationY(e),this.applyMatrix4(kt),this}rotateZ(e){return kt.makeRotationZ(e),this.applyMatrix4(kt),this}translate(e,t,n){return kt.makeTranslation(e,t,n),this.applyMatrix4(kt),this}scale(e,t,n){return kt.makeScale(e,t,n),this.applyMatrix4(kt),this}lookAt(e){return vs.lookAt(e),vs.updateMatrix(),this.applyMatrix4(vs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new st(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ft.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ni.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Ft.min,Ni.min),Ft.expandByPoint(Et),Et.addVectors(Ft.max,Ni.max),Ft.expandByPoint(Et)):(Ft.expandByPoint(Ni.min),Ft.expandByPoint(Ni.max))}Ft.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let u=0,h=o.count;u<h;u++)Et.fromBufferAttribute(o,u),c&&(ri.fromBufferAttribute(e,u),Et.add(ri)),r=Math.max(r,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new L,c[D]=new L;const u=new L,h=new L,d=new L,p=new de,m=new de,_=new de,g=new L,f=new L;function l(D,w,M){u.fromBufferAttribute(n,D),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),p.fromBufferAttribute(s,D),m.fromBufferAttribute(s,w),_.fromBufferAttribute(s,M),h.sub(u),d.sub(u),m.sub(p),_.sub(p);const P=1/(m.x*_.y-_.x*m.y);isFinite(P)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(P),f.copy(d).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(P),o[D].add(g),o[w].add(g),o[M].add(g),c[D].add(f),c[w].add(f),c[M].add(f))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let D=0,w=S.length;D<w;++D){const M=S[D],P=M.start,q=M.count;for(let B=P,K=P+q;B<K;B+=3)l(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const x=new L,y=new L,N=new L,C=new L;function R(D){N.fromBufferAttribute(r,D),C.copy(N);const w=o[D];x.copy(w),x.sub(N.multiplyScalar(N.dot(w))).normalize(),y.crossVectors(C,w);const P=y.dot(c[D])<0?-1:1;a.setXYZW(D,x.x,x.y,x.z,P)}for(let D=0,w=S.length;D<w;++D){const M=S[D],P=M.start,q=M.count;for(let B=P,K=P+q;B<K;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const r=new L,s=new L,a=new L,o=new L,c=new L,u=new L,h=new L,d=new L;if(e)for(let p=0,m=e.count;p<m;p+=3){const _=e.getX(p+0),g=e.getX(p+1),f=e.getX(p+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,f),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),u.fromBufferAttribute(n,f),o.add(h),c.add(h),u.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(f,u.x,u.y,u.z)}else for(let p=0,m=t.count;p<m;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,c){const u=o.array,h=o.itemSize,d=o.normalized,p=new u.constructor(c.length*h);let m=0,_=0;for(let g=0,f=c.length;g<f;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*h;for(let l=0;l<h;l++)p[_++]=u[m++]}return new qt(p,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new It,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],u=e(c,n);t.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const c=[],u=s[o];for(let h=0,d=u.length;h<d;h++){const p=u[h],m=e(p,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const u=n[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],h=[];for(let d=0,p=u.length;d<p;d++){const m=u[d];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const u in r){const h=r[u];this.setAttribute(u,h.clone(t))}const s=e.morphAttributes;for(const u in s){const h=[],d=s[u];for(let p=0,m=d.length;p<m;p++)h.push(d[p].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,h=a.length;u<h;u++){const d=a[u];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fo=new rt,Nn=new Ic,lr=new Yi,po=new L,si=new L,ai=new L,oi=new L,xs=new L,ur=new L,hr=new de,dr=new de,fr=new de,mo=new L,go=new L,_o=new L,pr=new L,mr=new L;class Ke extends dt{constructor(e=new It,t=new Xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ur.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const h=o[c],d=s[c];h!==0&&(xs.fromBufferAttribute(d,e),a?ur.addScaledVector(xs,h):ur.addScaledVector(xs.sub(t),h))}t.add(ur)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(s),Nn.copy(e.ray).recast(e.near),!(lr.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(lr,po)===null||Nn.origin.distanceToSquared(po)>(e.far-e.near)**2))&&(fo.copy(s).invert(),Nn.copy(e.ray).applyMatrix4(fo),!(n.boundingBox!==null&&Nn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Nn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,u=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,p=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const f=p[_],l=a[f.materialIndex],S=Math.max(f.start,m.start),x=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let y=S,N=x;y<N;y+=3){const C=o.getX(y),R=o.getX(y+1),D=o.getX(y+2);r=gr(this,l,e,n,u,h,d,C,R,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let f=_,l=g;f<l;f+=3){const S=o.getX(f),x=o.getX(f+1),y=o.getX(f+2);r=gr(this,a,e,n,u,h,d,S,x,y),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const f=p[_],l=a[f.materialIndex],S=Math.max(f.start,m.start),x=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let y=S,N=x;y<N;y+=3){const C=y,R=y+1,D=y+2;r=gr(this,l,e,n,u,h,d,C,R,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let f=_,l=g;f<l;f+=3){const S=f,x=f+1,y=f+2;r=gr(this,a,e,n,u,h,d,S,x,y),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}}function Hu(i,e,t,n,r,s,a,o){let c;if(e.side===Pt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Tn,o),c===null)return null;mr.copy(o),mr.applyMatrix4(i.matrixWorld);const u=t.ray.origin.distanceTo(mr);return u<t.near||u>t.far?null:{distance:u,point:mr.clone(),object:i}}function gr(i,e,t,n,r,s,a,o,c,u){i.getVertexPosition(o,si),i.getVertexPosition(c,ai),i.getVertexPosition(u,oi);const h=Hu(i,e,t,n,si,ai,oi,pr);if(h){r&&(hr.fromBufferAttribute(r,o),dr.fromBufferAttribute(r,c),fr.fromBufferAttribute(r,u),h.uv=jt.getInterpolation(pr,si,ai,oi,hr,dr,fr,new de)),s&&(hr.fromBufferAttribute(s,o),dr.fromBufferAttribute(s,c),fr.fromBufferAttribute(s,u),h.uv1=jt.getInterpolation(pr,si,ai,oi,hr,dr,fr,new de)),a&&(mo.fromBufferAttribute(a,o),go.fromBufferAttribute(a,c),_o.fromBufferAttribute(a,u),h.normal=jt.getInterpolation(pr,si,ai,oi,mo,go,_o,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:u,normal:new L,materialIndex:0};jt.getNormal(si,ai,oi,d.normal),h.face=d}return h}class ze extends It{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],u=[],h=[],d=[];let p=0,m=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new st(u,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(d,2));function _(g,f,l,S,x,y,N,C,R,D,w){const M=y/R,P=N/D,q=y/2,B=N/2,K=C/2,j=R+1,Y=D+1;let te=0,J=0;const _e=new L;for(let Me=0;Me<Y;Me++){const ve=Me*P-B;for(let Ue=0;Ue<j;Ue++){const We=Ue*M-q;_e[g]=We*S,_e[f]=ve*x,_e[l]=K,u.push(_e.x,_e.y,_e.z),_e[g]=0,_e[f]=0,_e[l]=C>0?1:-1,h.push(_e.x,_e.y,_e.z),d.push(Ue/R),d.push(1-Me/D),te+=1}}for(let Me=0;Me<D;Me++)for(let ve=0;ve<R;ve++){const Ue=p+ve+j*Me,We=p+ve+j*(Me+1),Z=p+(ve+1)+j*(Me+1),ce=p+(ve+1)+j*Me;c.push(Ue,We,ce),c.push(We,Z,ce),J+=6}o.addGroup(m,J,w),m+=J,p+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ze(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=yi(i[t]);for(const r in n)e[r]=n[r]}return e}function Gu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Oc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Vu={clone:yi,merge:Rt};var Wu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Cn extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wu,this.fragmentShader=Xu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yi(e.uniforms),this.uniformsGroups=Gu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bc extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xn=new L,vo=new de,xo=new de;class Bt extends Bc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xn.x,xn.y).multiplyScalar(-e/xn.z),xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xn.x,xn.y).multiplyScalar(-e/xn.z)}getViewSize(e,t){return this.getViewBounds(e,vo,xo),t.subVectors(xo,vo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ts*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/u,r*=a.width/c,n*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ci=-90,li=1;class qu extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bt(ci,li,e,t);r.layers=this.layers,this.add(r);const s=new Bt(ci,li,e,t);s.layers=this.layers,this.add(s);const a=new Bt(ci,li,e,t);a.layers=this.layers,this.add(a);const o=new Bt(ci,li,e,t);o.layers=this.layers,this.add(o);const c=new Bt(ci,li,e,t);c.layers=this.layers,this.add(c);const u=new Bt(ci,li,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const u of t)this.remove(u);if(e===hn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,u,h]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,u),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(d,p,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class zc extends At{constructor(e,t,n,r,s,a,o,c,u,h){e=e!==void 0?e:[],t=t!==void 0?t:_i,super(e,t,n,r,s,a,o,c,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yu extends Xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new zc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ze(5,5,5),s=new Cn({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:En});s.uniforms.tEquirect.value=t;const a=new Ke(r,s),o=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Wt),new qu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const Ms=new L,$u=new L,Ku=new He;class zn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ms.subVectors(n,t).cross($u.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ms),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ku.getNormalMatrix(e),r=this.coplanarPoint(Ms).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fn=new Yi,_r=new L;class na{constructor(e=new zn,t=new zn,n=new zn,r=new zn,s=new zn,a=new zn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hn){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],u=r[4],h=r[5],d=r[6],p=r[7],m=r[8],_=r[9],g=r[10],f=r[11],l=r[12],S=r[13],x=r[14],y=r[15];if(n[0].setComponents(c-s,p-u,f-m,y-l).normalize(),n[1].setComponents(c+s,p+u,f+m,y+l).normalize(),n[2].setComponents(c+a,p+h,f+_,y+S).normalize(),n[3].setComponents(c-a,p-h,f-_,y-S).normalize(),n[4].setComponents(c-o,p-d,f-g,y-x).normalize(),t===hn)n[5].setComponents(c+o,p+d,f+g,y+x).normalize();else if(t===Ir)n[5].setComponents(o,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fn)}intersectsSprite(e){return Fn.center.set(0,0,0),Fn.radius=.7071067811865476,Fn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(_r.x=r.normal.x>0?e.max.x:e.min.x,_r.y=r.normal.y>0?e.max.y:e.min.y,_r.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kc(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ju(i){const e=new WeakMap;function t(o,c){const u=o.array,h=o.usage,d=u.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,u,h),o.onUploadCallback();let m;if(u instanceof Float32Array)m=i.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=i.SHORT;else if(u instanceof Uint32Array)m=i.UNSIGNED_INT;else if(u instanceof Int32Array)m=i.INT;else if(u instanceof Int8Array)m=i.BYTE;else if(u instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,u){const h=c.array,d=c._updateRange,p=c.updateRanges;if(i.bindBuffer(u,o),d.count===-1&&p.length===0&&i.bufferSubData(u,0,h),p.length!==0){for(let m=0,_=p.length;m<_;m++){const g=p[m];i.bufferSubData(u,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}d.count!==-1&&(i.bufferSubData(u,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count),d.count=-1),c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const u=e.get(o);if(u===void 0)e.set(o,t(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,c),u.version=o.version}}return{get:r,remove:s,update:a}}class Rn extends It{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),u=o+1,h=c+1,d=e/o,p=t/c,m=[],_=[],g=[],f=[];for(let l=0;l<h;l++){const S=l*p-a;for(let x=0;x<u;x++){const y=x*d-s;_.push(y,-S,0),g.push(0,0,1),f.push(x/o),f.push(1-l/c)}}for(let l=0;l<c;l++)for(let S=0;S<o;S++){const x=S+u*l,y=S+u*(l+1),N=S+1+u*(l+1),C=S+1+u*l;m.push(x,y,C),m.push(y,N,C)}this.setIndex(m),this.setAttribute("position",new st(_,3)),this.setAttribute("normal",new st(g,3)),this.setAttribute("uv",new st(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Zu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ju=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,th=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ih=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,rh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ah=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,oh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ch=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,uh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,Mh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Sh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Eh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Th=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ah="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ch=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Rh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ph=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Dh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ih=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Uh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Oh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Wh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$h=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Kh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Jh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ed=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,td=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,id=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ad=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,od=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ld=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ud=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,md=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Md=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ed=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Td=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ad=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ld=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Id=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ud=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Nd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Od=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,sf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,af=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,df=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ff=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_f=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ef=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Tf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Af=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Rf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:Zu,alphahash_pars_fragment:ju,alphamap_fragment:Qu,alphamap_pars_fragment:eh,alphatest_fragment:th,alphatest_pars_fragment:nh,aomap_fragment:ih,aomap_pars_fragment:rh,batching_pars_vertex:sh,batching_vertex:ah,begin_vertex:oh,beginnormal_vertex:ch,bsdfs:lh,iridescence_fragment:uh,bumpmap_pars_fragment:hh,clipping_planes_fragment:dh,clipping_planes_pars_fragment:fh,clipping_planes_pars_vertex:ph,clipping_planes_vertex:mh,color_fragment:gh,color_pars_fragment:_h,color_pars_vertex:vh,color_vertex:xh,common:Mh,cube_uv_reflection_fragment:Sh,defaultnormal_vertex:yh,displacementmap_pars_vertex:Eh,displacementmap_vertex:wh,emissivemap_fragment:bh,emissivemap_pars_fragment:Th,colorspace_fragment:Ah,colorspace_pars_fragment:Ch,envmap_fragment:Rh,envmap_common_pars_fragment:Ph,envmap_pars_fragment:Lh,envmap_pars_vertex:Dh,envmap_physical_pars_fragment:Vh,envmap_vertex:Ih,fog_vertex:Uh,fog_pars_vertex:Nh,fog_fragment:Fh,fog_pars_fragment:Oh,gradientmap_pars_fragment:Bh,lightmap_pars_fragment:zh,lights_lambert_fragment:kh,lights_lambert_pars_fragment:Hh,lights_pars_begin:Gh,lights_toon_fragment:Wh,lights_toon_pars_fragment:Xh,lights_phong_fragment:qh,lights_phong_pars_fragment:Yh,lights_physical_fragment:$h,lights_physical_pars_fragment:Kh,lights_fragment_begin:Jh,lights_fragment_maps:Zh,lights_fragment_end:jh,logdepthbuf_fragment:Qh,logdepthbuf_pars_fragment:ed,logdepthbuf_pars_vertex:td,logdepthbuf_vertex:nd,map_fragment:id,map_pars_fragment:rd,map_particle_fragment:sd,map_particle_pars_fragment:ad,metalnessmap_fragment:od,metalnessmap_pars_fragment:cd,morphinstance_vertex:ld,morphcolor_vertex:ud,morphnormal_vertex:hd,morphtarget_pars_vertex:dd,morphtarget_vertex:fd,normal_fragment_begin:pd,normal_fragment_maps:md,normal_pars_fragment:gd,normal_pars_vertex:_d,normal_vertex:vd,normalmap_pars_fragment:xd,clearcoat_normal_fragment_begin:Md,clearcoat_normal_fragment_maps:Sd,clearcoat_pars_fragment:yd,iridescence_pars_fragment:Ed,opaque_fragment:wd,packing:bd,premultiplied_alpha_fragment:Td,project_vertex:Ad,dithering_fragment:Cd,dithering_pars_fragment:Rd,roughnessmap_fragment:Pd,roughnessmap_pars_fragment:Ld,shadowmap_pars_fragment:Dd,shadowmap_pars_vertex:Id,shadowmap_vertex:Ud,shadowmask_pars_fragment:Nd,skinbase_vertex:Fd,skinning_pars_vertex:Od,skinning_vertex:Bd,skinnormal_vertex:zd,specularmap_fragment:kd,specularmap_pars_fragment:Hd,tonemapping_fragment:Gd,tonemapping_pars_fragment:Vd,transmission_fragment:Wd,transmission_pars_fragment:Xd,uv_pars_fragment:qd,uv_pars_vertex:Yd,uv_vertex:$d,worldpos_vertex:Kd,background_vert:Jd,background_frag:Zd,backgroundCube_vert:jd,backgroundCube_frag:Qd,cube_vert:ef,cube_frag:tf,depth_vert:nf,depth_frag:rf,distanceRGBA_vert:sf,distanceRGBA_frag:af,equirect_vert:of,equirect_frag:cf,linedashed_vert:lf,linedashed_frag:uf,meshbasic_vert:hf,meshbasic_frag:df,meshlambert_vert:ff,meshlambert_frag:pf,meshmatcap_vert:mf,meshmatcap_frag:gf,meshnormal_vert:_f,meshnormal_frag:vf,meshphong_vert:xf,meshphong_frag:Mf,meshphysical_vert:Sf,meshphysical_frag:yf,meshtoon_vert:Ef,meshtoon_frag:wf,points_vert:bf,points_frag:Tf,shadow_vert:Af,shadow_frag:Cf,sprite_vert:Rf,sprite_frag:Pf},me={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Jt={basic:{uniforms:Rt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Rt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Rt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Rt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Rt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Rt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Rt([me.points,me.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Rt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Rt([me.common,me.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Rt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Rt([me.sprite,me.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Rt([me.common,me.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Rt([me.lights,me.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};Jt.physical={uniforms:Rt([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const vr={r:0,b:0,g:0},On=new en,Lf=new rt;function Df(i,e,t,n,r,s,a){const o=new Ye(0);let c=s===!0?0:1,u,h,d=null,p=0,m=null;function _(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?t:e).get(x)),x}function g(S){let x=!1;const y=_(S);y===null?l(o,c):y&&y.isColor&&(l(y,1),x=!0);const N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,a):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(S,x){const y=_(x);y&&(y.isCubeTexture||y.mapping===Br)?(h===void 0&&(h=new Ke(new ze(1,1,1),new Cn({name:"BackgroundCubeMaterial",uniforms:yi(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),On.copy(x.backgroundRotation),On.x*=-1,On.y*=-1,On.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Lf.makeRotationFromEuler(On)),h.material.toneMapped=tt.getTransfer(y.colorSpace)!==at,(d!==y||p!==y.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=y,p=y.version,m=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(u===void 0&&(u=new Ke(new Rn(2,2),new Cn({name:"BackgroundMaterial",uniforms:yi(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=y,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=tt.getTransfer(y.colorSpace)!==at,y.matrixAutoUpdate===!0&&y.updateMatrix(),u.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||p!==y.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,d=y,p=y.version,m=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null))}function l(S,x){S.getRGB(vr,Oc(i)),n.buffers.color.setClear(vr.r,vr.g,vr.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(S,x=1){o.set(S),c=x,l(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,l(o,c)},render:g,addToRenderList:f}}function If(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,a=!1;function o(M,P,q,B,K){let j=!1;const Y=d(B,q,P);s!==Y&&(s=Y,u(s.object)),j=m(M,B,q,K),j&&_(M,B,q,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,y(M,P,q,B),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function c(){return i.createVertexArray()}function u(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,P,q){const B=q.wireframe===!0;let K=n[M.id];K===void 0&&(K={},n[M.id]=K);let j=K[P.id];j===void 0&&(j={},K[P.id]=j);let Y=j[B];return Y===void 0&&(Y=p(c()),j[B]=Y),Y}function p(M){const P=[],q=[],B=[];for(let K=0;K<t;K++)P[K]=0,q[K]=0,B[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:q,attributeDivisors:B,object:M,attributes:{},index:null}}function m(M,P,q,B){const K=s.attributes,j=P.attributes;let Y=0;const te=q.getAttributes();for(const J in te)if(te[J].location>=0){const Me=K[J];let ve=j[J];if(ve===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor)),Me===void 0||Me.attribute!==ve||ve&&Me.data!==ve.data)return!0;Y++}return s.attributesNum!==Y||s.index!==B}function _(M,P,q,B){const K={},j=P.attributes;let Y=0;const te=q.getAttributes();for(const J in te)if(te[J].location>=0){let Me=j[J];Me===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(Me=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(Me=M.instanceColor));const ve={};ve.attribute=Me,Me&&Me.data&&(ve.data=Me.data),K[J]=ve,Y++}s.attributes=K,s.attributesNum=Y,s.index=B}function g(){const M=s.newAttributes;for(let P=0,q=M.length;P<q;P++)M[P]=0}function f(M){l(M,0)}function l(M,P){const q=s.newAttributes,B=s.enabledAttributes,K=s.attributeDivisors;q[M]=1,B[M]===0&&(i.enableVertexAttribArray(M),B[M]=1),K[M]!==P&&(i.vertexAttribDivisor(M,P),K[M]=P)}function S(){const M=s.newAttributes,P=s.enabledAttributes;for(let q=0,B=P.length;q<B;q++)P[q]!==M[q]&&(i.disableVertexAttribArray(q),P[q]=0)}function x(M,P,q,B,K,j,Y){Y===!0?i.vertexAttribIPointer(M,P,q,K,j):i.vertexAttribPointer(M,P,q,B,K,j)}function y(M,P,q,B){g();const K=B.attributes,j=q.getAttributes(),Y=P.defaultAttributeValues;for(const te in j){const J=j[te];if(J.location>=0){let _e=K[te];if(_e===void 0&&(te==="instanceMatrix"&&M.instanceMatrix&&(_e=M.instanceMatrix),te==="instanceColor"&&M.instanceColor&&(_e=M.instanceColor)),_e!==void 0){const Me=_e.normalized,ve=_e.itemSize,Ue=e.get(_e);if(Ue===void 0)continue;const We=Ue.buffer,Z=Ue.type,ce=Ue.bytesPerElement,Se=Z===i.INT||Z===i.UNSIGNED_INT||_e.gpuType===Mc;if(_e.isInterleavedBufferAttribute){const ue=_e.data,X=ue.stride,H=_e.offset;if(ue.isInstancedInterleavedBuffer){for(let Q=0;Q<J.locationSize;Q++)l(J.location+Q,ue.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Q=0;Q<J.locationSize;Q++)f(J.location+Q);i.bindBuffer(i.ARRAY_BUFFER,We);for(let Q=0;Q<J.locationSize;Q++)x(J.location+Q,ve/J.locationSize,Z,Me,X*ce,(H+ve/J.locationSize*Q)*ce,Se)}else{if(_e.isInstancedBufferAttribute){for(let ue=0;ue<J.locationSize;ue++)l(J.location+ue,_e.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let ue=0;ue<J.locationSize;ue++)f(J.location+ue);i.bindBuffer(i.ARRAY_BUFFER,We);for(let ue=0;ue<J.locationSize;ue++)x(J.location+ue,ve/J.locationSize,Z,Me,ve*ce,ve/J.locationSize*ue*ce,Se)}}else if(Y!==void 0){const Me=Y[te];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(J.location,Me);break;case 3:i.vertexAttrib3fv(J.location,Me);break;case 4:i.vertexAttrib4fv(J.location,Me);break;default:i.vertexAttrib1fv(J.location,Me)}}}}S()}function N(){D();for(const M in n){const P=n[M];for(const q in P){const B=P[q];for(const K in B)h(B[K].object),delete B[K];delete P[q]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const q in P){const B=P[q];for(const K in B)h(B[K].object),delete B[K];delete P[q]}delete n[M.id]}function R(M){for(const P in n){const q=n[P];if(q[M.id]===void 0)continue;const B=q[M.id];for(const K in B)h(B[K].object),delete B[K];delete q[M.id]}}function D(){w(),a=!0,s!==r&&(s=r,u(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:w,dispose:N,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:g,enableAttribute:f,disableUnusedAttributes:S}}function Uf(i,e,t){let n;function r(u){n=u}function s(u,h){i.drawArrays(n,u,h),t.update(h,n,1)}function a(u,h,d){d!==0&&(i.drawArraysInstanced(n,u,h,d),t.update(h,n,d))}function o(u,h,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d;m++)this.render(u[m],h[m]);else{p.multiDrawArraysWEBGL(n,u,0,h,0,d);let m=0;for(let _=0;_<d;_++)m+=h[_];t.update(m,n,1)}}function c(u,h,d,p){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<u.length;_++)a(u[_],h[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(n,u,0,h,0,p,0,d);let _=0;for(let g=0;g<d;g++)_+=h[g];for(let g=0;g<p.length;g++)t.update(_,n,p[g])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Nf(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==Qt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const R=C===zr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==An&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==un&&!R)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const h=c(u);h!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);const d=t.logarithmicDepthBuffer===!0,p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),l=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=m>0,N=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:l,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:y,maxSamples:N}}function Ff(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new zn,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const m=d.length!==0||p||n!==0||r;return r=p,n=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,p){t=h(d,p,0)},this.setState=function(d,p,m){const _=d.clippingPlanes,g=d.clipIntersection,f=d.clipShadows,l=i.get(d);if(!r||_===null||_.length===0||s&&!f)s?h(null):u();else{const S=s?0:n,x=S*4;let y=l.clippingState||null;c.value=y,y=h(_,p,x,m);for(let N=0;N!==x;++N)y[N]=t[N];l.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,p,m,_){const g=d!==null?d.length:0;let f=null;if(g!==0){if(f=c.value,_!==!0||f===null){const l=m+g*4,S=p.matrixWorldInverse;o.getNormalMatrix(S),(f===null||f.length<l)&&(f=new Float32Array(l));for(let x=0,y=m;x!==g;++x,y+=4)a.copy(d[x]).applyMatrix4(S,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,f}}function Of(i){let e=new WeakMap;function t(a,o){return o===Bs?a.mapping=_i:o===zs&&(a.mapping=vi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Bs||o===zs)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const u=new Yu(c.height);return u.fromEquirectangularTexture(i,a),e.set(a,u),a.addEventListener("dispose",r),t(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Hc extends Bc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const di=4,Mo=[.125,.215,.35,.446,.526,.582],Gn=20,Ss=new Hc,So=new Ye;let ys=null,Es=0,ws=0,bs=!1;const kn=(1+Math.sqrt(5))/2,ui=1/kn,yo=[new L(-kn,ui,0),new L(kn,ui,0),new L(-ui,0,kn),new L(ui,0,kn),new L(0,kn,-ui),new L(0,kn,ui),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Eo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ys=this._renderer.getRenderTarget(),Es=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=To(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ys,Es,ws),this._renderer.xr.enabled=bs,e.scissorTest=!1,xr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ys=this._renderer.getRenderTarget(),Es=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:zr,format:Qt,colorSpace:Pn,depthBuffer:!1},r=wo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wo(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bf(s)),this._blurMaterial=zf(s,e,t)}return r}_compileMaterial(e){const t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,Ss)}_sceneToCubeUV(e,t,n,r){const o=new Bt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(So),h.toneMapping=wn,h.autoClear=!1;const m=new Xt({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),_=new Ke(new ze,m);let g=!1;const f=e.background;f?f.isColor&&(m.color.copy(f),e.background=null,g=!0):(m.color.copy(So),g=!0);for(let l=0;l<6;l++){const S=l%3;S===0?(o.up.set(0,c[l],0),o.lookAt(u[l],0,0)):S===1?(o.up.set(0,0,c[l]),o.lookAt(0,u[l],0)):(o.up.set(0,c[l],0),o.lookAt(0,0,u[l]));const x=this._cubeSize;xr(r,S*x,l>2?x:0,x,x),h.setRenderTarget(r),g&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=p,h.autoClear=d,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===_i||e.mapping===vi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=To()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bo());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;xr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ss)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=yo[(r-s-1)%yo.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ke(this._lodPlanes[r],u),p=u.uniforms,m=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Gn-1),g=s/_,f=isFinite(s)?1+Math.floor(h*g):Gn;f>Gn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Gn}`);const l=[];let S=0;for(let R=0;R<Gn;++R){const D=R/g,w=Math.exp(-D*D/2);l.push(w),R===0?S+=w:R<f&&(S+=2*w)}for(let R=0;R<l.length;R++)l[R]=l[R]/S;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=l,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:x}=this;p.dTheta.value=_,p.mipInt.value=x-n;const y=this._sizeLods[r],N=3*y*(r>x-di?r-x+di:0),C=4*(this._cubeSize-y);xr(t,N,C,3*y,2*y),c.setRenderTarget(t),c.render(d,Ss)}}function Bf(i){const e=[],t=[],n=[];let r=i;const s=i-di+1+Mo.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>i-di?c=Mo[a-i+di-1]:a===0&&(c=0),n.push(c);const u=1/(o-2),h=-u,d=1+u,p=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,_=6,g=3,f=2,l=1,S=new Float32Array(g*_*m),x=new Float32Array(f*_*m),y=new Float32Array(l*_*m);for(let C=0;C<m;C++){const R=C%3*2/3-1,D=C>2?0:-1,w=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];S.set(w,g*_*C),x.set(p,f*_*C);const M=[C,C,C,C,C,C];y.set(M,l*_*C)}const N=new It;N.setAttribute("position",new qt(S,g)),N.setAttribute("uv",new qt(x,f)),N.setAttribute("faceIndex",new qt(y,l)),e.push(N),r>di&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function wo(i,e,t){const n=new Xn(i,e,t);return n.texture.mapping=Br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function zf(i,e,t){const n=new Float32Array(Gn),r=new L(0,1,0);return new Cn({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function bo(){return new Cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function To(){return new Cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function ia(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function kf(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,u=c===Bs||c===zs,h=c===_i||c===vi;if(u||h){let d=e.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new Eo(i)),d=u?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return u&&m&&m.height>0||h&&m&&r(m)?(t===null&&(t=new Eo(i)),d=u?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let c=0;const u=6;for(let h=0;h<u;h++)o[h]!==void 0&&c++;return c===u}function s(o){const c=o.target;c.removeEventListener("dispose",s);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Hf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Pc("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Gf(i,e,t,n){const r={},s=new WeakMap;function a(d){const p=d.target;p.index!==null&&e.remove(p.index);for(const _ in p.attributes)e.remove(p.attributes[_]);for(const _ in p.morphAttributes){const g=p.morphAttributes[_];for(let f=0,l=g.length;f<l;f++)e.remove(g[f])}p.removeEventListener("dispose",a),delete r[p.id];const m=s.get(p);m&&(e.remove(m),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(d,p){return r[p.id]===!0||(p.addEventListener("dispose",a),r[p.id]=!0,t.memory.geometries++),p}function c(d){const p=d.attributes;for(const _ in p)e.update(p[_],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const _ in m){const g=m[_];for(let f=0,l=g.length;f<l;f++)e.update(g[f],i.ARRAY_BUFFER)}}function u(d){const p=[],m=d.index,_=d.attributes.position;let g=0;if(m!==null){const S=m.array;g=m.version;for(let x=0,y=S.length;x<y;x+=3){const N=S[x+0],C=S[x+1],R=S[x+2];p.push(N,C,C,R,R,N)}}else if(_!==void 0){const S=_.array;g=_.version;for(let x=0,y=S.length/3-1;x<y;x+=3){const N=x+0,C=x+1,R=x+2;p.push(N,C,C,R,R,N)}}else return;const f=new(Rc(p)?Fc:Nc)(p,1);f.version=g;const l=s.get(d);l&&e.remove(l),s.set(d,f)}function h(d){const p=s.get(d);if(p){const m=d.index;m!==null&&p.version<m.version&&u(d)}else u(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Vf(i,e,t){let n;function r(p){n=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function c(p,m){i.drawElements(n,m,s,p*a),t.update(m,n,1)}function u(p,m,_){_!==0&&(i.drawElementsInstanced(n,m,s,p*a,_),t.update(m,n,_))}function h(p,m,_){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<_;f++)this.render(p[f]/a,m[f]);else{g.multiDrawElementsWEBGL(n,m,0,s,p,0,_);let f=0;for(let l=0;l<_;l++)f+=m[l];t.update(f,n,1)}}function d(p,m,_,g){if(_===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let l=0;l<p.length;l++)u(p[l]/a,m[l],g[l]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,s,p,0,g,0,_);let l=0;for(let S=0;S<_;S++)l+=m[S];for(let S=0;S<g.length;S++)t.update(l,n,g[S])}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Wf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Xf(i,e,t){const n=new WeakMap,r=new lt;function s(a,o,c){const u=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let p=n.get(o);if(p===void 0||p.count!==d){let M=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var m=M;p!==void 0&&p.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,l=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),f===!0&&(y=3);let N=o.attributes.position.count*y,C=1;N>e.maxTextureSize&&(C=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const R=new Float32Array(N*C*4*d),D=new Dc(R,N,C,d);D.type=un,D.needsUpdate=!0;const w=y*4;for(let P=0;P<d;P++){const q=l[P],B=S[P],K=x[P],j=N*C*4*P;for(let Y=0;Y<q.count;Y++){const te=Y*w;_===!0&&(r.fromBufferAttribute(q,Y),R[j+te+0]=r.x,R[j+te+1]=r.y,R[j+te+2]=r.z,R[j+te+3]=0),g===!0&&(r.fromBufferAttribute(B,Y),R[j+te+4]=r.x,R[j+te+5]=r.y,R[j+te+6]=r.z,R[j+te+7]=0),f===!0&&(r.fromBufferAttribute(K,Y),R[j+te+8]=r.x,R[j+te+9]=r.y,R[j+te+10]=r.z,R[j+te+11]=K.itemSize===4?r.w:1)}}p={count:d,texture:D,size:new de(N,C)},n.set(o,p),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let f=0;f<u.length;f++)_+=u[f];const g=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",u)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function qf(i,e,t,n){let r=new WeakMap;function s(c){const u=n.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return d}function a(){r=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:a}}class Gc extends At{constructor(e,t,n,r,s,a,o,c,u,h=mi){if(h!==mi&&h!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===mi&&(n=xi),n===void 0&&h===Si&&(n=Mi),super(null,r,s,a,o,c,h,n,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Dt,this.minFilter=c!==void 0?c:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Vc=new At,Wc=new Gc(1,1);Wc.compareFunction=Cc;const Xc=new Dc,qc=new Lu,Yc=new zc,Ao=[],Co=[],Ro=new Float32Array(16),Po=new Float32Array(9),Lo=new Float32Array(4);function Ai(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ao[r];if(s===void 0&&(s=new Float32Array(r),Ao[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Hr(i,e){let t=Co[e];t===void 0&&(t=new Int32Array(e),Co[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Yf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $f(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),Mt(t,e)}}function Kf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),Mt(t,e)}}function Jf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),Mt(t,e)}}function Zf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Lo.set(n),i.uniformMatrix2fv(this.addr,!1,Lo),Mt(t,n)}}function jf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Po.set(n),i.uniformMatrix3fv(this.addr,!1,Po),Mt(t,n)}}function Qf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Ro.set(n),i.uniformMatrix4fv(this.addr,!1,Ro),Mt(t,n)}}function ep(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),Mt(t,e)}}function np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),Mt(t,e)}}function ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),Mt(t,e)}}function rp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),Mt(t,e)}}function ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),Mt(t,e)}}function op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),Mt(t,e)}}function cp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Wc:Vc;t.setTexture2D(e||s,r)}function lp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||qc,r)}function up(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Yc,r)}function hp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Xc,r)}function dp(i){switch(i){case 5126:return Yf;case 35664:return $f;case 35665:return Kf;case 35666:return Jf;case 35674:return Zf;case 35675:return jf;case 35676:return Qf;case 5124:case 35670:return ep;case 35667:case 35671:return tp;case 35668:case 35672:return np;case 35669:case 35673:return ip;case 5125:return rp;case 36294:return sp;case 36295:return ap;case 36296:return op;case 35678:case 36198:case 36298:case 36306:case 35682:return cp;case 35679:case 36299:case 36307:return lp;case 35680:case 36300:case 36308:case 36293:return up;case 36289:case 36303:case 36311:case 36292:return hp}}function fp(i,e){i.uniform1fv(this.addr,e)}function pp(i,e){const t=Ai(e,this.size,2);i.uniform2fv(this.addr,t)}function mp(i,e){const t=Ai(e,this.size,3);i.uniform3fv(this.addr,t)}function gp(i,e){const t=Ai(e,this.size,4);i.uniform4fv(this.addr,t)}function _p(i,e){const t=Ai(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function vp(i,e){const t=Ai(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xp(i,e){const t=Ai(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Mp(i,e){i.uniform1iv(this.addr,e)}function Sp(i,e){i.uniform2iv(this.addr,e)}function yp(i,e){i.uniform3iv(this.addr,e)}function Ep(i,e){i.uniform4iv(this.addr,e)}function wp(i,e){i.uniform1uiv(this.addr,e)}function bp(i,e){i.uniform2uiv(this.addr,e)}function Tp(i,e){i.uniform3uiv(this.addr,e)}function Ap(i,e){i.uniform4uiv(this.addr,e)}function Cp(i,e,t){const n=this.cache,r=e.length,s=Hr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Vc,s[a])}function Rp(i,e,t){const n=this.cache,r=e.length,s=Hr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||qc,s[a])}function Pp(i,e,t){const n=this.cache,r=e.length,s=Hr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Yc,s[a])}function Lp(i,e,t){const n=this.cache,r=e.length,s=Hr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Xc,s[a])}function Dp(i){switch(i){case 5126:return fp;case 35664:return pp;case 35665:return mp;case 35666:return gp;case 35674:return _p;case 35675:return vp;case 35676:return xp;case 5124:case 35670:return Mp;case 35667:case 35671:return Sp;case 35668:case 35672:return yp;case 35669:case 35673:return Ep;case 5125:return wp;case 36294:return bp;case 36295:return Tp;case 36296:return Ap;case 35678:case 36198:case 36298:case 36306:case 35682:return Cp;case 35679:case 36299:case 36307:return Rp;case 35680:case 36300:case 36308:case 36293:return Pp;case 36289:case 36303:case 36311:case 36292:return Lp}}class Ip{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dp(t.type)}}class Up{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dp(t.type)}}class Np{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ts=/(\w+)(\])?(\[|\.)?/g;function Do(i,e){i.seq.push(e),i.map[e.id]=e}function Fp(i,e,t){const n=i.name,r=n.length;for(Ts.lastIndex=0;;){const s=Ts.exec(n),a=Ts.lastIndex;let o=s[1];const c=s[2]==="]",u=s[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===r){Do(t,u===void 0?new Ip(o,i,e):new Up(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Np(o),Do(t,d)),t=d}}}class Tr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Fp(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Io(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Op=37297;let Bp=0;function zp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function kp(i){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(i);let n;switch(e===t?n="":e===Dr&&t===Lr?n="LinearDisplayP3ToLinearSRGB":e===Lr&&t===Dr&&(n="LinearSRGBToLinearDisplayP3"),i){case Pn:case kr:return[n,"LinearTransferOETF"];case Ot:case ea:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Uo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+zp(i.getShaderSource(e),a)}else return r}function Hp(i,e){const t=kp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Gp(i,e){let t;switch(e){case Zl:t="Linear";break;case jl:t="Reinhard";break;case Ql:t="OptimizedCineon";break;case vc:t="ACESFilmic";break;case tu:t="AgX";break;case nu:t="Neutral";break;case eu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Vp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zi).join(`
`)}function Wp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function zi(i){return i!==""}function No(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vs(i){return i.replace(qp,$p)}const Yp=new Map;function $p(i,e){let t=ke[e];if(t===void 0){const n=Yp.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Vs(t)}const Kp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oo(i){return i.replace(Kp,Jp)}function Jp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bo(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===gc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===El?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(e="SHADOWMAP_TYPE_VSM"),e}function jp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case _i:case vi:e="ENVMAP_TYPE_CUBE";break;case Br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vi:e="ENVMAP_MODE_REFRACTION";break}return e}function em(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case _c:e="ENVMAP_BLENDING_MULTIPLY";break;case Kl:e="ENVMAP_BLENDING_MIX";break;case Jl:e="ENVMAP_BLENDING_ADD";break}return e}function tm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function nm(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Zp(t),u=jp(t),h=Qp(t),d=em(t),p=tm(t),m=Vp(t),_=Wp(s),g=r.createProgram();let f,l,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(zi).join(`
`),f.length>0&&(f+=`
`),l=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(zi).join(`
`),l.length>0&&(l+=`
`)):(f=[Bo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zi).join(`
`),l=[Bo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?ke.tonemapping_pars_fragment:"",t.toneMapping!==wn?Gp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Hp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zi).join(`
`)),a=Vs(a),a=No(a,t),a=Fo(a,t),o=Vs(o),o=No(o,t),o=Fo(o,t),a=Oo(a),o=Oo(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,l=["#define varying in",t.glslVersion===Qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);const x=S+f+a,y=S+l+o,N=Io(r,r.VERTEX_SHADER,x),C=Io(r,r.FRAGMENT_SHADER,y);r.attachShader(g,N),r.attachShader(g,C),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function R(P){if(i.debug.checkShaderErrors){const q=r.getProgramInfoLog(g).trim(),B=r.getShaderInfoLog(N).trim(),K=r.getShaderInfoLog(C).trim();let j=!0,Y=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,N,C);else{const te=Uo(r,N,"vertex"),J=Uo(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+q+`
`+te+`
`+J)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(B===""||K==="")&&(Y=!1);Y&&(P.diagnostics={runnable:j,programLog:q,vertexShader:{log:B,prefix:f},fragmentShader:{log:K,prefix:l}})}r.deleteShader(N),r.deleteShader(C),D=new Tr(r,g),w=Xp(r,g)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(g,Op)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bp++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=N,this.fragmentShader=C,this}let im=0;class rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new sm(e),t.set(e,n)),n}}class sm{constructor(e){this.id=im++,this.code=e,this.usedTimes=0}}function am(i,e,t,n,r,s,a){const o=new ta,c=new rm,u=new Set,h=[],d=r.logarithmicDepthBuffer,p=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return u.add(w),w===0?"uv":`uv${w}`}function f(w,M,P,q,B){const K=q.fog,j=B.geometry,Y=w.isMeshStandardMaterial?q.environment:null,te=(w.isMeshStandardMaterial?t:e).get(w.envMap||Y),J=te&&te.mapping===Br?te.image.height:null,_e=_[w.type];w.precision!==null&&(m=r.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const Me=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ve=Me!==void 0?Me.length:0;let Ue=0;j.morphAttributes.position!==void 0&&(Ue=1),j.morphAttributes.normal!==void 0&&(Ue=2),j.morphAttributes.color!==void 0&&(Ue=3);let We,Z,ce,Se;if(_e){const nt=Jt[_e];We=nt.vertexShader,Z=nt.fragmentShader}else We=w.vertexShader,Z=w.fragmentShader,c.update(w),ce=c.getVertexShaderID(w),Se=c.getFragmentShaderID(w);const ue=i.getRenderTarget(),X=B.isInstancedMesh===!0,H=B.isBatchedMesh===!0,Q=!!w.map,T=!!w.matcap,G=!!te,$=!!w.aoMap,A=!!w.lightMap,U=!!w.bumpMap,z=!!w.normalMap,se=!!w.displacementMap,ae=!!w.emissiveMap,be=!!w.metalnessMap,b=!!w.roughnessMap,v=w.anisotropy>0,k=w.clearcoat>0,ie=w.dispersion>0,ne=w.iridescence>0,oe=w.sheen>0,Re=w.transmission>0,pe=v&&!!w.anisotropyMap,ge=k&&!!w.clearcoatMap,Be=k&&!!w.clearcoatNormalMap,le=k&&!!w.clearcoatRoughnessMap,Ae=ne&&!!w.iridescenceMap,Xe=ne&&!!w.iridescenceThicknessMap,Fe=oe&&!!w.sheenColorMap,xe=oe&&!!w.sheenRoughnessMap,Ge=!!w.specularMap,qe=!!w.specularColorMap,mt=!!w.specularIntensityMap,I=Re&&!!w.transmissionMap,ye=Re&&!!w.thicknessMap,ee=!!w.gradientMap,re=!!w.alphaMap,fe=w.alphaTest>0,Oe=!!w.alphaHash,Je=!!w.extensions;let gt=wn;w.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(gt=i.toneMapping);const St={shaderID:_e,shaderType:w.type,shaderName:w.name,vertexShader:We,fragmentShader:Z,defines:w.defines,customVertexShaderID:ce,customFragmentShaderID:Se,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:H,batchingColor:H&&B._colorsTexture!==null,instancing:X,instancingColor:X&&B.instanceColor!==null,instancingMorph:X&&B.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Pn,alphaToCoverage:!!w.alphaToCoverage,map:Q,matcap:T,envMap:G,envMapMode:G&&te.mapping,envMapCubeUVHeight:J,aoMap:$,lightMap:A,bumpMap:U,normalMap:z,displacementMap:p&&se,emissiveMap:ae,normalMapObjectSpace:z&&w.normalMapType===mu,normalMapTangentSpace:z&&w.normalMapType===Ac,metalnessMap:be,roughnessMap:b,anisotropy:v,anisotropyMap:pe,clearcoat:k,clearcoatMap:ge,clearcoatNormalMap:Be,clearcoatRoughnessMap:le,dispersion:ie,iridescence:ne,iridescenceMap:Ae,iridescenceThicknessMap:Xe,sheen:oe,sheenColorMap:Fe,sheenRoughnessMap:xe,specularMap:Ge,specularColorMap:qe,specularIntensityMap:mt,transmission:Re,transmissionMap:I,thicknessMap:ye,gradientMap:ee,opaque:w.transparent===!1&&w.blending===pi&&w.alphaToCoverage===!1,alphaMap:re,alphaTest:fe,alphaHash:Oe,combine:w.combine,mapUv:Q&&g(w.map.channel),aoMapUv:$&&g(w.aoMap.channel),lightMapUv:A&&g(w.lightMap.channel),bumpMapUv:U&&g(w.bumpMap.channel),normalMapUv:z&&g(w.normalMap.channel),displacementMapUv:se&&g(w.displacementMap.channel),emissiveMapUv:ae&&g(w.emissiveMap.channel),metalnessMapUv:be&&g(w.metalnessMap.channel),roughnessMapUv:b&&g(w.roughnessMap.channel),anisotropyMapUv:pe&&g(w.anisotropyMap.channel),clearcoatMapUv:ge&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:Be&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(w.sheenRoughnessMap.channel),specularMapUv:Ge&&g(w.specularMap.channel),specularColorMapUv:qe&&g(w.specularColorMap.channel),specularIntensityMapUv:mt&&g(w.specularIntensityMap.channel),transmissionMapUv:I&&g(w.transmissionMap.channel),thicknessMapUv:ye&&g(w.thicknessMap.channel),alphaMapUv:re&&g(w.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(z||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(Q||re),fog:!!K,useFog:w.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ue,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:gt,decodeVideoTexture:Q&&w.map.isVideoTexture===!0&&tt.getTransfer(w.map.colorSpace)===at,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Zt,flipSided:w.side===Pt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Je&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Je&&w.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return St.vertexUv1s=u.has(1),St.vertexUv2s=u.has(2),St.vertexUv3s=u.has(3),u.clear(),St}function l(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const P in w.defines)M.push(P),M.push(w.defines[P]);return w.isRawShaderMaterial===!1&&(S(M,w),x(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function S(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function x(w,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.doubleSided&&o.enable(10),M.flipSided&&o.enable(11),M.useDepthPacking&&o.enable(12),M.dithering&&o.enable(13),M.transmission&&o.enable(14),M.sheen&&o.enable(15),M.opaque&&o.enable(16),M.pointsUvs&&o.enable(17),M.decodeVideoTexture&&o.enable(18),M.alphaToCoverage&&o.enable(19),w.push(o.mask)}function y(w){const M=_[w.type];let P;if(M){const q=Jt[M];P=Vu.clone(q.uniforms)}else P=w.uniforms;return P}function N(w,M){let P;for(let q=0,B=h.length;q<B;q++){const K=h[q];if(K.cacheKey===M){P=K,++P.usedTimes;break}}return P===void 0&&(P=new nm(i,M,w,s),h.push(P)),P}function C(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function R(w){c.remove(w)}function D(){c.dispose()}return{getParameters:f,getProgramCacheKey:l,getUniforms:y,acquireProgram:N,releaseProgram:C,releaseShaderCache:R,programs:h,dispose:D}}function om(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function cm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function zo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ko(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,p,m,_,g,f){let l=i[e];return l===void 0?(l={id:d.id,object:d,geometry:p,material:m,groupOrder:_,renderOrder:d.renderOrder,z:g,group:f},i[e]=l):(l.id=d.id,l.object=d,l.geometry=p,l.material=m,l.groupOrder=_,l.renderOrder=d.renderOrder,l.z=g,l.group=f),e++,l}function o(d,p,m,_,g,f){const l=a(d,p,m,_,g,f);m.transmission>0?n.push(l):m.transparent===!0?r.push(l):t.push(l)}function c(d,p,m,_,g,f){const l=a(d,p,m,_,g,f);m.transmission>0?n.unshift(l):m.transparent===!0?r.unshift(l):t.unshift(l)}function u(d,p){t.length>1&&t.sort(d||cm),n.length>1&&n.sort(p||zo),r.length>1&&r.sort(p||zo)}function h(){for(let d=e,p=i.length;d<p;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:h,sort:u}}function lm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new ko,i.set(n,[a])):r>=s.length?(a=new ko,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function um(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ye};break;case"SpotLight":t={position:new L,direction:new L,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function hm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let dm=0;function fm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function pm(i){const e=new um,t=hm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new L);const r=new L,s=new rt,a=new rt;function o(u){let h=0,d=0,p=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,_=0,g=0,f=0,l=0,S=0,x=0,y=0,N=0,C=0,R=0;u.sort(fm);for(let w=0,M=u.length;w<M;w++){const P=u[w],q=P.color,B=P.intensity,K=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=q.r*B,d+=q.g*B,p+=q.b*B;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(P.sh.coefficients[Y],B);R++}else if(P.isDirectionalLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,J=t.get(P);J.shadowBias=te.bias,J.shadowNormalBias=te.normalBias,J.shadowRadius=te.radius,J.shadowMapSize=te.mapSize,n.directionalShadow[m]=J,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=P.shadow.matrix,S++}n.directional[m]=Y,m++}else if(P.isSpotLight){const Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(q).multiplyScalar(B),Y.distance=K,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,n.spot[g]=Y;const te=P.shadow;if(P.map&&(n.spotLightMap[N]=P.map,N++,te.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[g]=te.matrix,P.castShadow){const J=t.get(P);J.shadowBias=te.bias,J.shadowNormalBias=te.normalBias,J.shadowRadius=te.radius,J.shadowMapSize=te.mapSize,n.spotShadow[g]=J,n.spotShadowMap[g]=j,y++}g++}else if(P.isRectAreaLight){const Y=e.get(P);Y.color.copy(q).multiplyScalar(B),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),n.rectArea[f]=Y,f++}else if(P.isPointLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const te=P.shadow,J=t.get(P);J.shadowBias=te.bias,J.shadowNormalBias=te.normalBias,J.shadowRadius=te.radius,J.shadowMapSize=te.mapSize,J.shadowCameraNear=te.camera.near,J.shadowCameraFar=te.camera.far,n.pointShadow[_]=J,n.pointShadowMap[_]=j,n.pointShadowMatrix[_]=P.shadow.matrix,x++}n.point[_]=Y,_++}else if(P.isHemisphereLight){const Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(B),Y.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[l]=Y,l++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=p;const D=n.hash;(D.directionalLength!==m||D.pointLength!==_||D.spotLength!==g||D.rectAreaLength!==f||D.hemiLength!==l||D.numDirectionalShadows!==S||D.numPointShadows!==x||D.numSpotShadows!==y||D.numSpotMaps!==N||D.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=g,n.rectArea.length=f,n.point.length=_,n.hemi.length=l,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+N-C,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,D.directionalLength=m,D.pointLength=_,D.spotLength=g,D.rectAreaLength=f,D.hemiLength=l,D.numDirectionalShadows=S,D.numPointShadows=x,D.numSpotShadows=y,D.numSpotMaps=N,D.numLightProbes=R,n.version=dm++)}function c(u,h){let d=0,p=0,m=0,_=0,g=0;const f=h.matrixWorldInverse;for(let l=0,S=u.length;l<S;l++){const x=u[l];if(x.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),d++}else if(x.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),m++}else if(x.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(f),a.identity(),s.copy(x.matrixWorld),s.premultiply(f),a.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(f),p++}else if(x.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(f),g++}}}return{setup:o,setupView:c,state:n}}function Ho(i){const e=new pm(i),t=[],n=[];function r(h){u.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function mm(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ho(i),e.set(r,[o])):s>=a.length?(o=new Ho(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class gm extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _m extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Mm(i,e,t){let n=new na;const r=new de,s=new de,a=new lt,o=new gm({depthPacking:pu}),c=new _m,u={},h=t.maxTextureSize,d={[Tn]:Pt,[Pt]:Tn,[Zt]:Zt},p=new Cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:vm,fragmentShader:xm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new It;_.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ke(_,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gc;let l=this.type;this.render=function(C,R,D){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),q=i.state;q.setBlending(En),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const B=l!==ln&&this.type===ln,K=l===ln&&this.type!==ln;for(let j=0,Y=C.length;j<Y;j++){const te=C[j],J=te.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;r.copy(J.mapSize);const _e=J.getFrameExtents();if(r.multiply(_e),s.copy(J.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/_e.x),r.x=s.x*_e.x,J.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/_e.y),r.y=s.y*_e.y,J.mapSize.y=s.y)),J.map===null||B===!0||K===!0){const ve=this.type!==ln?{minFilter:Dt,magFilter:Dt}:{};J.map!==null&&J.map.dispose(),J.map=new Xn(r.x,r.y,ve),J.map.texture.name=te.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();const Me=J.getViewportCount();for(let ve=0;ve<Me;ve++){const Ue=J.getViewport(ve);a.set(s.x*Ue.x,s.y*Ue.y,s.x*Ue.z,s.y*Ue.w),q.viewport(a),J.updateMatrices(te,ve),n=J.getFrustum(),y(R,D,J.camera,te,this.type)}J.isPointLightShadow!==!0&&this.type===ln&&S(J,D),J.needsUpdate=!1}l=this.type,f.needsUpdate=!1,i.setRenderTarget(w,M,P)};function S(C,R){const D=e.update(g);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Xn(r.x,r.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(R,null,D,p,g,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(R,null,D,m,g,null)}function x(C,R,D,w){let M=null;const P=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)M=P;else if(M=D.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const q=M.uuid,B=R.uuid;let K=u[q];K===void 0&&(K={},u[q]=K);let j=K[B];j===void 0&&(j=M.clone(),K[B]=j,R.addEventListener("dispose",N)),M=j}if(M.visible=R.visible,M.wireframe=R.wireframe,w===ln?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const q=i.properties.get(M);q.light=D}return M}function y(C,R,D,w,M){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===ln)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const B=e.update(C),K=C.material;if(Array.isArray(K)){const j=B.groups;for(let Y=0,te=j.length;Y<te;Y++){const J=j[Y],_e=K[J.materialIndex];if(_e&&_e.visible){const Me=x(C,_e,w,M);C.onBeforeShadow(i,C,R,D,B,Me,J),i.renderBufferDirect(D,null,B,Me,C,J),C.onAfterShadow(i,C,R,D,B,Me,J)}}}else if(K.visible){const j=x(C,K,w,M);C.onBeforeShadow(i,C,R,D,B,j,null),i.renderBufferDirect(D,null,B,j,C,null),C.onAfterShadow(i,C,R,D,B,j,null)}}const q=C.children;for(let B=0,K=q.length;B<K;B++)y(q[B],R,D,w,M)}function N(C){C.target.removeEventListener("dispose",N);for(const D in u){const w=u[D],M=C.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}function Sm(i){function e(){let I=!1;const ye=new lt;let ee=null;const re=new lt(0,0,0,0);return{setMask:function(fe){ee!==fe&&!I&&(i.colorMask(fe,fe,fe,fe),ee=fe)},setLocked:function(fe){I=fe},setClear:function(fe,Oe,Je,gt,St){St===!0&&(fe*=gt,Oe*=gt,Je*=gt),ye.set(fe,Oe,Je,gt),re.equals(ye)===!1&&(i.clearColor(fe,Oe,Je,gt),re.copy(ye))},reset:function(){I=!1,ee=null,re.set(-1,0,0,0)}}}function t(){let I=!1,ye=null,ee=null,re=null;return{setTest:function(fe){fe?Se(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function(fe){ye!==fe&&!I&&(i.depthMask(fe),ye=fe)},setFunc:function(fe){if(ee!==fe){switch(fe){case Gl:i.depthFunc(i.NEVER);break;case Vl:i.depthFunc(i.ALWAYS);break;case Wl:i.depthFunc(i.LESS);break;case Cr:i.depthFunc(i.LEQUAL);break;case Xl:i.depthFunc(i.EQUAL);break;case ql:i.depthFunc(i.GEQUAL);break;case Yl:i.depthFunc(i.GREATER);break;case $l:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ee=fe}},setLocked:function(fe){I=fe},setClear:function(fe){re!==fe&&(i.clearDepth(fe),re=fe)},reset:function(){I=!1,ye=null,ee=null,re=null}}}function n(){let I=!1,ye=null,ee=null,re=null,fe=null,Oe=null,Je=null,gt=null,St=null;return{setTest:function(nt){I||(nt?Se(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(nt){ye!==nt&&!I&&(i.stencilMask(nt),ye=nt)},setFunc:function(nt,Yt,$t){(ee!==nt||re!==Yt||fe!==$t)&&(i.stencilFunc(nt,Yt,$t),ee=nt,re=Yt,fe=$t)},setOp:function(nt,Yt,$t){(Oe!==nt||Je!==Yt||gt!==$t)&&(i.stencilOp(nt,Yt,$t),Oe=nt,Je=Yt,gt=$t)},setLocked:function(nt){I=nt},setClear:function(nt){St!==nt&&(i.clearStencil(nt),St=nt)},reset:function(){I=!1,ye=null,ee=null,re=null,fe=null,Oe=null,Je=null,gt=null,St=null}}}const r=new e,s=new t,a=new n,o=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,p=[],m=null,_=!1,g=null,f=null,l=null,S=null,x=null,y=null,N=null,C=new Ye(0,0,0),R=0,D=!1,w=null,M=null,P=null,q=null,B=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,Y=0;const te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(te)[1]),j=Y>=1):te.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),j=Y>=2);let J=null,_e={};const Me=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),Ue=new lt().fromArray(Me),We=new lt().fromArray(ve);function Z(I,ye,ee,re){const fe=new Uint8Array(4),Oe=i.createTexture();i.bindTexture(I,Oe),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Je=0;Je<ee;Je++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,re,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ye+Je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return Oe}const ce={};ce[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),Se(i.DEPTH_TEST),s.setFunc(Cr),U(!1),z(Sa),Se(i.CULL_FACE),$(En);function Se(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function ue(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function X(I,ye){return h[I]!==ye?(i.bindFramebuffer(I,ye),h[I]=ye,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ye),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function H(I,ye){let ee=p,re=!1;if(I){ee=d.get(ye),ee===void 0&&(ee=[],d.set(ye,ee));const fe=I.textures;if(ee.length!==fe.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Oe=0,Je=fe.length;Oe<Je;Oe++)ee[Oe]=i.COLOR_ATTACHMENT0+Oe;ee.length=fe.length,re=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,re=!0);re&&i.drawBuffers(ee)}function Q(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const T={[Hn]:i.FUNC_ADD,[bl]:i.FUNC_SUBTRACT,[Tl]:i.FUNC_REVERSE_SUBTRACT};T[Al]=i.MIN,T[Cl]=i.MAX;const G={[Rl]:i.ZERO,[Pl]:i.ONE,[Ll]:i.SRC_COLOR,[Fs]:i.SRC_ALPHA,[Ol]:i.SRC_ALPHA_SATURATE,[Nl]:i.DST_COLOR,[Il]:i.DST_ALPHA,[Dl]:i.ONE_MINUS_SRC_COLOR,[Os]:i.ONE_MINUS_SRC_ALPHA,[Fl]:i.ONE_MINUS_DST_COLOR,[Ul]:i.ONE_MINUS_DST_ALPHA,[Bl]:i.CONSTANT_COLOR,[zl]:i.ONE_MINUS_CONSTANT_COLOR,[kl]:i.CONSTANT_ALPHA,[Hl]:i.ONE_MINUS_CONSTANT_ALPHA};function $(I,ye,ee,re,fe,Oe,Je,gt,St,nt){if(I===En){_===!0&&(ue(i.BLEND),_=!1);return}if(_===!1&&(Se(i.BLEND),_=!0),I!==wl){if(I!==g||nt!==D){if((f!==Hn||x!==Hn)&&(i.blendEquation(i.FUNC_ADD),f=Hn,x=Hn),nt)switch(I){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ya:i.blendFunc(i.ONE,i.ONE);break;case Ea:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ya:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ea:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}l=null,S=null,y=null,N=null,C.set(0,0,0),R=0,g=I,D=nt}return}fe=fe||ye,Oe=Oe||ee,Je=Je||re,(ye!==f||fe!==x)&&(i.blendEquationSeparate(T[ye],T[fe]),f=ye,x=fe),(ee!==l||re!==S||Oe!==y||Je!==N)&&(i.blendFuncSeparate(G[ee],G[re],G[Oe],G[Je]),l=ee,S=re,y=Oe,N=Je),(gt.equals(C)===!1||St!==R)&&(i.blendColor(gt.r,gt.g,gt.b,St),C.copy(gt),R=St),g=I,D=!1}function A(I,ye){I.side===Zt?ue(i.CULL_FACE):Se(i.CULL_FACE);let ee=I.side===Pt;ye&&(ee=!ee),U(ee),I.blending===pi&&I.transparent===!1?$(En):$(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const re=I.stencilWrite;a.setTest(re),re&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ae(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Se(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function U(I){w!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),w=I)}function z(I){I!==Sl?(Se(i.CULL_FACE),I!==M&&(I===Sa?i.cullFace(i.BACK):I===yl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),M=I}function se(I){I!==P&&(j&&i.lineWidth(I),P=I)}function ae(I,ye,ee){I?(Se(i.POLYGON_OFFSET_FILL),(q!==ye||B!==ee)&&(i.polygonOffset(ye,ee),q=ye,B=ee)):ue(i.POLYGON_OFFSET_FILL)}function be(I){I?Se(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function b(I){I===void 0&&(I=i.TEXTURE0+K-1),J!==I&&(i.activeTexture(I),J=I)}function v(I,ye,ee){ee===void 0&&(J===null?ee=i.TEXTURE0+K-1:ee=J);let re=_e[ee];re===void 0&&(re={type:void 0,texture:void 0},_e[ee]=re),(re.type!==I||re.texture!==ye)&&(J!==ee&&(i.activeTexture(ee),J=ee),i.bindTexture(I,ye||ce[I]),re.type=I,re.texture=ye)}function k(){const I=_e[J];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Be(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Xe(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Fe(I){Ue.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ue.copy(I))}function xe(I){We.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),We.copy(I))}function Ge(I,ye){let ee=c.get(ye);ee===void 0&&(ee=new WeakMap,c.set(ye,ee));let re=ee.get(I);re===void 0&&(re=i.getUniformBlockIndex(ye,I.name),ee.set(I,re))}function qe(I,ye){const re=c.get(ye).get(I);o.get(ye)!==re&&(i.uniformBlockBinding(ye,re,I.__bindingPointIndex),o.set(ye,re))}function mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},J=null,_e={},h={},d=new WeakMap,p=[],m=null,_=!1,g=null,f=null,l=null,S=null,x=null,y=null,N=null,C=new Ye(0,0,0),R=0,D=!1,w=null,M=null,P=null,q=null,B=null,Ue.set(0,0,i.canvas.width,i.canvas.height),We.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:Se,disable:ue,bindFramebuffer:X,drawBuffers:H,useProgram:Q,setBlending:$,setMaterial:A,setFlipSided:U,setCullFace:z,setLineWidth:se,setPolygonOffset:ae,setScissorTest:be,activeTexture:b,bindTexture:v,unbindTexture:k,compressedTexImage2D:ie,compressedTexImage3D:ne,texImage2D:Ae,texImage3D:Xe,updateUBOMapping:Ge,uniformBlockBinding:qe,texStorage2D:Be,texStorage3D:le,texSubImage2D:oe,texSubImage3D:Re,compressedTexSubImage2D:pe,compressedTexSubImage3D:ge,scissor:Fe,viewport:xe,reset:mt}}function ym(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new de,h=new WeakMap;let d;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,v){return m?new OffscreenCanvas(b,v):Ur("canvas")}function g(b,v,k){let ie=1;const ne=be(b);if((ne.width>k||ne.height>k)&&(ie=k/Math.max(ne.width,ne.height)),ie<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const oe=Math.floor(ie*ne.width),Re=Math.floor(ie*ne.height);d===void 0&&(d=_(oe,Re));const pe=v?_(oe,Re):d;return pe.width=oe,pe.height=Re,pe.getContext("2d").drawImage(b,0,0,oe,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+oe+"x"+Re+")."),pe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),b;return b}function f(b){return b.generateMipmaps&&b.minFilter!==Dt&&b.minFilter!==Wt}function l(b){i.generateMipmap(b)}function S(b,v,k,ie,ne=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let oe=v;if(v===i.RED&&(k===i.FLOAT&&(oe=i.R32F),k===i.HALF_FLOAT&&(oe=i.R16F),k===i.UNSIGNED_BYTE&&(oe=i.R8)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(oe=i.R8UI),k===i.UNSIGNED_SHORT&&(oe=i.R16UI),k===i.UNSIGNED_INT&&(oe=i.R32UI),k===i.BYTE&&(oe=i.R8I),k===i.SHORT&&(oe=i.R16I),k===i.INT&&(oe=i.R32I)),v===i.RG&&(k===i.FLOAT&&(oe=i.RG32F),k===i.HALF_FLOAT&&(oe=i.RG16F),k===i.UNSIGNED_BYTE&&(oe=i.RG8)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(oe=i.RG8UI),k===i.UNSIGNED_SHORT&&(oe=i.RG16UI),k===i.UNSIGNED_INT&&(oe=i.RG32UI),k===i.BYTE&&(oe=i.RG8I),k===i.SHORT&&(oe=i.RG16I),k===i.INT&&(oe=i.RG32I)),v===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(oe=i.RGB9_E5),v===i.RGBA){const Re=ne?Pr:tt.getTransfer(ie);k===i.FLOAT&&(oe=i.RGBA32F),k===i.HALF_FLOAT&&(oe=i.RGBA16F),k===i.UNSIGNED_BYTE&&(oe=Re===at?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(oe=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(oe=i.RGB5_A1)}return(oe===i.R16F||oe===i.R32F||oe===i.RG16F||oe===i.RG32F||oe===i.RGBA16F||oe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function x(b,v){let k;return b?v===null||v===xi||v===Mi?k=i.DEPTH24_STENCIL8:v===un?k=i.DEPTH32F_STENCIL8:v===Rr&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===xi||v===Mi?k=i.DEPTH_COMPONENT24:v===un?k=i.DEPTH_COMPONENT32F:v===Rr&&(k=i.DEPTH_COMPONENT16),k}function y(b,v){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Dt&&b.minFilter!==Wt?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function N(b){const v=b.target;v.removeEventListener("dispose",N),R(v),v.isVideoTexture&&h.delete(v)}function C(b){const v=b.target;v.removeEventListener("dispose",C),w(v)}function R(b){const v=n.get(b);if(v.__webglInit===void 0)return;const k=b.source,ie=p.get(k);if(ie){const ne=ie[v.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&D(b),Object.keys(ie).length===0&&p.delete(k)}n.remove(b)}function D(b){const v=n.get(b);i.deleteTexture(v.__webglTexture);const k=b.source,ie=p.get(k);delete ie[v.__cacheKey],a.memory.textures--}function w(b){const v=n.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(v.__webglFramebuffer[ie]))for(let ne=0;ne<v.__webglFramebuffer[ie].length;ne++)i.deleteFramebuffer(v.__webglFramebuffer[ie][ne]);else i.deleteFramebuffer(v.__webglFramebuffer[ie]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[ie])}else{if(Array.isArray(v.__webglFramebuffer))for(let ie=0;ie<v.__webglFramebuffer.length;ie++)i.deleteFramebuffer(v.__webglFramebuffer[ie]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let ie=0;ie<v.__webglColorRenderbuffer.length;ie++)v.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[ie]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=b.textures;for(let ie=0,ne=k.length;ie<ne;ie++){const oe=n.get(k[ie]);oe.__webglTexture&&(i.deleteTexture(oe.__webglTexture),a.memory.textures--),n.remove(k[ie])}n.remove(b)}let M=0;function P(){M=0}function q(){const b=M;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),M+=1,b}function B(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function K(b,v){const k=n.get(b);if(b.isVideoTexture&&se(b),b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){const ie=b.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{We(k,b,v);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function j(b,v){const k=n.get(b);if(b.version>0&&k.__version!==b.version){We(k,b,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function Y(b,v){const k=n.get(b);if(b.version>0&&k.__version!==b.version){We(k,b,v);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function te(b,v){const k=n.get(b);if(b.version>0&&k.__version!==b.version){Z(k,b,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}const J={[ks]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[Hs]:i.MIRRORED_REPEAT},_e={[Dt]:i.NEAREST,[iu]:i.NEAREST_MIPMAP_NEAREST,[ji]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[Kr]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},Me={[gu]:i.NEVER,[yu]:i.ALWAYS,[_u]:i.LESS,[Cc]:i.LEQUAL,[vu]:i.EQUAL,[Su]:i.GEQUAL,[xu]:i.GREATER,[Mu]:i.NOTEQUAL};function ve(b,v){if(v.type===un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Wt||v.magFilter===Kr||v.magFilter===ji||v.magFilter===Wn||v.minFilter===Wt||v.minFilter===Kr||v.minFilter===ji||v.minFilter===Wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,J[v.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,J[v.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,J[v.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,_e[v.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,_e[v.minFilter]),v.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Dt||v.minFilter!==ji&&v.minFilter!==Wn||v.type===un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ue(b,v){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",N));const ie=v.source;let ne=p.get(ie);ne===void 0&&(ne={},p.set(ie,ne));const oe=B(v);if(oe!==b.__cacheKey){ne[oe]===void 0&&(ne[oe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),ne[oe].usedTimes++;const Re=ne[b.__cacheKey];Re!==void 0&&(ne[b.__cacheKey].usedTimes--,Re.usedTimes===0&&D(v)),b.__cacheKey=oe,b.__webglTexture=ne[oe].texture}return k}function We(b,v,k){let ie=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ie=i.TEXTURE_3D);const ne=Ue(b,v),oe=v.source;t.bindTexture(ie,b.__webglTexture,i.TEXTURE0+k);const Re=n.get(oe);if(oe.version!==Re.__version||ne===!0){t.activeTexture(i.TEXTURE0+k);const pe=tt.getPrimaries(tt.workingColorSpace),ge=v.colorSpace===yn?null:tt.getPrimaries(v.colorSpace),Be=v.colorSpace===yn||pe===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);let le=g(v.image,!1,r.maxTextureSize);le=ae(v,le);const Ae=s.convert(v.format,v.colorSpace),Xe=s.convert(v.type);let Fe=S(v.internalFormat,Ae,Xe,v.colorSpace,v.isVideoTexture);ve(ie,v);let xe;const Ge=v.mipmaps,qe=v.isVideoTexture!==!0,mt=Re.__version===void 0||ne===!0,I=oe.dataReady,ye=y(v,le);if(v.isDepthTexture)Fe=x(v.format===Si,v.type),mt&&(qe?t.texStorage2D(i.TEXTURE_2D,1,Fe,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,Fe,le.width,le.height,0,Ae,Xe,null));else if(v.isDataTexture)if(Ge.length>0){qe&&mt&&t.texStorage2D(i.TEXTURE_2D,ye,Fe,Ge[0].width,Ge[0].height);for(let ee=0,re=Ge.length;ee<re;ee++)xe=Ge[ee],qe?I&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,xe.width,xe.height,Ae,Xe,xe.data):t.texImage2D(i.TEXTURE_2D,ee,Fe,xe.width,xe.height,0,Ae,Xe,xe.data);v.generateMipmaps=!1}else qe?(mt&&t.texStorage2D(i.TEXTURE_2D,ye,Fe,le.width,le.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le.width,le.height,Ae,Xe,le.data)):t.texImage2D(i.TEXTURE_2D,0,Fe,le.width,le.height,0,Ae,Xe,le.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){qe&&mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Fe,Ge[0].width,Ge[0].height,le.depth);for(let ee=0,re=Ge.length;ee<re;ee++)if(xe=Ge[ee],v.format!==Qt)if(Ae!==null)if(qe){if(I)if(v.layerUpdates.size>0){for(const fe of v.layerUpdates){const Oe=xe.width*xe.height;t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,fe,xe.width,xe.height,1,Ae,xe.data.slice(Oe*fe,Oe*(fe+1)),0,0)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,xe.width,xe.height,le.depth,Ae,xe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Fe,xe.width,xe.height,le.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,xe.width,xe.height,le.depth,Ae,Xe,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Fe,xe.width,xe.height,le.depth,0,Ae,Xe,xe.data)}else{qe&&mt&&t.texStorage2D(i.TEXTURE_2D,ye,Fe,Ge[0].width,Ge[0].height);for(let ee=0,re=Ge.length;ee<re;ee++)xe=Ge[ee],v.format!==Qt?Ae!==null?qe?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,xe.width,xe.height,Ae,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Fe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?I&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,xe.width,xe.height,Ae,Xe,xe.data):t.texImage2D(i.TEXTURE_2D,ee,Fe,xe.width,xe.height,0,Ae,Xe,xe.data)}else if(v.isDataArrayTexture)if(qe){if(mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Fe,le.width,le.height,le.depth),I)if(v.layerUpdates.size>0){let ee;switch(Xe){case i.UNSIGNED_BYTE:switch(Ae){case i.ALPHA:ee=1;break;case i.LUMINANCE:ee=1;break;case i.LUMINANCE_ALPHA:ee=2;break;case i.RGB:ee=3;break;case i.RGBA:ee=4;break;default:throw new Error(`Unknown texel size for format ${Ae}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:ee=1;break;default:throw new Error(`Unknown texel size for type ${Xe}.`)}const re=le.width*le.height*ee;for(const fe of v.layerUpdates)t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,le.width,le.height,1,Ae,Xe,le.data.slice(re*fe,re*(fe+1)));v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ae,Xe,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Fe,le.width,le.height,le.depth,0,Ae,Xe,le.data);else if(v.isData3DTexture)qe?(mt&&t.texStorage3D(i.TEXTURE_3D,ye,Fe,le.width,le.height,le.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ae,Xe,le.data)):t.texImage3D(i.TEXTURE_3D,0,Fe,le.width,le.height,le.depth,0,Ae,Xe,le.data);else if(v.isFramebufferTexture){if(mt)if(qe)t.texStorage2D(i.TEXTURE_2D,ye,Fe,le.width,le.height);else{let ee=le.width,re=le.height;for(let fe=0;fe<ye;fe++)t.texImage2D(i.TEXTURE_2D,fe,Fe,ee,re,0,Ae,Xe,null),ee>>=1,re>>=1}}else if(Ge.length>0){if(qe&&mt){const ee=be(Ge[0]);t.texStorage2D(i.TEXTURE_2D,ye,Fe,ee.width,ee.height)}for(let ee=0,re=Ge.length;ee<re;ee++)xe=Ge[ee],qe?I&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ae,Xe,xe):t.texImage2D(i.TEXTURE_2D,ee,Fe,Ae,Xe,xe);v.generateMipmaps=!1}else if(qe){if(mt){const ee=be(le);t.texStorage2D(i.TEXTURE_2D,ye,Fe,ee.width,ee.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,Xe,le)}else t.texImage2D(i.TEXTURE_2D,0,Fe,Ae,Xe,le);f(v)&&l(ie),Re.__version=oe.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Z(b,v,k){if(v.image.length!==6)return;const ie=Ue(b,v),ne=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+k);const oe=n.get(ne);if(ne.version!==oe.__version||ie===!0){t.activeTexture(i.TEXTURE0+k);const Re=tt.getPrimaries(tt.workingColorSpace),pe=v.colorSpace===yn?null:tt.getPrimaries(v.colorSpace),ge=v.colorSpace===yn||Re===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Be=v.isCompressedTexture||v.image[0].isCompressedTexture,le=v.image[0]&&v.image[0].isDataTexture,Ae=[];for(let re=0;re<6;re++)!Be&&!le?Ae[re]=g(v.image[re],!0,r.maxCubemapSize):Ae[re]=le?v.image[re].image:v.image[re],Ae[re]=ae(v,Ae[re]);const Xe=Ae[0],Fe=s.convert(v.format,v.colorSpace),xe=s.convert(v.type),Ge=S(v.internalFormat,Fe,xe,v.colorSpace),qe=v.isVideoTexture!==!0,mt=oe.__version===void 0||ie===!0,I=ne.dataReady;let ye=y(v,Xe);ve(i.TEXTURE_CUBE_MAP,v);let ee;if(Be){qe&&mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ge,Xe.width,Xe.height);for(let re=0;re<6;re++){ee=Ae[re].mipmaps;for(let fe=0;fe<ee.length;fe++){const Oe=ee[fe];v.format!==Qt?Fe!==null?qe?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,0,0,Oe.width,Oe.height,Fe,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,Ge,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,0,0,Oe.width,Oe.height,Fe,xe,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,Ge,Oe.width,Oe.height,0,Fe,xe,Oe.data)}}}else{if(ee=v.mipmaps,qe&&mt){ee.length>0&&ye++;const re=be(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ge,re.width,re.height)}for(let re=0;re<6;re++)if(le){qe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ae[re].width,Ae[re].height,Fe,xe,Ae[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,Ae[re].width,Ae[re].height,0,Fe,xe,Ae[re].data);for(let fe=0;fe<ee.length;fe++){const Je=ee[fe].image[re].image;qe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,0,0,Je.width,Je.height,Fe,xe,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,Ge,Je.width,Je.height,0,Fe,xe,Je.data)}}else{qe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Fe,xe,Ae[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,Fe,xe,Ae[re]);for(let fe=0;fe<ee.length;fe++){const Oe=ee[fe];qe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,0,0,Fe,xe,Oe.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,Ge,Fe,xe,Oe.image[re])}}}f(v)&&l(i.TEXTURE_CUBE_MAP),oe.__version=ne.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function ce(b,v,k,ie,ne,oe){const Re=s.convert(k.format,k.colorSpace),pe=s.convert(k.type),ge=S(k.internalFormat,Re,pe,k.colorSpace);if(!n.get(v).__hasExternalTextures){const le=Math.max(1,v.width>>oe),Ae=Math.max(1,v.height>>oe);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,oe,ge,le,Ae,v.depth,0,Re,pe,null):t.texImage2D(ne,oe,ge,le,Ae,0,Re,pe,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),z(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,ne,n.get(k).__webglTexture,0,U(v)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,ne,n.get(k).__webglTexture,oe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(b,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,b),v.depthBuffer){const ie=v.depthTexture,ne=ie&&ie.isDepthTexture?ie.type:null,oe=x(v.stencilBuffer,ne),Re=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=U(v);z(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe,oe,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,oe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,oe,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,b)}else{const ie=v.textures;for(let ne=0;ne<ie.length;ne++){const oe=ie[ne],Re=s.convert(oe.format,oe.colorSpace),pe=s.convert(oe.type),ge=S(oe.internalFormat,Re,pe,oe.colorSpace),Be=U(v);k&&z(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,ge,v.width,v.height):z(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Be,ge,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ge,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const ie=n.get(v.depthTexture).__webglTexture,ne=U(v);if(v.depthTexture.format===mi)z(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(v.depthTexture.format===Si)z(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function X(b){const v=n.get(b),k=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");ue(v.__webglFramebuffer,b)}else if(k){v.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ie]),v.__webglDepthbuffer[ie]=i.createRenderbuffer(),Se(v.__webglDepthbuffer[ie],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Se(v.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function H(b,v,k){const ie=n.get(b);v!==void 0&&ce(ie.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&X(b)}function Q(b){const v=b.texture,k=n.get(b),ie=n.get(v);b.addEventListener("dispose",C);const ne=b.textures,oe=b.isWebGLCubeRenderTarget===!0,Re=ne.length>1;if(Re||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=v.version,a.memory.textures++),oe){k.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[pe]=[];for(let ge=0;ge<v.mipmaps.length;ge++)k.__webglFramebuffer[pe][ge]=i.createFramebuffer()}else k.__webglFramebuffer[pe]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let pe=0;pe<v.mipmaps.length;pe++)k.__webglFramebuffer[pe]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Re)for(let pe=0,ge=ne.length;pe<ge;pe++){const Be=n.get(ne[pe]);Be.__webglTexture===void 0&&(Be.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&z(b)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let pe=0;pe<ne.length;pe++){const ge=ne[pe];k.__webglColorRenderbuffer[pe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[pe]);const Be=s.convert(ge.format,ge.colorSpace),le=s.convert(ge.type),Ae=S(ge.internalFormat,Be,le,ge.colorSpace,b.isXRRenderTarget===!0),Xe=U(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe,Ae,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,k.__webglColorRenderbuffer[pe])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Se(k.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),ve(i.TEXTURE_CUBE_MAP,v);for(let pe=0;pe<6;pe++)if(v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)ce(k.__webglFramebuffer[pe][ge],b,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ge);else ce(k.__webglFramebuffer[pe],b,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);f(v)&&l(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let pe=0,ge=ne.length;pe<ge;pe++){const Be=ne[pe],le=n.get(Be);t.bindTexture(i.TEXTURE_2D,le.__webglTexture),ve(i.TEXTURE_2D,Be),ce(k.__webglFramebuffer,b,Be,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,0),f(Be)&&l(i.TEXTURE_2D)}t.unbindTexture()}else{let pe=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(pe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(pe,ie.__webglTexture),ve(pe,v),v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)ce(k.__webglFramebuffer[ge],b,v,i.COLOR_ATTACHMENT0,pe,ge);else ce(k.__webglFramebuffer,b,v,i.COLOR_ATTACHMENT0,pe,0);f(v)&&l(pe),t.unbindTexture()}b.depthBuffer&&X(b)}function T(b){const v=b.textures;for(let k=0,ie=v.length;k<ie;k++){const ne=v[k];if(f(ne)){const oe=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Re=n.get(ne).__webglTexture;t.bindTexture(oe,Re),l(oe),t.unbindTexture()}}}const G=[],$=[];function A(b){if(b.samples>0){if(z(b)===!1){const v=b.textures,k=b.width,ie=b.height;let ne=i.COLOR_BUFFER_BIT;const oe=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(b),pe=v.length>1;if(pe)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),pe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[ge]);const Be=n.get(v[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Be,0)}i.blitFramebuffer(0,0,k,ie,0,0,k,ie,ne,i.NEAREST),c===!0&&(G.length=0,$.length=0,G.push(i.COLOR_ATTACHMENT0+ge),b.depthBuffer&&b.resolveDepthBuffer===!1&&(G.push(oe),$.push(oe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,$)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,G))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pe)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,Re.__webglColorRenderbuffer[ge]);const Be=n.get(v[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const v=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function U(b){return Math.min(r.maxSamples,b.samples)}function z(b){const v=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function se(b){const v=a.render.frame;h.get(b)!==v&&(h.set(b,v),b.update())}function ae(b,v){const k=b.colorSpace,ie=b.format,ne=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||k!==Pn&&k!==yn&&(tt.getTransfer(k)===at?(ie!==Qt||ne!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}function be(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(u.width=b.naturalWidth||b.width,u.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(u.width=b.displayWidth,u.height=b.displayHeight):(u.width=b.width,u.height=b.height),u}this.allocateTextureUnit=q,this.resetTextureUnits=P,this.setTexture2D=K,this.setTexture2DArray=j,this.setTexture3D=Y,this.setTextureCube=te,this.rebindTextures=H,this.setupRenderTarget=Q,this.updateRenderTargetMipmap=T,this.updateMultisampleRenderTarget=A,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=z}function Em(i,e){function t(n,r=yn){let s;const a=tt.getTransfer(r);if(n===An)return i.UNSIGNED_BYTE;if(n===Sc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===au)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ru)return i.BYTE;if(n===su)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===Mc)return i.INT;if(n===xi)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===zr)return i.HALF_FLOAT;if(n===ou)return i.ALPHA;if(n===cu)return i.RGB;if(n===Qt)return i.RGBA;if(n===lu)return i.LUMINANCE;if(n===uu)return i.LUMINANCE_ALPHA;if(n===mi)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===Ec)return i.RED;if(n===wc)return i.RED_INTEGER;if(n===hu)return i.RG;if(n===bc)return i.RG_INTEGER;if(n===Tc)return i.RGBA_INTEGER;if(n===Jr||n===Zr||n===jr||n===Qr)if(a===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Jr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Jr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ba||n===Ta||n===Aa||n===Ca)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ba)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ta)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Aa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ca)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ra||n===Pa||n===La)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ra||n===Pa)return a===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===La)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===Ba||n===za||n===ka||n===Ha||n===Ga||n===Va||n===Wa||n===Xa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Da)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ia)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ua)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Na)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fa)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oa)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===za)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ka)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ha)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Va)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wa)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xa)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===es||n===qa||n===Ya)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===es)return a===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ya)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===du||n===$a||n===Ka||n===Ja)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===es)return s.COMPRESSED_RED_RGTC1_EXT;if(n===$a)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ka)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ja)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class wm extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qe extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bm={type:"move"};class As{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const g of e.hand.values()){const f=t.getJointPose(g,n),l=this._getHandJoint(u,g);f!==null&&(l.matrix.fromArray(f.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,l.jointRadius=f.radius),l.visible=f!==null}const h=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],p=h.position.distanceTo(d.position),m=.02,_=.005;u.inputState.pinching&&p>m+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&p<=m-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bm)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Tm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Am=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Cm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new At,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Cn({vertexShader:Tm,fragmentShader:Am,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new Rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class Rm extends bi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,u=null,h=null,d=null,p=null,m=null,_=null;const g=new Cm,f=t.getContextAttributes();let l=null,S=null;const x=[],y=[],N=new de;let C=null;const R=new Bt;R.layers.enable(1),R.viewport=new lt;const D=new Bt;D.layers.enable(2),D.viewport=new lt;const w=[R,D],M=new wm;M.layers.enable(1),M.layers.enable(2);let P=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ce=x[Z];return ce===void 0&&(ce=new As,x[Z]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(Z){let ce=x[Z];return ce===void 0&&(ce=new As,x[Z]=ce),ce.getGripSpace()},this.getHand=function(Z){let ce=x[Z];return ce===void 0&&(ce=new As,x[Z]=ce),ce.getHandSpace()};function B(Z){const ce=y.indexOf(Z.inputSource);if(ce===-1)return;const Se=x[ce];Se!==void 0&&(Se.update(Z.inputSource,Z.frame,u||a),Se.dispatchEvent({type:Z.type,data:Z.inputSource}))}function K(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",j);for(let Z=0;Z<x.length;Z++){const ce=y[Z];ce!==null&&(y[Z]=null,x[Z].disconnect(ce))}P=null,q=null,g.reset(),e.setRenderTarget(l),m=null,p=null,d=null,r=null,S=null,We.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(Z){u=Z},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(l=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",K),r.addEventListener("inputsourceschange",j),f.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(N),r.renderState.layers===void 0){const ce={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ce),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Xn(m.framebufferWidth,m.framebufferHeight,{format:Qt,type:An,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let ce=null,Se=null,ue=null;f.depth&&(ue=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=f.stencil?Si:mi,Se=f.stencil?Mi:xi);const X={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:s};d=new XRWebGLBinding(r,t),p=d.createProjectionLayer(X),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),S=new Xn(p.textureWidth,p.textureHeight,{format:Qt,type:An,depthTexture:new Gc(p.textureWidth,p.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await r.requestReferenceSpace(o),We.setContext(r),We.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function j(Z){for(let ce=0;ce<Z.removed.length;ce++){const Se=Z.removed[ce],ue=y.indexOf(Se);ue>=0&&(y[ue]=null,x[ue].disconnect(Se))}for(let ce=0;ce<Z.added.length;ce++){const Se=Z.added[ce];let ue=y.indexOf(Se);if(ue===-1){for(let H=0;H<x.length;H++)if(H>=y.length){y.push(Se),ue=H;break}else if(y[H]===null){y[H]=Se,ue=H;break}if(ue===-1)break}const X=x[ue];X&&X.connect(Se)}}const Y=new L,te=new L;function J(Z,ce,Se){Y.setFromMatrixPosition(ce.matrixWorld),te.setFromMatrixPosition(Se.matrixWorld);const ue=Y.distanceTo(te),X=ce.projectionMatrix.elements,H=Se.projectionMatrix.elements,Q=X[14]/(X[10]-1),T=X[14]/(X[10]+1),G=(X[9]+1)/X[5],$=(X[9]-1)/X[5],A=(X[8]-1)/X[0],U=(H[8]+1)/H[0],z=Q*A,se=Q*U,ae=ue/(-A+U),be=ae*-A;ce.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(be),Z.translateZ(ae),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert();const b=Q+ae,v=T+ae,k=z-be,ie=se+(ue-be),ne=G*T/v*b,oe=$*T/v*b;Z.projectionMatrix.makePerspective(k,ie,ne,oe,b,v),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}function _e(Z,ce){ce===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ce.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;g.texture!==null&&(Z.near=g.depthNear,Z.far=g.depthFar),M.near=D.near=R.near=Z.near,M.far=D.far=R.far=Z.far,(P!==M.near||q!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,q=M.far,R.near=P,R.far=q,D.near=P,D.far=q,R.updateProjectionMatrix(),D.updateProjectionMatrix(),Z.updateProjectionMatrix());const ce=Z.parent,Se=M.cameras;_e(M,ce);for(let ue=0;ue<Se.length;ue++)_e(Se[ue],ce);Se.length===2?J(M,R,D):M.projectionMatrix.copy(R.projectionMatrix),Me(Z,M,ce)};function Me(Z,ce,Se){Se===null?Z.matrix.copy(ce.matrixWorld):(Z.matrix.copy(Se.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ce.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ce.projectionMatrix),Z.projectionMatrixInverse.copy(ce.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Gs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(Z){c=Z,p!==null&&(p.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let ve=null;function Ue(Z,ce){if(h=ce.getViewerPose(u||a),_=ce,h!==null){const Se=h.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let ue=!1;Se.length!==M.cameras.length&&(M.cameras.length=0,ue=!0);for(let H=0;H<Se.length;H++){const Q=Se[H];let T=null;if(m!==null)T=m.getViewport(Q);else{const $=d.getViewSubImage(p,Q);T=$.viewport,H===0&&(e.setRenderTargetTextures(S,$.colorTexture,p.ignoreDepthValues?void 0:$.depthStencilTexture),e.setRenderTarget(S))}let G=w[H];G===void 0&&(G=new Bt,G.layers.enable(H),G.viewport=new lt,w[H]=G),G.matrix.fromArray(Q.transform.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale),G.projectionMatrix.fromArray(Q.projectionMatrix),G.projectionMatrixInverse.copy(G.projectionMatrix).invert(),G.viewport.set(T.x,T.y,T.width,T.height),H===0&&(M.matrix.copy(G.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ue===!0&&M.cameras.push(G)}const X=r.enabledFeatures;if(X&&X.includes("depth-sensing")){const H=d.getDepthInformation(Se[0]);H&&H.isValid&&H.texture&&g.init(e,H,r.renderState)}}for(let Se=0;Se<x.length;Se++){const ue=y[Se],X=x[Se];ue!==null&&X!==void 0&&X.update(ue,ce,u||a)}ve&&ve(Z,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}const We=new kc;We.setAnimationLoop(Ue),this.setAnimationLoop=function(Z){ve=Z},this.dispose=function(){}}}const Bn=new en,Pm=new rt;function Lm(i,e){function t(f,l){f.matrixAutoUpdate===!0&&f.updateMatrix(),l.value.copy(f.matrix)}function n(f,l){l.color.getRGB(f.fogColor.value,Oc(i)),l.isFog?(f.fogNear.value=l.near,f.fogFar.value=l.far):l.isFogExp2&&(f.fogDensity.value=l.density)}function r(f,l,S,x,y){l.isMeshBasicMaterial||l.isMeshLambertMaterial?s(f,l):l.isMeshToonMaterial?(s(f,l),d(f,l)):l.isMeshPhongMaterial?(s(f,l),h(f,l)):l.isMeshStandardMaterial?(s(f,l),p(f,l),l.isMeshPhysicalMaterial&&m(f,l,y)):l.isMeshMatcapMaterial?(s(f,l),_(f,l)):l.isMeshDepthMaterial?s(f,l):l.isMeshDistanceMaterial?(s(f,l),g(f,l)):l.isMeshNormalMaterial?s(f,l):l.isLineBasicMaterial?(a(f,l),l.isLineDashedMaterial&&o(f,l)):l.isPointsMaterial?c(f,l,S,x):l.isSpriteMaterial?u(f,l):l.isShadowMaterial?(f.color.value.copy(l.color),f.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function s(f,l){f.opacity.value=l.opacity,l.color&&f.diffuse.value.copy(l.color),l.emissive&&f.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(f.map.value=l.map,t(l.map,f.mapTransform)),l.alphaMap&&(f.alphaMap.value=l.alphaMap,t(l.alphaMap,f.alphaMapTransform)),l.bumpMap&&(f.bumpMap.value=l.bumpMap,t(l.bumpMap,f.bumpMapTransform),f.bumpScale.value=l.bumpScale,l.side===Pt&&(f.bumpScale.value*=-1)),l.normalMap&&(f.normalMap.value=l.normalMap,t(l.normalMap,f.normalMapTransform),f.normalScale.value.copy(l.normalScale),l.side===Pt&&f.normalScale.value.negate()),l.displacementMap&&(f.displacementMap.value=l.displacementMap,t(l.displacementMap,f.displacementMapTransform),f.displacementScale.value=l.displacementScale,f.displacementBias.value=l.displacementBias),l.emissiveMap&&(f.emissiveMap.value=l.emissiveMap,t(l.emissiveMap,f.emissiveMapTransform)),l.specularMap&&(f.specularMap.value=l.specularMap,t(l.specularMap,f.specularMapTransform)),l.alphaTest>0&&(f.alphaTest.value=l.alphaTest);const S=e.get(l),x=S.envMap,y=S.envMapRotation;x&&(f.envMap.value=x,Bn.copy(y),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),f.envMapRotation.value.setFromMatrix4(Pm.makeRotationFromEuler(Bn)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=l.reflectivity,f.ior.value=l.ior,f.refractionRatio.value=l.refractionRatio),l.lightMap&&(f.lightMap.value=l.lightMap,f.lightMapIntensity.value=l.lightMapIntensity,t(l.lightMap,f.lightMapTransform)),l.aoMap&&(f.aoMap.value=l.aoMap,f.aoMapIntensity.value=l.aoMapIntensity,t(l.aoMap,f.aoMapTransform))}function a(f,l){f.diffuse.value.copy(l.color),f.opacity.value=l.opacity,l.map&&(f.map.value=l.map,t(l.map,f.mapTransform))}function o(f,l){f.dashSize.value=l.dashSize,f.totalSize.value=l.dashSize+l.gapSize,f.scale.value=l.scale}function c(f,l,S,x){f.diffuse.value.copy(l.color),f.opacity.value=l.opacity,f.size.value=l.size*S,f.scale.value=x*.5,l.map&&(f.map.value=l.map,t(l.map,f.uvTransform)),l.alphaMap&&(f.alphaMap.value=l.alphaMap,t(l.alphaMap,f.alphaMapTransform)),l.alphaTest>0&&(f.alphaTest.value=l.alphaTest)}function u(f,l){f.diffuse.value.copy(l.color),f.opacity.value=l.opacity,f.rotation.value=l.rotation,l.map&&(f.map.value=l.map,t(l.map,f.mapTransform)),l.alphaMap&&(f.alphaMap.value=l.alphaMap,t(l.alphaMap,f.alphaMapTransform)),l.alphaTest>0&&(f.alphaTest.value=l.alphaTest)}function h(f,l){f.specular.value.copy(l.specular),f.shininess.value=Math.max(l.shininess,1e-4)}function d(f,l){l.gradientMap&&(f.gradientMap.value=l.gradientMap)}function p(f,l){f.metalness.value=l.metalness,l.metalnessMap&&(f.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,f.metalnessMapTransform)),f.roughness.value=l.roughness,l.roughnessMap&&(f.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,f.roughnessMapTransform)),l.envMap&&(f.envMapIntensity.value=l.envMapIntensity)}function m(f,l,S){f.ior.value=l.ior,l.sheen>0&&(f.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),f.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(f.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,f.sheenColorMapTransform)),l.sheenRoughnessMap&&(f.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,f.sheenRoughnessMapTransform))),l.clearcoat>0&&(f.clearcoat.value=l.clearcoat,f.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(f.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,f.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(f.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===Pt&&f.clearcoatNormalScale.value.negate())),l.dispersion>0&&(f.dispersion.value=l.dispersion),l.iridescence>0&&(f.iridescence.value=l.iridescence,f.iridescenceIOR.value=l.iridescenceIOR,f.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(f.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,f.iridescenceMapTransform)),l.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),l.transmission>0&&(f.transmission.value=l.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),l.transmissionMap&&(f.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,f.transmissionMapTransform)),f.thickness.value=l.thickness,l.thicknessMap&&(f.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=l.attenuationDistance,f.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(f.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(f.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=l.specularIntensity,f.specularColor.value.copy(l.specularColor),l.specularColorMap&&(f.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,f.specularColorMapTransform)),l.specularIntensityMap&&(f.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,l){l.matcap&&(f.matcap.value=l.matcap)}function g(f,l){const S=e.get(l).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Dm(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,x){const y=x.program;n.uniformBlockBinding(S,y)}function u(S,x){let y=r[S.id];y===void 0&&(_(S),y=h(S),r[S.id]=y,S.addEventListener("dispose",f));const N=x.program;n.updateUBOMapping(S,N);const C=e.render.frame;s[S.id]!==C&&(p(S),s[S.id]=C)}function h(S){const x=d();S.__bindingPointIndex=x;const y=i.createBuffer(),N=S.__size,C=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,N,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,y),y}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const x=r[S.id],y=S.uniforms,N=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let C=0,R=y.length;C<R;C++){const D=Array.isArray(y[C])?y[C]:[y[C]];for(let w=0,M=D.length;w<M;w++){const P=D[w];if(m(P,C,w,N)===!0){const q=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let K=0;for(let j=0;j<B.length;j++){const Y=B[j],te=g(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,q+K,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,K),K+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,q,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,x,y,N){const C=S.value,R=x+"_"+y;if(N[R]===void 0)return typeof C=="number"||typeof C=="boolean"?N[R]=C:N[R]=C.clone(),!0;{const D=N[R];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return N[R]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function _(S){const x=S.uniforms;let y=0;const N=16;for(let R=0,D=x.length;R<D;R++){const w=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,P=w.length;M<P;M++){const q=w[M],B=Array.isArray(q.value)?q.value:[q.value];for(let K=0,j=B.length;K<j;K++){const Y=B[K],te=g(Y),J=y%N;J!==0&&N-J<te.boundary&&(y+=N-J),q.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=y,y+=te.storage}}}const C=y%N;return C>0&&(y+=N-C),S.__size=y,S.__cache={},this}function g(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function f(S){const x=S.target;x.removeEventListener("dispose",f);const y=a.indexOf(x.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function l(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:u,dispose:l}}class Im{constructor(e={}){const{canvas:t=wu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,f=null;const l=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this.toneMapping=wn,this.toneMappingExposure=1;const x=this;let y=!1,N=0,C=0,R=null,D=-1,w=null;const M=new lt,P=new lt;let q=null;const B=new Ye(0);let K=0,j=t.width,Y=t.height,te=1,J=null,_e=null;const Me=new lt(0,0,j,Y),ve=new lt(0,0,j,Y);let Ue=!1;const We=new na;let Z=!1,ce=!1;const Se=new rt,ue=new L,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let H=!1;function Q(){return R===null?te:1}let T=n;function G(E,F){return t.getContext(E,F)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Qs}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",ee,!1),t.addEventListener("webglcontextcreationerror",re,!1),T===null){const F="webgl2";if(T=G(F,E),T===null)throw G(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let $,A,U,z,se,ae,be,b,v,k,ie,ne,oe,Re,pe,ge,Be,le,Ae,Xe,Fe,xe,Ge,qe;function mt(){$=new Hf(T),$.init(),xe=new Em(T,$),A=new Nf(T,$,e,xe),U=new Sm(T),z=new Wf(T),se=new om,ae=new ym(T,$,U,se,A,xe,z),be=new Of(x),b=new kf(x),v=new Ju(T),Ge=new If(T,v),k=new Gf(T,v,z,Ge),ie=new qf(T,k,v,z),Ae=new Xf(T,A,ae),ge=new Ff(se),ne=new am(x,be,b,$,A,Ge,ge),oe=new Lm(x,se),Re=new lm,pe=new mm($),le=new Df(x,be,b,U,ie,p,c),Be=new Mm(x,ie,A),qe=new Dm(T,z,A,U),Xe=new Uf(T,$,z),Fe=new Vf(T,$,z),z.programs=ne.programs,x.capabilities=A,x.extensions=$,x.properties=se,x.renderLists=Re,x.shadowMap=Be,x.state=U,x.info=z}mt();const I=new Rm(x,T);this.xr=I,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const E=$.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=$.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(E){E!==void 0&&(te=E,this.setSize(j,Y,!1))},this.getSize=function(E){return E.set(j,Y)},this.setSize=function(E,F,V=!0){if(I.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=E,Y=F,t.width=Math.floor(E*te),t.height=Math.floor(F*te),V===!0&&(t.style.width=E+"px",t.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(j*te,Y*te).floor()},this.setDrawingBufferSize=function(E,F,V){j=E,Y=F,te=V,t.width=Math.floor(E*V),t.height=Math.floor(F*V),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(Me)},this.setViewport=function(E,F,V,W){E.isVector4?Me.set(E.x,E.y,E.z,E.w):Me.set(E,F,V,W),U.viewport(M.copy(Me).multiplyScalar(te).round())},this.getScissor=function(E){return E.copy(ve)},this.setScissor=function(E,F,V,W){E.isVector4?ve.set(E.x,E.y,E.z,E.w):ve.set(E,F,V,W),U.scissor(P.copy(ve).multiplyScalar(te).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(E){U.setScissorTest(Ue=E)},this.setOpaqueSort=function(E){J=E},this.setTransparentSort=function(E){_e=E},this.getClearColor=function(E){return E.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor.apply(le,arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha.apply(le,arguments)},this.clear=function(E=!0,F=!0,V=!0){let W=0;if(E){let O=!1;if(R!==null){const he=R.texture.format;O=he===Tc||he===bc||he===wc}if(O){const he=R.texture.type,Ee=he===An||he===xi||he===Rr||he===Mi||he===Sc||he===yc,Te=le.getClearColor(),Ce=le.getClearAlpha(),Ie=Te.r,Ne=Te.g,De=Te.b;Ee?(m[0]=Ie,m[1]=Ne,m[2]=De,m[3]=Ce,T.clearBufferuiv(T.COLOR,0,m)):(_[0]=Ie,_[1]=Ne,_[2]=De,_[3]=Ce,T.clearBufferiv(T.COLOR,0,_))}else W|=T.COLOR_BUFFER_BIT}F&&(W|=T.DEPTH_BUFFER_BIT),V&&(W|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",ee,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Re.dispose(),pe.dispose(),se.dispose(),be.dispose(),b.dispose(),ie.dispose(),Ge.dispose(),qe.dispose(),ne.dispose(),I.dispose(),I.removeEventListener("sessionstart",Yt),I.removeEventListener("sessionend",$t),Ln.stop()};function ye(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function ee(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const E=z.autoReset,F=Be.enabled,V=Be.autoUpdate,W=Be.needsUpdate,O=Be.type;mt(),z.autoReset=E,Be.enabled=F,Be.autoUpdate=V,Be.needsUpdate=W,Be.type=O}function re(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function fe(E){const F=E.target;F.removeEventListener("dispose",fe),Oe(F)}function Oe(E){Je(E),se.remove(E)}function Je(E){const F=se.get(E).programs;F!==void 0&&(F.forEach(function(V){ne.releaseProgram(V)}),E.isShaderMaterial&&ne.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,V,W,O,he){F===null&&(F=X);const Ee=O.isMesh&&O.matrixWorld.determinant()<0,Te=_l(E,F,V,W,O);U.setMaterial(W,Ee);let Ce=V.index,Ie=1;if(W.wireframe===!0){if(Ce=k.getWireframeAttribute(V),Ce===void 0)return;Ie=2}const Ne=V.drawRange,De=V.attributes.position;let je=Ne.start*Ie,ft=(Ne.start+Ne.count)*Ie;he!==null&&(je=Math.max(je,he.start*Ie),ft=Math.min(ft,(he.start+he.count)*Ie)),Ce!==null?(je=Math.max(je,0),ft=Math.min(ft,Ce.count)):De!=null&&(je=Math.max(je,0),ft=Math.min(ft,De.count));const pt=ft-je;if(pt<0||pt===1/0)return;Ge.setup(O,W,Te,V,Ce);let Ut,et=Xe;if(Ce!==null&&(Ut=v.get(Ce),et=Fe,et.setIndex(Ut)),O.isMesh)W.wireframe===!0?(U.setLineWidth(W.wireframeLinewidth*Q()),et.setMode(T.LINES)):et.setMode(T.TRIANGLES);else if(O.isLine){let Pe=W.linewidth;Pe===void 0&&(Pe=1),U.setLineWidth(Pe*Q()),O.isLineSegments?et.setMode(T.LINES):O.isLineLoop?et.setMode(T.LINE_LOOP):et.setMode(T.LINE_STRIP)}else O.isPoints?et.setMode(T.POINTS):O.isSprite&&et.setMode(T.TRIANGLES);if(O.isBatchedMesh)O._multiDrawInstances!==null?et.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances):et.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)et.renderInstances(je,pt,O.count);else if(V.isInstancedBufferGeometry){const Pe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ct=Math.min(V.instanceCount,Pe);et.renderInstances(je,pt,Ct)}else et.render(je,pt)};function gt(E,F,V){E.transparent===!0&&E.side===Zt&&E.forceSinglePass===!1?(E.side=Pt,E.needsUpdate=!0,Ji(E,F,V),E.side=Tn,E.needsUpdate=!0,Ji(E,F,V),E.side=Zt):Ji(E,F,V)}this.compile=function(E,F,V=null){V===null&&(V=E),f=pe.get(V),f.init(F),S.push(f),V.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),E!==V&&E.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const W=new Set;return E.traverse(function(O){const he=O.material;if(he)if(Array.isArray(he))for(let Ee=0;Ee<he.length;Ee++){const Te=he[Ee];gt(Te,V,O),W.add(Te)}else gt(he,V,O),W.add(he)}),S.pop(),f=null,W},this.compileAsync=function(E,F,V=null){const W=this.compile(E,F,V);return new Promise(O=>{function he(){if(W.forEach(function(Ee){se.get(Ee).currentProgram.isReady()&&W.delete(Ee)}),W.size===0){O(E);return}setTimeout(he,10)}$.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let St=null;function nt(E){St&&St(E)}function Yt(){Ln.stop()}function $t(){Ln.start()}const Ln=new kc;Ln.setAnimationLoop(nt),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(E){St=E,I.setAnimationLoop(E),E===null?Ln.stop():Ln.start()},I.addEventListener("sessionstart",Yt),I.addEventListener("sessionend",$t),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),I.enabled===!0&&I.isPresenting===!0&&(I.cameraAutoUpdate===!0&&I.updateCamera(F),F=I.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,F,R),f=pe.get(E,S.length),f.init(F),S.push(f),Se.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),We.setFromProjectionMatrix(Se),ce=this.localClippingEnabled,Z=ge.init(this.clippingPlanes,ce),g=Re.get(E,l.length),g.init(),l.push(g),I.enabled===!0&&I.isPresenting===!0){const he=x.xr.getDepthSensingMesh();he!==null&&Xr(he,F,-1/0,x.sortObjects)}Xr(E,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(J,_e),H=I.enabled===!1||I.isPresenting===!1||I.hasDepthSensing()===!1,H&&le.addToRenderList(g,E),this.info.render.frame++,Z===!0&&ge.beginShadows();const V=f.state.shadowsArray;Be.render(V,E,F),Z===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,O=g.transmissive;if(f.setupLights(),F.isArrayCamera){const he=F.cameras;if(O.length>0)for(let Ee=0,Te=he.length;Ee<Te;Ee++){const Ce=he[Ee];ga(W,O,E,Ce)}H&&le.render(E);for(let Ee=0,Te=he.length;Ee<Te;Ee++){const Ce=he[Ee];ma(g,E,Ce,Ce.viewport)}}else O.length>0&&ga(W,O,E,F),H&&le.render(E),ma(g,E,F);R!==null&&(ae.updateMultisampleRenderTarget(R),ae.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,F),Ge.resetDefaultState(),D=-1,w=null,S.pop(),S.length>0?(f=S[S.length-1],Z===!0&&ge.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,l.pop(),l.length>0?g=l[l.length-1]:g=null};function Xr(E,F,V,W){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||We.intersectsSprite(E)){W&&ue.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Se);const Ee=ie.update(E),Te=E.material;Te.visible&&g.push(E,Ee,Te,V,ue.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||We.intersectsObject(E))){const Ee=ie.update(E),Te=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ue.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ue.copy(Ee.boundingSphere.center)),ue.applyMatrix4(E.matrixWorld).applyMatrix4(Se)),Array.isArray(Te)){const Ce=Ee.groups;for(let Ie=0,Ne=Ce.length;Ie<Ne;Ie++){const De=Ce[Ie],je=Te[De.materialIndex];je&&je.visible&&g.push(E,Ee,je,V,ue.z,De)}}else Te.visible&&g.push(E,Ee,Te,V,ue.z,null)}}const he=E.children;for(let Ee=0,Te=he.length;Ee<Te;Ee++)Xr(he[Ee],F,V,W)}function ma(E,F,V,W){const O=E.opaque,he=E.transmissive,Ee=E.transparent;f.setupLightsView(V),Z===!0&&ge.setGlobalState(x.clippingPlanes,V),W&&U.viewport(M.copy(W)),O.length>0&&Ki(O,F,V),he.length>0&&Ki(he,F,V),Ee.length>0&&Ki(Ee,F,V),U.buffers.depth.setTest(!0),U.buffers.depth.setMask(!0),U.buffers.color.setMask(!0),U.setPolygonOffset(!1)}function ga(E,F,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new Xn(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?zr:An,minFilter:Wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const he=f.state.transmissionRenderTarget[W.id],Ee=W.viewport||M;he.setSize(Ee.z,Ee.w);const Te=x.getRenderTarget();x.setRenderTarget(he),x.getClearColor(B),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),H?le.render(V):x.clear();const Ce=x.toneMapping;x.toneMapping=wn;const Ie=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),Z===!0&&ge.setGlobalState(x.clippingPlanes,W),Ki(E,V,W),ae.updateMultisampleRenderTarget(he),ae.updateRenderTargetMipmap(he),$.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let De=0,je=F.length;De<je;De++){const ft=F[De],pt=ft.object,Ut=ft.geometry,et=ft.material,Pe=ft.group;if(et.side===Zt&&pt.layers.test(W.layers)){const Ct=et.side;et.side=Pt,et.needsUpdate=!0,_a(pt,V,W,Ut,et,Pe),et.side=Ct,et.needsUpdate=!0,Ne=!0}}Ne===!0&&(ae.updateMultisampleRenderTarget(he),ae.updateRenderTargetMipmap(he))}x.setRenderTarget(Te),x.setClearColor(B,K),Ie!==void 0&&(W.viewport=Ie),x.toneMapping=Ce}function Ki(E,F,V){const W=F.isScene===!0?F.overrideMaterial:null;for(let O=0,he=E.length;O<he;O++){const Ee=E[O],Te=Ee.object,Ce=Ee.geometry,Ie=W===null?Ee.material:W,Ne=Ee.group;Te.layers.test(V.layers)&&_a(Te,F,V,Ce,Ie,Ne)}}function _a(E,F,V,W,O,he){E.onBeforeRender(x,F,V,W,O,he),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(x,F,V,W,E,he),O.transparent===!0&&O.side===Zt&&O.forceSinglePass===!1?(O.side=Pt,O.needsUpdate=!0,x.renderBufferDirect(V,F,W,O,E,he),O.side=Tn,O.needsUpdate=!0,x.renderBufferDirect(V,F,W,O,E,he),O.side=Zt):x.renderBufferDirect(V,F,W,O,E,he),E.onAfterRender(x,F,V,W,O,he)}function Ji(E,F,V){F.isScene!==!0&&(F=X);const W=se.get(E),O=f.state.lights,he=f.state.shadowsArray,Ee=O.state.version,Te=ne.getParameters(E,O.state,he,F,V),Ce=ne.getProgramCacheKey(Te);let Ie=W.programs;W.environment=E.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(E.isMeshStandardMaterial?b:be).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Ie===void 0&&(E.addEventListener("dispose",fe),Ie=new Map,W.programs=Ie);let Ne=Ie.get(Ce);if(Ne!==void 0){if(W.currentProgram===Ne&&W.lightsStateVersion===Ee)return xa(E,Te),Ne}else Te.uniforms=ne.getUniforms(E),E.onBuild(V,Te,x),E.onBeforeCompile(Te,x),Ne=ne.acquireProgram(Te,Ce),Ie.set(Ce,Ne),W.uniforms=Te.uniforms;const De=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(De.clippingPlanes=ge.uniform),xa(E,Te),W.needsLights=xl(E),W.lightsStateVersion=Ee,W.needsLights&&(De.ambientLightColor.value=O.state.ambient,De.lightProbe.value=O.state.probe,De.directionalLights.value=O.state.directional,De.directionalLightShadows.value=O.state.directionalShadow,De.spotLights.value=O.state.spot,De.spotLightShadows.value=O.state.spotShadow,De.rectAreaLights.value=O.state.rectArea,De.ltc_1.value=O.state.rectAreaLTC1,De.ltc_2.value=O.state.rectAreaLTC2,De.pointLights.value=O.state.point,De.pointLightShadows.value=O.state.pointShadow,De.hemisphereLights.value=O.state.hemi,De.directionalShadowMap.value=O.state.directionalShadowMap,De.directionalShadowMatrix.value=O.state.directionalShadowMatrix,De.spotShadowMap.value=O.state.spotShadowMap,De.spotLightMatrix.value=O.state.spotLightMatrix,De.spotLightMap.value=O.state.spotLightMap,De.pointShadowMap.value=O.state.pointShadowMap,De.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=Ne,W.uniformsList=null,Ne}function va(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=Tr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function xa(E,F){const V=se.get(E);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function _l(E,F,V,W,O){F.isScene!==!0&&(F=X),ae.resetTextureUnits();const he=F.fog,Ee=W.isMeshStandardMaterial?F.environment:null,Te=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Pn,Ce=(W.isMeshStandardMaterial?b:be).get(W.envMap||Ee),Ie=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ne=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!V.morphAttributes.position,je=!!V.morphAttributes.normal,ft=!!V.morphAttributes.color;let pt=wn;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(pt=x.toneMapping);const Ut=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,et=Ut!==void 0?Ut.length:0,Pe=se.get(W),Ct=f.state.lights;if(Z===!0&&(ce===!0||E!==w)){const zt=E===w&&W.id===D;ge.setState(W,E,zt)}let it=!1;W.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Ct.state.version||Pe.outputColorSpace!==Te||O.isBatchedMesh&&Pe.batching===!1||!O.isBatchedMesh&&Pe.batching===!0||O.isBatchedMesh&&Pe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Pe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Pe.instancing===!1||!O.isInstancedMesh&&Pe.instancing===!0||O.isSkinnedMesh&&Pe.skinning===!1||!O.isSkinnedMesh&&Pe.skinning===!0||O.isInstancedMesh&&Pe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Pe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Pe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Pe.instancingMorph===!1&&O.morphTexture!==null||Pe.envMap!==Ce||W.fog===!0&&Pe.fog!==he||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==ge.numPlanes||Pe.numIntersection!==ge.numIntersection)||Pe.vertexAlphas!==Ie||Pe.vertexTangents!==Ne||Pe.morphTargets!==De||Pe.morphNormals!==je||Pe.morphColors!==ft||Pe.toneMapping!==pt||Pe.morphTargetsCount!==et)&&(it=!0):(it=!0,Pe.__version=W.version);let nn=Pe.currentProgram;it===!0&&(nn=Ji(W,F,O));let Zi=!1,Dn=!1,qr=!1;const yt=nn.getUniforms(),fn=Pe.uniforms;if(U.useProgram(nn.program)&&(Zi=!0,Dn=!0,qr=!0),W.id!==D&&(D=W.id,Dn=!0),Zi||w!==E){yt.setValue(T,"projectionMatrix",E.projectionMatrix),yt.setValue(T,"viewMatrix",E.matrixWorldInverse);const zt=yt.map.cameraPosition;zt!==void 0&&zt.setValue(T,ue.setFromMatrixPosition(E.matrixWorld)),A.logarithmicDepthBuffer&&yt.setValue(T,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&yt.setValue(T,"isOrthographic",E.isOrthographicCamera===!0),w!==E&&(w=E,Dn=!0,qr=!0)}if(O.isSkinnedMesh){yt.setOptional(T,O,"bindMatrix"),yt.setOptional(T,O,"bindMatrixInverse");const zt=O.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),yt.setValue(T,"boneTexture",zt.boneTexture,ae))}O.isBatchedMesh&&(yt.setOptional(T,O,"batchingTexture"),yt.setValue(T,"batchingTexture",O._matricesTexture,ae),yt.setOptional(T,O,"batchingColorTexture"),O._colorsTexture!==null&&yt.setValue(T,"batchingColorTexture",O._colorsTexture,ae));const Yr=V.morphAttributes;if((Yr.position!==void 0||Yr.normal!==void 0||Yr.color!==void 0)&&Ae.update(O,V,nn),(Dn||Pe.receiveShadow!==O.receiveShadow)&&(Pe.receiveShadow=O.receiveShadow,yt.setValue(T,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(fn.envMap.value=Ce,fn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(fn.envMapIntensity.value=F.environmentIntensity),Dn&&(yt.setValue(T,"toneMappingExposure",x.toneMappingExposure),Pe.needsLights&&vl(fn,qr),he&&W.fog===!0&&oe.refreshFogUniforms(fn,he),oe.refreshMaterialUniforms(fn,W,te,Y,f.state.transmissionRenderTarget[E.id]),Tr.upload(T,va(Pe),fn,ae)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Tr.upload(T,va(Pe),fn,ae),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&yt.setValue(T,"center",O.center),yt.setValue(T,"modelViewMatrix",O.modelViewMatrix),yt.setValue(T,"normalMatrix",O.normalMatrix),yt.setValue(T,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const zt=W.uniformsGroups;for(let $r=0,Ml=zt.length;$r<Ml;$r++){const Ma=zt[$r];qe.update(Ma,nn),qe.bind(Ma,nn)}}return nn}function vl(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function xl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,F,V){se.get(E.texture).__webglTexture=F,se.get(E.depthTexture).__webglTexture=V;const W=se.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||$.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const V=se.get(E);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,V=0){R=E,N=F,C=V;let W=!0,O=null,he=!1,Ee=!1;if(E){const Ce=se.get(E);Ce.__useDefaultFramebuffer!==void 0?(U.bindFramebuffer(T.FRAMEBUFFER,null),W=!1):Ce.__webglFramebuffer===void 0?ae.setupRenderTarget(E):Ce.__hasExternalTextures&&ae.rebindTextures(E,se.get(E.texture).__webglTexture,se.get(E.depthTexture).__webglTexture);const Ie=E.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(Ee=!0);const Ne=se.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ne[F])?O=Ne[F][V]:O=Ne[F],he=!0):E.samples>0&&ae.useMultisampledRTT(E)===!1?O=se.get(E).__webglMultisampledFramebuffer:Array.isArray(Ne)?O=Ne[V]:O=Ne,M.copy(E.viewport),P.copy(E.scissor),q=E.scissorTest}else M.copy(Me).multiplyScalar(te).floor(),P.copy(ve).multiplyScalar(te).floor(),q=Ue;if(U.bindFramebuffer(T.FRAMEBUFFER,O)&&W&&U.drawBuffers(E,O),U.viewport(M),U.scissor(P),U.setScissorTest(q),he){const Ce=se.get(E.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ce.__webglTexture,V)}else if(Ee){const Ce=se.get(E.texture),Ie=F||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ce.__webglTexture,V||0,Ie)}D=-1},this.readRenderTargetPixels=function(E,F,V,W,O,he,Ee){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te){U.bindFramebuffer(T.FRAMEBUFFER,Te);try{const Ce=E.texture,Ie=Ce.format,Ne=Ce.type;if(!A.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-W&&V>=0&&V<=E.height-O&&T.readPixels(F,V,W,O,xe.convert(Ie),xe.convert(Ne),he)}finally{const Ce=R!==null?se.get(R).__webglFramebuffer:null;U.bindFramebuffer(T.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(E,F,V,W,O,he,Ee){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te){U.bindFramebuffer(T.FRAMEBUFFER,Te);try{const Ce=E.texture,Ie=Ce.format,Ne=Ce.type;if(!A.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=E.width-W&&V>=0&&V<=E.height-O){const De=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,De),T.bufferData(T.PIXEL_PACK_BUFFER,he.byteLength,T.STREAM_READ),T.readPixels(F,V,W,O,xe.convert(Ie),xe.convert(Ne),0),T.flush();const je=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);await bu(T,je,4);try{T.bindBuffer(T.PIXEL_PACK_BUFFER,De),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,he)}finally{T.deleteBuffer(De),T.deleteSync(je)}return he}}finally{const Ce=R!==null?se.get(R).__webglFramebuffer:null;U.bindFramebuffer(T.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(E,F=null,V=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1]);const W=Math.pow(2,-V),O=Math.floor(E.image.width*W),he=Math.floor(E.image.height*W),Ee=F!==null?F.x:0,Te=F!==null?F.y:0;ae.setTexture2D(E,0),T.copyTexSubImage2D(T.TEXTURE_2D,V,0,0,Ee,Te,O,he),U.unbindTexture()},this.copyTextureToTexture=function(E,F,V=null,W=null,O=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],F=arguments[2],O=arguments[3]||0,V=null);let he,Ee,Te,Ce,Ie,Ne;V!==null?(he=V.max.x-V.min.x,Ee=V.max.y-V.min.y,Te=V.min.x,Ce=V.min.y):(he=E.image.width,Ee=E.image.height,Te=0,Ce=0),W!==null?(Ie=W.x,Ne=W.y):(Ie=0,Ne=0);const De=xe.convert(F.format),je=xe.convert(F.type);ae.setTexture2D(F,0),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,F.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,F.unpackAlignment);const ft=T.getParameter(T.UNPACK_ROW_LENGTH),pt=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Ut=T.getParameter(T.UNPACK_SKIP_PIXELS),et=T.getParameter(T.UNPACK_SKIP_ROWS),Pe=T.getParameter(T.UNPACK_SKIP_IMAGES),Ct=E.isCompressedTexture?E.mipmaps[O]:E.image;T.pixelStorei(T.UNPACK_ROW_LENGTH,Ct.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Ct.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Te),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ce),E.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,O,Ie,Ne,he,Ee,De,je,Ct.data):E.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,O,Ie,Ne,Ct.width,Ct.height,De,Ct.data):T.texSubImage2D(T.TEXTURE_2D,O,Ie,Ne,De,je,Ct),T.pixelStorei(T.UNPACK_ROW_LENGTH,ft),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,pt),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Ut),T.pixelStorei(T.UNPACK_SKIP_ROWS,et),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Pe),O===0&&F.generateMipmaps&&T.generateMipmap(T.TEXTURE_2D),U.unbindTexture()},this.copyTextureToTexture3D=function(E,F,V=null,W=null,O=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,E=arguments[2],F=arguments[3],O=arguments[4]||0);let he,Ee,Te,Ce,Ie,Ne,De,je,ft;const pt=E.isCompressedTexture?E.mipmaps[O]:E.image;V!==null?(he=V.max.x-V.min.x,Ee=V.max.y-V.min.y,Te=V.max.z-V.min.z,Ce=V.min.x,Ie=V.min.y,Ne=V.min.z):(he=pt.width,Ee=pt.height,Te=pt.depth,Ce=0,Ie=0,Ne=0),W!==null?(De=W.x,je=W.y,ft=W.z):(De=0,je=0,ft=0);const Ut=xe.convert(F.format),et=xe.convert(F.type);let Pe;if(F.isData3DTexture)ae.setTexture3D(F,0),Pe=T.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)ae.setTexture2DArray(F,0),Pe=T.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,F.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,F.unpackAlignment);const Ct=T.getParameter(T.UNPACK_ROW_LENGTH),it=T.getParameter(T.UNPACK_IMAGE_HEIGHT),nn=T.getParameter(T.UNPACK_SKIP_PIXELS),Zi=T.getParameter(T.UNPACK_SKIP_ROWS),Dn=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,pt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,pt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Ce),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ie),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ne),E.isDataTexture||E.isData3DTexture?T.texSubImage3D(Pe,O,De,je,ft,he,Ee,Te,Ut,et,pt.data):F.isCompressedArrayTexture?T.compressedTexSubImage3D(Pe,O,De,je,ft,he,Ee,Te,Ut,pt.data):T.texSubImage3D(Pe,O,De,je,ft,he,Ee,Te,Ut,et,pt),T.pixelStorei(T.UNPACK_ROW_LENGTH,Ct),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,it),T.pixelStorei(T.UNPACK_SKIP_PIXELS,nn),T.pixelStorei(T.UNPACK_SKIP_ROWS,Zi),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Dn),O===0&&F.generateMipmaps&&T.generateMipmap(Pe),U.unbindTexture()},this.initRenderTarget=function(E){se.get(E).__webglFramebuffer===void 0&&ae.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?ae.setTextureCube(E,0):E.isData3DTexture?ae.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?ae.setTexture2DArray(E,0):ae.setTexture2D(E,0),U.unbindTexture()},this.resetState=function(){N=0,C=0,R=null,U.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ea?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===kr?"display-p3":"srgb"}}class ra{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ye(e),this.near=t,this.far=n}clone(){return new ra(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Um extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Nm extends At{constructor(e=null,t=1,n=1,r,s,a,o,c,u=Dt,h=Dt,d,p){super(null,a,o,c,u,h,r,s,d,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ws extends qt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const hi=new rt,Go=new rt,Mr=[],Vo=new Yn,Fm=new rt,Fi=new Ke,Oi=new Yi;class Om extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ws(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Fm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hi),Vo.copy(e.boundingBox).applyMatrix4(hi),this.boundingBox.union(Vo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hi),Oi.copy(e.boundingSphere).applyMatrix4(hi),this.boundingSphere.union(Oi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Fi.geometry=this.geometry,Fi.material=this.material,Fi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Oi.copy(this.boundingSphere),Oi.applyMatrix4(n),e.ray.intersectsSphere(Oi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,hi),Go.multiplyMatrices(n,hi),Fi.matrixWorld=Go,Fi.raycast(e,Mr);for(let a=0,o=Mr.length;a<o;a++){const c=Mr[a];c.instanceId=s,c.object=this,t.push(c)}Mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ws(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nm(new Float32Array(r*this.count),r,this.count,Ec,un));const s=this.morphTexture.source.data.data;let a=0;for(let u=0;u<n.length;u++)a+=n[u];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class $c extends At{constructor(e,t,n,r,s,a,o,c,u){super(e,t,n,r,s,a,o,c,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,c=s-1,u;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),u=n[r]-a,u<0)o=r+1;else if(u>0)c=r-1;else{c=r;break}if(r=c,n[r]===a)return r/(s-1);const h=n[r],p=n[r+1]-h,m=(a-h)/p;return(r+m)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new de:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,r=[],s=[],a=[],o=new L,c=new rt;for(let m=0;m<=e;m++){const _=m/e;r[m]=this.getTangentAt(_,new L)}s[0]=new L,a[0]=new L;let u=Number.MAX_VALUE;const h=Math.abs(r[0].x),d=Math.abs(r[0].y),p=Math.abs(r[0].z);h<=u&&(u=h,n.set(1,0,0)),d<=u&&(u=d,n.set(0,1,0)),p<=u&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(r[m-1],r[m]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(wt(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,_))}a[m].crossVectors(r[m],s[m])}if(t===!0){let m=Math.acos(wt(s[0].dot(s[e]),-1,1));m/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let _=1;_<=e;_++)s[_].applyMatrix4(c.makeRotationAxis(r[_],m*_)),a[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class sa extends tn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new de){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(o),u=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=c-this.aX,m=u-this.aY;c=p*h-m*d+this.aX,u=p*d+m*h+this.aY}return n.set(c,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Bm extends sa{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function aa(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,u){r(a,o,u*(o-s),u*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,u,h,d){let p=(a-s)/u-(o-s)/(u+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+d)+(c-o)/d;p*=h,m*=h,r(a,o,p,m)},calc:function(s){const a=s*s,o=a*s;return i+e*s+t*a+n*o}}}const Sr=new L,Cs=new aa,Rs=new aa,Ps=new aa;class zm extends tn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new L){const n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let u,h;this.closed||o>0?u=r[(o-1)%s]:(Sr.subVectors(r[0],r[1]).add(r[0]),u=Sr);const d=r[o%s],p=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(Sr.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Sr),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let _=Math.pow(u.distanceToSquared(d),m),g=Math.pow(d.distanceToSquared(p),m),f=Math.pow(p.distanceToSquared(h),m);g<1e-4&&(g=1),_<1e-4&&(_=g),f<1e-4&&(f=g),Cs.initNonuniformCatmullRom(u.x,d.x,p.x,h.x,_,g,f),Rs.initNonuniformCatmullRom(u.y,d.y,p.y,h.y,_,g,f),Ps.initNonuniformCatmullRom(u.z,d.z,p.z,h.z,_,g,f)}else this.curveType==="catmullrom"&&(Cs.initCatmullRom(u.x,d.x,p.x,h.x,this.tension),Rs.initCatmullRom(u.y,d.y,p.y,h.y,this.tension),Ps.initCatmullRom(u.z,d.z,p.z,h.z,this.tension));return n.set(Cs.calc(c),Rs.calc(c),Ps.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wo(i,e,t,n,r){const s=(n-e)*.5,a=(r-t)*.5,o=i*i,c=i*o;return(2*t-2*n+s+a)*c+(-3*t+3*n-2*s-a)*o+s*i+t}function km(i,e){const t=1-i;return t*t*e}function Hm(i,e){return 2*(1-i)*i*e}function Gm(i,e){return i*i*e}function ki(i,e,t,n){return km(i,e)+Hm(i,t)+Gm(i,n)}function Vm(i,e){const t=1-i;return t*t*t*e}function Wm(i,e){const t=1-i;return 3*t*t*i*e}function Xm(i,e){return 3*(1-i)*i*i*e}function qm(i,e){return i*i*i*e}function Hi(i,e,t,n,r){return Vm(i,e)+Wm(i,t)+Xm(i,n)+qm(i,r)}class Kc extends tn{constructor(e=new de,t=new de,n=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new de){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Hi(e,r.x,s.x,a.x,o.x),Hi(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ym extends tn{constructor(e=new L,t=new L,n=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new L){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Hi(e,r.x,s.x,a.x,o.x),Hi(e,r.y,s.y,a.y,o.y),Hi(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Jc extends tn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $m extends tn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zc extends tn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ki(e,r.x,s.x,a.x),ki(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Km extends tn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ki(e,r.x,s.x,a.x),ki(e,r.y,s.y,a.y),ki(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jc extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],u=r[a],h=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(Wo(o,c.x,u.x,h.x,d.x),Wo(o,c.y,u.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new de().fromArray(r))}return this}}var Xs=Object.freeze({__proto__:null,ArcCurve:Bm,CatmullRomCurve3:zm,CubicBezierCurve:Kc,CubicBezierCurve3:Ym,EllipseCurve:sa,LineCurve:Jc,LineCurve3:$m,QuadraticBezierCurve:Zc,QuadraticBezierCurve3:Km,SplineCurve:jc});class Jm extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xs[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,o=this.curves[s],c=o.getLength(),u=c===0?0:1-a/c;return o.getPointAt(u,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let u=0;u<c.length;u++){const h=c[u];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new Xs[r.type]().fromJSON(r))}return this}}class qs extends Jm{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Jc(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Zc(this.currentPoint.clone(),new de(e,t),new de(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){const o=new Kc(this.currentPoint.clone(),new de(e,t),new de(n,r),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new jc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,c){const u=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+u,t+h,n,r,s,a,o,c),this}absellipse(e,t,n,r,s,a,o,c){const u=new sa(e,t,n,r,s,a,o,c);if(this.curves.length>0){const d=u.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(u);const h=u.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class oa extends It{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=wt(r,0,Math.PI*2);const s=[],a=[],o=[],c=[],u=[],h=1/t,d=new L,p=new de,m=new L,_=new L,g=new L;let f=0,l=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:f=e[S+1].x-e[S].x,l=e[S+1].y-e[S].y,m.x=l*1,m.y=-f,m.z=l*0,g.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(g.x,g.y,g.z);break;default:f=e[S+1].x-e[S].x,l=e[S+1].y-e[S].y,m.x=l*1,m.y=-f,m.z=l*0,_.copy(m),m.x+=g.x,m.y+=g.y,m.z+=g.z,m.normalize(),c.push(m.x,m.y,m.z),g.copy(_)}for(let S=0;S<=t;S++){const x=n+S*h*r,y=Math.sin(x),N=Math.cos(x);for(let C=0;C<=e.length-1;C++){d.x=e[C].x*y,d.y=e[C].y,d.z=e[C].x*N,a.push(d.x,d.y,d.z),p.x=S/t,p.y=C/(e.length-1),o.push(p.x,p.y);const R=c[3*C+0]*y,D=c[3*C+1],w=c[3*C+0]*N;u.push(R,D,w)}}for(let S=0;S<t;S++)for(let x=0;x<e.length-1;x++){const y=x+S*e.length,N=y,C=y+e.length,R=y+e.length+1,D=y+1;s.push(N,C,D),s.push(R,D,C)}this.setIndex(s),this.setAttribute("position",new st(a,3)),this.setAttribute("uv",new st(o,2)),this.setAttribute("normal",new st(u,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oa(e.points,e.segments,e.phiStart,e.phiLength)}}class dn extends oa{constructor(e=1,t=1,n=4,r=8){const s=new qs;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new dn(e.radius,e.length,e.capSegments,e.radialSegments)}}class Gr extends It{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],u=new L,h=new de;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,p=3;d<=t;d++,p+=3){const m=n+d/t*r;u.x=e*Math.cos(m),u.y=e*Math.sin(m),a.push(u.x,u.y,u.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class $e extends It{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const u=this;r=Math.floor(r),s=Math.floor(s);const h=[],d=[],p=[],m=[];let _=0;const g=[],f=n/2;let l=0;S(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(p,3)),this.setAttribute("uv",new st(m,2));function S(){const y=new L,N=new L;let C=0;const R=(t-e)/n;for(let D=0;D<=s;D++){const w=[],M=D/s,P=M*(t-e)+e;for(let q=0;q<=r;q++){const B=q/r,K=B*c+o,j=Math.sin(K),Y=Math.cos(K);N.x=P*j,N.y=-M*n+f,N.z=P*Y,d.push(N.x,N.y,N.z),y.set(j,R,Y).normalize(),p.push(y.x,y.y,y.z),m.push(B,1-M),w.push(_++)}g.push(w)}for(let D=0;D<r;D++)for(let w=0;w<s;w++){const M=g[w][D],P=g[w+1][D],q=g[w+1][D+1],B=g[w][D+1];h.push(M,P,B),h.push(P,q,B),C+=6}u.addGroup(l,C,0),l+=C}function x(y){const N=_,C=new de,R=new L;let D=0;const w=y===!0?e:t,M=y===!0?1:-1;for(let q=1;q<=r;q++)d.push(0,f*M,0),p.push(0,M,0),m.push(.5,.5),_++;const P=_;for(let q=0;q<=r;q++){const K=q/r*c+o,j=Math.cos(K),Y=Math.sin(K);R.x=w*Y,R.y=f*M,R.z=w*j,d.push(R.x,R.y,R.z),p.push(0,M,0),C.x=j*.5+.5,C.y=Y*.5*M+.5,m.push(C.x,C.y),_++}for(let q=0;q<r;q++){const B=N+q,K=P+q;y===!0?h.push(K,K+1,B):h.push(K+1,K,B),D+=3}u.addGroup(l,D,y===!0?1:2),l+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ci extends $e{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ci(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qc extends qs{constructor(e){super(e),this.uuid=Ti(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new qs().fromJSON(r))}return this}}const Zm={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=el(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,c,u,h,d,p,m;if(n&&(s=n0(i,e,s,t)),i.length>80*t){o=u=i[0],c=h=i[1];for(let _=t;_<r;_+=t)d=i[_],p=i[_+1],d<o&&(o=d),p<c&&(c=p),d>u&&(u=d),p>h&&(h=p);m=Math.max(u-o,h-c),m=m!==0?32767/m:0}return Vi(s,a,t,o,c,m,0),a}};function el(i,e,t,n,r){let s,a;if(r===f0(i,e,t,n)>0)for(s=e;s<t;s+=n)a=Xo(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=Xo(s,i[s],i[s+1],a);return a&&Vr(a,a.next)&&(Xi(a),a=a.next),a}function qn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Vr(t,t.next)||ht(t.prev,t,t.next)===0)){if(Xi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Vi(i,e,t,n,r,s,a){if(!i)return;!a&&s&&o0(i,n,r,s);let o=i,c,u;for(;i.prev!==i.next;){if(c=i.prev,u=i.next,s?Qm(i,n,r,s):jm(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(u.i/t|0),Xi(i),i=u.next,o=u.next;continue}if(i=u,i===o){a?a===1?(i=e0(qn(i),e,t),Vi(i,e,t,n,r,s,2)):a===2&&t0(i,e,t,n,r,s):Vi(qn(i),e,t,n,r,s,1);break}}}function jm(i){const e=i.prev,t=i,n=i.next;if(ht(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,u=n.y,h=r<s?r<a?r:a:s<a?s:a,d=o<c?o<u?o:u:c<u?c:u,p=r>s?r>a?r:a:s>a?s:a,m=o>c?o>u?o:u:c>u?c:u;let _=n.next;for(;_!==e;){if(_.x>=h&&_.x<=p&&_.y>=d&&_.y<=m&&fi(r,o,s,c,a,u,_.x,_.y)&&ht(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Qm(i,e,t,n){const r=i.prev,s=i,a=i.next;if(ht(r,s,a)>=0)return!1;const o=r.x,c=s.x,u=a.x,h=r.y,d=s.y,p=a.y,m=o<c?o<u?o:u:c<u?c:u,_=h<d?h<p?h:p:d<p?d:p,g=o>c?o>u?o:u:c>u?c:u,f=h>d?h>p?h:p:d>p?d:p,l=Ys(m,_,e,t,n),S=Ys(g,f,e,t,n);let x=i.prevZ,y=i.nextZ;for(;x&&x.z>=l&&y&&y.z<=S;){if(x.x>=m&&x.x<=g&&x.y>=_&&x.y<=f&&x!==r&&x!==a&&fi(o,h,c,d,u,p,x.x,x.y)&&ht(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=m&&y.x<=g&&y.y>=_&&y.y<=f&&y!==r&&y!==a&&fi(o,h,c,d,u,p,y.x,y.y)&&ht(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=l;){if(x.x>=m&&x.x<=g&&x.y>=_&&x.y<=f&&x!==r&&x!==a&&fi(o,h,c,d,u,p,x.x,x.y)&&ht(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=S;){if(y.x>=m&&y.x<=g&&y.y>=_&&y.y<=f&&y!==r&&y!==a&&fi(o,h,c,d,u,p,y.x,y.y)&&ht(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function e0(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!Vr(r,s)&&tl(r,n,n.next,s)&&Wi(r,s)&&Wi(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Xi(n),Xi(n.next),n=i=s),n=n.next}while(n!==i);return qn(n)}function t0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&u0(a,o)){let c=nl(a,o);a=qn(a,a.next),c=qn(c,c.next),Vi(a,e,t,n,r,s,0),Vi(c,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function n0(i,e,t,n){const r=[];let s,a,o,c,u;for(s=0,a=e.length;s<a;s++)o=e[s]*n,c=s<a-1?e[s+1]*n:i.length,u=el(i,o,c,n,!1),u===u.next&&(u.steiner=!0),r.push(l0(u));for(r.sort(i0),s=0;s<r.length;s++)t=r0(r[s],t);return t}function i0(i,e){return i.x-e.x}function r0(i,e){const t=s0(i,e);if(!t)return e;const n=nl(t,i);return qn(n,n.next),qn(t,t.next)}function s0(i,e){let t=e,n=-1/0,r;const s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const p=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=s&&p>n&&(n=p,r=t.x<t.next.x?t:t.next,p===s))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,c=r.x,u=r.y;let h=1/0,d;t=r;do s>=t.x&&t.x>=c&&s!==t.x&&fi(a<u?s:n,a,c,u,a<u?n:s,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(s-t.x),Wi(t,i)&&(d<h||d===h&&(t.x>r.x||t.x===r.x&&a0(r,t)))&&(r=t,h=d)),t=t.next;while(t!==o);return r}function a0(i,e){return ht(i.prev,i,e.prev)<0&&ht(e.next,i,i.next)<0}function o0(i,e,t,n){let r=i;do r.z===0&&(r.z=Ys(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,c0(r)}function c0(i){let e,t,n,r,s,a,o,c,u=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<u&&(o++,n=n.nextZ,!!n);e++);for(c=u;o>0||c>0&&n;)o!==0&&(c===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,u*=2}while(a>1);return i}function Ys(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function l0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function fi(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function u0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!h0(i,e)&&(Wi(i,e)&&Wi(e,i)&&d0(i,e)&&(ht(i.prev,i,e.prev)||ht(i,e.prev,e))||Vr(i,e)&&ht(i.prev,i,i.next)>0&&ht(e.prev,e,e.next)>0)}function ht(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Vr(i,e){return i.x===e.x&&i.y===e.y}function tl(i,e,t,n){const r=Er(ht(i,e,t)),s=Er(ht(i,e,n)),a=Er(ht(t,n,i)),o=Er(ht(t,n,e));return!!(r!==s&&a!==o||r===0&&yr(i,t,e)||s===0&&yr(i,n,e)||a===0&&yr(t,i,n)||o===0&&yr(t,e,n))}function yr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Er(i){return i>0?1:i<0?-1:0}function h0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&tl(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Wi(i,e){return ht(i.prev,i,i.next)<0?ht(i,e,i.next)>=0&&ht(i,i.prev,e)>=0:ht(i,e,i.prev)<0||ht(i,i.next,e)<0}function d0(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function nl(i,e){const t=new $s(i.i,i.x,i.y),n=new $s(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Xo(i,e,t,n){const r=new $s(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Xi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $s(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function f0(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class Gi{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Gi.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];qo(e),Yo(n,e);let a=e.length;t.forEach(qo);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,Yo(n,t[c]);const o=Zm.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}}function qo(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Yo(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ca extends It{constructor(e=new Qc([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let o=0,c=e.length;o<c;o++){const u=e[o];a(u)}this.setAttribute("position",new st(r,3)),this.setAttribute("uv",new st(s,2)),this.computeVertexNormals();function a(o){const c=[],u=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,m=t.bevelThickness!==void 0?t.bevelThickness:.2,_=t.bevelSize!==void 0?t.bevelSize:m-.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3;const l=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:p0;let x,y=!1,N,C,R,D;l&&(x=l.getSpacedPoints(h),y=!0,p=!1,N=l.computeFrenetFrames(h,!1),C=new L,R=new L,D=new L),p||(f=0,m=0,_=0,g=0);const w=o.extractPoints(u);let M=w.shape;const P=w.holes;if(!Gi.isClockWise(M)){M=M.reverse();for(let G=0,$=P.length;G<$;G++){const A=P[G];Gi.isClockWise(A)&&(P[G]=A.reverse())}}const B=Gi.triangulateShape(M,P),K=M;for(let G=0,$=P.length;G<$;G++){const A=P[G];M=M.concat(A)}function j(G,$,A){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),G.clone().addScaledVector($,A)}const Y=M.length,te=B.length;function J(G,$,A){let U,z,se;const ae=G.x-$.x,be=G.y-$.y,b=A.x-G.x,v=A.y-G.y,k=ae*ae+be*be,ie=ae*v-be*b;if(Math.abs(ie)>Number.EPSILON){const ne=Math.sqrt(k),oe=Math.sqrt(b*b+v*v),Re=$.x-be/ne,pe=$.y+ae/ne,ge=A.x-v/oe,Be=A.y+b/oe,le=((ge-Re)*v-(Be-pe)*b)/(ae*v-be*b);U=Re+ae*le-G.x,z=pe+be*le-G.y;const Ae=U*U+z*z;if(Ae<=2)return new de(U,z);se=Math.sqrt(Ae/2)}else{let ne=!1;ae>Number.EPSILON?b>Number.EPSILON&&(ne=!0):ae<-Number.EPSILON?b<-Number.EPSILON&&(ne=!0):Math.sign(be)===Math.sign(v)&&(ne=!0),ne?(U=-be,z=ae,se=Math.sqrt(k)):(U=ae,z=be,se=Math.sqrt(k/2))}return new de(U/se,z/se)}const _e=[];for(let G=0,$=K.length,A=$-1,U=G+1;G<$;G++,A++,U++)A===$&&(A=0),U===$&&(U=0),_e[G]=J(K[G],K[A],K[U]);const Me=[];let ve,Ue=_e.concat();for(let G=0,$=P.length;G<$;G++){const A=P[G];ve=[];for(let U=0,z=A.length,se=z-1,ae=U+1;U<z;U++,se++,ae++)se===z&&(se=0),ae===z&&(ae=0),ve[U]=J(A[U],A[se],A[ae]);Me.push(ve),Ue=Ue.concat(ve)}for(let G=0;G<f;G++){const $=G/f,A=m*Math.cos($*Math.PI/2),U=_*Math.sin($*Math.PI/2)+g;for(let z=0,se=K.length;z<se;z++){const ae=j(K[z],_e[z],U);ue(ae.x,ae.y,-A)}for(let z=0,se=P.length;z<se;z++){const ae=P[z];ve=Me[z];for(let be=0,b=ae.length;be<b;be++){const v=j(ae[be],ve[be],U);ue(v.x,v.y,-A)}}}const We=_+g;for(let G=0;G<Y;G++){const $=p?j(M[G],Ue[G],We):M[G];y?(R.copy(N.normals[0]).multiplyScalar($.x),C.copy(N.binormals[0]).multiplyScalar($.y),D.copy(x[0]).add(R).add(C),ue(D.x,D.y,D.z)):ue($.x,$.y,0)}for(let G=1;G<=h;G++)for(let $=0;$<Y;$++){const A=p?j(M[$],Ue[$],We):M[$];y?(R.copy(N.normals[G]).multiplyScalar(A.x),C.copy(N.binormals[G]).multiplyScalar(A.y),D.copy(x[G]).add(R).add(C),ue(D.x,D.y,D.z)):ue(A.x,A.y,d/h*G)}for(let G=f-1;G>=0;G--){const $=G/f,A=m*Math.cos($*Math.PI/2),U=_*Math.sin($*Math.PI/2)+g;for(let z=0,se=K.length;z<se;z++){const ae=j(K[z],_e[z],U);ue(ae.x,ae.y,d+A)}for(let z=0,se=P.length;z<se;z++){const ae=P[z];ve=Me[z];for(let be=0,b=ae.length;be<b;be++){const v=j(ae[be],ve[be],U);y?ue(v.x,v.y+x[h-1].y,x[h-1].x+A):ue(v.x,v.y,d+A)}}}Z(),ce();function Z(){const G=r.length/3;if(p){let $=0,A=Y*$;for(let U=0;U<te;U++){const z=B[U];X(z[2]+A,z[1]+A,z[0]+A)}$=h+f*2,A=Y*$;for(let U=0;U<te;U++){const z=B[U];X(z[0]+A,z[1]+A,z[2]+A)}}else{for(let $=0;$<te;$++){const A=B[$];X(A[2],A[1],A[0])}for(let $=0;$<te;$++){const A=B[$];X(A[0]+Y*h,A[1]+Y*h,A[2]+Y*h)}}n.addGroup(G,r.length/3-G,0)}function ce(){const G=r.length/3;let $=0;Se(K,$),$+=K.length;for(let A=0,U=P.length;A<U;A++){const z=P[A];Se(z,$),$+=z.length}n.addGroup(G,r.length/3-G,1)}function Se(G,$){let A=G.length;for(;--A>=0;){const U=A;let z=A-1;z<0&&(z=G.length-1);for(let se=0,ae=h+f*2;se<ae;se++){const be=Y*se,b=Y*(se+1),v=$+U+be,k=$+z+be,ie=$+z+b,ne=$+U+b;H(v,k,ie,ne)}}}function ue(G,$,A){c.push(G),c.push($),c.push(A)}function X(G,$,A){Q(G),Q($),Q(A);const U=r.length/3,z=S.generateTopUV(n,r,U-3,U-2,U-1);T(z[0]),T(z[1]),T(z[2])}function H(G,$,A,U){Q(G),Q($),Q(U),Q($),Q(A),Q(U);const z=r.length/3,se=S.generateSideWallUV(n,r,z-6,z-3,z-2,z-1);T(se[0]),T(se[1]),T(se[3]),T(se[1]),T(se[2]),T(se[3])}function Q(G){r.push(c[G*3+0]),r.push(c[G*3+1]),r.push(c[G*3+2])}function T(G){s.push(G.x),s.push(G.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return m0(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Xs[r.type]().fromJSON(r)),new ca(n,e.options)}}const p0={generateTopUV:function(i,e,t,n,r){const s=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],u=e[r*3],h=e[r*3+1];return[new de(s,a),new de(o,c),new de(u,h)]},generateSideWallUV:function(i,e,t,n,r,s){const a=e[t*3],o=e[t*3+1],c=e[t*3+2],u=e[n*3],h=e[n*3+1],d=e[n*3+2],p=e[r*3],m=e[r*3+1],_=e[r*3+2],g=e[s*3],f=e[s*3+1],l=e[s*3+2];return Math.abs(o-h)<Math.abs(a-u)?[new de(a,1-c),new de(u,1-d),new de(p,1-_),new de(g,1-l)]:[new de(o,1-c),new de(h,1-d),new de(m,1-_),new de(f,1-l)]}};function m0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class la extends It{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],u=[],h=[];let d=e;const p=(t-e)/r,m=new L,_=new de;for(let g=0;g<=r;g++){for(let f=0;f<=n;f++){const l=s+f/n*a;m.x=d*Math.cos(l),m.y=d*Math.sin(l),c.push(m.x,m.y,m.z),u.push(0,0,1),_.x=(m.x/t+1)/2,_.y=(m.y/t+1)/2,h.push(_.x,_.y)}d+=p}for(let g=0;g<r;g++){const f=g*(n+1);for(let l=0;l<n;l++){const S=l+f,x=S,y=S+n+1,N=S+n+2,C=S+1;o.push(x,y,C),o.push(y,N,C)}}this.setIndex(o),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new la(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ve extends It{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let u=0;const h=[],d=new L,p=new L,m=[],_=[],g=[],f=[];for(let l=0;l<=n;l++){const S=[],x=l/n;let y=0;l===0&&a===0?y=.5/t:l===n&&c===Math.PI&&(y=-.5/t);for(let N=0;N<=t;N++){const C=N/t;d.x=-e*Math.cos(r+C*s)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(r+C*s)*Math.sin(a+x*o),_.push(d.x,d.y,d.z),p.copy(d).normalize(),g.push(p.x,p.y,p.z),f.push(C+y,1-x),S.push(u++)}h.push(S)}for(let l=0;l<n;l++)for(let S=0;S<t;S++){const x=h[l][S+1],y=h[l][S],N=h[l+1][S],C=h[l+1][S+1];(l!==0||a>0)&&m.push(x,y,C),(l!==n-1||c<Math.PI)&&m.push(y,N,C)}this.setIndex(m),this.setAttribute("position",new st(_,3)),this.setAttribute("normal",new st(g,3)),this.setAttribute("uv",new st(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ve(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ri extends It{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],c=[],u=[],h=new L,d=new L,p=new L;for(let m=0;m<=n;m++)for(let _=0;_<=r;_++){const g=_/r*s,f=m/n*Math.PI*2;d.x=(e+t*Math.cos(f))*Math.cos(g),d.y=(e+t*Math.cos(f))*Math.sin(g),d.z=t*Math.sin(f),o.push(d.x,d.y,d.z),h.x=e*Math.cos(g),h.y=e*Math.sin(g),p.subVectors(d,h).normalize(),c.push(p.x,p.y,p.z),u.push(_/r),u.push(m/n)}for(let m=1;m<=n;m++)for(let _=1;_<=r;_++){const g=(r+1)*m+_-1,f=(r+1)*(m-1)+_-1,l=(r+1)*(m-1)+_,S=(r+1)*m+_;a.push(g,f,S),a.push(f,l,S)}this.setIndex(a),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ei extends $i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ac,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ua extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class il extends ua{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ls=new rt,$o=new L,Ko=new L;class rl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new na,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;$o.setFromMatrixPosition(e.matrixWorld),t.position.copy($o),Ko.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ko),t.updateMatrixWorld(),Ls.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ls),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ls)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Jo=new rt,Bi=new L,Ds=new L;class g0 extends rl{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Bi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Bi),Ds.copy(n.position),Ds.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ds),n.updateMatrixWorld(),r.makeTranslation(-Bi.x,-Bi.y,-Bi.z),Jo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jo)}}class ha extends ua{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new g0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class _0 extends rl{constructor(){super(new Hc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class v0 extends ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new _0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Zo=new rt;class x0{constructor(e,t,n=0,r=1/0){this.ray=new Ic(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ta,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zo),this}intersectObject(e,t=!0,n=[]){return Ks(e,this,n,t),n.sort(jo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Ks(e[r],this,n,t);return n.sort(jo),n}}function jo(i,e){return i.distance-e.distance}function Ks(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Ks(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qs);function Mn(i){if(!i)return 0;const e=new Set,t=new Set,n=new Set;i.traverse(s=>{s.geometry&&!e.has(s.geometry)&&(e.add(s.geometry),s.geometry.dispose());const a=s.material?Array.isArray(s.material)?s.material:[s.material]:[];for(const o of a)if(!(!o||t.has(o))){t.add(o);for(const c of Object.values(o))c&&c.isTexture&&!n.has(c)&&(n.add(c),c.dispose());o.dispose()}s.isLight&&typeof s.dispose=="function"&&s.dispose()}),i.parent&&i.parent.remove(i);for(const s of i.children.slice())i.remove(s);let r=0;return i.traverse(s=>{s.isMesh&&(r+=1)}),r}function ot(i,e={}){return new Ei({color:i,roughness:.55,metalness:.08,...e})}function Ze(i,e,t=0,n=0,r=0,s,a,o){const c=new Ke(i,e);return c.position.set(t,n,r),s!=null&&c.scale.set(s,a,o),c.castShadow=!0,c}function M0(){const i=new Qe,e=ot(14018287,{roughness:.22,metalness:.1,transparent:!1});return i.add(Ze(new $e(.075,.095,.32,16),e,0,.18,0)),i.add(Ze(new $e(.032,.055,.12,12),e,0,.38,0)),i.add(Ze(new $e(.038,.038,.03,12),ot(12653087,{roughness:.4}),0,.45,0)),i.add(Ze(new $e(.07,.07,.04,16),ot(16050369,{roughness:.3}),0,.08,0)),i.userData.kind="bottle",i}function S0(){const i=new Qe,e=ot(7027226,{roughness:.74});i.add(Ze(new $e(.028,.038,.2,8),e,0,.1,-.08)),i.add(Ze(new ze(.18,.035,.07),e,0,.015,-.08));const t=new Qe;t.position.set(0,.34,0);const n=new Ke(new la(.16,.185,40),ot(9067051,{roughness:.6}));return n.position.z=-.012,t.add(n),[[.16,1118481],[.131,16053492],[.102,13636124],[.073,16250871],[.045,1477170],[.022,14747158]].forEach(([s,a],o)=>{const c=new Ke(new Gr(s,48),new Xt({color:a}));c.position.z=o*.003,t.add(c)}),i.add(t),i.userData.kind="bullseye",i}function y0(){const i=new Qe;i.add(Ze(new Ve(.15,16,14),ot(4114175,{roughness:.22,transparent:!0,opacity:.92}),0,.22,0)),i.add(Ze(new Ve(.03,8,6),ot(4006415),0,.08,0));const t=Ze(new Ri(.025,.008,6,10),ot(4006415),0,.08,0);return t.rotation.x=Math.PI/2,i.add(t),i.userData.kind="balloon",i}function E0(){const i=new Qe;return i.add(Ze(new $e(.15,.16,.26,12),ot(6962716,{roughness:.85}),0,.16,0)),i.add(Ze(new $e(.14,.14,.03,12),ot(15259048,{roughness:.7}),0,.29,0)),i.add(Ze(new $e(.05,.05,.02,10),ot(4006415),0,.305,0)),i.add(Ze(new ze(.04,.08,.03),ot(6042391),.12,.18,.04)),i.userData.kind="wood",i}function w0(){const i=new Qe,e=ot(16765514,{metalness:.92,roughness:.18,emissive:9071120,emissiveIntensity:.35}),t=(n,r,s,a=0)=>{const o=Ze(new $e(.055,.055,.012,16),e,n,r,s);o.rotation.z=a,i.add(o)};return t(0,.08,0,.2),t(.07,.09,.04,-.4),t(-.06,.09,.03,.5),t(.02,.14,-.02,.1),i.add(Ze(new ze(.12,.05,.05),e,-.04,.06,-.05)),i.add(Ze(new ze(.1,.04,.04),e,.06,.055,.06)),i.userData.kind="gold",i}function b0(){const i=new Qe,e=ot(16758472,{roughness:.86}),t=new Ve(1,14,10);return i.add(Ze(t,e,0,.16,0,.16,.15,.14)),i.add(Ze(t,e,0,.32,.04,.11,.1,.11)),i.add(Ze(t,e,-.09,.4,.02,.045,.045,.04)),i.add(Ze(t,e,.09,.4,.02,.045,.045,.04)),i.add(Ze(t,ot(16747720),0,.14,.12,.08,.07,.04)),i.add(Ze(t,ot(1708040),-.035,.34,.13,.016,.02,.016)),i.add(Ze(t,ot(1708040),.035,.34,.13,.016,.02,.016)),i.add(Ze(t,ot(16731533),0,.28,.14,.02,.015,.02)),i.userData.kind="plush",i}function Qo(i){return i==="fair"?M0():i==="boardwalk"?b0():i==="field"?S0():i==="western"?y0():i==="forest"?E0():w0()}function da(){const i=new Qe,e=new Ve(1,12,10);i.add(Ze(e,ot(12653087),0,0,0,.138,.112,.2)),i.add(Ze(e,ot(2001125),0,.088,.1,.08,.075,.08));const t=Ze(e,ot(16044894),-.12,.02,0,.12,.032,.15);t.rotation.z=.45,i.add(t);const n=Ze(e,ot(16044894),.12,.02,0,.12,.032,.15);n.rotation.z=-.45,i.add(n);const r=Ze(new Ci(.038,.11,8),ot(15228164),0,.08,.21);return r.rotation.x=Math.PI/2,i.add(r),i.add(Ze(e,ot(1708040),-.028,.11,.16,.016,.018,.016)),i.add(Ze(e,ot(1708040),.028,.11,.16,.016,.018,.016)),i}function Le(i,e={}){return new Ei({color:i,roughness:.62,metalness:.05,...e})}function we(i,e,t=0,n=0,r=0){const s=new Ke(i,e);return s.position.set(t,n,r),s.castShadow=!1,s.receiveShadow=!0,s}function T0(i,e,t){const n=document.createElement("canvas");n.width=8,n.height=256;const r=n.getContext("2d"),s=r.createLinearGradient(0,0,0,256);s.addColorStop(0,i),s.addColorStop(.52,e),s.addColorStop(1,t),r.fillStyle=s,r.fillRect(0,0,8,256);const a=new $c(n);return a.colorSpace=Ot,a}const ec={fair:{background:9357550,fog:15782576,fogNear:7,fogFar:22,sky:["#1d6eb8","#f7c98a","#f3a56a"],ground:12886362,hemiSky:16769720,hemiGround:9067058,sun:16773580,sunI:1.25,accent:16757082},boardwalk:{background:3842264,fog:12051704,fogNear:8,fogFar:26,sky:["#1565c0","#7ec8f0","#e8f7ff"],ground:14140578,hemiSky:13955583,hemiGround:9267781,sun:16777215,sunI:1.3,accent:5951743},field:{background:9425151,fog:14151876,fogNear:8,fogFar:24,sky:["#3d9ae0","#c6ecff","#e7ffc8"],ground:6795850,hemiSky:15990760,hemiGround:4025138,sun:16774864,sunI:1.2,accent:16747184},western:{background:14916184,fog:15778970,fogNear:6,fogFar:20,sky:["#c4622a","#f0a15a","#ffe0b0"],ground:12880202,hemiSky:16766894,hemiGround:8014370,sun:16769200,sunI:1.4,accent:16757082},forest:{background:2182708,fog:2906686,fogNear:5,fogFar:16,sky:["#0e3324","#3d7a52","#b7d7a4"],ground:4021300,hemiSky:14019780,hemiGround:2372636,sun:16773828,sunI:.72,accent:13035658},seaside:{background:5162708,fog:13168874,fogNear:8,fogFar:26,sky:["#0277bd","#7fd4e4","#fff1c2"],ground:15783844,hemiSky:15202559,hemiGround:12887412,sun:16777215,sunI:1.28,accent:16766314}};function sl(i){return ec[i]||ec.fair}function A0(i){const e=T0(i.sky[0],i.sky[1],i.sky[2]),t=new Ke(new Ve(26,18,12),new Xt({map:e,side:Pt,depthWrite:!1}));return t.frustumCulled=!1,t}function C0(i){const e=we(new Gr(16,28),Le(i,{roughness:.95}),0,0,0);return e.rotation.x=-Math.PI/2,e}function wi(i,e,t,n,r=16777215){const s=new Qe,a=Le(r,{roughness:1,metalness:0});return s.add(we(new Ve(.38,8,6),a,0,0,0)),s.add(we(new Ve(.28,8,6),a,.34,.06,0)),s.add(we(new Ve(.24,8,6),a,-.3,.02,0)),s.position.set(i,e,t),s.scale.setScalar(n),s}function R0(i,e){if(e==="cowboy")i.add(we(new $e(.2,.2,.025,12),Le(6042384),0,1.08,0)),i.add(we(new $e(.11,.12,.11,12),Le(4860430),0,1.15,0));else if(e==="visor"){const t=we(new ze(.22,.02,.12),Le(1710626),0,.98,.1);t.rotation.x=-.45,i.add(t)}else if(e==="straw")i.add(we(new $e(.18,.18,.02,12),Le(15123306),0,1.06,0)),i.add(we(new $e(.1,.11,.08,10),Le(13214286),0,1.12,0));else if(e==="cap")i.add(we(new Ve(.14,12,8,0,Math.PI*2,0,Math.PI/2),Le(12653087),0,1.02,0)),i.add(we(new ze(.16,.018,.1),Le(12653087),0,1,.12));else if(e==="bun"){i.add(we(new Ve(.07,8,6),Le(16050369),0,1.14,-.02));const t=we(new Ri(.045,.012,6,10),Le(16731533),0,1.08,.05);t.rotation.x=Math.PI/2,i.add(t)}else e==="bandana"&&i.add(we(new Ve(.145,10,8,0,Math.PI*2,0,Math.PI/2),Le(10361642),0,1.02,0))}const tc={fair:{skin:5911320,shirt:16044894,pants:2902638,hair:1708040,hat:"cap"},boardwalk:{skin:7027228,shirt:8146431,pants:1710626,hair:1708040,hat:"visor"},field:{skin:15255968,shirt:6045066,pants:4084520,hair:14274756,hat:"straw"},western:{skin:13935988,shirt:9255706,pants:4016682,hair:3875348,hat:"cowboy"},forest:{skin:15978680,shirt:16747720,pants:6961802,hair:16050369,hat:"bun"},seaside:{skin:13935988,shirt:2060123,pants:1710626,hair:1708040,hat:"bandana"}};function P0(i){const e=new Qe,t=Le(i.skin,{roughness:.58}),n=Le(i.shirt,{roughness:.72}),r=Le(i.pants,{roughness:.78}),s=Le(i.hair,{roughness:.8}),a=Le(1708040,{roughness:.3});e.add(we(new dn(.16,.26,4,8),n,0,.62,0)),e.add(we(new dn(.07,.2,3,6),r,-.08,.28,0)),e.add(we(new dn(.07,.2,3,6),r,.08,.28,0));const o=we(new Ve(.14,16,12),t,0,.98,0);e.add(o),e.add(we(new Ve(.145,14,10),s,0,1.04,-.02)),e.add(we(new Ve(.018,8,6),a,-.05,1,.12)),e.add(we(new Ve(.018,8,6),a,.05,1,.12));const c=new Qe;return c.position.set(.18,.78,.02),c.add(we(new dn(.05,.2,3,6),n,.08,-.12,.08)),e.add(c),R0(e,i.hat),e.userData.arm=c,e.userData.head=o,e}function L0(i){const e=Le(10365482,{roughness:.78}),t=Le(16050369,{roughness:.7}),n=we(new ze(3.4,1.7,.16),e,0,1.15,-1.15);i.add(n);const r=we(new ze(1.9,.1,1.3),e,-.7,2.15,-1.15);r.rotation.z=.45;const s=we(new ze(1.9,.1,1.3),e,.7,2.15,-1.15);s.rotation.z=-.45,i.add(r,s),i.add(we(new ze(.7,.9,.08),t,0,.7,-1.04));const a=Le(14070106,{roughness:.95}),o=we(new $e(.28,.28,.42,10),a,-2.15,.22,-.4);o.rotation.z=Math.PI/2;const c=we(new $e(.26,.26,.4,10),a,2.2,.2,-.55);c.rotation.z=Math.PI/2,i.add(o,c),i.add(wi(-3.2,3.4,-4,1.1,16774890)),i.add(wi(2.6,3.7,-5,.85,16774890));const u=we(new Ve(.42,12,10),new Xt({color:16769162}),3.2,3.1,-6);i.add(u)}function D0(i){const e=we(new Rn(18,8),Le(2068164,{roughness:.18,metalness:.25,transparent:!0,opacity:.92}),0,.03,-3.2);e.rotation.x=-Math.PI/2,i.add(e),i.userData.water=e;const t=Le(15194040,{roughness:.8});for(let r=0;r<7;r+=1){const s=we(new ze(3.2,.05,.28),t,0,.06,.8-r*.42);i.add(s)}const n=Le(13206858,{roughness:.84});i.add(we(new $e(.06,.07,1.1,8),n,-1.55,.5,-.2)),i.add(we(new $e(.06,.07,1.1,8),n,1.55,.5,-.2)),i.add(we(new ze(3.3,.08,.08),Le(16777215),0,.95,-.2)),i.add(wi(-2.4,3.2,-6,.9,16777215)),i.add(wi(2.8,3.5,-7,1.15,16777215))}function I0(i){const e=new Ve(.07,6,5),t=Le(16735631,{roughness:.45}),n=new Om(e,t,42),r=new dt,s=new Ye,a=[16735631,16765503,16777215,12938239,16747066];n.instanceColor=new Ws(new Float32Array(126),3);for(let u=0;u<42;u+=1){const h=u%2===0?-1:1;r.position.set(h*(1.5+u%5*.28),.06,-.6-u%7*.45),r.scale.setScalar(.7+u%4*.15),r.updateMatrix(),n.setMatrixAt(u,r.matrix),s.setHex(a[u%a.length]),n.setColorAt(u,s)}n.instanceColor&&(n.instanceColor.needsUpdate=!0),i.add(n);const o=we(new Ve(2.2,14,10),Le(9360234,{roughness:.9}),-3.5,-.6,-6),c=we(new Ve(1.7,14,10),Le(7980124,{roughness:.9}),3.8,-.7,-6.5);i.add(o,c),i.add(wi(0,3.6,-6,1.2)),i.add(we(new Ve(.38,12,10),new Xt({color:16774340}),-2.8,3.3,-7))}function U0(i){const e=Le(9063970,{roughness:.78}),t=we(new ze(3.3,1.8,.14),e,0,1.15,-1.2);i.add(t),i.add(we(new ze(3.5,.28,.2),Le(6042384),0,2.15,-1.15)),i.add(we(new ze(1.2,.22,.16),Le(13214282),0,1.85,-1.08));const n=Le(4099909,{roughness:.7});i.add(we(new dn(.08,.55,3,6),n,-2.05,.45,-.3)),i.add(we(new dn(.07,.4,3,6),n,2.15,.38,-.45));const r=we(new Ve(.55,14,10),new Xt({color:16762218}),2.4,3.2,-6);i.add(r)}function N0(i){const e=Le(5913122,{roughness:.9}),t=Le(3107642,{roughness:.85}),n=Le(4164168,{roughness:.85});[-1.85,1.9].forEach((a,o)=>{i.add(we(new $e(.12,.16,1.5,8),e,a,.75,-1.3)),i.add(we(new Ve(.55,10,8),o?n:t,a,1.7,-1.3))});const r=we(new Ve(3.2,14,10),Le(1919532,{roughness:.9}),0,3.4,-.4);r.scale.set(1.4,.45,1),i.add(r);const s=new ha(16773826,.6,6);s.position.set(.4,2.4,.6),i.add(s)}function F0(i){const e=we(new Rn(18,7),Le(1745080,{roughness:.15,metalness:.3,transparent:!0,opacity:.9}),0,.02,-3.4);e.rotation.x=-Math.PI/2,i.add(e),i.userData.water=e;const t=we(new ze(.9,.22,.4),Le(16052196),2.1,.16,-1.4);t.rotation.z=.08,i.add(t),i.add(we(new $e(.03,.03,.7,6),Le(6962716),2.1,.5,-1.4)),i.add(wi(-2.5,3.3,-6,1)),i.add(we(new Ve(.36,12,10),new Xt({color:16774864}),3.1,3.15,-7))}function O0(i){const e=sl(i),t=new Qe;t.name="round-root",t.userData.theme=i,t.add(A0(e)),t.add(C0(e.ground));const n=new il(e.hemiSky,e.hemiGround,.95),r=new v0(e.sun,e.sunI);r.position.set(-2.5,6.5,3.5);const s=new ha(e.accent,.55,8);s.position.set(.4,1.8,1.4),t.add(n,r,s),i==="fair"?L0(t):i==="boardwalk"?D0(t):i==="field"?I0(t):i==="western"?U0(t):i==="forest"?N0(t):F0(t);const a=P0(tc[i]||tc.fair);if(t.add(a),t.userData.announcer=a,i==="seaside"){const o=da();o.scale.setScalar(.42),o.position.set(-.18,1.08,.04),a.add(o)}return t.userData.tick=o=>{const c=t.userData.water;c&&(c.position.y=.02+Math.sin(o*1.4)*.015)},t}function B0(i=.18){const e=new Qc,t=5;for(let n=0;n<t*2;n+=1){const r=n%2===0?i:i*.42,s=n/(t*2)*Math.PI*2-Math.PI/2,a=Math.cos(s)*r,o=Math.sin(s)*r;n===0?e.moveTo(a,o):e.lineTo(a,o)}return e.closePath(),e}function z0(i){const e=new Qe;if(e.userData.kind="prize",i==="fair"){const n=Le(12653087,{roughness:.42}),r=we(new ze(.32,.1,.025),n,0,0,0);r.rotation.z=.55;const s=we(new ze(.32,.1,.025),n,0,0,0);s.rotation.z=-.55,e.add(r,s);const a=we(new ze(.08,.24,.02),n,0,-.18,0);return e.add(a),e.add(we(new Ve(.05,10,8),Le(16044894,{metalness:.35,roughness:.3}),0,0,.02)),e}if(i==="boardwalk"){const n=we(new Ve(.16,16,12),Le(12053759,{transparent:!0,opacity:.42,roughness:.08}));n.scale.set(.86,1.08,.7),e.add(n);const r=we(new Ve(.07,12,8),Le(16742938,{roughness:.35}),0,-.01,0);r.scale.set(1.45,.65,.5),e.add(r);const s=we(new Ci(.04,.07,6),Le(16742938),.1,-.01,0);return s.rotation.z=-Math.PI/2,e.add(s),e.add(we(new Ve(.035,8,6),Le(16181968),0,.18,0)),e}if(i==="field"){e.add(we(new $e(.012,.014,.28,6),Le(4033074),0,-.02,0));const n=Le(16735631,{roughness:.4});for(let r=0;r<6;r+=1){const s=r/6*Math.PI*2;e.add(we(new Ve(.045,8,6),n,Math.cos(s)*.07,.16,Math.sin(s)*.07))}return e.add(we(new Ve(.04,8,6),Le(16765503),0,.16,0)),e}if(i==="western"){const n=new ca(B0(.2),{depth:.035,bevelEnabled:!1}),r=new Ke(n,Le(14015974,{metalness:.88,roughness:.22}));return e.add(r),e}if(i==="forest"){e.add(we(new $e(.11,.11,.035,16),Le(13213802,{roughness:.55}),0,0,0)),e.add(we(new $e(.07,.07,.02,12),Le(16050369,{roughness:.5}),0,.02,0));const n=we(new ze(.05,.16,.015),Le(9255706),0,-.1,0);return e.add(n),e}const t=we(new $e(.12,.12,.028,20),Le(16765514,{metalness:.92,roughness:.18,emissive:9071120,emissiveIntensity:.35}));return t.rotation.x=Math.PI/2,e.add(t),e}function k0(i,e,t,n,r){i.save(),i.translate(t,n),i.fillStyle={cat:"#f4a261",dog:"#8d6e4c",bird:"#f4d35e",fish:"#2ea8d8",horse:"#5c3317",cow:"#f7f3e8",pig:"#ffb3c1",duck:"#f5d142",frog:"#4caf50",bear:"#6d4c41"}[e]||"#f4d35e",i.strokeStyle="#140c08",i.lineWidth=Math.max(10,r*.06),i.beginPath(),e==="fish"?(i.ellipse(0,0,r*.42,r*.22,0,0,Math.PI*2),i.fill(),i.stroke(),i.beginPath(),i.moveTo(r*.4,0),i.lineTo(r*.62,-r*.18),i.lineTo(r*.62,r*.18),i.closePath(),i.fill(),i.stroke()):e==="bird"||e==="duck"?(i.ellipse(0,r*.06,r*.32,r*.22,0,0,Math.PI*2),i.fill(),i.stroke(),i.beginPath(),i.arc(r*.18,-r*.12,r*.16,0,Math.PI*2),i.fill(),i.stroke()):(i.ellipse(0,r*.06,r*.36,r*.3,0,0,Math.PI*2),i.fill(),i.stroke(),i.beginPath(),i.arc(0,-r*.16,r*.2,0,Math.PI*2),i.fill(),i.stroke()),i.fillStyle="#140c08",i.beginPath(),i.arc(r*.08,-r*.18,r*.035,0,Math.PI*2),i.fill(),i.restore()}const al={cat:"./pics/cat.jpg",dog:"./pics/dog.jpg",bird:"./pics/bird.jpg",fish:"./pics/fish.jpg",horse:"./pics/horse.jpg",cow:"./pics/cow.jpg",pig:"./pics/pig.jpg",duck:"./pics/duck.jpg",frog:"./pics/frog.jpg",bear:"./pics/bear.jpg"},Nr=new Map;function H0(){return Promise.all(Object.entries(al).map(([i,e])=>new Promise(t=>{const n=new Image;n.onload=()=>{Nr.set(i,n),t()},n.onerror=()=>t(),n.src=e})))}function Js(i){const e=String(i||"");return/^https?:\/\//i.test(e)?Nr.get(e)||null:Nr.get(e.toLowerCase())||null}function G0(i){const e=[],t=new Set;for(const n of i||[]){const r=String(n||"").trim();!/^https?:\/\//i.test(r)||t.has(r)||(t.add(r),e.push(r))}return Promise.all(e.map(n=>new Promise(r=>{const s=new Image;s.onload=()=>{Nr.set(n,s),r()},s.onerror=()=>r(),s.src=n})))}function V0(i){return al[String(i||"").toLowerCase()]||null}const Zs='"Nunito", "Noto Sans", "Noto Sans KR", "Noto Sans JP", "Noto Sans SC", "Noto Sans Arabic", "Noto Sans Thai", "Noto Sans Devanagari", sans-serif';function W0(i,e,t){i.fillStyle="#fff8ec",i.fillRect(0,0,e,t),i.fillStyle="rgba(90, 50, 20, 0.05)";for(let n=0;n<50;n+=1)i.fillRect(n*97%e,n*53%t,2,14);i.strokeStyle="#2a160c",i.lineWidth=26,i.strokeRect(16,16,e-32,t-32)}function X0(i,e){const t=Math.max(1,Math.min(10,Math.round(Number(e)||1))),n=t<=3?t:t<=6?3:t<=8?4:5,r=Math.ceil(t/n),s=["#c1121f","#2ec4b6","#e2a322","#ff4d8d","#3d6bff","#e85d04","#7c4dff","#2e9e4f"],a=640/n,o=560/r;for(let c=0;c<t;c+=1){const u=c%n,h=Math.floor(c/n),d=64+u*a+a/2,p=90+h*o+o/2,m=Math.min(a,o)*.32;i.fillStyle=s[c%s.length],i.strokeStyle="#140c08",i.lineWidth=Math.max(8,m*.12),i.beginPath(),i.ellipse(d,p,m,m*1.05,0,0,Math.PI*2),i.fill(),i.stroke(),i.fillStyle="rgba(255,255,255,0.35)",i.beginPath(),i.ellipse(d-m*.28,p-m*.32,m*.2,m*.12,-.4,0,Math.PI*2),i.fill()}}function q0(i,e){const t=e&&e.picture?String(e.picture):"";if(t||e&&e.fromSession){const r=t?Js(t):null;if(r){i.save(),i.beginPath(),i.rect(48,48,672,672),i.clip();const s=Math.min(r.width,r.height),a=(r.width-s)/2,o=(r.height-s)/2;i.drawImage(r,a,o,s,s,48,48,672,672),i.restore()}return}const n=Js(e.animal);if(n){i.save(),i.beginPath(),i.rect(48,48,672,672),i.clip();const r=Math.min(n.width,n.height),s=(n.width-r)/2,a=(n.height-r)/2;i.drawImage(n,s,a,r,r,48,48,672,672),i.restore();return}if(e.n){X0(i,e.n);return}k0(i,e.animal||"cat",384,400,460)}function Y0(i){i.fillStyle="#24160f",i.beginPath(),i.moveTo(230,300),i.lineTo(330,300),i.lineTo(470,190),i.lineTo(470,578),i.lineTo(330,468),i.lineTo(230,468),i.closePath(),i.fill(),i.strokeStyle="#24160f",i.lineWidth=18,i.lineCap="round",i.beginPath(),i.arc(500,384,70,-.8,.8),i.stroke(),i.beginPath(),i.arc(500,384,120,-.7,.7),i.stroke()}function $0(i,e){const t=String(e||"").trim()||"·";i.fillStyle="#1a1008",i.textAlign="center",i.textBaseline="middle";let n=t.length>12?72:t.length>6?96:120;i.font=`900 ${n}px ${Zs}`;const r=640;for(;n>36&&i.measureText(t).width>r;)n-=6,i.font=`900 ${n}px ${Zs}`;const s=t.split(/\s+/),a=[];let o="";for(const h of s){const d=o?`${o} ${h}`:h;i.measureText(d).width<=r?o=d:(o&&a.push(o),o=h)}o&&a.push(o);const c=n*1.15,u=384-(a.length-1)*c/2;a.forEach((h,d)=>{i.fillText(h,384,u+d*c,r)})}function K0(i,e){i.fillStyle="#1a1008",i.textAlign="center",i.textBaseline="middle",i.font=`900 280px ${Zs}`,i.fillText(String(e||""),384,400)}function J0(i){const e=document.createElement("canvas");e.width=768,e.height=768;const t=e.getContext("2d");W0(t,768,768);const n=i&&i.face;n==="picture"?q0(t,i):n==="audio"?Y0(t):n==="digit"?K0(t,i.text||i.n||""):$0(t,i.text||"");const r=new $c(e);return r.colorSpace=Ot,r.anisotropy=4,r.needsUpdate=!0,r}function nc(i,e={}){return new Ei({color:i,roughness:.55,metalness:.06,...e})}function wr(i,e,t=0,n=0,r=0,s,a,o){const c=new Ke(i,e);return c.position.set(t,n,r),c.castShadow=!0,c}const ic={ray:{skin:5911320,skinDark:4006416,nail:2758672,sleeve:16044894,cuff:12653087,ring:16044894,age:0},nia:{skin:7027228,skinDark:4006416,nail:16731533,sleeve:8146431,cuff:1710626,ring:8188159,age:0},walt:{skin:15255968,skinDark:13215098,nail:13939850,sleeve:6040977,cuff:15722184,ring:13214247,age:1},lumber:{skin:13010498,skinDark:9065768,nail:6962716,sleeve:11028498,cuff:2758704,ring:9067054,age:.4},pirate:{skin:13935988,skinDark:11041354,nail:1708040,sleeve:2060123,cuff:12653087,ring:13214247,age:.3},cowboy:{skin:13935988,skinDark:11041354,nail:6962716,sleeve:11028498,cuff:15784352,ring:13214247,age:.2},june:{skin:15978680,skinDark:14725264,nail:16747720,sleeve:16747720,cuff:8146431,ring:16044894,age:1}};function Z0(i){return ic[i]||ic.ray}function br(i,e){const t=Z0(i),n=new Qe,r=nc(t.skin),s=nc(t.sleeve),a=wr(new $e(.032,.04,.28,10),s,-.02,-.06,.1);a.rotation.z=.35,a.rotation.x=.35,n.add(a),n.add(wr(new Ve(.05,12,10),r,.02,.04,-.02)),n.add(wr(new ze(.1,.055,.12),r,.02,.05,-.1));for(let c=0;c<4;c+=1)n.add(wr(new dn(.012,.05,3,6),r,-.03+c*.018,.07,-.17));e&&(e.position.set(.02,.06,-.2),n.add(e));const o=new dt;return o.position.set(.02,.06,-.26),n.add(o),n.userData.nozzle=o,n}function ct(i,e={}){return new Ei({color:i,roughness:.5,metalness:.1,...e})}function _t(i,e,t=0,n=0,r=0,s,a,o){const c=new Ke(i,e);return c.position.set(t,n,r),c.castShadow=!0,c}function rc(){const i=new Qe;return i.add(_t(new ze(.08,.045,.07),ct(12653087,{roughness:.9}))),i.add(_t(new ze(.07,.02,.06),ct(16050369,{roughness:.9}),0,.018,0)),i}function ol(){const i=new Qe,e=_t(new $e(.012,.016,.28,8),ct(6962716));e.rotation.x=.2,i.add(e);const t=_t(new ze(.14,.08,.03),ct(9082012,{metalness:.75,roughness:.28}),.02,.12,0);return i.add(t),i.add(_t(new ze(.04,.09,.025),ct(11581632,{metalness:.7,roughness:.25}),-.05,.12,0)),i}function j0(){const i=new Qe,e=ct(16765503,{roughness:.35}),t=ct(3057880,{roughness:.3,metalness:.15});i.add(_t(new ze(.09,.08,.18),e,0,0,.02));const n=_t(new $e(.02,.028,.34,12),t,0,.02,-.22);n.rotation.x=Math.PI/2,i.add(n),i.add(_t(new Ve(.07,14,12),ct(6087142,{transparent:!0,opacity:.7,roughness:.15}),.01,.1,.04));const r=_t(new ze(.055,.15,.06),ct(15228164),0,-.11,.04);r.rotation.x=.32,i.add(r);const s=_t(new Ri(.022,.006,6,10),ct(1708040),0,-.03,0);s.rotation.y=Math.PI/2,i.add(s);const a=new dt;return a.position.set(0,.02,-.4),i.add(a),i.userData.nozzle=a,i}function Q0(){const i=new Qe,e=ct(6962716,{roughness:.5}),t=_t(new Ri(.13,.01,7,22,Math.PI*1.05),e,.05,.02,-.02);t.rotation.set(.15,1.2,.35),i.add(t),i.add(_t(new $e(.012,.014,.055,8),ct(4006415),.02,.01,0));const n=_t(new $e(.004,.004,.26,6),ct(6042391),.03,.03,-.12);n.rotation.x=Math.PI/2,i.add(n);const r=_t(new Ci(.009,.028,8),ct(12634320,{metalness:.75}),.03,.03,-.26);r.rotation.x=-Math.PI/2,i.add(r),i.add(_t(new ze(.028,.007,.03),ct(12653087),.03,.04,-.02));const s=new dt;return s.position.set(.03,.03,-.28),i.add(s),i.userData.nozzle=s,i}function eg(){const i=new Qe,e=ct(1842210,{metalness:.82,roughness:.22}),t=ct(6962716,{roughness:.65});i.add(_t(new ze(.07,.085,.16),e,0,.03,.02));const n=_t(new $e(.02,.022,.38,12),e,0,.04,-.24);n.rotation.x=Math.PI/2,i.add(n),i.add(_t(new $e(.055,.055,.055,12),e,0,.03,.04)),i.add(_t(new ze(.02,.04,.03),e,0,.09,.08));const r=_t(new ze(.055,.16,.07),t,0,-.1,.07);r.rotation.x=.42,i.add(r),i.add(_t(new ze(.06,.02,.08),ct(13214247,{metalness:.6}),0,-.02,.08));const s=new dt;return s.position.set(0,.04,-.44),i.add(s),i.userData.nozzle=s,i.userData.muzzle=s,i}function tg(i,e,t="ray"){for(;i.children.length;)i.remove(i.children[0]);i.userData.ammo=e,i.userData.carny=t;let n;for(e==="beanbags"?n=br(t,rc()):e==="parrot"?n=br(t,da()):e==="axe"?n=br(t,ol()):e==="water"?n=j0():e==="bow"?n=Q0():e==="gun"?n=eg():n=br(t,rc());n.children.length;)i.add(n.children[0]);if(i.userData.nozzle=n.userData.nozzle,!i.userData.nozzle){const r=new dt;r.position.set(0,.02,-.3),i.add(r),i.userData.nozzle=r}}function ng(i){return i==="water"?10:1}function ig(i){if(i==="beanbags"){const e=new Qe;return e.add(new Ke(new ze(.09,.05,.08),ct(12653087,{roughness:.9}))),e.add(new Ke(new ze(.08,.02,.07),ct(16050369,{roughness:.9}))),e.children[1].position.y=.02,e}if(i==="parrot")return da();if(i==="axe"){const e=ol();return e.scale.setScalar(1.35),e}if(i==="bow"){const e=new Qe,t=new Ke(new $e(.018,.02,.5,8),ct(4860946,{roughness:.42}));t.rotation.x=-Math.PI/2,e.add(t);const n=new Ke(new Ci(.036,.1,8),ct(15199990,{metalness:.86,roughness:.16}));n.rotation.x=-Math.PI/2,n.position.z=-.28,e.add(n);const r=ct(12653087,{roughness:.4}),s=new Ke(new ze(.09,.012,.07),r);s.position.z=.16,e.add(s);const a=new Ke(new ze(.012,.09,.07),r);return a.position.z=.16,e.add(a),e}return i==="gun"?new Ke(new Ve(.012,8,6),ct(16769162,{emissive:16761933,emissiveIntensity:1.6,metalness:.4})):new Ke(new Ve(.016,8,6),ct(8050687,{transparent:!0,opacity:.85,roughness:.15,emissive:3842303,emissiveIntensity:.55}))}function sc(i){return i==="water"?8050687:i==="gun"?16761933:i==="bow"?16050369:i==="axe"?13214247:i==="parrot"?16757575:12653087}function rg(i){return i==="beanbags"||i==="parrot"||i==="axe"?.2:i==="water"?.12:i==="bow"?.1:i==="gun"?.07:.2}const ac={beanbags:[.15,-.34,-.85,.55,-.2,.35,.46],water:[.16,-.33,-.9,.35,-.25,0,.36],bow:[.15,-.32,-.88,.4,-.35,-.2,.5],gun:[.16,-.33,-.9,.28,-.22,0,.32],axe:[.15,-.32,-.86,.5,-.15,.4,.4],parrot:[.14,-.3,-.85,.2,-.1,.1,.3]};function oc(i){return 1-(1-i)**3}function sg(i){const e=new Im({antialias:!0,alpha:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1}),t=Math.min(window.innerWidth||390,window.innerHeight||844)<520;e.setPixelRatio(Math.min(t?1.5:1.75,window.devicePixelRatio||1)),e.setClearColor(9357550,1),e.outputColorSpace=Ot,e.toneMapping=vc,e.toneMappingExposure=1.05,e.shadowMap.enabled=!1,i.appendChild(e.domElement);const n=document.createElement("div");n.className="curtain",i.appendChild(n);const r=new Um;r.fog=new ra(15782576,7,22),r.add(new il(14150911,8413248,.35));const s=new Bt(50,1,.05,60);r.add(s);const a=new x0,o=new de,c=new L,u=new L,h=new L;let d=null,p=null,m=[],_=[],g=null,f=null,l=null,S=null,x=null,y=!1,N=!1,C=0,R=0,D=0,w={kind:"idle",t:0};const M=[];function P(){const X=i.clientWidth||window.innerWidth,H=i.clientHeight||window.innerHeight;e.setSize(X,H,!1),s.aspect=X/Math.max(1,H);const Q=s.aspect<.85;s.fov=Q?50:40,s.position.set(0,Q?1.18:1.32,Q?4.45:5.15),s.lookAt(0,1.02,0),s.updateProjectionMatrix(),q(),B(!1)}function q(){const X=s.aspect<.85,H=5,Q=Math.max(1,Math.ceil(m.length/H)),T=X?.4:.52;m.forEach((G,$)=>{const A=$%H,U=Math.floor($/H);let z,se;Q<=2?(z=U===0?X?1.28:1.42:X?.68:.76,se=U===0?-.08:.1):(z=(X?1.55:1.7)-U*(X?1.15:1.25)/(Q-1),se=-.05+U*.05),G.anchor.position.set((A-2)*T,z,se)})}function B(X){const H=p&&p.userData.announcer;if(!H||X)return;s.aspect<.85?(H.position.set(.05,0,-1.25),H.scale.setScalar(.72),H.rotation.y=.05):(H.position.set(-1.95,0,.05),H.scale.setScalar(1.05),H.rotation.y=.5),H.userData.baseY=H.position.y}function K(){if(!g||!d)return;const X=ac[d.ammo]||ac.beanbags;g.position.set(X[0],X[1],X[2]+R*.07),g.rotation.set(X[3],X[4],X[5]),g.scale.setScalar(X[6])}function j(X,H){g&&(s.remove(g),Mn(g),g=null),g=new Qe,tg(g,X,H),g.visible=!0,s.add(g),K()}function Y(){l=null,f&&(Mn(f),f=null)}function te(){y=!1,Y(),S&&(r.remove(S),typeof S.dispose=="function"&&S.dispose(),S=null),x&&(Mn(x),x=null),p&&(Mn(p),p=null),m=[],_=[],M.length=0}function J(X){const H={fair:6962716,boardwalk:16052196,field:4025138,western:6042391,forest:4863012,seaside:14140578},Q=new Ke(new $e(.045,.055,.08,8),new Ei({color:H[X]||6962716,roughness:.86}));return Q.position.y=.03,Q}function _e(X){const H=new Qe;H.userData.kind="face";const Q=J0(X),T=X.face==="picture",G=T?.56:.5,$=T?.56:.4,A=new Ke(new Rn(G,$),new Xt({map:Q}));return A.position.set(0,.32,.02),H.add(A),H}function Me(X,H){X.body&&(Mn(X.body),X.body=null),X.body=H,H&&X.anchor.add(H)}function ve(X){return X==="field"?1.15:X==="seaside"?1.7:1.42}function Ue(X,H){const Q=ve(H);(X||[]).slice(0,10).forEach(T=>{const G=new Qe;G.add(J(H));const $=new Ke(new Ve(H==="field"?.22:.2,8,6),new Xt({transparent:!0,opacity:0,depthWrite:!1}));$.position.set(0,H==="field"?.34*Q:.3,.04),$.userData.uid=T.uid,G.add($);const A=Qo(H);A.scale.setScalar(Q),G.add(A),p.add(G),_.push($),m.push({uid:T.uid,spec:T,anchor:G,body:A,hit:$,down:!1})}),q()}function We(X){C+=1;const H=d&&d.theme||"fair";te(),p=O0(H),r.add(p);const Q=sl(H);r.background=new Ye(Q.background),r.fog.color.setHex(Q.fog),r.fog.near=Q.fogNear,r.fog.far=Q.fogFar,e.setClearColor(Q.background,1),typeof document<"u"&&document.documentElement.setAttribute("data-arena",H),Ue(X,H),B(!1),g&&(g.visible=!0)}function Z(X){return m.find(H=>H.uid===X)||null}function ce(X,H){if(!p)return;const Q=[];for(let T=0;T<7;T+=1){const G=new Ke(new Ve(.028,6,5),new Ei({color:H,roughness:.4}));G.position.copy(X),p.add(G),Q.push({m:G,v:new L((Math.random()-.5)*1.5,.8+Math.random()*.8,(Math.random()-.5)*1.2)})}M.push({t:0,dur:.38,step(T,G){for(const $ of Q)$.m.parent&&($.v.y-=3.2*G,$.m.position.addScaledVector($.v,G))},done(){for(const T of Q)Mn(T.m)}})}function Se(X){const H=M.splice(0,M.length);for(const Q of H){Q.t+=X;const T=Math.min(1,Q.t/Q.dur);Q.step(T,X),T<1?M.push(Q):Q.done&&Q.done()}}return P(),{renderer:e,scene:r,camera:s,dom:e.domElement,epoch(){return C},setSign(){},setVoice(){},setRound(X){d=X||d;const H=d&&d.ammo||"beanbags",Q=d&&d.look||d&&d.carny||"ray";j(H,Q)},setCards(X){We(X||[])},clearRound:te,pick(X,H){if(y||N)return null;const Q=e.domElement.getBoundingClientRect();o.x=(X-Q.left)/Q.width*2-1,o.y=-((H-Q.top)/Q.height)*2+1,a.setFromCamera(o,s);const T=a.intersectObjects(_,!1);for(const G of T)if(G.object.userData.uid)return G.object.userData.uid;return null},sprayTo(X,H){const Q=Z(X);if(!Q||y){H&&H();return}const T=C,G=new L;Q.hit.getWorldPosition(G);const $=new L;g&&g.userData.nozzle?g.userData.nozzle.getWorldPosition($):g?g.getWorldPosition($):$.set(.4,.4,3),Y();const A=d&&d.ammo||"beanbags";f=new Qe;const U=Math.max(1,ng(A));for(let z=0;z<U;z+=1)f.add(ig(A));r.add(f),A==="gun"&&(S=new ha(16765562,5,2.4),S.position.copy($),r.add(S)),R=1,l={t:0,dur:rg(A),from:$,to:G,ammo:A,epochAt:T,done:!1,onHit:H}},spinOff(X){const H=Z(X);if(!H||H.down)return;H.down=!0;const Q=new L;H.anchor.getWorldPosition(Q);const T=d&&d.ammo||"beanbags";ce(Q,sc(T)),Me(H,_e(H.spec))},restoreHidden(X){const H=d&&d.theme||"fair";for(const Q of X||[]){const T=Z(Q);if(!T)continue;const G=Qo(H);G.scale.setScalar(ve(H)),Me(T,G),T.down=!1}},removeMatched(X){for(const H of X||[]){const Q=m.findIndex($=>$.uid===H);if(Q<0)continue;const T=m[Q],G=new L;T.anchor.getWorldPosition(G),ce(G,16769162),Mn(T.anchor),m.splice(Q,1),_=_.filter($=>$.userData.uid!==H)}},handReturn(X){for(const H of X||[]){const Q=Z(H);if(!Q)continue;const T=Q.anchor.rotation.z;M.push({t:0,dur:.45,step(G){Q.anchor.parent&&(Q.anchor.rotation.z=T+Math.sin(G*Math.PI*3)*.12)},done(){Q.anchor.parent&&(Q.anchor.rotation.z=0)}})}},sparkle(X){for(const H of X||[]){const Q=Z(H);if(!Q)continue;const T=new L;Q.anchor.getWorldPosition(T),ce(T,16769162)}},carnyHit(){w={kind:"hit",t:0}},carnyMiss(){w={kind:"miss",t:0}},celebrate(){w={kind:"win",t:0}},presentPrize(X,H={}){return new Promise(Q=>{y=!0,g&&(g.visible=!1);const T=p&&p.userData.announcer,G=s.aspect<.85,$=G?new L(-.15,0,1.55):new L(-.7,0,1.25),A=T?T.position.clone():new L,U=z0(X);if(U.scale.setScalar(H.big?1.85:1.45),x=new Qe,x.add(U),r.add(x),H.big)for(let ae=0;ae<18;ae+=1){const be=new Ke(new Rn(.06,.1),new Xt({color:[12653087,16044894,3065014,16775404,16731533][ae%5],side:Zt}));be.position.set((Math.random()-.5)*1.4,2.2+Math.random(),1.4),be.userData.v=new L((Math.random()-.5)*.4,.4+Math.random()*.5,0),x.add(be)}const z=new L,se=new L(.05,G?1.45:1.55,G?2.15:2.35);M.push({t:0,dur:H.big?1.25:.95,step(ae,be){const b=oc(Math.min(1,ae/.45));T&&(T.position.lerpVectors(A,$,b),T.userData.arm&&(T.userData.arm.rotation.x=-1.15*b),T.userData.arm?T.userData.arm.getWorldPosition(z):z.copy(T.position));const v=Math.max(0,(ae-.28)/.72);U.position.lerpVectors(z,se,oc(v)),U.rotation.y=ae*Math.PI*2,H.big&&x.children.forEach(k=>{k.userData.v&&(k.userData.v.y-=be*.7,k.position.addScaledVector(k.userData.v,be),k.rotation.z+=be*3)})},done(){Q()}})})},cover(X=820){return N=!0,n.style.transitionDuration=`${X}ms`,n.classList.add("on"),new Promise(H=>setTimeout(H,X))},uncover(X=820){return n.style.transitionDuration=`${X}ms`,n.classList.remove("on"),new Promise(H=>{setTimeout(()=>{N=!1,H()},X)})},resize:P,render(X){D+=X,R=Math.max(0,R-X*3.2),K(),p&&p.userData.tick&&p.userData.tick(D);const H=p&&p.userData.announcer;if(H&&!y){const Q=H.userData.baseY||0;H.position.y=Q+Math.sin(D*2.1)*.015,H.userData.head&&(H.userData.head.rotation.z=Math.sin(D*1.3)*.05),w.t+=X,w.kind==="hit"?(H.userData.arm&&(H.userData.arm.rotation.z=-.6),w.t>.6&&(w.kind="idle")):w.kind==="miss"?(H.userData.head&&(H.userData.head.rotation.x=Math.sin(w.t*16)*.08),w.t>.7&&(w.kind="idle",H.userData.head&&(H.userData.head.rotation.x=0))):H.userData.arm&&(H.userData.arm.rotation.z=Math.sin(D*1.6)*.08,H.userData.arm.rotation.x=0)}if(Se(X),S&&(S.intensity=Math.max(0,S.intensity-X*18),S.intensity<=0&&(r.remove(S),S=null)),l&&f){l.t+=X;const Q=Math.min(1,l.t/l.dur),T=l.ammo==="bow"||l.ammo==="gun"?.03:l.ammo==="water"?.1:.32;h.set((l.from.x+l.to.x)/2,Math.max(l.from.y,l.to.y)+T,(l.from.z+l.to.z)/2),f.children.forEach((G,$)=>{const A=f.children.length===1?Q:Math.max(0,Math.min(1,Q*1.15-$*.07));G.visible=A>0&&A<1.001;const U=1-A;u.set(U*U*l.from.x+2*U*A*h.x+A*A*l.to.x,U*U*l.from.y+2*U*A*h.y+A*A*l.to.y,U*U*l.from.z+2*U*A*h.z+A*A*l.to.z),G.position.copy(u),l.ammo==="bow"?G.lookAt(l.to):l.ammo==="axe"?G.rotation.z+=X*14:(l.ammo==="beanbags"||l.ammo==="parrot")&&(G.rotation.x+=X*9)}),Q>=1&&!l.done&&(l.done=!0,ce(l.to,sc(l.ammo)),l.epochAt===C&&l.onHit&&l.onHit()),l&&l.t>l.dur+.12&&Y()}e.render(r,s)},debugUids(){return m.map(X=>X.uid)},debugHits(){const X=e.domElement.getBoundingClientRect();return m.map(H=>(H.hit.getWorldPosition(c),c.project(s),{uid:H.uid,face:H.spec.face,animal:H.spec.animal||"",kind:H.body&&H.body.userData.kind||"",x:(c.x*.5+.5)*X.width+X.left,y:(-c.y*.5+.5)*X.height+X.top}))},census(){const X={};return r.traverse(H=>{const Q=H.userData&&H.userData.kind;Q&&(X[Q]=(X[Q]||0)+1)}),{theme:p&&p.userData.theme,kinds:X,meshes:ag(r)}},dispose(){te(),g&&Mn(g),e.dispose(),e.domElement.parentNode&&e.domElement.parentNode.removeChild(e.domElement),n.parentNode&&n.parentNode.removeChild(n)}}}function ag(i){let e=0;return i.traverse(t=>{t.isMesh&&(e+=1)}),e}const cc="4.2.0",bn="memory-match",Fr="memory-game",Sn=6,og=780,cg="mrj.play_mode",cl="mrj.leaderboard.v1",ll="mrj.student.queue.v1",ul="mrj.ui_locale",hl="mrj.teacher_skip",dl="mrj.player_name",lg="./packs/animals-1-10.json",ug="./packs/ui-l1.json",hg="mrj.wm.gamepack",dg={"zh-Hans":"zh","pt-BR":"pt"},lc=[{index:1,ammo:"beanbags",carny:"ray",look:"ray",label:"Bean bags",carnyName:"Coach Ray",theme:"fair"},{index:2,ammo:"water",carny:"nia",look:"nia",label:"Water gun",carnyName:"Nia",theme:"boardwalk"},{index:3,ammo:"bow",carny:"walt",look:"walt",label:"Longbow",carnyName:"Grandpa Walt",theme:"field"},{index:4,ammo:"gun",carny:"cowboy",look:"cowboy",label:"Gallery gun",carnyName:"Cowboy Dusty",theme:"western"},{index:5,ammo:"axe",carny:"june",look:"june",label:"Spinning axe",carnyName:"Grandma June",theme:"forest"},{index:6,ammo:"parrot",carny:"pirate",look:"pirate",label:"Parrot toss",carnyName:"Captain Pop",theme:"seaside"}],fg=[{index:1,a:"picture",b:"audio"},{index:2,a:"picture",b:"word"},{index:3,a:"audio",b:"word"},{index:4,a:"audio",b:"meaning"},{index:5,a:"meaning",b:"word"},{index:6,a:"meaning",b:"audio"}];function Pi(){try{if(typeof localStorage<"u")return localStorage}catch{}return null}function pg(i=typeof location<"u"?location.search:""){const t=new URLSearchParams(i).get("pack");return t&&t.trim()?t.trim():lg}function mg(i=typeof location<"u"?location.search:""){const e=new URLSearchParams(i||"");return e.get("embed")==="1"||e.get("student")==="1"}function gg(i=""){const e=new URLSearchParams(i||"");for(const t of["locale","lang","ui_locale"]){const n=e.get(t);if(!n)continue;const r=String(n).trim();if(r)return r}return""}function _g(i){const e=String(i||"");return dg[e]||e}function Or(i){return/^https?:\/\//i.test(String(i||"").trim())}function vg(i=typeof location<"u"?location.search:""){return(new URLSearchParams(i||"").get("pack")||"").trim()==="session"}function xg(i){if(i==null||String(i).trim()==="")throw new Error("Session pack is empty");let e;try{e=typeof i=="string"?JSON.parse(i):i}catch{throw new Error("Session pack is empty")}if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Session pack is empty");const t=Array.isArray(e.items)?e.items:[],n=[];for(const s of t){if(!s||typeof s!="object")continue;const a=String(s.en||"").trim();if(!a)continue;const o=String(s.id||a).trim();if(!o)continue;const c=s.l1&&typeof s.l1=="object"&&!Array.isArray(s.l1)?s.l1:{},u={id:o,en:a,l1:c,from_session:!0};Or(s.audio_id)&&(u.audio_id=String(s.audio_id).trim()),Or(s.picture)&&(u.picture=String(s.picture).trim()),n.push(u)}const r={pack_id:e.pack_id||"session",title:e.title||"Memory Game",module_id:e.module_id||bn,activity_id:Fr,ui_locale:e.ui_locale||"",items:n};return fl(r),r}function Mg(i){let e=null;try{typeof i=="function"||typeof sessionStorage<"u"&&(e=sessionStorage.getItem(hg))}catch{e=null}if(e==null||String(e).trim()==="")throw new Error("Session pack is empty");return xg(e)}function Sg(i=typeof location<"u"?location.search:""){const e=new URLSearchParams(i);return e.get("student")||e.get("student_id")||"local-student"}async function Is(i){const e=await fetch(i,{cache:"no-store"});if(!e.ok)throw new Error(`Load failed (${e.status}): ${i}`);return e.json()}function fl(i){if(!i||typeof i!="object")throw new Error("Invalid pack");if(!Array.isArray(i.items)||i.items.length===0)throw new Error("Invalid pack: items[] required");for(const e of i.items){if(!e||!e.id)throw new Error("Invalid pack item: id required");if(!e.en)throw new Error(`Invalid pack item ${e.id}: en required`)}return!0}function pl(i,e=Math.random){const t=i.slice();for(let n=t.length-1;n>0;n-=1){const r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}function uc(i="id"){return typeof crypto<"u"&&crypto.randomUUID?`${i}_${crypto.randomUUID()}`:`${i}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,10)}`}function ut(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ar(i){const e=Math.max(0,Math.floor(Number(i)||0)),t=Math.floor(e/6e4),n=Math.floor(e%6e4/1e3),r=Math.floor(e%1e3/10);return`${t}:${String(n).padStart(2,"0")}.${String(r).padStart(2,"0")}`}function ml(i){return i&&i.n!=null&&i.n!==""?String(i.n):""}function fa(i,e){const t=i&&i.l1||{};return e&&t[e]?String(t[e]):""}function yg(i,e){if(e&&e!=="en"){const t=fa(i,e);if(t)return{kind:"l1",text:t}}return{kind:"digit",text:ml(i)}}function Eg(i,e,t){const n=i&&i.n!=null?Number(i.n):0,r=i&&i.audio_id||"",s=i&&(i.animal||i.id)||"";if(e==="meaning"){const a=yg(i,t);return{kind:a.kind,text:a.text,n,audioId:r,animal:s}}return e==="word"?{kind:"word",text:i.en?String(i.en):"",n,audioId:r,animal:s}:e==="audio"?{kind:"audio",text:"",n,audioId:r,animal:s}:e==="picture"?{kind:"picture",text:"",n,audioId:r,animal:s,picture:Or(i&&i.picture)?String(i.picture).trim():"",fromSession:!!(i&&i.from_session)}:e==="digit"?{kind:"digit",text:ml(i),n,audioId:r}:e==="l1"?{kind:"l1",text:fa(i,t),n,audioId:r}:{kind:e||"word",text:"",n,audioId:r}}function Kt(i){const e=fg[i-1];if(!e)throw new Error(`Round ${i} out of range (1–${Sn})`);const t=lc[i-1]||lc[0];return{...e,...t}}function wg(i){const e=Kt(i);return`lesson_${e.a}_${e.b}`}function bg(i,e){const t=Array.isArray(i&&i.skill_tags)?i.skill_tags:[],n=Array.isArray(e&&e.skill_tags)?e.skill_tags:[];return[...t,...n]}function hc(i,e=Math.random){const n=pl(i.items||[],e);if(n.length<1)throw new Error("Pack needs at least 1 item");const r=n.length>=10?n.slice(0,10):n.slice();return r.length<=5?{heatA:r,heatB:[],heatPairs:r.length,heatCount:1}:{heatA:r.slice(0,5),heatB:r.slice(5,10),heatPairs:5,heatCount:2}}function Us(i,e,t,n,r=Math.random){const s=[];for(const a of i)for(const o of[e.a,e.b]){const c=Eg(a,o,t),u=Or(a&&a.picture)?String(a.picture).trim():"";s.push({uid:`${a.id}::${o}::${c.kind}`,itemId:a.id,role:o,face:c.kind,text:c.text,n:c.n,audioId:c.audioId,animal:c.animal||a.animal||a.id,picture:u,fromSession:!!(a&&a.from_session),l1:fa(a,t),skill_tags:bg(n,a),down:!1})}return pl(s,r).map((a,o)=>({...a,slot:o}))}function dc(i,e){return!i||!e||i.uid===e.uid||i.itemId!==e.itemId?!1:i.role!==e.role}function Ns(i){if(i==null)return null;const e=String(i).trim();return!e||e.toLowerCase()==="null"?null:/^(https?:)?\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:")||e.startsWith("./")||e.startsWith("/")?e:/\.[a-z0-9]{2,4}$/i.test(e)?`./audio/${e}`:`./audio/${e}.mp3`}function Tg(i,e,t){const n=i&&i.strings||{},r=_g(e),s=r&&n[r]||{};return s[t]!=null?String(s[t]):n.en&&n.en[t]!=null?String(n.en[t]):t}function Ag(i,e){return(i&&i.locales||[]).find(n=>n&&n.code===e)||{code:e,label:e,rtl:!1}}function Wr(i,e){const t=Pi();if(t)try{t.setItem(i,e)}catch{}}function pa(i,e=""){const t=Pi();if(!t)return e;try{const n=t.getItem(i);return n??e}catch{return e}}function Cg(i="en"){return pa(ul,i)||i}function Rg(i){Wr(ul,i)}function Pg(i=!0){const e=pa(hl,"");return e==="0"||e==="false"?!1:e==="1"||e==="true"?!0:i}function Lg(i){Wr(hl,i?"1":"0")}function Dg(i="Player"){return pa(dl,i)||i}function fc(i){Wr(dl,i)}function Ig(){try{if(typeof location<"u"&&(new URLSearchParams(location.search).get("mode")||"").toLowerCase()==="maker")return"maker"}catch{}return"student"}function pc(i){Wr(cg,i==="maker"?"maker":"student")}function gl(){const i=Pi();if(!i)return[];try{const e=JSON.parse(i.getItem(cl)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Ug({module_id:i,name:e,total_ms:t,rounds:n,at:r}={}){const s={module_id:i||bn,name:e&&String(e).trim()||"Player",total_ms:Math.max(0,Math.round(Number(t)||0)),rounds:Number(n)||Sn,at:r||new Date().toISOString()},a=gl();a.push(s);const o=Pi();if(o)try{o.setItem(cl,JSON.stringify(a))}catch{}return s}function Ng(i=bn){return gl().filter(e=>e&&e.module_id===i).slice().sort((e,t)=>e.total_ms-t.total_ms||String(e.at).localeCompare(String(t.at))).slice(0,10)}function Fg(){const i=Pi();if(!i)return[];try{const e=JSON.parse(i.getItem(ll)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Og(i){const e=Pi();if(e)try{e.setItem(ll,JSON.stringify(i.slice(-2e3)))}catch{}}function Bg({studentId:i="local-student",sessionId:e,uiLocale:t="en"}={}){const n=Fg();function r(s={}){const a={student_id:i,session_id:e,module_id:bn,activity_id:Fr,item_id:"",skill_tags:[],response:"",correct:!1,latency_ms:0,accuracy:0,points:0,errors:0,started_at:new Date().toISOString(),ended_at:new Date().toISOString(),ui_locale:t,round_index:0,total_ms:0,...s};return n.push(a),Og(n),console.log("[memory-match record]",a),typeof window<"u"&&window.dispatchEvent(new CustomEvent("mrj-memory-match-record",{detail:a})),a}return{emit:r,queue:n,setLocale(s){t=s},setSession(s){e=s}}}function zg(){let i=null,e=null,t=null,n=!1,r="cowboy";const s=new Map,a=new Map;let o=null;function c(){if(i)return i.state==="suspended"&&i.resume().catch(()=>{}),i;const l=window.AudioContext||window.webkitAudioContext;if(!l)return null;i=new l,e=i.createGain(),e.gain.value=.78,e.connect(i.destination),t=i.createGain(),t.gain.value=1,t.connect(e);const S=i.createBuffer(1,i.sampleRate,i.sampleRate),x=S.getChannelData(0);for(let y=0;y<x.length;y+=1)x[y]=Math.random()*2-1;return o=S,i}async function u(l){const S=Ns(l);if(!S)return null;if(s.has(l))return s.get(l);if(a.has(l))return a.get(l);const x=(async()=>{const y=c();if(!y)return null;try{const N=await fetch(S);if(!N.ok)return s.set(l,!1),!1;const C=await N.arrayBuffer(),R=await y.decodeAudioData(C.slice(0));return s.set(l,R),R}catch{return null}})();return a.set(l,x),x}function h(l,S=1,x=1){if(n||!l)return!1;const y=c();if(!y||!t)return!1;const N=y.createBufferSource(),C=y.createGain();return N.buffer=l,N.playbackRate.value=x,C.gain.value=S,N.connect(C),C.connect(t),N.start(),!0}async function d(l,S=1){if(n||!l)return!1;const x=c();if(x)try{const y=await fetch(l);if(!y.ok)return!1;const N=await x.decodeAudioData((await y.arrayBuffer()).slice(0));if(h(N,S))return!0}catch{}try{const y=new Audio(l);return y.volume=Math.min(1,S),await y.play(),!0}catch{return!1}}async function p(l,S=1){if(n||!l)return!1;const x=await u(l);if(x===!1)return!1;if(x&&h(x,S))return!0;const y=Ns(l);if(!y)return!1;try{const N=new Audio(y);return N.volume=Math.min(1,S),await N.play(),!0}catch{return!1}}function m(l){const S=l?8:4;for(let x=0;x<S;x+=1)f(.05,l?.28:.18,x*.08,700,2800)}async function _(l,S=.95){const x=Math.random()<.5?"1":"2";if(l==="win")return d("./audio/prize/applause.mp3",S);const y=l==="round"?`carnies/${r}-round`:`carnies/${r}-${l}-${x}`;return p(y,S)}function g(l,S,x,y,N=0,C=0){if(n)return;const R=c();if(!R||!t)return;const D=R.currentTime+N,w=R.createOscillator(),M=R.createGain();w.type=x,w.frequency.setValueAtTime(l,D),C&&w.frequency.exponentialRampToValueAtTime(Math.max(40,l+C),D+S),M.gain.setValueAtTime(1e-4,D),M.gain.exponentialRampToValueAtTime(y,D+.012),M.gain.exponentialRampToValueAtTime(1e-4,D+S),w.connect(M),M.connect(t),w.start(D),w.stop(D+S+.02)}function f(l,S,x=0,y=400,N=2400){if(n)return;const C=c();if(!C||!t||!o)return;const R=C.currentTime+x,D=C.createBufferSource();D.buffer=o,D.loop=!0;const w=C.createBiquadFilter();w.type="bandpass",w.frequency.setValueAtTime(N,R),w.frequency.exponentialRampToValueAtTime(y,R+l),w.Q.value=.7;const M=C.createGain();M.gain.setValueAtTime(S,R),M.gain.exponentialRampToValueAtTime(1e-4,R+l),D.connect(w),w.connect(M),M.connect(t),D.start(R),D.stop(R+l+.02)}return{unlock(){c()},setCarny(l){r=l||"cowboy"},preload(l){return Promise.all((l||[]).map(S=>u(S)))},playFile:p,word(l){const S=String(l||"").replace(/\.mp3$/i,""),x=Ns(S);return x?d(x,1).then(y=>({ok:y,fallback:!1})):Promise.resolve({ok:!1,fallback:!1})},carnyHit(){return _("hit",.95)},carnyMiss(){return _("miss",.95)},carnyRound(){return _("round",.92)},carnyWin(){return d("./audio/prize/applause.mp3",1).then(l=>(l||m(!0),l))},applause(l=!1){return d("./audio/prize/applause.mp3",l?1:.88).then(S=>(S||m(!!l),S))},prizeLine(l){const S={ray:"ray",nia:"nia",walt:"walt",cowboy:"cowboy",june:"june",pirate:"pirate"}[l];return S?d(`./audio/prize/${S}-prize.mp3`,1):Promise.resolve(!1)},spray(){f(.32,.22,0,1800,6400),f(.2,.14,.05,2600,7200),g(520,.1,"sine",.08,0,-180)},suction(){g(220,.12,"sine",.07,0,80),f(.1,.12,0,400,1200)},pellet(){g(520,.05,"square",.04,0,-60),g(140,.08,"triangle",.05,.02)},bubbles(){g(640,.08,"sine",.04,0,120),g(880,.1,"sine",.03,.05,80)},beanbag(){f(.11,.22,0,280,1700),g(96,.1,"triangle",.18,.09,-36)},petals(){g(740,.1,"sine",.035,0),g(980,.12,"triangle",.03,.04)},axe(){f(.09,.2,0,320,1900),g(74,.11,"triangle",.22,.07,-28),f(.05,.16,.08,80,380)},gunshot(){f(.04,.26,0,520,4e3),g(260,.035,"square",.14,0,-140),g(120,.06,"triangle",.1,.012,-50)},glass(){f(.22,.45,0,800,5200),f(.16,.3,.04,400,2800),g(1800,.08,"square",.06,0,-800),g(900,.12,"triangle",.05,.03,-400)},squeak(){g(2400,.07,"sine",.08,0,-600),g(1800,.09,"sine",.06,.05,-400)},balloonPop(){f(.18,.4,0,600,3600),g(140,.1,"sine",.08,0,-60),this.splash()},bow(){g(120,.07,"triangle",.22,0,280),g(240,.05,"sawtooth",.1,.03,160),f(.06,.18,.05,700,2500)},flap(){f(.1,.2,0,360,1800),f(.08,.15,.06,520,2100),g(920,.05,"sine",.16,.06,480)},fire(l){return l==="beanbags"?this.beanbag():l==="water"?this.spray():l==="parrot"?this.flap():l==="axe"?this.axe():l==="bow"?this.bow():l==="gun"?this.gunshot():this.beanbag()},splash(){f(.16,.24,0,500,2800),g(220,.09,"sine",.05,0,-80)},thump(){g(72,.12,"sine",.12,0,-30),g(140,.08,"triangle",.05,.01)},pop(){g(320,.07,"square",.04,0,80),g(190,.1,"sine",.05,.02)},sparkle(){g(880,.08,"sine",.04,0),g(1320,.1,"triangle",.035,.04),g(1760,.12,"sine",.03,.08)},haptic(l=14){try{navigator.vibrate&&navigator.vibrate(l)}catch{}},setMuted(l){n=!!l}}}const js=document.getElementById("app");function kg(i){const e=document.createElement("div");return e.innerHTML=i.trim(),e.firstElementChild}async function Hg(){try{document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(i=>setTimeout(i,1400))])}catch{}}function mc(){const i=Ng(bn);return i.length?`<ol>${i.map(e=>`<li><span>${ut(e.name)}</span><span>${ut(Ar(e.total_ms))}</span></li>`).join("")}</ol>`:'<p class="empty">—</p>'}async function Gg(){const i=pg(),e=ug,t=vg(),[n,r,s]=await Promise.all([t?Mg():Is(i),Is(e),Is("./packs/index.json").catch(()=>({packs:[]}))]);fl(n);const a=(n.items||[]).map(A=>A&&A.picture).filter(Boolean);await Promise.all([Hg(),H0(),G0(a)]);const o=sg(js);typeof window<"u"&&(window.__booth=o);const c=zg();o.setSign(n.title||"");const u=Sg(),h=mg(),d=gg(location.search,r.locales||[]);let p;h?p=d||"en":d?p=d:(p=Cg(n.default_ui_locale||"en"),(r.locales||[]).some(A=>A.code===p)||(p="en"));let m=Dg("Player"),_=Ig(),g=Pg(!0);const f=kg(`<div class="hud">
    <div class="play-bar hidden" id="play-bar">
      <div class="strip">
        <b class="game-name">Memory Game</b>
        <span id="hud-round">1/6</span>
        <span id="hud-ammo">Bean bags</span>
        <span id="hud-rtime">0:00</span>
      </div>
      <p class="lesson" id="hud-lesson"></p>
      <div class="skip-bar hidden" id="skip-bar">
        <button type="button" id="skip-heat">Skip heat</button>
        <button type="button" id="skip-round">Next round</button>
        <span class="skip-rounds" id="skip-rounds"></span>
      </div>
    </div>
    <div class="reveals" id="reveals"></div>
    <div class="toast" id="toast"></div>
    <div class="overlay" id="start"></div>
    <div class="overlay hidden" id="end"></div>
  </div>`);js.appendChild(f);const l={view:"start",pack:n,ui:r,locale:p,embedded:h,teacherSkip:g,playerName:m,playMode:_,sessionId:uc("session"),telemetry:null,round:1,heat:0,heats:null,cards:[],open:[],locked:!1,matched:0,flyingUid:null,queuedUid:null,usedSkip:!1,roundStartedAt:0,completedMs:[],firstTapAt:0,heatStartedAt:0,pairStartedAt:0};function S(A){return Tg(l.ui,l.locale,A)}function x(){const A=Ag(l.ui,l.locale);document.documentElement.lang=l.locale,document.documentElement.setAttribute("dir",A.rtl?"rtl":"ltr")}function y(){return l.embedded?!1:l.playMode==="maker"?!0:!!l.teacherSkip}function N(A){return A?A.heatCount?A.heatCount:A.heatB&&A.heatB.length?2:1:1}function C(){return(l.ui.locales||[]).map(A=>`<button type="button" class="lang-chip${A.code===l.locale?" on":""}" data-code="${ut(A.code)}">${ut(A.label)}</button>`).join("")}function R(){return(s.packs||[]).map(A=>`<button type="button" class="lang-chip${A.file===i?" on":""}" data-pack="${ut(A.file)}">${ut(A.title||A.file)}</button>`).join("")}function D(){x(),f.querySelector("#start").classList.remove("hidden"),f.querySelector("#end").classList.add("hidden"),f.querySelector("#play-bar").classList.add("hidden");const U=l.playMode==="maker"?`<div class="mode-row">
          <button type="button" class="mode-btn" id="mode-student">Student</button>
          <button type="button" class="mode-btn on" id="mode-maker">Maker</button>
        </div>
        <p class="hint">Maker: skip heats and rounds while you test.</p>`:"",z=l.embedded?"":`<div class="mode-row one">
          <button type="button" class="mode-btn${y()?" on":""}" id="teacher-skip">Teacher</button>
        </div>`,se=l.embedded?"":`<p class="lang-label">${ut(S("language"))}</p>
          <div class="lang-grid" id="lang-grid">${C()}</div>
          <p class="hint">${l.locale==="en"?ut(S("l1_off")):""}</p>`;f.querySelector("#start").innerHTML=`
      <aside class="board-dock">
        <h2>${ut(S("leaderboard"))}</h2>
        ${mc()}
      </aside>
      <div class="card">
        <div class="card-scroll">
          <p class="kicker">MRJ ENGLISH · v${cc}</p>
          <h1>Memory Game</h1>
          <p class="sub">${ut(n.title||"")}</p>
          <p class="lang-label">${ut(S("pack"))}</p>
          <div class="lang-grid" id="pack-grid">${R()}</div>
          <p class="how">${ut(S("how"))}</p>
          ${U}
          ${z}
          <div class="row solo">
            <label>Name
              <input id="name" type="text" maxlength="24" autocomplete="nickname" value="${ut(l.playerName)}" />
            </label>
          </div>
          ${se}
        </div>
        <button class="btn" id="btn-play" type="button">${ut(S("play"))}</button>
      </div>`,f.querySelector("#name").addEventListener("change",ie=>{l.playerName=ie.target.value.trim()||"Player",fc(l.playerName)});const ae=f.querySelector("#mode-student"),be=f.querySelector("#mode-maker");ae&&ae.addEventListener("click",()=>{l.playMode="student",pc("student"),D()}),be&&be.addEventListener("click",()=>{l.playMode="maker",pc("maker"),D()});const b=f.querySelector("#teacher-skip");b&&b.addEventListener("click",()=>{l.teacherSkip=!l.teacherSkip,Lg(l.teacherSkip),D()});const v=f.querySelector("#lang-grid");v&&v.addEventListener("click",ie=>{const ne=ie.target.closest("[data-code]");ne&&(l.locale=ne.getAttribute("data-code"),Rg(l.locale),D())});const k=f.querySelector("#pack-grid");k&&k.addEventListener("click",ie=>{const ne=ie.target.closest("[data-pack]");if(!ne)return;const oe=ne.getAttribute("data-pack");if(!oe||oe===i)return;const Re=new URL(location.href);Re.searchParams.set("pack",oe),location.assign(Re.toString())}),f.querySelector("#btn-play").addEventListener("click",()=>j()),w()}function w(){try{const A=hc(n);o.setRound(Kt(1)),o.setCards(Us(A.heatA,Kt(1),l.locale,n))}catch{}}function M(){f.querySelector("#play-bar").classList.add("hidden"),f.querySelector("#end").classList.remove("hidden");const A=l.completedMs.reduce((U,z)=>U+z,0);f.querySelector("#end").innerHTML=`
      <aside class="board-dock">
        <h2>${ut(S("leaderboard"))}</h2>
        ${mc()}
      </aside>
      <div class="card">
        <p class="kicker">MRJ ENGLISH</p>
        <h1>Memory Game</h1>
        <p class="sub">${ut(S("total"))}</p>
        <p class="win-time">${ut(Ar(A))}</p>
        <button class="btn" id="btn-again" type="button">${ut(S("again"))}</button>
      </div>`,f.querySelector("#btn-again").addEventListener("click",()=>{l.view="start",D()})}function P(A=performance.now()){const U=l.completedMs.reduce((z,se)=>z+se,0);return l.view!=="play"||!l.roundStartedAt?U:U+(A-l.roundStartedAt)}function q(A=performance.now()){f.querySelector("#hud-round").textContent=`${l.round}/${Sn}`;const U=Kt(l.round);f.querySelector("#hud-ammo").textContent=U.label||"",f.querySelector("#hud-rtime").textContent=Ar(P(A)),f.querySelector("#hud-lesson").textContent=S(wg(l.round));const z=f.querySelector("#skip-bar");y()&&l.view==="play"?z.classList.remove("hidden"):z.classList.add("hidden")}function B(){const A=f.querySelector("#skip-rounds");A.innerHTML=[1,2,3,4,5,6].map(U=>`<button type="button" class="round-jump${U===l.round?" on":""}" data-round="${U}">${U}</button>`).join("")}function K(){const A=["prize/applause","prize/ray-prize","prize/nia-prize","prize/walt-prize","prize/cowboy-prize","prize/june-prize","prize/pirate-prize"],U=["cowboy","pirate","ray","june","nia","walt"],z=["hit-1","hit-2","miss-1","miss-2","round"];for(const se of U)for(const ae of z)A.push(`carnies/${se}-${ae}`);for(const se of n.items||[])se.audio_id&&A.push(se.audio_id);return c.preload(A)}function j(){const A=f.querySelector("#name");A&&(l.playerName=A.value.trim()||"Player",fc(l.playerName)),c.unlock(),K(),l.sessionId=uc("session"),l.telemetry=Bg({studentId:u,sessionId:l.sessionId,uiLocale:l.locale}),l.completedMs=[],l.usedSkip=!1,l.flyingUid=null,l.queuedUid=null,l.round=1,l.view="play",f.querySelector("#start").classList.add("hidden"),f.querySelector("#end").classList.add("hidden"),f.querySelector("#play-bar").classList.remove("hidden"),x(),B(),Y(1)}function Y(A){l.view="play",l.round=A,l.heat=0,l.heats=hc(n),l.roundStartedAt=performance.now();const U=Kt(A);c.setCarny(U.carny),o.setRound(U),c.carnyRound(),B(),te()}function te(){const A=Kt(l.round),U=l.heat===0?l.heats.heatA:l.heats.heatB;l.cards=Us(U,A,l.locale,n),l.open=[],l.flyingUid=null,l.queuedUid=null,l.locked=!1,l.matched=0,l.heatStartedAt=performance.now(),We(),o.setCards(l.cards),q()}function J(A){return l.cards.find(U=>U.uid===A)}function _e(A,U,z,se,ae){const be=[...new Set([...A.skill_tags||[],...U.skill_tags||[]])];l.telemetry.emit({student_id:u,session_id:l.sessionId,module_id:bn,activity_id:Fr,item_id:z?A.itemId:`${A.itemId},${U.itemId}`,skill_tags:be,response:`${A.uid}|${U.uid}`,correct:z,latency_ms:Math.max(0,Math.round(ae-se)),accuracy:z?1:0,points:0,errors:z?0:1,started_at:new Date(Date.now()-(ae-se)).toISOString(),ended_at:new Date().toISOString(),ui_locale:l.locale,round_index:l.round,total_ms:Math.round(P(ae))})}function Me(A){A&&A.audioId&&A.face==="audio"&&c.word(A.audioId)}function ve(A){const U=f.querySelector("#reveals");if(!U||!A)return;let z=U.querySelector(`[data-uid="${CSS.escape(A.uid)}"]`);if(!z){for(;U.children.length>=2;)U.firstElementChild?.remove();z=document.createElement("div"),z.className="reveal-card",z.dataset.uid=A.uid,U.appendChild(z)}const se=A.animal||"",ae=V0(se),be=A.picture&&Js(A.picture)?A.picture:"";if(A.face==="picture"&&(A.picture||A.fromSession))z.innerHTML=be?`<img src="${ut(be)}" alt="">`:"";else if(A.face==="picture"&&ae)z.innerHTML=`<img src="${ae}" alt="">`;else if(A.face==="picture"&&A.n)z.innerHTML=`<b class="bigword">${ut(String(A.n))}</b>`;else if(A.face==="picture")z.innerHTML='<div class="speaker">🃏</div>';else if(A.face==="audio")z.innerHTML='<div class="speaker">🔊</div>';else if(A.face==="word"){const b=l.locale!=="en"&&A.l1&&A.l1!==A.text?`<b class="l1help">${ut(A.l1)}</b>`:"";z.innerHTML=`<b class="bigword">${ut(A.text||"")}</b>${b}`}else z.innerHTML=`<b class="bigword">${ut(A.text||"")}</b>`;z.classList.remove("hidden")}function Ue(A){const U=f.querySelector(`#reveals [data-uid="${CSS.escape(A)}"]`);U&&U.remove()}function We(){const A=f.querySelector("#reveals");A&&(A.innerHTML="")}async function Z(){if(l.finishing)return;We(),l.finishing=!0,l.view="ceremony",l.locked=!0;const A=Kt(l.round),U=l.round>=Sn;try{await Promise.all([o.presentPrize(A.theme,{big:U}),c.applause(U),c.prizeLine(A.carny)]),await o.cover(420)}catch(z){console.error(z),await o.cover(420)}o.clearRound(),U?Se():Y(l.round+1),await o.uncover(420),l.finishing=!1}function ce(){if(l.heat+1<N(l.heats)){l.heat+=1,te();return}const A=performance.now();l.completedMs.push(A-l.roundStartedAt),Z()}function Se(){l.view="end",l.locked=!0;const A=l.completedMs.reduce((U,z)=>U+z,0);if(!y()&&!l.usedSkip&&Ug({module_id:bn,name:l.playerName||"Player",total_ms:A,rounds:Sn,at:new Date().toISOString()}),l.telemetry.emit({item_id:"session",skill_tags:n.skill_tags||[],response:"win",correct:!0,latency_ms:Math.round(A),accuracy:1,points:0,errors:0,started_at:new Date(Date.now()-A).toISOString(),ended_at:new Date().toISOString(),ui_locale:l.locale,round_index:Sn,total_ms:Math.round(A)}),l.embedded&&!l.usedSkip){const U=Array.isArray(n.items)?n.items.length:0;try{window.parent&&window.parent!==window&&window.parent.postMessage({type:"mrj-wm-game-done",game:"memorymatch",items:U,correct:U,finished:!0},"*")}catch{}}M()}function ue(){return l.open.length+(l.flyingUid?1:0)+(l.queuedUid?1:0)}function X(A){if(l.view!=="play")return;const U=J(A);if(U){if(U.down){Me(U);return}if(!l.open.find(z=>z.uid===A)&&!(l.flyingUid===A||l.queuedUid===A)){if(l.locked){ue()===1&&!l.queuedUid&&(l.queuedUid=A);return}l.open.length>=1&&ue()>=2||H(A)}}}function H(A){const U=J(A);!U||U.down||l.open.find(z=>z.uid===A)||(l.locked=!0,l.flyingUid=A,l.open.length===0&&(l.pairStartedAt=performance.now(),We()),c.fire(Kt(l.round).ammo),c.haptic(12),o.sprayTo(A,()=>{l.flyingUid=null;const z=Kt(l.round).ammo;if(z==="beanbags"?c.glass():z==="water"?c.squeak():z==="gun"?c.balloonPop():c.thump(),o.spinOff(A),U.down=!0,Me(U),ve(U),l.open.push(U),l.open.length<2){l.locked=!1;const v=l.queuedUid;l.queuedUid=null,v&&l.view==="play"&&H(v);return}l.queuedUid=null;const[se,ae]=l.open,be=dc(se,ae),b=performance.now();if(_e(se,ae,be,l.pairStartedAt||b,b),be)c.sparkle(),o.sparkle([se.uid,ae.uid]),o.carnyHit(),o.removeMatched([se.uid,ae.uid]),l.matched+=1,l.open=[],l.locked=!1,setTimeout(()=>{Ue(se.uid),Ue(ae.uid)},700),l.matched>=Math.floor(l.cards.length/2)&&setTimeout(ce,450);else{o.carnyMiss(),o.handReturn([se.uid,ae.uid]);const v=o.epoch();setTimeout(()=>{o.epoch()===v&&(c.pop(),Ue(se.uid),Ue(ae.uid),o.restoreHidden([se.uid,ae.uid]),se.down=!1,ae.down=!1,l.open=[],l.locked=!1)},og)}}))}function Q(A){if(A.type==="pointerdown")try{A.target.setPointerCapture(A.pointerId)}catch{}const U=o.pick(A.clientX,A.clientY);U&&(A.preventDefault(),X(U))}o.dom.addEventListener("pointerdown",Q,{passive:!1}),window.addEventListener("resize",()=>o.resize()),window.addEventListener("orientationchange",()=>setTimeout(()=>o.resize(),120)),f.querySelector("#skip-heat").addEventListener("click",()=>{!y()||l.view!=="play"||(l.usedSkip=!0,ce())}),f.querySelector("#skip-round").addEventListener("click",()=>{!y()||l.view!=="play"||(l.usedSkip=!0,l.completedMs.push(Math.max(0,performance.now()-(l.roundStartedAt||performance.now()))),Z())}),f.querySelector("#skip-rounds").addEventListener("click",A=>{if(!y()||l.view!=="play")return;const U=A.target.closest("[data-round]");if(!U)return;l.usedSkip=!0;const z=Number(U.getAttribute("data-round"));z>=1&&z<=Sn&&Y(z)});let T=performance.now();function G(A){const U=Math.min(.05,(A-T)/1e3);T=A,o.render(U),l.view==="play"&&q(A),requestAnimationFrame(G)}requestAnimationFrame(G),D();const $=new URLSearchParams(location.search);if($.get("autostart")==="1"){j();const A=Number($.get("round")||1);A>=2&&A<=Sn&&Y(A)}$.get("tap")==="1"&&setTimeout(()=>{const U=l.cards[0];if(!U)return;X(U.uid);const z=l.cards.find(se=>se.itemId===U.itemId&&se.uid!==U.uid);setTimeout(()=>{z&&X(z.uid)},420)},700),window.MRJMemoryMatch={version:cc,module_id:bn,activity_id:Fr,pack:n,ui:l.ui,booth:o,engine:{roundDef:Kt,dealHeat:Us,isComplementaryPair:dc,formatMs:Ar}}}Gg().catch(i=>{js.textContent="Memory Game failed to load: "+i.message,console.error(i)});
