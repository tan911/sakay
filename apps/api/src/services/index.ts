import { RouteService } from './route';

export function createServices(db: D1Database) {
  return {
    routeService: new RouteService({ db }),
  };
}
