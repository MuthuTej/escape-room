import TypewriterText from "../TypeWriter"
const Level2Start = () => {
  const introText = `
LEVEL 2: : THE TOOL ROOM

AI can THINK and TALK, but it cannot ACT on its own.
“If I had the right tools,
I could finally help humans!”

`
  return (
    <div>
      <TypewriterText text={introText} />
    </div>
  )
}

export default Level2Start
