import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar () {
    <div className='navbar'>
        <div className='navbar-left'>
            <NavLink
            activeClassName='navbar__link--active'
            className='navbar__link'
            to='/'>
                Home
            </NavLink>
        </div>
    </div>
}

export default Navbar;
