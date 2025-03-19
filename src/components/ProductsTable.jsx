import React from 'react';

const ProductsTable = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10', stock: 'In Stock' },
    { id: 2, name: 'Product 2', price: '$15', stock: 'Out of Stock' },
    // Add more products as needed
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Products</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;