import * as THREE from 'three'
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './3d/Stars'
import Planets from './3d/Planets'
import Effects from './3d/Effects'
import Particles from './3d/Particles'
import Rocks from './3d/Rocks'
import Explosions from './3d/Explosions'
import Track from './3d/Track'
import Ship from './3d/Ship'
import Rig from './3d/Rig'
import Hud from './Hud'
import useStore from './store'
import rylosLogo from './images/rylos-logo.png'
import styled, { css } from 'styled-components'
import gameOver from './audio/game-over.wav'
import { Menu, MenuAction } from './Menu'
import highscoreIcon from './images/award.svg'
import { engine, engine2 } from './audio'

export default function App() {
  const menu = useStore((state) => state.menu)

  if (menu === 'dead') {
    return <MenuDead />
  }

  if (menu === 'game') {
    return <MenuGame />
  }

  if (menu === 'credits') {
    return <MenuCredits />
  }

  return <MenuStart />
}

const MenuDead = () => {
  const highScore = useStore((state) => state.highScore)
  const lastPoints = useStore((state) => state.lastPoints)
  const reset = useStore((state) => state.actions.reset)

  useEffect(() => {
    const audioElement = new Audio()
    audioElement.setAttribute('src', gameOver)
    audioElement.play()

    return () => {
      audioElement.pause()
      audioElement.removeAttribute('src')
      audioElement.load()
    }
  })

  return (
    <Menu>
      <h1>Game Over</h1>
      <Scores>
        <p>Score: {lastPoints}</p>
        {highScore > 0 && <p>Highscore: {highScore}</p>}

        {lastPoints > 0 && lastPoints === highScore && (
          <Highscore>
            <img src={highscoreIcon} />
            <p>New highscore!</p>
          </Highscore>
        )}
      </Scores>

      <MenuAction onClick={reset}>Restart</MenuAction>
    </Menu>
  )
}

const MenuCredits = () => {
  const actions = useStore((state) => state.actions)

  return (
    <Menu>
      <MenuAction onClick={() => actions.menu.start()}>Back</MenuAction>
      <Credits>
        <h2>Credits</h2>
        <p>
          <a href="https://github.com/jakke-korpelainen/rylos-space-adventure">Source code</a>
        </p>
        <h3>Programming</h3>
        <p>
          <a href="https://jakke.fi">Jakke Korpelainen</a>
        </p>
        <p>
          Based on tremendous work of <a href="https://github.com/drcmda">drcmda</a>
        </p>
        <h3>Assets</h3>
        <p>
          Ship: <a href="https://sketchfab.com/themuffincoder">TheMuffinCoder</a>
        </p>
        <p>
          Rocks: <a href="https://sketchfab.com/dzemalmclaren">Dzemal Semanic</a>
        </p>
        <p>
          Crash sound created by <a href="https://freesound.org/s/95078/">sandyrb</a>
        </p>
        <h3>Music</h3>
        <p>
          <a href="https://www.rylosplanet.fi/">Rylos</a>
        </p>
      </Credits>
    </Menu>
  )
}

const MenuGame = () => {
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return () => {
      engine.pause()
      engine2.pause()
    }
  }, [])

  return (
    <Wrapper>
      <Loading style={!loading ? { opacity: 0, pointerEvents: 'none' } : {}}>
        <h1>Loading...</h1>
      </Loading>
      <GameControls
        onTouchMove={actions.onTouchMove}
        onPointerUp={actions.cancelAutofire}
        onPointerMove={actions.move}
        onPointerDown={(e) => {
          actions.move(e)
          actions.autofire(e)
        }}>
        <Canvas
          linear
          mode="concurrent"
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov }}
          onCreated={({ gl, camera }) => {
            actions.init(camera)
            gl.toneMapping = THREE.CineonToneMapping
            gl.setClearColor(new THREE.Color('#020209'))
            setLoading(false)
          }}>
          <fog attach="fog" args={['#070710', 100, 700]} />
          <ambientLight intensity={0.2} />
          <Stars />
          <Explosions />
          <Track />
          <Particles />
          <Suspense fallback={null}>
            <Rocks />
            <Planets />
            <Rig>
              <Ship />
            </Rig>
          </Suspense>
          <Effects />
        </Canvas>
        <Hud />
      </GameControls>
    </Wrapper>
  )
}

const MenuStart = () => {
  const actions = useStore((state) => state.actions)

  return (
    <Menu>
      <img src={rylosLogo} />

      <WaveWrapper>
        <WaveWord>
          <span>S</span>
          <span>p</span>
          <span>a</span>
          <span>c</span>
          <span>e</span>
        </WaveWord>
        <WaveWord>
          <span>A</span>
          <span>d</span>
          <span>v</span>
          <span>e</span>
          <span>n</span>
          <span>t</span>
          <span>u</span>
          <span>r</span>
          <span>e</span>
        </WaveWord>
      </WaveWrapper>

      <p>
        Humankind has been dumping trash in to the space for ages. Now the trash are returning to the earth. Only Ned the Carrot and his loyal spaceship can
        stop the earth from being trashed.
      </p>
      <MenuAction
        onClick={() => {
          actions.menu.game()
        }}>
        Play
      </MenuAction>
      <MenuAction
        onClick={() => {
          actions.menu.credits()
        }}>
        Credits
      </MenuAction>
    </Menu>
  )
}

const GameControls = styled.div`
  height: 100%;
`

const WaveWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const WaveWord = styled.h1`
  display: inline-block;

  &:first-of-type {
    margin-right: 2rem;
  }

  span {
    text-shadow: 2px 2px 5px #9b51e0;
    display: inline-block;
    animation: wave-text 1s ease-in-out infinite;
  }

  span:nth-of-type(1) {
    animation-delay: 0s;
  }
  span:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  span:nth-of-type(3) {
    animation-delay: 0.2s;
  }
  span:nth-of-type(4) {
    animation-delay: 0.3s;
  }
  span:nth-of-type(5) {
    animation-delay: 0.4s;
  }
  span:nth-of-type(6) {
    animation-delay: 0.5s;
  }
  span:nth-of-type(7) {
    animation-delay: 0.6s;
  }
  span:nth-of-type(8) {
    animation-delay: 0.7s;
  }
  span:nth-of-type(9) {
    animation-delay: 0.8s;
  }
`

const Scores = styled.div`
  > p {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  @media only screen and (max-width: 900px) {
    p {
      font-size: 1.2rem;
    }
  }
`

const Highscore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 45px;
    margin-right: 1rem;
  }

  p {
    white-space: nowrap;
    font-size: 2rem;
    text-align: center;
    color: goldenrod;
  }
`

const Wrapper = styled.div``

const Loading = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: opacity linear 2s;

  h1 {
    font-size: 3rem;
    color: white;
  }
`

const Credits = styled.div`
  width: 100%;
  margin-top: 2rem;

  a {
    color: white;
  }
`

export const baseCss = css`
  font-family: 'Sedgwick Ave', sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: #9b51e0;
`
