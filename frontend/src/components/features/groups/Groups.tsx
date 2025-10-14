// src/components/Groups.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, Lock, Search, Plus } from "lucide-react"

interface Group {
  id: string
  name: string
  description: string
  members: number
  isPrivate: boolean
  avatar: string
  isMember: boolean
  recentPost?: string
}

const Groups = () => {
  const groups: Group[] = [
    {
      id: "1",
      name: "React Developers",
      description: "A community for React developers to share knowledge and experiences",
      members: 12450,
      isPrivate: false,
      avatar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=64&h=64&fit=crop",
      isMember: true,
      recentPost: "Just shared a new tutorial about React hooks!"
    },
    {
      id: "2",
      name: "TypeScript Enthusiasts",
      description: "Everything TypeScript - from basics to advanced patterns",
      members: 8923,
      isPrivate: true,
      avatar: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=64&h=64&fit=crop",
      isMember: false
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Groups</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search groups..." 
              className="pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {groups.map(group => (
          <Card key={group.id}>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={group.avatar} />
                  <AvatarFallback>{group.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center">
                        {group.name}
                        {group.isPrivate && (
                          <Lock className="h-4 w-4 ml-2 text-muted-foreground" />
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        {group.members.toLocaleString()} members
                        {group.isMember && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Member
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant={group.isMember ? "outline" : "default"}>
                      {group.isMember ? "Joined" : "Join Group"}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {group.description}
                  </p>
                  
                  {group.recentPost && (
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">Recent post: {group.recentPost}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Groups