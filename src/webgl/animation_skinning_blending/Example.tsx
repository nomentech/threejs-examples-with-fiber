import { useEffect } from "react"
import { AnimationAction, AnimationMixer, Group, SkeletonHelper } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stats, useGLTF } from "@react-three/drei"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"

let model: Group, skeleton: SkeletonHelper, mixer: AnimationMixer
const crossFadeControls: any[] = []

let idleWeight: number, walkWeight: number, runWeight: number
let idleAction: AnimationAction , walkAction: AnimationAction, runAction: AnimationAction
let actions: Array<AnimationAction>

let singleStepMode = false;
let sizeOfNextStep = 0;

useGLTF.preload("/models/Soldier.glb")

// This function is needed, since animationAction.crossFadeTo() disables its start action and sets
// the start action's timeScale to ((start animation's duration) / (end animation's duration))
const setWeight = (action: AnimationAction, weight: number) => {
  action.enabled = true
  action.setEffectiveTimeScale(1)
  action.setEffectiveWeight(weight)
}

const deactivateAllActions = () => {
  actions.forEach(action => {
    action.stop()
  });
}

const activateAllActions = () => {
  setWeight(idleAction, settings["modify idle weight"])
  setWeight(walkAction, settings["modify walk weight"])
  setWeight(runAction, settings["modify run weight"])

  actions.forEach(action => {
    action.play()
  })
}

const pauseContinue = () => {
  if (singleStepMode) {
    singleStepMode = false
    unPauseAllActions()
  } else {
    if (idleAction.paused) {
      unPauseAllActions()
    } else {
      pauseAllActions()
    }
  }
}

const pauseAllActions = () => {
  actions.forEach(action => {
    action.paused = true
  })
}

const unPauseAllActions = () => {
  actions.forEach(action => {
    action.paused = false
  })
}

const showModel = (visibility: boolean) => {
  model.visible = visibility
}


const showSkeleton = (visibility: boolean) => {
  skeleton.visible = visibility
}

const modifyTimeScale = (speed: number) => {
  mixer.timeScale = speed
}

const toSingleStepMode = () => {
  unPauseAllActions()

  singleStepMode = true
  sizeOfNextStep = settings["modify step size"]
}

const prepareCrossFade = (startAction: AnimationAction, endAction: AnimationAction, defaultDuration: number) => {
  // Switch default / custom crossfade duration (according to the user's choice)
  const duration = setCrossFadeDuration(defaultDuration)

  // Make sure that we don't go on in singleStepMode, and that all actions are unpaused
  singleStepMode = false
  unPauseAllActions()

  // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
  // else wait until the current action has finished its current loop
  if ( startAction === idleAction ) {
    executeCrossFade(startAction, endAction, duration)
  } else {
    synchronizeCrossFade(startAction, endAction, duration)
  }
}

const setCrossFadeDuration = (defaultDuration: number) => {
  // Switch default crossfade duration <-> custom crossfade duration
  if (settings["use default duration"]) {
    return defaultDuration
  } else {
    return settings["set custom duration"]
  }
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
  setWeight(endAction, 1)
  endAction.time = 0

  // Crossfade with warping - you can also try without warping by setting the third parameter to false
  startAction.crossFadeTo( endAction, duration, true )
}

// Called by the render loop
const updateWeightSliders = () => {
  settings["modify idle weight"] = idleWeight
  settings["modify walk weight"] = walkWeight
  settings["modify run weight"] = runWeight
}

// Called by the render loop
const updateCrossFadeControls = () => {
  if (idleWeight === 1 && walkWeight === 0 && runWeight === 0) {
    crossFadeControls[0].disable()
    crossFadeControls[1].enable()
    crossFadeControls[2].disable()
    crossFadeControls[3].disable()
  }

  if (idleWeight === 0 && walkWeight === 1 && runWeight === 0) {
    crossFadeControls[0].enable()
    crossFadeControls[1].disable()
    crossFadeControls[2].enable()
    crossFadeControls[3].disable()
  }

  if (idleWeight === 0 && walkWeight === 0 && runWeight === 1) {
    crossFadeControls[0].disable()
    crossFadeControls[1].disable()
    crossFadeControls[2].disable()
    crossFadeControls[3].enable()
  }
}

const settings = {
  "show model": true,
  "show skeleton": true,
  "deactivate all": deactivateAllActions,
  "activate all": activateAllActions,
  "pause/continue": pauseContinue,
  "make single step": toSingleStepMode,
  "modify step size": 0.05,
  "from walk to idle": () => {
    prepareCrossFade(walkAction, idleAction, 1.0)
  },
  "from idle to walk": () => {
    prepareCrossFade(idleAction, walkAction, 0.5)
  },
  "from walk to run": () => {
    prepareCrossFade(walkAction, runAction, 2.5)
  },
  "from run to walk": () => {
    prepareCrossFade(runAction, walkAction, 5.0)
  },
  "use default duration": true,
  "set custom duration": 3.5,
  "modify idle weight": 0.0,
  "modify walk weight": 1.0,
  "modify run weight": 0.0,
  "modify time scale": 1.0
}

