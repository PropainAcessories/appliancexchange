import React from "react";
import Category from '../components/Categories';
import Products from '../components/Products';

// PUT CART SOMEWHERE ELSE IT LOOKS FUCKING STUPID AND MAKES YOU LOOK STUPID AND YOU SHOULD FEEL STUPID!
function Home() {
    return (
        <div className="container">
            <Category />
            <Products />
        </div>
    );
};

export default Home;
