import React, { useState } from 'react';
import { BlogProvider, useBlog } from '@/contexts/BlogContext';
import PostList from './PostList';
import PostForm from './PostForm';
import PostView from './PostView';
import { Post } from '@/types/blog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'list' | 'create' | 'edit' | 'view';

const BlogContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  
  const { deletePost } = useBlog();
  const { toast } = useToast();

  const handleCreatePost = () => {
    setSelectedPost(null);
    setViewMode('create');
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setViewMode('view');
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setViewMode('edit');
  };

  const handleDeletePost = (post: Post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete.id);
        toast({
          title: 'Post deleted',
          description: 'The post has been successfully deleted.',
        });
        setDeleteDialogOpen(false);
        setPostToDelete(null);
        if (viewMode === 'view' && selectedPost?.id === postToDelete.id) {
          setViewMode('list');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete the post.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedPost(null);
  };

  const handleSave = () => {
    toast({
      title: 'Post saved',
      description: 'Your post has been successfully saved.',
    });
    setViewMode('list');
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'list' && (
          <PostList
            onCreatePost={handleCreatePost}
            onViewPost={handleViewPost}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
          />
        )}

        {(viewMode === 'create' || viewMode === 'edit') && (
          <PostForm
            post={selectedPost}
            onBack={handleBack}
            onSave={handleSave}
          />
        )}

        {viewMode === 'view' && selectedPost && (
          <PostView
            post={selectedPost}
            onBack={handleBack}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

const BlogLayout: React.FC = () => {
  return (
    <BlogProvider>
      <BlogContent />
    </BlogProvider>
  );
};

export default BlogLayout;