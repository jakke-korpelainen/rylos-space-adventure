import zapAudio from './laser.mp3'
import engineAudio from './engine.mp3'
import engine2Audio from './engine2.mp3'
import warpAudio from './warp.mp3'
import clickAudio from './click.mp3'
import explosionAudio from './explosion.mp3'

import rylosFreakLustCover from '../images/rylos-freak-lust.png'
import rylosFreakLustSong from './rylos-freak-lust.mp3'

import rylosMisunderstoodCover from '../images/rylos-misunderstood.jpg'
import rylosMisunderstoodSong from './rylos-misunderstood.mp3'

import rylosRoadCover from '../images/rylos-road.png'
import rylosRoadSong from './rylos-road.mp3'

import rylosClimateCover from '../images/rylos-climate.jpg'
import rylosClimateSong from './rylos-climate.mp3'

import rylosBlackLiquidCover from '../images/rylos-black-liquid.jpg'
import rylosBlackLiquidSong from './rylos-black-liquid.mp3'

const mp3 = { explosion: explosionAudio }

const soundTrack = [
  { songName: 'Rylos - Freak Lust', songCover: rylosFreakLustCover, songSrc: rylosFreakLustSong },
  {
    songName: 'Rylos - Misunderstood',
    songCover: rylosMisunderstoodCover,
    songSrc: rylosMisunderstoodSong
  },
  {
    songName: 'Rylos - Road',
    songCover: rylosRoadCover,
    songSrc: rylosRoadSong
  },
  {
    songName: 'Rylos - Climate',
    songCover: rylosClimateCover,
    songSrc: rylosClimateSong
  },
  {
    songName: 'Rylos - Black Liquid',
    songCover: rylosBlackLiquidCover,
    songSrc: rylosBlackLiquidSong
  }
]

const zap = new Audio(zapAudio)
const engine = new Audio(engineAudio)
const engine2 = new Audio(engine2Audio)
const warp = new Audio(warpAudio)
const click = new Audio(clickAudio)
const explosion = new Audio(explosionAudio)

export { soundTrack, zap, engine, engine2, warp, click, explosion, mp3 }
