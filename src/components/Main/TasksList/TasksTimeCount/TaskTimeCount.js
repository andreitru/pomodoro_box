import React, { useEffect, useState } from "react";
import "./taskstimecount.scss";
import { useSelector } from "react-redux";

export function TasksTimeCount() {
  const [time, setTime] = useState("");
  const tasks = useSelector(({ tasks }) => tasks);
  const { taskTime } = useSelector(({ time }) => time);

  useEffect(() => {
    let tasksLength = 0;
    let tasksTime;

    for (let task of tasks) {
      tasksLength += task.count;
    }

    tasksTime = (tasksLength * taskTime) / 60;

    if (tasksTime < 60) {
      setTime(`${tasksTime} мин`);
    } else if (tasksTime % 60 === 0) {
      setTime(`${Math.floor(tasksTime / 60)} час`);
    } else {
      setTime(`${Math.floor(tasksTime / 60)} час ${tasksTime % 60} мин`);
    }
  }, [tasks, taskTime]);

  return <span className="tasks-time">{time !== "0 мин" && time}</span>;
}
