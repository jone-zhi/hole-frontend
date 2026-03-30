'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              公开树洞
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">首页</a>
            {isAuthenticated && (
              <>
                <a href="/create" className="text-gray-700 hover:text-blue-600">发布</a>
                <a href="/profile" className="text-gray-700 hover:text-blue-600">个人中心</a>
              </>
            )}
            {!isAuthenticated ? (
              <button
                onClick={login}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                登录
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar_url}
                  alt={user?.login}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                >
                  登出
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="/" className="block text-gray-700 hover:text-blue-600">首页</a>
            {isAuthenticated && (
              <>
                <a href="/create" className="block text-gray-700 hover:text-blue-600">发布</a>
                <a href="/profile" className="block text-gray-700 hover:text-blue-600">个人中心</a>
                <div className="flex items-center space-x-4">
                  <img
                    src={user?.avatar_url}
                    alt={user?.login}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.login}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                >
                  登出
                </button>
              </>
            )}
            {!isAuthenticated && (
              <button
                onClick={login}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                登录
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;