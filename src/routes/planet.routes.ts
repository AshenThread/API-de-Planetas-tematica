import { Router } from 'express';
import { PlanetController } from '../controllers/planet.controller';
import { validatePlanet } from '../middlewares/validate-planet.middleware';

export const createPlanetRouter = (controller: PlanetController): Router => {
  const router = Router();
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', validatePlanet, controller.create);
  router.put('/:id', validatePlanet, controller.update);
  router.delete('/:id', controller.remove);
  return router;
};