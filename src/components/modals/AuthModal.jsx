// import { useState, useEffect } from 'react';
// import { useData } from '../../context/DataContext';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'; // Added for navigation

// const AuthModal = ({ isOpen, onClose, defaultTab = 'login', onAuthSuccess }) => {
//   const { login, register } = useData();
//   const navigate = useNavigate(); // Initialize the navigate function
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formErrors, setFormErrors] = useState({});
  
//   const [loginData, setLoginData] = useState({ 
//     email: '', 
//     password: '' 
//   });
  
//   const [signupData, setSignupData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   // Reset errors when tab changes
//   useEffect(() => {
//     setError('');
//     setFormErrors({});
//   }, [activeTab]);

//   // Form validation functions
//   const validateLoginForm = () => {
//     const errors = {};
//     if (!loginData.email.trim()) errors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) errors.email = 'Invalid email format';
//     if (!loginData.password) errors.password = 'Password is required';
//     return errors;
//   };

//   const validateSignupForm = () => {
//     const errors = {};
//     if (!signupData.first_name.trim()) errors.first_name = 'First name is required';
//     if (!signupData.last_name.trim()) errors.last_name = 'Last name is required';
//     if (!signupData.email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
//       errors.email = 'Invalid email format';
//     }
//     if (!signupData.password) {
//       errors.password = 'Password is required';
//     } else if (signupData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }
//     if (signupData.password !== signupData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
//     return errors;
//   };

// const handleLoginSubmit = async (e) => {
//   e.preventDefault();
//   const errors = validateLoginForm();
//   if (Object.keys(errors).length > 0) {
//     setFormErrors(errors);
//     return;
//   }

//   setLoading(true);
//   setError('');

//   try {
//     const result = await login({
//       email: loginData.email.trim(),
//       password: loginData.password
//     });

//     if (result?.success) {
//       toast.success('Login successful!');
//       if (onAuthSuccess) onAuthSuccess(result.user);
//       onClose();
//       navigate('/');
//       return;
//     }

//     // Handle failed login with response
//     const errorMessage = result?.error || 'Login failed';
//     throw new Error(errorMessage);

//   } catch (error) {
//     console.error('Login error:', error);
    
//     // Always clear password field on error
//     setLoginData(prev => ({ ...prev, password: '' }));
    
//     // Set appropriate field errors
//     const newErrors = {};
//     if (error.message.includes('password') || error.message.includes('Invalid credentials')) {
//       newErrors.password = error.message;
//     }
//     if (error.message.includes('email') || error.message.includes('account')) {
//       newErrors.email = error.message;
//     }
    
//     setFormErrors(newErrors);
//     setError(error.message);
    
//   } finally {
//     setLoading(false);
//   }
// };

// const handleSignupSubmit = async (e) => {
//   e.preventDefault();
//   const errors = validateSignupForm();
//   if (Object.keys(errors).length > 0) {
//     setFormErrors(errors);
//     return;
//   }

//   setLoading(true);
//   setError('');

//   try {
//     const { confirmPassword, ...registrationData } = signupData;
//     const result = await register(registrationData);
    
//     if (result?.success) {
//       toast.success('Registration successful! Please login.');
//       setActiveTab('login');
//       setSignupData({
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//       });
      
//       // Only call onAuthSuccess if user data exists
//       if (result?.user?.id) {
//         if (onAuthSuccess) onAuthSuccess(result.user);
//         navigate('/');
//       }
//     } else {
//       throw new Error(result?.error || 'Registration failed');
//     }
//   } catch (error) {
//     console.error('Signup error:', error);

//     // Handle backend validation errors
//     if (error.response?.data?.errors) {
//       setFormErrors(error.response.data.errors);
//     } 
//     else if (error.message.includes('email') || error.message.includes('already exists')) {
//       setFormErrors({ email: error.message });
//     } else {
//       setError(error.message || 'Registration failed. Please try again.');
//     }
//   } finally {
//     setLoading(false);
//   }
// };
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div 
//         className="bg-white rounded-xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//           aria-label="Close modal"
//           disabled={loading}
//         >
//           ✕
//         </button>

//         <div className="flex border-b">
//           <button
//             className={`flex-1 py-3 font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('login')}
//             disabled={loading}
//           >
//             Login
//           </button>
//           <button
//             className={`flex-1 py-3 font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('signup')}
//             disabled={loading}
//           >
//             Create Account
//           </button>
//         </div>

//         <div className="p-6">
//           {activeTab === 'login' ? (
//             <>
//               <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//               {error && (
//                 <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleLoginSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     id="login-email"
//                     type="email"
//                     value={loginData.email}
//                     onChange={(e) => setLoginData({...loginData, email: e.target.value})}
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                     }`}
//                     disabled={loading}
//                   />
//                   {formErrors.email && (
//                     <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
//                   )}
//                 </div>
                
//                 <div>
//                   <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     id="login-password"
//                     type="password"
//                     value={loginData.password}
//                     onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                     }`}
//                     disabled={loading}
//                   />
//                   {formErrors.password && (
//                     <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
//                   )}
//                 </div>
                
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
//                     loading ? 'opacity-70 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Logging in...
//                     </span>
//                   ) : 'Login'}
//                 </button>
//               </form>
//             </>
//           ) : (
//             <>
//               <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
//               {error && (
//                 <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleSignupSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="signup-first-name" className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name
//                     </label>
//                     <input
//                       id="signup-first-name"
//                       type="text"
//                       value={signupData.first_name}
//                       onChange={(e) => setSignupData({...signupData, first_name: e.target.value})}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                         formErrors.first_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                       }`}
//                       disabled={loading}
//                     />
//                     {formErrors.first_name && (
//                       <p className="mt-1 text-sm text-red-500">{formErrors.first_name}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label htmlFor="signup-last-name" className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name
//                     </label>
//                     <input
//                       id="signup-last-name"
//                       type="text"
//                       value={signupData.last_name}
//                       onChange={(e) => setSignupData({...signupData, last_name: e.target.value})}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                         formErrors.last_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                       }`}
//                       disabled={loading}
//                     />
//                     {formErrors.last_name && (
//                       <p className="mt-1 text-sm text-red-500">{formErrors.last_name}</p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div>
//                   <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     id="signup-email"
//                     type="email"
//                     value={signupData.email}
//                     onChange={(e) => setSignupData({...signupData, email: e.target.value})}
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                     }`}
//                     disabled={loading}
//                   />
//                   {formErrors.email && (
//                     <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
//                   )}
//                 </div>
                
//                 <div>
//                   <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     id="signup-password"
//                     type="password"
//                     value={signupData.password}
//                     onChange={(e) => setSignupData({...signupData, password: e.target.value})}
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                     }`}
//                     disabled={loading}
//                   />
//                   {formErrors.password && (
//                     <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
//                   )}
//                 </div>
                
