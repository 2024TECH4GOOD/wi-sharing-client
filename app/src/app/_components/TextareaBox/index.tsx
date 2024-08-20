import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import styles from './TextareaBox.module.css'; 

interface TextareaBoxProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  maxRows?: number; 
}

const TextareaBox: React.FC<TextareaBoxProps> = ({
    title,
    placeholder,
    value,
    onChange,
    maxRows = 5,
  }) => {
    return (
      <div className={styles.textareaBox}>
        <label className={styles.label}>{title}</label>
        <TextareaAutosize
          maxRows={maxRows}
          minRows={3}  
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.textarea}
        />
      </div>
    );
  };
  

export default TextareaBox;
