import { DB } from "./database.types";

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.

//SQLite

// import SQLite from 'better-sqlite3'
// import { Kysely, SqliteDialect } from 'kysely'

// export const db = new Kysely<DB>({
//   dialect: new SqliteDialect({
//     database: new SQLite('./sqlite.db'),
//   }),
// })

//Postgres

import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

if (!process.env.DATABASE_HOST) throw new Error('DATABASE_HOST is required');
if (!process.env.DATABASE_PORT_POOLED) throw new Error('DATABASE_PORT_POOLED is required');
if (!process.env.DATABASE_NAME) throw new Error('DATABASE_NAME is required');
if (!process.env.DATABASE_USER) throw new Error('DATABASE_USER is required');
if (!process.env.DATABASE_PASSWORD) throw new Error('DATABASE_PASSWORD is required');

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT_POOLED!),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    }),
  }),
});