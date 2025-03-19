
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
// import certegory from './certegory';
import ProductsTable from './ProductsTable';
import CertegoryList from './CertegoryList';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Overview />
          <ProductsTable />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;