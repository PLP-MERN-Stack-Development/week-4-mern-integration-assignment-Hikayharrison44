import { Post, Category, CreatePostData, UpdatePostData } from '@/types/blog';

// Mock data
const mockCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', color: 'bg-blue-500' },
  { id: '2', name: 'Design', slug: 'design', color: 'bg-purple-500' },
  { id: '3', name: 'Business', slug: 'business', color: 'bg-green-500' },
  { id: '4', name: 'Lifestyle', slug: 'lifestyle', color: 'bg-pink-500' },
];

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: 'React with TypeScript provides excellent developer experience...',
    excerpt: 'Learn how to set up a React project with TypeScript for better development.',
    author: 'John Doe',
    categoryId: '1',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    published: true,
  },
  {
    id: '2',
    title: 'Modern UI Design Principles',
    content: 'Creating beautiful and functional user interfaces...',
    excerpt: 'Explore the key principles that make modern UI designs effective.',
    author: 'Jane Smith',
    categoryId: '2',
    featuredImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    published: true,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Posts
  async getPosts(): Promise<Post[]> {
    await delay(500);
    const stored = localStorage.getItem('blog_posts');
    const posts = stored ? JSON.parse(stored) : mockPosts;
    return posts.map((post: Post) => ({
      ...post,
      category: mockCategories.find(cat => cat.id === post.categoryId)
    }));
  },

  async getPost(id: string): Promise<Post | null> {
    await delay(300);
    const posts = await this.getPosts();
    return posts.find(post => post.id === id) || null;
  },

  async createPost(data: CreatePostData): Promise<Post> {
    await delay(500);
    const posts = await this.getPosts();
    const newPost: Post = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedPosts = [...posts, newPost];
    localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
    return {
      ...newPost,
      category: mockCategories.find(cat => cat.id === newPost.categoryId)
    };
  },

  async updatePost(data: UpdatePostData): Promise<Post> {
    await delay(500);
    const posts = await this.getPosts();
    const index = posts.findIndex(post => post.id === data.id);
    if (index === -1) throw new Error('Post not found');
    
    const updatedPost = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    posts[index] = updatedPost;
    localStorage.setItem('blog_posts', JSON.stringify(posts));
    return {
      ...updatedPost,
      category: mockCategories.find(cat => cat.id === updatedPost.categoryId)
    };
  },

  async deletePost(id: string): Promise<void> {
    await delay(300);
    const posts = await this.getPosts();
    const filtered = posts.filter(post => post.id !== id);
    localStorage.setItem('blog_posts', JSON.stringify(filtered));
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },
};