import React, { useState } from "react";
import { YouthDto, SeniorDto } from "../page";
import styles from "../onboarding.module.css";

interface SignUpFormComponentProps {
  role: "Youth" | "Senior" | null;
  setYouthformData: React.Dispatch<React.SetStateAction<YouthDto | undefined>>;
  setSeniorformData: React.Dispatch<React.SetStateAction<SeniorDto | undefined>>;
  onSubmit: () => void; 
}

const SignUpFormComponent = ({ role, setYouthformData, setSeniorformData, onSubmit }: SignUpFormComponentProps) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    sex: "",
    age: 0,
    birth: "",
    phoneNumber: "",
    profileUrl: "",
    city: "",
    district: "",
    personality: "",
    interest: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (role === "Youth") {
      setYouthformData({
        userInfo: {
          ...formData,
          role: "Youth",
        },
        youthInfo: {
          careerPath: "",
          desiredConsultation: "",
          city: formData.city,
          district: formData.district,
        },
      });
    } else if (role === "Senior") {
      setSeniorformData({
        userInfo: {
          ...formData,
          role: "Senior",
        },
        seniorInfo: {
          career: "",
          criminalRecordCheck: "",
          educationalCertificate: "",
        },
      });
    }
    onSubmit(); 
  };

  return (
    <div>
      <form className={styles.form}>
        <label className={styles.label}>
          아이디
          <input className={styles.input} placeholder="아이디를 입력하세요" type="text" name="id" value={formData.id} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          비밀번호
          <input className={styles.input}  placeholder="비밀번호를 입력하세요" type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          이름
          <input className={styles.input}  placeholder="이름 입력하세요" type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          성별
          <input className={styles.input}  placeholder="성별을 입력하세요(남자/여자)" type="text" name="sex" value={formData.sex} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          나이
          <input className={styles.input}  placeholder="나이를 입력하세요" type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          생년월일
          <input className={styles.input}   placeholder="생년월일을 입력하세요"type="date" name="birth" value={formData.birth} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          핸드폰 번호
          <input className={styles.input} placeholder="핸드폰 번호를 입력하세요" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          프로필 사진
          <input className={styles.input} placeholder="프로필 사진을 등록하세요" type="text" name="profileUrl" value={formData.profileUrl} onChange={handleChange} />
        </label>
      </form>
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
};

export default SignUpFormComponent;
