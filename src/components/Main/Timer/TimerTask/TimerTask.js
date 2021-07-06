import React from "react";
import "./timertask.scss";
import TaskTitle from "../TaskTitle/TaskTitle";
import PropTypes from "prop-types";

function TimerTask({ title, tasksCounter }) {
  return (
    <div className="timer-task">
      <span className="timer-task__count">
        {tasksCounter && <i>Задача {tasksCounter} -&nbsp;</i>}
      </span>
      <TaskTitle className={"timer-task__title"} title={title} />
    </div>
  );
}

TimerTask.propTypes = {
  title: PropTypes.string.isRequired,
  tasksCounter: PropTypes.number,
};

export default TimerTask;
