import React from "react";
import styles from "../onboarding.module.css";

interface RoleComponentProps {
  setRole: React.Dispatch<React.SetStateAction<"Youth" | "Senior" | null>>;
}

const RoleComponent = ({ setRole }: RoleComponentProps) => {
  return (
    <div>
      <button className={styles.roleButton} onClick={() => setRole("Youth")}>Youth</button>
      <button className={styles.roleButton} onClick={() => setRole("Senior")}>Senior</button>
    </div>
  );
};

export default RoleComponent;
