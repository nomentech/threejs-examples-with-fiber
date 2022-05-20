"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[738],{6710:function(e,r,t){t.d(r,{Pf:function(){return a},Uv:function(){return n},fx:function(){return i}});var i=window.innerWidth>640?window.innerWidth-300:window.innerWidth,n=window.innerWidth>640?window.innerHeight:window.innerHeight-48,a=i/n},9466:function(e,r,t){t.r(r),t.d(r,{default:function(){return j}});var i=t(2791),n=t(7760),a=t(4647),s=t(2794),o=t(4925),c=t(7462),u=t(3599),h=["makeDefault"],m=i.forwardRef((function(e,r){var t=e.makeDefault,n=(0,o.Z)(e,h),a=(0,s.w)((function(e){return e.set})),m=(0,s.w)((function(e){return e.camera})),l=(0,s.w)((function(e){return e.size})),d=i.useRef();return i.useLayoutEffect((function(){var e=d.current;e&&!n.manual&&(e.aspect=l.width/l.height,e.updateProjectionMatrix())}),[l,n]),i.useLayoutEffect((function(){if(t&&d.current){var e=m;return a((function(){return{camera:d.current}})),function(){return a((function(){return{camera:e}}))}}}),[m,d,t,a]),i.createElement("perspectiveCamera",(0,c.Z)({ref:(0,u.Z)([d,r])},n))})),l=t(6710),d=t.p+"static/media/uv_grid_opengl.5286b2c75b5631e4c0ba.jpg",p=t(184),f=function(){var e=(0,i.useMemo)((function(){var e=(new n.TextureLoader).load(d);e.wrapS=e.wrapT=n.RepeatWrapping,e.anisotropy=16;for(var r=new n.MeshPhongMaterial({map:e,side:n.DoubleSide}),t=[],i=0;i<50;i++)t.push(new n.Vector2(Math.sin(.2*i)*Math.sin(.1*i)*15+50,2*(i-5)));return{material:r,points:t}}),[]),r=e.material,t=e.points;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("mesh",{material:r,position:[-300,0,200],children:(0,p.jsx)("sphereGeometry",{args:[75,20,10]})}),(0,p.jsx)("mesh",{material:r,position:[-100,0,200],children:(0,p.jsx)("icosahedronGeometry",{args:[75,1]})}),(0,p.jsx)("mesh",{material:r,position:[100,0,200],children:(0,p.jsx)("octahedronGeometry",{args:[75,2]})}),(0,p.jsx)("mesh",{material:r,position:[300,0,200],children:(0,p.jsx)("tetrahedronGeometry",{args:[75,0]})}),(0,p.jsx)("mesh",{material:r,position:[-300,0,0],children:(0,p.jsx)("planeGeometry",{args:[100,100,4,4]})}),(0,p.jsx)("mesh",{material:r,position:[-100,0,0],children:(0,p.jsx)("boxGeometry",{args:[100,100,100,4,4,4]})}),(0,p.jsx)("mesh",{material:r,position:[100,0,0],children:(0,p.jsx)("circleGeometry",{args:[50,20,0,2*Math.PI]})}),(0,p.jsx)("mesh",{material:r,position:[300,0,0],children:(0,p.jsx)("ringGeometry",{args:[10,50,20,5,0,2*Math.PI]})}),(0,p.jsx)("mesh",{material:r,position:[-300,0,-200],children:(0,p.jsx)("cylinderGeometry",{args:[25,75,100,40,5]})}),(0,p.jsx)("mesh",{material:r,position:[-100,0,-200],children:(0,p.jsx)("latheGeometry",{args:[t,20]})}),(0,p.jsx)("mesh",{material:r,position:[100,0,-200],children:(0,p.jsx)("torusGeometry",{args:[50,20,20,20]})}),(0,p.jsx)("mesh",{material:r,position:[300,0,-200],children:(0,p.jsx)("torusKnotGeometry",{args:[50,10,50,20]})})]})},x=function(){return(0,s.x)((function(e){var r=e.scene,t=e.camera,i=.1*e.clock.getElapsedTime();t.position.x=800*Math.cos(i),t.position.z=800*Math.sin(i),t.lookAt(r.position),r.traverse((function(e){e.isMesh&&(e.rotation.x=5*i,e.rotation.y=2.5*i)}))}))},j=function(){return(0,p.jsxs)(a.Xz,{gl:{antialias:!0},dpr:devicePixelRatio,children:[(0,p.jsx)(m,{args:[45,l.Pf,1,2e3],position:[0,400,0],makeDefault:!0,children:(0,p.jsx)("pointLight",{args:[16777215,.8]})}),(0,p.jsx)("color",{attach:"background",args:[0]}),(0,p.jsx)("ambientLight",{args:[13421772,.4]}),(0,p.jsx)(f,{}),(0,p.jsx)(x,{})]})}}}]);
//# sourceMappingURL=738.49a718cd.chunk.js.map