import React, { useState } from "react";
import styles from "./ListBox.module.css";
import { FaStar } from "react-icons/fa";

interface ListBoxProps {
  icon?: React.ReactNode;
  title: string;
  caption: string;
  desc: string;
  onClick: () => void;
  isSelected: boolean;
}

const ListBox = ({
  icon,
  title,
  caption,
  desc,
  onClick,
  isSelected,
}: ListBoxProps) => {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.top}>
        <div className={styles.icon}>
          <FaStar />
        </div>
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
