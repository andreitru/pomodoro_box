import React, { useState } from "react";
import "./statistics.scss";
import { Header } from "../Header";
import { WeeksDropdown } from "./WeeksDropdown";
import SelectedDay from "./SelectedDay/SelectedDay";
import  Tomatoes  from "./Tomatoes/Tomatoes";
import { Focus } from "./Focus";
import { PauseTime } from "./PauseTime";
import { Stops } from "./Stops";
import Diagram from "./Diagram/Diagram";
import { useSelector } from "react-redux";

export function Statistics() {
  const {stat} = useSelector(({ time }) => time);
  const thisWeek = stat.filter(d => d.week === new Date().getWeek());
  const lastWeek = stat.filter(d => d.week === new Date().getWeek() - 1);
  const twoWeeksAgo = stat.filter(d => d.week === new Date().getWeek() - 2);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(thisWeek);
  const selectedColumn = currentWeek.find(e => e.day === selectedDay)

  return (
    <>
      <Header />
      <section className="statistics container">
        <h2 className="statistics__title">Ваша активность</h2>
        <WeeksDropdown
          setCurrentWeek={setCurrentWeek}
          setSelectedDay={setSelectedDay}
          thisWeek={thisWeek}
          lastWeek={lastWeek}
          twoWeeksAgo={twoWeeksAgo}
        />
        <SelectedDay currentWeek={currentWeek} selectedColumn={selectedColumn} selectedDay={selectedDay}/>
        <Tomatoes selectedColumn={selectedColumn}/>
        <Focus selectedColumn={selectedColumn}/>
        <PauseTime selectedColumn={selectedColumn}/>
        <Stops selectedColumn={selectedColumn}/>
        <Diagram currentWeek={currentWeek} day={selectedDay} setSelectedDay={setSelectedDay} />
      </section>
    </>
  );
}