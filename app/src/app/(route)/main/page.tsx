"use client";

import React, { useState } from "react";
import { Home, Mentoring, Qna, Donation, My } from "./(section)";
import Nav from "./Nav";
import styles from "./main.module.css";

export default function Page() {
  const [selectedSection, setSelectedSection] = useState<React.ReactNode>(
    <Home />
  );

  return (
    <div className={styles.container}>
      <div className={styles.logo}><img src="/logo.png" /></div>
      <div className={styles.section}>{selectedSection}</div>
      <Nav onSelectSection={setSelectedSection} />
    </div>
  );
}
