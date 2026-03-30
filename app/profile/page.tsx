'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import PostCard from '../../components/ui/PostCard';
import { useAuth } from '../../hooks/useAuth';
import { useGithub } from '../../hooks/useGithub';

export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { getUserGists } = useGithub();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 检查是否登录
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const userPosts = await getUserGists();
        setPosts(userPosts);
      } catch (err) {
        setError('获取个人树洞失败');
        console.error('获取个人树洞失败:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <img
                src={user?.avatar_url}
                alt={user?.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.login}</h2>
                <p className="text-gray-500">个人中心</p>
              </div>
            </div>
            <a
              href="/create"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              发布新树洞
            </a>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4">我的树洞</h3>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(4).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="h-24 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500 text-lg">{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500 text-lg">你还没有发布过树洞</p>
                <a
                  href="/create"
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  发布第一个树洞
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}