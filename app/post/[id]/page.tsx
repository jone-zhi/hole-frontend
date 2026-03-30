'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import { useGithub } from '../../../hooks/useGithub';
import { useAuth } from '../../../hooks/useAuth';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getGist, deletePost } = useGithub();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const postData = await getGist(id);
        if (postData) {
          setPost(postData);
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

  const handleDelete = async () => {
    if (!id || !isAuthenticated) return;
    if (!confirm('确定要删除这个树洞吗？')) return;

    try {
      setDeleting(true);
      await deletePost(id);
      router.push('/');
    } catch (err) {
      setError('删除失败，请重试');
      console.error('删除失败:', err);
    } finally {
      setDeleting(false);
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-lg">{error || '树洞不存在'}</p>
            <a href="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              返回首页
            </a>
          </div>
        </main>
      </div>
    );
  }

  // 检查当前用户是否为作者
  const isAuthor = isAuthenticated && user?.login === post.author;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
          <div className="flex items-center mb-6">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-gray-700 font-medium">{post.author}</p>
              <p className="text-gray-400 text-sm">
                {new Date(post.createdAt).toLocaleString('zh-CN')}
              </p>
            </div>
          </div>
          <div className="mb-6 whitespace-pre-line text-gray-700">
            {post.content}
          </div>
          {isAuthor && (
            <div className="flex justify-end space-x-4">
              <a
                href={`/edit/${post.id}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
              >
                编辑
              </a>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-red-400"
              >
                {deleting ? '删除中...' : '删除'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}