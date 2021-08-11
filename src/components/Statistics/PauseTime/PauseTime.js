import React from "react";
import "./pausetime.scss";
import classNames from "classnames";

export function PauseTime() {

  const pauseTimeClassNames = classNames({
    "pause-time": true,
    "pause-time--active": false,
  })

  return (
    <div className={pauseTimeClassNames}>
      <span className="pause-time__title">Время на паузе</span>
      <span className="pause-time__amount">0м</span>
      <div className="pause-time__img" />
    </div>
  );
}