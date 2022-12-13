import React from 'react';
import Auth from '../../utils/auth';
import { NavLink } from 'react-router-dom';

function NavBar () {
  function showNavigation() {
    if (Auth.loggedIn()) {
        return (
            <ul className='flex-row'>
                <li className='mx-1'>
                    <NavLink to='/Orders'>
                        Orders
                    </NavLink>
                </li>
                <li className='mx-1'>
                    <a href='/' onClick={() => Auth.logout()}>
                        Log-Out
                    </a>
                </li>
            </ul>
        );
    } else {
        return (
            <ul className='flex-row'>
                <li className='mx-1'>
                    <NavLink to='/signup'>
                        Sign-Up
                    </NavLink>
                </li>
                <li className='mx-1'>
                    <NavLink to='/login'>
                        Log-In
                    </NavLink>
                </li>
            </ul>
        );
    }
  }

  return (
    <header className='flex-row px-1'>
        <h1>
            <NavLink to='/'>
                Home
            </NavLink>
        </h1>

        <nav>
            {showNavigation()}
        </nav>
    </header>
  );
};

export default NavBar;
