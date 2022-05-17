import { useState } from 'react'
import * as THREE from 'three'
import { DecalGeometry } from 'three-stdlib'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { aspect_ratio } from '../../contants'

import model from '../../models/LeePerrySmith/LeePerrySmith.glb'
import map from '../../models/LeePerrySmith/Map-COL.jpg'
import specularMap from '../../models/LeePerrySmith/Map-SPEC.jpg'
import normalMap from '../../models/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg'

import decal_diffuse from '../../textures/decal/decal-diffuse.png'
import decal_normal from '../../textures/decal/decal-normal.jpg'

useGLTF.preload(model)

const textureLoader = new THREE.TextureLoader()
const mapTexture = textureLoader.load(map)
const specularMapTexture = textureLoader.load(specularMap)
const normalMapTexture = textureLoader.load(normalMap)

// const decals: any[] = []
const params = {
  minScale: 10,
  maxScale: 20,
  rotate: true,
  clear: () => {
    // removeDecals()
  }
}

const decalDiffuse = textureLoader.load(decal_diffuse)
const decalNormal = textureLoader.load(decal_normal)
const decalMaterial = new THREE.MeshPhongMaterial({
  specular: 0x444444,
  map: decalDiffuse,
  normalMap: decalNormal,
  normalScale: new THREE.Vector2(1, 1),
  shininess: 30,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -4,
  wireframe: false
})

// const createControls = () => {
//   const gui = new GUI()

//   gui.add(params, 'minScale', 1, 30)
//   gui.add(params, 'maxScale', 1, 30)
//   gui.add(params, 'rotate')
//   gui.add(params, 'clear')
//   gui.open()
// }

// const removeDecals = () => {
//   decals.forEach(d => {
//     scene.remove(d)
//   })
//   decals.length = 0
// }

const Model = () => {
  const { scene }: any = useGLTF(model)
  const mesh = scene.children[0]

  const [decals, setDecals] = useState<any[]>([])

  const shoot = (event: any) => {
    const position = event.point
    const size = new THREE.Vector3(10, 10, 10)
    const scale = params.minScale + Math.random() * (params.maxScale - params.minScale)
    size.set(scale, scale, scale)
    const material = decalMaterial.clone()
    material.color.setHex(Math.random() * 0xffffff)

    const m = new THREE.Mesh(new DecalGeometry(mesh, position, new THREE.Euler(), size), material)
    setDecals(decals => [m, ...decals])
  }

  return (
    <>
      <primitive object={mesh} scale={10} onClick={shoot}>
        <meshPhongMaterial attach='material' specular={0x111111} shininess={25}
          map={mapTexture}
          specularMap={specularMapTexture}
          normalMap={normalMapTexture}
        />
      </primitive>
      {
        decals.map((d, i) => (
          <primitive key={i} object={d} />
        ))
      }
    </>
  )
}

const Example = () => {  
  return (
    <Canvas camera={{position: [0, 0, 120], fov: 45, aspect: aspect_ratio, near: 1, far: 1000 }} >
      <color attach='background' args={['black']} />
      <ambientLight args={[0x443333]} />
      <directionalLight args={[0xffddcc, 1]} position={[1, 0.75, 0.5]} />
      <directionalLight args={[0xccccff, 1]} position={[-1, 0.75, -0.5]} />
      <Model />
      <OrbitControls 
        minDistance={50}
        maxDistance={200}
      />
    </Canvas>
  )
}

export default Example