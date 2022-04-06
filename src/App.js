import * as THREE from 'three'
import React, { Suspense } from 'react'
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
import useStore, { reset } from './store'
import rylosLogo from './images/rylos-logo.png'
import styled, { css } from 'styled-components'
import gameOver from './audio/game-over.wav'
import { useEffect } from 'react'

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

const Menu = (props) => {
  return (
    <MenuWrapper>
      <MenuContent>{props.children}</MenuContent>
    </MenuWrapper>
  )
}

const MenuDead = () => {
  const lastPoints = useStore((state) => state.lastPoints)

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
      <p>Score: {lastPoints}</p>
      <MenuAction onClick={reset}>Restart</MenuAction>
    </Menu>
  )
}

const MenuCredits = () => {
  const actions = useStore((state) => state.actions)

  return (
    <Menu>
      <MenuAction onClick={() => actions.menu()}>Back</MenuAction>
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
          <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">
            Heart icons created by Freepik - Flaticon
          </a>
        </p>
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

  return (
    <div onPointerMove={actions.updateMouse} onClick={actions.shoot}>
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
        }}>
        <fog attach="fog" args={['#070710', 100, 700]} />
        <ambientLight intensity={0.25} />
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
    </div>
  )
}

const MenuStart = () => {
  const actions = useStore((state) => state.actions)

  return (
    <Menu>
      <img src={rylosLogo} />
      <h1>Space Adventure</h1>
      <p>
        Humankind has been dumping trash in to the space for ages. Now the trash are returning to the earth. Only Ned the Carrot and his loyal spaceship can
        stop the earth from being trashed.
      </p>
      <MenuAction
        onClick={() => {
          actions.start()
        }}>
        Play
      </MenuAction>
      <MenuAction
        onClick={() => {
          actions.credits()
        }}>
        Credits
      </MenuAction>
    </Menu>
  )
}

const MenuAction = styled.button`
  border: 3px solid orangered;
  pointer-events: all;
  background: linear-gradient(#4f0158, #000000);
  cursor: pointer;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 3rem;
  font-family: 'Sedgwick Ave';
  min-width: 300px;
  padding: 0 2rem;
  margin-top: 1rem;

  @media only screen and (max-width: 900px) {
    font-size: 2rem;
  }
`

const Credits = styled.div`
  width: 100%;
  margin-top: 2rem;

  a {
    color: white;
  }
`

const MenuWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center 10%;
  background-color: #16161d;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;

  h1 {
    font-size: 6rem;
    font-family: 'Sedgwick Ave';
    text-transform: uppercase;
    margin-bottom: 0;
    margin-top: 0;
    text-align: center;
  }

  h1 + p {
    font-size: 2rem;
    width: 1200px;
    max-width: 100%;
    text-align: center;
    margin-bottom: 5rem;
    margin-top: 0;
  }

  @media only screen and (max-width: 900px) {
    h1 {
      font-size: 2.5rem;
    }
    h1 + p {
      font-size: 1.2rem;
    }
  }
`

const MenuContent = styled.div`
  height: 100%;
  min-width: 80vw;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
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
