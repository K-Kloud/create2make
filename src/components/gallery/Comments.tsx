import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { CommentList } from "./CommentList";

interface Comment {
  id: number;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
}

interface CommentsProps {
  imageId: number;
  comments: Comment[];
  onAddComment: (imageId: number, comment: string) => void;
}

export const Comments = ({ imageId, comments, onAddComment }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(imageId, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-4 w-4" />
        <span>{comments.length} Comments</span>
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1"
        />
        <Button type="submit" size="sm">
          Post
        </Button>
      </form>

      <CommentList comments={comments} />
    </div>
  );
};