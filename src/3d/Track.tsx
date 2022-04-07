import { useGameStore } from "../store"

export default function Track() {
  const { scale, track } = useGameStore((state) => state.mutation)
  return (
    <mesh scale={[scale, scale, scale]} geometry={track}>
      <meshBasicMaterial color="#9b51e0" />
    </mesh>
  )
}
