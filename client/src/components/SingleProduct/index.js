import React from "react";
import { NavLink } from "react-router-dom";
import { plurals } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function SingleProduct(item) {
    const [state, dispatch] = useStoreContext();

    const {
        image,
        name,
        _id,
        seller,
        price,
        quantity
    } = item;

    const { cart } = state;

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    };

    return (
        <div className="card px-1 py-1 bg-info">
            <NavLink to={`/products/${_id}`}>
                <img
                alt={name}
                src={`/images/${image}`}
                />
                <p>{name}</p>
            </NavLink>
            <div>
                <div className="text-white">{quantity} {plurals('item', quantity)} In Stock</div>
                <span className="text-white">${price}</span>
                <p>{seller}</p>
            </div>
            <button className="text-white" onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default SingleProduct;
