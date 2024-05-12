import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ConcertContainer.css'

const ConcertContainer = () => {
    const navigate = useNavigate()

    const handleReserve = () => {
        navigate('/reservation')
    }

    return (
        <div className="container">
            <text>Naziv koncerta: Erros Ramazoti</text>
            <text>Grad: Beograd</text>
            <text>Lokacija: Beogradska Arena</text>
            <text>Datumi odrzavanja: 20,21,22 Jul 2024</text>
            <text>Dodatne informacije: dodjite da vas eros ramazotira</text>
            <button className='reserve-button' onClick={handleReserve}>Rezervisi</button>
        </div>
    )
}

export default ConcertContainer
