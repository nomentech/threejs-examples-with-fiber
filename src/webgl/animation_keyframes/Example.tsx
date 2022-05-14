import { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei"

import model from '../../models/LittlestTokyo.glb'

useGLTF.preload(model)
const Model = () => {
  const { scene, animations }: any = useGLTF(model)
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
      <color attach="background" args={[0xbfe3dd]} />
      <Environment preset='warehouse' />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls target={[0, 0.5, 0]} enableDamping enablePan={false} />
    </Canvas>
  )
}

export default Example