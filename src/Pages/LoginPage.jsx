
import React, { useState } from 'react';
import { FaAngleLeft, FaRegUserCircle } from 'react-icons/fa';
import { TbTagFilled } from 'react-icons/tb';
import { LiaAccusoft, LiaShoppingCartSolid } from "react-icons/lia";
import { FaAngleRight } from 'react-icons/fa6';
import { LuLockKeyhole } from "react-icons/lu";
import axios from 'axios'; // Import Axios for making API requests

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message for the next submission

    try {
      // Replace with your API endpoint
      const response = await axios.post('http://ecommerce.reworkstaging.name.ng/v2/merchants/login', { username: email, password });
      
      // Check response
      if (response.data.success) {
        alert('Successfully logged in!');
        // Redirect or perform other actions here. For instance:
        // window.location.href = '/dashboard'; // Redirect to dashboard or home page
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      // Handle any errors from your API
      setErrorMessage('Failed to login. Please try again.');
    }
  };

  return (
    <div className="h-200 w-full p-2 ">
      <div className="flex mb-4">
        <FaAngleLeft className="mt-1 text-blue-600"/>
        <div className="font-bold text-blue-600 cursor-pointer">Back to previous page</div>
      </div>

      <div className="mt-10 text-blue-700 text-6xl pl-20 font-bold mb-4">Sign In</div>
      <div className="ml-20 mb-3">Enjoy a smoother shopping experience both in-store and online.</div>

      <div className="flex h-full justify-between pl-20 pr-20">
        <div className="bg-white w-100 h-100 mt-15 p-5">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder=""
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Show"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
            <button type="button" className="w-full text-blue-500 text-sm mt-2">
              Forget password?
            </button>
          </form>
        </div>

        <div className="h-120 w-130 bg-white p-5">
          <div className="flex">
            <div className="text-4xl">MY</div>
            <div className="text-4xl font-bold">Best Buy</div>
            <TbTagFilled className="text-3xl text-amber-500 mt-4"/>
          </div>
          <div className="text-3xl font-semibold mt-1">Don't have a free My Best Buy account?</div>
          <div className="mt-3 mb-3">Here are some of the benefits you’ll enjoy:</div>

          <div className="flex gap-3">
            <LiaShoppingCartSolid className="text-3xl font-bold text-blue-700"/>
            <div className="text-xl font-bold">Fast checkout.</div>
          </div>

          <div className="ml-10">Your payment info is saved and ready.</div>

          <div className="flex gap-3 mt-3">
            <FaRegUserCircle className="text-3xl font-bold text-blue-700"/>
            <div className="text-xl font-bold">Easy tracking.</div>
          </div>
          <div className='ml-10'>Keep an eye on your order.</div>

          <div className="flex gap-3 mt-3">
            <LiaAccusoft className="text-3xl font-bold text-blue-700"/>
            <div className="text-xl font-bold">Quick recap.</div>
          </div>
          <div className='ml-10'>Store and online purchases in one place.</div>
          <div className="flex text-blue-700 text-xl mt-8 ml-10">
            <button>Create an account</button>
            <FaAngleRight className='mt-2'/>
          </div>
        </div>
      </div>

      <div className="ml-2">
        <div className="flex gap-3 mt-3 ml-15">
          <LuLockKeyhole className="text-3xl font-bold mt-4"/>
          <div className="text-xl font-bold">Security</div>
        </div>
        <div className='ml-26'>
          Every transaction on BestBuy.ca is secure. Any personal information you give us will be handled according to our Privacy Policy.
        </div>
      </div>

      <div className="flex gap-3 mt-3 ml-15">
        <FaRegUserCircle className="text-3xl font-bold mt-4"/>
        <div className="text-xl font-bold"> Support</div>
      </div>
      <div className='ml-26'>
        Need assistance? Visit the Help Centre to get answers to common questions.
      </div>
    </div>
  );
};

export default LoginPage;