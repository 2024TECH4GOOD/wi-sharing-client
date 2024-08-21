import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React, { useState, useEffect } from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";

export default function QnA() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

  const fetchQuestions = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://13.209.206.185:9475/api/question/list?question=&category=",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.question);
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchQuestionDetails = async (questionSeq: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://13.209.206.185:9475/api/question/${questionSeq}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedQuestion(data);
      } else {
        console.error("Failed to fetch question details");
      }
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
  };

  useEffect(() => {
    if (step === 0) {
      fetchQuestions();
    }
  }, [step]);

  useEffect(() => {
    if (step === 2 && selectedQuestion?.questionSeq) {
      fetchQuestionDetails(selectedQuestion.questionSeq);
    }
  }, [step, selectedQuestion]);

  return (
    <>
      {step === 0 && (
        <>
          <TextBox title="QnA" desc="질문 목록" />
          <div className={styles.content}>
            <div className={styles.listContainer}>
              {questions.map((item: any, index: number) => (
                <ListBox
                  key={index}
                  title={item.question}
                  desc={`카테고리: ${item.category}`}
                  caption={`작성일: ${item.createdAt.join("-")}`}
                  onClick={() => {
                    setSelectedQuestion(item);
                    setStep(2);
                  }}
                />
              ))}
            </div>
          </div>
          <Button title="질문 하기" variant="dark" onClick={() => setStep(1)} />
        </>
      )}
      {step === 1 && (
        <>
          <TextBox title="질문" desc="질문 작성" />
          <div className={styles.content}>
            <Button
              title="질문 제출"
              variant="dark"
              onClick={() => setStep(0)}
            />
          </div>
        </>
      )}
      {step === 2 && selectedQuestion && (
        <>
          <TextBox
            title="질문 상세"
            desc={`카테고리: ${selectedQuestion.question.category}`}
          />
          <div className={styles.content}>
            <div className={styles.listContainer}>
              <ListBox
                title={selectedQuestion.question.question}
                desc={`작성일: ${
                  selectedQuestion.question.createdAt
                    ? selectedQuestion.question.createdAt.join("-")
                    : "정보 없음"
                }`}
                caption={`작성자: ${selectedQuestion.question.name || "익명"}`}
                onClick={() => {}}
              />
              {selectedQuestion.answerList &&
              selectedQuestion.answerList.length > 0 ? (
                selectedQuestion.answerList.map(
                  (answer: any, index: number) => (
                    <ListBox
                      key={answer.answerSeq}
                      title={
                        answer.name === "AI 챗봇"
                          ? `인공지능 답변`
                          : `${answer.name} 멘토`
                      }
                      caption={
                        answer.name === "AI 챗봇"
                          ? ""
                          : `작성일: ${answer.createdAt.join("-")}`
                      }
                      desc={answer.answer}
                      onClick={() => {}}
                      answerType={answer.name === "AI 챗봇" ? "ai" : "user"}
                    />
                  )
                )
              ) : (
                <TextBox
                  title="답변 없음"
                  desc="이 질문에 대한 답변이 없습니다."
                />
              )}
            </div>
          </div>
          <Button
            title="메인으로 가기"
            variant="dark"
            onClick={() => router.push("/main")}
          />
        </>
      )}
    </>
  );
}
