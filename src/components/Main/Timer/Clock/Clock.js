import React, { useEffect } from "react";
import classNames from "classnames";
import "./clock.scss";
import * as workerTimers from "worker-timers";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCount, deleteTask } from "../../../../store/tasksSlice";
import {
  increaseBreaks,
  increasePomodoro,
  increaseTasksCount,
  setStop,
  setIsBreak,
  setIsStarted,
} from "../../../../store/timeSlice";
import PropTypes from "prop-types";

const padTime = (time) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${padTime(seconds)}`;
};

function Clock({
                 taskTimeCounter,
                 setTaskTimeCounter,
                 breakTimeCounter,
                 setBreakTimeCounter,
               }) {
  const { isStarted, isBreak, isBreakPaused } =
    useSelector(({ time }) => time);
  const { taskTime, breakTime } =
    useSelector(({ time }) => time.settings);
  const tasks = useSelector(({ tasks }) => tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (tasks.length === 0 && isStarted) {
      dispatch(setStop());
      setTaskTimeCounter(taskTime);
      return;
    } else if (taskTimeCounter > 0 && isStarted && tasks.length > 0) {
      timer = workerTimers.setTimeout(
        () => setTaskTimeCounter((c) => c - 1),
        1000
      );
    } else if (taskTimeCounter === 0 && isStarted) {
      if (breakTimeCounter === 0) {
        setBreakTimeCounter(breakTime);
      }
      dispatch(setIsStarted(false));
      dispatch(increasePomodoro());
      if (tasks[0].count > 1) {
        dispatch(decreaseCount(tasks[0].id));
        dispatch(setIsBreak(true));
      } else {
        dispatch(deleteTask(tasks[0].id));
        dispatch(increaseTasksCount());
        dispatch(setIsBreak(true));
      }
    }

    return () => {
      if (timer) {
        workerTimers.clearTimeout(timer);
      }
    };
  }, [taskTimeCounter, isStarted]);

  useEffect(() => {
    let breakTimer;
    if (tasks.length === 0) {
      setTaskTimeCounter(taskTime);
      setBreakTimeCounter(breakTime);
      dispatch(setStop());
      return;
    } else if (breakTimeCounter > 0 && isBreak) {
      breakTimer = workerTimers.setTimeout(
        () => setBreakTimeCounter((c) => c - 1),
        1000
      );
    } else if (breakTimeCounter === 0 && isBreak) {
      setTaskTimeCounter(taskTime);
      dispatch(increaseBreaks());
      dispatch(setIsBreak(false));

      if (tasks.length > 0) {
        dispatch(setIsStarted(true));
      }
    }

    return () => {
      if (breakTimer) {
        workerTimers.clearTimeout(breakTimer);
      }
    };
  }, [breakTimeCounter, isBreak]);

  function handleIncreaseTime() {
    if (isBreak || isBreakPaused) {
      setBreakTimeCounter(breakTimeCounter + 60);
    } else {
      setTaskTimeCounter(taskTimeCounter + 60);
    }
  }

  const clockClassNames = classNames({
    clock: true,
    "clock--start": isStarted,
    "clock--break": isBreak,
  });

  return (
    <div className={clockClassNames}>
      {isBreak || isBreakPaused
        ? format(breakTimeCounter)
        : format(taskTimeCounter)}
      <button className="btn-reset clock__btn" onClick={handleIncreaseTime}>
        +
      </button>
    </div>
  );
}

Clock.propTypes = {
  taskTimeCounter: PropTypes.number.isRequired,
  setTaskTimeCounter: PropTypes.func.isRequired,
  breakTimeCounter: PropTypes.number,
  setBreakTimeCounter: PropTypes.func.isRequired,
};

export default Clock;
