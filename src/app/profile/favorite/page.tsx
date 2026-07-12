'use client';
import styles from '../subpage.module.scss';

export default function FavoritePage() {
    return (
        <div>
            <h1 className={styles.title}>
                Избранные рецепты
            </h1>
            <p className={styles.description}>
                Здесь будут отображаться рецепты, которые вы добавили в избранное.
            </p>
        </div>
    );
}
