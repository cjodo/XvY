// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  uuid,
  timestamp,
  varchar,
  json
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `xvy-example_${name}`);

export const users = createTable(
  "users",
  {
    id: uuid('id').primaryKey(),
    first_name: varchar('name').notNull(),
    last_name: varchar('name').notNull(),
    username: varchar('username').notNull(),
    age: varchar('age'),
    email: varchar('email').notNull().unique(),
  }
)

export const posts = createTable(
  "graph",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    data: json("data")
      .notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);
