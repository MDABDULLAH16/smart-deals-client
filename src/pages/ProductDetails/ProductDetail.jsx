import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BidsModal from "../../components/BidsModal/BidsModal";
import BidForProduct from "../../components/BidForProduct/BidForProduct";
const url = import.meta.env.VITE_BACKEND_URL;
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`${url}/bids/${id}`).then(res=>res.json()).then(data=>setBids(data))
  },[])
  // console.log('bids',bids);

  useEffect(() => {
    fetch(`${url}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, []);
    console.log(product);
 const {
   title,
   category,
   image,
   description,
   condition,
   usage,
   price_min,
   price_max,
   created_at,
   seller_name,
   seller_image,
   email,
   seller_contact,
   location,
   status,
   _id,
 } = product;

    const handleShowModal = () => {
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
         document.getElementById("my_modal_5").close();
    }
 return (
   <div className="px-4 md:px-12 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
     <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
       {/* Grid Layout */}
       <div className="grid md:grid-cols-2 gap-8 p-6">
         {/* Product Image */}
         <div>
           <img
             src={image}
             alt={title}
             className="w-full h-80 object-cover rounded-lg shadow-sm"
           />
           <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
               Product Description
             </h3>
             <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
               <p>
                 <span className="font-semibold">Condition:</span> {condition}
               </p>
               <p>
                 <span className="font-semibold">Usage:</span> {usage}
               </p>
             </div>
             <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
               {description}
             </p>
           </div>
         </div>

         {/* Product Info */}
         <div>
           <button
             onClick={() => window.history.back()}
             className="text-sm text-blue-600 hover:underline mb-4"
           >
             ← Back To Products
           </button>

           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
             {title}
           </h1>
           <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium mb-3">
             {category}
           </span>

           <p className="text-green-600 text-xl font-semibold mb-1">
             ${price_min} - ${price_max}
           </p>
           <p className="text-gray-500 text-sm mb-4">Price starts from</p>

           {/* Product Details */}
           <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
               Product Details
             </h3>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               <span className="font-semibold">Product ID:</span> {_id}
             </p>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               <span className="font-semibold">Posted:</span>{" "}
               {new Date(created_at).toLocaleDateString()}
             </p>
           </div>

           {/* Seller Info */}
           <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4">
             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
               Seller Information
             </h3>
             <div className="flex items-center gap-3 mb-3">
               <img
                 src={seller_image}
                 alt={seller_name}
                 className="w-12 h-12 rounded-full object-cover border"
               />
               <div>
                 <p className="font-medium text-gray-800 dark:text-gray-200">
                   {seller_name}
                 </p>
                 <p className="text-sm text-gray-500">{email}</p>
               </div>
             </div>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               <span className="font-semibold">Location:</span> {location}
             </p>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               <span className="font-semibold">Contact:</span> {seller_contact}
             </p>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               <span className="font-semibold">Status:</span>{" "}
               <span
                 className={`px-2 py-0.5 rounded-full text-xs ${
                   status === "pending"
                     ? "bg-yellow-100 text-yellow-600"
                     : "bg-green-100 text-green-600"
                 }`}
               >
                 {status}
               </span>
             </p>
           </div>

           <button
             onClick={handleShowModal}
             className="w-full mt-6 bg-linear-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
           >
             I Want Buy This Product
           </button>
           {/* Open the modal using document.getElementById('ID').showModal() method */}

           <dialog
             id="my_modal_5"
             className="modal modal-bottom sm:modal-middle"
           >
             <BidsModal
               product={product}
               handleCloseModal={handleCloseModal}
             ></BidsModal>
           </dialog>
         </div>
       </div>
     </div>
     <BidForProduct product={product} bids={bids}></BidForProduct>
   </div>
 );
};

export default ProductDetail;
