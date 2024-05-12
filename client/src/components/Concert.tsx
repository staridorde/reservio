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
            <text>Naziv koncerta: {concert.name}</text>
            <text>Grad: {concert.city}</text>
            <text>Lokacija: {concert.location}</text>
            <text>Datumi odrzavanja: {concert.date}</text>
            <text>Dodatne informacije: {concert.additionalInfo}</text>
        </div>
    )
}

export default Concert