import React, { useState } from "react";
import "./weeksdropdown.scss";

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

  return (
    <div className="weeks-dropdown">
      <div className="weeks-dropdown__header" onClick={toggling}>
        {selectedOption || options[0]}
      </div>
      {isOpen && (
        <div className="weeks-dropdown__list-container">
          <ul className="weeks-dropdown__list">
            {options.map(option => (
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