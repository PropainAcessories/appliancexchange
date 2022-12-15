import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { Row, Col } from 'react-bootstrap';


function SellItem(props) {
    const [formState, setFormState] = useState({ category: '', name: '', description: '', price: '', quantity: '', image: '' })
    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addProduct({
            category: formState.category,
            name: formState.name,
            description: formState.description,
            price: formState.price,
            quantity: formState.quantity,
            image: formState.image
        });
        const data = mutationResponse.data.addProduct;

        return data;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className='text-white'>
            <form onSubmit={handleFormSubmit} noValidate>
                <Row>
                    <Col>
                        <input
                            type='text'
                            label='Category:'
                            name='category'
                            placeholder='Category'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type='text'
                            label='Product Name:'
                            name='name'
                            placeholder='Product-Name'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type='text'
                            label='Description:'
                            name='description'
                            placeholder='Describe your product.'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type='number'
                            label='Price:'
                            name='price'
                            placeholder='How much are you selling it for?'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type='number'
                            label='Quantity:'
                            name='quantity'
                            placeholder='How many are you selling?'
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
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
