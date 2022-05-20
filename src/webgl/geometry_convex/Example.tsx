import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'

import { aspect_ratio } from '../../contants'
import disc from '../../textures/sprites/disc.png'

const Meshes = () => {
  const texture = useTexture(disc)

  const groupRef: any = useRef()

  const { pointsGeometry, meshGeometry} = useMemo(() => {
    let dodecahedronGeometry = new THREE.DodecahedronGeometry(10)

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data
    dodecahedronGeometry.deleteAttribute('normal')
    dodecahedronGeometry.deleteAttribute('uv')

    dodecahedronGeometry = BufferGeometryUtils.mergeVertices(dodecahedronGeometry) as any

    const vertices = []
    const positionAttribute = dodecahedronGeometry.getAttribute('position')

    for (let i =0; i< positionAttribute.count; i++) {
      const vertex = new THREE.Vector3()
      vertex.fromBufferAttribute(positionAttribute, i)
      vertices.push(vertex)
    }

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices)
    const meshGeometry = new ConvexGeometry(vertices)

    return { pointsGeometry, meshGeometry }
  }, [])

  useFrame(() => {
    groupRef.current.rotation.y += 0.005
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeometry}>
        <pointsMaterial color='#0080ff' map={texture} size={1} alphaTest={0.5} />
      </points>
      <mesh geometry={meshGeometry} renderOrder={0}>
        <meshLambertMaterial color='#ffffff' opacity={0.5} transparent={true} side={THREE.BackSide} />
      </mesh>
      <mesh geometry={meshGeometry} renderOrder={1}>
        <meshLambertMaterial color='#ffffff' opacity={0.5} transparent={true} side={THREE.FrontSide} />
      </mesh>
    </group>
  )
}

const Example = () => {
  return (
    <Canvas camera={{ position: [15, 20, 30], fov: 40, aspect: aspect_ratio, near: 1, far: 1000 }}
      gl={{ antialias: true }} dpr={devicePixelRatio} >
      <color attach='background' args={[0x000000]} />
      <ambientLight args={[0x222222]} />
      <pointLight args={[0xffffff, 1]} />
      <axesHelper args={[20]} />
      <Meshes />
      <OrbitControls minDistance={20} maxDistance={50} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}

export default Example