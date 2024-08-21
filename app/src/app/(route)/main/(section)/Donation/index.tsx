import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React, { useState } from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import DonationPage from "./DonationPage";

export default function Donation() {
  const router = useRouter();

  return (
    <>
      <TextBox
        title="기부하기"
        desc="자립 준비 청년의 새로운 도약을 응원해주세요"
      />
      <div className={styles.content}>
        <DonationPage />
      </div>
      <Button title="기부하기" variant="dark" onClick={() => {}} />
    </>
  );
}
