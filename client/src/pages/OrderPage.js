import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderPage() {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <>
            <div className='container my-1'>
                <NavLink to='/'>Back to Products</NavLink>

                {user? (
                    <>
                        <h2>
                            {user.firstName} {user.lastName}
                        </h2>
                        {user.orders.map((order) => (
                            <div key={order._id} className='mt-2 mb-2'>
                                <h2>
                                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                </h2>
                                <div className='flex-row'>
                                    {order.products.map(({ _id, image, name, price, seller }, index) => (
                                        <div key={index} className='card px-1 py-1'>
                                            <NavLink to={`/products/${_id}`}>
                                                <img alt={name} src={`/images/${image}`} />
                                                <p>{name}</p>
                                            </NavLink>
                                            <div>
                                                <span>${price}</span>
                                                <p>{seller}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </>
    );
};

export default OrderPage;
