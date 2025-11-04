import React, { Suspense, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import MyBidsCard from '../../components/MyBidsCard/MyBidsCard';
const MyBids = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const {user}= useContext(AuthContext)
  const myBidsPromise = fetch(`${url}/myBids?email=${user?.email}`, {
    headers: {
      authorization:`Bearer ${user.accessToken}`
    }}).then(res => res.json());
  const bidProducts = fetch(`${url}/products`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  }).then((res) => res.json());
 

    return (
      <div>
       
        <Suspense fallback="loading...">
          <MyBidsCard
            bidProducts={bidProducts}
            myBidsPromise={myBidsPromise}
          ></MyBidsCard>
        </Suspense>
      </div>
    );
};

export default MyBids;