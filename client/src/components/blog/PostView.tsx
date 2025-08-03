import React from 'react';
import { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface PostViewProps {
  post: Post;
  onBack: () => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

const PostView: React.FC<PostViewProps> = ({ post, onBack, onEdit, onDelete }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(post)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => onDelete(post)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Post Content */}
      <Card>
        <CardContent className="p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.category && (
              <Badge className={`${post.category.color} text-white`}>
                {post.category.name}
              </Badge>
            )}
            {!post.published && (
              <Badge variant="secondary">Draft</Badge>
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                Created: {format(new Date(post.createdAt), 'PPP')}
              </div>
              {post.updatedAt !== post.createdAt && (
                <div>
                  Updated: {format(new Date(post.updatedAt), 'PPP')}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostView;