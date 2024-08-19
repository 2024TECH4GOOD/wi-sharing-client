import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;
