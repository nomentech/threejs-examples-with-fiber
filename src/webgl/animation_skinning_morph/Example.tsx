import { AnimationClip, AnimationMixer, Group, LoopOnce } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { button, useControls } from 'leva'

import robot from '../../models/RobotExpressive.glb'
useGLTF.preload(robot)

let mixer: AnimationMixer, actions: any, activeAction: any, previousAction: any
let model: Group, animations: AnimationClip[], face: any

const fadeToAction = (name: string, duration: number) => {
  previousAction = activeAction
  activeAction = actions[name]

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration)
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play()
}

const Controls = () => {
  const states = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"]
  const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"]

  actions = {}

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i]
    const action = mixer.clipAction(clip)
    actions[clip.name] = action

    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true
      action.loop = LoopOnce
    }
  }

  // states
  useControls('States', {
    'state': {
      value: 'Walking',
      options: states,
      onChange: (value) => fadeToAction(value, 0.5)
    }
  })


  // emotes
  const emotesObj: any = {}
  const createEmoteCallback = (name: string) => {
    emotesObj[name] = button((get) => {
      fadeToAction(name, 0.2)
      mixer.addEventListener("finished", () => restoreState(get('States.state')))
    })
  }

  const restoreState = (state: string) => {
    mixer.removeEventListener("finished", () => restoreState(state))
    fadeToAction(state, 0.2)
  }

  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i])
  }

  useControls('Emotes', emotesObj)

  // expressions
  face = model.getObjectByName("Head_4")

  const expressions = Object.keys(face.morphTargetDictionary)
  const expressionsObj: any = {}
  for (let i = 0; i < expressions.length; i++) {
    expressionsObj[expressions[i]] = {
      value: face.morphTargetInfluences[i],
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (value: number) => face.morphTargetInfluences[i] = value
    }
  }

  useControls('Expressions', expressionsObj)

  activeAction = actions["Walking"]
  activeAction.play()

  return null
}

const Model = () => {
  const gltf: any = useGLTF(robot)
  model = gltf.scene
  mixer = new AnimationMixer(model)
  animations = gltf.animations

  useFrame((_, delta) => {
    if (mixer) mixer.update(delta)
  })

  return (
    <primitive object={model} />
 )
}

const Ground = () => {
  return (
    <>
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[2000, 2000]} />
        <meshPhongMaterial color={0x999999} depthWrite={false} />
      </mesh>
      <mesh>
        <gridHelper args={[200, 40, 0x000000, 0x000000]} 
          material-opacity={0.2} material-transparent={true} />
      </mesh>
    </>
 )
}

const Example = () => {
  return (
    <Canvas 
      camera={{position: [-5, 3, 10], fov: 45, near: 0.25, far: 100}} 
      dpr={[1, 2]} 
      onCreated={({ camera }) => camera.lookAt(0, 2, 0)}
    >
      <color attach="background" args={[0xe0e0e0]} />
      <fog attach="fog" color={0xe0e0e0} near={20} far={100} />
      <hemisphereLight color={0xffffff} groundColor={0x444444} position={[0, 20, 0]} />
      <directionalLight color={0xffffff} position={[0, 20, 10]} />
      <Ground />
      <Model />
      <Controls />
    </Canvas>
 )
}

export default Example