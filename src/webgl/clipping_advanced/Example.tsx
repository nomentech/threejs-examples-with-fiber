import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

import { aspect_ratio } from '../../contants'

let clipMaterial: THREE.MeshPhongMaterial
let globalClippingPlanes: any[]
let volumeVisualization: THREE.Group

const planesFromMesh = (vertices: THREE.Vector3[], indices: number[]) => {
  // creates a clipping volume from a convex triangular mesh
  // specified by the arrays 'vertices' and 'indices'

  const n = indices.length / 3
  const result = new Array(n)

  for (let i = 0, j = 0; i < n; ++i, j+= 3) {
    const a = vertices[indices[j]]
    const b = vertices[indices[j+1]]
    const c = vertices[indices[j+2]]

    result[i] = new THREE.Plane().setFromCoplanarPoints(a, b, c)
  }

  return result
}

const planeToMatrix = (function () {
  // creates a matrix that aligns X/Y to a given plane

  // temporaries:
  const xAxis = new THREE.Vector3()
  const yAxis = new THREE.Vector3()
  const trans = new THREE.Vector3()

  return function planeToMatrix(plane: any) {

    const zAxis = plane.normal
    const matrix = new THREE.Matrix4()

    // Hughes & Moeller '99
    // "Building an Orthonormal Basis from a Unit Vector."
    if (Math.abs(zAxis.x) > Math.abs(zAxis.z)) {
      yAxis.set(-zAxis.y, zAxis.x, 0)
    } else {
      yAxis.set(0, -zAxis.z, zAxis.y)
    }

    xAxis.crossVectors(yAxis.normalize(), zAxis)

    plane.coplanarPoint(trans)

    return matrix.set(
      xAxis.x, yAxis.x, zAxis.x, trans.x,
      xAxis.y, yAxis.y, zAxis.y, trans.y,
      xAxis.z, yAxis.z, zAxis.z, trans.z,
      0,	 0, 0, 1)
  }
})()

const createPlanes = (n: number) => {
  // creates an array of n uninitialized plane objects
  const result = new Array(n)

  for (let i = 0; i !== n; ++i)
    result[i] = new THREE.Plane()

  return result
}

const assignTransformedPlanes = (planesOut: any[], planesIn: any[], matrix: THREE.Matrix4) => {
  // sets an array of existing planes to transformed 'planesIn'
  for (let i = 0, n = planesIn.length; i !== n; ++ i)
    planesOut[i].copy(planesIn[i]).applyMatrix4(matrix)
}

const cylindricalPlanes = (n: number, innerRadius: number) => {
  const result = createPlanes(n)

  for (let i = 0; i !== n; ++ i) {
    const plane = result[i]
    const angle = i * Math.PI * 2 / n

    plane.normal.set(
      Math.cos(angle), 0, Math.sin(angle))

    plane.constant = innerRadius
  }

  return result
}

const setObjectWorldMatrix = (object: any, matrix: THREE.Matrix4) => {  
  // set the orientation of an object based on a world matrix
  const parent = object.parent
  // scene.updateMatrixWorld()
  object.matrix.copy( parent.matrixWorld ).invert()
  object.applyMatrix4(matrix)
}

const Vertices = [
  new THREE.Vector3(1, 0, Math.SQRT1_2),
  new THREE.Vector3(-1, 0, Math.SQRT1_2),
  new THREE.Vector3(0, 1, -Math.SQRT1_2),
  new THREE.Vector3(0, -1, -Math.SQRT1_2)
]
const Indices = [0, 1, 2,   0, 2, 3,  0, 3, 1,   1, 3, 2]
const Planes = planesFromMesh(Vertices, Indices)
const PlaneMatrices = Planes.map(planeToMatrix)
const GlobalClippingPlanes = cylindricalPlanes(5, 2.5)
const Empty = Object.freeze([])

const transform = new THREE.Matrix4()
const tmpMatrix = new THREE.Matrix4()

const Controls = () => {
  const { gl } = useThree()

  // Clipping setup
  globalClippingPlanes = createPlanes(GlobalClippingPlanes.length)
  gl.clippingPlanes = Empty as any
  gl.localClippingEnabled = true

  useControls('Local Clipping', {
    'Enabled': {
      value: gl.localClippingEnabled,
      onChange: (v: boolean) => {
        gl.localClippingEnabled = v
        if (!v) volumeVisualization.visible = false
      }
    },
    'Shadow': {
      value: clipMaterial.clipShadows,
      onChange: (v: boolean) => clipMaterial.clipShadows = v
    },
    'Visualize': {
      value: volumeVisualization.visible,
      onChange: (v: boolean) => {
        if (gl.localClippingEnabled) volumeVisualization.visible = v
      }
    }
  })

  useControls('Global Clipping', {
    'Enabled': {
      value: gl.clippingPlanes !== Empty as any,
      onChange: (v: boolean) => {
        gl.clippingPlanes = v ?
          globalClippingPlanes : Empty as any
      }
    }
  })

  return null
}

