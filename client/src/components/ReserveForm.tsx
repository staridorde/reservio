import React, { ChangeEvent, FormEvent, useState } from 'react'

import './ReserveForm.css'
import { TicketType } from '../enums/TicketType'
import { User } from '../enums/User'
import { Reservation } from '../enums/Reservation'
import { useLocation } from 'react-router-dom'

interface FormData {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  postalCode: string
  city: string
  country: string
  email: string
  confirmEmail: string
  numberOfTickets: number
  ticketTypeId: string
}

interface ReserveProps {
  ticketTypes: TicketType[],
  refetchReservations: Function
}

const ReserveForm: React.FC<ReserveProps> = ({ ticketTypes, refetchReservations }) => {
  const {
    state: {
      concert
    }
  } = useLocation()

  const [reservationToken, setReservationToken] = useState<string>('')

  const [formState, setFormState] = useState<FormData>({
    firstName: 'aas',
    lastName: 'das',
    company: 'dasd',
    address1: 'dasads',
    address2: 'daads',
    postalCode: 'dsadasd',
    city: 'dsasad',
    country: 'dsadsa',
    email: 'starcevic@untied',
    confirmEmail: 'starcevic@untied',
    numberOfTickets: 1,
    ticketTypeId: concert.ticketTypes[0].ticketTypeId || ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const extractUserData = function (formData: FormData):User {
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      address1: formData.address1,
      address2: formData.address2,
      postalCode: formData.postalCode,
      city: formData.city,
      country: formData.country,
      email: formData.email,
      confirmEmail: formData.confirmEmail
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user:User = extractUserData(formState)

    const userResponse = await fetch('http://localhost:8001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())

    const reservation:Reservation = {
      userId: userResponse._id,
      ticketTypeId: formState.ticketTypeId,
      concertId: concert._id,
      numberOfTickets: formState.numberOfTickets
    }

    fetch('http://localhost:8001/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    })
      .then(response => response.json())
      .then(response => {
        setReservationToken(response.token)
        refetchReservations()
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='form-item'>
        <label>
          First name:
        </label>
        <input type="text" name="firstName" className='form-input' value={formState.firstName} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Last name:
        </label>
        <input type="text" name="lastName" className='form-input' value={formState.lastName} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Company:
        </label>
        <input type="text" name="company" className='form-input' value={formState.company} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Address 1:
        </label>
        <input type="text" name="address1" className='form-input' value={formState.address1} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Address 2:
        </label>
        <input type="text" name="address2" className='form-input' value={formState.address2} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Postal code:
        </label>
        <input type="text" name="postalCode" className='form-input' value={formState.postalCode} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          City:
        </label>
        <input type="text" name="city" className='form-input' value={formState.city} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Country:
        </label>
        <input type="text" name="country" className='form-input' value={formState.country} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Email:
        </label>
        <input type="email" name="email" className='form-input' value={formState.email} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Confirm email:
        </label>
        <input type="email" name="confirmEmail" className='form-input' value={formState.confirmEmail} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Ticket type:
        </label>
        <select name="ticketTypeId" className='form-input' value={formState.ticketTypeId} onChange={handleChange}>
            {ticketTypes.map((ticketType: TicketType) => 
              <option key={ticketType._id} value={ticketType._id}>{ticketType.name}</option>
            )}
        </select>
      </div>
      <div className='form-item'>
        <label>
          Number of tickets:
        </label>
        <input type="number" min={0} name="numberOfTickets" className='form-input' value={formState.numberOfTickets} onChange={handleChange} />
      </div>
      <div className='form-item'>
        <label>
          Number of tickets:
        </label>
        <input type="number" min={0} name="numberOfTickets" className='form-input' value={formState.numberOfTickets} onChange={handleChange} />
      </div>
      {reservationToken ? (
        <div className='form-item'>
          <text>
            Your reservation token:
          </text>
          {/* <text>{reservationToken}</text> */}
          <textarea name="reservationToken" style={{ fontSize: '40px', height: '700px' }} value={reservationToken} readOnly />
        </div>
      ) : null}
      <button type="submit" className='form-submit'>Submit</button>
    </form>
  )
}

export default ReserveForm
