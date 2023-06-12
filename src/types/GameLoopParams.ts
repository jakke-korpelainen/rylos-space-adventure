import * as THREE from "three"
import { GameStateActions } from "./GameStateActions"
import { GameStateMutation } from "./GameStateMutation"

export interface GameLoopParams {
  clock: THREE.Clock
  actions: GameStateActions
  mutation: GameStateMutation
}
