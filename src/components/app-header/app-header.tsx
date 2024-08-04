import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.user.user?.user.name);
  const isAuth = useSelector((state) => state.user.isAuth);

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
