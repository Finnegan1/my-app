/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("tasks")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("completed", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) => 
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn("userId", "text", (col) => col.notNull().references("user.id").onDelete("cascade"))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("tasks").execute()
}