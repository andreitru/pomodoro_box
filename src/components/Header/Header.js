import React, { useState } from "react";
import "./header.scss";
import { ModalSettings } from "./ModalSettings";
import { Link } from "react-router-dom";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          pomodoro_box
        </Link>
        <Link to="/statistics" className="header__stat">
          Статистика
        </Link>
        <button className="header__settings btn-reset" onClick={() => setIsModalOpen(!isModalOpen)} />
      </div>
      <ModalSettings
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
