import React, { useMemo, useEffect } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import useStore from './store'
import { Radio } from './Radio'
import heartIcon from './images/cardiogram.png'
import heartbeat from './audio/heartbeat.wav'
import garbage from './images/garbage.svg'

export default function Hud() {
  const points = useStore((state) => state.points)
  const immunity = useStore((state) => state.immunity)
  const health = useStore((state) => state.health)
  const toggle = useStore((state) => state.actions.toggleSound)
  const score = useMemo(() => (points >= 1000 ? (points / 1000).toFixed(1) + 'K' : points), [points])

  const lowHealth = health < 50
  const healthColor = lowHealth ? 'red' : 'green'

  useEffect(() => {
    const audioElement = new Audio()
    audioElement.volume = 1
    audioElement.loop = true

    if (lowHealth) {
      audioElement.setAttribute('src', heartbeat)
      audioElement.load()
      audioElement.play()
    } else {
      audioElement.pause()
      audioElement.removeAttribute('src')
      audioElement.load()
    }
    return () => {
      audioElement.pause()
      audioElement.removeAttribute('src')
      audioElement.load()
    }
  }, [lowHealth])

  return (
    <>
      <UpperLeft onClick={() => toggle()}>
        <HealthContainer>
          <img className={lowHealth ? 'pulse' : ''} src={heartIcon} />
          <HealthValue style={{ backgroundColor: immunity ? 'blue' : healthColor, width: `${immunity ? 100 : health}%` }}>{health}%</HealthValue>
        </HealthContainer>
      </UpperLeft>
      <UpperRight>
        <a target="_blank" href="https://www.rylosplanet.fi/">
          Rylos Planet
        </a>
      </UpperRight>
      <LowerLeft>
        <Score>
          <img src={garbage} />
          <h1>{score}</h1>
        </Score>
      </LowerLeft>
      <Global />
      <LowerRight>
        <Radio />
      </LowerRight>
    </>
  )
}

const base = css`
  font-family: 'Sedgwick Ave', sans-serif;
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
  min-width: 10vw;
  margin-top: 1rem;
  padding: 0.5rem;
  max-width: 150px;

  img {
    max-width: 45px;
    margin-right: 1rem;
  }
`

const HealthValue = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem 0.5rem;
  background: green;
  color: white;
  overflow: hidden;
`

const UpperLeft = styled.div`
  ${base}
  top: 50px;
  left: 50px;
  font-size: 2em;
  transform: skew(5deg, 5deg);

  @media only screen and (max-width: 900px) {
    left: 20px;
    top: 20px;
    transform: none;
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
