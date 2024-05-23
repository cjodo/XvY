// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  uuid,
  varchar,
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
    id: uuid('id').primaryKey().defaultRandom().unique(),
    first_name: varchar('first_name').notNull(),
    last_name: varchar('last_name').notNull(),
    username: varchar('username').notNull().unique(),
    gh_username: varchar('gh_username').unique(),
    age: varchar('age'),
    email: varchar('email').notNull().unique(),
  }
)
