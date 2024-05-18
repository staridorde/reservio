import React from 'react'
import ConcertContainer from '../containers/ConcertContainer'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const openEditReservationScreen = () => {
    navigate('/edit-reservation')
  }

  return (
    <div>
      <ConcertContainer />
      <div>
        <p>Already have reservation and want to edit it?</p>
        <button style={{fontSize: '40px'}} onClick={openEditReservationScreen}>Click here</button>
      </div>
    </div>
  )
}

export default Home
