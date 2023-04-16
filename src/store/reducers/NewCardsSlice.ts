import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'rickmortyapi';

export interface NewCardsState {
  cards: Character[];
}

const initialState: NewCardsState = {
  cards: [],
};

export const newCardsSlice = createSlice({
  name: 'newCard',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<Character>) {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export default newCardsSlice.reducer;
