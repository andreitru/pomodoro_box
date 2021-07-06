import React from "react";
import "./main.scss";
import { Instruction } from "./Instruction";
import { InputForm } from "./InputForm";
import { Timer } from "./Timer";
import { TasksList } from "./TasksList";

export function Main() {
  return (
    <section className="main container">
      <div className="main__left">
        <Instruction />
        <InputForm />
        <TasksList />
      </div>
      <Timer />
    </section>
  );
}
