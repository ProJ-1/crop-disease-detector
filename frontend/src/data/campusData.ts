// src/data/campusData.ts
import type { POI, CampusGraph } from '../types';

export const campusPOIs: POI[] = [
  {
    id: '1',
    name: 'Main Library',
    lat: -17.8292,
    lng: 31.0522,
    description: 'Central library with extensive collections, study spaces, and research facilities. Open 24/7 during exam periods.',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop',
    type: 'building'
  },
  {
    id: '2',
    name: 'Student Cafeteria',
    lat: -17.8285,
    lng: 31.0535,
    description: 'Food court offering various cuisines, vegetarian options, and coffee shop. Accepts meal plans and cash.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    type: 'facility'
  },
  {
    id: '3',
    name: 'Computer Science Building',
    lat: -17.8278,
    lng: 31.0518,
    description: 'Home to computer labs, technology departments, and innovation center. Features state-of-the-art equipment.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
    type: 'building'
  },
  {
    id: '4',
    name: 'Sports Complex',
    lat: -17.8305,
    lng: 31.0542,
    description: 'Athletic facilities including gym, swimming pool, basketball courts, and fitness classes.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    type: 'facility'
  },
  {
    id: '5',
    name: 'Administration Block',
    lat: -17.8289,
    lng: 31.0505,
    description: 'Main administrative offices, student services, registrar, and financial aid. Open 8 AM - 5 PM weekdays.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    type: 'building'
  },
  {
    id: '6',
    name: 'Central Plaza',
    lat: -17.8290,
    lng: 31.0525,
    description: 'Main gathering space with benches, green areas, and outdoor events. Popular student hangout spot.',
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=300&fit=crop',
    type: 'landmark'
  },
  {
    id: '7',
    name: 'Science Laboratory',
    lat: -17.8272,
    lng: 31.0530,
    description: 'Research laboratories for physics, chemistry, and biology departments. Requires access card after hours.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    type: 'building'
  },
  {
    id: '8',
    name: 'Auditorium',
    lat: -17.8300,
    lng: 31.0510,
    description: '500-seat auditorium for lectures, performances, and university events. Available for booking.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
    type: 'facility'
  },
  {
    id: '9',
    name: 'Student Center',
    lat: -17.8295,
    lng: 31.0530,
    description: 'Student lounge, game room, club offices, and meeting spaces. Heart of campus social life.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    type: 'facility'
  },
  {
    id: '10',
    name: 'Engineering Building',
    lat: -17.8268,
    lng: 31.0522,
    description: 'Engineering departments, workshops, and prototyping labs. Features 3D printers and CNC machines.',
    image: 'https://images.unsplash.com/photo-1581094794329-c6d3dac7e241?w=400&h=300&fit=crop',
    type: 'building'
  },
  {
    id: '11',
    name: 'Campus Lake',
    lat: -17.8310,
    lng: 31.0515,
    description: 'Scenic lake with walking path, benches, and fountain. Perfect for relaxation and study breaks.',
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=400&h=300&fit=crop',
    type: 'landmark'
  },
  {
    id: '12',
    name: 'Medical Center',
    lat: -17.8280,
    lng: 31.0545,
    description: 'Campus health services, counseling, and emergency medical care. Confidential and student-focused.',
    image: 'https://images.unsplash.com/photo-1516549655469-943b0f3f4b2f?w=400&h=300&fit=crop',
    type: 'facility'
  }
];

export const campusGraph: CampusGraph = {
  nodes: campusPOIs.map(poi => ({ 
    id: poi.id, 
    lat: poi.lat, 
    lng: poi.lng 
  })),
  
  edges: [
    // Main pathways - realistic walking distances (weight = approximate meters)
    { from: '1', to: '6', weight: 50 },   // Library to Central Plaza
    { from: '6', to: '2', weight: 80 },   // Plaza to Cafeteria
    { from: '6', to: '9', weight: 60 },   // Plaza to Student Center
    { from: '6', to: '3', weight: 120 },  // Plaza to Computer Science
    { from: '2', to: '9', weight: 40 },   // Cafeteria to Student Center
    { from: '2', to: '4', weight: 150 },  // Cafeteria to Sports Complex
    { from: '2', to: '12', weight: 100 }, // Cafeteria to Medical Center
    { from: '3', to: '7', weight: 70 },   // Computer Science to Science Lab
    { from: '3', to: '10', weight: 90 },  // Computer Science to Engineering
    { from: '3', to: '5', weight: 110 },  // Computer Science to Admin
    { from: '5', to: '8', weight: 80 },   // Admin to Auditorium
    { from: '5', to: '11', weight: 130 }, // Admin to Campus Lake
    { from: '8', to: '11', weight: 70 },  // Auditorium to Campus Lake
    { from: '9', to: '4', weight: 120 },  // Student Center to Sports Complex
    { from: '4', to: '12', weight: 90 },  // Sports Complex to Medical Center
    { from: '7', to: '10', weight: 60 },  // Science Lab to Engineering
    { from: '10', to: '5', weight: 140 }, // Engineering to Admin
    
    // Additional connections for better routing
    { from: '1', to: '8', weight: 110 },  // Library to Auditorium
    { from: '9', to: '6', weight: 60 },   // Student Center to Plaza (duplicate for symmetry)
    { from: '11', to: '8', weight: 70 },  // Lake to Auditorium (duplicate for symmetry)
    
    // Diagonal shortcuts
    { from: '6', to: '8', weight: 100 },  // Plaza to Auditorium
    { from: '2', to: '3', weight: 150 },  // Cafeteria to Computer Science
  ]
};

