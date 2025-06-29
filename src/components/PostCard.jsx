// components/PostCard.js
import { Link } from 'react-router-dom';
// import { TbMessageCircle,   } from 'react-icons';
import { TbMessageCircle } from 'react-icons/tb';
import { CiBookmark } from 'react-icons/ci';

const PostCard = ({ post, user, comments }) => {
      
  const handleLike = async () => {
    if (!post || isLikeLoading) return;
    
    try {
      setIsLikeLoading(true);
      
      if (!user) {
        toast.error('Please login to like posts');
        return;
      }

      const response = await likePost(
        post._id, 
        isLiked ? 'unlike' : 'like'
      );

      if (response?.success) {
        setIsLiked(!isLiked);
        toast.success(isLiked ? 'Post unliked' : 'Post liked!');
      }
    } catch (error) {
      console.error('Like error:', error);
      toast.error(error.message || 'Failed to update like status');
      // Revert the UI state if the API call fails
      setIsLiked(prev => !prev);
    } finally {
      setIsLikeLoading(false);
    }
  };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
            {post.imageUrl && (
                <img 
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                    }}
                />
            )}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category, index) => (
                        <span 
                            key={index} 
                            className="bg-gray-100 px-3 py-1 text-sm rounded-full"
                        >
                            {typeof category === 'object' ? category.name : category}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                        <TbMessageCircle className="text-xl cursor-pointer hover:text-blue-500" />
                        <span>{post.comments.length} comments</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <span>{post.readTime || 2} min read</span>
                        <CiBookmark className="text-xl cursor-pointer hover:text-blue-500" />
                    </div>
                </div>
                <Link 
                    to={`/Detail/${post._id}`}
                    className="inline-block mt-4 text-blue-500 hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default PostCard;


// const PostCard = ({ post, user, comments }) => {
//   // Add some defensive programming
//   if (!post) return null;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       {post.image && (
//         <img
//           src={post.image.url || post.image}
//           alt={post.title}
//           className="w-full h-48 object-cover"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'placeholder-image-url'; // Add a real placeholder
//           }}
//         />
//       )}
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">{post.title || 'Untitled Post'}</h2>
//         <div className="flex flex-wrap gap-2 mb-3">
//           {post.tags?.map((tag, index) => (
//             <span
//               key={tag?._id || index}
//               className="bg-gray-100 px-3 py-1 text-sm rounded-full"
//             >
//               {typeof tag === 'object' ? tag.name : tag}
//             </span>
//           ))}
//         </div>
//         <p className="text-gray-600 mb-4 line-clamp-3">{post.content || 'No content available'}</p>
//         <div className="flex items-center justify-between mt-4">
//           <div className="flex items-center gap-4">
//             <TbMessageCircle className="text-xl" />
//             <span>{post.comments?.length || 0} comments</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-500">
//             <span>{post.readTime || 5} min read</span>
//             <CiBookmark className="text-xl cursor-pointer hover:text-blue-500" />
//           </div>
//         </div>
//         <Link
//           to={`/Detail/${post._id}`}
//           className="inline-block mt-4 text-blue-500 hover:underline"
//         >
//           Read More →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PostCard;