import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_PRODUCT } from '../../utils/mutations';
import { Row, Col } from 'react-bootstrap';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { idbPromise } from '../../utils/helpers';
import {
    UPDATE_CATEGORIES,
} from '../../utils/actions';




function SellItem(props) {

    const [state, dispatch] = useStoreContext();

    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if(categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const [formState, setFormState] = useState({ category: '', name: '', description: '', price: '', quantity: '', image: '' })
    const [addProduct] = useMutation(ADD_PRODUCT);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addProduct({
            variables: {
                category: formState.category,
                name: formState.name,
                description: formState.description,
                price: Number(formState.price),
                quantity: Number(formState.quantity),
                image: formState.image
            }
        });
        const data = mutationResponse.data.addProduct;

        return data;
    };

    const handleChange = (event) => {
        console.log(event);
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
                        <select onChange={handleChange} name='category'>
                            {categories.map((item) => (
                                <option
                                key={item._id}
                                value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
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
