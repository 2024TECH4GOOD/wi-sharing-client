import React, { useState } from "react";
import styles from "./SelectableButton.module.css";

interface SelectableButtonProps {
  title: string;
  onSelect: (value: string) => void;
  isSelected: boolean;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({ title, onSelect, isSelected }) => {
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(title)}
    >
      {title}
    </button>
  );
};

export default SelectableButton;
