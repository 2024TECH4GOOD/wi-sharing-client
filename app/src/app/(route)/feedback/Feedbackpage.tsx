"use client";

import React, { useState } from "react";
import styles from "./feedback.module.css";
import SelectableButton from "@/app/_components/SelectableButton";
import { FaStar } from "react-icons/fa";
import Button from "@/app/_components/Button";
import TextBox from "@/app/_components/TextBox";
import TextareaBox from "@/app/_components/TextareaBox";
import { useRouter } from "next/navigation";

const FeedbackPage: React.FC = () => {
  const [selectedLikes, setSelectedLikes] = useState<string[]>([]);
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>(
    []
  );
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const router = useRouter();

  const toggleSelection = (
    item: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev: string[]) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  function goMain() {
    console.log("hello");
    router.push("/main");
  }

  return (
    <div className={styles.container}>
      <TextBox
        title="지혜의 온기 전달하기"
        desc="매칭된 멘토에게 따듯한 온기를 전달해보세요"
      />
      <h3>🌡️ 지혜의 온도</h3>
      <div className={styles.rating}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            size={28}
            color={index < rating ? "#A0D468" : "#e4e5e9"}
            onClick={() => setRating(index + 1)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      <h3>🔥 마음에 와닿은 점은?</h3>
      <div className={styles.buttonGroup}>
        {[
          "명확한 조언",
          "친절하고 배려심 있는 태도",
          "실질적인 도움",
          "좋은 소통",
          "멘토의 전문성",
          "공감과 이해",
          "긍정적인 분위기",
          "시간 내어준 것",
          "세션의 유연성",
          "멘토의 열정",
        ].map((item) => (
          <SelectableButton
            key={item}
            title={item}
            onSelect={() => toggleSelection(item, setSelectedLikes)}
            isSelected={selectedLikes.includes(item)}
          />
        ))}
      </div>

      <h3>🔝 더 나아질 수 있어요!</h3>
      <div className={styles.buttonGroup}>
        {[
          "더 구체적인 예시 제공 필요",
          "시간 관리 부족",
          "더 깊이 있는 대화 필요",
          "추가 자료 제공 필요",
          "세션 구조가 복잡함",
          "세션 시간이 짧음",
          "추가적인 실습 필요",
          "대화의 집중력 부족",
        ].map((item) => (
          <SelectableButton
            key={item}
            title={item}
            onSelect={() => toggleSelection(item, setSelectedImprovements)}
            isSelected={selectedImprovements.includes(item)}
          />
        ))}
      </div>

      <h3>❤️‍🔥 전하고 싶은 마음</h3>
      <TextareaBox
        // title="전하고 싶은 마음"
        placeholder="(자유롭게 의견을 작성해주세요!)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <Button title="Submit" variant="dark" onClick={goMain} />
    </div>
  );
};

export default FeedbackPage;
