import { RootState } from '@store';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  authRequired: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  authRequired
}) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  if (authRequired && isAuth === false) {
    return <Navigate to={'/login'} replace />;
  }

  if (!authRequired && isAuth === true) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
