import styles from "./TextArea.module.scss";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
      <div className={styles.textAreaWrapper}>
        {label && id && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}

        <div className={styles.textAreaContainer}>
          <textarea
            ref={ref}
            id={id}
            className={`${styles.textarea} ${className ?? ""}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";