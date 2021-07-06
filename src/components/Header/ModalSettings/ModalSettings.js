import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./modalsettings.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../store/timeSlice";

export function ModalSettings({ isModalOpen, setIsModalOpen }) {
  const { taskTime, initialBreakTime, longBreakTime, taskCycle } = useSelector(
    ({ time }) => time
  );
  const [taskDuration, setTaskDuration] = useState(taskTime / 60);
  const [breakDuration, setBreakDuration] = useState(initialBreakTime / 60);
  const [longBreakDuration, setLongBreakDuration] = useState(
    longBreakTime / 60
  );
  const [cycle, setCycle] = useState(taskCycle);
  const dispatch = useDispatch();

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleTaskDurationChange(e) {
    setTaskDuration(e.target.value);
  }

  function handleBreakDurationChange(e) {
    setBreakDuration(e.target.value);
  }

  function handleLongBreakDurationChange(e) {
    setLongBreakDuration(e.target.value);
  }

  function handleCycleChange(e) {
    setCycle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      setSettings({
        taskTime: Math.floor(+taskDuration * 60),
        breakTime: Math.floor(+breakDuration * 60),
        longBreakDuration: Math.floor(+longBreakDuration * 60),
        cycle: Math.floor(+cycle),
      })
    );
    setIsModalOpen(false);
  }

  const node = document.querySelector("#modal_root");

  return ReactDOM.createPortal(
    isModalOpen && (
      <div className="modal settings">
        <div className="modal__container">
          <span className="modal__title">Настройки</span>
          <form className="settings__form">
            <label className="settings__label">
              Продолжительность помидора, мин.
              <input
                type="number"
                value={taskDuration}
                min="1"
                max="99"
                className="settings__input"
                onChange={handleTaskDurationChange}
              />
            </label>
            <label className="settings__label">
              Продолжительность короткого перерыва, мин.
              <input
                type="number"
                value={breakDuration}
                min="1"
                max="99"
                className="settings__input"
                onChange={handleBreakDurationChange}
              />
            </label>
            <label className="settings__label">
              Продолжительность длинного перерыва, мин.
              <input
                type="number"
                value={longBreakDuration}
                min="1"
                max="99"
                className="settings__input"
                onChange={handleLongBreakDurationChange}
              />
            </label>
            <label className="settings__label">
              Количество помидоров до длинного перерыва
              <input
                type="number"
                value={cycle}
                min="1"
                className="settings__input"
                onChange={handleCycleChange}
              />
            </label>
            <button
              className="btn-reset modal__confirm"
              type="submit"
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          </form>
          <button className="btn-reset modal__cancel" onClick={handleClose}>
            Отмена
          </button>
          <button className="btn-reset modal__close" onClick={handleClose} />
        </div>
      </div>
    ),
    node
  );
}
