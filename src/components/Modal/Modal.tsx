'use client';
import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import Image from 'next/image';
import CloseIcon from '@/assets/icons/close.svg';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
}

export const Modal: FC<ModalProps> = ({ children, onClose, isOpen }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) {
        return null;
    }

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button 
                    type="button" 
                    className={styles.closeButton} 
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                >
                    <Image src={CloseIcon} alt="Закрыть" width={20} height={20} />
                </button>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};