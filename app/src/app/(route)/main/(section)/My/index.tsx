import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import MyPage from "./MyPage";

export default function My() {
  const router = useRouter();

  return (
    <>
      <TextBox title="마이페이지" desc="마이페이지 설명" />
      <div className={styles.content}>
        <MyPage />
      </div>
    </>
  );
}
