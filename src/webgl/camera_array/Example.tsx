import { PerspectiveCamera, Vector4 } from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"

let CANVAS_WIDTH = window.innerWidth > 640 ? (window.innerWidth - 300) : window.innerWidth
let CANVAS_HEIGHT = window.innerWidth > 640 ? window.innerHeight : (window.innerHeight - 48)
const AMOUNT = 6
const ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT
const WIDTH = (CANVAS_WIDTH / AMOUNT) * window.devicePixelRatio
const HEIGHT = (CANVAS_HEIGHT / AMOUNT) * window.devicePixelRatio
let camera: any, renderer: any

const onWindowResize = () => {
  CANVAS_WIDTH = window.innerWidth > 640 ? (window.innerWidth - 300) : window.innerWidth
  CANVAS_HEIGHT = window.innerWidth > 640 ? window.innerHeight : (window.innerHeight - 48)

  const ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT
  const WIDTH = (CANVAS_WIDTH / AMOUNT) * window.devicePixelRatio
  const HEIGHT = (CANVAS_HEIGHT / AMOUNT) * window.devicePixelRatio

  camera.aspect = ASPECT_RATIO
  camera.current.updateProjectionMatrix()

  for (let y = 0; y < AMOUNT; y++) {
    for (let x = 0; x < AMOUNT; x++) {
      const subcamera = camera.current.cameras[AMOUNT * y + x]
      subcamera.viewport.set(
        Math.floor(x * WIDTH),
        Math.floor(y * HEIGHT),
        Math.ceil(WIDTH),
        Math.ceil(HEIGHT))

      subcamera.aspect = ASPECT_RATIO
      subcamera.updateProjectionMatrix()
    }
  }
  if (renderer) renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT)
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
  for (let y = 0; y < AMOUNT; y ++) {
    for (let x = 0; x < AMOUNT; x ++) {
      const subcamera: any = new PerspectiveCamera(40, ASPECT_RATIO, 0.1, 10)
      subcamera.viewport = new Vector4( Math.floor(x * WIDTH), Math.floor(y * HEIGHT), Math.ceil(WIDTH), Math.ceil(HEIGHT))
      subcamera.position.x = (x / AMOUNT) - 0.5
      subcamera.position.y = 0.5 - (y / AMOUNT)
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
  // useFrame(() => camera.current.updateMatrixWorld())

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