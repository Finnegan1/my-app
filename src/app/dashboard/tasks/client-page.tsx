"use client";

import { Selectable } from "kysely";
import { Tasks } from "@/database/database.types";
import { createTask, updateCompleatStatus } from "./taskActions";
import { useState } from "react";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";

export default function TasksClientPage({ tasks }: { tasks: Selectable<Tasks>[] }) {
    const [currentTasks, setCurrentTasks] = useState<Selectable<Tasks>[]>(tasks);

    const handleCreateTask = async (task: { title: string; description: string }) => {
        await createTask(task);
        fetch("/api/tasks")
            .then(res => res.json())
            .then(data => setCurrentTasks(data))
    }

    const handleUpdateCompleted = async (taskId: number, completed: boolean) => {
        await updateCompleatStatus(taskId, completed);
        fetch("/api/tasks")
            .then(res => res.json())
            .then(data => setCurrentTasks(data))
    }

    return ( 
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <TaskForm onSubmit={handleCreateTask} />
          </div>
          <div>
            <TaskList tasks={currentTasks} onCheckedChange={handleUpdateCompleted} />
          </div>
        </div>
    )
}