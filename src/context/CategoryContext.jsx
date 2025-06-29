
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = 'http://localhost:5003';

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/category/all`);
      if (response.data?.success) {
        setCategories(response.data.data || []); // Changed to match your backend response
      } else {
        setError(response.data?.message || 'Failed to load categories');
      }
    } catch (err) {
      console.error('Fetch categories error:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Create new category
  const createCategory = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/category/create`, { name });
      if (response.data?.success) {
        await fetchCategories(); // Refresh the list
        return { success: true, category: response.data.data };
      }
      return { success: false, error: response.data?.message || 'No data received' };
    } catch (err) {
      console.error('Create category error:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to create category' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id, name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/api/category/${id}`, { name });
      if (response.data?.success) {
        await fetchCategories(); // Refresh the list
        return { success: true, category: response.data.data };
      }
      return { success: false, error: response.data?.message || 'No data received' };
    } catch (err) {
      console.error('Update category error:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update category' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/category/${id}`);
      if (response.data?.success) {
        await fetchCategories(); // Refresh the list
        return { success: true };
      }
      return { success: false, error: response.data?.message || 'No data received' };
    } catch (err) {
      console.error('Delete category error:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete category' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{
      categories,
      error,
      loading,
      createCategory,
      updateCategory,
      deleteCategory,
      fetchCategories
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

