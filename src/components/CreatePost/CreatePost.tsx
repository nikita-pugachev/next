'use client';
import styles from './CreatePost.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { TextArea } from '@/components/ui/TextArea/TextArea';
import { FileInput } from '@/components/ui/FileInput/FileInput';
import { useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/assets/icons/close.svg';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface CreatePostProps {
  onClose?: () => void;
}

export const CreatePost = ({ onClose }: CreatePostProps) => {
    const { user } = useAuth();
    const supabase = createClient();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [fileInputKey, setFileInputKey] = useState(0);

    const [isAdding, setIsAdding] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
        } else {
            setImageFile(null);
        }
    };

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
        setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    };

    const handleReset = () => {
        setTitle('');
        setDescription('');
        setIngredients([]);
        setImageFile(null);
        setFileInputKey(prev => prev + 1); // Сбрасываем FileInput
        setMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setMessage({ type: 'error', text: 'Войдите в аккаунт, чтобы опубликовать рецепт' });
            return;
        }

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedDescription) {
            setMessage({ type: 'error', text: 'Пожалуйста, заполните название и описание блюда' });
            return;
        }

        if (ingredients.length === 0) {
            setMessage({ type: 'error', text: 'Добавьте хотя бы один ингредиент' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            let imageUrl = null;

            // 1. Загрузка фотографии блюда в Storage
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `recipe_${Date.now()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('recipe-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw new Error('Не удалось загрузить фото блюда: ' + uploadError.message);

                const { data: { publicUrl } } = supabase.storage
                    .from('recipe-images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // 2. Запись в таблицу recipes в Supabase
            const { error: insertError } = await supabase
                .from('recipes')
                .insert({
                    title: trimmedTitle,
                    description: trimmedDescription,
                    ingredients,
                    image_url: imageUrl,
                    author_id: user.id
                });

            if (insertError) throw insertError;

            // 3. Успешный сброс и закрытие модалки
            setMessage({ type: 'success', text: 'Рецепт успешно опубликован!' });
            handleReset();

            if (onClose) {
                setTimeout(onClose, 1000); // Закрываем модальное окно через 1 секунду, чтобы пользователь увидел сообщение
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Ошибка при публикации рецепта' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            {message && (
                <div className={`${styles.messageAlert} ${message.type === 'success' ? styles.successAlert : styles.errorAlert}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <h3 className={styles.sectionTitle}>Название блюда</h3>
                    <Input 
                        type='text' 
                        id='title' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Введите название блюда' 
                        required
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <h3 className={styles.sectionTitle}>Фотография блюда</h3>
                    <FileInput 
                        key={fileInputKey}
                        id='file' 
                        label='Загрузить фото' 
                        accept='image/*' 
                        onChange={handleFileChange}
                    />
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
                    <TextArea 
                        id='description' 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Опишите рецепт приготовления...' 
                        rows={6} 
                        required
                    />
                </div>
                
                <div className={styles.buttonGroup}>
                    <Button type='button' variant='secondary' className={styles.button} onClick={handleReset} disabled={loading}>
                        Сбросить
                    </Button>
                    <Button type='submit' variant='main' className={styles.button} disabled={loading}>
                        {loading ? 'Публикация...' : 'Создать'}
                    </Button>
                </div>
            </form>
        </div>
    );
};