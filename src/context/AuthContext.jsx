// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Initialize axios instance
//   const api = axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });

//   // Add request interceptor to include token
//   api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   // Check auth status on app load
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         const response = await api.get('/api/auth/me');
//         setUser(response.data.user);
//       } catch (error) {
//         console.error('Auth check error:', error);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);


// const register = async (userData) => {
//   try {
//     setIsLoading(true);
//     const response = await api.post('/users/create', userData);
    
//     if (response.data?.token) {
//       // Create a minimal user object if backend doesn't provide one
//       const user = response.data.user || {
//         email: userData.email,
//         first_name: userData.first_name,
//         last_name: userData.last_name,
//         // Add a temporary ID if needed
//         _id: response.data.userId || 'temp-' + Date.now()
//       };
      
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       toast.success('Registration successful!');
//       return { 
//         success: true, 
//         user,
//         token: response.data.token
//       };
//     }
    
//     throw new Error(response.data?.message || 'Registration failed');
//   } catch (error) {
//     console.error('Registration error:', error);
    
//     let errorMessage = 'Registration failed';
//     if (error.response?.data?.message) {
//       errorMessage = error.response.data.message;
//     }
    
//     toast.error(errorMessage);
//     return { 
//       success: false, 
//       error: errorMessage
//     };
//   } finally {
//     setIsLoading(false);
//   }
// };

// const login = async (loginData) => {
//   try {
//     setIsLoading(true);
//     const response = await api.post('/users/login', loginData);
    
//     if (response.data?.token && response.data?.user) {
//       const user = {
//         ...response.data.user,
//         _id: response.data.user._id || response.data.user.id
//       };
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return { success: true, user };
//     }
    
//     throw new Error(response.data?.message || 'Login failed');
    
//   } catch (error) {
//     let errorMessage = 'Login failed';
    
//     if (error.response) {
//       // Handle specific HTTP error codes
//       if (error.response.status === 401) {
//         errorMessage = error.response.data?.message || 'Invalid email or password';
//       } else if (error.response.status === 404) {
//         errorMessage = 'No account found with this email';
//       }
//     }
    
//     console.error('Login error:', error);
//     return { success: false, error: errorMessage };
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loading,
//       register,
//       login,
//       logout,
//       api
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };