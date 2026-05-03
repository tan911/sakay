CREATE TABLE "route_stops" (
	"route_id"	INTEGER,
	"stop_id"	INTEGER,
	"stop_order"	INTEGER,
	PRIMARY KEY("route_id","stop_order"),
	FOREIGN KEY("route_id") REFERENCES "routes"("id"),
	FOREIGN KEY("stop_id") REFERENCES "stops"("id")
);

CREATE TABLE "routes" (
	"id"	INTEGER,
	"code"	TEXT NOT NULL,
	"description"	TEXT,
	PRIMARY KEY("id")
);

CREATE TABLE "stops" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id")
);