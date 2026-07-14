'use client';
import { useState } from 'react';
import styles from '@/app/app.module.scss';
import { Header } from '@/components/Header/Header';
import { Modal } from '@/components/Modal/Modal';
import { CreatePost } from '@/components/CreatePost/CreatePost';
import { CardList } from '@/components/CardList/CardList';

export default function Page() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <>
            <Header 
                onCreatePost={() => setIsCreateOpen(true)} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            
            <main className={styles.feedContainer}>
                <CardList searchQuery={searchQuery} refreshTrigger={refreshTrigger} />
            </main>

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <CreatePost onClose={() => setIsCreateOpen(false)} onSuccess={handleRefresh} />
            </Modal>
        </>
    );
}