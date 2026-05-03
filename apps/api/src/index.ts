import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler, notFoundHandler } from './middleware';
import { routeRouter } from './routes';

const app = new OpenAPIHono();

// middlewares
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: (origin) => {
      const allowedOrigins = ['http://localhost:3000'];
      return allowedOrigins.includes(origin) ? origin : null;
    },
    allowMethods: ['GET'],
    allowHeaders: ['Content-Type'],
  }),
);

// routes
app.route('/v1/routes', routeRouter);

// health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// errors
app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
