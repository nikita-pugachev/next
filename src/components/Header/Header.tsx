"use client";
import styles from "./Header.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Search } from "@/components/ui/Search/Search";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import Logout from "@/assets/icons/logout.svg"

export const Header = () => {
  const {user, loading, signOut} = useAuth();

  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      {user ? (
        <div className={styles.profileContainer}>
          <Link href='/profile' className={styles.profileLink}>
            <span>{user.user_metadata?.name}</span>
          </Link>
          <button onClick={signOut} className={styles.logout}>
            <Image src={Logout} alt='выход'/>
          </button>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          <Button onClick={handleLogin}>Войти</Button>
          <Button variant="secondary" onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </div>
      )}
    </header>
  );
};
