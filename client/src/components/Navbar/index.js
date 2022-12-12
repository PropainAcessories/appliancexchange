import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar () {
    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <NavLink
                activeclassname='navbar__link--active'
                className='navbar__link'
                to='/'>
                    Home
                </NavLink>
            </div>
            <div className='navbar-right'>
                <NavLink
                activeclassname='navbar__link--active'
                className='navbar__link'
                to='/login'>
                    Login
                </NavLink>
                <NavLink
                activeclassname='navbar__link--active'
                className='navbar__link'
                to='/signup'>
                    Sign Up
                </NavLink>
            </div>
        </div>
    );
};

export default NavBar;
