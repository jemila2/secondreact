

import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom"; 
import { MdOutlineDashboard } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";
import { IoCheckboxOutline } from "react-icons/io5";
import { RiListSettingsFill, RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import { CategoryContext } from '../context/CategoryContext';

const Catigory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [localError, setLocalError] = useState(null);
    const [localSuccess, setLocalSuccess] = useState(null);
    
    const {
        categories,
        loading,
        error: contextError,
        createCategory,
        updateCategory,
        deleteCategory
    } = useContext(CategoryContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        setLocalSuccess(null);

        if (!categoryName.trim()) {
            setLocalError('Category name is required');
            return;
        }

        if (editingId) {
            // Update existing category
            const { success, error, category } = await updateCategory(editingId, categoryName);
            if (success) {
                setLocalSuccess('Category updated successfully!');
                setEditingId(null);
                setCategoryName('');
            } else {
                setLocalError(error);
            }
        } else {
            // Create new category
            const { success, error, category } = await createCategory(categoryName);
            if (success) {
                setLocalSuccess('Category created successfully!');
                setCategoryName('');
            } else {
                setLocalError(error);
            }
        }
    };

    const handleEdit = (category) => {
        setCategoryName(category.name);
        setEditingId(category._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        
        const { success, error } = await deleteCategory(id);
        if (success) {
            setLocalSuccess('Category deleted successfully!');
        } else {
            setLocalError(error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-4 shadow-xl">
                <div className="mb-8 p-4">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-100">
                        Dashboard
                    </h2>
                </div>
                
                <nav className="space-y-2">
                    <Link 
                        to="/home" 
                        className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <MdOutlineDashboard className="mr-3" />
                        Dashboard
                    </Link>
                  
                    <Link 
                        to="/Catigory" 
                        className="flex items-center p-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <RiListSettingsFill className="mr-3" />
                        Post Categories
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            {/* <h1 className="text-3xl font-bold text-gray-800">Welcome back, 👋</h1> */}
                            <p className="text-gray-600"> your  categories</p>
                        </div>
                        <Link 
                            to="/home" 
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            ← Go Back
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        {/* Category Form */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {editingId ? 'Edit Category' : 'Create New Category'}
                            </h2>
                            <form onSubmit={handleSubmit} className="flex gap-3">
                                <input
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter category name"
                                    required
                                    disabled={loading}
                                />
                                <button 
                                    type="submit" 
                                    className={`px-4 py-2 rounded-lg font-medium transition
                                        ${editingId 
                                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : editingId ? 'Update' : 'Create'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
                                        onClick={() => {
                                            setEditingId(null);
                                            setCategoryName('');
                                        }}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>

                            {/* Status Messages */}
                            {localSuccess && (
                                <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                    {localSuccess}
                                </div>
                            )}
                            {(localError || contextError) && (
                                <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                    {localError || contextError}
                                </div>
                            )}
                        </div>

                        {/* Categories List */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Categories</h2>
                            {loading && categories.length === 0 ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                                </div>
                            ) : categories.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                    No categories found. Create one above!
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {categories.map((category) => (
                                        <li 
                                            key={category._id} 
                                            className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition"
                                        >
                                            <span className="font-medium text-gray-800">{category.name}</span>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition"
                                                    title="Edit"
                                                    disabled={loading}
                                                >
                                                    <RiEdit2Fill size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition"
                                                    title="Delete"
                                                    disabled={loading}
                                                >
                                                    <RiDeleteBin6Fill size={18} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catigory;

