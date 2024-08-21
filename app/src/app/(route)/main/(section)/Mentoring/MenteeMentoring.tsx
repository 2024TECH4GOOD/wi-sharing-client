"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import Button from "@/app/_components/Button";
import SelectPreferModal from "./SelectPreferModal";
import useModal from "@/app/hooks/useModal";
import styles from "../../main.module.css";

export default function MenteeMentoring() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [mentorData, setMentorData] = useState<any[]>([]); 
  const [selectedMentor, setSelectedMentor] = useState<{
    name: string;
    career: string;
    similarity: string;
    personality: string;
  } | null>(null);

  const { modalOpen } = useModal();

  useEffect(() => {
    modalOpen();
  }, [modalOpen]);

  // SelectPreferModal에서 받아온 데이터를 mentorData에 저장
  const handleMentorData = (data: any[]) => {
    setMentorData(data);
  };

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
              {mentorData.map((item, index) => (
                <ListBox
                  key={index}
                  title={item.name}
                  desc={item.personality}
                  caption={item.career}
                  similarity={"유사도 "+item.similaritySum}
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
              <p className={styles.listBoxCaption}>{selectedMentor.career}</p>
              <div className={styles.listBoxDesc}>{selectedMentor.personality}</div>
              
            </div>
          </div>
          <Button
            title="멘토에게 연락하기"
            variant="dark"
            onClick={() => router.push("/chat")}
          />
        </>
      )}
      <SelectPreferModal onMentorData={handleMentorData} />
    </>
  );
}
