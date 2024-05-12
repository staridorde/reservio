import React from 'react'
import Navbar from '../components/Navbar'
import ReserveForm from '../components/ReserveForm'

class Reserve extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <ReserveForm />
      </div>
    )
  }
}

export default Reserve
