import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React, { useState } from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import MyPage from "./MyPage";

export default function My() {
  const router = useRouter();

  return (
    <>
      <TextBox title="마이페이지" desc="" />
      <div className={styles.content}>
        <MyPage />
      </div>
    </>
  );
}
