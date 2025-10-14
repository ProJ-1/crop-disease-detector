// src/components/EnhancedPostCard.tsx
import { Card, CardContent, CardHeader } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Heart, MessageCircle, Share, Bookmark, Smile, ThumbsUp } from "lucide-react"
import { useState } from "react"

interface EnhancedPost {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  media?: string[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  reactions: {
    like: number
    love: number
    haha: number
    wow: number
    sad: number
    angry: number
  }
  userReaction?: string
  isSaved: boolean
  location?: string
}

interface EnhancedPostCardProps {
  post: EnhancedPost
  onReaction: (postId: string, reaction: string) => void
  onSave: (postId: string) => void
  onComment: (postId: string) => void
  onShare: (postId: string) => void
}

const reactionIcons = {
  like: "👍",
  love: "❤️",
  haha: "😄",
  wow: "😮",
  sad: "😢",
  angry: "😠"
}

const EnhancedPostCard = ({ post, onReaction, onSave, onComment, onShare }: EnhancedPostCardProps) => {
  const [showReactions, setShowReactions] = useState(false)

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0)

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.user.name}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{post.timestamp}</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <span>{post.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            •••
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm mb-4">{post.content}</p>
        
        {post.media && post.media.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.media[0]} 
              alt="Post media" 
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Reactions Summary */}
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              {Object.entries(post.reactions)
                .filter(([_, count]) => count > 0)
                .slice(0, 3)
                .map(([reaction]) => (
                  <span key={reaction} className="text-xs">
                    {reactionIcons[reaction as keyof typeof reactionIcons]}
                  </span>
                ))
              }
            </div>
            <span>{totalReactions}</span>
          </div>
          <div className="flex space-x-4">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between border-t border-b py-1">
          <div className="relative flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            
            {showReactions && (
              <div 
                className="absolute bottom-full mb-2 left-0 bg-white border rounded-full px-2 py-1 shadow-lg flex space-x-2"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {Object.entries(reactionIcons).map(([reaction, icon]) => (
                  <button
                    key={reaction}
                    className="text-2xl transform transition-transform hover:scale-125"
                    onClick={() => onReaction(post.id, reaction)}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-center"
            onClick={() => onComment(post.id)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-center"
            onClick={() => onShare(post.id)}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-center"
            onClick={() => onSave(post.id)}
          >
            <Bookmark className={`h-4 w-4 ${post.isSaved ? "fill-current text-blue-500" : ""}`} />
          </Button>
        </div>

        {/* Comment Input */}
        <div className="flex space-x-3 mt-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 bg-muted rounded-full px-4 py-2 text-sm">
            Write a comment...
          </div>
          <Button variant="ghost" size="sm">
            <Smile className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EnhancedPostCard