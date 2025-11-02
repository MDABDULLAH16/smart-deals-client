import React, { Suspense } from 'react';
import Products from '../Products/Products';

const url = import.meta.env.VITE_BACKEND_URL;
 
const latestProductPromise = fetch(`${url}/latest-products`).then(res=>res.json())
const LatestProducts = () => {
    return (
        <div>
            <Suspense fallback='loading...'>
                <Products latestProductPromise={latestProductPromise} ></Products>
            </Suspense>
        </div>
    );
};

export default LatestProducts;