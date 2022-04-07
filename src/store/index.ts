import { Curves } from "three/examples/jsm/curves/CurveExtras"
import { addEffect, Camera } from "@react-three/fiber"
import create from "zustand"
import * as audio from "../audio"
import throttle from "lodash.throttle"
import { IGameState } from "./IGameState"
import * as THREE from "three"
import { createInitialValues, randomData } from "./utils"
import { IObjectData } from "../IObjectData"

const COLLISION_DAMAGE = 20
const DIFFICULTY_INCREASE_INTERVAL = 15 // seconds
const MAXIMUM_TRAVEL_SPEED = 10000
const FIRING_DELAY = 200 // 300 rpm

export const useGameStore = create<IGameState>((set, get) => {
  let spline = new Curves.GrannyKnot()
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
  let cancelLaserTO: number | undefined = undefined
  let shootingTO: number | undefined = undefined
  let immunityTO: number | undefined = undefined
  const box = new THREE.Box3()

  return {
    ...createInitialValues(track),
    actions: {
      game: {
        intro() {
          set({ menu: null })
        },
        start() {
          set({ menu: "game" })
        },
        credits() {
          set({ menu: "credits" })
        },
        reset: () => {
          set({ menu: "game", health: 100, immunity: true, points: 0 })
        },
        init: (camera: Camera) => {
          const { immunity, mutation, actions } = get()

          const sessionHighscore = localStorage.getItem("rylos-space-adventure-hiscore")
          if (sessionHighscore && Number(sessionHighscore)) {
            set({ highScore: Number(sessionHighscore) })
          }

          set({ camera, clock: new THREE.Clock(true) })

          const clock = get().clock!
          mutation.startTime = Date.now()

          audio.playAudio(audio.engine, 0.4, true)
          audio.playAudio(audio.engine2, 0.4, true)

          if (immunity && immunityTO === undefined) {
            window.setTimeout(() => set({ immunity: false }), 5000)
          }

          const gameLoopEffect: any = () => {
            // increase travel speed every (n) seconds overtime with a hard cap at very difficult
            const time = Date.now()
            const difficultyLevel = clock.getElapsedTime() / DIFFICULTY_INCREASE_INTERVAL
            const difficultyModifier = 40 - difficultyLevel
            const looptime = Math.max(difficultyModifier * 1000, MAXIMUM_TRAVEL_SPEED)
            const t = (mutation.t = ((time - mutation.startTime!) % looptime) / looptime)
            mutation.position = track.parameters.path.getPointAt(t)
            mutation.position.multiplyScalar(mutation.scale)

            // test for wormhole/warp
            let warping = false
            if (t > 0.3 && t < 0.4) {
              if (!warping) {
                warping = true
                audio.playAudio(audio.warp)
              }
            } else if (t > 0.5) {
              warping = false
            }

            // test for hits
            const { rocks } = get()
            const r = rocks.filter(actions.world.test)

            const previous = mutation.hits
            mutation.hits = r.length
            if (previous === 0 && mutation.hits) {
              audio.playAudio(audio.click)
            }

            // handle laser hits
            const lasers = get().lasers
            if (mutation.hits && lasers.length && time - lasers[lasers.length - 1] < 100) {
              const updates = r.map((data) => ({ ...data }))

              // rock destructor explodes rocks
              updates.forEach((u) => actions.world.removeRock(u.guid))

              // replace shot rocks with new ones
              actions.world.addRocks(mutation.hits)

              set((state) => ({
                points: state.points + r.length * 100
              }))
            }

            // // handle player movement collisions
            const rockCollisions = r.filter((data) => data.distance < 30)
            if (rockCollisions.length > 0) {
              // destroy collided rocks
              // set({ rocks: rocks.filter((value) => !rockCollisions.includes(value)) })

              audio.playAudio(audio.crash, 1, false)
              rockCollisions.forEach((u) => actions.world.removeRock(u.guid))
              actions.player.damage()
            }
          }

          addEffect(gameLoopEffect)
        }
      },
      player: {
        damage() {
          const { immunity, actions } = get()

          // spawn protection
          if (immunity === false) {
            const newHealth = Math.max(0, get().health - COLLISION_DAMAGE)
            set({ health: newHealth })
          }

          // death
          if (get().health <= 0) {
            actions.player.death()
          }
        },
        death() {
          const { actions, highScore, points } = get()
          actions.player.cancelAutofire()

          const isHighscore = points > highScore
          if (isHighscore) {
            localStorage.setItem("rylos-space-adventure-hiscore", points.toString())
            set({ highScore: points })
          }

          set({ menu: "dead", lastPoints: points, clock: null })
        },
        autofire: throttle((e) => {
          if (e && e.button === 0) {
            clearInterval(shootingTO)
            get().actions.player.fire()

            shootingTO = window.setInterval(() => {
              get().actions.player.fire()
            }, FIRING_DELAY)
          }
        }, FIRING_DELAY),
        cancelAutofire() {
          clearInterval(shootingTO)
        },
        fire() {
          set((state) => ({ lasers: [...state.lasers, Date.now()] }))
          clearTimeout(cancelLaserTO)
          cancelLaserTO = window.setTimeout(() => set((state) => ({ lasers: state.lasers.filter((t) => Date.now() - t <= 1000) })), 1000)
          audio.playAudio(audio.zap, 0.25)
        },
        move(movement: { x: number; y: number }) {
          get().mutation.mouse.set(movement.x - window.innerWidth / 2, movement.y - window.innerHeight / 2)
        }
      },
      world: {
        addRocks(amount: number) {
          const rocks = get().rocks
          rocks.push(...randomData(amount, track, 150, 8, () => 1 + Math.random() * 2.5))
          set({ rocks })
        },
        removeRock(guid: string) {
          const rocks = get().rocks
          const filteredRocks = rocks.filter((rock) => rock.guid !== guid)

          set({ rocks: filteredRocks })
        },
        addExplode(data: IObjectData) {
          const explosions = get().explosions
          set({ explosions: [...explosions, data] })
        },
        removeExplode(guid: string) {
          set({ explosions: get().explosions.filter((e) => e.guid !== guid) })
        },
        test(data: IObjectData) {
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
  }
})
