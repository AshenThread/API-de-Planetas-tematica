import { RequestHandler } from 'express';
import { PlanetService } from '../services/planet.service';

export class PlanetController {
  constructor(private readonly service: PlanetService) {}

  list: RequestHandler = (_req, res) => {
    res.status(200).json({ data: this.service.list() });
  };

  getById: RequestHandler = (req, res) => {
    res.status(200).json({ data: this.service.findById(String(req.params.id)) });
  };

  create: RequestHandler = (req, res) => {
    res.status(201).json({ data: this.service.create(req.body) });
  };

  update: RequestHandler = (req, res) => {
    res.status(200).json({ data: this.service.update(String(req.params.id), req.body) });
  };

  remove: RequestHandler = (req, res) => {
    this.service.remove(String(req.params.id));
    res.status(204).send();
  };
}