import { HowlOptions } from "howler"

export interface AudioAsset extends HowlOptions {
  seek?: number // The position to move current playback to (in seconds).
}
