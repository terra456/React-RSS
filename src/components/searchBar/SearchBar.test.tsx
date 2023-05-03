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

  it('submit value into store', async () => {
    const store = setupStore();
    const conteiner = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const btn = await conteiner.getByTestId('search-btn');
    const input = await conteiner.getByTestId('search-input');
    expect(store.getState().FilterReducer).toEqual({ searchStr: '', currentPage: 1 });
    expect(btn).toBeEnabled();
    fireEvent.change(input, {
      target: { value: 'new text' },
    });
    expect(input).toHaveValue('new text');
    await userEvent.click(btn);
    expect(await store.getState().FilterReducer).toEqual({ searchStr: 'new text', currentPage: 1 });
  });

  it('clear value in text input', async () => {
    const store = setupStore();
    const conteiner = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const btn = await conteiner.getByTestId('search-btn');
    const input = await conteiner.getByTestId('search-input');
    expect(store.getState().FilterReducer).toEqual({ searchStr: '', currentPage: 1 });
    expect(btn).toBeEnabled();
    fireEvent.change(input, {
      target: { value: 'some value' },
    });
    await userEvent.click(btn);
    expect(input).toHaveValue('some value');
    expect(store.getState().FilterReducer).toEqual({ searchStr: 'some value', currentPage: 1 });
    fireEvent.change(input, {
      target: { value: '' },
    });
    expect(input).toHaveValue('');
    expect(store.getState().FilterReducer).toEqual({ searchStr: '', currentPage: 1 });
  });

  it('clear value click on btn', async () => {
    const store = setupStore();
    const conteiner = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const btn = await conteiner.getByTestId('search-btn');
    const input = await conteiner.getByTestId('search-input');
    const resetBtn = await conteiner.getByTestId('reset-search-btn');
    expect(store.getState().FilterReducer).toEqual({ searchStr: '', currentPage: 1 });
    expect(btn).toBeEnabled();
    fireEvent.change(input, {
      target: { value: 'clear' },
    });
    await userEvent.click(btn);
    expect(input).toHaveValue('clear');
    expect(store.getState().FilterReducer).toEqual({ searchStr: 'clear', currentPage: 1 });
    await userEvent.click(resetBtn);
    expect(input).toHaveValue('');
    expect(store.getState().FilterReducer).toEqual({ searchStr: '', currentPage: 1 });
  });
});
