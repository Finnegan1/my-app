import { DashboardNav } from "@/components/dashboard-nav";
import {db} from "@/database/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TasksClientPage from "./client-page";

export default async function TasksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const tasks = await db
    .selectFrom("tasks")
    .selectAll()
    .where("userId", "=", session.user.id)
    .orderBy("createdAt", "desc")
    .execute();
  console.log(tasks);

  return (
    <div>
      <DashboardNav />
      <main className="container mx-auto py-6">
        <TasksClientPage tasks={tasks} />
      </main>
    </div>
  );
}
