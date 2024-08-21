"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import Button from "@/app/_components/Button";
import SelectPreferModal from "./SelectPreferModal";
import useModal from "@/app/hooks/useModal";
import styles from "../../main.module.css";

const MentorData = [
  {
    name: "멘토1",
    caption: "금융 전문가",
    desc: "한줄 소개 한줄 소개 한줄 소개",
  },
  {
    name: "멘토2",
    caption: "금융 전문가",
    desc: "한줄 소개 한줄 소개 한줄 소개",
  },
  {
    name: "멘토3",
    caption: "금융 전문가",
    desc: "한줄 소개 한줄 소개 한줄 소개",
  },
];

export default function MenteeMentoring() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [selectedMentor, setSelectedMentor] = useState<{
    name: string;
    caption: string;
    desc: string;
  } | null>(null);

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
            desc="AI기반 매칭 시스템을 통한 나만의 멘토를 만나보세요"
          />
          <div className={styles.content}>
            <div className={styles.listContainer}>
              {MentorData.map((item, index) => (
                <ListBox
                  key={index}
                  title={item.name}
                  desc={item.desc}
                  caption={item.caption}
                  onClick={() => setSelectedMentor(item)}
                  isSelected={selectedMentor?.name === item.name}
                />
              ))}
            </div>
          </div>
          <Button
            title="멘토 선택 완료"
            variant="dark"
            onClick={() =>
              selectedMentor ? setStep(1) : alert("멘토를 선택해주세요.")
            }
          />
        </>
      )}
      {step === 1 && selectedMentor && (
        <>
          <TextBox
            title="나만의 멘토 선정 완료"
            desc="매칭된 멘토에게 위쉐어링의 가이드를 따라 연락해보세요  😄"
          />
          <div className={styles.content}>
            <div className={`${styles.listBox} ${styles.bounceIn}`}>
              <img src="/assets/senior.png" alt="Senior" />
              <div className={styles.listBoxTitle}>{selectedMentor.name}</div>
              <div className={styles.listBoxDesc}>{selectedMentor.desc}</div>
              <p className={styles.listBoxCaption}>{selectedMentor.caption}</p>
            </div>
          </div>
          <Button
            title="멘토에게 연락하기"
            variant="dark"
            onClick={() => router.push("/chat")}
          />
        </>
      )}
      <SelectPreferModal />
    </>
  );
}
