// src/components/Marketplace.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, MessageCircle } from "lucide-react"

interface Listing {
  id: string
  title: string
  price: string
  description: string
  image: string
  location: string
  seller: {
    name: string
    avatar: string
  }
  isLiked: boolean
  timestamp: string
}

const Marketplace = () => {
  const listings: Listing[] = [
    {
      id: "1",
      title: "MacBook Pro 2023",
      price: "$1,200",
      description: "Like new, used for only 2 months. 16GB RAM, 512GB SSD.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
      location: "San Francisco, CA",
      seller: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      },
      isLiked: false,
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      title: "Vintage Camera Collection",
      price: "$350",
      description: "Beautiful collection of vintage cameras from the 70s and 80s.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
      location: "New York, NY",
      seller: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face"
      },
      isLiked: true,
      timestamp: "1 day ago"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketplace</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Sell</Button>
          <Button>Browse All</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(listing => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={listing.image} 
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${listing.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <span className="font-bold text-primary">{listing.price}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {listing.description}
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.location}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={listing.seller.avatar} />
                    <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{listing.seller.name}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Marketplace