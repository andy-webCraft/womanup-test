import React, { useState, useEffect } from "react";

import "./TodoForm.less";

/** @module TodoForm */

/**
 * @callback submitCallback
 * @param {Object} formData - Объект данных задачи
 */

/**
 * Компонент формы задачи.
 * В зависомости от того, передан ли параметр `editingTodo`
 * может реализовывать добавление новой задачи, либо редактирование уже созданной задачи.
 * @param {Object} editingTodo - Объект редактируемой задачи
 * @param {submitCallback} submitCallback - Функция обратного вызова отправки формы
  */
const TodoForm = ({ editingTodo, submitCallback }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [completeDate, setCompleteDate] = useState("");

  /** Установка изначальных значений, если они переданы */
  useEffect(() => {
    if (!editingTodo) return;

    const { title, description, completeDate } = editingTodo;
    setTitle(title);
    setDescription(description);
    setCompleteDate(completeDate);
  }, []);

  /** 
   * Обработчик изменения значения заголовка
   * @param {React.ChangeEvent<HTMLInputElement>} e - Объект события
  */
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  /** 
   * Обработчик изменения значения описания
   * @param {React.ChangeEvent<HTMLInputElement>} e - Объект события
  */
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  /**
   *  Обработчик изменения значения даты завершения
   * @param {React.ChangeEvent<HTMLInputElement>} e - Объект события
  */
  const handleChangeCompleteDate = (e) => {
    setCompleteDate(e.target.value);
  };

  /**
   *  Обработчик отправки формы
   * @param {React.FormEvent<HTMLFormElement>} e - Объект события
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title || description) {
      const formData = {
        title,
        description,
        completeDate,
      };

      submitCallback(formData);

      setTitle("");
      setDescription("");
      setCompleteDate("");
    }
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <div className="todoForm__field">
        <label>Title:</label>
        <input
          className="_input"
          type="text"
          name="todo-title"
          value={title}
          onChange={handleChangeTitle}
          placeholder="enter todo title..."
        />
      </div>

      <div className="todoForm__field">
        <label>Description:</label>
        <input
          className="_input"
          type="text"
          name="todo-description"
          value={description}
          onChange={handleChangeDescription}
          placeholder="enter todo description..."
        />
      </div>

      <div className="todoForm__field">
        <label>Complete Date:</label>
        <input
          className="_input"
          type="date"
          name="todo-complete-date"
          value={completeDate}
          onChange={handleChangeCompleteDate}
        />
      </div>

      <button className="todoForm__btn _btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default TodoForm;
