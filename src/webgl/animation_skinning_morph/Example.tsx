import { AnimationClip, AnimationMixer, Group, LoopOnce } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stats, useGLTF } from "@react-three/drei"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"
import { useEffect } from "react"

useGLTF.preload("/model/RobotExpressive.glb")

let gui, mixer: AnimationMixer, actions: any, activeAction: any, previousAction: any
let model: Group, face: any

const api = { state: "Walking" } as any

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

const createControl = (model: Group, animations: AnimationClip[]) => {
  const states = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"]
  const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"]

  gui = new GUI()

  mixer = new AnimationMixer(model)

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
  const statesFolder = gui.addFolder("States")
  const clipCtrl = statesFolder.add(api, "state").options(states)

  clipCtrl.onChange(() => {
    fadeToAction(api.state, 0.5)
  })

  statesFolder.open()

  // emotes
  const emoteFolder = gui.addFolder("Emotes")

  const createEmoteCallback = (name: string) => {
    api[name] = () => {
      fadeToAction(name, 0.2)
      mixer.addEventListener("finished", restoreState)
    }

    emoteFolder.add(api, name)
  }

  const restoreState = () => {
    mixer.removeEventListener("finished", restoreState)
    fadeToAction(api.state, 0.2)
  }

  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i])
  }

  emoteFolder.open()

  // expressions
  face = model.getObjectByName("Head_4")

  const expressions = Object.keys(face.morphTargetDictionary)
  const expressionFolder = gui.addFolder("Expressions")

  for (let i = 0; i < expressions.length; i++) {
    expressionFolder.add(face.morphTargetInfluences, i, 0, 1, 0.01).name(expressions[i])
  }

  activeAction = actions["Walking"]
  activeAction.play()

  expressionFolder.open()
}

const Model = () => {
  const { scene, animations } = useGLTF("/models/RobotExpressive.glb")
  model = scene

  useEffect(() => {
    createControl(model, animations)
  }, [])

  useFrame((_, delta) => {
      mixer.update(delta)
  })

  return (
    <primitive object={scene} />
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
      <Stats className="stats" />
    </Canvas>
 )
}

export default Example