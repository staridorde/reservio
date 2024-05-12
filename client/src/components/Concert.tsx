import React from 'react'
import { Concert as ConcertEnum } from '../enums/Concert'

import './Concert.css'

interface ConcertProps {
    concert: ConcertEnum,
    handleClick: Function
}

const Concert: React.FC<ConcertProps> = ({concert, handleClick}) => {
    return (
        <div className="container" onClick={() => handleClick()}>
            <text className="text">Naziv koncerta: {concert.name}</text>
            <text className="text">Grad: {concert.city}</text>
            <text className="text">Lokacija: {concert.location}</text>
            <text className="text">Datumi odrzavanja: {concert.date}</text>
            <text className="text">Dodatne informacije: {concert.additionalInfo}</text>
        </div>
    )
}

export default Concert