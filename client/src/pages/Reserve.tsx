import React, { useEffect, useState } from 'react'
import ReserveForm from '../components/ReserveForm'
import { TicketType } from '../enums/TicketType'
import { useLocation } from 'react-router-dom'
import ReservationList from '../components/ReservationList'

import './Reserve.css'

const Reserve: React.FC = () => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[] | []>([])
  const [reservations, setReservations] = useState([])
  const {
    state: {
      concert
    }
  } = useLocation()

  const fetchTicketTypes = () => {
    fetch('http://localhost:8001/ticketTypes')
      .then((response: Response) => response.json())
      .then((data: TicketType[]) => {
        console.log('Response from server:', data)
        setTicketTypes(data)
      })
      .catch((error: Error) => {
        console.error('Error:', error)
      })
  }

  const fetchReservations = () => {
    fetch(`http://localhost:8001/reservation?concertId=${concert._id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(reservations => setReservations(reservations))
  }

  useEffect(() => {
    fetchTicketTypes()
    fetchReservations()
  }, [])

  return (
    <div className='page'>
      <ReserveForm ticketTypes={ticketTypes} refetchReservations={fetchReservations} />
      <ReservationList reservations={reservations} />
    </div>
  )
}

export default Reserve
