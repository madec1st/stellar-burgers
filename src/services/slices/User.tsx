import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TUserState = {
  user: TUserResponse | null;
  usersOrders: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isAuth: boolean;
  error: string | null;
};

type TUpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
};

const initialState: TUserState = {
  user: null,
  usersOrders: [],
  status: 'idle',
  isAuth: false,
  error: null
};

export const registerUserThunk = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    return response;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const loginUserThunk = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('user/login', async (loginData: TLoginData, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(loginData);
    return response;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const getUserDataThunk = createAsyncThunk<
  TUserResponse,
  void,
  { rejectValue: string }
>('user/getUserData', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserApi();
    return response;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const updateUserDataThunk = createAsyncThunk<
  TUserResponse,
  TUpdateUserData,
  { rejectValue: string }
>('user/update', async (data, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(data);
    return response;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const getUserOrdersThunk = createAsyncThunk(
  'user/orders',
  async (_, thunkAPI) => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.usersOrders = [];
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.error = action.payload as string;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.user = action.payload;
          state.isAuth = true;
          state.status = 'succeeded';
          state.error = null;
        }
      )
      .addCase(getUserDataThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(
        getUserDataThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.user = action.payload;
          state.status = 'succeeded';
        }
      )
      .addCase(updateUserDataThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(
        updateUserDataThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.user = action.payload;
          state.error = null;
          state.status = 'succeeded';
        }
      )
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(
        getUserOrdersThunk.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.status = 'succeeded';
          state.error = null;
          state.usersOrders = action.payload;
        }
      );
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
