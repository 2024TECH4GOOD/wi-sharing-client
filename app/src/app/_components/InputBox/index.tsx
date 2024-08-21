import React from "react";
import styles from "./InputBox.module.css";

interface InputBoxProps {
  title: string;
  placeholder: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  title,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>{title}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default InputBox;
