import React, { useState } from "react";
import "./weeksdropdown.scss";
import classNames from "classnames";

const options = ["Эта неделя", "Прошлая неделя", "2 недели назад"]

export function WeeksDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function toggling() {
    setIsOpen(!isOpen);
  }

  function onOptionClicked(value) {
    setSelectedOption(value);
    setIsOpen(false);
  }

  const dropdownClassNames = classNames({
    "weeks-dropdown__header": true,
    "weeks-dropdown__header--opened": isOpen,
  })

  return (
    <div className="weeks-dropdown">
      <div className={dropdownClassNames} onClick={toggling}>
        {selectedOption || options[0]}
      </div>
      {isOpen && (
        <div className="weeks-dropdown__list-container">
          <ul className="weeks-dropdown__list">
            {options.filter(option =>
              selectedOption ? option !== selectedOption :
                option !== options[0])
              .map(option => (
                <li
                  className="weeks-dropdown__item"
                  onClick={() => onOptionClicked(option)}
                  key={Math.random()}
                >
                  {option}
                </li>
              ))}
          </ul>
        </div>

      )}
    </div>
  );
}