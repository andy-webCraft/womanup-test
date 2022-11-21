import React, { useState, useEffect } from "react";
import { collection, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useFirestoreCollectionData, useFirestore } from "reactfire";

import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

import "./TodoList.less";

/** @module TodoList */

/**
 * Основной компонент списка задач.
 * Реализует функционал отображения, добавления, редактирования и удаления задач.
 */
const TodoList = () => {
  let [todoList, setTodoList] = useState([]);
  let [editMode, setEditMode] = useState(false);
  let [editingIndex, setEditingIndex] = useState(null);

  /** Инициализация хранилища firebase */
  const storage = getStorage();

  /** Ссылка на список задач */
  const todosRef = collection(useFirestore(), "todos");

  /** Запрос на получения списка задач */
  const { status, data } = useFirestoreCollectionData(todosRef, { idField: "id" });

  /** Установка списка задач */
  useEffect(() => {
    if (!data) return;

    setTodoList(data);
  }, [data]);

  /**
   * Обработчик переключения режима редактирования
   * @param {number} index - Индекс редактируемой задачи
   */
  const handleEditModeToggle = (index) => {
    setEditingIndex(index);
    setEditMode((prev) => !prev);
  };

  /**
   * Обработчик добавления новой задачи
   * @param {Object} formData - Объект данных новой задачи
   */
  const handleAddTodo = async (formData) => {
    await setDoc(doc(todosRef), { ...formData, attachedFiles: [] });
  };

  /**
   * Обработчик обновления задачи
   * @param {Object} formData - Объект данных редактируемой задачи
   */
  const handleUpdateTodo = async (formData) => {
    if (editingIndex === null) return;

    handleEditModeToggle(null);
    await updateDoc(doc(todosRef, todoList[editingIndex].id), formData);
  };

  /**
   * Обработчик удаления задачи \
   * После удаления задачи удаляет все прикреплённые к ней файлы
   * @param {number} index - Индекс удаляемой задачи
   * @param {string} id - Идентификатор удаляемой задачи
   */
  const handlerDeleteTodo = async (index, id) => {
    await deleteDoc(doc(todosRef, id)).then(() => {
      todoList[index].attachedFiles.map(async (item) => {
        await deleteObject(ref(storage, item));
      });
    });
  };

  if (status === "loading") return <Loader />;

  return (
    <div className="todoList">
      <div className="todoList__addTodo">
        <h2>Add todo</h2>
        <TodoForm submitCallback={handleAddTodo} />
      </div>

      <ul className="todoList__list">
        {todoList.map((item, index) => (
          <Todo
            key={item.id}
            index={index}
            todo={item}
            editModeCallback={handleEditModeToggle}
            deleteCallback={handlerDeleteTodo}
          />
        ))}

        {!todoList.length && (
          <p className="todoList__notification">
            there are no active tasks, add new tasks and get to work
          </p>
        )}
      </ul>

      {editMode && (
        <Modal>
          <TodoForm
            editingTodo={editingIndex !== null ? todoList[editingIndex] : undefined}
            submitCallback={handleUpdateTodo}
          />
        </Modal>
      )}
    </div>
  );
};

export default TodoList;
