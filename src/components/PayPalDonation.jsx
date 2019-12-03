import React from 'react'
import '../css/PayPalDonation.css'

export default function PayPalDonation() {
    return (
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_donations" />
            <input type="hidden" name="business" value={process.env.REACT_APP_DONATION_EMAIL} />
            <input type="hidden" name="item_name" value="Thank you for helping maintain this service!" />
            <input type="hidden" name="currency_code" value="USD" />
            <button className="donation">Support this app!</button>
        </form>
    )
}
