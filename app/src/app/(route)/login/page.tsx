"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/Button";

interface LoginDto {
  id: string;
  pw: string;
}

export default function Page() {
  const [loginForm, setLoginForm] = useState<LoginDto>({ id: "", pw: "" });
  const router = useRouter();

  async function handleLogin() {
    if (!loginForm.id || !loginForm.pw) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://13.209.206.185:9475/api/auth/login?id=${loginForm.id}&pw=${loginForm.pw}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/main"); 
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className={styles.logo}><img src="/logo.png" /></div>
      <div className={styles.box}>
        <img src="/assets/together.png" />
      </div>
      <div className={styles.form}>
        <h1>WELCOME!</h1>
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력하세요"
          onChange={handleChange}
          value={loginForm.id}
          className={styles.input}
        />
        <input
          type="password"
          name="pw"
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
          value={loginForm.pw}
          className={styles.input}
        />
        <div>
        <Button title="로그인하기" onClick={handleLogin} variant="dark" />
        <p className={styles.caption} onClick={()=> router.push("/onboarding")}>Not a member? Register now</p>
        </div>
        <Button onClick={()=> router.push("/main")} title="로그인없이 보기" variant="bright"/>
      </div>
    </div>
  );
}
