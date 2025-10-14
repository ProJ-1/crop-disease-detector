// src/components/Feed.tsx
import { useState } from "react"
import CreatePost from "./CreatePost"
import PostCard from "./PostCard"

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

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
      },
      content: "Just launched my new portfolio website! Built with React and TypeScript. So excited to share this with everyone! 🚀",
      timestamp: "2h ago",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      isSaved: false
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        username: "mikechen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      },
      content: "Beautiful sunset from today's hike. Nature always has a way of putting things in perspective. 🌄",
      timestamp: "4h ago",
      likes: 42,
      comments: 12,
      shares: 5,
      isLiked: true,
      isSaved: true
    }
  ])

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: {
        name: "John Doe",
        username: "johndoe",
        avatar: "https://github.com/shadcn.png"
      },
      content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false
    }
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          } 
        : post
    ))
  }

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved } 
        : post
    ))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPostCreate={handleCreatePost} />
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onSave={handleSave}
        />
      ))}
    </div>
  )
}

export default Feed