import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_BACKEND_URL;

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's products
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${url}/products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user]);

  // handle delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${url}/products/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Product removed successfully.", "success");
          setMyProducts((prev) => prev.filter((p) => p._id !== id));
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Something went wrong!", "error");
      }
    }
  };

  // handle make sold
  const handleMakeSold = async (id) => {
    try {
      const res = await fetch(`${url}/products/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "sold" }),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire("Success!", "Product marked as sold.", "success");
        setMyProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "sold" } : p))
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">My Products</h2>

      {myProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-sm md:text-base text-left border-collapse">
            <thead className="bg-gray-100   ">
              <tr>
                <th className="p-3">SL</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price Range</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          {product?.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">
                    {product.price_min} - {product.price_max}৳
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      product.status === "pending"
                        ? "text-yellow-600"
                        : product.status === "sold"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {product.status}
                  </td>
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => Swal.fire("Edit Coming Soon!")}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                    {product.status !== "sold" && (
                      <button
                        onClick={() => handleMakeSold(product._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                      >
                        Make Sold
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
