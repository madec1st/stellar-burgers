import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { closeModal, orderBurgerThunk } from '@slices/Order';
import { clearConstructor } from '@slices/Ingredients';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const selectedIngredients = useSelector(
    (state: RootState) => state.ingredients.selected
  );
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );

  const selectedBun = selectedIngredients.bun;
  const selectedFilling = selectedIngredients.filling;

  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedFilling
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (isAuth === false) {
      navigate('/login');
    } else {
      const ingredientsId = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ];

      dispatch(orderBurgerThunk(ingredientsId))
        .then((res) => {
          dispatch(clearConstructor());
          return res; //добавить в историю заказов?
        })
        .catch((err) => console.log(err));
    }
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

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
