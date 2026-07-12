"use client";
import styles from "./Header.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Search } from "@/components/ui/Search/Search";
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/assets/icons/logo_icon.jpg";
import LogoutIcon from "@/assets/icons/logout.svg";
import AddIcon from "@/assets/icons/add.svg";

interface HeaderProps {
  onCreatePost?: () => void;
}

export const Header = ({ onCreatePost }: HeaderProps) => {
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
      <Link href="/" className={styles.logo}>
        <Image src={LogoIcon} alt="RecipeShare Logo" width={32} height={32} className={styles.logoImage} />
        <span className={styles.logoText}>RecipeShare</span>
      </Link>

      <div className={styles.searchContainer}>
        <Search />
      </div>

      {user ? (
        <div className={styles.profileWrapper}>
          <Link href='/profile' className={styles.userBadge}>
            <Avatar src={user.user_metadata?.avatar_url} size="sm"/>
            <span className={styles.username}>{user.user_metadata?.name}</span>
          </Link>

          <div className={styles.dropdownMenu}>
            <button 
              type="button" 
              className={styles.dropdownItem}
              onClick={onCreatePost}
            >
              <span>Поделиться рецептом</span>
              <Image src={AddIcon} alt="Добавить" width={18} height={18} className={styles.plusIcon} />
            </button>
            
            <button 
              type="button" 
              className={`${styles.dropdownItem} ${styles.logoutItem}`}
              onClick={signOut}
            >
              <span>Выйти</span>
              <Image src={LogoutIcon} alt="Выйти" width={18} height={18} className={styles.logoutIcon} />
            </button>
          </div>
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
