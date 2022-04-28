import { useEffect, useRef } from 'react'
import { DoubleSide, MeshPhongMaterial, Plane, Vector3 } from 'three'
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { aspect_ratio } from '../../contants'

let startTime: number
let renderer: any
let material: any
const Empty: any = Object.freeze([])
const localPlane = new Plane(new Vector3(0, - 1, 0 ), 0.8)
const globalPlane = new Plane(new Vector3(- 1, 0, 0 ), 0.1)
const globalPlanes = [globalPlane]

const Mesh = () => {
  const { gl } = useThree()
  renderer = gl

  const meshRef: any = useRef()
  material = new MeshPhongMaterial({
    color: 0x80ee10,
    shininess: 100,
    side: DoubleSide,

    // ***** Clipping setup (material): *****
    clippingPlanes: [localPlane],
    clipShadows: true
  })

	renderer.clippingPlanes = Empty // GUI sets it to globalPlanes
	renderer.localClippingEnabled = true

  useFrame(() => {
    const currentTime = Date.now()
    const time = (currentTime - startTime ) / 1000

    meshRef.current.position.y = 0.8
    meshRef.current.rotation.x = time * 0.5
    meshRef.current.rotation.y = time * 0.2
    meshRef.current.scale.setScalar(Math.cos(time) * 0.125 + 0.875)
  })

  return (
    <>    
      <mesh castShadow ref={meshRef} material={material}>
        <torusKnotGeometry args={[0.4, 0.08, 95, 20]} />
      </mesh>
      <GUIControls />
    </> 
  )
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
      <planeGeometry args={[9, 9, 1, 1]} />
      <meshPhongMaterial color={0xa0adaf} shininess={150} />
    </mesh>
  )
}

const GUIControls = () => {
  const gui = new GUI(),
  folderLocal = gui.addFolder('Local Clipping'),
  propsLocal = {
    get 'Enabled'() {
      return renderer.localClippingEnabled
    },
    set 'Enabled'(v) {
      renderer.localClippingEnabled = v
    },
    get 'Shadows'() {
      return material.clipShadows
    },
    set 'Shadows'(v) {
      material.clipShadows = v
    },
    get 'Plane'() {
      return localPlane.constant
    },
    set 'Plane'(v) {
      localPlane.constant = v
    }
  },

  folderGlobal = gui.addFolder('Global Clipping'),
  propsGlobal = {
    get 'Enabled'() {
      return renderer.clippingPlanes !== Empty
    },
    set 'Enabled'(v) {
      renderer.clippingPlanes = v ? globalPlanes : Empty
    },
    get 'Plane'() {
      return globalPlane.constant
    },
    set 'Plane'(v) {
      globalPlane.constant = v
    }
  }

  folderLocal.add(propsLocal, 'Enabled')
  folderLocal.add(propsLocal, 'Shadows')
  folderLocal.add(propsLocal, 'Plane', 0.3, 1.25)

  folderGlobal.add(propsGlobal, 'Enabled')
  folderGlobal.add(propsGlobal, 'Plane', -0.4, 3)

  return null
}

const Example = () => {
  useEffect(() => {
    startTime = Date.now()
  }, [])

  return (
    <Canvas camera={{position: [0, 1.3, 3], fov: 36, aspect: aspect_ratio, near: 0.26, far: 16}} shadows>
      <color attach='background' args={['black']} />
      <ambientLight args={[0x505050]} />
      <spotLight color={0xffffff} angle={Math.PI / 5} penumbra={0.2} 
        position={[2, 3, 3]} castShadow 
        shadow-camera-near={3} shadow-camera-far={10}
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight args={[0x55505a, 1]} position={[0, 3, 0]} castShadow 
        shadow-camera-near={1} shadow-camera-far={10}
        shadow-camera-top={1} shadow-camera-bottom={-1}
        shadow-camera-right={1} shadow-camera-left={-1} 
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Mesh />
      <Ground />
      <OrbitControls target={[0, 1, 0]} />
    </Canvas>
  )
}

export default Example