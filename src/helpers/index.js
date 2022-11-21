import dayjs from "dayjs";

/**
 * Функция проверки истечения срока выполнения задачи
 * @param {string} completeDate - Строка даты срока выполнения
 * @returns {boolean} Логическое значение результата проверки
 */
export const checkExpiredTodo = (completeDate) => {
  const now = dayjs();
  const deadline = dayjs(completeDate);

  return now > deadline ? true : false;
};
