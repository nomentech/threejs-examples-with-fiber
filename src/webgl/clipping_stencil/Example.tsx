import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

import { aspect_ratio } from '../../contants'

const planes = [
  new THREE.Plane(new THREE.Vector3(- 1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, - 1), 0)
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

const planeHelpers = planes.map(p => new THREE.PlaneHelper(p, 2, 0xffffff))

const planeObjects: any[] = []
const planeGeom = new THREE.PlaneGeometry(4, 4)

const geometry = new THREE.TorusKnotGeometry(0.4, 0.15, 220, 60)
const object = new THREE.Group()

function createPlaneStencilGroup(geometry: THREE.TorusKnotGeometry, plane: THREE.Plane, renderOrder: number) {
  const group = new THREE.Group()
  const baseMat = new THREE.MeshBasicMaterial()
  baseMat.depthWrite = false
  baseMat.depthTest = false
  baseMat.colorWrite = false
  baseMat.stencilWrite = true
  baseMat.stencilFunc = THREE.AlwaysStencilFunc

  // back faces
  const mat0 = baseMat.clone()
  mat0.side = THREE.BackSide
  mat0.clippingPlanes = [plane]
  mat0.stencilFail = THREE.IncrementWrapStencilOp
  mat0.stencilZFail = THREE.IncrementWrapStencilOp
  mat0.stencilZPass = THREE.IncrementWrapStencilOp

  const mesh0 = new THREE.Mesh(geometry, mat0)
  mesh0.renderOrder = renderOrder
  group.add(mesh0)

  // front faces
  const mat1 = baseMat.clone()
  mat1.side = THREE.FrontSide
  mat1.clippingPlanes = [plane]
  mat1.stencilFail = THREE.DecrementWrapStencilOp
  mat1.stencilZFail = THREE.DecrementWrapStencilOp
  mat1.stencilZPass = THREE.DecrementWrapStencilOp

  const mesh1 = new THREE.Mesh(geometry, mat1)
  mesh1.renderOrder = renderOrder

  group.add(mesh1)

  return group
}

const Meshes = () => {
  const poGroups = []
  for (let i=0; i<3; i++) {
    const poGroup = new THREE.Group()
    const plane = planes[i]
    const stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1)

    // plane is clipped by the other clipping planes
    const planeMat =
      new THREE.MeshStandardMaterial({

        color: 0xE91E63,
        metalness: 0.1,
        roughness: 0.75,
        clippingPlanes: planes.filter(p => p !== plane),

        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: THREE.NotEqualStencilFunc,
        stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

      })
    const po = new THREE.Mesh(planeGeom, planeMat)
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

  const material = new THREE.MeshStandardMaterial({
    color: 0xFFC107,
    metalness: 0.1,
    roughness: 0.75,
    clippingPlanes: planes,
    clipShadows: true,
    shadowSide: THREE.DoubleSide,
  })

  // add the color
  const clippedColorFront = new THREE.Mesh(geometry, material)
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
      <shadowMaterial color={0x000000} opacity={0.25} side={THREE.DoubleSide} />
    </mesh>
  )
}

const Controls = () => {
  const { gl } = useThree()
  gl.setClearColor(0x263238)
  gl.localClippingEnabled = true

  useControls({
    'animate': {
      value: params.animate,
      onChange: (v: boolean) => params.animate = v
    }
  })

  useControls('planeX', {
    'displayHelper': {
      value: params.planeX.displayHelper,
      onChange: (v) => planeHelpers[0].visible = v
    },
    'contant': {
      value: params.planeX.constant,
      min: -1, max: 1,
      onChange: (d) => planes[0].constant = d
    },
    'negated': {
      value: params.planeX.negated,
      onChange: () => {
        planes[0].negate()
        params.planeX.constant = planes[0].constant
      }
    }
  })

  useControls('planeY', {
    'displayHelper': {
      value: params.planeY.displayHelper,
      onChange: (v) => planeHelpers[1].visible = v
    },
    'contant': {
      value: params.planeY.constant,
      min: -1, max: 1,
      onChange: (d) => planes[1].constant = d
    },
    'negated': {
      value: params.planeY.negated,
      onChange: () => {
        planes[1].negate()
        params.planeY.constant = planes[1].constant
      }
    }
  })

  useControls('planeZ', {
    'displayHelper': {
      value: params.planeZ.displayHelper,
      onChange: (v) => planeHelpers[2].visible = v
    },
    'contant': {
      value: params.planeZ.constant,
      min: -1, max: 1,
      onChange: (d) => planes[2].constant = d
    },
    'negated': {
      value: params.planeZ.negated,
      onChange: () => {
        planes[2].negate()
        params.planeZ.constant = planes[2].constant
      }
    }
  })

  return null
}

const Example = () => {
  return (
    <Canvas camera={{position: [2, 2, 2], fov: 36, aspect: aspect_ratio, near: 1, far: 100}} shadows>
      <ambientLight args={[0xffffff, 0.5]} />
      <directionalLight args={[0xffffff, 1]} position={[5, 10, 7.5]} castShadow
        // shadow-camera-right={2} shadow-camera-left={-2}
        // shadow-camera-top={2} shadow-camera-bottom={-2}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach='shadow-camera' args={[-2, 2, 2, -2]} />
      </directionalLight>
      <> 
        {planeHelpers.map((ph, i) => {
          ph.visible = false
          return <primitive key={i} object={ph} />
        })}
      </>
      <Meshes />
      <Ground />
      <Controls />
      <OrbitControls 
        minDistance={2}
        maxDistance={20}
      />
    </Canvas>
  )
}

export default Example