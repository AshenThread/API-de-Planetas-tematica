import { RequestHandler } from 'express';
import { PlanetInput, PlanetType } from '../types/planet';

const validTypes: PlanetType[] = ['terrestrial', 'gas-giant', 'ice-giant', 'dwarf'];

export const validatePlanet: RequestHandler = (req, res, next) => {
  const body = req.body as Partial<PlanetInput>;
  const errors: string[] = [];

  if (typeof body.name !== 'string' || body.name.trim().length < 2) errors.push('name debe tener al menos 2 caracteres.');
  if (!validTypes.includes(body.type as PlanetType)) errors.push(`type debe ser uno de: ${validTypes.join(', ')}.`);
  if (typeof body.massEarths !== 'number' || body.massEarths <= 0) errors.push('massEarths debe ser un número mayor que 0.');
  if (typeof body.distanceFromSunAu !== 'number' || body.distanceFromSunAu < 0) errors.push('distanceFromSunAu debe ser un número mayor o igual a 0.');
  if (typeof body.habitable !== 'boolean') errors.push('habitable debe ser booleano.');
  if (typeof body.description !== 'string' || body.description.trim().length < 10) errors.push('description debe tener al menos 10 caracteres.');

  if (errors.length > 0) {
    res.status(400).json({ error: 'Datos de planeta inválidos.', details: errors, requestId: res.locals.requestId });
    return;
  }

  req.body = {
    ...body,
    name: body.name!.trim(),
    description: body.description!.trim()
  };
  next();
};