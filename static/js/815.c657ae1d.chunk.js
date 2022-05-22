"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[815],{6710:function(e,r,t){t.d(r,{Pf:function(){return a},Uv:function(){return i},fx:function(){return n}});var n=window.innerWidth>640?window.innerWidth-300:window.innerWidth,i=window.innerWidth>640?window.innerHeight:window.innerHeight-48,a=n/i},6815:function(e,r,t){t.r(r);var n=t(2791),i=t(7760),a=t(2794),s=t(4647),o=t(580),c=t(6710),u=t(6314),h=t(184),m=function(){var e=(0,n.useMemo)((function(){var e=(new i.TextureLoader).load(u);e.wrapS=e.wrapT=i.RepeatWrapping,e.anisotropy=16;for(var r=new i.MeshPhongMaterial({map:e,side:i.DoubleSide}),t=[],n=0;n<50;n++)t.push(new i.Vector2(Math.sin(.2*n)*Math.sin(.1*n)*15+50,2*(n-5)));return{material:r,points:t}}),[]),r=e.material,t=e.points;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("mesh",{material:r,position:[-300,0,200],children:(0,h.jsx)("sphereGeometry",{args:[75,20,10]})}),(0,h.jsx)("mesh",{material:r,position:[-100,0,200],children:(0,h.jsx)("icosahedronGeometry",{args:[75,1]})}),(0,h.jsx)("mesh",{material:r,position:[100,0,200],children:(0,h.jsx)("octahedronGeometry",{args:[75,2]})}),(0,h.jsx)("mesh",{material:r,position:[300,0,200],children:(0,h.jsx)("tetrahedronGeometry",{args:[75,0]})}),(0,h.jsx)("mesh",{material:r,position:[-300,0,0],children:(0,h.jsx)("planeGeometry",{args:[100,100,4,4]})}),(0,h.jsx)("mesh",{material:r,position:[-100,0,0],children:(0,h.jsx)("boxGeometry",{args:[100,100,100,4,4,4]})}),(0,h.jsx)("mesh",{material:r,position:[100,0,0],children:(0,h.jsx)("circleGeometry",{args:[50,20,0,2*Math.PI]})}),(0,h.jsx)("mesh",{material:r,position:[300,0,0],children:(0,h.jsx)("ringGeometry",{args:[10,50,20,5,0,2*Math.PI]})}),(0,h.jsx)("mesh",{material:r,position:[-300,0,-200],children:(0,h.jsx)("cylinderGeometry",{args:[25,75,100,40,5]})}),(0,h.jsx)("mesh",{material:r,position:[-100,0,-200],children:(0,h.jsx)("latheGeometry",{args:[t,20]})}),(0,h.jsx)("mesh",{material:r,position:[100,0,-200],children:(0,h.jsx)("torusGeometry",{args:[50,20,20,20]})}),(0,h.jsx)("mesh",{material:r,position:[300,0,-200],children:(0,h.jsx)("torusKnotGeometry",{args:[50,10,50,20]})})]})},l=function(){return(0,a.x)((function(e){var r=e.scene,t=e.camera,n=.1*e.clock.getElapsedTime();t.position.x=800*Math.cos(n),t.position.z=800*Math.sin(n),t.lookAt(r.position),r.traverse((function(e){e.isMesh&&(e.rotation.x=5*n,e.rotation.y=2.5*n)}))}))};r.default=function(){return(0,h.jsxs)(s.Xz,{gl:{antialias:!0},dpr:devicePixelRatio,children:[(0,h.jsx)(o.c,{args:[45,c.Pf,1,2e3],position:[0,400,0],makeDefault:!0,children:(0,h.jsx)("pointLight",{args:[16777215,.8]})}),(0,h.jsx)("color",{attach:"background",args:[0]}),(0,h.jsx)("ambientLight",{args:[13421772,.4]}),(0,h.jsx)(m,{}),(0,h.jsx)(l,{})]})}},580:function(e,r,t){t.d(r,{c:function(){return u}});var n=t(4925),i=t(7462),a=t(2791),s=t(2794),o=t(3599),c=["makeDefault"],u=a.forwardRef((function(e,r){var t=e.makeDefault,u=(0,n.Z)(e,c),h=(0,s.w)((function(e){return e.set})),m=(0,s.w)((function(e){return e.camera})),l=(0,s.w)((function(e){return e.size})),d=a.useRef();return a.useLayoutEffect((function(){var e=d.current;e&&!u.manual&&(e.aspect=l.width/l.height,e.updateProjectionMatrix())}),[l,u]),a.useLayoutEffect((function(){if(t&&d.current){var e=m;return h((function(){return{camera:d.current}})),function(){return h((function(){return{camera:e}}))}}}),[m,d,t,h]),a.createElement("perspectiveCamera",(0,i.Z)({ref:(0,o.Z)([d,r])},u))}))},6314:function(e,r,t){e.exports=t.p+"static/media/uv_grid_opengl.5286b2c75b5631e4c0ba.jpg"}}]);
//# sourceMappingURL=815.c657ae1d.chunk.js.map