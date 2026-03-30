'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import { useAuth } from '../../hooks/useAuth';
import { useGithub } from '../../hooks/useGithub';

export default function EditPost() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const { isAuthenticated, user } = useAuth();
  const { getGist, updatePost } = useGithub();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('生活');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  // 检查是否登录
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const postData = await getGist(id);
        if (postData) {
          // 检查是否为作者
          if (postData.author !== user?.login) {
            setError('无权限编辑此树洞');
            return;
          }
          setTitle(postData.title);
          setContent(postData.content);
          setCategory(postData.category);
        } else {
          setError('树洞不存在');
        }
      } catch (err) {
        setError('获取树洞失败');
        console.error('获取树洞失败:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !id) {
      setError('标题和内容不能为空');
      return;
    }

    try {
      setUpdating(true);
      setError('');
      await updatePost(id, title, content, category);
      router.push(`/post?id=${id}`);
    } catch (err) {
      setError('更新失败，请重试');
      console.error('更新失败:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-lg">{error}</p>
            <a href="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              返回首页
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">编辑树洞</h1>
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
            <div className="flex justify-end space-x-4">
              <a
                href={`/post?id=${id}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
              >
                取消
              </a>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-400"
              >
                {updating ? '更新中...' : '更新'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}