"use client";

import React, { useState } from "react";
import styles from "./feedback.module.css";
import FeedbackPage from "./Feedbackpage";
import Nav from "../main/Nav";
import { Mentoring } from "../main/(section)";

export default function Page() {
  const [selectedSection, setSelectedSection] = useState<React.ReactNode>(
    <Mentoring />
  );

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.png" />
      </div>
      <div className={styles.section}>
        <FeedbackPage />
      </div>
    </div>
  );
}
