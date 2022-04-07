import { InstancedMeshProps } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import { useGameStore } from "../store"

export default function Particles() {
  const instancedMesh = useRef<InstancedMeshProps>()
  const { particles, dummy } = useGameStore((state) => state.mutation)

  useEffect(() => {
    particles.forEach((particle, i) => {
      const { offset, scale } = particle
      dummy.position.copy(offset)
      dummy.scale.set(scale, scale, scale)
      dummy.rotation.set(Math.sin(Math.random()) * Math.PI, Math.sin(Math.random()) * Math.PI, Math.cos(Math.random()) * Math.PI)
      dummy.updateMatrix()
      if (instancedMesh.current && instancedMesh.current.setMatrixAt) {
        instancedMesh.current.setMatrixAt(i, dummy.matrix)
      }
    })

    if (instancedMesh.current && instancedMesh.current.instanceMatrix) {
      instancedMesh.current.instanceMatrix.needsUpdate = true
    }
  }, [])

  return (
    <instancedMesh ref={instancedMesh} args={[undefined as any, undefined as any, particles.length]} frustumCulled={false}>
      <coneGeometry args={[2, 2, 3]} />
      <meshStandardMaterial color="#606060" />
    </instancedMesh>
  )
}
