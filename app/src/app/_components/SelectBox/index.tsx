import React from "react";
import styles from "../InputBox/InputBox.module.css";

interface SelectBoxProps {
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({
  title,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>{title}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      >
        <option value="" disabled>
          선택하세요
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
