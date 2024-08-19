"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./splash.module.css";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import TextBox from "@/app/_components/TextBox";
import Button from "@/app/_components/Button";

export default function Page() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const slides = [
    {
      img: "/assets/splash1.png",
      title: "소개 글1",
      desc: "소개 설명 글 1",
      buttonText: "다음",
      onClick: () => setStep(1),
    },
    {
      img: "/assets/splash2.png",
      title: "소개 글2",
      desc: "소개 설명 글 2",
      buttonText: "다음",
      onClick: () => setStep(2),
    },
    {
      img: "/assets/splash3.png",
      title: "소개 글3",
      desc: "소개 설명 글 3",
      buttonText: "로그인 하기",
      onClick: () => router.push("/login"),
    },
  ];

  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        activeIndex={step}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.box}>
              <img src={slide.img} alt={`Slide ${index + 1}`} />
            </div>
            <div className={styles.util}>
              <TextBox title={slide.title} desc={slide.desc} />
              <Button title={slide.buttonText} onClick={slide.onClick} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
