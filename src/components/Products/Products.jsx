import React, { use } from "react";
import { Link } from "react-router";

const Products = ({ latestProductPromise }) => {
  const latestProducts = use(latestProductPromise);

  return (
    <div className="px-4 md:px-10 py-8 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 dark:text-gray-200">
        Latest Products
      </h2>

      {/* Responsive grid layout */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {latestProducts.map((product) => (
          <div
            key={product._id}
            className="card bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden"
          >
            <figure className="px-4 pt-4">
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg w-full h-48 object-cover"
              />
            </figure>

            <div className="card-body p-4 text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200  ">
                {product.title}
              </h3>
              <p className="text-primary font-semibold dark:text-gray-400 mb-3">
                ${product.price_min} - ${product.price_max}
              </p>
              <Link to={`/productDetails/${product._id}`} className="btn btn-outline btn-sm hover:btn-primary text-primary hover:text-white transition-colors duration-300">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
