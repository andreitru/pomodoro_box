import React, { useState } from "react";
import "./header.scss";
import { ModalSettings } from "./ModalSettings";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="header">
      <div className="container header__container">
        <a href="/" className="header__logo">
          pomodoro_box
        </a>
        <a href="#" className="header__stat">
          Статистика
        </a>
        {/*<button className="header__settings btn-reset" onClick={() => setIsModalOpen(!isModalOpen)}/>*/}
      </div>
      <ModalSettings
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
