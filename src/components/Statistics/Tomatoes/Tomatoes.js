import React from "react";
import "./tomatoes.scss";
import classNames from "classnames";
import PropTypes from "prop-types";
import { numeralWords } from "../../../utils";

const numerals = ["помидор", "помидора", "помидоров"]

function Tomatoes({ selectedColumn }) {

  const imgClassNames = classNames({
    "tomatoes__img": true,
    "tomatoes__img--big": !selectedColumn
  })

  return (
    <div className="tomatoes">
      <div className="tomatoes__tomato">
        <img className={imgClassNames}
             src={selectedColumn ? "../../../assets/icons/tomato.svg" : "../../../assets/icons/tomato-smile.svg"}
             alt="tomato"
        />
        <span className="tomatoes__amount">{selectedColumn && `x ${selectedColumn.pomodoroCount}`}</span>
      </div>
      {selectedColumn && (
        <span className="tomatoes__count">
          {`${selectedColumn.pomodoroCount} ${numeralWords(selectedColumn.pomodoroCount, numerals)}`}
        </span>
      )
      }
    </div>
  )
}

Tomatoes.propTypes = {
  currentWeek: PropTypes.array,
  day: PropTypes.number
}

export default Tomatoes;