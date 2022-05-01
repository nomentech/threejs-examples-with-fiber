"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[735],{6710:function(e,n,r){r.d(n,{Pf:function(){return i},Uv:function(){return t},fx:function(){return a}});var a=window.innerWidth>640?window.innerWidth-300:window.innerWidth,t=window.innerWidth>640?window.innerHeight:window.innerHeight-48,i=a/t},7735:function(e,n,r){r.r(n);var a,t,i,o,s,l=r(2791),c=r(323),h=r(7786),d=r(7219),u=r(4647),p=r(3520),w=r(6710),f=r(184),g=function(){var e=new c.Vector3,n=new c.Vector3,r=new c.Vector3;return function(a){var t=a.normal,i=new c.Matrix4;return Math.abs(t.x)>Math.abs(t.z)?n.set(-t.y,t.x,0):n.set(0,-t.z,t.y),e.crossVectors(n.normalize(),t),a.coplanarPoint(r),i.set(e.x,n.x,t.x,r.x,e.y,n.y,t.y,r.y,e.z,n.z,t.z,r.z,0,0,0,1)}}(),x=function(e){for(var n=new Array(e),r=0;r!==e;++r)n[r]=new c.Plane;return n},m=function(e,n,r){for(var a=0,t=n.length;a!==t;++a)e[a].copy(n[a]).applyMatrix4(r)},b=function(e,n){var r=e.parent;e.matrix.copy(r.matrixWorld).invert(),e.applyMatrix4(n)},v=function(e,n){for(var r=n.length/3,a=new Array(r),t=0,i=0;t<r;++t,i+=3){var o=e[n[i]],s=e[n[i+1]],l=e[n[i+2]];a[t]=(new c.Plane).setFromCoplanarPoints(o,s,l)}return a}([new c.Vector3(1,0,Math.SQRT1_2),new c.Vector3(-1,0,Math.SQRT1_2),new c.Vector3(0,1,-Math.SQRT1_2),new c.Vector3(0,-1,-Math.SQRT1_2)],[0,1,2,0,2,3,0,3,1,1,3,2]),j=v.map(g),M=function(e,n){for(var r=x(e),a=0;a!==e;++a){var t=r[a],i=a*Math.PI*2/e;t.normal.set(Math.cos(i),0,Math.sin(i)),t.constant=n}return r}(5,2.5),y=Object.freeze([]),S=new c.Matrix4,P=new c.Matrix4,z=function(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("ambientLight",{args:[16777215,.3]}),(0,f.jsx)("spotLight",{color:16777215,intensity:.5,angle:Math.PI/5,penumbra:.2,position:[2,3,3],castShadow:!0,"shadow-camera-near":3,"shadow-camera-far":10,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),(0,f.jsx)("directionalLight",{color:16777215,intensity:.5,position:[0,2,0],castShadow:!0,"shadow-mapSize":[1024,1024],children:(0,f.jsx)("orthographicCamera",{attach:"shadow-camera",args:[-1,1,1,-1,1,10]})})]})},E=function(){var e=(0,d.w)().gl;a=e,i=x(M.length),e.clippingPlanes=y,e.localClippingEnabled=!0,t=new c.MeshPhongMaterial({color:15600144,shininess:100,side:c.DoubleSide,clippingPlanes:x(v.length),clipShadows:!0});var n=(0,l.useRef)();(0,d.x)((function(){var e=(Date.now()-o)/1e3;n.current.position.y=1,n.current.rotation.x=.5*e,n.current.rotation.y=.2*e,n.current.updateMatrix(),S.copy(n.current.matrix);var r=.5*Math.cos(.5*e)+.7;S.multiply(P.makeScale(r,r,r)),m(t.clippingPlanes,v,S);for(var a=s.current.children,l=0,c=a.length;l!==c;++l)P.multiplyMatrices(S,j[l]),b(a[l],P);S.makeRotationY(.1*e),m(i,M,S)}));for(var r=[],h=-2;h<=2;++h)for(var u=-2;u<=2;++u)for(var p=-2;p<=2;++p)r.push((0,f.jsx)("mesh",{material:t,position:[p/5,u/5,h/5],castShadow:!0,children:(0,f.jsx)("boxGeometry",{args:[.18,.18,.18]})},Math.random()));return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("group",{ref:n,children:r}),(0,f.jsx)(C,{})]})},C=function(){for(var e=[],n=new c.Color,r=function(r,a){e.push((0,f.jsxs)("mesh",{matrixAutoUpdate:!1,children:[(0,f.jsx)("planeGeometry",{args:[3,3,1,1]}),(0,f.jsx)("meshBasicMaterial",{color:n.setHSL(r/a,.5,.5).getHex(),side:c.DoubleSide,opacity:.2,transparent:!0,clippingPlanes:t.clippingPlanes.filter((function(e,n){return n!==r}))})]},Math.random()))},o=0,d=v.length;o!==d;++o)r(o,d);return s=(0,l.useRef)(),(0,l.useEffect)((function(){s.current.visible=!1,function(){var e=new h.XS,n=e.addFolder("Local Clipping"),r={get Enabled(){return a.localClippingEnabled},set Enabled(e){a.localClippingEnabled=e,e||(s.current.visible=!1)},get Shadows(){return t.clipShadows},set Shadows(e){t.clipShadows=e},get Visualize(){return s.current.visible},set Visualize(e){a.localClippingEnabled&&(s.current.visible=e)}};n.add(r,"Enabled"),n.add(r,"Shadows"),n.add(r,"Visualize").listen(),e.addFolder("Global Clipping").add({get Enabled(){return a.clippingPlanes!==y},set Enabled(e){a.clippingPlanes=e?i:y}},"Enabled")}()}),[]),(0,f.jsx)(f.Fragment,{children:(0,f.jsx)("group",{ref:s,children:e})})},V=function(){return(0,f.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],scale:3,receiveShadow:!0,children:[(0,f.jsx)("planeGeometry",{args:[3,3,1,1]}),(0,f.jsx)("meshPhongMaterial",{color:10530223,shininess:10})]})};n.default=function(){return(0,l.useEffect)((function(){o=Date.now()}),[]),(0,f.jsxs)(u.Xz,{camera:{position:[0,1.5,3],fov:36,aspect:w.Pf,near:.25,far:16},shadows:!0,children:[(0,f.jsx)("color",{attach:"background",args:["black"]}),(0,f.jsx)(z,{}),(0,f.jsx)(E,{}),(0,f.jsx)(V,{}),(0,f.jsx)(p.z,{target:[0,1,0],minDistance:1,maxDistance:8})]})}}}]);
//# sourceMappingURL=735.a5d69cbc.chunk.js.map