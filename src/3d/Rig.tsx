import { useRef, ReactNode } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useGameStore } from "../store"
import * as THREE from "three"

let offset = 0
export default function Rig(props: { children: ReactNode }) {
  const group = useRef<THREE.Group>()
  const rig = useRef<THREE.Group>()
  const mutation = useGameStore((state) => state.mutation)
  const { fov, scale, binormal, normal, track, mouse } = mutation
  const { camera } = useThree<{ camera: THREE.PerspectiveCamera }>()

  useFrame(() => {
    const t = mutation.t
    const position = mutation.position.clone()
    const segments = track.tangents.length
    const pickt = t * segments
    const pick = Math.floor(pickt)
    const pickNext = (pick + 1) % segments
    binormal.subVectors(track.binormals[pickNext], track.binormals[pick])
    binormal.multiplyScalar(pickt - pick).add(track.binormals[pick])
    const dir = track.parameters.path.getTangentAt(t)
    offset += (Math.max(15, 15 + -mouse.y / 20) - offset) * 0.05
    normal.copy(binormal).cross(dir)
    position.add(normal.clone().multiplyScalar(offset))
    camera.position.copy(position)
    const lookAt = track.parameters.path.getPointAt((t + 30 / track.parameters.path.getLength()) % 1).multiplyScalar(scale)
    camera.matrix.lookAt(camera.position, lookAt, normal)
    camera.quaternion.setFromRotationMatrix(camera.matrix)
    camera.fov += ((t > 0.4 && t < 0.45 ? 120 : fov) - camera.fov) * 0.05
    camera.updateProjectionMatrix()
    const lightPos = track.parameters.path.getPointAt((t + 1 / track.parameters.path.getLength()) % 1).multiplyScalar(scale)

    if (group.current) {
      if (group.current.position) {
        group.current.position.copy(lightPos)
      }
      if (group.current.position && group.current.quaternion) {
        group.current.quaternion.setFromRotationMatrix(camera.matrix)
      }
    }
  })

  return (
    <group ref={group}>
      <pointLight distance={400} position={[50, 100, -420]} intensity={5} color="#9b51e0" />
      <group ref={rig} position={[0, 0, -50]}>
        {props.children}
      </group>
    </group>
  )
}
