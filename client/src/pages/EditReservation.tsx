import React, { useState } from 'react'

const EditReservation = () => {
  const [token, setToken] = useState('')
  const [reservation, setReservation] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    numberOfTickets: '',
    // other fields
  })

  const handleTokenChange = (e:any) => {
    setToken(e.target.value)
  }

  const handleVerifyToken = async () => {
    setLoading(true)
    setError('')
    fetch(`http://localhost:8001/reservation/withToken?token=${token}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setReservation(data)
            setFormData({
                numberOfTickets: data.numberOfTickets,
                // other fields
            })
        })
        .catch(error => {
            setError('Invalid token or error fetching reservation.')
        })
        .finally(() => {
            setLoading(false)
        })
  }

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    fetch(`http://localhost:8001/reservation`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservationId: reservation._id,
            updates: formData
        })
    })
        .then(response => response.json())
        .then(data => {
            alert('Reservation updated successfully')      
        })
        .catch(error => {
            setError('Error updating reservation.')
        })
        .finally(() => {
            setLoading(false)
        })
  }

  return (
    <div>
      {!reservation ? (
        <div style={{fontSize: '40px'}}>
          <h2>Enter Token to Edit Reservation</h2>
          <input type="text" style={{fontSize: '40px'}} value={token} onChange={handleTokenChange} />
          <button onClick={handleVerifyToken} style={{fontSize: '40px'}} disabled={loading}>
            Verify
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Edit Reservation</h2>
          <form>
            <div>
              <label>Number of Tickets</label>
              <input
                type="number"
                name="numberOfTickets"
                value={formData.numberOfTickets}
                onChange={handleChange}
                style={{fontSize: '40px'}}
              />
            </div>
            {/* other fields */}
            <button type="button" style={{fontSize: '40px'}} onClick={handleSave} disabled={loading}>
              Save
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  )
}

export default EditReservation
