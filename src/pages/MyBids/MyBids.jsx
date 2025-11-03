import React, { Suspense, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import MyBidsCard from '../../components/MyBidsCard/MyBidsCard';
const MyBids = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const {user}= useContext(AuthContext)
    const myBidsPromise = fetch(`${url}/myBids?email=${user?.email}`).then(res => res.json());

    return (
        <div>
            <h1>My bids also protected</h1>
            <Suspense fallback='loading...'>
                <MyBidsCard myBidsPromise={myBidsPromise}></MyBidsCard>
            </Suspense>
        </div>
    );
};

export default MyBids;