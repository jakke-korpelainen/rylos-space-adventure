import { Howl } from "howler"
import { AudioAsset } from "./types/AudioAsset"

enum AUDIO_NAMES {
  GAME_OVER = "GAME_OVER",
  START = "START",
  SELECT = "SELECT",
  HEARTBEAT = "HEARTBEAT",
  AMBIENCE = "AMBIENCE",
  CRASH = "CRASH",
  EXPLOSION = "EXPLOSION",
  LASER = "LASER",
  ENGINE = "ENGINE",
  ENGINE2 = "ENGINE2",
  CLICK = "CLICK"
}

export enum SOUNDTRACK {
  BLACK_LIQUID = "BLACK_LIQUID",
  CLIMATE = "CLIMATE",
  ROAD = "ROAD",
  MISUNDERSTOOD = "MISUNDERSTOOD",
  ICEBREAKER = "ICEBREAKER",
  HIGHWAY_OF_LOVE = "HIGHWAY_OF_LOVE",
  FREAK_LUST = "FREAK_LUST"
}

export const AudioList: Record<AUDIO_NAMES, AudioAsset> = {
  GAME_OVER: { src: "/rylos-space-adventure/audio/game-over.mp3" },
  START: { src: "/rylos-space-adventure/audio/start.mp3" },
  SELECT: { src: "/rylos-space-adventure/audio/select.mp3" },
  HEARTBEAT: { src: "/rylos-space-adventure/audio/heartbeat.mp3" },
  AMBIENCE: { src: "/rylos-space-adventure/audio/bg.mp3" },
  CRASH: { src: "/rylos-space-adventure/audio/crash.mp3", volume: 0.7 },
  EXPLOSION: {
    src: "/rylos-space-adventure/audio/explosion.mp3",
    volume: 0.1
  },
  LASER: { src: "/rylos-space-adventure/audio/laser.mp3", volume: 0.22 },
  ENGINE: {
    src: "/rylos-space-adventure/audio/engine.mp3",
    volume: 0.4,
    loop: true
  },
  ENGINE2: {
    src: "/rylos-space-adventure/audio/engine2.mp3",
    volume: 0.4,
    loop: true
  },
  CLICK: { src: "/rylos-space-adventure/audio/click.mp3" }
}

export const Soundtrack: Record<
  SOUNDTRACK,
  AudioAsset & { album: string; name: string }
> = {
  BLACK_LIQUID: {
    volume: 0.7,
    name: "Rylos - Black Liquid",
    src: "/rylos-space-adventure/soundtrack/rylos-black-liquid.mp3",
    album: "/rylos-space-adventure/album/rylos-black-liquid.jpg"
  },
  CLIMATE: {
    volume: 0.66,
    name: "Rylos - Climate",
    src: "/rylos-space-adventure/soundtrack/rylos-climate.mp3",
    album: "/rylos-space-adventure/album/rylos-climate.jpg"
  },
  ROAD: {
    volume: 0.7,
    name: "Rylos - Road",
    src: "/rylos-space-adventure/soundtrack/rylos-road.mp3",
    album: "/rylos-space-adventure/album/rylos-road.png"
  },
  MISUNDERSTOOD: {
    volume: 0.7,
    name: "Rylos - Misunderstood",
    src: "/rylos-space-adventure/soundtrack/rylos-misunderstood.mp3",
    album: "/rylos-space-adventure/album/rylos-misunderstood.jpg"
  },
  ICEBREAKER: {
    volume: 0.7,
    name: "Rylos - Icebreaker",
    src: "/rylos-space-adventure/soundtrack/rylos-icebreaker.mp3",
    album: "/rylos-space-adventure/rylos-logo.png"
  },
  HIGHWAY_OF_LOVE: {
    volume: 0.66,
    name: "Rylos - Highway of Love",
    src: "/rylos-space-adventure/soundtrack/rylos-highway-of-love.mp3",
    album: "/rylos-space-adventure/album/rylos-highway-of-love.jpg"
  },
  FREAK_LUST: {
    volume: 0.7,
    name: "Rylos - Freak Lust",
    src: "/rylos-space-adventure/soundtrack/rylos-freak-lust.mp3",
    album: "/rylos-space-adventure/album/rylos-freak-lust.png"
  }
}

Howler.volume(0.5)

export function playAudio(asset: AudioAsset) {
  const { seek, ...howlOptions } = asset

  const howl = new Howl({ ...howlOptions, preload: true })

  if (asset.autoplay !== false) {
    const id = howl.play()
    if (seek) {
      howl.seek(seek, id)
    }
  }

  console.log(
    `AUDIO: ${asset.autoplay !== false ? "Playing" : "Created"} audio ${
      asset.src
    }.`
  )

  return howl
}
