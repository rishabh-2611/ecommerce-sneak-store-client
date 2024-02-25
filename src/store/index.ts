import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('store');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
};

const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('store', serializedState);
    } catch (error) {
      // Handle errors while saving state
    }
};

// Load the persisted state
const preloadedState = loadState();

const store = configureStore({
    reducer: {
      user: AuthSlice,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
