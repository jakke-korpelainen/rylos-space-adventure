import { Menu, MenuActions, MenuActionItem } from "./Menu"
import rylosLogo from "../images/rylos-logo.png"
import startAudio from "../audio/start.ogg"
import selectAudio from "../audio/select.wav"
import useStore from "../store"
import { Wave } from "../Wave"

export const MenuStart = () => {
  const actions = useStore((state) => state.actions)

  return (
    <Menu>
      <img id="logo" src={rylosLogo} />

      <Wave words={["Space", "Adventure"]} />

      <p>
        Humankind has been dumping trash in to the space for ages. Now the trash are returning to the earth. Only Ned the Carrot and his loyal spaceship can
        stop the earth from being trashed.
      </p>
      <MenuActions>
        <MenuActionItem
          onClick={() => {
            new Audio(startAudio).play()
            actions.menu.game()
          }}>
          Play
        </MenuActionItem>
        <MenuActionItem
          onClick={() => {
            new Audio(selectAudio).play()
            actions.menu.credits()
          }}>
          Credits
        </MenuActionItem>
      </MenuActions>
    </Menu>
  )
}
