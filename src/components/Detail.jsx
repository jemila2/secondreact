


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const Detail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [quantity, setQuantity] = useState(0); // State to track the quantity
//   const url = "https://api.escuelajs.co/api/v1/products";

//   useEffect(() => {
//     const productDetail = async () => {
//       try {
//         const response = await axios.get(`${url}/${id}`);
//         setProduct(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.log('Error fetching detail');
//       }
//     };
    
//     productDetail();

//     // Initialize quantity from localStorage if it exists
//     const storedQuantity = localStorage.getItem('cartQuantity');
//     if (storedQuantity) {
//         setQuantity(parseInt(storedQuantity));
//     }
//   }, [id]);

//   const handleAddToCart = () => {
//     setQuantity(prevQuantity => {
//         const newQuantity = prevQuantity + 1; // Increment the quantity

//         // Save the new quantity to localStorage
//         localStorage.setItem('cartQuantity', newQuantity);

//         // Log the new quantity
//         console.log(`Product Added! Total Quantity: ${newQuantity}`);

//         return newQuantity; // Return the new quantity to update the state
//     });
//   };

//   if (!product) return <h2 className="text-center">Loading....</h2>;

//   return (
//     <div className="w-80 items-center">
//       <div className='max-w-xl max-h-auto p-6 border shadow-md rounded'>
//         <h2 className="text-2xl font-bold">{product.title}</h2>
//         <p className="text-sm">${product.price}</p>
//         <img src={product.images} alt={product.title} className='w-full h-64 object-cover mt-4' />
//         <p className="mt-2">{product.description}</p>
//         <button 
//           onClick={handleAddToCart} 
//           className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
//           Add to cart
//         </button>
//         <p className="mt-2">Quantity: {quantity}</p> {/* Display the quantity */}
//         <button 
//           onClick={() => navigate(-1)} 
//           className='mt-4 px-4 py-2 bg-gray-500 text-white rounded'>
//           Go Back
//         </button>
//         <button 
//           onClick={() => navigate("/contact-us")} 
//           className='mt-4 px-4 py-2 bg-gray-500 text-white rounded'>
//           Contact Us
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Detail;







import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const url = "https://api.escuelajs.co/api/v1/products";

  useEffect(() => {
    const productDetail = async () => {
      try {
        const response = await axios.get(`${url}/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching detail');
      }
    };
    productDetail();
  }, [id]);

  // Function to handle adding the product to cart
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve existing cart items or initialize as an empty array

    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
      // If it already exists, you can either increase the quantity or leave it
      console.log('Product already in cart');
      alert('Product already in cart')
    } else {
      // If it does not exist, push the product to the cartItems array
      cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images,
      });
      // Save the updated cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log(`${product.title} added to cart!`);
      alert('added to cart!')
    }
  };

  if (!product) return <h2 className="text-center">Loading....</h2>;

  return (
    <div className="w-80 items-center">
      <div className='max-w-xl max-h-auto p-6 border shadow-md rounded'>
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-sm">${product.price}</p>
        {/* <p className="text-sm">${item.price} + ${item.quantity}</p> */}
        <img src={product.images} alt={product.title} className='w-full h-64 object-contain mt-4' />
        <p className="mt-2">{product.description}</p>
        <button 
          onClick={handleAddToCart} 
          className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
          Add to cart
        </button>
        <button onClick={() => navigate(-1)} className='mt-4 px-4 py-2 bg-gray-500 text-white rounded ml-2'>Go Back</button>
        {/* <button onClick={() => navigate("/contact-us")} className='mt-4 px-4 py-2 bg-gray-500 text-white rounded'>Contact Us</button> */}
      </div>
    </div>
  );
};

export default Detail;