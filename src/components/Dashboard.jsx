
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';



const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
      

        </div>

      </div>
    </div>
      
  );
};

export default Dashboard;



