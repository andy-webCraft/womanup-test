import React from "react";
import { useFirestore, useStorage } from "reactfire";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import "./AttachedFilesList.less";

/** @module AttachedFilesList */

/** 
 * Компонент списка прикреплённых файлов. 
 * Отображает список файлов и реализует функционал добавления нового файла к задаче.
 * @param {string} todoId - Идентификатор текущей задачи
 * @param {Array<string>} attachedFiles - Список прикреплённых файлов
  */
const AttachedFilesList = ({ todoId, attachedFiles }) => {
  /** Ссылка на хранилище файлов */
  const storageRef = ref(useStorage());

  /** Ссылка на текущую задачу */
  const currentTodoRef = doc(useFirestore(), "todos", todoId);

  /** 
   * Обработчик загрузки прикреплённого файла.
   * После загрузки добавляет имя прикреплённого файла в список к текущей задачи
   * @param e - Объект события
   */
  const handleUploadFile = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const fileRef = ref(storageRef, file.name);

    await uploadBytes(fileRef, file).then(() => {
      updateDoc(currentTodoRef, { attachedFiles: [...attachedFiles, file.name] });
    });
  };

  return (
    <ul className="attachedFiles">
      {attachedFiles.map((item) => (
        <li key={item}>{item}</li>
      ))}

      <form className="attachedFiles__addFile">
        <label className="_btn">
          <input type="file" name="upload-file" onChange={handleUploadFile} />+ attach
          file
        </label>
      </form>
    </ul>
  );
};

export default AttachedFilesList;
