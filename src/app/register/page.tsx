"use client";
import styles from "./register.module.scss";
import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";
import Image from "next/image";
import Show from "@/assets/icons/eye.svg";
import Hide from "@/assets/icons/eye-slash.svg";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    setLoading(false);
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
          required
        />
        <Input
          className={styles.inputForm}
          label="Электронная почта"
          aria-label="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          value={email}
          required
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
          required
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