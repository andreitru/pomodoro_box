import React from "react";
import "./focus.scss";
import classNames from "classnames";

export function Focus() {

  const focusClassNames = classNames({
    "focus": true,
    "focus--active": false,
  })

  return (
    <div className={focusClassNames}>
      <span className="focus__title">Фокус</span>
      <span className="focus__amount">0%</span>
      <div className="focus__img" />
    </div>
  );
}