import React from 'react';
import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onView,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          {post.category && (
            <Badge className={`${post.category.color} text-white`}>
              {post.category.name}
            </Badge>
          )}
          {!post.published && (
            <Badge variant="secondary">Draft</Badge>
          )}
        </div>
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="pt-0">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(post)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(post)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(post)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;