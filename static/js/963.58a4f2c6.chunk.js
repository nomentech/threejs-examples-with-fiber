"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[963],{9740:function(e,t,n){n.d(t,{m:function(){return u}});var i=n(4942),r=n(7760),a=n(2794),s=n(2791),o=function(e){return e===Object(e)&&!Array.isArray(e)&&"function"!==typeof e};function u(e){var t=(0,a.w)((function(e){return e.gl})),n=(0,a.z)(r.TextureLoader,o(e)?Object.values(e):e);if((0,s.useEffect)((function(){(Array.isArray(n)?n:[n]).forEach(t.initTexture)}),[t,n]),o(e)){var u=Object.keys(e),l={};return u.forEach((function(e){return Object.assign(l,(0,i.Z)({},e,n[u.indexOf(e)]))})),l}return n}u.preload=function(e){return a.z.preload(r.TextureLoader,e)},u.clear=function(e){return a.z.clear(r.TextureLoader,e)}},5066:function(e,t,n){n.d(t,{u:function(){return x}});var i=n(3144),r=n(5671),a=n(136),s=n(9388),o=n(7760),u=new o.Vector3,l=new o.Line3,h=new o.Plane,c=new o.Vector3,v=new o.Triangle,f=function(){function e(){(0,r.Z)(this,e),this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new m,this.unassigned=new m,this.vertices=[]}return(0,i.Z)(e,[{key:"setFromPoints",value:function(e){if(e.length>=4){this.makeEmpty();for(var t=0,n=e.length;t<n;t++)this.vertices.push(new g(e[t]));this.compute()}return this}},{key:"setFromObject",value:function(e){var t=[];return e.updateMatrixWorld(!0),e.traverse((function(e){var n=e.geometry;if(void 0!==n){if(n.isGeometry)return void console.error("THREE.ConvexHull no longer supports Geometry. Use THREE.BufferGeometry instead.");if(n.isBufferGeometry){var i=n.attributes.position;if(void 0!==i)for(var r=0,a=i.count;r<a;r++){var s=new o.Vector3;s.fromBufferAttribute(i,r).applyMatrix4(e.matrixWorld),t.push(s)}}}})),this.setFromPoints(t)}},{key:"containsPoint",value:function(e){for(var t=this.faces,n=0,i=t.length;n<i;n++){if(t[n].distanceToPoint(e)>this.tolerance)return!1}return!0}},{key:"intersectRay",value:function(e,t){for(var n=this.faces,i=-1/0,r=1/0,a=0,s=n.length;a<s;a++){var o=n[a],u=o.distanceToPoint(e.origin),l=o.normal.dot(e.direction);if(u>0&&l>=0)return null;var h=0!==l?-u/l:0;if(!(h<=0)&&(l>0?r=Math.min(h,r):i=Math.max(h,i),i>r))return null}return i!==-1/0?e.at(i,t):e.at(r,t),t}},{key:"intersectsRay",value:function(e){return null!==this.intersectRay(e,u)}},{key:"makeEmpty",value:function(){return this.faces=[],this.vertices=[],this}},{key:"addVertexToFace",value:function(e,t){return e.face=t,null===t.outside?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this}},{key:"removeVertexFromFace",value:function(e,t){return e===t.outside&&(null!==e.next&&e.next.face===t?t.outside=e.next:t.outside=null),this.assigned.remove(e),this}},{key:"removeAllVerticesFromFace",value:function(e){if(null!==e.outside){for(var t=e.outside,n=e.outside;null!==n.next&&n.next.face===e;)n=n.next;return this.assigned.removeSubList(t,n),t.prev=n.next=null,e.outside=null,t}}},{key:"deleteFaceVertices",value:function(e,t){var n=this.removeAllVerticesFromFace(e);if(void 0!==n)if(void 0===t)this.unassigned.appendChain(n);else{var i=n;do{var r=i.next;t.distanceToPoint(i.point)>this.tolerance?this.addVertexToFace(i,t):this.unassigned.append(i),i=r}while(null!==i)}return this}},{key:"resolveUnassignedPoints",value:function(e){if(!1===this.unassigned.isEmpty()){var t=this.unassigned.first();do{for(var n=t.next,i=this.tolerance,r=null,a=0;a<e.length;a++){var s=e[a];if(0===s.mark){var o=s.distanceToPoint(t.point);if(o>i&&(i=o,r=s),i>1e3*this.tolerance)break}}null!==r&&this.addVertexToFace(t,r),t=n}while(null!==t)}return this}},{key:"computeExtremes",value:function(){for(var e=new o.Vector3,t=new o.Vector3,n=[],i=[],r=0;r<3;r++)n[r]=i[r]=this.vertices[0];e.copy(this.vertices[0].point),t.copy(this.vertices[0].point);for(var a=0,s=this.vertices.length;a<s;a++){for(var u=this.vertices[a],l=u.point,h=0;h<3;h++)l.getComponent(h)<e.getComponent(h)&&(e.setComponent(h,l.getComponent(h)),n[h]=u);for(var c=0;c<3;c++)l.getComponent(c)>t.getComponent(c)&&(t.setComponent(c,l.getComponent(c)),i[c]=u)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(e.x),Math.abs(t.x))+Math.max(Math.abs(e.y),Math.abs(t.y))+Math.max(Math.abs(e.z),Math.abs(t.z))),{min:n,max:i}}},{key:"computeInitialHull",value:function(){for(var e=this.vertices,t=this.computeExtremes(),n=t.min,i=t.max,r=0,a=0,s=0;s<3;s++){var o=i[s].point.getComponent(s)-n[s].point.getComponent(s);o>r&&(r=o,a=s)}var u,v,f=n[a],p=i[a];r=0,l.set(f.point,p.point);for(var g=0,m=this.vertices.length;g<m;g++){var x=e[g];if(x!==f&&x!==p){l.closestPointToPoint(x.point,!0,c);var y=c.distanceToSquared(x.point);y>r&&(r=y,u=x)}}r=-1,h.setFromCoplanarPoints(f.point,p.point,u.point);for(var w=0,k=this.vertices.length;w<k;w++){var b=e[w];if(b!==f&&b!==p&&b!==u){var T=Math.abs(h.distanceToPoint(b.point));T>r&&(r=T,v=b)}}var F=[];if(h.distanceToPoint(v.point)<0){F.push(d.create(f,p,u),d.create(v,p,f),d.create(v,u,p),d.create(v,f,u));for(var E=0;E<3;E++){var A=(E+1)%3;F[E+1].getEdge(2).setTwin(F[0].getEdge(A)),F[E+1].getEdge(1).setTwin(F[A+1].getEdge(0))}}else{F.push(d.create(f,u,p),d.create(v,f,p),d.create(v,p,u),d.create(v,u,f));for(var P=0;P<3;P++){var V=(P+1)%3;F[P+1].getEdge(2).setTwin(F[0].getEdge((3-P)%3)),F[P+1].getEdge(0).setTwin(F[V+1].getEdge(1))}}for(var C=0;C<4;C++)this.faces.push(F[C]);for(var M=0,z=e.length;M<z;M++){var Z=e[M];if(Z!==f&&Z!==p&&Z!==u&&Z!==v){r=this.tolerance;for(var B=null,H=0;H<4;H++){var S=this.faces[H].distanceToPoint(Z.point);S>r&&(r=S,B=this.faces[H])}null!==B&&this.addVertexToFace(Z,B)}}return this}},{key:"reindexFaces",value:function(){for(var e=[],t=0;t<this.faces.length;t++){var n=this.faces[t];0===n.mark&&e.push(n)}return this.faces=e,this}},{key:"nextVertexToAdd",value:function(){if(!1===this.assigned.isEmpty()){var e,t=0,n=this.assigned.first().face,i=n.outside;do{var r=n.distanceToPoint(i.point);r>t&&(t=r,e=i),i=i.next}while(null!==i&&i.face===n);return e}}},{key:"computeHorizon",value:function(e,t,n,i){var r;this.deleteFaceVertices(n),n.mark=1,r=null===t?t=n.getEdge(0):t.next;do{var a=r.twin,s=a.face;0===s.mark&&(s.distanceToPoint(e)>this.tolerance?this.computeHorizon(e,a,s,i):i.push(r)),r=r.next}while(r!==t);return this}},{key:"addAdjoiningFace",value:function(e,t){var n=d.create(e,t.tail(),t.head());return this.faces.push(n),n.getEdge(-1).setTwin(t.twin),n.getEdge(0)}},{key:"addNewFaces",value:function(e,t){this.newFaces=[];for(var n=null,i=null,r=0;r<t.length;r++){var a=t[r],s=this.addAdjoiningFace(e,a);null===n?n=s:s.next.setTwin(i),this.newFaces.push(s.face),i=s}return n.next.setTwin(i),this}},{key:"addVertexToHull",value:function(e){var t=[];return this.unassigned.clear(),this.removeVertexFromFace(e,e.face),this.computeHorizon(e.point,null,e.face,t),this.addNewFaces(e,t),this.resolveUnassignedPoints(this.newFaces),this}},{key:"cleanup",value:function(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}},{key:"compute",value:function(){var e;for(this.computeInitialHull();void 0!==(e=this.nextVertexToAdd());)this.addVertexToHull(e);return this.reindexFaces(),this.cleanup(),this}}]),e}(),d=function(){function e(){(0,r.Z)(this,e),this.normal=new o.Vector3,this.midpoint=new o.Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=0,this.edge=null}return(0,i.Z)(e,[{key:"getEdge",value:function(e){for(var t=this.edge;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t}},{key:"compute",value:function(){var e=this.edge.tail(),t=this.edge.head(),n=this.edge.next.head();return v.set(e.point,t.point,n.point),v.getNormal(this.normal),v.getMidpoint(this.midpoint),this.area=v.getArea(),this.constant=this.normal.dot(this.midpoint),this}},{key:"distanceToPoint",value:function(e){return this.normal.dot(e)-this.constant}}],[{key:"create",value:function(t,n,i){var r=new e,a=new p(t,r),s=new p(n,r),o=new p(i,r);return a.next=o.prev=s,s.next=a.prev=o,o.next=s.prev=a,r.edge=a,r.compute()}}]),e}(),p=function(){function e(t,n){(0,r.Z)(this,e),this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=n}return(0,i.Z)(e,[{key:"head",value:function(){return this.vertex}},{key:"tail",value:function(){return this.prev?this.prev.vertex:null}},{key:"length",value:function(){var e=this.head(),t=this.tail();return null!==t?t.point.distanceTo(e.point):-1}},{key:"lengthSquared",value:function(){var e=this.head(),t=this.tail();return null!==t?t.point.distanceToSquared(e.point):-1}},{key:"setTwin",value:function(e){return this.twin=e,e.twin=this,this}}]),e}(),g=(0,i.Z)((function e(t){(0,r.Z)(this,e),this.point=t,this.prev=null,this.next=null,this.face=null})),m=function(){function e(){(0,r.Z)(this,e),this.head=null,this.tail=null}return(0,i.Z)(e,[{key:"first",value:function(){return this.head}},{key:"last",value:function(){return this.tail}},{key:"clear",value:function(){return this.head=this.tail=null,this}},{key:"insertBefore",value:function(e,t){return t.prev=e.prev,t.next=e,null===t.prev?this.head=t:t.prev.next=t,e.prev=t,this}},{key:"insertAfter",value:function(e,t){return t.prev=e,t.next=e.next,null===t.next?this.tail=t:t.next.prev=t,e.next=t,this}},{key:"append",value:function(e){return null===this.head?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this}},{key:"appendChain",value:function(e){for(null===this.head?this.head=e:this.tail.next=e,e.prev=this.tail;null!==e.next;)e=e.next;return this.tail=e,this}},{key:"remove",value:function(e){return null===e.prev?this.head=e.next:e.prev.next=e.next,null===e.next?this.tail=e.prev:e.next.prev=e.prev,this}},{key:"removeSubList",value:function(e,t){return null===e.prev?this.head=t.next:e.prev.next=t.next,null===t.next?this.tail=e.prev:t.next.prev=e.prev,this}},{key:"isEmpty",value:function(){return null===this.head}}]),e}(),x=function(e){(0,a.Z)(n,e);var t=(0,s.Z)(n);function n(){var e,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];(0,r.Z)(this,n),e=t.call(this);var a=[],s=[];void 0===f&&console.error("THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on ConvexHull");for(var u=(new f).setFromPoints(i),l=u.faces,h=0;h<l.length;h++){var c=l[h],v=c.edge;do{var d=v.head().point;a.push(d.x,d.y,d.z),s.push(c.normal.x,c.normal.y,c.normal.z),v=v.next}while(v!==c.edge)}return e.setAttribute("position",new o.Float32BufferAttribute(a,3)),e.setAttribute("normal",new o.Float32BufferAttribute(s,3)),e}return(0,i.Z)(n)}(o.BufferGeometry)},7133:function(e,t,n){n.d(t,{$1:function(){return r}});var i=n(7760);function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e-4;t=Math.max(t,Number.EPSILON);for(var n={},r=e.getIndex(),a=e.getAttribute("position"),s=r?r.count:a.count,o=0,u=Object.keys(e.attributes),l={},h={},c=[],v=["getX","getY","getZ","getW"],f=0,d=u.length;f<d;f++){var p=u[f];l[p]=[];var g=e.morphAttributes[p];g&&(h[p]=new Array(g.length).fill().map((function(){return[]})))}for(var m=Math.log10(1/t),x=Math.pow(10,m),y=0;y<s;y++){for(var w=r?r.getX(y):y,k="",b=0,T=u.length;b<T;b++)for(var F=u[b],E=e.getAttribute(F),A=E.itemSize,P=0;P<A;P++)k+="".concat(~~(E[v[P]](w)*x),",");if(k in n)c.push(n[k]);else{for(var V=0,C=u.length;V<C;V++)for(var M=u[V],z=e.getAttribute(M),Z=e.morphAttributes[M],B=z.itemSize,H=l[M],S=h[M],j=0;j<B;j++){var O=v[j];if(H.push(z[O](w)),Z)for(var L=0,G=Z.length;L<G;L++)S[L].push(Z[L][O](w))}n[k]=o,c.push(o),o++}}for(var N=e.clone(),I=0,R=u.length;I<R;I++){var _=u[I],q=e.getAttribute(_),U=new q.array.constructor(l[_]),W=new i.BufferAttribute(U,q.itemSize,q.normalized);if(N.setAttribute(_,W),_ in h)for(var X=0;X<h[_].length;X++){var Y=e.morphAttributes[_][X],$=new Y.array.constructor(h[_][X]),D=new i.BufferAttribute($,Y.itemSize,Y.normalized);N.morphAttributes[_][X]=D}}return N.setIndex(c),N}}}]);
//# sourceMappingURL=963.58a4f2c6.chunk.js.map