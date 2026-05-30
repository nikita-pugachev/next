"use client";
import styles from "./login.module.scss";
import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";
import Image from "next/image";
import Show from "@/assets/icons/eye.svg";
import Hide from "@/assets/icons/eye-slash.svg";
import { createClient } from "@/utils/supabase/client"; // Укажите правильный путь
import { useRouter } from "next/navigation";

export default function Page() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        setError("Неверный email или пароль");
        setLoading(false);
        return;
    }

    router.push("/")
    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Войти в аккаунт</h2>
        <Input
          className={styles.inputForm}
          label="Электронная почта"
          aria-label="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          required
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
          icon={<Image src={show ? Show : Hide} alt="глаз" />}
          required
          value={password}
        />
        <Button
          className={styles.buttonSubmit}
          type="submit"
        >
          Войти
        </Button>
        {error ? <p className={styles.error}>Неверный email или пароль</p> : null}
        <Link href="/register" className={styles.link}>
          <span>Нет аккаунта? Зарегистрироваться</span>
        </Link>
      </form>
    </div>
  );
}
