import React from "react";
import "./selectedday.scss";
import PropTypes from "prop-types";
import { numeralWords } from "../../../utils";

const minuteNumerals = ["минуту", "минуты", "минут"];
const hourNumerals = ["час", "часа", "часов"];
const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function SelectedDay({ currentWeek, selectedColumn, selectedDay }) {
  const time = selectedColumn ? selectedColumn.timeOnTask / 60 : currentWeek.reduce((prev, curr) => prev + curr.timeOnTask, 0) / 60;

  function worksTime(time, minuteWords, hourWords) {
    if (time < 60) {
      return `${Math.floor(time)} ${numeralWords(Math.floor(time), minuteWords)}`;
    } else if (time % 60 === 0) {
      return `${Math.floor(time / 60)} ${numeralWords(Math.floor(time / 60), minuteWords)}`;
    } else {
      return `${Math.floor(time / 60)} ${numeralWords(Math.floor(time / 60), hourWords)} ${Math.floor(time % 60)} ${numeralWords(Math.floor(time % 60), minuteWords)}`;
    }
  }

  return (
    <div className="selected-day">
      <span className="selected-day__day">
        {selectedColumn && `${days[selectedDay - 1]}`}
      </span>
      <span className="selected-day__time">
        {selectedColumn ? "Вы работали над задачами " : "На этой неделе вы работали над задачами "}
        <span className="selected-day__time-count">{worksTime(time, minuteNumerals, hourNumerals)}</span>
      </span>
    </div>
  )
}

SelectedDay.propTypes = {
  currentWeek: PropTypes.array,
  day: PropTypes.number
}

export default SelectedDay;