import { v4 as uuid } from "uuid"
import * as THREE from "three"
import { ObjectData } from "../types/ObjectData"

export const createInitialValues = (track: THREE.TubeBufferGeometry) => {
  return {
    currentTrackIndex: 0,
    menu: null,
    camera: null,
    lastPoints: 0,
    points: 0,
    highScore: 0,
    health: 100,
    lasers: [],
    explosions: [],
    rocks: [],
    immunity: true,
    clock: null,

    mutation: {
      t: 0,
      position: new THREE.Vector3(),
      startTime: null,
      track,
      scale: 15,
      fov: 70,
      hits: 0,
      particles: randomData(
        1500,
        track,
        100,
        1,
        () => 0.5 + Math.random() * 0.8
      ),
      looptime: 40 * 1000,
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      mouse: new THREE.Vector2(-250, 50),

      // reusable objects
      dummy: new THREE.Object3D(),
      ray: new THREE.Ray(),
      box: new THREE.Box3()
    }
  }
}

export function randomData(
  count: number,
  track: THREE.TubeBufferGeometry,
  radius: number,
  size: number,
  scale: (() => number) | number
) {
  return new Array(count).fill(null).map(() => {
    const t = Math.random()
    const position = track.parameters.path.getPointAt(t)
    position.multiplyScalar(15)
    const offset = position
      .clone()
      .add(
        new THREE.Vector3(
          -radius + Math.random() * radius * 2,
          -radius + Math.random() * radius * 2,
          -radius + Math.random() * radius * 2
        )
      )
    const speed = 0.1 + Math.random()

    const objectData: ObjectData = {
      guid: uuid(),
      scale: typeof scale === "function" ? scale() : scale,
      size,
      offset,
      position,
      speed,
      radius,
      t,
      hit: new THREE.Vector3(),
      distance: 1000
    }
    return objectData
  })
}
