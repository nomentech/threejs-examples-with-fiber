import { Suspense, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Stats, useAnimations, useGLTF } from "@react-three/drei"
import { Color, PMREMGenerator } from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment"

useGLTF.preload("/models/LittlestTokyo.glb")

const Env = () => {
  const {gl, scene } = useThree()
  const pmremGenerator = new PMREMGenerator(gl)
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
  scene.background = new Color(0xbfe3dd) 
  return null
}

const Model = () => {
  const { scene, animations } = useGLTF("/models/LittlestTokyo.glb") as any
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    actions["Take 001"]?.play()
  }, [actions, scene])

  return (
    <primitive object={scene} scale={[0.01, 0.01, 0.01]} position={[1, 1, 0]} />
  )
}

const Example = () => {
  return (
    <Canvas 
      camera={{ position: [5, 2, 8], fov: 40, near:1, far: 100 }}
      dpr={[1, 2]}>
      {/* <color attach="background" args={[0xbfe3dd]} /> */}
      <Env />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls target={[0, 0.5, 0]}/>
      <Stats className="stats" />
    </Canvas>
  )
}

export default Example