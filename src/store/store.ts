import { combineReducers, configureStore } from '@reduxjs/toolkit';
import NewCardsReducer from './reducers/NewCardsSlice';

const rootReducer = combineReducers({
  NewCardsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
