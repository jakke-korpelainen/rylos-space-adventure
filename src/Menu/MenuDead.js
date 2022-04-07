import { Menu, MenuActions, MenuActionItem } from "./Menu"
import styled from "styled-components"
import gameOver from "../audio/game-over.wav"
import highscoreIcon from "../images/award.svg"
import useStore from "../store"

export const MenuDead = () => {
  const highScore = useStore((state) => state.highScore)
  const lastPoints = useStore((state) => state.lastPoints)
  const reset = useStore((state) => state.actions.reset)

  return (
    <Menu>
      <audio autoPlay>
        <source src={gameOver} />
      </audio>
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
      <MenuActions>
        <MenuActionItem
          onClick={() => {
            new Audio(startAudio).play()
            reset()
          }}>
          Play Again
        </MenuActionItem>
      </MenuActions>
    </Menu>
  )
}

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
