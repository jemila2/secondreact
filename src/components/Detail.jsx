


// import { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { TbHeartPlus } from 'react-icons/tb';
// import { CiBookmark } from 'react-icons/ci';
// import { VscArrowSwap } from 'react-icons/vsc';
// import { BsThreeDots } from 'react-icons/bs';
// import { FaRegComment } from 'react-icons/fa';
// import image23 from './image/image23.JPEG';
// import { useData } from '../context/DataContext';
// import axios from 'axios';
// import CommentForm from './CommentForm';


// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5003',
//   withCredentials: true
// });

// // Improved axios interceptors
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center h-screen">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//   </div>
// );

// const Detail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { 
//     currentPost, 
//     postLoading, 
//     postError, 
//     fetchSinglePost,
//     deletePost,
//     deleteComment,
//     likePost,
//     unlikePost,
//     isValidObjectId 
//   } = useData();
  
//   const [views, setViews] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [authorPosts, setAuthorPosts] = useState([]);
//   const [loadingPosts, setLoadingPosts] = useState(false);
//   const [postsError, setPostsError] = useState(null);
//   const [commentText, setCommentText] = useState('');
//   const [isLikeLoading, setIsLikeLoading] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [localPost, setLocalPost] = useState(currentPost || {}); 
//   const [user, setUser] = useState(null);
//   // const [setPostState,]

//   const authorPostsCache = useRef(new Map());

