import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./my.module.css";

interface UserProfile {
  userSeq: number;
  name: string;
  profileUrl: string;
}

const MyPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.avatar}>
          {userProfile && <img src={userProfile.profileUrl ? userProfile.profileUrl : "/avatarImage.png"} alt="User Avatar" className={styles.avatarImage} />}
        </div>
        <span className={styles.userName}>{userProfile ? userProfile.name : "Please Login"}</span>
      </div>

      <div className={styles.menuItem} onClick={handleOnboardingClick}>
        <span>온보딩 다시하기</span>
        <span className={styles.arrow}></span>
      </div>

      <div className={styles.menuItem} onClick={handlePolicyClick}>
        <span>위 쉐어링 정책 및 약관</span>
        <span className={styles.arrow}></span>
      </div>
    </div>
  );
};

export default MyPage;
