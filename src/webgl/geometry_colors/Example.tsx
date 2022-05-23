import { useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

import { aspect_ratio } from '../../contants'

const Meshes = () => {
  const { geometry1, geometry2, geometry3, material, wireframeMaterial } = useMemo(() => {
    const radius = 200
    const geometry1 = new THREE.IcosahedronGeometry(radius, 1)
    
    const count = geometry1.attributes.position.count
    geometry1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count*3), 3))

    const geometry2 = geometry1.clone()
    const geometry3 = geometry1.clone()

    const color = new THREE.Color()
    const positions1 = geometry1.attributes.position
    const positions2 = geometry2.attributes.position
    const positions3 = geometry3.attributes.position
    const colors1 = geometry1.attributes.color
    const colors2 = geometry2.attributes.color 
    const colors3 = geometry3.attributes.color

    for (let i=0; i<count; i++) {
      color.setHSL((positions1.getY(i)/radius+1)/2, 1.0, 0.5)
      colors1.setXYZ(i, color.r, color.g, color.b)

      color.setHSL(0, (positions2.getY(i)/radius+1)/2, 0.5)
      colors2.setXYZ(i, color.r, color.g, color.b)

      color.setRGB(1, 0.8-(positions3.getY(i)/radius+1)/2, 0)
      colors3.setXYZ(i, color.r, color.g, color.b)
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      vertexColors: true,
      shininess: 0
    })

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true
    })

    return { geometry1, geometry2, geometry3, material, wireframeMaterial }
  }, [])

  return (
    <>
      <mesh position={[-400, 0, 0]} rotation={[-1.87, 0, 0]} geometry={geometry1} material={material} >
        <mesh geometry={geometry1} material={wireframeMaterial} />
      </mesh>
      <mesh position={[400, 0, 0]} geometry={geometry2} material={material} >
        <mesh geometry={geometry2} material={wireframeMaterial} />
      </mesh>
      <mesh geometry={geometry3} material={material} >
        <mesh geometry={geometry3} material={wireframeMaterial} />
      </mesh>
    </>
  )
}

const ShadowMeshes = () => {
  const { shadowGeo,  shadowMaterial } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128

    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2)
    gradient.addColorStop(0.1, 'rgba(210, 210, 210, 1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    const shadowTexture = new THREE.CanvasTexture(canvas)
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture })
    const shadowGeo = new THREE.PlaneGeometry(300, 300, 1, 1)

    return { shadowGeo, shadowMaterial }
  }, [])

  return (
    <>
      <mesh material={shadowMaterial} geometry={shadowGeo} position={[0, -250, 0]} rotation={[-Math.PI/2, 0, 0]} />
      <mesh material={shadowMaterial} geometry={shadowGeo} position={[-400, -250, 0]} rotation={[-Math.PI/2, 0, 0]} />
      <mesh material={shadowMaterial} geometry={shadowGeo} position={[400, -250, 0]} rotation={[-Math.PI/2, 0, 0]} />
    </>
  )
}

const Animate = () => {
  return useFrame(({ scene, camera, mouse }) => {
    camera.position.x += (mouse.x * 100 - camera.position.x)
    camera.position.y += (-mouse.y * 100 - camera.position.y)

    camera.lookAt(scene.position)
  })
}

const Example = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1800], fov: 20, aspect: aspect_ratio, near: 1, far: 10000 }} 
      gl={{ antialias: true }} dpr={devicePixelRatio}>
      <color attach='background' args={[0xffffff]} />
      <directionalLight args={[0xffffff]} position={[0, 0, 1]} />
      <ShadowMeshes />
      <Meshes />
      <Animate />
    </Canvas>
  )
}

export default Example