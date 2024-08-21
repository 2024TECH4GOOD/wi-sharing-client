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
      <p>안녕하세요</p>
      <Button 
        title={"가중치 A"} 
        variant={selectedButton === "가중치 A" ? "light" : "bright"} 
        onClick={() => handleButtonClick("가중치 A")} 
      />
      <Button 
        title={"가중치 B"} 
        variant={selectedButton === "가중치 B" ? "light" : "bright"} 
        onClick={() => handleButtonClick("가중치 B")} 
      />
      <Button 
        title={"가중치 C"} 
        variant={selectedButton === "가중치 C" ? "light" : "bright"} 
        onClick={() => handleButtonClick("가중치 C")} 
      />
      </div>
    </ModalLayout>
  );
}
