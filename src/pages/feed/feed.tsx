import { feedApiThunk } from '@slices/Feed';
import { AppDispatch, RootState } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);

  const loadFeeds = useCallback(() => {
    dispatch(feedApiThunk());
  }, [dispatch]);

  useEffect(() => {
    loadFeeds();
  }, [loadFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={loadFeeds} />;
};
