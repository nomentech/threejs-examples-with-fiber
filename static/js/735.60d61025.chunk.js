"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[735],{6710:function(n,e,a){a.d(e,{Pf:function(){return i},Uv:function(){return t},fx:function(){return r}});var r=window.innerWidth>640?window.innerWidth-300:window.innerWidth,t=window.innerWidth>640?window.innerHeight:window.innerHeight-48,i=r/t},7735:function(n,e,a){a.r(e);var r,t,i,o=a(2791),s=a(7760),l=a(2794),c=a(4150),h=a(3520),p=a(9513),u=a(6710),d=a(184),w=function(){var n=new s.Vector3,e=new s.Vector3,a=new s.Vector3;return function(r){var t=r.normal,i=new s.Matrix4;return Math.abs(t.x)>Math.abs(t.z)?e.set(-t.y,t.x,0):e.set(0,-t.z,t.y),n.crossVectors(e.normalize(),t),r.coplanarPoint(a),i.set(n.x,e.x,t.x,a.x,n.y,e.y,t.y,a.y,n.z,e.z,t.z,a.z,0,0,0,1)}}(),f=function(n){for(var e=new Array(n),a=0;a!==n;++a)e[a]=new s.Plane;return e},g=function(n,e,a){for(var r=0,t=e.length;r!==t;++r)n[r].copy(e[r]).applyMatrix4(a)},x=function(n,e){var a=n.parent;n.matrix.copy(a.matrixWorld).invert(),n.applyMatrix4(e)},m=function(n,e){for(var a=e.length/3,r=new Array(a),t=0,i=0;t<a;++t,i+=3){var o=n[e[i]],l=n[e[i+1]],c=n[e[i+2]];r[t]=(new s.Plane).setFromCoplanarPoints(o,l,c)}return r}([new s.Vector3(1,0,Math.SQRT1_2),new s.Vector3(-1,0,Math.SQRT1_2),new s.Vector3(0,1,-Math.SQRT1_2),new s.Vector3(0,-1,-Math.SQRT1_2)],[0,1,2,0,2,3,0,3,1,1,3,2]),v=m.map(w),M=function(n,e){for(var a=f(n),r=0;r!==n;++r){var t=a[r],i=r*Math.PI*2/n;t.normal.set(Math.cos(i),0,Math.sin(i)),t.constant=e}return a}(5,2.5),b=Object.freeze([]),j=new s.Matrix4,y=new s.Matrix4,P=function(){var n=(0,l.w)().gl;return t=f(M.length),n.clippingPlanes=b,n.localClippingEnabled=!0,(0,p.M4)("Local Clipping",{Enabled:{value:n.localClippingEnabled,onChange:function(e){n.localClippingEnabled=e,e||(i.visible=!1)}},Shadow:{value:r.clipShadows,onChange:function(n){return r.clipShadows=n}},Visualize:{value:i.visible,onChange:function(e){n.localClippingEnabled&&(i.visible=e)}}}),(0,p.M4)("Global Clipping",{Enabled:{value:n.clippingPlanes!==b,onChange:function(e){n.clippingPlanes=e?t:b}}}),null},S=function(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("ambientLight",{args:[16777215,.3]}),(0,d.jsx)("spotLight",{color:16777215,intensity:.5,angle:Math.PI/5,penumbra:.2,position:[2,3,3],castShadow:!0,"shadow-camera-near":3,"shadow-camera-far":10,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),(0,d.jsx)("directionalLight",{color:16777215,intensity:.5,position:[0,2,0],castShadow:!0,"shadow-mapSize":[1024,1024],children:(0,d.jsx)("orthographicCamera",{attach:"shadow-camera",args:[-1,1,1,-1,1,10]})})]})},C=function(){r=new s.MeshPhongMaterial({color:15600144,shininess:100,side:s.DoubleSide,clippingPlanes:f(m.length),clipShadows:!0});var n=(0,o.useRef)();(0,l.x)((function(e){var a=e.clock.getElapsedTime();n.current.position.y=1,n.current.rotation.x=.5*a,n.current.rotation.y=.2*a,n.current.updateMatrix(),j.copy(n.current.matrix);var o=.5*Math.cos(.5*a)+.7;j.multiply(y.makeScale(o,o,o)),g(r.clippingPlanes,m,j);for(var s=i.children,l=0,c=s.length;l!==c;++l)y.multiplyMatrices(j,v[l]),x(s[l],y);j.makeRotationY(.1*a),g(t,M,j)}));for(var e=[],a=-2;a<=2;++a)for(var c=-2;c<=2;++c)for(var h=-2;h<=2;++h)e.push((0,d.jsx)("mesh",{material:r,position:[h/5,c/5,a/5],castShadow:!0,children:(0,d.jsx)("boxGeometry",{args:[.18,.18,.18]})},Math.random()));return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("group",{ref:n,children:e})})},z=function(){(i=new s.Group).visible=!1;for(var n=new s.PlaneGeometry(3,3,1,1),e=new s.Color,a=function(a,t){var o=new s.MeshBasicMaterial({color:e.setHSL(a/t,.5,.5).getHex(),side:s.DoubleSide,opacity:.2,transparent:!0,clippingPlanes:r.clippingPlanes.filter((function(n,e){return e!==a}))}),l=new s.Mesh(n,o);l.matrixAutoUpdate=!1,i.add(l)},t=0,o=m.length;t!==o;++t)a(t,o);return(0,d.jsx)("primitive",{object:i})},_=function(){return(0,d.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],scale:3,receiveShadow:!0,children:[(0,d.jsx)("planeGeometry",{args:[3,3,1,1]}),(0,d.jsx)("meshPhongMaterial",{color:10530223,shininess:10})]})};e.default=function(){return(0,d.jsxs)(c.Xz,{camera:{position:[0,1.5,3],fov:36,aspect:u.Pf,near:.25,far:16},shadows:!0,children:[(0,d.jsx)("color",{attach:"background",args:["black"]}),(0,d.jsx)(S,{}),(0,d.jsx)(C,{}),(0,d.jsx)(_,{}),(0,d.jsx)(z,{}),(0,d.jsx)(P,{}),(0,d.jsx)(h.z,{target:[0,1,0],minDistance:1,maxDistance:8})]})}}}]);
//# sourceMappingURL=735.60d61025.chunk.js.map