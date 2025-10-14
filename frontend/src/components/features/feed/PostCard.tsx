// src/components/features/feed/PostCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react"

interface Post {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isSaved: boolean
}

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onSave: (postId: string) => void
}

const PostCard = ({ post, onLike, onSave }: PostCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-sm text-muted-foreground">
              @{post.user.username} • {post.timestamp}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm mb-4">{post.content}</p>
        
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={post.isLiked ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
            {post.likes}
          </Button>
          
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            {post.comments}
          </Button>
          
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4 mr-2" />
            {post.shares}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave(post.id)}
            className={post.isSaved ? "text-blue-500" : ""}
          >
            <Bookmark className={`h-4 w-4 ${post.isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard