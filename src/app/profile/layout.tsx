'use client';
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import styles from './profile.module.scss';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { Button } from '@/components/ui/Button/Button';
import Image from 'next/image';
import arrowLeft from '@/assets/icons/arrow-left.svg';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className={styles.loader}>Загрузка...</div>;
    }

    if (!user) {
        return null;
    }

    const isActive = (path: string) => pathname === path;

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <button 
                    type="button" 
                    className={styles.backButton}
                    onClick={() => router.push('/')}
                >
                    <Image src={arrowLeft} alt="Назад" width={16} height={16} />
                    <span>На главную</span>
                </button>

                <div className={styles.avatarSection}>
                    <Avatar src={user.user_metadata?.avatar_url} size="lg" />
                    <h2 className={styles.profileName}>{user.user_metadata?.name || 'Пользователь'}</h2>
                    <p className={styles.profileEmail}>{user.email}</p>
                </div>
                
                <nav className={styles.navigation}>
                    <Button 
                        variant="secondary" 
                        onClick={() => router.push('/profile/favorite')}
                        disabled={isActive('/profile/favorite')}
                    >
                        Избранное
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => router.push('/profile/recipes')}
                        disabled={isActive('/profile/recipes')}
                    >
                        Мои записи
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => router.push('/profile')}
                        disabled={isActive('/profile')}
                    >
                        Профиль
                    </Button>
                </nav>
            </aside>

            <main className={styles.contentArea}>
                {children}
            </main>
        </div>
    );
}
