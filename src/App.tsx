
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Triggers from './tabs/Triggers'
import Config from './tabs/Config'
import './App.css'

export default function App() {

  return (
    <>
      <div>
        <h1>AutoTrigger</h1>
      </div>
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/triggers">Triggers</Link>
            <Link to="/config">Configure</Link>
          </nav>
          <Routes>
            <Route path="/triggers" element={<Triggers/>}/>
            <Route path="/config" element={<Config/>}/>
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}
