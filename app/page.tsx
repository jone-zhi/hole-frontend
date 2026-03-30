'use client';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import PostCard from '../components/ui/PostCard';
import { useGithub } from '../hooks/useGithub';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const { getPublicGists } = useGithub();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const gists = await getPublicGists(category);
        setPosts(gists);
      } catch (error) {
        console.error('获取树洞失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">公开树洞</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-full ${category === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              全部
            </button>
            <button
              onClick={() => setCategory('生活')}
              className={`px-4 py-2 rounded-full ${category === '生活' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              生活
            </button>
            <button
              onClick={() => setCategory('工作')}
              className={`px-4 py-2 rounded-full ${category === '工作' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              工作
            </button>
            <button
              onClick={() => setCategory('情感')}
              className={`px-4 py-2 rounded-full ${category === '情感' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              情感
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
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
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暂无内容，快来发布第一个树洞吧！</p>
            <a href="/create" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              发布树洞
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}