import type { ErrorHandler, NotFoundHandler } from 'hono';
import { NotFoundError } from '../lib/errors';

export const notFoundHandler: NotFoundHandler = (c) => {
  return c.json({ message: 'Route not found' }, 404);
};

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof NotFoundError) {
    return c.json({ message: err.message }, 404);
  }
  console.error(err);
  return c.json({ message: 'Internal server error' }, 500);
};
