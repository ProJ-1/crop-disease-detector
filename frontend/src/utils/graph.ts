// src/utils/graph.ts
import type { CampusGraph } from '../types';

export class DijkstraAlgorithm {
  private graph: Map<string, Map<string, number>>;

  constructor(campusGraph: CampusGraph) {
    this.graph = new Map();
    
    // Initialize graph structure
    campusGraph.nodes.forEach(node => {
      this.graph.set(node.id, new Map());
    });

    // Add edges (undirected graph)
    campusGraph.edges.forEach(edge => {
      this.graph.get(edge.from)?.set(edge.to, edge.weight);
      this.graph.get(edge.to)?.set(edge.from, edge.weight);
    });
  }

  findShortestPath(startId: string, endId: string): string[] {
    if (!this.graph.has(startId) || !this.graph.has(endId)) {
      return [];
    }

    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();
    const visited = new Set<string>();

    // Initialize data structures
    this.graph.forEach((_, nodeId) => {
      distances.set(nodeId, nodeId === startId ? 0 : Infinity);
      previous.set(nodeId, null);
      unvisited.add(nodeId);
    });

    while (unvisited.size > 0) {
      // Find node with smallest distance
      let current: string | null = null;
      let smallestDistance = Infinity;

      unvisited.forEach(nodeId => {
        const distance = distances.get(nodeId)!;
        if (distance < smallestDistance) {
          smallestDistance = distance;
          current = nodeId;
        }
      });

      if (current === null || smallestDistance === Infinity) {
        break;
      }

      if (current === endId) {
        break;
      }

      unvisited.delete(current);
      visited.add(current);

      // Update distances to neighbors
      const neighbors = this.graph.get(current)!;
      neighbors.forEach((weight, neighborId) => {
        if (!visited.has(neighborId)) {
          const alt = distances.get(current!)! + weight;
          if (alt < distances.get(neighborId)!) {
            distances.set(neighborId, alt);
            previous.set(neighborId, current);
          }
        }
      });
    }

    // Reconstruct path
    const path: string[] = [];
    let current: string | null = endId;
    
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current)!;
    }

    // Check if path is valid (starts from startId)
    return path[0] === startId ? path : [];
  }

  getPathCoordinates(path: string[], pois: any[]): [number, number][] {
    return path.map(nodeId => {
      const poi = pois.find(p => p.id === nodeId);
      return poi ? [poi.lat, poi.lng] : [0, 0];
    }).filter(coord => coord[0] !== 0 && coord[1] !== 0);
  }

  // Calculate approximate distance in meters
  calculatePathDistance(path: string[]): number {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      const weight = this.graph.get(from)?.get(to);
      if (weight) {
        distance += weight;
      }
    }
    return distance;
  }

  // Find nearby POIs within a certain distance
  findNearbyPOIs(startId: string, maxDistance: number): string[] {
    const distances = new Map<string, number>();
    const unvisited = new Set<string>();
    
    this.graph.forEach((_, nodeId) => {
      distances.set(nodeId, nodeId === startId ? 0 : Infinity);
      unvisited.add(nodeId);
    });

    while (unvisited.size > 0) {
      let current: string | null = null;
      let smallestDistance = Infinity;

      unvisited.forEach(nodeId => {
        const distance = distances.get(nodeId)!;
        if (distance < smallestDistance) {
          smallestDistance = distance;
          current = nodeId;
        }
      });

      if (current === null || smallestDistance > maxDistance) {
        break;
      }

      unvisited.delete(current);

      const neighbors = this.graph.get(current)!;
      neighbors.forEach((weight, neighborId) => {
        if (unvisited.has(neighborId)) {
          const alt = distances.get(current!)! + weight;
          if (alt < distances.get(neighborId)!) {
            distances.set(neighborId, alt);
          }
        }
      });
    }

    // Return POIs within maxDistance
    const nearby: string[] = [];
    distances.forEach((distance, nodeId) => {
      if (distance <= maxDistance && nodeId !== startId) {
        nearby.push(nodeId);
      }
    });

    return nearby;
  }
}