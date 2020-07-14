import React from 'react';
import PayPalDonation from './PayPalDonation';
import NavButton from './NavButton';
import '../styles/NavBar.scss';

export default () => (
    <nav className="navbar">
        <p className="title">Dymosaur</p>
        <div className="button-group">
            <NavButton path="/" text="Home" />
            <NavButton path="/contact" text="Contact Us" />
            <PayPalDonation />
        </div>
    </nav>
);
