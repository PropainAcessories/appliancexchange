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
            <NavLink className='text-white' to='/signup'>Don't Have an Account? Sign Up Here!</NavLink>

            <h2>Log-In</h2>
            <form onSubmit={handleFormSubmit} className='px-2 py-2'>
                <div className='flex-row space-between py-2 py-3'>
                    <label htmlFor='email'>Email Address:</label>
                    <input
                    placeholder='email@test.net'
                    name='email'
                    type='email'
                    id='email'
                    onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between py-2 py-3'>
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
                    <button className='text-white' type='submit'>Submit</button>
                </div>
                <div className='modal-footer' />
            </form>
        </div>
    );
}

export default Login;
