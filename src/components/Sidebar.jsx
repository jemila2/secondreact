

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gradient-to-b from-indigo-900 to-purple-900 text-white w-64 h-screen p-6 flex flex-col shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
          Blog Dashboard
        </h2>
        <p className="text-sm text-purple-200 mt-1">Manage your content</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {[
            { path: "/PostList", name: "All Posts", icon: "📝" },
            { path: "/PostForm", name: "Create Post", icon: "✍️" },
            { path: "/Catigory", name: "Categories", icon: "🏷️" },
            { path: "/PostDetail", name: "Post Details", icon: "🔍" },
            { path: "/SinglePost", name: "Single Post", icon: "📄" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all 
                  ${location.pathname.includes(item.path) 
                    ? 'bg-white/10 text-white shadow-md'
                    : 'text-purple-100 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="text-xs text-purple-200">
          © {new Date().getFullYear()} Blog Admin
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

