import React, { useEffect } from "react";

import "./Modal.less";

/** @module Modal */

/**
 * Компонент модальнго окна.
 * При монтировании блокирует прокрутку документа,
 * при размонтировании снимает блокировку.
 * @param {any} children - Оборачиваемые дочерние элементы
 */
const Modal = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("_lock");

    return () => {
      document.body.classList.remove("_lock");
    };
  }, []);

  return (
    <div className="modal__layout">
      <div className="modal__body">{children}</div>
    </div>
  );
};

export default Modal;
