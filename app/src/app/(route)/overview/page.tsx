"use client";
import React, { useState } from "react";
import styles from "./overview.module.css";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/Button";
import TextBox from "@/app/_components/TextBox";

export default function Page() {
  const router = useRouter();

  const content = [
    {
      title: "반쪽 자립",
      desc: '많은 청년들이 기본적인 경제적 지원을 받지만, 이 지원은 그들의 자립을 충분히 보장해 주지 못합니다. 현재의 정책은 주거와 생활비에 대한 최소한의 지원을 제공하지만, 그 이상의 정서적, 사회적 지원은 부족한 실정입니다. 막상 지원을 받더라도, 어떻게 사용할 지, 살아가야 할 지에 대한 구체적인 지침이나 조언이 없어 막막함을 느끼는 것이 현 실정입니다. 이런 상황에서, 청년들이 완전한 자립을 이루기 위해서는 더 깊이 있는 멘토링과 사회적 네트워크가 절실히 필요합니다.',
    },
    {
      title: "'홀로'서기가 아닌 '함께'서기",
      desc:'"Wi-sharing"은 보호 종료 아동들이 홀로 세상과 맞서는 것이 아니라, 함께 서서 나아갈 수 있도록 돕는 플랫폼입니다. 이 서비스는 청년들이 그들의 삶과 목표에 맞는 멘토를 쉽게 만날 수 있게 해 줍니다. 멘토님과 이야기를 나누며, 막연했던 미래에 대한 방향성을 찾을 수 있습니다.  또한, 일상에서 겪는 경제적, 법적 고민을 쉽게 해결할 수 있는 방법을 제공합니다. 쉽게 물어볼 수 없었던 법적 문제나 경제적 고민을 쉽게 해결할 수 있는 도움을 제공합니다. Wi-sharing은 청년들이 더욱 자신감 있게 자립을 준비할 수 있도록 지원합니다.',
    },
    {
      title: "지혜를 나누며, 서로의 삶을 풍요롭게",
      desc: '“젊은 친구들과 이야기하면서 나도 여전히 사회에 필요한 존재라는 것을 느꼈어요." "Wi-sharing"은 보호 종료 아동들에게만 혜택을 주는 것이 아닙니다. 시니어 층들에게도 젊은 세대와의 새로운 교류를 통해 사회적 외로움을 해소할 수 있는 기회를 제공합니다.  또한, 자신의 지혜와 경험을 나누며 재능 기부를 할 수 있고, 그 과정에서 소정의 금액을 통해 일자리 창출에도 기여할 수 있습니다. 지혜를 나누는 것이 단순한 봉사가 아니라, 나에게도 큰 의미가 있다는 것을 깨닫게 하며, 이로써, 보호 종료 아동과 노인 모두가 서로에게 긍정적인 영향을 주고받으며, 사회적 교류의 장을 제공합니다. 제3자의 기부 또한 이러한 선순환에 동참할 수 있는 기회를 제공하며, 사회 전체가 함께 성장하고 풍요로워지는 기반을 마련합니다',
    },
  ];
    return(
      <div>
        <div className={styles.logo}><img src="/logo.png" /></div>
        <div className={styles.box}>
          <img src="/assets/together.png" alt="Logo" />
        </div>
        <div className={styles.form}>
          <h1>위 쉐어링 소개서</h1>
          {content.map((el, index) => (
            <TextBox key={index}
            title={el.title} 
            desc={el.desc} 
            />
          ))}
          <div>
          <Button title="기부하기" onClick={()=>router.push('/donation')} variant="dark" />
          <p className={styles.caption}>기부금의 일부는 서비스 운영료로 사용됩니다.</p>
          </div>
      </div>
    </div>
    )
}
