import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { addBun, addFilling } from '@slices/ingredients/Ingredients';
import { useDispatch } from '@store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      const ingredientWithId = { ...ingredient, id: nanoid() };

      ingredient.type === 'bun'
        ? dispatch(addBun(ingredientWithId))
        : dispatch(addFilling(ingredientWithId));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
