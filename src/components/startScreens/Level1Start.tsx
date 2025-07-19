import TypewriterText from "../TypeWriter"
const Level1Start = () => {
  const introText = `
LEVEL 1: THE APARTMENT
"Truth hides in the quietest rooms."

Dr. Aadhira  — brilliant, elusive, and now vanished.
Three days before unveiling a discovery that could shake global powers, she disappeared without a trace.

You're inside her last known digital echo — an encrypted replica of her personal space.
Layers of memory. Fragments of truth. Nothing is random here.

Your mission:
Decrypt the ordinary.
Uncover the anomaly.
Find what others missed.
`
  return (
    <div>
      <TypewriterText text={introText} />
    </div>
  )
}

export default Level1Start
