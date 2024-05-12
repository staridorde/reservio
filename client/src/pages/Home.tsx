import React from 'react'
import Navbar from '../components/Navbar'
import ConcertContainer from '../containers/ConcertContainer'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <ConcertContainer />
      </div>
    )
  }
}

export default Home
