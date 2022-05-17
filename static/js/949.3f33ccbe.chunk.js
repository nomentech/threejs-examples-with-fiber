"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[949],{6710:function(t,e,o){o.d(e,{Pf:function(){return a},Uv:function(){return r},fx:function(){return i}});var i=window.innerWidth>640?window.innerWidth-300:window.innerWidth,r=window.innerWidth>640?window.innerHeight:window.innerHeight-48,a=i/r},7949:function(t,e,o){o.r(e),o.d(e,{default:function(){return w}});var i=o(3433),r=o(1413),a=o(7760),s=o(4150),n=o(2794),l=o(5671),f=o(3144),h=o(136),c=o(9388),u={uniforms:{textureWidth:{value:1},textureHeight:{value:1},focalDepth:{value:1},focalLength:{value:24},fstop:{value:.9},tColor:{value:null},tDepth:{value:null},maxblur:{value:1},showFocus:{value:0},manualdof:{value:0},vignetting:{value:0},depthblur:{value:0},threshold:{value:.5},gain:{value:2},bias:{value:.5},fringe:{value:.7},znear:{value:.1},zfar:{value:100},noise:{value:1},dithering:{value:1e-4},pentagon:{value:0},shaderFocus:{value:1},focusCoords:{value:new a.Vector2}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["#include <common>","varying vec2 vUv;","uniform sampler2D tColor;","uniform sampler2D tDepth;","uniform float textureWidth;","uniform float textureHeight;","uniform float focalDepth;  //focal distance value in meters, but you may use autofocus option below","uniform float focalLength; //focal length in mm","uniform float fstop; //f-stop value","uniform bool showFocus; //show debug focus point and focal range (red = focal point, green = focal range)","/*","make sure that these two values are the same for your camera, otherwise distances will be wrong.","*/","uniform float znear; // camera clipping start","uniform float zfar; // camera clipping end","//------------------------------------------","//user variables","const int samples = SAMPLES; //samples on the first ring","const int rings = RINGS; //ring count","const int maxringsamples = rings * samples;","uniform bool manualdof; // manual dof calculation","float ndofstart = 1.0; // near dof blur start","float ndofdist = 2.0; // near dof blur falloff distance","float fdofstart = 1.0; // far dof blur start","float fdofdist = 3.0; // far dof blur falloff distance","float CoC = 0.03; //circle of confusion size in mm (35mm film = 0.03mm)","uniform bool vignetting; // use optical lens vignetting","float vignout = 1.3; // vignetting outer border","float vignin = 0.0; // vignetting inner border","float vignfade = 22.0; // f-stops till vignete fades","uniform bool shaderFocus;","// disable if you use external focalDepth value","uniform vec2 focusCoords;","// autofocus point on screen (0.0,0.0 - left lower corner, 1.0,1.0 - upper right)","// if center of screen use vec2(0.5, 0.5);","uniform float maxblur;","//clamp value of max blur (0.0 = no blur, 1.0 default)","uniform float threshold; // highlight threshold;","uniform float gain; // highlight gain;","uniform float bias; // bokeh edge bias","uniform float fringe; // bokeh chromatic aberration / fringing","uniform bool noise; //use noise instead of pattern for sample dithering","uniform float dithering;","uniform bool depthblur; // blur the depth buffer","float dbsize = 1.25; // depth blur size","/*","next part is experimental","not looking good with small sample and ring count","looks okay starting from samples = 4, rings = 4","*/","uniform bool pentagon; //use pentagon as bokeh shape?","float feather = 0.4; //pentagon shape feather","//------------------------------------------","float penta(vec2 coords) {","\t//pentagonal shape","\tfloat scale = float(rings) - 1.3;","\tvec4  HS0 = vec4( 1.0,         0.0,         0.0,  1.0);","\tvec4  HS1 = vec4( 0.309016994, 0.951056516, 0.0,  1.0);","\tvec4  HS2 = vec4(-0.809016994, 0.587785252, 0.0,  1.0);","\tvec4  HS3 = vec4(-0.809016994,-0.587785252, 0.0,  1.0);","\tvec4  HS4 = vec4( 0.309016994,-0.951056516, 0.0,  1.0);","\tvec4  HS5 = vec4( 0.0        ,0.0         , 1.0,  1.0);","\tvec4  one = vec4( 1.0 );","\tvec4 P = vec4((coords),vec2(scale, scale));","\tvec4 dist = vec4(0.0);","\tfloat inorout = -4.0;","\tdist.x = dot( P, HS0 );","\tdist.y = dot( P, HS1 );","\tdist.z = dot( P, HS2 );","\tdist.w = dot( P, HS3 );","\tdist = smoothstep( -feather, feather, dist );","\tinorout += dot( dist, one );","\tdist.x = dot( P, HS4 );","\tdist.y = HS5.w - abs( P.z );","\tdist = smoothstep( -feather, feather, dist );","\tinorout += dist.x;","\treturn clamp( inorout, 0.0, 1.0 );","}","float bdepth(vec2 coords) {","\t// Depth buffer blur","\tfloat d = 0.0;","\tfloat kernel[9];","\tvec2 offset[9];","\tvec2 wh = vec2(1.0/textureWidth,1.0/textureHeight) * dbsize;","\toffset[0] = vec2(-wh.x,-wh.y);","\toffset[1] = vec2( 0.0, -wh.y);","\toffset[2] = vec2( wh.x -wh.y);","\toffset[3] = vec2(-wh.x,  0.0);","\toffset[4] = vec2( 0.0,   0.0);","\toffset[5] = vec2( wh.x,  0.0);","\toffset[6] = vec2(-wh.x, wh.y);","\toffset[7] = vec2( 0.0,  wh.y);","\toffset[8] = vec2( wh.x, wh.y);","\tkernel[0] = 1.0/16.0;   kernel[1] = 2.0/16.0;   kernel[2] = 1.0/16.0;","\tkernel[3] = 2.0/16.0;   kernel[4] = 4.0/16.0;   kernel[5] = 2.0/16.0;","\tkernel[6] = 1.0/16.0;   kernel[7] = 2.0/16.0;   kernel[8] = 1.0/16.0;","\tfor( int i=0; i<9; i++ ) {","\t\tfloat tmp = texture2D(tDepth, coords + offset[i]).r;","\t\td += tmp * kernel[i];","\t}","\treturn d;","}","vec3 color(vec2 coords,float blur) {","\t//processing the sample","\tvec3 col = vec3(0.0);","\tvec2 texel = vec2(1.0/textureWidth,1.0/textureHeight);","\tcol.r = texture2D(tColor,coords + vec2(0.0,1.0)*texel*fringe*blur).r;","\tcol.g = texture2D(tColor,coords + vec2(-0.866,-0.5)*texel*fringe*blur).g;","\tcol.b = texture2D(tColor,coords + vec2(0.866,-0.5)*texel*fringe*blur).b;","\tvec3 lumcoeff = vec3(0.299,0.587,0.114);","\tfloat lum = dot(col.rgb, lumcoeff);","\tfloat thresh = max((lum-threshold)*gain, 0.0);","\treturn col+mix(vec3(0.0),col,thresh*blur);","}","vec3 debugFocus(vec3 col, float blur, float depth) {","\tfloat edge = 0.002*depth; //distance based edge smoothing","\tfloat m = clamp(smoothstep(0.0,edge,blur),0.0,1.0);","\tfloat e = clamp(smoothstep(1.0-edge,1.0,blur),0.0,1.0);","\tcol = mix(col,vec3(1.0,0.5,0.0),(1.0-m)*0.6);","\tcol = mix(col,vec3(0.0,0.5,1.0),((1.0-e)-(1.0-m))*0.2);","\treturn col;","}","float linearize(float depth) {","\treturn -zfar * znear / (depth * (zfar - znear) - zfar);","}","float vignette() {","\tfloat dist = distance(vUv.xy, vec2(0.5,0.5));","\tdist = smoothstep(vignout+(fstop/vignfade), vignin+(fstop/vignfade), dist);","\treturn clamp(dist,0.0,1.0);","}","float gather(float i, float j, int ringsamples, inout vec3 col, float w, float h, float blur) {","\tfloat rings2 = float(rings);","\tfloat step = PI*2.0 / float(ringsamples);","\tfloat pw = cos(j*step)*i;","\tfloat ph = sin(j*step)*i;","\tfloat p = 1.0;","\tif (pentagon) {","\t\tp = penta(vec2(pw,ph));","\t}","\tcol += color(vUv.xy + vec2(pw*w,ph*h), blur) * mix(1.0, i/rings2, bias) * p;","\treturn 1.0 * mix(1.0, i /rings2, bias) * p;","}","void main() {","\t//scene depth calculation","\tfloat depth = linearize(texture2D(tDepth,vUv.xy).x);","\t// Blur depth?","\tif ( depthblur ) {","\t\tdepth = linearize(bdepth(vUv.xy));","\t}","\t//focal plane calculation","\tfloat fDepth = focalDepth;","\tif (shaderFocus) {","\t\tfDepth = linearize(texture2D(tDepth,focusCoords).x);","\t}","\t// dof blur factor calculation","\tfloat blur = 0.0;","\tif (manualdof) {","\t\tfloat a = depth-fDepth; // Focal plane","\t\tfloat b = (a-fdofstart)/fdofdist; // Far DoF","\t\tfloat c = (-a-ndofstart)/ndofdist; // Near Dof","\t\tblur = (a>0.0) ? b : c;","\t} else {","\t\tfloat f = focalLength; // focal length in mm","\t\tfloat d = fDepth*1000.0; // focal plane in mm","\t\tfloat o = depth*1000.0; // depth in mm","\t\tfloat a = (o*f)/(o-f);","\t\tfloat b = (d*f)/(d-f);","\t\tfloat c = (d-f)/(d*fstop*CoC);","\t\tblur = abs(a-b)*c;","\t}","\tblur = clamp(blur,0.0,1.0);","\t// calculation of pattern for dithering","\tvec2 noise = vec2(rand(vUv.xy), rand( vUv.xy + vec2( 0.4, 0.6 ) ) )*dithering*blur;","\t// getting blur x and y step factor","\tfloat w = (1.0/textureWidth)*blur*maxblur+noise.x;","\tfloat h = (1.0/textureHeight)*blur*maxblur+noise.y;","\t// calculation of final color","\tvec3 col = vec3(0.0);","\tif(blur < 0.05) {","\t\t//some optimization thingy","\t\tcol = texture2D(tColor, vUv.xy).rgb;","\t} else {","\t\tcol = texture2D(tColor, vUv.xy).rgb;","\t\tfloat s = 1.0;","\t\tint ringsamples;","\t\tfor (int i = 1; i <= rings; i++) {","\t\t\t/*unboxstart*/","\t\t\tringsamples = i * samples;","\t\t\tfor (int j = 0 ; j < maxringsamples ; j++) {","\t\t\t\tif (j >= ringsamples) break;","\t\t\t\ts += gather(float(i), float(j), ringsamples, col, w, h, blur);","\t\t\t}","\t\t\t/*unboxend*/","\t\t}","\t\tcol /= s; //divide by sample count","\t}","\tif (showFocus) {","\t\tcol = debugFocus(col, blur, depth);","\t}","\tif (vignetting) {","\t\tcol *= vignette();","\t}","\tgl_FragColor.rgb = col;","\tgl_FragColor.a = 1.0;","} "].join("\n")},d={uniforms:{mNear:{value:1},mFar:{value:1e3}},vertexShader:["varying float vViewZDepth;","void main() {","\t#include <begin_vertex>","\t#include <project_vertex>","\tvViewZDepth = - mvPosition.z;","}"].join("\n"),fragmentShader:["uniform float mNear;","uniform float mFar;","varying float vViewZDepth;","void main() {","\tfloat color = 1.0 - smoothstep( mNear, mFar, vViewZDepth );","\tgl_FragColor = vec4( vec3( color ), 1.0 );","} "].join("\n")},p=function(t){(0,h.Z)(o,t);var e=(0,c.Z)(o);function o(t,i,r,s){var n;(0,l.Z)(this,o),(n=e.call(this,t,i,r,s)).type="CinematicCamera",n.postprocessing={enabled:!0},n.shaderSettings={rings:3,samples:4};var f=d;return n.materialDepth=new a.ShaderMaterial({uniforms:f.uniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader}),n.materialDepth.uniforms.mNear.value=r,n.materialDepth.uniforms.mFar.value=s,n.setLens(),n.initPostProcessing(),n}return(0,f.Z)(o,[{key:"setLens",value:function(t,e,o,i){void 0===t&&(t=35),void 0!==e&&(this.filmGauge=e),this.setFocalLength(t),void 0===o&&(o=8),void 0===i&&(i=.019),this.fNumber=o,this.coc=i,this.aperture=t/this.fNumber,this.hyperFocal=t*t/(this.aperture*this.coc)}},{key:"linearize",value:function(t){var e=this.far,o=this.near;return-e*o/(t*(e-o)-e)}},{key:"smoothstep",value:function(t,e,o){var i=this.saturate((o-t)/(e-t));return i*i*(3-2*i)}},{key:"saturate",value:function(t){return Math.max(0,Math.min(1,t))}},{key:"focusAt",value:function(t){void 0===t&&(t=20);var e=this.getFocalLength();this.focus=t,this.nearPoint=this.hyperFocal*this.focus/(this.hyperFocal+(this.focus-e)),this.farPoint=this.hyperFocal*this.focus/(this.hyperFocal-(this.focus-e)),this.depthOfField=this.farPoint-this.nearPoint,this.depthOfField<0&&(this.depthOfField=0),this.sdistance=this.smoothstep(this.near,this.far,this.focus),this.ldistance=this.linearize(1-this.sdistance),this.postprocessing.bokeh_uniforms.focalDepth.value=this.ldistance}},{key:"initPostProcessing",value:function(){if(this.postprocessing.enabled){this.postprocessing.scene=new a.Scene,this.postprocessing.camera=new a.OrthographicCamera(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,-1e4,1e4),this.postprocessing.scene.add(this.postprocessing.camera),this.postprocessing.rtTextureDepth=new a.WebGLRenderTarget(window.innerWidth,window.innerHeight),this.postprocessing.rtTextureColor=new a.WebGLRenderTarget(window.innerWidth,window.innerHeight);var t=u;this.postprocessing.bokeh_uniforms=a.UniformsUtils.clone(t.uniforms),this.postprocessing.bokeh_uniforms.tColor.value=this.postprocessing.rtTextureColor.texture,this.postprocessing.bokeh_uniforms.tDepth.value=this.postprocessing.rtTextureDepth.texture,this.postprocessing.bokeh_uniforms.manualdof.value=0,this.postprocessing.bokeh_uniforms.shaderFocus.value=0,this.postprocessing.bokeh_uniforms.fstop.value=2.8,this.postprocessing.bokeh_uniforms.showFocus.value=1,this.postprocessing.bokeh_uniforms.focalDepth.value=.1,this.postprocessing.bokeh_uniforms.znear.value=this.near,this.postprocessing.bokeh_uniforms.zfar.value=this.near,this.postprocessing.bokeh_uniforms.textureWidth.value=window.innerWidth,this.postprocessing.bokeh_uniforms.textureHeight.value=window.innerHeight,this.postprocessing.materialBokeh=new a.ShaderMaterial({uniforms:this.postprocessing.bokeh_uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,defines:{RINGS:this.shaderSettings.rings,SAMPLES:this.shaderSettings.samples,DEPTH_PACKING:1}}),this.postprocessing.quad=new a.Mesh(new a.PlaneGeometry(window.innerWidth,window.innerHeight),this.postprocessing.materialBokeh),this.postprocessing.quad.position.z=-500,this.postprocessing.scene.add(this.postprocessing.quad)}}},{key:"renderCinematic",value:function(t,e){if(this.postprocessing.enabled){var o=e.getRenderTarget();e.clear(),t.overrideMaterial=null,e.setRenderTarget(this.postprocessing.rtTextureColor),e.clear(),e.render(t,this),t.overrideMaterial=this.materialDepth,e.setRenderTarget(this.postprocessing.rtTextureDepth),e.clear(),e.render(t,this),e.setRenderTarget(null),e.render(this.postprocessing.scene,this.postprocessing.camera),e.setRenderTarget(o)}}}]),o}(a.PerspectiveCamera),m=o(6710),g=o(184);(0,n.e)({CinematicCamera:p});var v=0,b=function(t){return(0,n.x)((function(t){var e=t.scene,o=t.camera;v+=.1,o.position.x=100*Math.sin(a.MathUtils.degToRad(v)),o.position.y=100*Math.sin(a.MathUtils.degToRad(v)),o.position.z=100*Math.cos(a.MathUtils.degToRad(v)),o.lookAt(e.position),o.updateMatrixWorld()})),(0,g.jsx)("cinematicCamera",(0,r.Z)((0,r.Z)({},t),{},{args:[60,m.Pf,1,1e3],position:[2,1,500],lens:5}))},x=function(){var t,e=function(e){t=e.object.material.emissive.getHex(),e.object.material.emissive.setHex(16711680)},o=function(e){e.object.material.emissive.setHex(t)};return(0,g.jsx)(g.Fragment,{children:(0,i.Z)(Array(1500)).map((function(t,i){return(0,g.jsxs)("mesh",{position:[800*Math.random()-400,800*Math.random()-400,800*Math.random()-400],onPointerOver:e,onPointerOut:o,children:[(0,g.jsx)("boxGeometry",{args:[20,20,20]}),(0,g.jsx)("meshLambertMaterial",{color:16777215*Math.random()})]},i)}))})},w=function(){return(0,g.jsxs)(s.Xz,{children:[(0,g.jsx)(b,{attach:"camera"}),(0,g.jsx)("color",{attach:"background",args:[15790320]}),(0,g.jsx)("ambientLight",{args:[16777215,.3]}),(0,g.jsx)("directionalLight",{position:[1,1,1],args:[16777215,.35]}),(0,g.jsx)(x,{})]})}}}]);
//# sourceMappingURL=949.3f33ccbe.chunk.js.map