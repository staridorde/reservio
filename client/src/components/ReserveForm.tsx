import React, { ChangeEvent, FormEvent, useState } from 'react'

import './ReserveForm.css'

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

const ReserveForm: React.FC = () => {
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
    ticketType: 'prvi'
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
    // Do something with the form data, e.g., send it to the server
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
            <option value="prvi">prvi</option>
            <option value="drugi">drugi</option>
            <option value="treci">treci</option>
        </select>
      </div>
      <button type="submit" className='form-submit'>Submit</button>
    </form>
  )
}

export default ReserveForm
