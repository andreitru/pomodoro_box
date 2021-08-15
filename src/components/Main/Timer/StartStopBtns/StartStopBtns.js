import React from "react";
import "./startstopbtns.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseBreaks,
  increaseTasksCount,
  setStop,
  setIsBreak,
  setIsBreakPaused,
  setIsPaused,
  setIsStarted,
  increaseStopsCount,
} from "../../../../store/timeSlice";
import { deleteTask } from "../../../../store/tasksSlice";
import PropTypes from "prop-types";

function StartStopBtns({ setTaskTimeCounter, setBreakTimeCounter }) {
  const { isStarted, isPaused, isBreak, isBreakPaused } =
    useSelector(({ time }) => time);
  const { taskTime, breakTime } =
    useSelector(({ time }) => time.settings);
  const tasks = useSelector(({ tasks }) => tasks);
  const dispatch = useDispatch();

  function handleStartPause() {
    if (!isStarted && !isBreak && !isBreakPaused) {
      dispatch(setIsStarted(true));
    } else if (isStarted && !isBreak) {
      dispatch(setIsPaused(true));
    } else if (!isStarted && isBreak) {
      dispatch(setIsBreakPaused(true));
    } else if (!isStarted && isBreakPaused) {
      dispatch(setIsBreak(true));
    }
  }

  function handleStop() {
    if (isPaused) {
      dispatch(deleteTask(tasks[0].id));
      dispatch(setStop());
      dispatch(increaseTasksCount());
      setTaskTimeCounter(taskTime);
    } else if (isBreak || isBreakPaused) {
      dispatch(setIsStarted(true));
      setTaskTimeCounter(taskTime);
      setBreakTimeCounter(breakTime);
      dispatch(increaseBreaks());
    } else {
      dispatch(setStop());
      dispatch(increaseStopsCount());
      setTaskTimeCounter(taskTime);
    }
  }

  return (
    <div className="start-stop">
      <button
        disabled={tasks.length === 0}
        className="btn-reset start-stop__btn start-stop__btn--start"
        onClick={handleStartPause}
      >
        {isStarted || isBreak
          ? "Пауза"
          : isPaused || isBreakPaused
          ? "Продолжить"
          : "Старт"}
      </button>
      <button
        disabled={!isStarted && !isPaused && !isBreak && !isBreakPaused}
        className="btn-reset start-stop__btn start-stop__btn--stop"
        onClick={handleStop}
      >
        {isPaused
          ? "Сделано"
          : isBreak || isBreakPaused
          ? "Пропустить"
          : "Стоп"}
      </button>
    </div>
  );
}

StartStopBtns.propTypes = {
  setTaskTimeCounter: PropTypes.func.isRequired,
  setBreakTimeCounter: PropTypes.func.isRequired,
};

export default StartStopBtns;
