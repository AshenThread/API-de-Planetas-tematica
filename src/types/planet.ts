export type PlanetType = 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf';

export interface Planet {
  id: string;
  name: string;
  type: PlanetType;
  massEarths: number;
  distanceFromSunAu: number;
  habitable: boolean;
  description: string;
  createdAt: string;
}

export interface PlanetInput {
  name: string;
  type: PlanetType;
  massEarths: number;
  distanceFromSunAu: number;
  habitable: boolean;
  description: string;
}
