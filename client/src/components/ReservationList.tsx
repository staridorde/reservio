import React from 'react'

interface UserDetails {
  firstName: string
  lastName: string
}

interface ConcertDetails {
  name: string
  date: string
}

interface TicketTypeDetails {
  name: string
}

interface Reservation {
  _id: string
  userId: string
  concertId: string
  ticketTypeId: string
  numberOfTickets: number
  __v: number
  userDetails: UserDetails
  concertDetails: ConcertDetails
  ticketTypeDetails: TicketTypeDetails
}

interface ReservationListProps {
  reservations: Reservation[]
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  return (
    <div style={{ width: '40%' }}>
      {reservations.map((reservation) => (
        <div key={reservation._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', fontSize: '40px' }}>
          <h4>Reservation Details</h4>
          <p>Number of Tickets: {reservation.numberOfTickets}</p>
          <p>Name: {reservation.userDetails.firstName} {reservation.userDetails.lastName}</p>
          <p>Concert name: {reservation.concertDetails.name}</p>
          <p>Date: {reservation.concertDetails.date}</p>
          <p>Ticket Type: {reservation.ticketTypeDetails.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ReservationList
