import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

import { aspect_ratio } from '../../contants'
import crate from '../../textures/crate.gif'

const Mesh = () => {
  const texture = useTexture(crate)

  const meshRef: any = useRef()
  useFrame(() => {
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[200, 200, 200]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

const Example = () => {
  return (
    <Canvas camera={{ position: [0, 0, 400], fov: 70, aspect: aspect_ratio, near:1, far: 1000 }}
      gl={{ antialias: true}} dpr={devicePixelRatio} >
      <color attach='background' args={[0x000000]} />
      <Mesh />
    </Canvas>
  )
}

export default Example