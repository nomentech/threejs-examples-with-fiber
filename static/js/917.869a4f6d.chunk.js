"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[917],{8917:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var r=t(2791),i=t(4647),a=t(7219),o=t(3655),s=t(323);function c(e){var n=new Map,t=new Map,r=e.clone();return h(e,r,(function(e,r){n.set(r,e),t.set(e,r)})),r.traverse((function(e){if(e.isSkinnedMesh){var r=e,i=n.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map((function(e){return t.get(e)})),r.bind(r.skeleton,r.bindMatrix)}})),r}function h(e,n,t){t(e,n);for(var r=0;r<e.children.length;r++)h(e.children[r],n.children[r],t)}var l=t(184),u="".concat("/threejs-examples-with-fiber","/models/Soldier.glb");o.L.preload(u);var d=[],f=function(){var e=(0,o.L)(u),n=e.scene,t=e.animations,i=c(n),h=c(n),f=c(n),p=new s.AnimationMixer(i),m=new s.AnimationMixer(h),x=new s.AnimationMixer(f);return p.clipAction(t[0]).play(),m.clipAction(t[1]).play(),x.clipAction(t[3]).play(),i.position.x=-2,f.position.x=2,d.push(p,m,x),(0,r.useEffect)((function(){n.traverse((function(e){return e.isMesh&&(e.castShadow=!0)}))}),[n]),(0,a.x)((function(e,n){d.forEach((function(e){return e.update(n)}))})),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("primitive",{object:i}),(0,l.jsx)("primitive",{object:h}),(0,l.jsx)("primitive",{object:f})]})},p=function(){return(0,l.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[(0,l.jsx)("planeGeometry",{args:[200,200]}),(0,l.jsx)("meshPhongMaterial",{color:10066329,depthWrite:!1})]})},m=function(){return(0,l.jsxs)(i.Xz,{camera:{position:[2,3,-6],fov:45,near:1,far:1e3},dpr:[1,2],shadows:!0,onCreated:function(e){return e.camera.lookAt(0,1,0)},children:[(0,l.jsx)("color",{attach:"background",args:[10526880]}),(0,l.jsx)("fog",{attach:"fog",args:[10526880,10,50]}),(0,l.jsx)("hemisphereLight",{position:[0,20,0],args:[16777215,4473924]}),(0,l.jsx)("directionalLight",{position:[-3,10,-10],args:[16777215],castShadow:!0,"shadow-camera-top":4,"shadow-camera-bottom":-4,"shadow-camera-left":-4,"shadow-camera-right":4,"shadow-camera-near":.1,"shadow-camera-far":40}),(0,l.jsx)(p,{}),(0,l.jsx)(f,{})]})}}}]);
//# sourceMappingURL=917.869a4f6d.chunk.js.map