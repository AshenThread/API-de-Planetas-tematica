import { ErrorRequestHandler } from 'express';
import { HttpError } from '../utils/http-error';

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  console.error(error);
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : 'Error interno del servidor.';
  res.status(statusCode).json({ error: message, requestId: res.locals.requestId });
};