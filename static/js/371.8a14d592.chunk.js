"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[371],{1371:function(e,r,t){t.r(r),t.d(r,{default:function(){return P}});var n,i,a,u,o,c,s,f,h,l=t(2791),d=t(323),p=t(4647),m=t(7219),w=t(4925),x=t(7462),v=t(3599),j=["makeDefault"],g=l.forwardRef((function(e,r){var t=e.makeDefault,n=(0,w.Z)(e,j),i=(0,m.w)((function(e){return e.set})),a=(0,m.w)((function(e){return e.camera})),u=(0,m.w)((function(e){return e.size})),o=l.useRef();return l.useLayoutEffect((function(){var e=o.current;e&&!n.manual&&(e.aspect=u.width/u.height,e.updateProjectionMatrix())}),[u,n]),l.useLayoutEffect((function(){if(t&&o.current){var e=a;return i((function(){return{camera:o.current}})),function(){return i((function(){return{camera:e}}))}}}),[a,o,t,i]),l.createElement("perspectiveCamera",(0,x.Z)({ref:(0,v.Z)([o,r])},n))})),b=["makeDefault"],k=l.forwardRef((function(e,r){var t=e.makeDefault,n=(0,w.Z)(e,b),i=(0,m.w)((function(e){return e.set})),a=(0,m.w)((function(e){return e.camera})),u=(0,m.w)((function(e){return e.size})),o=l.useRef();return l.useLayoutEffect((function(){o.current&&!n.manual&&o.current.updateProjectionMatrix()}),[u,n]),l.useLayoutEffect((function(){if(t&&o.current){var e=a;return i((function(){return{camera:o.current}})),function(){return i((function(){return{camera:e}}))}}}),[a,o,t,i]),l.createElement("orthographicCamera",(0,x.Z)({left:u.width/-2,right:u.width/2,top:u.height/2,bottom:u.height/-2,ref:(0,v.Z)([o,r])},n))})),M=t(6121),y=t(184),E=window.innerWidth>640?window.innerWidth-300:window.innerWidth,R=window.innerWidth>640?window.innerHeight:window.innerHeight-48,C=E/R,H=function(e){switch(e.key){case"o":case"O":f=o,h=s;break;case"p":case"P":f=u,h=c}},Z=function(){var e=(0,m.w)(),r=e.gl,t=e.scene;return(i=r).autoClear=!1,u=(0,l.useRef)(),o=(0,l.useRef)(),c=(0,M.H)(u,d.CameraHelper),s=(0,M.H)(o,d.CameraHelper),(0,l.useEffect)((function(){return f=u,h=c,window.addEventListener("keydown",H),function(){return window.removeEventListener("keydown",H)}}),[]),(0,m.x)((function(){var e=5e-4*Date.now();n&&(n.current.position.set(700*Math.cos(e),700*Math.sin(e),700*Math.sin(e)),n.current.children[0].position.set(70*Math.cos(2*e),0,70*Math.sin(e))),f===u&&0!==n.current.position.length()?(u.fov=35+30*Math.sin(.5*e),u.far=n.current.position.length(),c&&s&&(c.current.update(),c.visible=!0,s.visible=!1)):(o.far=n.current.position.length(),c.current&&s.current&&(s.current.update(),s.visible=!0,c.visible=!1)),o.current&&u.current&&(o.current.lookAt(n.current.position),u.current.lookAt(n.current.position)),i&&h&&(i.clear(),h.visible=!1,i.setViewport(0,0,E/2,R),i.render(t,f.current),h.visible=!0,i.setViewport(E/2,0,E/2,R),i.render(t,a.current))})),(0,y.jsxs)("group",{children:[(0,y.jsx)(g,{fov:50,aspect:.5*C,near:150,far:1e3,rotation:[0,Math.PI,0],ref:u}),(0,y.jsx)(k,{left:-300*C/2,right:300*C/2,top:300,bottom:-300,near:150,far:1e3,rotation:[0,Math.PI,0],ref:o}),(0,y.jsxs)("mesh",{position:[0,0,150],children:[(0,y.jsx)("sphereGeometry",{args:[5,16,8]}),(0,y.jsx)("meshBasicMaterial",{color:255,wireframe:!0})]})]})},D=function(){return a=(0,l.useRef)(),(0,y.jsx)(g,{makeDefault:!0,ref:a,position:[0,0,2500],fov:50,aspect:.5*C,near:1,far:1e4})},L=function(){for(var e=[],r=0;r<1e4;r++)e.push(d.MathUtils.randFloatSpread(2e3)),e.push(d.MathUtils.randFloatSpread(2e3)),e.push(d.MathUtils.randFloatSpread(2e3));return(0,y.jsxs)("points",{children:[(0,y.jsx)("bufferGeometry",{attach:"geometry",children:(0,y.jsx)("bufferAttribute",{name:"position",array:e,itemSize:3})}),(0,y.jsx)("pointsMaterial",{color:8947848})]})},_=function(){return n=(0,l.useRef)(),(0,y.jsxs)("mesh",{ref:n,children:[(0,y.jsx)("sphereGeometry",{args:[100,16,8]}),(0,y.jsx)("meshBasicMaterial",{color:16777215,wireframe:!0}),(0,y.jsxs)("mesh",{position:[0,150,0],children:[(0,y.jsx)("sphereGeometry",{args:[50,16,8]}),(0,y.jsx)("meshBasicMaterial",{color:65280,wireframe:!0})]})]})},P=function(){return(0,y.jsxs)(p.Xz,{camera:{manual:!0},children:[(0,y.jsx)("color",{attach:"background",args:["black"]}),(0,y.jsx)(D,{}),(0,y.jsx)(Z,{}),(0,y.jsx)(_,{}),(0,y.jsx)(L,{})]})}},6121:function(e,r,t){t.d(r,{H:function(){return u}});var n=t(5647),i=t(2791),a=t(7219);function u(e,r){for(var t=arguments.length,u=new Array(t>2?t-2:0),o=2;o<t;o++)u[o-2]=arguments[o];var c=i.useRef(),s=(0,a.w)((function(e){return e.scene}));return i.useEffect((function(){return e&&r&&null!=e&&e.current&&(c.current=(0,n.Z)(r,[e.current].concat(u)),c.current&&s.add(c.current)),!e&&c.current&&s.remove(c.current),function(){c.current&&s.remove(c.current)}}),[s,r,e,u]),(0,a.x)((function(){var e;null!=(e=c.current)&&e.update&&c.current.update()})),c}}}]);
//# sourceMappingURL=371.8a14d592.chunk.js.map