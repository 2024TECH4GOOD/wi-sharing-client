"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import Button from "@/app/_components/Button";
import SelectPreferModal from "./SelectPreferModal";
import useModal from "@/app/hooks/useModal";
import styles from "../../main.module.css";

export default function MentorMentoring() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);

  const MenteeData = [
    {
      name: "정다연",
      caption: "직업&관심사 기반 76% 유사도",
      desc: "안녕하세요 멘토님! 멘토링 희망해 연락드립니다!",
    },
    {
      name: "이승협",
      caption: "취미&성격 기반 85% 유사도",
      desc: "안녕하세요 ~ 잘 부탁드립니다",
    },
    {
      name: "최지안",
      caption: "직업&관심사 기반 68% 유사도",
      desc: "안녕하세요 멘토님! 저는 최지안이라고 합니다",
    },
  ];

  const { modalOpen } = useModal();

  useEffect(() => {
    modalOpen();
  }, [modalOpen]);


  return (
    <>
      {step === 0 && (
        <>
          <TextBox
            title="지혜 나누기"
            desc="AI기반 매칭 시스템을 통해 매칭 된 나만의 멘티를 만나보세요"
          />
          <div className={styles.content}>
            <div className={styles.listContainer}>
              {MenteeData.map((item, index) => (
                <ListBox
                  key={index}
                  title={item.name}
                  desc={item.desc}
                  caption={item.caption}
                  similarity={"채팅하기"}
                  onClick={() => router.push("/chat")}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
