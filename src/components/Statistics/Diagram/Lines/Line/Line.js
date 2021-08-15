import React from "react";
import "./line.scss";

export function Line({time}) {
  return (
    <div className="line">
      <span className="line__time">{time}</span>
    </div>
  )
}