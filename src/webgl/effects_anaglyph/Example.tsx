import { createRef, useMemo } from 'react'
import { CubeTextureLoader, PerspectiveCamera } from 'three'
import { AnaglyphEffect } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { aspect_ratio, canvas_width, canvas_height } from '../../contants'

import px from '../../textures/cube/pisa/px.png'
import py from '../../textures/cube/pisa/py.png'
import pz from '../../textures/cube/pisa/pz.png'
import nx from '../../textures/cube/pisa/nx.png'
import ny from '../../textures/cube/pisa/ny.png'
import nz from '../../textures/cube/pisa/nz.png'

let mouseX = 0
let mouseY = 0

const urls = [px, nx, py, ny, pz, nz]
const textureCube = new CubeTextureLoader().load(urls)

const onDocumentMouseMove = (event: any) => {
  mouseX = (event.clientX - canvas_width / 2) / 100
  mouseY = (event.clientY - canvas_height / 2) / 100
}
document.addEventListener('mousemove', onDocumentMouseMove)

const Meshes = () => { 
  const { gl, scene, camera } = useThree()
  const effect = new AnaglyphEffect(gl)
  effect.setSize(canvas_width || 2, canvas_height || 2)
  
  const spheres = useMemo(() => {
    const refs = []
    for (let i=0; i<500; i++) {
      refs.push(createRef())
    }
    return refs as any
  }, [])

  const meshes: any[] = []
  for (let i=0; i<500; i++) {
    meshes.push(
      <mesh key={i} scale={Math.random()*3+1} ref={spheres[i]}
        position={[Math.random()*10-5, Math.random()*10-5, Math.random()*10-5]}>
        <sphereGeometry args={[0.1, 32, 16]} />
        <meshBasicMaterial color={0xffffff} envMap={textureCube} />
      </mesh>
    )
  }

  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime() * 0.1

    camera.position.x += (mouseX - camera.position.x) * .05
		camera.position.y += (-mouseY - camera.position.y) * .05

		camera.lookAt(scene.position)

    for (let i=0, il=spheres.length; i<il; i++) {
      const sphere = spheres[i].current
      sphere.position.x = 5 * Math.cos(timer+i)
      sphere.position.y = 5 * Math.sin(timer+i*1.1)
    }
    effect.render(scene, camera)
  })
  
  return (
    <>
      {meshes.map(m => m)}
    </>
  )
}

const Example = () => {
  const camera = new PerspectiveCamera(60, aspect_ratio, 0.01, 100)
  camera.position.z = 3
  camera.setFocalLength(3)

  return (
    <Canvas>
      <primitive attach='camera' object={camera} makeDefault />
      <primitive attach='background' object={textureCube} />
      <Meshes />
    </Canvas>
  )
}

export default Example