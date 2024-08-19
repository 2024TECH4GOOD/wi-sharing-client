import React from "react";
import styles from "./TextBox.module.css";

interface TextBoxProps {
  title: string;
  desc: string;
}

const TextBox = ({ title, desc }: TextBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};

export default TextBox;
