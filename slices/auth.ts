import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, Auth, SignUpItem, SignInItem } from '../types/Auth';

const initialState: AuthState = {
  id: undefined,
  username: undefined,
  error: undefined,
};

export const signUp = createAsyncThunk<Auth, SignUpItem>(
  'sign_up',
  async (signUpItem: SignUpItem): Promise<Auth> => {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(signUpItem);

    const res = await fetch('http://localhost:4000/sign_up', {
      method,
      headers,
      body,
    });

    switch (res.status) {
      case 201:
        const auth = (await res.json()) as Auth;
        return auth;
      case 422:
        throw new Error('invalid inputs');
      default:
        throw new Error('unexpected error');
    }
  }
);

export const signIn = createAsyncThunk<Auth, SignInItem>(
  'sign_in',
  async (signInItem: SignInItem): Promise<Auth> => {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(signInItem);

    const res = await fetch('http://localhost:4000/sign_in', {
      method,
      headers,
      body,
    });

    switch (res.status) {
      case 200:
        const auth = (await res.json()) as Auth;
        localStorage.setItem('accessToken', auth.accessToken as string);
        localStorage.setItem('refreshToken', auth.refreshToken as string);
        return auth;
      case 401:
        throw new Error('cannot authorized');
      case 422:
        throw new Error('invalid inputs');
      default:
        throw new Error('unexpected error');
    }
  }
);

export const signOut = createAsyncThunk<Auth>(
  'sign_out',
  async (): Promise<Auth> => {
    const method = 'DELETE';
    let accessToken = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await fetch('http://localhost:4000/signout', {
      method,
      headers,
    });

    switch (res.status) {
      case 200:
        const auth = (await res.json()) as Auth;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return auth;
      default:
        throw new Error('unexpected error');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.error = undefined;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.id = undefined;
      state.username = undefined;
      state.error = undefined;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
