/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../utils/toastUtils';
import { SignInForm, SignUpForm } from '../../pages/auth/User';

interface AuthState {
  data: SignInForm | unknown,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoggedIn: boolean
}

export const signInUser = createAsyncThunk('auth/signInUser', async (payload: SignInForm, { rejectWithValue }) => {
  try {
    const response = await axios.post('/login', payload);
    showSuccessToast(response.data.message);
    return response.data;
  } catch (error: any) {
    let errorMsg = 'Something went wrong. Please try again';
    if (error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
    showErrorToast(errorMsg);
    return rejectWithValue('Login failed...');
  }
});

export const signUpUser = createAsyncThunk('auth/signUpUser', async (payload: SignUpForm, { rejectWithValue }) => {
  try {
    const response = await axios.post('/register', payload);
    showSuccessToast(response.data.message);
    return response.data;
  } catch (error: any) {
    let errorMsg = 'User cannot be registered';
    if (error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
    showErrorToast(errorMsg);
    return rejectWithValue('Registration failed...');
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
    isLoggedIn: false,
  } as AuthState,
  reducers: {
    logoutUser: state => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occurred during login';
        state.isLoggedIn = false;
      });
      // .addCase(addItemAsync.fulfilled, (state, action) => {
      //   state.list.push(action.payload);
      // })
      // .addCase(updateItemAsync.fulfilled, (state, action) => {
      //   const { id, updatedItem } = action.payload;
      //   const index = state.list.findIndex(item => item.id === id);
      //   if (index !== -1) {
      //     state.list[index] = { ...state.list[index], ...updatedItem };
      //   }
      // })
      // .addCase(removeItemAsync.fulfilled, (state, action) => {
      //   state.list = state.list.filter(item => item.id !== action.payload);
      // });
  },
});

export default AuthSlice.reducer;
