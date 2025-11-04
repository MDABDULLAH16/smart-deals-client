import { use, useState } from "react";
import Swal from "sweetalert2";
const url = import.meta.env.VITE_BACKEND_URL;
const MyBidsCard = ({ myBidsPromise, bidProducts }) => {
  const initialBids = use(myBidsPromise);
  const [myBids,setMyBids]= useState(initialBids)
  const bidProduct = use(bidProducts); 
  console.log({bidProduct});
  

  // get product IDs from user's bids
  const productIds = myBids.map((bid) => bid.productId);

  // match products with those IDs
  const products = bidProduct.filter((product) =>
    productIds.includes(String(product._id))
  );
  console.log({products});
  

  // merge bid and product info
  const combinedData = myBids.map((bid) => {
    const matchedProduct = products.find(
      (product) => String(product._id) === String(bid.productId)
    );
    return { ...bid, product: matchedProduct };
  });
  console.log({ combinedData });
  
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/myBids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Bid has been deleted.",
                icon: "success",
              });

              const remainingBids = myBids.filter(bid => bid._id !== id)
              setMyBids(remainingBids)
            }
          });
      }
    });
  };
  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center">
        My Bids:{" "}
        <span className="text-purple-500">{combinedData?.length || 0}</span>
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-left text-xs sm:text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-2 sm:px-4">SL No</th>
              <th className="py-3 px-2 sm:px-4">Product</th>
              <th className="py-3 px-2 sm:px-4">Seller</th>
              <th className="py-3 px-2 sm:px-4">Bid Price</th>
              <th className="py-3 px-2 sm:px-4">Status</th>
              <th className="py-3 px-2 sm:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((item, index) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* SL No */}
                <td className="py-3 px-2 sm:px-4">{index + 1}</td>

                {/* Product Column */}
                <td className="py-3 px-2 sm:px-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.product?.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        ${item.product?.price_min}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Seller Column */}
                <td className="py-3 px-2 sm:px-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <img
                      src={item.product?.seller_image}
                      alt={item.product?.seller_name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.product?.seller_name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-none">
                        {item.product?.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Bid Price */}
                <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">
                  ${item.price}
                </td>
                {/* Bid Price */}
                <td>
                  <button className="px-2 sm:px-3 py-1 mb-4 rounded-full bg-yellow-400 transition text-xs sm:text-sm">
                    {item.status}
                  </button>
                </td>

                {/* Actions */}
                <td className="py-3 px-2 sm:px-4 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                  <button className="px-2 sm:px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition text-xs sm:text-sm">
                    View Product
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-2 sm:px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-50 transition text-xs sm:text-sm"
                  >
                    Cancel Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBidsCard;
