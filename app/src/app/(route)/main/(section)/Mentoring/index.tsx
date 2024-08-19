import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React, { useState } from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";

const MentorData = [
  {
    name: '멘토1',
    caption: "금융 전문가",
    desc: "한줄 소개 한줄 소개 한줄 소개",
  },
  {
    name: '멘토2',
    caption: "금융 전문가",
    desc: "한줄 소개 한줄 소개 한줄 소개",
  },
  {
    name: '멘토3',
    caption: "금융 전문가",
    desc: "한줄 소개 한줄 소개 한줄 소개",
  },
];

export default function Mentoring() {
  const router = useRouter();

  return (
    <>
      <TextBox title="멘토링" desc="Mentoring 설명" />
        <div className={styles.content}>
          <div className={styles.listContainer}>
            {MentorData.map((item, index) => (
              <ListBox
                key={index}
                title={item.name}
                desc={item.desc}
                caption={item.caption}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      <Button title="멘토 선택 완료" variant="dark" onClick={() => {}} />
    </>
  );
}
