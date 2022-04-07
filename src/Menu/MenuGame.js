import Hud from "./Hud"
import Stars from "../3d/Stars"
import Planets from "../3d/Planets"
import Effects from "../3d/Effects"
import Particles from "../3d/Particles"
import Rocks from "../3d/Rocks"
import Explosions from "../3d/Explosions"
import Track from "../3d/Track"
import Ship from "../3d/Ship"
import Rig from "../3d/Rig"
import { Canvas } from "@react-three/fiber"
import React, { Suspense, useState, useEffect } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { engine, engine2, warp } from "../audio"
import useStore from "../store"

export const MenuGame = () => {
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return () => {
      engine.pause()
      engine2.pause()
      warp.pause()
    }
  }, [])

  return (
    <Wrapper>
      <Loading style={!loading ? { opacity: 0, pointerEvents: "none" } : {}}>
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
            gl.setClearColor(new THREE.Color("#020209"))

            setTimeout(() => {
              setLoading(false)
            }, 500)
          }}>
          <fog attach="fog" args={["#070710", 100, 700]} />
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

const Wrapper = styled.div`
  height: 100%;
`

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

const GameControls = styled.div`
  height: 100%;
`
