import React from "react";
import "./statistics.scss";
import { Header } from "../Header";
import { WeeksDropdown } from "./WeeksDropdown";
import { SelectedDay } from "./SelectedDay";
import { Tomatoes } from "./Tomatoes";
import { Focus } from "./Focus";
import { PauseTime } from "./PauseTime";
import { Stops } from "./Stops";
import { Diagram } from "./Diagram";

export function Statistics() {
  return (
    <>
      <Header />
      <section className="statistics container">
        <h2 className="statistics__title">Ваша активность</h2>
        <WeeksDropdown />
        <SelectedDay />
        <Tomatoes />
        <Focus />
        <PauseTime />
        <Stops />
        <Diagram />
      </section>
    </>
  );
}