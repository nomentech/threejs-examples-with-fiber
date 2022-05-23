"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[605],{6710:function(t,e,n){n.d(e,{Pf:function(){return o},Uv:function(){return a},fx:function(){return r}});var r=window.innerWidth>640?window.innerWidth-300:window.innerWidth,a=window.innerWidth>640?window.innerHeight:window.innerHeight-48,o=r/a},7605:function(t,e,n){n.r(e),n.d(e,{default:function(){return A}});var r=n(2791),a=n(7760),o=n(5671),i=n(3144),c=n(136),s=n(9388),u=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,o.Z)(this,n),e.apply(this,arguments)}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t=2*Math.PI*t;var r=-.22*Math.cos(t)-1.28*Math.sin(t)-.44*Math.cos(3*t)-.78*Math.sin(3*t),o=-.1*Math.cos(2*t)-.27*Math.sin(2*t)+.38*Math.cos(4*t)+.46*Math.sin(4*t),i=.7*Math.cos(3*t)-.4*Math.sin(3*t);return n.set(r,o,i).multiplyScalar(20)}}]),n}(a.Curve),l=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t*=2*Math.PI;var r=16*Math.pow(Math.sin(t),3),o=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t),i=0;return n.set(r,o,i).multiplyScalar(this.scale)}}]),n}(a.Curve),h=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:70;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t=4*t*Math.PI;var r=this.scale/2,o=r*(1+Math.cos(t)),i=r*Math.sin(t),c=2*r*Math.sin(t/2);return n.set(o,i,c)}}]),n}(a.Curve),v=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,o.Z)(this,n),e.apply(this,arguments)}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t*=2*Math.PI;var r=10,o=50,i=o*Math.sin(t),c=Math.cos(t)*(r+o*Math.cos(t)),s=Math.sin(t)*(r+o*Math.cos(t));return n.set(i,c,s)}}]),n}(a.Curve),f=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,o.Z)(this,n),e.apply(this,arguments)}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=30,o=150,i=2*Math.PI*t*o/30,c=Math.cos(i)*r,s=Math.sin(i)*r,u=o*t;return n.set(c,s,u)}}]),n}(a.Curve),w=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t*=2*Math.PI;var r=(2+Math.cos(3*t))*Math.cos(2*t),o=(2+Math.cos(3*t))*Math.sin(2*t),i=Math.sin(3*t);return n.set(r,o,i).multiplyScalar(this.scale)}}]),n}(a.Curve),M=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=3,o=4;t*=2*Math.PI;var i=(2+Math.cos(o*t))*Math.cos(r*t),c=(2+Math.cos(o*t))*Math.sin(r*t),s=Math.sin(o*t);return n.set(i,c,s).multiplyScalar(this.scale)}}]),n}(a.Curve),m=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=2,o=5;t*=2*Math.PI;var i=(2+Math.cos(o*t))*Math.cos(r*t),c=(2+Math.cos(o*t))*Math.sin(r*t),s=Math.sin(o*t);return n.set(i,c,s).multiplyScalar(this.scale)}}]),n}(a.Curve),d=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t=4*t-2;var r=Math.pow(t,3)-3*t,o=Math.pow(t,4)-4*t*t,i=.2*Math.pow(t,5)-2*t;return n.set(r,o,i).multiplyScalar(this.scale)}}]),n}(a.Curve);function p(t,e,n){return n*(e-t)+t}var g=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=.4*(t=p(-4,4,t))*(t*t-7)*(t*t-10),o=Math.pow(t,4)-13*t*t,i=.1*t*(t*t-4)*(t*t-9)*(t*t-12);return n.set(r,o,i).multiplyScalar(this.scale)}}]),n}(a.Curve),Z=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:40;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e;t*=2*Math.PI;var r=Math.cos(2*t)*(1+.6*(Math.cos(5*t)+.75*Math.cos(10*t))),o=Math.sin(2*t)*(1+.6*(Math.cos(5*t)+.75*Math.cos(10*t))),i=.35*Math.sin(5*t);return n.set(r,o,i).multiplyScalar(this.scale)}}]),n}(a.Curve),V=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:40;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=t*Math.PI*2,o=Math.cos(2*r)*(1+.45*Math.cos(3*r)+.4*Math.cos(9*r)),i=Math.sin(2*r)*(1+.45*Math.cos(3*r)+.4*Math.cos(9*r)),c=.2*Math.sin(9*r);return n.set(o,i,c).multiplyScalar(this.scale)}}]),n}(a.Curve),y=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:40;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=t*Math.PI*2,o=Math.cos(3*r)*(1+.3*Math.cos(5*r)+.5*Math.cos(10*r)),i=Math.sin(3*r)*(1+.3*Math.cos(5*r)+.5*Math.cos(10*r)),c=.2*Math.sin(20*r);return n.set(o,i,c).multiplyScalar(this.scale)}}]),n}(a.Curve),P=function(t){(0,c.Z)(n,t);var e=(0,s.Z)(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:40;return(0,o.Z)(this,n),(t=e.call(this)).scale=r,t}return(0,i.Z)(n,[{key:"getPoint",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new a.Vector3,n=e,r=t*Math.PI*2,o=Math.cos(4*r)*(1+.5*(Math.cos(5*r)+.4*Math.cos(20*r))),i=Math.sin(4*r)*(1+.5*(Math.cos(5*r)+.4*Math.cos(20*r))),c=.35*Math.sin(15*r);return n.set(o,i,c).multiplyScalar(this.scale)}}]),n}(a.Curve),x=n(4647),C=n(2794),k=n(6121),j=n(580),S=n(3520),b=n(9513),D=n(6710),I=n(184),K=new a.CatmullRomCurve3([new a.Vector3(0,10,-10),new a.Vector3(10,0,-10),new a.Vector3(20,0,0),new a.Vector3(30,0,10),new a.Vector3(30,0,20),new a.Vector3(20,0,30),new a.Vector3(10,0,30),new a.Vector3(0,0,30),new a.Vector3(-10,10,30),new a.Vector3(-10,20,30),new a.Vector3(0,30,30),new a.Vector3(10,30,30),new a.Vector3(20,30,15),new a.Vector3(10,30,10),new a.Vector3(0,30,10),new a.Vector3(-10,20,10),new a.Vector3(-10,10,10),new a.Vector3(0,0,10),new a.Vector3(10,-10,10),new a.Vector3(20,-15,10),new a.Vector3(30,-15,10),new a.Vector3(40,-15,10),new a.Vector3(50,-15,10),new a.Vector3(60,0,10),new a.Vector3(70,0,0),new a.Vector3(80,0,0),new a.Vector3(90,0,0),new a.Vector3(100,0,0)]),H=new a.CatmullRomCurve3([new a.Vector3(0,-40,-40),new a.Vector3(0,40,-40),new a.Vector3(0,140,-40),new a.Vector3(0,40,40),new a.Vector3(0,-40,40)]);H.curveType="catmullrom",H.closed=!0;var T={GrannyKnot:new u,HeartCurve:new l(3.5),VivianiCurve:new h(70),KnotCurve:new v,HelixCurve:new f,TrefoilKnot:new w,TorusKnot:new M(20),CinquefoilKnot:new m(20),TrefoilPolynomialKnot:new d(14),FigureEightPolynomialKnot:new g,DecoratedTorusKnot4a:new Z,DecoratedTorusKnot4b:new V,DecoratedTorusKnot5a:new y,DecoratedTorusKnot5c:new P,PipeSpline:K,SampleClosedSpline:H},R=function(){var t=(0,r.useRef)(),e=(0,r.useRef)(),n=(0,b.M4)("Geometry",{spline:{value:"GrannyKnot",options:Object.keys(T)},scale:{value:4,min:2,max:10,step:2},extrusionSegments:{value:100,min:50,max:500,step:50},radiusSegments:{value:3,min:2,max:12,step:1},closed:!0}),o=(0,b.M4)("Camera",{animationView:!1,lookAhead:!1,cameraHelper:!1}),i=(0,r.useMemo)((function(){return new a.TubeGeometry(T[n.spline],n.extrusionSegments,2,n.radiusSegments,n.closed)}),[n]);return(0,k.H)(o.cameraHelper&&t,a.CameraHelper),(0,C.x)((function(){var r=Date.now()%2e4/2e4,c=new a.Vector3;i.parameters.path.getPointAt(r,c),c.multiplyScalar(n.scale);var s=i.tangents.length,u=r*s,l=Math.floor(u),h=(l+1)%s,v=new a.Vector3;v.subVectors(i.binormals[h],i.binormals[l]),v.multiplyScalar(u-l).add(i.binormals[l]);var f=new a.Vector3;i.parameters.path.getTangentAt(r,f);var w=new a.Vector3;w.copy(v).cross(f),c.add(w.clone().multiplyScalar(15)),t.current.position.copy(c),e.current.position.copy(c);var M=new a.Vector3;i.parameters.path.getPointAt((r+30/i.parameters.path.getLength())%1,M),M.multiplyScalar(n.scale),o.lookAhead||M.copy(c).add(f),t.current.matrix.lookAt(t.current.position,M,w),t.current.quaternion.setFromRotationMatrix(t.current.matrix)})),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)("object3D",{children:[(0,I.jsxs)("mesh",{scale:n.scale,geometry:i,children:[(0,I.jsx)("meshLambertMaterial",{color:"#ff00ff"}),(0,I.jsx)("mesh",{geometry:i,children:(0,I.jsx)("meshBasicMaterial",{color:0,opacity:.3,wireframe:!0,transparent:!0})})]}),(0,I.jsxs)("mesh",{ref:e,visible:o.cameraHelper,children:[(0,I.jsx)("sphereGeometry",{args:[5]}),(0,I.jsx)("meshBasicMaterial",{color:14540253})]}),(0,I.jsx)(j.c,{ref:t,args:[84,D.Pf,.01,1e3],makeDefault:o.animationView})]}),(0,I.jsx)(j.c,{args:[50,D.Pf,.01,1e4],position:[0,50,500],makeDefault:!o.animationView})]})},A=function(){return(0,I.jsxs)(x.Xz,{gl:{antialias:!0},dpr:devicePixelRatio,children:[(0,I.jsx)("color",{attach:"background",args:[15790320]}),(0,I.jsx)("ambientLight",{args:[13421772,.2]}),(0,I.jsx)("directionalLight",{args:[16777215],position:[0,0,1]}),(0,I.jsx)(R,{}),(0,I.jsx)(S.z,{minDistance:100,maxDistance:2e3})]})}},580:function(t,e,n){n.d(e,{c:function(){return u}});var r=n(4925),a=n(7462),o=n(2791),i=n(2794),c=n(3599),s=["makeDefault"],u=o.forwardRef((function(t,e){var n=t.makeDefault,u=(0,r.Z)(t,s),l=(0,i.w)((function(t){return t.set})),h=(0,i.w)((function(t){return t.camera})),v=(0,i.w)((function(t){return t.size})),f=o.useRef();return o.useLayoutEffect((function(){var t=f.current;t&&!u.manual&&(t.aspect=v.width/v.height,t.updateProjectionMatrix())}),[v,u]),o.useLayoutEffect((function(){if(n&&f.current){var t=h;return l((function(){return{camera:f.current}})),function(){return l((function(){return{camera:t}}))}}}),[h,f,n,l]),o.createElement("perspectiveCamera",(0,a.Z)({ref:(0,c.Z)([f,e])},u))}))},6121:function(t,e,n){n.d(e,{H:function(){return i}});var r=n(5647),a=n(2791),o=n(2794);function i(t,e){for(var n=arguments.length,i=new Array(n>2?n-2:0),c=2;c<n;c++)i[c-2]=arguments[c];var s=a.useRef(),u=(0,o.w)((function(t){return t.scene}));return a.useEffect((function(){return t&&e&&null!=t&&t.current&&(s.current=(0,r.Z)(e,[t.current].concat(i)),s.current&&u.add(s.current)),!t&&s.current&&u.remove(s.current),function(){s.current&&u.remove(s.current)}}),[u,e,t,i]),(0,o.x)((function(){var t;null!=(t=s.current)&&t.update&&s.current.update()})),s}}}]);
//# sourceMappingURL=605.5d96858d.chunk.js.map