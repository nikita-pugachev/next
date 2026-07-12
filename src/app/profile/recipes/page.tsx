'use client';
import styles from '../subpage.module.scss';

export default function RecipesPage() {
    return (
        <div>
            <h1 className={styles.title}>
                Мои записи
            </h1>
            <p className={styles.description}>
                Здесь будут отображаться рецепты, которые вы опубликовали.
            </p>
        </div>
    );
}
