import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { afterEach } from 'vitest';
import { server } from '../../mocks/API/server';
import { rickAndMortyApi } from '../../services/fetchAPI';
import { setupStore } from '../../store/store';
import MainPage from '../mainPage';

const store = setupStore();

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(rickAndMortyApi.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('Main Page render', () => {
  it('base render', async () => {
    const conteiner = render(
      <Provider store={setupStore()}>
        <MainPage />
      </Provider>
    );
    expect(conteiner.findByTestId('search-form')).toBeDefined();
    expect(conteiner.findByRole('button')).toBeDefined();
    expect(await conteiner.findByText(/Error to load/i)).toBeDefined();
  });

  it('render cards', async () => {
    const conteiner = render(
      <Provider store={setupStore()}>
        <MainPage />
      </Provider>
    );
    expect(conteiner.findByTestId('search-form')).toBeDefined();
    expect(conteiner.findByRole('button')).toBeDefined();
    await waitFor(() => {
      expect(conteiner.findByTestId('card')).toBeDefined();
      expect(conteiner.findByText('Summer Smith')).toBeDefined();
    });
  });
});
