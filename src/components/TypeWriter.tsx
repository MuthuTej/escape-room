import { useEffect, useState } from "react"

const TypewriterText = ({ text = "ACCESSING DATABASE..." }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex(index + 1)
      }, 78) // typing speed
      return () => clearTimeout(timeout)
    }
  }, [index, text])

  const renderWithLineBreaks = (text: string) =>
    text.split("\n").map((line, i) => (
      <p key={i} className="mb-2">
        {line}
      </p>
    ))

  return (
    <div className="bg-black text-green-400 min-h-screen flex items-center justify-center px-4 w-6xl min-w-6xl">
      <div className="font-mono text-xl md:text-2xl leading-relaxed tracking-wide">
        {renderWithLineBreaks(displayedText)}
        <span className="animate-pulse">█</span>
      </div>
    </div>
  )
}

export default TypewriterText
