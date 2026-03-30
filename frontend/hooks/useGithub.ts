import { getPublicGists, createGist, updateGist, deleteGist, getGist, getUserGists } from '../lib/github';
import { getToken } from '../lib/auth';

export const useGithub = () => {
  // 获取公开Gists
  const fetchPublicGists = async (category: string = 'all') => {
    try {
      const posts = await getPublicGists(category);
      return posts;
    } catch (error) {
      console.error('获取公开Gists失败:', error);
      return [];
    }
  };

  // 创建Gist
  const createPost = async (title: string, content: string, category: string) => {
    const token = getToken();
    if (!token) {
      throw new Error('未登录');
    }

    try {
      const gist = await createGist(token, title, content, category);
      return gist;
    } catch (error) {
      console.error('创建Gist失败:', error);
      throw error;
    }
  };

  // 更新Gist
  const updatePost = async (gistId: string, title: string, content: string, category: string) => {
    const token = getToken();
    if (!token) {
      throw new Error('未登录');
    }

    try {
      const gist = await updateGist(token, gistId, title, content, category);
      return gist;
    } catch (error) {
      console.error('更新Gist失败:', error);
      throw error;
    }
  };

  // 删除Gist
  const deletePost = async (gistId: string) => {
    const token = getToken();
    if (!token) {
      throw new Error('未登录');
    }

    try {
      const result = await deleteGist(token, gistId);
      return result;
    } catch (error) {
      console.error('删除Gist失败:', error);
      throw error;
    }
  };

  // 获取单个Gist
  const fetchGist = async (gistId: string) => {
    try {
      const post = await getGist(gistId);
      return post;
    } catch (error) {
      console.error('获取Gist失败:', error);
      return null;
    }
  };

  // 获取用户的Gists
  const fetchUserGists = async () => {
    const token = getToken();
    if (!token) {
      throw new Error('未登录');
    }

    try {
      const posts = await getUserGists(token);
      return posts;
    } catch (error) {
      console.error('获取用户Gists失败:', error);
      return [];
    }
  };

  return {
    getPublicGists: fetchPublicGists,
    createPost,
    updatePost,
    deletePost,
    getGist: fetchGist,
    getUserGists: fetchUserGists,
  };
};