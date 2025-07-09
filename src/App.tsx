import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartScreen from './screens/StartScreen'
import ExperienceScreen from './screens/ExperienceScreen'
import ResultScreen from './screens/ResultScreen'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/experience" element={<ExperienceScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </Router>
  )
}

export default App
