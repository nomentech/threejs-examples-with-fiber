"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[777],{6710:function(e,t,r){r.d(t,{Pf:function(){return a},Uv:function(){return s},fx:function(){return n}});var n=window.innerWidth>640?window.innerWidth-300:window.innerWidth,s=window.innerWidth>640?window.innerHeight:window.innerHeight-48,a=n/s},7777:function(e,t,r){r.r(t);var n=r(2791),s=r(7760),a=r(4647),i=r(9377),o=r(6710),h=r(184),c=function(){var e=(0,n.useMemo)((function(){var e=new s.CatmullRomCurve3([new s.Vector3(-60,-100,60),new s.Vector3(-60,20,60),new s.Vector3(-60,120,60),new s.Vector3(60,20,-60),new s.Vector3(60,-100,-60)]);e.curveType="catmullrom",e.closed=!0;for(var t={steps:100,bevelEnabled:!1,extrudePath:e},r=[],n=0;n<3;n++){var a=2*n/3*Math.PI;r.push(new s.Vector2(20*Math.cos(a),20*Math.sin(a)))}return{shape1:new s.Shape(r),extrudeSettings1:t}}),[]),t=e.shape1,r=e.extrudeSettings1,a=(0,n.useMemo)((function(){for(var e=[],t=0;t<10;t++)e.push(new s.Vector3(50*(t-4.5),s.MathUtils.randFloat(-50,50),s.MathUtils.randFloat(-50,50)));for(var r={steps:200,bevelEnabled:!1,extrudePath:new s.CatmullRomCurve3(e)},n=[],a=0;a<10;a++){var i=a%2==1?10:20,o=a/5*Math.PI;n.push(new s.Vector2(Math.cos(o)*i,Math.sin(o)*i))}return{shape2:new s.Shape(n),extrudeSettings2:r}}),[]),i=a.shape2,o=a.extrudeSettings2;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("mesh",{children:[(0,h.jsx)("extrudeGeometry",{args:[t,r]}),(0,h.jsx)("meshLambertMaterial",{color:"#b00000",wireframe:!1})]}),(0,h.jsxs)("mesh",{children:[(0,h.jsx)("extrudeGeometry",{args:[i,o]}),(0,h.jsx)("meshLambertMaterial",{color:"#ff8000",wireframe:!1})]}),(0,h.jsxs)("mesh",{position:[50,100,50],children:[(0,h.jsx)("extrudeGeometry",{args:[i,{depth:20,steps:1,bevelEnabled:!0,bevelThickness:2,bevelSize:4,bevelSegments:1}]}),(0,h.jsx)("meshLambertMaterial",{color:"#b00000"}),(0,h.jsx)("meshLambertMaterial",{color:"#ff8000"})]})]})};t.default=function(){return(0,h.jsxs)(a.Xz,{camera:{position:[0,0,500],fov:45,aspect:o.Pf,near:1,far:1e3},children:[(0,h.jsx)("color",{attach:"background",args:[2236962]}),(0,h.jsx)("ambientLight",{args:[2236962]}),(0,h.jsx)("pointLight",{args:[16777215],position:[0,0,500]}),(0,h.jsx)(c,{}),(0,h.jsx)(i.$,{minDistance:200,maxDistance:500})]})}}}]);
//# sourceMappingURL=777.4520b00c.chunk.js.map