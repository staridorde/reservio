import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Reserve from './pages/Reserve'

import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/reservation' element={<Reserve/>} />
        </Routes>
      </div>
    )
  }
}

export default App
