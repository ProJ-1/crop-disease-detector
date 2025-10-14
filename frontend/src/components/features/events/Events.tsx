// src/components/Events.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Plus } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees?: number
  image?: string
  isInterested: boolean
  isGoing: boolean
}

const Events = () => {
  const events: Event[] = [
    {
      id: "1",
      title: "Tech Meetup 2024",
      date: "2024-01-15",
      time: "18:00",
      location: "Tech Hub, Downtown",
      attendees: 45,
      maxAttendees: 100,
      isInterested: true,
      isGoing: false
    },
    {
      id: "2",
      title: "React Conference",
      date: "2024-02-20",
      time: "09:00",
      location: "Convention Center",
      attendees: 120,
      maxAttendees: 200,
      isInterested: false,
      isGoing: true
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {events.map(event => (
        <Card key={event.id}>
          <CardContent className="p-0">
            <div className="flex">
              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-32 h-32 object-cover rounded-l-lg"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-l-lg flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              )}
              
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatDate(event.date)}
                    </div>
                    <div className="text-sm text-muted-foreground">{event.time}</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} attending
                    {event.maxAttendees && ` • ${event.maxAttendees} max`}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant={event.isGoing ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    {event.isGoing ? "Going" : "Going"}
                  </Button>
                  <Button 
                    variant={event.isInterested ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    {event.isInterested ? "Interested" : "Interested"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Events