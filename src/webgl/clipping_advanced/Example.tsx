import { useEffect, useRef } from 'react'
import { Color, DoubleSide, Matrix4, MeshPhongMaterial, Plane, Vector3, WebGLRenderer } from 'three'
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { aspect_ratio } from '../../contants'

let renderer: WebGLRenderer
let clipMaterial: MeshPhongMaterial
let globalClippingPlanes: any[]
let startTime: number
let volumeVisualization: any

const planesFromMesh = (vertices: Vector3[], indices: number[]) => {
  // creates a clipping volume from a convex triangular mesh
  // specified by the arrays 'vertices' and 'indices'

  const n = indices.length / 3
  const result = new Array(n)

  for (let i = 0, j = 0; i < n; ++i, j+= 3) {
    const a = vertices[indices[j]]
    const b = vertices[indices[j+1]]
    const c = vertices[indices[j+2]]

    result[i] = new Plane().setFromCoplanarPoints(a, b, c)
  }

  return result
}

const planeToMatrix = (function () {
  // creates a matrix that aligns X/Y to a given plane

  // temporaries:
  const xAxis = new Vector3()
  const yAxis = new Vector3()
  const trans = new Vector3()

  return function planeToMatrix(plane: any) {

    const zAxis = plane.normal
    const matrix = new Matrix4()

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
    result[i] = new Plane()

  return result
}

const assignTransformedPlanes = (planesOut: any[], planesIn: any[], matrix: Matrix4) => {
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

const setObjectWorldMatrix = (object: any, matrix: Matrix4) => {  
  // set the orientation of an object based on a world matrix
  const parent = object.parent
  // scene.updateMatrixWorld()
  object.matrix.copy( parent.matrixWorld ).invert()
  object.applyMatrix4(matrix)
}

const Vertices = [
  new Vector3(1, 0, Math.SQRT1_2),
  new Vector3(-1, 0, Math.SQRT1_2),
  new Vector3(0, 1, -Math.SQRT1_2),
  new Vector3(0, -1, -Math.SQRT1_2)
]
const Indices = [0, 1, 2,   0, 2, 3,  0, 3, 1,   1, 3, 2]
const Planes = planesFromMesh(Vertices, Indices)
const PlaneMatrices = Planes.map(planeToMatrix)
const GlobalClippingPlanes = cylindricalPlanes(5, 2.5)
const Empty = Object.freeze([])

const transform = new Matrix4()
const tmpMatrix = new Matrix4()

const createControls = () => {
  const gui = new GUI()

  const folder = gui.addFolder('Local Clipping')
  const props = {
    get 'Enabled'() {
      return renderer.localClippingEnabled
    },
    set 'Enabled'(v) {
      renderer.localClippingEnabled = v
      if (!v) volumeVisualization.current.visible = false
    },
    get 'Shadows'() {
      return clipMaterial.clipShadows
    },
    set 'Shadows'(v) {
      clipMaterial.clipShadows = v
    },
    get 'Visualize'() {
      return volumeVisualization.current.visible
    },
    set 'Visualize'(v) {
      if (renderer.localClippingEnabled)
        volumeVisualization.current.visible = v
    }
  }

  folder.add(props, 'Enabled')
  folder.add(props, 'Shadows')
  folder.add(props, 'Visualize').listen()

  gui.addFolder('Global Clipping')
    .add({
      get 'Enabled'() {
        return renderer.clippingPlanes !== Empty as any
      },
      set 'Enabled'(v) {
        renderer.clippingPlanes = v ?
          globalClippingPlanes : Empty as any
      }
    }, 'Enabled')
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

const Mesh = () => {
  const { gl } = useThree()
  renderer = gl

  // Clipping setup
  globalClippingPlanes = createPlanes(GlobalClippingPlanes.length)
  gl.clippingPlanes = Empty as any
  gl.localClippingEnabled = true

  clipMaterial = new MeshPhongMaterial({
    color: 0xee0a10,
    shininess: 100,
    side: DoubleSide,
    // Clipping setup
    clippingPlanes: createPlanes(Planes.length),
    clipShadows: true
  })

  const meshRef: any = useRef()
  useFrame(() => {
    const currentTime = Date.now()
    const time = (currentTime - startTime) / 1000

    meshRef.current.position.y = 1
    meshRef.current.rotation.x = time * 0.5
    meshRef.current.rotation.y = time * 0.2

    meshRef.current.updateMatrix()
    transform.copy(meshRef.current.matrix)
    const bouncy = Math.cos(time*0.5)*0.5 + 0.7
    transform.multiply(tmpMatrix.makeScale(bouncy, bouncy, bouncy))

    assignTransformedPlanes(clipMaterial.clippingPlanes, Planes, transform)
    const planeMeshes = volumeVisualization.current.children

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
      <VolumeVisualization />
    </>
  )
}

const VolumeVisualization = () => {
  const meshes = []
  const color = new Color()
  for (let i = 0, n = Planes.length; i !== n; ++ i) {
    meshes.push(
      <mesh key={Math.random()} matrixAutoUpdate={false} >
        <planeGeometry args={[3, 3, 1, 1]} />
        <meshBasicMaterial color={color.setHSL(i/n, 0.5, 0.5).getHex()} 
          side={DoubleSide} opacity={0.2} transparent={true} 
          clippingPlanes={clipMaterial.clippingPlanes.filter((_: number, j: number) => j !== i)}
        />
      </mesh>
    )
  }

  volumeVisualization = useRef()

  useEffect(() => {
    volumeVisualization.current.visible = false
    createControls()
  }, [])

  return (
    <>    
      <group ref={volumeVisualization}>
        {meshes}
      </group>
    </>
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
  useEffect(() => {
    startTime = Date.now()
  }, [])

  return (
    <Canvas camera={{position: [0, 1.5, 3], fov: 36, aspect: aspect_ratio, near: 0.25, far: 16}} shadows>
      <color attach='background' args={['black']} />
      <Light />
      <Mesh />
      <Ground />
      <OrbitControls target={[0, 1, 0]} minDistance={1} maxDistance={8} />
    </Canvas>
  )
}

export default Example