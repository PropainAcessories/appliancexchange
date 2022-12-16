import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_PRODUCT } from '../../utils/mutations';
import { NavLink } from 'react-router-dom';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { idbPromise } from '../../utils/helpers';
import {
    UPDATE_CATEGORIES,
} from '../../utils/actions';


function SellItem() {

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
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className='container text-white'>
            <NavLink to='/'>Back to Products</NavLink>
            <h2>Sell Your Stuff!</h2>
            <form onSubmit={handleFormSubmit} noValidate>
                <div className='flex-row space-between py-2'>
                    <label htmlFor='Category'>Category:</label>
                    <select onChange={handleChange} name='category'>
                        {categories.map((item) => (
                            <option
                            key={item._id}
                            value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex-row space-between py-2'>
                    <label htmlFor='name'>Product-Name:</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Product-Name'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between py-2'>
                    <label htmlFor='description'>Product-Description:</label>
                    <input
                        type='text'
                        name='description'
                        placeholder='Describe your product.'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between py-2'>
                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        name='price'
                        placeholder='How much are you selling it for?'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between py-2'>
                    <label htmlFor='quantity'>Quantity:</label>
                    <input
                        type='number'
                        name='quantity'
                        placeholder='How many are you selling?'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between py-2'>
                    <label htmlFor='Name'>Upload an Image:</label>
                    <input
                        type='file'
                        name='image'
                        placeholder='Please Upload an Image'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row flex-end py-1'>
                    <button className='text-white' type='submit'>Sell It!</button>
                </div>
                <div className='modal-footer'/>
            </form>

        </div>
    );

};

export default SellItem;
