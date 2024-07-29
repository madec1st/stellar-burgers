import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const ingredients = useSelector(
      (state: RootState) => state.getIngredients.selected
    );
    const selectedFilling = ingredients.filling;

    const handleMoveDown = () => {
      index++;
    };

    const handleMoveUp = () => {
      index--;
    };

    const handleClose = () => {
      selectedFilling.filter((item) => item._id !== ingredient._id);
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