//                 <div>
//                   <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <input
//                     id="signup-confirm-password"
//                     type="password"
//                     value={signupData.confirmPassword}
//                     onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       formErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//                     }`}
//                     disabled={loading}
//                   />
//                   {formErrors.confirmPassword && (
//                     <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
//                   )}
//                 </div>
                
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
//                     loading ? 'opacity-70 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Creating Account...
//                     </span>
//                   ) : 'Sign Up'}
//                 </button>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;



import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, defaultTab = 'login', onAuthSuccess }) => {
  const { login, register } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });
  
  const [signupData, setSignupData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Reset errors when tab changes
  useEffect(() => {
    setError('');
    setFormErrors({});
  }, [activeTab]);

  // Form validation functions
  const validateLoginForm = () => {
    const errors = {};
    if (!loginData.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) errors.email = 'Invalid email format';
    if (!loginData.password) errors.password = 'Password is required';
    return errors;
  };

  const validateSignupForm = () => {
    const errors = {};
    if (!signupData.first_name.trim()) errors.first_name = 'First name is required';
    if (!signupData.last_name.trim()) errors.last_name = 'Last name is required';
    if (!signupData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!signupData.password) {
      errors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login({
        email: loginData.email.trim(),
        password: loginData.password
      });

      if (result?.success) {
        toast.success('Login successful!');
        if (onAuthSuccess) onAuthSuccess(result.user);
        onClose();
        navigate('/');
        return;
      }

      // Handle failed login with response
      const errorMessage = result?.error || 'Login failed';
      throw new Error(errorMessage);

    } catch (error) {
      console.error('Login error:', error);
      
      // Always clear password field on error
      setLoginData(prev => ({ ...prev, password: '' }));
      
      // Set appropriate field errors
      const newErrors = {};
      if (error.message.includes('password') || error.message.includes('Invalid credentials')) {
        newErrors.password = error.message;
      }
      if (error.message.includes('email') || error.message.includes('account')) {
        newErrors.email = error.message;
      }
      
      setFormErrors(newErrors);
      setError(error.message);
      
    } finally {
      setLoading(false);
    }
  };


  const handleSignupSubmit = async (e) => {
  e.preventDefault();
  
  setError('');
  setFormErrors({});

  // Client-side validation
  const errors = validateSignupForm();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  setLoading(true);

  try {
    const result = await register({
      first_name: signupData.first_name.trim(),
      last_name: signupData.last_name.trim(),
      email: signupData.email.trim(),
      password: signupData.password
    });

    if (result?.success) {
      toast.success('Registration successful! Please login.');
      setActiveTab('login');
      setSignupData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle field-specific errors from server
    if (error.serverResponse?.missingFields) {
      const newErrors = {};
      error.serverResponse.missingFields.forEach(field => {
        newErrors[field] = `${field.replace('_', ' ')} is required`;
      });
      setFormErrors(newErrors);
    }
    else if (error.serverResponse?.invalidFields) {
      const newErrors = {};
      error.serverResponse.invalidFields.forEach(field => {
        newErrors[field] = error.serverResponse.error;
      });
      setFormErrors(newErrors);
    }
    else {
      setError(error.message || 'Registration failed. Please try again.');
    }

    // Clear sensitive fields
    setSignupData(prev => ({
      ...prev,
      password: '',
      confirmPassword: ''
    }));
  } finally {
    setLoading(false);
  }
};
// Helper function
const resetForm = () => {
  setSignupData({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
};


  if (!isOpen) return null;

  return (

       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
          disabled={loading}
        >
          ✕
        </button>

        <div className="flex border-b">
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('login')}
            disabled={loading}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('signup')}
            disabled={loading}
          >
            Create Account
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {error}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwordff
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : 'Login'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {error}
                </div>
              )}
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="signup-first-name" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="signup-first-name"
                      type="text"
                      value={signupData.first_name}
                      onChange={(e) => setSignupData({...signupData, first_name: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        formErrors.first_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      disabled={loading}
                    />
                    {formErrors.first_name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.first_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="signup-last-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="signup-last-name"
                      type="text"
                      value={signupData.last_name}
                      onChange={(e) => setSignupData({...signupData, last_name: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        formErrors.last_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      disabled={loading}
                    />
                    {formErrors.last_name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.last_name}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwordff
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="signup-confirm-password"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : 'Sign Up'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
    // ... (keep the existing JSX return statement exactly as is)
    // The modal rendering code doesn't need changes
  );
};

export default AuthModal;