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
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />}>
            <Route path='ingredients/:id' />
          </Route>
          <Route path='/feed' element={<Feed />}>
            <Route path=':number' />
          </Route>
          <Route
            path='/login'
            element={
              <ProtectedRoute authRequired={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute authRequired={false}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute authRequired={false}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute authRequired={false}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute authRequired>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route path='orders' element={<ProfileOrders />}>
              <Route path=':number' />
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
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
            path='/profile/orders/:number'
            element={
              <ProtectedRoute authRequired>
                <Modal title='Информация о заказе' onClose={close}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
