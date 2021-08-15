import React from "react";
import "./lines.scss";
import { Line } from "./Line";

export function Lines({ maxTime }) {
  const timesArr = [];

  for (let i = 1; i < 6; i++) {
    const time = (maxTime / 5 / 60) * i;
    if (time < 60) {
      timesArr.unshift(`${Math.floor(time)} мин`)
    } else if (time % 60 === 0) {
      timesArr.unshift(`${Math.floor((time) / 60)} час`)
    } else {
      timesArr.unshift(`${Math.floor(time / 60)} час ${Math.floor(time % 60)} мин`)
    }
  }

  timesArr.shift();

  return (
    <div className="lines">
      {timesArr.map(time => (
        <Line time={time} key={Math.random()} />
      ))}
    </div>
  )
}