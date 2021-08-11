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

  function buttonMinusClick(state, func) {
    const num = state === cycle || state === breakDuration ? 1 : 5;
    if (state > 5) {
      func(state - num);
    } else if (state <= 5 && state > 1) {
      func(state - 1);
    }
  }

  function buttonPlusClick(state, func) {
    const num = state === cycle || state === breakDuration ? 1 : 5;
    if (state >= 5) {
      func(state + num);
    } else if (state <= 5 && state >= 1) {
      func(state + 1);
    }
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
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--minus"
                onClick={() => buttonMinusClick(taskDuration, setTaskDuration)}
              >
                -
              </button>
              <input
                readOnly
                type="number"
                value={taskDuration}
                className="settings__input"
                onChange={handleTaskDurationChange}
              />
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--plus"
                onClick={() => buttonPlusClick(taskDuration, setTaskDuration)}
              >
                +
              </button>
            </label>
            <label className="settings__label">
              Продолжительность короткого перерыва, мин.
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--minus"
                onClick={() => buttonMinusClick(breakDuration, setBreakDuration)}
              >
                -
              </button>
              <input
                readOnly
                type="number"
                value={breakDuration}
                className="settings__input"
                onChange={handleBreakDurationChange}
              />
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--plus"
                onClick={() => buttonPlusClick(breakDuration, setBreakDuration)}
              >
                +
              </button>
            </label>
            <label className="settings__label">
              Продолжительность длинного перерыва, мин.
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--minus"
                onClick={() => buttonMinusClick(longBreakDuration, setLongBreakDuration)}
              >
                -
              </button>
              <input
                readOnly
                type="number"
                value={longBreakDuration}
                className="settings__input"
                onChange={handleLongBreakDurationChange}
              />
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--plus"
                onClick={() => buttonPlusClick(longBreakDuration, setLongBreakDuration)}
              >
                +
              </button>
            </label>
            <label className="settings__label">
              Количество помидоров до длинного перерыва
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--minus"
                onClick={() => buttonMinusClick(cycle, setCycle)}
              >
                -
              </button>
              <input
                readOnly
                type="number"
                value={cycle}
                className="settings__input"
                onChange={handleCycleChange}
              />
              <button
                type="button"
                className="btn-reset settings__btn settings__btn--plus"
                onClick={() => buttonPlusClick(cycle, setCycle)}
              >
                +
              </button>
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
