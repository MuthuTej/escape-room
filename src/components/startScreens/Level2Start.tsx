import TypewriterText from "../TypeWriter"
const Level2Start = () => {
  const introText = `
LEVEL 2: THE LAB TERMINAL
"Memories don't forget — even when people do."

You've successfully cracked the surface.  
Now, you're deeper inside — within Dr. Aadhira's personal computer.  
This is no ordinary system. It's a maze of prototypes, AI models, and secrets sealed in silence.

One folder stands out: "nebule" — encrypted, isolated, and unbreakable without a key.

Her routines, her legacy, her regrets… they echo across this terminal.  
Somewhere in this digital mind is the password — hidden not in code,  
but in the one day she could never forget.

Your mission:  
Trace the emotion.  
Follow the pattern.  
Unlock the source.
`
  return (
    <div>
      <TypewriterText text={introText} />
    </div>
  )
}

export default Level2Start
