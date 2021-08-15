import React from "react";
import "./stops.scss";
import classNames from "classnames";

export function Stops({selectedColumn}) {
  const stops = selectedColumn ? selectedColumn.stopsCount : 0;

  const stopsClassNames = classNames({
    "stops": true,
    "stops--active": selectedColumn,
  })

  return (
    <div className={stopsClassNames}>
      <span className="stops__title">Остановки</span>
      <span className="stops__amount">{stops}</span>
      <div className="stops__img" />
    </div>
  );
}