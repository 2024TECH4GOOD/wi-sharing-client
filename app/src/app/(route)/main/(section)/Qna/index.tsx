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
  const role = localStorage.getItem("role");

  const fetchQuestions = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://wi-sharing.com/api/question/list?question=&category=",
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
        `https://wi-sharing.com/api/question/${questionSeq}`,
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

  const handleSubmitQuestion = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const category = selectedLikes[0] || "기타"; // 선택된 카테고리가 없으면 "기타"로 기본값 설정
      const response = await fetch("https://wi-sharing.com/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question: content,
          category: category,
        }),
      });

      if (response.ok) {
        // 질문 제출 후 질문 목록을 다시 불러옴
        await fetchQuestions();
        // 초기화 후 step 0으로 이동
        setContent("");
        setSelectedLikes([]);
        setStep(0);
      } else {
        console.error("Failed to submit question");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
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
          <TextBox
            title="지식 더하기"
            desc="다양한 분야의 전문가에게 질문해보세요"
          />
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
          {role === "YOUTH" && (
            <Button
              title="질문하기"
              variant="dark"
              onClick={() => setStep(1)}
            />
          )}
        </>
      )}
      {step === 1 && (
        <>
          <TextBox
            title="지식 더하기"
            desc="다양한 분야의 전문가에게 질문해보세요"
          />
          <div className={styles.content}>
            <div className={styles.buttonGroup}>
              {["법", "금융", "경제", "주거", "직업", "기타"].map((item) => (
                <SelectableButton
                  key={item}
                  title={item}
                  onSelect={() => toggleSelection(item, setSelectedLikes)}
                  isSelected={selectedLikes.includes(item)}
                />
              ))}
            </div>
            <TextareaBox
              title="질문을 작성하세요"
              placeholder="시니어 멘토가 풍부한 지식을 더해줍니다. 궁금한 점을 무엇이든 물어보세요."
              value={content}
              maxRows={15}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button
            title="질문 제출하기"
            variant="dark"
            onClick={handleSubmitQuestion} // 버튼 클릭 시 질문 제출 함수 호출
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
                <div className={styles.leftLine}>
                  {selectedQuestion.question.question}
                </div>
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
          {role === "SENIOR" && (
            <Button
              title="답변하기"
              variant="dark"
              onClick={() => setStep(3)}
            />
          )}
        </>
      )}
      {step === 3 && (
        <>
          <TextBox
            title="답변 하기"
            desc="자립 준비 청년에게 풍부한 지식을 전달해주세요"
          />
          <div className={styles.content}>
            <div className={styles.leftLine}>
              {selectedQuestion.question.question}
            </div>
            <TextareaBox
              // title={selectedQuestion.question.question}
              placeholder="나의 지혜는 자립 준비 청년에게 큰 도움이 될 수 있어요."
              value={content}
              maxRows={13}
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
