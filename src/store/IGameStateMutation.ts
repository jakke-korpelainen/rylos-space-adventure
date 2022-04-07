import { IObjectData } from "../IObjectData"

export interface IGameStateMutation {
  t: number
  startTime: number | null
  position: THREE.Vector3
  track: THREE.TubeGeometry
  scale: number
  fov: number
  hits: number
  particles: IObjectData[]
  looptime: number
  binormal: THREE.Vector3
  normal: THREE.Vector3
  mouse: THREE.Vector2
  dummy: THREE.Object3D
  ray: THREE.Ray
  box: THREE.Box3
}
