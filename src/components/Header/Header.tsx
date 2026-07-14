"use client";
import styles from "./Header.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Search } from "@/components/ui/Search/Search";
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/assets/icons/logo_icon.jpg";
import LogoutIcon from "@/assets/icons/logout.svg";
import AddIcon from "@/assets/icons/add.svg";
import UserIcon from "@/assets/icons/user-icon.svg";

interface HeaderProps {
  onCreatePost?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export const Header = ({ onCreatePost, searchQuery = "", onSearchChange }: HeaderProps) => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = () => setDropdownOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={LogoIcon} alt="RecipeShare Logo" width={32} height={32} className={styles.logoImage} />
        <span className={styles.logoText}>RecipeShare</span>
      </Link>

      <div className={styles.searchContainer}>
        <Search value={searchQuery} onChange={onSearchChange} />
      </div>

      {user ? (
        <div className={styles.profileWrapper}>
          <button 
            type="button" 
            className={styles.userBadge}
            onClick={toggleDropdown}
          >
            <Avatar src={user.user_metadata?.avatar_url} size="sm"/>
            <span className={styles.username}>{user.user_metadata?.name}</span>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link 
                href="/profile" 
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                <span>Личный кабинет</span>
                <Image src={UserIcon} alt="Кабинет" width={18} height={18} />
              </Link>

              <button 
                type="button" 
                className={styles.dropdownItem}
                onClick={(e) => {
                  setDropdownOpen(false);
                  onCreatePost?.();
                }}
              >
                <span>Поделиться рецептом</span>
                <Image src={AddIcon} alt="Добавить" width={18} height={18} className={styles.plusIcon} />
              </button>
              
              <button 
                type="button" 
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={() => {
                  setDropdownOpen(false);
                  signOut();
                }}
              >
                <span>Выйти</span>
                <Image src={LogoutIcon} alt="Выйти" width={18} height={18} className={styles.logoutIcon} />
              </button>
            </div>
          )}
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
