import React from 'react';
import Auth from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import './style.css';

function NavBar () {
  function showNavigation() {
    if (Auth.loggedIn()) {
        return (
            <div className='navContainer'>
                <ul className='flex-row'>
                    <li className='mx-1'>
                        <NavLink to='/Orders'>
                            Orders
                        </NavLink>
                    </li>
                    <li className='mx-1'>
                        <NavLink to='/profile'>
                            Profile
                        </NavLink>
                    </li>
                    <li className='mx-1'>
                        <a className='text-white'
                         href='/' onClick={() => Auth.logout()}>
                            Log-Out
                        </a>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className='navContainer'>
                 <ul className='flex-row'>
                    <li className='mx-1'>
                        <NavLink to='/signup'>
                            Sign-Up
                        </NavLink>
                    </li>
                    <li className='mx-1'>
                        <NavLink to='/cart'>
                            View-Cart
                        </NavLink>
                    </li>
                    <li className='mx-1'>
                        <NavLink to='/login'>
                            Log-In
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
  }

  return (
    <div className='flex-row px-1'>
        <h2 className='navTitle'>
            <NavLink to='/'>
                ApplianceXpress
            </NavLink>
        </h2>

        <div className='px-2'>
            {showNavigation()}
        </div>
    </div>
  );
};

export default NavBar;
