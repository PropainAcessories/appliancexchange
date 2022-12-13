import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className='container'>
            <NavLink to='/login'>Have an Account? Log in</NavLink>

            <h2> Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='flex-row space-between'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                    placeholder='firstName'
                    name='firstName'
                    type='firstName'
                    id='firstName'
                    onChange={handleChange}
                />
                </div>
                <div className='flex-row space-between'>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                    placeholder='lastName'
                    name='lastName'
                    type='lastName'
                    id='lastName'
                    onChange={handleChange}
                />
                </div>
                <div className='flex-row space-between'>
                    <label htmlFor='Name'>Email:</label>
                    <input
                    placeholder='email'
                    name='email'
                    type='email'
                    id='email'
                    onChange={handleChange}
                />
                </div>
                <div className='flex-row space-between'>
                    <label htmlFor='Name'>Password:</label>
                    <input
                    placeholder='**********'
                    name='password'
                    type='password'
                    id='pwd'
                    onChange={handleChange}
                />
                </div>
                <div className='flex-row flex-end'>
                    <button type='submit'>Sign-Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
