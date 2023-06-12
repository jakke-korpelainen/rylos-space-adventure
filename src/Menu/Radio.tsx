import rewindIcon from "../images/rewind.svg"
import playIcon from "../images/play.svg"
import { playAudio, Soundtrack } from "../audio"
import { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"

const randomIndex = Math.floor(Math.random() * Object.keys(Soundtrack).length)

export const Radio = () => {
  const [muted, setMuted] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(randomIndex)

  const currentSong = useMemo(
    () => Object.values(Soundtrack)[currentSongIndex],
    [currentSongIndex]
  )

  const toggle = () => setMuted(!muted)

  const prev = useCallback(() => {
    const cappedIndex = Math.max(currentSongIndex - 1, 0)
    const newIndex =
      currentSongIndex === cappedIndex
        ? Object.keys(Soundtrack).length - 1
        : cappedIndex
    setCurrentSongIndex(newIndex)
  }, [currentSongIndex, setCurrentSongIndex])

  const next = useCallback(() => {
    const cappedIndex = Math.min(
      currentSongIndex + 1,
      Object.keys(Soundtrack).length - 1
    )
    const newIndex = currentSongIndex === cappedIndex ? 0 : cappedIndex
    setCurrentSongIndex(newIndex)
  }, [currentSongIndex, setCurrentSongIndex])

  useEffect(() => {
    if (currentSong) {
      playAudio(currentSong)
    }
    return () => {
      Howler.stop()
    }
  }, [currentSong])

  useEffect(() => {
    Howler.mute(muted)
  }, [muted])

  console.log("Radio: Rendering")

  return (
    <RadioWrapper>
      <RadioCover>
        <img alt="Album Cover" src={currentSong.album} />
      </RadioCover>
      <RadioControls>
        <RadioTrack>
          <RadioTrackDetails>
            <span>{currentSong?.name}</span>
            <span className="last">{currentSong?.name}</span>
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
