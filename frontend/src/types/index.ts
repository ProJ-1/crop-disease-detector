// src/types/index.ts (Updated)
export type AppView = 'map' | 'tour' | 'about';

export interface POI {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
  type: 'building' | 'landmark' | 'facility';
}

export interface GraphNode {
  id: string;
  lat: number;
  lng: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

export interface CampusGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface TourStop {
  id: string;
  name: string;
  description: string;
  duration: string;
  highlights: string[];
}

export interface CampusInfo {
  name: string;
  established: number;
  students: number;
  faculty: number;
  area: string;
  description: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  features: string[];
}