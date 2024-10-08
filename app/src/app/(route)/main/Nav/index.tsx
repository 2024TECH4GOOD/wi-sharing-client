"use client";

import React, { useState } from "react";
import {
  FaHome,
  FaHandsHelping,
  FaQuestionCircle,
  FaUser,
  FaDonate,
} from "react-icons/fa";
import { Home, Mentoring, Qna, Donation, My } from "../(section)";
import styles from "./Nav.module.css";

interface NavProps {
  onSelectSection: (section: React.ReactNode) => void;
}

const NavConfig = [
  {
    icon: <FaHandsHelping />,
    title: "지혜 나누기",
    section: <Mentoring />,
  },
  {
    icon: <FaQuestionCircle />,
    title: "지식 더하기",
    section: <Qna />,
  },
  {
    icon: <FaHome />,
    title: "홈",
    section: <Home />,
  },
  {
    icon: <FaDonate />,
    title: "기부하기",
    section: <Donation />,
  },
  {
    icon: <FaUser />,
    title: "My",
    section: <My />,
  },
];

const Nav = ({ onSelectSection }: NavProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(2);

  const handleSelect = (index: number, section: React.ReactNode) => {
    setSelectedIndex(index);
    onSelectSection(section);
  };

  return (
    <nav className={styles.nav}>
      {NavConfig.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelect(index, item.section)}
          className={`${styles.navItem} ${
            selectedIndex === index ? styles.selected : ""
          }`}
        >
          <div className={styles.icon}>{item.icon}</div>
          <div className={styles.title}>{item.title}</div>
        </div>
      ))}
    </nav>
  );
};

export default Nav;
