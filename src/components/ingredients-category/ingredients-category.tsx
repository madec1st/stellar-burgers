import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const selectedIngredients = useSelector(
    (state: RootState) => state.ingredients.selected
  );

  const selectedBun = selectedIngredients.bun;
  const selectedFilling = selectedIngredients.filling;

  const burgerConstructor = {
    bun: selectedBun,
    filling: selectedFilling
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, filling } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    filling.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) {
        counters[ingredient._id] = 0;
      }

      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
