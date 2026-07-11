"use client";
import styles from "./Search.module.scss";
import { Input } from "@/components/ui/Input/Input";
import { FC, useState } from "react";
import Image from "next/image";
import closeIcon from "@/assets/icons/close.svg";
import searchIcon from "@/assets/icons/search-icon.svg";

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ value = "", onChange }) => {
  const [state, setState] = useState<string>(value);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setState(val);
    onChange?.(val);
  };

  const handleClear = () => {
    setState("");
    onChange?.("");
  };

  return (
    <Input
      value={state}
      aria-label="Поиск"
      onChange={handleTextChange}
      onClick={handleClear}
      className={styles.searchInput}
      icon={
        state && <Image className={styles.icon} src={closeIcon} alt='close' />
      }
      categoryIcon={ <Image src={searchIcon} alt='search'/>}
    />
  );
};
