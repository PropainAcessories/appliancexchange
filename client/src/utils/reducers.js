import { useReducer } from "react";
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    UPDATE_REVIEWS,
    TOGGLE_REVIEWS,
    TOGGLE_CART,
    DELETE_PRODUCT,
    UPDATE_USER
} from './actions';
// Make additions for Users to sell products as well.
export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: [...state.user, action.payload]
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: [...state.products].filter(
                    (product) => product._id !== action.payload
                ),
            };
        case TOGGLE_REVIEWS:
            return {
                ...state,
                reviewsOpen: !state.reviewsOpen
            };
        case UPDATE_REVIEWS:
            return {
                ...state,
                reviewsOpen: true,
                reviews: [...state.reviews, action.payload]
            };
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity
                    }
                    return product
                })
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        case UPDATE_CATEGORIES: 
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }
        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
};
