

import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
// import { DataContext } from '../context/DataContext';
import DataContext from '../context/DataContext';
// import DataContext from '../context/DataContext';
// import {Dat}

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { user, login, register, createPost } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [postData, setPostData] = useState({
    title: '',
    image: '',
    content: ''
  });

  // Input handlers
  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupInput = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginData.email.trim() || !loginData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const result = await login(loginData.email, loginData.password);
      
      if (result.success) {
        toast.success('Logged in successfully!');
        onLoginSuccess?.();
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login process error:', error);
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!signupData.first_name || !signupData.last_name || 
        !signupData.email || !signupData.password || !signupData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registrationData } = signupData;
      const result = await register(registrationData);
      
      if (result.success) {
        toast.success(result.message);
        setActiveTab('login');
        setSignupData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await createPost({
        title: postData.title,
        content: postData.content,
        image: postData.image
      });
      
      if (response.success) {
        toast.success('Post created successfully!');
        onClose();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create post');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          ✕
        </button>

        {/* Tabs */}
        {!user && (
          <div className="flex border-b">
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('signup')}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Login Form */}
        {!user && activeTab === 'login' && (
          <div className="p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
              
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="6"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('signup')}
                    className="text-blue-600 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Signup Form */}
        {!user && activeTab === 'signup' && (
          <div className="p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
              
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={signupData.first_name}
                      onChange={handleSignupInput}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={signupData.last_name}
                      onChange={handleSignupInput}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="6"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="6"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Post Form */}
        {user && (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <h1 className="text-2xl font-bold text-white">Create New Post</h1>
              <p className="text-indigo-100 mt-1">Share your thoughts with the world</p>
            </div>
            <div className="p-6 md:p-8">
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                      <input 
                        type="text" 
                        name="title"
                        value={postData.title}
                        onChange={handlePostChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        name="image"
                        value={postData.image}
                        onChange={handlePostChange}
                        placeholder="https://example.com/image.jpg" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                    <textarea 
                      name="content"
                      value={postData.content}
                      onChange={handlePostChange}
                      placeholder="Write your post content here..." 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition h-full min-h-[200px]"
                      required 
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Create Post'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
