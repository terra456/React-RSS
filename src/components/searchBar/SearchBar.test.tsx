import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { afterEach } from 'vitest';
import { setupStore } from '../../store/store';
import SearchBar from './SearchBar';

afterEach(() => {
  cleanup();
});

describe('Search Bar', () => {
  it('render input and button', async () => {
    const conteiner = render(
      <Provider store={setupStore()}>
        <SearchBar />
      </Provider>
    );
    expect(conteiner.findByRole('textbox')).toBeDefined();
    expect(conteiner.findByRole('button')).toBeDefined();
  });

  it('input focus', async () => {
    const conteiner = render(
      <Provider store={setupStore()}>
        <SearchBar />
      </Provider>
    );
    const input = await conteiner.getByTestId('search-input');
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it('add text to input and enable button', async () => {
    const conteiner = render(
      <Provider store={setupStore()}>
        <SearchBar />
      </Provider>
    );
    const btn = await conteiner.getByTestId('search-btn');
    const input = await conteiner.getByTestId('search-input');
    expect(btn).toBeDisabled();
    fireEvent.change(input, {
      target: { value: 'smth' },
    });
    expect(btn).toBeEnabled();
    expect(input).toHaveValue('smth');
    await userEvent.click(btn);
  });

  it('submit value into store', async () => {
    const store = setupStore();
    const conteiner = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const btn = await conteiner.getByTestId('search-btn');
    const input = await conteiner.getByTestId('search-input');
    expect(store.getState().FilterReducer).toEqual({ searchStr: undefined, currentPage: 1 });
    expect(btn).toBeEnabled();
    fireEvent.change(input, {
      target: { value: 'new text' },
    });
    await userEvent.click(btn);
    expect(input).toHaveValue('new text');
    expect(store.getState().FilterReducer).toEqual({ searchStr: 'new text', currentPage: 1 });
  });
});
