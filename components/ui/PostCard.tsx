interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  authorAvatar: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // 截断内容，显示预览
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  };

  // 格式化日期
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
              <a href={`/post?id=${post.id}`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          {truncateContent(post.content)}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-500 text-sm">{post.author}</span>
          </div>
          <span className="text-gray-400 text-sm">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;