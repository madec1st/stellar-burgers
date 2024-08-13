import { getUserOrdersThunk } from '@slices/user/User';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.user.usersOrders);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
