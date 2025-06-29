


// // src/Pages/UserProfileCard.jsx
// import React from 'react';
// import PropTypes from 'prop-types';
// import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
// import { MdLocationOn, MdDateRange } from 'react-icons/md';

// const UserProfileCard = ({ 
//   user = {}, 
//   isFollowing = false, 
//   onFollow = () => {}, 
//   onViewProfile = () => {},
//   showFullInfo = true 
// }) => {
//   // Safely handle all user properties
//   const safeUser = {
//     name: user?.name || 'Anonymous User',
//     username: user?.username || (user?.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'user'),
//     avatar: user?.avatar || '/default-avatar.png',
//     bio: user?.bio || '',
//     location: user?.location || '',
//     followers: user?.followers || [],
//     following: user?.following || [],
//     postCount: user?.postCount || 0,
//     createdAt: user?.createdAt || new Date().toISOString()
//   };

//   return (
//     <div className="card mb-4">
//       <div className="card-header bg-primary text-white">
//         <div className="d-flex align-items-center">
//           <img
//             src={safeUser.avatar}
//             alt={safeUser.name}
//             className="rounded-circle me-3"
//             width="64"
//             height="64"
//             onError={(e) => {
//               e.target.src = '/default-avatar.png';
//             }}
//           />
//           <div>
//             <h5 className="mb-0">{safeUser.name}</h5>
//             <small className="opacity-75">@{safeUser.username}</small>
//           </div>
//         </div>
//       </div>
      
//              <div className="card-body">
//         {showFullInfo && (
//           <>
//             {user.bio && (
//               <p className="card-text mb-3">
//                 {user.bio}
//               </p>
//             )}

//             <div className="d-flex justify-content-between mb-3">
//               <button
//                 onClick={onFollow}
//                 className={`btn btn-sm ${isFollowing ? 'btn-outline-secondary' : 'btn-primary'}`}
//               >
//                 {isFollowing ? (
//                   <>
//                     <FaUserCheck className="me-1" />
//                     Following
//                   </>
//                 ) : (
//                   <>
//                     <FaUserPlus className="me-1" />
//                     Follow
//                   </>
//                 )}
//               </button>
              
//               <button
//                 onClick={onViewProfile}
//                 className="btn btn-sm btn-outline-primary"
//               >
//                 View Profile
//               </button>
//             </div>
//           </>
//         )}

//         <div className="d-flex justify-content-between text-center">
//           <div>
//             <div className="fw-bold">{user.followers?.length || 0}</div>
//             <small className="text-muted">Followers</small>
//           </div>
//           <div>
//             <div className="fw-bold">{user.following?.length || 0}</div>
//             <small className="text-muted">Following</small>
//           </div>
//           <div>
//             <div className="fw-bold">{user.postCount || 0}</div>
//             <small className="text-muted">Posts</small>
//           </div>
//         </div>

//         {showFullInfo && (
//           <div className="mt-3">
//             {user.location && (
//               <div className="d-flex align-items-center text-muted mb-1">
//                 <MdLocationOn className="me-2" />
//                 <small>{user.location}</small>
//               </div>
//             )}
            
//             <div className="d-flex align-items-center text-muted">
//               <MdDateRange className="me-2" />
//               <small>
//                 Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long'
//                 })}
//               </small>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// UserProfileCard.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string,
//     username: PropTypes.string,
//     avatar: PropTypes.string,
//     bio: PropTypes.string,
//     location: PropTypes.string,
//     followers: PropTypes.array,
//     following: PropTypes.array,
//     postCount: PropTypes.number,
//     createdAt: PropTypes.string
//   }),
//   isFollowing: PropTypes.bool,
//   onFollow: PropTypes.func,
//   onViewProfile: PropTypes.func,
//   showFullInfo: PropTypes.bool
// };

// export default UserProfileCard;


// src/components/UserProfileCard.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { MdLocationOn, MdDateRange } from 'react-icons/md';
import { useFollow } from '../hooks/useFollow';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.png';

const UserProfileCard = ({ 
  user = {}, 
  showFullInfo = true,
  onFollowUpdate = () => {}
}) => {
  const navigate = useNavigate();
  const { 
    isFollowing, 
    isLoading, 
    checkFollowStatus,
    toggleFollow 
  } = useFollow();
  
  // Initialize follow status
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setFollowStatus(checkFollowStatus(user._id));
    }
  }, [user?._id, checkFollowStatus]);

  const handleViewProfile = () => {
    navigate(`/user/${user._id}`);
  };

  const handleFollowClick = async () => {
    try {
      await toggleFollow(user._id);
      onFollowUpdate(); // Notify parent component of follow status change
    } catch (error) {
      console.error('Follow action failed:', error);
    }
  };

  // Safely handle all user properties
  const safeUser = {
    _id: user?._id || '',
    name: user?.name || 'Anonymous User',
    username: user?.username || (user?.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'user'),
    avatar: user?.avatar || defaultAvatar,
    bio: user?.bio || '',
    location: user?.location || '',
    followers: user?.followers || [],
    following: user?.following || [],
    postCount: user?.postCount || 0,
    createdAt: user?.createdAt || new Date().toISOString()
  };

  const handleImageError = (e) => {
    e.target.src = defaultAvatar;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Header with cover photo and avatar */}
      <div className="bg-blue-500 h-24 relative">
        <div className="absolute -bottom-8 left-4">
          <img
            src={safeUser.avatar}
            alt={safeUser.name}
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* User info section */}
      <div className="pt-10 px-4 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{safeUser.name}</h2>
            <p className="text-gray-500 text-sm">@{safeUser.username}</p>
          </div>
        </div>

        {showFullInfo && safeUser.bio && (
          <p className="text-gray-600 text-sm mb-4">{safeUser.bio}</p>
        )}

        {/* Follow/View Profile buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleFollowClick}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
              followStatus 
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : followStatus ? (
              <>
                <FaUserCheck className="mr-1" />
                Following
              </>
            ) : (
              <>
                <FaUserPlus className="mr-1" />
                Follow
              </>
            )}
          </button>
          
          <button
            onClick={handleViewProfile}
            className="flex-1 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
          >
            View Profile
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-center border-t border-b border-gray-100 py-3 mb-3">
          <div className="px-2">
            <div className="font-bold">{safeUser.followers.length}</div>
            <div className="text-gray-500 text-xs">Followers</div>
          </div>
          <div className="px-2">
            <div className="font-bold">{safeUser.following.length}</div>
            <div className="text-gray-500 text-xs">Following</div>
          </div>
          <div className="px-2">
            <div className="font-bold">{safeUser.postCount}</div>
            <div className="text-gray-500 text-xs">Posts</div>
          </div>
        </div>

        {showFullInfo && (
          <div className="space-y-2">
            {safeUser.location && (
              <div className="flex items-center text-gray-600 text-sm">
                <MdLocationOn className="mr-2" />
                <span>{safeUser.location}</span>
              </div>
            )}
            
            <div className="flex items-center text-gray-600 text-sm">
              <MdDateRange className="mr-2" />
              <span>
                Joined {new Date(safeUser.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    postCount: PropTypes.number,
    createdAt: PropTypes.string
  }),
  showFullInfo: PropTypes.bool,
  onFollowUpdate: PropTypes.func
};

UserProfileCard.defaultProps = {
  showFullInfo: true,
  onFollowUpdate: () => {}
};

export default UserProfileCard;