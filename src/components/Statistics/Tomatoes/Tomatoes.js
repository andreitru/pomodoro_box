import React from "react";
import "./tomatoes.scss";

export function Tomatoes() {
  return (
    <div className="tomatoes">
      <div className="tomatoes__tomato">
        <img className="tomatoes__img" src="../../../assets/icons/tomato.svg" alt="tomato" />
        <span className="tomatoes__amount">x 22</span>
      </div>
      <span className="tomatoes__count">22 помидора</span>
    </div>
  )
}