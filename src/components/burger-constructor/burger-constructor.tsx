import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerConstructor: FC = () => {
  const selectedIngredients = useSelector(
    (state: RootState) => state.getIngredients.selected
  );

  const selectedBun = selectedIngredients.bun
    ? ({ ...selectedIngredients.bun } as TConstructorIngredient)
    : null;

  const selectedFilling = Array.isArray(selectedIngredients.filling)
    ? (selectedIngredients.filling.map((ingredients) => ({
        ...ingredients
      })) as TConstructorIngredient[])
    : [];

  if (selectedBun) {
    selectedBun.id = nanoid();
  }

  selectedFilling.forEach((ingredient) => (ingredient.id = nanoid()));

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedFilling
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};