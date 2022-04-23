import { useEffect, useRef } from "react"
import { CameraHelper, MathUtils } from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrthographicCamera, PerspectiveCamera, useHelper } from "@react-three/drei"

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const aspect = SCREEN_WIDTH / SCREEN_HEIGHT
const frustumSize = 600

let mesh: any, renderer: any
let cameraPerspective: any, cameraOrtho: any
let cameraPerspectiveHelper: any, cameraOrthoHelper: any
let activeCamera: any, activeHelper: any

const CameraHelpers = () => {
  const { gl, scene, camera } = useThree()
  renderer = gl
  renderer.autoClear = false

  cameraPerspective = useRef()
  cameraOrtho = useRef()
  cameraPerspectiveHelper = useHelper(cameraPerspective, CameraHelper)
  cameraOrthoHelper = useHelper(cameraOrtho, CameraHelper)

  window.addEventListener("keydown", (event) => {
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
  })

  useEffect(() => {
    activeCamera = cameraPerspective
    activeHelper = cameraPerspectiveHelper
  }, [])

  useFrame(() => {
    const r = Date.now() * 0.0005

    if (mesh) {
      mesh.current.position.set(700*Math.cos(r), 700*Math.sin(r), 700*Math.sin(r))
      mesh.current.children[0].position.set(70*Math.cos(2*r), 0, 70*Math.sin(r))
    }

    if (activeCamera === cameraPerspective && mesh.current.position.length() !== 0) {
      cameraPerspective.fov = 35 + 30 * Math.sin(0.5*r)
      cameraPerspective.far = mesh.current.position.length()

      if (cameraPerspectiveHelper && cameraOrthoHelper) {
        cameraPerspectiveHelper.current.update()
        cameraPerspectiveHelper.visible = true
  
        cameraOrthoHelper.visible = false
      }

    } else {
      cameraOrtho.far = mesh.current.position.length()

      if (cameraPerspectiveHelper.current && cameraOrthoHelper.current) {
        cameraOrthoHelper.current.update()
        cameraOrthoHelper.visible = true
  
        cameraPerspectiveHelper.visible = false
      }
    }

    if (cameraOrtho.current && cameraPerspective.current) {
      cameraOrtho.current.lookAt(mesh.current.position)
      cameraPerspective.current.lookAt(mesh.current.position)
    }

    if (renderer && activeHelper) {
      renderer.clear();    

      activeHelper.visible = false 
      renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT)
      renderer.render(scene, activeCamera.current)

      activeHelper.visible = true
      renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT)
      renderer.render(scene, camera)
    }
  })

  return (
    <group>    
      <PerspectiveCamera 
        fov={50} aspect={0.5*aspect} near={150} far={1000}
        rotation={[0, Math.PI, 0]}
        ref={cameraPerspective} 
      />
      <OrthographicCamera 
        left={-0.5*frustumSize*aspect/2} right={0.5*frustumSize*aspect/2} top={frustumSize/2} bottom={-frustumSize/2}
        near={150} far={1000}
        rotation={[0, Math.PI, 0]}
        ref={cameraOrtho}
      /> 
      <mesh position={[0, 0, 150]}>
        <sphereGeometry args={[5, 16, 8]} />
        <meshBasicMaterial color={0x0000ff} wireframe={true} />
      </mesh>
    </group>
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
    <points >
      <bufferGeometry attach="geometry">
        <bufferAttribute name="position" array={vertices} itemSize={3} />
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

const Example = () => {
  return (
    <Canvas camera={{position: [0, 0, 2500], fov: 50, aspect: 0.5*aspect, near: 1, far: 10000}} >
      <color attach="background" args={["black"]} />
      <CameraHelpers />
      <Mesh />
      <Particles />
    </Canvas>
  )
}

export default Example