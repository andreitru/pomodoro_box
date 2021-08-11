import React from "react";
import "./selectedday.scss";

export function SelectedDay() {
  return (
    <div className="selected-day">
      <span className="selected-day__day">Суббота</span>
      <span className="selected-day__time">
        Вы работали над задачами в течение&nbsp;
        <span className="selected-day__time-count">9 часов 15 минут</span>
      </span>
    </div>
  )
}