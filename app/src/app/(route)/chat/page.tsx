"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { useRouter } from "next/navigation";

const role = localStorage.getItem("role");

const YouthChatData = [
  {
    role: "admin",
    content:
      "[위쉐어링이 추천하는 AI 대화 가이드]\n\n 처음 멘토님께 인사를 드릴 때는 가볍고 편안하게 다가가는 게 좋아요. 멘토님도 당신이 어떤 사람인지 궁금해하실 테니까요. 간단하게 자기소개를 하면서 멘토링에 대해 기대하고 있는 부분을 살짝 언급해보세요.\n\n 이렇게요: ‘안녕하세요, 저는 [이름]이고, IT 공학을 공부하고 있어요. 멘토님께 많이 배우고 싶어서 연락드렸어요. 앞으로 잘 부탁드립니다! 😊’\n\n 이렇게 시작하면 멘토님도 더 편하게 이야기를 이어가실 거예요.",
  },
  {
    role: "mentor",
    content:
      "안녕하세요, [멘티 이름]님! 반갑습니다. IT 공학이라니 정말 흥미로운 분야네요. 어떤 부분에서 도움이 필요하신지 궁금해요!",
  },
  {
    role: "admin",
    content:
      "[위쉐어링이 추천하는 AI 가이드] 멘토님과 조금 더 친해졌다면, 이제는 취미나 일상적인 이야기를 나누면서 더 가까워질 수 있어요. 멘토님께서 좋아하시는 것들에 대해 물어보거나, 공통 관심사에 대해 이야기해보세요. \n\n 예를 들어, ‘멘토님, 최근에 읽은 책이 있는데, 멘토님도 독서를 좋아하신다고 하셨잖아요. 혹시 최근에 재미있게 읽으신 책 있으신가요? 😊’ \n\n 이런 식으로 대화를 이어가시면 좋아요!",
  },
  {
    role: "mentor",
    content:
      "안녕하세요, [멘티 이름]님! 아, 독서를 좋아하신다니 반갑네요. 최근에는 '클린 코드'라는 책을 읽었는데, 개발자라면 꼭 한 번 읽어볼 만한 책이에요. [멘티 이름]님은 어떤 책을 읽고 계신가요?",
  },
  {
    role: "admin",
    content:
      "[위쉐어링이 추천하는 AI 가이드] 이제는 멘토님과 직접 만나 뵙는 것도 좋은 시점이에요! 가볍게, 편안한 만남을 제안해보세요. 예를 들어, \n\n ‘멘토님 덕분에 많이 배웠습니다. 이번 주말에 시간이 되시면 카페에서 뵙고 더 많은 이야기를 나눌 수 있을까요? 멘토님의 편한 시간에 맞추겠습니다! 😊’ \n\n 이렇게 제안하시면, 멘토님도 편하게 받아들이실 거예요.",
  },
  {
    role: "mentor",
    content:
      "안녕하세요, [멘티 이름]님! 만나서 더 깊이 이야기 나눠보는 것도 좋을 것 같네요. 이번 주말 토요일 오후에 시간이 괜찮으신가요?",
  },
  {
    role: "mentor",
    content: "그럼 [장소]에서 오후 3시에 만나는 걸로 할까요? 편하게 오세요!",
  },
];

const SeniorChatData = [
  {
    role: "admin",
    content:
      "[위쉐어링이 추천하는 AI 대화 가이드]\n\n 멘티님께 인사를 드릴 때는 따뜻하게 다가가는 것이 좋습니다. 멘티님도 당신의 경험을 듣고 싶어 할 거예요. 간단하게 자기소개를 하면서 멘토링에 대해 기대하는 부분을 얘기해보세요.\n\n 이렇게요: ‘안녕하세요, 저는 [이름]입니다. 멘토링을 통해 저의 경험을 나누고 싶습니다. 앞으로 잘 부탁드립니다.’\n\n 이렇게 시작하면 멘티님도 더 편하게 이야기를 이어가실 겁니다.",
  },
  {
    role: "mentee",
    content:
      "안녕하세요, [멘토 이름]님! 반갑습니다. 멘토님의 경험에서 배우고 싶은 부분이 많아요!",
  },
  {
    role: "admin",
    content:
      "[위쉐어링이 추천하는 AI 가이드] 멘티님과 조금 더 친해졌다면, 이제는 일상적인 이야기나 과거의 경험을 나누면서 더 가까워질 수 있어요. 멘티님께서 궁금해하시는 부분에 대해 솔직하게 이야기해보세요.\n\n 예를 들어, ‘멘티님, 저는 과거에 [경험]을 했습니다. 그때 배운 점은 [교훈]입니다.’ \n\n 이런 식으로 대화를 이어가시면 좋습니다.",
  },
  {
    role: "mentee",
    content:
      "멘토님, 그런 경험이 있으셨다니 정말 배울 점이 많네요. 저도 그런 상황에서 어떻게 해야 할지 고민이 많았어요.",
  },
  {
    role: "admin",
    content:
      "[위쉐어링이 추천하는 AI 가이드] 이제는 멘티님과 직접 만나 이야기를 나눌 시점이 되었을 수도 있습니다. 만나서 더 깊이 이야기해보세요.\n\n ‘멘티님, 저희가 이번 주말에 시간을 내어 만날 수 있을까요? 편하신 시간에 맞추겠습니다.’\n\n 이렇게 제안하면, 멘티님도 편하게 받아들일 것입니다.",
  },
  {
    role: "mentee",
    content:
      "멘토님, 만나서 직접 뵙고 더 많은 이야기를 나눌 수 있으면 좋겠습니다. 이번 주말에 시간이 괜찮으신가요?",
  },
  {
    role: "mentee",
    content: "그럼 [장소]에서 오후 3시에 만나는 걸로 할까요? 기대됩니다!",
  },
];

export default function Page() {
  const router = useRouter();
  const chatData = role === "YOUTH" ? YouthChatData : SeniorChatData;
  const [messages, setMessages] = useState([chatData[0]]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatIndex, setChatIndex] = useState(1);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newMessages = [...messages, { role: "user", content: inputText }];
      setMessages(newMessages);
      setInputText("");
      setIsLoading(true);

      setTimeout(() => {
        if (chatIndex < chatData.length) {
          setMessages([...newMessages, chatData[chatIndex]]);
          setChatIndex(chatIndex + 1);
        }
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessageContent = (content: any) => {
    return content.split("\n").map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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
          온기 전하기
        </button>
      </div>
      <div className={styles.chatWindow} ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.role === "user"
                ? styles.userMessage
                : msg.role === "mentor" || msg.role === "mentee"
                ? styles.mentorMessage
                : styles.adminMessage
            }`}
          >
            {renderMessageContent(msg.content)}
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