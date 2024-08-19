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
      title: "반쪽 자립",
      desc: '"저는 사회에 나올 준비가 되어 있지 않았어요. 갑작스럽게 모든 지원이 끊기고, 홀로서기를 해야 한다는 부담감에 짓눌렸습니다." 많은 청년들이 기본적인 경제적 지원을 받지만, 이 지원은 그들의 자립을 충분히 보장해 주지 못합니다. 현재의 정책은 주거와 생활비에 대한 최소한의 지원을 제공하지만, 그 이상의 정서적, 사회적 지원은 부족한 실정입니다. ',
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
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.box}>
              <img src={slide.img} alt={`Slide ${index + 1}`} />
            </div>
            <div className={styles.util}>
              <TextBox title={slide.title} desc={slide.desc} />
              <Button title={slide.buttonText} onClick={slide.onClick} variant="dark"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
