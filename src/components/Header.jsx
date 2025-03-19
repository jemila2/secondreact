
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-gray-200 p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <span className="mr-4">Admin</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;