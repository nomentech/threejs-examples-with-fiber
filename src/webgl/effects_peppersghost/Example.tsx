import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { PeppersGhostEffect } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { aspect_ratio } from '../../contants'

const Cubes = () => {
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.BoxGeometry().toNonIndexed() // ensure unique vertices for each triangle
    const position = geometry.attributes.position
    const colors = []
    const color = new THREE.Color()

    // generate for each side of the cube a different color
    for (let i=0; i<position.count; i+=6) {
      color.setHex(Math.random() * 0xffffff)

      // first face
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)

      // second face
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const material = new THREE.MeshBasicMaterial({ vertexColors: true })

    return { geometry, material }
  }, [])

  const cubes: any = useRef()
  useFrame(() => {
    cubes.current.rotation.y += 0.01
  })

  return (
    <group ref={cubes}>
      {[...Array(10)].map((_, i) => (
        <mesh key={i} geometry={geometry} material={material} scale={Math.random()+0.5}
          position={[Math.random()*2-1, Math.random()*2-1, Math.random()*2-1]}    
        />
      ))}
    </group>
  )
}

// const Effect = () => {
//   const { gl, scene, camera, size } = useThree()
//   const effect: any = useRef()

//   useEffect(() => effect.current.setSize(size.width, size.height), [size])
//   useFrame(() => effect.current.render(scene, camera), 2)

//   return (
//     <Effects ref={effect}>
//       <peppersGhostEffect args={[gl]} cameraDistance={5} />
//     </Effects>
//   )
// }

const Effect = () => {
  const { gl, scene, camera, size } = useThree()

  const effect = useMemo(() => {
    const effect = new PeppersGhostEffect(gl)
    return effect
  }, [])

  useEffect(() => {
    effect.setSize(size.width, size.height)
    effect.cameraDistance = 15
  }, [size])

  useFrame(() => { 
    effect.render(scene, camera)
  }, 1)

  return null
}

const Example = () => {
  return (
    <Canvas camera={{ fov: 60, aspect: aspect_ratio, near: 1, far: 100000 }}
      // gl={{ pixelRatio: devicePixelRatio }}
    >
      <color attach='background' args={['black']} />
      <Cubes />
      <Effect />
    </Canvas>
  )
}

export default Example