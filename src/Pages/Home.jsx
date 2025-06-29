

import { Link } from 'react-router-dom';
import image1 from './image/image1.PNG';
import image2 from './image/image2.PNG';
import image5 from './image/image5.PNG';
import image19 from './image/image19.jpg';
import image23 from './image/image23.JPEG';
import image27 from './image/image27.JPEG';
import image29 from './image/image29.png';
import image37 from './image/image37.png';
import image39 from './image/image39.PNG';
import image40 from './image/image40.png';
import image3 from './image/image3.png';
import { IoLogoFacebook } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import { PiXLogo } from "react-icons/pi";
import { PiInstagramLogoFill } from "react-icons/pi";
import { SiMastodon } from "react-icons/si";
import { LuFolderKanban } from "react-icons/lu";
import { PiButterflyFill } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { FaDev } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import SignupModal from '../components/SignupModal';
import LoginModal from '../components/LoginModal';
// import usePosts from '../../usePost';
// import { useData } from '../context/DataContext';
import usePosts from '../../usePost';
import { toast } from 'react-toastify';

const Home = () => {
   const { posts = [], loading = false, error = null, fetchPosts } = usePosts();
  // const { posts = [], loading, error, fetchPosts } = usePosts();
  const { user } = useData();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState('relevant');

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleRetry = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500 p-4">
        <div className="text-xl font-semibold mb-4">Error Loading Posts</div>
        <p className="text-center mb-6">{error}</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry Loading
        </button>
        {!user && (
          <button
            onClick={() => setShowSignupModal(true)}
            className="mt-4 px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create Account
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex w-full max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 bg-white p-4 sticky top-0 h-screen overflow-y-auto">
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">DEV Community</h2>
            <p className="text-gray-600 mb-4">
              A community of 3,140,474 amazing developers
            </p>
            <p className="text-gray-500 mb-6">
              We're a place where coders share, stay up-to-date and grow their careers.
            </p>

            {!user ? (
              <>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
                >
                  Create account
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full py-2 text-blue-500 hover:text-blue-600"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="text-green-600 font-medium">
                Welcome back, {user.first_name}!
              </div>
            )}
          </div>

          <nav className="space-y-2 mb-8">
            <div className="flex items-center p-2 rounded hover:bg-gray-100">
              <span className="mr-2">🏠</span>
              <span>Home</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-gray-100">
              <img src={image29} alt="DEV++" className="w-5 h-5 mr-2" />
              <span>DEV++</span>
            </div>
            {['Podcasts', 'Video', 'Tags', 'Dev Help', 'Forem Shop'].map((item) => (
              <div key={item} className="flex items-center p-2 rounded hover:bg-gray-100">
                <span className="mr-2">🎙️</span>
                <span>{item}</span>
              </div>
            ))}
          </nav>

          <div className="mb-8">
            <h3 className="font-bold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['webdev', 'javascript', 'react', 'python', 'beginners', 'programming'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold mb-2">💎 DEV Diamond</h4>
              <p className="text-sm text-gray-600 mb-4">
                Thank you to our Diamond Sponsors for supporting the DEV Community
              </p>
              <img src={image37} alt="Sponsor" className="w-full mb-2" />
              <p className="text-xs text-gray-500 text-center">
                Neon is the official database partner of DEV
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex space-x-6 mb-6 border-b">
            {['relevant', 'latest', 'top'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-1 capitalize ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Challenge Banner */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">👋 DEV Challenges</span>
              <div className="flex space-x-3">
                <BsThreeDots className="text-gray-500 cursor-pointer" />
                <BsXLg className="text-gray-500 cursor-pointer" />
              </div>
            </div>
            <img src={image1} alt="Challenge" className="w-full rounded mb-4" />
            <h3 className="text-xl font-bold mb-3">
              Build an AI agent or system powered by real-time web data
            </h3>
            <div className="bg-gray-50 rounded p-4 mb-4">
              <div className="flex items-start">
                <FaDev className="text-3xl text-gray-700 mr-4" />
                <div>
                  <h4 className="font-bold">
                    Join the Bright Data Real-Time AI Agents Challenge: $3,000 in Prizes!
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    dev.to staff for The DEV Team • May 7
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['brightdatachallenge', 'devchallenge', 'ai', 'webdev'].map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Happy Coding 💙</p>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6  w-170">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  user={user} 
                  comments={comments}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No Posts Available</h3>
                <p className="text-gray-600 mb-6">
                  {user ? 'Be the first to create a post!' : 'Sign up to create your first post!'}
                </p>
                {!user && (
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Create Account
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 p-4 sticky top-0 h-screen overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">👋 What's happening this week</span>
              <BsThreeDots className="text-gray-500 cursor-pointer" />
            </div>
            <h4 className="font-bold mb-2">Challenges 🤗</h4>
            <div className="bg-gray-50 rounded p-3 mb-3">
              <p className="text-sm text-blue-500 mb-1">Happening Now 🌟</p>
              <img src={image2} alt="Challenge" className="w-full rounded mb-2" />
              <p className="font-medium mb-1">Bright Data Real-Time AI Agents Challenge</p>
              <p className="text-sm text-gray-500">Submissions Due May 25.</p>
            </div>
            <p className="font-medium">Have a great week ❤️</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h4 className="font-bold mb-2">#discuss</h4>
            <p className="text-sm text-gray-500 mb-4">
              Discussion threads targeting the whole community
            </p>
            {[
              { title: 'What was your win this week?', comments: 49 },
              { title: 'Transport Layer in CN', comments: 'New' },
              { title: 'Did AI just kill 6,000 tech jobs?', comments: 2 }
            ].map((item, index) => (
              <div key={index} className="py-3 border-b last:border-0">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {typeof item.comments === 'number' 
                    ? `${item.comments} comments` 
                    : item.comments}
                </p>
              </div>
            ))}
          </div>


          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="font-bold mb-4">Trending guides/resources</h4>
            <div className="space-y-3">
              {[
                'Stop Using AWS',
                'Cursor is now free for students',
                '30+ MCP Ideas with Complete Source Code',
                'Every Developer Needs to Self-Host'
              ].map((item, index) => (
                <p key={index} className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          toast.success('Logged in successfully!');
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignupSuccess={() => {
          setShowSignupModal(false);
          toast.success('Account created! Please login');
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

// Separate PostCard component for better organization
const PostCard = ({ post, user, comments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories?.map((category, index) => (
            <span
              key={category?._id || index}
              className="bg-gray-100 px-3 py-1 text-sm rounded-full"
            >
              {typeof category === 'object' ? category.name : category}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <TbMessageCircle className="text-xl" />
            <span>{comments.length} comments</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>{post.readTime || 2} min read</span>
            <CiBookmark className="text-xl cursor-pointer hover:text-blue-500" />
          </div>
        </div>
        <Link
          to={`/Detail/${post.id}`}
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default Home;








