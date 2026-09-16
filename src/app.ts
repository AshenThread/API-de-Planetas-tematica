import express from 'express';
import { PlanetController } from './controllers/planet.controller';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './middlewares/logger.middleware';
import { requestId } from './middlewares/request-id.middleware';
import { createPlanetRouter } from './routes/planet.routes';
import { PlanetService } from './services/planet.service';

const app = express();
const planetController = new PlanetController(new PlanetService());

app.use(express.json());
app.use(requestId);
app.use(logger);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'orbital-atlas-api' });
});
app.use('/api/planets', createPlanetRouter(planetController));

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.', requestId: res.locals.requestId });
});
app.use(errorHandler);

export default app;