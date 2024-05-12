import React, { ChangeEvent, FormEvent, useState } from 'react'

import './ReserveForm.css'
import { TicketType } from '../enums/TicketType'

interface FormState {
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
  ticketType: string
}

interface ReserveProps {
  ticketTypes: TicketType[]
}

const ReserveForm: React.FC<ReserveProps> = ({ ticketTypes }) => {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    postalCode: '',
    city: '',
    country: '',
    email: '',
    confirmEmail: '',
    ticketType: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch('http://localhost:8001/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
    console.log('Form submitted:', formState)
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
          Confirm email:
        </label>
        <select name="ticketType" className='form-input' value={formState.ticketType} onChange={handleChange}>
            {ticketTypes.map((ticketType: TicketType) => 
              <option key={ticketType._id} value={ticketType.name}>{ticketType.name}</option>  
            )}
        </select>
      </div>
      <button type="submit" className='form-submit'>Submit</button>
    </form>
  )
}

export default ReserveForm
