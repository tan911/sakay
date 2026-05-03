import { z } from '@hono/zod-openapi';

export const searchQuerySchema = z.object({
  from: z.string().min(1, { message: 'from is required' }),
  to: z.string().min(1, { message: 'to is required' }),
});

export const searchResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      code: z.string(),
      name: z.string(),
    }),
  ),
});

export const routeResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      code: z.string(),
      description: z.string().nullable(),
    }),
  ),
});

export const codeParamSchema = z.object({
  code: z.string(),
});

export const codeResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});
