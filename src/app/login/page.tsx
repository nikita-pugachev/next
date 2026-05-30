'use client'
import styles from './login.module.scss';
import {useState} from 'react';
import {Input} from '@/components/ui/Input/Input';
import {Button} from '@/components/ui/Button/Button';
import Link from 'next/link';
import Image from 'next/image';
import Show from '@/assets/icons/eye.svg';
import Hide from '@/assets/icons/eye-slash.svg';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className={styles.loginPage}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Войти в аккаунт</h2>
                <Input className={styles.inputForm} label='Электронная почта' aria-label='email' onChange={(e) => setEmail(e.target.value)} type='email' id='email'/>
                <Input className={styles.inputForm} label='Пароль' aria-label='password' type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} onClick={() => setShow(!show)} id='password' icon={<Image src={show ? Show : Hide} alt='глаз'/>}/>
                <Button className={styles.buttonSubmit} type='submit' onClick={() => {}}>Войти</Button>
                <Link href='/register' className={styles.link}>
                    <span>Нет аккаунта? Зарегистрироваться</span>
                </Link>
            </form>
        </div>
    );
}