'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import { useAuth } from '../../hooks/useAuth';
import { useGithub } from '../../hooks/useGithub';

export default function CreatePost() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { createPost } = useGithub();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('生活');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 检查是否登录
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('标题和内容不能为空');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await createPost(title, content, category);
      router.push('/');
    } catch (err) {
      setError('发布失败，请重试');
      console.error('发布失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">发布树洞</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 mb-2">
                标题
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入标题"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 mb-2">
                分类
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="生活">生活</option>
                <option value="工作">工作</option>
                <option value="情感">情感</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-gray-700 mb-2">
                内容
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                placeholder="写下你的心声..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? '发布中...' : '发布'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}