const Light = () => {
  return (
    <>
      <ambientLight args={[0xffffff, 0.3]} />
      <spotLight color={0xffffff} intensity={0.5} angle={Math.PI / 5} 
        penumbra={0.2} position={[2, 3, 3]} castShadow 
        shadow-camera-near={3} shadow-camera-far={10}
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight color={0xffffff} intensity={0.5} position={[0, 2, 0]} castShadow 
        shadow-mapSize={[1024, 1024]}
        // shadow-camera-near={1} shadow-camera-far={10} 
        // shadow-camera-right={1} shadow-camera-left={-1}
        // shadow-camera-top={1} shadow-camera-bottom={-1}
        // shadow-mapSize-width={1024} shadow-mapSize-height={1024} 
      >
        <orthographicCamera attach='shadow-camera' args={[-1, 1, 1, -1, 1, 10]} />
      </directionalLight>
    </>
  )
}

const Meshes = () => {
  clipMaterial = new THREE.MeshPhongMaterial({
    color: 0xee0a10,
    shininess: 100,
    side: THREE.DoubleSide,
    // Clipping setup
    clippingPlanes: createPlanes(Planes.length),
    clipShadows: true
  })

  const meshRef: any = useRef()
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    meshRef.current.position.y = 1
    meshRef.current.rotation.x = time * 0.5
    meshRef.current.rotation.y = time * 0.2

    meshRef.current.updateMatrix()
    transform.copy(meshRef.current.matrix)
    const bouncy = Math.cos(time*0.5)*0.5 + 0.7
    transform.multiply(tmpMatrix.makeScale(bouncy, bouncy, bouncy))

    assignTransformedPlanes(clipMaterial.clippingPlanes, Planes, transform)
    const planeMeshes = volumeVisualization.children

    for (let i = 0, n = planeMeshes.length; i !== n; ++ i) {
      tmpMatrix.multiplyMatrices(transform, PlaneMatrices[i])
      setObjectWorldMatrix(planeMeshes[i], tmpMatrix)
    }
    transform.makeRotationY(time * 0.1)
    assignTransformedPlanes(globalClippingPlanes, GlobalClippingPlanes, transform)
  })

  const meshes = []
  for (let z = - 2; z <= 2; ++ z)
    for (let y = - 2; y <= 2; ++ y)
      for (let x = - 2; x <= 2; ++ x) {
        meshes.push(
          <mesh key={Math.random()} material={clipMaterial} position={[x/5, y/5, z/5]} castShadow>
            <boxGeometry args={[0.18, 0.18, 0.18]} />
          </mesh>
        )
      }

  return (
    <>
      <group ref={meshRef}>
        {meshes}
      </group>
    </>
  )
}

const VolumeVisualization = () => {
  volumeVisualization = new THREE.Group()
  volumeVisualization.visible = false
  const planeGeometry = new THREE.PlaneGeometry( 3, 3, 1, 1 )

  const color = new THREE.Color()
  for (let i = 0, n = Planes.length; i !== n; ++ i) {
    const material = new THREE.MeshBasicMaterial( {
      color: color.setHSL(i / n, 0.5, 0.5).getHex(),
      side: THREE.DoubleSide,

      opacity: 0.2,
      transparent: true,

      // clip to the others to show the volume (wildly
      // intersecting transparent planes look bad)
      clippingPlanes: clipMaterial.clippingPlanes.
        filter((_: any, j: number) => {
          return j !== i
        })

      // no need to enable shadow clipping - the plane
      // visualization does not cast shadows
    })

    const mesh = new THREE.Mesh(planeGeometry, material)
    mesh.matrixAutoUpdate = false

    volumeVisualization.add(mesh)
  }

  return (
    <primitive object={volumeVisualization} />    
  )
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={3} receiveShadow>
      <planeGeometry args={[3, 3, 1, 1]} />
      <meshPhongMaterial color={0xa0adaf} shininess={10} />
    </mesh>
  )
}

const Example = () => {
  return (
    <Canvas camera={{position: [0, 1.5, 3], fov: 36, aspect: aspect_ratio, near: 0.25, far: 16}} shadows>
      <color attach='background' args={['black']} />
      <Light />
      <Meshes />
      <Ground />
      <VolumeVisualization />
      <Controls />
      <OrbitControls target={[0, 1, 0]} minDistance={1} maxDistance={8} />
    </Canvas>
  )
}

export default Example