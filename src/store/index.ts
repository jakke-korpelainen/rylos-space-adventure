import { Curves } from "three/examples/jsm/curves/CurveExtras"
import { addEffect, Camera } from "@react-three/fiber"
import create from "zustand"
import { AudioList, playAudio } from "../audio"
import throttle from "lodash.throttle"
import { GameState } from "../types/GameState"
import * as THREE from "three"
import { createInitialValues, randomData } from "./utils"
import { ObjectData } from "../types/ObjectData"
import { GameLoopParams } from "../types/GameLoopParams"

const COLLISION_DAMAGE = 20
const SPAWN_PROTECTION_DURATION = 3000 // ms
const DIFFICULTY_INCREASE_INTERVAL = 15 // seconds
const MAXIMUM_TRAVEL_SPEED = 10000
const FIRING_DELAY = 200 // 300 rpm

export const useGameStore = create<GameState>((set, get) => {
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
          const initialValues = createInitialValues(track)
          set({ ...initialValues, menu: "game" })
        },
        loop: (state: GameLoopParams) => {
          const { mutation, clock, actions } = state

          // increase travel speed every (n) seconds overtime with a hard cap at very difficult
          const time = Date.now()
          const difficultyLevel =
            clock.getElapsedTime() / DIFFICULTY_INCREASE_INTERVAL
          const difficultyModifier = 40 - difficultyLevel
          const looptime = Math.max(
            difficultyModifier * 1000,
            MAXIMUM_TRAVEL_SPEED
          )
          const t = (mutation.t =
            ((time - mutation.startTime!) % looptime) / looptime)

          mutation.position = track.parameters.path.getPointAt(t)
          mutation.position.multiplyScalar(mutation.scale)

          // test for wormhole/warp
          let warping = false
          if (t > 0.3 && t < 0.4) {
            if (!warping) {
              warping = true
            }
          } else if (t > 0.5) {
            warping = false
          }

          // test for hits
          const { rocks } = get()
          const r = rocks.filter(actions.world.test)
          mutation.hits = r.length

          /*
            // DISABLED for now
            const previous = mutation.hits

            // targeting crosshair is on top of something to hit
            if (previous === 0 && mutation.hits) {
              playAudio(AudioList.CLICK)
            }
          */

          // handle laser hits
          const lasers = get().lasers
          if (
            mutation.hits &&
            lasers.length &&
            time - lasers[lasers.length - 1] < 100
          ) {
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
            rockCollisions.forEach((u) => actions.world.removeRock(u.guid))
            actions.player.damage()
          }
        },
        init: (camera: Camera) => {
          set({ camera, clock: new THREE.Clock(true) })
          const { clock, immunity, mutation, actions } = get()

          // get highscore from storage
          const sessionHighscore = localStorage.getItem(
            "rylos-space-adventure-hiscore"
          )
          if (sessionHighscore && Number(sessionHighscore)) {
            set({ highScore: Number(sessionHighscore) })
          }

          // add rocks to world
          actions.world.addRocks(100)

          mutation.t = 0
          mutation.startTime = Date.now()
          playAudio(AudioList.ENGINE)
          playAudio(AudioList.ENGINE2)

          if (immunity && immunityTO === undefined) {
            window.setTimeout(
              () => set({ immunity: false }),
              SPAWN_PROTECTION_DURATION
            )
          }

          const loopState = {
            actions,
            clock: clock!,
            mutation
          }

          const loopFn: any = () => void actions.game.loop(loopState)

          addEffect(loopFn)
        }
      },
      player: {
        damage() {
          const { immunity, actions, health } = get()

          // spawn protection
          if (immunity === false) {
            const newHealth = Math.max(0, health - COLLISION_DAMAGE)
            set({ health: newHealth })
            playAudio(AudioList.CRASH)
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
            localStorage.setItem(
              "rylos-space-adventure-hiscore",
              points.toString()
            )
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
          cancelLaserTO = window.setTimeout(
            () =>
              set((state) => ({
                lasers: state.lasers.filter((t) => Date.now() - t <= 1000)
              })),
            1000
          )
          playAudio(AudioList.LASER)
        },
        move(movement: { x: number; y: number }) {
          get().mutation.mouse.set(
            movement.x - window.innerWidth / 2,
            movement.y - window.innerHeight / 2
          )
        }
      },
      world: {
        addRocks(amount: number) {
          const rocks = get().rocks
          rocks.push(
            ...randomData(amount, track, 150, 8, () => 1 + Math.random() * 2.5)
          )
          set({ rocks })
        },
        removeRock(guid: string) {
          const rocks = get().rocks
          const filteredRocks = rocks.filter((rock) => rock.guid !== guid)

          set({ rocks: filteredRocks })
        },
        addExplode(data: ObjectData) {
          const explosions = get().explosions
          set({ explosions: [...explosions, data] })
        },
        removeExplode(guid: string) {
          set({ explosions: get().explosions.filter((e) => e.guid !== guid) })
        },
        test(data: ObjectData) {
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
