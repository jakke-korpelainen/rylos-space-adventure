import { IObjectData } from "../IObjectData"
import { DebouncedFunc } from "lodash"
import { Camera } from "@react-three/fiber"

export interface IGameStateActions {
  game: {
    intro: () => void
    start: () => void
    credits: () => void
    reset: () => void
    init: (camera: Camera) => void
  }
  player: {
    damage: () => void
    death: () => void
    fire: () => void
    autofire: DebouncedFunc<(e: any) => void>
    cancelAutofire: () => void
    move: (movement: { x: number; y: number }) => void
  }
  world: {
    addRocks: (amount: number) => void
    removeRock: (rockGuid: string) => void
    addExplode: (data: IObjectData) => void
    removeExplode: (rockGuid: string) => void
    test: (data: any) => THREE.Vector3 | null
  }
}
