"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[861],{6710:function(n,e,a){a.d(e,{Pf:function(){return r},Uv:function(){return i},fx:function(){return t}});var t=window.innerWidth>640?window.innerWidth-300:window.innerWidth,i=window.innerWidth>640?window.innerHeight:window.innerHeight-48,r=t/i},9861:function(n,e,a){a.r(e);var t=a(7760),i=a(2794),r=a(4647),l=a(3520),o=a(9513),s=a(6710),c=a(184),p=[new t.Plane(new t.Vector3(-1,0,0),0),new t.Plane(new t.Vector3(0,-1,0),0),new t.Plane(new t.Vector3(0,0,-1),0)],d={animate:!0,planeX:{constant:0,negated:!1,displayHelper:!1},planeY:{constant:0,negated:!1,displayHelper:!1},planeZ:{constant:0,negated:!1,displayHelper:!1}},u=p.map((function(n){return new t.PlaneHelper(n,2,16777215)})),h=[],w=new t.PlaneGeometry(4,4),g=new t.TorusKnotGeometry(.4,.15,220,60),m=new t.Group;var f=function(){for(var n=[],e=function(e){var a=new t.Group,i=p[e],r=function(n,e,a){var i=new t.Group,r=new t.MeshBasicMaterial;r.depthWrite=!1,r.depthTest=!1,r.colorWrite=!1,r.stencilWrite=!0,r.stencilFunc=t.AlwaysStencilFunc;var l=r.clone();l.side=t.BackSide,l.clippingPlanes=[e],l.stencilFail=t.IncrementWrapStencilOp,l.stencilZFail=t.IncrementWrapStencilOp,l.stencilZPass=t.IncrementWrapStencilOp;var o=new t.Mesh(n,l);o.renderOrder=a,i.add(o);var s=r.clone();s.side=t.FrontSide,s.clippingPlanes=[e],s.stencilFail=t.DecrementWrapStencilOp,s.stencilZFail=t.DecrementWrapStencilOp,s.stencilZPass=t.DecrementWrapStencilOp;var c=new t.Mesh(n,s);return c.renderOrder=a,i.add(c),i}(g,i,e+1),l=new t.MeshStandardMaterial({color:15277667,metalness:.1,roughness:.75,clippingPlanes:p.filter((function(n){return n!==i})),stencilWrite:!0,stencilRef:0,stencilFunc:t.NotEqualStencilFunc,stencilFail:t.ReplaceStencilOp,stencilZFail:t.ReplaceStencilOp,stencilZPass:t.ReplaceStencilOp}),o=new t.Mesh(w,l);o.onAfterRender=function(n){n.clearStencil()},o.renderOrder=e+11,m.add(r),a.add(o),h.push(o),n.push((0,c.jsx)("primitive",{object:a},e))},a=0;a<3;a++)e(a);var r=new t.MeshStandardMaterial({color:16761095,metalness:.1,roughness:.75,clippingPlanes:p,clipShadows:!0,shadowSide:t.DoubleSide}),l=new t.Mesh(g,r);return l.castShadow=!0,l.renderOrder=6,m.add(l),(0,i.x)((function(n,e){d.animate&&(m.rotation.x+=.5*e,m.rotation.y+=.2*e);for(var a=0;a<h.length;a++){var t=p[a],i=h[a];t.coplanarPoint(i.position),i.lookAt(i.position.x-t.normal.x,i.position.y-t.normal.y,i.position.z-t.normal.z)}})),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("primitive",{object:m}),n]})},v=function(){return(0,c.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-1,0],receiveShadow:!0,children:[(0,c.jsx)("planeGeometry",{args:[9,9,1,1]}),(0,c.jsx)("shadowMaterial",{color:0,opacity:.25,side:t.DoubleSide})]})},x=function(){var n=(0,i.w)().gl;return n.setClearColor(2503224),n.localClippingEnabled=!0,(0,o.M4)({animate:{value:d.animate,onChange:function(n){return d.animate=n}}}),(0,o.M4)("planeX",{displayHelper:{value:d.planeX.displayHelper,onChange:function(n){return u[0].visible=n}},contant:{value:d.planeX.constant,min:-1,max:1,onChange:function(n){return p[0].constant=n}},negated:{value:d.planeX.negated,onChange:function(){p[0].negate(),d.planeX.constant=p[0].constant}}}),(0,o.M4)("planeY",{displayHelper:{value:d.planeY.displayHelper,onChange:function(n){return u[1].visible=n}},contant:{value:d.planeY.constant,min:-1,max:1,onChange:function(n){return p[1].constant=n}},negated:{value:d.planeY.negated,onChange:function(){p[1].negate(),d.planeY.constant=p[1].constant}}}),(0,o.M4)("planeZ",{displayHelper:{value:d.planeZ.displayHelper,onChange:function(n){return u[2].visible=n}},contant:{value:d.planeZ.constant,min:-1,max:1,onChange:function(n){return p[2].constant=n}},negated:{value:d.planeZ.negated,onChange:function(){p[2].negate(),d.planeZ.constant=p[2].constant}}}),null};e.default=function(){return(0,c.jsxs)(r.Xz,{camera:{position:[2,2,2],fov:36,aspect:s.Pf,near:1,far:100},shadows:!0,children:[(0,c.jsx)("ambientLight",{args:[16777215,.5]}),(0,c.jsx)("directionalLight",{args:[16777215,1],position:[5,10,7.5],castShadow:!0,"shadow-mapSize":[1024,1024],children:(0,c.jsx)("orthographicCamera",{attach:"shadow-camera",args:[-2,2,2,-2]})}),(0,c.jsx)(c.Fragment,{children:u.map((function(n,e){return n.visible=!1,(0,c.jsx)("primitive",{object:n},e)}))}),(0,c.jsx)(f,{}),(0,c.jsx)(v,{}),(0,c.jsx)(x,{}),(0,c.jsx)(l.z,{minDistance:2,maxDistance:20})]})}}}]);
//# sourceMappingURL=861.722613ce.chunk.js.map