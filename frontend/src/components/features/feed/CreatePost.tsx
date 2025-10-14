// src/components/features/feed/CreatePost.tsx
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Image, Video, MapPin } from "lucide-react"

interface CreatePostProps {
  onPostCreate: (content: string) => void
}

const CreatePost = ({ onPostCreate }: CreatePostProps) => {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onPostCreate(content)
      setContent("")
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border-0 focus:ring-0 resize-none text-sm placeholder:text-muted-foreground min-h-[60px]"
            />
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleSubmit} disabled={!content.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreatePost