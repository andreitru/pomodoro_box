import React from "react";
import "./taskslist.scss";
import { TasksTimeCount } from "./TasksTimeCount";
import { useSelector } from "react-redux";
import Task from "./Task/Task";

export function TasksList() {
  const tasks = useSelector(({ tasks }) => tasks);

  return (
    <div className="task-list">
      <ul className="task-list__list">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Task
              title={task.title}
              key={task.id}
              count={task.count}
              id={task.id}
            />
          ))}
      </ul>
      <TasksTimeCount />
    </div>
  );
}
