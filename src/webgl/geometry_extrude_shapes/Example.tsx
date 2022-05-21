import { useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { TrackballControls } from '@react-three/drei'

import { aspect_ratio } from '../../contants'

const Meshes = () => {
  const { shape1, extrudeSettings1 } = useMemo(() => {
    const closedSpline: any = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-60, -100, 60),
      new THREE.Vector3(-60, 20, 60),
      new THREE.Vector3(-60, 120, 60),
      new THREE.Vector3(60, 20, -60),
      new THREE.Vector3(60, -100, -60)
    ])
  
    closedSpline.curveType = 'catmullrom'
    closedSpline.closed = true

    const extrudeSettings1 = {
      steps: 100,
      bevelEnabled: false,
      extrudePath: closedSpline
    }

    const pts1 = [], count = 3
    for (let i=0; i<count; i++) {
      const l = 20
      const a = 2*i/count*Math.PI
      pts1.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l))
    }

    const shape1 = new THREE.Shape(pts1)
    return { shape1, extrudeSettings1 }
  }, [])

  const { shape2, extrudeSettings2 } = useMemo(() => {
    const randomPoints = []
    for (let i=0; i<10; i++) {
      randomPoints.push(new THREE.Vector3((i-4.5)*50, THREE.MathUtils.randFloat(-50, 50), THREE.MathUtils.randFloat(-50, 50)))
    }

    const randomSpline = new THREE.CatmullRomCurve3(randomPoints)
    const extrudeSettings2 = {
      steps: 200,
      bevelEnabled: false,
      extrudePath: randomSpline
    }

    const pts2 = [], numPts = 5
    for (let i=0; i<numPts*2; i++) {
      const l = i%2 == 1 ? 10 : 20
      const a = i / numPts * Math.PI
      pts2.push(new THREE.Vector2(Math.cos(a)*l, Math.sin(a)*l))
    }
    const shape2 = new THREE.Shape(pts2)
    return { shape2, extrudeSettings2 }
  }, [])

  const extrudeSettings3 = {
    depth: 20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 4,
    bevelSegments: 1
  }

  return (
    <>
      <mesh>
        <extrudeGeometry args={[shape1, extrudeSettings1]} />
        <meshLambertMaterial color='#b00000' wireframe={false} />
      </mesh>
      <mesh>
        <extrudeGeometry args={[shape2, extrudeSettings2]} />
        <meshLambertMaterial color='#ff8000' wireframe={false} />
      </mesh>
      <mesh position={[50, 100, 50]} >
        <extrudeGeometry args={[shape2, extrudeSettings3]} />
        <meshLambertMaterial color='#b00000' />
        <meshLambertMaterial color='#ff8000' />
      </mesh>
    </>
  )
}

const Example = () => {
  return (
    <Canvas camera={{ position: [0, 0, 500], fov: 45, aspect: aspect_ratio, near: 1, far: 1000}}>
      <color attach='background' args={[0x222222]} />
      <ambientLight args={[0x222222]} />
      <pointLight args={[0xffffff]} position={[0, 0, 500]} />
      <Meshes />
      <TrackballControls minDistance={200} maxDistance={500} />
    </Canvas>
  )
}

export default Example