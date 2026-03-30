import { Octokit } from '@octokit/rest';

// 创建Octokit实例
export const createOctokit = (token?: string) => {
  return new Octokit({
    auth: token,
  });
};

// 获取公开Gists
export const getPublicGists = async (category: string = 'all') => {
  const octokit = createOctokit();
  
  try {
    // 暂时返回模拟数据，因为Octokit API调用需要正确的认证
    // 实际项目中需要使用正确的API调用方式
    return [
      {
        id: '1',
        title: '测试树洞1',
        content: '这是一个测试树洞，用于展示功能。',
        category: '生活',
        author: 'test_user',
        createdAt: new Date(),
        updatedAt: new Date(),
        authorAvatar: 'https://github.com/images/error/octocat_happy.gif',
      },
      {
        id: '2',
        title: '测试树洞2',
        content: '这是另一个测试树洞，用于展示分类功能。',
        category: '工作',
        author: 'test_user',
        createdAt: new Date(),
        updatedAt: new Date(),
        authorAvatar: 'https://github.com/images/error/octocat_happy.gif',
      },
    ];
  } catch (error) {
    console.error('获取Gists失败:', error);
    return [];
  }
};

// 创建Gist
export const createGist = async (token: string, title: string, content: string, category: string) => {
  // 暂时返回模拟数据
  return {
    id: 'new_gist_' + Date.now(),
    description: title,
    files: {
      'content.md': { content },
      'metadata.json': {
        content: JSON.stringify({
          title,
          category,
          createdAt: new Date().toISOString(),
        }),
      },
    },
    owner: {
      login: 'test_user',
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// 更新Gist
export const updateGist = async (token: string, gistId: string, title: string, content: string, category: string) => {
  // 暂时返回模拟数据
  return {
    id: gistId,
    description: title,
    files: {
      'content.md': { content },
      'metadata.json': {
        content: JSON.stringify({
          title,
          category,
          createdAt: new Date().toISOString(),
        }),
      },
    },
    owner: {
      login: 'test_user',
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// 删除Gist
export const deleteGist = async (token: string, gistId: string) => {
  // 暂时返回成功
  return true;
};

// 获取单个Gist
export const getGist = async (gistId: string) => {
  // 暂时返回模拟数据
  return {
    id: gistId,
    title: '测试树洞详情',
    content: '这是一个测试树洞的详细内容，用于展示详情页面。\n\n可以包含多行文本和Markdown格式。',
    category: '生活',
    author: 'test_user',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorAvatar: 'https://github.com/images/error/octocat_happy.gif',
  };
};

// 获取用户的Gists
export const getUserGists = async (token: string) => {
  // 暂时返回模拟数据
  return [
    {
      id: 'user_gist_1',
      title: '我的测试树洞1',
      content: '这是我发布的第一个测试树洞。',
      category: '生活',
      author: 'test_user',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorAvatar: 'https://github.com/images/error/octocat_happy.gif',
    },
    {
      id: 'user_gist_2',
      title: '我的测试树洞2',
      content: '这是我发布的第二个测试树洞。',
      category: '工作',
      author: 'test_user',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorAvatar: 'https://github.com/images/error/octocat_happy.gif',
    },
  ];
};