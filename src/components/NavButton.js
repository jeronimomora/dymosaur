import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/NavButton.scss'

export default ({ path, text }) => (
    <NavLink exact to={path} className="nav-link" activeClassName="nav-link__active" >
        <button className="nav-button">
            {text}
        </button>
    </NavLink>
)
