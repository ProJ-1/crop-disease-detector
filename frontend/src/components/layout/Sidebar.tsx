// src/components/layout/Sidebar.tsx
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Home, 
  Users, 
  MessageCircle, 
  Bell, 
  Bookmark, 
  User, 
  Settings,
  Calendar,
  Users2,
  ShoppingBag,
  PlayCircle,
  Clock
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 3 },
    { id: 'groups', label: 'Groups', icon: Users2, badge: 12 },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'watch', label: 'Watch', icon: PlayCircle, badge: 9 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'memories', label: 'Memories', icon: Clock },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 5 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const shortcuts = [
    { name: 'React Developers', members: '12.4K' },
    { name: 'TypeScript Community', members: '8.9K' },
    { name: 'Web Design Tips', members: '15.2K' },
    { name: 'Startup Founders', members: '5.7K' },
  ]

  return (
    <div className="w-64 bg-background border-r h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">SocialConnect</h1>
      </div>
      
      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start mb-1 relative"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
              {item.badge && (
                <span className="absolute right-3 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Button>
          )
        })}
      </nav>

      <div className="mt-8 px-6">
        <h3 className="font-semibold text-sm text-muted-foreground mb-3">
          YOUR SHORTCUTS
        </h3>
        {shortcuts.map((shortcut, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start mb-1 text-sm"
          >
            <Users className="mr-3 h-4 w-4" />
            <div className="text-left">
              <div>{shortcut.name}</div>
              <div className="text-xs text-muted-foreground">
                {shortcut.members} members
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">@johndoe</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar