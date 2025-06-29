

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navebar from './components/Navebar';
import Home from './pages/Home';
import PostCard from './components/PostCard';
import PostModal from './components/modals/PostModal';
import AuthModal from './components/modals/AuthModal';
import Detail from './components/Detail';  // Changed from named import to default import


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <DataProvider>
      {/* <AuthProvider> */}
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <Navebar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            openPostModal={() => setIsPostModalOpen(true)}
          />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home openPostModal={() => setIsPostModalOpen(true)} />} />
              <Route path="/posts/:id" element={<PostCard />} />
              <Route path="/Detail/:id" element={<Detail/>} />
              <Route path="/login" element={<AuthModal/>} />
              {/* <Route path="/profile" element={<UserProfile />} /> */}
            </Routes>
          </main>

          {/* Post Creation Modal */}
          <PostModal 
            isOpen={isPostModalOpen} 
            onClose={() => setIsPostModalOpen(false)} 
          />
        </div>
      </Router>
      {/* </AuthProvider> */}
    </DataProvider>
  );
}

export default App;



