import { MathUtils } from 'three'
import { Canvas, extend, Object3DNode, useFrame } from '@react-three/fiber'
import { CinematicCamera } from 'three-stdlib'

import { aspect_ratio } from '../../contants'

extend({ CinematicCamera })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      cinematicCamera: Object3DNode<any, typeof CinematicCamera>
    }
  }
}

let theta = 0
const radius = 100

const Camera = (props: any) => {
  useFrame(({ scene, camera }) => {
    theta += 0.1

    camera.position.x = radius * Math.sin(MathUtils.degToRad(theta))
    camera.position.y = radius * Math.sin(MathUtils.degToRad(theta))
    camera.position.z = radius * Math.cos(MathUtils.degToRad(theta))
    camera.lookAt(scene.position)
    camera.updateMatrixWorld()
  })

  return (
    <cinematicCamera {...props} args={[60, aspect_ratio, 1, 1000]} position={[2, 1, 500]} lens={5} />
  )
}

const Mesh = () => {
  const count = 1500
  let currentHex: any

  const pointOverHandler = (event: any) => {
    currentHex = event.object.material.emissive.getHex()
    event.object.material.emissive.setHex(0xff0000)
  }

  const pointOutHandler = (event: any) => {
    event.object.material.emissive.setHex(currentHex)
  }

  return (
    <>    
      {[...Array(count)].map((_, i) => (
        <mesh key={i}
          position={[Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400]}
          onPointerOver={pointOverHandler} onPointerOut={pointOutHandler} >
          <boxGeometry args={[20, 20, 20]} />
          <meshLambertMaterial color={Math.random() * 0xffffff} />
        </mesh>
      ))}
    </>
  )
}

const Example = () => {
  return (
    <Canvas>
      <Camera attach='camera' />
      <color attach='background' args={[0xf0f0f0]}/>
      <ambientLight args={[0xffffff, 0.3]} />
      <directionalLight position={[1, 1, 1]} args={[0xffffff, 0.35]} />
      <Mesh />
    </Canvas>
  )
}

export default Example