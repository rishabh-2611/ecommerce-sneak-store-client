/* eslint-disable no-empty-pattern */
/* eslint-disable import/extensions */
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../utils/toastUtils';
import { AddProductForm } from '../../types/Product';

interface ProductState {
  data: AddProductForm | unknown,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoggedIn: boolean
}

export const addProduct = createAsyncThunk('addProduct', async (payload: AddProductForm, { rejectWithValue }) => {
  try {
    const response = await axios.post('/products', payload);
    showSuccessToast(response.data.message);
    return response.data;
  } catch (error: any) {
    let errorMsg = 'Something went wrong. Please try again';
    if (error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
    showErrorToast(errorMsg);
    return rejectWithValue('Product cannot be added');
  }
});

export const getProducts = createAsyncThunk('getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/products');
    return response.data;
  } catch (error: any) {
    let errorMsg = 'Something went wrong. Please try again';
    if (error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
    showErrorToast(errorMsg);
    return rejectWithValue('Products cannot be fetched.');
  }
});

const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
    isLoggedIn: false,
  } as ProductState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.product;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Product cannot be added';
        state.isLoggedIn = false;
      })
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.product;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Products cannot be fetched';
        state.isLoggedIn = false;
      });
  },
});

export default ProductSlice.reducer;
