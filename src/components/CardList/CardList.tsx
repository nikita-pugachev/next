'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CardPost } from '../CardPost/CardPost';
import { Modal } from '@/components/Modal/Modal';
import { PostInfo } from '@/components/PostInfo/PostInfo';
import styles from './CardList.module.scss';

interface CardListProps {
    searchQuery?: string;
    refreshTrigger?: number;
}

export const CardList = ({ searchQuery = "", refreshTrigger = 0 }: CardListProps) => {
    const { user } = useAuth();
    const supabase = createClient();
    
    const [recipes, setRecipes] = useState<any[]>([]);
    const [likedRecipeIds, setLikedRecipeIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('recipes_with_details')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            const fetchedRecipes = data || [];
            setRecipes(fetchedRecipes);

            const params = new URLSearchParams(window.location.search);
            const urlRecipeId = params.get('recipeId');
            if (urlRecipeId) {
                const matched = fetchedRecipes.find(recipe => recipe.id === urlRecipeId);
                if (matched) {
                    setSelectedRecipe(matched);
                }
            }

            if (user) {
                const { data: likes, error: likesError } = await supabase
                    .from('likes')
                    .select('recipe_id')
                    .eq('user_id', user.id);

                if (likesError) throw likesError;
                const likedIds = new Set(likes?.map(like => like.recipe_id) || []);
                setLikedRecipeIds(likedIds);
            }
        } catch (err) {
            console.error('Ошибка при загрузке рецептов:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [user, refreshTrigger]);


    const handleLikeToggle = async (recipeId: string) => {
        if (!user) {
            alert('Войдите в аккаунт, чтобы ставить лайки!');
            return;
        }

        const isAlreadyLiked = likedRecipeIds.has(recipeId);

        try {
            if (isAlreadyLiked) {
                const { error } = await supabase
                    .from('likes')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('recipe_id', recipeId);

                if (error) throw error;

                likedRecipeIds.delete(recipeId);
                setLikedRecipeIds(new Set(likedRecipeIds));
                setRecipes(prev => prev.map(r => 
                    r.id === recipeId ? { ...r, likes_count: Math.max(0, r.likes_count - 1) } : r
                ));
            } else {
                const { error } = await supabase
                    .from('likes')
                    .insert({
                        user_id: user.id,
                        recipe_id: recipeId
                    });

                if (error) throw error;

                likedRecipeIds.add(recipeId);
                setLikedRecipeIds(new Set(likedRecipeIds));
                setRecipes(prev => prev.map(r => 
                    r.id === recipeId ? { ...r, likes_count: r.likes_count + 1 } : r
                ));
            }
        } catch (err) {
            console.error('Ошибка при переключении лайка:', err);
        }
    };

    const handleDetailsClick = (recipe: any) => {
        setSelectedRecipe(recipe);
        const newUrl = `${window.location.pathname}?recipeId=${recipe.id}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const handleCloseDetails = () => {
        setSelectedRecipe(null);
        const cleanUrl = window.location.pathname;
        window.history.pushState({ path: cleanUrl }, '', cleanUrl);
    };

    const getSortedRecipes = () => {
        if (!searchQuery.trim()) {
            return recipes;
        }
        
        const query = searchQuery.toLowerCase().trim();
        
        return [...recipes].sort((a, b) => {
            const aMatches = a.title.toLowerCase().includes(query);
            const bMatches = b.title.toLowerCase().includes(query);
            
            if (aMatches && !bMatches) return -1;
            if (!aMatches && bMatches) return 1;
            return 0;
        });
    };

    if (loading) {
        return <div className={styles.loader}>Загрузка рецептов...</div>;
    }

    if (recipes.length === 0) {
        return <div className={styles.empty}>Рецептов пока нет. Будьте первыми, кто поделится!</div>;
    }

    const sortedRecipes = getSortedRecipes();

    return (
        <>
            <div className={styles.grid}>
                {sortedRecipes.map(recipe => (
                    <CardPost 
                        key={recipe.id}
                        recipe={recipe}
                        isLiked={likedRecipeIds.has(recipe.id)}
                        onLikeToggle={handleLikeToggle}
                        onDetailsClick={handleDetailsClick}
                    />
                ))}
            </div>

            <Modal isOpen={!!selectedRecipe} onClose={handleCloseDetails}>
                {selectedRecipe && (
                    <PostInfo recipe={selectedRecipe} onClose={handleCloseDetails} />
                )}
            </Modal>
        </>
    );
};
