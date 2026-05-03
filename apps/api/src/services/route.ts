type Context = {
  db: D1Database;
};

type LookupResult = {
  id: number;
  code: string;
  name: string;
};

type RouteResult = {
  id: number;
  code: string;
  description: string | null;
};

type StopResult = {
  id: number;
  name: string;
};

export class RouteService {
  constructor(private ctx: Context) {}

  // get all routes
  async get() {
    return await this.ctx.db.prepare('SELECT id, code, description FROM routes').all<RouteResult>();
  }

  // only get all stops by code ex. 03B
  async stops({ code }: { code: string }) {
    const res = await this.ctx.db
      .prepare(`SELECT * FROM stops
            WHERE id IN (
                SELECT stop_id FROM route_stops 
                WHERE route_id = (
                    SELECT id FROM routes 
                    WHERE code = '${code}'
                ) ORDER BY stop_order
            )
        `)
      .all<StopResult>();

    return res;
  }

  async lookup(from: string, to: string) {
    const res = await this.ctx.db
      .prepare(`WITH route_match AS (SELECT r.id, r.code, rs1.stop_order AS start, rs2.stop_order AS end FROM routes AS r
        JOIN route_stops AS rs1 ON r.id = rs1.route_id
        JOIN route_stops AS rs2 ON r.id = rs2.route_id
        JOIN stops AS s1 ON rs1.stop_id = s1.id
        JOIN stops AS s2 ON rs2.stop_id = s2.id
        WHERE s1.name = '${from}' AND s2.name = '${to}' AND rs1.stop_order < rs2.stop_order
    ) SELECT r.id, r.code, s.name FROM route_stops AS rs
      JOIN stops AS s ON rs.stop_id = s.id
      JOIN routes AS r ON rs.route_id = r.id
      WHERE rs.route_id = (SELECT id FROM route_match)
      AND rs.stop_order BETWEEN (SELECT start FROM route_match) AND (SELECT end FROM route_match)
      ORDER BY rs.stop_order 
    `)
      .all<LookupResult>();

    return res;
  }
}
