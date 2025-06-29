

import axios from 'axios';
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const DataContext = createContext();

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5003/api',
  timeout: 15000, // Increased timeout to 15s
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Enhanced request interceptor
api.interceptors.request.use(config => {
  console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token.trim()}`;
  }
  return config;
}, error => {
  console.error('[Request Error]', error);
  return Promise.reject(error);
});

// Enhanced response interceptor
api.interceptors.response.use(
  response => {
    console.log(`[Response] ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    const errorDetails = {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code,
    };
    console.error('[API Error]', errorDetails);
    return Promise.reject(error);
  }
);

export function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postError, setPostError] = useState(null);
  const [author, setAuthorPosts] = useState(null);
const register = async (userData) => {
  try {
    const payload = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password
    };

    // Use the api instance which already has the baseURL configured
    const response = await api.post('/users/create', payload);

    if (!response.data.success) {
      const error = new Error(response.data.error || 'Registration failed');
      error.serverResponse = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.response) {
      // Enhanced error handling
      const serverError = new Error(
        error.response.data?.error || 
        error.response.data?.message || 
        'Invalid registration data'
      );
      serverError.serverResponse = error.response.data;
      throw serverError;
    }
    
    throw error;
  }
};

const login = async (loginData) => {
  try {
    setIsLoading(true);
    const response = await api.post('/users/login', loginData);
    
    if (response.data?.token && response.data?.user) {
      const user = {
        ...response.data.user,
        _id: response.data.user._id || response.data.user.id
      };
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return { success: true, user };
    }
    
    throw new Error(response.data?.message || 'Login failed');
    
  } catch (error) {
    let errorMessage = 'Login failed';
    
    if (error.response) {
      // Handle specific HTTP error codes
      if (error.response.status === 401) {
        errorMessage = error.response.data?.message || 'Invalid email or password';
      } else if (error.response.status === 404) {
        errorMessage = 'No account found with this email';
      }
    }
    
    console.error('Login error:', error);
    return { success: false, error: errorMessage };
  } finally {
    setIsLoading(false);
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await api.post('/users/refresh-token', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.data.success) throw new Error(response.data.message || 'Token refresh failed');

      localStorage.setItem('token', response.data.token);
      const decoded = jwtDecode(response.data.token);
      const expiresIn = (decoded.exp * 1000) - Date.now();
      setTimeout(refreshToken, expiresIn - 60000);
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  };


  
  const updateUserFollowing = (userId, shouldFollow) => {
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      
      const following = new Set(prevUser.following || []);
      shouldFollow ? following.add(userId) : following.delete(userId);
      
      return {
        ...prevUser,
        following: Array.from(following)
      };
    });
  };

  const followUser = async (userId, action = 'follow') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await api.post(`/users/${userId}/${action}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const updatedUser = { ...user };
        if (action === 'follow') {
          updatedUser.following = [...(updatedUser.following || []), userId];
        } else {
          updatedUser.following = (updatedUser.following || []).filter(id => id !== userId);
        }
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Follow error:', error);
      throw error;
    }
  };

  const createPost = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await api.post('/blog/create', formData, {
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: (data, headers) => {
          if (data instanceof FormData) {
            delete headers['Content-Type'];
          }
          return data;
        }
      });

      return response.data;
    } catch (error) {
      console.error('Full error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw new Error(error.response?.data?.message || 'Post creation failed');
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await api.delete(`/blog/${postId}/comments/${commentId}`);
      
      if (response.data.success) {
        toast.success('Comment deleted');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete comment');
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await api.delete(`/blog/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Post deletion failed');
      }

      await fetchPosts();
      return response.data;
    } catch (error) {
      console.error('Delete post error:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const fetchPostById = async (postId) => {
    try {
      if (!isValidObjectId(postId)) {
        throw new Error(`Invalid post ID format: ${postId}`);
      }

      const response = await api.get(`/blog/${postId}`);
      if (!response.data) {
        throw new Error('Invalid response data');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch post:', {
        postId,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  };

const likePost = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await api.post(`/blog/${postId}/like`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.success) {
      return {
        success: true,
        likes: response.data.likes,
        likedBy: response.data.likedBy
      };
    }
    throw new Error(response.data.message || 'Like action failed');
  } catch (error) {
    console.error('Like error:', {
      postId,
      error: error.message,
      response: error.response?.data
    });
    throw error;
  }
};

const unlikePost = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await api.post(`/blog/${postId}/unlike`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.success) {
      return {
        success: true,
        likes: response.data.likes,
        likedBy: response.data.likedBy
      };
    }
    throw new Error(response.data.message || 'Unlike action failed');
  } catch (error) {
    console.error('Unlike error:', {
      postId,
      error: error.message,
      response: error.response?.data
    });
    throw error;
  }
};


