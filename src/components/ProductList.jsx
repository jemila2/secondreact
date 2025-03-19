
import React, { useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [title, setTitle] = useState('');
  const [descp, setDescp] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [images, setImages] = useState(['']);
  const [currency, setCurrency] = useState('NGN');
  const [minQty, setMinQty] = useState('');
  const [maxQty, setMaxQty] = useState('');
  const [shippingLocations, setShippingLocations] = useState(['']);
  const [attrib, setAttrib] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateProduct = async (event) => {
    event.preventDefault();  // Prevent the default form submission

    const payload = {
      title,
      descp,
      price: parseFloat(price),
      brand,
      quantity: parseInt(quantity),
      images: images.filter(img => img),  // Filter out any empty strings from the images array
      currency,
      min_qty: parseInt(minQty),
      max_qty: parseInt(maxQty),
      discount: 0,
      discount_expiration: '',
      has_refund_policy: false,
      has_discount: false,
      has_shipment: true,
      has_variation: false,
      shipping_locations: shippingLocations.filter(loc => loc),  // Filter out empty strings
      attrib,
      category_id: categoryId,
      merchant_id: merchantId,
    };

    try {
      const response = await axios.post('http://ecommerce.reworkstaging.name.ng/v2/products', payload);
      console.log('Product Created:', response.data);
      setSuccess(true);
      
      // Save product to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      existingProducts.push(response.data);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      // Optionally, reset the form after success
      setTitle('');
      setDescp('');
      setPrice('');
      setBrand('');
      setQuantity('');
      setImages(['']);
      setMinQty('');
      setMaxQty('');
      setShippingLocations(['']);
      setAttrib([]);
      setCategoryId('');
      setMerchantId('');
    } catch (err) {
      setError('Failed to create product: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="create-product">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Product created successfully!</p>}
      <form onSubmit={handleCreateProduct}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={descp}
            onChange={(e) => setDescp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Images (comma separated URLs):</label>
          <input
            type="text"
            value={images.join(', ')} // Join array for easy input
            onChange={(e) => setImages(e.target.value.split(','))}
            required
          />
        </div>
        <div>
          <label>Min Quantity:</label>
          <input
            type="number"
            value={minQty}
            onChange={(e) => setMinQty(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max Quantity:</label>
          <input
            type="number"
            value={maxQty}
            onChange={(e) => setMaxQty(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Shipping Locations (comma separated):</label>
          <input
            type="text"
            value={shippingLocations.join(', ')}
            onChange={(e) => setShippingLocations(e.target.value.split(','))}
            required
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Merchant ID:</label>
          <input
            type="text"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductList;