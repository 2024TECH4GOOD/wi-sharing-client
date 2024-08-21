"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/_components/Button";
import ModalLayout from "@/app/_components/Modal/ModalLayout";
import useModal from "@/app/hooks/useModal";
import styles from "./SelectPreferModal.module.css"; 
import { useRouter } from "next/navigation";

interface SelectPreferModalProps {
  onMentorData: (data: any[]) => void;
}

export default function SelectPreferModal({ onMentorData }: SelectPreferModalProps) {
  const { isOpen, onClose } = useModal();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleButtonClick = (buttonTitle: string) => {
    setSelectedButton(buttonTitle);
  };

  const handleConfirm = async () => {
    if (selectedButton) {
      try {
        const concept = selectedButton === "직업&관심사 기반" ? 1 : 2;

        const response = await fetch(`https://wi-sharing.com/api/match?concept=${concept}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Accept": "*/*"
          }
        });

        if (response.ok) {
          const data = await response.json();
          onMentorData(data);
          console.log("Mentor data:", data);
        } else {
          console.error("Failed to fetch mentor data");
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        onClose();
      }
    } else {
      alert("Please select a preference.");
    }
  };

  return (
    <>
      {role ? (
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
      ) : (
        <ModalLayout
          open={isOpen}
          onConfirm={() => router.push("/login")}
          closeOnOutsideClick={false}
          show={true}
          title={"로그인하기"}
        >
           <img src="/logo.png" />
            <p
              className={styles.caption}
              onClick={() => router.push("/onboarding")}
            >
              위쉐어링이 궁금하다면? 회원가입하기
            </p>
       
        </ModalLayout>
      )}
    </>
  );
}
