import * as THREE from "three"
import { IGameStateActions } from "./IGameStateActions"
import { IGameStateMutation } from "./IGameStateMutation"

export interface IGameLoopParams {
  clock: THREE.Clock
  actions: IGameStateActions
  mutation: IGameStateMutation
}
