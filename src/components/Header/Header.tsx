"use client";
import styles from "./Header.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Search } from "@/components/ui/Search/Search";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <header className={styles.header}>
      <Search />
      <div className={styles.buttonContainer}>
        <Button onClick={handleLogin}>Войти</Button>
        <Button variant="secondary" onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </div>
    </header>
  );
};
