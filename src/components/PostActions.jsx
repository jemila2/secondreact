


import { useContext, useState } from 'react';
// import { DataContext } from '../context/DataContext';
import DataContext from '../context/DataContext';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoginModal from './LoginModal';

const PostActions = ({ postId, likes = [], comments = [] }) => {
  const { user, likePost, addComment } = useContext(DataContext);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

 // In PostActions.js, update handleLike
const handleLike = async (e) => {
  e.preventDefault();
  if (!user) {
    setShowLoginModal(true);
    return;
  }

  try {
    const result = await likePost(postId);
    if (result?.success) {
      // Update local state if needed
    }
  } catch (error) {
    toast.error(error.message);
  }
};
  const handleCommentClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowComments(!showComments);
  };

const handleCommentSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Validate comment text
  if (!commentText.trim()) {
    toast.error("Comment cannot be empty");
    return;
  }

  // Check authentication state
  const authCheck = checkAuthStatus();
  if (!authCheck.isValid) {
    handleAuthFailure(authCheck);
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await addComment(postId, commentText.trim());
    
    if (response?.success) {
      setCommentText('');
      toast.success("Comment added successfully");
      if (onCommentAdded) onCommentAdded(response.comment);
    } else {
      toast.error(response?.message || "Failed to add comment");
    }
  } catch (error) {
    handleCommentError(error);
  } finally {
    setIsSubmitting(false);
  }
};

// Helper functions
const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

  if (!token || !userData) {
    return { isValid: false, reason: 'missing_data' };
  }

  try {
    const user = JSON.parse(userData);
    if (!user?._id) {
      return { isValid: false, reason: 'invalid_user' };
    }
    return { isValid: true };
  } catch (e) {
    return { isValid: false, reason: 'corrupted_data' };
  }
};

const handleAuthFailure = (authCheck) => {
  // Clear any invalid data
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Show appropriate message
  const messages = {
    missing_data: 'Please login to comment',
    invalid_user: 'Session expired. Please login again.',
    corrupted_data: 'Session data corrupted. Please login again.'
  };

  toast.error(messages[authCheck.reason] || 'Authentication required');
  setShowLoginModal(true);
};

const handleCommentError = (error) => {
  console.error('Comment error:', {
    error: error.message,
    status: error.response?.status,
    data: error.response?.data
  });

  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLoginModal(true);
  }

  toast.error(
    error.response?.data?.message || 
    error.message || 
    'Failed to add comment'
  );
};

  return (
    <div className="post-actions mt-3" onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={handleLike}
        className="mr-4 text-red-500 hover:text-red-700"
        disabled={isSubmitting}
      >
        {user && likes.includes(user._id) ? <FaHeart /> : <FaRegHeart />}
        <span className="ml-1">{likes.length}</span>
      </button>
      
      <button 
        onClick={handleCommentClick}
        className="text-blue-500 hover:text-blue-700"
        disabled={isSubmitting}
      >
        <FaComment />
        <span className="ml-1">{comments.length}</span>
      </button>

      {showComments && (
        <div className="mt-2">
          <div className="flex">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(e)}
              placeholder="Add a comment..."
              className="flex-grow border rounded-l p-1 text-sm"
              disabled={isSubmitting}
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-2 rounded-r text-sm"
              disabled={isSubmitting || !commentText.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          toast.success("Logged in successfully!");
        }}
      />
    </div>
  );
};

export default PostActions;

