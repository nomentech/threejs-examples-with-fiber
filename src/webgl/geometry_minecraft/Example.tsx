import { useMemo } from 'react'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import { ImprovedNoise } from 'three-stdlib'
import { Canvas } from '@react-three/fiber'

import atlas from '../../textures/minecraft/atlas.png'
import { FirstPersonControls, useTexture } from '@react-three/drei'

const worldWidth = 128, worldDepth = 128
const worldHalfWidth = worldWidth / 2
const worldHalfDepth = worldDepth / 2
const data = generateHeight(worldWidth, worldDepth)

function generateHeight (width: number, height: number) {
  const data = [], perlin = new ImprovedNoise(), size = width * height, z = Math.random() * 100

  let quality = 2
  for (let j = 0; j < 4; j ++) {
    if (j === 0) for (let i = 0; i < size; i ++) data[i] = 0

    for (let i = 0; i < size; i ++) {
      const x = i % width, y = (i / width) | 0
      data[ i ] += perlin.noise(x / quality, y / quality, z) * quality
    }

    quality *= 4
  }

  return data
}

function getY(x: number, z: number) {
  return (data[x + z * worldWidth] * 0.15) | 0
}

const Mesh = () => {
  const texture = useTexture(atlas)
  texture.magFilter = THREE.NearestFilter

  const geometry = useMemo(() => {
    const pxGeometry: any = new THREE.PlaneGeometry(100, 100)
    pxGeometry.attributes.uv.array[1] = 0.5
    pxGeometry.attributes.uv.array[3] = 0.5
    pxGeometry.rotateY(Math.PI / 2)
    pxGeometry.translate(50, 0, 0)

    const nxGeometry: any = new THREE.PlaneGeometry(100, 100)
    nxGeometry.attributes.uv.array[1] = 0.5
    nxGeometry.attributes.uv.array[3] = 0.5
    nxGeometry.rotateY(-Math.PI / 2)
    nxGeometry.translate(-50, 0, 0)

    const pyGeometry: any = new THREE.PlaneGeometry(100, 100)
    pyGeometry.attributes.uv.array[5] = 0.5
    pyGeometry.attributes.uv.array[7] = 0.5
    pyGeometry.rotateX(-Math.PI / 2)
    pyGeometry.translate(0, 50, 0)

    const pzGeometry: any = new THREE.PlaneGeometry(100, 100)
    pzGeometry.attributes.uv.array[1] = 0.5
    pzGeometry.attributes.uv.array[3] = 0.5
    pzGeometry.translate(0, 0, 50)

    const nzGeometry: any = new THREE.PlaneGeometry(100, 100)
    nzGeometry.attributes.uv.array[1] = 0.5
    nzGeometry.attributes.uv.array[3] = 0.5
    nzGeometry.rotateY(Math.PI)
    nzGeometry.translate(0, 0, -50)

    const matrix = new THREE.Matrix4()
    const geometries = []

    for (let z = 0; z < worldDepth; z ++) {
      for (let x = 0; x < worldWidth; x ++) {
        const h = getY(x, z)

        matrix.makeTranslation(
          x * 100 - worldHalfWidth * 100,
          h * 100,
          z * 100 - worldHalfDepth * 100
      )

        const px = getY(x + 1, z)
        const nx = getY(x - 1, z)
        const pz = getY(x, z + 1)
        const nz = getY(x, z - 1)

        geometries.push(pyGeometry.clone().applyMatrix4(matrix))

        if ((px !== h && px !== h + 1) || x === 0) {
          geometries.push(pxGeometry.clone().applyMatrix4(matrix))
        }

        if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {
          geometries.push(nxGeometry.clone().applyMatrix4(matrix))
        }

        if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {
          geometries.push(pzGeometry.clone().applyMatrix4(matrix))
        }

        if ((nz !== h && nz !== h + 1) || z === 0) {
          geometries.push(nzGeometry.clone().applyMatrix4(matrix))
        }
      }
    }

    const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries)
    geometry.computeBoundingSphere()

    return geometry
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshLambertMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  )
}

const Example = () => {
  return (
    <>    
      <div className='absolute left-[50%] top-2 z-10'>(left click: forward, right click: backward)</div>
      <Canvas camera={{ position: [0, getY(worldHalfWidth, worldHalfDepth), 0], fov: 60, near:1 ,far: 20000 }}
        gl={{ antialias: true }}>
        <color attach='background' args={[0xbfd1e5]} />
        <ambientLight args={[0xcccccc]} />
        <directionalLight args={[0xffffff, 2]} position={[1, 1, 0.5]} />
        <Mesh />
        <FirstPersonControls movementSpeed={1000} lookSpeed={0.125} lookVertical />
      </Canvas>
    </>
)
}

export default Example