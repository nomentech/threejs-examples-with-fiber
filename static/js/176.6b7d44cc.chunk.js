"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[176],{6710:function(e,r,t){t.d(r,{Pf:function(){return a},Uv:function(){return i},fx:function(){return n}});var n=window.innerWidth>640?window.innerWidth-300:window.innerWidth,i=window.innerWidth>640?window.innerHeight:window.innerHeight-48,a=n/i},176:function(e,r,t){t.r(r);var n,i,a,s,c,u,o,f,l,h=t(2791),p=t(7760),d=t(2794),x=t(4647),j=t(6121),m=t(6710),w=t(184);document.addEventListener("keydown",(function(e){switch(e.key){case"o":case"O":o=s,f=u;break;case"p":case"P":o=a,f=c}}));var v=function(){return i=(0,h.useRef)(),(0,w.jsx)("perspectiveCamera",{ref:i,position:[0,0,2500],fov:50,aspect:.5*m.Pf,near:1,far:1e4})},g=function(){for(var e=[],r=0;r<1e4;r++)e.push(p.MathUtils.randFloatSpread(2e3)),e.push(p.MathUtils.randFloatSpread(2e3)),e.push(p.MathUtils.randFloatSpread(2e3));return(0,w.jsxs)("points",{children:[(0,w.jsx)("bufferGeometry",{attach:"geometry",children:(0,w.jsx)("bufferAttribute",{attach:"attributes-position",args:[new Float32Array(e),3]})}),(0,w.jsx)("pointsMaterial",{color:8947848})]})},b=function(){return n=(0,h.useRef)(),(0,w.jsxs)("mesh",{ref:n,children:[(0,w.jsx)("sphereGeometry",{args:[100,16,8]}),(0,w.jsx)("meshBasicMaterial",{color:16777215,wireframe:!0}),(0,w.jsxs)("mesh",{position:[0,150,0],children:[(0,w.jsx)("sphereGeometry",{args:[50,16,8]}),(0,w.jsx)("meshBasicMaterial",{color:65280,wireframe:!0})]})]})},M=function(){return l=(0,h.useRef)(),a=(0,h.useRef)(),s=(0,h.useRef)(),o=a,(0,w.jsxs)("group",{ref:l,children:[(0,w.jsx)("perspectiveCamera",{ref:a,rotation:[0,Math.PI,0],args:[50,.5*m.Pf,150,1e3]}),(0,w.jsx)("orthographicCamera",{ref:s,rotation:[0,Math.PI,0],args:[-300*m.Pf/2,300*m.Pf/2,300,-300,150,1e3]}),(0,w.jsxs)("mesh",{children:[(0,w.jsx)("sphereGeometry",{args:[5,16,8]}),(0,w.jsx)("meshBasicMaterial",{color:"#0000ff",wireframe:!0})]})]})},P=function(){return c=(0,j.H)(a,p.CameraHelper),u=(0,j.H)(s,p.CameraHelper),f=c,null},k=function(){return(0,d.x)((function(e){var r=e.gl,t=e.scene,h=e.set,p=5e-4*Date.now();n.current.position.set(700*Math.cos(p),700*Math.sin(p),700*Math.sin(p)),n.current.children[0].position.set(70*Math.cos(2*p),0,70*Math.sin(p)),o===a?(a.current.fov=35+30*Math.sin(.5*p),a.current.far=n.current.position.length(),a.current.updateProjectionMatrix(),c.current.update(),c.current.visible=!0,u.current.visible=!1):(s.current.far=n.current.position.length(),s.current.updateProjectionMatrix(),u.current.update(),u.current.visible=!0,c.current.visible=!1),l.current.lookAt(n.current.position),r.clear(),f.current.visible=!1,r.setViewport(0,0,m.fx/2,m.Uv),h({camera:o.current}),r.render(t,o.current),f.current.visible=!0,r.setViewport(m.fx/2,0,m.fx/2,m.Uv),h({camera:i.current}),r.render(t,i.current)}))};r.default=function(){return(0,w.jsxs)(x.Xz,{gl:{antialias:!0,pixelRatio:m.Pf,autoClear:!1},camera:{manual:!0},children:[(0,w.jsx)("color",{attach:"background",args:["black"]}),(0,w.jsx)(b,{}),(0,w.jsx)(v,{}),(0,w.jsx)(M,{}),(0,w.jsx)(P,{}),(0,w.jsx)(g,{}),(0,w.jsx)(k,{})]})}},6121:function(e,r,t){t.d(r,{H:function(){return s}});var n=t(5647),i=t(2791),a=t(2794);function s(e,r){for(var t=arguments.length,s=new Array(t>2?t-2:0),c=2;c<t;c++)s[c-2]=arguments[c];var u=i.useRef(),o=(0,a.w)((function(e){return e.scene}));return i.useEffect((function(){return e&&r&&null!=e&&e.current&&(u.current=(0,n.Z)(r,[e.current].concat(s)),u.current&&o.add(u.current)),!e&&u.current&&o.remove(u.current),function(){u.current&&o.remove(u.current)}}),[o,r,e,s]),(0,a.x)((function(){var e;null!=(e=u.current)&&e.update&&u.current.update()})),u}}}]);
//# sourceMappingURL=176.6b7d44cc.chunk.js.map