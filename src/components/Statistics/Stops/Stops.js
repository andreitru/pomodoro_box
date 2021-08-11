import React from "react";
import "./stops.scss";
import classNames from "classnames";

export function Stops() {

  const stopsClassNames = classNames({
    "stops": true,
    "stops--active": false,
  })

  return (
    <div className={stopsClassNames}>
      <span className="stops__title">Остановки</span>
      <span className="stops__amount">0</span>
      <div className="stops__img" />
    </div>
  );
}