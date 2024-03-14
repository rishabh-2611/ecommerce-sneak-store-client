/* eslint-disable import/extensions */
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../utils/toastUtils';
import { MediaForm } from '../../types/Media';

interface MediaState {
  data: MediaForm | unknown,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoggedIn: boolean
}

export const uploadMedia = createAsyncThunk('media/upload', async (payload: MediaForm, { rejectWithValue }) => {
  try {
    const response = await axios.post('/media', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
    // showSuccessToast(response.data.message);
    return response.data;
  } catch (error: any) {
    let errorMsg = 'Something went wrong. Please try again';
    if (error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
    showErrorToast(errorMsg);
    return rejectWithValue('Images cannot be uploaded');
  }
});

const MediaSlice = createSlice({
  name: 'media',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
    isLoggedIn: false,
  } as MediaState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadMedia.pending, state => {
        state.status = 'loading';
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.media;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Images cannot be uploaded';
        state.isLoggedIn = false;
      });
  },
});

export default MediaSlice.reducer;
