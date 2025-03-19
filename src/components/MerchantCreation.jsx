










import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast, } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const MerchantCreation = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    phones: "",
    store_name: "",
    descp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.descp.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.store_name.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill in all fields");
    } else {
      const res = await axios.post(
        "http://ecommerce.reworkstaging.name.ng/v2/merchants",
        formData
      );
      console.log(res)
      if (res.status == 200 && res.data.id) {
        toast.success('Merchant created successfully');
        navigate('/Login')
      } else {
        toast.error(res.data.msg);
      }
      setError(null);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      onSubmit={handleSubmit}
    >
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Doe"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ap@gmail.com"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0901234567"
          />
        </div>

        {/* Store Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Store Name</label>
          <input
            type="text"
            name="store_name"
            value={formData.store_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nicolas Aluminium"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="descp"
            value={formData.descp}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="All is well that ends well"
          />
        </div>

        {/* Additional Phone Numbers */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Additional Phone Numbers
          </label>
          <input
            type="number"
            name="phones"
            value={formData.phones}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Phone 1"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
        </div>
        {
          error && <p className="text-red-500">{error}</p>
        }

        {/* Submit Button */}
        <Link to='/Login' className="flex justify-end hover:text-red-600 text-sm mb-2">!I don't have an account</Link>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};
export default MerchantCreation;