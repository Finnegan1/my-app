/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("id", "text", (col) => col.notNull().primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("emailVerified", "boolean", (col) => col.notNull())
    .addColumn("image", "text")
    .addColumn("createdAt", "date", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updatedAt", "date", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("session")
    .addColumn("id", "text", (col) => col.notNull().primaryKey())
    .addColumn("expiresAt", "date", (col) => col.notNull())
    .addColumn("ipAddress", "text")
    .addColumn("userAgent", "text")
    .addColumn("userId", "text", (col) =>
      col.notNull().references("user.id").onDelete("cascade")
    )
    .execute();

  await db.schema
    .createTable("account")
    .addColumn("id", "text", (col) => col.notNull().primaryKey())
    .addColumn("accountId", "text", (col) => col.notNull())
    .addColumn("providerId", "text", (col) => col.notNull())
    .addColumn("userId", "text", (col) => col.notNull().references("user.id"))
    .addColumn("accessToken", "text")
    .addColumn("refreshToken", "text")
    .addColumn("idToken", "text")
    .addColumn("expiresAt", "date")
    .addColumn("password", "text")
    .execute();

  await db.schema
    .createTable("verification")
    .addColumn("id", "text", (col) => col.notNull().primaryKey())
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("value", "text", (col) => col.notNull())
    .addColumn("expiresAt", "date", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("verification").execute();
  await db.schema.dropTable("account").execute();
  await db.schema.dropTable("session").execute();
  await db.schema.dropTable("user").execute();
}
