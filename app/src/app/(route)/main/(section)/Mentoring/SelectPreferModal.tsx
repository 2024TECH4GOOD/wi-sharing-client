"use client";

import React, { useState } from "react";
import Button from "@/app/_components/Button";
import ModalLayout from "@/app/_components/Modal/ModalLayout";
import useModal from "@/app/hooks/useModal";
import styles from "./SelectPreferModal.module.css"; 

export default function SelectPreferModal() {
  const { isOpen, onClose } = useModal();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonTitle: string) => {
    setSelectedButton(buttonTitle);
    // Example: fetch('/api/submit-preference', { method: 'POST', body: JSON.stringify({ preference: buttonTitle }) });
  };

  const handleConfirm = () => {
    if (selectedButton) {
      // Example: fetch('/api/submit-preference', { method: 'POST', body: JSON.stringify({ preference: selectedButton }) });

      onClose(); 
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
