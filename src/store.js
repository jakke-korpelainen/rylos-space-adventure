import * as THREE from 'three'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { addEffect } from '@react-three/fiber'
import create from 'zustand'
import * as audio from './audio'

let guid = 1
const COLLISION_DAMAGE = 20
const DIFFICULTY_INCREASE_INTERVAL = 15000
const MAXIMUM_TRAVEL_SPEED = 10000

const useStore = create((set, get) => {
  let spline = new Curves.GrannyKnot()
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
  let cancelLaserTO = undefined
  let cancelExplosionTO = undefined
  const box = new THREE.Box3()

  return {
    currentTrackIndex: 0,
    menu: undefined,
    camera: undefined,
    lastPoints: 0,
    points: 0,
    highScore: 0,
    health: 100,
    lasers: [],
    explosions: [],
    rocks: randomData(100, track, 150, 8, () => 1 + Math.random() * 2.5),
    immunity: true,

    mutation: {
      t: 0,
      position: new THREE.Vector3(),
      startTime: Date.now(),

      track,
      scale: 15,
      fov: 70,
      hits: false,
      particles: randomData(1500, track, 100, 1, () => 0.5 + Math.random() * 0.8),
      looptime: 40 * 1000,
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
      mouse: new THREE.Vector2(-250, 50),

      // Re-usable objects
      dummy: new THREE.Object3D(),
      ray: new THREE.Ray(),
      box: new THREE.Box3()
    },

    actions: {
      menu: {
        start() {
          set({ menu: null })
        },
        game() {
          set({ menu: 'game' })
        },
        credits() {
          set({ menu: 'credits' })
        }
      },
      reset() {
        set({ menu: 'game', health: 100, immunity: true, points: 0 })
      },
      init(camera) {
        const { mutation, actions } = get()

        const sessionHighscore = localStorage.getItem('rylos-space-adventure-hiscore')
        if (sessionHighscore && parseInt(sessionHighscore)) {
          set({ highScore: sessionHighscore })
        }

        set({ camera })
        mutation.clock.start()

        audio.playAudio(audio.engine, 1, true)
        audio.playAudio(audio.engine2, 0.3, true)

        addEffect(() => {
          const { immunity } = get()
          if (immunity) {
            setTimeout(() => set({ immunity: false }), 5000)
          }
        })

        addEffect(() => {
          const { rocks, immunity } = get()

          const time = Date.now()

          // increase travel speed every (n) seconds overtime with a hard cap at very difficult
          const timeDiff = time - mutation.startTime
          const difficultyModifier = Math.min(timeDiff / DIFFICULTY_INCREASE_INTERVAL, 30)
          const looptime = Math.max((40 - difficultyModifier) * 1000, MAXIMUM_TRAVEL_SPEED)

          const t = (mutation.t = ((time - mutation.startTime) % looptime) / looptime)

          mutation.position = track.parameters.path.getPointAt(t)
          mutation.position.multiplyScalar(mutation.scale)

          // test for wormhole/warp
          let warping = false
          if (t > 0.3 && t < 0.4) {
            if (!warping) {
              warping = true
              audio.playAudio(audio.warp)
            }
          } else if (t > 0.5) warping = false

          // test for hits
          const r = rocks.filter(actions.test)

          const previous = mutation.hits
          mutation.hits = r.length
          if (previous === 0 && mutation.hits) {
            audio.playAudio(audio.click)
          }

          // laser targed collisions
          const lasers = get().lasers
          if (mutation.hits && lasers.length && time - lasers[lasers.length - 1] < 100) {
            const updates = r.map((data) => ({ time: Date.now(), ...data }))
            set((state) => ({ explosions: [...state.explosions, ...updates] }))
            clearTimeout(cancelExplosionTO)
            cancelExplosionTO = setTimeout(() => set((state) => ({ explosions: state.explosions.filter(({ time }) => Date.now() - time <= 1000) })), 1000)

            // replace shot rocks with new ones
            const newRocks = randomData(mutation.hits, track, 150, 8, () => 1 + Math.random() * 2.5)

            set((state) => ({
              points: state.points + r.length * 100,
              rocks: [...newRocks, ...state.rocks.filter((rock) => !r.find((r) => r.guid === rock.guid))]
            }))
          }

          // player movement collisions
          const rockCollisions = r.filter((data) => data.distance < 15)
          if (rockCollisions.length > 0) {
            audio.playAudio(audio.crash, 1, false)

            const updates = rockCollisions.map((data) => ({ time: Date.now(), ...data }))
            set((state) => ({ explosions: [...state.explosions, ...updates] }))
            clearTimeout(cancelExplosionTO)
            cancelExplosionTO = setTimeout(() => set((state) => ({ explosions: state.explosions.filter(({ time }) => Date.now() - time <= 1000) })), 1000)

            // replace collided rocks with new ones
            const newRocks = randomData(mutation.hits, track, 150, 8, () => 1 + Math.random() * 2.5)

            set((state) => ({
              rocks: [...newRocks, ...state.rocks.filter((rock) => !rockCollisions.find((r) => r.guid === rock.guid))]
            }))

            if (immunity === false) {
              set((state) => ({ health: Math.max(0, state.health - COLLISION_DAMAGE) }))
            }
          }

          if (get().health <= 0) {
            const points = get().points
            set(() => ({ menu: 'dead', lastPoints: points }))

            if (get().highScore < points) {
              set({ highScore: points })
              localStorage.setItem('rylos-space-adventure-hiscore', points)
            }
          }
        })
      },
      shoot() {
        set((state) => ({ lasers: [...state.lasers, Date.now()] }))
        clearTimeout(cancelLaserTO)
        cancelLaserTO = setTimeout(() => set((state) => ({ lasers: state.lasers.filter((t) => Date.now() - t <= 1000) })), 1000)
        audio.playAudio(audio.zap, 0.25)
      },
      updateMouse({ clientX: x, clientY: y }) {
        get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2)
      },
      test(data) {
        box.min.copy(data.offset)
        box.max.copy(data.offset)
        box.expandByScalar(data.size * data.scale)
        data.hit.set(10000, 10000, 10000)
        const result = get().mutation.ray.intersectBox(box, data.hit)
        data.distance = get().mutation.ray.origin.distanceTo(data.hit)
        return result
      }
    }
  }
})

function randomData(count, track, radius, size, scale) {
  return new Array(count).fill().map(() => {
    const t = Math.random()
    const pos = track.parameters.path.getPointAt(t)
    pos.multiplyScalar(15)
    const offset = pos
      .clone()
      .add(new THREE.Vector3(-radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2))
    const speed = 0.1 + Math.random()
    return { guid: guid++, scale: typeof scale === 'function' ? scale() : scale, size, offset, pos, speed, radius, t, hit: new THREE.Vector3(), distance: 1000 }
  })
}

export default useStore
