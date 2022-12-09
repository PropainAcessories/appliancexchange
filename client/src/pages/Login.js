import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NavLink } from 'react-router-dom';
// Make a mutation first
import { LOGIN } from '../utils/mutations';
// Make an Auth first
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const mutationResponse = await login({
            variables: { email: formState.email, password: formState.password },
          });
          const token = mutationResponse.data.login.token;
          Auth.login(token);
        } catch (e) {
          console.log(e);
        }
    };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    return (
        <div className='container'>
            <NavLink to='/signup'>Sign Up</NavLink>

            <h2>Log-In</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='flex-row space-between'>
                    <label htmlFor='email'>Email Address:</label>
                    <input
                    placeholder='email@test.net'
                    name='email'
                    type='email'
                    id='email'
                    onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between'>
                    <label htmlFor='pwd'>Password:</label>
                    <input
                    placeholder='*************'
                    name='password'
                    type='password'
                    id='pwd'
                    onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p className='error-text'>Incorrect Login</p>
                    </div>
                ): null}
                <div className='flex-row flex-end'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
