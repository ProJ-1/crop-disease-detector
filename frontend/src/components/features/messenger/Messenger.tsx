// src/components/Messenger.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Search, MoreHorizontal, Phone, Video, Info, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  timestamp: string
  isSender: boolean
}

interface Conversation {
  id: string
  user: {
    name: string
    avatar: string
    isOnline: boolean
  }
  lastMessage: string
  timestamp: string
  unread: number
  messages: Message[]
}

const Messenger = () => {
  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [messageInput, setMessageInput] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        isOnline: true
      },
      lastMessage: "Hey! How are you doing?",
      timestamp: "2m ago",
      unread: 0,
      messages: [
        { id: "1", text: "Hey! How are you doing?", timestamp: "2:30 PM", isSender: false },
        { id: "2", text: "I'm good! Just working on some projects.", timestamp: "2:31 PM", isSender: true },
        { id: "3", text: "That's great! Want to catch up later?", timestamp: "2:32 PM", isSender: false }
      ]
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        isOnline: false
      },
      lastMessage: "Meeting at 3 PM tomorrow",
      timestamp: "1h ago",
      unread: 2,
      messages: []
    }
  ]

  const activeConv = conversations.find(c => c.id === activeConversation)

  const sendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending
      setMessageInput("")
    }
  }

  return (
    <Card className="h-[600px]">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-80 border-r">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Chats</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages" className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer ${
                  activeConversation === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate">
                      {conversation.user.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConv && (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={activeConv.user.avatar} />
                      <AvatarFallback>{activeConv.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{activeConv.user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {activeConv.user.isOnline ? "Online" : "Last seen recently"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConv.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isSender
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isSender ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

export default Messenger