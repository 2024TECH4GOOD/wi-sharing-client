import React, { useState } from "react";
import { YouthDto, SeniorDto } from "../page";
import styles from "../onboarding.module.css";

interface MatchingComponentProps {
  role: "Youth" | "Senior" | null;
  setYouthformData: React.Dispatch<React.SetStateAction<YouthDto | undefined>>;
  setSeniorformData: React.Dispatch<React.SetStateAction<SeniorDto | undefined>>;
  onComplete: () => void;  // Callback function to handle form completion
}

const MatchingComponent = ({ role, setYouthformData, setSeniorformData, onComplete }: MatchingComponentProps) => {
  const [formData, setFormData] = useState({
    careerPath: "",
    desiredConsultation: "",
    career: "",
    criminalRecordCheck: "",
    educationalCertificate: "",
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

  const handleUpdate = () => {
    if (role === "Youth") {
      setYouthformData(prev => ({
        ...prev!,
        youthInfo: {
          ...formData,
        },
      }));
    } else if (role === "Senior") {
      setSeniorformData(prev => ({
        ...prev!,
        seniorInfo: {
          career: formData.career,
          criminalRecordCheck: formData.criminalRecordCheck,
          educationalCertificate: formData.educationalCertificate,
        },
      }));
    }
    onComplete(); 
  };

  return (
    <div>
      <form className={styles.form}>
        {role === "Youth" && (
          <>
            <label className={styles.label}>
              사는 곳(**구)
              <input className={styles.input} type="text" name="city" value={formData.city} onChange={handleChange} />
            </label>
            <label className={styles.label}>
              사는 곳(**동)
              <input className={styles.input} type="text" name="district" value={formData.district} onChange={handleChange} />
            </label>
            <label className={styles.label}>
              개인 성향
              <input className={styles.input} type="text" name="personality" value={formData.personality} onChange={handleChange} />
            </label>
            <label className={styles.label}>
              흥미
              <input className={styles.input} type="text" name="interest" value={formData.interest} onChange={handleChange} />
            </label>
            <label className={styles.label}>
              진로 설정
              <input className={styles.input} type="text" name="careerPath" value={formData.careerPath} onChange={handleChange} />
            </label>
            <label className={styles.label}>
              상담 분야
              <input className={styles.input} type="text" name="desiredConsultation" value={formData.desiredConsultation} onChange={handleChange} />
            </label>
          </>
        )}
        {role === "Senior" && (
          <>
            <label className={styles.label}>
              직업
              <input className={styles.input} type="text" name="career" value={formData.career} onChange={handleChange} />
            </label>
            <label className={styles.label}>
              범죄 기록 확인
              <input className={styles.input} type="file" name="criminalRecordCheck" onChange={handleChange} />
            </label>
            <label className={styles.label}>
              교육 증명서
              <input className={styles.input} type="file" name="educationalCertificate" onChange={handleChange} />
            </label>
          </>
        )}
      </form>
      <button onClick={handleUpdate}>제출</button>
    </div>
  );
};

export default MatchingComponent;
