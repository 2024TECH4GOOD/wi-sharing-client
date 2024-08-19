"use client";

import React, { useState } from "react";
import { Home, Mentoring, Qna, Donation, My } from "./(section)";
import NavLayout from "./NavLayout";
import styles from "./main.module.css";

export default function Page() {
  const [selectedSection, setSelectedSection] = useState<React.ReactNode>(
    <Home />
  );

  return (
    <div className={styles.container}>
      <div className={styles.section}>{selectedSection}</div>
      <NavLayout onSelectSection={setSelectedSection} />
    </div>
  );
}
