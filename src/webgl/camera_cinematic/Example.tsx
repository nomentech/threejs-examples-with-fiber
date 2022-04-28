import { useEffect, useRef } from 'react'
import { CameraHelper, MathUtils } from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { aspect_ratio } from '../../contants'
import { useHelper } from '@react-three/drei'

let camera: any
let theta = 0
const radius = 100

const Camera = () => {
  const cameraObj = new CinematicCamera(60, aspect_ratio, 1, 1000)
  cameraObj.setLens(5)
  cameraObj.position.set(2, 1, 500)

  camera = useRef()
  const { set, scene, gl } = useThree()

  useHelper(camera, CameraHelper)

  useEffect(() => set({ camera: camera.current }), [])
  useEffect(() => createControls(), [])

  useFrame(() => {
    theta += 0.1

    camera.current.position.x = radius * Math.sin(MathUtils.degToRad(theta))
    camera.current.position.y = radius * Math.sin(MathUtils.degToRad(theta))
    camera.current.position.z = radius * Math.cos(MathUtils.degToRad(theta))
    camera.current.lookAt(scene.position)
    camera.current.updateMatrixWorld()

    if (camera.current.postprocessing.enabled) {
      camera.current.renderCinematic(scene, gl)
    } else {
      scene.overrideMaterial = null
      gl.clear()
      gl.render(scene, camera)
    }
  })

  return (
    <primitive object={cameraObj} ref={camera} />
    // <perspectiveCamera position={[2, 1, 500]} ref={camera} />
  )
}

const Mesh = () => {
  const count = 1500
  return (
    <>    
      {[...Array(count)].map((_, i) => (
        <mesh key={i} position={[Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400]}>
          <boxGeometry args={[20, 20, 20]} />
          <meshLambertMaterial color={Math.random() * 0xffffff} />
        </mesh>
      ))}
    </>
  )
}

const createControls = () => {
  const effectController: any = {
    focalLength: 15,
    // jsDepthCalculation: true,
    // shaderFocus: false,
    //
    fstop: 2.8,
    // maxblur: 1.0,
    //
    showFocus: false,
    focalDepth: 3,
    // manualdof: false,
    // vignetting: false,
    // depthblur: false,
    //
    // threshold: 0.5,
    // gain: 2.0,
    // bias: 0.5,
    // fringe: 0.7,
    //
    // focalLength: 35,
    // noise: true,
    // pentagon: false,
    //
    // dithering: 0.0001
  }

  const matChanger = function () {
    for (const e in effectController) {
      if (e in camera.current.postprocessing.bokeh_uniforms) {
        camera.current.postprocessing.bokeh_uniforms[e].value = effectController[e]
      }
    }

    camera.current.postprocessing.bokeh_uniforms['znear'].value = camera.current.near
    camera.current.postprocessing.bokeh_uniforms['zfar'].value = camera.current.far
    camera.current.setLens(effectController.focalLength, camera.current.frameHeight, effectController.fstop, camera.current.coc)
    effectController['focalDepth'] = camera.current.postprocessing.bokeh_uniforms['focalDepth'].value
  }

  const gui = new GUI()

  gui.add(effectController, 'focalLength', 1, 135, 0.01).onChange(matChanger)
  gui.add(effectController, 'fstop', 1.8, 22, 0.01).onChange(matChanger)
  gui.add(effectController, 'focalDepth', 0.1, 100, 0.001).onChange(matChanger)
  gui.add(effectController, 'showFocus', true).onChange(matChanger)

  matChanger()
}

const Example = () => {
  return (
    <Canvas camera={{manual: true}}>
      <Camera />
      <color attach='background' args={[0xf0f0f0]}/>
      <ambientLight args={[0xffffff, 0.3]} />
      <directionalLight position={[1, 1, 1]} args={[0xffffff, 0.35]} />
      <Mesh />
    </Canvas>
  )
}

export default Example