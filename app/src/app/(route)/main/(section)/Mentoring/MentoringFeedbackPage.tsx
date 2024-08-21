import React, { useState } from "react";
import styles from "./feedback.module.css"; 
import SelectableButton from "@/app/_components/SelectableButton"; 
import { FaStar } from "react-icons/fa";
import Button from "@/app/_components/Button";
import TextBox from "@/app/_components/TextBox";
import TextareaBox from "@/app/_components/TextareaBox";

const MentoringFeedbackPage: React.FC = () => {
    const [selectedLikes, setSelectedLikes] = useState<string[]>([]);
    const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string>("");
    const [rating, setRating] = useState<number>(4);
  
    const toggleSelection = (
      item: string,
      setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      setSelected((prev: string[]) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };
  
    return (
      <div className={styles.container}>
        <TextBox title="멘토링 피드백" desc="Choose your interests." />
        <h2>Your project is finished.</h2>
        <p className={styles.feedbackDescription}>How would you rate the prototyping kit?</p>
        <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={28}
              color={index < rating ? "#A0D468" : "#e4e5e9"}
              onClick={() => setRating(index + 1)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
  
        <h3>What did you like about it?</h3>
        <div className={styles.buttonGroup}>
          {["EASY TO USE", "COMPLETE", "HELPFUL", "CONVENIENT", "LOOKS GOOD"].map((item) => (
            <SelectableButton
              key={item}
              title={item}
              onSelect={() => toggleSelection(item, setSelectedLikes)}
              isSelected={selectedLikes.includes(item)}
            />
          ))}
        </div>
  
        <h3>What could be improved?</h3>
        <div className={styles.buttonGroup}>
          {["COULD HAVE MORE COMPONENTS", "COMPLEX", "NOT INTERACTIVE", "ONLY ENGLISH"].map((item) => (
            <SelectableButton
              key={item}
              title={item}
              onSelect={() => toggleSelection(item, setSelectedImprovements)}
              isSelected={selectedImprovements.includes(item)}
            />
          ))}
        </div>
  
        <TextareaBox
          title="Anything else?"
          placeholder="Tell us everything."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        
        <Button title="Submit" variant="dark" onClick={function (): void {} } />
      </div>
    );
  };
  
  export default MentoringFeedbackPage;