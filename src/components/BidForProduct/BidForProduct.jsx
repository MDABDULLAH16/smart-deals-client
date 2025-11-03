import React from "react";

const BidForProduct = ({ bids, product }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">
        Bids For This Products:{" "}
        <span className="text-purple-500">{bids?.length || 0}</span>
      </h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4">SL No</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Buyer</th>
              <th className="py-3 px-4">Bid Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids?.map((bid, index) => (
              <tr
                key={bid._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                {/* SL No */}
                <td className="py-3 px-4 font-medium">{index + 1}</td>

                {/* Product Column */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${product.price_min}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Buyer Column */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={bid.buyerImage}
                      alt={bid.buyerName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {bid.buyerName}
                      </p>
                      <p className="text-sm text-gray-500">{bid.buyerEmail}</p>
                    </div>
                  </div>
                </td>

                {/* Bid Price */}
                <td className="py-3 px-4 font-semibold text-gray-800">
                  ${bid.price}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 space-x-2">
                  <button className="px-3 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50 transition">
                    Accept Offer
                  </button>
                  <button className="px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-50 transition">
                    Reject Offer
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

export default BidForProduct;
