import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { fetchIngredientsThunk } from '@slices/ingredients/Ingredients';
import { useParams } from 'react-router-dom';
import { feedApiThunk } from '@slices/feed/Feed';
import { getUserOrdersThunk } from '@slices/user/User';

type TParams = {
  number: string;
};

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number: numOrder } = useParams<TParams>();

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
    dispatch(feedApiThunk());
  }, [dispatch]);

  const orders = useSelector((state) => state.feed.orders);
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.data
  );

  const orderData = useMemo(() => {
    const order = orders.find((order) => order.number === Number(numOrder));
    return order;
  }, [orders, numOrder]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
