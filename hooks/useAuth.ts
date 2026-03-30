'use client';
import { useState, useEffect } from 'react';
import { getToken, saveToken, removeToken, isLoggedIn, getGitHubAuthUrl, exchangeCodeForToken } from '../lib/auth';

interface User {
  login: string;
  avatar_url: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: isLoggedIn(),
    user: null,
    loading: true,
    error: null,
  });

  // 初始化时检查登录状态
  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn()) {
        // 这里可以获取用户信息
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          user: {
            login: 'test_user', // 实际项目中应该从API获取
            avatar_url: 'https://github.com/images/error/octocat_happy.gif',
          },
          loading: false,
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    };

    checkAuth();
  }, []);

  // 处理OAuth回调
  const handleOAuthCallback = async (code: string) => {
    try {
      setAuthState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const result = await exchangeCodeForToken(code);
      saveToken(result.token);

      setAuthState({
        isAuthenticated: true,
        user: result.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: '登录失败，请重试',
      }));
    }
  };

  // 登录
  const login = () => {
    window.location.href = getGitHubAuthUrl();
  };

  // 登出
  const logout = () => {
    removeToken();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
    handleOAuthCallback,
  };
};