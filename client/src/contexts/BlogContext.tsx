import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { BlogState, Post, Category, CreatePostData, UpdatePostData } from '@/types/blog';
import { mockApi } from '@/services/mockApi';

interface BlogContextType extends BlogState {
  fetchPosts: () => Promise<void>;
  fetchPost: (id: string) => Promise<void>;
  createPost: (data: CreatePostData) => Promise<void>;
  updatePost: (data: UpdatePostData) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setCurrentPost: (post: Post | null) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

type BlogAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_CURRENT_POST'; payload: Post | null }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: string };

const initialState: BlogState = {
  posts: [],
  categories: [],
  loading: false,
  error: null,
  currentPost: null,
};

function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_CURRENT_POST':
      return { ...state, currentPost: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    default:
      return state;
  }
}

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const fetchPosts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const posts = await mockApi.getPosts();
      dispatch({ type: 'SET_POSTS', payload: posts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch posts' });
    }
  };

  const fetchPost = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const post = await mockApi.getPost(id);
      dispatch({ type: 'SET_CURRENT_POST', payload: post });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch post' });
    }
  };

  const createPost = async (data: CreatePostData) => {
    try {
      const post = await mockApi.createPost(data);
      dispatch({ type: 'ADD_POST', payload: post });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create post' });
    }
  };

  const updatePost = async (data: UpdatePostData) => {
    try {
      const post = await mockApi.updatePost(data);
      dispatch({ type: 'UPDATE_POST', payload: post });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update post' });
    }
  };

  const deletePost = async (id: string) => {
    try {
      await mockApi.deletePost(id);
      dispatch({ type: 'DELETE_POST', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete post' });
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await mockApi.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch categories' });
    }
  };

  const setCurrentPost = (post: Post | null) => {
    dispatch({ type: 'SET_CURRENT_POST', payload: post });
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        ...state,
        fetchPosts,
        fetchPost,
        createPost,
        updatePost,
        deletePost,
        fetchCategories,
        setCurrentPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};