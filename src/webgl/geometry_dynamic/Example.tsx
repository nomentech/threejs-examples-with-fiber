import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { FirstPersonControls, useTexture } from '@react-three/drei'

import { aspect_ratio } from '../../contants'
import water from '../../textures/water.jpg'

const worldWidth = 128, worldDepth = 128

const Mesh = () => {
  const texture = useTexture(water)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(5, 5)

  const meshRef: any = useRef()
  useEffect(() => {
    const position = meshRef.current.geometry.attributes.position 
    position.usage = THREE.DynamicDrawUsage

    for (let i =0; i<position.count; i++) {
      const y = 35 * Math.sin(i/2)
      position.setY(i, y)
    }
  }, [])

  useFrame(({ clock }) => {
      const time = clock.getElapsedTime() * 10

      const position = meshRef.current.geometry.attributes.position

      for (let i =0; i<position.count; i++) {
        const y = 35 * Math.sin(i/5 + (time+i)/7)
        position.setY(i, y)
      }

      position.needsUpdate = true
  })

  return (
    <mesh rotation-x={-Math.PI/2} ref={meshRef} >
      <planeGeometry args={[20000, 20000, worldWidth - 1, worldDepth - 1]} />
      <meshBasicMaterial color={0x0044ff} map={texture} />
    </mesh>
  )
}

const Example = () => {
  return (
    <Canvas camera={{ position: [0, 200, 0], fov: 60, aspect: aspect_ratio, near: 1, far: 20000 }}
      gl={{ antialias: true }} dpr={devicePixelRatio} >
      <color attach='background' args={[0xaaccff]} />
      <fogExp2 attach='fog' args={[0xaaccff, 0.0007]} />
      <Mesh />
      <FirstPersonControls movementSpeed={500} lookSpeed={0.1} />
    </Canvas>
  )
}

export default Example