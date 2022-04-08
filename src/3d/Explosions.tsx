import React, { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGameStore } from "../store"
import * as audio from "../audio"
import * as THREE from "three"
import throttle from "lodash.throttle"

const makeParticles = (color: string, speed: number) => {
  return {
    ref: React.createRef(),
    color,
    data: new Array(20)
      .fill(null)
      .map(() => [
        new THREE.Vector3(),
        new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).normalize().multiplyScalar(speed * 0.75)
      ])
  }
}

export default function Explosions() {
  const explosions = useGameStore((state) => state.explosions)

  return (
    <>
      {explosions.map((e) => (
        <Explosion guid={e.guid} key={e.guid} position={e.offset} scale={e.scale * 0.4} />
      ))}
    </>
  )
}

interface IExplosionProps {
  position: THREE.Vector3
  scale: number
  guid: string
}

const EXPLOSION_DURATION = 1000
const MAXIMUM_EXPLOSION_INTERVAL = 50

// to fix audio clipping issues in some cases
const explosionSound = throttle(() => {
  void audio.playAudio(new Audio(audio.mp3.explosion), 0.2)
}, MAXIMUM_EXPLOSION_INTERVAL)

export const Explosion = (props: IExplosionProps) => {
  const { dummy } = useGameStore((state) => state.mutation)
  const removeExplode = useGameStore((state) => state.actions.world.removeExplode)

  const group = useRef<THREE.Group>()

  const particles = useMemo(() => [makeParticles("white", 0.8), makeParticles("firebrick", 0.6), makeParticles("#f66a00", 0.3)], [])

  useEffect(() => explosionSound(), [])

  // destroy self after timer
  useEffect(() => {
    setTimeout(() => {
      removeExplode(props.guid)
    }, EXPLOSION_DURATION)
  }, [])

  useFrame(() => {
    particles.forEach(({ data }, type) => {
      if (group.current) {
        const children = group.current.children
        const mesh: THREE.InstancedMesh = children[type] as THREE.InstancedMesh
        data.forEach(([vec, normal], i) => {
          vec.add(normal)
          dummy.position.copy(vec)
          dummy.updateMatrix()

          mesh.setMatrixAt(i, dummy.matrix)
        })
        if (mesh.material instanceof THREE.Material) {
          mesh.material.opacity -= 0.025
        }
        if (mesh.instanceMatrix) {
          mesh.instanceMatrix.needsUpdate = true
        }
      }
    })
  })

  return (
    <group ref={group} position={props.position} scale={[props.scale, props.scale, props.scale]}>
      {particles.map(({ color, data }, index) => (
        <instancedMesh key={index} args={[undefined as any, undefined as any, data.length]} frustumCulled={false}>
          <dodecahedronGeometry args={[10, 0]} />
          <meshBasicMaterial color={color} transparent opacity={1} fog={false} />
        </instancedMesh>
      ))}
    </group>
  )
}
