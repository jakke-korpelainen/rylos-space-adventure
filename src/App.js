import React from "react"
import useStore from "./store"
import { css } from "styled-components"
import { MenuStart } from "./Menu/MenuStart"
import { MenuDead } from "./Menu/MenuDead"
import { MenuGame } from "./Menu/MenuGame"
import { MenuCredits } from "./Menu/MenuCredits"

export default function App() {
  const menu = useStore((state) => state.menu)

  if (menu === "dead") {
    return <MenuDead />
  }

  if (menu === "game") {
    return <MenuGame />
  }

  if (menu === "credits") {
    return <MenuCredits />
  }

  return <MenuStart />
}

export const baseCss = css`
  font-family: "Sedgwick Ave", sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: #9b51e0;
`
