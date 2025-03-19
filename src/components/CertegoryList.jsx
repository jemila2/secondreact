
import React, { useState } from 'react';
import axios from 'axios';

const CertegoryList = () => {
  const [merchantId, setMerchantId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('http://ecommerce.reworkstaging.name.ng/v2/categories', {
        merchant_id: merchantId,
        name: name,
        image: image,
      });
      console.log('Category Created:', response.data);
      setSuccess(true);
      // Optionally, reset the form after success
      setMerchantId('');
      setName('');
      setImage('');
    } catch (err) {
      setError('Failed to create category: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="create-category">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Category created successfully!</p>}
      <form onSubmit={handleCreateCategory}>
        <div>
          <label>
            Merchant ID:
            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CertegoryList;