import { useRef } from 'react'
import { DoubleSide, MeshPhongMaterial, Plane, Vector3 } from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

import { aspect_ratio } from '../../contants'

let material: any
const Empty: any = Object.freeze([])
const localPlane = new Plane(new Vector3(0, - 1, 0 ), 0.8)
const globalPlane = new Plane(new Vector3(- 1, 0, 0 ), 0.1)
const globalPlanes = [globalPlane]

const Mesh = () => {
  const meshRef: any = useRef()
  material = new MeshPhongMaterial( {
    color: 0x80ee10,
    shininess: 100,
    side: DoubleSide,

    // ***** Clipping setup (material): *****
    clippingPlanes: [ localPlane ],
    clipShadows: true
  } )

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    meshRef.current.position.y = 0.8
    meshRef.current.rotation.x = time * 0.5
    meshRef.current.rotation.y = time * 0.2
    meshRef.current.scale.setScalar(Math.cos(time) * 0.125 + 0.875)
  })

  return (
    <>    
      <mesh castShadow ref={meshRef} material={material}>
        <torusKnotGeometry args={[0.4, 0.08, 95, 20]} />
        {/* <meshPhongMaterial ref={material} color='#80ee10' shininess={100} side={DoubleSide} 
          clippingPlanes={[localPlane]} clipShadows={true} /> */}
      </mesh>
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

const Controls = () => {
  const { gl } = useThree()
  gl.clippingPlanes = Empty // GUI sets it to globalPlanes
  gl.localClippingEnabled = true

  useControls('Local Clipping', {
    'Enabled': {
      value: gl.localClippingEnabled,
      onChange: (v) => gl.localClippingEnabled = v
    },
    'Shadows': {
      value: material.clipShadows,
      onChange: (v) => material.clipShadows = v
    },
    'Plane': {
      value: localPlane.constant,
      min: 0.3,
      max: 1.25,
      onChange: (v) => localPlane.constant = v
    }
  })

  useControls('Global Clipping', {
    'Enabled': {
      value: gl.clippingPlanes !== Empty,
      onChange: (v) => gl.clippingPlanes = v ? globalPlanes : Empty
    },
    'Plane': {
      value: globalPlane.constant,
      min: -0.4,
      max: 3,
      onChange: (v) => globalPlane.constant = v
    }
  })

  return null
}

const Example = () => {
  return (
    <Canvas camera={{position: [0, 1.3, 3], fov: 36, aspect: aspect_ratio, near: 0.26, far: 16}} shadows>
      <color attach='background' args={['black']} />
      <ambientLight args={[0x505050]} />
      <spotLight color={0xffffff} angle={Math.PI / 5} penumbra={0.2} position={[2, 3, 3]} 
        castShadow shadow-camera-near={3} shadow-camera-far={10} shadow-mapSize={[1024, 1024]} />
      <directionalLight args={[0x55505a, 1]} position={[0, 3, 0]} 
        castShadow shadow-mapSize={[1024, 1024]}
        // shadow-camera-near={1} shadow-camera-far={10}
        // shadow-camera-top={1} shadow-camera-bottom={-1}
        // shadow-camera-right={1} shadow-camera-left={-1} 
      >
        <orthographicCamera attach='shadow-camera' args={[-1, 1, 1, -1, 1, 10]} />
      </directionalLight>
      <Mesh />
      <Ground />
      <Controls />
      <OrbitControls target={[0, 1, 0]} />
    </Canvas>
  )
}

export default Example