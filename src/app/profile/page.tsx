'use client';
import styles from './profile.module.scss';
import { useAuth } from "@/hooks/useAuth";
import { Button } from '@/components/ui/Button/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Page() {
    const pathname = usePathname();
    const router = useRouter();
    const {user, loading, signOut} = useAuth();

    const profileRef = useRef<HTMLButtonElement>(null);
    const favoriteRef = useRef<HTMLButtonElement>(null);
    const mrecipesRef = useRef<HTMLButtonElement>(null);

    return (
        <main className={styles.main}>
            <div className={styles.navigate}>
                    <Button variant='main' ref={favoriteRef} onClick={() => {}}>Избранное</Button>
                    <Button variant='main' ref={mrecipesRef} onClick={() => {}}>Мои записи</Button>
                    <Button variant='main' ref={profileRef} onClick={() => {}}>Профиль</Button>
            </div>
        </main>
    );
}