//   // Initialize user state
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         if (!userData._id && userData.id) {
//           userData._id = userData.id;
//         }
//         setUser(userData);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   // Fetch comments for the post
//   const fetchComments = async (postId) => {
//     try {
//       const response = await api.get(`/api/blog/${postId}`);
//       setComments(response.data?.data?.comments || []);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//       toast.error('Failed to load comments');
//     }
//   };

//   // Increment post views
//   const incrementViews = async (postId) => {
//     try {
//       const response = await api.patch(`/api/blog/${postId}/views`);
//       setViews(response.data?.views || 0);
//     } catch (error) {
//       console.error('Error incrementing views:', error);
//     }
//   };

//   // Handle image loading errors
//   const handleImageError = (e) => {
//     e.target.onerror = null;
//     e.target.src = image23;
//   };

//   // Fetch author posts with caching
//   const fetchAuthorPosts = async (authorId) => {
//     if (!authorId || !isValidObjectId(authorId)) {
//       throw new Error(`Invalid author ID: ${authorId}`);
//     }
    
//     if (authorPostsCache.current.has(authorId)) {
//       return authorPostsCache.current.get(authorId);
//     }

//     try {
//       const response = await api.get(`/api/users/${authorId}/posts`);
//       const posts = response.data?.posts || [];
//       authorPostsCache.current.set(authorId, posts);
//       return posts;
//     } catch (error) {
//       console.error('Error fetching author posts:', error);
//       throw error;
//     }
//   };






//   // const handleFollowAction = async (action) => {
//   //   if (!currentUser || isLoading) return;

//   //   setIsLoading(true);
//   //   console.log(`Initiating ${action} action:`, {
//   //     targetUser: profileUser._id, 
//   //     currentUser: currentUser._id,
//   //     action
//   //   });

//   //   try {
//   //     const response = await axios.post(
//   //       `/api/users/${profileUser._id}/${action}`,
//   //       {},
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     if (response.data.success) {
//   //       setProfileUser(prev => ({
//   //         ...prev,
//   //         followersCount: response.data.followersCount,
//   //         isFollowing: response.data.isFollowing
//   //       }));

//   //       console.log(`${action} successful`, response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error(`${action} failed:`, error.response?.data || error.message);
//   //     // Optionally show error to user
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // Determine which action to take based on current follow status
//   // const toggleFollow = () => {
//   //   const action = profileUser.isFollowing ? 'unfollow' : 'follow';
//   //   handleFollowAction(action);
//   // };
//   // Load author posts when author changes
//   useEffect(() => {
//     if (!currentPost?.author?._id) return;

//     const loadAuthorPosts = async () => {
//       setLoadingPosts(true);
//       setPostsError(null);
      
//       try {
//         const posts = await fetchAuthorPosts(currentPost.author._id);
//         setAuthorPosts(posts);
//       } catch (error) {
//         console.error('Failed to load author posts:', error);
//         setPostsError(error.response?.data?.message || error.message);
//       } finally {
//         setLoadingPosts(false);
//       }
//     };
    
//     loadAuthorPosts();
//   }, [currentPost?.author?._id]);

//   // Handle post deletion
//   const handleDeletePost = async () => {
//     try {
//       await deletePost(currentPost._id);
//       toast.success('Post deleted successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setShowDeleteModal(false);
//     }
//   };

//   const followUser = async (userId, action) => {
//   try {
//     const response = await api.post(`/api/users/${userId}/${action}`);
//     return response.data;
//   } catch (error) {
//     console.error(`${action} operation failed:`, error);
//     throw error;
//   }
// };

// // const handleFollow = async () => {
// //   try {
// //     if (!user?._id || !currentPost?.author?._id) {
// //       throw new Error('User session expired - please login again');
// //     }

// //     if (user._id === currentPost.author._id) {
// //       return toast.error("You can't follow yourself");
// //     }

// //     const action = isFollowing ? 'unfollow' : 'follow';
// //     console.log('Making request to:', `/api/users/${currentPost.author._id}/${action}`);

// //     const response = await api.post(`/api/users/${currentPost.author._id}/${action}`);

// //     if (response.data?.success) {
// //       setIsFollowing(!isFollowing);
// //       toast.success(action === 'follow' ? 'Successfully followed' : 'Successfully unfollowed');
// //     }

// //   } catch (error) {
// //     console.error('Follow action failed:', {
// //       status: error.response?.status,
// //       data: error.response?.data,
// //       endpoint: error.config?.url
// //     });

// //     if (error.response?.status === 404) {
// //       toast.error('Endpoint not found - check server routes');
// //     } else {
// //       toast.error(error.response?.data?.message || 'Follow action failed');
// //     }
// //   }
// // };


// const handleFollow = async () => {
//   try {
//     if (!user?._id || !currentPost?.author?._id) {
//       throw new Error('User session expired - please login again');
//     }

//     if (user._id === currentPost.author._id) {
//       return toast.error("You can't follow yourself");
//     }

//     const action = isFollowing ? 'unfollow' : 'follow';
//     console.log('Making request to:', `/api/users/${currentPost.author._id}/${action}`);

//     const response = await api.post(`/api/users/${currentPost.author._id}/${action}`);

//     if (response.data?.success) {
//       setIsFollowing(!isFollowing);
//       toast.success(action === 'follow' ? 'Successfully followed' : 'Successfully unfollowed');
//     }

//   } catch (error) {
//     console.error('Follow action failed:', error);
//     toast.error(error.response?.data?.message || 'Follow action failed');
//   }
// };

// useEffect(() => {
//   const loadPost = async () => {
//     try {
//       if (id) {
//         const post = await fetchSinglePost(id);
//         if (post) {
//           await incrementViews(id);
//           setIsLiked(post.likedBy?.includes(user?._id) || false);
          
//           // Check if user is following the author
//           if (user?.following) {
//             setIsFollowing(user.following.includes(post.author?._id));
//           }
          
//           await fetchComments(id);
//           setLocalPost(post);
//         }
//       }
//     } catch (error) {
//       // Error handling
//     }
//   };

//   loadPost();
// }, [id, fetchSinglePost, user?._id, navigate, user?.following]);




//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
//     try {
//       await deleteComment(currentPost._id, commentId);
//       toast.success('Comment deleted');
//       await fetchComments(currentPost._id);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Handle comment submission
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!commentText.trim()) {
//       toast.error('Comment cannot be empty');
//       return;
//     }

//     if (!user) {
//       toast.error('Please login to comment');
//       navigate('/login');
//       return;
//     }

//     try {
//       const tempComment = {
//         _id: `temp-${Date.now()}`,
//         text: commentText,
//         author: {
//           _id: user._id,
//           name: user.name,
//           avatar: user.avatar
//         },
//         createdAt: new Date().toISOString()
//       };

//       setComments(prev => [tempComment, ...prev]);
//       setCommentText('');

//       const response = await api.post(`/api/blog/${id}/comments`, {
//         content: commentText
//       });

//       if (response.data?.success) {
//         setComments(prev => [
//           response.data.comment,
//           ...prev.filter(c => c._id !== tempComment._id)
//         ]);
//         toast.success('Comment added successfully');
//       }
//     } catch (error) {
//       setComments(prev => prev.filter(c => !c._id.startsWith('temp-')));
//       toast.error(error.response?.data?.message || 'Failed to add comment');
//     }
//   };

//   const navigateToProfile = () => {
//     if (currentPost?.author?._id) {
//       navigate(`/user/${currentPost.author._id}`);
//     }
//   };

//   // Handle like action
//   const handleLike = async () => {
//     try {
//       setIsLikeLoading(true);
      
//       if (!user) {
//         toast.error('Please login to like posts');
//         navigate('/login');
//         return;
//       }

//       const wasLiked = isLiked;
//       setIsLiked(!wasLiked);
//       setLocalPost(prev => ({
//         ...prev,
//         likes: wasLiked ? (prev.likes || 0) - 1 : (prev.likes || 0) + 1,
//         likedBy: wasLiked 
//           ? (prev.likedBy || []).filter(id => id !== user._id) 
//           : [...(prev.likedBy || []), user._id]
//       }));

//       const endpoint = wasLiked ? 'unlike' : 'like';
//       await api.post(`/api/blog/${currentPost._id}/${endpoint}`);
      
//       toast.success(wasLiked ? 'Post unliked' : 'Post liked');
//     } catch (error) {
//       setIsLiked(prev => !prev);
//       setLocalPost(prev => ({
//         ...prev,
//         likes: isLiked ? (prev.likes || 0) + 1 : (prev.likes || 0) - 1,
//         likedBy: isLiked 
//           ? [...(prev.likedBy || []), user._id]
//           : (prev.likedBy || []).filter(id => id !== user._id)
//       }));
      
//       toast.error(error.response?.data?.message || 'Failed to update like status');
//     } finally {
//       setIsLikeLoading(false);
//     }
//   };



//   // Load post data when component mounts
//   useEffect(() => {
//     const loadPost = async () => {
//       try {
//         if (id) {
//           const post = await fetchSinglePost(id);
//           if (post) {
//             await incrementViews(id);
//             setIsLiked(post.likedBy?.includes(user?._id) || false);
//             setIsFollowing(user?.following?.includes(post.author?._id) || false);
//             await fetchComments(id);
//             setLocalPost(post);
//           }
//         }
//       } catch (error) {
//         if (error.response?.status === 404) {
//           toast.error('Post not found');
//           navigate('/');
//         } else {
//           toast.error('Failed to load post');
//         }
//       }
//     };

//     loadPost();
//   }, [id, fetchSinglePost, user?._id, navigate]);

//   if (postLoading) return <LoadingSpinner />;

//   if (postError) return (
//     <div className="text-center py-8 text-red-500">
//       {postError}
//       <button 
//         onClick={() => fetchSinglePost(id)} 
//         className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
//       >
//         Retry
//       </button>
//     </div>
//   );
  
//   if (!currentPost?._id) return (
//     <div className="text-center py-8">
//       Post not found
//       <button 
//         onClick={() => navigate('/')} 
//         className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
//       >
//         Go Home
//       </button>
//     </div>
//   );

//   return (
//     <div className="flex w-full bg-gray-100 min-h-screen gap-6 p-4">
//       {/* Left sidebar - Post actions */}
//       <div className="bg-gray-100 w-20 sticky top-0 h-full">
//         <div className="ml-4 mt-4 space-y-8">
//           <button 
//             onClick={handleLike}
//             disabled={!user || isLikeLoading}
//             className="flex flex-col items-center group"
//             aria-label={isLiked ? 'Unlike post' : 'Like post'}
//           >
//             {isLikeLoading ? (
//               <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-red-500 rounded-full"></div>
//             ) : (
//               <TbHeartPlus className={`text-2xl ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 group-hover:text-red-300'}`} />
//             )}
//             <span className={`mt-1 text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
//               {localPost.likes || 0}
//             </span>
//           </button>
          
//           <button 
//             onClick={() => setShowComments(!showComments)}
//             className="flex flex-col items-center group"
//             aria-label="Show comments"
//           >
//             <FaRegComment className={`text-2xl ${showComments ? 'text-blue-500' : 'text-gray-500 group-hover:text-blue-300'}`} />
//             <span className={`mt-1 text-sm ${showComments ? 'text-blue-500' : 'text-gray-500'}`}>
//               {comments.length || 0}
//             </span>
//           </button>

//           {/* Bookmark button */}
//           <div className="flex flex-col items-center group">
//             <CiBookmark className="text-2xl text-gray-500 group-hover:text-blue-300" />
//             <span className="mt-1 text-gray-500 text-sm">0</span>
//           </div>
          
//           {/* Share button */}
//           <VscArrowSwap className="text-2xl mx-auto text-gray-500 hover:text-blue-300" />
          
//           {/* More options */}
//           <BsThreeDots className="text-2xl mx-auto text-gray-500 hover:text-blue-300" />

//           {/* Delete post button (only for author/admin) */}
//           {(user?._id === currentPost.author?._id || user?.isAdmin) && (
//             <button 
//               onClick={() => setShowDeleteModal(true)}
//               className="flex flex-col items-center group text-red-500 hover:text-red-700"
//               aria-label="Delete post"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//               </svg>
//               <span className="mt-1 text-sm">Delete</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Main content - Post details */}
//       <div className="flex-1">
//         <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
//           {/* Author info */}
//           <div className="flex items-center mb-6">
//             <div 
//               className="cursor-pointer"
//               onClick={navigateToProfile}
//             >
//               <img 
//                 className="h-10 w-10 rounded-full object-cover"
//                 src={currentPost.author?.avatar || image23} 
//                 alt={currentPost.author?.name || 'Unknown'} 
//                 onError={handleImageError}
//               />
//             </div>
//             <div className="ml-3">
//               <div 
//                 className="font-medium text-gray-800 hover:underline cursor-pointer"
//                 onClick={navigateToProfile}
//               >
//                 {currentPost.author?.name || 'Unknown'}
//               </div>
//               <div className="text-gray-500 text-sm">
//                 Posted {new Date(currentPost.createdAt).toLocaleDateString()} • 
//                 <span className="ml-1">{currentPost.views || views} views</span>
//               </div>
//             </div>
//           </div>

//           {/* Post content */}
//           <h1 className="text-3xl font-bold mb-4 text-gray-900">{currentPost.title}</h1>
          
//           <div 
//             className="prose max-w-none mb-6 text-gray-700" 
//             dangerouslySetInnerHTML={{ __html: currentPost.content }} 
//           />
          
//           {/* Post image */}
//           {currentPost.imageUrl && (
//             <div className="mb-6 rounded-lg overflow-hidden">
//               <img 
//                 src={currentPost.imageUrl} 
//                 alt={currentPost.title} 
//                 className="w-full h-auto max-h-96 object-cover"
//                 onError={handleImageError}
//               />
//             </div>
//           )}

//           {/* Comments section */}
//           {showComments && (
//             <div className="bg-white rounded-lg p-6 mt-4 shadow-sm">
//               <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
              
//               <CommentForm 
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 onSubmit={handleCommentSubmit}
//               />

//               <div className="space-y-4 mt-4">
//                 {comments.length > 0 ? (
//                   comments.map((comment) => (
//                     <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-0 group">
//                       <div className="flex items-start">
//                         <img 
//                           src={comment.author?.avatar || image23} 
//                           alt={comment.author?.name || 'User'}
//                           className="h-8 w-8 rounded-full object-cover mr-3"
//                           onError={handleImageError}
//                         />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <div className="font-medium text-gray-800">
//                                 {comment.author?.name || 'Anonymous'}
//                               </div>
//                               <div className="text-gray-500 text-xs mb-1">
//                                 {new Date(comment.createdAt).toLocaleString()}
//                               </div>
//                             </div>
//                             {(user?._id === comment.author?._id || user?.isAdmin) && (
//                               <button 
//                                 onClick={() => handleDeleteComment(comment._id)}
//                                 className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                                 aria-label="Delete comment"
//                               >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                 </svg>
//                               </button>
//                             )}
//                           </div>
//                           <p className="text-gray-700">{comment.text}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-center py-4">No comments yet</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right sidebar - Author profile and more posts */}
//       <div className="w-80 sticky top-0 h-full hidden lg:block">
//         {currentPost?.author && (
//           <div className="bg-white rounded-lg mb-4 shadow-sm">
//             <div className="bg-purple-700 rounded-t-lg h-16 relative">
//               <div className="absolute -bottom-4 left-4 flex items-center">
//                 <div 
//                   className="cursor-pointer"
//                   onClick={navigateToProfile}
//                 >
//                   <img 
//                     className="h-16 w-16 rounded-full border-2 border-white object-cover"
//                     src={currentPost.author.avatar || image23}
//                     alt={currentPost.author.name}
//                     onError={handleImageError}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="pt-10 px-4 pb-4">
//               <div className="flex gap-2 mb-3">
//   <button 
//   onClick={handleFollow}
//   disabled={!user || user._id === currentPost.author._id || isLikeLoading}
//   className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
//     isFollowing 
//       ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
//       : 'bg-blue-600 text-white hover:bg-blue-700'
//   } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
// >
//   {isFollowing ? (
//     <>
//       <span className="inline-flex items-center">
//         Following
//       </span>
//     </>
//   ) : (
//     'Follow'
//   )}
// </button>
//                 <button 
//                   onClick={navigateToProfile}
//                   className="flex-1 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
//                 >
//                   View Profile
//                 </button>
//               </div>

//               <div className="mt-4 text-gray-600">
//                 <p className="text-sm">{currentPost.author.bio || 'No bio available'}</p>
                
//                 <div className="flex gap-4 mt-3 text-sm">
//                   <div 
//                     className="cursor-pointer hover:underline"
//                     onClick={navigateToProfile}
//                   >
//                     <span className="font-bold">
//                       {(currentPost.author.followers || []).length}
//                     </span>
//                     <span className="text-gray-500 ml-1">Followers</span>
//                   </div>
//                   <div 
//                     className="cursor-pointer hover:underline"
//                     onClick={navigateToProfile}
//                   >
//                     <span className="font-bold">{(currentPost.author.following || []).length}</span>
//                     <span className="text-gray-500 ml-1">Following</span>
//                   </div>
//                   <div 
//                     className="cursor-pointer hover:underline"
//                     onClick={() => navigate(`/user/${currentPost.author._id}/posts`)}
//                   >
//                     <span className="font-bold">{(authorPosts || []).length}</span>
//                     <span className="text-gray-500 ml-1">Posts</span>
//                   </div>
//                 </div>

//                 {currentPost.author.location && (
//                   <div className="mt-3">
//                     <h3 className="font-bold text-gray-800">Location</h3>
//                     <p className="text-sm">{currentPost.author.location}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-lg p-4 shadow-sm">
//           <h2 className="text-xl font-bold mb-4 text-gray-800">
//             More from {currentPost?.author?.name || 'this author'}
//           </h2>
          
//           {loadingPosts ? (
//             <div className="flex justify-center py-4">
//               <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//               <span className="ml-2 text-gray-500">Loading posts...</span>
//             </div>
//           ) : postsError ? (
//             <div className="text-center py-4">
//               <div className="text-red-500 mb-2 flex items-center justify-center">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {postsError}
//               </div>
//               <button
//                 onClick={() => {
//                   setPostsError(null);
//                   fetchAuthorPosts(currentPost.author._id)
//                     .then(posts => setAuthorPosts(posts))
//                     .catch(error => setPostsError(error.message));
//                 }}
//                 className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (authorPosts || []).length > 0 ? (
//             <div className="space-y-3">
//               {authorPosts.map(post => (
//                 <div 
//                   key={post._id} 
//                   className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//                   onClick={() => navigate(`/post/${post._id}`)}
//                 >
//                   <h3 className="font-medium text-gray-800 line-clamp-2">{post.title}</h3>
//                   <div className="flex items-center mt-1 text-xs text-gray-500">
//                     <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                     <span className="mx-2">•</span>
//                     <span>{post.views || 0} views</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-6 text-gray-500">
//               <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="mt-2">No other posts available</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Delete confirmation modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">Delete Post</h3>
//             <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeletePost}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete Post
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Detail;




import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TbHeartPlus } from 'react-icons/tb';
import { CiBookmark } from 'react-icons/ci';
import { VscArrowSwap } from 'react-icons/vsc';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import image23 from './image/image23.JPEG';
import { useData } from '../context/DataContext';
import axios from 'axios';
import CommentForm from './CommentForm';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5003',
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentPost, 
    postLoading, 
    postError, 
    fetchSinglePost,
    deletePost,
    deleteComment,
    likePost,
    unlikePost,
    isValidObjectId 
  } = useData();
  
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localPost, setLocalPost] = useState(currentPost || {}); 
  const [user, setUser] = useState(null);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const authorPostsCache = useRef(new Map());

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (!userData._id && userData.id) {
          userData._id = userData.id;
        }
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/api/blog/${postId}`);
      setComments(response.data?.data?.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    }
  };

  const incrementViews = async (postId) => {
    try {
      const response = await api.patch(`/api/blog/${postId}/views`);
      setViews(response.data?.views || 0);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = image23;
  };

  const fetchAuthorPosts = async (authorId) => {
    if (!authorId || !isValidObjectId(authorId)) {
      throw new Error(`Invalid author ID: ${authorId}`);
    }
    
    if (authorPostsCache.current.has(authorId)) {
      return authorPostsCache.current.get(authorId);
    }

    try {
      const response = await api.get(`/api/users/${authorId}/posts`);
      const posts = response.data?.posts || [];
      authorPostsCache.current.set(authorId, posts);
      return posts;
    } catch (error) {
      console.error('Error fetching author posts:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!localPost?.author?._id) return;

    const loadAuthorPosts = async () => {
      setLoadingPosts(true);
      setPostsError(null);
      
      try {
        const posts = await fetchAuthorPosts(localPost.author._id);
        setAuthorPosts(posts);
      } catch (error) {
        console.error('Failed to load author posts:', error);
        setPostsError(error.response?.data?.message || error.message);
      } finally {
        setLoadingPosts(false);
      }
    };
    
    loadAuthorPosts();
  }, [localPost?.author?._id]);

  const handleDeletePost = async () => {
    try {
      await deletePost(localPost._id);
      toast.success('Post deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleFollow = async () => {
    try {
      setIsFollowLoading(true);
      
      if (!user?._id || !localPost?.author?._id) {
        throw new Error('Please login to follow users');
      }

      if (user._id === localPost.author._id) {
        return toast.error("You can't follow yourself");
      }

      const action = isFollowing ? 'unfollow' : 'follow';
      const response = await api.post(`/api/users/${localPost.author._id}/${action}`);

      if (response.data?.success) {
        setIsFollowing(!isFollowing);
        
        setLocalPost(prev => ({
          ...prev,
          author: {
            ...prev.author,
            followers: action === 'follow' 
              ? [...(prev.author.followers || []), user._id]
              : (prev.author.followers || []).filter(id => id !== user._id)
          }
        }));

        toast.success(action === 'follow' ? 'Successfully followed' : 'Successfully unfollowed');
      }
    } catch (error) {
      console.error('Follow action failed:', error);
      toast.error(error.response?.data?.message || 'Follow action failed');
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteComment(localPost._id, commentId);
      toast.success('Comment deleted');
      await fetchComments(localPost._id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!user) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }

    try {
      const tempComment = {
        _id: `temp-${Date.now()}`,
        text: commentText,
        author: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar
        },
        createdAt: new Date().toISOString()
      };

      setComments(prev => [tempComment, ...prev]);
      setCommentText('');

      const response = await api.post(`/api/blog/${id}/comments`, {
        content: commentText
      });

      if (response.data?.success) {
        setComments(prev => [
          response.data.comment,
          ...prev.filter(c => c._id !== tempComment._id)
        ]);
        toast.success('Comment added successfully');
      }
    } catch (error) {
      setComments(prev => prev.filter(c => !c._id.startsWith('temp-')));
      toast.error(error.response?.data?.message || 'Failed to add comment');
    }
  };

  const navigateToProfile = () => {
    if (localPost?.author?._id) {
      navigate(`/user/${localPost.author._id}`);
    }
  };

const handleLike = async () => {
  try {
    setIsLikeLoading(true);
    
    if (!user) {
      toast.error('Please login to like posts');
      navigate('/login');
      return;
    }

    const wasLiked = isLiked;
    // Optimistic update
    setIsLiked(!wasLiked);
    setLocalPost(prev => ({
      ...prev,
      likes: wasLiked ? (prev.likes || 0) - 1 : (prev.likes || 0) + 1,
      likedBy: wasLiked 
        ? (prev.likedBy || []).filter(id => id !== user._id) 
        : [...(prev.likedBy || []), user._id]
    }));

    const endpoint = wasLiked ? 'unlike' : 'like';
    const response = await api.post(`/api/blog/${localPost._id}/${endpoint}`);
    
    if (!response.data?.success) {
      // Revert if the request failed
      setIsLiked(wasLiked);
      setLocalPost(prev => ({
        ...prev,
        likes: wasLiked ? (prev.likes || 0) + 1 : (prev.likes || 0) - 1,
        likedBy: wasLiked 
          ? [...(prev.likedBy || []), user._id]
          : (prev.likedBy || []).filter(id => id !== user._id)
      }));
      throw new Error(response.data?.message || 'Like action failed');
    }

    toast.success(wasLiked ? 'Post unliked' : 'Post liked');
  } catch (error) {
    console.error('Detailed like error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    toast.error(error.response?.data?.message || 'Failed to update like status');
  } finally {
    setIsLikeLoading(false);
  }
};

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (id) {
          const post = await fetchSinglePost(id);
          if (post) {
            await incrementViews(id);
            setIsLiked(post.likedBy?.includes(user?._id) || false);
            
            if (user?.following) {
              setIsFollowing(user.following.includes(post.author?._id));
            }
            
            await fetchComments(id);
            setLocalPost(post);
          }
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error('Post not found');
          navigate('/');
        } else {
          toast.error('Failed to load post');
        }
      }
    };

    loadPost();
  }, [id, fetchSinglePost, user?._id, navigate, user?.following]);

  if (postLoading) return <LoadingSpinner />;

  if (postError) return (
    <div className="text-center py-8 text-red-500">
      {postError}
      <button 
        onClick={() => fetchSinglePost(id)} 
        className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
      >
        Retry
      </button>
    </div>
  );
  
  if (!localPost?._id) return (
    <div className="text-center py-8">
      Post not found
      <button 
        onClick={() => navigate('/')} 
        className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
      >
        Go Home
      </button>
    </div>
  );

  return (
    <div className="flex w-full bg-gray-100 min-h-screen gap-6 p-4">
      <div className="bg-gray-100 w-20 sticky top-0 h-full">
        <div className="ml-4 mt-4 space-y-8">
          <button 
            onClick={handleLike}
            disabled={!user || isLikeLoading}
            className="flex flex-col items-center group"
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
          >
            {isLikeLoading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-red-500 rounded-full"></div>
            ) : (
              <TbHeartPlus className={`text-2xl ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 group-hover:text-red-300'}`} />
            )}
            <span className={`mt-1 text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
              {localPost.likes || 0}
            </span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center group"
            aria-label="Show comments"
          >
            <FaRegComment className={`text-2xl ${showComments ? 'text-blue-500' : 'text-gray-500 group-hover:text-blue-300'}`} />
            <span className={`mt-1 text-sm ${showComments ? 'text-blue-500' : 'text-gray-500'}`}>
              {comments.length || 0}
            </span>
          </button>

          <div className="flex flex-col items-center group">
            <CiBookmark className="text-2xl text-gray-500 group-hover:text-blue-300" />
            <span className="mt-1 text-gray-500 text-sm">0</span>
          </div>
          
          <VscArrowSwap className="text-2xl mx-auto text-gray-500 hover:text-blue-300" />
          
          <BsThreeDots className="text-2xl mx-auto text-gray-500 hover:text-blue-300" />

          {(user?._id === localPost.author?._id || user?.isAdmin) && (
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex flex-col items-center group text-red-500 hover:text-red-700"
              aria-label="Delete post"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="mt-1 text-sm">Delete</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <div className="flex items-center mb-6">
            <div 
              className="cursor-pointer"
              onClick={navigateToProfile}
            >
              <img 
                className="h-10 w-10 rounded-full object-cover"
                src={localPost.author?.avatar || image23} 
                alt={localPost.author?.name || 'Unknown'} 
                onError={handleImageError}
              />
            </div>
            <div className="ml-3">
              <div 
                className="font-medium text-gray-800 hover:underline cursor-pointer"
                onClick={navigateToProfile}
              >
                {localPost.author?.name || 'Unknown'}
              </div>
              <div className="text-gray-500 text-sm">
                Posted {new Date(localPost.createdAt).toLocaleDateString()} • 
                <span className="ml-1">{localPost.views || views} views</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-gray-900">{localPost.title}</h1>
          
          <div 
            className="prose max-w-none mb-6 text-gray-700" 
            dangerouslySetInnerHTML={{ __html: localPost.content }} 
          />
          
          {localPost.imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={localPost.imageUrl} 
                alt={localPost.title} 
                className="w-full h-auto max-h-96 object-cover"
                onError={handleImageError}
              />
            </div>
          )}

          {showComments && (
            <div className="bg-white rounded-lg p-6 mt-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
              
              <CommentForm 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onSubmit={handleCommentSubmit}
              />

              <div className="space-y-4 mt-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-0 group">
                      <div className="flex items-start">
                        <img 
                          src={comment.author?.avatar || image23} 
                          alt={comment.author?.name || 'User'}
                          className="h-8 w-8 rounded-full object-cover mr-3"
                          onError={handleImageError}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">
                                {comment.author?.name || 'Anonymous'}
                              </div>
                              <div className="text-gray-500 text-xs mb-1">
                                {new Date(comment.createdAt).toLocaleString()}
                              </div>
                            </div>
                            {(user?._id === comment.author?._id || user?.isAdmin) && (
                              <button 
                                onClick={() => handleDeleteComment(comment._id)}
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Delete comment"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No comments yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-80 sticky top-0 h-full hidden lg:block">
        {localPost?.author && (
          <div className="bg-white rounded-lg mb-4 shadow-sm">
            <div className="bg-purple-700 rounded-t-lg h-16 relative">
              <div className="absolute -bottom-4 left-4 flex items-center">
                <div 
                  className="cursor-pointer"
                  onClick={navigateToProfile}
                >
                  <img 
                    className="h-16 w-16 rounded-full border-2 border-white object-cover"
                    src={localPost.author.avatar || image23}
                    alt={localPost.author.name}
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
            <div className="pt-10 px-4 pb-4">
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={handleFollow}
                  disabled={!user || user._id === localPost.author._id || isFollowLoading}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isFollowLoading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                  onClick={navigateToProfile}
                  className="flex-1 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  View Profile
                </button>
              </div>

              <div className="mt-4 text-gray-600">
                <p className="text-sm">{localPost.author.bio || 'No bio available'}</p>
                
                <div className="flex gap-4 mt-3 text-sm">
                  <div 
                    className="cursor-pointer hover:underline"
                    onClick={navigateToProfile}
                  >
                    <span className="font-bold">
                      {(localPost.author.followers || []).length}
                    </span>
                    <span className="text-gray-500 ml-1">Followers</span>
                  </div>
                  <div 
                    className="cursor-pointer hover:underline"
                    onClick={navigateToProfile}
                  >
                    <span className="font-bold">{(localPost.author.following || []).length}</span>
                    <span className="text-gray-500 ml-1">Following</span>
                  </div>
                  <div 
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate(`/user/${localPost.author._id}/posts`)}
                  >
                    <span className="font-bold">{(authorPosts || []).length}</span>
                    <span className="text-gray-500 ml-1">Posts</span>
                  </div>
                </div>

                {localPost.author.location && (
                  <div className="mt-3">
                    <h3 className="font-bold text-gray-800">Location</h3>
                    <p className="text-sm">{localPost.author.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            More from {localPost?.author?.name || 'this author'}
          </h2>
          
          {loadingPosts ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-500">Loading posts...</span>
            </div>
          ) : postsError ? (
            <div className="text-center py-4">
              <div className="text-red-500 mb-2 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {postsError}
              </div>
              <button
                onClick={() => {
                  setPostsError(null);
                  fetchAuthorPosts(localPost.author._id)
                    .then(posts => setAuthorPosts(posts))
                    .catch(error => setPostsError(error.message));
                }}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
              >
                Try Again
              </button>
            </div>
          ) : (authorPosts || []).length > 0 ? (
            <div className="space-y-3">
              {authorPosts.map(post => (
                <div 
                  key={post._id} 
                  className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  <h3 className="font-medium text-gray-800 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.views || 0} views</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2">No other posts available</p>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Delete Post</h3>
            <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;