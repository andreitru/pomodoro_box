import React, { useState } from "react";
import "./taskmenu.scss";
import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount } from "../../../../../store/tasksSlice";
import { ModalDelete } from "../ModalDelete";
import classNames from "classnames";
import PropTypes from "prop-types";

function TaskMenu({ open, id, count, setIsEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  function handleIncreaseCount() {
    dispatch(increaseCount(id));
  }

  function handleDecreaseCount() {
    dispatch(decreaseCount(id));
  }

  function handleSetIsEdit() {
    setIsEdit(true);
  }

  function handleSetIsModalOpen() {
    setIsModalOpen(!isModalOpen);
  }

  const taskMenuClassNames = classNames({
    "task-menu": true,
    "task-menu--open": open,
  });

  return (
    <ul className={taskMenuClassNames}>
      <li>
        <button
          className="btn-reset task-menu__item task-menu__item--plus"
          onClick={handleIncreaseCount}
        >
          Увеличить
        </button>
      </li>
      <li>
        <button
          className="btn-reset task-menu__item task-menu__item--minus"
          onClick={handleDecreaseCount}
          disabled={count === 1}
        >
          Уменьшить
        </button>
      </li>
      <li>
        <button
          className="btn-reset task-menu__item task-menu__item--edit"
          onClick={handleSetIsEdit}
        >
          Редактировать
        </button>
      </li>
      <li>
        <button
          className="btn-reset task-menu__item task-menu__item--delete"
          onClick={handleSetIsModalOpen}
        >
          Удалить
        </button>
      </li>
      <ModalDelete
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        id={id}
      />
    </ul>
  );
}

TaskMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};

export default TaskMenu;
