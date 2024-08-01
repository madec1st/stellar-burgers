import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const handleClickConstructor = () => {
    navigate('/');
  };

  const handleClickFeed = () => {
    navigate('/feed');
  };

  const handleClickProfile = () => {
    isAuth ? navigate('/profile') : navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.menu} p-4`}>
          <div className={styles.menu_part_left}>
            <>
              <BurgerIcon type={'primary'} onClick={handleClickConstructor} />
              <p
                className='text text_type_main-default ml-2 mr-10'
                onClick={handleClickConstructor}
              >
                Конструктор
              </p>
            </>
            <>
              <ListIcon type={'primary'} onClick={handleClickFeed} />
              <p
                className='text text_type_main-default ml-2'
                onClick={handleClickFeed}
              >
                Лента заказов
              </p>
            </>
          </div>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
          <div
            className={styles.link_position_last}
            onClick={handleClickProfile}
          >
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        </nav>
      </header>
    </>
  );
};
