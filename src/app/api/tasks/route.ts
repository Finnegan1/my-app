import { auth } from "@/lib/auth"
import {db} from "@/database/db"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const tasks = await db
    .selectFrom("tasks")
    .selectAll()
    .where("userId", "=", session.user.id)
    .orderBy("createdAt", "desc")
    .execute()

  console.log(tasks)

  return NextResponse.json(tasks)
}