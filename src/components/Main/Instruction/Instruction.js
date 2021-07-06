import React from "react";
import "./instruction.scss";

export function Instruction() {
  return (
    <article className="instruction">
      <p className="instruction__title">Ура! Теперь можно начать работать:</p>
      <ul className="instruction__list">
        <li className="instruction__item">
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className="instruction__item">
          Запустите таймер (&#171;помидор&#187;)
        </li>
        <li className="instruction__item">
          Работайте пока &#171;помидор&#187; не позвонит
        </li>
        <li className="instruction__item">
          Сделайте короткий перерыв (3-5 минут)
        </li>
        <li className="instruction__item">
          Продолжайте работать &#171;помидор&#187; за &#171;помидором&#187;,
          пока задача не будет выполнена. Каждые 4 &#171;помидора&#187; делайте
          длинный перерыв (15-30 минут).
        </li>
      </ul>
    </article>
  );
}
