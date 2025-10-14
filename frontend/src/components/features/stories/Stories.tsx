// src/components/features/stories/Stories.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

interface Story {
  id: string
  user: {
    name: string
    avatar: string
  }
  isLive?: boolean
  hasNew?: boolean
}

const Stories = () => {
  const stories: Story[] = [
    {
      id: "1",
      user: {
        name: "Your Story",
        avatar: "https://github.com/shadcn.png"
      },
      hasNew: true
    },
    {
      id: "2",
      user: {
        name: "Sarah",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
      },
      isLive: true
    },
    {
      id: "3",
      user: {
        name: "Mike",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      }
    },
    {
      id: "4",
      user: {
        name: "Emma",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      }
    },
    {
      id: "5",
      user: {
        name: "Alex",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      }
    }
  ]

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map((story, index) => (
            <div key={story.id} className="flex flex-col items-center space-y-2">
              <div className={`relative p-0.5 rounded-full ${
                index === 0 
                  ? 'bg-gradient-to-r from-purple-400 to-pink-600' 
                  : story.isLive 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                    : 'bg-gradient-to-r from-yellow-400 to-pink-600'
              }`}>
                <div className="bg-white p-0.5 rounded-full">
                  <Avatar className="h-14 w-14 border-2 border-white">
                    <AvatarImage src={story.user.avatar} />
                    <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                {index === 0 && (
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border-2 border-white">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                )}
                {story.isLive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-1 rounded">
                    LIVE
                  </div>
                )}
              </div>
              <span className="text-xs max-w-[60px] truncate">
                {story.user.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Stories