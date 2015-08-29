(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isGv)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]==""?[]:a9[1].split(",")
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = H.qm("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = H.qm("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.qm(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}HU=function(){}
var dart=[["","",,L,{
"^":"",
qx:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2",
Oh:[function(a,b){var z,y
z=this.b
y=document.body
if(z==null?y!=null:z!==y)z.focus()
z=J.RE(b)
z.e6(b)
b.stopPropagation()
if(this.r)switch(z.gpL(b)){case 0:this.k1=!0
break
case 2:this.k2=!0
break}this.ry=!0},"$1","gVY",2,0,0],
Cl:[function(a,b){var z=J.RE(b)
z.e6(b)
b.stopPropagation()
if(this.r)switch(z.gpL(b)){case 0:this.k1=!1
break
case 2:this.k2=!1
break}this.ry=!1},"$1","gGg",2,0,0],
v3:[function(a,b){var z,y,x
z=this.b
y=document.body
x=J.RE(b)
if(z==null?y==null:z===y){z=J.Rd(x.guc(b))
y=this.x1
if(typeof z!=="number")return z.T()
this.dy=z-y
x=J.U5(x.guc(b))
y=this.x2
if(typeof x!=="number")return x.T()
this.fr=x-y}else{z=J.Rd(x.guc(b))
y=C.CD.zQ(this.b.offsetLeft)
if(typeof z!=="number")return z.T()
this.dy=z-y-this.x1
x=J.U5(x.guc(b))
y=C.CD.zQ(this.b.offsetTop)
if(typeof x!=="number")return x.T()
this.fr=x-y-this.x2}},"$1","gf0",2,0,0],
Ql:[function(a,b){switch(J.Kt(b)){case 38:case 87:this.k1=!0
break
case 37:case 65:this.k3=!0
break
case 40:case 83:this.k2=!0
break
case 39:case 68:this.k4=!0
break
case 82:this.r1=!0
break
case 70:this.r2=!0
break
case 81:this.rx=!this.rx
break}},"$1","gHQ",2,0,0],
t4:[function(a,b){switch(J.Kt(b)){case 38:case 87:this.k1=!1
break
case 37:case 65:this.k3=!1
break
case 40:case 83:this.k2=!1
break
case 39:case 68:this.k4=!1
break
case 82:this.r1=!1
break
case 70:this.r2=!1
break}},"$1","gS0",2,0,0],
eC:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(this.rx)return
else{if(this.x){z=this.Q.f.Q[1]
y=this.z
x=this.ch
if(z<y)w=y
else w=z>x?x:z
z=b*((w-y)*this.y)
this.dx=z}else{this.dx=0
z=0}x=this.c
if(typeof x!=="number")return H.o(x)
v=b*x
if(!this.k1)x=this.f&&!this.k2
else x=!0
if(x){x=this.Q
x.QI(0,-(v+z),x.rx.PJ(0,0,1))}if(this.k2){z=this.Q
z.QI(0,v,z.rx.PJ(0,0,1))}if(this.k3){z=this.Q
z.QI(0,-v,z.rx.PJ(1,0,0))}if(this.k4){z=this.Q
z.QI(0,v,z.rx.PJ(1,0,0))}if(this.r1){z=this.Q
z.QI(0,v,z.rx.PJ(0,1,0))}if(this.r2){z=this.Q
z.QI(0,-v,z.rx.PJ(0,1,0))}z=this.d
if(typeof z!=="number")return H.o(z)
u=b*z
if(!this.r)u=0
this.fy=this.fy+this.dy*u
if(this.e)this.fx=this.fx-this.fr*u
z=P.u(-85,P.C(85,this.fx))
this.fx=z
z=(90-z)*3.141592653589793/180
this.go=z
this.id=this.fy*3.141592653589793/180
t=this.a
x=this.Q
s=x.f.Q
r=t.Q
r[0]=s[0]+100*Math.sin(H.E0(z))*Math.cos(H.E0(this.id))
r[1]=s[1]+100*Math.cos(H.E0(this.go))
r[2]=s[2]+100*Math.sin(H.E0(this.go))*Math.sin(H.E0(this.id))}z=this.cx
q=z?3.141592653589793/(this.db-this.cy):1
this.fy=this.fy+this.dy*0
if(this.e)this.fx=this.fx-this.fr*0*q
s=P.u(-85,P.C(85,this.fx))
this.fx=s
s=(90-s)*3.141592653589793/180
this.go=s
this.id=this.fy*3.141592653589793/180
if(z){z=this.cy
z+=(s-0)*(this.db-z)/3.141592653589793
this.go=z}else z=s
t=this.a
s=x.f.Q
r=t.Q
r[0]=s[0]+100*Math.sin(H.E0(z))*Math.cos(H.E0(this.id))
r[1]=s[1]+100*Math.cos(H.E0(this.go))
r[2]=s[2]+100*Math.sin(H.E0(this.go))*Math.sin(H.E0(this.id))
x.Yp(t)},
md:function(a,b){var z,y
z=b!=null?b:document.body
this.b=z
y=document.body
if(z==null?y!=null:z!==y)J.mV(z,-1)
z=J.CI(this.b)
H.J(new W.xC(0,z.Q,z.a,W.V(new L.c4()),z.b),[H.Kp(z,0)]).P6()
z=J.G0(this.b)
H.J(new W.xC(0,z.Q,z.a,W.V(this.gf0(this)),z.b),[H.Kp(z,0)]).P6()
z=J.GW(this.b)
H.J(new W.xC(0,z.Q,z.a,W.V(this.gVY(this)),z.b),[H.Kp(z,0)]).P6()
z=J.AL(this.b)
H.J(new W.xC(0,z.Q,z.a,W.V(this.gGg(this)),z.b),[H.Kp(z,0)]).P6()
z=J.Zm(this.b)
H.J(new W.xC(0,z.Q,z.a,W.V(this.gHQ(this)),z.b),[H.Kp(z,0)]).P6()
z=J.xA(this.b)
H.J(new W.xC(0,z.Q,z.a,W.V(this.gS0(this)),z.b),[H.Kp(z,0)]).P6()
z=this.b
y=document.body
if(z==null?y==null:z===y){z=window.innerWidth
if(typeof z!=="number")return z.S()
this.x1=z/2
z=window.innerHeight
if(typeof z!=="number")return z.S()
this.x2=z/2}else{this.x1=C.CD.zQ(z.offsetWidth)/2
this.x2=C.CD.zQ(this.b.offsetHeight)/2}},
static:{mE:function(a,b){var z=new L.qx(a,new T.An(new Float32Array(H.T0(3))),null,1,0.005,!0,!1,!0,!1,1,0,1,!1,0,3.141592653589793,0,0,0,0,0,0,0,!1,!1,!1,!1,!1,!1,!1,!1,0,0)
z.md(a,b)
return z}}},
c4:{
"^":"r:1;",
$1:function(a){return J.Kr(a)}}}],["","",,H,{
"^":"",
FK:{
"^":"a;Q"}}],["","",,J,{
"^":"",
t:function(a){return void 0},
Qu:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ks:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.Y==null){H.Z()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.ds("Return interceptor for "+H.d(y(a,z))))}w=H.w3(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.ZQ
else return C.vB}return w},
Gv:{
"^":"a;",
m:function(a,b){return a===b},
giO:function(a){return H.wP(a)},
X:["VE",function(a){return H.H9(a)}],
"%":"ANGLEInstancedArrays|Animation|AnimationEffect|AnimationNode|AnimationTimeline|AudioListener|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|ConsoleBase|Coordinates|Counter|CredentialsContainer|Crypto|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMParser|DataTransfer|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EntrySync|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FormData|Geofencing|Geolocation|Geoposition|HTMLAllCollection|IDBFactory|IDBKeyRange|IDBObjectStore|ImageBitmap|ImageData|InjectedScriptHost|MediaDeviceInfo|MediaError|MediaKeyError|MediaKeys|MemoryInfo|MessageChannel|MutationObserver|NavigatorUserMediaError|NodeFilter|NodeIterator|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|PagePopupController|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceResourceTiming|PerformanceTiming|PeriodicWave|PositionError|PushManager|PushRegistration|RGBColor|RTCIceCandidate|RTCStatsResponse|Range|ReadableStream|Rect|SQLError|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGRenderingIntent|SVGUnitTypes|Screen|ServiceWorkerClients|ServiceWorkerContainer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageQuota|SubtleCrypto|TextMetrics|Timing|TreeWalker|ValidityState|VideoPlaybackQuality|WebGLBuffer|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLShaderPrecisionFormat|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WorkerConsole|WorkerPerformance|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
yE:{
"^":"Gv;",
X:function(a){return String(a)},
giO:function(a){return a?519018:218159},
$isa0:1},
YE:{
"^":"Gv;",
m:function(a,b){return null==b},
X:function(a){return"null"},
giO:function(a){return 0}},
Ue:{
"^":"Gv;",
giO:function(a){return 0},
$isvm:1},
iC:{
"^":"Ue;"},
kd:{
"^":"Ue;",
X:function(a){return String(a)}},
G:{
"^":"Gv;",
uy:function(a,b){if(!!a.immutable$list)throw H.b(new P.ub(b))},
PP:function(a,b){if(!!a.fixed$length)throw H.b(new P.ub(b))},
W4:function(a,b){this.PP(a,"removeAt")
if(b<0||b>=a.length)throw H.b(P.D(b,null,null))
return a.splice(b,1)[0]},
Rz:function(a,b){var z
this.PP(a,"remove")
for(z=0;z<a.length;++z)if(J.mG(a[z],b)){a.splice(z,1)
return!0}return!1},
FV:function(a,b){var z,y
this.PP(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.lk)(b),++y)a.push(b[y])},
aN:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.UV(a))}},
ez:function(a,b){return H.J(new H.A8(a,b),[null,null])},
zV:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.d(a[x])
if(x>=z)return H.e(y,x)
y[x]=w}return y.join(b)},
EE:function(a){return this.zV(a,"")},
es:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.b(new P.UV(a))}return y},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
gtH:function(a){if(a.length>0)return a[0]
throw H.b(H.Wp())},
YW:function(a,b,c,d,e){var z,y,x
this.uy(a,"set range")
P.jB(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.vh(P.TE(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.ar())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
GT:function(a,b){this.uy(a,"sort")
H.ZE(a,0,a.length-1,b)},
XU:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.mG(a[z],b))return z
return-1},
OY:function(a,b){return this.XU(a,b,0)},
X:function(a){return P.WE(a,"[","]")},
tt:function(a,b){var z
if(b)z=H.J(a.slice(),[H.Kp(a,0)])
else{z=H.J(a.slice(),[H.Kp(a,0)])
z.fixed$length=Array
z=z}return z},
br:function(a){return this.tt(a,!0)},
gu:function(a){return new J.m1(a,a.length,0,null)},
giO:function(a){return H.wP(a)},
gv:function(a){return a.length},
sv:function(a,b){this.PP(a,"set length")
if(b<0)throw H.b(P.D(b,null,null))
a.length=b},
p:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.p(b))
if(b>=a.length||b<0)throw H.b(P.D(b,null,null))
return a[b]},
q:function(a,b,c){this.uy(a,"indexed set")
if(b>=a.length||b<0)throw H.b(P.D(b,null,null))
a[b]=c},
$isDD:1,
$iszM:1,
$aszM:null,
$isqC:1},
Po:{
"^":"G;"},
m1:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z,y,x
z=this.Q
y=z.length
if(this.a!==y)throw H.b(new P.UV(z))
x=this.b
if(x>=y){this.c=null
return!1}this.c=z[x]
this.b=x+1
return!0}},
F:{
"^":"Gv;",
iM:function(a,b){var z
if(typeof b!=="number")throw H.b(P.p(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gzP(b)
if(this.gzP(a)===z)return 0
if(this.gzP(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gG0(b))return 0
return 1}else return-1},
gzP:function(a){return a===0?1/a<0:a<0},
gG0:function(a){return isNaN(a)},
gdc:function(a){return a==Infinity||a==-Infinity},
JV:function(a,b){return a%b},
yu:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(new P.ub(""+a))},
zQ:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.ub(""+a))},
Hp:function(a){return a},
Sy:function(a,b){var z
H.fI(b)
if(b>20)throw H.b(P.C3(b))
z=a.toFixed(b)
if(a===0&&this.gzP(a))return"-"+z
return z},
X:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
giO:function(a){return a&0x1FFFFFFF},
G:function(a){return-a},
g:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
return a+b},
T:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
return a-b},
R:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
return a*b},
BU:function(a,b){return(a|0)===a?a/b|0:this.yu(a/b)},
wG:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
w:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
return a<b},
A:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
return a>b},
$islf:1},
im:{
"^":"F;",
$isVf:1,
$islf:1,
$isKN:1},
VA:{
"^":"F;",
$isVf:1,
$islf:1},
E:{
"^":"Gv;",
O2:function(a,b){if(b>=a.length)throw H.b(P.D(b,null,null))
return a.charCodeAt(b)},
g:function(a,b){if(typeof b!=="string")throw H.b(P.p(b))
return a+b},
Nj:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.vh(H.aL(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.vh(H.aL(c))
z=J.Wx(b)
if(z.w(b,0))throw H.b(P.D(b,null,null))
if(z.A(b,c))throw H.b(P.D(b,null,null))
if(J.vU(c,a.length))throw H.b(P.D(c,null,null))
return a.substring(b,c)},
yn:function(a,b){return this.Nj(a,b,null)},
R:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.Eq)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eM:function(a,b,c){if(c>a.length)throw H.b(P.TE(c,0,a.length,null,null))
return H.m2(a,b,c)},
gl0:function(a){return a.length===0},
iM:function(a,b){var z
if(typeof b!=="string")throw H.b(P.p(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
X:function(a){return a},
giO:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gv:function(a){return a.length},
p:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.p(b))
if(b>=a.length||b<0)throw H.b(P.D(b,null,null))
return a[b]},
$isDD:1,
$isI:1}}],["","",,H,{
"^":"",
X:function(a,b){var z=a.vV(b)
if(!init.globalState.c.cy)init.globalState.e.bL()
return z},
ox:function(){--init.globalState.e.a},
Rq:function(a,b){var z,y,x,w,v,u
z={}
z.Q=b
b=b
z.Q=b
if(b==null){b=[]
z.Q=b
y=b}else y=b
if(!J.t(y).$iszM)throw H.b(P.p("Arguments to main must be a List: "+H.d(y)))
y=new H.f0(0,0,1,null,null,null,null,null,null,null,null,null,a)
y.Em()
y.e=new H.cC(P.NZ(null,H.IY),0)
y.y=P.L5(null,null,null,P.KN,H.aX)
y.ch=P.L5(null,null,null,P.KN,null)
if(y.r===!0){y.z=new H.JH()
y.O0()}init.globalState=y
if(init.globalState.r===!0)return
y=init.globalState.Q++
x=P.L5(null,null,null,P.KN,H.yo)
w=P.Ls(null,null,null,P.KN)
v=new H.yo(0,null,!1)
u=new H.aX(y,x,w,init.createNewIsolate(),v,new H.ku(H.Uh()),new H.ku(H.Uh()),!1,!1,[],P.Ls(null,null,null,null),null,null,!1,!0,P.Ls(null,null,null,null))
w.h(0,0)
u.ac(0,v)
init.globalState.d=u
init.globalState.c=u
y=H.N7()
x=H.KT(y,[y]).Zg(a)
if(x)u.vV(new H.PK(z,a))
else{y=H.KT(y,[y,y]).Zg(a)
if(y)u.vV(new H.JO(z,a))
else u.vV(a)}init.globalState.e.bL()},
yl:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.r===!0)return H.mf()
return},
mf:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.ub("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.ub("Cannot extract URI from \""+H.d(z)+"\""))},
Mg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.fP(!0,[]).QS(b.data)
y=J.U6(z)
switch(y.p(z,"command")){case"start":init.globalState.a=y.p(z,"id")
x=y.p(z,"functionName")
w=x==null?init.globalState.cx:H.Cr(x)
v=y.p(z,"args")
u=new H.fP(!0,[]).QS(y.p(z,"msg"))
t=y.p(z,"isSpawnUri")
s=y.p(z,"startPaused")
r=new H.fP(!0,[]).QS(y.p(z,"replyTo"))
y=init.globalState.Q++
q=P.L5(null,null,null,P.KN,H.yo)
p=P.Ls(null,null,null,P.KN)
o=new H.yo(0,null,!1)
n=new H.aX(y,q,p,init.createNewIsolate(),o,new H.ku(H.Uh()),new H.ku(H.Uh()),!1,!1,[],P.Ls(null,null,null,null),null,null,!1,!0,P.Ls(null,null,null,null))
p.h(0,0)
n.ac(0,o)
init.globalState.e.Q.B7(0,new H.IY(n,new H.jl(w,v,u,t,s,r),"worker-start"))
init.globalState.c=n
init.globalState.e.bL()
break
case"spawn-worker":break
case"message":if(y.p(z,"port")!=null)J.jV(y.p(z,"port"),y.p(z,"msg"))
init.globalState.e.bL()
break
case"close":init.globalState.ch.Rz(0,$.p6().p(0,a))
a.terminate()
init.globalState.e.bL()
break
case"log":H.VL(y.p(z,"msg"))
break
case"print":if(init.globalState.r===!0){y=init.globalState.z
q=P.Td(["command","print","msg",z])
q=new H.jP(!0,P.Q9(null,P.KN)).a3(q)
y.toString
self.postMessage(q)}else P.JS(y.p(z,"msg"))
break
case"error":throw H.b(y.p(z,"msg"))}},
VL:function(a){var z,y,x,w
if(init.globalState.r===!0){y=init.globalState.z
x=P.Td(["command","log","msg",a])
x=new H.jP(!0,P.Q9(null,P.KN)).a3(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.Ru(w)
z=H.ts(w)
throw H.b(P.FM(z))}},
Cr:function(a){return init.globalFunctions[a]()},
Z7:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.c
y=z.Q
$.te=$.te+("_"+y)
$.eb=$.eb+("_"+y)
y=z.d
x=init.globalState.c.Q
w=z.e
J.jV(f,["spawned",new H.JM(y,x),w,z.f])
x=new H.Vg(a,b,c,d,z)
if(e===!0){z.v8(w,w)
init.globalState.e.Q.B7(0,new H.IY(z,x,"start isolate"))}else x.$0()},
Gx:function(a){return new H.fP(!0,[]).QS(new H.jP(!1,P.Q9(null,P.KN)).a3(a))},
PK:{
"^":"r:2;Q,a",
$0:function(){this.a.$1(this.Q.Q)}},
JO:{
"^":"r:2;Q,a",
$0:function(){this.a.$2(this.Q.Q,null)}},
f0:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z,ch,cx",
Em:function(){var z,y,x
z=self.window==null
y=self.Worker
x=z&&!!self.postMessage
this.r=x
if(!x)y=y!=null&&$.Rs()!=null
else y=!0
this.x=y
this.f=z&&!x},
O0:function(){self.onmessage=function(a,b){return function(c){a(b,c)}}(H.Mg,this.z)
self.dartPrint=self.dartPrint||function(a){return function(b){if(self.console&&self.console.log)self.console.log(b)
else self.postMessage(a(b))}}(H.wI)},
static:{wI:function(a){var z=P.Td(["command","print","msg",a])
return new H.jP(!0,P.Q9(null,P.KN)).a3(z)}}},
aX:{
"^":"a;jO:Q>,a,b,En:c<,WE:d<,e,f,r,x,y,z,ch,cx,cy,db,dx",
v8:function(a,b){if(!this.e.m(0,a))return
if(this.z.h(0,b)&&!this.x)this.x=!0
this.Oq()},
cK:function(a){var z,y,x,w,v,u
if(!this.x)return
z=this.z
z.Rz(0,a)
if(z.Q===0){for(z=this.y;y=z.length,y!==0;){if(0>=y)return H.e(z,0)
x=z.pop()
y=init.globalState.e.Q
w=y.a
v=y.Q
u=v.length
w=(w-1&u-1)>>>0
y.a=w
if(w<0||w>=u)return H.e(v,w)
v[w]=x
if(w===y.b)y.wL();++y.c}this.x=!1}this.Oq()},
h4:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
Hh:function(a){var z,y,x
if(this.ch==null)return
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.vh(new P.ub("removeRange"))
P.jB(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
MZ:function(a,b){if(!this.f.m(0,a))return
this.db=b},
l7:function(a,b,c){var z=J.t(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){J.jV(a,c)
return}z=this.cx
if(z==null){z=P.NZ(null,null)
this.cx=z}z.B7(0,new H.BZ(a,c))},
bc:function(a,b){var z
if(!this.f.m(0,a))return
z=J.t(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){this.Dm()
return}z=this.cx
if(z==null){z=P.NZ(null,null)
this.cx=z}z.B7(0,this.gIm())},
E2:function(a,b){var z,y,x
z=this.dx
if(z.Q===0){if(this.db===!0&&this===init.globalState.d)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.JS(a)
if(b!=null)P.JS(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.Lz(a)
y[1]=b==null?null:J.Lz(b)
for(x=new P.zQ(z,z.f,null,null),x.b=z.d;x.D();)J.jV(x.c,y)},
vV:function(a){var z,y,x,w,v,u,t
z=init.globalState.c
init.globalState.c=this
$=this.c
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.Ru(u)
w=t
v=H.ts(u)
this.E2(w,v)
if(this.db===!0){this.Dm()
if(this===init.globalState.d)throw u}}finally{this.cy=x
init.globalState.c=z
if(z!=null)$=z.gEn()
if(this.cx!=null)for(;t=this.cx,!t.gl0(t);)this.cx.Ux().$0()}return y},
hV:function(a){return this.a.p(0,a)},
ac:function(a,b){var z=this.a
if(z.NZ(0,a))throw H.b(P.FM("Registry: ports must be registered only once."))
z.q(0,a,b)},
Oq:function(){if(this.a.Q-this.b.Q>0||this.x||!this.r)init.globalState.y.q(0,this.Q,this)
else this.Dm()},
Dm:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.V1(0)
for(z=this.a,y=z.gUQ(z),y=H.J(new H.MH(null,J.Nx(y.Q),y.a),[H.Kp(y,0),H.Kp(y,1)]);y.D();)y.Q.ju()
if(z.Q>0){z.e=null
z.d=null
z.c=null
z.b=null
z.a=null
z.Q=0
z.f=z.f+1&67108863}this.b.V1(0)
init.globalState.y.Rz(0,this.Q)
this.dx.V1(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
J.jV(w,z[v])}this.ch=null}},"$0","gIm",0,0,3]},
BZ:{
"^":"r:3;Q,a",
$0:function(){J.jV(this.Q,this.a)}},
cC:{
"^":"a;Q,a",
mj:function(){var z=this.Q
if(z.a===z.b)return
return z.Ux()},
xB:function(){var z,y,x
z=this.mj()
if(z==null){if(init.globalState.d!=null&&init.globalState.y.NZ(0,init.globalState.d.Q)&&init.globalState.f===!0&&init.globalState.d.a.Q===0)H.vh(P.FM("Program exited with open ReceivePorts."))
y=init.globalState
if(y.r===!0&&y.y.Q===0&&y.e.a===0){y=y.z
x=P.Td(["command","close"])
x=new H.jP(!0,P.Q9(null,P.KN)).a3(x)
y.toString
self.postMessage(x)}return!1}z.VU()
return!0},
Ex:function(){if(self.window!=null)new H.RA(this).$0()
else for(;this.xB(););},
bL:function(){var z,y,x,w,v
if(init.globalState.r!==!0)this.Ex()
else try{this.Ex()}catch(x){w=H.Ru(x)
z=w
y=H.ts(x)
w=init.globalState.z
v=P.Td(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.jP(!0,P.Q9(null,P.KN)).a3(v)
w.toString
self.postMessage(v)}}},
RA:{
"^":"r:3;Q",
$0:function(){if(!this.Q.xB())return
P.rT(C.RT,this)}},
IY:{
"^":"a;Q,a,b",
VU:function(){var z=this.Q
if(z.x){z.y.push(this)
return}z.vV(this.a)}},
JH:{
"^":"a;"},
jl:{
"^":"r:2;Q,a,b,c,d,e",
$0:function(){H.Z7(this.Q,this.a,this.b,this.c,this.d,this.e)}},
Vg:{
"^":"r:3;Q,a,b,c,d",
$0:function(){var z,y,x
this.d.r=!0
if(this.c!==!0)this.Q.$1(this.b)
else{z=this.Q
y=H.N7()
x=H.KT(y,[y,y]).Zg(z)
if(x)z.$2(this.a,this.b)
else{y=H.KT(y,[y]).Zg(z)
if(y)z.$1(this.a)
else z.$0()}}}},
Iy:{
"^":"a;"},
JM:{
"^":"Iy;a,Q",
wR:function(a,b){var z,y,x,w
z=init.globalState.y.p(0,this.Q)
if(z==null)return
y=this.a
if(y.gGl())return
x=H.Gx(b)
if(z.gWE()===y){y=J.U6(x)
switch(y.p(x,0)){case"pause":z.v8(y.p(x,1),y.p(x,2))
break
case"resume":z.cK(y.p(x,1))
break
case"add-ondone":z.h4(y.p(x,1),y.p(x,2))
break
case"remove-ondone":z.Hh(y.p(x,1))
break
case"set-errors-fatal":z.MZ(y.p(x,1),y.p(x,2))
break
case"ping":z.l7(y.p(x,1),y.p(x,2),y.p(x,3))
break
case"kill":z.bc(y.p(x,1),y.p(x,2))
break
case"getErrors":y=y.p(x,1)
z.dx.h(0,y)
break
case"stopErrors":y=y.p(x,1)
z.dx.Rz(0,y)
break}return}y=init.globalState.e
w="receive "+H.d(b)
y.Q.B7(0,new H.IY(z,new H.Ua(this,x),w))},
m:function(a,b){if(b==null)return!1
return b instanceof H.JM&&J.mG(this.a,b.a)},
giO:function(a){return this.a.gTU()}},
Ua:{
"^":"r:2;Q,a",
$0:function(){var z=this.Q.a
if(!z.gGl())z.FL(0,this.a)}},
ns:{
"^":"Iy;a,b,Q",
wR:function(a,b){var z,y,x
z=P.Td(["command","message","port",this,"msg",b])
y=new H.jP(!0,P.Q9(null,P.KN)).a3(z)
if(init.globalState.r===!0){init.globalState.z.toString
self.postMessage(y)}else{x=init.globalState.ch.p(0,this.a)
if(x!=null)x.postMessage(y)}},
m:function(a,b){if(b==null)return!1
return b instanceof H.ns&&J.mG(this.a,b.a)&&J.mG(this.Q,b.Q)&&J.mG(this.b,b.b)},
giO:function(a){var z,y,x
z=this.a
if(typeof z!=="number")return z.L()
y=this.Q
if(typeof y!=="number")return y.L()
x=this.b
if(typeof x!=="number")return H.o(x)
return(z<<16^y<<8^x)>>>0}},
yo:{
"^":"a;TU:Q<,a,Gl:b<",
ju:function(){this.b=!0
this.a=null},
FL:function(a,b){if(this.b)return
this.mY(b)},
mY:function(a){return this.a.$1(a)},
$isSF:1},
yH:{
"^":"a;Q,a,b",
Qa:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.r===!0
else z=!1
if(z){this.b=1
z=init.globalState.e
y=init.globalState.c
z.Q.B7(0,new H.IY(y,new H.FA(this,b),"timer"))
this.a=!0}else if(self.setTimeout!=null){++init.globalState.e.a
this.b=self.setTimeout(H.M(new H.Av(this,b),0),a)}else throw H.b(new P.ub("Timer greater than 0."))},
static:{cy:function(a,b){var z=new H.yH(!0,!1,null)
z.Qa(a,b)
return z}}},
FA:{
"^":"r:3;Q,a",
$0:function(){this.Q.b=null
this.a.$0()}},
Av:{
"^":"r:3;Q,a",
$0:function(){this.Q.b=null
H.ox()
this.a.$0()}},
ku:{
"^":"a;TU:Q<",
giO:function(a){var z=this.Q
z=C.jn.wG(z,0)^C.jn.BU(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
m:function(a,b){if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ku)return this.Q===b.Q
return!1}},
jP:{
"^":"a;Q,a",
a3:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.a
y=z.p(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.Q)
z=J.t(a)
if(!!z.$isWZ)return["buffer",a]
if(!!z.$isET)return["typed",a]
if(!!z.$isDD)return this.BE(a)
if(!!z.$isym){x=this.gyN()
w=z.gvc(a)
w=H.K1(w,x,H.ip(w,"cX",0),null)
w=P.z(w,!0,H.ip(w,"cX",0))
z=z.gUQ(a)
z=H.K1(z,x,H.ip(z,"cX",0),null)
return["map",w,P.z(z,!0,H.ip(z,"cX",0))]}if(!!z.$isvm)return this.OD(a)
if(!!z.$isGv)this.jf(a)
if(!!z.$isSF)this.kz(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isJM)return this.PE(a)
if(!!z.$isns)return this.ff(a)
if(!!z.$isr){v=a.$name
if(v==null)this.kz(a,"Closures can't be transmitted:")
return["function",v]}return["dart",init.classIdExtractor(a),this.bO(init.classFieldsExtractor(a))]},"$1","gyN",2,0,1],
kz:function(a,b){throw H.b(new P.ub(H.d(b==null?"Can't transmit:":b)+" "+H.d(a)))},
jf:function(a){return this.kz(a,null)},
BE:function(a){var z=this.dY(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.kz(a,"Can't serialize indexable: ")},
dY:function(a){var z,y,x
z=[]
C.Nm.sv(z,a.length)
for(y=0;y<a.length;++y){x=this.a3(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bO:function(a){var z
for(z=0;z<a.length;++z)C.Nm.q(a,z,this.a3(a[z]))
return a},
OD:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.kz(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.Nm.sv(y,z.length)
for(x=0;x<z.length;++x){w=this.a3(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
ff:function(a){if(this.Q)return["sendport",a.a,a.Q,a.b]
return["raw sendport",a]},
PE:function(a){if(this.Q)return["sendport",init.globalState.a,a.Q,a.a.gTU()]
return["raw sendport",a]}},
fP:{
"^":"a;Q,a",
QS:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.p("Bad serialized message: "+H.d(a)))
switch(C.Nm.gtH(a)){case"ref":if(1>=a.length)return H.e(a,1)
z=a[1]
y=this.a
if(z>>>0!==z||z>=y.length)return H.e(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
return x
case"typed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
return x
case"fixed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
y=this.NB(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
y=this.NB(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
return this.NB(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
y=this.NB(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.EK(a)
case"sendport":return this.Vf(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.a.push(x)
return x
case"js-object":return this.ZQ(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.a.push(x)
return x
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.a.push(u)
this.NB(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.b("couldn't deserialize: "+H.d(a))}},"$1","gia",2,0,1],
NB:function(a){var z,y,x
z=J.U6(a)
y=0
while(!0){x=z.gv(a)
if(typeof x!=="number")return H.o(x)
if(!(y<x))break
z.q(a,y,this.QS(z.p(a,y)));++y}return a},
EK:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.u5()
this.a.push(w)
y=J.qA(J.kl(y,this.gia()))
for(z=J.U6(y),v=J.U6(x),u=0;u<z.gv(y);++u){if(u>=y.length)return H.e(y,u)
w.q(0,y[u],this.QS(v.p(x,u)))}return w},
Vf:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.mG(y,init.globalState.a)){v=init.globalState.y.p(0,x)
if(v==null)return
u=v.hV(w)
if(u==null)return
t=new H.JM(u,x)}else t=new H.ns(y,w,x)
this.a.push(t)
return t},
ZQ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.a.push(w)
z=J.U6(y)
v=J.U6(x)
u=0
while(!0){t=z.gv(y)
if(typeof t!=="number")return H.o(t)
if(!(u<t))break
w[z.p(y,u)]=this.QS(v.p(x,u));++u}return w}}}],["","",,H,{
"^":"",
dc:function(){throw H.b(new P.ub("Cannot modify unmodifiable Map"))},
Dm:function(a){return init.types[a]},
wV:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.t(a).$isXj},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.Lz(a)
if(typeof z!=="string")throw H.b(H.aL(a))
return z},
wP:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dh:function(a,b){throw H.b(new P.oe(a,null,null))},
BU:function(a,b,c){var z,y
H.Yx(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dh(a,c)
if(3>=z.length)return H.e(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dh(a,c)},
lh:function(a){var z,y
z=C.w2(J.t(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.xB.O2(z,0)===36)z=C.xB.yn(z,1)
return(z+H.ia(H.oX(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
H9:function(a){return"Instance of '"+H.lh(a)+"'"},
o2:function(a){if(a.date===void 0)a.date=new Date(a.Q)
return a.date},
VK:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.aL(a))
return a[b]},
aw:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.aL(a))
a[b]=c},
o:function(a){throw H.b(H.aL(a))},
e:function(a,b){if(a==null)J.wS(a)
if(typeof b!=="number"||Math.floor(b)!==b)H.o(b)
throw H.b(P.D(b,null,null))},
aL:function(a){return new P.AT(!0,a,null,null)},
E0:function(a){if(typeof a!=="number")throw H.b(H.aL(a))
return a},
fI:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(H.aL(a))
return a},
Yx:function(a){if(typeof a!=="string")throw H.b(H.aL(a))
return a},
b:function(a){var z
if(a==null)a=new P.W()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.Ju})
z.name=""}else z.toString=H.Ju
return z},
Ju:function(){return J.Lz(this.dartException)},
vh:function(a){throw H.b(a)},
lk:function(a){throw H.b(new P.UV(a))},
Ru:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.Am(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.jn.wG(x,16)&8191)===10)switch(w){case 438:return z.$1(H.T3(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.Zo(v,null))}}if(a instanceof TypeError){u=$.WD()
t=$.OI()
s=$.PH()
r=$.D1()
q=$.rx()
p=$.Y9()
o=$.zO()
$.Bi()
n=$.eA()
m=$.ko()
l=u.qS(y)
if(l!=null)return z.$1(H.T3(y,l))
else{l=t.qS(y)
if(l!=null){l.method="call"
return z.$1(H.T3(y,l))}else{l=s.qS(y)
if(l==null){l=r.qS(y)
if(l==null){l=q.qS(y)
if(l==null){l=p.qS(y)
if(l==null){l=o.qS(y)
if(l==null){l=r.qS(y)
if(l==null){l=n.qS(y)
if(l==null){l=m.qS(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.Zo(y,l==null?null:l.method))}}return z.$1(new H.vV(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.VS()
return z.$1(new P.AT(!1,null,null,null))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.VS()
return a},
ts:function(a){return new H.XO(a,null)},
CU:function(a){if(a==null||typeof a!='object')return J.v1(a)
else return H.wP(a)},
B7:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
ft:function(a,b,c,d,e,f,g){var z=J.t(c)
if(z.m(c,0))return H.X(b,new H.O(a))
else if(z.m(c,1))return H.X(b,new H.R(a,d))
else if(z.m(c,2))return H.X(b,new H.dr(a,d,e))
else if(z.m(c,3))return H.X(b,new H.TL(a,d,e,f))
else if(z.m(c,4))return H.X(b,new H.KX(a,d,e,f,g))
else throw H.b(P.FM("Unsupported number of arguments for wrapped closure"))},
M:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.c,H.ft)
a.$identity=z
return z},
iA:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.t(c).$iszM){z.$reflectionInfo=c
x=H.zh(z).f}else x=c
w=d?Object.create(new H.zx().constructor.prototype):Object.create(new H.q(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.yj
$.yj=J.WB(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.bx(a,z,t)
s.$reflectionInfo=c}else{w.$name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.Dm(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.yS:H.eZ
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bx(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
vq:function(a,b,c,d){var z=H.eZ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bx:function(a,b,c){var z,y,x,w,v,u
if(c)return H.Hf(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.vq(y,!w,z,b)
if(y===0){w=$.bf
if(w==null){w=H.E2("self")
$.bf=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.yj
$.yj=J.WB(v,1)
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.bf
if(v==null){v=H.E2("self")
$.bf=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.yj
$.yj=J.WB(w,1)
return new Function(v+H.d(w)+"}")()},
Z4:function(a,b,c,d){var z,y
z=H.eZ
y=H.yS
switch(b?-1:a){case 0:throw H.b(new H.tc("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
Hf:function(a,b){var z,y,x,w,v,u,t,s
z=H.oN()
y=$.P4
if(y==null){y=H.E2("receiver")
$.P4=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.Z4(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.yj
$.yj=J.WB(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.yj
$.yj=J.WB(u,1)
return new Function(y+H.d(u)+"}")()},
qm:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.t(c).$iszM){c.fixed$length=Array
z=c}else z=c
return H.iA(a,b,z,!!d,e,f)},
aE:function(a,b){var z=J.U6(b)
throw H.b(H.aq(H.lh(a),z.Nj(b,3,z.gv(b))))},
Go:function(a,b){var z
if(a!=null)z=typeof a==="object"&&J.t(a)[b]
else z=!0
if(z)return a
H.aE(a,b)},
ug:function(a){if(!!J.t(a).$iszM||a==null)return a
throw H.b(H.aq(H.lh(a),"List"))},
eQ:function(a){throw H.b(new P.t7("Cyclic initialization for static "+H.d(a)))},
KT:function(a,b,c){return new H.tD(a,b,c,null)},
N7:function(){return C.KZ},
Uh:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
J:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
oX:function(a){if(a==null)return
return a.$builtinTypeInfo},
IM:function(a,b){return H.Z9(a["$as"+H.d(b)],H.oX(a))},
ip:function(a,b,c){var z=H.IM(a,b)
return z==null?null:z[c]},
Kp:function(a,b){var z=H.oX(a)
return z==null?null:z[b]},
Ko:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.ia(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.jn.X(a)
else return},
ia:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.Rn("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.Q=v+", "
u=a[y]
if(u!=null)w=!1
v=z.Q+=H.d(H.Ko(u,c))}return w?"":"<"+H.d(z)+">"},
Z9:function(a,b){if(typeof a=="function"){a=H.ml(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.ml(a,null,b)}return b},
RB:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.oX(a)
y=J.t(a)
if(y[b]==null)return!1
return H.hv(H.Z9(y[d],z),c)},
Cv:function(a,b,c,d){if(a!=null&&!H.RB(a,b,c,d))throw H.b(H.aq(H.lh(a),(b.substring(3)+H.ia(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
hv:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.t1(a[y],b[y]))return!1
return!0},
IG:function(a,b,c){return H.ml(a,b,H.IM(b,c))},
t1:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.Ly(a,b)
if('func' in a)return b.builtin$cls==="EH"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.Ko(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.d(H.Ko(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hv(H.Z9(v,z),x)},
Hc:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.t1(z,v)||H.t1(v,z)))return!1}return!0},
Vt:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.t1(v,u)||H.t1(u,v)))return!1}return!0},
Ly:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.t1(z,y)||H.t1(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.Hc(x,w,!1))return!1
if(!H.Hc(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.t1(o,n)||H.t1(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.t1(o,n)||H.t1(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.t1(o,n)||H.t1(n,o)))return!1}}return H.Vt(a.named,b.named)},
ml:function(a,b,c){return a.apply(b,c)},
or:function(a){var z=$.N
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
wz:function(a){return H.wP(a)},
iw:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
w3:function(a){var z,y,x,w,v,u
z=$.N.$1(a)
y=$.NF[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.vv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.TX.$2(a,z)
if(z!=null){y=$.NF[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.vv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.Va(x)
$.NF[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.vv[z]=x
return x}if(v==="-"){u=H.Va(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.Lc(a,x)
if(v==="*")throw H.b(new P.ds(z))
if(init.leafTags[z]===true){u=H.Va(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.Lc(a,x)},
Lc:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.Qu(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
Va:function(a){return J.Qu(a,!1,null,!!a.$isXj)},
VF:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.Qu(z,!1,null,!!z.$isXj)
else return J.Qu(z,c,null,null)},
Z:function(){if(!0===$.Y)return
$.Y=!0
H.Z1()},
Z1:function(){var z,y,x,w,v,u,t,s
$.NF=Object.create(null)
$.vv=Object.create(null)
H.kO()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.x7.$1(v)
if(u!=null){t=H.VF(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kO:function(){var z,y,x,w,v,u,t
z=C.M1()
z=H.ud(C.Mc,H.ud(C.hQ,H.ud(C.XQ,H.ud(C.XQ,H.ud(C.Jh,H.ud(C.lR,H.ud(C.ur(C.w2),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.N=new H.dC(v)
$.TX=new H.wN(u)
$.x7=new H.VX(t)},
ud:function(a,b){return a(b)||b},
m2:function(a,b,c){return a.indexOf(b,c)>=0},
ys:{
"^":"a;",
X:function(a){return P.vW(this)},
q:function(a,b,c){return H.dc()},
Rz:function(a,b){return H.dc()}},
kz:{
"^":"ys;Q",
Ag:function(){var z=this.$map
if(z==null){z=new H.N5(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.B7(this.Q,z)
this.$map=z}return z},
p:function(a,b){return this.Ag().p(0,b)},
aN:function(a,b){this.Ag().aN(0,b)},
gv:function(a){var z=this.Ag()
return z.gv(z)}},
FD:{
"^":"a;Q,a,b,c,d,e,f,r",
static:{zh:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.FD(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
Zr:{
"^":"a;Q,a,b,c,d,e",
qS:function(a){var z,y,x
z=new RegExp(this.Q).exec(a)
if(z==null)return
y=Object.create(null)
x=this.a
if(x!==-1)y.arguments=z[x+1]
x=this.b
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.c
if(x!==-1)y.expr=z[x+1]
x=this.d
if(x!==-1)y.method=z[x+1]
x=this.e
if(x!==-1)y.receiver=z[x+1]
return y},
static:{cM:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.Zr(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},S7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},Mj:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
Zo:{
"^":"Ge;Q,a",
X:function(a){var z=this.a
if(z==null)return"NullError: "+H.d(this.Q)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
az:{
"^":"Ge;Q,a,b",
X:function(a){var z,y
z=this.a
if(z==null)return"NoSuchMethodError: "+H.d(this.Q)
y=this.b
if(y==null)return"NoSuchMethodError: method not found: '"+H.d(z)+"' ("+H.d(this.Q)+")"
return"NoSuchMethodError: method not found: '"+H.d(z)+"' on '"+H.d(y)+"' ("+H.d(this.Q)+")"},
static:{T3:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.az(a,y,z?null:b.receiver)}}},
vV:{
"^":"Ge;Q",
X:function(a){var z=this.Q
return C.xB.gl0(z)?"Error":"Error: "+z}},
Am:{
"^":"r:1;Q",
$1:function(a){if(!!J.t(a).$isGe)if(a.$thrownJsError==null)a.$thrownJsError=this.Q
return a}},
XO:{
"^":"a;Q,a",
X:function(a){var z,y
z=this.a
if(z!=null)return z
z=this.Q
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.a=z
return z}},
O:{
"^":"r:2;Q",
$0:function(){return this.Q.$0()}},
R:{
"^":"r:2;Q,a",
$0:function(){return this.Q.$1(this.a)}},
dr:{
"^":"r:2;Q,a,b",
$0:function(){return this.Q.$2(this.a,this.b)}},
TL:{
"^":"r:2;Q,a,b,c",
$0:function(){return this.Q.$3(this.a,this.b,this.c)}},
KX:{
"^":"r:2;Q,a,b,c,d",
$0:function(){return this.Q.$4(this.a,this.b,this.c,this.d)}},
r:{
"^":"a;",
X:function(a){return"Closure '"+H.lh(this)+"'"},
gFy:function(){return this},
gFy:function(){return this}},
lc:{
"^":"r;"},
zx:{
"^":"lc;",
X:function(a){var z=this.$name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
q:{
"^":"lc;Q,a,b,c",
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.q))return!1
return this.Q===b.Q&&this.a===b.a&&this.b===b.b},
giO:function(a){var z,y
z=this.b
if(z==null)y=H.wP(this.Q)
else y=typeof z!=="object"?J.v1(z):H.wP(z)
return(y^H.wP(this.a))>>>0},
X:function(a){var z=this.b
if(z==null)z=this.Q
return"Closure '"+H.d(this.c)+"' of "+H.H9(z)},
static:{eZ:function(a){return a.Q},yS:function(a){return a.b},oN:function(){var z=$.bf
if(z==null){z=H.E2("self")
$.bf=z}return z},E2:function(a){var z,y,x,w,v
z=new H.q("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
Pe:{
"^":"Ge;Q",
X:function(a){return this.Q},
static:{aq:function(a,b){return new H.Pe("CastError: Casting value of type "+H.d(a)+" to incompatible type "+H.d(b))}}},
tc:{
"^":"Ge;Q",
X:function(a){return"RuntimeError: "+H.d(this.Q)}},
lb:{
"^":"a;"},
tD:{
"^":"lb;Q,a,b,c",
Zg:function(a){var z=this.LC(a)
return z==null?!1:H.Ly(z,this.za())},
LC:function(a){var z=J.t(a)
return"$signature" in z?z.$signature():null},
za:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.Q
x=J.t(y)
if(!!x.$isnr)z.void=true
else if(!x.$ishJ)z.ret=y.za()
y=this.a
if(y!=null&&y.length!==0)z.args=H.Dz(y)
y=this.b
if(y!=null&&y.length!==0)z.opt=H.Dz(y)
y=this.c
if(y!=null){w=Object.create(null)
v=H.kU(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].za()}z.named=w}return z},
X:function(a){var z,y,x,w,v,u,t,s
z=this.a
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}else{x="("
w=!1}z=this.b
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}x+="]"}else{z=this.c
if(z!=null){x=(w?x+", ":x)+"{"
t=H.kU(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.d(z[s].za())+" "+s}x+="}"}}return x+(") -> "+H.d(this.Q))},
static:{Dz:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].za())
return z}}},
hJ:{
"^":"lb;",
X:function(a){return"dynamic"},
za:function(){return}},
N5:{
"^":"a;Q,a,b,c,d,e,f",
gv:function(a){return this.Q},
gvc:function(a){return H.J(new H.i5(this),[H.Kp(this,0)])},
gUQ:function(a){return H.K1(H.J(new H.i5(this),[H.Kp(this,0)]),new H.Mw(this),H.Kp(this,0),H.Kp(this,1))},
NZ:function(a,b){var z,y
if(typeof b==="string"){z=this.a
if(z==null)return!1
return this.vM(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.b
if(y==null)return!1
return this.vM(y,b)}else return this.CX(b)},
CX:function(a){var z=this.c
if(z==null)return!1
return this.Fh(this.r0(z,this.xi(a)),a)>=0},
p:function(a,b){var z,y,x
if(typeof b==="string"){z=this.a
if(z==null)return
y=this.r0(z,b)
return y==null?null:y.gLk()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.b
if(x==null)return
y=this.r0(x,b)
return y==null?null:y.gLk()}else return this.aa(b)},
aa:function(a){var z,y,x
z=this.c
if(z==null)return
y=this.r0(z,this.xi(a))
x=this.Fh(y,a)
if(x<0)return
return y[x].gLk()},
q:function(a,b,c){var z,y
if(typeof b==="string"){z=this.a
if(z==null){z=this.zK()
this.a=z}this.u9(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.b
if(y==null){y=this.zK()
this.b=y}this.u9(y,b,c)}else this.xw(b,c)},
xw:function(a,b){var z,y,x,w
z=this.c
if(z==null){z=this.zK()
this.c=z}y=this.xi(a)
x=this.r0(z,y)
if(x==null)this.EI(z,y,[this.x4(a,b)])
else{w=this.Fh(x,a)
if(w>=0)x[w].sLk(b)
else x.push(this.x4(a,b))}},
Rz:function(a,b){if(typeof b==="string")return this.H4(this.a,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.H4(this.b,b)
else return this.WM(b)},
WM:function(a){var z,y,x,w
z=this.c
if(z==null)return
y=this.r0(z,this.xi(a))
x=this.Fh(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.GS(w)
return w.gLk()},
aN:function(a,b){var z,y
z=this.d
y=this.f
for(;z!=null;){b.$2(z.Q,z.a)
if(y!==this.f)throw H.b(new P.UV(this))
z=z.b}},
u9:function(a,b,c){var z=this.r0(a,b)
if(z==null)this.EI(a,b,this.x4(b,c))
else z.sLk(c)},
H4:function(a,b){var z
if(a==null)return
z=this.r0(a,b)
if(z==null)return
this.GS(z)
this.rn(a,b)
return z.gLk()},
x4:function(a,b){var z,y
z=new H.db(a,b,null,null)
if(this.d==null){this.e=z
this.d=z}else{y=this.e
z.c=y
y.b=z
this.e=z}++this.Q
this.f=this.f+1&67108863
return z},
GS:function(a){var z,y
z=a.gn8()
y=a.b
if(z==null)this.d=y
else z.b=y
if(y==null)this.e=z
else y.c=z;--this.Q
this.f=this.f+1&67108863},
xi:function(a){return J.v1(a)&0x3ffffff},
Fh:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.mG(a[y].gyK(),b))return y
return-1},
X:function(a){return P.vW(this)},
r0:function(a,b){return a[b]},
EI:function(a,b,c){a[b]=c},
rn:function(a,b){delete a[b]},
vM:function(a,b){return this.r0(a,b)!=null},
zK:function(){var z=Object.create(null)
this.EI(z,"<non-identifier-key>",z)
this.rn(z,"<non-identifier-key>")
return z},
$isym:1},
Mw:{
"^":"r:1;Q",
$1:function(a){return this.Q.p(0,a)}},
db:{
"^":"a;yK:Q<,Lk:a@,b,n8:c<"},
i5:{
"^":"cX;Q",
gv:function(a){return this.Q.Q},
gu:function(a){var z,y
z=this.Q
y=new H.ui(z,z.f,null,null)
y.b=z.d
return y},
aN:function(a,b){var z,y,x
z=this.Q
y=z.d
x=z.f
for(;y!=null;){b.$1(y.Q)
if(x!==z.f)throw H.b(new P.UV(z))
y=y.b}},
$isqC:1},
ui:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z=this.Q
if(this.a!==z.f)throw H.b(new P.UV(z))
else{z=this.b
if(z==null){this.c=null
return!1}else{this.c=z.Q
this.b=z.b
return!0}}}},
dC:{
"^":"r:1;Q",
$1:function(a){return this.Q(a)}},
wN:{
"^":"r:4;Q",
$2:function(a,b){return this.Q(a,b)}},
VX:{
"^":"r:5;Q",
$1:function(a){return this.Q(a)}}}],["","",,H,{
"^":"",
Wp:function(){return new P.lj("No element")},
ar:function(){return new P.lj("Too few elements")},
ZE:function(a,b,c,d){if(c-b<=32)H.w9(a,b,c,d)
else H.d4(a,b,c,d)},
w9:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.U6(a);z<=c;++z){x=y.p(a,z)
w=z
while(!0){if(!(w>b&&J.vU(d.$2(y.p(a,w-1),x),0)))break
v=w-1
y.q(a,w,y.p(a,v))
w=v}y.q(a,w,x)}},
d4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.jn.BU(c-b+1,6)
y=b+z
x=c-z
w=C.jn.BU(b+c,2)
v=w-z
u=w+z
t=J.U6(a)
s=t.p(a,y)
r=t.p(a,v)
q=t.p(a,w)
p=t.p(a,u)
o=t.p(a,x)
if(J.vU(d.$2(s,r),0)){n=r
r=s
s=n}if(J.vU(d.$2(p,o),0)){n=o
o=p
p=n}if(J.vU(d.$2(s,q),0)){n=q
q=s
s=n}if(J.vU(d.$2(r,q),0)){n=q
q=r
r=n}if(J.vU(d.$2(s,p),0)){n=p
p=s
s=n}if(J.vU(d.$2(q,p),0)){n=p
p=q
q=n}if(J.vU(d.$2(r,o),0)){n=o
o=r
r=n}if(J.vU(d.$2(r,q),0)){n=q
q=r
r=n}if(J.vU(d.$2(p,o),0)){n=o
o=p
p=n}t.q(a,y,s)
t.q(a,w,q)
t.q(a,x,o)
t.q(a,v,t.p(a,b))
t.q(a,u,t.p(a,c))
m=b+1
l=c-1
if(J.mG(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.p(a,k)
i=d.$2(j,r)
h=J.t(i)
if(h.m(i,0))continue
if(h.w(i,0)){if(k!==m){t.q(a,k,t.p(a,m))
t.q(a,m,j)}++m}else for(;!0;){i=d.$2(t.p(a,l),r)
h=J.Wx(i)
if(h.A(i,0)){--l
continue}else{g=l-1
if(h.w(i,0)){t.q(a,k,t.p(a,m))
f=m+1
t.q(a,m,t.p(a,l))
t.q(a,l,j)
l=g
m=f
break}else{t.q(a,k,t.p(a,l))
t.q(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.p(a,k)
if(J.UN(d.$2(j,r),0)){if(k!==m){t.q(a,k,t.p(a,m))
t.q(a,m,j)}++m}else if(J.vU(d.$2(j,p),0))for(;!0;)if(J.vU(d.$2(t.p(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.UN(d.$2(t.p(a,l),r),0)){t.q(a,k,t.p(a,m))
f=m+1
t.q(a,m,t.p(a,l))
t.q(a,l,j)
m=f}else{t.q(a,k,t.p(a,l))
t.q(a,l,j)}l=g
break}}e=!1}h=m-1
t.q(a,b,t.p(a,h))
t.q(a,h,r)
h=l+1
t.q(a,c,t.p(a,h))
t.q(a,h,p)
H.ZE(a,b,m-2,d)
H.ZE(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.mG(d.$2(t.p(a,m),r),0);)++m
for(;J.mG(d.$2(t.p(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.p(a,k)
if(J.mG(d.$2(j,r),0)){if(k!==m){t.q(a,k,t.p(a,m))
t.q(a,m,j)}++m}else if(J.mG(d.$2(j,p),0))for(;!0;)if(J.mG(d.$2(t.p(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.UN(d.$2(t.p(a,l),r),0)){t.q(a,k,t.p(a,m))
f=m+1
t.q(a,m,t.p(a,l))
t.q(a,l,j)
m=f}else{t.q(a,k,t.p(a,l))
t.q(a,l,j)}l=g
break}}H.ZE(a,m,l,d)}else H.ZE(a,m,l,d)},
Fv:function(a){return a.gOB()},
ho:{
"^":"cX;",
gu:function(a){return new H.a7(this,this.gv(this),0,null)},
aN:function(a,b){var z,y
z=this.gv(this)
for(y=0;y<z;++y){b.$1(this.Zv(0,y))
if(z!==this.gv(this))throw H.b(new P.UV(this))}},
ez:function(a,b){return H.J(new H.A8(this,b),[null,null])},
tt:function(a,b){var z,y,x
if(b){z=H.J([],[H.ip(this,"ho",0)])
C.Nm.sv(z,this.gv(this))}else{y=Array(this.gv(this))
y.fixed$length=Array
z=H.J(y,[H.ip(this,"ho",0)])}for(x=0;x<this.gv(this);++x){y=this.Zv(0,x)
if(x>=z.length)return H.e(z,x)
z[x]=y}return z},
br:function(a){return this.tt(a,!0)},
$isqC:1},
a7:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z,y,x,w
z=this.Q
y=J.U6(z)
x=y.gv(z)
if(this.a!==x)throw H.b(new P.UV(z))
w=this.b
if(w>=x){this.c=null
return!1}this.c=y.Zv(z,w);++this.b
return!0}},
i1:{
"^":"cX;Q,a",
gu:function(a){var z=new H.MH(null,J.Nx(this.Q),this.a)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gv:function(a){return J.wS(this.Q)},
$ascX:function(a,b){return[b]},
static:{K1:function(a,b,c,d){if(!!J.t(a).$isqC)return H.J(new H.xy(a,b),[c,d])
return H.J(new H.i1(a,b),[c,d])}}},
xy:{
"^":"i1;Q,a",
$isqC:1},
MH:{
"^":"AC;Q,a,b",
D:function(){var z=this.a
if(z.D()){this.Q=this.Mi(z.gk())
return!0}this.Q=null
return!1},
gk:function(){return this.Q},
Mi:function(a){return this.b.$1(a)}},
A8:{
"^":"ho;Q,a",
gv:function(a){return J.wS(this.Q)},
Zv:function(a,b){return this.Mi(J.i4(this.Q,b))},
Mi:function(a){return this.a.$1(a)},
$asho:function(a,b){return[b]},
$ascX:function(a,b){return[b]},
$isqC:1},
SU:{
"^":"a;",
sv:function(a,b){throw H.b(new P.ub("Cannot change the length of a fixed-length list"))},
Rz:function(a,b){throw H.b(new P.ub("Cannot remove from a fixed-length list"))}}}],["","",,H,{
"^":"",
kU:function(a){var z=H.J(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
Oj:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.Sx()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.Q=null
new self.MutationObserver(H.M(new P.th(z),1)).observe(y,{childList:true})
return new P.ha(z,y,x)}else if(self.setImmediate!=null)return P.q9()
return P.K7()},
ZV:[function(a){++init.globalState.e.a
self.scheduleImmediate(H.M(new P.C6(a),0))},"$1","Sx",2,0,26],
oA:[function(a){++init.globalState.e.a
self.setImmediate(H.M(new P.Ft(a),0))},"$1","q9",2,0,26],
Bz:[function(a){P.YF(C.RT,a)},"$1","K7",2,0,26],
VH:function(a,b){var z=H.N7()
z=H.KT(z,[z,z]).Zg(a)
if(z){b.toString
return a}else{b.toString
return a}},
pu:function(){var z,y
for(;z=$.S6,z!=null;){$.mg=null
y=J.A0(z)
$.S6=y
if(y==null)$.k8=null
$.X3=z.ghG()
z.Ki()}},
ye:[function(){$.UD=!0
try{P.pu()}finally{$.X3=C.NU
$.mg=null
$.UD=!1
if($.S6!=null)$.ej().$1(P.M7())}},"$0","M7",0,0,3],
IA:function(a){if($.S6==null){$.k8=a
$.S6=a
if(!$.UD)$.ej().$1(P.M7())}else{$.k8.b=a
$.k8=a}},
rb:function(a){var z,y
z=$.X3
if(C.NU===z){P.Tk(null,null,C.NU,a)
return}z.toString
if(C.NU.gF7()===z){P.Tk(null,null,z,a)
return}y=$.X3
P.Tk(null,null,y,y.kb(a,!0))},
QE:[function(a){},"$1","ux",2,0,0],
Z0:[function(a,b){var z=$.X3
z.toString
P.L2(null,null,z,a,b)},function(a){return P.Z0(a,null)},"$2","$1","SD",2,2,7,0],
dL:[function(){},"$0","YB",0,0,3],
FE:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.Ru(u)
z=t
y=H.ts(u)
$.X3.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.w8(x)
w=t
v=x.gI4()
c.$2(w,v)}}},
NX:function(a,b,c,d){var z=a.Gv(0)
if(!!J.t(z).$isb8)z.wM(new P.dR(b,c,d))
else b.ZL(c,d)},
TB:function(a,b){return new P.uR(a,b)},
Tu:function(a,b,c){$.X3.toString
a.MR(b,c)},
rT:function(a,b){var z=$.X3
if(z===C.NU){z.toString
return P.YF(a,b)}return P.YF(a,z.kb(b,!0))},
YF:function(a,b){var z=C.jn.BU(a.Q,1000)
return H.cy(z<0?0:z,b)},
PJ:function(a){var z=$.X3
$.X3=a
return z},
L2:function(a,b,c,d,e){var z,y,x
z=new P.OM(new P.pK(d,e),C.NU,null)
y=$.S6
if(y==null){P.IA(z)
$.mg=$.k8}else{x=$.mg
if(x==null){z.b=y
$.mg=z
$.S6=z}else{z.b=x.b
x.b=z
$.mg=z
if(z.b==null)$.k8=z}}},
T8:function(a,b,c,d){var z,y
if($.X3===c)return d.$0()
z=P.PJ(c)
try{y=d.$0()
return y}finally{$.X3=z}},
yv:function(a,b,c,d,e){var z,y
if($.X3===c)return d.$1(e)
z=P.PJ(c)
try{y=d.$1(e)
return y}finally{$.X3=z}},
Qx:function(a,b,c,d,e,f){var z,y
if($.X3===c)return d.$2(e,f)
z=P.PJ(c)
try{y=d.$2(e,f)
return y}finally{$.X3=z}},
Tk:function(a,b,c,d){var z=C.NU!==c
if(z){d=c.kb(d,!(!z||C.NU.gF7()===c))
c=C.NU}P.IA(new P.OM(d,c,null))},
th:{
"^":"r:1;Q",
$1:function(a){var z,y
H.ox()
z=this.Q
y=z.Q
z.Q=null
y.$0()}},
ha:{
"^":"r:6;Q,a,b",
$1:function(a){var z,y;++init.globalState.e.a
this.Q.Q=a
z=this.a
y=this.b
z.firstChild?z.removeChild(y):z.appendChild(y)}},
C6:{
"^":"r:2;Q",
$0:function(){H.ox()
this.Q.$0()}},
Ft:{
"^":"r:2;Q",
$0:function(){H.ox()
this.Q.$0()}},
O6:{
"^":"OH;Q,a",
X:function(a){var z,y
z="Uncaught Error: "+H.d(this.Q)
y=this.a
return y!=null?z+("\nStack Trace:\n"+H.d(y)):z},
static:{HR:function(a,b){if(b!=null)return b
if(!!J.t(a).$isGe)return a.gI4()
return}}},
b8:{
"^":"a;"},
Fe:{
"^":"a;nV:Q<,yG:a>,b,c,d",
gt9:function(){return this.a.a},
gUF:function(){return(this.b&1)!==0},
gLi:function(){return this.b===6},
gyq:function(){return this.b===8},
gdU:function(){return this.c},
gco:function(){return this.c}},
vs:{
"^":"a;YM:Q?,t9:a<,b",
gAT:function(){return this.Q===8},
sKl:function(a){if(a)this.Q=2
else this.Q=0},
Rx:function(a,b){var z,y
z=H.J(new P.vs(0,$.X3,null),[null])
y=z.a
if(y!==C.NU){y.toString
if(b!=null)b=P.VH(b,y)}this.xf(new P.Fe(null,z,b==null?1:3,a,b))
return z},
wM:function(a){var z,y
z=$.X3
y=new P.vs(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.NU)z.toString
this.xf(new P.Fe(null,y,8,a,null))
return y},
gcF:function(){return this.b},
gSt:function(){return this.b},
vd:function(a){this.Q=4
this.b=a},
P9:function(a){this.Q=8
this.b=a},
Is:function(a,b){this.P9(new P.OH(a,b))},
xf:function(a){var z
if(this.Q>=4){z=this.a
z.toString
P.Tk(null,null,z,new P.da(this,a))}else{a.Q=this.b
this.b=a}},
ah:function(){var z,y,x
z=this.b
this.b=null
for(y=null;z!=null;y=z,z=x){x=z.gnV()
z.Q=y}return y},
HH:function(a){var z,y
z=J.t(a)
if(!!z.$isb8)if(!!z.$isvs)P.A9(a,this)
else P.k3(a,this)
else{y=this.ah()
this.vd(a)
P.HZ(this,y)}},
X2:function(a){var z=this.ah()
this.vd(a)
P.HZ(this,z)},
ZL:[function(a,b){var z=this.ah()
this.P9(new P.OH(a,b))
P.HZ(this,z)},function(a){return this.ZL(a,null)},"yk","$2","$1","gFa",2,2,7,0],
$isb8:1,
static:{k3:function(a,b){var z,y,x,w
b.sYM(2)
try{a.Rx(new P.pV(b),new P.U7(b))}catch(x){w=H.Ru(x)
z=w
y=H.ts(x)
P.rb(new P.vr(b,z,y))}},A9:function(a,b){var z
b.Q=2
z=new P.Fe(null,b,0,null,null)
if(a.Q>=4)P.HZ(a,z)
else a.xf(z)},HZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.Q=a
for(y=a;!0;){x={}
w=y.gAT()
if(b==null){if(w){v=z.Q.gSt()
y=z.Q.gt9()
x=J.w8(v)
u=v.gI4()
y.toString
P.L2(null,null,y,x,u)}return}for(;b.gnV()!=null;b=t){t=b.Q
b.Q=null
P.HZ(z.Q,b)}x.Q=!0
s=w?null:z.Q.gcF()
x.a=s
x.b=!1
y=!w
if(!y||b.gUF()||b.b===8){r=b.gt9()
if(w){u=z.Q.gt9()
u.toString
if(u==null?r!=null:u!==r){u=u.gF7()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.Q.gSt()
y=z.Q.gt9()
x=J.w8(v)
u=v.gI4()
y.toString
P.L2(null,null,y,x,u)
return}q=$.X3
if(q==null?r!=null:q!==r)$.X3=r
else q=null
if(y){if(b.gUF())x.Q=new P.rq(x,b,s,r).$0()}else new P.RW(z,x,b,r).$0()
if(b.gyq())new P.YP(z,x,w,b,r).$0()
if(q!=null)$.X3=q
if(x.b)return
if(x.Q===!0){y=x.a
y=(s==null?y!=null:s!==y)&&!!J.t(y).$isb8}else y=!1
if(y){p=x.a
o=b.a
if(p instanceof P.vs)if(p.Q>=4){o.Q=2
z.Q=p
b=new P.Fe(null,o,0,null,null)
y=p
continue}else P.A9(p,o)
else P.k3(p,o)
return}}o=b.a
b=o.ah()
y=x.Q
x=x.a
if(y===!0){o.Q=4
o.b=x}else{o.Q=8
o.b=x}z.Q=o
y=o}}}},
da:{
"^":"r:2;Q,a",
$0:function(){P.HZ(this.Q,this.a)}},
pV:{
"^":"r:1;Q",
$1:function(a){this.Q.X2(a)}},
U7:{
"^":"r:8;Q",
$2:function(a,b){this.Q.ZL(a,b)},
$1:function(a){return this.$2(a,null)}},
vr:{
"^":"r:2;Q,a,b",
$0:function(){this.Q.ZL(this.a,this.b)}},
rq:{
"^":"r:9;Q,a,b,c",
$0:function(){var z,y,x,w
try{this.Q.a=this.c.FI(this.a.gdU(),this.b)
return!0}catch(x){w=H.Ru(x)
z=w
y=H.ts(x)
this.Q.a=new P.OH(z,y)
return!1}}},
RW:{
"^":"r:3;Q,a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.Q.Q.gSt()
y=!0
r=this.b
if(r.gLi()){x=r.c
try{y=this.c.FI(x,J.w8(z))}catch(q){r=H.Ru(q)
w=r
v=H.ts(q)
r=J.w8(z)
p=w
o=(r==null?p==null:r===p)?z:new P.OH(w,v)
r=this.a
r.a=o
r.Q=!1
return}}u=r.d
if(y===!0&&u!=null){try{r=u
p=H.N7()
p=H.KT(p,[p,p]).Zg(r)
n=this.c
m=this.a
if(p)m.a=n.mg(u,J.w8(z),z.gI4())
else m.a=n.FI(u,J.w8(z))}catch(q){r=H.Ru(q)
t=r
s=H.ts(q)
r=J.w8(z)
p=t
o=(r==null?p==null:r===p)?z:new P.OH(t,s)
r=this.a
r.a=o
r.Q=!1
return}this.a.Q=!0}else{r=this.a
r.a=z
r.Q=!1}}},
YP:{
"^":"r:3;Q,a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.Q=null
try{w=this.d.Gr(this.c.gco())
z.Q=w
v=w}catch(u){z=H.Ru(u)
y=z
x=H.ts(u)
if(this.b){z=J.w8(this.Q.Q.gSt())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.a
if(z)v.a=this.Q.Q.gSt()
else v.a=new P.OH(y,x)
v.Q=!1
return}if(!!J.t(v).$isb8){t=this.c
s=t.gyG(t)
s.sKl(!0)
this.a.b=!0
v.Rx(new P.jZ(this.Q,s),new P.FZ(z,s))}}},
jZ:{
"^":"r:1;Q,a",
$1:function(a){P.HZ(this.Q.Q,new P.Fe(null,this.a,0,null,null))}},
FZ:{
"^":"r:8;Q,a",
$2:function(a,b){var z,y
z=this.Q
if(!(z.Q instanceof P.vs)){y=H.J(new P.vs(0,$.X3,null),[null])
z.Q=y
y.Is(a,b)}P.HZ(z.Q,new P.Fe(null,this.a,0,null,null))},
$1:function(a){return this.$2(a,null)}},
OM:{
"^":"a;Q,hG:a<,aw:b>",
Ki:function(){return this.Q.$0()}},
qh:{
"^":"a;",
ez:function(a,b){return H.J(new P.t3(b,this),[H.ip(this,"qh",0),null])},
aN:function(a,b){var z,y
z={}
y=H.J(new P.vs(0,$.X3,null),[null])
z.Q=null
z.Q=this.X5(new P.lz(z,this,b,y),!0,new P.M4(y),y.gFa())
return y},
gv:function(a){var z,y
z={}
y=H.J(new P.vs(0,$.X3,null),[P.KN])
z.Q=0
this.X5(new P.B5(z),!0,new P.PI(z,y),y.gFa())
return y},
br:function(a){var z,y
z=H.J([],[H.ip(this,"qh",0)])
y=H.J(new P.vs(0,$.X3,null),[[P.zM,H.ip(this,"qh",0)]])
this.X5(new P.VV(this,z),!0,new P.Dy(z,y),y.gFa())
return y}},
lz:{
"^":"r;Q,a,b,c",
$1:function(a){P.FE(new P.Rl(this.b,a),new P.Jb(),P.TB(this.Q.Q,this.c))},
$signature:function(){return H.IG(function(a){return{func:1,args:[a]}},this.a,"qh")}},
Rl:{
"^":"r:2;Q,a",
$0:function(){return this.Q.$1(this.a)}},
Jb:{
"^":"r:1;",
$1:function(a){}},
M4:{
"^":"r:2;Q",
$0:function(){this.Q.HH(null)}},
B5:{
"^":"r:1;Q",
$1:function(a){++this.Q.Q}},
PI:{
"^":"r:2;Q,a",
$0:function(){this.a.HH(this.Q.Q)}},
VV:{
"^":"r;Q,a",
$1:function(a){this.a.push(a)},
$signature:function(){return H.IG(function(a){return{func:1,args:[a]}},this.Q,"qh")}},
Dy:{
"^":"r:2;Q,a",
$0:function(){this.a.HH(this.Q)}},
MO:{
"^":"a;"},
NO:{
"^":"a;"},
KA:{
"^":"a;t9:c<,YM:d?",
nB:function(a,b){var z=this.d
if((z&8)!==0)return
this.d=(z+128|4)>>>0
if(z<128&&this.f!=null)this.f.FK()
if((z&4)===0&&(this.d&32)===0)this.Ge(this.gb9())},
zd:function(a){return this.nB(a,null)},
QE:function(a){var z=this.d
if((z&8)!==0)return
if(z>=128){z-=128
this.d=z
if(z<128){if((z&64)!==0){z=this.f
z=!z.gl0(z)}else z=!1
if(z)this.f.t2(this)
else{z=(this.d&4294967291)>>>0
this.d=z
if((z&32)===0)this.Ge(this.gxl())}}}},
Gv:function(a){var z=(this.d&4294967279)>>>0
this.d=z
if((z&8)!==0)return this.e
this.WN()
return this.e},
WN:function(){var z=(this.d|8)>>>0
this.d=z
if((z&64)!==0)this.f.FK()
if((this.d&32)===0)this.f=null
this.e=this.cZ()},
Rg:["L5",function(a,b){var z=this.d
if((z&8)!==0)return
if(z<32)this.MW(b)
else this.C2(new P.LV(b,null))}],
MR:["Xu",function(a,b){var z=this.d
if((z&8)!==0)return
if(z<32)this.y7(a,b)
else this.C2(new P.WG(a,b,null))}],
EC:function(){var z=this.d
if((z&8)!==0)return
z=(z|2)>>>0
this.d=z
if(z<32)this.Dd()
else this.C2(C.Wj)},
lT:[function(){},"$0","gb9",0,0,3],
ie:[function(){},"$0","gxl",0,0,3],
cZ:function(){return},
C2:function(a){var z,y
z=this.f
if(z==null){z=new P.Qk(null,null,0)
this.f=z}z.h(0,a)
y=this.d
if((y&64)===0){y=(y|64)>>>0
this.d=y
if(y<128)this.f.t2(this)}},
MW:function(a){var z=this.d
this.d=(z|32)>>>0
this.c.m1(this.Q,a)
this.d=(this.d&4294967263)>>>0
this.Iy((z&4)!==0)},
y7:function(a,b){var z,y
z=this.d
y=new P.Vo(this,a,b)
if((z&1)!==0){this.d=(z|16)>>>0
this.WN()
z=this.e
if(!!J.t(z).$isb8)z.wM(y)
else y.$0()}else{y.$0()
this.Iy((z&4)!==0)}},
Dd:function(){var z,y
z=new P.qB(this)
this.WN()
this.d=(this.d|16)>>>0
y=this.e
if(!!J.t(y).$isb8)y.wM(z)
else z.$0()},
Ge:function(a){var z=this.d
this.d=(z|32)>>>0
a.$0()
this.d=(this.d&4294967263)>>>0
this.Iy((z&4)!==0)},
Iy:function(a){var z,y
if((this.d&64)!==0){z=this.f
z=z.gl0(z)}else z=!1
if(z){z=(this.d&4294967231)>>>0
this.d=z
if((z&4)!==0)if(z<128){z=this.f
z=z==null||z.gl0(z)}else z=!1
else z=!1
if(z)this.d=(this.d&4294967291)>>>0}for(;!0;a=y){z=this.d
if((z&8)!==0){this.f=null
return}y=(z&4)!==0
if(a===y)break
this.d=(z^32)>>>0
if(y)this.lT()
else this.ie()
this.d=(this.d&4294967263)>>>0}z=this.d
if((z&64)!==0&&z<128)this.f.t2(this)},
Cy:function(a,b,c,d){var z=this.c
z.toString
this.Q=a
this.a=P.VH(b,z)
this.b=c}},
Vo:{
"^":"r:3;Q,a,b",
$0:function(){var z,y,x,w,v,u
z=this.Q
y=z.d
if((y&8)!==0&&(y&16)===0)return
z.d=(y|32)>>>0
y=z.a
x=H.N7()
x=H.KT(x,[x,x]).Zg(y)
w=z.c
v=this.a
u=z.a
if(x)w.z8(u,v,this.b)
else w.m1(u,v)
z.d=(z.d&4294967263)>>>0}},
qB:{
"^":"r:3;Q",
$0:function(){var z,y
z=this.Q
y=z.d
if((y&16)===0)return
z.d=(y|42)>>>0
z.c.bH(z.b)
z.d=(z.d&4294967263)>>>0}},
aA:{
"^":"a;aw:Q*"},
LV:{
"^":"aA;M:a>,Q",
dP:function(a){a.MW(this.a)}},
WG:{
"^":"aA;kc:a>,I4:b<,Q",
dP:function(a){a.y7(this.a,this.b)}},
dp:{
"^":"a;",
dP:function(a){a.Dd()},
gaw:function(a){return},
saw:function(a,b){throw H.b(new P.lj("No events after a done."))}},
B3:{
"^":"a;YM:Q?",
t2:function(a){var z=this.Q
if(z===1)return
if(z>=1){this.Q=1
return}P.rb(new P.CR(this,a))
this.Q=1},
FK:function(){if(this.Q===1)this.Q=3}},
CR:{
"^":"r:2;Q,a",
$0:function(){var z,y
z=this.Q
y=z.Q
z.Q=0
if(y===3)return
z.vG(this.a)}},
Qk:{
"^":"B3;a,b,Q",
gl0:function(a){return this.b==null},
h:function(a,b){var z=this.b
if(z==null){this.b=b
this.a=b}else{J.it(z,b)
this.b=b}},
vG:function(a){var z,y
z=this.a
y=J.A0(z)
this.a=y
if(y==null)this.b=null
z.dP(a)}},
dR:{
"^":"r:2;Q,a,b",
$0:function(){return this.Q.ZL(this.a,this.b)}},
uR:{
"^":"r:10;Q,a",
$2:function(a,b){return P.NX(this.Q,this.a,a,b)}},
YR:{
"^":"qh;",
X5:function(a,b,c,d){return this.w3(a,d,c,!0===b)},
zC:function(a,b,c){return this.X5(a,null,b,c)},
w3:function(a,b,c,d){return P.zK(this,a,b,c,d,H.ip(this,"YR",0),H.ip(this,"YR",1))},
FC:function(a,b){b.Rg(0,a)},
$asqh:function(a,b){return[b]}},
fB:{
"^":"KA;r,x,Q,a,b,c,d,e,f",
Rg:function(a,b){if((this.d&2)!==0)return
this.L5(this,b)},
MR:function(a,b){if((this.d&2)!==0)return
this.Xu(a,b)},
lT:[function(){var z=this.x
if(z==null)return
z.zd(0)},"$0","gb9",0,0,3],
ie:[function(){var z=this.x
if(z==null)return
z.QE(0)},"$0","gxl",0,0,3],
cZ:function(){var z=this.x
if(z!=null){this.x=null
z.Gv(0)}return},
yi:[function(a){this.r.FC(a,this)},"$1","gwU",2,0,function(){return H.IG(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"fB")}],
SW:[function(a,b){this.MR(a,b)},"$2","gPr",4,0,11],
oZ:[function(){this.EC()},"$0","gos",0,0,3],
JC:function(a,b,c,d,e,f,g){var z,y
z=this.gwU()
y=this.gPr()
this.x=this.r.Q.zC(z,this.gos(),y)},
static:{zK:function(a,b,c,d,e,f,g){var z=$.X3
z=H.J(new P.fB(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.Cy(b,c,d,e)
z.JC(a,b,c,d,e,f,g)
return z}}},
t3:{
"^":"YR;a,Q",
FC:function(a,b){var z,y,x,w,v
z=null
try{z=this.Eh(a)}catch(w){v=H.Ru(w)
y=v
x=H.ts(w)
P.Tu(b,y,x)
return}J.QM(b,z)},
Eh:function(a){return this.a.$1(a)}},
OH:{
"^":"a;kc:Q>,I4:a<",
X:function(a){return H.d(this.Q)},
$isGe:1},
m0:{
"^":"a;"},
pK:{
"^":"r:2;Q,a",
$0:function(){var z=this.Q
throw H.b(new P.O6(z,P.HR(z,this.a)))}},
Ji:{
"^":"m0;",
geT:function(a){return},
gF7:function(){return this},
bH:function(a){var z,y,x,w
try{if(C.NU===$.X3){x=a.$0()
return x}x=P.T8(null,null,this,a)
return x}catch(w){x=H.Ru(w)
z=x
y=H.ts(w)
return P.L2(null,null,this,z,y)}},
m1:function(a,b){var z,y,x,w
try{if(C.NU===$.X3){x=a.$1(b)
return x}x=P.yv(null,null,this,a,b)
return x}catch(w){x=H.Ru(w)
z=x
y=H.ts(w)
return P.L2(null,null,this,z,y)}},
z8:function(a,b,c){var z,y,x,w
try{if(C.NU===$.X3){x=a.$2(b,c)
return x}x=P.Qx(null,null,this,a,b,c)
return x}catch(w){x=H.Ru(w)
z=x
y=H.ts(w)
return P.L2(null,null,this,z,y)}},
kb:function(a,b){if(b)return new P.hj(this,a)
else return new P.MK(this,a)},
oj:function(a,b){if(b)return new P.pQ(this,a)
else return new P.FG(this,a)},
p:function(a,b){return},
Gr:function(a){if($.X3===C.NU)return a.$0()
return P.T8(null,null,this,a)},
FI:function(a,b){if($.X3===C.NU)return a.$1(b)
return P.yv(null,null,this,a,b)},
mg:function(a,b,c){if($.X3===C.NU)return a.$2(b,c)
return P.Qx(null,null,this,a,b,c)}},
hj:{
"^":"r:2;Q,a",
$0:function(){return this.Q.bH(this.a)}},
MK:{
"^":"r:2;Q,a",
$0:function(){return this.Q.Gr(this.a)}},
pQ:{
"^":"r:1;Q,a",
$1:function(a){return this.Q.m1(this.a,a)}},
FG:{
"^":"r:1;Q,a",
$1:function(a){return this.Q.FI(this.a,a)}}}],["","",,P,{
"^":"",
u5:function(){return H.J(new H.N5(0,null,null,null,null,null,0),[null,null])},
Td:function(a){return H.B7(a,H.J(new H.N5(0,null,null,null,null,null,0),[null,null]))},
Ou:[function(a,b){return J.mG(a,b)},"$2","iv",4,0,27],
vJ:[function(a){return J.v1(a)},"$1","Ed",2,0,18],
EP:function(a,b,c){var z,y
if(P.hB(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.xb()
y.push(a)
try{P.Vr(a,z)}finally{if(0>=y.length)return H.e(y,0)
y.pop()}y=P.vg(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
WE:function(a,b,c){var z,y,x
if(P.hB(a))return b+"..."+c
z=new P.Rn(b)
y=$.xb()
y.push(a)
try{x=z
x.Q=P.vg(x.gIN(),a,", ")}finally{if(0>=y.length)return H.e(y,0)
y.pop()}y=z
y.Q=y.gIN()+c
y=z.gIN()
return y.charCodeAt(0)==0?y:y},
hB:function(a){var z,y
for(z=0;y=$.xb(),z<y.length;++z)if(a===y[z])return!0
return!1},
Vr:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gu(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.D())return
w=H.d(z.gk())
b.push(w)
y+=w.length+2;++x}if(!z.D()){if(x<=5)return
if(0>=b.length)return H.e(b,0)
v=b.pop()
if(0>=b.length)return H.e(b,0)
u=b.pop()}else{t=z.gk();++x
if(!z.D()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.e(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gk();++x
for(;z.D();t=s,s=r){r=z.gk();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
L5:function(a,b,c,d,e){return H.J(new H.N5(0,null,null,null,null,null,0),[d,e])},
Q9:function(a,b){return H.J(new P.ey(0,null,null,null,null,null,0),[a,b])},
Ls:function(a,b,c,d){return H.J(new P.b6(0,null,null,null,null,null,0),[d])},
vW:function(a){var z,y,x
z={}
if(P.hB(a))return"{...}"
y=new P.Rn("")
try{$.xb().push(a)
x=y
x.Q=x.gIN()+"{"
z.Q=!0
J.kH(a,new P.W0(z,y))
z=y
z.Q=z.gIN()+"}"}finally{z=$.xb()
if(0>=z.length)return H.e(z,0)
z.pop()}z=y.gIN()
return z.charCodeAt(0)==0?z:z},
ey:{
"^":"N5;Q,a,b,c,d,e,f",
xi:function(a){return H.CU(a)&0x3ffffff},
Fh:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gyK()
if(x==null?b==null:x===b)return y}return-1}},
b6:{
"^":"u3;Q,a,b,c,d,e,f",
gu:function(a){var z=new P.zQ(this,this.f,null,null)
z.b=this.d
return z},
gv:function(a){return this.Q},
tg:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.a
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.b
if(y==null)return!1
return y[b]!=null}else return this.PR(b)},
PR:function(a){var z=this.c
if(z==null)return!1
return this.DF(z[this.NT(a)],a)>=0},
hV:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.tg(0,a)?a:null
else return this.vR(a)},
vR:function(a){var z,y,x
z=this.c
if(z==null)return
y=z[this.NT(a)]
x=this.DF(y,a)
if(x<0)return
return J.Tf(y,x).gdA()},
aN:function(a,b){var z,y
z=this.d
y=this.f
for(;z!=null;){b.$1(z.Q)
if(y!==this.f)throw H.b(new P.UV(this))
z=z.a}},
h:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.a
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.a=y
z=y}return this.cA(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.b
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
x=y}return this.cA(x,b)}else return this.B7(0,b)},
B7:function(a,b){var z,y,x
z=this.c
if(z==null){z=P.T2()
this.c=z}y=this.NT(b)
x=z[y]
if(x==null)z[y]=[this.c5(b)]
else{if(this.DF(x,b)>=0)return!1
x.push(this.c5(b))}return!0},
Rz:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.Nv(this.a,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.Nv(this.b,b)
else return this.qg(0,b)},
qg:function(a,b){var z,y,x
z=this.c
if(z==null)return!1
y=z[this.NT(b)]
x=this.DF(y,b)
if(x<0)return!1
this.cN(y.splice(x,1)[0])
return!0},
V1:function(a){if(this.Q>0){this.e=null
this.d=null
this.c=null
this.b=null
this.a=null
this.Q=0
this.f=this.f+1&67108863}},
cA:function(a,b){if(a[b]!=null)return!1
a[b]=this.c5(b)
return!0},
Nv:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cN(z)
delete a[b]
return!0},
c5:function(a){var z,y
z=new P.tj(a,null,null)
if(this.d==null){this.e=z
this.d=z}else{y=this.e
z.b=y
y.a=z
this.e=z}++this.Q
this.f=this.f+1&67108863
return z},
cN:function(a){var z,y
z=a.gOx()
y=a.a
if(z==null)this.d=y
else z.a=y
if(y==null)this.e=z
else y.b=z;--this.Q
this.f=this.f+1&67108863},
NT:function(a){return J.v1(a)&0x3ffffff},
DF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.mG(a[y].gdA(),b))return y
return-1},
$isqC:1,
static:{T2:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
tj:{
"^":"a;dA:Q<,a,Ox:b<"},
zQ:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z=this.Q
if(this.a!==z.f)throw H.b(new P.UV(z))
else{z=this.b
if(z==null){this.c=null
return!1}else{this.c=z.Q
this.b=z.a
return!0}}}},
u3:{
"^":"Vj;"},
LU:{
"^":"E9;"},
E9:{
"^":"a+lD;",
$iszM:1,
$aszM:null,
$isqC:1},
lD:{
"^":"a;",
gu:function(a){return new H.a7(a,this.gv(a),0,null)},
Zv:function(a,b){return this.p(a,b)},
aN:function(a,b){var z,y
z=this.gv(a)
for(y=0;y<z;++y){b.$1(this.p(a,y))
if(z!==this.gv(a))throw H.b(new P.UV(a))}},
ez:function(a,b){return H.J(new H.A8(a,b),[null,null])},
tt:function(a,b){var z,y,x
if(b){z=H.J([],[H.ip(a,"lD",0)])
C.Nm.sv(z,this.gv(a))}else{y=Array(this.gv(a))
y.fixed$length=Array
z=H.J(y,[H.ip(a,"lD",0)])}for(x=0;x<this.gv(a);++x){y=this.p(a,x)
if(x>=z.length)return H.e(z,x)
z[x]=y}return z},
br:function(a){return this.tt(a,!0)},
Rz:function(a,b){var z
for(z=0;z<this.gv(a);++z)if(J.mG(this.p(a,z),b)){this.YW(a,z,this.gv(a)-1,a,z+1)
this.sv(a,this.gv(a)-1)
return!0}return!1},
YW:["GH",function(a,b,c,d,e){var z,y,x
P.jB(b,c,this.gv(a),null,null,null)
z=c-b
if(z===0)return
y=J.U6(d)
if(e+z>y.gv(d))throw H.b(H.ar())
if(e<b)for(x=z-1;x>=0;--x)this.q(a,b+x,y.p(d,e+x))
else for(x=0;x<z;++x)this.q(a,b+x,y.p(d,e+x))}],
X:function(a){return P.WE(a,"[","]")},
$iszM:1,
$aszM:null,
$isqC:1},
W0:{
"^":"r:12;Q,a",
$2:function(a,b){var z,y
z=this.Q
if(!z.Q)this.a.Q+=", "
z.Q=!1
z=this.a
y=z.Q+=H.d(a)
z.Q=y+": "
z.Q+=H.d(b)}},
Sw:{
"^":"cX;Q,a,b,c",
gu:function(a){return new P.UQ(this,this.b,this.c,this.a,null)},
aN:function(a,b){var z,y,x
z=this.c
for(y=this.a;y!==this.b;y=(y+1&this.Q.length-1)>>>0){x=this.Q
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.c)H.vh(new P.UV(this))}},
gl0:function(a){return this.a===this.b},
gv:function(a){return(this.b-this.a&this.Q.length-1)>>>0},
tt:function(a,b){var z,y
if(b){z=H.J([],[H.Kp(this,0)])
C.Nm.sv(z,this.gv(this))}else{y=Array(this.gv(this))
y.fixed$length=Array
z=H.J(y,[H.Kp(this,0)])}this.XX(z)
return z},
br:function(a){return this.tt(a,!0)},
Rz:function(a,b){var z,y
for(z=this.a;z!==this.b;z=(z+1&this.Q.length-1)>>>0){y=this.Q
if(z<0||z>=y.length)return H.e(y,z)
if(J.mG(y[z],b)){this.qg(0,z);++this.c
return!0}}return!1},
V1:function(a){var z,y,x,w,v
z=this.a
y=this.b
if(z!==y){for(x=this.Q,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.b=0
this.a=0;++this.c}},
X:function(a){return P.WE(this,"{","}")},
Ux:function(){var z,y,x,w
z=this.a
if(z===this.b)throw H.b(H.Wp());++this.c
y=this.Q
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.a=(z+1&x-1)>>>0
return w},
B7:function(a,b){var z,y,x
z=this.Q
y=this.b
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.b=x
if(this.a===x)this.wL();++this.c},
qg:function(a,b){var z,y,x,w,v,u,t,s
z=this.Q
y=z.length
x=y-1
w=this.a
v=this.b
if((b-w&x)>>>0<(v-b&x)>>>0){for(u=b;u!==w;u=t){t=(u-1&x)>>>0
if(t<0||t>=y)return H.e(z,t)
v=z[t]
if(u<0||u>=y)return H.e(z,u)
z[u]=v}if(w>=y)return H.e(z,w)
z[w]=null
this.a=(w+1&x)>>>0
return(b+1&x)>>>0}else{w=(v-1&x)>>>0
this.b=w
for(u=b;u!==w;u=s){s=(u+1&x)>>>0
if(s<0||s>=y)return H.e(z,s)
v=z[s]
if(u<0||u>=y)return H.e(z,u)
z[u]=v}if(w<0||w>=y)return H.e(z,w)
z[w]=null
return b}},
wL:function(){var z,y,x,w
z=Array(this.Q.length*2)
z.fixed$length=Array
y=H.J(z,[H.Kp(this,0)])
z=this.Q
x=this.a
w=z.length-x
C.Nm.YW(y,0,w,z,x)
C.Nm.YW(y,w,w+this.a,this.Q,0)
this.a=0
this.b=this.Q.length
this.Q=y},
XX:function(a){var z,y,x,w,v
z=this.a
y=this.b
x=this.Q
if(z<=y){w=y-z
C.Nm.YW(a,0,w,x,z)
return w}else{v=x.length-z
C.Nm.YW(a,0,v,x,z)
C.Nm.YW(a,v,v+this.b,this.Q,0)
return this.b+v}},
Eo:function(a,b){var z=Array(8)
z.fixed$length=Array
this.Q=H.J(z,[b])},
$isqC:1,
static:{NZ:function(a,b){var z=H.J(new P.Sw(null,0,0,0),[b])
z.Eo(a,b)
return z}}},
UQ:{
"^":"a;Q,a,b,c,d",
gk:function(){return this.d},
D:function(){var z,y,x
z=this.Q
if(this.b!==z.c)H.vh(new P.UV(z))
y=this.c
if(y===this.a){this.d=null
return!1}z=z.Q
x=z.length
if(y>=x)return H.e(z,y)
this.d=z[y]
this.c=(y+1&x-1)>>>0
return!0}},
Ma:{
"^":"a;",
tt:function(a,b){var z,y,x,w,v
if(b){z=H.J([],[H.Kp(this,0)])
C.Nm.sv(z,this.gv(this))}else{y=Array(this.gv(this))
y.fixed$length=Array
z=H.J(y,[H.Kp(this,0)])}for(y=this.gu(this),x=0;y.D();x=v){w=y.c
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
br:function(a){return this.tt(a,!0)},
ez:function(a,b){return H.J(new H.xy(this,b),[H.Kp(this,0),null])},
X:function(a){return P.WE(this,"{","}")},
aN:function(a,b){var z
for(z=this.gu(this);z.D();)b.$1(z.c)},
$isqC:1},
Vj:{
"^":"Ma;"}}],["","",,P,{
"^":"",
Hp:function(a){return H.Fv(a)},
Wc:[function(a,b){return J.oE(a,b)},"$2","n4",4,0,28],
hl:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.Lz(a)
if(typeof a==="string")return JSON.stringify(a)
return P.os(a)},
os:function(a){var z=J.t(a)
if(!!z.$isr)return z.X(a)
return H.H9(a)},
FM:function(a){return new P.S(a)},
ad:[function(a,b){return a==null?b==null:a===b},"$2","n0",4,0,29],
xv:[function(a){return H.CU(a)},"$1","J2",2,0,30],
z:function(a,b,c){var z,y
z=H.J([],[c])
for(y=J.Nx(a);y.D();)z.push(y.gk())
if(b)return z
z.fixed$length=Array
return z},
JS:function(a){var z=H.d(a)
H.qw(z)},
CL:{
"^":"r:13;Q,a",
$2:function(a,b){this.a.Q+=this.Q.Q
P.Hp(a)}},
a0:{
"^":"a;"},
"+bool":0,
fR:{
"^":"a;"},
iP:{
"^":"a;rq:Q<,a",
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.iP))return!1
return this.Q===b.Q&&this.a===b.a},
iM:function(a,b){return C.jn.iM(this.Q,b.grq())},
giO:function(a){return this.Q},
X:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=P.Gq(z?H.o2(this).getUTCFullYear()+0:H.o2(this).getFullYear()+0)
x=P.h0(z?H.o2(this).getUTCMonth()+1:H.o2(this).getMonth()+1)
w=P.h0(z?H.o2(this).getUTCDate()+0:H.o2(this).getDate()+0)
v=P.h0(z?H.o2(this).getUTCHours()+0:H.o2(this).getHours()+0)
u=P.h0(z?H.o2(this).getUTCMinutes()+0:H.o2(this).getMinutes()+0)
t=P.h0(z?H.o2(this).getUTCSeconds()+0:H.o2(this).getSeconds()+0)
s=P.Vx(z?H.o2(this).getUTCMilliseconds()+0:H.o2(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
RM:function(a,b){if(Math.abs(a)>864e13)throw H.b(P.p(a))},
$isfR:1,
$asfR:HU,
static:{Wu:function(a,b){var z=new P.iP(a,b)
z.RM(a,b)
return z},Gq:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},Vx:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},h0:function(a){if(a>=10)return""+a
return"0"+a}}},
Vf:{
"^":"lf;",
$isfR:1,
$asfR:function(){return[P.lf]}},
"+double":0,
a6:{
"^":"a;m5:Q<",
g:function(a,b){return new P.a6(C.jn.g(this.Q,b.gm5()))},
T:function(a,b){return new P.a6(this.Q-b.gm5())},
w:function(a,b){return C.jn.w(this.Q,b.gm5())},
A:function(a,b){return this.Q>b.gm5()},
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.a6))return!1
return this.Q===b.Q},
giO:function(a){return this.Q&0x1FFFFFFF},
iM:function(a,b){return C.jn.iM(this.Q,b.gm5())},
X:function(a){var z,y,x,w,v
z=new P.DW()
y=this.Q
if(y<0)return"-"+new P.a6(-y).X(0)
x=z.$1(C.jn.JV(C.jn.BU(y,6e7),60))
w=z.$1(C.jn.JV(C.jn.BU(y,1e6),60))
v=new P.P7().$1(C.jn.JV(y,1e6))
return""+C.jn.BU(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
G:function(a){return new P.a6(-this.Q)},
$isfR:1,
$asfR:function(){return[P.a6]}},
P7:{
"^":"r:14;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
DW:{
"^":"r:14;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Ge:{
"^":"a;",
gI4:function(){return H.ts(this.$thrownJsError)}},
W:{
"^":"Ge;",
X:function(a){return"Throw of null."}},
AT:{
"^":"Ge;Q,a,b,c",
gZ2:function(){return"Invalid argument"+(!this.Q?"(s)":"")},
guF:function(){return""},
X:function(a){var z,y,x,w,v,u
z=this.b
y=z!=null?" ("+H.d(z)+")":""
z=this.c
x=z==null?"":": "+H.d(z)
w=this.gZ2()+y+x
if(!this.Q)return w
v=this.guF()
u=P.hl(this.a)
return w+v+": "+H.d(u)},
static:{p:function(a){return new P.AT(!1,null,null,a)}}},
bJ:{
"^":"AT;d,e,Q,a,b,c",
gZ2:function(){return"RangeError"},
guF:function(){var z,y,x
z=this.d
if(z==null){z=this.e
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.e
if(x==null)y=": Not greater than or equal to "+H.d(z)
else{if(typeof x!=="number")return x.A()
if(typeof z!=="number")return H.o(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{C3:function(a){return new P.bJ(null,null,!1,null,null,a)},D:function(a,b,c){return new P.bJ(null,null,!0,a,b,"Value not in range")},TE:function(a,b,c,d,e){return new P.bJ(b,c,!0,a,d,"Invalid value")},jB:function(a,b,c,d,e,f){if(0>a||a>c)throw H.b(P.TE(a,0,c,"start",f))
if(a>b||b>c)throw H.b(P.TE(b,a,c,"end",f))
return b}}},
eY:{
"^":"AT;d,v:e>,Q,a,b,c",
gZ2:function(){return"RangeError"},
guF:function(){P.hl(this.d)
var z=": index should be less than "+H.d(this.e)
return J.UN(this.a,0)?": index must not be negative":z},
static:{Cf:function(a,b,c,d,e){var z=e!=null?e:J.wS(b)
return new P.eY(b,z,!0,a,c,"Index out of range")}}},
ub:{
"^":"Ge;Q",
X:function(a){return"Unsupported operation: "+this.Q}},
ds:{
"^":"Ge;Q",
X:function(a){var z=this.Q
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
lj:{
"^":"Ge;Q",
X:function(a){return"Bad state: "+this.Q}},
UV:{
"^":"Ge;Q",
X:function(a){var z=this.Q
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.hl(z))+"."}},
k5:{
"^":"a;",
X:function(a){return"Out of Memory"},
gI4:function(){return},
$isGe:1},
VS:{
"^":"a;",
X:function(a){return"Stack Overflow"},
gI4:function(){return},
$isGe:1},
t7:{
"^":"Ge;Q",
X:function(a){return"Reading static variable '"+this.Q+"' during its initialization"}},
S:{
"^":"a;Q",
X:function(a){var z=this.Q
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
oe:{
"^":"a;Q,a,b",
X:function(a){var z,y
z=this.Q
y=z!=null&&""!==z?"FormatException: "+H.d(z):"FormatException"
return y}},
kM:{
"^":"a;Q",
X:function(a){return"Expando:"+H.d(this.Q)},
p:function(a,b){var z=H.VK(b,"expando$values")
return z==null?null:H.VK(z,this.KV(0))},
q:function(a,b,c){var z=H.VK(b,"expando$values")
if(z==null){z=new P.a()
H.aw(b,"expando$values",z)}H.aw(z,this.KV(0),c)},
KV:function(a){var z,y
z=H.VK(this,"expando$key")
if(z==null){y=$.Ss
$.Ss=y+1
z="expando$key$"+y
H.aw(this,"expando$key",z)}return z}},
EH:{
"^":"a;"},
KN:{
"^":"lf;",
$isfR:1,
$asfR:function(){return[P.lf]}},
"+int":0,
cX:{
"^":"a;",
ez:function(a,b){return H.K1(this,b,H.ip(this,"cX",0),null)},
aN:function(a,b){var z
for(z=this.gu(this);z.D();)b.$1(z.gk())},
tt:function(a,b){return P.z(this,b,H.ip(this,"cX",0))},
br:function(a){return this.tt(a,!0)},
gv:function(a){var z,y
z=this.gu(this)
for(y=0;z.D();)++y
return y},
Zv:function(a,b){var z,y,x
if(b<0)H.vh(P.TE(b,0,null,"index",null))
for(z=this.gu(this),y=0;z.D();){x=z.gk()
if(b===y)return x;++y}throw H.b(P.Cf(b,this,"index",null,y))},
X:function(a){return P.EP(this,"(",")")}},
AC:{
"^":"a;"},
zM:{
"^":"a;",
$aszM:null,
$iscX:1,
$isqC:1},
"+List":0,
w:{
"^":"a;"},
c8:{
"^":"a;",
X:function(a){return"null"}},
"+Null":0,
lf:{
"^":"a;",
$isfR:1,
$asfR:function(){return[P.lf]}},
"+num":0,
a:{
"^":";",
m:function(a,b){return this===b},
giO:function(a){return H.wP(this)},
X:function(a){return H.H9(this)}},
Gz:{
"^":"a;"},
I:{
"^":"a;",
$isfR:1,
$asfR:function(){return[P.I]}},
"+String":0,
Rn:{
"^":"a;IN:Q<",
gv:function(a){return this.Q.length},
X:function(a){var z=this.Q
return z.charCodeAt(0)==0?z:z},
static:{vg:function(a,b,c){var z=J.Nx(b)
if(!z.D())return a
if(c.length===0){do a+=H.d(z.gk())
while(z.D())}else{a+=H.d(z.gk())
for(;z.D();)a=a+c+H.d(z.gk())}return a}}},
wv:{
"^":"a;"}}],["","",,W,{
"^":"",
d9:function(a,b){var z=document.createElement("canvas",null)
return z},
ZD:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.Vu)},
r3:function(a,b){return document.createElement(a)},
C0:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
Up:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
Pv:function(a){if(a==null)return
return W.P1(a)},
V:function(a){var z=$.X3
if(z===C.NU)return a
return z.oj(a,!0)},
NN:{
"^":"cv;",
$isNN:1,
$iscv:1,
$isKV:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLModElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
Yy:{
"^":"Gv;",
$iszM:1,
$aszM:function(){return[W.M5]},
$isqC:1,
"%":"EntryArray"},
Gh:{
"^":"NN;t5:type=",
X:function(a){return String(a)},
$isGv:1,
"%":"HTMLAnchorElement"},
ib:{
"^":"D0;",
$isib:1,
$isa:1,
"%":"AnimationPlayer"},
fY:{
"^":"NN;",
X:function(a){return String(a)},
$isGv:1,
"%":"HTMLAreaElement"},
Jm:{
"^":"Gv;jO:id=",
"%":"AudioTrack"},
fo:{
"^":"D0;v:length=",
"%":"AudioTrackList"},
dZ:{
"^":"Gv;wx:visible=",
"%":"BarProp"},
Az:{
"^":"Gv;tL:size=,t5:type=",
"%":";Blob"},
qR:{
"^":"Gv;",
"%":"Response;Body"},
QP:{
"^":"NN;",
$isGv:1,
"%":"HTMLBodyElement"},
IF:{
"^":"NN;t5:type=,M:value%",
"%":"HTMLButtonElement"},
A4:{
"^":"Gv;Ev:storage=",
"%":"Canvas2DContextAttributes"},
Ny:{
"^":"NN;fg:height%,N:width%",
eW:function(a,b,c){return a.getContext(b,P.ed(c))},
Bw:function(a,b,c,d,e,f,g){var z,y
z=P.Td(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.eW(a,"webgl",z)
return y==null?this.eW(a,"experimental-webgl",z):y},
Ka:function(a,b,c,d,e,f){return this.Bw(a,b,c,!0,d,e,f)},
"%":"HTMLCanvasElement"},
Gc:{
"^":"Gv;",
Ma:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
nx:{
"^":"KV;v:length=",
$isGv:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
ax:{
"^":"Gv;jO:id=",
"%":"Credential|FederatedCredential|LocalCredential"},
Ci:{
"^":"Gv;t5:type=",
"%":"CryptoKey"},
lw:{
"^":"Gv;t5:type=",
$isa:1,
"%":"CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSUnknownRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSFilterRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
oJ:{
"^":"BV;v:length=",
T2:function(a,b){var z=this.RT(a,b)
return z!=null?z:""},
RT:function(a,b){if(W.ZD(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.O2()+b)},
gih:function(a){return a.color},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
BV:{
"^":"Gv+E1;"},
E1:{
"^":"a;",
gih:function(a){return this.T2(a,"color")},
guc:function(a){return this.T2(a,"page")},
gtL:function(a){return this.T2(a,"size")}},
Wv:{
"^":"Gv;t5:type=",
$isWv:1,
$isa:1,
"%":"DataTransferItem"},
Sb:{
"^":"Gv;v:length=",
Rz:function(a,b){return a.remove(b)},
p:function(a,b){return a[b]},
"%":"DataTransferItemList"},
CK:{
"^":"Gv;x=,y=,z=",
"%":"DeviceAcceleration"},
qs:{
"^":"ea;M:value=",
"%":"DeviceLightEvent"},
hs:{
"^":"KV;",
$isGv:1,
"%":"DocumentFragment|ShadowRoot"},
Nh:{
"^":"Gv;",
X:function(a){return String(a)},
"%":"DOMException"},
Hk:{
"^":"Gv;",
TL:[function(a,b){return a.next(b)},function(a){return a.next()},"J3","$1","$0","gaw",0,2,15,0],
$isHk:1,
$isa:1,
"%":"Iterator"},
BA:{
"^":"q0;",
$isBA:1,
$isa:1,
"%":"DOMMatrix"},
q0:{
"^":"Gv;",
"%":";DOMMatrixReadOnly"},
Sd:{
"^":"bh;",
gES:function(a){return a.w},
gx:function(a){return a.x},
gy:function(a){return a.y},
gz:function(a){return a.z},
"%":"DOMPoint"},
bh:{
"^":"Gv;ES:w=,x=,y=,z=",
"%":";DOMPointReadOnly"},
Iv:{
"^":"Gv;OR:bottom=,fg:height=,Bb:left=,T8:right=,G6:top=,N:width=,x=,y=",
X:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gN(a))+" x "+H.d(this.gfg(a))},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$istn)return!1
y=a.left
x=z.gBb(b)
if(y==null?x==null:y===x){y=a.top
x=z.gG6(b)
if(y==null?x==null:y===x){y=this.gN(a)
x=z.gN(b)
if(y==null?x==null:y===x){y=this.gfg(a)
z=z.gfg(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
giO:function(a){var z,y,x,w
z=J.v1(a.left)
y=J.v1(a.top)
x=J.v1(this.gN(a))
w=J.v1(this.gfg(a))
return W.Up(W.C0(W.C0(W.C0(W.C0(0,z),y),x),w))},
$istn:1,
$astn:HU,
"%":";DOMRectReadOnly"},
BE:{
"^":"NQ;M:value%",
"%":"DOMSettableTokenList"},
Yl:{
"^":"ec;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[P.I]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"DOMStringList"},
nN:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.I]},
$isqC:1},
ec:{
"^":"nN+Gm;",
$iszM:1,
$aszM:function(){return[P.I]},
$isqC:1},
NQ:{
"^":"Gv;v:length=",
Rz:function(a,b){return a.remove(b)},
"%":";DOMTokenList"},
cv:{
"^":"KV;Xr:tabIndex},jO:id%",
X:function(a){return a.localName},
ga9:function(a){return H.J(new W.Cq(a,"contextmenu",!1),[null])},
gHQ:function(a){return H.J(new W.Cq(a,"keydown",!1),[null])},
gS0:function(a){return H.J(new W.Cq(a,"keyup",!1),[null])},
gVY:function(a){return H.J(new W.Cq(a,"mousedown",!1),[null])},
gf0:function(a){return H.J(new W.Cq(a,"mousemove",!1),[null])},
gGg:function(a){return H.J(new W.Cq(a,"mouseup",!1),[null])},
$iscv:1,
$isKV:1,
$isa:1,
$isGv:1,
"%":";Element"},
Fs:{
"^":"NN;fg:height%,t5:type=,N:width%",
"%":"HTMLEmbedElement"},
M5:{
"^":"Gv;",
$isa:1,
"%":"DirectoryEntry|Entry|FileEntry"},
hY:{
"^":"ea;kc:error=",
"%":"ErrorEvent"},
ea:{
"^":"Gv;t5:type=",
e6:function(a){return a.preventDefault()},
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
D0:{
"^":"Gv;",
On:function(a,b,c,d){if(c!=null)this.v0(a,b,c,d)},
Y9:function(a,b,c,d){if(c!=null)this.Ci(a,b,c,d)},
v0:function(a,b,c,d){return a.addEventListener(b,H.M(c,1),d)},
Ci:function(a,b,c,d){return a.removeEventListener(b,H.M(c,1),d)},
"%":"ApplicationCache|AudioContext|BatteryManager|DOMApplicationCache|EventSource|IDBDatabase|InputMethodContext|MIDIAccess|MediaController|MediaQueryList|MediaSource|MessagePort|Notification|OfflineAudioContext|OfflineResourceList|Performance|Presentation|RTCDTMFSender|RTCPeerConnection|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|mozRTCPeerConnection|webkitAudioContext;EventTarget;Vc|lN|KS|mr"},
as:{
"^":"NN;t5:type=",
"%":"HTMLFieldSetElement"},
dU:{
"^":"Az;",
$isa:1,
"%":"File"},
XV:{
"^":"kE;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.dU]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"FileList"},
zL:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.dU]},
$isqC:1},
kE:{
"^":"zL+Gm;",
$iszM:1,
$aszM:function(){return[W.dU]},
$isqC:1},
H0:{
"^":"D0;kc:error=",
"%":"FileReader"},
BR:{
"^":"Gv;t5:type=",
"%":"Stream"},
wJ:{
"^":"D0;kc:error=,v:length=",
"%":"FileWriter"},
n5:{
"^":"Gv;",
$isn5:1,
$isa:1,
"%":"FontFace"},
CV:{
"^":"D0;tL:size=",
bt:function(a,b,c){return a.forEach(H.M(b,3),c)},
aN:function(a,b){b=H.M(b,3)
return a.forEach(b)},
"%":"FontFaceSet"},
Yu:{
"^":"NN;v:length=",
"%":"HTMLFormElement"},
GO:{
"^":"Gv;jO:id=",
$isa:1,
"%":"Gamepad"},
JC:{
"^":"Gv;M:value=",
"%":"GamepadButton"},
o5:{
"^":"Gv;jO:id=",
"%":"CircularGeofencingRegion|GeofencingRegion"},
iG:{
"^":"NN;ih:color=",
"%":"HTMLHRElement"},
F1:{
"^":"Gv;tL:size=",
bt:function(a,b,c){return a.forEach(H.M(b,3),c)},
aN:function(a,b){b=H.M(b,3)
return a.forEach(b)},
"%":"Headers"},
br:{
"^":"Gv;v:length=",
"%":"History"},
xn:{
"^":"x5;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
dx:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1},
x5:{
"^":"dx+Gm;",
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1},
zU:{
"^":"wa;",
wR:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
wa:{
"^":"D0;",
"%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
tb:{
"^":"NN;fg:height%,N:width%",
"%":"HTMLIFrameElement"},
pA:{
"^":"NN;fg:height%,N:width%",
"%":"HTMLImageElement"},
Mi:{
"^":"NN;fg:height%,tL:size=,t5:type=,M:value%,N:width%",
$isGv:1,
$isKV:1,
"%":"HTMLInputElement"},
HL:{
"^":"OR;",
gIG:function(a){return a.keyCode},
"%":"KeyboardEvent"},
MX:{
"^":"NN;t5:type=",
"%":"HTMLKeygenElement"},
XD:{
"^":"NN;M:value%",
"%":"HTMLLIElement"},
Og:{
"^":"NN;t5:type=",
"%":"HTMLLinkElement"},
u8:{
"^":"Gv;",
X:function(a){return String(a)},
"%":"Location"},
El:{
"^":"NN;kc:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
G9:{
"^":"D0;kc:error=",
"%":"MediaKeySession"},
tL:{
"^":"Gv;v:length=",
"%":"MediaList"},
D8:{
"^":"D0;jO:id=",
t:function(a){return a.clone()},
"%":"MediaStream"},
QD:{
"^":"D0;jO:id=",
t:function(a){return a.clone()},
"%":"MediaStreamTrack"},
ZY:{
"^":"NN;t5:type=",
"%":"HTMLMenuElement"},
DH:{
"^":"NN;t5:type=",
"%":"HTMLMenuItemElement"},
hG:{
"^":"Gv;tL:size=",
"%":"Metadata"},
Qb:{
"^":"NN;M:value%",
"%":"HTMLMeterElement"},
S0:{
"^":"Gv;tL:size=",
"%":"MIDIInputMap"},
bn:{
"^":"Im;",
LV:function(a,b,c){return a.send(b,c)},
wR:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
z2:{
"^":"Gv;tL:size=",
"%":"MIDIOutputMap"},
Im:{
"^":"D0;jO:id=,t5:type=",
"%":"MIDIInput;MIDIPort"},
AW:{
"^":"Gv;t5:type=",
$isa:1,
"%":"MimeType"},
DM:{
"^":"rr;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.AW]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"MimeTypeArray"},
hm:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.AW]},
$isqC:1},
rr:{
"^":"hm+Gm;",
$iszM:1,
$aszM:function(){return[W.AW]},
$isqC:1},
Aj:{
"^":"OR;pL:button=",
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
Kn:{
"^":"Gv;t5:type=",
"%":"MutationRecord"},
oU:{
"^":"Gv;",
$isGv:1,
"%":"Navigator"},
dy:{
"^":"D0;t5:type=",
"%":"NetworkInformation"},
e7:{
"^":"LU;Q",
Rz:function(a,b){var z
if(!J.t(b).$isKV)return!1
z=this.Q
if(z!==b.parentNode)return!1
z.removeChild(b)
return!0},
q:function(a,b,c){var z,y
z=this.Q
y=z.childNodes
if(b<0||b>=y.length)return H.e(y,b)
z.replaceChild(c,y[b])},
gu:function(a){return C.t5.gu(this.Q.childNodes)},
YW:function(a,b,c,d,e){throw H.b(new P.ub("Cannot setRange on Node list"))},
gv:function(a){return this.Q.childNodes.length},
sv:function(a,b){throw H.b(new P.ub("Cannot set length on immutable List."))},
p:function(a,b){var z=this.Q.childNodes
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$asLU:function(){return[W.KV]},
$aszM:function(){return[W.KV]}},
KV:{
"^":"D0;eT:parentElement=",
gni:function(a){return new W.e7(a)},
X:function(a){var z=a.nodeValue
return z==null?this.VE(a):z},
$isKV:1,
$isa:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
BH:{
"^":"Gb;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"NodeList|RadioNodeList"},
xt:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1},
Gb:{
"^":"xt+Gm;",
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1},
KY:{
"^":"NN;t5:type=",
"%":"HTMLOListElement"},
G7:{
"^":"NN;fg:height%,t5:type=,N:width%",
"%":"HTMLObjectElement"},
Ql:{
"^":"NN;M:value%",
"%":"HTMLOptionElement"},
wL:{
"^":"NN;t5:type=,M:value%",
"%":"HTMLOutputElement"},
HD:{
"^":"NN;M:value%",
"%":"HTMLParamElement"},
O4:{
"^":"Gv;",
$isGv:1,
"%":"Path2D"},
fw:{
"^":"Gv;t5:type=",
"%":"PerformanceNavigation"},
qp:{
"^":"Gv;v:length=",
$isa:1,
"%":"Plugin"},
Ev:{
"^":"ecX;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.qp]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"PluginArray"},
nj:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.qp]},
$isqC:1},
ecX:{
"^":"nj+Gm;",
$iszM:1,
$aszM:function(){return[W.qp]},
$isqC:1},
KR:{
"^":"NN;M:value%",
"%":"HTMLProgressElement"},
dK:{
"^":"D0;jO:id=",
wR:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
yg:{
"^":"Gv;t5:type=",
"%":"RTCSessionDescription|mozRTCSessionDescription"},
p8:{
"^":"Gv;jO:id=,t5:type=",
$isp8:1,
$isa:1,
"%":"RTCStatsReport"},
l5:{
"^":"D0;t5:type=",
"%":"ScreenOrientation"},
j2:{
"^":"NN;t5:type=",
"%":"HTMLScriptElement"},
lp:{
"^":"NN;v:length%,tL:size=,t5:type=,M:value%",
"%":"HTMLSelectElement"},
Hv:{
"^":"Gv;t5:type=",
"%":"Selection"},
GC:{
"^":"Gv;jO:id=",
"%":"ServiceWorkerClient"},
Dl:{
"^":"D0;",
$isGv:1,
"%":"SharedWorker"},
x8:{
"^":"D0;",
$isa:1,
"%":"SourceBuffer"},
Mk:{
"^":"lN;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.x8]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"SourceBufferList"},
Vc:{
"^":"D0+lD;",
$iszM:1,
$aszM:function(){return[W.x8]},
$isqC:1},
lN:{
"^":"Vc+Gm;",
$iszM:1,
$aszM:function(){return[W.x8]},
$isqC:1},
yN:{
"^":"NN;t5:type=",
"%":"HTMLSourceElement"},
eh:{
"^":"Gv;jO:id=",
"%":"SourceInfo"},
Y4:{
"^":"Gv;",
$isa:1,
"%":"SpeechGrammar"},
qI:{
"^":"w1p;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.Y4]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"SpeechGrammarList"},
RAp:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.Y4]},
$isqC:1},
w1p:{
"^":"RAp+Gm;",
$iszM:1,
$aszM:function(){return[W.Y4]},
$isqC:1},
zD:{
"^":"ea;kc:error=",
"%":"SpeechRecognitionError"},
vK:{
"^":"Gv;v:length=",
$isa:1,
"%":"SpeechRecognitionResult"},
As:{
"^":"Gv;",
p:function(a,b){return a.getItem(b)},
q:function(a,b,c){a.setItem(b,c)},
Rz:function(a,b){var z=a.getItem(b)
a.removeItem(b)
return z},
aN:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gv:function(a){return a.length},
"%":"Storage"},
fq:{
"^":"NN;t5:type=",
"%":"HTMLStyleElement"},
EG:{
"^":"Gv;t5:type=",
"%":"StyleMedia"},
WW:{
"^":"Gv;t5:type=",
$isa:1,
"%":"CSSStyleSheet|StyleSheet"},
FB:{
"^":"NN;t5:type=,M:value%",
"%":"HTMLTextAreaElement"},
A1:{
"^":"D0;jO:id=",
$isa:1,
"%":"TextTrack"},
MN:{
"^":"D0;jO:id%",
$isa:1,
"%":";TextTrackCue"},
K8:{
"^":"kEI;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$isXj:1,
$isDD:1,
$iszM:1,
$aszM:function(){return[W.MN]},
$isqC:1,
"%":"TextTrackCueList"},
nNL:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.MN]},
$isqC:1},
kEI:{
"^":"nNL+Gm;",
$iszM:1,
$aszM:function(){return[W.MN]},
$isqC:1},
Nw:{
"^":"mr;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.A1]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"TextTrackList"},
KS:{
"^":"D0+lD;",
$iszM:1,
$aszM:function(){return[W.A1]},
$isqC:1},
mr:{
"^":"KS+Gm;",
$iszM:1,
$aszM:function(){return[W.A1]},
$isqC:1},
M0:{
"^":"Gv;v:length=",
"%":"TimeRanges"},
Zb:{
"^":"Gv;",
guc:function(a){return H.J(new P.hL(C.CD.zQ(a.pageX),C.CD.zQ(a.pageY)),[null])},
$isa:1,
"%":"Touch"},
hb:{
"^":"x5e;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.Zb]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"TouchList"},
yoo:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.Zb]},
$isqC:1},
x5e:{
"^":"yoo+Gm;",
$iszM:1,
$aszM:function(){return[W.Zb]},
$isqC:1},
OR:{
"^":"ea;",
guc:function(a){return H.J(new P.hL(a.pageX,a.pageY),[null])},
"%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
Fj:{
"^":"Gv;",
X:function(a){return String(a)},
$isGv:1,
"%":"URL"},
aG:{
"^":"El;fg:height%,N:width%",
"%":"HTMLVideoElement"},
GS:{
"^":"Gv;jO:id=",
"%":"VideoTrack"},
vX:{
"^":"D0;v:length=",
"%":"VideoTrackList"},
j6:{
"^":"MN;tL:size=",
"%":"VTTCue"},
Eb:{
"^":"Gv;jO:id%",
"%":"VTTRegion"},
wf:{
"^":"Gv;v:length=",
"%":"VTTRegionList"},
EK:{
"^":"D0;",
wR:function(a,b){return a.send(b)},
"%":"WebSocket"},
K5:{
"^":"D0;",
Z:function(a,b){return a.requestAnimationFrame(H.M(b,1))},
y4:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
geT:function(a){return W.Pv(a.parent)},
$isGv:1,
"%":"DOMWindow|Window"},
ny:{
"^":"D0;",
$isGv:1,
"%":"Worker"},
Cm:{
"^":"D0;",
$isGv:1,
"%":"DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
RX:{
"^":"KV;M:value%",
"%":"Attr"},
Lr:{
"^":"Gv;",
$isa:1,
"%":"CSSPrimitiveValue;CSSValue;hw|lS"},
YC:{
"^":"Gv;OR:bottom=,fg:height=,Bb:left=,T8:right=,G6:top=,N:width=",
X:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$istn)return!1
y=a.left
x=z.gBb(b)
if(y==null?x==null:y===x){y=a.top
x=z.gG6(b)
if(y==null?x==null:y===x){y=a.width
x=z.gN(b)
if(y==null?x==null:y===x){y=a.height
z=z.gfg(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
giO:function(a){var z,y,x,w
z=J.v1(a.left)
y=J.v1(a.top)
x=J.v1(a.width)
w=J.v1(a.height)
return W.Up(W.C0(W.C0(W.C0(W.C0(0,z),y),x),w))},
$istn:1,
$astn:HU,
"%":"ClientRect"},
S3:{
"^":"HRa;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$isXj:1,
$isDD:1,
$iszM:1,
$aszM:function(){return[P.tn]},
$isqC:1,
"%":"ClientRectList|DOMRectList"},
zLC:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.tn]},
$isqC:1},
HRa:{
"^":"zLC+Gm;",
$iszM:1,
$aszM:function(){return[P.tn]},
$isqC:1},
PR:{
"^":"t7i;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.lw]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"CSSRuleList"},
dxW:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.lw]},
$isqC:1},
t7i:{
"^":"dxW+Gm;",
$iszM:1,
$aszM:function(){return[W.lw]},
$isqC:1},
VE:{
"^":"lS;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.Lr]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue"},
hw:{
"^":"Lr+lD;",
$iszM:1,
$aszM:function(){return[W.Lr]},
$isqC:1},
lS:{
"^":"hw+Gm;",
$iszM:1,
$aszM:function(){return[W.Lr]},
$isqC:1},
hq:{
"^":"KV;",
$isGv:1,
"%":"DocumentType"},
w4:{
"^":"Iv;",
gfg:function(a){return a.height},
gN:function(a){return a.width},
gx:function(a){return a.x},
gy:function(a){return a.y},
"%":"DOMRect"},
Ij:{
"^":"rrb;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.GO]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"GamepadList"},
hmZ:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.GO]},
$isqC:1},
rrb:{
"^":"hmZ+Gm;",
$iszM:1,
$aszM:function(){return[W.GO]},
$isqC:1},
Nf:{
"^":"NN;",
$isGv:1,
"%":"HTMLFrameSetElement"},
rh:{
"^":"rla;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
xth:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1},
rla:{
"^":"xth+Gm;",
$iszM:1,
$aszM:function(){return[W.KV]},
$isqC:1},
Rk:{
"^":"qR;",
t:function(a){return a.clone()},
"%":"Request"},
XT:{
"^":"D0;",
$isGv:1,
"%":"ServiceWorker"},
LO:{
"^":"Gba;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.vK]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"SpeechRecognitionResultList"},
Ocb:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.vK]},
$isqC:1},
Gba:{
"^":"Ocb+Gm;",
$iszM:1,
$aszM:function(){return[W.vK]},
$isqC:1},
b1:{
"^":"maa;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},
$iszM:1,
$aszM:function(){return[W.WW]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"StyleSheetList"},
nja:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.WW]},
$isqC:1},
maa:{
"^":"nja+Gm;",
$iszM:1,
$aszM:function(){return[W.WW]},
$isqC:1},
jx:{
"^":"Gv;",
$isGv:1,
"%":"WorkerLocation"},
Id:{
"^":"Gv;",
$isGv:1,
"%":"WorkerNavigator"},
RO:{
"^":"qh;Q,a,b",
X5:function(a,b,c,d){var z=new W.xC(0,this.Q,this.a,W.V(a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.P6()
return z},
zC:function(a,b,c){return this.X5(a,null,b,c)}},
Cq:{
"^":"RO;Q,a,b"},
xC:{
"^":"MO;Q,a,b,c,d",
Gv:function(a){if(this.a==null)return
this.EO()
this.a=null
this.c=null
return},
nB:function(a,b){if(this.a==null)return;++this.Q
this.EO()},
zd:function(a){return this.nB(a,null)},
QE:function(a){if(this.a==null||this.Q<=0)return;--this.Q
this.P6()},
P6:function(){var z=this.c
if(z!=null&&this.Q<=0)J.qV(this.a,this.b,z,this.d)},
EO:function(){var z=this.c
if(z!=null)J.GJ(this.a,this.b,z,this.d)}},
Gm:{
"^":"a;",
gu:function(a){return new W.W9(a,this.gv(a),-1,null)},
Rz:function(a,b){throw H.b(new P.ub("Cannot remove from immutable List."))},
YW:function(a,b,c,d,e){throw H.b(new P.ub("Cannot setRange on immutable List."))},
$iszM:1,
$aszM:null,
$isqC:1},
W9:{
"^":"a;Q,a,b,c",
D:function(){var z,y
z=this.b+1
y=this.a
if(z<y){this.c=J.Tf(this.Q,z)
this.b=z
return!0}this.c=null
this.b=y
return!1},
gk:function(){return this.c}},
dW:{
"^":"a;Q",
geT:function(a){return W.P1(this.Q.parent)},
On:function(a,b,c,d){return H.vh(new P.ub("You can only attach EventListeners to your own window."))},
Y9:function(a,b,c,d){return H.vh(new P.ub("You can only attach EventListeners to your own window."))},
$isGv:1,
static:{P1:function(a){if(a===window)return a
else return new W.dW(a)}}}}],["","",,P,{
"^":"",
W2:{
"^":"Gv;",
TL:[function(a,b){a.continue(b)},function(a){return this.TL(a,null)},"J3","$1","$0","gaw",0,2,16,0],
"%":";IDBCursor"},
e3:{
"^":"W2;",
gM:function(a){return P.o0(a.value,!1)},
"%":"IDBCursorWithValue"},
tK:{
"^":"Gv;",
$istK:1,
$isa:1,
"%":"IDBIndex"},
m9:{
"^":"D0;kc:error=",
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},
nq:{
"^":"D0;kc:error=",
"%":"IDBTransaction"}}],["","",,P,{
"^":"",
Y0:{
"^":"Du;",
$isGv:1,
"%":"SVGAElement"},
ZJ:{
"^":"Eo;",
$isGv:1,
"%":"SVGAltGlyphElement"},
OA:{
"^":"Gv;M:value%",
"%":"SVGAngle"},
GK:{
"^":"d5;",
$isGv:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
D6:{
"^":"d0;r=",
"%":"SVGCircleElement"},
jw:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEBlendElement"},
lv:{
"^":"d5;t5:type=,fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEColorMatrixElement"},
pf:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEComponentTransferElement"},
py:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFECompositeElement"},
W1:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEConvolveMatrixElement"},
zo:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEDiffuseLightingElement"},
q6:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEDisplacementMapElement"},
ih:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEFloodElement"},
tk:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEGaussianBlurElement"},
me:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEImageElement"},
oB:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEMergeElement"},
yu:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEMorphologyElement"},
MI:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFEOffsetElement"},
Ub:{
"^":"d5;x=,y=,z=",
"%":"SVGFEPointLightElement"},
Oy:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFESpecularLightingElement"},
mB:{
"^":"d5;x=,y=,z=",
"%":"SVGFESpotLightElement"},
Qy:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFETileElement"},
ju:{
"^":"d5;t5:type=,fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFETurbulenceElement"},
Jf:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGFilterElement"},
q8:{
"^":"Du;fg:height=,N:width=,x=,y=",
"%":"SVGForeignObjectElement"},
d0:{
"^":"Du;",
"%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
Du:{
"^":"d5;",
$isGv:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
rE:{
"^":"Du;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGImageElement"},
Xk:{
"^":"Gv;M:value%",
$isa:1,
"%":"SVGLength"},
jK:{
"^":"e0;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a.getItem(b)},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){return this.p(a,b)},
$iszM:1,
$aszM:function(){return[P.Xk]},
$isqC:1,
"%":"SVGLengthList"},
qba:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.Xk]},
$isqC:1},
e0:{
"^":"qba+Gm;",
$iszM:1,
$aszM:function(){return[P.Xk]},
$isqC:1},
uz:{
"^":"d5;",
$isGv:1,
"%":"SVGMarkerElement"},
Yd:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGMaskElement"},
yW:{
"^":"Gv;",
$isyW:1,
$isa:1,
"%":"SVGMatrix"},
uP:{
"^":"Gv;M:value%",
$isa:1,
"%":"SVGNumber"},
ZZ:{
"^":"e2;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a.getItem(b)},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){return this.p(a,b)},
$iszM:1,
$aszM:function(){return[P.uP]},
$isqC:1,
"%":"SVGNumberList"},
R1:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.uP]},
$isqC:1},
e2:{
"^":"R1+Gm;",
$iszM:1,
$aszM:function(){return[P.uP]},
$isqC:1},
XW:{
"^":"Gv;",
$isa:1,
"%":"SVGPathSegClosePath;SVGPathSeg"},
wy:{
"^":"XW;x=,y=",
"%":"SVGPathSegArcAbs"},
hT:{
"^":"XW;x=,y=",
"%":"SVGPathSegArcRel"},
pd:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoCubicAbs"},
Vq:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoCubicRel"},
ZH:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoCubicSmoothAbs"},
zI:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoCubicSmoothRel"},
t2:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoQuadraticAbs"},
u9:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoQuadraticRel"},
tT:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoQuadraticSmoothAbs"},
UF:{
"^":"XW;x=,y=",
"%":"SVGPathSegCurvetoQuadraticSmoothRel"},
bE:{
"^":"XW;x=,y=",
"%":"SVGPathSegLinetoAbs"},
E3:{
"^":"XW;x=",
"%":"SVGPathSegLinetoHorizontalAbs"},
td:{
"^":"XW;x=",
"%":"SVGPathSegLinetoHorizontalRel"},
GL:{
"^":"XW;x=,y=",
"%":"SVGPathSegLinetoRel"},
D9:{
"^":"XW;y=",
"%":"SVGPathSegLinetoVerticalAbs"},
qY:{
"^":"XW;y=",
"%":"SVGPathSegLinetoVerticalRel"},
Sv:{
"^":"e4;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a.getItem(b)},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){return this.p(a,b)},
$iszM:1,
$aszM:function(){return[P.XW]},
$isqC:1,
"%":"SVGPathSegList"},
R2:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.XW]},
$isqC:1},
e4:{
"^":"R2+Gm;",
$iszM:1,
$aszM:function(){return[P.XW]},
$isqC:1},
Dj:{
"^":"XW;x=,y=",
"%":"SVGPathSegMovetoAbs"},
Zq:{
"^":"XW;x=,y=",
"%":"SVGPathSegMovetoRel"},
Gr:{
"^":"d5;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGPatternElement"},
EX:{
"^":"Gv;x=,y=",
"%":"SVGPoint"},
ue:{
"^":"Gv;v:length=",
"%":"SVGPointList"},
To:{
"^":"cu;r=",
"%":"SVGRadialGradientElement"},
PY:{
"^":"Gv;x=,y=",
"%":"SVGRect"},
NJ:{
"^":"d0;fg:height=,N:width=,x=,y=",
"%":"SVGRectElement"},
Tw:{
"^":"d5;t5:type=",
$isGv:1,
"%":"SVGScriptElement"},
Kq:{
"^":"e6;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a.getItem(b)},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){return this.p(a,b)},
$iszM:1,
$aszM:function(){return[P.I]},
$isqC:1,
"%":"SVGStringList"},
R3:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.I]},
$isqC:1},
e6:{
"^":"R3+Gm;",
$iszM:1,
$aszM:function(){return[P.I]},
$isqC:1},
EU:{
"^":"d5;t5:type=",
"%":"SVGStyleElement"},
d5:{
"^":"cv;",
sXr:function(a,b){a.tabIndex=b},
ga9:function(a){return H.J(new W.Cq(a,"contextmenu",!1),[null])},
gHQ:function(a){return H.J(new W.Cq(a,"keydown",!1),[null])},
gS0:function(a){return H.J(new W.Cq(a,"keyup",!1),[null])},
gVY:function(a){return H.J(new W.Cq(a,"mousedown",!1),[null])},
gf0:function(a){return H.J(new W.Cq(a,"mousemove",!1),[null])},
gGg:function(a){return H.J(new W.Cq(a,"mouseup",!1),[null])},
$isGv:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
hy:{
"^":"Du;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGSVGElement"},
SG:{
"^":"d5;",
$isGv:1,
"%":"SVGSymbolElement"},
qF:{
"^":"Du;",
"%":";SVGTextContentElement"},
eT:{
"^":"qF;",
$isGv:1,
"%":"SVGTextPathElement"},
Eo:{
"^":"qF;x=,y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
zY:{
"^":"Gv;t5:type=",
$isa:1,
"%":"SVGTransform"},
DT:{
"^":"e8;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a.getItem(b)},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){return this.p(a,b)},
$iszM:1,
$aszM:function(){return[P.zY]},
$isqC:1,
"%":"SVGTransformList"},
R6:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.zY]},
$isqC:1},
e8:{
"^":"R6+Gm;",
$iszM:1,
$aszM:function(){return[P.zY]},
$isqC:1},
Cl:{
"^":"Du;fg:height=,N:width=,x=,y=",
$isGv:1,
"%":"SVGUseElement"},
AY:{
"^":"d5;",
$isGv:1,
"%":"SVGViewElement"},
bW:{
"^":"Gv;",
$isGv:1,
"%":"SVGViewSpec"},
cu:{
"^":"d5;",
$isGv:1,
"%":"SVGLinearGradientElement;SVGGradientElement"},
We:{
"^":"d5;",
$isGv:1,
"%":"SVGCursorElement"},
cB:{
"^":"d5;",
$isGv:1,
"%":"SVGFEDropShadowElement"},
Pi:{
"^":"d5;",
$isGv:1,
"%":"SVGGlyphRefElement"},
zu:{
"^":"d5;",
$isGv:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
r2:{
"^":"Gv;v:length=",
"%":"AudioBuffer"},
Bj:{
"^":"D0;",
"%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|JavaScriptAudioNode|MediaStreamAudioDestinationNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},
rO:{
"^":"Gv;M:value%",
"%":"AudioParam"},
XN:{
"^":"Bj;",
"%":"AudioBufferSourceNode|MediaElementAudioSourceNode|MediaStreamAudioSourceNode;AudioSourceNode"},
tU:{
"^":"Bj;t5:type=",
"%":"BiquadFilterNode"},
KP:{
"^":"XN;t5:type=",
"%":"Oscillator|OscillatorNode"}}],["","",,P,{
"^":"",
lO:{
"^":"Gv;tL:size=,t5:type=",
"%":"WebGLActiveInfo"},
Jo:{
"^":"Gv;",
GA:function(a,b){return a.activeTexture(b)},
d9:function(a,b,c){return a.attachShader(b,c)},
Ug:function(a,b,c){return a.bindBuffer(b,c)},
IW:function(a,b,c){return a.bindFramebuffer(b,c)},
r5:function(a,b,c){return a.bindRenderbuffer(b,c)},
rd:function(a,b,c){return a.bindTexture(b,c)},
jd:function(a,b){return a.blendEquation(b)},
iy:function(a,b,c){return a.blendEquationSeparate(b,c)},
Gk:function(a,b,c){return a.blendFunc(b,c)},
Sk:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
Vn:function(a,b,c,d){return a.bufferData(b,c,d)},
Sl:function(a,b){return a.clear(b)},
kd:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
KZ:function(a,b){return a.clearDepth(b)},
JS:function(a,b){return a.clearStencil(b)},
jV:function(a,b){return a.compileShader(b)},
Gp:function(a){return a.createBuffer()},
SX:function(a){return a.createFramebuffer()},
pC:function(a){return a.createProgram()},
OF:function(a){return a.createRenderbuffer()},
WV:function(a,b){return a.createShader(b)},
Wp:function(a){return a.createTexture()},
v1:function(a,b){return a.cullFace(b)},
MU:function(a,b){return a.deleteShader(b)},
u0:function(a,b){return a.depthFunc(b)},
Iv:function(a,b){return a.depthMask(b)},
yB:function(a,b){return a.disable(b)},
zx:function(a,b){return a.disableVertexAttribArray(b)},
rZ:function(a,b,c,d){return a.drawArrays(b,c,d)},
c3:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
Qc:function(a,b){return a.enable(b)},
CF:function(a,b){return a.enableVertexAttribArray(b)},
Ih:function(a,b,c,d,e){return a.framebufferRenderbuffer(b,c,d,e)},
GY:function(a,b,c,d,e,f){return a.framebufferTexture2D(b,c,d,e,f)},
mV:function(a,b){return a.frontFace(b)},
YU:function(a,b){return a.generateMipmap(b)},
ci:function(a,b,c){return a.getAttribLocation(b,c)},
T6:function(a){return a.getError()},
Hn:function(a,b){return a.getExtension(b)},
yp:function(a,b){return a.getParameter(b)},
D7:function(a,b,c){return a.getProgramParameter(b,c)},
OW:function(a,b){return a.getShaderInfoLog(b)},
p6:function(a,b,c){return a.getShaderParameter(b,c)},
Xd:function(a,b,c){return a.getShaderPrecisionFormat(b,c)},
YE:function(a,b,c){return a.getUniformLocation(b,c)},
Ma:function(a,b){return a.lineWidth(b)},
Ck:function(a,b){return a.linkProgram(b)},
tk:function(a,b,c){return a.pixelStorei(b,c)},
XT:function(a,b,c){return a.polygonOffset(b,c)},
Ng:function(a,b,c,d,e){return a.renderbufferStorage(b,c,d,e)},
Yw:function(a,b,c){return a.shaderSource(b,c)},
BN:function(a,b,c,d){return a.texParameterf(b,c,d)},
rz:function(a,b,c,d){return a.texParameteri(b,c,d)},
oC:function(a,b,c){return a.uniform1f(b,c)},
EP:function(a,b,c){return a.uniform1fv(b,c)},
ug:function(a,b,c){return a.uniform1i(b,c)},
m2:function(a,b,c){return a.uniform1iv(b,c)},
pW:function(a,b,c,d){return a.uniform2f(b,c,d)},
yy:function(a,b,c){return a.uniform2fv(b,c)},
J1:function(a,b,c,d,e){return a.uniform3f(b,c,d,e)},
wA:function(a,b,c){return a.uniform3fv(b,c)},
wO:function(a,b,c){return a.uniform3iv(b,c)},
pi:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
vL:function(a,b,c){return a.uniform4fv(b,c)},
Vt:function(a,b,c,d){return a.uniformMatrix2fv(b,c,d)},
K7:function(a,b,c,d){return a.uniformMatrix3fv(b,c,d)},
d2:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
nA:function(a,b){return a.useProgram(b)},
l6:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
fw:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
yr:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":"",
Fn:{
"^":"e9;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return P.mR(a.item(b))},
q:function(a,b,c){throw H.b(new P.ub("Cannot assign element of immutable List."))},
sv:function(a,b){throw H.b(new P.ub("Cannot resize immutable List."))},
Zv:function(a,b){return this.p(a,b)},
$iszM:1,
$aszM:function(){return[P.w]},
$isqC:1,
"%":"SQLResultSetRowList"},
R7:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[P.w]},
$isqC:1},
e9:{
"^":"R7+Gm;",
$iszM:1,
$aszM:function(){return[P.w]},
$isqC:1}}],["","",,P,{
"^":"",
IU:{
"^":"a;"}}],["","",,P,{
"^":"",
VC:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
xk:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
C:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.CD.gzP(b)||isNaN(b))return b
return a}return a},
u:function(a,b){if(typeof a!=="number")throw H.b(P.p(a))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.CD.gzP(a))return b
return a},
hL:{
"^":"a;x:Q>,y:a>",
X:function(a){return"Point("+H.d(this.Q)+", "+H.d(this.a)+")"},
m:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.hL))return!1
z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
giO:function(a){var z,y
z=J.v1(this.Q)
y=J.v1(this.a)
return P.xk(P.VC(P.VC(0,z),y))},
g:function(a,b){var z,y,x
z=this.Q
y=J.RE(b)
x=y.gx(b)
if(typeof z!=="number")return z.g()
x=C.CD.g(z,x)
z=this.a
y=y.gy(b)
if(typeof z!=="number")return z.g()
y=new P.hL(x,C.CD.g(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
T:function(a,b){var z,y,x,w
z=this.Q
y=J.RE(b)
x=y.gx(b)
if(typeof z!=="number")return z.T()
if(typeof x!=="number")return H.o(x)
w=this.a
y=y.gy(b)
if(typeof w!=="number")return w.T()
if(typeof y!=="number")return H.o(y)
y=new P.hL(z-x,w-y)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
Ex:{
"^":"a;",
gT8:function(a){return this.gBb(this)+this.b},
gOR:function(a){return this.gG6(this)+this.c},
X:function(a){return"Rectangle ("+this.gBb(this)+", "+this.a+") "+this.b+" x "+this.c},
m:function(a,b){var z,y
if(b==null)return!1
z=J.t(b)
if(!z.$istn)return!1
if(this.gBb(this)===z.gBb(b)){y=this.a
z=y===z.gG6(b)&&this.Q+this.b===z.gT8(b)&&y+this.c===z.gOR(b)}else z=!1
return z},
giO:function(a){var z=this.a
return P.xk(P.VC(P.VC(P.VC(P.VC(0,this.gBb(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.Q+this.b&0x1FFFFFFF),z+this.c&0x1FFFFFFF))}},
tn:{
"^":"Ex;Bb:Q>,G6:a>,N:b>,fg:c>",
$astn:null}}],["","",,H,{
"^":"",
T0:function(a){return a},
XF:function(a){var z,y,x,w,v
z=J.t(a)
if(!!z.$isDD)return a
z=z.gv(a)
y=Array(z)
y.fixed$length=Array
for(x=a.length,w=0;w<x;++w){v=a[w]
if(w>=z)return H.e(y,w)
y[w]=v}return y},
WZ:{
"^":"Gv;",
$isWZ:1,
"%":"ArrayBuffer"},
ET:{
"^":"Gv;",
aq:function(a,b,c){if(typeof b!=="number")return b.w()
if(b<0||b>=c){if(!!this.$iszM)if(c===a.length)throw H.b(P.Cf(b,a,null,null,null))
throw H.b(P.TE(b,0,c-1,null,null))}else throw H.b(P.p("Invalid list index "+b))},
bv:function(a,b,c){if(b>>>0!==b||b>=c)this.aq(a,b,c)},
$isET:1,
"%":"DataView;ArrayBufferView;b0|Ob|Ip|Dg|fj|U4|DV"},
b0:{
"^":"ET;",
gv:function(a){return a.length},
Xx:function(a,b,c,d,e){var z,y,x
z=a.length+1
this.bv(a,b,z)
this.bv(a,c,z)
if(b>c)throw H.b(P.TE(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.b(new P.lj("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$isXj:1,
$isDD:1},
Dg:{
"^":"Ip;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
q:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
a[b]=c},
YW:function(a,b,c,d,e){if(!!J.t(d).$isDg){this.Xx(a,b,c,d,e)
return}this.GH(a,b,c,d,e)}},
Ob:{
"^":"b0+lD;",
$iszM:1,
$aszM:function(){return[P.Vf]},
$isqC:1},
Ip:{
"^":"Ob+SU;"},
DV:{
"^":"U4;",
q:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
a[b]=c},
YW:function(a,b,c,d,e){if(!!J.t(d).$isDV){this.Xx(a,b,c,d,e)
return}this.GH(a,b,c,d,e)},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1},
fj:{
"^":"b0+lD;",
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1},
U4:{
"^":"fj+SU;"},
Hg:{
"^":"Dg;",
$isoI:1,
$iszM:1,
$aszM:function(){return[P.Vf]},
$isqC:1,
"%":"Float32Array"},
fS:{
"^":"Dg;",
$iszM:1,
$aszM:function(){return[P.Vf]},
$isqC:1,
"%":"Float64Array"},
xj:{
"^":"DV;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":"Int16Array"},
EW:{
"^":"DV;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isvi:1,
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":"Int32Array"},
ZA:{
"^":"DV;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":"Int8Array"},
dT:{
"^":"DV;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":"Uint16Array"},
nl:{
"^":"DV;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":"Uint32Array"},
eE:{
"^":"DV;",
gv:function(a){return a.length},
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
V6:{
"^":"DV;",
gv:function(a){return a.length},
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$iszM:1,
$aszM:function(){return[P.KN]},
$isqC:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
qw:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
mR:function(a){var z,y,x,w,v
if(a==null)return
z=P.u5()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.lk)(y),++w){v=y[w]
z.q(0,v,a[v])}return z},
ed:function(a){var z
if(a==null)return
z={}
J.kH(a,new P.zW(z))
return z},
o0:function(a,b){var z=[]
return new P.xL(b,new P.a9([],z),new P.YL(z),new P.KC(z)).$1(a)},
dg:function(){var z=$.L4
if(z==null){z=J.NT(window.navigator.userAgent,"Opera",0)
$.L4=z}return z},
O2:function(){var z,y
z=$.aj
if(z!=null)return z
y=$.w5
if(y==null){y=J.NT(window.navigator.userAgent,"Firefox",0)
$.w5=y}if(y===!0)z="-moz-"
else{y=$.EM
if(y==null){y=P.dg()!==!0&&J.NT(window.navigator.userAgent,"Trident/",0)
$.EM=y}if(y===!0)z="-ms-"
else z=P.dg()===!0?"-o-":"-webkit-"}$.aj=z
return z},
zW:{
"^":"r:17;Q",
$2:function(a,b){this.Q[a]=b}},
a9:{
"^":"r:18;Q,a",
$1:function(a){var z,y,x,w
z=this.Q
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.a.push(null)
return y}},
YL:{
"^":"r:19;Q",
$1:function(a){var z=this.Q
if(a>=z.length)return H.e(z,a)
return z[a]}},
KC:{
"^":"r:20;Q",
$2:function(a,b){var z=this.Q
if(a>=z.length)return H.e(z,a)
z[a]=b}},
xL:{
"^":"r:1;Q,a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.Wu(a.getTime(),!0)
if(a instanceof RegExp)throw H.b(new P.ds("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.a.$1(a)
x=this.b.$1(y)
if(x!=null)return x
x=P.u5()
this.c.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.lk)(w),++u){t=w[u]
x.q(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.a.$1(a)
x=this.b.$1(y)
if(x!=null)return x
w=J.U6(a)
s=w.gv(a)
x=this.Q?new Array(s):a
this.c.$2(y,x)
if(typeof s!=="number")return H.o(s)
v=J.w1(x)
r=0
for(;r<s;++r)v.q(x,r,this.$1(w.p(a,r)))
return x}return a}}}],["","",,G,{
"^":"",
Mh:{
"^":"a;v:x*",
u2:function(a,b,c){var z,y,x,w,v,u
z=a.Q
this.r=z
this.x=a.b
y=a.a
this.e=y
x=new G.XY(null,null,null)
this.Q=x
this.a=new G.XY(null,null,null)
this.b=new G.XY(null,null,null)
this.c=new G.XY(null,null,null)
this.d=new G.XY(null,null,null)
w=this.f
x.Q=S.Bc(z,y*w,null,null)
this.a.Q=S.Bc(this.x,this.e*w,null,null)
this.b.Q=S.Bc(this.r,this.e*w,null,null)
this.c.Q=S.Bc(this.x,this.e*w,null,null)
this.d.Q=S.Bc(this.r,this.x,null,null)
y=this.Q
z=this.r
x=this.e
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(z/2,x*w/2,0)
y.a=v
v=this.a
y=this.e
x=this.x
z=new T.An(new Float32Array(H.T0(3)))
z.PJ(0,y*w/2,-x/2)
v.a=z
z=this.b
v=this.r
x=this.e
y=this.x
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(v/2,x*w/2,-y*2/2)
z.a=u
u=this.c
z=this.r
y=this.e
x=this.x
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(z,y*w/2,-x/2)
u.a=v
v=this.d
u=this.r
x=this.e
y=this.x
z=new T.An(new Float32Array(H.T0(3)))
z.PJ(u/2,x*w,-y/2)
v.a=z
z=this.Q
if(this.y){z.b=0
this.a.b=-270
this.b.b=180
this.c.b=270
this.d.b=90}else{z.b=0
this.a.b=270
this.b.b=180
this.c.b=-270
this.d.b=-90}}},
Ze:{
"^":"Mh;z,ch,cx,cy,db,dx,dy,Q,a,b,c,d,e,f,r,x,y",
lB:function(a,b){var z=this.f
this.R8(1,z,a,b)
this.R8(2,z,a,b)
this.R8(3,z,a,b)
this.R8(4,z,a,b)},
R8:function(a,b,c,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.Q
y=z.a
x=z.b
switch(a){case 1:w=this.z.f.Q[2]+0.1
break
case 2:z=this.a
y=z.a
x=z.b
w=this.ch.f.Q[0]-0.1
break
case 3:z=this.b
y=z.a
x=z.b
w=this.cx.f.Q[2]-0.1
break
case 4:z=this.c
y=z.a
x=z.b
w=this.cy.f.Q[0]+0.1
break
default:w=-0.1}if(a===1||a===3){z=this.r
v=z/2
u=v/16
t=v+u
for(v=u*4,s=t/2,z=(z-t*2)/2+u/2,r=0;r<b;)for(++r,q=0;q<2;++q){p=S.YU(S.Bc(this.r/2-v,this.e/2,null,null),a0)
p.f.xu(y)
o=p.f.Q
o[2]=w
n=this.e
m=n/b
o[1]=m/2+n-m
m=p.r
if(typeof x!=="number")return x.R()
m.Q[0]=x*0.017453292519943295
o[1]=o[1]*r
o[0]=s+t*q+z
this.dx.h(0,p)}}else{z=this.x
v=z/4
u=v/8
t=v+u
l=z-t*4
for(z=u*4,v=t/2,s=-t,o=s/2,n=l/4,m=-l/4+u,k=a!==2,j=0,r=0;r<b;)for(++r,q=0;q<4;++q){p=S.YU(S.Bc(this.x/4-z,this.e/2,null,null),a0)
p.f.xu(y)
i=p.f.Q
i[0]=w
h=this.e
g=h/b
i[1]=g/2+h-g
g=p.r
if(typeof x!=="number")return x.R()
f=x*0.017453292519943295
g.Q[1]=f
i[1]=i[1]*r
g=o+s*q
i[2]=g+m
if(j!==0||k)this.dx.h(0,p)
else{e=S.YU(S.Bc(this.x/4-z,h/2,null,null),c)
e.f.xu(y)
i=e.f.Q
i[0]=w
h=this.e
d=h/b
i[1]=d/2+h-d
e.r.Q[1]=f
i[1]=v
i[2]=g+n
this.dx.h(0,e)}++j}}},
Dz:function(a,b,c,d){var z,y,x
z=S.YU(this.Q.Q,this.dy)
z.a="wall1"
z.f.xu(this.Q.a)
y=z.r
x=this.Q.b
if(typeof x!=="number")return x.R()
y.Q[0]=x*0.017453292519943295
this.z=z
z=S.YU(this.a.Q,this.dy)
z.a="wall2"
z.f.xu(this.a.a)
x=z.r
y=this.a.b
if(typeof y!=="number")return y.R()
x.Q[1]=y*0.017453292519943295
this.ch=z
z=S.YU(this.b.Q,this.dy)
z.a="wall3"
z.f.xu(this.b.a)
y=z.r
x=this.b.b
if(typeof x!=="number")return x.R()
y.Q[0]=x*0.017453292519943295
this.cx=z
z=S.YU(this.c.Q,this.dy)
z.a="wall4"
z.f.xu(this.c.a)
x=z.r
y=this.c.b
if(typeof y!=="number")return y.R()
x.Q[1]=y*0.017453292519943295
this.cy=z
z=S.YU(this.d.Q,this.dy)
z.a="roof"
z.f.xu(this.d.a)
y=z.r
x=this.d.b
if(typeof x!=="number")return x.R()
y.Q[0]=x*0.017453292519943295
this.db=z
z=S.ep()
this.dx=z
z.h(0,this.z)
this.dx.h(0,this.ch)
this.dx.h(0,this.cx)
this.dx.h(0,this.cy)
this.dx.h(0,this.db)
this.dx.k4=!0},
static:{uj:function(a,b,c,d){var z=new G.Ze(null,null,null,null,null,null,d,null,null,null,null,null,null,b,null,null,c)
z.u2(a,b,c)
z.Dz(a,b,c,d)
return z}}},
XY:{
"^":"a;Q,a,b"},
G8:{
"^":"a;Q,v:a*,b,c,d,e,f,r,x,y,z,ch,cx",
Ok:function(){var z,y,x,w
z=$.no
y=$.YY
$.YY=y+1
this.cx=new G.ZC(new S.kP(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",y,0,S.Mp(z),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
x=S.Bc(this.Q,this.a,null,null)
this.cx.toString
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.PE))
y=new S.SN("f",null,!0,null)
y.sM(0,1)
w=P.Td(["color",z,"scale",y])
y=document.querySelector("#rednoisevertexshader").textContent
y=S.YU(x,S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#rednoisefragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,w,0,y,!0,!1,1))
this.e=y
y.r.Q[0]=-1.5707963267948966
this.x.h(0,y)},
Hw:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=window.innerWidth
y=window.innerHeight
if(typeof z!=="number")return z.S()
if(typeof y!=="number")return H.o(y)
x=new Float32Array(H.T0(16))
w=new Float32Array(H.T0(16))
v=new T.aI(new Float32Array(H.T0(16)))
v.xI()
u=new T.aI(new Float32Array(H.T0(16)))
u.xI()
t=new T.aI(new Float32Array(H.T0(16)))
t.xI()
s=$.RG
$.RG=s+1
r=P.u5()
q=new T.An(new Float32Array(H.T0(3)))
q.PJ(0,1,0)
p=new T.An(new Float32Array(H.T0(3)))
p.PJ(0,0,0)
o=new T.An(new Float32Array(H.T0(3)))
o.PJ(0,0,0)
n=new T.An(new Float32Array(H.T0(3)))
n.PJ(1,1,1)
m=new T.aI(new Float32Array(H.T0(16)))
m.xI()
l=new T.aI(new Float32Array(H.T0(16)))
l.xI()
k=new T.aI(new Float32Array(H.T0(16)))
k.xI()
k=new S.WT(60,z/y,null,null,null,null,null,null,v,u,t,1,1e4,x,w,s,"",r,null,[],q,p,o,n,"XYZ",null,null,null,!0,null,m,l,k,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
k.hk()
this.y=k
l=k.f.Q
l[1]=40
l[0]=this.Q/2
l[2]=this.a/2
this.x.h(0,k)},
wJ:function(){var z,y,x,w,v,u,t,s,r,q
z=S.Eh(16777215,0.2,0)
y=z.ZG
x=this.Q/2
y.PJ(x,this.a/2,x)
this.f=z
this.x.h(0,z)
z=S.Mp(4473924)
x=$.RG
$.RG=x+1
y=P.u5()
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(0,1,0)
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(0,0,0)
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(0,0,0)
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(1,1,1)
s=new T.aI(new Float32Array(H.T0(16)))
s.xI()
r=new T.aI(new Float32Array(H.T0(16)))
r.xI()
q=new T.aI(new Float32Array(H.T0(16)))
q.xI()
q=new S.mq(z,x,"",y,null,[],w,v,u,t,"XYZ",null,null,null,!0,null,s,r,q,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
this.r=q
this.x.h(0,q)},
Zt:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=W.r3("span",null)
this.z=z
document.body.appendChild(z)
P.u5()
z=S.Mp(0)
y=[]
x=new S.Vh(null,null)
x.Q=new S.Lk(0,0,0)
x.a=new S.AI(0,0,0,0)
w=P.u5()
v=S.qM()
u=new T.aI(new Float32Array(H.T0(16)))
u.xI()
t=new T.aI(new Float32Array(H.T0(16)))
t.xI()
t=new S.AQ(null,null,"highp",z,0,null,!0,!0,!0,!0,!1,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1,!0,!1,!1,1,2,8,4,!0,y,[],x,[],0,null,null,-1,null,null,0,0,w,-1,-1,-1,-1,-1,-1,-1,-1,null,null,null,null,0,0,0,0,0,0,v,u,t,new T.An(new Float32Array(H.T0(3))),new T.An(new Float32Array(H.T0(3))),null,!0,null,null,null,null,null,null,null,null,null,null,null,null)
z=window.devicePixelRatio!=null?window.devicePixelRatio:1
t.e=z
t.S8=P.Td(["ambient",[0,0,0],"directional",P.Td(["length",0,"colors",[],"positions",[]]),"point",P.Td(["length",0,"colors",[],"positions",[],"distances",[]]),"spot",P.Td(["length",0,"colors",[],"positions",[],"distances",[],"directions",[],"anglesCos",[],"exponents",[]]),"hemi",P.Td(["length",0,"skyColors",[],"groundColors",[],"positions",[]])])
t.Q=W.d9(null,null)
t.Vb()
t.xs()
t.Ht=J.uB(t.a,34930)
t.HV=J.uB(t.a,35660)
t.cf=J.uB(t.a,3379)
t.Jz=J.uB(t.a,34076)
t.eD=t.kZ!=null?J.uB(t.a,34047):0
z=t.HV
if(typeof z!=="number")return z.A()
z=z>0
t.jq=z
t.EJ=z&&t.Y0!=null
if(t.Rj!=null)J.uB(t.a,34467)
s=J.iM(t.a,35633,36338)
r=J.iM(t.a,35633,36337)
J.iM(t.a,35633,36336)
q=J.iM(t.a,35632,36338)
p=J.iM(t.a,35632,36337)
J.iM(t.a,35632,36336)
J.iM(t.a,35633,36341)
J.iM(t.a,35633,36340)
J.iM(t.a,35633,36339)
J.iM(t.a,35632,36341)
J.iM(t.a,35632,36340)
J.iM(t.a,35632,36339)
z=s.precision
if(typeof z!=="number")return z.A()
if(z>0){z=q.precision
if(typeof z!=="number")return z.A()
o=z>0}else o=!1
z=r.precision
if(typeof z!=="number")return z.A()
if(z>0){z=p.precision
if(typeof z!=="number")return z.A()
n=z>0}else n=!1
if(t.b==="highp"&&!o)if(n){t.b="mediump"
P.JS("WebGLRenderer: highp not supported, using mediump")}else{t.b="lowp"
P.JS("WebGLRenderer: highp and mediump not supported, using lowp")}if(t.b==="mediump"&&!n){t.b="lowp"
P.JS("WebGLRenderer: mediump not supported, using lowp")}z=S.M6()
t.l4=z
z.no(t)
y.push(z)
t.HU(window.innerWidth,window.innerHeight)
this.ch=t
J.ow(this.z).Q.appendChild(this.ch.Q)
t=H.J(new W.RO(window,"resize",!1),[null])
H.J(new W.xC(0,t.Q,t.a,W.V(this.gLR()),t.b),[H.Kp(t,0)]).P6()},
BV:[function(a){var z,y,x
z=this.y
y=window.innerWidth
x=window.innerHeight
if(typeof y!=="number")return y.S()
if(typeof x!=="number")return H.o(x)
z.Jc=y/x
z.hk()
this.ch.HU(window.innerWidth,window.innerHeight)},"$1","gLR",2,0,1]},
ZC:{
"^":"a;Q",
WH:function(a,b){var z,y,x
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.no))
y=new S.SN("f",null,!0,null)
y.sM(0,1.5)
x=P.Td(["color",z,"scale",y])
y=document.querySelector("#bluenoisevertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#bluenoisefragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,x,0,y,!0,!1,1)},
Qm:function(){var z,y,x
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.UX))
y=new S.SN("f",null,!0,null)
y.sM(0,0.5)
x=P.Td(["color",z,"alpha",y])
y=document.querySelector("#transparentvertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#transparentfragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,x,0,y,!0,!1,1)},
Bt:function(){var z,y
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.nv))
y=P.Td(["color",z])
z=document.querySelector("#vertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#fragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,y,0,z,!0,!1,1)},
fj:function(){var z,y
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.R8))
y=P.Td(["color",z])
z=document.querySelector("#vertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#fragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,y,0,z,!0,!1,1)},
rw:function(){var z,y,x
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.dB))
y=new S.SN("f",null,!0,null)
y.sM(0,2)
x=P.Td(["color",z,"scale",y])
y=document.querySelector("#rednoisevertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#rednoisefragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,x,0,y,!0,!1,1)},
RY:function(){var z,y,x
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.Jc))
y=new S.SN("f",null,!0,null)
y.sM(0,2)
x=P.Td(["color",z,"scale",y])
y=document.querySelector("#greennoisevertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#greennoisefragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,x,0,y,!0,!1,1)},
C1:function(){var z,y,x
z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp($.DP))
y=new S.SN("f",null,!0,null)
y.sM(0,3)
x=P.Td(["color",z,"scale",y])
y=document.querySelector("#greennoisevertexshader").textContent
return S.SS(0,null,205,100,204,1,!0,!0,!0,document.querySelector("#greennoisefragmentshader").textContent,!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,x,0,y,!0,!1,1)}},
a2:{
"^":"a;Q,a,b"},
Ve:{
"^":"a;Q,a,b,c,d,e,f,r,x,y",
Ji:function(){var z=this.Q*this.c
return new G.a2(z,z,z)},
rk:function(){var z=this.Q*this.d
return new G.a2(z,z,z)},
d7:function(){var z=this.Q*this.e
return new G.a2(z,z,z)},
X8:function(a,b,c){var z,y
z=this.a
this.c=z
this.d=z*1.5
y=z*2
this.e=y
this.f=y
this.r=this.Q
this.x=z
this.y=2},
static:{R5:function(a,b,c){var z=new G.Ve(a,b,c,null,null,null,null,null,null,null)
z.X8(a,b,c)
return z}}},
mh:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx",
Zf:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.e
z.Q.push(new G.pZ(3,0.05,0,C.lX))
z.Q.push(new G.pZ(3,0.05,1,C.lX))
z.Q.push(new G.pZ(3,0.05,2,C.lX))
z.Q.push(new G.pZ(3,0.05,3,C.lX))
z.Q.push(new G.pZ(3,0.05,4,C.lX))
z.Q.push(new G.pZ(3,0.05,5,C.lX))
z.Q.push(new G.pZ(3,0.05,6,C.lX))
z.Q.push(new G.pZ(3,0.05,7,C.lX))
z.Q.push(new G.pZ(3,0.05,8,C.lX))
z.Q.push(new G.pZ(3,0.05,9,C.lX))
z.Q.push(new G.pZ(3,0.05,10,C.lX))
z.Q.push(new G.pZ(3,0.05,11,C.lX))
z.Q.push(new G.pZ(3,0.05,12,C.lX))
z.Q.push(new G.pZ(3,0.05,13,C.lX))
z.Q.push(new G.pZ(3,0.05,14,C.lX))
z.Q.push(new G.pZ(3,0.05,15,C.lX))
z.Q.push(new G.pZ(3,0.05,16,C.lX))
z.Q.push(new G.pZ(3,0.05,17,C.lX))
z.Q.push(new G.pZ(3,0.05,18,C.lX))
z.Q.push(new G.pZ(4,0.05,6,C.lX))
z.Q.push(new G.pZ(5,0.05,6,C.lX))
z.Q.push(new G.pZ(6,0.05,6,C.lX))
z.Q.push(new G.pZ(7,0.05,6,C.lX))
z.Q.push(new G.pZ(8,0.05,6,C.lX))
z.Q.push(new G.pZ(9,0.05,6,C.lX))
z.Q.push(new G.pZ(10,0.05,6,C.lX))
z.Q.push(new G.pZ(11,0.05,6,C.lX))
z.Q.push(new G.pZ(12,0.05,6,C.lX))
z.Q.push(new G.pZ(13,0.05,6,C.lX))
z.Q.push(new G.pZ(14,0.05,6,C.lX))
z.Q.push(new G.pZ(15,0.05,6,C.lX))
z.Q.push(new G.pZ(16,0.05,6,C.lX))
z.Q.push(new G.pZ(17,0.05,6,C.lX))
z.Q.push(new G.pZ(18,0.05,6,C.lX))
z.Q.push(new G.pZ(4,0.05,13,C.lX))
z.Q.push(new G.pZ(5,0.05,13,C.lX))
z.Q.push(new G.pZ(6,0.05,13,C.lX))
z.Q.push(new G.pZ(7,0.05,13,C.lX))
z.Q.push(new G.pZ(8,0.05,13,C.lX))
z.Q.push(new G.pZ(9,0.05,13,C.lX))
z.Q.push(new G.pZ(10,0.05,13,C.lX))
z.Q.push(new G.pZ(11,0.05,13,C.lX))
z.Q.push(new G.pZ(12,0.05,13,C.lX))
z.Q.push(new G.pZ(13,0.05,13,C.lX))
z.Q.push(new G.pZ(14,0.05,13,C.lX))
z.Q.push(new G.pZ(15,0.05,13,C.lX))
z.Q.push(new G.pZ(16,0.05,13,C.lX))
z.Q.push(new G.pZ(17,0.05,13,C.lX))
z.Q.push(new G.pZ(18,0.05,13,C.lX))
z.Q.push(new G.pZ(6,0.005,8,C.jU))
z.Q.push(new G.pZ(10,0.005,8,C.jU))
z.Q.push(new G.pZ(12,0.005,8,C.uX))
z.Q.push(new G.pZ(16,0.005,7,C.wA))
z.Q.push(new G.pZ(0,0.005,5,C.iD))
z.Q.push(new G.pZ(1,0.005,5,C.iD))
z.Q.push(new G.pZ(2,0.005,5,C.iD))
z.Q.push(new G.pZ(5,0.005,5,C.iD))
z.Q.push(new G.pZ(6,0.005,5,C.iD))
z.Q.push(new G.pZ(7,0.005,5,C.iD))
z.Q.push(new G.pZ(8,0.005,5,C.iD))
z.Q.push(new G.pZ(9,0.005,5,C.iD))
z.Q.push(new G.pZ(10,0.005,5,C.iD))
z.Q.push(new G.pZ(11,0.005,5,C.iD))
z.Q.push(new G.pZ(12,0.005,5,C.iD))
z.Q.push(new G.pZ(13,0.005,5,C.iD))
z.Q.push(new G.pZ(14,0.005,5,C.iD))
z.Q.push(new G.pZ(15,0.005,5,C.iD))
z.Q.push(new G.pZ(16,0.005,5,C.iD))
z.Q.push(new G.pZ(17,0.005,5,C.iD))
z.Q.push(new G.pZ(18,0.005,5,C.iD))
z.Q.push(new G.pZ(19,0.005,5,C.iD))
z.Q.push(new G.pZ(0,0.05,0,C.Xz))
z.Q.push(new G.pZ(1,0.05,0,C.Xz))
z.Q.push(new G.pZ(2,0.05,0,C.Xz))
z.Q.push(new G.pZ(5,0.05,0,C.Xz))
z.Q.push(new G.pZ(6,0.05,0,C.Xz))
z.Q.push(new G.pZ(7,0.05,0,C.Xz))
z.Q.push(new G.pZ(8,0.05,0,C.Xz))
z.Q.push(new G.pZ(9,0.05,0,C.Xz))
z.Q.push(new G.pZ(10,0.05,0,C.Xz))
z.Q.push(new G.pZ(11,0.05,0,C.Xz))
z.Q.push(new G.pZ(12,0.05,0,C.Xz))
z.Q.push(new G.pZ(13,0.05,0,C.Xz))
z.Q.push(new G.pZ(14,0.05,0,C.Xz))
z.Q.push(new G.pZ(15,0.05,0,C.Xz))
z.Q.push(new G.pZ(16,0.05,0,C.Xz))
z.Q.push(new G.pZ(17,0.05,0,C.Xz))
z.Q.push(new G.pZ(18,0.05,0,C.Xz))
z.Q.push(new G.pZ(19,0.05,0,C.Xz))
z.Q.push(new G.pZ(0,0.05,1,C.Xz))
z.Q.push(new G.pZ(1,0.05,1,C.Xz))
z.Q.push(new G.pZ(2,0.05,1,C.Xz))
z.Q.push(new G.pZ(5,0.05,1,C.Xz))
z.Q.push(new G.pZ(6,0.05,1,C.Xz))
z.Q.push(new G.pZ(7,0.05,1,C.Xz))
z.Q.push(new G.pZ(8,0.05,1,C.Xz))
z.Q.push(new G.pZ(9,0.05,1,C.Xz))
z.Q.push(new G.pZ(10,0.05,1,C.Xz))
z.Q.push(new G.pZ(11,0.05,1,C.Xz))
z.Q.push(new G.pZ(12,0.05,1,C.Xz))
z.Q.push(new G.pZ(13,0.05,1,C.Xz))
z.Q.push(new G.pZ(14,0.05,1,C.Xz))
z.Q.push(new G.pZ(15,0.05,1,C.Xz))
z.Q.push(new G.pZ(16,0.05,1,C.Xz))
z.Q.push(new G.pZ(17,0.05,1,C.Xz))
z.Q.push(new G.pZ(18,0.05,1,C.Xz))
z.Q.push(new G.pZ(19,0.05,1,C.Xz))
z.Q.push(new G.pZ(0,0.05,2,C.Xz))
z.Q.push(new G.pZ(1,0.05,2,C.Xz))
z.Q.push(new G.pZ(2,0.05,2,C.Xz))
z.Q.push(new G.pZ(5,0.05,2,C.Xz))
z.Q.push(new G.pZ(6,0.05,2,C.Xz))
z.Q.push(new G.pZ(7,0.05,2,C.Xz))
z.Q.push(new G.pZ(8,0.05,2,C.Xz))
z.Q.push(new G.pZ(9,0.05,2,C.Xz))
z.Q.push(new G.pZ(10,0.05,2,C.Xz))
z.Q.push(new G.pZ(11,0.05,2,C.Xz))
z.Q.push(new G.pZ(12,0.05,2,C.Xz))
z.Q.push(new G.pZ(13,0.05,2,C.Xz))
z.Q.push(new G.pZ(14,0.05,2,C.Xz))
z.Q.push(new G.pZ(15,0.05,2,C.Xz))
z.Q.push(new G.pZ(16,0.05,2,C.Xz))
z.Q.push(new G.pZ(17,0.05,2,C.Xz))
z.Q.push(new G.pZ(18,0.05,2,C.Xz))
z.Q.push(new G.pZ(19,0.05,2,C.Xz))
z.Q.push(new G.pZ(0,0.05,3,C.Xz))
z.Q.push(new G.pZ(1,0.05,3,C.Xz))
z.Q.push(new G.pZ(2,0.05,3,C.Xz))
z.Q.push(new G.pZ(5,0.05,3,C.Xz))
z.Q.push(new G.pZ(6,0.05,3,C.Xz))
z.Q.push(new G.pZ(7,0.05,3,C.Xz))
z.Q.push(new G.pZ(8,0.05,3,C.Xz))
z.Q.push(new G.pZ(9,0.05,3,C.Xz))
z.Q.push(new G.pZ(10,0.05,3,C.Xz))
z.Q.push(new G.pZ(11,0.05,3,C.Xz))
z.Q.push(new G.pZ(12,0.05,3,C.Xz))
z.Q.push(new G.pZ(13,0.05,3,C.Xz))
z.Q.push(new G.pZ(14,0.05,3,C.Xz))
z.Q.push(new G.pZ(15,0.05,3,C.Xz))
z.Q.push(new G.pZ(16,0.05,3,C.Xz))
z.Q.push(new G.pZ(17,0.05,3,C.Xz))
z.Q.push(new G.pZ(18,0.05,3,C.Xz))
z.Q.push(new G.pZ(19,0.05,3,C.Xz))
z.Q.push(new G.pZ(0,0.05,4,C.Xz))
z.Q.push(new G.pZ(1,0.05,4,C.Xz))
z.Q.push(new G.pZ(2,0.05,4,C.Xz))
z.Q.push(new G.pZ(5,0.05,4,C.Xz))
z.Q.push(new G.pZ(6,0.05,4,C.Xz))
z.Q.push(new G.pZ(7,0.05,4,C.Xz))
z.Q.push(new G.pZ(8,0.05,4,C.Xz))
z.Q.push(new G.pZ(9,0.05,4,C.Xz))
z.Q.push(new G.pZ(10,0.05,4,C.Xz))
z.Q.push(new G.pZ(11,0.05,4,C.Xz))
z.Q.push(new G.pZ(12,0.05,4,C.Xz))
z.Q.push(new G.pZ(13,0.05,4,C.Xz))
z.Q.push(new G.pZ(14,0.05,4,C.Xz))
z.Q.push(new G.pZ(15,0.05,4,C.Xz))
z.Q.push(new G.pZ(16,0.05,4,C.Xz))
z.Q.push(new G.pZ(17,0.05,4,C.Xz))
z.Q.push(new G.pZ(18,0.05,4,C.Xz))
z.Q.push(new G.pZ(19,0.05,4,C.Xz))
z.Q.push(new G.pZ(0,0.05,5,C.Xz))
z.Q.push(new G.pZ(1,0.05,5,C.Xz))
z.Q.push(new G.pZ(2,0.05,5,C.Xz))
z.Q.push(new G.pZ(5,0.05,5,C.Xz))
z.Q.push(new G.pZ(6,0.05,5,C.Xz))
z.Q.push(new G.pZ(7,0.05,5,C.Xz))
z.Q.push(new G.pZ(8,0.05,5,C.Xz))
z.Q.push(new G.pZ(9,0.05,5,C.Xz))
z.Q.push(new G.pZ(10,0.05,5,C.Xz))
z.Q.push(new G.pZ(11,0.05,5,C.Xz))
z.Q.push(new G.pZ(12,0.05,5,C.Xz))
z.Q.push(new G.pZ(13,0.05,5,C.Xz))
z.Q.push(new G.pZ(14,0.05,5,C.Xz))
z.Q.push(new G.pZ(15,0.05,5,C.Xz))
z.Q.push(new G.pZ(16,0.05,5,C.Xz))
z.Q.push(new G.pZ(17,0.05,5,C.Xz))
z.Q.push(new G.pZ(18,0.05,5,C.Xz))
z.Q.push(new G.pZ(19,0.05,5,C.Xz))
z.Q.push(new G.pZ(15,0.05,15,C.Uf))
y=z.Q
for(z=y.length,x=0;x<y.length;y.length===z||(0,H.lk)(y),++x){w=y[x]
switch(w.gnJ()){case C.lX:v=this.Q
u=this.c
t=u.Q
u=t*u.f
s=this.Za(w,new G.a2(u,t,u))
u=this.c
u=u.Q*u.f
t=this.cy
r=new G.XY(null,null,null)
u=S.Bc(u,u,null,null)
r.Q=u
r.b=-90
t=S.YU(u,t)
u=t.r
r=r.b
if(typeof r!=="number")return r.R()
u.Q[0]=r*0.017453292519943295
t.f.xu(s)
v.push(t)
break
case C.jU:v=this.Q
u=this.c
u=u.Q*u.d
s=this.Za(w,new G.a2(u,u,u))
u=this.c
u=u.Q*u.d
q=G.uj(new G.a2(u,u,u),3,!1,this.y)
q.dx.f.xu(s)
q.lB(this.cx,this.ch)
v.push(q.dx)
break
case C.uX:v=this.Q
u=this.c
u=u.Q*u.c
s=this.Za(w,new G.a2(u,u,u))
u=this.c
u=u.Q*u.c
q=G.uj(new G.a2(u,u,u),2,!1,this.x)
q.dx.f.xu(s)
q.lB(this.cx,this.ch)
v.push(q.dx)
break
case C.wA:v=this.Q
u=this.c
u=u.Q*u.e
s=this.Za(w,new G.a2(u,u,u))
u=this.c
u=u.Q*u.e
q=G.uj(new G.a2(u,u,u),4,!1,this.z)
q.dx.f.xu(s)
q.lB(this.cx,this.ch)
v.push(q.dx)
break
case C.iD:v=this.Q
u=this.c
u=u.Q*u.r
s=this.Za(w,new G.a2(u,u,u))
u=this.c
u=u.Q*u.r
t=this.db
r=this.dx
p=new G.I7(null,null,null,null,null,null,null)
p.tI(new G.a2(u,u,u))
t=S.YU(p.Q,t)
t.f.xu(p.b)
p.e=t
r=S.YU(p.a,r)
r.f.xu(p.c)
p.f=r
r=S.ep()
p.d=r
r.h(0,p.e)
p.d.h(0,p.f)
p.d.f.xu(s)
v.push(p.d)
break
case C.Xz:v=this.Q
u=this.c
t=u.Q
u=t*u.x
s=this.Za(w,new G.a2(u,t,u))
u=this.c
u=u.Q*u.x
t=this.f
t=S.YU(S.Bc(u,u,null,null),t)
u=t.f
r=u.Q
r[0]=0
r[1]=0
r[2]=0
t.r.Q[0]=-1.5707963267948966
u.xu(s)
v.push(t)
break
case C.Uf:v=this.Q
u=this.c.y
s=this.Za(w,new G.a2(u,u,u))
u=this.c.y
t=$.qE
r=new S.uH(1,1,1)
r.tz(16777215)
o=new S.uH(1,1,1)
o.tz(0)
n=new S.uH(1,1,1)
n.tz(1118481)
m=new Float32Array(3)
l=new T.An(m)
m[0]=1
m[1]=1
m[2]=1
m=l
l=$.YY
$.YY=l+1
k=new S.uH(1,1,1)
k.tz(t)
j=new S.kD(r,o,n,30,!1,!1,!1,m,null,null,null,1,null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
t=new Float32Array(2)
t[0]=1
t[1]=1
j.bR=new T.z3(t)
t=$.dS
r=new S.uH(1,1,1)
r.tz(16777215)
o=new S.uH(1,1,1)
o.tz(0)
n=new S.uH(1,1,1)
n.tz(1118481)
m=new Float32Array(3)
l=new T.An(m)
m[0]=1
m[1]=1
m[2]=1
m=l
l=$.YY
$.YY=l+1
k=new S.uH(1,1,1)
k.tz(t)
i=new S.kD(r,o,n,30,!1,!1,!1,m,null,null,null,1,null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
t=new Float32Array(2)
t[0]=1
t[1]=1
i.bR=new T.z3(t)
t=$.Ti
r=new S.uH(1,1,1)
r.tz(16777215)
o=new S.uH(1,1,1)
o.tz(0)
n=new S.uH(1,1,1)
n.tz(1118481)
m=new Float32Array(3)
l=new T.An(m)
m[0]=1
m[1]=1
m[2]=1
m=l
l=$.YY
$.YY=l+1
k=new S.uH(1,1,1)
k.tz(t)
h=new S.kD(r,o,n,30,!1,!1,!1,m,null,null,null,1,null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
t=new Float32Array(2)
t[0]=1
t[1]=1
h.bR=new T.z3(t)
t=$.fy
r=new S.uH(1,1,1)
r.tz(16777215)
o=new S.uH(1,1,1)
o.tz(0)
n=new S.uH(1,1,1)
n.tz(1118481)
m=new Float32Array(3)
l=new T.An(m)
m[0]=1
m[1]=1
m[2]=1
m=l
l=$.YY
$.YY=l+1
k=new S.uH(1,1,1)
k.tz(t)
g=new S.kD(r,o,n,30,!1,!1,!1,m,null,null,null,1,null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
t=new Float32Array(2)
t[0]=1
t[1]=1
g.bR=new T.z3(t)
t=$.GV
r=new S.uH(1,1,1)
r.tz(16777215)
o=new S.uH(1,1,1)
o.tz(0)
n=new S.uH(1,1,1)
n.tz(1118481)
m=new Float32Array(3)
l=new T.An(m)
m[0]=1
m[1]=1
m[2]=1
m=l
l=$.YY
$.YY=l+1
k=new S.uH(1,1,1)
k.tz(t)
f=new S.kD(r,o,n,30,!1,!1,!1,m,null,null,null,1,null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
t=new Float32Array(2)
t[0]=1
t[1]=1
f.bR=new T.z3(t)
t=$.D4
r=new S.uH(1,1,1)
r.tz(16777215)
o=new S.uH(1,1,1)
o.tz(0)
n=new S.uH(1,1,1)
n.tz(1118481)
m=new Float32Array(3)
l=new T.An(m)
m[0]=1
m[1]=1
m[2]=1
m=l
l=$.YY
$.YY=l+1
k=new S.uH(1,1,1)
k.tz(t)
e=new S.kD(r,o,n,30,!1,!1,!1,m,null,null,null,1,null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
t=new Float32Array(2)
t[0]=1
t[1]=1
e.bR=new T.z3(t)
d=new G.R4(null,new G.qq(j,i,h,g,f,e),null,null,null,null,null,null,null,null,null,null,null,null)
d.Nd(u)
j=S.YU(d.x,d.cy.Q)
j.a="torso"
j.f.xu(d.y)
i=S.YU(d.z,d.cy.a)
i.a="head"
i.f.xu(d.ch)
h=S.YU(d.Q,d.cy.b)
h.a="leftarm"
h.f.xu(d.a)
g=S.YU(d.b,d.cy.c)
g.a="rightarm"
g.f.xu(d.c)
f=S.YU(d.d,d.cy.d)
f.a="leftleg"
f.f.xu(d.e)
e=S.YU(d.f,d.cy.e)
e.a="rightleg"
e.f.xu(d.r)
u=S.ep()
d.cx=u
u.h(0,j)
d.cx.h(0,i)
d.cx.h(0,h)
d.cx.h(0,g)
d.cx.h(0,f)
d.cx.h(0,e)
d.cx.f.xu(s)
v.push(d.cx)
break}}return this.Q},
Za:function(a,b){var z,y,x,w,v,u,t
z=this.c
y=z.Q
x=y*z.b
w=a.Q
y=z.a*y
z=a.b
v=b.Q
u=a.a
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(x-w*y-v/2,u,x-z*y-b.b/2)
return t}},
x4:{
"^":"a;Q"},
pF:{
"^":"a;Q",
X:function(a){return C.zg.p(0,this.Q)}},
pZ:{
"^":"a;x:Q>,y:a>,z:b>,nJ:c<"},
mM:{
"^":"a;",
Nd:function(a){var z,y,x,w,v,u,t
z=G.R5(5,10,200).Q
y=z*a
this.x=S.jk(z,y,z,1,1,1,null,null)
x=z/1.5
this.z=S.jk(x,x,x,1,1,1,null,null)
x=z/8
w=z/4
this.Q=S.jk(x,y,w,1,1,1,null,null)
this.b=S.jk(x,y,w,1,1,1,null,null)
this.d=S.jk(w,y,w,1,1,1,null,null)
this.f=S.jk(w,y,w,1,1,1,null,null)
v=y/2
z/=2
u=y+z
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v,u,z)
this.y=t
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v,y*2-w,y/4)
this.ch=t
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v-z-x,u,z)
this.a=t
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v+z+x,u,z)
this.c=t
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v-w,z,z)
this.e=t
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v+w,z,z)
this.r=t}},
R4:{
"^":"mM;cx,cy,Q,a,b,c,d,e,f,r,x,y,z,ch"},
ei:{
"^":"a;"},
qq:{
"^":"a;Q,a,b,c,d,e"},
hD:{
"^":"a;Q"},
I7:{
"^":"Ui;d,e,f,Q,a,b,c"},
Ui:{
"^":"a;",
tI:function(a){var z,y,x,w
z=a.b
this.Q=S.jk(a.Q/4,a.a*4,z/4,1,1,1,null,null)
this.a=S.jk(a.Q,a.a,z,1,1,1,null,null)
y=a.Q
x=a.a
z/=2
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(y/2,x*2,z)
this.b=w
w=a.Q
x=a.a
y=new T.An(new Float32Array(H.T0(3)))
y.PJ(w/2,x*4,z)
this.c=y}},
Uo:{
"^":"mY;a,Q"},
mY:{
"^":"a;"}}],["","",,F,{
"^":"",
Q:[function(){var z=new F.L(null,null,null,null,null,null,null,null)
z.kI()
z.Y(0,0)},"$0","ao",0,0,3],
L:{
"^":"a;Q,a,b,c,d,e,f,r",
kI:function(){var z,y,x,w,v,u,t
z=$.no
y=$.YY
$.YY=y+1
this.b=new G.ZC(new S.kP(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",y,0,S.Mp(z),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
this.Q=G.R5(5,10,200)
z=new G.mh(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.Q=H.J([],[S.ba])
y=$.no
x=$.YY
$.YY=x+1
y=new S.kP(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.Mp(y),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
x=new G.ZC(y)
z.a=x
z.b=new G.ei()
w=new G.x4(null)
w.Q=H.J([],[G.pZ])
z.e=w
w=G.R5(5,10,200)
z.c=w
z.f=x.C1()
z.r=y
z.x=x.WH(w.Ji().Q,w.Ji().b)
z.y=x.WH(w.rk().Q,w.rk().b)
z.z=x.WH(w.d7().Q,w.d7().b)
z.ch=x.Qm()
z.cx=x.Bt()
z.cy=x.fj()
z.db=x.rw()
z.dx=x.RY()
this.d=z
this.f=1.5
this.r=0.002
z=this.Q
z=z.Q*z.b
z=new G.G8(z,z,null,null,null,null,null,null,null,null,null,null,null)
z.d=13882323
z.b=4473924
z.c=16777215
z.x=S.XS()
z.Ok()
z.Hw()
z.wJ()
z.Zt()
x=z.e.f
w=this.Q
w=w.Q*w.b/2
x.PJ(w,0,w)
w=z.y.f
x=this.Q
y=x.Q
x=y*x.b/2
w.PJ(x,y*3.5,x)
this.a=z
v=this.d.Zf()
for(z=v.length,u=0;u<v.length;v.length===z||(0,H.lk)(v),++u){t=v[u]
this.a.x.h(0,t)}z=this.a
z=L.mE(z.y,z.ch.Q)
this.e=z
z.c=this.f
z.d=this.r
z.e=!1
z.ry=!0},
Y:[function(a,b){var z,y
z=window
y=this.gtV(this)
C.U.y4(z)
C.U.Z(z,W.V(y))
this.e.eC(0,1)
y=this.a
y.ch.pO(y.x,y.y)},"$1","gtV",2,0,21]}},1],["","",,S,{
"^":"",
H4:function(a,b,c,d){var z,y,x,w,v
z=b.T(0,c).p3(0)
if(z.gv(z)===0)z.Q[2]=1
y=d.Pv(z).p3(0)
if(y.gv(y)===0){x=z.Q
x[0]=x[0]+0.0001
y=d.Pv(z).p3(0)}x=y.Q
w=z.Pv(y).p3(0).Q
v=z.Q
a.Gd(x[0],x[1],x[2],0,w[0],w[1],w[2],0,v[0],v[1],v[2],0,0,0,0,1)
return a},
lY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.Q
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=y+y
t=x+x
s=w+w
r=y*u
q=y*t
p=y*s
o=x*t
n=x*s
m=w*s
l=v*u
k=v*t
j=v*s
z=a.Q
z[0]=1-(o+m)
z[4]=q-j
z[8]=p+k
z[1]=q+j
z[5]=1-(r+m)
z[9]=n-l
z[2]=p-k
z[6]=n+l
z[10]=1-(r+o)
return a},
Rc:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a4.p(0,10)*a4.p(0,5)-a4.p(0,6)*a4.p(0,9)
y=a4.p(0,10)
x=a4.p(0,1)
w=a4.p(0,2)
v=a4.p(0,9)
u=a4.p(0,6)
t=a4.p(0,1)
s=a4.p(0,2)
r=a4.p(0,5)
q=-a4.p(0,10)*a4.p(0,4)+a4.p(0,6)*a4.p(0,8)
p=a4.p(0,10)
o=a4.p(0,0)
n=a4.p(0,2)
m=a4.p(0,8)
l=a4.p(0,6)
k=a4.p(0,0)
j=a4.p(0,2)
i=a4.p(0,4)
h=a4.p(0,9)*a4.p(0,4)-a4.p(0,5)*a4.p(0,8)
g=a4.p(0,9)
f=a4.p(0,0)
e=a4.p(0,1)
d=a4.p(0,8)
c=a4.p(0,5)
b=a4.p(0,0)
a=a4.p(0,1)
a0=a4.p(0,4)
a1=a4.p(0,0)*z+a4.p(0,1)*q+a4.p(0,2)*h
if(a1===0)P.JS("Matrix3.getInverse(): determinant == 0")
a2=1/a1
a3=new T.No(new Float32Array(H.T0(9)))
a3.F2(a2*z,a2*(-y*x+w*v),a2*(u*t-s*r),a2*q,a2*(p*o-n*m),a2*(-l*k+j*i),a2*h,a2*(-g*f+e*d),a2*(c*b-a*a0))
return a3},
SX:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=a.gEv(a)
y=z.length
if(0>=y)return H.e(z,0)
x=z[0]
if(1>=y)return H.e(z,1)
w=z[1]
if(2>=y)return H.e(z,2)
v=z[2]
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(x,w,v)
if(4>=y)return H.e(z,4)
v=z[4]
if(5>=y)return H.e(z,5)
w=z[5]
if(6>=y)return H.e(z,6)
x=z[6]
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(v,w,x)
if(8>=y)return H.e(z,8)
x=z[8]
if(9>=y)return H.e(z,9)
w=z[9]
if(10>=y)return H.e(z,10)
v=z[10]
s=new T.An(new Float32Array(H.T0(3)))
s.PJ(x,w,v)
x=d.Q
x[0]=u.gv(u)
x[1]=t.gv(t)
x[2]=s.gv(s)
if(12>=y)return H.e(z,12)
w=b.Q
w[0]=z[12]
if(13>=y)return H.e(z,13)
w[1]=z[13]
if(14>=y)return H.e(z,14)
w[2]=z[14]
r=a.t(0)
w=r.gEv(r)
if(0>=w.length)return H.e(w,0)
w[0]=w[0]/x[0]
w=r.gEv(r)
if(1>=w.length)return H.e(w,1)
w[1]=w[1]/x[0]
w=r.gEv(r)
if(2>=w.length)return H.e(w,2)
w[2]=w[2]/x[0]
w=r.gEv(r)
if(4>=w.length)return H.e(w,4)
w[4]=w[4]/x[1]
w=r.gEv(r)
if(5>=w.length)return H.e(w,5)
w[5]=w[5]/x[1]
w=r.gEv(r)
if(6>=w.length)return H.e(w,6)
w[6]=w[6]/x[1]
w=r.gEv(r)
if(8>=w.length)return H.e(w,8)
w[8]=w[8]/x[2]
w=r.gEv(r)
if(9>=w.length)return H.e(w,9)
w[9]=w[9]/x[2]
w=r.gEv(r)
if(10>=w.length)return H.e(w,10)
w[10]=w[10]/x[2]
q=T.Bw()
z=r.gEv(r)
x=z.length
if(0>=x)return H.e(z,0)
p=z[0]
if(4>=x)return H.e(z,4)
o=z[4]
if(8>=x)return H.e(z,8)
n=z[8]
m=z[1]
l=z[5]
if(9>=x)return H.e(z,9)
k=z[9]
j=z[2]
i=z[6]
if(10>=x)return H.e(z,10)
h=z[10]
g=p+l+h
if(g>0){f=0.5/Math.sqrt(H.E0(g+1))
y=q.Q
y[3]=0.25/f
y[0]=(i-k)*f
y[1]=(n-j)*f
y[2]=(m-o)*f}else if(p>l&&p>h){f=2*Math.sqrt(H.E0(1+p-l-h))
y=q.Q
y[3]=(i-k)/f
y[0]=0.25*f
y[1]=(o+m)/f
y[2]=(n+j)/f}else{y=q.Q
x=k+i
if(l>h){f=2*Math.sqrt(H.E0(1+l-p-h))
y[3]=(n-j)/f
y[0]=(o+m)/f
y[1]=0.25*f
y[2]=x/f}else{f=2*Math.sqrt(H.E0(1+h-p-l))
y[3]=(m-o)/f
y[0]=(n+j)/f
y[1]=x/f
y[2]=0.25*f}}return[b,c,d]},
ZM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new S.EI()
y=a.Q
x=y[0]
w=y[4]
v=y[8]
u=y[1]
t=y[5]
s=y[9]
r=y[2]
q=y[6]
p=y[10]
if(b==="XYZ"){o=Math.asin(H.E0(z.$1(v)))
if(Math.abs(v)<0.99999){n=Math.atan2(H.E0(-s),H.E0(p))
m=Math.atan2(H.E0(-w),H.E0(x))}else{n=Math.atan2(H.E0(u),H.E0(t))
m=0}}else if(b==="YXZ"){n=Math.asin(H.E0(J.EF(z.$1(s))))
if(Math.abs(s)<0.99999){o=Math.atan2(H.E0(v),H.E0(p))
m=Math.atan2(H.E0(u),H.E0(t))}else{o=Math.atan2(H.E0(-r),H.E0(x))
m=0}}else if(b==="ZXY"){n=Math.asin(H.E0(z.$1(q)))
if(Math.abs(q)<0.99999){o=Math.atan2(H.E0(-r),H.E0(p))
m=Math.atan2(H.E0(-w),H.E0(t))}else{m=Math.atan2(H.E0(v),H.E0(x))
o=0}}else if(b==="ZYX"){o=Math.asin(H.E0(J.EF(z.$1(r))))
if(Math.abs(r)<0.99999){n=Math.atan2(H.E0(q),H.E0(p))
m=Math.atan2(H.E0(u),H.E0(x))}else{m=Math.atan2(H.E0(-w),H.E0(t))
n=0}}else if(b==="YZX"){m=Math.asin(H.E0(z.$1(u)))
if(Math.abs(u)<0.99999){n=Math.atan2(H.E0(-s),H.E0(t))
o=Math.atan2(H.E0(-r),H.E0(x))}else{o=Math.atan2(H.E0(r),H.E0(p))
n=0}}else if(b==="XZY"){m=Math.asin(H.E0(J.EF(z.$1(w))))
if(Math.abs(w)<0.99999){n=Math.atan2(H.E0(q),H.E0(t))
o=Math.atan2(H.E0(v),H.E0(x))}else{n=Math.atan2(H.E0(-v),H.E0(p))
o=0}}else{n=null
o=null
m=null}y=new T.An(new Float32Array(H.T0(3)))
y.PJ(n,o,m)
return y},
kI:function(){var z=$.qd
if(z==null){z=P.Td(["fog_pars_fragment",C.Nm.zV(["#ifdef USE_FOG","uniform vec3 fogColor;","#ifdef FOG_EXP2","uniform float fogDensity;","#else","uniform float fogNear;","uniform float fogFar;","#endif","#endif"],"\n"),"fog_fragment",C.Nm.zV(["#ifdef USE_FOG","float depth = gl_FragCoord.z / gl_FragCoord.w;","#ifdef FOG_EXP2","const float LOG2 = 1.442695;","float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );","fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );","#else","float fogFactor = smoothstep( fogNear, fogFar, depth );","#endif","gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );","#endif"],"\n"),"envmap_pars_fragment",C.Nm.zV(["#ifdef USE_ENVMAP","uniform float reflectivity;","uniform samplerCube envMap;","uniform float flipEnvMap;","uniform int combine;","#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )","uniform bool useRefract;","uniform float refractionRatio;","#else","varying vec3 vReflect;","#endif","#endif"],"\n"),"envmap_fragment",C.Nm.zV(["#ifdef USE_ENVMAP","vec3 reflectVec;","#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )","vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );","if ( useRefract ) {","reflectVec = refract( cameraToVertex, normal, refractionRatio );","} else { ","reflectVec = reflect( cameraToVertex, normal );","}","#else","reflectVec = vReflect;","#endif","#ifdef DOUBLE_SIDED","float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );","vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );","#else","vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );","#endif","#ifdef GAMMA_INPUT","cubeColor.xyz *= cubeColor.xyz;","#endif","if ( combine == 1 ) {","gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );","} else if ( combine == 2 ) {","gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;","} else {","gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );","}","#endif"],"\n"),"envmap_pars_vertex",C.Nm.zV(["#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )","varying vec3 vReflect;","uniform float refractionRatio;","uniform bool useRefract;","#endif"],"\n"),"worldpos_vertex",C.Nm.zV(["#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )","#ifdef USE_SKINNING","vec4 worldPosition = modelMatrix * skinned;","#endif","#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )","vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );","#endif","#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )","vec4 worldPosition = modelMatrix * vec4( position, 1.0 );","#endif","#endif"],"\n"),"envmap_vertex",C.Nm.zV(["#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )","vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;","worldNormal = normalize( worldNormal );","vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );","if ( useRefract ) {","vReflect = refract( cameraToVertex, worldNormal, refractionRatio );","} else {","vReflect = reflect( cameraToVertex, worldNormal );","}","#endif"],"\n"),"map_particle_pars_fragment",C.Nm.zV(["#ifdef USE_MAP","uniform sampler2D map;","#endif"],"\n"),"map_particle_fragment",C.Nm.zV(["#ifdef USE_MAP","gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );","#endif"],"\n"),"map_pars_vertex",C.Nm.zV(["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )","varying vec2 vUv;","uniform vec4 offsetRepeat;","#endif"],"\n"),"map_pars_fragment",C.Nm.zV(["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )","varying vec2 vUv;","#endif","#ifdef USE_MAP","uniform sampler2D map;","#endif"],"\n"),"map_vertex",C.Nm.zV(["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )","vUv = uv * offsetRepeat.zw + offsetRepeat.xy;","#endif"],"\n"),"map_fragment",C.Nm.zV(["#ifdef USE_MAP","vec4 texelColor = texture2D( map, vUv );","#ifdef GAMMA_INPUT","texelColor.xyz *= texelColor.xyz;","#endif","gl_FragColor = gl_FragColor * texelColor;","#endif"],"\n"),"lightmap_pars_fragment",C.Nm.zV(["#ifdef USE_LIGHTMAP","varying vec2 vUv2;","uniform sampler2D lightMap;","#endif"],"\n"),"lightmap_pars_vertex",C.Nm.zV(["#ifdef USE_LIGHTMAP","varying vec2 vUv2;","#endif"],"\n"),"lightmap_fragment",C.Nm.zV(["#ifdef USE_LIGHTMAP","gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );","#endif"],"\n"),"lightmap_vertex",C.Nm.zV(["#ifdef USE_LIGHTMAP","vUv2 = uv2;","#endif"],"\n"),"bumpmap_pars_fragment",C.Nm.zV(["#ifdef USE_BUMPMAP","uniform sampler2D bumpMap;","uniform float bumpScale;","vec2 dHdxy_fwd() {","vec2 dSTdx = dFdx( vUv );","vec2 dSTdy = dFdy( vUv );","float Hll = bumpScale * texture2D( bumpMap, vUv ).x;","float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;","float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;","return vec2( dBx, dBy );","}","vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {","vec3 vSigmaX = dFdx( surf_pos );","vec3 vSigmaY = dFdy( surf_pos );","vec3 vN = surf_norm;","vec3 R1 = cross( vSigmaY, vN );","vec3 R2 = cross( vN, vSigmaX );","float fDet = dot( vSigmaX, R1 );","vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );","return normalize( abs( fDet ) * surf_norm - vGrad );","}","#endif"],"\n"),"normalmap_pars_fragment",C.Nm.zV(["#ifdef USE_NORMALMAP","uniform sampler2D normalMap;","uniform vec2 normalScale;","vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {","vec3 q0 = dFdx( eye_pos.xyz );","vec3 q1 = dFdy( eye_pos.xyz );","vec2 st0 = dFdx( vUv.st );","vec2 st1 = dFdy( vUv.st );","vec3 S = normalize(  q0 * st1.t - q1 * st0.t );","vec3 T = normalize( -q0 * st1.s + q1 * st0.s );","vec3 N = normalize( surf_norm );","vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;","mapN.xy = normalScale * mapN.xy;","mat3 tsn = mat3( S, T, N );","return normalize( tsn * mapN );","}","#endif"],"\n"),"specularmap_pars_fragment",C.Nm.zV(["#ifdef USE_SPECULARMAP","uniform sampler2D specularMap;","#endif"],"\n"),"specularmap_fragment",C.Nm.zV(["float specularStrength;","#ifdef USE_SPECULARMAP","vec4 texelSpecular = texture2D( specularMap, vUv );","specularStrength = texelSpecular.r;","#else","specularStrength = 1.0;","#endif"],"\n"),"lights_lambert_pars_vertex",C.Nm.zV(["uniform vec3 ambient;","uniform vec3 diffuse;","uniform vec3 emissive;","uniform vec3 ambientLightColor;","#if MAX_DIR_LIGHTS > 0","uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];","uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];","#endif","#if MAX_HEMI_LIGHTS > 0","uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];","#endif","#if MAX_POINT_LIGHTS > 0","uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];","uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","#endif","#if MAX_SPOT_LIGHTS > 0","uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];","uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];","uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];","#endif","#ifdef WRAP_AROUND","uniform vec3 wrapRGB;","#endif"],"\n"),"lights_lambert_vertex",C.Nm.zV(["vLightFront = vec3( 0.0 );","#ifdef DOUBLE_SIDED","vLightBack = vec3( 0.0 );","#endif","transformedNormal = normalize( transformedNormal );","#if MAX_DIR_LIGHTS > 0","for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );","vec3 dirVector = normalize( lDirection.xyz );","float dotProduct = dot( transformedNormal, dirVector );","vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );","#ifdef DOUBLE_SIDED","vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );","#ifdef WRAP_AROUND","vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );","#endif","#endif","#ifdef WRAP_AROUND","vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );","directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );","#ifdef DOUBLE_SIDED","directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );","#endif","#endif","vLightFront += directionalLightColor[ i ] * directionalLightWeighting;","#ifdef DOUBLE_SIDED","vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;","#endif","}","#endif","#if MAX_POINT_LIGHTS > 0","for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float lDistance = 1.0;","if ( pointLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","float dotProduct = dot( transformedNormal, lVector );","vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );","#ifdef DOUBLE_SIDED","vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );","#ifdef WRAP_AROUND","vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );","#endif","#endif","#ifdef WRAP_AROUND","vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );","pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );","#ifdef DOUBLE_SIDED","pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );","#endif","#endif","vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;","#ifdef DOUBLE_SIDED","vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;","#endif","}","#endif","#if MAX_SPOT_LIGHTS > 0","for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );","if ( spotEffect > spotLightAngleCos[ i ] ) {","spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );","float lDistance = 1.0;","if ( spotLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","float dotProduct = dot( transformedNormal, lVector );","vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );","#ifdef DOUBLE_SIDED","vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );","#ifdef WRAP_AROUND","vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );","#endif","#endif","#ifdef WRAP_AROUND","vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );","spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );","#ifdef DOUBLE_SIDED","spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );","#endif","#endif","vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;","#ifdef DOUBLE_SIDED","vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;","#endif","}","}","#endif","#if MAX_HEMI_LIGHTS > 0","for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );","vec3 lVector = normalize( lDirection.xyz );","float dotProduct = dot( transformedNormal, lVector );","float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;","float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;","vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );","#ifdef DOUBLE_SIDED","vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );","#endif","}","#endif","vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;","#ifdef DOUBLE_SIDED","vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;","#endif"],"\n"),"lights_phong_pars_vertex",C.Nm.zV(["#ifndef PHONG_PER_PIXEL","#if MAX_POINT_LIGHTS > 0","uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","varying vec4 vPointLight[ MAX_POINT_LIGHTS ];","#endif","#if MAX_SPOT_LIGHTS > 0","uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];","#endif","#endif","#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )","varying vec3 vWorldPosition;","#endif"],"\n"),"lights_phong_vertex",C.Nm.zV(["#ifndef PHONG_PER_PIXEL","#if MAX_POINT_LIGHTS > 0","for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float lDistance = 1.0;","if ( pointLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );","vPointLight[ i ] = vec4( lVector, lDistance );","}","#endif","#if MAX_SPOT_LIGHTS > 0","for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float lDistance = 1.0;","if ( spotLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );","vSpotLight[ i ] = vec4( lVector, lDistance );","}","#endif","#endif","#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )","vWorldPosition = worldPosition.xyz;","#endif"],"\n"),"lights_phong_pars_fragment",C.Nm.zV(["uniform vec3 ambientLightColor;","#if MAX_DIR_LIGHTS > 0","uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];","uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];","#endif","#if MAX_HEMI_LIGHTS > 0","uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];","#endif","#if MAX_POINT_LIGHTS > 0","uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];","#ifdef PHONG_PER_PIXEL","uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","#else","varying vec4 vPointLight[ MAX_POINT_LIGHTS ];","#endif","#endif","#if MAX_SPOT_LIGHTS > 0","uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];","uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];","uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];","#ifdef PHONG_PER_PIXEL","uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","#else","varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];","#endif","#endif","#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )","varying vec3 vWorldPosition;","#endif","#ifdef WRAP_AROUND","uniform vec3 wrapRGB;","#endif","varying vec3 vViewPosition;","varying vec3 vNormal;"],"\n"),"lights_phong_fragment",C.Nm.zV(["vec3 normal = normalize( vNormal );","vec3 viewPosition = normalize( vViewPosition );","#ifdef DOUBLE_SIDED","normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );","#endif","#ifdef USE_NORMALMAP","normal = perturbNormal2Arb( -viewPosition, normal );","#elif defined( USE_BUMPMAP )","normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );","#endif","#if MAX_POINT_LIGHTS > 0","vec3 pointDiffuse  = vec3( 0.0 );","vec3 pointSpecular = vec3( 0.0 );","for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","#ifdef PHONG_PER_PIXEL","vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz + vViewPosition.xyz;","float lDistance = 1.0;","if ( pointLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","#else","vec3 lVector = normalize( vPointLight[ i ].xyz );","float lDistance = vPointLight[ i ].w;","#endif","float dotProduct = dot( normal, lVector );","#ifdef WRAP_AROUND","float pointDiffuseWeightFull = max( dotProduct, 0.0 );","float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );","vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );","#else","float pointDiffuseWeight = max( dotProduct, 0.0 );","#endif","pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;","vec3 pointHalfVector = normalize( lVector + viewPosition );","float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );","float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );","pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;","#else","pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;","#endif","}","#endif","#if MAX_SPOT_LIGHTS > 0","vec3 spotDiffuse  = vec3( 0.0 );","vec3 spotSpecular = vec3( 0.0 );","for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","#ifdef PHONG_PER_PIXEL","vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz + vViewPosition.xyz;","float lDistance = 1.0;","if ( spotLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","#else","vec3 lVector = normalize( vSpotLight[ i ].xyz );","float lDistance = vSpotLight[ i ].w;","#endif","float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );","if ( spotEffect > spotLightAngleCos[ i ] ) {","spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );","float dotProduct = dot( normal, lVector );","#ifdef WRAP_AROUND","float spotDiffuseWeightFull = max( dotProduct, 0.0 );","float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );","vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );","#else","float spotDiffuseWeight = max( dotProduct, 0.0 );","#endif","spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;","vec3 spotHalfVector = normalize( lVector + viewPosition );","float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );","float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );","spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;","#else","spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;","#endif","}","}","#endif","#if MAX_DIR_LIGHTS > 0","vec3 dirDiffuse  = vec3( 0.0 );","vec3 dirSpecular = vec3( 0.0 );","for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );","vec3 dirVector = normalize( lDirection.xyz );","float dotProduct = dot( normal, dirVector );","#ifdef WRAP_AROUND","float dirDiffuseWeightFull = max( dotProduct, 0.0 );","float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );","vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );","#else","float dirDiffuseWeight = max( dotProduct, 0.0 );","#endif","dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;","vec3 dirHalfVector = normalize( dirVector + viewPosition );","float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );","float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );","dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;","#else","dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;","#endif","}","#endif","#if MAX_HEMI_LIGHTS > 0","vec3 hemiDiffuse  = vec3( 0.0 );","vec3 hemiSpecular = vec3( 0.0 );","for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );","vec3 lVector = normalize( lDirection.xyz );","float dotProduct = dot( normal, lVector );","float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;","vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );","hemiDiffuse += diffuse * hemiColor;","vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );","float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;","float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );","vec3 lVectorGround = -lVector;","vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );","float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;","float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float dotProductGround = dot( normal, lVectorGround );","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );","vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );","hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );","#else","hemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;","#endif","}","#endif","vec3 totalDiffuse = vec3( 0.0 );","vec3 totalSpecular = vec3( 0.0 );","#if MAX_DIR_LIGHTS > 0","totalDiffuse += dirDiffuse;","totalSpecular += dirSpecular;","#endif","#if MAX_HEMI_LIGHTS > 0","totalDiffuse += hemiDiffuse;","totalSpecular += hemiSpecular;","#endif","#if MAX_POINT_LIGHTS > 0","totalDiffuse += pointDiffuse;","totalSpecular += pointSpecular;","#endif","#if MAX_SPOT_LIGHTS > 0","totalDiffuse += spotDiffuse;","totalSpecular += spotSpecular;","#endif","#ifdef METAL","gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );","#else","gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;","#endif"],"\n"),"color_pars_fragment",C.Nm.zV(["#ifdef USE_COLOR","varying vec3 vColor;","#endif"],"\n"),"color_fragment",C.Nm.zV(["#ifdef USE_COLOR","gl_FragColor = gl_FragColor * vec4( vColor, opacity );","#endif"],"\n"),"color_pars_vertex",C.Nm.zV(["#ifdef USE_COLOR","varying vec3 vColor;","#endif"],"\n"),"color_vertex",C.Nm.zV(["#ifdef USE_COLOR","#ifdef GAMMA_INPUT","vColor = color * color;","#else","vColor = color;","#endif","#endif"],"\n"),"skinning_pars_vertex",C.Nm.zV(["#ifdef USE_SKINNING","#ifdef BONE_TEXTURE","uniform sampler2D boneTexture;","mat4 getBoneMatrix( const in float i ) {","float j = i * 4.0;","float x = mod( j, N_BONE_PIXEL_X );","float y = floor( j / N_BONE_PIXEL_X );","const float dx = 1.0 / N_BONE_PIXEL_X;","const float dy = 1.0 / N_BONE_PIXEL_Y;","y = dy * ( y + 0.5 );","vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );","vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );","vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );","vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );","mat4 bone = mat4( v1, v2, v3, v4 );","return bone;","}","#else","uniform mat4 boneGlobalMatrices[ MAX_BONES ];","mat4 getBoneMatrix( const in float i ) {","mat4 bone = boneGlobalMatrices[ int(i) ];","return bone;","}","#endif","#endif"],"\n"),"skinbase_vertex",C.Nm.zV(["#ifdef USE_SKINNING","mat4 boneMatX = getBoneMatrix( skinIndex.x );","mat4 boneMatY = getBoneMatrix( skinIndex.y );","#endif"],"\n"),"skinning_vertex",C.Nm.zV(["#ifdef USE_SKINNING","#ifdef USE_MORPHTARGETS","vec4 skinVertex = vec4( morphed, 1.0 );","#else","vec4 skinVertex = vec4( position, 1.0 );","#endif","vec4 skinned  = boneMatX * skinVertex * skinWeight.x;","skinned    += boneMatY * skinVertex * skinWeight.y;","#endif"],"\n"),"morphtarget_pars_vertex",C.Nm.zV(["#ifdef USE_MORPHTARGETS","#ifndef USE_MORPHNORMALS","uniform float morphTargetInfluences[ 8 ];","#else","uniform float morphTargetInfluences[ 4 ];","#endif","#endif"],"\n"),"morphtarget_vertex",C.Nm.zV(["#ifdef USE_MORPHTARGETS","vec3 morphed = vec3( 0.0 );","morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];","morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];","morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];","morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];","#ifndef USE_MORPHNORMALS","morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];","morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];","morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];","morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];","#endif","morphed += position;","#endif"],"\n"),"default_vertex",C.Nm.zV(["vec4 mvPosition;","#ifdef USE_SKINNING","mvPosition = modelViewMatrix * skinned;","#endif","#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )","mvPosition = modelViewMatrix * vec4( morphed, 1.0 );","#endif","#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )","mvPosition = modelViewMatrix * vec4( position, 1.0 );","#endif","gl_Position = projectionMatrix * mvPosition;"],"\n"),"morphnormal_vertex",C.Nm.zV(["#ifdef USE_MORPHNORMALS","vec3 morphedNormal = vec3( 0.0 );","morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];","morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];","morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];","morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];","morphedNormal += normal;","#endif"],"\n"),"skinnormal_vertex",C.Nm.zV(["#ifdef USE_SKINNING","mat4 skinMatrix = skinWeight.x * boneMatX;","skinMatrix   += skinWeight.y * boneMatY;","#ifdef USE_MORPHNORMALS","vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );","#else","vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );","#endif","#endif"],"\n"),"defaultnormal_vertex",C.Nm.zV(["vec3 objectNormal;","#ifdef USE_SKINNING","objectNormal = skinnedNormal.xyz;","#endif","#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )","objectNormal = morphedNormal;","#endif","#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )","objectNormal = normal;","#endif","#ifdef FLIP_SIDED","objectNormal = -objectNormal;","#endif","vec3 transformedNormal = normalMatrix * objectNormal;"],"\n"),"shadowmap_pars_fragment",C.Nm.zV(["#ifdef USE_SHADOWMAP","uniform sampler2D shadowMap[ MAX_SHADOWS ];","uniform vec2 shadowMapSize[ MAX_SHADOWS ];","uniform float shadowDarkness[ MAX_SHADOWS ];","uniform float shadowBias[ MAX_SHADOWS ];","varying vec4 vShadowCoord[ MAX_SHADOWS ];","float unpackDepth( const in vec4 rgba_depth ) {","const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );","float depth = dot( rgba_depth, bit_shift );","return depth;","}","#endif"],"\n"),"shadowmap_fragment",C.Nm.zV(["#ifdef USE_SHADOWMAP","#ifdef SHADOWMAP_DEBUG","vec3 frustumColors[3];","frustumColors[0] = vec3( 1.0, 0.5, 0.0 );","frustumColors[1] = vec3( 0.0, 1.0, 0.8 );","frustumColors[2] = vec3( 0.0, 0.5, 1.0 );","#endif","#ifdef SHADOWMAP_CASCADE","int inFrustumCount = 0;","#endif","float fDepth;","vec3 shadowColor = vec3( 1.0 );","for( int i = 0; i < MAX_SHADOWS; i ++ ) {","vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;","bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );","bool inFrustum = all( inFrustumVec );","#ifdef SHADOWMAP_CASCADE","inFrustumCount += int( inFrustum );","bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );","#else","bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );","#endif","bool frustumTest = all( frustumTestVec );","if ( frustumTest ) {","shadowCoord.z += shadowBias[ i ];","#if defined( SHADOWMAP_TYPE_PCF )","float shadow = 0.0;","const float shadowDelta = 1.0 / 9.0;","float xPixelOffset = 1.0 / shadowMapSize[ i ].x;","float yPixelOffset = 1.0 / shadowMapSize[ i ].y;","float dx0 = -1.25 * xPixelOffset;","float dy0 = -1.25 * yPixelOffset;","float dx1 = 1.25 * xPixelOffset;","float dy1 = 1.25 * yPixelOffset;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );","#elif defined( SHADOWMAP_TYPE_PCF_SOFT )","float shadow = 0.0;","float xPixelOffset = 1.0 / shadowMapSize[ i ].x;","float yPixelOffset = 1.0 / shadowMapSize[ i ].y;","float dx0 = -1.0 * xPixelOffset;","float dy0 = -1.0 * yPixelOffset;","float dx1 = 1.0 * xPixelOffset;","float dy1 = 1.0 * yPixelOffset;","mat3 shadowKernel;","mat3 depthKernel;","depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );","if ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;","else shadowKernel[0][0] = 0.0;","depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );","if ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;","else shadowKernel[0][1] = 0.0;","depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );","if ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;","else shadowKernel[0][2] = 0.0;","depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );","if ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;","else shadowKernel[1][0] = 0.0;","depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );","if ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;","else shadowKernel[1][1] = 0.0;","depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );","if ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;","else shadowKernel[1][2] = 0.0;","depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );","if ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;","else shadowKernel[2][0] = 0.0;","depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );","if ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;","else shadowKernel[2][1] = 0.0;","depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );","if ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;","else shadowKernel[2][2] = 0.0;","vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );","shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );","shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );","vec4 shadowValues;","shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );","shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );","shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );","shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );","shadow = dot( shadowValues, vec4( 1.0 ) );","shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );","#else","vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );","float fDepth = unpackDepth( rgbaDepth );","if ( fDepth < shadowCoord.z )","shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );","#endif","}","#ifdef SHADOWMAP_DEBUG","#ifdef SHADOWMAP_CASCADE","if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];","#else","if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];","#endif","#endif","}","#ifdef GAMMA_OUTPUT","shadowColor *= shadowColor;","#endif","gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;","#endif"],"\n"),"shadowmap_pars_vertex",C.Nm.zV(["#ifdef USE_SHADOWMAP","varying vec4 vShadowCoord[ MAX_SHADOWS ];","uniform mat4 shadowMatrix[ MAX_SHADOWS ];","#endif"],"\n"),"shadowmap_vertex",C.Nm.zV(["#ifdef USE_SHADOWMAP","for( int i = 0; i < MAX_SHADOWS; i ++ ) {","vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;","}","#endif"],"\n"),"alphatest_fragment",C.Nm.zV(["#ifdef ALPHATEST","if ( gl_FragColor.a < ALPHATEST ) discard;","#endif"],"\n"),"linear_to_gamma_fragment",C.Nm.zV(["#ifdef GAMMA_OUTPUT","gl_FragColor.xyz = sqrt( gl_FragColor.xyz );","#endif"],"\n")])
$.qd=z}return z},
Fq:function(a){var z=P.u5()
C.Nm.aN(a,new S.zt(z))
return z},
Gn:function(a){var z=P.u5()
a.aN(0,new S.wg(z))
return z},
NC:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=$.mb
if(z==null){z=new S.SN("c",null,!0,null)
z.sM(0,S.Mp(15658734))
y=new S.SN("f",null,!0,null)
y.sM(0,1)
x=new S.SN("t",null,!0,null)
x.sM(0,null)
w=new T.Bp(new Float32Array(H.T0(4)))
w.Mp(0,0,1,1)
v=new S.SN("v4",null,!0,null)
v.sM(0,w)
w=new S.SN("t",null,!0,null)
w.sM(0,null)
u=new S.SN("t",null,!0,null)
u.sM(0,null)
t=new S.SN("t",null,!0,null)
t.sM(0,null)
s=new S.SN("f",null,!0,null)
s.sM(0,-1)
r=new S.SN("i",null,!0,null)
r.sM(0,0)
q=new S.SN("f",null,!0,null)
q.sM(0,1)
p=new S.SN("f",null,!0,null)
p.sM(0,0.98)
o=new S.SN("i",null,!0,null)
o.sM(0,0)
n=new S.SN("f",null,!0,null)
n.sM(0,0)
n=P.Td(["diffuse",z,"opacity",y,"map",x,"offsetRepeat",v,"lightMap",w,"specularMap",u,"envMap",t,"flipEnvMap",s,"useRefract",r,"reflectivity",q,"refractionRatio",p,"combine",o,"morphTargetInfluences",n])
o=new S.SN("t",null,!0,null)
o.sM(0,null)
p=new S.SN("f",null,!0,null)
p.sM(0,1)
p=P.Td(["bumpMap",o,"bumpScale",p])
o=new S.SN("t",null,!0,null)
o.sM(0,null)
q=new Float32Array(H.T0(2))
q[0]=1
q[1]=1
r=new S.SN("v2",null,!0,null)
r.sM(0,new T.z3(q))
r=P.Td(["normalMap",o,"normalScale",r])
o=new S.SN("f",null,!0,null)
o.sM(0,0.00025)
q=new S.SN("f",null,!0,null)
q.sM(0,1)
s=new S.SN("f",null,!0,null)
s.sM(0,2000)
t=new S.SN("c",null,!0,null)
t.sM(0,S.Mp(16777215))
t=P.Td(["fogDensity",o,"fogNear",q,"fogFar",s,"fogColor",t])
s=new S.SN("fv",null,!0,null)
s.sM(0,[])
q=new S.SN("fv",null,!0,null)
q.sM(0,[])
o=new S.SN("fv",null,!0,null)
o.sM(0,[])
u=new S.SN("fv",null,!0,null)
u.sM(0,[])
w=new S.SN("fv",null,!0,null)
w.sM(0,[])
v=new S.SN("fv",null,!0,null)
v.sM(0,[])
x=new S.SN("fv",null,!0,null)
x.sM(0,[])
y=new S.SN("fv",null,!0,null)
y.sM(0,[])
z=new S.SN("fv1",null,!0,null)
z.sM(0,[])
m=new S.SN("fv",null,!0,null)
m.sM(0,[])
l=new S.SN("fv",null,!0,null)
l.sM(0,[])
k=new S.SN("fv",null,!0,null)
k.sM(0,[])
j=new S.SN("fv1",null,!0,null)
j.sM(0,[])
i=new S.SN("fv1",null,!0,null)
i.sM(0,[])
h=new S.SN("fv1",null,!0,null)
h.sM(0,[])
h=P.Td(["ambientLightColor",s,"directionalLightDirection",q,"directionalLightColor",o,"hemisphereLightDirection",u,"hemisphereLightSkyColor",w,"hemisphereLightGroundColor",v,"pointLightColor",x,"pointLightPosition",y,"pointLightDistance",z,"spotLightColor",m,"spotLightPosition",l,"spotLightDirection",k,"spotLightDistance",j,"spotLightAngleCos",i,"spotLightExponent",h])
i=new S.SN("c",null,!0,null)
i.sM(0,S.Mp(15658734))
j=new S.SN("f",null,!0,null)
j.sM(0,1)
k=new S.SN("f",null,!0,null)
k.sM(0,1)
l=new S.SN("f",null,!0,null)
l.sM(0,1)
m=new S.SN("t",null,!0,null)
m.sM(0,null)
z=new S.SN("f",null,!0,null)
z.sM(0,0.00025)
y=new S.SN("f",null,!0,null)
y.sM(0,1)
x=new S.SN("f",null,!0,null)
x.sM(0,2000)
v=new S.SN("c",null,!0,null)
v.sM(0,S.Mp(16777215))
v=P.Td(["psColor",i,"opacity",j,"size",k,"scale",l,"map",m,"fogDensity",z,"fogNear",y,"fogFar",x,"fogColor",v])
x=new S.SN("tv",null,!0,null)
x.sM(0,[])
y=new S.SN("v2v",null,!0,null)
y.sM(0,[])
z=new S.SN("fv1",null,!0,null)
z.sM(0,[])
m=new S.SN("fv1",null,!0,null)
m.sM(0,[])
l=new S.SN("m4v",null,!0,null)
l.sM(0,[])
l=P.Td(["common",n,"bump",p,"normalmap",r,"fog",t,"lights",h,"particle",v,"shadowmap",P.Td(["shadowMap",x,"shadowMapSize",y,"shadowBias",z,"shadowDarkness",m,"shadowMatrix",l])])
$.mb=l
z=l}return z},
ci:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=$.ya
if(z==null){z=new S.SN("f",null,!0,null)
z.sM(0,1)
y=new S.SN("f",null,!0,null)
y.sM(0,2000)
x=new S.SN("f",null,!0,null)
x.sM(0,1)
x=P.Td(["uniforms",P.Td(["mNear",z,"mFar",y,"opacity",x]),"vertexShader",C.Nm.zV(["void main() {","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"],"\n"),"fragmentShader",C.Nm.zV(["uniform float mNear;","uniform float mFar;","uniform float opacity;","void main() {","float depth = gl_FragCoord.z / gl_FragCoord.w;","float color = 1.0 - smoothstep( mNear, mFar, depth );","gl_FragColor = vec4( vec3( color ), opacity );","}"],"\n")])
y=new S.SN("f",null,!0,null)
y.sM(0,1)
y=P.Td(["uniforms",P.Td(["opacity",y]),"vertexShader",C.Nm.zV(["varying vec3 vNormal;","void main() {","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","vNormal = normalize( normalMatrix * normal );","gl_Position = projectionMatrix * mvPosition;","}"],"\n"),"fragmentShader",C.Nm.zV(["uniform float opacity;","varying vec3 vNormal;","void main() {","gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );","}"],"\n")])
z=P.Td(["uniforms",S.Fq([S.NC().p(0,"common"),S.NC().p(0,"fog"),S.NC().p(0,"shadowmap")]),"vertexShader",C.Nm.zV([S.kI().p(0,"map_pars_vertex"),S.kI().p(0,"lightmap_pars_vertex"),S.kI().p(0,"envmap_pars_vertex"),S.kI().p(0,"color_pars_vertex"),S.kI().p(0,"morphtarget_pars_vertex"),S.kI().p(0,"skinning_pars_vertex"),S.kI().p(0,"shadowmap_pars_vertex"),"void main() {",S.kI().p(0,"map_vertex"),S.kI().p(0,"lightmap_vertex"),S.kI().p(0,"color_vertex"),S.kI().p(0,"skinbase_vertex"),"#ifdef USE_ENVMAP",S.kI().p(0,"morphnormal_vertex"),S.kI().p(0,"skinnormal_vertex"),S.kI().p(0,"defaultnormal_vertex"),"#endif",S.kI().p(0,"morphtarget_vertex"),S.kI().p(0,"skinning_vertex"),S.kI().p(0,"default_vertex"),S.kI().p(0,"worldpos_vertex"),S.kI().p(0,"envmap_vertex"),S.kI().p(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.Nm.zV(["uniform vec3 diffuse;","uniform float opacity;",S.kI().p(0,"color_pars_fragment"),S.kI().p(0,"map_pars_fragment"),S.kI().p(0,"lightmap_pars_fragment"),S.kI().p(0,"envmap_pars_fragment"),S.kI().p(0,"fog_pars_fragment"),S.kI().p(0,"shadowmap_pars_fragment"),S.kI().p(0,"specularmap_pars_fragment"),"void main() {","gl_FragColor = vec4( diffuse, opacity );",S.kI().p(0,"map_fragment"),S.kI().p(0,"alphatest_fragment"),S.kI().p(0,"specularmap_fragment"),S.kI().p(0,"lightmap_fragment"),S.kI().p(0,"color_fragment"),S.kI().p(0,"envmap_fragment"),S.kI().p(0,"shadowmap_fragment"),S.kI().p(0,"linear_to_gamma_fragment"),S.kI().p(0,"fog_fragment"),"}"],"\n")])
w=S.NC().p(0,"common")
v=S.NC().p(0,"fog")
u=S.NC().p(0,"lights")
t=S.NC().p(0,"shadowmap")
s=new S.SN("c",null,!0,null)
s.sM(0,S.Mp(16777215))
r=new S.SN("c",null,!0,null)
r.sM(0,S.Mp(0))
q=new T.An(new Float32Array(H.T0(3)))
q.PJ(1,1,1)
p=new S.SN("v3",null,!0,null)
p.sM(0,q)
p=P.Td(["uniforms",S.Fq([w,v,u,t,P.Td(["ambient",s,"emissive",r,"wrapRGB",p])]),"vertexShader",C.Nm.zV(["#define LAMBERT","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","varying vec3 vLightBack;","#endif",S.kI().p(0,"map_pars_vertex"),S.kI().p(0,"lightmap_pars_vertex"),S.kI().p(0,"envmap_pars_vertex"),S.kI().p(0,"lights_lambert_pars_vertex"),S.kI().p(0,"color_pars_vertex"),S.kI().p(0,"morphtarget_pars_vertex"),S.kI().p(0,"skinning_pars_vertex"),S.kI().p(0,"shadowmap_pars_vertex"),"void main() {",S.kI().p(0,"map_vertex"),S.kI().p(0,"lightmap_vertex"),S.kI().p(0,"color_vertex"),S.kI().p(0,"morphnormal_vertex"),S.kI().p(0,"skinbase_vertex"),S.kI().p(0,"skinnormal_vertex"),S.kI().p(0,"defaultnormal_vertex"),S.kI().p(0,"morphtarget_vertex"),S.kI().p(0,"skinning_vertex"),S.kI().p(0,"default_vertex"),S.kI().p(0,"worldpos_vertex"),S.kI().p(0,"envmap_vertex"),S.kI().p(0,"lights_lambert_vertex"),S.kI().p(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.Nm.zV(["uniform float opacity;","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","varying vec3 vLightBack;","#endif",S.kI().p(0,"color_pars_fragment"),S.kI().p(0,"map_pars_fragment"),S.kI().p(0,"lightmap_pars_fragment"),S.kI().p(0,"envmap_pars_fragment"),S.kI().p(0,"fog_pars_fragment"),S.kI().p(0,"shadowmap_pars_fragment"),S.kI().p(0,"specularmap_pars_fragment"),"void main() {","gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",S.kI().p(0,"map_fragment"),S.kI().p(0,"alphatest_fragment"),S.kI().p(0,"specularmap_fragment"),"#ifdef DOUBLE_SIDED","if ( gl_FrontFacing )","gl_FragColor.xyz *= vLightFront;","else","gl_FragColor.xyz *= vLightBack;","#else","gl_FragColor.xyz *= vLightFront;","#endif",S.kI().p(0,"lightmap_fragment"),S.kI().p(0,"color_fragment"),S.kI().p(0,"envmap_fragment"),S.kI().p(0,"shadowmap_fragment"),S.kI().p(0,"linear_to_gamma_fragment"),S.kI().p(0,"fog_fragment"),"}"],"\n")])
r=S.NC().p(0,"common")
s=S.NC().p(0,"bump")
t=S.NC().p(0,"normalmap")
u=S.NC().p(0,"fog")
v=S.NC().p(0,"lights")
w=S.NC().p(0,"shadowmap")
q=new S.SN("c",null,!0,null)
q.sM(0,S.Mp(16777215))
o=new S.SN("c",null,!0,null)
o.sM(0,S.Mp(0))
n=new S.SN("c",null,!0,null)
n.sM(0,S.Mp(1118481))
m=new S.SN("f",null,!0,null)
m.sM(0,30)
l=new T.An(new Float32Array(H.T0(3)))
l.PJ(1,1,1)
k=new S.SN("v3",null,!0,null)
k.sM(0,l)
k=P.Td(["uniforms",S.Fq([r,s,t,u,v,w,P.Td(["ambient",q,"emissive",o,"specular",n,"shininess",m,"wrapRGB",k])]),"vertexShader",C.Nm.zV(["#define PHONG","varying vec3 vViewPosition;","varying vec3 vNormal;",S.kI().p(0,"map_pars_vertex"),S.kI().p(0,"lightmap_pars_vertex"),S.kI().p(0,"envmap_pars_vertex"),S.kI().p(0,"lights_phong_pars_vertex"),S.kI().p(0,"color_pars_vertex"),S.kI().p(0,"morphtarget_pars_vertex"),S.kI().p(0,"skinning_pars_vertex"),S.kI().p(0,"shadowmap_pars_vertex"),"void main() {",S.kI().p(0,"map_vertex"),S.kI().p(0,"lightmap_vertex"),S.kI().p(0,"color_vertex"),S.kI().p(0,"morphnormal_vertex"),S.kI().p(0,"skinbase_vertex"),S.kI().p(0,"skinnormal_vertex"),S.kI().p(0,"defaultnormal_vertex"),"vNormal = normalize( transformedNormal );",S.kI().p(0,"morphtarget_vertex"),S.kI().p(0,"skinning_vertex"),S.kI().p(0,"default_vertex"),"vViewPosition = -mvPosition.xyz;",S.kI().p(0,"worldpos_vertex"),S.kI().p(0,"envmap_vertex"),S.kI().p(0,"lights_phong_vertex"),S.kI().p(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.Nm.zV(["uniform vec3 diffuse;","uniform float opacity;","uniform vec3 ambient;","uniform vec3 emissive;","uniform vec3 specular;","uniform float shininess;",S.kI().p(0,"color_pars_fragment"),S.kI().p(0,"map_pars_fragment"),S.kI().p(0,"lightmap_pars_fragment"),S.kI().p(0,"envmap_pars_fragment"),S.kI().p(0,"fog_pars_fragment"),S.kI().p(0,"lights_phong_pars_fragment"),S.kI().p(0,"shadowmap_pars_fragment"),S.kI().p(0,"bumpmap_pars_fragment"),S.kI().p(0,"normalmap_pars_fragment"),S.kI().p(0,"specularmap_pars_fragment"),"void main() {","gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",S.kI().p(0,"map_fragment"),S.kI().p(0,"alphatest_fragment"),S.kI().p(0,"specularmap_fragment"),S.kI().p(0,"lights_phong_fragment"),S.kI().p(0,"lightmap_fragment"),S.kI().p(0,"color_fragment"),S.kI().p(0,"envmap_fragment"),S.kI().p(0,"shadowmap_fragment"),S.kI().p(0,"linear_to_gamma_fragment"),S.kI().p(0,"fog_fragment"),"}"],"\n")])
m=P.Td(["uniforms",S.Fq([S.NC().p(0,"particle"),S.NC().p(0,"shadowmap")]),"vertexShader",C.Nm.zV(["uniform float size;","uniform float scale;",S.kI().p(0,"color_pars_vertex"),S.kI().p(0,"shadowmap_pars_vertex"),"void main() {",S.kI().p(0,"color_vertex"),"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","#ifdef USE_SIZEATTENUATION","gl_PointSize = size * ( scale / length( mvPosition.xyz ) );","#else","gl_PointSize = size;","#endif","gl_Position = projectionMatrix * mvPosition;",S.kI().p(0,"worldpos_vertex"),S.kI().p(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.Nm.zV(["uniform vec3 psColor;","uniform float opacity;",S.kI().p(0,"color_pars_fragment"),S.kI().p(0,"map_particle_pars_fragment"),S.kI().p(0,"fog_pars_fragment"),S.kI().p(0,"shadowmap_pars_fragment"),"void main() {","gl_FragColor = vec4( psColor, opacity );",S.kI().p(0,"map_particle_fragment"),S.kI().p(0,"alphatest_fragment"),S.kI().p(0,"color_fragment"),S.kI().p(0,"shadowmap_fragment"),S.kI().p(0,"fog_fragment"),"}"],"\n")])
n=S.NC().p(0,"common")
o=S.NC().p(0,"fog")
q=new S.SN("f",null,!0,null)
q.sM(0,1)
w=new S.SN("f",null,!0,null)
w.sM(0,1)
v=new S.SN("f",null,!0,null)
v.sM(0,2)
v=P.Td(["depth",x,"normal",y,"basic",z,"lambert",p,"phong",k,"particle_basic",m,"dashed",P.Td(["uniforms",S.Fq([n,o,P.Td(["scale",q,"dashSize",w,"totalSize",v])]),"vertexShader",C.Nm.zV(["uniform float scale;","attribute float lineDistance;","varying float vLineDistance;",S.kI().p(0,"color_pars_vertex"),"void main() {",S.kI().p(0,"color_vertex"),"vLineDistance = scale * lineDistance;","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","gl_Position = projectionMatrix * mvPosition;","}"],"\n"),"fragmentShader",C.Nm.zV(["uniform vec3 diffuse;","uniform float opacity;","uniform float dashSize;","uniform float totalSize;","varying float vLineDistance;",S.kI().p(0,"color_pars_fragment"),S.kI().p(0,"fog_pars_fragment"),"void main() {","if ( mod( vLineDistance, totalSize ) > dashSize ) {","discard;","}","gl_FragColor = vec4( diffuse, opacity );",S.kI().p(0,"color_fragment"),S.kI().p(0,"fog_fragment"),"}"],"\n")]),"depthRGBA",P.Td(["uniforms",P.u5(),"vertexShader",C.Nm.zV([S.kI().p(0,"morphtarget_pars_vertex"),S.kI().p(0,"skinning_pars_vertex"),"void main() {",S.kI().p(0,"skinbase_vertex"),S.kI().p(0,"morphtarget_vertex"),S.kI().p(0,"skinning_vertex"),S.kI().p(0,"default_vertex"),"}"],"\n"),"fragmentShader",C.Nm.zV(["vec4 pack_depth( const in float depth ) {","const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );","const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );","vec4 res = fract( depth * bit_shift );","res -= res.xxyz * bit_mask;","return res;","}","void main() {","gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );","}"],"\n")])])
$.ya=v
z=v}return z},
xN:{
"^":"dE;NH,e1,LD,kX,RZ,ij,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
tx:function(a){var z,y,x,w,v,u,t,s,r
if(this.fx)this.VC()
if(this.fy||a){z=this.c
y=this.dx
if(z!=null){z=z.gY7().R(0,y)
this.dy=z
x=this.NH
w=this.RZ
S.SX(z,x,this.LD,w)
z=this.kX
S.SX(y,this.e1,z,this.ij)
y=this.dy
v=y.gEv(y)
u=new T.aI(new Float32Array(H.T0(16)))
u.xI()
S.lY(u,z)
w=w.Q
z=w[0]
y=w[1]
w=w[2]
t=new Float32Array(H.T0(16))
t[15]=1
t[10]=w
t[5]=y
t[0]=z
u.tv(0,new T.aI(t))
x=x.Q
t=x[0]
z=v.length
if(12>=z)return H.e(v,12)
v[12]=t
t=x[1]
if(13>=z)return H.e(v,13)
v[13]=t
x=x[2]
if(14>=z)return H.e(v,14)
v[14]=x}else this.dy.xu(y)
this.fy=!1
a=!0}z=this.d
s=z.length
for(r=0;r<s;++r){if(r>=z.length)return H.e(z,r)
z[r].V4(a)}}},
qy:{
"^":"mP;x2,y1,y2,TB,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,Q$,a$,b$,c$,d$,e$,f$,r$,x$,y$,z$,ch$,cx$,cy$,db$,dx$,dy$,fr$,fx$,fy$,go$,id$,k1$,k2$,k3$,k4$,r1$,r2$,rx$,ry$,x1$,x2$,y1$,y2$,TB$,ej$,lZ$,Ab$,zR$,Ky$,bR$,pV$,of$,DN$,C7$,Va$,Uu$",
jz:function(a3,a4,a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=this.y1
y=this.y2
x=a7/2
w=a8/2
v=this.a.length
u=a3==="x"
if(!(u&&a4==="y"))t=a3==="y"&&a4==="x"
else t=!0
if(t)s="z"
else{if(!(u&&a4==="z"))t=a3==="z"&&a4==="x"
else t=!0
if(t){y=this.TB
s="y"}else{if(!(a3==="z"&&a4==="y"))t=a3==="y"&&a4==="z"
else t=!0
if(t){z=this.TB
s="x"}else s=null}}r=z+1
q=y+1
p=a7/z
o=a8/y
t=new Float32Array(H.T0(3))
n=new T.An(t)
m=s==="x"
if(m)t[0]=a9>0?1:-1
else if(s==="y")t[1]=a9>0?1:-1
else if(s==="z")t[2]=a9>0?1:-1
for(t=s==="z",l=s==="y",k=a4==="z",j=a4==="y",i=a4==="x",h=a3==="z",g=a3==="y",f=0;f<q;++f)for(e=(f*o-w)*a6,d=0;d<r;++d){c=new Float32Array(3)
if(u)c[0]=(d*p-x)*a5
else if(g)c[1]=(d*p-x)*a5
else if(h)c[2]=(d*p-x)*a5
if(i)c[0]=e
else if(j)c[1]=e
else if(k)c[2]=e
if(m)c[0]=a9
else if(l)c[1]=a9
else if(t)c[2]=a9
this.a.push(new T.An(c))}for(u=this.r,f=0;f<y;f=b)for(t=1-f/y,b=f+1,m=1-b/y,l=r*f,k=r*b,d=0;d<z;d=a){a=d+1
j=[d+l+v,d+k+v,a+k+v,a+l+v]
a0=new S.Uv(j,null,null,null,null,null,null,null)
a0.A5(j,null,null,null)
a0.a.xu(n)
j=a0.b
i=new T.An(new Float32Array(3))
i.xu(n)
h=new T.An(new Float32Array(3))
h.xu(n)
g=new T.An(new Float32Array(3))
g.xu(n)
e=new T.An(new Float32Array(3))
e.xu(n)
C.Nm.FV(j,[i,h,g,e])
a0.f=b0
this.e.push(a0)
a1=u[0]
a2=[]
e=d/z
g=a/z
C.Nm.FV(a2,[new S.BB(e,t),new S.BB(e,m),new S.BB(g,m),new S.BB(g,t)])
a1.push(a2)}},
yz:function(a,b,c,d,e,f,g,h){var z,y,x
z=a/2
y=b/2
x=c/2
this.d=[]
this.x2=new S.KU(!0,!0,!0,!0,!0,!0)
if(this.x2.Q)this.jz("z","y",-1,-1,c,b,z,null)
if(this.x2.a)this.jz("z","y",1,-1,c,b,-z,null)
if(this.x2.b)this.jz("x","z",1,1,a,c,y,null)
if(this.x2.c)this.jz("x","z",1,-1,a,c,-y,null)
if(this.x2.d)this.jz("x","y",1,-1,a,b,x,null)
if(this.x2.e)this.jz("x","y",-1,-1,a,b,-x,null)
this.VO()
this.Pu()},
static:{jk:function(a,b,c,d,e,f,g,h){var z=new S.qy(null,d,e,f,"",H.J([],[T.An]),[],[],[],[],[[]],[[]],[],[],[],[],[],[],null,null,null,!1,!1,null,null,!1,!1,!1,!1,!1,!1,!1,!1,!1,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.RK()
z.yz(a,b,c,d,e,f,g,h)
return z}}},
KU:{
"^":"a;Q,a,b,c,d,e"},
lB:{
"^":"mP;Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,Q$,a$,b$,c$,d$,e$,f$,r$,x$,y$,z$,ch$,cx$,cy$,db$,dx$,dy$,fr$,fx$,fy$,go$,id$,k1$,k2$,k3$,k4$,r1$,r2$,rx$,ry$,x1$,x2$,y1$,y2$,TB$,ej$,lZ$,Ab$,zR$,Ky$,bR$,pV$,of$,DN$,C7$,Va$,Uu$",
jQ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=a/2
y=b/2
x=a/1
w=b/1
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(0,0,1)
for(u=0;u<2;++u)for(t=-(u*w-y),s=0;s<2;++s){r=this.a
q=new Float32Array(3)
q[0]=s*x-z
q[1]=t
q[2]=0
r.push(new T.An(q))}for(t=this.r,u=0;u<1;u=p)for(r=u/1,p=u+1,q=p/1,o=2*u,n=2*p,s=0;s<1;s=m){m=s+1
l=[s+o,s+n,m+n,m+o]
k=new S.Uv(l,null,null,null,null,null,null,null)
k.A5(l,null,null,null)
l=new T.An(new Float32Array(3))
l.xu(v)
k.a=l
l=k.b
j=new T.An(new Float32Array(3))
j.xu(v)
i=new T.An(new Float32Array(3))
i.xu(v)
h=new T.An(new Float32Array(3))
h.xu(v)
g=new T.An(new Float32Array(3))
g.xu(v)
C.Nm.FV(l,[j,i,h,g])
this.e.push(k)
f=t[0]
e=[]
g=s/1
h=m/1
C.Nm.FV(e,[new S.BB(g,r),new S.BB(g,q),new S.BB(h,q),new S.BB(h,r)])
f.push(e)}this.VO()},
static:{Bc:function(a,b,c,d){var z=new S.lB("",H.J([],[T.An]),[],[],[],[],[[]],[[]],[],[],[],[],[],[],null,null,null,!1,!1,null,null,!1,!1,!1,!1,!1,!1,!1,!1,!1,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.RK()
z.jQ(a,b,c,d)
return z}}},
Za:{
"^":"WP;LD,Y7:kX@,Re:RZ<,ij,NH,e1,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
Hd:function(a,b){var z
this.x1.a.push(new T.An(new Float32Array(H.T0(3))))
this.x1.b.push(S.Mp(b))
z=this.ij
if(!z.NZ(0,a))z.q(0,a,[])
z.p(0,a).push(this.x1.a.length-1)},
Oj:function(a,b,c,d){var z,y,x,w,v
$.uv().PJ(b,c,d)
$.nn().up($.uv(),$.qu())
z=this.ij.p(0,a)
if(z!=null){y=z.length
for(x=0;x<y;++x){w=this.x1.a
if(x>=z.length)return H.e(z,x)
v=z[x]
if(v>>>0!==v||v>=w.length)return H.e(w,v)
w[v].xu($.uv())}}},
mb:function(a){$.qu().e1.xu(this.LD.e1)
this.Oj("c",0,0,-1)
this.Oj("t",0,0,1)
this.Oj("n1",-1,-1,-1)
this.Oj("n2",1,-1,-1)
this.Oj("n3",-1,1,-1)
this.Oj("n4",1,1,-1)
this.Oj("f1",-1,-1,1)
this.Oj("f2",1,-1,1)
this.Oj("f3",-1,1,1)
this.Oj("f4",1,1,1)
this.Oj("u1",0.7,1.1,-1)
this.Oj("u2",-0.7,1.1,-1)
this.Oj("u3",0,2,-1)
this.Oj("cf1",-1,0,1)
this.Oj("cf2",1,0,1)
this.Oj("cf3",0,-1,1)
this.Oj("cf4",0,1,1)
this.Oj("cn1",-1,0,-1)
this.Oj("cn2",1,0,-1)
this.Oj("cn3",0,-1,-1)
this.Oj("cn4",0,1,-1)
this.x1.gMq().q(0,"verticesNeedUpdate",!0)}},
ZS:{
"^":"a;Q,a,b,c,d,e,f,r,x,y",
no:function(a){var z,y,x
this.d=a.a
this.e=a
z=S.ci().p(0,"depthRGBA")
y=S.Gn(z.p(0,"uniforms"))
this.f=S.SS(0,null,205,100,204,1,!0,!0,!0,z.p(0,"fragmentShader"),!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,y,0,z.p(0,"vertexShader"),!0,!1,1)
this.r=S.SS(0,null,205,100,204,1,!0,!0,!0,z.p(0,"fragmentShader"),!1,!1,!0,"",1,!1,!1,0,0,2,0,!1,!1,y,0,z.p(0,"vertexShader"),!0,!1,1)
this.x=S.SS(0,null,205,100,204,1,!0,!0,!0,z.p(0,"fragmentShader"),!1,!1,!1,"",1,!1,!1,0,0,2,0,!0,!1,y,0,z.p(0,"vertexShader"),!0,!1,1)
x=S.SS(0,null,205,100,204,1,!0,!0,!0,z.p(0,"fragmentShader"),!1,!1,!0,"",1,!1,!1,0,0,2,0,!0,!1,y,0,z.p(0,"vertexShader"),!0,!1,1)
this.y=x
this.f.r1=!0
this.r.r1=!0
this.x.r1=!0
x.r1=!0},
az:function(a,b,c,d){var z=this.e
if(!(z.id&&z.k1))return
this.xV(0,a,b)},
xV:function(c4,c5,c6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3
z=[]
J.Np(this.d,1,1,1,1)
J.c2(this.d,3042)
J.aS(this.d,2884)
J.Hd(this.d,2305)
y=this.e.r1
x=this.d
if(y===2)J.v0(x,1028)
else J.v0(x,1029)
this.e.Mt(!0)
w=c5.kX.length
for(v=0,u=null,t=null;v<w;++v){y=c5.kX
if(v>=y.length)return H.e(y,v)
s=y[v]
if(!s.goo())continue
if(!!s.$isja&&s.l4)for(u=0;u<s.gwf();++u){y=s.I6
if(u>=0)return H.e(y,u)
t=y[u]
if(!t){t=this.en(s,u)
t.sqw(c6)
y=new Float32Array(3)
x=new Float32Array(3)
r=new Float32Array(4)
r[3]=1
q=new Float32Array(4)
q[3]=1
p=new Float32Array(3)
o=new Float32Array(3)
n=$.RG
$.RG=n+1
m=P.u5()
l=new Float32Array(3)
l[0]=0
l[1]=1
l[2]=0
k=new Float32Array(3)
k[0]=0
k[1]=0
k[2]=0
j=new Float32Array(3)
j[0]=0
j[1]=0
j[2]=0
i=new Float32Array(3)
i[0]=1
i[1]=1
i[2]=1
h=new T.aI(new Float32Array(16))
h.xI()
g=new T.aI(new Float32Array(16))
g.xI()
f=new T.aI(new Float32Array(16))
f.xI()
e=new Float32Array(4)
e[3]=1
d=new S.xN(new T.An(y),new T.An(x),new T.DS(r),new T.DS(q),new T.An(p),new T.An(o),n,"",m,null,[],new T.An(l),new T.An(k),new T.An(j),new T.An(i),"XYZ",null,null,null,!0,null,h,g,f,!0,!0,new T.DS(e),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
d.f=s.Ht
d.h(0,t)
d.h(0,t.Y0)
c6.h(0,d)
s.I6[u]=t
c="Created virtualLight "+("Instance of '"+H.lh(t)+"'")
H.qw(c)}b=s.I6[u]
b.gbM(b).Ze(s.ZG)
y=b.gK(b)
y.gbM(y).Ze(s.Y0.f)
b.Yp(b.gK(b))
b.sNa(s.TQ)
b.sYc(s.Jc)
b.sRR(s.cf[u])
a=s.WY[u]
a0=s.Xi[u]
a1=b.gZE()
a1.p(0,0).sz(0,a)
a1.p(0,1).sz(0,a)
a1.p(0,2).sz(0,a)
a1.p(0,3).sz(0,a)
a1.p(0,4).sz(0,a0)
a1.p(0,5).sz(0,a0)
a1.p(0,6).sz(0,a0)
a1.p(0,7).sz(0,a0)
z.push(t)}else z.push(s)}w=z.length
for(y=this.Q,v=0,a2=null,a3=null,a4=null,a5=null,a6=null,a7=null,a8=null,a9=null,b0=null,b1=null;v<w;++v){if(v>=z.length)return H.e(z,v)
s=z[v]
if(s.gJM()==null){b2=this.e.k4===2?3:6
x=new S.Ff(s.cw,s.nz,null,null,!0,!0,!0,null,null,null,null,null,null,1,1,b2,b2,18,10,1,null,null,null,null,null,null,null,4,[],null,null)
x.cE(null,null,1,1,b2,b2,18,10,1)
if(x.k2==null)x.k2=new T.z3(new Float32Array(2))
if(x.k3==null){r=new Float32Array(2)
r[0]=1
r[1]=1
x.k3=new T.z3(r)}s.mT=x
x=s.cw
r=s.nz
q=new Float32Array(2)
q[0]=x
q[1]=r
s.Jr=new T.z3(q)
x=new T.aI(new Float32Array(16))
x.xI()
s.TO=x}if(s.IL==null){if(!!s.$isja){x=s.Rj
r=s.eD
q=s.jq
p=s.EJ
o=s.kX
n=s.RZ
m=new Float32Array(16)
l=new Float32Array(16)
k=new T.aI(new Float32Array(16))
k.xI()
j=new T.aI(new Float32Array(16))
j.xI()
i=new T.aI(new Float32Array(16))
i.xI()
h=$.RG
$.RG=h+1
g=P.u5()
f=new Float32Array(3)
f[0]=0
f[1]=1
f[2]=0
e=new Float32Array(3)
e[0]=0
e[1]=0
e[2]=0
b3=new Float32Array(3)
b3[0]=0
b3[1]=0
b3[2]=0
b4=new Float32Array(3)
b4[0]=1
b4[1]=1
b4[2]=1
b5=new T.aI(new Float32Array(16))
b5.xI()
b6=new T.aI(new Float32Array(16))
b6.xI()
b7=new T.aI(new Float32Array(16))
b7.xI()
b8=new Float32Array(4)
b8[3]=1
m=new S.b2(x,r,q,p,k,j,i,o,n,m,l,h,"",g,null,[],new T.An(f),new T.An(e),new T.An(b3),new T.An(b4),"XYZ",null,null,null,!0,null,b5,b6,b7,!0,!0,new T.DS(b8),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
T.YD(j,x,r,p,q,o,n)
s.IL=m}else{H.qw("Unsupported light type for shadow")
continue}x=m
c5.h(0,x)
if(this.e.fr)c5.Zz()}if(s.TQ&&s.S8==null){x=s.IL
r=P.u5()
q=S.T4()
p=$.YY
$.YY=p+1
o=new S.uH(1,1,1)
o.tz(16777215)
p=new S.ws(1,"round","round","",p,0,o,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,1,null,null,null,null,null,!1)
o=$.RG
$.RG=o+1
n=P.u5()
m=new Float32Array(3)
m[0]=0
m[1]=1
m[2]=0
l=new Float32Array(3)
l[0]=0
l[1]=0
l[2]=0
k=new Float32Array(3)
k[0]=0
k[1]=0
k[2]=0
j=new Float32Array(3)
j[0]=1
j[1]=1
j[2]=1
i=new T.aI(new Float32Array(16))
i.xI()
h=new T.aI(new Float32Array(16))
h.xI()
g=new T.aI(new Float32Array(16))
g.xI()
f=new Float32Array(4)
f[3]=1
x=new S.Za(x,null,!1,r,p,1,o,"",n,null,[],new T.An(m),new T.An(l),new T.An(k),new T.An(j),"XYZ",null,null,null,!0,null,i,h,g,!0,!0,new T.DS(f),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
x.ZU(q,p,1)
x.kX=x.LD.dy
x.Hd("n1",16755200)
x.Hd("n2",16755200)
x.Hd("n2",16755200)
x.Hd("n4",16755200)
x.Hd("n4",16755200)
x.Hd("n3",16755200)
x.Hd("n3",16755200)
x.Hd("n1",16755200)
x.Hd("f1",16755200)
x.Hd("f2",16755200)
x.Hd("f2",16755200)
x.Hd("f4",16755200)
x.Hd("f4",16755200)
x.Hd("f3",16755200)
x.Hd("f3",16755200)
x.Hd("f1",16755200)
x.Hd("n1",16755200)
x.Hd("f1",16755200)
x.Hd("n2",16755200)
x.Hd("f2",16755200)
x.Hd("n3",16755200)
x.Hd("f3",16755200)
x.Hd("n4",16755200)
x.Hd("f4",16755200)
x.Hd("p",16711680)
x.Hd("n1",16711680)
x.Hd("p",16711680)
x.Hd("n2",16711680)
x.Hd("p",16711680)
x.Hd("n3",16711680)
x.Hd("p",16711680)
x.Hd("n4",16711680)
x.Hd("u1",43775)
x.Hd("u2",43775)
x.Hd("u2",43775)
x.Hd("u3",43775)
x.Hd("u3",43775)
x.Hd("u1",43775)
x.Hd("c",16777215)
x.Hd("t",16777215)
x.Hd("p",3355443)
x.Hd("c",3355443)
x.Hd("cn1",3355443)
x.Hd("cn2",3355443)
x.Hd("cn3",3355443)
x.Hd("cn4",3355443)
x.Hd("cf1",3355443)
x.Hd("cf2",3355443)
x.Hd("cf3",3355443)
x.Hd("cf4",3355443)
x.mb(0)
s.S8=x
s.IL.h(0,x)}if(!!s.$isDp)t.gqw()
a4=s.mT
a5=s.TO
a6=s.IL
a6.f=s.dy.m7()
x=s.gK(s).dy.m7()
r=a6.dx
S.H4(r,a6.f,x,a6.e)
if(a6.cy)a6.r=S.ZM(r,a6.y)
a6.Zz()
x=a6.NH
x.C9(a6.dy)
r=s.S8
if(r!=null)r.k3=s.TQ
if(s.TQ)r.mb(0)
a5.Gd(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1)
a5.tv(0,a6.e1)
a5.tv(0,x)
r=a6.e1.R(0,x)
this.a=r
y.Cb(r)
this.e.Tm(a4)
this.e.V1(0)
b1=c5.TQ
a3=b1.length
for(a2=0;a2<a3;++a2){if(a2>=b1.length)return H.e(b1,a2)
a9=b1[a2]
b0=a9.a
a9.d=!1
if(b0.k3&&b0.goo()){if(!!b0.$isba)r=!b0.r2||y.tg(0,b0)
else r=!0
if(r){b0.ej=x.R(0,b0.gY7())
a9.d=!0}}}a3=b1.length
for(a2=0,b9=null,c0=null,c1=null;a2<a3;++a2){if(a2>=b1.length)return H.e(b1,a2)
a9=b1[a2]
if(a9.d){b0=a9.a
a7=a9.Q
b0.gTV()
b9=b0.gTV()
b0.x1.x
a8=this.f
this.e.OI(a6,c5.kX,null,a8,a7,b0)
c0=!1
c1=!1}}b1=c5.ca
a3=b1.length
for(a2=0;a2<a3;++a2){if(a2>=b1.length)return H.e(b1,a2)
a9=b1[a2]
b0=a9.a
if(b0.k3&&b0.goo()){b0.ej.tv(0,x)
this.e.k6(a6,c5.kX,null,this.f,b0)}}}y=this.e
c2=y.c
c3=y.d
J.Np(this.d,c2.Q,c2.a,c2.b,c3)
J.aS(this.d,3042)
if(this.e.r1===2)J.v0(this.d,1029)},
en:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new S.uH(1,1,1)
z.tz(0)
y=$.RG
$.RG=y+1
x=P.u5()
w=new Float32Array(3)
w[0]=0
w[1]=1
w[2]=0
v=new Float32Array(3)
v[0]=0
v[1]=0
v[2]=0
u=new Float32Array(3)
u[0]=0
u[1]=0
u[2]=0
t=new Float32Array(3)
t[0]=1
t[1]=1
t[2]=1
s=new T.aI(new Float32Array(16))
s.xI()
r=new T.aI(new Float32Array(16))
r.xI()
q=new T.aI(new Float32Array(16))
q.xI()
p=new Float32Array(4)
p[3]=1
o=new S.Dp([],[],null,null,1,0,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,!1,50,5000,50,!1,0,0.5,512,512,null,null,null,null,null,z,y,"",x,null,[],new T.An(w),new T.An(v),new T.An(u),new T.An(t),"XYZ",null,null,null,!0,null,s,r,q,!0,!0,new T.DS(p),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
o.B0(0,1,0)
o.LD=!0
o.e1=!0
o.kX=a.kX
o.RZ=a.RZ
o.Rj=a.Rj
o.eD=a.eD
o.EJ=a.EJ
o.jq=a.jq
o.TQ=a.TQ
o.Jc=a.Jc
z=a.cf
if(b>=3)return H.e(z,b)
o.ca=z[b]
o.cw=a.Jz[b]
o.nz=a.pG[b]
z=[]
o.Jq=z
y=[]
o.qJ=y
for(n=0;n<8;++n){x=new Float32Array(3)
if(n>=0)return H.e(z,n)
z[n]=new T.An(x)
y[n]=new T.An(new Float32Array(3))}m=a.WY[b]
l=a.Xi[b]
if(0>=0)return H.e(y,0)
y[0].Tk(-1,-1,m)
return H.e(y,1)
y[1].Tk(1,-1,m)
return H.e(y,2)
y[2].Tk(-1,1,m)
return H.e(y,3)
y[3].Tk(1,1,m)
return H.e(y,4)
y[4].Tk(-1,-1,l)
return H.e(y,5)
y[5].Tk(1,-1,l)
return H.e(y,6)
y[6].Tk(-1,1,l)
return H.e(y,7)
y[7].Tk(1,1,l)
return o},
static:{M6:function(){var z,y
z=S.qM()
y=new T.aI(new Float32Array(H.T0(16)))
y.xI()
return new S.ZS(z,y,new T.An(new Float32Array(H.T0(3))),new T.An(new Float32Array(H.T0(3))),null,null,null,null,null,null)}}},
Dp:{
"^":"ja;Jq,qJ,ZG,Y0,j4,kZ,Rj,eD,jq,EJ,l4,Ht,HV,cf,Jz,pG,WY,Xi,I6,e1,LD,kX,RZ,ij,TQ,ca,Jc,cw,nz,mT,Jr,IL,TO,S8,NH,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn"},
mN:{
"^":"dE;NH,e1,LD,kX,RZ,ij,TQ,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
Yp:function(a){var z=this.dx
S.H4(z,this.f,a,this.e)
if(this.cy)this.r=S.ZM(z,this.y)},
static:{qb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new Float32Array(H.T0(16))
y=new Float32Array(H.T0(16))
x=new T.aI(new Float32Array(H.T0(16)))
x.xI()
w=new T.aI(new Float32Array(H.T0(16)))
w.xI()
v=new T.aI(new Float32Array(H.T0(16)))
v.xI()
u=$.RG
$.RG=u+1
t=P.u5()
s=new T.An(new Float32Array(H.T0(3)))
s.PJ(0,1,0)
r=new T.An(new Float32Array(H.T0(3)))
r.PJ(0,0,0)
q=new T.An(new Float32Array(H.T0(3)))
q.PJ(0,0,0)
p=new T.An(new Float32Array(H.T0(3)))
p.PJ(1,1,1)
o=new T.aI(new Float32Array(H.T0(16)))
o.xI()
n=new T.aI(new Float32Array(H.T0(16)))
n.xI()
m=new T.aI(new Float32Array(H.T0(16)))
m.xI()
return new S.mN(x,w,v,a,b,z,y,u,"",t,null,[],s,r,q,p,"XYZ",null,null,null,!0,null,o,n,m,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)}}},
b2:{
"^":"mN;ca,Jc,cw,nz,NH,e1,LD,kX,RZ,ij,TQ,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn"},
WT:{
"^":"mN;ca,Jc,cw,nz,mT,Jr,IL,TO,NH,e1,LD,kX,RZ,ij,TQ,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
hk:function(){var z,y,x,w,v
z=this.Jc
y=this.kX
x=Math.tan(H.E0(this.ca*0.017453292519943295*0.5))*y
w=x*z
v=new T.aI(new Float32Array(H.T0(16)))
T.KJ(v,-w,w,-x,x,y,this.RZ)
this.e1=v}},
uH:{
"^":"a;Q,a,b",
gr:function(a){return this.Q},
gUI:function(){return this.a},
gb:function(a){return this.b},
Ze:function(a){this.Q=a.gr(a)
this.a=a.gUI()
this.b=a.gb(a)
return this},
wN:function(a){var z=a.Q
this.Q=z*z
z=a.a
this.a=z*z
z=a.b
this.b=z*z
return this},
tz:function(a){var z=C.jn.yu(C.CD.yu(Math.floor(a)))
this.Q=((z&16711680)>>>16)/255
this.a=((z&65280)>>>8)/255
this.b=(z&255)/255
return this},
t:function(a){var z,y,x,w
z=S.Mp(null)
y=this.Q
x=this.a
w=this.b
z.Q=y
z.a=x
z.b=w
return z},
nh:function(a){if(typeof a==="number")this.tz(a)},
static:{Mp:function(a){var z=new S.uH(1,1,1)
z.nh(a)
return z}}},
J9:{
"^":"a;cT:Q<,di:a<,ih:e>,Nq:r<",
gtL:function(a){return 4},
xu:function(a){this.a.xu(a.gdi())
this.e.Ze(a.e)
this.r.xu(a.r)
this.f=a.f
this.b=H.J(new H.A8(a.b,new S.kj()),[null,null]).br(0)
this.c=H.J(new H.A8(a.c,new S.UB()),[null,null]).br(0)
this.d=H.J(new H.A8(a.d,new S.oW()),[null,null]).br(0)
return this},
A5:function(a,b,c,d){this.a=new T.An(new Float32Array(H.T0(3)))
this.b=[]
this.e=S.Mp(null)
this.c=[]
this.d=[]
this.r=new T.An(new Float32Array(H.T0(3)))}},
kj:{
"^":"r:22;",
$1:function(a){return J.ir(a)}},
UB:{
"^":"r:22;",
$1:function(a){return J.ir(a)}},
oW:{
"^":"r:22;",
$1:function(a){return J.ir(a)}},
Uv:{
"^":"J9;Q,a,b,c,d,e,f,r",
t:function(a){var z,y
z=this.Q
z=[z[0],z[1],z[2],z[3]]
y=new S.Uv(z,null,null,null,null,null,null,null)
y.A5(z,null,null,null)
return y.xu(this)}},
NY:{
"^":"a;Q",
Cb:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.p(0,0)
y=a.p(0,1)
x=a.p(0,2)
w=a.p(0,3)
v=a.p(0,4)
u=a.p(0,5)
t=a.p(0,6)
s=a.p(0,7)
r=a.p(0,8)
q=a.p(0,9)
p=a.p(0,10)
o=a.p(0,11)
n=a.p(0,12)
m=a.p(0,13)
l=a.p(0,14)
k=a.p(0,15)
j=this.Q
j[0].Mp(w-z,s-v,o-r,k-n)
j[1].Mp(w+z,s+v,o+r,k+n)
j[2].Mp(w+y,s+u,o+q,k+m)
j[3].Mp(w-y,s-u,o-q,k-m)
j[4].Mp(w-x,s-t,o-p,k-l)
j[5].Mp(w+x,s+t,o+p,k+l)
for(i=0;i<6;++i){h=j[i].Q
g=h[0]
f=h[1]
e=h[2]
d=Math.sqrt(g*g+f*f+e*e)
if(d>0){g=1/d
h[0]=h[0]*g
h[1]=h[1]*g
h[2]=h[2]*g
h[3]=h[3]*g}}},
tg:function(a,b){var z,y,x,w
z=b.gY7()
y=-b.x1.dy.Q*Math.sqrt(H.E0(P.u(z.p(0,0)*z.p(0,0)+z.p(0,1)*z.p(0,1)+z.p(0,2)*z.p(0,2),P.u(z.p(0,4)*z.p(0,4)+z.p(0,5)*z.p(0,5)+z.p(0,6)*z.p(0,6),z.p(0,8)*z.p(0,8)+z.p(0,9)*z.p(0,9)+z.p(0,10)*z.p(0,10)))))
for(x=this.Q,w=0;w<6;++w)if(x[w].Q[0]*z.p(0,12)+x[w].Q[1]*z.p(0,13)+x[w].Q[2]*z.p(0,14)+x[w].Q[3]<=y)return!1
return!0},
static:{qM:function(){var z,y,x,w,v,u
z=new T.Bp(new Float32Array(H.T0(4)))
z.Mp(0,0,0,1)
y=new T.Bp(new Float32Array(H.T0(4)))
y.Mp(0,0,0,1)
x=new T.Bp(new Float32Array(H.T0(4)))
x.Mp(0,0,0,1)
w=new T.Bp(new Float32Array(H.T0(4)))
w.Mp(0,0,0,1)
v=new T.Bp(new Float32Array(H.T0(4)))
v.Mp(0,0,0,1)
u=new T.Bp(new Float32Array(H.T0(4)))
u.Mp(0,0,0,1)
return new S.NY([z,y,x,w,v,u])}}},
mP:{
"^":"HT;Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,Q$,a$,b$,c$,d$,e$,f$,r$,x$,y$,z$,ch$,cx$,cy$,db$,dx$,dy$,fr$,fx$,fy$,go$,id$,k1$,k2$,k3$,k4$,r1$,r2$,rx$,ry$,x1$,x2$,y1$,y2$,TB$,ej$,lZ$,Ab$,zR$,Ky$,bR$,pV$,of$,DN$,C7$,Va$,Uu$",
VO:function(){C.Nm.aN(this.e,new S.kW(this))},
R5:function(){var z={}
z.Q=null
this.dy=new S.an(Math.sqrt(H.E0(C.Nm.es(this.a,0,new S.Su(z)))),null)},
Pu:function(){var z,y,x,w,v,u,t,s,r,q,p
z=P.u5()
y=[]
x=[]
H.E0(10)
H.E0(4)
w=Math.pow(10,4)
v=this.a.length
for(u=0;u<v;++u){t=this.a
if(u>=t.length)return H.e(t,u)
s=t[u]
t=J.RE(s)
r=t.gx(s)
if(typeof r!=="number")return r.R()
r=C.jn.Sy(C.CD.zQ(r*w),0)
q=t.gy(s)
if(typeof q!=="number")return q.R()
q=C.jn.Sy(C.CD.zQ(q*w),0)
t=t.gz(s)
if(typeof t!=="number")return t.R()
p=C.Nm.zV([r,q,C.jn.Sy(C.CD.zQ(t*w),0)],"_")
if(z.p(0,p)==null){z.q(0,p,u)
y.push(s)
x.push(y.length-1)}else{t=z.p(0,p)
if(t>>>0!==t||t>=x.length)return H.e(x,t)
x.push(x[t])}}C.Nm.aN(this.e,new S.aP(x))
t=this.a.length
r=y.length
this.a=y
return t-r},
t:function(a){},
gMq:function(){var z=this.x1
if(z==null){z=P.u5()
this.x1=z}return z},
p:function(a,b){return this.gMq().p(0,b)},
q:function(a,b,c){this.gMq().q(0,b,c)
return c},
RK:function(){var z=$.vT
$.vT=z+1
this.sjO(0,z)},
static:{T4:function(){var z=new S.mP("",H.J([],[T.An]),[],[],[],[],[[]],[[]],[],[],[],[],[],[],null,null,null,!1,!1,null,null,!1,!1,!1,!1,!1,!1,!1,!1,!1,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.RK()
return z}}},
HT:{
"^":"a+nP;jO:Q$*,J5:b$<,zu:r$@,am:x$@,dX:y$@,qd:z$?,vh:ch$?,VV:cx$@,lw:cy$@,ut:go$<,my:id$<,Ue:k1$<,An:k3$@,bE:k4$<,bZ:r1$@,GV:ry$@,jN:x1$@,o9:pV$<,J2:of$@,xR:Uu$<"},
kW:{
"^":"r:23;Q",
$1:function(a){var z,y,x,w
a.gNq().PJ(0,0,0)
C.Nm.aN(a.Q,new S.bX(this.Q,a))
z=a.r.Q
y=z[0]
x=z[1]
z=z[2]
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(y*0.25,x*0.25,z*0.25)
a.r=w}},
bX:{
"^":"r:1;Q,a",
$1:function(a){var z,y
z=this.a.r
y=this.Q.a
if(a>>>0!==a||a>=y.length)return H.e(y,a)
z.h(0,y[a])}},
Su:{
"^":"r:24;Q",
$2:function(a,b){var z,y
z=b.gUK()
this.Q.Q=z
if(typeof a!=="number")return H.o(a)
if(z>a)y=z
else y=a
return y}},
aP:{
"^":"r:23;Q",
$1:function(a){var z,y,x,w,v
z=J.RE(a)
y=this.Q
x=0
while(!0){w=z.gtL(a)
if(typeof w!=="number")return H.o(w)
if(!(x<w))break
w=a.gcT()
v=a.Q
if(x>=4)return H.e(v,x)
v=v[x]
if(v<0||v>=y.length)return H.e(y,v)
w[x]=y[v];++x}}},
an:{
"^":"a;Q,a"},
dE:{
"^":"a;jO:Q*,a,b,eT:c*,d,e,bM:f>,r,x,y,z,ch,cx,cy,db,dx,Y7:dy@,fr,Re:fx<,fy,go,id,k1,k2,wx:k3>,oo:k4<,r1,r2,rx,ry,x1,TV:x2<,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,dX:Uu@,qd:j3?,iU,lq,pn",
QI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.dx.Q
y=z[0]
x=c.Q
w=x[0]
v=z[4]
u=x[1]
t=z[8]
s=x[2]
r=z[1]
q=z[5]
p=z[9]
o=z[2]
n=z[6]
z=z[10]
x[0]=y*w+v*u+t*s
x[1]=r*w+q*u+p*s
x[2]=o*w+n*u+z*s
c.p3(0)
s=this.gbM(this)
x[2]=x[2]*b
x[1]=x[1]*b
x[0]=x[0]*b
s.h(0,c)},
h:function(a,b){var z,y,x
z=J.t(b)
if(z.m(b,this)){P.JS("THREE.Object3D.add: An object can't be added as a child of itself.")
return}if(z.geT(b)!=null)J.V1(z.geT(b),b)
z.seT(b,this)
this.d.push(b)
for(y=this;x=y.c,x!=null;y=x);if(!!y.$isOh)y.Et(b)},
Rz:function(a,b){var z,y,x,w
z=this.d
y=C.Nm.OY(z,b)
if(y!==-1){J.Be(b,null)
C.Nm.W4(z,y)
for(x=this;w=x.c,w!=null;x=w);if(!!x.$isOh)x.dR(b)}},
VC:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.dx
if(this.id)S.lY(z,this.go)
else{y=this.r.Q
x=y[0]
w=y[1]
v=y[2]
u=Math.cos(H.E0(x))
t=Math.sin(H.E0(x))
s=Math.cos(H.E0(w))
r=Math.sin(H.E0(w))
q=Math.cos(H.E0(v))
p=Math.sin(H.E0(v))
y=u*q
o=z.Q
n=s*q
m=u*s
switch(this.y){case"YXZ":l=s*p
k=r*q
j=r*p
o[0]=n+j*t
o[4]=k*t-l
o[8]=u*r
o[1]=u*p
o[5]=y
o[9]=-t
o[2]=l*t-k
o[6]=j+n*t
o[10]=m
break
case"ZXY":l=s*p
k=r*q
j=r*p
o[0]=n-j*t
i=-u
o[4]=i*p
o[8]=k+l*t
o[1]=l+k*t
o[5]=y
o[9]=j-n*t
o[2]=i*r
o[6]=t
o[10]=m
break
case"ZYX":h=u*p
g=t*q
f=t*p
o[0]=n
o[4]=g*r-h
o[8]=y*r+f
o[1]=s*p
o[5]=f*r+y
o[9]=h*r-g
o[2]=-r
o[6]=t*s
o[10]=m
break
case"YZX":e=u*r
d=t*s
c=t*r
o[0]=n
o[4]=c-m*p
o[8]=d*p+e
o[1]=p
o[5]=y
o[9]=-t*q
o[2]=-r*q
o[6]=e*p+d
o[10]=m-c*p
break
case"XZY":e=u*r
d=t*s
c=t*r
o[0]=n
o[4]=-p
o[8]=r*q
o[1]=m*p+c
o[5]=y
o[9]=e*p-d
o[2]=d*p-e
o[6]=t*q
o[10]=c*p+m
break
default:h=u*p
g=t*q
f=t*p
o[0]=n
o[4]=-s*p
o[8]=r
o[1]=h+g*r
o[5]=y-f*r
o[9]=-t*s
o[2]=f-y*r
o[6]=g+h*r
o[10]=m
break}}y=this.gbM(this).Q
v=y[2]
w=y[1]
x=y[0]
z=z.Q
z[14]=v
z[13]=w
z[12]=x
y=this.x.Q
b=y[0]
if(b!==1||y[1]!==1||y[2]!==1){a=y[1]
a0=y[2]
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*a
z[5]=z[5]*a
z[6]=z[6]*a
z[7]=z[7]*a
z[8]=z[8]*a0
z[9]=z[9]*a0
z[10]=z[10]*a0
z[11]=z[11]*a0
z[12]=z[12]
z[13]=z[13]
z[14]=z[14]
z[15]=z[15]
this.k2=P.u(y[0],P.u(y[1],y[2]))}this.fy=!0},
tx:function(a){var z,y,x
z={}
z.Q=a
if(this.gRe())this.VC()
if(this.fy||a){y=this.c
x=this.dx
if(y!=null)this.sY7(y.gY7().R(0,x))
else{y=new T.aI(new Float32Array(H.T0(16)))
y.xu(x)
this.sY7(y)}this.fy=!1
z.Q=!0}C.Nm.aN(this.d,new S.LN(z))},
Zz:function(){return this.tx(!1)},
t:function(a){},
static:{ep:function(){var z,y,x,w,v,u,t,s,r
z=$.RG
$.RG=z+1
y=P.u5()
x=new T.An(new Float32Array(H.T0(3)))
x.PJ(0,1,0)
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(0,0,0)
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(0,0,0)
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(1,1,1)
t=new T.aI(new Float32Array(H.T0(16)))
t.xI()
s=new T.aI(new Float32Array(H.T0(16)))
s.xI()
r=new T.aI(new Float32Array(H.T0(16)))
r.xI()
return new S.dE(z,"",y,null,[],x,w,v,u,"XYZ",null,null,null,!0,null,t,s,r,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)}}},
LN:{
"^":"r:1;Q",
$1:function(a){return a.tx(this.Q.Q)}},
US:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2",
up:function(a,b){var z=b.LD
z.C9(b.e1)
z=b.dy.R(0,z)
this.id=z
return a.Kj(z)},
static:{kF:function(){var z,y,x,w,v,u,t
z=new Float32Array(H.T0(3))
y=new T.Bp(new Float32Array(H.T0(4)))
y.Mp(0,0,0,1)
x=new T.aI(new Float32Array(H.T0(16)))
x.xI()
w=new T.aI(new Float32Array(H.T0(16)))
w.xI()
v=S.qM()
u=new T.Bp(new Float32Array(H.T0(4)))
u.Mp(0,0,0,1)
t=new T.Bp(new Float32Array(H.T0(4)))
t.Mp(0,0,0,1)
return new S.US([],[],[],[],[],[],null,null,null,null,null,null,null,null,null,null,new T.An(z),y,u,t,new S.zP([],[],[],[]),x,w,v)}}},
zP:{
"^":"a;Q,a,b,c"},
BB:{
"^":"a;Of:Q<,a",
Ze:function(a){this.Q=a.gOf()
this.a=a.gFc()
return this},
t:function(a){return new S.BB(this.Q,this.a)}},
EI:{
"^":"r:1;",
$1:function(a){return P.C(P.u(a,-1),1)}},
mq:{
"^":"a3;NH,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn"},
ja:{
"^":"kA;bM:ZG>,K:Y0>,cg:j4<,kZ,Rj,eD,jq,EJ,l4,Ht,wf:HV<,cf,Jz,pG,WY,Xi,I6,e1,LD,kX,RZ,ij,TQ,ca,Jc,cw,nz,mT,Jr,IL,TO,S8,NH,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
B0:function(a,b,c){var z=new T.An(new Float32Array(H.T0(3)))
z.PJ(0,1,0)
this.ZG=z
this.Y0=S.ep()
this.Rj=-500
this.eD=500
this.jq=500
this.EJ=-500
this.l4=!1
z=new T.An(new Float32Array(H.T0(3)))
z.PJ(0,0,-1000)
this.Ht=z
this.HV=2
this.cf=[0,0,0]
this.Jz=[512,512,512]
this.pG=[512,512,512]
this.WY=[-1,0.99,0.998]
this.Xi=[0.99,0.998,1]
this.I6=[]},
static:{Eh:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=S.Mp(a)
y=$.RG
$.RG=y+1
x=P.u5()
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(0,1,0)
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(0,0,0)
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(0,0,0)
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(1,1,1)
s=new T.aI(new Float32Array(H.T0(16)))
s.xI()
r=new T.aI(new Float32Array(H.T0(16)))
r.xI()
q=new T.aI(new Float32Array(H.T0(16)))
q.xI()
q=new S.ja(null,null,b,c,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,!1,50,5000,50,!1,0,0.5,512,512,null,null,null,null,null,z,y,"",x,null,[],w,v,u,t,"XYZ",null,null,null,!0,null,s,r,q,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
q.B0(a,b,c)
return q}}},
a3:{
"^":"dE;ih:NH>"},
kA:{
"^":"a3;oo:e1<,Rl:LD<,JM:mT<"},
ws:{
"^":"J7;r2,rx,ry,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1"},
ag:{
"^":"a;"},
J7:{
"^":"a;jO:a*,ih:c>,wx:fr>,Qg:fx<"},
kP:{
"^":"J7;Ir:r2>,Vv:rx<,M6:ry<,KK:x1<,xe:x2<,NI:y1<,w0:y2<,Z9:TB<,xW:ej<,i0:lZ<,Ab,zR,qB:Ky<,kD:bR<,h0:pV<,A7:of@,oJ:DN@,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1",
ez:function(a,b){return this.r2.$1(b)},
$isyK:1,
$isqL:1,
$isFQ:1,
$isCc:1,
$isvf:1},
kD:{
"^":"J7;r2,rx,ry,x1,x2,y1,y2,TB,Ir:ej>,Vv:lZ<,Ab,zR,Ky,bR,M6:pV<,KK:of<,xe:DN<,NI:C7<,w0:Va<,Z9:Uu<,j3,iU,lq,pn,qB:NH<,kD:e1<,h0:LD<,A7:kX@,oJ:RZ@,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1",
ez:function(a,b){return this.ej.$1(b)},
$isqL:1,
$isFQ:1,
$isCc:1,
$isvf:1,
$isJr:1},
yp:{
"^":"J7;Z9:r2<,xW:rx<,i0:ry<,x1,x2,y1,qB:y2<,kD:TB<,h0:ej<,A7:lZ@,oJ:Ab@,zR,Ky,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1",
Wl:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,a0,a1,a2){this.k3=x
this.k1=j
this.k2=z},
$isyK:1,
$isFQ:1,
$isqL:1,
static:{SS:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0,a1,a2,a3,a4){var z,y
z=P.u5()
y=$.YY
$.YY=y+1
y=new S.yp(t,a3,a4,null,null,k,v,m,l,0,0,b,z,n,y,u,S.Mp(null),o,f,e,c,d,a,q,r,s,w,g,h,p,a2,!0,i,a0,null,null,null,null,null,!1)
y.Wl(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0,a1,a2,a3,a4)
return y}}},
WP:{
"^":"dE;TV:NH<,t5:e1>",
ZU:function(a,b,c){if(a.dy==null)a.R5()
this.x1=a}},
ba:{
"^":"dE;TV:NH<,de:e1<,LD,kX,RZ,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
CK:function(a,b){if(a!=null){if(a.dy==null)a.R5()
this.k1=a.dy.Q
this.x1=a}},
static:{YU:function(a,b){var z,y,x,w,v,u,t,s,r
z=$.RG
$.RG=z+1
y=P.u5()
x=new T.An(new Float32Array(H.T0(3)))
x.PJ(0,1,0)
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(0,0,0)
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(0,0,0)
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(1,1,1)
t=new T.aI(new Float32Array(H.T0(16)))
t.xI()
s=new T.aI(new Float32Array(H.T0(16)))
s.xI()
r=new T.aI(new Float32Array(H.T0(16)))
r.xI()
r=new S.ba(b,0,null,null,null,z,"",y,null,[],x,w,v,u,"XYZ",null,null,null,!0,null,t,s,r,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
r.CK(a,b)
return r}}},
Ff:{
"^":"T9;id,k1,lA:k2*,jt:k3*,k4,r1,AJ:r2@,rx,ry,x1,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
t:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.id
y=this.k1
x=this.c
w=this.d
v=this.e
u=this.y
t=this.f
s=this.k2
s.toString
r=new T.z3(new Float32Array(H.T0(2)))
r.xu(s)
s=this.k3
s.toString
q=new T.z3(new Float32Array(H.T0(2)))
q.xu(s)
s=this.r
p=this.x
q=new S.Ff(z,y,r,q,this.k4,this.r1,this.r2,this.rx,null,null,null,null,null,x,w,v,t,s,p,u,null,null,null,null,null,null,null,4,[],null,null)
q.cE(null,null,x,w,v,t,s,p,u)
if(q.k2==null)q.k2=new T.z3(new Float32Array(H.T0(2)))
if(q.k3==null){z=new Float32Array(H.T0(2))
z[0]=1
z[1]=1
q.k3=new T.z3(z)}return q}},
AQ:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn,NH,e1,LD,kX,RZ,ij,TQ,ca,Jc,cw,nz,mT,Jr,IL,TO,S8,ZG,Y0,j4,kZ,Rj,eD,jq,EJ,l4,Ht,HV,cf,Jz",
HU:function(a,b){var z,y
z=this.Q
y=this.e
if(typeof a!=="number")return a.R()
if(typeof y!=="number")return H.o(y)
J.TZ(z,C.CD.yu(a*y))
y=this.Q
z=this.e
if(typeof b!=="number")return b.R()
if(typeof z!=="number")return H.o(z)
J.OE(y,C.CD.yu(b*z))
z=this.Q.style
y=""+a+"px"
z.width=y
z=this.Q.style
y=""+b+"px"
z.height=y
z=J.l2(this.Q)
y=J.OB(this.Q)
this.RZ=0
this.ij=0
this.TQ=z!==-1?z:J.l2(this.Q)
z=y!==-1?y:J.OB(this.Q)
this.ca=z
J.N6(this.a,this.RZ,this.ij,this.TQ,z)},
EY:function(a,b,c,d){var z=b?16384:0
if(c)z|=256
if(d)z|=1024
J.Iz(this.a,z)},
V1:function(a){return this.EY(a,!0,!0,!0)},
Iw:function(a){var z,y
a.sdX(J.Rw(this.a))
a.sqd(J.Rw(this.a))
a.svh(J.Rw(this.a))
a.cx$=J.Rw(this.a)
a.db$=J.Rw(this.a)
a.dx$=J.Rw(this.a)
a.fx$=J.Rw(this.a)
a.fy$=J.Rw(this.a)
a.go$=J.Rw(this.a)
a.id$=J.Rw(this.a)
z=a.d$
if(z!=null){a.k1$=[]
if(typeof z!=="number")return H.o(z)
y=0
for(;y<z;++y)a.k1$.push(J.Rw(this.a))}z=a.e$
if(z!=null){a.k2$=[]
if(typeof z!=="number")return H.o(z)
y=0
for(;y<z;++y)a.k2$.push(J.Rw(this.a))}++this.y1.Q.a},
xq:function(a){var z,y
if(a.id==null)return
a.id=null
for(z=this.y2.length,y=0;y<z;++y);},
k0:function(a,b){},
bq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b.x1
y=a.gJ5()
x=a.c$
w=y.length
v=x.length
u=w*3+v*4
t=b.NH
s=this.aA(t)
r=this.pr(t)
q=u*3
a.r1$=new Float32Array(q)
if(r!==0)a.r2$=new Float32Array(q)
if(z.fr)a.rx$=new Float32Array(u*4)
if(t.go!==0)a.ry$=new Float32Array(q)
if(s){z.f
a.x2$=new Float32Array(u*2)
z.r}b.x1.ch
w=(w+v*2)*3
a.Ab$=new Uint16Array(w)
v=u*2
a.zR$=new Uint16Array(v)
p=a.d$
if(p!=null){a.Ky$=[]
if(typeof p!=="number")return H.o(p)
o=0
for(;o<p;++o){n=a.Ky$
n.push(new Float32Array(q))}}p=a.e$
if(p!=null){a.bR$=[]
if(typeof p!=="number")return H.o(p)
o=0
for(;o<p;++o){n=a.bR$
n.push(new Float32Array(q))}}a.pV$=w
a.of$=v
if(!!t.$isyp);a.k4$=!0},
pr:function(a){var z
if(!!a.$iskP&&!0||!1)return 0
a.gZ9()
z=a.gZ9()===2
if(z)return 2
else return 1},
aA:function(a){if(!!a.$isvf)a.gIr(a)
if(!!a.$isCc){a.gVv()
a.gM6()}return!!a.$isyp},
Nn:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a0.a
y=a0.b
x=a0.cy
w=z.length
v=y.length
u=a0.gbZ()
t=a0.gGV()
s=a0.gjN()
r=a0.id
q=a0.k1
p=a0.ry
o=a0.gxR()
if(r){for(n=0,m=null;n<w;++n){if(n>=z.length)return H.e(z,n)
l=z[n]
m=n*3
k=J.RE(l)
j=k.gx(l)
i=u.length
if(m>=i)return H.e(u,m)
u[m]=j
j=m+1
h=k.gy(l)
if(j>=i)return H.e(u,j)
u[j]=h
h=m+2
k=k.gz(l)
if(h>=i)return H.e(u,h)
u[h]=k}J.wY(this.a,34962,a0.gdX())
J.LI(this.a,34962,u,a1)}else m=null
if(q){for(k=y.length,g=0;g<v;++g){if(g>=k)return H.e(y,g)
f=y[g]
m=g*3
j=f.Q
i=t.length
if(m>=i)return H.e(t,m)
t[m]=j
j=m+1
h=f.a
if(j>=i)return H.e(t,j)
t[j]=h
h=m+2
j=f.b
if(h>=i)return H.e(t,h)
t[h]=j}J.wY(this.a,34962,a0.gVV())
J.LI(this.a,34962,t,a1)}if(p){for(e=0;!1;++e){if(e>=0)return H.e(x,e)
s[e]=x[e]}J.wY(this.a,34962,a0.glw())
J.LI(this.a,34962,s,a1)}if(o!=null){d=o.length
for(c=0,b=null;c<d;++c){if(c>=o.length)return H.e(o,c)
a=o[c]
if(a.gQg()){a.gcu()
a.gcu()}}}},
Pb:function(g3,g4,g5,g6,g7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2
if(g3.gbE()!==!0)return
z=this.pr(g7)
y=this.aA(g7)
x=z===2
w=g3.r1$
v=g3.x2$
u=g3.y1$
t=g3.r2$
s=g3.rx$
r=g3.ry$
q=g3.Ky$
p=g3.bR$
o=g3.Uu$
n=g3.Ab$
m=g3.zR$
l=g4.x1
k=l.id
j=l.k2
i=l.k3
h=l.k4
g=l.r1
f=l.k1
e=l.rx
d=l.a
c=g3.b$
b=g3.c$
a=l.e
a0=l.r[0]
a1=l.x
a2=l.z
if(k){a3=c.length
for(a4=0,a5=null,a6=null,a7=null,a8=null,a9=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
b0=c[a4]
if(b0>=a.length)return H.e(a,b0)
a5=a[b0]
b0=a5.Q
b1=b0[0]
b2=d.length
if(b1<0||b1>=b2)return H.e(d,b1)
a6=d[b1]
b1=b0[1]
if(b1<0||b1>=b2)return H.e(d,b1)
a7=d[b1]
b0=b0[2]
if(b0<0||b0>=b2)return H.e(d,b0)
a8=d[b0]
b0=J.RE(a6)
b2=b0.gx(a6)
b1=w.length
if(a9>=b1)return H.e(w,a9)
w[a9]=b2
b2=a9+1
b3=b0.gy(a6)
if(b2>=b1)return H.e(w,b2)
w[b2]=b3
b3=a9+2
b0=b0.gz(a6)
if(b3>=b1)return H.e(w,b3)
w[b3]=b0
b0=a9+3
b3=J.RE(a7)
b2=b3.gx(a7)
if(b0>=b1)return H.e(w,b0)
w[b0]=b2
b2=a9+4
b0=b3.gy(a7)
if(b2>=b1)return H.e(w,b2)
w[b2]=b0
b0=a9+5
b3=b3.gz(a7)
if(b0>=b1)return H.e(w,b0)
w[b0]=b3
b3=a9+6
b0=J.RE(a8)
b2=b0.gx(a8)
if(b3>=b1)return H.e(w,b3)
w[b3]=b2
b2=a9+7
b3=b0.gy(a8)
if(b2>=b1)return H.e(w,b2)
w[b2]=b3
b3=a9+8
b0=b0.gz(a8)
if(b3>=b1)return H.e(w,b3)
w[b3]=b0
a9+=9}a3=b.length
for(a4=0,b4=null;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
b0=b[a4]
if(b0>=a.length)return H.e(a,b0)
a5=a[b0]
b0=a5.Q
b1=b0[0]
b2=d.length
if(b1<0||b1>=b2)return H.e(d,b1)
a6=d[b1]
b1=b0[1]
if(b1<0||b1>=b2)return H.e(d,b1)
a7=d[b1]
b1=b0[2]
if(b1<0||b1>=b2)return H.e(d,b1)
a8=d[b1]
b0=b0[3]
if(b0<0||b0>=b2)return H.e(d,b0)
b4=d[b0]
b0=J.RE(a6)
b2=b0.gx(a6)
b1=w.length
if(a9>=b1)return H.e(w,a9)
w[a9]=b2
b2=a9+1
b3=b0.gy(a6)
if(b2>=b1)return H.e(w,b2)
w[b2]=b3
b3=a9+2
b0=b0.gz(a6)
if(b3>=b1)return H.e(w,b3)
w[b3]=b0
b0=a9+3
b3=J.RE(a7)
b2=b3.gx(a7)
if(b0>=b1)return H.e(w,b0)
w[b0]=b2
b2=a9+4
b0=b3.gy(a7)
if(b2>=b1)return H.e(w,b2)
w[b2]=b0
b0=a9+5
b3=b3.gz(a7)
if(b0>=b1)return H.e(w,b0)
w[b0]=b3
b3=a9+6
b0=J.RE(a8)
b2=b0.gx(a8)
if(b3>=b1)return H.e(w,b3)
w[b3]=b2
b2=a9+7
b3=b0.gy(a8)
if(b2>=b1)return H.e(w,b2)
w[b2]=b3
b3=a9+8
b0=b0.gz(a8)
if(b3>=b1)return H.e(w,b3)
w[b3]=b0
b0=a9+9
b3=J.RE(b4)
b2=b3.gx(b4)
if(b0>=b1)return H.e(w,b0)
w[b0]=b2
b2=a9+10
b0=b3.gy(b4)
if(b2>=b1)return H.e(w,b2)
w[b2]=b0
b0=a9+11
b3=b3.gz(b4)
if(b0>=b1)return H.e(w,b0)
w[b0]=b3
a9+=12}J.wY(this.a,34962,g3.y$)
J.LI(this.a,34962,w,g5)}else{a5=null
a6=null
a7=null
a8=null
b4=null}if(e)for(b0=!!g7.$isqL,b5=null,b6=null,b7=null,b8=null,b9=0,c0=null,c1=null,c2=null,c3=null;!1;++b9){a3=c.length
for(a4=0,c4=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
c2=c[a4]
if(c2>=a.length)return H.e(a,c2)
a5=a[c2]
if(b9>=0)return H.e(a1,b9)
b1=a5.Q
a6=a1[b9].gkH().p(0,b1[0])
a7=a1[b9].gkH().p(0,b1[1])
a8=a1[b9].gkH().p(0,b1[2])
c0=q[b9]
b1=a6.gx(a6)
b2=c0.length
if(c4>=b2)return H.e(c0,c4)
c0[c4]=b1
b1=c4+1
b3=a6.gy(a6)
if(b1>=b2)return H.e(c0,b1)
c0[b1]=b3
b3=c4+2
c5=a6.gz(a6)
if(b3>=b2)return H.e(c0,b3)
c0[b3]=c5
c5=c4+3
c6=a7.gx(a7)
if(c5>=b2)return H.e(c0,c5)
c0[c5]=c6
c6=c4+4
c7=a7.gy(a7)
if(c6>=b2)return H.e(c0,c6)
c0[c6]=c7
c7=c4+5
c8=a7.gz(a7)
if(c7>=b2)return H.e(c0,c7)
c0[c7]=c8
c8=c4+6
c9=a8.gx(a8)
if(c8>=b2)return H.e(c0,c8)
c0[c8]=c9
c9=c4+7
d0=a8.gy(a8)
if(c9>=b2)return H.e(c0,c9)
c0[c9]=d0
d0=c4+8
d1=a8.gz(a8)
if(d0>=b2)return H.e(c0,d0)
c0[d0]=d1
if(b0&&g7.gh0()){b2=a2[b9]
if(x){c3=b2.gmH().p(0,c2)
b5=c3.ga(c3)
b6=c3.gb(c3)
b7=c3.gc(c3)}else{b5=b2.gks().p(0,c2)
b7=b5
b6=b7}c1=p[b9]
b2=b5.gx(b5)
d1=c1.length
if(c4>=d1)return H.e(c1,c4)
c1[c4]=b2
b2=b5.gy(b5)
if(b1>=d1)return H.e(c1,b1)
c1[b1]=b2
b2=b5.gz(b5)
if(b3>=d1)return H.e(c1,b3)
c1[b3]=b2
b2=b6.gx(b6)
if(c5>=d1)return H.e(c1,c5)
c1[c5]=b2
b2=b6.gy(b6)
if(c6>=d1)return H.e(c1,c6)
c1[c6]=b2
b2=b6.gz(b6)
if(c7>=d1)return H.e(c1,c7)
c1[c7]=b2
b2=b7.gx(b7)
if(c8>=d1)return H.e(c1,c8)
c1[c8]=b2
b2=b7.gy(b7)
if(c9>=d1)return H.e(c1,c9)
c1[c9]=b2
b2=b7.gz(b7)
if(d0>=d1)return H.e(c1,d0)
c1[d0]=b2}c4+=9}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
c2=b[a4]
if(c2>=a.length)return H.e(a,c2)
a5=a[c2]
if(b9>=0)return H.e(a1,b9)
b1=a5.Q
a6=a1[b9].gkH().p(0,b1[0])
a7=a1[b9].gkH().p(0,b1[1])
a8=a1[b9].gkH().p(0,b1[2])
b4=a1[b9].gkH().p(0,b1[3])
c0=q[b9]
b1=a6.gx(a6)
b2=c0.length
if(c4>=b2)return H.e(c0,c4)
c0[c4]=b1
b1=c4+1
b3=a6.gy(a6)
if(b1>=b2)return H.e(c0,b1)
c0[b1]=b3
b3=c4+2
c5=a6.gz(a6)
if(b3>=b2)return H.e(c0,b3)
c0[b3]=c5
c5=c4+3
c6=a7.gx(a7)
if(c5>=b2)return H.e(c0,c5)
c0[c5]=c6
c6=c4+4
c7=a7.gy(a7)
if(c6>=b2)return H.e(c0,c6)
c0[c6]=c7
c7=c4+5
c8=a7.gz(a7)
if(c7>=b2)return H.e(c0,c7)
c0[c7]=c8
c8=c4+6
c9=a8.gx(a8)
if(c8>=b2)return H.e(c0,c8)
c0[c8]=c9
c9=c4+7
d0=a8.gy(a8)
if(c9>=b2)return H.e(c0,c9)
c0[c9]=d0
d0=c4+8
d1=a8.gz(a8)
if(d0>=b2)return H.e(c0,d0)
c0[d0]=d1
d1=c4+9
d2=b4.gx(b4)
if(d1>=b2)return H.e(c0,d1)
c0[d1]=d2
d2=c4+10
d3=b4.gy(b4)
if(d2>=b2)return H.e(c0,d2)
c0[d2]=d3
d3=c4+11
d4=b4.gz(b4)
if(d3>=b2)return H.e(c0,d3)
c0[d3]=d4
if(b0&&g7.gh0()){b2=a2[b9]
if(x){c3=b2.gmH().p(0,c2)
b5=c3.ga(c3)
b6=c3.gb(c3)
b7=c3.gc(c3)
b8=c3.gd(c3)}else{b5=b2.gks().p(0,c2)
b8=b5
b7=b8
b6=b7}c1=p[b9]
b2=b5.gx(b5)
d4=c1.length
if(c4>=d4)return H.e(c1,c4)
c1[c4]=b2
b2=b5.gy(b5)
if(b1>=d4)return H.e(c1,b1)
c1[b1]=b2
b2=b5.gz(b5)
if(b3>=d4)return H.e(c1,b3)
c1[b3]=b2
b2=b6.gx(b6)
if(c5>=d4)return H.e(c1,c5)
c1[c5]=b2
b2=b6.gy(b6)
if(c6>=d4)return H.e(c1,c6)
c1[c6]=b2
b2=b6.gz(b6)
if(c7>=d4)return H.e(c1,c7)
c1[c7]=b2
b2=b7.gx(b7)
if(c8>=d4)return H.e(c1,c8)
c1[c8]=b2
b2=b7.gy(b7)
if(c9>=d4)return H.e(c1,c9)
c1[c9]=b2
b2=b7.gz(b7)
if(d0>=d4)return H.e(c1,d0)
c1[d0]=b2
b2=b8.gx(b8)
if(d1>=d4)return H.e(c1,d1)
c1[d1]=b2
b2=b8.gy(b8)
if(d2>=d4)return H.e(c1,d2)
c1[d2]=b2
b2=b8.gz(b8)
if(d3>=d4)return H.e(c1,d3)
c1[d3]=b2}c4+=12}b1=this.a
b2=g3.k1$
if(b9>=b2.length)return H.e(b2,b9)
J.wY(b1,34962,b2[b9])
b2=this.a
if(b9>=q.length)return H.e(q,b9)
J.LI(b2,34962,q[b9],g5)
if(b0&&g7.gh0()){b1=this.a
b2=g3.k2$
if(b9>=b2.length)return H.e(b2,b9)
J.wY(b1,34962,b2[b9])
b2=this.a
if(b9>=p.length)return H.e(p,b9)
J.LI(b2,34962,p[b9],g5)}}if(f&&g7.go!==0){a3=c.length
for(a4=0,d5=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
b0=c[a4]
if(b0>=a.length)return H.e(a,b0)
a5=a[b0]
d6=a5.c
d7=a5.e
b0=d6.length
if(b0===3&&g7.go===2){if(0>=b0)return H.e(d6,0)
d8=d6[0]
if(1>=b0)return H.e(d6,1)
d9=d6[1]
if(2>=b0)return H.e(d6,2)
e0=d6[2]}else{e0=d7
d9=e0
d8=d9}b0=J.RE(d8)
b1=b0.gr(d8)
b2=r.length
if(d5>=b2)return H.e(r,d5)
r[d5]=b1
b1=d5+1
b3=d8.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b3
b3=d5+2
b0=b0.gb(d8)
if(b3>=b2)return H.e(r,b3)
r[b3]=b0
b0=d5+3
b3=J.RE(d9)
b1=b3.gr(d9)
if(b0>=b2)return H.e(r,b0)
r[b0]=b1
b1=d5+4
b0=d9.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b0
b0=d5+5
b3=b3.gb(d9)
if(b0>=b2)return H.e(r,b0)
r[b0]=b3
b3=d5+6
b0=J.RE(e0)
b1=b0.gr(e0)
if(b3>=b2)return H.e(r,b3)
r[b3]=b1
b1=d5+7
b3=e0.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b3
b3=d5+8
b0=b0.gb(e0)
if(b3>=b2)return H.e(r,b3)
r[b3]=b0
d5+=9}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
b0=b[a4]
if(b0>=a.length)return H.e(a,b0)
a5=a[b0]
d6=a5.c
d7=a5.e
b0=d6.length
if(b0===4&&g7.go===2){if(0>=b0)return H.e(d6,0)
d8=d6[0]
if(1>=b0)return H.e(d6,1)
d9=d6[1]
if(2>=b0)return H.e(d6,2)
e0=d6[2]
if(3>=b0)return H.e(d6,3)
e1=d6[3]}else{e1=d7
e0=e1
d9=e0
d8=d9}b0=J.RE(d8)
b1=b0.gr(d8)
b2=r.length
if(d5>=b2)return H.e(r,d5)
r[d5]=b1
b1=d5+1
b3=d8.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b3
b3=d5+2
b0=b0.gb(d8)
if(b3>=b2)return H.e(r,b3)
r[b3]=b0
b0=d5+3
b3=J.RE(d9)
b1=b3.gr(d9)
if(b0>=b2)return H.e(r,b0)
r[b0]=b1
b1=d5+4
b0=d9.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b0
b0=d5+5
b3=b3.gb(d9)
if(b0>=b2)return H.e(r,b0)
r[b0]=b3
b3=d5+6
b0=J.RE(e0)
b1=b0.gr(e0)
if(b3>=b2)return H.e(r,b3)
r[b3]=b1
b1=d5+7
b3=e0.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b3
b3=d5+8
b0=b0.gb(e0)
if(b3>=b2)return H.e(r,b3)
r[b3]=b0
b0=d5+9
b3=J.RE(e1)
b1=b3.gr(e1)
if(b0>=b2)return H.e(r,b0)
r[b0]=b1
b1=d5+10
b0=e1.gUI()
if(b1>=b2)return H.e(r,b1)
r[b1]=b0
b0=d5+11
b3=b3.gb(e1)
if(b0>=b2)return H.e(r,b0)
r[b0]=b3
d5+=12}if(d5>0){J.wY(this.a,34962,g3.cx$)
J.LI(this.a,34962,r,g5)}}if(g&&l.fr){a3=c.length
for(a4=0,e2=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
b0=c[a4]
if(b0>=a.length)return H.e(a,b0)
e3=a[b0].d
b0=e3.length
if(0>=b0)return H.e(e3,0)
d0=e3[0]
if(1>=b0)return H.e(e3,1)
b1=e3[1]
if(2>=b0)return H.e(e3,2)
b2=e3[2]
b0=J.RE(d0)
b3=b0.gx(d0)
c5=s.length
if(e2>=c5)return H.e(s,e2)
s[e2]=b3
b3=e2+1
c6=b0.gy(d0)
if(b3>=c5)return H.e(s,b3)
s[b3]=c6
c6=e2+2
b3=b0.gz(d0)
if(c6>=c5)return H.e(s,c6)
s[c6]=b3
b3=e2+3
d0=b0.gES(d0)
if(b3>=c5)return H.e(s,b3)
s[b3]=d0
d0=e2+4
b3=J.RE(b1)
b0=b3.gx(b1)
if(d0>=c5)return H.e(s,d0)
s[d0]=b0
b0=e2+5
d0=b3.gy(b1)
if(b0>=c5)return H.e(s,b0)
s[b0]=d0
d0=e2+6
b0=b3.gz(b1)
if(d0>=c5)return H.e(s,d0)
s[d0]=b0
b0=e2+7
b1=b3.gES(b1)
if(b0>=c5)return H.e(s,b0)
s[b0]=b1
b1=e2+8
b0=J.RE(b2)
b3=b0.gx(b2)
if(b1>=c5)return H.e(s,b1)
s[b1]=b3
b3=e2+9
b1=b0.gy(b2)
if(b3>=c5)return H.e(s,b3)
s[b3]=b1
b1=e2+10
b3=b0.gz(b2)
if(b1>=c5)return H.e(s,b1)
s[b1]=b3
b3=e2+11
b2=b0.gES(b2)
if(b3>=c5)return H.e(s,b3)
s[b3]=b2
e2+=12}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
b0=b[a4]
if(b0>=a.length)return H.e(a,b0)
e3=a[b0].d
b0=e3.length
if(0>=b0)return H.e(e3,0)
d0=e3[0]
if(1>=b0)return H.e(e3,1)
b1=e3[1]
if(2>=b0)return H.e(e3,2)
b2=e3[2]
if(3>=b0)return H.e(e3,3)
b3=e3[3]
b0=J.RE(d0)
c5=b0.gx(d0)
c6=s.length
if(e2>=c6)return H.e(s,e2)
s[e2]=c5
c5=e2+1
c7=b0.gy(d0)
if(c5>=c6)return H.e(s,c5)
s[c5]=c7
c7=e2+2
c5=b0.gz(d0)
if(c7>=c6)return H.e(s,c7)
s[c7]=c5
c5=e2+3
d0=b0.gES(d0)
if(c5>=c6)return H.e(s,c5)
s[c5]=d0
d0=e2+4
c5=J.RE(b1)
b0=c5.gx(b1)
if(d0>=c6)return H.e(s,d0)
s[d0]=b0
b0=e2+5
d0=c5.gy(b1)
if(b0>=c6)return H.e(s,b0)
s[b0]=d0
d0=e2+6
b0=c5.gz(b1)
if(d0>=c6)return H.e(s,d0)
s[d0]=b0
b0=e2+7
b1=c5.gES(b1)
if(b0>=c6)return H.e(s,b0)
s[b0]=b1
b1=e2+8
b0=J.RE(b2)
c5=b0.gx(b2)
if(b1>=c6)return H.e(s,b1)
s[b1]=c5
c5=e2+9
b1=b0.gy(b2)
if(c5>=c6)return H.e(s,c5)
s[c5]=b1
b1=e2+10
c5=b0.gz(b2)
if(b1>=c6)return H.e(s,b1)
s[b1]=c5
c5=e2+11
b2=b0.gES(b2)
if(c5>=c6)return H.e(s,c5)
s[c5]=b2
b2=e2+12
c5=J.RE(b3)
b0=c5.gx(b3)
if(b2>=c6)return H.e(s,b2)
s[b2]=b0
b0=e2+13
b2=c5.gy(b3)
if(b0>=c6)return H.e(s,b0)
s[b0]=b2
b2=e2+14
b0=c5.gz(b3)
if(b2>=c6)return H.e(s,b2)
s[b2]=b0
b0=e2+15
b3=c5.gES(b3)
if(b0>=c6)return H.e(s,b0)
s[b0]=b3
e2+=16}J.wY(this.a,34962,g3.ch$)
J.LI(this.a,34962,s,g5)}if(h&&z!==0){a3=c.length
for(a4=0,e4=null,e5=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
b0=c[a4]
if(b0>=a.length)return H.e(a,b0)
a5=a[b0]
e6=a5.b
e7=a5.a
if(e6.length===3&&x)for(e8=0;e8<3;++e8){if(e8>=e6.length)return H.e(e6,e8)
e4=e6[e8]
b0=J.RE(e4)
b1=b0.gx(e4)
b2=t.length
if(e5<0||e5>=b2)return H.e(t,e5)
t[e5]=b1
b1=e5+1
b3=b0.gy(e4)
if(b1>=b2)return H.e(t,b1)
t[b1]=b3
b3=e5+2
b0=b0.gz(e4)
if(b3>=b2)return H.e(t,b3)
t[b3]=b0
e5+=3}else for(b0=e7.Q,e8=0;e8<3;++e8){b1=b0[0]
b2=t.length
if(e5<0||e5>=b2)return H.e(t,e5)
t[e5]=b1
b1=e5+1
b3=b0[1]
if(b1>=b2)return H.e(t,b1)
t[b1]=b3
b3=e5+2
b1=b0[2]
if(b3>=b2)return H.e(t,b3)
t[b3]=b1
e5+=3}}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
b0=b[a4]
if(b0>=a.length)return H.e(a,b0)
a5=a[b0]
e6=a5.b
e7=a5.a
if(e6.length===4&&x)for(e8=0;e8<4;++e8){if(e8>=e6.length)return H.e(e6,e8)
e4=e6[e8]
b0=J.RE(e4)
b1=b0.gx(e4)
b2=t.length
if(e5<0||e5>=b2)return H.e(t,e5)
t[e5]=b1
b1=e5+1
b3=b0.gy(e4)
if(b1>=b2)return H.e(t,b1)
t[b1]=b3
b3=e5+2
b0=b0.gz(e4)
if(b3>=b2)return H.e(t,b3)
t[b3]=b0
e5+=3}else for(b0=e7.Q,e8=0;e8<4;++e8){b1=b0[0]
b2=t.length
if(e5<0||e5>=b2)return H.e(t,e5)
t[e5]=b1
b1=e5+1
b3=b0[1]
if(b1>=b2)return H.e(t,b1)
t[b1]=b3
b3=e5+2
b1=b0[2]
if(b3>=b2)return H.e(t,b3)
t[b3]=b1
e5+=3}}J.wY(this.a,34962,g3.z$)
J.LI(this.a,34962,t,g5)}if(i&&a0.length!==0&&y){a3=c.length
for(a4=0,e9=null,f0=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
f1=c[a4]
if(f1>=a0.length)return H.e(a0,f1)
f2=a0[f1]
for(e8=0;e8<3;++e8){if(e8>=f2.length)return H.e(f2,e8)
e9=f2[e8]
b0=e9.gOf()
b1=v.length
if(f0<0||f0>=b1)return H.e(v,f0)
v[f0]=b0
b0=f0+1
b2=e9.a
if(b0>=b1)return H.e(v,b0)
v[b0]=b2
f0+=2}}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
f1=b[a4]
if(f1>=a0.length)return H.e(a0,f1)
f2=a0[f1]
for(e8=0;e8<4;++e8){if(e8>=f2.length)return H.e(f2,e8)
e9=f2[e8]
b0=e9.gOf()
b1=v.length
if(f0<0||f0>=b1)return H.e(v,f0)
v[f0]=b0
b0=f0+1
b2=e9.a
if(b0>=b1)return H.e(v,b0)
v[b0]=b2
f0+=2}}if(f0>0){J.wY(this.a,34962,g3.db$)
J.LI(this.a,34962,v,g5)}}if(i)b0=!1
else b0=!1
if(b0){a3=c.length
for(a4=0,f3=null,f4=0;a4<a3;++a4){if(a4>=c.length)return H.e(c,a4)
f1=c[a4]
if(f1>=null.length)return H.e(null,f1)
f5=null[f1]
for(e8=0;e8<3;++e8){if(e8>=f5.length)return H.e(f5,e8)
f3=f5[e8]
b0=f3.gOf()
b1=u.length
if(f4<0||f4>=b1)return H.e(u,f4)
u[f4]=b0
b0=f4+1
b2=f3.a
if(b0>=b1)return H.e(u,b0)
u[b0]=b2
f4+=2}}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.e(b,a4)
f1=b[a4]
if(f1>=null.length)return H.e(null,f1)
f5=null[f1]
for(e8=0;e8<4;++e8){if(e8>=f5.length)return H.e(f5,e8)
f3=f5[e8]
b0=f3.gOf()
b1=u.length
if(f4<0||f4>=b1)return H.e(u,f4)
u[f4]=b0
b0=f4+1
b2=f3.a
if(b0>=b1)return H.e(u,b0)
u[b0]=b2
f4+=2}}if(f4>0){J.wY(this.a,34962,g3.dx$)
J.LI(this.a,34962,u,g5)}}if(j){a3=c.length
for(a4=0,f6=0,f7=0,f8=0;a4<a3;++a4){b0=n.length
if(f7>=b0)return H.e(n,f7)
n[f7]=f6
b1=f7+1
b2=f6+1
if(b1>=b0)return H.e(n,b1)
n[b1]=b2
b1=f7+2
b3=f6+2
if(b1>=b0)return H.e(n,b1)
n[b1]=b3
f7+=3
b1=m.length
if(f8>=b1)return H.e(m,f8)
m[f8]=f6
b0=f8+1
if(b0>=b1)return H.e(m,b0)
m[b0]=b2
b0=f8+2
if(b0>=b1)return H.e(m,b0)
m[b0]=f6
b0=f8+3
if(b0>=b1)return H.e(m,b0)
m[b0]=b3
b0=f8+4
if(b0>=b1)return H.e(m,b0)
m[b0]=b2
b2=f8+5
if(b2>=b1)return H.e(m,b2)
m[b2]=b3
f8+=6
f6+=3}a3=b.length
for(a4=0;a4<a3;++a4){b0=n.length
if(f7>=b0)return H.e(n,f7)
n[f7]=f6
b1=f7+1
b2=f6+1
if(b1>=b0)return H.e(n,b1)
n[b1]=b2
b1=f7+2
b3=f6+3
if(b1>=b0)return H.e(n,b1)
n[b1]=b3
b1=f7+3
if(b1>=b0)return H.e(n,b1)
n[b1]=b2
b1=f7+4
c5=f6+2
if(b1>=b0)return H.e(n,b1)
n[b1]=c5
b1=f7+5
if(b1>=b0)return H.e(n,b1)
n[b1]=b3
f7+=6
b1=m.length
if(f8>=b1)return H.e(m,f8)
m[f8]=f6
b0=f8+1
if(b0>=b1)return H.e(m,b0)
m[b0]=b2
b0=f8+2
if(b0>=b1)return H.e(m,b0)
m[b0]=f6
b0=f8+3
if(b0>=b1)return H.e(m,b0)
m[b0]=b3
b0=f8+4
if(b0>=b1)return H.e(m,b0)
m[b0]=b2
b2=f8+5
if(b2>=b1)return H.e(m,b2)
m[b2]=c5
b2=f8+6
if(b2>=b1)return H.e(m,b2)
m[b2]=c5
c5=f8+7
if(c5>=b1)return H.e(m,c5)
m[c5]=b3
f8+=8
f6+=4}J.wY(this.a,34963,g3.go$)
J.LI(this.a,34963,n,g5)
J.wY(this.a,34963,g3.id$)
J.LI(this.a,34963,m,g5)}if(o!=null){f9=o.length
for(e8=0,g0=0,g1=0;e8<f9;++e8){if(e8>=o.length)return H.e(o,e8)
g2=o[e8]
if(!g2.giG().gQg())continue
g2.gtL(g2)
g2.gtL(g2)
g2.gtL(g2)
g2.gtL(g2)
g2.gbg(g2).Pe(34962)
J.LI(this.a,34962,g2.gTI(),g5)
g0=0
g1=0}}if(g6){g3.k4$=!1
g3.ry$=null
g3.r2$=null
g3.rx$=null
g3.x2$=null
g3.y1$=null
g3.Ab$=null
g3.r1$=null
g3.zR$=null
g3.ej$=null
g3.lZ$=null}},
ai:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(a.gjG())a.gdX()
if(a.gir())a.gqd()
if(a.gYj())a.gAt()
if(a.gwD())a.gVV()
if(a.gjG()){J.wY(this.a,34962,a.gdX())
J.LI(this.a,34962,a.gUM(),35048)
z=b.d
J.Oo(this.a,z.p(0,"position"))
J.GB(this.a,z.p(0,"position"),3,5126,!1,0,0)}if(a.gir()){J.wY(this.a,34962,a.gqd())
if(c.r2===1){y=a.gAv(a).R(0,3)
for(x=0;C.jn.w(x,y);x+=9){w=a.gZ8()
v=w.p(0,x)
z=x+1
u=w.p(0,z)
t=x+2
s=w.p(0,t)
r=x+3
q=w.p(0,r)
p=x+4
o=w.p(0,p)
n=x+5
m=w.p(0,n)
l=x+6
k=w.p(0,l)
j=x+7
i=w.p(0,j)
h=x+8
g=w.p(0,h)
f=v.g(0,q).g(0,k).S(0,3)
e=u.g(0,o).g(0,i).S(0,3)
d=s.g(0,m).g(0,g).S(0,3)
w.q(0,x,f)
w.q(0,z,e)
w.q(0,t,d)
w.q(0,r,f)
w.q(0,p,e)
w.q(0,n,d)
w.q(0,l,f)
w.q(0,j,e)
w.q(0,h,d)}}J.LI(this.a,34962,a.gZ8(),35048)
z=b.d
J.Oo(this.a,z.p(0,"normal"))
J.GB(this.a,z.p(0,"normal"),3,5126,!1,0,0)}if(a.gYj()&&c.gIr(c)){J.wY(this.a,34962,a.gAt())
J.LI(this.a,34962,a.gdJ(),35048)
z=b.d
J.Oo(this.a,z.p(0,"uv"))
J.GB(this.a,z.p(0,"uv"),2,5126,!1,0,0)}if(a.gwD()&&c.go!==0){J.wY(this.a,34962,a.gVV())
J.LI(this.a,34962,a.gFX(),35048)
z=b.d
J.Oo(this.a,z.p(0,"color"))
J.GB(this.a,z.p(0,"color"),3,5126,!1,0,0)}J.id(this.a,4,0,a.gAv(a))
a.sAv(0,0)},
OI:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(!d.fr)return
z=this.E9(a,b,c,d,f)
y=z.d
x=J.t(d)
w=!!x.$isyK
v=w&&d.gxW()?1:0
u=J.WB(J.WB(J.v3(J.F8(e),16777215),z.Q*2),v)
if(u!==this.zR){this.zR=u
t=!0}else t=!1
if(t)this.p9()
if(!!x.$isqL)s=!d.gkD()
else s=!0
if(s){s=y.p(0,"position")
if(typeof s!=="number")return s.C()
s=s>=0}else s=!1
if(s){if(t){J.wY(this.a,34962,e.gdX())
this.Rd(y.p(0,"position"))
J.GB(this.a,y.p(0,"position"),3,5126,!1,0,0)}}else if(!!f.$isba&&f.e1!==0)this.dn(d,e,f)
if(t){if(e.gxR()!=null){r=e.Uu$.length
for(q=0;q<r;++q){s=e.Uu$
if(q>=s.length)return H.e(s,q)
p=s[q]
s=y.p(0,p.gbg(p).gVQ())
if(typeof s!=="number")return s.C()
if(s>=0){p.gbg(p).Pe(34962)
this.Rd(y.p(0,p.gbg(p).gVQ()))
J.GB(this.a,y.p(0,p.gbg(p).gVQ()),p.gtL(p),5126,!1,0,0)}}}s=y.p(0,"color")
if(typeof s!=="number")return s.C()
if(s>=0){J.wY(this.a,34962,e.cx$)
this.Rd(y.p(0,"color"))
J.GB(this.a,y.p(0,"color"),3,5126,!1,0,0)}s=y.p(0,"normal")
if(typeof s!=="number")return s.C()
if(s>=0){J.wY(this.a,34962,e.z$)
this.Rd(y.p(0,"normal"))
J.GB(this.a,y.p(0,"normal"),3,5126,!1,0,0)}s=y.p(0,"tangent")
if(typeof s!=="number")return s.C()
if(s>=0){J.wY(this.a,34962,e.ch$)
this.Rd(y.p(0,"tangent"))
J.GB(this.a,y.p(0,"tangent"),4,5126,!1,0,0)}s=y.p(0,"uv")
if(typeof s!=="number")return s.C()
if(s>=0){J.wY(this.a,34962,e.db$)
this.Rd(y.p(0,"uv"))
J.GB(this.a,y.p(0,"uv"),2,5126,!1,0,0)}s=y.p(0,"uv2")
if(typeof s!=="number")return s.C()
if(s>=0){J.wY(this.a,34962,e.dx$)
this.Rd(y.p(0,"uv2"))
J.GB(this.a,y.p(0,"uv2"),2,5126,!1,0,0)}if(!!x.$isFQ)if(d.gqB()){s=y.p(0,"skinIndex")
if(typeof s!=="number")return s.C()
if(s>=0){s=y.p(0,"skinWeight")
if(typeof s!=="number")return s.C()
s=s>=0}else s=!1}else s=!1
else s=!1
if(s){J.wY(this.a,34962,e.fx$)
this.Rd(y.p(0,"skinIndex"))
J.GB(this.a,y.p(0,"skinIndex"),4,5126,!1,0,0)
J.wY(this.a,34962,e.fy$)
this.Rd(y.p(0,"skinWeight"))
J.GB(this.a,y.p(0,"skinWeight"),4,5126,!1,0,0)}s=y.p(0,"lineDistance")
if(typeof s!=="number")return s.C()
if(s>=0){J.wY(this.a,34962,e.cy$)
this.Rd(y.p(0,"lineDistance"))
J.GB(this.a,y.p(0,"lineDistance"),1,5126,!1,0,0)}}if(!!f.$isba){if(w&&d.gxW()){x=H.Go(d,"$isyK").gi0()
if(x!==this.kX){J.d1(this.a,x)
this.kX=x}if(t)J.wY(this.a,34963,e.gmy())
J.Qv(this.a,1,e.gJ2(),5123,0)}else{if(t)J.wY(this.a,34963,e.gut())
J.Qv(this.a,4,e.go9(),5123,0)}x=this.y1
w=x.a;++w.Q
s=w.a
o=e.go9()
if(typeof o!=="number")return H.o(o)
w.a=s+o
x=x.a
o=x.b
s=e.pV$
if(typeof s!=="number")return s.W()
x.b=o+C.jn.BU(s,3)}else if(!!f.$isWP){n=f.e1===0?3:1
x=!!x.$isws?d.r2:0
if(x!==this.kX){J.d1(this.a,x)
this.kX=x}J.id(this.a,n,0,e.gJ2());++this.y1.a.Q}},
Rd:function(a){var z,y
z=J.Lz(a)
y=this.of
if(y.p(0,z)==null||y.p(0,z)!==!0){J.Oo(this.a,a)
y.q(0,z,!0)}},
p9:function(){this.of.aN(0,new S.SC(this))},
dn:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=a.id.d
if(c.gde()!==-1){y=z.p(0,"position")
if(typeof y!=="number")return y.C()
y=y>=0}else y=!1
if(y){y=this.a
x=b.gUe()
w=c.e1
if(w<0||w>=x.length)return H.e(x,w)
J.wY(y,34962,x[w])
this.Rd(z.p(0,"position"))
J.GB(this.a,z.p(0,"position"),3,5126,!1,0,0)}else{y=z.p(0,"position")
if(typeof y!=="number")return y.C()
if(y>=0){J.wY(this.a,34962,b.gdX())
this.Rd(z.p(0,"position"))
J.GB(this.a,z.p(0,"position"),3,5126,!1,0,0)}}if(!!a.$isqL)c.LD.length
v=[]
u=c.kX
t=u.length
for(s=0;s<t;++s){if(s>=u.length)return H.e(u,s)
r=u[s]
if(J.vU(r,0))v.push([s,r])}y=v.length
H.Go(a,"$isqL")
if(y>a.gA7()){C.Nm.GT(v,this.gkk())
C.Nm.sv(v,a.gA7())}else if(v.length>a.goJ())C.Nm.GT(v,this.gkk())
else if(v.length===0)v.push([0,0])
for(q=null,p=0;p<a.gA7();){y=v.length
if(p<y){x=v[p]
x=x!=null&&x.length!==0}else x=!1
if(x){if(p>=y)return H.e(v,p)
y=v[p]
if(0>=y.length)return H.e(y,0)
q=y[0]
y=this.a
x=b.gUe()
if(q>>>0!==q||q>=x.length)return H.e(x,q)
J.wY(y,34962,x[q])
this.Rd(z.p(0,"morphTarget"+p))
J.GB(this.a,z.p(0,"morphTarget"+p),3,5126,!1,0,0)
if(a.gh0()){y=this.a
x=b.k2$
if(q>=x.length)return H.e(x,q)
J.wY(y,34962,x[q])
this.Rd(z.p(0,"morphNormal"+p))
J.GB(this.a,z.p(0,"morphNormal"+p),3,5126,!1,0,0)}y=c.pn
if(q>=u.length)return H.e(u,q)
x=J.Oq(u[q])
if(p>=y.length)return H.e(y,p)
y[p]=x}else{y=c.pn
if(p>=y.length)return H.e(y,p)
y[p]=0}++p}if(a.id.e.p(0,"morphTargetInfluences")!=null)J.hu(this.a,a.id.e.p(0,"morphTargetInfluences"),c.pn)},
Gx:[function(a,b){var z,y
z=J.RE(a)
if(!J.cE(z.gz(a))){y=J.RE(b)
y=J.cE(y.gz(b))||J.IQ(z.gz(a))||J.IQ(y.gz(b))}else y=!0
if(y)z=0
else{y=J.xJ(b)
z=z.gz(a)
if(typeof y!=="number")return y.T()
if(typeof z!=="number")return H.o(z)
z=C.CD.yu(y-z)}return z},"$2","gQ2",4,0,12],
Lc:[function(a,b){return J.XH(J.aF(J.Tf(b,0),J.Tf(a,0)))},"$2","gkk",4,0,12],
rt:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.kX
y=a.NH
this.Ab=-1
this.ZG=!0
if(this.fr)a.Zz()
if(b.c==null)b.Zz()
x=b.NH
x.C9(b.dy)
this.mT.xu(b.e1).tv(0,x)
w=this.nz
w.Cb(this.mT)
if(this.dy)this.Aj(a)
this.rG(this.x1,a,b)
v=this.y1.a
v.Q=0
v.a=0
v.b=0
v.c=0
this.Tm(d)
if(this.ch||c)this.EY(0,this.cx,this.cy,this.db)
u=a.TQ
t=u.length
for(v=this.dx,s=0;s<t;++s){if(s>=u.length)return H.e(u,s)
r=u[s]
q=r.a
r.d=!1
if(q.k3)if(!(!!q.$isba||!1)||!q.r2||w.tg(0,q)){p=x.R(0,q.gY7())
q.ej=p
p=S.Rc(p)
q.lZ=p
p.r3()
o=q.gTV()
if(o!=null){r.c=o
r.b=null}r.d=!0
if(v){p=q.gY7().m7()
this.IL=p
p.Kj(this.mT)
r.e=this.IL.Q[2]}}}if(v)J.LH(u,this.gQ2())
u=a.ca
t=u.length
for(s=0;s<t;++s){if(s>=u.length)return H.e(u,s)
r=u[s]
q=r.a
if(q.k3){w=x.R(0,q.gY7())
q.ej=w
w=S.Rc(w)
q.lZ=w
w.r3()
n=q.gTV()
if(n.cy){r.c=n
r.b=null}else{r.b=n
r.c=null}}}this.Sp(0)
this.Ga(a.TQ,!0,"opaque",b,z,y,!1,null)
this.CI(a.ca,"opaque",b,z,y,!1,null)
this.Ga(a.TQ,!1,"transparent",b,z,y,!0,null)
this.CI(a.ca,"transparent",b,z,y,!0,null)
this.rG(this.x2,a,b)
this.Mt(!0)
this.Lr(!0)},
pO:function(a,b){return this.rt(a,b,!1,null)},
rG:function(a,b,c){C.Nm.aN(a,new S.bw(this,b,c))},
Ga:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r,q
if(b){z=a.length-1
y=-1
x=-1}else{y=a.length
z=0
x=1}for(w=c==="opaque",v=z,u=null,t=null,s=null;v!==y;v+=x){if(v<0||v>=a.length)return H.e(a,v)
r=a[v]
if(r.d){u=r.a
t=r.Q
s=w?r.b:r.c
if(s==null)continue
if(g)this.pu(s.e,s.x,s.f,s.r)
this.Mt(s.db)
q=s.dx
if(this.pn!==q){J.cl(this.a,q)
this.pn=q}this.yF(s.z,s.ch,s.cx)
this.Lu(s)
this.OI(d,e,f,s,t,u)}}},
CI:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z=a.length
for(y=null,x=0;x<z;++x){if(x>=a.length)return H.e(a,x)
w=a[x]
v=w.a
if(v.k3){y=w.p(0,b)
if(!y)continue
if(f)this.pu((!0).glU(),(!0).gRu(!0),(!0).gE4(),(!0).gbj())
this.Mt((!0).gDJ())
u=(!0).gLP()
J.cl(this.a,u)
this.pn=u
this.yF((!0).gJs(!0),(!0).gUY(),(!0).ghO())
this.k6(c,d,e,y,v)}}},
k6:function(a,b,c,d,e){var z=this.E9(a,b,c,d,e)
this.zR=-1
this.Lu(d)
e.dd(new S.fz(this,d,z))},
j2:function(a,b){var z,y,x,w,v,u
z=P.u5()
a.szu(P.u5())
y=a.e.length
for(x=0;x<y;++x){w=a.e
if(x>=w.length)return H.e(w,x)
if(z.p(0,"0")==null)z.q(0,"0",P.Td(["hash","0","counter",0]))
v=H.d(J.Tf(z.p(0,"0"),"hash"))+"_"+H.d(J.Tf(z.p(0,"0"),"counter"))
if(a.gzu().p(0,v)==null){w=a.gzu()
u=new S.nP(null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
u.b$=[]
u.c$=[]
u.f$=H.BU("0",null,null)
u.a$=0
u.d$=0
u.e$=0
w.q(0,v,u)}w=a.gzu().p(0,v).a$
if(typeof w!=="number")return w.g()
if(w+4>65535){w=z.p(0,"0")
u=J.U6(w)
u.q(w,"counter",J.WB(u.p(w,"counter"),1))
v=H.d(J.Tf(z.p(0,"0"),"hash"))+"_"+H.d(J.Tf(z.p(0,"0"),"counter"))
if(a.gzu().p(0,v)==null){w=a.gzu()
u=new S.nP(null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
u.b$=[]
u.c$=[]
u.f$=H.BU("0",null,null)
u.a$=0
u.d$=0
u.e$=0
w.q(0,v,u)}}a.gzu().p(0,v).c$.push(x)
w=a.gzu().p(0,v)
u=w.a$
if(typeof u!=="number")return u.g()
w.a$=u+4}a.sam([])
a.gzu().aN(0,new S.Ar(this,a))
return},
Aj:function(a){var z,y,x,w
if(a.TQ==null){a.TQ=[]
a.ca=[]
a.Jc=[]
a.cw=[]}for(;z=a.RZ,z.length>0;){this.D9(z[0],a)
C.Nm.W4(a.RZ,0)}for(;z=a.ij,z.length>0;){z=z[0]
if(!z.$isba)y=!!z.$isWP
else y=!0
if(y)this.KR(a.TQ,z)
z.y2=!1
C.Nm.W4(a.ij,0)}for(x=a.TQ.length,w=0;w<x;++w){z=a.TQ
if(w>=z.length)return H.e(z,w)
this.Md(z[w].a)}},
D9:function(a,b){var z,y,x,w
z=a.x1
if(!a.y1){a.y1=!0
y=new T.aI(new Float32Array(16))
y.xI()
a.ej=y
a.lZ=new T.No(new Float32Array(9))
if(z!=null&&!z.gAn())z.sAn(!0)
if(!!a.$isba){x=a.NH
if(a.x1 instanceof S.mP&&!0){if(z.gzu()==null)this.j2(z,x)
z.gzu().aN(0,new S.cm(this,a,z))}}else if(!!a.$isWP)if(z.gdX()==null){z.sdX(J.Rw(this.a))
z.sVV(J.Rw(this.a))
z.slw(J.Rw(this.a));++this.y1.Q.a
w=z.a.length
y=w*3
z.sbZ(new Float32Array(y))
z.sGV(new Float32Array(y))
z.sjN(new Float32Array(w))
z.sJ2(w)
this.k0(z,a)
z.id=!0
z.k1=!0
z.ry=!0}}if(!a.y2){if(!!a.$isba)z.gzu().aN(0,new S.ma(this,a,b))
else{y=!!a.$isWP||!1
if(y)b.TQ.push(new S.QV(z,a,null,null,!0,0))}a.y2=!0}},
Md:function(a){var z,y,x,w,v,u,t
z=a.x1
if(!!a.$isba){for(y=z.gam().length,x=!z.fx,w=0;w<y;++w){v=z.gam()
if(w>=v.length)return H.e(v,w)
u=v[w]
t=a.NH
if(z.r2)this.bq(u,a)
if(z.id||z.rx||z.k2||z.k3||z.k4||z.k1||z.r1||!1)this.Pb(u,a,35048,x,t)}z.id=!1
z.rx=!1
z.k2=!1
z.k3=!1
z.k4=!1
z.k1=!1
z.r1=!1
z.r2=!1}else if(!!a.$isWP){if(z.id||z.k1||z.ry||!1)this.Nn(z,35048)
z.id=!1
z.k1=!1
z.ry=!1}},
KR:function(a,b){var z
for(z=a.length-1;z>=0;--z){if(z>=a.length)return H.e(a,z)
if(a[z].a===b)C.Nm.W4(a,z)}},
YV:function(a6,a7,a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(!!a6.$iskP)z="basic"
else if(!!a6.$iskD)z="phong"
else if(!!a6.$isws)z="basic"
else z=null
if(z!=null){y=S.ci().p(0,z)
a6.k3=S.Gn(y.p(0,"uniforms"))
a6.k2=y.p(0,"vertexShader")
a6.k1=y.p(0,"fragmentShader")}x=this.wr(a7)
w=this.Fn(a7)
v=this.iA(a9)
y=a6.k1
u=a6.k2
t=a6.k3
s=!!a6.$isyp
r=s?a6.zR:P.u5()
s=s?a6.Ky:P.u5()
q=!!a6.$isvf?a6.gIr(a6):null
p=!!a6.$isCc
o=p?a6.gKK():null
n=p?a6.gVv():null
p=p?a6.gM6():null
m=a6.go
l=a6.fy
k=!!a6.$isFQ&&a6.gqB()
if(this.EJ===!0);j=!!a6.$isqL
i=j&&a6.gkD()
h=j&&a6.gh0()
g=this.r2
f=this.rx
e=x.p(0,"directional")
d=x.p(0,"point")
c=x.p(0,"spot")
b=x.p(0,"hemi")
a=this.id&&a9.r1
a0=!!a6.$iskD
a1=a0&&a6.x2
a0=a0&&a6.y1
a2=!!a6.$isJr&&a6.y2
a3=a6.b
a2=this.SZ(z,y,u,t,r,s,a6.y,0,0,null,a3===2,o,a3===1,a8,!1,n,q,v,e,b,f,g,d,w,c,a1,h,i,null,a0,this.k3,this.k2,a,this.k4,!1,k,p,l,!1,m,a2)
a6.id=a2
a4=a2.d
if(j&&a6.gkD()){H.Go(a6,"$isqL")
a6.sA7(0)
for(a5=0;a5<g;++a5){y=a4.p(0,"morphTarget"+a5)
if(typeof y!=="number")return y.C()
if(y>=0)a6.sA7(a6.gA7()+1)}}if(j&&a6.gh0()){H.Go(a6,"$isqL")
a6.soJ(0)
for(a5=0;a5<f;++a5){y=a4.p(0,"morphNormal"+a5)
if(typeof y!=="number")return y.C()
if(y>=0)a6.soJ(a6.goJ()+1)}}a6.k4=[]
a6.k3.aN(0,new S.Rm(a6))},
E9:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
this.pV=0
if(d.fx){if(d.id!=null)this.xq(d)
this.YV(d,b,c,e)
d.fx=!1}z=J.t(d)
if(!!z.$isqL&&d.gkD()){H.Go(e,"$isba")
if(e.pn==null)e.pn=new Float32Array(H.T0(this.r2))}y=d.id
x=y.e
w=d.k3
v=this.ej
if(y==null?v!=null:y!==v){J.jO(this.a,y.a)
this.ej=y
u=!0}else u=!1
v=d.a
if(v!==this.Ab){this.Ab=v
u=!0}if(u||a!==this.Ky){J.pL(this.a,x.p(0,"projectionMatrix"),!1,a.e1.Q)
if(a!==this.Ky)this.Ky=a}if(u){v=!!z.$iskD
t=!v
if(t)s=!!z.$isyp&&d.y1
else s=!0
if(s){if(this.ZG){this.Tx(y,b)
this.ZG=!1}s=this.S8
J.eW(w.p(0,"ambientLightColor"),s.p(0,"ambient"))
J.eW(w.p(0,"directionalLightColor"),J.Tf(s.p(0,"directional"),"colors"))
J.eW(w.p(0,"directionalLightDirection"),J.Tf(s.p(0,"directional"),"positions"))
J.eW(w.p(0,"pointLightColor"),J.Tf(s.p(0,"point"),"colors"))
J.eW(w.p(0,"pointLightPosition"),J.Tf(s.p(0,"point"),"positions"))
J.eW(w.p(0,"pointLightDistance"),J.Tf(s.p(0,"point"),"distances"))
J.eW(w.p(0,"spotLightColor"),J.Tf(s.p(0,"spot"),"colors"))
J.eW(w.p(0,"spotLightPosition"),J.Tf(s.p(0,"spot"),"positions"))
J.eW(w.p(0,"spotLightDistance"),J.Tf(s.p(0,"spot"),"distances"))
J.eW(w.p(0,"spotLightDirection"),J.Tf(s.p(0,"spot"),"directions"))
J.eW(w.p(0,"spotLightAngleCos"),J.Tf(s.p(0,"spot"),"anglesCos"))
J.eW(w.p(0,"spotLightExponent"),J.Tf(s.p(0,"spot"),"exponents"))
J.eW(w.p(0,"hemisphereLightSkyColor"),J.Tf(s.p(0,"hemi"),"skyColors"))
J.eW(w.p(0,"hemisphereLightGroundColor"),J.Tf(s.p(0,"hemi"),"groundColors"))
J.eW(w.p(0,"hemisphereLightDirection"),J.Tf(s.p(0,"hemi"),"positions"))}if(!z.$iskP)s=v
else s=!0
if(s){J.eW(w.p(0,"opacity"),d.d)
s=this.fx
if(s)J.SW(w.p(0,"diffuse")).wN(d.c)
else J.eW(w.p(0,"diffuse"),d.c)
r=!!z.$isvf
if(r)J.eW(w.p(0,"map"),z.gIr(d))
q=!!z.$isCc
if(q){J.eW(w.p(0,"lightMap"),d.gVv())
J.eW(w.p(0,"specularMap"),d.gM6())}if(r)z.gIr(d)
if(q)d.gM6()
if(q){J.eW(w.p(0,"envMap"),d.gKK())
r=w.p(0,"flipEnvMap")
d.gKK()
J.eW(r,-1)
if(s)J.eW(w.p(0,"reflectivity"),d.gNI())
else J.eW(w.p(0,"reflectivity"),d.gNI())
J.eW(w.p(0,"refractionRatio"),d.gw0())
J.eW(w.p(0,"combine"),d.gxe())
s=w.p(0,"useRefract")
d.gKK()
J.eW(s,0)}}if(!!z.$isws){J.eW(w.p(0,"diffuse"),d.c)
J.eW(w.p(0,"opacity"),d.d)}else if(v){J.eW(w.p(0,"shininess"),d.x1)
v=d.r2
s=d.rx
r=d.ry
if(this.fx){J.SW(w.p(0,"ambient")).wN(v)
J.SW(w.p(0,"emissive")).wN(s)
J.SW(w.p(0,"specular")).wN(r)}else{J.eW(w.p(0,"ambient"),v)
J.eW(w.p(0,"emissive"),s)
J.eW(w.p(0,"specular"),r)}if(d.y2)J.SW(w.p(0,"wrapRGB")).Ze(d.TB)}if(e.r1&&!d.r1)this.it(w,b)
this.UO(y,d.k4)
v=!z.$isyp
if(v)if(t){if(!!z.$isCc)d.gKK()
s=!1}else s=!0
else s=!0
if(s)if(x.p(0,"cameraPosition")!=null){this.IL=a.dy.m7()
s=this.a
r=x.p(0,"cameraPosition")
q=this.IL.Q
J.je(s,r,q[0],q[1],q[2])}if(t)if(v)z=!!z.$isFQ&&d.gqB()
else z=!0
else z=!0
if(z)if(x.p(0,"viewMatrix")!=null)J.pL(this.a,x.p(0,"viewMatrix"),!1,a.NH.Q)}z=this.a
v=x.p(0,"modelViewMatrix")
t=e.ej
J.pL(z,v,!1,t.gEv(t))
if(x.p(0,"normalMatrix")!=null)J.w6(this.a,x.p(0,"normalMatrix"),!1,e.lZ.Q)
if(x.p(0,"modelMatrix")!=null){z=this.a
v=x.p(0,"modelMatrix")
t=e.gY7()
J.pL(z,v,!1,t.gEv(t))}return y},
it:function(a,b){var z,y,x,w,v,u
if(a.NZ(0,"shadowMatrix"))for(z=b.length,y=0,x=0;x<z;++x){if(x>=b.length)return H.e(b,x)
w=b[x]
if(!w.goo())continue
v=!!w.$isja&&!w.l4
if(v){u=y+1
if(J.UN(J.wS(J.SW(a.p(0,"shadowMap"))),u)){J.Ud(J.SW(a.p(0,"shadowMap")),u)
J.Ud(J.SW(a.p(0,"shadowMapSize")),u)
J.Ud(J.SW(a.p(0,"shadowMatrix")),u)
J.Ud(J.SW(a.p(0,"shadowDarkness")),u)
J.Ud(J.SW(a.p(0,"shadowBias")),u)}J.C7(J.SW(a.p(0,"shadowMap")),y,w.gJM())
J.C7(J.SW(a.p(0,"shadowMapSize")),y,w.Jr)
J.C7(J.SW(a.p(0,"shadowMatrix")),y,w.TO)
J.C7(J.SW(a.p(0,"shadowDarkness")),y,w.Jc)
J.C7(J.SW(a.p(0,"shadowBias")),y,w.ca)
y=u}}},
m8:function(){var z,y,x
z=this.pV
y=this.Ht
if(typeof y!=="number")return H.o(y)
if(z>=y){x="WebGLRenderer: trying to use "+z+" texture units while this GPU supports only "+H.d(this.Ht)
H.qw(x)}++this.pV
return z},
UO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b.length
for(y=a.e,x=null,w=null,v=null,u=null,t=null,s=null,r=null,q=0;q<z;++q){if(q>=b.length)return H.e(b,q)
p=y.p(0,b[q][1])
if(p==null)continue
if(q>=b.length)return H.e(b,q)
x=b[q][0]
v=J.zH(x)
w=x.gYC()
if(v==="i")J.X6(this.a,p,w)
else if(v==="f")J.Gj(this.a,p,w)
else if(v==="v2"){o=J.RE(w)
J.OV(this.a,p,o.gx(w),o.gy(w))}else if(v==="v3"){o=J.RE(w)
J.je(this.a,p,o.gx(w),o.gy(w),o.gz(w))}else if(v==="v4"){o=J.RE(w)
J.h7(this.a,p,o.gx(w),o.gy(w),o.gz(w),o.gES(w))}else if(v==="c"){o=J.RE(w)
J.je(this.a,p,o.gr(w),w.gUI(),o.gb(w))}else if(v==="iv1")J.xR(this.a,p,w)
else if(v==="iv")J.Q0(this.a,p,w)
else if(v==="fv1")J.hu(this.a,p,w)
else if(v==="fv")J.mk(this.a,p,w)
else if(v==="v2v")J.v6(this.a,p,w)
else if(v==="v3v")J.mk(this.a,p,w)
else if(v==="v4v")J.vt(this.a,p,w)
else if(v==="m2")J.c0(this.a,p,!1,w)
else if(v==="m3")J.w6(this.a,p,!1,w)
else if(v==="m4")J.pL(this.a,p,!1,w)
else if(v==="m4v")J.pL(this.a,p,!1,w)
else if(v==="t"){u=x.a
t=this.m8()
J.X6(this.a,p,t)
if(u==null)continue
u.gwW()
this.xa(u,t)}else if(v==="tv"){n=x.a
o=J.w1(n)
m=new Int32Array(H.XF(J.qA(o.ez(n,new S.nA(this)))))
x.c=m
J.xR(this.a,p,m)
r=o.gv(n)
if(typeof r!=="number")return H.o(r)
s=0
for(;s<r;++s){u=J.Tf(x.a,s)
o=x.c
if(s>=o.length)return H.e(o,s)
t=o[s]
if(u==null)continue
this.xa(u,t)}}}},
yI:function(a,b,c,d){var z,y
z=J.RE(c)
y=J.w1(a)
y.q(a,b,z.gr(c)*z.gr(c)*d)
y.q(a,b+1,c.gUI()*c.a*d)
z=c.b
y.q(a,b+2,z*z*d)},
vv:function(a,b,c,d){var z,y
z=J.Y3(c)
if(typeof d!=="number")return H.o(d)
y=J.w1(a)
y.q(a,b,z*d)
y.q(a,b+1,c.gUI()*d)
y.q(a,b+2,c.b*d)},
Tx:function(b4,b5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.S8
y=J.Tf(z.p(0,"directional"),"colors")
x=J.Tf(z.p(0,"directional"),"positions")
w=J.Tf(z.p(0,"point"),"colors")
J.Tf(z.p(0,"point"),"positions")
v=J.Tf(z.p(0,"point"),"distances")
u=J.Tf(z.p(0,"spot"),"colors")
J.Tf(z.p(0,"spot"),"positions")
J.Tf(z.p(0,"spot"),"distances")
J.Tf(z.p(0,"spot"),"directions")
J.Tf(z.p(0,"spot"),"anglesCos")
J.Tf(z.p(0,"spot"),"exponents")
t=J.Tf(z.p(0,"hemi"),"skyColors")
s=J.Tf(z.p(0,"hemi"),"groundColors")
J.Tf(z.p(0,"hemi"),"positions")
r=b5.length
for(q=this.fx,p=J.U6(y),o=J.U6(x),n=0,m=0,l=0,k=0,j=null,i=null,h=null,g=null,f=null,e=null,d=null,c=0,b=0,a=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0;n<r;++n){if(n>=b5.length)return H.e(b5,n)
a9=b5[n]
b0=J.t(a9)
b1=!!b0.$isja
b2=!b1
if((!b2||!1)&&a9.gRl()||b0.gwx(a9)!==!0)continue
j=b0.gih(a9)
if(b2)b2=!1
else b2=!0
if(b2){g=a9.gcg()
d=a9.kZ}if(!!b0.$ismq){if(!a9.k3)continue
b0=J.RE(j)
if(q){m+=b0.gr(j)*b0.gr(j)
l+=j.gUI()*j.a
b0=j.b
k+=b0*b0}else{m+=b0.gr(j)
l+=j.gUI()
k+=j.b}}else if(b1){++a1
if(!a9.k3)continue
this.TO=a9.dy.m7()
b0=a9.Y0.dy.m7()
this.IL=b0
this.TO.XF(b0)
this.TO.p3(0)
b0=this.TO.Q
if(b0[0]===0&&b0[1]===0&&b0[2]===0)continue
a5=c*3
b0=a5+3
p.sv(y,b0)
o.sv(x,b0)
o.q(x,a5,this.TO.Q[0])
o.q(x,a5+1,this.TO.Q[1])
o.q(x,a5+2,this.TO.Q[2])
if(q){if(typeof g!=="number")return g.R()
this.yI(y,a5,j,g*g)}else this.vv(y,a5,j,g);++c}}r=P.u(p.gv(y),a1*3)
for(n=c*3;n<r;++n)p.q(y,n,0)
q=J.U6(w)
r=P.u(q.gv(w),a2*3)
for(n=b*3;n<r;++n)q.q(w,n,0)
q=J.U6(u)
r=P.u(q.gv(u),a3*3)
for(n=a*3;n<r;++n)q.q(u,n,0)
q=J.U6(t)
p=a4*3
r=P.u(q.gv(t),p)
for(n=a0*3,b3=n;b3<r;++b3)q.q(t,b3,0)
q=J.U6(s)
r=P.u(q.gv(s),p)
for(;n<r;++n)q.q(s,n,0)
J.C7(z.p(0,"directional"),"length",c)
J.C7(z.p(0,"point"),"length",b)
J.C7(z.p(0,"spot"),"length",a)
J.C7(z.p(0,"hemi"),"length",a0)
J.C7(z.p(0,"ambient"),0,m)
J.C7(z.p(0,"ambient"),1,l)
J.C7(z.p(0,"ambient"),2,k)},
Lu:function(a){var z,y,x
z=a.b
y=z===2
x=z===1
if(this.DN!==y){z=this.a
if(y)J.c2(z,2884)
else J.aS(z,2884)
this.DN=y}if(this.C7!==x){z=this.a
if(x)J.Hd(z,2304)
else J.Hd(z,2305)
this.C7=x}},
Mt:function(a){var z
if(this.lq!==a){z=this.a
if(a)J.aS(z,2929)
else J.c2(z,2929)
this.lq=a}},
Lr:function(a){if(this.pn!==a){J.cl(this.a,a)
this.pn=a}},
yF:function(a,b,c){var z
if(this.NH!==a){z=this.a
if(a)J.aS(z,32823)
else J.c2(z,32823)
this.NH=a}if(a)z=this.e1!==b||this.LD!==c
else z=!1
if(z){J.yR(this.a,b,c)
this.e1=b
this.LD=c}},
pu:function(a,b,c,d){var z
if(a!==this.Va){if(a===0)J.c2(this.a,3042)
else if(a===2){J.aS(this.a,3042)
J.xm(this.a,32774)
J.FL(this.a,770,1)}else if(a===3){J.aS(this.a,3042)
J.xm(this.a,32774)
J.FL(this.a,0,769)}else if(a===4){J.aS(this.a,3042)
J.xm(this.a,32774)
J.FL(this.a,0,768)}else{z=this.a
if(a===5)J.aS(z,3042)
else{J.aS(z,3042)
J.lg(this.a,32774,32774)
J.Ha(this.a,770,771,1,771)}}this.Va=a}if(a===5){z=this.Uu
if(b==null?z!=null:b!==z){J.xm(this.a,this.V8(b))
this.Uu=b}z=this.j3
if(c==null?z==null:c===z){z=this.iU
z=d==null?z!=null:d!==z}else z=!0
if(z){J.FL(this.a,this.V8(c),this.V8(d))
this.j3=c
this.iU=d}}else{this.Uu=null
this.j3=null
this.iU=null}},
Sp:function(a){return this.pu(a,null,null,null)},
yx:function(a){var z,y
z={}
z.Q=null
y=[]
a.aN(0,new S.My(z,y))
return C.Nm.zV(y,"\n")},
SZ:function(b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8
z={}
y=[]
if(b9!=null)y.push(b9)
else{y.push(c0)
y.push(c1)}c4.aN(0,new S.Om(y))
x=C.Nm.EE(y)+"maxDirLights"+d7+"maxPointLights"+e1+"maxSpotLights"+e3+"maxHemiLights"+d8+"maxShadows"+e2+"maxBones"+H.d(d6)+"map"+H.d(d5)+"envMap"+H.d(d0)+"lightMap"+H.d(d4)+"bumpMap"+H.d(c8)+"normalMap"+H.d(e7)+"specularMap"+H.d(f5)+"vertexColors"+f8+"fog"+H.d(d2)+"useFog"+f6+"fogExp"+d3+"skinning"+f4+"useVertexTexture"+f7+"boneTextureWidth"+c7+"boneTextureHeight"+c6+"morphTargets"+e6+"morphNormals"+e5+"perPixel"+e8+"wrapAround"+f9+"doubleSided"+c9+"flipSided"+d1+"shadowMapEnabled"+f1+"shadowMapType"+f2+"shadowMapDebug"+f0+"shadowMapCascade"+e9+"sizeAttenuation"+f3
w=this.y2
v=w.length
for(u=0;u<v;++u){t=w[u]
if(t.b===x){++t.c
return t}}if(f2===1)s="SHADOWMAP_TYPE_PCF"
else s=f2===2?"SHADOWMAP_TYPE_PCF_SOFT":"SHADOWMAP_TYPE_BASIC"
r=this.yx(c4)
q=J.Dn(this.a)
w="precision "+this.b+" float;"
p=this.jq===!0?"#define VERTEX_TEXTURES":""
o=this.fx
n=o?"#define GAMMA_INPUT":""
m=this.fy
l=m?"#define GAMMA_OUTPUT":""
k=this.go
j=k?"#define PHYSICALLY_BASED_SHADING":""
i="#define MAX_DIR_LIGHTS "+d7
h="#define MAX_POINT_LIGHTS "+e1
g="#define MAX_SPOT_LIGHTS "+e3
f="#define MAX_HEMI_LIGHTS "+d8
e="#define MAX_SHADOWS "+e2
d="#define MAX_BONES "+H.d(d6)
c=f8!==0?"#define USE_COLOR":""
b=f4?"#define USE_SKINNING":""
a=f7?"#define BONE_TEXTURE":""
a0="#define N_BONE_PIXEL_X "+C.jn.Sy(c7,1)
a1="#define N_BONE_PIXEL_Y "+C.jn.Sy(c6,1)
a2=e6?"#define USE_MORPHTARGETS":""
a3=e5?"#define USE_MORPHNORMALS":""
a4=e8?"#define PHONG_PER_PIXEL":""
a5=f9?"#define WRAP_AROUND":""
a6=c9?"#define DOUBLE_SIDED":""
a7=d1?"#define FLIP_SIDED":""
a8=f1?"#define USE_SHADOWMAP":""
a9=f1?"#define "+s:""
b0=f0?"#define SHADOWMAP_DEBUG":""
b1=e9?"#define SHADOWMAP_CASCADE":""
b2=C.Nm.zV([w,r,p,n,l,j,i,h,g,f,e,d,"","","","","","",c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,f3?"#define USE_SIZEATTENUATION":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","attribute vec2 uv2;","#ifdef USE_COLOR","attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","attribute vec3 morphTarget0;","attribute vec3 morphTarget1;","attribute vec3 morphTarget2;","attribute vec3 morphTarget3;","#ifdef USE_MORPHNORMALS","attribute vec3 morphNormal0;","attribute vec3 morphNormal1;","attribute vec3 morphNormal2;","attribute vec3 morphNormal3;","#else","attribute vec3 morphTarget4;","attribute vec3 morphTarget5;","attribute vec3 morphTarget6;","attribute vec3 morphTarget7;","#endif","#endif","#ifdef USE_SKINNING","attribute vec4 skinIndex;","attribute vec4 skinWeight;","#endif",""],"\n")
w="precision "+this.b+" float;"
p="#define MAX_DIR_LIGHTS "+d7
n="#define MAX_POINT_LIGHTS "+e1
l="#define MAX_SPOT_LIGHTS "+e3
j="#define MAX_HEMI_LIGHTS "+d8
i="#define MAX_SHADOWS "+e2
h=c5!==0?"#define ALPHATEST "+c5:""
o=o?"#define GAMMA_INPUT":""
m=m?"#define GAMMA_OUTPUT":""
k=k?"#define PHYSICALLY_BASED_SHADING":""
if(f6);if(f6);g=f8!==0?"#define USE_COLOR":""
f=e4?"#define METAL":""
e=e8?"#define PHONG_PER_PIXEL":""
d=f9?"#define WRAP_AROUND":""
c=c9?"#define DOUBLE_SIDED":""
b=d1?"#define FLIP_SIDED":""
a=f1?"#define USE_SHADOWMAP":""
a0=f1?"#define "+s:""
a1=f0?"#define SHADOWMAP_DEBUG":""
b3=this.F3("fragment",C.Nm.zV([w,"",r,"",p,n,l,j,i,h,o,m,k,"","","","","","","","",g,f,e,d,c,b,a,a0,a1,e9?"#define SHADOWMAP_CASCADE":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",""],"\n")+H.d(c0))
b4=this.F3("vertex",b2+H.d(c1))
J.YS(this.a,q,b4)
J.YS(this.a,q,b3)
J.S8(this.a,q)
if(J.U3(this.a,q,35714)!==!0){b5=J.U3(this.a,q,35715)
b6=J.AP(this.a)
P.JS("Could not initialise shader\nVALIDATE_STATUS: "+H.d(b5)+", gl error ["+H.d(b6)+"]")}J.Vm(this.a,b3)
J.Vm(this.a,b4)
w=this.TB++
p=P.u5()
t=new S.V3(w,q,x,1,P.u5(),p)
z.Q=null
b7=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","modelMatrix","cameraPosition","morphTargetInfluences"]
z.Q=b7
if(f7)b7.push("boneTexture")
else b7.push("boneGlobalMatrices")
c2.aN(0,new S.fU(z))
this.bD(t,z.Q)
z.Q=["position","normal","uv","uv2","tangent","color","skinIndex","skinWeight","lineDistance"]
for(b8=0;b8<e0;++b8)z.Q.push("morphTarget"+b8)
for(b8=0;b8<d9;++b8)z.Q.push("morphNormal"+b8)
if(c3!=null)c3.aN(0,new S.Eg(z))
this.b2(t,z.Q)
this.y2.push(t)
this.y1.Q.Q=this.y2.length
return t},
bD:function(a,b){var z,y,x,w,v
z=b.length
for(y=a.e,x=a.a,w=0;w<z;++w){if(w>=b.length)return H.e(b,w)
v=b[w]
y.q(0,v,J.a5(this.a,x,v))}},
b2:function(a,b){var z,y,x,w,v
z=b.length
for(y=a.d,x=a.a,w=0;w<z;++w){if(w>=b.length)return H.e(b,w)
v=b[w]
y.q(0,v,J.E4(this.a,x,v))}},
Ly:function(a){var z,y,x,w,v
z=a.split("\n")
y=z.length
for(x=0;x<y;x=w){w=x+1
v=""+w+":"
if(x>=z.length)return H.e(z,x)
v+=H.d(z[x])
if(x>=z.length)return H.e(z,x)
z[x]=v}return C.Nm.zV(z,"\n")},
F3:function(a,b){var z
if(a==="fragment")z=J.lA(this.a,35632)
else z=a==="vertex"?J.lA(this.a,35633):null
J.Rb(this.a,z,b)
J.Ef(this.a,z)
if(J.cN(this.a,z,35713)!==!0){P.JS(J.bM(this.a,z))
P.JS(this.Ly(b))
return}return z},
df:function(a,b,c){var z,y,x
z=this.a
y=b.e
x=b.f
if(c){J.Lb(z,a,10242,this.V8(b.c))
J.Lb(this.a,a,10243,this.V8(b.d))
J.Lb(this.a,a,10240,this.V8(y))
J.Lb(this.a,a,10241,this.V8(x))}else{J.Lb(z,a,10242,33071)
J.Lb(this.a,a,10243,33071)
J.Lb(this.a,a,10240,this.lW(y))
J.Lb(this.a,a,10241,this.lW(x))}if(this.kZ!=null&&b.x!==15){z=b.y
if(z>1||b.gMq().p(0,"__oldAnisotropy")!=null){J.Q3(this.a,a,34046,P.C(z,this.eD))
b.gMq().q(0,"__oldAnisotropy",z)}}},
xa:function(a,b){var z,y
if(a.gQg()){if(a.p(0,"__webglInit")==null){a.q(0,"__webglInit",!0)
a.q(0,"__webglTexture",J.Jw(this.a));++this.y1.Q.b}J.ED(this.a,33984+b)
J.cZ(this.a,3553,a.p(0,"__webglTexture"))
z=this.a
J.bN(z,37440,a.dy?1:0)
z=this.a
J.bN(z,37441,a.cy?1:0)
J.bN(this.a,3317,a.fr)
z=C.jN.gN(a.a)
z.i(0,z.T(0,1))
this.V8(a.r)
this.V8(a.x)
this.df(3553,a,!1)
y=a.fx
if(y.length>0);if(a.gAJ());a.db=!1}else{J.ED(this.a,33984+b)
J.cZ(this.a,3553,a.p(0,"__webglTexture"))}},
iZ:function(a,b,c){var z,y
J.LF(this.a,36160,a)
z=this.a
y=b.go
if(y==null){y=P.u5()
b.go=y}J.Mo(z,36160,36064,c,y.p(0,"__webglTexture"),0)},
SV:function(a,b){var z,y,x,w
J.pX(this.a,36161,a)
z=b.k4
if(z&&!b.r1){J.MT(this.a,36161,33189,b.id,b.k1)
J.MV(this.a,36160,36096,36161,a)}else{z=z&&b.r1
y=b.id
x=this.a
w=b.k1
if(z){J.MT(x,36161,34041,y,w)
J.MV(this.a,36160,33306,36161,a)}else J.MT(x,36161,32854,y,w)}},
Tm:function(a){var z,y,x,w,v,u,t,s,r,q
z=a!=null
if(z&&a.ry==null){y=J.Jw(this.a)
a.gMq().q(0,"__webglTexture",y);++this.y1.Q.b
y=a.id
if((y&y-1)===0){y=a.k1
x=(y&y-1)===0}else x=!1
w=this.V8(a.r)
v=this.V8(a.x)
a.ry=J.l3(this.a)
a.x1=J.Wb(this.a)
J.cZ(this.a,3553,a.gMq().p(0,"__webglTexture"))
this.df(3553,a,x)
J.oq(this.a,3553,0,w,a.id,a.k1,0,w,v,null)
this.iZ(a.ry,a,3553)
this.SV(a.x1,a)
if(x)J.cq(this.a,3553)
J.cZ(this.a,3553,null)
J.pX(this.a,36161,null)
J.LF(this.a,36160,null)}if(z){u=a.ry
t=a.id
s=a.k1
r=0
q=0}else{t=this.TQ
s=this.ca
r=this.RZ
q=this.ij
u=null}z=this.lZ
if(u==null?z!=null:u!==z){J.LF(this.a,36160,u)
J.N6(this.a,r,q,t,s)
this.lZ=u}this.Jc=t
this.cw=s},
lW:function(a){if(a===3||a===4||a===5)return 9728
return 9729},
V8:function(a){if(a===0)return 10497
if(a===1)return 33071
if(a===2)return 33648
if(a===3)return 9728
if(a===4)return 9984
if(a===5)return 9986
if(a===6)return 9729
if(a===7)return 9985
if(a===8)return 9987
if(a===10)return 5121
if(a===1016)return 32819
if(a===1017)return 32820
if(a===1018)return 33635
if(a===9)return 5120
if(a===11)return 5122
if(a===12)return 5123
if(a===13)return 5124
if(a===14)return 5125
if(a===15)return 5126
if(a===16)return 6406
if(a===17)return 6407
if(a===18)return 6408
if(a===19)return 6409
if(a===20)return 6410
if(a===100)return 32774
if(a===101)return 32778
if(a===102)return 32779
if(a===200)return 0
if(a===201)return 1
if(a===202)return 768
if(a===203)return 769
if(a===204)return 770
if(a===205)return 771
if(a===206)return 772
if(a===207)return 773
if(a===208)return 774
if(a===209)return 775
if(a===210)return 776
if(this.Rj!=null){if(a===2001)return 33776
if(a===2002)return 33777
if(a===2003)return 33778
if(a===2004)return 33779}return 0},
iA:function(a){var z,y
if(this.EJ===!0);z=J.uB(this.a,36347)
if(typeof z!=="number")return z.T()
y=C.jn.yu(C.CD.yu(Math.floor((z-20)/4)))
return y},
wr:function(a){var z,y,x,w,v
z=a.length
for(y=0,x=0;y<z;++y){if(y>=a.length)return H.e(a,y)
w=a[y]
v=w instanceof S.ja
if((v||!1)&&w.gRl())continue
if(v)++x}return P.Td(["directional",x,"point",0,"spot",0,"hemi",0])},
Fn:function(a){var z,y,x,w
z=a.length
for(y=0,x=0;y<z;++y){if(y>=a.length)return H.e(a,y)
w=a[y]
if(!w.goo())continue
if(!!w.$isja&&!w.l4)++x}return x},
Vb:function(){var z,y,x
try{y=J.qN(this.Q,this.f,this.x,this.r,this.z,this.y)
this.a=y
if(y==null)throw H.b("Error creating WebGL context.")}catch(x){y=H.Ru(x)
z=y
P.JS(z)}this.Y0=J.PD(this.a,"OES_texture_float")
this.j4=J.PD(this.a,"OES_standard_derivatives")
y=J.PD(this.a,"EXT_texture_filter_anisotropic")
this.kZ=y
if(y==null){y=J.PD(this.a,"MOZ_EXT_texture_filter_anisotropic")
this.kZ=y}if(y==null)this.kZ=J.PD(this.a,"WEBKIT_EXT_texture_filter_anisotropic")
y=this.Rj
if(y==null){y=J.PD(this.a,"WEBGL_compressed_texture_s3tc")
this.Rj=y}if(y==null){y=J.PD(this.a,"MOZ_WEBGL_compressed_texture_s3tc")
this.Rj=y}if(y==null)this.Rj=J.PD(this.a,"WEBKIT_WEBGL_compressed_texture_s3tc")
if(this.Y0==null)P.JS("THREE.WebGLRenderer: Float textures not supported.")
if(this.j4==null)P.JS("THREE.WebGLRenderer: Standard derivatives not supported.")
if(this.kZ==null)P.JS("THREE.WebGLRenderer: Anisotropic texture filtering not supported.")
if(this.Rj==null)P.JS("THREE.WebGLRenderer: S3TC compressed textures not supported.")},
xs:function(){J.Np(this.a,0,0,0,1)
J.Vk(this.a,1)
J.Zx(this.a,0)
J.aS(this.a,2929)
J.Yi(this.a,515)
J.Hd(this.a,2305)
J.v0(this.a,1029)
J.aS(this.a,2884)
J.aS(this.a,3042)
J.xm(this.a,32774)
J.FL(this.a,770,771)
var z=this.c
J.Np(this.a,z.Q,z.a,z.b,this.d)}},
SC:{
"^":"r:12;Q",
$2:function(a,b){var z
if(b===!0){z=this.Q
J.i3(z.a,H.BU(a,null,null))
z.of.q(0,a,!1)}}},
bw:{
"^":"r:1;Q,a,b",
$1:function(a){var z=this.Q
z.ej=null
z.Ky=null
z.Va=-1
z.lq=-1
z.pn=-1
z.DN=-1
z.C7=-1
z.zR=-1
z.Ab=-1
z.ZG=!0
a.az(this.a,this.b,z.Jc,z.cw)
z.ej=null
z.Ky=null
z.Va=-1
z.lq=-1
z.pn=-1
z.DN=-1
z.C7=-1
z.zR=-1
z.Ab=-1
z.ZG=!0}},
fz:{
"^":"r:1;Q,a,b",
$1:function(a){this.Q.ai(a,this.b,this.a)}},
Ar:{
"^":"r:12;Q,a",
$2:function(a,b){J.to(b,this.Q.bR++)
this.a.gam().push(b)}},
cm:{
"^":"r:12;Q,a,b",
$2:function(a,b){var z
if(b.gdX()==null){z=this.Q
z.Iw(b)
z.bq(b,this.a)
z=this.b
z.id=!0
z.rx=!0
z.k2=!0
z.k3=!0
z.k4=!0
z.r1=!0
z.k1=!0}}},
ma:{
"^":"r:12;Q,a,b",
$2:function(a,b){this.b.TQ.push(new S.QV(b,this.a,null,null,!0,0))}},
Rm:{
"^":"r:12;Q",
$2:function(a,b){return this.Q.k4.push([b,a])}},
nA:{
"^":"r:1;Q",
$1:function(a){return this.Q.m8()}},
My:{
"^":"r:12;Q,a",
$2:function(a,b){var z
if(!J.mG(b,!1)){z="#define "+H.d(a)+" "+H.d(b)
this.Q.Q=z
this.a.push(z)}}},
Om:{
"^":"r:12;Q",
$2:function(a,b){var z=this.Q
z.push(a)
z.push(b)}},
fU:{
"^":"r:12;Q",
$2:function(a,b){return this.Q.Q.push(a)}},
Eg:{
"^":"r:12;Q",
$2:function(a,b){return this.Q.Q.push(a)}},
Vh:{
"^":"a;Q,a",
az:function(a,b,c,d){return this.a.$4(a,b,c,d)}},
Lk:{
"^":"a;Q,a,b"},
AI:{
"^":"a;Q,a,b,c"},
V3:{
"^":"a;jO:Q*,a,b,c,d,e"},
h4:{
"^":"a;Q,a,b"},
nP:{
"^":"a;jO:Q$*,a$,J5:b$<,c$,d$,e$,f$,zu:r$@,am:x$@,dX:y$@,qd:z$?,vh:ch$?,VV:cx$@,lw:cy$@,db$,dx$,dy$,fr$,fx$,fy$,ut:go$<,my:id$<,Ue:k1$<,k2$,An:k3$@,bE:k4$<,bZ:r1$@,r2$,rx$,GV:ry$@,jN:x1$@,x2$,y1$,y2$,TB$,ej$,lZ$,Ab$,zR$,Ky$,bR$,o9:pV$<,J2:of$@,DN$,C7$,Va$,xR:Uu$<"},
QV:{
"^":"a;Q,a,b,c,d,z:e>",
az:function(a,b,c,d){return this.d.$4(a,b,c,d)}},
zt:{
"^":"r:25;Q",
$1:function(a){J.kH(a,new S.cg(this.Q))}},
cg:{
"^":"r:12;Q",
$2:function(a,b){this.Q.q(0,a,J.ir(b))}},
wg:{
"^":"r:12;Q",
$2:function(a,b){this.Q.q(0,a,J.ir(b))}},
SN:{
"^":"a;t5:Q>,a,b,c",
gM:function(a){return this.a},
sM:function(a,b){if(this.Q==="f")b=J.Oq(b)
this.b=!0
this.a=b},
gYC:function(){var z,y,x,w,v,u,t,s,r
if(!this.b&&this.c!=null)return this.c
z=this.Q
if((z==="fv"||z==="fv1")&&!J.t(this.a).$isoI)this.c=new Float32Array(H.XF(J.kl(H.ug(this.a),new S.L8()).br(0)))
else if((z==="iv"||z==="iv1")&&!J.t(this.a).$isvi)this.c=new Int32Array(H.XF(J.kl(H.ug(this.a),new S.mJ()).br(0)))
else if(z==="v2v"){y=H.Cv(this.a,"$iszM",[T.z3],"$aszM")
z=this.c
if(z==null){z=new Float32Array(H.T0(2*J.wS(y)))
this.c=z}H.Go(z,"$isoI")
for(x=J.U6(y),w=0;w<x.gv(y);++w){v=w*2
u=J.Rd(x.p(y,w))
t=z.length
if(v>=t)return H.e(z,v)
z[v]=u
u=v+1
s=J.U5(x.p(y,w))
if(u>=t)return H.e(z,u)
z[u]=s}}else if(z==="v3v"){y=H.Cv(this.a,"$iszM",[T.An],"$aszM")
z=this.c
if(z==null){z=new Float32Array(H.T0(3*J.wS(y)))
this.c=z}H.Go(z,"$isoI")
for(x=J.U6(y),w=0;w<x.gv(y);++w){v=w*3
u=J.Rd(x.p(y,w))
t=z.length
if(v>=t)return H.e(z,v)
z[v]=u
u=v+1
s=J.U5(x.p(y,w))
if(u>=t)return H.e(z,u)
z[u]=s
s=v+2
u=J.xJ(x.p(y,w))
if(s>=t)return H.e(z,s)
z[s]=u}}else if(z==="v4v"){y=H.Cv(this.a,"$iszM",[T.Bp],"$aszM")
z=this.c
if(z==null){z=new Float32Array(H.T0(4*J.wS(y)))
this.c=z}H.Go(z,"$isoI")
for(x=J.U6(y),w=0;w<x.gv(y);++w){v=w*4
u=J.Rd(x.p(y,w))
t=z.length
if(v>=t)return H.e(z,v)
z[v]=u
u=v+1
s=J.U5(x.p(y,w))
if(u>=t)return H.e(z,u)
z[u]=s
s=v+2
u=J.xJ(x.p(y,w))
if(s>=t)return H.e(z,s)
z[s]=u
u=v+3
s=J.TO(x.p(y,w))
if(u>=t)return H.e(z,u)
z[u]=s}}else if(z==="m2")this.c=C.jN.gEv(H.Go(this.a,"$isGR"))
else if(z==="m3")this.c=H.Go(this.a,"$isNo").Q
else if(z==="m4")this.c=H.Go(this.a,"$isaI").Q
else{x=this.a
if(z==="m4v"){r=[]
J.kH(H.Cv(x,"$iszM",[T.aI],"$aszM"),new S.Un(r))
this.c=new Float32Array(H.XF(r))}else return x}return this.c},
t:function(a){var z,y
z=this.a
y=J.t(z)
if(!!y.$isuH||!!y.$isz3||!!y.$isAn||!!y.$isBp||!!y.$isaI||!!y.$isT9)z=y.t(z)
else if(!!y.$iszM)z=P.z(H.ug(z),!0,null)
y=new S.SN(this.Q,null,!0,null)
y.sM(0,z)
return y}},
L8:{
"^":"r:1;",
$1:function(a){return J.Oq(a)}},
mJ:{
"^":"r:1;",
$1:function(a){return J.XH(a)}},
Un:{
"^":"r:1;Q",
$1:function(a){C.Nm.FV(this.Q,J.X7(a))}},
Oh:{
"^":"dE;NH,e1,LD,kX,RZ,ij,TQ,ca,Jc,cw,Q,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Va,Uu,j3,iU,lq,pn",
Et:function(a){var z,y,x
if(!!a.$isa3){if(C.Nm.OY(this.kX,a)===-1)this.kX.push(a)}else if(!(!!a.$ismN||!1))if(C.Nm.OY(this.LD,a)===-1){this.LD.push(a)
this.RZ.push(a)
z=C.Nm.OY(this.ij,a)
if(z!==-1)C.Nm.W4(this.ij,z)}for(y=a.d,x=0;x<y.length;++x)this.Et(y[x])},
dR:function(a){var z,y,x,w
if(!!a.$isa3){z=C.Nm.OY(this.kX,a)
if(z!==-1)C.Nm.W4(this.kX,z)}else if(!a.$ismN){z=C.Nm.OY(this.LD,a)
if(z!==-1){C.Nm.W4(this.LD,z)
this.ij.push(a)
y=C.Nm.OY(this.RZ,a)
if(y!==-1)C.Nm.W4(this.RZ,y)}}for(x=a.d,w=0;w<x.length;++w)this.dR(x[w])},
oy:function(){this.NH=null
this.e1=null
this.fx=!1
this.LD=[]
this.kX=[]
this.RZ=[]
this.ij=[]},
static:{XS:function(){var z,y,x,w,v,u,t,s,r
z=$.RG
$.RG=z+1
y=P.u5()
x=new T.An(new Float32Array(H.T0(3)))
x.PJ(0,1,0)
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(0,0,0)
v=new T.An(new Float32Array(H.T0(3)))
v.PJ(0,0,0)
u=new T.An(new Float32Array(H.T0(3)))
u.PJ(1,1,1)
t=new T.aI(new Float32Array(H.T0(16)))
t.xI()
s=new T.aI(new Float32Array(H.T0(16)))
s.xI()
r=new T.aI(new Float32Array(H.T0(16)))
r.xI()
r=new S.Oh(null,null,null,null,null,null,null,null,null,null,z,"",y,null,[],x,w,v,u,"XYZ",null,null,null,!0,null,t,s,r,!0,!0,T.Bw(),!1,0,1,!0,!1,!1,!0,new T.An(new Float32Array(H.T0(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
r.oy()
return r}}},
T9:{
"^":"a;jO:Q*,wW:a<,b,c,d,e,f,r,t5:x>,y,lA:z*,jt:ch*,AJ:cx@,cy,Qg:db<,dx,dy,fr,fx,fy,go",
t:function(a){var z=S.Oi(this.a,this.b,this.c,this.d,this.e,this.f,this.r,this.x,this.y)
z.fx=P.z(this.fx,!0,null)
z.z.xu(this.glA(this))
z.ch.xu(this.gjt(this))
return z},
gMq:function(){var z=this.go
if(z==null){z=P.u5()
this.go=z}return z},
p:function(a,b){return this.gMq().p(0,b)},
q:function(a,b,c){this.gMq().q(0,b,c)
return c},
cE:function(a,b,c,d,e,f,g,h,i){var z=$.CP
$.CP=z+1
this.Q=z
z=this.b
this.b=z!=null?z:new S.ag()
this.slA(0,new T.z3(new Float32Array(H.T0(2))))
z=new Float32Array(H.T0(2))
z[0]=1
z[1]=1
this.sjt(0,new T.z3(z))
this.sAJ(!0)
this.cy=!1
this.dy=!0
this.db=!1
this.dx=null},
static:{Oi:function(a,b,c,d,e,f,g,h,i){var z=new S.T9(null,a,b,c,d,e,f,g,h,i,null,null,null,null,null,null,null,4,[],null,null)
z.cE(a,b,c,d,e,f,g,h,i)
return z}}}}],["","",,T,{
"^":"",
KJ:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=2*f
y=c-b
x=e-d
w=g-f
v=a.I7().Q
v[0]=z/y
v[5]=z/x
v[8]=(c+b)/y
v[9]=(e+d)/x
v[10]=-(g+f)/w
v[11]=-1
v[14]=-(z*g)/w},
YD:function(a,b,c,d,e,f,g){var z,y,x,w
z=c-b
y=e-d
x=g-f
w=a.I7().Q
w[0]=2/z
w[5]=2/y
w[10]=-2/x
w[12]=-(c+b)/z
w[13]=-(e+d)/y
w[14]=-(g+f)/x
w[15]=1},
No:{
"^":"a;Ev:Q>",
F2:function(a,b,c,d,e,f,g,h,i){var z=this.Q
z[8]=i
z[7]=h
z[6]=g
z[5]=f
z[4]=e
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
xu:function(a){var z,y
z=this.Q
y=a.gEv(a)
if(8>=y.length)return H.e(y,8)
z[8]=y[8]
y=a.gEv(a)
if(7>=y.length)return H.e(y,7)
z[7]=y[7]
y=a.gEv(a)
if(6>=y.length)return H.e(y,6)
z[6]=y[6]
y=a.gEv(a)
if(5>=y.length)return H.e(y,5)
z[5]=y[5]
y=a.gEv(a)
if(4>=y.length)return H.e(y,4)
z[4]=y[4]
y=a.gEv(a)
if(3>=y.length)return H.e(y,3)
z[3]=y[3]
y=a.gEv(a)
if(2>=y.length)return H.e(y,2)
z[2]=y[2]
y=a.gEv(a)
if(1>=y.length)return H.e(y,1)
z[1]=y[1]
y=a.gEv(a)
if(0>=y.length)return H.e(y,0)
z[0]=y[0]
return this},
X:function(a){return"[0] "+this.aE(0).X(0)+"\n[1] "+this.aE(1).X(0)+"\n[2] "+this.aE(2).X(0)+"\n"},
p:function(a,b){var z=this.Q
if(b>>>0!==b||b>=9)return H.e(z,b)
return z[b]},
q:function(a,b,c){var z=this.Q
if(b>=9)return H.e(z,b)
z[b]=c},
aE:function(a){var z,y,x
z=new Float32Array(H.T0(3))
y=this.Q
if(a>=9)return H.e(y,a)
z[0]=y[a]
x=3+a
if(x>=9)return H.e(y,x)
z[1]=y[x]
x=6+a
if(x>=9)return H.e(y,x)
z[2]=y[x]
return new T.An(z)},
t:function(a){var z=new T.No(new Float32Array(H.T0(9)))
z.xu(this)
return z},
g:function(a,b){var z,y,x
z=new Float32Array(H.T0(9))
y=this.Q
x=J.RE(b)
z[0]=C.CD.g(y[0],x.gEv(b).p(0,0))
z[1]=C.CD.g(y[1],x.gEv(b).p(0,1))
z[2]=C.CD.g(y[2],x.gEv(b).p(0,2))
z[3]=C.CD.g(y[3],x.gEv(b).p(0,3))
z[4]=C.CD.g(y[4],x.gEv(b).p(0,4))
z[5]=C.CD.g(y[5],x.gEv(b).p(0,5))
z[6]=C.CD.g(y[6],x.gEv(b).p(0,6))
z[7]=C.CD.g(y[7],x.gEv(b).p(0,7))
z[8]=C.CD.g(y[8],x.gEv(b).p(0,8))
return new T.No(z)},
T:function(a,b){var z,y,x,w,v
z=new Float32Array(H.T0(9))
y=this.Q
x=y[0]
w=J.RE(b)
v=w.gEv(b)
if(0>=v.length)return H.e(v,0)
v=v[0]
if(typeof v!=="number")return H.o(v)
z[0]=x-v
v=y[1]
x=w.gEv(b)
if(1>=x.length)return H.e(x,1)
x=x[1]
if(typeof x!=="number")return H.o(x)
z[1]=v-x
x=y[2]
v=w.gEv(b)
if(2>=v.length)return H.e(v,2)
v=v[2]
if(typeof v!=="number")return H.o(v)
z[2]=x-v
v=y[3]
x=w.gEv(b)
if(3>=x.length)return H.e(x,3)
x=x[3]
if(typeof x!=="number")return H.o(x)
z[3]=v-x
x=y[4]
v=w.gEv(b)
if(4>=v.length)return H.e(v,4)
v=v[4]
if(typeof v!=="number")return H.o(v)
z[4]=x-v
v=y[5]
x=w.gEv(b)
if(5>=x.length)return H.e(x,5)
x=x[5]
if(typeof x!=="number")return H.o(x)
z[5]=v-x
x=y[6]
v=w.gEv(b)
if(6>=v.length)return H.e(v,6)
v=v[6]
if(typeof v!=="number")return H.o(v)
z[6]=x-v
v=y[7]
x=w.gEv(b)
if(7>=x.length)return H.e(x,7)
x=x[7]
if(typeof x!=="number")return H.o(x)
z[7]=v-x
y=y[8]
w=w.gEv(b)
if(8>=w.length)return H.e(w,8)
w=w[8]
if(typeof w!=="number")return H.o(w)
z[8]=y-w
return new T.No(z)},
G:function(a){var z,y
z=new Float32Array(H.T0(9))
y=this.Q
z[0]=-y[0]
z[1]=-y[1]
z[2]=-y[2]
return new T.No(z)},
r3:function(){var z,y
z=this.Q
y=z[3]
z[3]=z[1]
z[1]=y
y=z[6]
z[6]=z[2]
z[2]=y
y=z[7]
z[7]=z[5]
z[5]=y
return this}},
aI:{
"^":"a;Ev:Q>",
Gd:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=this.Q
z[15]=p
z[14]=o
z[13]=n
z[12]=m
z[11]=l
z[10]=k
z[9]=j
z[8]=i
z[7]=h
z[6]=g
z[5]=f
z[4]=e
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
xu:function(a){var z,y
z=this.Q
y=a.gEv(a)
if(15>=y.length)return H.e(y,15)
z[15]=y[15]
y=a.gEv(a)
if(14>=y.length)return H.e(y,14)
z[14]=y[14]
y=a.gEv(a)
if(13>=y.length)return H.e(y,13)
z[13]=y[13]
y=a.gEv(a)
if(12>=y.length)return H.e(y,12)
z[12]=y[12]
y=a.gEv(a)
if(11>=y.length)return H.e(y,11)
z[11]=y[11]
y=a.gEv(a)
if(10>=y.length)return H.e(y,10)
z[10]=y[10]
y=a.gEv(a)
if(9>=y.length)return H.e(y,9)
z[9]=y[9]
y=a.gEv(a)
if(8>=y.length)return H.e(y,8)
z[8]=y[8]
y=a.gEv(a)
if(7>=y.length)return H.e(y,7)
z[7]=y[7]
y=a.gEv(a)
if(6>=y.length)return H.e(y,6)
z[6]=y[6]
y=a.gEv(a)
if(5>=y.length)return H.e(y,5)
z[5]=y[5]
y=a.gEv(a)
if(4>=y.length)return H.e(y,4)
z[4]=y[4]
y=a.gEv(a)
if(3>=y.length)return H.e(y,3)
z[3]=y[3]
y=a.gEv(a)
if(2>=y.length)return H.e(y,2)
z[2]=y[2]
y=a.gEv(a)
if(1>=y.length)return H.e(y,1)
z[1]=y[1]
y=a.gEv(a)
if(0>=y.length)return H.e(y,0)
z[0]=y[0]
return this},
X:function(a){return"[0] "+this.aE(0).X(0)+"\n[1] "+this.aE(1).X(0)+"\n[2] "+this.aE(2).X(0)+"\n[3] "+this.aE(3).X(0)+"\n"},
gFB:function(){return 4},
p:function(a,b){var z=this.Q
if(b>>>0!==b||b>=16)return H.e(z,b)
return z[b]},
q:function(a,b,c){var z=this.Q
if(b>=16)return H.e(z,b)
z[b]=c},
aE:function(a){var z,y,x
z=new Float32Array(H.T0(4))
y=this.Q
if(a>=16)return H.e(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.e(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.e(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.e(y,x)
z[3]=y[x]
return new T.Bp(z)},
t:function(a){var z=new T.aI(new Float32Array(H.T0(16)))
z.xu(this)
return z},
R:function(a,b){var z,y,x
if(!!b.$isBp){z=new Float32Array(H.T0(4))
y=this.Q
x=b.Q
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new T.Bp(z)}if(!!b.$isAn){z=new Float32Array(H.T0(3))
y=this.Q
x=b.Q
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new T.An(z)}if(4===b.gFB()){z=new Float32Array(H.T0(16))
y=this.Q
x=b.Q
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
z[4]=y[0]*x[4]+y[4]*x[5]+y[8]*x[6]+y[12]*x[7]
z[8]=y[0]*x[8]+y[4]*x[9]+y[8]*x[10]+y[12]*x[11]
z[12]=y[0]*x[12]+y[4]*x[13]+y[8]*x[14]+y[12]*x[15]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[5]=y[1]*x[4]+y[5]*x[5]+y[9]*x[6]+y[13]*x[7]
z[9]=y[1]*x[8]+y[5]*x[9]+y[9]*x[10]+y[13]*x[11]
z[13]=y[1]*x[12]+y[5]*x[13]+y[9]*x[14]+y[13]*x[15]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[6]=y[2]*x[4]+y[6]*x[5]+y[10]*x[6]+y[14]*x[7]
z[10]=y[2]*x[8]+y[6]*x[9]+y[10]*x[10]+y[14]*x[11]
z[14]=y[2]*x[12]+y[6]*x[13]+y[10]*x[14]+y[14]*x[15]
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[7]=y[3]*x[4]+y[7]*x[5]+y[11]*x[6]+y[15]*x[7]
z[11]=y[3]*x[8]+y[7]*x[9]+y[11]*x[10]+y[15]*x[11]
z[15]=y[3]*x[12]+y[7]*x[13]+y[11]*x[14]+y[15]*x[15]
return new T.aI(z)}throw H.b(P.p(b))},
g:function(a,b){var z,y,x
z=new Float32Array(H.T0(16))
y=this.Q
x=J.RE(b)
z[0]=C.CD.g(y[0],x.gEv(b).p(0,0))
z[1]=C.CD.g(y[1],x.gEv(b).p(0,1))
z[2]=C.CD.g(y[2],x.gEv(b).p(0,2))
z[3]=C.CD.g(y[3],x.gEv(b).p(0,3))
z[4]=C.CD.g(y[4],x.gEv(b).p(0,4))
z[5]=C.CD.g(y[5],x.gEv(b).p(0,5))
z[6]=C.CD.g(y[6],x.gEv(b).p(0,6))
z[7]=C.CD.g(y[7],x.gEv(b).p(0,7))
z[8]=C.CD.g(y[8],x.gEv(b).p(0,8))
z[9]=C.CD.g(y[9],x.gEv(b).p(0,9))
z[10]=C.CD.g(y[10],x.gEv(b).p(0,10))
z[11]=C.CD.g(y[11],x.gEv(b).p(0,11))
z[12]=C.CD.g(y[12],x.gEv(b).p(0,12))
z[13]=C.CD.g(y[13],x.gEv(b).p(0,13))
z[14]=C.CD.g(y[14],x.gEv(b).p(0,14))
z[15]=C.CD.g(y[15],x.gEv(b).p(0,15))
return new T.aI(z)},
T:function(a,b){var z,y,x,w,v
z=new Float32Array(H.T0(16))
y=this.Q
x=y[0]
w=J.RE(b)
v=w.gEv(b)
if(0>=v.length)return H.e(v,0)
v=v[0]
if(typeof v!=="number")return H.o(v)
z[0]=x-v
v=y[1]
x=w.gEv(b)
if(1>=x.length)return H.e(x,1)
x=x[1]
if(typeof x!=="number")return H.o(x)
z[1]=v-x
x=y[2]
v=w.gEv(b)
if(2>=v.length)return H.e(v,2)
v=v[2]
if(typeof v!=="number")return H.o(v)
z[2]=x-v
v=y[3]
x=w.gEv(b)
if(3>=x.length)return H.e(x,3)
x=x[3]
if(typeof x!=="number")return H.o(x)
z[3]=v-x
x=y[4]
v=w.gEv(b)
if(4>=v.length)return H.e(v,4)
v=v[4]
if(typeof v!=="number")return H.o(v)
z[4]=x-v
v=y[5]
x=w.gEv(b)
if(5>=x.length)return H.e(x,5)
x=x[5]
if(typeof x!=="number")return H.o(x)
z[5]=v-x
x=y[6]
v=w.gEv(b)
if(6>=v.length)return H.e(v,6)
v=v[6]
if(typeof v!=="number")return H.o(v)
z[6]=x-v
v=y[7]
x=w.gEv(b)
if(7>=x.length)return H.e(x,7)
x=x[7]
if(typeof x!=="number")return H.o(x)
z[7]=v-x
x=y[8]
v=w.gEv(b)
if(8>=v.length)return H.e(v,8)
v=v[8]
if(typeof v!=="number")return H.o(v)
z[8]=x-v
v=y[9]
x=w.gEv(b)
if(9>=x.length)return H.e(x,9)
x=x[9]
if(typeof x!=="number")return H.o(x)
z[9]=v-x
x=y[10]
v=w.gEv(b)
if(10>=v.length)return H.e(v,10)
v=v[10]
if(typeof v!=="number")return H.o(v)
z[10]=x-v
v=y[11]
x=w.gEv(b)
if(11>=x.length)return H.e(x,11)
x=x[11]
if(typeof x!=="number")return H.o(x)
z[11]=v-x
x=y[12]
v=w.gEv(b)
if(12>=v.length)return H.e(v,12)
v=v[12]
if(typeof v!=="number")return H.o(v)
z[12]=x-v
v=y[13]
x=w.gEv(b)
if(13>=x.length)return H.e(x,13)
x=x[13]
if(typeof x!=="number")return H.o(x)
z[13]=v-x
x=y[14]
v=w.gEv(b)
if(14>=v.length)return H.e(v,14)
v=v[14]
if(typeof v!=="number")return H.o(v)
z[14]=x-v
y=y[15]
w=w.gEv(b)
if(15>=w.length)return H.e(w,15)
w=w[15]
if(typeof w!=="number")return H.o(w)
z[15]=y-w
return new T.aI(z)},
G:function(a){var z,y
z=new Float32Array(H.T0(16))
y=this.Q
z[0]=-y[0]
z[1]=-y[1]
z[2]=-y[2]
z[3]=-y[3]
return new T.aI(z)},
I7:function(){var z=this.Q
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=0
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=0
return this},
xI:function(){var z=this.Q
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1
return this},
m7:function(){var z,y,x,w
z=this.Q
y=z[14]
x=z[13]
w=z[12]
z=new T.An(new Float32Array(H.T0(3)))
z.PJ(w,x,y)
return z},
C9:function(a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=a7.gEv(a7)
if(0>=z.length)return H.e(z,0)
y=z[0]
z=a7.gEv(a7)
if(1>=z.length)return H.e(z,1)
x=z[1]
z=a7.gEv(a7)
if(2>=z.length)return H.e(z,2)
w=z[2]
z=a7.gEv(a7)
if(3>=z.length)return H.e(z,3)
v=z[3]
z=a7.gEv(a7)
if(4>=z.length)return H.e(z,4)
u=z[4]
z=a7.gEv(a7)
if(5>=z.length)return H.e(z,5)
t=z[5]
z=a7.gEv(a7)
if(6>=z.length)return H.e(z,6)
s=z[6]
z=a7.gEv(a7)
if(7>=z.length)return H.e(z,7)
r=z[7]
z=a7.gEv(a7)
if(8>=z.length)return H.e(z,8)
q=z[8]
z=a7.gEv(a7)
if(9>=z.length)return H.e(z,9)
p=z[9]
z=a7.gEv(a7)
if(10>=z.length)return H.e(z,10)
o=z[10]
z=a7.gEv(a7)
if(11>=z.length)return H.e(z,11)
n=z[11]
z=a7.gEv(a7)
if(12>=z.length)return H.e(z,12)
m=z[12]
z=a7.gEv(a7)
if(13>=z.length)return H.e(z,13)
l=z[13]
z=a7.gEv(a7)
if(14>=z.length)return H.e(z,14)
k=z[14]
z=a7.gEv(a7)
if(15>=z.length)return H.e(z,15)
j=z[15]
i=y*t-x*u
h=y*s-w*u
g=y*r-v*u
f=x*s-w*t
e=x*r-v*t
d=w*r-v*s
c=q*l-p*m
b=q*k-o*m
a=q*j-n*m
a0=p*k-o*l
a1=p*j-n*l
a2=o*j-n*k
a3=i*a2-h*a1+g*a0+f*a-e*b+d*c
if(a3===0){this.xu(a7)
return 0}a4=1/a3
z=this.Q
z[0]=(t*a2-s*a1+r*a0)*a4
z[1]=(-x*a2+w*a1-v*a0)*a4
z[2]=(l*d-k*e+j*f)*a4
z[3]=(-p*d+o*e-n*f)*a4
a5=-u
z[4]=(a5*a2+s*a-r*b)*a4
z[5]=(y*a2-w*a+v*b)*a4
a6=-m
z[6]=(a6*d+k*g-j*h)*a4
z[7]=(q*d-o*g+n*h)*a4
z[8]=(u*a1-t*a+r*c)*a4
z[9]=(-y*a1+x*a-v*c)*a4
z[10]=(m*e-l*g+j*i)*a4
z[11]=(-q*e+p*g-n*i)*a4
z[12]=(a5*a0+t*b-s*c)*a4
z[13]=(y*a0-x*b+w*c)*a4
z[14]=(a6*f+l*h-k*i)*a4
z[15]=(q*f-p*h+o*i)*a4
return a3},
tv:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.Q
y=z[0]
x=z[4]
w=z[8]
v=z[12]
u=z[1]
t=z[5]
s=z[9]
r=z[13]
q=z[2]
p=z[6]
o=z[10]
n=z[14]
m=z[3]
l=z[7]
k=z[11]
j=z[15]
i=a9.Q
h=i[0]
g=i[4]
f=i[8]
e=i[12]
d=i[1]
c=i[5]
b=i[9]
a=i[13]
a0=i[2]
a1=i[6]
a2=i[10]
a3=i[14]
a4=i[3]
a5=i[7]
a6=i[11]
a7=i[15]
z[0]=y*h+x*d+w*a0+v*a4
z[4]=y*g+x*c+w*a1+v*a5
z[8]=y*f+x*b+w*a2+v*a6
z[12]=y*e+x*a+w*a3+v*a7
z[1]=u*h+t*d+s*a0+r*a4
z[5]=u*g+t*c+s*a1+r*a5
z[9]=u*f+t*b+s*a2+r*a6
z[13]=u*e+t*a+s*a3+r*a7
z[2]=q*h+p*d+o*a0+n*a4
z[6]=q*g+p*c+o*a1+n*a5
z[10]=q*f+p*b+o*a2+n*a6
z[14]=q*e+p*a+o*a3+n*a7
z[3]=m*h+l*d+k*a0+j*a4
z[7]=m*g+l*c+k*a1+j*a5
z[11]=m*f+l*b+k*a2+j*a6
z[15]=m*e+l*a+k*a3+j*a7
return this}},
DS:{
"^":"a;Ev:Q>",
gx:function(a){return this.Q[0]},
gy:function(a){return this.Q[1]},
gz:function(a){return this.Q[2]},
gES:function(a){return this.Q[3]},
t:function(a){var z,y
z=new Float32Array(H.T0(4))
y=this.Q
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
return new T.DS(z)},
gUK:function(){var z,y,x,w,v
z=this.Q
y=z[0]
x=z[1]
w=z[2]
v=z[3]
return y*y+x*x+w*w+v*v},
gv:function(a){return Math.sqrt(H.E0(this.gUK()))},
g:function(a,b){var z,y
z=this.Q
y=J.RE(b)
return T.Jd(C.CD.g(z[0],y.gEv(b).p(0,0)),C.CD.g(z[1],y.gEv(b).p(0,1)),C.CD.g(z[2],y.gEv(b).p(0,2)),C.CD.g(z[3],y.gEv(b).p(0,3)))},
T:function(a,b){var z,y,x,w,v,u,t,s
z=this.Q
y=z[0]
x=J.RE(b)
w=x.gEv(b)
if(0>=w.length)return H.e(w,0)
w=w[0]
if(typeof w!=="number")return H.o(w)
v=z[1]
u=x.gEv(b)
if(1>=u.length)return H.e(u,1)
u=u[1]
if(typeof u!=="number")return H.o(u)
t=z[2]
s=x.gEv(b)
if(2>=s.length)return H.e(s,2)
s=s[2]
if(typeof s!=="number")return H.o(s)
z=z[3]
x=x.gEv(b)
if(3>=x.length)return H.e(x,3)
x=x[3]
if(typeof x!=="number")return H.o(x)
return T.Jd(y-w,v-u,t-s,z-x)},
G:function(a){var z=this.Q
return T.Jd(-z[0],-z[1],-z[2],-z[3])},
p:function(a,b){var z=this.Q
if(b>>>0!==b||b>=4)return H.e(z,b)
return z[b]},
q:function(a,b,c){var z=this.Q
if(b>=4)return H.e(z,b)
z[b]=c},
X:function(a){var z=this.Q
return H.d(z[0])+", "+H.d(z[1])+", "+H.d(z[2])+" @ "+H.d(z[3])},
c8:function(a,b,c,d){var z=this.Q
z[0]=a
z[1]=b
z[2]=c
z[3]=d},
lY:function(){this.Q[3]=1},
static:{Jd:function(a,b,c,d){var z=new T.DS(new Float32Array(H.T0(4)))
z.c8(a,b,c,d)
return z},Bw:function(){var z=new T.DS(new Float32Array(H.T0(4)))
z.lY()
return z}}},
z3:{
"^":"a;Ev:Q>",
xu:function(a){var z,y
z=this.Q
y=a.gEv(a)
if(1>=y.length)return H.e(y,1)
z[1]=y[1]
y=a.gEv(a)
if(0>=y.length)return H.e(y,0)
z[0]=y[0]
return this},
X:function(a){var z=this.Q
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
G:function(a){var z,y,x
z=this.Q
y=z[0]
z=z[1]
x=new Float32Array(H.T0(2))
x[0]=-y
x[1]=-z
return new T.z3(x)},
T:function(a,b){var z,y,x,w,v
z=this.Q
y=z[0]
x=J.RE(b)
w=x.gEv(b)
if(0>=w.length)return H.e(w,0)
w=w[0]
if(typeof w!=="number")return H.o(w)
z=z[1]
x=x.gEv(b)
if(1>=x.length)return H.e(x,1)
x=x[1]
if(typeof x!=="number")return H.o(x)
v=new Float32Array(H.T0(2))
v[0]=y-w
v[1]=z-x
return new T.z3(v)},
g:function(a,b){var z,y,x
z=this.Q
y=J.RE(b)
x=C.CD.g(z[0],y.gEv(b).p(0,0))
y=C.CD.g(z[1],y.gEv(b).p(0,1))
z=new Float32Array(H.T0(2))
z[0]=x
z[1]=y
return new T.z3(z)},
p:function(a,b){var z=this.Q
if(b>>>0!==b||b>=2)return H.e(z,b)
return z[b]},
q:function(a,b,c){var z=this.Q
if(b>=2)return H.e(z,b)
z[b]=c},
gv:function(a){var z,y
z=this.Q
y=z[0]
z=z[1]
return Math.sqrt(H.E0(y*y+z*z))},
gUK:function(){var z,y
z=this.Q
y=z[0]
z=z[1]
return y*y+z*z},
t:function(a){var z=new T.z3(new Float32Array(H.T0(2)))
z.xu(this)
return z},
gr:function(a){return this.Q[0]},
gUI:function(){return this.Q[1]},
gx:function(a){return this.Q[0]},
gy:function(a){return this.Q[1]}},
An:{
"^":"a;Ev:Q>",
PJ:function(a,b,c){var z=this.Q
z[0]=a
z[1]=b
z[2]=c
return this},
xu:function(a){var z,y,x
z=this.Q
y=J.RE(a)
x=y.gEv(a)
if(0>=x.length)return H.e(x,0)
z[0]=x[0]
x=y.gEv(a)
if(1>=x.length)return H.e(x,1)
z[1]=x[1]
y=y.gEv(a)
if(2>=y.length)return H.e(y,2)
z[2]=y[2]
return this},
X:function(a){var z=this.Q
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
G:function(a){var z,y,x,w
z=this.Q
y=z[0]
x=z[1]
z=z[2]
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(-y,-x,-z)
return w},
T:function(a,b){var z,y,x,w,v,u,t
z=this.Q
y=z[0]
x=J.RE(b)
w=x.gEv(b)
if(0>=w.length)return H.e(w,0)
w=w[0]
if(typeof w!=="number")return H.o(w)
v=z[1]
u=x.gEv(b)
if(1>=u.length)return H.e(u,1)
u=u[1]
if(typeof u!=="number")return H.o(u)
z=z[2]
x=x.gEv(b)
if(2>=x.length)return H.e(x,2)
x=x[2]
if(typeof x!=="number")return H.o(x)
t=new T.An(new Float32Array(H.T0(3)))
t.PJ(y-w,v-u,z-x)
return t},
g:function(a,b){var z,y,x,w
z=this.Q
y=J.RE(b)
x=C.CD.g(z[0],y.gEv(b).p(0,0))
w=C.CD.g(z[1],y.gEv(b).p(0,1))
y=C.CD.g(z[2],y.gEv(b).p(0,2))
z=new T.An(new Float32Array(H.T0(3)))
z.PJ(x,w,y)
return z},
R:function(a,b){var z,y,x,w
z=this.Q
y=z[0]
if(typeof b!=="number")return H.o(b)
x=z[1]
z=z[2]
w=new T.An(new Float32Array(H.T0(3)))
w.PJ(y*b,x*b,z*b)
return w},
p:function(a,b){var z=this.Q
if(b>>>0!==b||b>=3)return H.e(z,b)
return z[b]},
q:function(a,b,c){var z=this.Q
if(b>=3)return H.e(z,b)
z[b]=c},
gv:function(a){var z,y,x
z=this.Q
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.E0(y*y+x*x+z*z))},
gUK:function(){var z,y,x
z=this.Q
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
p3:function(a){var z,y
z=this.gv(this)
if(z===0)return this
z=1/z
y=this.Q
y[0]=y[0]*z
y[1]=y[1]*z
y[2]=y[2]*z
return this},
Pv:function(a){var z,y,x,w,v,u,t
z=this.Q
y=z[0]
x=z[1]
w=z[2]
z=a.Q
v=z[0]
u=z[1]
t=z[2]
z=new T.An(new Float32Array(H.T0(3)))
z.PJ(x*t-w*u,w*v-y*t,y*u-x*v)
return z},
Kj:function(a){var z,y,x,w,v,u,t,s,r
z=this.Q
y=z[0]
x=z[1]
w=z[2]
v=a.gEv(a)
if(3>=v.length)return H.e(v,3)
v=v[3]
u=a.gEv(a)
if(7>=u.length)return H.e(u,7)
u=u[7]
t=a.gEv(a)
if(11>=t.length)return H.e(t,11)
t=t[11]
s=a.gEv(a)
if(15>=s.length)return H.e(s,15)
r=1/(v*y+u*x+t*w+s[15])
s=a.gEv(a)
if(0>=s.length)return H.e(s,0)
s=s[0]
t=a.gEv(a)
if(4>=t.length)return H.e(t,4)
t=t[4]
u=a.gEv(a)
if(8>=u.length)return H.e(u,8)
u=u[8]
v=a.gEv(a)
if(12>=v.length)return H.e(v,12)
z[0]=(s*y+t*x+u*w+v[12])*r
v=a.gEv(a)
if(1>=v.length)return H.e(v,1)
v=v[1]
u=a.gEv(a)
if(5>=u.length)return H.e(u,5)
u=u[5]
t=a.gEv(a)
if(9>=t.length)return H.e(t,9)
t=t[9]
s=a.gEv(a)
if(13>=s.length)return H.e(s,13)
z[1]=(v*y+u*x+t*w+s[13])*r
s=a.gEv(a)
if(2>=s.length)return H.e(s,2)
s=s[2]
t=a.gEv(a)
if(6>=t.length)return H.e(t,6)
t=t[6]
u=a.gEv(a)
if(10>=u.length)return H.e(u,10)
u=u[10]
v=a.gEv(a)
if(14>=v.length)return H.e(v,14)
z[2]=(s*y+t*x+u*w+v[14])*r
return this},
h:function(a,b){var z,y,x,w
z=this.Q
y=z[0]
x=J.RE(b)
w=x.gEv(b)
if(0>=w.length)return H.e(w,0)
w=w[0]
if(typeof w!=="number")return H.o(w)
z[0]=y+w
w=z[1]
y=x.gEv(b)
if(1>=y.length)return H.e(y,1)
y=y[1]
if(typeof y!=="number")return H.o(y)
z[1]=w+y
y=z[2]
x=x.gEv(b)
if(2>=x.length)return H.e(x,2)
x=x[2]
if(typeof x!=="number")return H.o(x)
z[2]=y+x
return this},
XF:function(a){var z,y
z=this.Q
y=a.Q
z[0]=z[0]-y[0]
z[1]=z[1]-y[1]
z[2]=z[2]-y[2]
return this},
tv:function(a,b){var z,y
z=this.Q
y=b.Q
z[0]=z[0]*y[0]
z[1]=z[1]*y[1]
z[2]=z[2]*y[2]
return this},
t:function(a){var z=new T.An(new Float32Array(H.T0(3)))
z.xu(this)
return z},
gr:function(a){return this.Q[0]},
gUI:function(){return this.Q[1]},
gb:function(a){return this.Q[2]},
gx:function(a){return this.Q[0]},
gy:function(a){return this.Q[1]},
gz:function(a){return this.Q[2]},
static:{Gi:function(){return new T.An(new Float32Array(H.T0(3)))}}},
Bp:{
"^":"a;Ev:Q>",
Mp:function(a,b,c,d){var z=this.Q
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
xu:function(a){var z,y
z=this.Q
y=a.gEv(a)
if(3>=y.length)return H.e(y,3)
z[3]=y[3]
y=a.gEv(a)
if(2>=y.length)return H.e(y,2)
z[2]=y[2]
y=a.gEv(a)
if(1>=y.length)return H.e(y,1)
z[1]=y[1]
y=a.gEv(a)
if(0>=y.length)return H.e(y,0)
z[0]=y[0]
return this},
X:function(a){var z=this.Q
return H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+","+H.d(z[3])},
G:function(a){var z,y,x,w,v
z=this.Q
y=z[0]
x=z[1]
w=z[2]
z=z[3]
v=new T.Bp(new Float32Array(H.T0(4)))
v.Mp(-y,-x,-w,-z)
return v},
T:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.Q
y=z[0]
x=J.RE(b)
w=x.gEv(b)
if(0>=w.length)return H.e(w,0)
w=w[0]
if(typeof w!=="number")return H.o(w)
v=z[1]
u=x.gEv(b)
if(1>=u.length)return H.e(u,1)
u=u[1]
if(typeof u!=="number")return H.o(u)
t=z[2]
s=x.gEv(b)
if(2>=s.length)return H.e(s,2)
s=s[2]
if(typeof s!=="number")return H.o(s)
z=z[3]
x=x.gEv(b)
if(3>=x.length)return H.e(x,3)
x=x[3]
if(typeof x!=="number")return H.o(x)
r=new T.Bp(new Float32Array(H.T0(4)))
r.Mp(y-w,v-u,t-s,z-x)
return r},
g:function(a,b){var z,y,x,w,v
z=this.Q
y=J.RE(b)
x=C.CD.g(z[0],y.gEv(b).p(0,0))
w=C.CD.g(z[1],y.gEv(b).p(0,1))
v=C.CD.g(z[2],y.gEv(b).p(0,2))
y=C.CD.g(z[3],y.gEv(b).p(0,3))
z=new T.Bp(new Float32Array(H.T0(4)))
z.Mp(x,w,v,y)
return z},
R:function(a,b){var z,y,x,w,v
z=this.Q
y=z[0]
if(typeof b!=="number")return H.o(b)
x=z[1]
w=z[2]
z=z[3]
v=new T.Bp(new Float32Array(H.T0(4)))
v.Mp(y*b,x*b,w*b,z*b)
return v},
p:function(a,b){var z=this.Q
if(b>>>0!==b||b>=4)return H.e(z,b)
return z[b]},
q:function(a,b,c){var z=this.Q
if(b>=4)return H.e(z,b)
z[b]=c},
gv:function(a){var z,y,x,w
z=this.Q
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.E0(y*y+x*x+w*w+z*z))},
gUK:function(){var z,y,x,w
z=this.Q
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return y*y+x*x+w*w+z*z},
tv:function(a,b){var z,y
z=this.Q
y=b.Q
z[0]=z[0]*y[0]
z[1]=z[1]*y[1]
z[2]=z[2]*y[2]
z[3]=z[3]*y[3]
return this},
t:function(a){var z=new T.Bp(new Float32Array(H.T0(4)))
z.xu(this)
return z},
gr:function(a){return this.Q[0]},
gUI:function(){return this.Q[1]},
gb:function(a){return this.Q[2]},
gx:function(a){return this.Q[0]},
gy:function(a){return this.Q[1]},
gz:function(a){return this.Q[2]},
gES:function(a){return this.Q[3]}}}]]
setupProgram(dart,0)
J.Qc=function(a){if(typeof a=="number")return J.F.prototype
if(typeof a=="string")return J.E.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.kd.prototype
return a}
J.RE=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.U6=function(a){if(typeof a=="string")return J.E.prototype
if(a==null)return a
if(a.constructor==Array)return J.G.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.Wx=function(a){if(typeof a=="number")return J.F.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.kd.prototype
return a}
J.t=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.im.prototype
return J.VA.prototype}if(typeof a=="string")return J.E.prototype
if(a==null)return J.YE.prototype
if(typeof a=="boolean")return J.yE.prototype
if(a.constructor==Array)return J.G.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.w1=function(a){if(a==null)return a
if(a.constructor==Array)return J.G.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.A0=function(a){return J.RE(a).gaw(a)}
J.AL=function(a){return J.RE(a).gGg(a)}
J.AP=function(a){return J.RE(a).T6(a)}
J.Be=function(a,b){return J.RE(a).seT(a,b)}
J.C7=function(a,b,c){if((a.constructor==Array||H.wV(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.w1(a).q(a,b,c)}
J.CI=function(a){return J.RE(a).ga9(a)}
J.Dn=function(a){return J.RE(a).pC(a)}
J.E4=function(a,b,c){return J.RE(a).ci(a,b,c)}
J.ED=function(a,b){return J.RE(a).GA(a,b)}
J.EF=function(a){if(typeof a=="number")return-a
return J.Wx(a).G(a)}
J.Ef=function(a,b){return J.RE(a).jV(a,b)}
J.F8=function(a){return J.RE(a).gjO(a)}
J.FL=function(a,b,c){return J.RE(a).Gk(a,b,c)}
J.G0=function(a){return J.RE(a).gf0(a)}
J.GB=function(a,b,c,d,e,f,g){return J.RE(a).l6(a,b,c,d,e,f,g)}
J.GJ=function(a,b,c,d){return J.RE(a).Y9(a,b,c,d)}
J.GW=function(a){return J.RE(a).gVY(a)}
J.Gj=function(a,b,c){return J.RE(a).oC(a,b,c)}
J.Ha=function(a,b,c,d,e){return J.RE(a).Sk(a,b,c,d,e)}
J.Hd=function(a,b){return J.RE(a).mV(a,b)}
J.IQ=function(a){return J.Wx(a).gdc(a)}
J.Iz=function(a,b){return J.w1(a).Sl(a,b)}
J.Jw=function(a){return J.RE(a).Wp(a)}
J.Kr=function(a){return J.RE(a).e6(a)}
J.Kt=function(a){return J.RE(a).gIG(a)}
J.LF=function(a,b,c){return J.RE(a).IW(a,b,c)}
J.LH=function(a,b){return J.w1(a).GT(a,b)}
J.LI=function(a,b,c,d){return J.RE(a).Vn(a,b,c,d)}
J.Lb=function(a,b,c,d){return J.RE(a).rz(a,b,c,d)}
J.Lz=function(a){return J.t(a).X(a)}
J.MT=function(a,b,c,d,e){return J.RE(a).Ng(a,b,c,d,e)}
J.MV=function(a,b,c,d,e){return J.RE(a).Ih(a,b,c,d,e)}
J.Mo=function(a,b,c,d,e,f){return J.RE(a).GY(a,b,c,d,e,f)}
J.N6=function(a,b,c,d,e){return J.RE(a).fw(a,b,c,d,e)}
J.NT=function(a,b,c){return J.U6(a).eM(a,b,c)}
J.Np=function(a,b,c,d,e){return J.RE(a).kd(a,b,c,d,e)}
J.Nx=function(a){return J.w1(a).gu(a)}
J.OB=function(a){return J.RE(a).gfg(a)}
J.OE=function(a,b){return J.RE(a).sfg(a,b)}
J.OV=function(a,b,c,d){return J.RE(a).pW(a,b,c,d)}
J.Oo=function(a,b){return J.RE(a).CF(a,b)}
J.Oq=function(a){return J.Wx(a).Hp(a)}
J.PD=function(a,b){return J.RE(a).Hn(a,b)}
J.Q0=function(a,b,c){return J.RE(a).wO(a,b,c)}
J.Q3=function(a,b,c,d){return J.RE(a).BN(a,b,c,d)}
J.QM=function(a,b){return J.RE(a).Rg(a,b)}
J.Qv=function(a,b,c,d,e){return J.RE(a).c3(a,b,c,d,e)}
J.Rb=function(a,b,c){return J.RE(a).Yw(a,b,c)}
J.Rd=function(a){return J.RE(a).gx(a)}
J.Rw=function(a){return J.RE(a).Gp(a)}
J.S8=function(a,b){return J.RE(a).Ck(a,b)}
J.SW=function(a){return J.RE(a).gM(a)}
J.TO=function(a){return J.RE(a).gES(a)}
J.TZ=function(a,b){return J.RE(a).sN(a,b)}
J.Tf=function(a,b){if(a.constructor==Array||typeof a=="string"||H.wV(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.U6(a).p(a,b)}
J.U3=function(a,b,c){return J.RE(a).D7(a,b,c)}
J.U5=function(a){return J.RE(a).gy(a)}
J.UN=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.Wx(a).w(a,b)}
J.Ud=function(a,b){return J.U6(a).sv(a,b)}
J.V1=function(a,b){return J.w1(a).Rz(a,b)}
J.Vk=function(a,b){return J.RE(a).KZ(a,b)}
J.Vm=function(a,b){return J.RE(a).MU(a,b)}
J.WB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.Qc(a).g(a,b)}
J.Wb=function(a){return J.RE(a).OF(a)}
J.X6=function(a,b,c){return J.RE(a).ug(a,b,c)}
J.X7=function(a){return J.RE(a).gEv(a)}
J.XH=function(a){return J.Wx(a).yu(a)}
J.Y3=function(a){return J.RE(a).gr(a)}
J.YS=function(a,b,c){return J.RE(a).d9(a,b,c)}
J.Yi=function(a,b){return J.RE(a).u0(a,b)}
J.Zm=function(a){return J.RE(a).gHQ(a)}
J.Zx=function(a,b){return J.RE(a).JS(a,b)}
J.a5=function(a,b,c){return J.RE(a).YE(a,b,c)}
J.aF=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.Wx(a).T(a,b)}
J.aS=function(a,b){return J.RE(a).Qc(a,b)}
J.bM=function(a,b){return J.RE(a).OW(a,b)}
J.bN=function(a,b,c){return J.RE(a).tk(a,b,c)}
J.c0=function(a,b,c,d){return J.RE(a).Vt(a,b,c,d)}
J.c2=function(a,b){return J.RE(a).yB(a,b)}
J.cE=function(a){return J.Wx(a).gG0(a)}
J.cN=function(a,b,c){return J.RE(a).p6(a,b,c)}
J.cZ=function(a,b,c){return J.RE(a).rd(a,b,c)}
J.cl=function(a,b){return J.RE(a).Iv(a,b)}
J.cq=function(a,b){return J.RE(a).YU(a,b)}
J.d1=function(a,b){return J.RE(a).Ma(a,b)}
J.eW=function(a,b){return J.RE(a).sM(a,b)}
J.h7=function(a,b,c,d,e,f){return J.RE(a).pi(a,b,c,d,e,f)}
J.hu=function(a,b,c){return J.RE(a).EP(a,b,c)}
J.i3=function(a,b){return J.RE(a).zx(a,b)}
J.i4=function(a,b){return J.w1(a).Zv(a,b)}
J.iM=function(a,b,c){return J.RE(a).Xd(a,b,c)}
J.id=function(a,b,c,d){return J.RE(a).rZ(a,b,c,d)}
J.ir=function(a){return J.RE(a).t(a)}
J.it=function(a,b){return J.RE(a).saw(a,b)}
J.jO=function(a,b){return J.RE(a).nA(a,b)}
J.jV=function(a,b){return J.RE(a).wR(a,b)}
J.je=function(a,b,c,d,e){return J.RE(a).J1(a,b,c,d,e)}
J.kH=function(a,b){return J.w1(a).aN(a,b)}
J.kl=function(a,b){return J.w1(a).ez(a,b)}
J.l2=function(a){return J.RE(a).gN(a)}
J.l3=function(a){return J.RE(a).SX(a)}
J.lA=function(a,b){return J.RE(a).WV(a,b)}
J.lg=function(a,b,c){return J.RE(a).iy(a,b,c)}
J.mG=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.t(a).m(a,b)}
J.mV=function(a,b){return J.RE(a).sXr(a,b)}
J.mk=function(a,b,c){return J.RE(a).wA(a,b,c)}
J.oE=function(a,b){return J.Qc(a).iM(a,b)}
J.oq=function(a,b,c,d,e,f,g,h,i,j){return J.RE(a).yr(a,b,c,d,e,f,g,h,i,j)}
J.ow=function(a){return J.RE(a).gni(a)}
J.pL=function(a,b,c,d){return J.RE(a).d2(a,b,c,d)}
J.pX=function(a,b,c){return J.RE(a).r5(a,b,c)}
J.qA=function(a){return J.w1(a).br(a)}
J.qN=function(a,b,c,d,e,f){return J.RE(a).Ka(a,b,c,d,e,f)}
J.qV=function(a,b,c,d){return J.RE(a).On(a,b,c,d)}
J.to=function(a,b){return J.RE(a).sjO(a,b)}
J.uB=function(a,b){return J.RE(a).yp(a,b)}
J.v0=function(a,b){return J.RE(a).v1(a,b)}
J.v1=function(a){return J.t(a).giO(a)}
J.v3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.Qc(a).R(a,b)}
J.v6=function(a,b,c){return J.RE(a).yy(a,b,c)}
J.vU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.Wx(a).A(a,b)}
J.vt=function(a,b,c){return J.RE(a).vL(a,b,c)}
J.w6=function(a,b,c,d){return J.RE(a).K7(a,b,c,d)}
J.w8=function(a){return J.RE(a).gkc(a)}
J.wS=function(a){return J.U6(a).gv(a)}
J.wY=function(a,b,c){return J.RE(a).Ug(a,b,c)}
J.xA=function(a){return J.RE(a).gS0(a)}
J.xJ=function(a){return J.RE(a).gz(a)}
J.xR=function(a,b,c){return J.RE(a).m2(a,b,c)}
J.xm=function(a,b){return J.RE(a).jd(a,b)}
J.yR=function(a,b,c){return J.RE(a).XT(a,b,c)}
J.zH=function(a){return J.RE(a).gt5(a)}
var $=I.p
C.Nm=J.G.prototype
C.jn=J.im.prototype
C.jN=J.YE.prototype
C.CD=J.F.prototype
C.xB=J.E.prototype
C.t5=W.BH.prototype
C.ZQ=J.iC.prototype
C.vB=J.kd.prototype
C.U=W.K5.prototype
C.KZ=new H.hJ()
C.Eq=new P.k5()
C.Wj=new P.dp()
C.NU=new P.Ji()
C.RT=new P.a6(0)
C.Mc=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.lR=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.w2=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.XQ=function(hooks) { return hooks; }

C.ur=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.Jh=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.M1=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.hQ=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.Vu=function(_, letter) { return letter.toUpperCase(); }
C.uX=new G.pF(0)
C.jU=new G.pF(1)
C.wA=new G.pF(2)
C.lX=new G.pF(3)
C.iD=new G.pF(4)
C.Xz=new G.pF(5)
C.Uf=new G.pF(6)
C.zg=new H.kz([0,"MapParts.smallBuilding",1,"MapParts.normalBuilding",2,"MapParts.bigBuilding",3,"MapParts.asphaltRoad",4,"MapParts.normalOakThree",5,"MapParts.normalGrass",6,"MapParts.averageJoe"])
$.te="$cachedFunction"
$.eb="$cachedInvocation"
$.yj=0
$.bf=null
$.P4=null
$.N=null
$.TX=null
$.x7=null
$.NF=null
$.vv=null
$.Y=null
$.S6=null
$.k8=null
$.mg=null
$.UD=!1
$.X3=C.NU
$.Ss=0
$.L4=null
$.EM=null
$.w5=null
$.aj=null
$.UX=13424639
$.no=1197670
$.nv=6184291
$.R8=6710886
$.dB=5846046
$.Jc=7911513
$.DP=5152611
$.PE=13417129
$.qE=6729471
$.dS=16770491
$.Ti=6729471
$.fy=6729471
$.GV=14211071
$.D4=14211071
$.qd=null
$.mb=null
$.ya=null
$.vT=0
$.RG=0
$.YY=0
$.CP=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a](ke,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){var z=3
for(var y=0;y<a.length;y+=z){var x=a[y]
var w=a[y+1]
var v=a[y+2]
I.$lazy(x,w,v)}})(["Kb","Rs",function(){return H.yl()},"rS","p6",function(){return new P.kM(null)},"lm","WD",function(){return H.cM(H.S7({toString:function(){return"$receiver$"}}))},"k1","OI",function(){return H.cM(H.S7({$method$:null,toString:function(){return"$receiver$"}}))},"Re","PH",function(){return H.cM(H.S7(null))},"fN","D1",function(){return H.cM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"qi","rx",function(){return H.cM(H.S7(void 0))},"rZ","Y9",function(){return H.cM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"BX","zO",function(){return H.cM(H.Mj(null))},"tt","Bi",function(){return H.cM(function(){try{null.$method$}catch(z){return z.message}}())},"dt","eA",function(){return H.cM(H.Mj(void 0))},"A7","ko",function(){return H.cM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"lI","ej",function(){return P.Oj()},"xg","xb",function(){return[]},"Zv","nn",function(){return S.kF()},"qv","uv",function(){return T.Gi()},"hM","qu",function(){return S.qb(0,0)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,void:true,args:[,]},{func:1,args:[,]},{func:1},{func:1,void:true},{func:1,args:[,P.I]},{func:1,args:[P.I]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.Gz]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a0},{func:1,args:[,P.Gz]},{func:1,void:true,args:[,P.Gz]},{func:1,args:[,,]},{func:1,args:[P.wv,,]},{func:1,ret:P.I,args:[P.KN]},{func:1,ret:P.a,opt:[P.a]},{func:1,void:true,opt:[P.a]},{func:1,args:[P.I,,]},{func:1,ret:P.KN,args:[,]},{func:1,args:[P.KN]},{func:1,args:[P.KN,,]},{func:1,void:true,args:[P.lf]},{func:1,args:[T.An]},{func:1,args:[S.J9]},{func:1,args:[P.lf,T.An]},{func:1,args:[[P.w,P.I,S.SN]]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,ret:P.a0,args:[,,]},{func:1,ret:P.KN,args:[P.fR,P.fR]},{func:1,ret:P.a0,args:[P.a,P.a]},{func:1,ret:P.KN,args:[P.a]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=Object.create(null)
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=Object.create(null)
init.leafTags=Object.create(null)
init.finishedClasses=Object.create(null)
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.eQ(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
return Isolate}}!function(){function intern(a){var u={}
u[a]=1
return Object.keys(convertToFastObject(u))[0]}init.getIsolateTag=function(a){return intern("___dart_"+a+init.isolateTag)}
var z="___dart_isolate_tags_"
var y=Object[z]||(Object[z]=Object.create(null))
var x="_ZxYxX"
for(var w=0;;w++){var v=intern(x+"_"+w+"_")
if(!(v in y)){y[v]=1
init.isolateTag=v
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(document.currentScript){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.Rq(F.ao(),b)},[])
else (function(b){H.Rq(F.ao(),b)})([])})})()