// In your DataContext.js
const fetchAuthorPosts = async (authorId) => {
  try {
    if (!isValidObjectId(authorId)) {
      throw new Error(`Invalid author ID format: ${authorId}`);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await api.get(`/users/${authorId}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Invalid response format');
    }

    // Process posts to ensure consistent image URLs
    const processedPosts = response.data.posts.map(post => ({
      ...post,
      imageUrl: post.imageUrl || 
        `${import.meta.env.VITE_API_URL || 'http://localhost:5003'}/${post.image}`.replace(/\\/g, '/')
    }));

    return processedPosts;
    
  } catch (error) {
    console.error('Detailed author posts error:', {
      authorId,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    let errorMessage = 'Failed to load posts';
    if (error.response?.status === 401) errorMessage = 'Please login to view posts';
    if (error.response?.status === 404) errorMessage = 'User not found';

    throw new Error(errorMessage);
  }
};

  const fetchSinglePost = useCallback(async (postId) => {
    try {
      if (!isValidObjectId(postId)) {
        throw new Error(`Invalid post ID format: ${postId}`);
      }

      setPostLoading(true);
      setPostError(null);
      
      const response = await api.get(`/blog/${postId}`, {
        validateStatus: status => status < 500
      });

      if (response.status === 404) {
        throw new Error('Post not found');
      }

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid post data');
      }

      const processedPost = {
        ...response.data.data,
        imageUrl: response.data.data.imageUrl || 
          `${import.meta.env.VITE_API_URL || 'http://localhost:5003'}/${response.data.data.image}`.replace(/\\/g, '/')
      };

      setCurrentPost(processedPost);
      return processedPost;
    } catch (error) {
      console.error('Fetch post error:', {
        error: error.message,
        response: error.response?.data
      });
      setPostError(error.message);
      throw error;
    } finally {
      setPostLoading(false);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
  try {
    setIsLoading(true);
    const response = await api.get('/blog/all'); // Remove '/api' if your baseURL already includes it
    // ... handle response
  } catch (error) {
    console.error('Error fetching posts:', {
      error: error.message,
      url: error.config?.url,
      status: error.response?.status
    });
    setPostError('Failed to load posts. Please try again.');
  } finally {
    setIsLoading(false);
  }
}, []);


  
  useEffect(() => {
    const initialize = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (!userData._id && userData.id) userData._id = userData.id;
          setUser(userData);
        } catch (error) {
          console.error('User parse error:', error);
          logout();
        }
      }
      await fetchPosts();
    };
    initialize();
  }, [fetchPosts]);

  return (
    <DataContext.Provider value={{
      api,
      user,
      posts,
      isLoading,
      postLoading,
      postError,
      currentPost,
      register,
      login,
      logout,
      fetchPosts,
      fetchSinglePost,
      createPost,
      createPost,
      followUser,
      updateUserFollowing,
      deleteComment,
      deletePost,
      fetchAuthorPosts,
      likePost,
      unlikePost,
      fetchPostById,
      isValidObjectId
      // ... (include all other functions)
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
export default DataContext;