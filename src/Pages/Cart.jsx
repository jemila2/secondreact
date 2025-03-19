


// import React,  { useEffect, useState } from "react";

// const Cart= () => {
//   const [quantity, setQuantity] = useState(0);

//   useEffect(() => {
//       // Retrieve the quantity from localStorage
//       const storedQuantity = localStorage.getItem('cartQuantity');
//       // Parse it to an integer if it exists, otherwise set to 0
//       if (storedQuantity) {
//           setQuantity(parseInt(storedQuantity));
//       }
//   }, []);

//   return (
//       <div>
//           <h1>Cart</h1>
//           <p>Total Quantity: {quantity}</p>
//           {/* Other cart-related UI components can be added here */}


//           <div className='max-w-xl max-h-auto p-6 border shadow-md rounded'>
//         <h2 className="text-2xl font-bold">{quantity.title}</h2>
//         <p className="text-sm">${quantity.price}</p>
//         <img src={product.images} alt={quantity.title} className='w-full h-64 object-cover mt-4' />
//         <p className="mt-2">{quantity.description}</p>
//       </div>
//       </div>
//   );
// };

// export default Cart;










import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';

const Cart = () => {
 
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleRemoveItem = (id) => {
    // Remove an item from the cart
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0); // Sum of all quantities
  };

  if (cartItems.length === 0) {
    return <h2 className="text-center">Your cart is empty.</h2>;
  }
console.log(cartItems.length);




  return (
    <div className="w-full items-center">
      <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>
      <div className="max-w-xl max-h-auto p-6 border shadow-md rounded">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
            <div className="flex-1">
              <h3 className="text-lg">{item.title}</h3>
              <p className="text-sm">${item.price}</p>
            </div>
            <button 
              onClick={() => handleRemoveItem(item.id)} 
              className='px-4 py-2 bg-red-500 text-white rounded'>
              Remove from cart
            </button>
            <button onClick={() => navigate(-1)} className='ml-2 px-4 py-2 bg-gray-500 text-white rounded'>Go Back</button>
            <p className="text-sm">${item.price} x {item.quantity}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Cart;






