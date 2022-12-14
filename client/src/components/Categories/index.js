import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';

import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function Categories() {
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

    const handleClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
        });
    };
    // Make this better Dropdownlist/Searchbar please.
    return (
        <div className='container'>
            <h2>Categories</h2>
            {categories.map((item) => (
                <button
                key={item._id}
                onClick={() => {
                    handleClick(item._id);
                }}
                className='text-white ctgBtn mx-1 my-1'
                >{item.name}</button>
            ))}
        </div>
    )
}

export default Categories;
