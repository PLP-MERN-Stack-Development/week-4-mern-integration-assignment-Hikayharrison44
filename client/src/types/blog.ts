export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  categoryId: string;
  category?: Category;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  categoryId: string;
  featuredImage?: string;
  published: boolean;
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export interface BlogState {
  posts: Post[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}