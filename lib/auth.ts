// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined';

// 从localStorage获取token
export const getToken = () => {
  if (!isBrowser) return null;
  return localStorage.getItem('github_token');
};

// 保存token到localStorage
export const saveToken = (token: string) => {
  if (!isBrowser) return;
  localStorage.setItem('github_token', token);
};

// 从localStorage删除token
export const removeToken = () => {
  if (!isBrowser) return;
  localStorage.removeItem('github_token');
};

// 检查是否已登录
export const isLoggedIn = () => {
  if (!isBrowser) return false;
  return !!getToken();
};

// GitHub OAuth配置
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID'; // 替换为实际的GitHub客户端ID
const GITHUB_REDIRECT_URI = 'http://localhost:3000'; // 替换为实际的重定向URL

// 生成GitHub OAuth授权URL
export const getGitHubAuthUrl = () => {
  return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=gist&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}`;
};

// 交换code获取token
export const exchangeCodeForToken = async (code: string) => {
  try {
    // 这里应该调用后端API来交换token，避免在前端暴露client_secret
    // 暂时返回一个模拟的token
    // 实际项目中需要替换为真实的后端API调用
    console.log('交换code获取token:', code);
    // 模拟成功响应
    return {
      token: 'mock_token',
      user: {
        login: 'test_user',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      },
    };
  } catch (error) {
    console.error('交换token失败:', error);
    throw error;
  }
};