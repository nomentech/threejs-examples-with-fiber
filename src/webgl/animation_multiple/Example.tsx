import { useEffect } from "react"
import { AnimationMixer } from "three"
import { SkeletonUtils } from 'three-stdlib'
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

import soldier from '../../models/Soldier.glb'
useGLTF.preload(soldier)

const mixers: AnimationMixer[] = []

const Model = () => {
  const { scene, animations }: any = useGLTF(soldier)

  const model1 = SkeletonUtils.clone(scene)
  const model2 = SkeletonUtils.clone(scene)
  const model3 = SkeletonUtils.clone(scene)

  const mixer1 = new AnimationMixer(model1)
  const mixer2 = new AnimationMixer(model2)
  const mixer3 = new AnimationMixer(model3)

  mixer1.clipAction(animations[0]).play()
  mixer2.clipAction(animations[1]).play()
  mixer3.clipAction(animations[3]).play()

  model1.position.x = -2
  model3.position.x = 2

  mixers.push(mixer1, mixer2, mixer3)

  useEffect(() => {
    scene.traverse((object: any) => object.isMesh && (object.castShadow = true))
  }, [scene])

  useFrame((_ ,delta) => {
    mixers.forEach(mixer => mixer.update(delta))
  })

  return (
    <>
      <primitive object={model1} />
      <primitive object={model2} />
      <primitive object={model3} />
    </>
  )
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshPhongMaterial color={0x999999} depthWrite={false} />
    </mesh>
  )
}

const Example = () => {
  return (
    <Canvas
      camera={{ position: [2, 3, -6], fov: 45, near: 1, far: 1000}}
      dpr={[1, 2]} shadows
      onCreated={({ camera }) => camera.lookAt(0, 1, 0)}
    >
      <color attach="background" args={[0xa0a0a0]} />
      <fog attach="fog" args={[0xa0a0a0, 10, 50]} />
      <hemisphereLight position={[0, 20, 0]} args={[0xffffff, 0x444444]} />
      <directionalLight position={[-3, 10, -10]} args={[0xffffff]} castShadow
        // shadow-camera-top={4} shadow-camera-bottom={-4} shadow-camera-left={-4} shadow-camera-right={4}
        // shadow-camera-near={0.1} shadow-camera-far={40} 
      >
        <orthographicCamera attach='shadow-camera' args={[-4, 4, 4, -4, 0.1, 40]} />
      </directionalLight>
      <Ground />
      <Model />
    </Canvas>
  )
}

export default Example