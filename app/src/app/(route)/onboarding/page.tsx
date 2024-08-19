'use client';

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./onboarding.module.css";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MatchingComponent from "./(section)/MatchingComponent";
import RoleComponent from "./(section)/RoleComponent";
import SignUpFormComponent from "./(section)/SignUpFormComponent";
import { Pagination } from "swiper/modules";
import TextBox from "@/app/_components/TextBox";
import Button from "@/app/_components/Button";

export interface YouthDto {
  userInfo: {
    id: string;
    password: string;
    name: string;
    sex: string;
    age: number;
    birth: string;
    phoneNumber: string;
    profileUrl: string;
    city: string;
    district: string;
    personality: string;
    interest: string;
    role: "Youth";
  };
  youthInfo: {
    careerPath: string;
    desiredConsultation: string;
    city: string;
    district: string;
  };
}

export interface SeniorDto {
  userInfo: {
    id: string;
    password: string;
    name: string;
    sex: string;
    age: number;
    birth: string;
    phoneNumber: string;
    profileUrl: string;
    city: string;
    district: string;
    personality: string;
    interest: string;
    role: "Senior";
  };
  seniorInfo: {
    career: string;
    criminalRecordCheck: string;
    educationalCertificate: string;
  };
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"Youth" | "Senior" | null>(null);
  const [youthformData, setYouthformData] = useState<YouthDto>();
  const [seniorformData, setSeniorformData] = useState<SeniorDto>();
  const router = useRouter();

  const handleRoleSelection = (selectedRole: "Youth" | "Senior") => {
    setRole(selectedRole);
    setStep(1);
  };

  const handleFormSubmit = () => {
    setStep(2);
  };

  const handleMatchingComplete = () => {
    router.push("/home");
  };

  const slides = [
    {
      title: "나는 누구에요",
      desc: '나는 누구에요 나는 누구에요 나는 누구에요',
      buttonText: "다음",
      content: <RoleComponent setRole={handleRoleSelection} />,
    },
    {
      title: "정보 입력하기",
      desc: "정보 입력하기 정보 입력하기",
      buttonText: "다음",
      content: (
        <SignUpFormComponent
          role={role}
          setYouthformData={setYouthformData}
          setSeniorformData={setSeniorformData}
          onSubmit={handleFormSubmit}
        />
      ),
    },
    {
      title: "매칭 시스템을 위한 설문조사",
      desc: "매칭 시스템을 위한 설문조사 설문조사",
      buttonText: "완료하기",
      content: (
        <MatchingComponent
          role={role}
          setYouthformData={setYouthformData}
          setSeniorformData={setSeniorformData}
          onComplete={handleMatchingComplete}
        />
      ),
    },
  ];

  return (
    <Swiper
      className="mySwiper"
      pagination={{ type: "progressbar" }}
      modules={[Pagination]}
      initialSlide={step}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className={styles.util}>
            <TextBox title={slide.title} desc={slide.desc} />
            {slide.content}
            <Button 
              title={slide.buttonText} 
              onClick={slide.buttonText === "다음" ? (step === 0 ? () => handleRoleSelection(role!) : handleFormSubmit) : handleMatchingComplete} 
              variant="dark" 
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
