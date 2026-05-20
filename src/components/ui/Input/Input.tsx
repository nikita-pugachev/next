'use client'
import styles from "./Input.module.scss";
import { FC, useState } from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: "text" | "email" | "password" | "name";
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const Input: FC<InputProps> = ({
  id,
  type = "text",
  label,
  error,
  hint,
  icon,
  className,
  onClick,
  ...props
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${className}`}
          id={id}
          type={type}
          {...props}
        />
        {icon && <button onClick={onClick} className={styles.iconContainer}>{icon}</button>}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};
