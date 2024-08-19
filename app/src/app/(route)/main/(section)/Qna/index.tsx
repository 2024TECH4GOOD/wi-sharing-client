import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React, { useState } from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";

const MentorData = [
  {
    name: '질문 제목1',
    caption: "금융",
    desc: "질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 ",
  },
  {
    name: '질문 제목2',
    caption: "부동산",
    desc: "질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 ",
  },
  {
    name: '질문 제목3',
    caption: "주거",
    desc: "질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 ",
  },
  {
    name: '질문 제목4',
    caption: "진로",
    desc: "질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 ",
  },
  {
    name: '질문 제목5',
    caption: "주거",
    desc: "질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 ",
  },
  {
    name: '질문 제목6',
    caption: "진로",
    desc: "질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 질문 내용 ",
  }
];

export default function QnA() {
  const router = useRouter();

  return (
    <>
      <TextBox title="QnA" desc="QnA 설명" />
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
      <Button title="질문 하기" variant="dark" onClick={() => router.push('/question')} />
    </>
  );
}
