import React, { useEffect, useState } from 'react';
import api from '../../services/api'

import './style.css'

export default function Dashboard() {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        async function loadSpot() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data)
        }
        loadSpot();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={ { backgroundImage: `url(${spot.thumbnail_url})` } } />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}