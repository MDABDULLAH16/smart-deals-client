import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const url = import.meta.env.VITE_BACKEND_URL;

const CreateProduct = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price_min: "",
    price_max: "",
    condition: "fresh",
    usage: "",
    image: "",
    seller_name: user?.displayName || "",
    email: user?.email || "",
    seller_contact: "",
    seller_image: user?.photoURL || "",
    location: "",
    description: "",
    // by default
    created_at: new Date().toISOString(),
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      created_at: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await fetch(`${url}/products`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Product created successfully!");
        setFormData({
          title: "",
          category: "",
          price_min: "",
          price_max: "",
          condition: "fresh",
          usage: "",
          image: "",
          seller_name: user?.displayName || "",
          email: user?.email || "",
          seller_contact: "",
          seller_image: user?.photoURL || "",
          location: "",
          description: "",
          created_at: new Date().toISOString(),
          status: "pending",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-2xl shadow-md w-full max-w-3xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Create New Product
        </h2>

        <input
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Instruments">Musical Instruments</option>
          <option value="Sports">Sports Equipment</option>
          <option value="Vehicles">Vehicles</option>
        </select>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="price_min"
            type="number"
            placeholder="Minimum Price"
            value={formData.price_min}
            onChange={handleChange}
            required
            className="p-3 border rounded-md"
          />
          <input
            name="price_max"
            type="number"
            placeholder="Maximum Price (optional)"
            value={formData.price_max}
            onChange={handleChange}
            className="p-3 border rounded-md"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="condition"
              value="fresh"
              checked={formData.condition === "fresh"}
              onChange={handleChange}
            />
            Fresh
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="condition"
              value="used"
              checked={formData.condition === "used"}
              onChange={handleChange}
            />
            Used
          </label>
        </div>

        <input
          name="usage"
          placeholder="Usage (e.g. 2 weeks old)"
          value={formData.usage}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          name="image"
          placeholder="Product Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="seller_name"
            placeholder="Seller Name"
            value={formData.seller_name}
            onChange={handleChange}
            required
            className="p-3 border rounded-md"
          />
          <input
            name="email"
            placeholder="Seller Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-md"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="seller_contact"
            placeholder="Seller Contact"
            value={formData.seller_contact}
            onChange={handleChange}
            className="p-3 border rounded-md"
          />
          <input
            name="seller_image"
            placeholder="Seller Image URL"
            value={formData.seller_image}
            onChange={handleChange}
            className="p-3 border rounded-md"
          />
        </div>

        <input
          name="location"
          placeholder="Location (e.g. Sylhet)"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
