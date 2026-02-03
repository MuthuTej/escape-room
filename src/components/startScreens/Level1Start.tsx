import TypewriterText from "../TypeWriter"
const Level1Start = () => {
  const introText = `
THE TALKING BRAIN

“Hello… I’m Helper-Bot.
I was built to help people.
But something is wrong.
I can think, but I can’t help anyone.”

`
  return (
    <div>
      <TypewriterText text={introText} />
    </div>
  )
}

export default Level1Start
