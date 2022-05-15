import { useEffect } from "react"
import { AnimationAction, AnimationMixer, AnimationUtils, Group, SkeletonHelper } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { button, useControls } from 'leva'

import xbot from '../../models/Xbot.glb'
useGLTF.preload(xbot)

let model: Group, skeleton: SkeletonHelper, mixer: AnimationMixer
const crossFadeControls: any[] = []
let currentBaseAction = "idle"
const allActions: any = []
const baseActions: any = {
  idle: { weight: 1 },
  walk: { weight: 0 },
  run: { weight: 0 }
}
const additiveActions: any = {
  sneak_pose: { weight: 0 },
  sad_pose: { weight: 0 },
  agree: { weight: 0 },
  headShake: { weight: 0 }
}
let numAnimations: number

// This function is needed, since animationAction.crossFadeTo() disables its start action and sets
// the start action's timeScale to ((start animation's duration) / (end animation's duration))
const setWeight = (action: AnimationAction, weight: number) => {
  action.enabled = true
  action.setEffectiveTimeScale(1)
  action.setEffectiveWeight(weight)
}

const activateAction = (action: AnimationAction) => {
  const clip = action.getClip()
  const settings = baseActions[clip.name] || additiveActions[clip.name]
  setWeight(action, settings.weight)
  action.play()
}

const modifyTimeScale = (speed: number) => {
  mixer.timeScale = speed
}

const prepareCrossFade = (startAction: AnimationAction, endAction: AnimationAction, duration: number) => {
  // If the current action is 'idle', execute the crossfade immediately;
  // else wait until the current action has finished its current loop

  if (currentBaseAction === "idle" || !startAction || !endAction) {
    executeCrossFade( startAction, endAction, duration )
  } else {
    synchronizeCrossFade(startAction, endAction, duration)
  }

  // Update control colors
  if (endAction) {
    const clip = endAction.getClip()
    currentBaseAction = clip.name
  } else {
    currentBaseAction = "None"
  }

  crossFadeControls.forEach((control) => {
    const name = control.property
    if (name === currentBaseAction) {
      control.setActive()
    } else {
      control.setInactive()
    }
  })
}

const synchronizeCrossFade = (startAction: AnimationAction, endAction: AnimationAction, duration: number) => {
  const onLoopFinished = (event: any) => {
    if (event.action === startAction) {
      mixer.removeEventListener("loop", onLoopFinished)
      executeCrossFade(startAction, endAction, duration)
    }
  }

  mixer.addEventListener("loop", onLoopFinished)
}

const executeCrossFade = (startAction: AnimationAction, endAction: AnimationAction, duration: number) => {
  // Not only the start action, but also the end action must get a weight of 1 before fading
  // (concerning the start action this is already guaranteed in this place)
  if ( endAction ) {
    setWeight(endAction, 1)
    endAction.time = 0

    if (startAction) {
      // Crossfade with warping
      startAction.crossFadeTo(endAction, duration, true)
    } else {
      // Fade in
      endAction.fadeIn(duration)
    }
  } else {
    // Fade out
    startAction.fadeOut(duration)
  }
}

const Model = () => {
  const { scene, animations }: any = useGLTF(xbot)

  model = scene
  mixer = new AnimationMixer(model)

  numAnimations = animations.length
  for (let i = 0; i !== numAnimations; ++i) {
    let clip = animations[i]
    const name = clip.name

    if (baseActions[name]) {
      const action = mixer.clipAction(clip)
      activateAction(action)
      baseActions[name].action = action
      allActions.push(action)
    } else if (additiveActions[name]) {
      // Make the clip additive and remove the reference frame
      AnimationUtils.makeClipAdditive(clip)
      if (clip.name.endsWith("_pose")) {
        clip = AnimationUtils.subclip(clip, clip.name, 2, 3, 30)
      }

      const action = mixer.clipAction(clip)
      activateAction(action)
      additiveActions[name].action = action
      allActions.push(action)
    }
  }

  skeleton = new SkeletonHelper(scene)
  skeleton.visible = false

  useFrame((_, delta) => {
    for (let i = 0; i !== numAnimations; ++i) {
      const action = allActions[i]
      const clip = action.getClip()
      const settings = baseActions[clip.name] || additiveActions[clip.name]
      settings.weight = action.getEffectiveWeight()
    }

    // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)
    let mixerUpdateDelta = delta
    mixer.update(mixerUpdateDelta)
  })

  useEffect(() => {
    scene.traverse((obj: any) => obj.isMesh && (obj.castShadow = true))
  }, [scene])

  return (
    <>
      <primitive object={scene} />
      <primitive object={skeleton} />
    </>
  )
}

const Controls = () => {
  const baseNames = ["None", ...Object.keys(baseActions)]

  const baseActionsSettings: any = {}
  for (let i = 0, l = baseNames.length; i !== l; ++i) {
    const name = baseNames[i]
    const settings = baseActions[name]
    baseActionsSettings[name] = button(() => {
      const currentSettings = baseActions[currentBaseAction]
      const currentAction = currentSettings ? currentSettings.action : null
      const action = settings ? settings.action : null

      prepareCrossFade( currentAction, action, 0.35 )
    })
  }

  useControls('Base Actions', baseActionsSettings)

  const additiveActionWeights: any = {}
  for (const name of Object.keys(additiveActions)) {
    const settings = additiveActions[name]

    additiveActionWeights[name] = {
      value: settings.weight,
      min: 0.0,
      max: 1.0,
      step: 0.01,
      onChange: (weight: number) => {
        setWeight(settings.action, weight)
        settings.weight = weight
      }
    }
  }
  useControls('Additive Action Weights', additiveActionWeights)

  useControls('General Speed', {
    'modify time scale': {
      value: 1.0,
      min: 0.0,
      max: 1.5,
      step: 0.01,
      onChange: modifyTimeScale
    }
  })

  return null
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial color={0x999999} depthWrite={false} />
    </mesh>
  )
}

const Example = () => {
  return (
    <Canvas 
      camera={{position: [-1, 2, 3], fov: 45, near: 1, far: 100}} 
      dpr={[1, 2]} 
      shadows
    >
      <color attach="background" args={[0xa0a0a0]} />
      <fog attach="fog" color={0xa0a0a0} near={10} far={50} />
      <hemisphereLight color={0xffffff} groundColor={0x444444} position={[0, 20, 0]} />
      <directionalLight color={0xffffff} position={[3, 10, 10]} castShadow
        // shadow-camera-left={-2} shadow-camera-right={2} shadow-camera-top={2} shadow-camera-bottom={-2}
        // shadow-camera-near={0.1} shadow-camera-far={40}
      >
        <orthographicCamera attach='shadow-camera' args={[-2, 2, 2, -2, 0.1, 40]} />
      </directionalLight>
      <Ground />
      <Model />
      <Controls />
      <OrbitControls enablePan={false} enableZoom={false} target={[0, 1, 0]} />
    </Canvas>
  )
}

export default Example