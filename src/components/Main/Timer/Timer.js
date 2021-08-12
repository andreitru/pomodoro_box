import React, { useEffect, useState } from "react";
import "./timer.scss";
import TimerHead from "./TimerHead/TimerHead";
import Clock from "./Clock/Clock";
import TimerTask from "./TimerTask/TimerTask";
import StartStopBtns from "./StartStopBtns/StartStopBtns";
import { useSelector } from "react-redux";

export function Timer() {
  const { taskTime, breakTime, stat } = useSelector(({ time }) => time);
  const today = stat[stat.length - 1];
  const tasks = useSelector(({ tasks }) => tasks);
  const [taskTimeCounter, setTaskTimeCounter] = useState(taskTime);
  const [breakTimeCounter, setBreakTimeCounter] = useState(breakTime);
  const title = tasks.length > 0 ? tasks[0].title : "Задач пока нет";
  const tasksCounter = tasks.length > 0 ? today.tasksCount + 1 : null;

  useEffect(() => {
    setTaskTimeCounter(taskTime);
  }, [taskTime]);

  useEffect(() => {
    setBreakTimeCounter(breakTime);
  }, [breakTime]);

  return (
    <article className="timer">
      <TimerHead title={title} />
      <Clock
        taskTimeCounter={taskTimeCounter}
        setTaskTimeCounter={setTaskTimeCounter}
        breakTimeCounter={breakTimeCounter}
        setBreakTimeCounter={setBreakTimeCounter}
      />
      <TimerTask title={title} tasksCounter={tasksCounter} />
      <StartStopBtns
        setTaskTimeCounter={setTaskTimeCounter}
        setBreakTimeCounter={setBreakTimeCounter}
      />
    </article>
  );
}
