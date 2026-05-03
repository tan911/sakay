import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { NotFoundError } from '../lib/errors';
import {
  codeParamSchema,
  codeResponseSchema,
  routeResponseSchema,
  searchQuerySchema,
  searchResponseSchema,
} from '../schema-validator/route';
import { createServices } from '../services';
import type { Bindings } from '../type';

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: routeResponseSchema,
          },
        },
        description: 'Returns all routes',
      },
    },
  }),
  async (c) => {
    const { routeService } = createServices(c.env.jeepney_decoder_db);

    const res = await routeService.get();

    return c.json({
      data: res.results,
    });
  },
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/search',
    request: {
      query: searchQuerySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: searchResponseSchema,
          },
        },
        description: 'Returns matching jeepney routes',
      },
    },
  }),
  async (c) => {
    const { from, to } = c.req.valid('query');

    const { routeService } = createServices(c.env.jeepney_decoder_db);

    const res = await routeService.lookup(from, to);

    // if no matching code found in services, then it will
    // throw this not found route
    if (!res.results.length) {
      throw new NotFoundError('No routes found!');
    }

    return c.json({
      data: res.results,
    });
  },
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/:code',
    request: {
      params: codeParamSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: codeResponseSchema,
          },
        },
        description: 'Returns all route stops',
      },
    },
  }),
  async (c) => {
    const code = c.req.valid('param');

    const { routeService } = createServices(c.env.jeepney_decoder_db);

    const result = await routeService.stops(code);

    return c.json({
      data: result.results,
    });
  },
);

export default app;
