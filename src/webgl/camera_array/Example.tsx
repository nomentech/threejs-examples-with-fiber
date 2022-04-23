import { PerspectiveCamera, Vector4 } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"

const AMOUNT = 6
const ASPECT_RATIO = window.innerWidth / window.innerHeight
const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio
const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio

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
      subcamera.viewport = new Vector4( Math.floor( x * WIDTH ), Math.floor( y * HEIGHT ), Math.ceil( WIDTH ), Math.ceil( HEIGHT ) );
      subcamera.position.x = (x / AMOUNT) - 0.5
      subcamera.position.y = 0.5 - (y / AMOUNT)
      subcamera.position.z = 1.5
      subcamera.position.multiplyScalar(2)
      subcamera.lookAt(0, 0, 0)
      subcamera.updateMatrixWorld()
      cameras.push(subcamera)
    }
  }

  return (
    <arrayCamera cameras={cameras} position={[0, 0, 3]} />
  )
}

const Example = () => {
  return (
    <Canvas shadows>
      <Cameras />
      <ambientLight color={0x222244} />
      <directionalLight position={[0.5, 0.5, 1]} castShadow shadow-camera-zoom={4} />
      <Background />
      <Cylinder />
    </Canvas>
  )
}

export default Example