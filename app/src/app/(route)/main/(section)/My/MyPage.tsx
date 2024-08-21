import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./my.module.css";
import { FaStar } from "react-icons/fa";

interface UserProfile {
  userSeq: number;
  name: string;
  profileUrl: string;
}

const MyPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showWisdomDetails, setShowWisdomDetails] = useState(false);
  const [showKnowledgeDetails, setShowKnowledgeDetails] = useState(false);
  const [mentoringAgreement, setMentoringAgreement] = useState<string>("");
  const router = useRouter();
  const role = localStorage.getItem("role");
  const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);


  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const response = await fetch("http://13.209.206.185:9475/api/my/profile", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Accept": "*/*",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserProfile(data.userProfile);
            setMentoringAgreement(data.mentoringAgreement)
          } else {
            console.error("Failed to fetch user profile:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        console.error("No access token found");
      }
    };

    fetchUserProfile();
  }, []);

  const handleOnboardingClick = () => {
    router.push("/onboarding");
  };

  const handlePolicyClick = () => {
    router.push("/policy");
  };

  const handleAgreementClick = () => {
    window.location.href = mentoringAgreement; 
  };

  const toggleWisdomDetails = () => {
    setShowWisdomDetails((prev) => !prev);
  };

  const toggleKnowledgeDetails = () => {
    setShowKnowledgeDetails((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.avatar}>
          {userProfile && (
            <img
              src={userProfile.profileUrl ? userProfile.profileUrl : "/avatarImage.png"}
              alt="User Avatar"
              className={styles.avatarImage}
            />
          )}
        </div>
        <span className={styles.userName}>
          {userProfile ? userProfile.name : "Please Login"}
        </span>
        <span className={styles.temperature}>
         <FaStar/> {"3"+getRandom(6,10)+"."+getRandom(1,10)+"도" }
        </span>
      </div>

      <div className={styles.menuItem} onClick={handleOnboardingClick}>
        <span>개인정보 수정</span>
        <span className={styles.arrow}></span>
      </div>

      <div className={styles.menuItem} onClick={handleOnboardingClick}>
        <span>온보딩 다시하기</span>
        <span className={styles.arrow}></span>
      </div>

      <div className={styles.menuItem} onClick={handleAgreementClick}>
        <span>멘토링 계약서 다시 보기</span>
        <span className={styles.arrow}></span>
      </div>

      <div className={styles.menuItem} onClick={toggleWisdomDetails}>
        <span>나의 지혜</span>
        <span className={styles.arrow}></span>
        {showWisdomDetails && (
          <div className={styles.details}>
            <span>{role === 'SENIOR' ? "지혜 나눈 멘티" : "지혜 받은 멘토"}</span>
            <span>매칭 관련 기록</span>
          </div>
        )}
      </div>

      <div className={styles.menuItem} onClick={toggleKnowledgeDetails}>
        <span>나의 지식</span>
        <span className={styles.arrow}></span>
        {showKnowledgeDetails && (
          <div className={styles.details}>
            <span>내가 했던 질문 및 답변</span>
            <span>지식 더하기 기록</span>
          </div>
        )}
      </div>

      <div className={styles.menuItem} onClick={handlePolicyClick}>
        <span>위 쉐어링 정책 및 약관</span>
        <span className={styles.arrow}></span>
      </div>
    </div>
  );
};

export default MyPage;
