import React, { useState } from "react";
import styles from "./ListBox.module.css";
import { FaStar } from "react-icons/fa";

interface ListBoxProps {
  icon?: React.ReactNode;
  title: string;
  caption: string;
  desc: string;
  onClick: () => void;
  isSelected?: boolean;
  answerType?: "ai" | "user";
}

const ListBox = ({
  icon,
  title,
  caption,
  desc,
  onClick,
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
      <div className={styles.top}>
        <div className={styles.icon}>{icon || <FaStar />}</div>
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
