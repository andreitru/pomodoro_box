import React, { useEffect, useState } from "react";
import "./task.scss";
import TaskMenu from "./TaskMenu/TaskMenu";
import { editTask } from "../../../../store/tasksSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

function Task({ title, count, id }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleFocus() {
    setValue(title);
  }

  function handleBlur(e) {
    dispatch(editTask({ id: id, title: e.target.value }));
    setIsEdit(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      dispatch(editTask({ id: id, title: e.target.value }));
      setIsEdit(false);
    }
  }

  function handleOpen() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    const listener = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    if (isDropdownOpen) {
      document.body.addEventListener("click", listener);
    }
    return () => document.body.removeEventListener("click", listener);
  }, [isDropdownOpen]);

  return (
    <li className="task">
      <span className="task__count">{count}</span>
      {isEdit ? (
        <input
          className="task__title task__title--input"
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmit={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <p className="task__title">{title}</p>
      )}
      <button className="task__btn btn-reset" onClick={handleOpen} />
      <TaskMenu
        open={isDropdownOpen}
        id={id}
        count={count}
        setIsEdit={setIsEdit}
      />
    </li>
  );
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Task;
