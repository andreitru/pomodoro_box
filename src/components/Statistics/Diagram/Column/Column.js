import React from "react";
import "./column.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

function Column({ height, weekDay, setSelectedDay, day }) {
  function handleClick(e) {
    e.preventDefault();
    if (e.currentTarget.hasAttribute("style")) {
      setSelectedDay(+e.currentTarget.id + 1)
    }
  }

  const columnClassNames = classNames({
    "btn-reset": true,
    "column": true,
    "column--active": weekDay + 1 === day,
  })

  return (
    <button className={columnClassNames} style={{ height: `${height}%` }} onClick={handleClick} id={weekDay}>
      <span className="column__week">{weekDays[weekDay]}</span>
    </button>
  )
}

Column.propTypes = {
  height: PropTypes.number || null,
}

export default Column;