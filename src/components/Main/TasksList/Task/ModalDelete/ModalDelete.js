import React from "react";
import ReactDOM from "react-dom";
import "./modaldelete.scss";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../../../store/tasksSlice";
import { setStop } from "../../../../../store/timeSlice";

export function ModalDelete({ isModalOpen, setIsModalOpen, id }) {
  const dispatch = useDispatch();

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleDelete() {
    dispatch(deleteTask(id));
    dispatch(setStop());
  }

  const node = document.querySelector("#modal_root");

  return ReactDOM.createPortal(
    isModalOpen && (
      <div className="modal">
        <div className="modal__container">
          <span className="modal__title">Удалить задачу?</span>
          <button className="btn-reset modal__confirm" onClick={handleDelete}>
            Удалить
          </button>
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
