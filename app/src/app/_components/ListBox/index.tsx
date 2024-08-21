import React, { useState } from "react";
import styles from "./ListBox.module.css";
import { FaStar } from "react-icons/fa";

interface ListBoxProps {
  icon?: React.ReactNode;
  title?: string;
  caption?: string;
  desc?: string;
  onClick?: () => void;
  isSelected?: boolean;
  answerType?: "ai" | "user";
  category?: string;
}

const ListBox = ({
  icon,
  title,
  caption,
  desc,
  onClick,
  category,
  isSelected = false,
  answerType,
}: ListBoxProps) => {
  const boxClass =
    answerType === "ai"
      ? styles.aiAnswer
      : answerType === "user"
      ? styles.userAnswer
      : "";

  return (
    <div
      className={`${styles.container} ${
        isSelected ? styles.selected : ""
      } ${boxClass}`}
      onClick={onClick}
    >
      {category && (
        <div className={styles.hash}>
          {category === "FINANCE" && <span>💰 </span>}
          {category}
        </div>
      )}
      <div className={styles.top}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.caption}>{caption}</div>
        </div>
      </div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};

export default ListBox;
