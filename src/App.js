import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './3d/Stars'
import Planets from './3d/Planets'
import Effects from './3d/Effects'
import Particles from './3d/Particles'
// import Enemies from './3d/Enemies'
import Rocks from './3d/Rocks'
import Explosions from './3d/Explosions'
// import Rings from './3d/Rings'
import Track from './3d/Track'
import Ship from './3d/Ship'
import Rig from './3d/Rig'
import Hud from './Hud'
import useStore, { reset } from './store'
import rylosLogo from './images/rylos-logo.png'
import { css } from 'styled-components'

const Menu = (props) => {
  return (
    <div id="menu">
      <div id="menu-content">{props.children}</div>
    </div>
  )
}

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

export default function App() {
  const menu = useStore((state) => state.menu)
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)

  if (menu === 'dead') {
    return (
      <Menu>
        <h1>Game Over</h1>
        <button id="menu-action" onClick={reset}>
          Restart
        </button>
      </Menu>
    )
  }

  if (menu === 'game') {
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
          {/* <Rings /> */}
          <Suspense fallback={null}>
            <Rocks />
            <Planets />
            {/* <Enemies /> */}
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

  return (
    <Menu>
      <img src={rylosLogo} />
      <h1>Space Adventure</h1>
      <button
        onClick={() => {
          actions.start()
        }}
        id="menu-action">
        Play
      </button>
    </Menu>
  )
}
