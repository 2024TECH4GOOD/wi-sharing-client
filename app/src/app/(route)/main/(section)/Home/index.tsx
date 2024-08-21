import React, { useState } from "react";
import styles from "../../main.module.css";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  /*---- jsx ----*/
  return (
    <div className={styles.m1}>
      <div className={styles.t4}>
        <img src="/assets/together.png" />
      </div>
      <div className={styles.s1}>
        <div className={styles.t1}>
          <img src="/assets/home/t1.png" />
        </div>
        <div className={styles.links}>
          <a
            className={styles.link}
            href="https://beautifulfund.org/eighteen-100days/?utm_source=google&utm_medium=searchad&utm_campaign=eighteen-100days&utm_content=sa&utm_term=%EC%9E%90%EB%A6%BD%EC%A4%80%EB%B9%84%EC%B2%AD%EB%85%84&gad_source=1&gclid=Cj0KCQjwlIG2BhC4ARIsADBgpVQEBs8-pQ1bMdB1clV7FelUsOP0hSdrz30WvmuqNDkYpNixGyCR8U8aAgC3EALw_wcB"
          >
            <img src="/assets/home/1.png" />
          </a>
          <a
            className={styles.link}
            href="https://jaripon.ncrc.or.kr/home/kor/main.do"
          >
            <img src="/assets/home/2.png" />
          </a>
          <a
            className={styles.link}
            href="https://www.joyfulunion.or.kr/biz/weak_youth"
          >
            <img src="/assets/home/3.png" />
          </a>
          <a
            className={styles.link}
            href="https://www.bss.or.kr/load.asp?subPage=291"
          >
            <img src="/assets/home/4.png" />
          </a>
          <a
            className={styles.link}
            href="https://www.worldvision.or.kr/informationCenter/story/wordpress-19992"
          >
            <img src="/assets/home/5.png" />
          </a>
        </div>
      </div>
      <div className={styles.s1}>
        <div className={styles.t2}>
          <img src="/assets/home/t2.png" />
        </div>
        <div className={styles.t3} onClick={() => router.push("/overview")}>
          <img src="/assets/home/cam.png" />
        </div>
      </div>
    </div>
  );
}
