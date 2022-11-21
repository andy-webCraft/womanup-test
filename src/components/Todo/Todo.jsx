import React, { useState, useEffect } from "react";

import AttachedFilesList from "../AttachedFilesList/AttachedFilesList";

import { checkExpiredTodo } from "../../helpers";
import "./Todo.less";

/** @module Todo */

/**
 * @callback editModeCallback
 * @param {number} index - Индекс редактируемой задачи
 */

/**
 * @callback deleteCallback
 * @param {number} index - Индекс удаляемой задачи
 * @param {string} id - Идентификатор удаляемой задачи
 */

/**
 * Компонент задачи.
 * Отображает задачу и реализует взаимодействие с ней.
 * Также содержит в себе список прикреплённых файлов.
 * @param {number} index - Индекс текущей задачи
 * @param {Object} todo - Объект задачи
 * @param {editModeCallback} editModeCallback - Функция обратного вызова редактирования заметки
 * @param {deleteCallback} deleteCallback - Функция обратного вызова удаления заметки
 */
const Todo = ({ index, todo, editModeCallback, deleteCallback }) => {
  let [completed, setCompleted] = useState(false);
  let [expired, setExpired] = useState(false);

  const { id, title, description, completeDate, attachedFiles } = todo;

  useEffect(() => {
    /** Проверка истечения срока выполнения задачи */
    const resultCheck = checkExpiredTodo(completeDate);
    setExpired(resultCheck);
  }, [todo.completeDate]);

  /** Конструктор классов стилей задачи */
  const todoClassNames = () => {
    let classes = "todo";
    completed && (classes += " completed");
    return classes;
  };

  /** Обработчик переключения статуса задачи */
  const handleCompletedToggle = () => {
    setCompleted((prev) => !prev);
  };

  /** Обработчик включения редактирования задачи */
  const handleEditMode = () => {
    editModeCallback(index);
  };

  /** Обработчик удаления задачи */
  const handleDelete = () => {
    deleteCallback(index, id);
  };

  return (
    <li className={todoClassNames()}>
      <div className="todo__top">
        <div className="todo__checkbox">
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={handleCompletedToggle}
          />
        </div>

        <div className="todo__info">
          <h3 className="todo__title">Title: {title}</h3>
          <p className="todo__description">Description: {description}</p>
          <span className="todo__deadline">Deadline: {completeDate}</span>

          {expired && <span className="todo__notification">⇦ ⇦ ⇦ expired!</span>}
        </div>

        <div className="todo__btnGroup">
          <button className="todo__btn _btn" onClick={handleEditMode}>
            edit
          </button>

          <button className="todo__btn _btn" onClick={handleDelete}>
            delete
          </button>
        </div>
      </div>

      <div className="todo__bottom">
        <h4>Attached Files:</h4>
        <AttachedFilesList todoId={id} attachedFiles={attachedFiles} />
      </div>
    </li>
  );
};

export default Todo;
