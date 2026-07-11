import styles from "./FileInput.module.scss";
import { forwardRef, InputHTMLAttributes, useState, useRef } from "react";
import Image from "next/image";
import closeIcon from "@/assets/icons/close.svg";

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  id: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, label = "Выбрать файл", className, onChange, ...props }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const localInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFileName(files[0].name);
      } else {
        setFileName(null);
      }
      onChange?.(e);
    };

    const handleClearFile = (e: React.MouseEvent) => {
      e.preventDefault(); // Предотвращаем открытие окна проводника
      if (localInputRef.current) {
        localInputRef.current.value = ""; // Сбрасываем значение инпута
        setFileName(null);

        // Имитируем событие изменения для оповещения внешних форм
        const event = {
          target: localInputRef.current,
          currentTarget: localInputRef.current
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(event);
      }
    };

    return (
      <div className={styles.fileInputWrapper}>
        <input
          ref={(node) => {
            localInputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as any).current = node;
          }}
          type="file"
          id={id}
          className={styles.hiddenInput}
          onChange={handleFileChange}
          {...props}
        />

        {!fileName ? (
          <label htmlFor={id} className={`${styles.customButton} ${className ?? ""}`}>
            {label}
          </label>
        ) : (
          <div className={styles.fileDetails}>
            <span className={styles.fileName} title={fileName}>
              {fileName}
            </span>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearFile}
              aria-label="Удалить файл"
            >
              <Image src={closeIcon} alt="удалить" width={12} height={12} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";