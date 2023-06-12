import React, { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useGameStore } from "../store"
import * as THREE from "three"
import { useEffect } from "react"
import { ObjectData } from "../types/ObjectData"

export default function Rocks() {
  const gltf = useLoader(GLTFLoader, "/rylos-space-adventure/rock.gltf")
  const rocks = useGameStore((state) => state.rocks)

  return (
    <>
      {rocks.map((r) => (
        <Rock {...gltf} key={r.guid} data={r} />
      ))}
    </>
  )
}

interface IRockProps {
  nodes: any
  materials: any
  data: ObjectData
}

const Rock = React.memo((props: IRockProps) => {
  const ref = useRef<THREE.Group>()
  const clock = useGameStore((state) => state.clock)
  const addExplode = useGameStore((state) => state.actions.world.addExplode)

  useEffect(() => {
    return () => {
      addExplode(props.data)
    }
  }, [])

  useFrame(() => {
    try {
      if (clock) {
        const r =
          Math.cos((clock.getElapsedTime() / 2) * props.data.speed) * Math.PI
        if (ref.current && ref.current.rotation) {
          ref.current.rotation.set(r, r, r)
        }
      }
    } catch (err) {}
  })

  return (
    <group
      ref={ref}
      position={props.data.offset}
      scale={[props.data.scale, props.data.scale, props.data.scale]}>
      <group
        position={[
          -0.016298329457640648, -0.012838120572268963, 0.24073271453380585
        ]}
        rotation={[
          3.0093872578726644, 0.27444228385461117, -0.22745113653772078
        ]}
        scale={[20, 20, 20]}>
        <mesh
          geometry={props.nodes.node_id4_Material_52_0.geometry}
          material={props.materials.Material_52}
          material-roughness={1}
          material-metalness={1}
        />
      </group>
    </group>
  )
})
