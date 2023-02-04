import rewindIcon from "../images/rewind.svg"
import playIcon from "../images/play.svg"
import { soundTrack } from "../audio"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

export const Radio = () => {
  const initialIndex = Math.floor(Math.random() * (soundTrack.length - 1 - 0 + 1) + 0)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const songRef = useRef<HTMLAudioElement>(null)

  const currentTrack = soundTrack[currentIndex]

  // handle song change
  useEffect(() => {
    const newTrack = soundTrack[currentIndex]
    if (songRef.current) {
      // dispose previous
      songRef.current.removeAttribute("src")
      songRef.current.load()

      // load new
      songRef.current.setAttribute("src", newTrack.songSrc)
      songRef.current.load()
    }
  }, [currentIndex])

  const prev = () => {
    const cappedIndex = Math.max(currentIndex - 1, 0)
    const newIndex = currentIndex === cappedIndex ? soundTrack.length - 1 : cappedIndex
    setCurrentIndex(newIndex)
  }
  const next = () => {
    const cappedIndex = Math.min(currentIndex + 1, soundTrack.length - 1)
    const newIndex = currentIndex === cappedIndex ? 0 : cappedIndex
    setCurrentIndex(newIndex)
  }

  const toggle = () => {
    if (songRef.current) {
      const isPlaying = songRef.current.duration > 0 && !songRef.current.paused
      if (isPlaying) {
        songRef.current.pause()
      } else {
        songRef.current.play()
      }
    }
  }

  return (
    <RadioWrapper>
      <audio ref={songRef} autoPlay={true} loop>
        <source src={currentTrack.songSrc} />
      </audio>
      <RadioCover>
        <img alt="Album Cover" src={currentTrack.songCover} />
      </RadioCover>
      <RadioControls>
        <RadioTrack>
          <RadioTrackDetails>
            <span>{currentTrack?.songName}</span>
            <span className="last">{currentTrack?.songName}</span>
          </RadioTrackDetails>
        </RadioTrack>
        <RadioActions>
          <button>
            <img alt="Back" onClick={prev} src={rewindIcon} />
          </button>
          <button onClick={toggle}>
            <img alt="Play / Stop" src={playIcon} />
          </button>
          <button>
            <img alt="Next" onClick={next} src={rewindIcon} />
          </button>
        </RadioActions>
      </RadioControls>
    </RadioWrapper>
  )
}

const RadioWrapper = styled.div`
  width: 400px;
  max-width: 100%;
  background: linear-gradient(#4f0158, #000000);
  flex-direction: row;
  display: flex;
  padding: 10px;
  overflow: hidden;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.7);
  border-radius: 4px;

  * {
    cursor: pointer;
    pointer-events: all;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`

const RadioCover = styled.div`
  border: 2px solid orangered;
  overflow: hidden;
  height: 90px;
  width: 90px;
  margin-right: 1rem;
  img {
    height: 100%;
  }
`
const RadioControls = styled.div`
  flex-grow: 1;
`

const RadioTrack = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 0.5rem;
`

const RadioTrackDetails = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 2px;
  padding: 1rem 0.5rem;
  overflow: hidden;
  background: black;

  span {
    font-weight: 300;
    white-space: nowrap;
    padding-left: 100%;
    top: 8px;
    position: absolute;
    color: white;
    display: inline-block;
    animation: scroll-left 12s linear infinite;
  }
  span.last {
    animation-delay: 6s;
  }
`

const RadioActions = styled.div`
  button {
    border-radius: 1rem;
    background: transparent;
    width: 3.5rem;
    margin-right: 0.5rem;
    height: 2.5rem;
    border-color: orangered;
  }

  button:last-of-type img {
    width: 100%;
    transform: scaleX(-1);
  }

  button img {
    width: 100%;
    height: 100%;
  }
`
