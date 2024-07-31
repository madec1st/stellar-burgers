import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const AppHeader: FC = () => {
  const userName = useSelector(
    (state: RootState) => state.user.user?.user.name
  );
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return (
    <>
      {isAuth === false ? (
        <AppHeaderUI userName='' />
      ) : (
        <AppHeaderUI userName={userName} />
      )}
    </>
  );
};
