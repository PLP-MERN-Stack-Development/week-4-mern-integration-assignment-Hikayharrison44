import React, { useState } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import PostCard from './PostCard';
import { Post } from '@/types/blog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostListProps {
  onCreatePost: () => void;
  onViewPost: (post: Post) => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({
  onCreatePost,
  onViewPost,
  onEditPost,
  onDeletePost,
}) => {
  const { posts, categories, loading } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDrafts, setShowDrafts] = useState(false);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.categoryId === selectedCategory;
    const matchesPublished = showDrafts || post.published;
    
    return matchesSearch && matchesCategory && matchesPublished;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <Button onClick={onCreatePost} className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={showDrafts ? "default" : "outline"}
          onClick={() => setShowDrafts(!showDrafts)}
          className="w-full sm:w-auto"
        >
          {showDrafts ? "Hide Drafts" : "Show Drafts"}
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <Badge variant="secondary">
          {filteredPosts.length} posts
        </Badge>
        <Badge variant="secondary">
          {posts.filter(p => p.published).length} published
        </Badge>
        <Badge variant="secondary">
          {posts.filter(p => !p.published).length} drafts
        </Badge>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No posts found</p>
          <Button onClick={onCreatePost} className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Create your first post
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onView={onViewPost}
              onEdit={onEditPost}
              onDelete={onDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;