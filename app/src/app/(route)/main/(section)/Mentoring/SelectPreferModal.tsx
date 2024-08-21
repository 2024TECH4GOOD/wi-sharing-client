"use client";

import React, { useState } from "react";
import Button from "@/app/_components/Button";
import ModalLayout from "@/app/_components/Modal/ModalLayout";
import useModal from "@/app/hooks/useModal";
import styles from "./SelectPreferModal.module.css"; 

interface SelectPreferModalProps {
  onMentorData: (data: any[]) => void; // 멘토 데이터를 상위 컴포넌트로 전달할 함수
}

export default function SelectPreferModal({ onMentorData }: SelectPreferModalProps) {
  const { isOpen, onClose } = useModal();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonTitle: string) => {
    setSelectedButton(buttonTitle);
  };

  const handleConfirm = async () => {
    if (selectedButton) {
      try {
        // concept 값 설정
        const concept = selectedButton === "직업&관심사 기반" ? 1 : 2;

        // API 호출
        const response = await fetch(`http://localhost:9475/api/match?concept=${concept}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`, // 실제 토큰으로 변경 필요
            "Accept": "*/*"
          }
        });

        if (response.ok) {
          const data = await response.json();
          onMentorData(data); // API로부터 받은 데이터를 상위 컴포넌트로 전달
          console.log("Mentor data:", data);
        } else {
          console.error("Failed to fetch mentor data");
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        onClose(); // 모달 닫기
      }
    } else {
      alert("Please select a preference.");
    }
  };

  return (
    <ModalLayout
      open={isOpen}
      onConfirm={handleConfirm} 
      closeOnOutsideClick={false} 
      show={true}
    >
      <div className={styles.container}>
        <h2>👨🏻‍🏫 멘토 추천 받기</h2>
        <Button 
          title={"직업&관심사 기반"} 
          variant={selectedButton === "직업&관심사 기반" ? "light" : "bright"} 
          onClick={() => handleButtonClick("직업&관심사 기반")} 
        />
        <Button 
          title={"취미&성격 기반"} 
          variant={selectedButton === "취미&성격 기반" ? "light" : "bright"} 
          onClick={() => handleButtonClick("취미&성격 기반")} 
        />
      </div>
    </ModalLayout>
  );
}
