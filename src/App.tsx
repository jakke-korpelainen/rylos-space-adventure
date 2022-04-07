import { useGameStore } from "./store"
import { css, createGlobalStyle } from "styled-components"
import { MenuStart } from "./Menu/MenuStart"
import { MenuDead } from "./Menu/MenuDead"
import { Game } from "./Game"
import { MenuCredits } from "./Menu/MenuCredits"

import fontCantarell from "./fonts/Cantarell-Regular.woff2"
import fontSedgwickAve from "./fonts/SedgwickAve-Regular.woff2"

export default function App() {
  const menuState = useGameStore((state) => state.menu)

  let menu = <MenuStart />

  if (menuState === "dead") {
    menu = <MenuDead />
  }
  if (menuState === "game") {
    menu = <Game />
  }
  if (menuState === "credits") {
    menu = <MenuCredits />
  }

  return (
    <>
      <GlobalStyles />
      {menu}
    </>
  )
}

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    cursor: none;
  }

  @font-face {
    font-family: 'Sedgwick Ave';
    src: url(${fontSedgwickAve}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Cantarell';
    src: url(${fontCantarell}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Cantarell';
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Sedgwick Ave';
  }

  .pulse {
    transform: scale(1);
    animation: pulse 0.525s infinite;
  }

  @keyframes wave-text{
    00%{
      transform: translateY(0em);
    }
    60%{
      transform: translateY(-0.1em);
    }
    100%{
      transform: translateY(0em);
    }
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.75);
    }

    70% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.75);
    }
  }
`

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
