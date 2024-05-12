import React, { useEffect, useState } from 'react'
import ReserveForm from '../components/ReserveForm'
import { TicketType } from '../enums/TicketType'

const Reserve: React.FC = () => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[] | []>([])

  useEffect(() => {
    fetch('http://localhost:8001/ticketTypes')
      .then((response: Response) => response.json())
      .then((data: TicketType[]) => {
        console.log('Response from server:', data)
        setTicketTypes(data)
      })
      .catch((error: Error) => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <div>
      <ReserveForm ticketTypes={ticketTypes} />
    </div>
  )
}

export default Reserve
