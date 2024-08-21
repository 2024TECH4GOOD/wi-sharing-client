import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  variant: "dark" | "bright";
}

const Button = ({ title, onClick, variant }: ButtonProps) => {
  const buttonClass =
    variant === "dark" ? styles.darkButton : styles.brightButton;

  return (
    <div className={buttonClass} onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;
