import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/reservation' element={<About/>} />
        </Routes>
      </div>
    )
  }
}

export default App
