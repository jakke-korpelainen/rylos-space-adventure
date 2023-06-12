import { Menu, MenuActions, MenuActionItem } from "./Menu"

import { useGameStore } from "../store"
import { Wave } from "../Wave"
import { AudioList, playAudio } from "../audio"

export const MenuStart = () => {
  const actions = useGameStore((state) => state.actions)

  return (
    <Menu>
      <img alt="Rylos" id="logo" src="/rylos-space-adventure/rylos-logo.png" />
      <Wave words={["Space", "Adventure"]} />
      <p>
        Humankind has been dumping trash in to the space for ages. Now the trash
        are returning to the earth. Only Ned the Carrot and his loyal spaceship
        can stop the earth from being trashed.
      </p>
      <MenuActions>
        <MenuActionItem
          onClick={() => {
            playAudio(AudioList.START)
            actions.game.start()
          }}>
          Play
        </MenuActionItem>
        <MenuActionItem
          onClick={() => {
            playAudio(AudioList.SELECT)
            actions.game.credits()
          }}>
          Credits
        </MenuActionItem>
      </MenuActions>
    </Menu>
  )
}
