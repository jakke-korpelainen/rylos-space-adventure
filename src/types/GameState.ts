import { Camera } from "@react-three/fiber"
import { ObjectData } from "./ObjectData"
import { GameStateActions } from "./GameStateActions"
import { GameStateMutation } from "./GameStateMutation"

export interface GameState {
  currentTrackIndex: number
  menu: string | null
  camera: Camera | null
  lastPoints: number
  points: number
  highScore: number
  health: number
  lasers: any[]
  explosions: ObjectData[]
  rocks: ObjectData[]
  immunity: boolean
  clock: THREE.Clock | null
  mutation: GameStateMutation
  actions: GameStateActions
}
