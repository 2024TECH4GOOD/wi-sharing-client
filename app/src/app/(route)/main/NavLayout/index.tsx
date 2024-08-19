"use client";

import React from "react";
import {
  FaHome,
  FaHandsHelping,
  FaQuestionCircle,
  FaUser,
  FaDonate,
} from "react-icons/fa";
import { Home, Mentoring, Qna, Donation, My } from "../(section)";
import styles from "./NavLayout.module.css";

interface NavProps {
  onSelectSection: (section: React.ReactNode) => void;
}

const NavConfig = [
  {
    icon: <FaHandsHelping />,
    title: "멘토링",
    section: <Mentoring />,
  },
  {
    icon: <FaQuestionCircle />,
    title: "QnA",
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

const NavLayout = ({ onSelectSection }: NavProps) => {
  return (
    <nav className={styles.nav}>
      {NavConfig.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelectSection(item.section)}
          className={styles.navItem}
        >
          <div>{item.icon}</div>
          <div>{item.title}</div>
        </div>
      ))}
    </nav>
  );
};

export default NavLayout;
