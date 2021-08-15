import React from "react";
import "./diagram.scss";
import PropTypes from "prop-types";
import Column from "./Column/Column";
import { Lines } from "./Lines";

function Diagram({ currentWeek, setSelectedDay, day }) {
  const maxTime = currentWeek.length > 0 && currentWeek.reduce((acc, curr) => acc.timeOnTask > curr.timeOnTask ? acc : curr).timeOnTask;
  let columnsHeights = new Array(7).fill(null);
  for (let i = 0; i < 7; i++) {
    if (currentWeek[i]) {
      columnsHeights[currentWeek[i].day - 1] = Math.round(currentWeek[i].timeOnTask * 100 / maxTime);
    }
  }

  return (
    <div className="diagram">
      <div className="diagram__columns">
        {
          columnsHeights.map((el, i) => (
            <Column height={columnsHeights[i]} key={Math.random()} weekDay={i} setSelectedDay={setSelectedDay} day={day}/>
          ))
        }
      </div>
      <Lines maxTime={maxTime} />
    </div>
  )
}

Diagram.propTypes = {
  currentWeek: PropTypes.arrayOf(PropTypes.object),
};

export default Diagram;