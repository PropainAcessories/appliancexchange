import React from "react";
import Category from '../components/Categories';
import Products from '../components/Products';
import Cart from '../components/Cart';

function Home() {
    return (
        <div className="container">
            <Category />
            <Products />
            <Cart />
        </div>
    );
};

export default Home;
