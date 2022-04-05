import React, { useMemo, useRef, useEffect } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import useStore from './store'
import { Radio } from './Radio'

export default function Hud() {
  const points = useStore((state) => state.points)
  const immunity = useStore((state) => state.immunity)
  const health = useStore((state) => state.health)
  const sound = useStore((state) => state.sound)
  const toggle = useStore((state) => state.actions.toggleSound)
  const score = useMemo(() => (points >= 1000 ? (points / 1000).toFixed(1) + 'K' : points), [points])

  return (
    <>
      <UpperLeft onClick={() => toggle()}>
        <div id="health-container">
          <div id="health-value" style={{ backgroundColor: immunity ? 'blue' : 'green', width: `${immunity ? 100 : health}%` }}>
            {immunity ? `Shield` : `HP ${health}%`}
          </div>
        </div>
      </UpperLeft>
      <UpperRight>
        <a target="_blank" href="https://www.rylosplanet.fi/">
          Rylos Planet
        </a>
      </UpperRight>
      <LowerLeft>
        <h1>{score}</h1>
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

const UpperLeft = styled.div`
  ${base}
  top: 40px;
  left: 50px;
  font-size: 2em;
  transform: skew(5deg, 5deg);
  pointer-events: all;
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`

const UpperRight = styled.div`
  ${base}
  text-align: right;
  top: 40px;
  right: 50px;
  font-size: 2em;
  transform: skew(-5deg, -5deg);
  pointer-events: all;
  cursor: pointer;
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
  width: 200px;
  & > h1 {
    margin: 0;
    font-size: 6em;
    line-height: 1em;
  }
  & > h2 {
    margin: 0;
    font-size: 4em;
    line-height: 1em;
  }
  @media only screen and (max-width: 900px) {
    bottom: 30px;
    & > h1 {
      font-size: 6em !important;
    }
    & > h2 {
      font-size: 3em !important;
    }
  }
`

const LowerRight = styled.div`
  ${base}
  bottom: 50px;
  right: 50px;
  transform: skew(5deg, 5deg);
  background: black;

  @media only screen and (max-width: 900px) {
    bottom: 50px;
    height: 40px;
    width: 150px;
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
