


import React from 'react';
import { Link } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';
import { IoCheckmarkOutline } from 'react-icons/io5';

const ProductDetail = ({ products, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="cursor-pointer">
            <div className="border rounded-md overflow-hidden shadow-md transform transition-transform hover:scale-105">
              <img 
                src={product.image || 'default-image-path.jpg'} 
                alt={product.name || 'Product Image'} 
                className="w-full h-72 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name || 'Unnamed Product'}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <CiStar key={index} className="text-gray-400 text-2xl" />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">(0 Reviews)</span>
                </div>
                <div className="bg-blue-900 text-white m-5 w-40 text-center rounded-lg">Latest and greatest</div>
                <p className="text-gray-500 font-medium mb-2">{product.price || '$0.00'}</p>
                <div className="flex items-center">
                  <IoCheckmarkOutline className="text-2xl text-green-500" />
                  <span className="ml-2">Available to Ship</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;


