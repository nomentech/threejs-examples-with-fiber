import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { TrackballControls } from '@react-three/drei'
import { AsciiEffect } from 'three-stdlib'

import { aspect_ratio } from '../../contants'

const Effect = () => {
  const { size, gl, scene, camera } = useThree()

  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, ' .:-+*=%@#', { invert: true })
    // position, top, left is necessary
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.color = 'white'
    effect.domElement.style.backgroundColor = 'black'

    return effect
  }, [])

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.parentNode?.appendChild(effect.domElement)
    return () => gl.domElement.parentNode?.removeChild(effect.domElement) as any
  }, [effect])

  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [size])

  // Take over render-loop (that is what the priority 1 is for)
  useFrame(() => {
    effect.render(scene, camera)
  }, 1)

  return null  
}

const Plane = () => {
  return (
    <mesh position={[0, -200, 0]} rotation={[-Math.PI/2, 0, 0]} >
      <planeGeometry args={[400, 400]} />
      <meshBasicMaterial color='#e0e0e0' />
    </mesh>
  )
}

const Sphere = () => {
  const sphere: any = useRef()
  
  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime()

    sphere.current.position.y = Math.abs(Math.sin(timer*2)) * 150
    sphere.current.rotation.x = timer * 0.3
    sphere.current.rotation.z = timer * 0.2
  })

  return (
    <mesh ref={sphere}>
      <sphereGeometry args={[200, 20, 10]} />
      <meshPhongMaterial flatShading />
    </mesh>
  )
}

const Light = () => {
  return (
    <>
      <pointLight args={[0xffffff]} position={[500, 500, 500]} />
      <pointLight args={[0xffffff, 0.25]} position={[-500, -500, -500]} />
    </>
  )
}

const Example = () => {
  return (
    <Canvas camera={{ position: [0, 150, 500], fov: 70, aspect: aspect_ratio, near: 1, far: 1000 }}>
      <color attach='background' args={['#000000']} />
      <Light />
      <Sphere />
      <Plane />
      <Effect />
      <TrackballControls />
    </Canvas>
  )
}

export default Example