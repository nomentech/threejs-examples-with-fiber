import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { StereoEffect } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { aspect_ratio } from '../../contants'

import nx from '../../textures/cube/Park3Med/nx.jpg'
import ny from '../../textures/cube/Park3Med/ny.jpg'
import nz from '../../textures/cube/Park3Med/nz.jpg'
import px from '../../textures/cube/Park3Med/px.jpg'
import py from '../../textures/cube/Park3Med/py.jpg'
import pz from '../../textures/cube/Park3Med/pz.jpg'

const urls = [px, nx, py, ny, pz, nz]
const textureCube = new THREE.CubeTextureLoader().load(urls)
textureCube.mapping = THREE.CubeRefractionMapping

const Effect = () => {
  const { gl, size } = useThree()

  const effect = useMemo(() => {
    return new StereoEffect(gl)
  }, [])

  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [size])

  useFrame(({ scene, camera}) => {
    effect.render(scene, camera)
  }, 1)

  return null
}

const Meshes = () => {
  const count=500

  const spheres = useMemo(() => {
    const spheres: any[] = []
    const geometry = new THREE.SphereGeometry(100, 32, 16)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      refractionRatio: 0.95,
      envMap: textureCube
    })

    for (let i=0; i<count; i++) {
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.x = sphere.position.y = sphere.position.z = Math.random() * 10000 - 5000
      sphere.scale.x = sphere.scale.y = sphere.scale.z = Math.random() * 3 + 1
      spheres.push(sphere)
    }
    return spheres
  }, [])
  
  useFrame(({ scene, camera, clock, mouse }) => {
    const timer = clock.getElapsedTime() * 0.1

    camera.position.x += (mouse.x * 1000 - camera.position.x)
    camera.position.y += (mouse.y * 1000 - camera.position.y)
    camera.lookAt(scene.position)
    
    spheres.map((sphere, i) => {
      sphere.position.x = 5000 * Math.cos(timer+i)
      sphere.position.y = 5000 * Math.sin(timer+i*1.1)
    })
  })

  return (
    <>
      { spheres.map((sphere, i) => (
        <primitive key={i} object={sphere} />
      ))}
    </>
  )
}

const Example = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3200], fov: 60, aspect: aspect_ratio, near:1, far: 100000 }} gl={{ pixelRatio: devicePixelRatio}} >
      <primitive attach='background' object={textureCube} />
      <Meshes />
      <Effect />
    </Canvas>
  )
}

export default Example