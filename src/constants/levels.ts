
import level1 from '../assets/level1.jpeg'
import level2 from '../assets/level2.jpeg'
import level3 from '../assets/level3.jpeg'

export const LEVEL_PASSWORDS: { [key: number]: string } = {
  1: "100",
  2: "FC",
  3: "MCP",
}

export const LEVEL_RIDDLES: { [key: number]: string } = {
  1: "I can explain math questions!\nI can send emails!\nI can open files!",
  2: "Your task is to build a Homework Helper. Homework usually means reading and math.",
  3: "Without me, AI is all brain, no hands.",
}

export const LEVEL_HINTS: { [key: number]: string } = {
  1: "Two lies and one truth (think in binary)",
  2: "First letters may help",
  3: "Why you came here ",
}

export const LEVEL_SPRITES: { [key: number]: string } = {
  1: level1,
  2: level2,
  3: level3,
}
