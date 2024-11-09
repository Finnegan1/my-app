import { db } from "@/database/db";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    db: db,
    type: "postgres",
  },
  emailAndPassword: {
    enabled: true,
  }
});
