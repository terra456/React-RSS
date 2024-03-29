import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rickAndMortyApi } from '../services/fetchAPI';
import FilterReducer from './reducers/FilterSlice';
import NewCardsReducer from './reducers/NewCardsSlice';

const rootReducer = combineReducers({
  NewCardsReducer,
  FilterReducer,
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(rickAndMortyApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
