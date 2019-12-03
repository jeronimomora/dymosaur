import React from 'react'
import PayPalDonation from './PayPalDonation'
import '../css/NavBar.css'

export default () => (
    <div className="navbar">
        <PayPalDonation />
        <p className="navbar-text">Dymosaur</p>
    </div>
)
