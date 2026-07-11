'use client'
import styles from './CreatePost.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { TextArea } from '@/components/ui/TextArea/TextArea';
import { FileInput } from '@/components/ui/FileInput/FileInput';
import { useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/assets/icons/close.svg';

export const CreatePost = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');

    const handleAddIngredient = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newIngredient.trim();
        if (trimmed) {
            setIngredients([...ingredients, trimmed]);
            setNewIngredient('');
            setIsAdding(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddIngredient(e);
        }
    };

    const handleRemoveIngredient = (indexToRemove: number) => {
        setIngredients(ingredients.filter((item, index) => index !== indexToRemove));
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <h3 className={styles.sectionTitle}>Название блюда</h3>
                    <Input type='text' id='title' name='title' placeholder='Введите название блюда' />
                </div>
                
                <div className={styles.formGroup}>
                    <h3 className={styles.sectionTitle}>Фотография блюда</h3>
                    <FileInput id='file' label='Загрузить фото' accept='image/*' />
                </div>

                <div className={styles.formGroup}>
                    <h3 className={styles.sectionTitle}>Ингредиенты</h3>
                    <div className={styles.ingredientsList}>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className={styles.ingredientBadge}>
                                <span>{ingredient}</span>
                                <button 
                                    type="button" 
                                    className={styles.removeBadgeButton}
                                    onClick={() => handleRemoveIngredient(index)}
                                    aria-label="Удалить ингредиент"
                                >
                                    <Image src={closeIcon} alt="удалить" width={12} height={12} />
                                </button>
                            </div>
                        ))}
                        
                        {isAdding ? (
                            <div className={styles.addIngredientInputWrapper}>
                                <Input 
                                    type='text' 
                                    id='new-ingredient' 
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder='Например, 2 яйца (Enter)'
                                    autoFocus
                                />
                                <Button 
                                    type="button" 
                                    variant="main" 
                                    onClick={handleAddIngredient}
                                    className={styles.addConfirmButton}
                                >
                                    ОК
                                </Button>
                            </div>
                        ) : (
                            <button 
                                type="button" 
                                className={styles.addBadgeButton}
                                onClick={() => setIsAdding(true)}
                            >
                                + Добавить ингредиент
                            </button>
                        )}
                    </div>
                </div>
                
                <div className={styles.formGroup}>
                    <h3 className={styles.sectionTitle}>Описание</h3>
                    <TextArea id='description' placeholder='Опишите рецепт приготовления...' rows={6} />
                </div>
                
                <div className={styles.buttonGroup}>
                    <Button type='reset' variant='secondary' className={styles.button}>Сбросить</Button>
                    <Button type='submit' variant='main' className={styles.button}>Создать</Button>
                </div>
            </form>
        </div>
    );
};