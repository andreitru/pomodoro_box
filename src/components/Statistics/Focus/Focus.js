import React from "react";
import "./focus.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";

export function Focus({selectedColumn}) {
  const {taskTime} = useSelector(({time}) => time.settings);
  const focusPercent = selectedColumn ? Math.round((selectedColumn.pomodoroCount * taskTime) * 100 / selectedColumn.timeOnTask) : 0;

  const focusClassNames = classNames({
    "focus": true,
    "focus--active": selectedColumn,
  })

  return (
    <div className={focusClassNames}>
      <span className="focus__title">Фокус</span>
      <span className="focus__amount">{`${focusPercent}%`}</span>
      <div className="focus__img" />
    </div>
  );
}