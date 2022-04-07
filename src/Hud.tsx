import { useMemo, useEffect, Fragment } from "react"
import styled, { css, createGlobalStyle } from "styled-components"
import { useGameStore } from "./store"
import { Radio } from "./Menu/Radio"
import heartIcon from "./images/cardiogram.svg"
import heartbeat from "./audio/heartbeat.wav"
import garbage from "./images/garbage.svg"

const LOW_HEALTH_TRESHOLD = 50
const HEALTH_COLOR_LOW = "#c5411e"
const HEALTH_COLOR_NORMAL = "#008C20"
const HEALTH_COLOR_IMMUNITY = "blue"

const isLowHealth = (health: number) => health < LOW_HEALTH_TRESHOLD
const getHealthColor = (immunity: boolean, health: number) => {
  if (immunity) {
    return HEALTH_COLOR_IMMUNITY
  }
  if (isLowHealth(health)) {
    return HEALTH_COLOR_LOW
  }

  return HEALTH_COLOR_NORMAL
}

export default function Hud() {
  const points = useGameStore((state) => state.points)
  const immunity = useGameStore((state) => state.immunity)
  const health = useGameStore((state) => state.health)
  const score = useMemo(() => (points >= 1000 ? (points / 1000).toFixed(1) + "K" : points), [points])

  const lowHealth = isLowHealth(health)

  useEffect(() => {
    const audioElement = new Audio()
    audioElement.volume = 1
    audioElement.loop = true

    if (lowHealth) {
      audioElement.setAttribute("src", heartbeat)
      audioElement.load()
      audioElement.play()
    } else {
      audioElement.pause()
      audioElement.removeAttribute("src")
      audioElement.load()
    }
    return () => {
      audioElement.pause()
      audioElement.removeAttribute("src")
      audioElement.load()
    }
  }, [lowHealth])

  return (
    <Fragment>
      <UpperLeft>
        <HealthContainer>
          <img alt="Health" className={lowHealth ? "pulse" : ""} src={heartIcon} />
          <HealthValueContainer>
            <HealthValue health={health} healthColor={getHealthColor(immunity, health)}></HealthValue>
          </HealthValueContainer>
        </HealthContainer>
      </UpperLeft>
      <UpperRight>
        <a target="_blank" rel="noopener noreferrer" href="https://www.rylosplanet.fi/">
          Rylos Planet
        </a>
      </UpperRight>
      <LowerLeft>
        <Score>
          <img alt="Garbage" src={garbage} />
          <h1>{score}</h1>
        </Score>
      </LowerLeft>
      <Global />
      <LowerRight>
        <Radio />
      </LowerRight>
    </Fragment>
  )
}

const base = css`
  font-family: "Sedgwick Ave", sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: #9b51e0;
`

const Score = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 50px;
    margin-right: 2rem;
  }
`

const HealthContainer = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  background: #333;
  border: 2px solid #666;
  margin-top: 1rem;
  padding: 0.5rem;
  width: 100%;

  img {
    max-width: 45px;
    margin-right: 1rem;
  }
`

const HealthValueContainer = styled.div`
  flex-grow: 1;
  margin-right: 1rem;
`

const HealthValue = styled.div<{ healthColor: string; health: number }>`
  background: ${(p) => p.healthColor};
  color: white;
  overflow: hidden;
  transition: width 0.2s ease-in;
  width: ${(p) => p.health}%;
  height: 100%;
`

const UpperLeft = styled.div`
  ${base}
  top: 50px;
  left: 50px;
  font-size: 2em;
  transform: skew(5deg, 5deg);
  width: 250px;

  @media only screen and (max-width: 900px) {
    width: 200px;
    left: 20px;
    top: 20px;
    font-size: 1.5em;
  }
`

const UpperRight = styled.div`
  ${base}
  text-align: right;
  top: 50px;
  right: 50px;
  font-size: 2em;
  transform: skew(-5deg, -5deg);
  pointer-events: all;
  cursor: pointer;
  text-shadow: 1px 1px 1px rgba(0, 0, 0.5);

  * {
    cursor: pointer;
    pointer-events: all;
  }

  @media only screen and (max-width: 900px) {
    top: 55px;
    right: 30px;
    transform: none;
    font-size: 1.5em;
  }

  & > a {
    color: #9b51e0;
    text-decoration: none;
  }
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`

const LowerLeft = styled.div`
  ${base}
  bottom: 50px;
  left: 50px;
  transform: skew(-5deg, -5deg);
  text-shadow: 1px 1px 1px rgba(0, 0, 0.5);

  h1 {
    margin: 0;
    font-size: 4em;
    line-height: 1em;
  }
  @media only screen and (max-width: 900px) {
    left: 20px;
    bottom: 140px;
    h1 {
      font-size: 3em !important;
    }
  }
`

const LowerRight = styled.div`
  ${base}
  bottom: 50px;
  right: 50px;
  transform: skew(5deg, 5deg);

  * {
    cursor: pointer;
    pointer-events: all;
  }

  @media only screen and (max-width: 900px) {
    transform: none;
    bottom: 0;
    right: 0;
    width: 100%;
  }
`

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow: hidden;
  }

  #root {
    overflow: auto;
    padding: 0px;
  }

  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
    color: black;
    background: white;
  }
`
