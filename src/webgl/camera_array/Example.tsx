import { useEffect, useRef } from "react"
import { PerspectiveCamera, Vector4 } from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

import { aspect_ratio, canvas_height, canvas_width } from '../../contants'

const amount = 6
const width = (canvas_width / amount) * window.devicePixelRatio
const height = (canvas_height / amount) * window.devicePixelRatio
let camera: any, renderer: any

const onWindowResize = () => {
  camera.aspect = aspect_ratio
  camera.current.updateProjectionMatrix()

  for (let y = 0; y < amount; y++) {
    for (let x = 0; x < amount; x++) {
      const subcamera = camera.current.cameras[amount * y + x]
      subcamera.viewport.set(
        Math.floor(x * width),
        Math.floor(y * height),
        Math.ceil(width),
        Math.ceil(height))

      subcamera.aspect = aspect_ratio
      subcamera.updateProjectionMatrix()
    }
  }
  if (renderer) renderer.setSize(canvas_width
  , canvas_height)
}

const Background = () => {
  return (
    <mesh position={[0, 0, -1]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial color={0x000066} />
    </mesh>
  )
}

const Cylinder = () => {
  const mesh: any = useRef()
  
  useFrame(() => {
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.z += 0.01
  })

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      <meshPhongMaterial color={0xff0000} />
    </mesh>
  )
}

const Cameras = () => {
  const cameras = []
  for (let y = 0; y < amount; y ++) {
    for (let x = 0; x < amount; x ++) {
      const subcamera: any = new PerspectiveCamera(40, aspect_ratio, 0.1, 10)
      subcamera.viewport = new Vector4( Math.floor(x * width), Math.floor(y * height), Math.ceil(width), Math.ceil(height))
      subcamera.position.x = (x / amount) - 0.5
      subcamera.position.y = 0.5 - (y / amount)
      subcamera.position.z = 1.5
      subcamera.position.multiplyScalar(2)
      subcamera.lookAt(0, 0, 0)
      subcamera.updateMatrixWorld()
      cameras.push(subcamera)
    }
  }

  camera = useRef()
  const set = useThree((state) => state.set)
  useEffect(() => set({ camera: camera.current }), [])

  return (
    <arrayCamera ref={camera} cameras={cameras} position={[0, 0, 3]} />
  )
}

const Example = () => {
  useEffect(() => {
    // default camera is set to arrayCamera, do resize manually
    window.addEventListener("resize", onWindowResize)
    return () => {
      window.removeEventListener("resize", onWindowResize)
    }
  }, [])

  return (
    <Canvas shadows onCreated={({ gl }) => (renderer = gl)}>
      <Cameras />
      <ambientLight color={0x222244} />
      <directionalLight position={[0.5, 0.5, 1]} castShadow shadow-camera-zoom={4} />
      <Background />
      <Cylinder />
    </Canvas>
  )
}

export default Example