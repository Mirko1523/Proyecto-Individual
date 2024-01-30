import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

function Nav() {
    return ( 
        <div className="nav-div">
              
            <NavLink to='/'><button>Home</button></NavLink>
            <NavLink to='/About'><button>About</button></NavLink>
            <NavLink to='/crear'><button>Crear Juego</button></NavLink>
             
        </div> 
    )
}

export default Nav