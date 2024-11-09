"use server";

import { auth } from "@/lib/auth";
import {db} from "@/database/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createTask = async (task: { title: string; description: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  await db
    .insertInto("tasks")
    .values({
      ...task,
      userId: session.user.id,
    })
    .returningAll()
    .executeTakeFirst();
};

export const updateCompleatStatus = async (taskId: number, completed: boolean) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  await db
    .updateTable("tasks")
    .set({ completed: completed})
    .where("id", "=", taskId)
    .where("userId", "=", session.user.id)
    .execute();
}