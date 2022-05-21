import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import * as Curves from 'three/examples/jsm/curves/CurveExtras'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import { useControls } from 'leva'

import { aspect_ratio } from '../../contants'
import { CameraHelper } from 'three'

const pipeSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 10, -10), new THREE.Vector3(10, 0, -10),
  new THREE.Vector3(20, 0, 0), new THREE.Vector3(30, 0, 10),
  new THREE.Vector3(30, 0, 20), new THREE.Vector3(20, 0, 30),
  new THREE.Vector3(10, 0, 30), new THREE.Vector3(0, 0, 30),
  new THREE.Vector3(-10, 10, 30), new THREE.Vector3(-10, 20, 30),
  new THREE.Vector3(0, 30, 30), new THREE.Vector3(10, 30, 30),
  new THREE.Vector3(20, 30, 15), new THREE.Vector3(10, 30, 10),
  new THREE.Vector3(0, 30, 10), new THREE.Vector3(-10, 20, 10),
  new THREE.Vector3(-10, 10, 10), new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(10, -10, 10), new THREE.Vector3(20, -15, 10),
  new THREE.Vector3(30, -15, 10), new THREE.Vector3(40, -15, 10),
  new THREE.Vector3(50, -15, 10), new THREE.Vector3(60, 0, 10),
  new THREE.Vector3(70, 0, 0), new THREE.Vector3(80, 0, 0),
  new THREE.Vector3(90, 0, 0), new THREE.Vector3(100, 0, 0)
])

const sampleClosedSpline: any = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, -40, -40),
  new THREE.Vector3(0, 40, -40),
  new THREE.Vector3(0, 140, -40),
  new THREE.Vector3(0, 40, 40),
  new THREE.Vector3(0, -40, 40)
])

sampleClosedSpline.curveType = 'catmullrom';
sampleClosedSpline.closed = true

const splines: any = {
  GrannyKnot: new Curves.GrannyKnot(),
  HeartCurve: new Curves.HeartCurve(3.5),
  VivianiCurve: new Curves.VivianiCurve(70),
  KnotCurve: new Curves.KnotCurve(),
  HelixCurve: new Curves.HelixCurve(),
  TrefoilKnot: new Curves.TrefoilKnot(),
  TorusKnot: new Curves.TorusKnot(20),
  CinquefoilKnot: new Curves.CinquefoilKnot(20),
  TrefoilPolynomialKnot: new Curves.TrefoilPolynomialKnot(14),
  FigureEightPolynomialKnot: new Curves.FigureEightPolynomialKnot(),
  DecoratedTorusKnot4a: new Curves.DecoratedTorusKnot4a(),
  DecoratedTorusKnot4b: new Curves.DecoratedTorusKnot4b(),
  DecoratedTorusKnot5a: new Curves.DecoratedTorusKnot5a(),
  DecoratedTorusKnot5c: new Curves.DecoratedTorusKnot5c(),
  PipeSpline: pipeSpline,
  SampleClosedSpline: sampleClosedSpline
}

const Mesh = () => {
  const splineCamera: any = useRef()
  const cameraEye: any = useRef()

  const geoParams = useControls('Geometry', {
    'spline': { value: 'GrannyKnot', options: Object.keys(splines) },
    'scale': { value: 4, min: 2, max: 10, step: 2 },
    'extrusionSegments': { value: 100, min: 50, max: 500, step: 50 },
    'radiusSegments': { value: 3, min: 2, max: 12, step: 1 },
    'closed': true
  })

  const camParams = useControls('Camera', {
    'animationView': false,
    'lookAhead': false,
    'cameraHelper': false
  })

  const tubeGeometry = useMemo(() => 
    new THREE.TubeGeometry(splines[geoParams.spline], geoParams.extrusionSegments, 2, geoParams.radiusSegments, geoParams.closed)
  , [geoParams])

  useHelper(camParams.cameraHelper && splineCamera, CameraHelper)

  useFrame(() => {
    // animate camera along spline
    const time = Date.now()
    const looptime = 20 * 1000
    const t = (time % looptime) / looptime

    const position = new THREE.Vector3()
    tubeGeometry.parameters.path.getPointAt(t, position)
    position.multiplyScalar(geoParams.scale)

    // interpolation
    const segments = tubeGeometry.tangents.length
    const pickt = t * segments
    const pick = Math.floor(pickt)
    const pickNext = (pick+1)%segments

    const binormal = new THREE.Vector3()
    binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick])
    binormal.multiplyScalar(pickt-pick).add(tubeGeometry.binormals[pick])

    const direction = new THREE.Vector3()
    tubeGeometry.parameters.path.getTangentAt(t, direction)
    const offset = 15

    const normal = new THREE.Vector3()
    normal.copy(binormal).cross(direction)

    // we move on a offset on its binormal
    position.add(normal.clone().multiplyScalar(offset))

    splineCamera.current.position.copy(position)
    cameraEye.current.position.copy(position)

    // using arclength for stablization in look ahead
    const lookAt = new THREE.Vector3()
    tubeGeometry.parameters.path.getPointAt((t+30/tubeGeometry.parameters.path.getLength())%1, lookAt)
    lookAt.multiplyScalar(geoParams.scale)

    // camera orientation 2 - up orientation via normal
    if (!camParams.lookAhead) lookAt.copy(position).add(direction)
    splineCamera.current.matrix.lookAt(splineCamera.current.position, lookAt, normal)
    splineCamera.current.quaternion.setFromRotationMatrix(splineCamera.current.matrix)
  })

  return (
    <>
      <object3D>
        <mesh scale={geoParams.scale} geometry={tubeGeometry} >
          <meshLambertMaterial color='#ff00ff' />
          <mesh geometry={tubeGeometry} >
            <meshBasicMaterial color={0x000000} opacity={0.3} wireframe transparent />
          </mesh>
        </mesh>
        <mesh ref={cameraEye} visible={camParams.cameraHelper}>
          <sphereGeometry args={[5]} />
          <meshBasicMaterial color={0xdddddd} />
        </mesh>
        <PerspectiveCamera ref={splineCamera} args={[84, aspect_ratio, 0.01, 1000]} makeDefault={camParams.animationView} />
      </object3D>
      <PerspectiveCamera args={[50, aspect_ratio, 0.01, 10000]} position={[0, 50, 500]} makeDefault={!camParams.animationView} />
    </>
  )
}

const Example = () => {
  return (
    <Canvas gl={{ antialias: true }} dpr={devicePixelRatio} >
      <color attach='background' args={[0xf0f0f0]} />
      <ambientLight args={[0xcccccc, 0.2]} />
      <directionalLight args={[0xffffff]} position={[0, 0, 1]} />
      <Mesh />
      <OrbitControls minDistance={100} maxDistance={2000} />
    </Canvas>
  )
}

export default Example