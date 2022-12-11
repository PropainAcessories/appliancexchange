import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar () {
    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <NavLink
                activeClassName='navbar__link--active'
                className='navbar__link'
                to='/'>
                    Home
                </NavLink>
            </div>
            <div className='navbar-right'>
                <NavLink
                activeClassName='navbar__link--active'
                className='navbar__link'
                to='/orders'>
                    Login
                </NavLink>
                <NavLink
                activeClassName='navbar__link--active'
                className='navbar__link'
                to='/signup'>
                    Sign Up
                </NavLink>
            </div>
        </div>
    );
}

export default NavBar;
