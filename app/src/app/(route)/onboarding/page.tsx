"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/Button";
import SelectableButton from "@/app/_components/SelectableButton";
import TextBox from "@/app/_components/TextBox";
import ProgressBar from "@/app/_components/ProgressBar";
import InputBox from "@/app/_components/InputBox";
import styles from "./onboarding.module.css";

interface FormData {
  id: string;
  password: string;
  name: string;
  sex: string;
  age: number;
  birth: string;
  phoneNumber: string;
  profileUrl: string;
  location: string;
  personality: string[];
  interest: string[];
  hobby: string[];
  role: string;
  city: string;
  district: string;
  career: string;
}

const personalityOptions = [
  "사교적인", "내향적인", "꼼꼼한", "감성적인", "이성적인",
  "책임감 있는", "계획적인", "즉흥적인", "낙천적인", "창의력이 많은",
  "모험심이 강한", "현실적인", "온화한", "긍정적인", "주의 깊은"
];

const interestOptions = [
  "인문학", "공학", "IT", "의료", "디자인",
  "스포츠", "예술", "방송/연예", "금융"
];

const hobbyOptions = [
  "여행", "게임", "운동", "독서", "영화 시청",
  "음악 감상", "요리", "노래", "그림 그리기"
];

export default function Onboarding() {
  const router = useRouter();
  const steps: string[] = ["role", "signup", "survey"];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null); // 선택된 파일 이름 상태 추가


  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
    name: "",
    sex: "",
    age: 0,
    birth: "2024-08-20",
    phoneNumber: "",
    profileUrl: "", 
    location: "",
    personality: [],
    interest: [],
    hobby: [],
    role: "USER",
    city: "",
    district: "",
    career: ""
  });

  const handleNext = () => {
    if (currentStep === 0 && formData.role) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1 && validateSignupForm()) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2 && validateSurveyForm()) {
      handleSubmit();
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setFormData({ ...formData, role });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "id") validateEmail(value);
    if (name === "password") validatePassword(value);
    if (name === "phoneNumber") validatePhoneNumber(value);
    if (name === "sex") validateGender(value);
    if (name === "name") validateName(value);
    if (name === "age") validateAge(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFileName(selectedFile.name); 
    } else {
      setSelectedFileName(null); 
    }
  };

  const toggleSelection = (name: keyof FormData, value: string) => {
    setFormData((prevData) => {
      const currentValues = prevData[name] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prevData,
        [name]: newValues,
      };
    });
  };

  const validateAge = (age: string) => {
    const ageNumber = Number(age);
    if (ageNumber <= 0 || ageNumber > 120) {
      setErrorMessages((prev) => ({
        ...prev,
        age: "유효한 나이를 입력해주세요."
      }));
      return false; 
    } else {
      setErrorMessages((prev) => ({ ...prev, age: "" }));
      return true; 
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessages((prev) => ({
        ...prev,
        id: "유효한 이메일 주소를 입력해주세요."
      }));
      return false; 
    } else {
      setErrorMessages((prev) => ({ ...prev, id: "" }));
      return true; 
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessages((prev) => ({
        ...prev,
        phoneNumber: "전화번호는'000-0000-0000'형식이어야 합니다."
      }));
      return false; 
    } else {
      setErrorMessages((prev) => ({ ...prev, phoneNumber: "" }));
      return true; 
    }
  };

  const validateGender = (sex: string) => {
    if (!["남자", "여자", "기타"].includes(sex)) {
      setErrorMessages((prev) => ({
        ...prev,
        sex: "성별은 '남자', '여자', '기타' 중 하나여야 합니다."
      }));
      return false; 
    } else {
      setErrorMessages((prev) => ({ ...prev, sex: "" }));
      return true; 
    }
  };

  const validateName = (name: string) => {
    if (!name) {
      setErrorMessages((prev) => ({
        ...prev,
        name: "이름을 입력해주세요."
      }));
      return false; 
    } else {
      setErrorMessages((prev) => ({ ...prev, name: "" }));
      return true; 
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{7,}$/; 
    if (!passwordRegex.test(password)) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "비밀번호는 7자 이상이며 특수문자와 숫자를 포함해야 합니다."
      }));
      return false; 
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
      return true; 
    }
  };

  const validateSignupForm = () => {
    const { name, id, password, phoneNumber, sex, age } = formData;
    const nameValid = validateName(name);
    const emailValid = validateEmail(id);
    const passwordValid = validatePassword(password);
    const phoneValid = validatePhoneNumber(phoneNumber);
    const genderValid = validateGender(sex);
    const ageValid = validateAge(age.toString()); // Validate age

    return nameValid && emailValid && passwordValid && phoneValid && genderValid && ageValid;
  };

  const validateSurveyForm = () => {
    const { personality, interest, hobby, career } = formData;
    return personality.length > 0 && interest.length > 0 && hobby.length > 0 && career;
  };

  const handleSubmit = async () => {
    const location = `${formData.city} ${formData.district}`;
    const postData = { ...formData, location };

    if (file) {
      const formDataForUpload = new FormData();
      formDataForUpload.append("file", file);
  
      try {
        const uploadResponse = await fetch("http://13.209.206.185:9475/api/upload/png", {
          method: "POST",
          body: formDataForUpload,
        });
  
        const profileUrl = await uploadResponse.text();
        if (uploadResponse.ok) {
          postData.profileUrl = profileUrl; 
        } else {
          console.error("File upload error:", profileUrl);
          alert("프로필 이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      } catch (error) {
        console.error("File upload error:", error);
        alert("프로필 이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }

    try {
      const response = await fetch(`http://13.209.206.185:9475/api/auth/register/youth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo: postData }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/main"); 
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      {currentStep === 0 && (
        <div>
          <h1 className={styles.title}>나는 누구에요</h1>
          <p className={styles.caption}>Choose your interests.</p>
          <div className={styles.listBoxes}>
            <div
              className={`${styles.listBox} ${selectedRole === "SENIOR" ? styles.selected : ''}`}
              onClick={() => handleRoleSelect("SENIOR")}
            >
              <img src="/assets/senior.png" alt="Senior" />
              <p className={styles.listBoxCaption}>지혜를 나눌게요</p>
              <p className={styles.listBoxTitle}>멘토</p>
            </div>
            <div
              className={`${styles.listBox} ${selectedRole === "YOUTH" ? styles.selected : ''}`}
              onClick={() => handleRoleSelect("YOUTH")}
            >
              <img src="/assets/youth.png" alt="Youth" />
              <p className={styles.listBoxCaption}>자립을 준비하고 있어요</p>
              <p className={styles.listBoxTitle}>멘티</p>
            </div>
          </div>
          <Button title="Next" onClick={handleNext} variant="dark" />
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <h1>회원가입</h1>

          <InputBox
            title="이름"
            placeholder="이름을 입력하세요"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errorMessages.name && <p className={styles.error}>{errorMessages.name}</p>}

          <InputBox
            title="이메일"
            placeholder="이메일을 입력하세요"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
          {errorMessages.id && <p className={styles.error}>{errorMessages.id}</p>}

          <InputBox
            title="비밀번호"
            placeholder="비밀번호를 입력하세요"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
          />
          {errorMessages.password && <p className={styles.error}>{errorMessages.password}</p>}
          
          <InputBox
            title="전화번호"
            placeholder="전화번호를 입력하세요"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errorMessages.phoneNumber && <p className={styles.error}>{errorMessages.phoneNumber}</p>}
          
          <InputBox
            title="성별"
            placeholder="성별을 입력하세요 (남자, 여자, 기타)"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
          />
          {errorMessages.sex && <p className={styles.error}>{errorMessages.sex}</p>}
          
          <InputBox
            title="나이"
            placeholder="나이를 입력하세요"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
          />
          {errorMessages.age && <p className={styles.error}>{errorMessages.age}</p>}

          <InputBox
            title="생년월일"
            placeholder="YYYY-MM-DD 형식으로 입력하세요"
            name="birth"
            value={formData.birth}
            onChange={handleInputChange}
          />

          <InputBox
            title="프로필 사진"
            placeholder="프로필 사진을 업로드하세요"
            type="file"
            name={"profileUrl"} 
            onChange={handleFileChange} 
            />
          
          <Button title="Next" onClick={handleNext} variant="dark" />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h1>매칭 시스템을 위한 설문조사</h1>

          <TextBox title="성격" desc="성격을 선택하세요" />
          <div className={styles.buttonGroup}>
            {personalityOptions.map((option) => (
              <SelectableButton
                key={option}
                title={option}
                onSelect={() => toggleSelection("personality", option)}
                isSelected={formData.personality.includes(option)}
              />
            ))}
          </div>

          <TextBox title="관심사" desc="관심사를 선택하세요" />
          <div className={styles.buttonGroup}>
            {interestOptions.map((option) => (
              <SelectableButton
                key={option}
                title={option}
                onSelect={() => toggleSelection("interest", option)}
                isSelected={formData.interest.includes(option)}
              />
            ))}
          </div>

          <TextBox title="취미" desc="취미를 선택하세요" />
          <div className={styles.buttonGroup}>
            {hobbyOptions.map((option) => (
              <SelectableButton
                key={option}
                title={option}
                onSelect={() => toggleSelection("hobby", option)}
                isSelected={formData.hobby.includes(option)}
              />
            ))}
          </div>
          <div>
          <h3>Location</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <InputBox
                title="도시"
                name="city"
                placeholder={"도시를 입력하세요."} 
                value={formData.city}
                onChange={handleInputChange}            
                />
            <InputBox
              title="지역"
              name="district"
              placeholder={"지역(구, 동)을 입력하세요."} 
              value={formData.district}
              onChange={handleInputChange}
            />
          </div>
          </div>

          {formData.role === "SENIOR" ? (
            <InputBox
              title="커리어"
              placeholder="커리어를 입력하세요"
              name="career"
              value={formData.career}
              onChange={handleInputChange}
            />
          ) : (
            <InputBox
              title="희망 직업"
              placeholder="희망 직업을 입력하세요"
              name="career"
              value={formData.career}
              onChange={handleInputChange}
            />
          )}
          <Button title="Submit" onClick={handleSubmit} variant="dark" />
        </div>
      )}
    </div>
  );
}
