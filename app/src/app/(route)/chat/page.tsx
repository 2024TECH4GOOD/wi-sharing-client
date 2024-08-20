"use client";
import React, { useState } from "react";
import styles from "./chat.module.css";
import { useRouter } from "next/navigation";

const ChatData = [
  "이 멘토는 안전교육 이수증, 범죄자 조회 등의 과정으로 인증된 시니어 멘토입니다.",
  "안녕하세요, 지혜님. 저도 젊었을 때 여러 가지 고민을 했던 기억이 납니다. 인생은 때로는 계획대로 되지 않지만, 그 안에서도 배울 수 있는 것이 많답니다. 지혜님이 더 나은 삶을 살 수 있도록 제가 도울 수 있는 한 최대한 도와드리고 싶습니다. 이번 주 금요일 오후 2시에 00구 00카페에서 만나서 첫 대화를 나눠보는 게 어떨까요?",
];

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState<string[]>([ChatData[0]]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatIndex, setChatIndex] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newMessages = [...messages, `사용자: ${inputText}`];
      setMessages(newMessages);
      setInputText("");
      setIsLoading(true);

      setTimeout(() => {
        if (chatIndex < ChatData.length) {
          setMessages([...newMessages, `멘토: ${ChatData[chatIndex]}`]);
          setChatIndex(chatIndex + 1);
        }
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.center}>멘토</div>
        <button
          className={`${styles.button} ${styles.right}`}
          onClick={() => router.push("/feedback")}
          type="button"
        >
          피드백
        </button>
      </div>
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.startsWith("사용자:")
                ? styles.userMessage
                : styles.mentorMessage
            }`}
          >
            {msg.replace("사용자:", "").replace("멘토:", "")}
          </div>
        ))}
        {isLoading && (
          <div className={styles.message}>
            <div className={styles.loading}></div>
          </div>
        )}
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.input}
          placeholder="무엇이든 질문해보세요"
          disabled={isLoading}
        />
        <button className={styles.button} type="submit" disabled={isLoading}>
          보내기
        </button>
      </form>
    </div>
  );
}
