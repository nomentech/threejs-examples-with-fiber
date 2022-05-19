import { useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import { aspect_ratio } from '../../contants'
import texture from '../../textures/uv_grid_opengl.jpg'

const Meshes = () => {
  const { material, points } = useMemo(() => {
    const map = new THREE.TextureLoader().load(texture)
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 16

    const material = new THREE.MeshPhongMaterial({ map: map, side: THREE.DoubleSide })
    const points = []
    for (let i = 0; i < 50; i++) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2))
    }

    return { material, points }
  }, [])

  return (
    <>
      <mesh material={material} position={[-300, 0, 200]}>
        <sphereGeometry args={[75, 20, 10]} />
      </mesh>
      <mesh material={material} position={[-100, 0, 200]}>
        <icosahedronGeometry args={[75, 1]} />
      </mesh>
      <mesh material={material} position={[100, 0, 200]}>
        <octahedronGeometry args={[75, 2]} />
      </mesh>
      <mesh material={material} position={[300, 0, 200]}>
        <tetrahedronGeometry args={[75, 0]} />
      </mesh>
      <mesh material={material} position={[-300, 0, 0]}>
        <planeGeometry args={[100, 100, 4, 4]} />
      </mesh>
      <mesh material={material} position={[-100, 0, 0]}>
        <boxGeometry args={[100, 100, 100, 4, 4, 4]} />
      </mesh>
      <mesh material={material} position={[100, 0, 0]}>
        <circleGeometry args={[50, 20, 0, Math.PI*2]} />
      </mesh>
      <mesh material={material} position={[300, 0, 0]}>
        <ringGeometry args={[10, 50, 20, 5, 0, Math.PI*2]} />
      </mesh>
      <mesh material={material} position={[-300, 0, -200]}>
        <cylinderGeometry args={[25, 75, 100, 40, 5]} />
      </mesh>
      <mesh material={material} position={[-100, 0, -200]}>
        <latheGeometry args={[points, 20]} />
      </mesh>
      <mesh material={material} position={[100, 0, -200]}>
        <torusGeometry args={[50, 20, 20, 20]} />
      </mesh>
      <mesh material={material} position={[300, 0, -200]}>
        <torusKnotGeometry args={[50, 10, 50, 20]} />
      </mesh>
    </>
  )
}

const Animate = () => {
  return useFrame(({ scene, camera, clock }) => {
    const timer = clock.getElapsedTime() * 0.1

    camera.position.x = Math.cos(timer) * 800
    camera.position.z = Math.sin(timer) * 800
    camera.lookAt(scene.position)

    scene.traverse((object: any) => {
      if (object.isMesh) {
        object.rotation.x = timer * 5
        object.rotation.y = timer * 2.5
      }
    })
  })
}

const Example = () => {
  return (
    <Canvas gl={{ antialias: true }} dpr={devicePixelRatio}>
      <PerspectiveCamera args={[45, aspect_ratio, 1, 2000]} position={[0, 400, 0]} makeDefault>
        <pointLight args={[0xffffff, 0.8]} />
      </PerspectiveCamera>
      <color attach='background' args={[0x000000]} />
      <ambientLight args={[0xcccccc, 0.4]} />
      <Meshes />
      <Animate />
    </Canvas>
  )
}

export default Example