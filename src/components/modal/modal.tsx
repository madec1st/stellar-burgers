import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderInfo } from '../order-info';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const onCloseModal = () => {
    onClose && onClose();
    navigate(location.state?.background || '/');
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onCloseModal}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
