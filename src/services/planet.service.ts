import { randomUUID } from 'node:crypto';
import { HttpError } from '../utils/http-error';
import { Planet, PlanetInput } from '../types/planet';

const planets: Planet[] = [
  {
    id: 'earth',
    name: 'Tierra',
    type: 'terrestrial',
    massEarths: 1,
    distanceFromSunAu: 1,
    habitable: true,
    description: 'El único mundo conocido con vida confirmada.',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'mars',
    name: 'Marte',
    type: 'terrestrial',
    massEarths: 0.107,
    distanceFromSunAu: 1.524,
    habitable: false,
    description: 'El planeta rojo, hogar de grandes volcanes y antiguos cauces.',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

export class PlanetService {
  list(): Planet[] {
    return [...planets];
  }

  findById(id: string): Planet {
    const planet = planets.find((item) => item.id === id);
    if (!planet) throw new HttpError(404, `No existe un planeta con id '${id}'.`);
    return planet;
  }

  create(input: PlanetInput): Planet {
    const planet: Planet = {
      id: randomUUID(),
      ...input,
      createdAt: new Date().toISOString()
    };
    planets.push(planet);
    return planet;
  }

  update(id: string, input: PlanetInput): Planet {
    const index = planets.findIndex((item) => item.id === id);
    if (index === -1) throw new HttpError(404, `No existe un planeta con id '${id}'.`);
    planets[index] = { ...planets[index], ...input };
    return planets[index];
  }

  remove(id: string): void {
    const index = planets.findIndex((item) => item.id === id);
    if (index === -1) throw new HttpError(404, `No existe un planeta con id '${id}'.`);
    planets.splice(index, 1);
  }
}