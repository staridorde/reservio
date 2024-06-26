import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Concert as ConcertEnum } from '../enums/Concert';
import Concert from '../components/Concert';

const ConcertContainer = () => {
    const navigate = useNavigate()
    const [concerts, setConcerts] = useState<ConcertEnum[] | []>([])

    const handleReserve = (concert:ConcertEnum) => {
        navigate('/reservation', { state: { concert } })
    }

    useEffect(() => {
        fetch('http://localhost:8001/concert')
            .then(response => response.json())
            .then(concerts => setConcerts(concerts))
    }, [])

    return (
        <div style={{ paddingTop: 100 }}>
            {concerts.map((concert: ConcertEnum) => {
                return (
                    <Concert
                        concert={concert}
                        handleClick={() => handleReserve(concert)}
                    />
                )
            })}
        </div>
    )
}

export default ConcertContainer
