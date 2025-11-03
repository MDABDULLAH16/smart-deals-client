import React, { use } from 'react';

const MyBidsCard = ({ myBidsPromise }) => {
    const myBids = use(myBidsPromise)
    console.log(myBids);
    
    return <div>
        <h1>My Bids { myBids.length}</h1>
  </div>;
};

export default MyBidsCard;