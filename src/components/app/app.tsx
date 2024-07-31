import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Modal, OrderInfo, IngredientDetails } from '@components';

import { AppHeader } from '@components';
import { Provider } from 'react-redux';
import store from '@store';

const App = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ConstructorPage />}>
            <Route path='ingredients/:id' />
          </Route>
          <Route path='/feed' element={<Feed />}>
            <Route path=':number' />
          </Route>
          <Route path='/login' element={<Login />} /> {/* защищённый */}
          <Route path='/register' element={<Register />} /> {/* защищённый */}
          <Route path='/forgot-password' element={<ForgotPassword />} />{' '}
          {/* защищённый */}
          <Route path='/reset-password' element={<ResetPassword />} />{' '}
          {/* защищённый */}
          <Route path='/profile' element={<Profile />}>
            {' '}
            {/* защищённый */}
            <Route path='orders' element={<ProfileOrders />}>
              {' '}
              {/* защищённый */}
              <Route path=':number' /> {/* защищённый */}
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
          <Route path='' />
          <Route path='' />
          <Route path='' />
          <Route path='' />
          <Route path='' />
          <Route path='' />
          <Route path='' />
        </Routes>
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={close}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={close}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/orders/:number'
            element={
              <Modal title='Информация о заказе' onClose={close}>
                <OrderInfo />
              </Modal>
            }
          />{' '}
          {/* защищённый */}
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
