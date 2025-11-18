import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import RailFence from './pages/RailFence'
import Playfair from './pages/Playfair'
import Vigenere from './pages/Vigenere'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rail-fence" element={<RailFence />} />
          <Route path="/playfair" element={<Playfair />} />
          <Route path="/vigenere" element={<Vigenere />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

