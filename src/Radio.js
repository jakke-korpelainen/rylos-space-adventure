import rewindIcon from './images/rewind.svg'
import playIcon from './images/play.svg'
import React from 'react'
import { soundTrack } from './audio'
import { useEffect, useState } from 'react'

export const Radio = () => {
  const [currentSoundtrackIndex, setCurrentSoundtrackIndex] = useState(0)
  const audioElement = useState(new Audio(soundTrack[currentSoundtrackIndex].songSrc))[0]
  const currentTrack = soundTrack[currentSoundtrackIndex]

  useEffect(() => {
    audioElement.play()
  }, [])

  useEffect(() => {
    audioElement.pause()
    audioElement.setAttribute('src', soundTrack[currentSoundtrackIndex].songSrc)
    audioElement.load()
    audioElement.play()
  }, [currentSoundtrackIndex])

  const prev = () => setCurrentSoundtrackIndex(Math.max(currentSoundtrackIndex - 1, 0))
  const next = () => setCurrentSoundtrackIndex(Math.min(currentSoundtrackIndex + 1, soundTrack.length - 1))

  const toggle = () => {
    const isPlaying = audioElement.duration > 0 && !audioElement.paused
    if (isPlaying) {
      audioElement.pause()
    } else {
      audioElement.play()
    }
  }

  return (
    <div id="radio">
      <div id="top-row">
        <div id="now-playing">
          <span>{currentTrack ? currentTrack.songName : '- Not playing -'}</span>
        </div>
      </div>
      <div id="radio-actions">
        <button>
          <img onClick={prev} src={rewindIcon} />
        </button>
        <button onClick={toggle}>
          <img src={playIcon} />
        </button>
        <button>
          <img onClick={next} src={rewindIcon} />
        </button>
      </div>
    </div>
  )
}
