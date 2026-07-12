'use client';
import { useState } from 'react';
import styles from '@/app/app.module.scss';
import { Header } from '@/components/Header/Header';
import { Modal } from '@/components/Modal/Modal';
import { CreatePost } from '@/components/CreatePost/CreatePost';
import { Button } from '@/components/ui/Button/Button';

export default function Page() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <>
            <Header onCreatePost={() => setIsCreateOpen(true)} />
            
            <main className={styles.feedContainer}>
            </main>

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <CreatePost onClose={() => setIsCreateOpen(false)} />
            </Modal>
        </>
    );
}