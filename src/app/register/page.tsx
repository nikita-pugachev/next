"use client";
import styles from "./register.module.scss";
import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";
import Image from "next/image";
import Show from "@/assets/icons/eye.svg";
import Hide from "@/assets/icons/eye-slash.svg";

export default function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Зарегистрироваться</h2>
        <Input
          className={styles.inputForm}
          label="Имя"
          aria-label="name"
          onChange={(e) => setName(e.target.value)}
          type="name"
          id="name"
          value={name}
        />
        <Input
          className={styles.inputForm}
          label="Электронная почта"
          aria-label="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          value={email}
        />
        <Input
          className={styles.inputForm}
          label="Пароль"
          aria-label="password"
          type={show ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShow(!show)}
          id="password"
          hint="Не менее 8-ми символов"
          icon={<Image src={show ? Show : Hide} alt="глаз" />}
          value={password}
        />
        <Button
          className={styles.buttonSubmit}
          type="submit"
          onClick={() => {}}
        >
          Зарегистрироваться
        </Button>
        <Link href="/login" className={styles.link}>
          <span>Уже есть аккаунт? Войти</span>
        </Link>
      </form>
    </div>
  );
}