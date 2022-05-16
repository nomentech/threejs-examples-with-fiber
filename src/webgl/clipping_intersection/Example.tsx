import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

import { aspect_ratio } from '../../contants'

const params = {
  clipIntersection: true,
  planeConstant: 0,
  showHelpers: false
}

const clipPlanes = [
  new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
]

const Meshes = () => {
  const meshRef: any = useRef()
  const helpersRef: any = useRef()
  
  const { gl } = useThree()
  gl.localClippingEnabled = true

  useControls({
    'clipIntersection': {
      label: 'clip intersection',
      value: params.clipIntersection,
      onChange: (value) => {
        const children = meshRef.current.children

        for (let i = 0; i < children.length; i++) {
          children[i].material.clipIntersection = value
        }
      }
    },
    'planeConstant': {
      label: 'plane contant',
      value: params.planeConstant,
      min: -1, max: 1, step: 0.01,
      onChange: (value) => {
        for (let j = 0; j < clipPlanes.length; j++) {
          clipPlanes[j].constant = value
        }
      }
    },
    'showHelpers': {
      label: 'show helpers',
      value: params.showHelpers,
      onChange: (value: number) => {
        helpersRef.current.visible = value
      }
    }
  })

  const meshes = []
  for (let i = 1; i <= 30; i += 2) {
    meshes.push(
      <mesh key={i}>
        <sphereGeometry args={[i / 30, 48, 24]} />
        <meshLambertMaterial
          color={new THREE.Color().setHSL(Math.random(), 0.5, 0.5)}
          side={THREE.DoubleSide}
          clippingPlanes={clipPlanes}
					clipIntersection={params.clipIntersection}
        />
      </mesh>
    )
  }

  return (
    <>
      <group ref={meshRef}>
        {meshes}
      </group>
      <group ref={helpersRef} visible={false}>
        <planeHelper args={[clipPlanes[0], 2, 0xff0000]} />
        <planeHelper args={[clipPlanes[1], 2, 0x00ff00]} />
        <planeHelper args={[clipPlanes[2], 2, 0x0000ff]} />
      </group>
    </>
  )
}

const Example = () => {
  return (
    <Canvas camera={{position: [-1.5, 2.5, 3.0], fov: 40, aspect: aspect_ratio, near: 1, far: 200}} >
      <color attach='background' args={['black']} />
      <hemisphereLight args={[0xffffff, 0x080808, 1.5]} position={[-1.25, 1, 1.25]} />
      <Meshes />
      <OrbitControls 
        minDistance={1}
        maxDistance={10}
        enablePan={false}
      />
    </Canvas>
  )
}

export default Example