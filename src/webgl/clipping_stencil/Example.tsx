import { AlwaysStencilFunc, BackSide, DecrementWrapStencilOp, DoubleSide, FrontSide, 
  Group, IncrementWrapStencilOp, Mesh, MeshBasicMaterial, MeshStandardMaterial, 
  NotEqualStencilFunc, Plane, PlaneGeometry, PlaneHelper, ReplaceStencilOp, 
  TorusKnotGeometry, Vector3 } from 'three'

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"
import { Canvas, useFrame } from '@react-three/fiber'

import { aspect_ratio } from '../../contants'
import { OrbitControls } from '@react-three/drei'

const planes = [
  new Plane(new Vector3(- 1, 0, 0), 0),
  new Plane(new Vector3(0, - 1, 0), 0),
  new Plane(new Vector3(0, 0, - 1), 0)
]

const params = {
  animate: true,
  planeX: {
    constant: 0,
    negated: false,
    displayHelper: false
  },
  planeY: {
    constant: 0,
    negated: false,
    displayHelper: false
  },
  planeZ: {
    constant: 0,
    negated: false,
    displayHelper: false
  }
}

const planeHelpers = planes.map(p => new PlaneHelper(p, 2, 0xffffff))

const planeObjects: any[] = []
const planeGeom = new PlaneGeometry(4, 4)

const geometry = new TorusKnotGeometry(0.4, 0.15, 220, 60)
const object = new Group()

function createPlaneStencilGroup(geometry: TorusKnotGeometry, plane: Plane, renderOrder: number) {
  const group = new Group()
  const baseMat = new MeshBasicMaterial()
  baseMat.depthWrite = false
  baseMat.depthTest = false
  baseMat.colorWrite = false
  baseMat.stencilWrite = true
  baseMat.stencilFunc = AlwaysStencilFunc

  // back faces
  const mat0 = baseMat.clone()
  mat0.side = BackSide
  mat0.clippingPlanes = [plane]
  mat0.stencilFail = IncrementWrapStencilOp
  mat0.stencilZFail = IncrementWrapStencilOp
  mat0.stencilZPass = IncrementWrapStencilOp

  const mesh0 = new Mesh(geometry, mat0)
  mesh0.renderOrder = renderOrder
  group.add(mesh0)

  // front faces
  const mat1 = baseMat.clone()
  mat1.side = FrontSide
  mat1.clippingPlanes = [plane]
  mat1.stencilFail = DecrementWrapStencilOp
  mat1.stencilZFail = DecrementWrapStencilOp
  mat1.stencilZPass = DecrementWrapStencilOp

  const mesh1 = new Mesh(geometry, mat1)
  mesh1.renderOrder = renderOrder

  group.add(mesh1)

  return group
}

const Meshes = () => {
  const poGroups = []
  for (let i=0; i<3; i++) {
    const poGroup = new Group()
    const plane = planes[i]
    const stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1)

    // plane is clipped by the other clipping planes
    const planeMat =
      new MeshStandardMaterial({

        color: 0xE91E63,
        metalness: 0.1,
        roughness: 0.75,
        clippingPlanes: planes.filter(p => p !== plane),

        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: NotEqualStencilFunc,
        stencilFail: ReplaceStencilOp,
        stencilZFail: ReplaceStencilOp,
        stencilZPass: ReplaceStencilOp,

      })
    const po = new Mesh(planeGeom, planeMat)
    po.onAfterRender = (renderer) => {
      renderer.clearStencil()
    }

    po.renderOrder = i + 11

    object.add(stencilGroup)
    poGroup.add(po)
    planeObjects.push(po)
    poGroups.push(
      <primitive key={i} object={poGroup} />
    )
    // scene.add(poGroup)
  }

  const material = new MeshStandardMaterial({
    color: 0xFFC107,
    metalness: 0.1,
    roughness: 0.75,
    clippingPlanes: planes,
    clipShadows: true,
    shadowSide: DoubleSide,
  })

  // add the color
  const clippedColorFront = new Mesh(geometry, material)
  clippedColorFront.castShadow = true
  clippedColorFront.renderOrder = 6
  object.add(clippedColorFront)

  useFrame((_, delta) => {
    if (params.animate) {
      object.rotation.x += delta * 0.5
      object.rotation.y += delta * 0.2
    }

    for (let i = 0; i < planeObjects.length; i++) {
      const plane = planes[i]
      const po = planeObjects[i]
      plane.coplanarPoint(po.position)
      po.lookAt(
        po.position.x - plane.normal.x,
        po.position.y - plane.normal.y,
        po.position.z - plane.normal.z,
      )
    }
  })

  return (
    <>
      <primitive object={object} />
      {poGroups}
    </>
  )
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 0]} receiveShadow >
      <planeGeometry args={[9, 9, 1, 1]} />
      <shadowMaterial color={0x000000} opacity={0.25} side={DoubleSide} />
    </mesh>
  )
}

const createControls = () => {
  const gui = new GUI()
  gui.add(params, 'animate' )

  const planeX = gui.addFolder('planeX')
  planeX.add(params.planeX, 'displayHelper').onChange((v:any) => planeHelpers[0].visible = v)
  planeX.add(params.planeX, 'constant').min(- 1).max(1).onChange((d:any) => planes[0].constant = d)
  planeX.add(params.planeX, 'negated').onChange(() => {

    planes[0].negate()
    params.planeX.constant = planes[0].constant

  })
  planeX.open()

  const planeY = gui.addFolder('planeY')
  planeY.add(params.planeY, 'displayHelper').onChange((v:any) => planeHelpers[1].visible = v)
  planeY.add(params.planeY, 'constant').min(- 1).max(1).onChange((d:any) => planes[1].constant = d)
  planeY.add(params.planeY, 'negated').onChange(() => {

    planes[1].negate()
    params.planeY.constant = planes[1].constant

  })
  planeY.open()

  const planeZ = gui.addFolder('planeZ')
  planeZ.add(params.planeZ, 'displayHelper').onChange((v:any) => planeHelpers[2].visible = v)
  planeZ.add(params.planeZ, 'constant').min(- 1).max(1).onChange((d:any) => planes[2].constant = d)
  planeZ.add(params.planeZ, 'negated').onChange(() => {

    planes[2].negate()
    params.planeZ.constant = planes[2].constant

  })
  planeZ.open()
}

const Example = () => {
  return (
    <Canvas camera={{position: [2, 2, 2], fov: 36, aspect: aspect_ratio, near: 1, far: 100}} shadows
      onCreated={({gl}) => {
        gl.setClearColor(0x263238)
        gl.localClippingEnabled = true
        createControls()
      }}>
      <ambientLight args={[0xffffff, 0.5]} />
      <directionalLight args={[0xffffff, 1]} position={[5, 10, 7.5]} castShadow
        shadow-camera-right={2} shadow-camera-left={-2}
        shadow-camera-top={2} shadow-camera-bottom={-2}
        shadow-mapSize-width={1024} shadow-camera-height={1024}
      />
      <> 
        {planeHelpers.map(ph => {
          ph.visible = false
          return <primitive key={ph.uuid} object={ph} />
        })}
      </>
      <Meshes />
      <Ground />
      <OrbitControls 
        minDistance={2}
        maxDistance={20}
      />
    </Canvas>
  )
}

export default Example