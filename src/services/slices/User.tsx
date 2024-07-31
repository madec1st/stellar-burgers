import {
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserState = {
  user: TAuthResponse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isAuth: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
        (state, action: PayloadAction<TAuthResponse>) => {
          state.user = action.payload;
          state.isAuth = true;
          state.status = 'succeeded';
          state.error = null;
        }
      );
  }
});

export default userSlice.reducer;
