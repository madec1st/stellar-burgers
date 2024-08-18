import { useSelector } from '@store';
import { Preloader } from '@ui';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  authRequired: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  authRequired
}) => {
  const isAuth = useSelector((state) => state.user.isAuth);

  if (isAuth === null) {
    return <Preloader />;
  }

  if (authRequired && isAuth === false) {
    return <Navigate to={'/login'} replace />;
  }

  if (!authRequired && isAuth === true) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
