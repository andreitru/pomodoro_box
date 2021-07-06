import React, { useState } from "react";
import "./inputform.scss";
import { useDispatch } from "react-redux";
import { newTask } from "../../../store/tasksSlice";

export function InputForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function onChange(event) {
    setText(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (text.trim().length > 0) {
      dispatch(newTask(text));
      setText("");
    }
  }

  return (
    <form className="input-form" onSubmit={onSubmit}>
      <input
        value={text}
        onChange={onChange}
        type="text"
        className="input-form__input"
        placeholder="Название задачи"
      />
      <button type="submit" className="input-form__btn btn-reset">
        Добавить
      </button>
    </form>
  );
}
