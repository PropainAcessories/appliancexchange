import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { Row, Col } from 'react-bootstrap';


function SellItem() {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
    });
    
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = addProduct({
                variables: { ...formState },
            });

            //window.location.assign('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "string" && value.length > 0) {
            setFormState({ ...formState, [name]: value });
        } else if (name !== 'String') {
            setFormState({ ...formState, [name]: value });
        }
    }

    return (
        <div className='text-white'>
            <form onSubmit={handleFormSubmit} noValidate>
                <Row>
                    <Col xs='12' lg='6'>
                        <input
                            type='text'
                            label='Product Name:'
                            name='name'
                            placeholder='Product-Name'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <input
                            type='text'
                            label='Description:'
                            name='description'
                            placeholder='Describe your product.'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <input
                            type='number'
                            label='Price:'
                            name='price'
                            placeholder='How much are you selling it for?'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <input
                            type='number'
                            label='Quantity:'
                            name='quantity'
                            placeholder='How many are you selling?'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <input
                            type='file'
                            label='Upload Image:'
                            name='image'
                            placeholder='Please Upload an Image'
                            onChange={handleChange}
                        />
                    </Col>               
                </Row>
                <div className='flex-row flex-end py-1'>
                    <button className='text-white' type='submit'>Sell It!</button>
                </div>
            </form>
        </div>
    );

};

export default SellItem;
