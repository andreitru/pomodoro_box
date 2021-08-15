import React from "react";
import "./pausetime.scss";
import classNames from "classnames";

export function PauseTime({selectedColumn}) {
  const time = selectedColumn ? selectedColumn.timeOnPause / 60 : 0;

  function pauseTime(time) {
    if (time < 60) {
      return `${Math.floor(time)}м`;
    } else if (time % 60 === 0) {
      return `${Math.floor(time / 60)}ч`;
    } else {
      return `${Math.floor(time / 60)}ч ${Math.floor(time % 60)}м`;
    }
  }

  const pauseTimeClassNames = classNames({
    "pause-time": true,
    "pause-time--active": selectedColumn,
  })

  return (
    <div className={pauseTimeClassNames}>
      <span className="pause-time__title">Время на паузе</span>
      <span className="pause-time__amount">{pauseTime(time)}</span>
      <div className="pause-time__img" />
    </div>
  );
}