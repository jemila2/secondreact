
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-full p-4">
      <h2 className="text-2xl font-bold mb-4">E-Commerce Dashboard</h2>
      <ul>
        <li><Link to="/" className="block py-2">Overview</Link></li>
        <li><Link to="/Tshop" className="block py-2">Products</Link></li>
        <li><Link to="/orders" className="block py-2">Orders</Link></li>
        <li><Link to="/users" className="block py-2">Users</Link></li>
        <li><Link to="/certegory" className="block py-2">certegory</Link></li>
        <li><Link to="/product" className="block py-2">ProductList</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;