// Predefined tour routes
export const tourOrder: string[] = ['5', '6', '1', '3', '10', '7', '2', '9', '4', '12', '11', '8'];

// Tour information with descriptions
export const tourStops = [
  {
    id: '5',
    name: 'Administration Block',
    description: 'Start your tour here at the main administrative hub of the campus.',
    duration: '10 min',
    highlights: ['Student Services', 'Registrar Office', 'Financial Aid']
  },
  {
    id: '6',
    name: 'Central Plaza',
    description: 'The heart of campus life with beautiful landscaping and gathering spaces.',
    duration: '15 min',
    highlights: ['Main Square', 'Outdoor Seating', 'Event Space']
  },
  {
    id: '1',
    name: 'Main Library',
    description: 'Explore our extensive collection and state-of-the-art study facilities.',
    duration: '20 min',
    highlights: ['24/7 Access', 'Study Rooms', 'Research Help']
  },
  {
    id: '3',
    name: 'Computer Science Building',
    description: 'See our technology labs and innovation centers.',
    duration: '15 min',
    highlights: ['Computer Labs', 'Tech Hub', 'Innovation Center']
  },
  {
    id: '10',
    name: 'Engineering Building',
    description: 'Visit our engineering workshops and prototyping facilities.',
    duration: '20 min',
    highlights: ['Workshops', '3D Printers', 'Design Labs']
  },
  {
    id: '7',
    name: 'Science Laboratory',
    description: 'Tour our advanced research laboratories.',
    duration: '15 min',
    highlights: ['Research Labs', 'Science Equipment', 'Study Areas']
  },
  {
    id: '2',
    name: 'Student Cafeteria',
    description: 'Experience our diverse dining options and meal plans.',
    duration: '25 min',
    highlights: ['Food Court', 'Coffee Shop', 'Meal Plans']
  },
  {
    id: '9',
    name: 'Student Center',
    description: 'The social hub of campus with various student activities.',
    duration: '20 min',
    highlights: ['Game Room', 'Student Lounge', 'Club Offices']
  },
  {
    id: '4',
    name: 'Sports Complex',
    description: 'Check out our athletic facilities and fitness programs.',
    duration: '20 min',
    highlights: ['Gym', 'Swimming Pool', 'Fitness Classes']
  },
  {
    id: '12',
    name: 'Medical Center',
    description: 'Learn about our health services and student wellness programs.',
    duration: '10 min',
    highlights: ['Health Services', 'Counseling', 'Emergency Care']
  },
  {
    id: '11',
    name: 'Campus Lake',
    description: 'Relax at our scenic lake with walking paths and benches.',
    duration: '15 min',
    highlights: ['Walking Path', 'Fountain', 'Relaxation Area']
  },
  {
    id: '8',
    name: 'Auditorium',
    description: 'End your tour at our main event and performance space.',
    duration: '10 min',
    highlights: ['500 Seats', 'Event Space', 'Performance Hall']
  }
];

// Campus information for About page
export const campusInfo = {
  name: 'University of Harare',
  established: 1952,
  students: 15000,
  faculty: 1200,
  area: '50 hectares',
  description: 'A premier institution of higher learning dedicated to academic excellence, innovation, and community engagement.',
  contact: {
    address: '123 University Avenue, Harare',
    phone: '+263 4 123 4567',
    email: 'admissions@university.ac.zw',
    website: 'www.university.ac.zw'
  },
  features: [
    '24/7 Library Access',
    'Sports Facilities',
    'Student Health Services',
    'Research Centers',
    'International Programs',
    'Career Development'
  ]
};

// Helper function to get POI by ID
export const getPOIById = (id: string): POI | undefined => {
  return campusPOIs.find(poi => poi.id === id);
};

// Helper function to get tour stop information
export const getTourStopInfo = (id: string) => {
  return tourStops.find(stop => stop.id === id);
};

// Calculate approximate tour duration
export const getTourDuration = (): string => {
  const totalMinutes = tourStops.reduce((sum, stop) => {
    const minutes = parseInt(stop.duration);
    return sum + (isNaN(minutes) ? 15 : minutes);
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};