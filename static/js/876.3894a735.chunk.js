"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[876],{6710:function(e,n,r){r.d(n,{Pf:function(){return a},Uv:function(){return t},fx:function(){return i}});var i=window.innerWidth>640?window.innerWidth-300:window.innerWidth,t=window.innerWidth>640?window.innerHeight:window.innerHeight-48,a=i/t},2876:function(e,n,r){r.r(n);var i,t,a=r(2791),s=r(323),o=r(7786),c=r(4647),l=r(3520),h=r(6710),p=r(184),d={clipIntersection:!0,planeConstant:0,showHelpers:!1},u=[new s.Plane(new s.Vector3(1,0,0),0),new s.Plane(new s.Vector3(0,-1,0),0),new s.Plane(new s.Vector3(0,0,-1),0)];n.default=function(){i=(0,a.useRef)(),t=(0,a.useRef)();for(var e=[],n=1;n<=30;n+=2)e.push((0,p.jsxs)("mesh",{children:[(0,p.jsx)("sphereGeometry",{args:[n/30,48,24]}),(0,p.jsx)("meshLambertMaterial",{color:(new s.Color).setHSL(Math.random(),.5,.5),side:s.DoubleSide,clippingPlanes:u,clipIntersection:d.clipIntersection})]},n));return(0,p.jsxs)(c.Xz,{camera:{position:[-1.5,2.5,3],fov:40,aspect:h.Pf,near:1,far:200},onCreated:function(e){return function(e){var n=e.gl,r=e.scene,a=e.camera;n.localClippingEnabled=!0;var s=new o.XS;s.add(d,"clipIntersection").name("clip intersection").onChange((function(e){for(var t=i.current.children,s=0;s<t.length;s++)t[s].material.clipIntersection=e;n.render(r,a)})),s.add(d,"planeConstant",-1,1).step(.01).name("plane constant").onChange((function(e){for(var i=0;i<u.length;i++)u[i].constant=e;n.render(r,a)})),s.add(d,"showHelpers").name("show helpers").onChange((function(e){t.current.visible=e,n.render(r,a)}))}(e)},children:[(0,p.jsx)("color",{attach:"background",args:["black"]}),(0,p.jsx)("hemisphereLight",{args:[16777215,526344,1.5],position:[-1.25,1,1.25]}),(0,p.jsx)("group",{ref:i,children:e}),(0,p.jsxs)("group",{ref:t,visible:!1,children:[(0,p.jsx)("planeHelper",{args:[u[0],2,16711680]}),(0,p.jsx)("planeHelper",{args:[u[1],2,65280]}),(0,p.jsx)("planeHelper",{args:[u[2],2,255]})]}),(0,p.jsx)(l.z,{minDistance:1,maxDistance:10,enablePan:!1})]})}}}]);
//# sourceMappingURL=876.3894a735.chunk.js.map