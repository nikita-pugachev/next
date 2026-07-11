'use client';
import styles from './profile.module.scss';
import { useAuth } from "@/hooks/useAuth";
import { Button } from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <main className={styles.main}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Привет, {user.user_metadata?.name || 'Пользователь'}!</h2>
                <p>{user.email}</p>
            </div>
            <div className={styles.navigate}>
                <Button variant='main' onClick={() => {}}>Избранное</Button>
                <Button variant='main' onClick={() => {}}>Мои записи</Button>
                <Button variant='main' onClick={() => {}}>Профиль</Button>
            </div>
        </main>
    );
}