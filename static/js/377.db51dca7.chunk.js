"use strict";(self.webpackChunkthreejs_examples_with_fiber=self.webpackChunkthreejs_examples_with_fiber||[]).push([[377],{9377:function(e,t,o){o.d(t,{$:function(){return v}});var n=o(4925),a=o(7462),r=o(2794),c=o(2791),i=o(3144),s=o(5671),m=o(7326),u=o(136),p=o(9388),d=o(4942),Z=o(7760),E=function(e){(0,u.Z)(o,e);var t=(0,p.Z)(o);function o(e,n){var a;return(0,s.Z)(this,o),a=t.call(this),(0,d.Z)((0,m.Z)(a),"enabled",!0),(0,d.Z)((0,m.Z)(a),"screen",{left:0,top:0,width:0,height:0}),(0,d.Z)((0,m.Z)(a),"rotateSpeed",1),(0,d.Z)((0,m.Z)(a),"zoomSpeed",1.2),(0,d.Z)((0,m.Z)(a),"panSpeed",.3),(0,d.Z)((0,m.Z)(a),"noRotate",!1),(0,d.Z)((0,m.Z)(a),"noZoom",!1),(0,d.Z)((0,m.Z)(a),"noPan",!1),(0,d.Z)((0,m.Z)(a),"staticMoving",!1),(0,d.Z)((0,m.Z)(a),"dynamicDampingFactor",.2),(0,d.Z)((0,m.Z)(a),"minDistance",0),(0,d.Z)((0,m.Z)(a),"maxDistance",1/0),(0,d.Z)((0,m.Z)(a),"keys",["KeyA","KeyS","KeyD"]),(0,d.Z)((0,m.Z)(a),"mouseButtons",{LEFT:Z.MOUSE.ROTATE,MIDDLE:Z.MOUSE.DOLLY,RIGHT:Z.MOUSE.PAN}),(0,d.Z)((0,m.Z)(a),"object",void 0),(0,d.Z)((0,m.Z)(a),"domElement",void 0),(0,d.Z)((0,m.Z)(a),"cursorZoom",!1),(0,d.Z)((0,m.Z)(a),"target",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"mousePosition",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"STATE",{NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4}),(0,d.Z)((0,m.Z)(a),"EPS",1e-6),(0,d.Z)((0,m.Z)(a),"lastZoom",1),(0,d.Z)((0,m.Z)(a),"lastPosition",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"cursorVector",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"targetVector",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"_state",a.STATE.NONE),(0,d.Z)((0,m.Z)(a),"_keyState",a.STATE.NONE),(0,d.Z)((0,m.Z)(a),"_eye",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"_movePrev",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"_moveCurr",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"_lastAxis",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"_lastAngle",0),(0,d.Z)((0,m.Z)(a),"_zoomStart",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"_zoomEnd",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"_touchZoomDistanceStart",0),(0,d.Z)((0,m.Z)(a),"_touchZoomDistanceEnd",0),(0,d.Z)((0,m.Z)(a),"_panStart",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"_panEnd",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"target0",void 0),(0,d.Z)((0,m.Z)(a),"position0",void 0),(0,d.Z)((0,m.Z)(a),"up0",void 0),(0,d.Z)((0,m.Z)(a),"zoom0",void 0),(0,d.Z)((0,m.Z)(a),"changeEvent",{type:"change"}),(0,d.Z)((0,m.Z)(a),"startEvent",{type:"start"}),(0,d.Z)((0,m.Z)(a),"endEvent",{type:"end"}),(0,d.Z)((0,m.Z)(a),"onScreenVector",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"getMouseOnScreen",(function(e,t){return a.onScreenVector.set((e-a.screen.left)/a.screen.width,(t-a.screen.top)/a.screen.height),a.onScreenVector})),(0,d.Z)((0,m.Z)(a),"onCircleVector",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"getMouseOnCircle",(function(e,t){return a.onCircleVector.set((e-.5*a.screen.width-a.screen.left)/(.5*a.screen.width),(a.screen.height+2*(a.screen.top-t))/a.screen.width),a.onCircleVector})),(0,d.Z)((0,m.Z)(a),"axis",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"quaternion",new Z.Quaternion),(0,d.Z)((0,m.Z)(a),"eyeDirection",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"objectUpDirection",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"objectSidewaysDirection",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"moveDirection",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"angle",0),(0,d.Z)((0,m.Z)(a),"rotateCamera",(function(){a.moveDirection.set(a._moveCurr.x-a._movePrev.x,a._moveCurr.y-a._movePrev.y,0),a.angle=a.moveDirection.length(),a.angle?(a._eye.copy(a.object.position).sub(a.target),a.eyeDirection.copy(a._eye).normalize(),a.objectUpDirection.copy(a.object.up).normalize(),a.objectSidewaysDirection.crossVectors(a.objectUpDirection,a.eyeDirection).normalize(),a.objectUpDirection.setLength(a._moveCurr.y-a._movePrev.y),a.objectSidewaysDirection.setLength(a._moveCurr.x-a._movePrev.x),a.moveDirection.copy(a.objectUpDirection.add(a.objectSidewaysDirection)),a.axis.crossVectors(a.moveDirection,a._eye).normalize(),a.angle*=a.rotateSpeed,a.quaternion.setFromAxisAngle(a.axis,a.angle),a._eye.applyQuaternion(a.quaternion),a.object.up.applyQuaternion(a.quaternion),a._lastAxis.copy(a.axis),a._lastAngle=a.angle):!a.staticMoving&&a._lastAngle&&(a._lastAngle*=Math.sqrt(1-a.dynamicDampingFactor),a._eye.copy(a.object.position).sub(a.target),a.quaternion.setFromAxisAngle(a._lastAxis,a._lastAngle),a._eye.applyQuaternion(a.quaternion),a.object.up.applyQuaternion(a.quaternion)),a._movePrev.copy(a._moveCurr)})),(0,d.Z)((0,m.Z)(a),"zoomCamera",(function(){var e;if(a._state===a.STATE.TOUCH_ZOOM_PAN)e=a._touchZoomDistanceStart/a._touchZoomDistanceEnd,a._touchZoomDistanceStart=a._touchZoomDistanceEnd,a.object.isPerspectiveCamera?a._eye.multiplyScalar(e):a.object.isOrthographicCamera?(a.object.zoom/=e,a.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type");else{if(e=1+(a._zoomEnd.y-a._zoomStart.y)*a.zoomSpeed,Math.abs(e-1)>a.EPS&&e>0&&(a.object.isPerspectiveCamera?(e>1&&a._eye.length()>=a.maxDistance-a.EPS&&(e=1),a._eye.multiplyScalar(e)):a.object.isOrthographicCamera?(e>1&&a.object.zoom<a.maxDistance*a.maxDistance&&(e=1),a.object.zoom/=e):console.warn("THREE.TrackballControls: Unsupported camera type")),a.staticMoving?a._zoomStart.copy(a._zoomEnd):a._zoomStart.y+=(a._zoomEnd.y-a._zoomStart.y)*a.dynamicDampingFactor,a.cursorZoom){a.targetVector.copy(a.target).project(a.object);var t=a.cursorVector.set(a.mousePosition.x,a.mousePosition.y,a.targetVector.z).unproject(a.object);a.target.lerpVectors(t,a.target,e)}a.object.isOrthographicCamera&&a.object.updateProjectionMatrix()}})),(0,d.Z)((0,m.Z)(a),"mouseChange",new Z.Vector2),(0,d.Z)((0,m.Z)(a),"objectUp",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"pan",new Z.Vector3),(0,d.Z)((0,m.Z)(a),"panCamera",(function(){if(a.domElement&&(a.mouseChange.copy(a._panEnd).sub(a._panStart),a.mouseChange.lengthSq()>a.EPS)){if(a.object.isOrthographicCamera){var e=a.object,t=(e.right-e.left)/a.object.zoom,o=(e.top-e.bottom)/a.object.zoom;a.mouseChange.x*=t,a.mouseChange.y*=o}else a.mouseChange.multiplyScalar(a._eye.length()*a.panSpeed);a.pan.copy(a._eye).cross(a.object.up).setLength(a.mouseChange.x),a.pan.add(a.objectUp.copy(a.object.up).setLength(a.mouseChange.y)),a.object.position.add(a.pan),a.target.add(a.pan),a.staticMoving?a._panStart.copy(a._panEnd):a._panStart.add(a.mouseChange.subVectors(a._panEnd,a._panStart).multiplyScalar(a.dynamicDampingFactor))}})),(0,d.Z)((0,m.Z)(a),"checkDistances",(function(){a.noZoom&&a.noPan||(a._eye.lengthSq()>a.maxDistance*a.maxDistance&&(a.object.position.addVectors(a.target,a._eye.setLength(a.maxDistance)),a._zoomStart.copy(a._zoomEnd)),a._eye.lengthSq()<a.minDistance*a.minDistance&&(a.object.position.addVectors(a.target,a._eye.setLength(a.minDistance)),a._zoomStart.copy(a._zoomEnd)))})),(0,d.Z)((0,m.Z)(a),"handleResize",(function(){if(a.domElement){var e=a.domElement.getBoundingClientRect(),t=a.domElement.ownerDocument.documentElement;a.screen.left=e.left+window.pageXOffset-t.clientLeft,a.screen.top=e.top+window.pageYOffset-t.clientTop,a.screen.width=e.width,a.screen.height=e.height}})),(0,d.Z)((0,m.Z)(a),"update",(function(){a._eye.subVectors(a.object.position,a.target),a.noRotate||a.rotateCamera(),a.noZoom||a.zoomCamera(),a.noPan||a.panCamera(),a.object.position.addVectors(a.target,a._eye),a.object.isPerspectiveCamera?(a.checkDistances(),a.object.lookAt(a.target),a.lastPosition.distanceToSquared(a.object.position)>a.EPS&&(a.dispatchEvent(a.changeEvent),a.lastPosition.copy(a.object.position))):a.object.isOrthographicCamera?(a.object.lookAt(a.target),(a.lastPosition.distanceToSquared(a.object.position)>a.EPS||a.lastZoom!==a.object.zoom)&&(a.dispatchEvent(a.changeEvent),a.lastPosition.copy(a.object.position),a.lastZoom=a.object.zoom)):console.warn("THREE.TrackballControls: Unsupported camera type")})),(0,d.Z)((0,m.Z)(a),"reset",(function(){a._state=a.STATE.NONE,a._keyState=a.STATE.NONE,a.target.copy(a.target0),a.object.position.copy(a.position0),a.object.up.copy(a.up0),a.object.zoom=a.zoom0,a.object.updateProjectionMatrix(),a._eye.subVectors(a.object.position,a.target),a.object.lookAt(a.target),a.dispatchEvent(a.changeEvent),a.lastPosition.copy(a.object.position),a.lastZoom=a.object.zoom})),(0,d.Z)((0,m.Z)(a),"keydown",(function(e){!1!==a.enabled&&(window.removeEventListener("keydown",a.keydown),a._keyState===a.STATE.NONE&&(e.code!==a.keys[a.STATE.ROTATE]||a.noRotate?e.code!==a.keys[a.STATE.ZOOM]||a.noZoom?e.code!==a.keys[a.STATE.PAN]||a.noPan||(a._keyState=a.STATE.PAN):a._keyState=a.STATE.ZOOM:a._keyState=a.STATE.ROTATE))})),(0,d.Z)((0,m.Z)(a),"onPointerDown",(function(e){if(!1!==a.enabled)switch(e.pointerType){case"mouse":case"pen":a.onMouseDown(e)}})),(0,d.Z)((0,m.Z)(a),"onPointerMove",(function(e){if(!1!==a.enabled)switch(e.pointerType){case"mouse":case"pen":a.onMouseMove(e)}})),(0,d.Z)((0,m.Z)(a),"onPointerUp",(function(e){if(!1!==a.enabled)switch(e.pointerType){case"mouse":case"pen":a.onMouseUp()}})),(0,d.Z)((0,m.Z)(a),"keyup",(function(){!1!==a.enabled&&(a._keyState=a.STATE.NONE,window.addEventListener("keydown",a.keydown))})),(0,d.Z)((0,m.Z)(a),"onMouseDown",(function(e){if(a.domElement){if(a._state===a.STATE.NONE)switch(e.button){case a.mouseButtons.LEFT:a._state=a.STATE.ROTATE;break;case a.mouseButtons.MIDDLE:a._state=a.STATE.ZOOM;break;case a.mouseButtons.RIGHT:a._state=a.STATE.PAN;break;default:a._state=a.STATE.NONE}var t=a._keyState!==a.STATE.NONE?a._keyState:a._state;t!==a.STATE.ROTATE||a.noRotate?t!==a.STATE.ZOOM||a.noZoom?t!==a.STATE.PAN||a.noPan||(a._panStart.copy(a.getMouseOnScreen(e.pageX,e.pageY)),a._panEnd.copy(a._panStart)):(a._zoomStart.copy(a.getMouseOnScreen(e.pageX,e.pageY)),a._zoomEnd.copy(a._zoomStart)):(a._moveCurr.copy(a.getMouseOnCircle(e.pageX,e.pageY)),a._movePrev.copy(a._moveCurr)),a.domElement.ownerDocument.addEventListener("pointermove",a.onPointerMove),a.domElement.ownerDocument.addEventListener("pointerup",a.onPointerUp),a.dispatchEvent(a.startEvent)}})),(0,d.Z)((0,m.Z)(a),"onMouseMove",(function(e){if(!1!==a.enabled){var t=a._keyState!==a.STATE.NONE?a._keyState:a._state;t!==a.STATE.ROTATE||a.noRotate?t!==a.STATE.ZOOM||a.noZoom?t!==a.STATE.PAN||a.noPan||a._panEnd.copy(a.getMouseOnScreen(e.pageX,e.pageY)):a._zoomEnd.copy(a.getMouseOnScreen(e.pageX,e.pageY)):(a._movePrev.copy(a._moveCurr),a._moveCurr.copy(a.getMouseOnCircle(e.pageX,e.pageY)))}})),(0,d.Z)((0,m.Z)(a),"onMouseUp",(function(){a.domElement&&!1!==a.enabled&&(a._state=a.STATE.NONE,a.domElement.ownerDocument.removeEventListener("pointermove",a.onPointerMove),a.domElement.ownerDocument.removeEventListener("pointerup",a.onPointerUp),a.dispatchEvent(a.endEvent))})),(0,d.Z)((0,m.Z)(a),"mousewheel",(function(e){if(!1!==a.enabled&&!0!==a.noZoom){switch(e.preventDefault(),e.deltaMode){case 2:a._zoomStart.y-=.025*e.deltaY;break;case 1:a._zoomStart.y-=.01*e.deltaY;break;default:a._zoomStart.y-=25e-5*e.deltaY}a.mousePosition.x=e.offsetX/a.screen.width*2-1,a.mousePosition.y=-e.offsetY/a.screen.height*2+1,a.dispatchEvent(a.startEvent),a.dispatchEvent(a.endEvent)}})),(0,d.Z)((0,m.Z)(a),"touchstart",(function(e){if(!1!==a.enabled){if(e.preventDefault(),1===e.touches.length)a._state=a.STATE.TOUCH_ROTATE,a._moveCurr.copy(a.getMouseOnCircle(e.touches[0].pageX,e.touches[0].pageY)),a._movePrev.copy(a._moveCurr);else{a._state=a.STATE.TOUCH_ZOOM_PAN;var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY;a._touchZoomDistanceEnd=a._touchZoomDistanceStart=Math.sqrt(t*t+o*o);var n=(e.touches[0].pageX+e.touches[1].pageX)/2,r=(e.touches[0].pageY+e.touches[1].pageY)/2;a._panStart.copy(a.getMouseOnScreen(n,r)),a._panEnd.copy(a._panStart)}a.dispatchEvent(a.startEvent)}})),(0,d.Z)((0,m.Z)(a),"touchmove",(function(e){if(!1!==a.enabled)if(e.preventDefault(),1===e.touches.length)a._movePrev.copy(a._moveCurr),a._moveCurr.copy(a.getMouseOnCircle(e.touches[0].pageX,e.touches[0].pageY));else{var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY;a._touchZoomDistanceEnd=Math.sqrt(t*t+o*o);var n=(e.touches[0].pageX+e.touches[1].pageX)/2,r=(e.touches[0].pageY+e.touches[1].pageY)/2;a._panEnd.copy(a.getMouseOnScreen(n,r))}})),(0,d.Z)((0,m.Z)(a),"touchend",(function(e){if(!1!==a.enabled){switch(e.touches.length){case 0:a._state=a.STATE.NONE;break;case 1:a._state=a.STATE.TOUCH_ROTATE,a._moveCurr.copy(a.getMouseOnCircle(e.touches[0].pageX,e.touches[0].pageY)),a._movePrev.copy(a._moveCurr)}a.dispatchEvent(a.endEvent)}})),(0,d.Z)((0,m.Z)(a),"contextmenu",(function(e){!1!==a.enabled&&e.preventDefault()})),(0,d.Z)((0,m.Z)(a),"connect",(function(e){e===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),a.domElement=e,a.domElement.addEventListener("contextmenu",a.contextmenu),a.domElement.addEventListener("pointerdown",a.onPointerDown),a.domElement.addEventListener("wheel",a.mousewheel),a.domElement.addEventListener("touchstart",a.touchstart),a.domElement.addEventListener("touchend",a.touchend),a.domElement.addEventListener("touchmove",a.touchmove),a.domElement.ownerDocument.addEventListener("pointermove",a.onPointerMove),a.domElement.ownerDocument.addEventListener("pointerup",a.onPointerUp),window.addEventListener("keydown",a.keydown),window.addEventListener("keyup",a.keyup),a.handleResize()})),(0,d.Z)((0,m.Z)(a),"dispose",(function(){a.domElement&&(a.domElement.removeEventListener("contextmenu",a.contextmenu),a.domElement.removeEventListener("pointerdown",a.onPointerDown),a.domElement.removeEventListener("wheel",a.mousewheel),a.domElement.removeEventListener("touchstart",a.touchstart),a.domElement.removeEventListener("touchend",a.touchend),a.domElement.removeEventListener("touchmove",a.touchmove),a.domElement.ownerDocument.removeEventListener("pointermove",a.onPointerMove),a.domElement.ownerDocument.removeEventListener("pointerup",a.onPointerUp),window.removeEventListener("keydown",a.keydown),window.removeEventListener("keyup",a.keyup))})),a.object=e,a.target0=a.target.clone(),a.position0=a.object.position.clone(),a.up0=a.object.up.clone(),a.zoom0=a.object.zoom,void 0!==n&&a.connect(n),a.update(),a}return(0,i.Z)(o)}(Z.EventDispatcher),l=["makeDefault","camera","domElement","regress","onChange","onStart","onEnd"],v=c.forwardRef((function(e,t){var o=e.makeDefault,i=e.camera,s=e.domElement,m=e.regress,u=e.onChange,p=e.onStart,d=e.onEnd,Z=(0,n.Z)(e,l),v=(0,r.w)(),h=v.invalidate,g=v.camera,_=v.gl,y=v.events,S=v.set,T=v.get,b=v.performance,w=v.viewport,f=i||g,O=s||y.connected||_.domElement,j=c.useMemo((function(){return new E(f)}),[f]);return(0,r.x)((function(){j.enabled&&j.update()}),-1),c.useEffect((function(){return j.connect(O),function(){j.dispose()}}),[O,m,j,h]),c.useEffect((function(){var e=function(e){h(),m&&b.regress(),u&&u(e)};return j.addEventListener("change",e),p&&j.addEventListener("start",p),d&&j.addEventListener("end",d),function(){p&&j.removeEventListener("start",p),d&&j.removeEventListener("end",d),j.removeEventListener("change",e)}}),[u,p,d]),c.useEffect((function(){j.handleResize()}),[w]),c.useEffect((function(){if(o){var e=T().controls;return S({controls:j}),function(){return S({controls:e})}}}),[o,j]),c.createElement("primitive",(0,a.Z)({ref:t,object:j},Z))}))}}]);
//# sourceMappingURL=377.db51dca7.chunk.js.map