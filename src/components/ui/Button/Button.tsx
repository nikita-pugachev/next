'use client'
import styles from "./Button.module.scss";
import { FC } from "react";

interface ButtonProps {
  variant?: 'main' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: FC<ButtonProps> = ({variant='main', onClick, children, disabled=false, type='button', className}) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`${styles.button} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};
