import ListBox from "@/app/_components/ListBox";
import TextBox from "@/app/_components/TextBox";
import React, { useState, useEffect } from "react";
import styles from "../../main.module.css";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import SelectableButton from "@/app/_components/SelectableButton";
import TextareaBox from "@/app/_components/TextareaBox";

export default function QnA() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [content, setContent] = useState<string>("");

  const [selectedLikes, setSelectedLikes] = useState<string[]>([]);

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

  const toggleSelection = (
    item: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev: string[]) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
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

  // step 0 : 질문 목록
  // step 1 : 질문 하기
  // step 2 : 질문 내용
  // step 3 : 답변 하기
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
                  category={item.category}
                  title={item.question}
                  desc={item.question}
                  onClick={() => {
                    setSelectedQuestion(item);
                    setStep(2);
                  }}
                />
              ))}
            </div>
          </div>
          <Button title="질문하기" variant="dark" onClick={() => setStep(1)} />
        </>
      )}
      {step === 1 && (
        <>
          <TextBox title="질문하기" desc="질문 작성" />
          <div className={styles.content}>
            <div className={styles.buttonGroup}>
              {["법", "금융", "경제", "주거", "노무"].map((item) => (
                <SelectableButton
                  key={item}
                  title={item}
                  onSelect={() => toggleSelection(item, setSelectedLikes)}
                  isSelected={selectedLikes.includes(item)}
                />
              ))}
            </div>
            <TextareaBox
              title="Anything else?"
              placeholder="Tell us everything."
              value={content}
              maxRows={15}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button
            title="질문 제출하기"
            variant="dark"
            onClick={() => setStep(0)}
          />
        </>
      )}
      {step === 2 && selectedQuestion && (
        <>
          <div className={styles.content}>
            <div className={styles.listContainer}>
              <div>
                <div className={styles.listBoxCaptionReverse}>
                  {selectedQuestion.question.category}
                </div>
                <div>{selectedQuestion.question.question}</div>
              </div>
              {selectedQuestion.answerList &&
              selectedQuestion.answerList.length > 0 ? (
                selectedQuestion.answerList
                  .sort((a: any, b: any) =>
                    a.name === "AI 챗봇" ? -1 : b.name === "AI 챗봇" ? 1 : 0
                  )
                  .map((answer: any, index: number) => (
                    <ListBox
                      key={answer.answerSeq}
                      title={
                        answer.name === "AI 챗봇"
                          ? `🤖 AI의 답변`
                          : `👴🏻 ${answer.name} 멘토`
                      }
                      caption={
                        answer.name === "AI 챗봇" ? "" : `금융 분야 전문가`
                      }
                      desc={answer.answer}
                      onClick={() => {}}
                      answerType={answer.name === "AI 챗봇" ? "ai" : "user"}
                    />
                  ))
              ) : (
                <TextBox
                  title="답변 없음"
                  desc="이 질문에 대한 답변이 없습니다."
                />
              )}
            </div>
          </div>
          <Button title="답변하기" variant="dark" onClick={() => setStep(3)} />
        </>
      )}
      {step === 3 && (
        <>
          <TextBox title="답변하기" desc="답변 작성" />
          <div className={styles.content}>
            <TextareaBox
              title={selectedQuestion.question.question}
              placeholder="Tell us everything."
              value={content}
              maxRows={20}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button
            title="답변 제출하기"
            variant="dark"
            onClick={() => setStep(0)}
          />
        </>
      )}
    </>
  );
}