const Model = () => {
  const { scene, animations } = useGLTF("/models/Soldier.glb")
  // const clips = useAnimations(animations, scene)

  model = scene
  mixer = new AnimationMixer(model)

  idleAction = mixer.clipAction(animations[0])
  walkAction = mixer.clipAction(animations[3])
  runAction = mixer.clipAction(animations[1])
  actions = [ idleAction, walkAction, runAction ]

  skeleton = new SkeletonHelper(scene)
  skeleton.visible = true

  useFrame((_, delta) => {
    idleWeight = idleAction.getEffectiveWeight();
    walkWeight = walkAction.getEffectiveWeight();
    runWeight = runAction.getEffectiveWeight();

    // Update the panel values if weights are modified from "outside" (by crossfadings)
    updateWeightSliders()

    // Enable/disable crossfade controls according to current weight values
    updateCrossFadeControls()

    // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)
    let mixerUpdateDelta = delta

    // If in single step mode, make one step and then do nothing (until the user clicks again)
    if (singleStepMode) {
      mixerUpdateDelta = sizeOfNextStep
      sizeOfNextStep = 0
    }
    mixer.update(mixerUpdateDelta)
  })

  useEffect(() => {
    scene.traverse((obj: any) => obj.isMesh && (obj.castShadow = true))
    activateAllActions()
  }, [scene])

  return (
    <>
      <primitive object={scene} />
      <primitive object={skeleton} />
      <Controls />
    </>
  )
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial color={0x999999} depthWrite={false} />
    </mesh>
  )
}

const Controls = () => {
  const panel = new GUI({ width: 310 })

  useEffect(() => {
    const folder1 = panel.addFolder("Visibility")
    const folder2 = panel.addFolder("Activation/Deactivation")
    const folder3 = panel.addFolder("Pausing/Stepping")
    const folder4 = panel.addFolder("Crossfading")
    const folder5 = panel.addFolder("Blend Weights")
    const folder6 = panel.addFolder("General Speed")

    folder1.add(settings, "show model" ).onChange(showModel)
    folder1.add(settings, "show skeleton" ).onChange(showSkeleton)
    folder2.add(settings, "deactivate all")
    folder2.add(settings, "activate all")
    folder3.add(settings, "pause/continue")
    folder3.add(settings, "make single step")
    folder3.add(settings, "modify step size", 0.01, 0.1, 0.001)
    crossFadeControls.push(folder4.add(settings, "from walk to idle"))
    crossFadeControls.push(folder4.add(settings, "from idle to walk"))
    crossFadeControls.push(folder4.add(settings, "from walk to run"))
    crossFadeControls.push(folder4.add(settings, "from run to walk"))
    folder4.add(settings, "use default duration")
    folder4.add(settings, "set custom duration", 0, 10, 0.01)
    folder5.add(settings, "modify idle weight", 0.0, 1.0, 0.01).listen().onChange((weight: number) => {
      setWeight(idleAction, weight)
    })
    folder5.add(settings, "modify walk weight", 0.0, 1.0, 0.01).listen().onChange((weight: number) => {
      setWeight(walkAction, weight)
    })
    folder5.add(settings, "modify run weight", 0.0, 1.0, 0.01).listen().onChange((weight: number) => {
      setWeight(runAction, weight)
    })
    folder6.add(settings, "modify time scale", 0.0, 1.5, 0.01).onChange( modifyTimeScale )

    folder1.open()
    folder2.open()
    folder3.open()
    folder4.open()
    folder5.open()
    folder6.open()
  }, [])

  return null
}

const Example = () => {
  return (
    <Canvas 
      camera={{position: [1, 2, -3], fov: 45, near: 1, far: 1000}} 
      dpr={[1, 2]} 
      shadows
      onCreated={ ({ camera }) => { camera.lookAt(0, 1, 0) } }
    >
      <color attach="background" args={[0xa0a0a0]} />
      <fog attach="fog" color={0xa0a0a0} near={10} far={50} />
      <hemisphereLight color={0xffffff} groundColor={0x444444} position={[0, 20, 0]} />
      <directionalLight color={0xffffff} position={[-3, 10, -10]} castShadow
        shadow-camera-left={-2} shadow-camera-right={2} shadow-camera-top={2} shadow-camera-bottom={-2}
        shadow-camera-near={0.1} shadow-camera-far={40}
      />
      <Ground />
      <Model />
      <Stats className="stats" />
    </Canvas>
  )
}

export default Example