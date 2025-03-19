


import { CiStar } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import React, { useEffect, useState } from 'react';

const Tshop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Retrieve the products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(existingProducts);
  }, []);

  return (
<div >
 <div className="flex">
 <div className="h-400 w-100 bg-amber-700"></div>
<div className='h-400 w-200'>
{/* <h1 className="text-2xl font-bold mb-4">Stored Products</h1> */}
{products.length === 0 ? (
  <p>No products available.</p>
) : (
  <ul className="list-disc pl-5">
    {products.map((product, index) => (
      <li key={index} className="mb-2 ">
        {/* <p>Images: {product.images.join(', ')}</p> */}

        <img 
                src={product.images || 'default-image-path.jpg'} 
                alt={product.name || 'Product Image'} 
                className="w-70 h-72 object-fit" 
              />
        <h2 className=" ml-5 text-gray-600 ">{product.title}</h2>
      <div className="flex text-gray-600 ml-5">
        <div className="flex">
          <CiStar className="text-xl "/>
          <CiStar className="text-xl "/>
          <CiStar className="text-xl "/>
          <CiStar className="text-xl "/>
          <CiStar className="text-xl "/>
        </div>
        <div className="">(0 Revievws)</div>
      </div>
        <p className='ml-5 font-bold text-2xl mt-2'> ${product.price}</p>

        <div className="flex text-gray-600 ml-5 mt-2">
          <IoCheckmarkOutline  className="text-xl mt-1 "/>
        <div className="">Available to ship</div>
      </div>
        
        {/* <p> {product.brand}</p> */}
        {/* <p> {product.quantity}</p> */}

      </li>
    ))}
  </ul>
)}
</div>
 </div>
</div>
  );
};

export default Tshop;




