import { useRef } from "react"
import { CameraHelper, MathUtils } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useHelper } from "@react-three/drei"

import { aspect_ratio, canvas_height, canvas_width } from '../../contants'

const frustumSize = 600
let mesh: any, camera: any
let cameraPerspective: any, cameraOrtho: any
let cameraPerspectiveHelper: any, cameraOrthoHelper: any
let activeCamera: any, activeHelper: any, cameraRig: any

const onKeyDown = (event: any) => {
  switch (event.key) {
    case "o":
    case "O":
      activeCamera = cameraOrtho
      activeHelper = cameraOrthoHelper
      break

    case "p":
    case "P":
      activeCamera = cameraPerspective
      activeHelper = cameraPerspectiveHelper
      break
  }
}
document.addEventListener( 'keydown', onKeyDown )

const Camera = () => {
  camera = useRef()

  return (
    <perspectiveCamera ref={camera}
      position={[0, 0, 2500]} fov={50} aspect={0.5*aspect_ratio} near={1} far={10000}
    />
  )
}

const Particles = () => {
  const vertices = []
  for (let i = 0; i < 10000; i++ ) {
    vertices.push(MathUtils.randFloatSpread(2000)) // x
    vertices.push(MathUtils.randFloatSpread(2000)) // y
    vertices.push(MathUtils.randFloatSpread(2000)) // z
  }
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" args={[new Float32Array(vertices), 3]} />
      </bufferGeometry>   
      <pointsMaterial color={0x888888} />
    </points>
  )
}

const Mesh = () => {
  mesh = useRef()
  
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[100, 16, 8]} />
      <meshBasicMaterial color={0xffffff} wireframe={true} />
      <mesh position={[0, 150, 0]}>
        <sphereGeometry args={[50, 16, 8]} />
        <meshBasicMaterial color={0x00ff00} wireframe={true} />
      </mesh>
    </mesh>
  )
}

const CameraRig = () => {
  cameraRig = useRef()
  cameraPerspective = useRef()
  cameraOrtho = useRef()
  activeCamera = cameraPerspective

  return (
    <group ref={cameraRig}>
      <perspectiveCamera ref={cameraPerspective} rotation={[0, Math.PI, 0]} args={[50, 0.5*aspect_ratio, 150, 1000]} />
      <orthographicCamera ref={cameraOrtho} rotation={[0, Math.PI, 0]} 
        args={[-0.5*frustumSize*aspect_ratio/2, 0.5*frustumSize*aspect_ratio/2, frustumSize/2, -frustumSize/2, 150, 1000]} />
      <mesh>
        <sphereGeometry args={[5, 16, 8]} />
        <meshBasicMaterial color='#0000ff' wireframe />
      </mesh>
    </group>
  )
}

const CameraHelpers = () => {
  cameraPerspectiveHelper = useHelper(cameraPerspective, CameraHelper)
  cameraOrthoHelper = useHelper(cameraOrtho, CameraHelper)
  activeHelper = cameraPerspectiveHelper

  return null
}

const Animation = () => {
  return useFrame(({ gl, scene, set }) => {
    const r = Date.now() * 0.0005

    mesh.current.position.set(700*Math.cos(r), 700*Math.sin(r), 700*Math.sin(r))
    mesh.current.children[0].position.set(70*Math.cos(2*r), 0, 70*Math.sin(r))

    if (activeCamera === cameraPerspective) {
      cameraPerspective.current.fov = 35 + 30 * Math.sin(0.5*r)
      cameraPerspective.current.far = mesh.current.position.length()
      cameraPerspective.current.updateProjectionMatrix()

      cameraPerspectiveHelper.current.update()
      cameraPerspectiveHelper.current.visible = true

      cameraOrthoHelper.current.visible = false

    } else {
      cameraOrtho.current.far = mesh.current.position.length()
      cameraOrtho.current.updateProjectionMatrix()

      cameraOrthoHelper.current.update()
      cameraOrthoHelper.current.visible = true

      cameraPerspectiveHelper.current.visible = false
    }

    cameraRig.current.lookAt(mesh.current.position)

    gl.clear();    

    activeHelper.current.visible = false 
    gl.setViewport(0, 0, canvas_width / 2, canvas_height)
    set({camera: activeCamera.current})
    gl.render(scene, activeCamera.current)

    activeHelper.current.visible = true
    gl.setViewport(canvas_width / 2, 0, canvas_width / 2, canvas_height)
    set({camera: camera.current})
    gl.render(scene, camera.current)
  })
}

const Example = () => {
  return (
    <Canvas gl={{ antialias: true, pixelRatio: aspect_ratio , autoClear: false}} camera={{manual: true}}>
      <color attach="background" args={["black"]} />
      <Mesh />
      <Camera />
      <CameraRig />
      <CameraHelpers />
      <Particles />
      <Animation />
    </Canvas>
  )
}

export default Example