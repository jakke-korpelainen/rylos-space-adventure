import { Camera } from "@react-three/fiber"
import { IObjectData } from "../IObjectData"
import { IGameStateActions } from "./IGameStateActions"
import { IGameStateMutation } from "./IGameStateMutation"

export interface IGameState {
  currentTrackIndex: number
  menu: string | null
  camera: Camera | null
  lastPoints: number
  points: number
  highScore: number
  health: number
  lasers: any[]
  explosions: IObjectData[]
  rocks: IObjectData[]
  immunity: boolean
  clock: THREE.Clock | null
  mutation: IGameStateMutation
  actions: IGameStateActions
}
