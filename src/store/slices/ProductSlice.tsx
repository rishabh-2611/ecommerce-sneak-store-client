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
import { jsonToFormData } from '@/utils/generalUtils';

interface ProductState {
  data: AddProductForm | unknown,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoggedIn: boolean
}

export const addProduct = createAsyncThunk('products/add', async (payload: AddProductForm, { rejectWithValue }) => {
  try {
    // const form = jsonToFormData(payload);
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

export default ProductSlice.reducer;
