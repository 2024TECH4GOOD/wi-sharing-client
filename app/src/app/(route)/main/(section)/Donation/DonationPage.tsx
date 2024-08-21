import React, { useState } from "react";
import styles from "./donation.module.css";
import SelectableButton from "@/app/_components/SelectableButton";
import TextareaBox from "@/app/_components/TextareaBox";

const DonationPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<string>();
  const [message, setMessage] = useState("");

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
      <label className={styles.label}>후원 분야</label>
      <div className={styles.buttonGroup}>
        {["EASY TO USE", "COMPLETE", "HELPFUL", "CONVENIENT", "LOOKS GOOD"].map((item) => (
          <SelectableButton
            key={item}
            title={item}
            onSelect={() => toggleSelection(item, setSelectedInterests)}
            isSelected={selectedInterests.includes(item)}
          />
        ))}
      </div>

      <label className={styles.label}>기부 금액</label>
      <div className={styles.buttonGroup}>
        {["10,000", "20,000", "30,000", "50,000"].map((item) => (
          <SelectableButton
            key={item}
            title={item}
            onSelect={() => setSelectedAmount(item)}
            isSelected={selectedAmount === item}
          />
        ))}
      </div>

      <TextareaBox
        title="따뜻한 말 한마디"
        placeholder="Tell us everything."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

    </div>
  );
};

export default DonationPage;
