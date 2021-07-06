import React from "react";
import "./timerhead.scss";
import TaskTitle from "../TaskTitle/TaskTitle";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function TimerHead({ title }) {
  const {
    isStarted,
    isPaused,
    isBreak,
    isBreakPaused,
    pomodoroCount,
    breaksCount,
  } = useSelector(({ time }) => time);

  const timerHeadClassNames = classNames({
    "timer-head": true,
    "timer-head--start": isStarted || isPaused,
    "timer-head--break": isBreak || isBreakPaused,
  });

  return (
    <div className={timerHeadClassNames}>
      <TaskTitle className={"timer-head__title"} title={title} />
      <span className="timer-head__counter">
        {isStarted || isPaused
          ? `Помидор ${pomodoroCount + 1}`
          : isBreak || isBreakPaused
          ? `Перерыв ${breaksCount + 1}`
          : ""}
      </span>
    </div>
  );
}

TimerHead.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TimerHead;
