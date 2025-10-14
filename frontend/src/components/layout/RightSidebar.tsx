// src/components/layout/RightSidebar.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const RightSidebar = () => {
  const suggestedUsers = [
    {
      id: "1",
      name: "Alex Morgan",
      username: "alexm",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      mutual: 5
    },
    {
      id: "2",
      name: "Lisa Wang",
      username: "lisaw",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      mutual: 12
    },
    {
      id: "3",
      name: "David Kim",
      username: "davidk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      mutual: 3
    }
  ]

  const trendingTopics = [
    { tag: "#WebDevelopment", posts: "42.5K" },
    { tag: "#ReactJS", posts: "38.2K" },
    { tag: "#TypeScript", posts: "31.7K" },
    { tag: "#TailwindCSS", posts: "25.9K" }
  ]

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suggested Connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.mutual} mutual connections
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                {topic.tag}
              </span>
              <span className="text-xs text-muted-foreground">
                {topic.posts} posts
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default RightSidebar