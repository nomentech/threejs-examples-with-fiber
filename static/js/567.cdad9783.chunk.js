"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[567],{6710:function(t,e,n){n.d(e,{Pf:function(){return r},Uv:function(){return i},fx:function(){return o}});var o=window.innerWidth>640?window.innerWidth-300:window.innerWidth,i=window.innerWidth>640?window.innerHeight:window.innerHeight-48,r=o/i},8182:function(t,e,n){n.r(e),n.d(e,{default:function(){return W}});var o=n(3433),i=n(9439),r=n(2791),a=n(7760),s=n(3144),u=n(5671),c=n(136),p=n(9388),l=function(t){(0,c.Z)(n,t);var e=(0,p.Z)(n);function n(t,o,i,r){var s;(0,u.Z)(this,n),s=e.call(this);var c=[],p=[],l=[],h=new a.Vector3,d=new a.Matrix4;d.makeRotationFromEuler(i),d.setPosition(o);var m=new a.Matrix4;function w(e,n,o){n.applyMatrix4(t.matrixWorld),n.applyMatrix4(m),o.transformDirection(t.matrixWorld),e.push(new f(n.clone(),o.clone()))}function x(t,e){for(var n=[],o=.5*Math.abs(r.dot(e)),i=0;i<t.length;i+=3){var a,s,u,c=void 0,p=void 0,l=void 0,f=void 0;switch(((a=t[i+0].position.dot(e)-o>0)?1:0)+((s=t[i+1].position.dot(e)-o>0)?1:0)+((u=t[i+2].position.dot(e)-o>0)?1:0)){case 0:n.push(t[i]),n.push(t[i+1]),n.push(t[i+2]);break;case 1:if(a&&(c=t[i+1],p=t[i+2],l=b(t[i],c,e,o),f=b(t[i],p,e,o)),s){c=t[i],p=t[i+2],l=b(t[i+1],c,e,o),f=b(t[i+1],p,e,o),n.push(l),n.push(p.clone()),n.push(c.clone()),n.push(p.clone()),n.push(l.clone()),n.push(f);break}u&&(c=t[i],p=t[i+1],l=b(t[i+2],c,e,o),f=b(t[i+2],p,e,o)),n.push(c.clone()),n.push(p.clone()),n.push(l),n.push(f),n.push(l.clone()),n.push(p.clone());break;case 2:a||(p=b(c=t[i].clone(),t[i+1],e,o),l=b(c,t[i+2],e,o),n.push(c),n.push(p),n.push(l)),s||(p=b(c=t[i+1].clone(),t[i+2],e,o),l=b(c,t[i],e,o),n.push(c),n.push(p),n.push(l)),u||(p=b(c=t[i+2].clone(),t[i],e,o),l=b(c,t[i+1],e,o),n.push(c),n.push(p),n.push(l))}}return n}function b(t,e,n,o){var i=t.position.dot(n)-o,r=i/(i-(e.position.dot(n)-o));return new f(new a.Vector3(t.position.x+r*(e.position.x-t.position.x),t.position.y+r*(e.position.y-t.position.y),t.position.z+r*(e.position.z-t.position.z)),new a.Vector3(t.normal.x+r*(e.normal.x-t.normal.x),t.normal.y+r*(e.normal.y-t.normal.y),t.normal.z+r*(e.normal.z-t.normal.z)))}return m.copy(d).invert(),function(){var e,n=[],o=new a.Vector3,i=new a.Vector3;if(!0===t.geometry.isGeometry)return void console.error("THREE.DecalGeometry no longer supports THREE.Geometry. Use BufferGeometry instead.");var s=t.geometry,u=s.attributes.position,f=s.attributes.normal;if(null!==s.index){var m=s.index;for(e=0;e<m.count;e++)o.fromBufferAttribute(u,m.getX(e)),i.fromBufferAttribute(f,m.getX(e)),w(n,o,i)}else for(e=0;e<u.count;e++)o.fromBufferAttribute(u,e),i.fromBufferAttribute(f,e),w(n,o,i);for(n=x(n,h.set(1,0,0)),n=x(n,h.set(-1,0,0)),n=x(n,h.set(0,1,0)),n=x(n,h.set(0,-1,0)),n=x(n,h.set(0,0,1)),n=x(n,h.set(0,0,-1)),e=0;e<n.length;e++){var b=n[e];l.push(.5+b.position.x/r.x,.5+b.position.y/r.y),b.position.applyMatrix4(d),c.push(b.position.x,b.position.y,b.position.z),p.push(b.normal.x,b.normal.y,b.normal.z)}}(),s.setAttribute("position",new a.Float32BufferAttribute(c,3)),s.setAttribute("normal",new a.Float32BufferAttribute(p,3)),s.setAttribute("uv",new a.Float32BufferAttribute(l,2)),s}return(0,s.Z)(n)}(a.BufferGeometry),f=function(){function t(e,n){(0,u.Z)(this,t),this.position=e,this.normal=n}return(0,s.Z)(t,[{key:"clone",value:function(){return new this.constructor(this.position.clone(),this.normal.clone())}}]),t}(),h=n(4647),d=n(3655),m=n(3520),w=n(6710),x=n.p+"static/media/LeePerrySmith.26dcc44b737902aec4e6.glb",b=n.p+"static/media/Map-COL.0b86c3b0412d0da1c080.jpg",v=n.p+"static/media/Map-SPEC.0f292bb5efa3bc89713d.jpg",g=n.p+"static/media/Infinite-Level_02_Tangent_SmoothUV.c9596c263d76437bafa4.jpg",y=n.p+"static/media/decal-diffuse.0daff3a813d1614480a9.png",j=n.p+"static/media/decal-normal.508ad691f0b238fa2726.jpg",M=n(184);d.L.preload(x);var k=new a.TextureLoader,z=k.load(b),A=k.load(v),B=k.load(g),L=10,_=20,V=k.load(y),Z=k.load(j),E=new a.MeshPhongMaterial({specular:4473924,map:V,normalMap:Z,normalScale:new a.Vector2(1,1),shininess:30,transparent:!0,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,wireframe:!1}),P=function(){var t=(0,d.L)(x).scene.children[0],e=(0,r.useState)([]),n=(0,i.Z)(e,2),s=n[0],u=n[1];return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("primitive",{object:t,scale:10,onClick:function(e){var n=e.point,i=new a.Vector3(10,10,10),r=L+Math.random()*(_-L);i.set(r,r,r);var s=E.clone();s.color.setHex(16777215*Math.random());var c=new a.Mesh(new l(t,n,new a.Euler,i),s);u((function(t){return[c].concat((0,o.Z)(t))}))},children:(0,M.jsx)("meshPhongMaterial",{attach:"material",specular:1118481,shininess:25,map:z,specularMap:A,normalMap:B})}),s.map((function(t,e){return(0,M.jsx)("primitive",{object:t},e)}))]})},W=function(){return(0,M.jsxs)(h.Xz,{camera:{position:[0,0,120],fov:45,aspect:w.Pf,near:1,far:1e3},children:[(0,M.jsx)("color",{attach:"background",args:["black"]}),(0,M.jsx)("ambientLight",{args:[4469555]}),(0,M.jsx)("directionalLight",{args:[16768460,1],position:[1,.75,.5]}),(0,M.jsx)("directionalLight",{args:[13421823,1],position:[-1,.75,-.5]}),(0,M.jsx)(P,{}),(0,M.jsx)(m.z,{minDistance:50,maxDistance:200})]})}}}]);
//# sourceMappingURL=567.cdad9783.chunk.js.map