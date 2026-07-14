import styles from "./PostInfo.module.scss";
import { FC } from "react";
import Image from "next/image";
import { Avatar } from "../ui/Avatar/Avatar";
import logoIcon from "@/assets/icons/logo_icon.jpg";

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  image_url?: string | null;
  author_id: string;
  author_name?: string;
  author_avatar?: string | null;
}

interface PostInfoProps {
  recipe: Recipe;
  onClose?: () => void;
}

export const PostInfo: FC<PostInfoProps> = ({ recipe }) => {
  const recipeImageSrc = recipe.image_url || logoIcon;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar src={recipe.author_avatar} size="md" />
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{recipe.author_name || "Анонимный автор"}</span>
          <span className={styles.subtext}>Автор рецепта</span>
        </div>
      </div>

      <h2 className={styles.title}>{recipe.title}</h2>

      <div className={styles.imageWrapper}>
        <Image
          src={recipeImageSrc}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.recipeImage}
        />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Ингредиенты</h3>
        <div className={styles.ingredientsList}>
          {recipe.ingredients?.map((ingredient, index) => (
            <span key={index} className={styles.ingredientBadge}>
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Способ приготовления</h3>
        <p className={styles.description}>{recipe.description}</p>
      </div>
    </div>
  );
};
