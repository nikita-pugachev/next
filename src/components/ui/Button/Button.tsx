'use client'
import styles from "./Button.module.scss";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'children'> {
  variant?: 'main' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'main', onClick, children, disabled = false, type = 'button', className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
