


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AuthModal from './modals/AuthModal';
import PostModal from './modals/PostModal';
import { CiSearch } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';

const Navebar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { user, logout } = useData();

  const handleCreatePostClick = () => {
    if (user) {
      setIsPostModalOpen(true);
    } else {
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthClick = (tab) => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsPostModalOpen(true); // Open post modal after successful auth
  };

  return (
    <div className="bg-white h-22 w-full shadow-lg p-6 rounded-lg gap-6 justify-center">
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyApp
        </Link>
        
        <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-md w-full h-12">
          <CiSearch className="text-3xl mt-2 font-bold" /> 
          <input
            type="text"
            className="flex-grow border-none rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Search..."
          />
          <button className="bg-white text-black rounded-r-lg flex items-center justify-center">
            <input 
              type="text" 
              placeholder="Powered by Algoria" 
              className="w-37" 
              readOnly
            />
          </button>
        </div>

        <div className="flex items-center space-x-4 w-180 pl-60">
          {user ? (
            <>
              <button
                onClick={handleCreatePostClick}
                className="border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-2 py-1 bg-white font-bold"
              >
                Create Post
              </button>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Logout
              </button>
              <div className="h-10 w-10 pt-2 bg-green-500 rounded-full text-center">
                <FaRegUserCircle className="inline text-xl text-white" />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleAuthClick('login')}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Login
              </button>
              <button 
                onClick={() => handleAuthClick('signup')}
                className="border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-2 py-3 bg-white font-bold text-sm"
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
        onAuthSuccess={handleAuthSuccess}
      />
      
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};

export default Navebar;