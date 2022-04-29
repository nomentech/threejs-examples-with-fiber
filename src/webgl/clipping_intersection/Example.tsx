import { useRef } from 'react'
import { Color, DoubleSide, Plane, Vector3 } from 'three'
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"
import { Canvas, RootState } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { aspect_ratio } from '../../contants'

let meshRef: any, helpersRef: any

const params = {
  clipIntersection: true,
  planeConstant: 0,
  showHelpers: false
}

const clipPlanes = [
  new Plane(new Vector3(1, 0, 0), 0),
  new Plane(new Vector3(0, -1, 0), 0),
  new Plane(new Vector3(0, 0, -1), 0)
]

const createControls = ({gl, scene, camera}: RootState) => {
  gl.localClippingEnabled = true
  const gui = new GUI()

  gui.add(params, 'clipIntersection').name('clip intersection').onChange((value: number) => {
    const children = meshRef.current.children

    for (let i = 0; i < children.length; i ++) {
      children[i].material.clipIntersection = value
    }
    gl.render(scene, camera)
  })

  gui.add(params, 'planeConstant', -1, 1).step(0.01).name('plane constant').onChange((value: number) => {
    for (let j = 0; j < clipPlanes.length; j ++) {
      clipPlanes[j].constant = value
    }
    gl.render(scene, camera)
  })

  gui.add(params, 'showHelpers').name('show helpers').onChange((value: number) => {
    helpersRef.current.visible = value
    gl.render(scene, camera)
  })
}

const Example = () => {
  meshRef = useRef()
  helpersRef = useRef()

  const meshes = []
  for (let i = 1; i <= 30; i += 2) {
    meshes.push(
      <mesh key={i}>
        <sphereGeometry args={[i / 30, 48, 24]} />
        <meshLambertMaterial
          color={new Color().setHSL(Math.random(), 0.5, 0.5)}
          side={DoubleSide}
          clippingPlanes={clipPlanes}
					clipIntersection={params.clipIntersection}
        />
      </mesh>
    )
  }

  return (
    <Canvas camera={{position: [-1.5, 2.5, 3.0], fov: 40, aspect: aspect_ratio, near: 1, far: 200}} 
      onCreated={(state) => createControls(state)}>
      <color attach='background' args={['black']} />
      <hemisphereLight args={[0xffffff, 0x080808, 1.5]} position={[-1.25, 1, 1.25]} />
      <group ref={meshRef}>
        {meshes}
      </group>
      <group ref={helpersRef} visible={false}>
        <planeHelper args={[clipPlanes[0], 2, 0xff0000]} />
        <planeHelper args={[clipPlanes[1], 2, 0x00ff00]} />
        <planeHelper args={[clipPlanes[2], 2, 0x0000ff]} />
      </group>
      <OrbitControls 
        minDistance={1}
        maxDistance={10}
        enablePan={false}
      />
    </Canvas>
  )
}

export default Example