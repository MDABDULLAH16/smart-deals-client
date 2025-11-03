import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const BidsModal = ({ product, handleCloseModal }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const buyerName = user?.displayName;
    const buyerEmail = user?.email;
    const buyerImage = user?.photoURL;
    const price = e.target.price.value;
    const contact = e.target.contact.value;
    const productId = product._id;
    const status = product.status;

    const newBids = {
      productId,
      status,
      buyerEmail,
      buyerName,
      buyerImage,
      price,
      contact,
    };

    // Send data to backend
    fetch(`${url}/bids`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Bid response:", data);

        if (data.insertedId) {
          // ✅ Close modal after successful submit
          handleCloseModal();
          // Optional: show success feedback
          toast.success("Your bid has been submitted successfully!");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.error("Error submitting bid:", err);
      });
  };

  return (
    <div>
      {/* DaisyUI Modal */}

      <div className="modal-box bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg p-6 sm:p-8 mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Give Seller Your Offered Price
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buyer Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Buyer Name
              </label>
              <input
                type="text"
                name="name"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Buyer Email
              </label>
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Buyer Image URL */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Buyer Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={user?.photoURL}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Place your Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 500"
              className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Contact Info
            </label>
            <input
              type="text"
              name="contact"
              placeholder="e.g. +1-555-1234"
              className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="modal-action flex justify-end gap-3 pt-4">
            <form method="dialog">
              <button className="btn border border-purple-400 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700">
                Cancel
              </button>
            </form>
            <button
              type="submit"
              className="btn bg-purple-600 text-white hover:bg-purple-700"
            >
              Submit Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidsModal;
