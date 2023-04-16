import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
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

  // it('input focus', async () => {
  //   render(<SearchBar {...props} />);
  //   const input = await screen.getByRole('textbox');
  //   expect(input).not.toHaveFocus();
  //   input.focus();
  //   expect(input).toHaveFocus();
  // });

  // it('add text to input and enable button', async () => {
  //   render(<SearchBar {...props} />);
  //   const btn = await screen.getByRole('button');
  //   const input = await screen.getByRole('textbox');
  //   expect(btn).toBeDisabled();
  //   fireEvent.change(input, {
  //     target: { value: 'smth' },
  //   });
  //   expect(btn).toBeEnabled();
  // });

  // it('submit value', async () => {
  //   const user = userEvent.setup();
  //   render(<SearchBar {...props} />);
  //   const btn = await screen.getByRole('button');
  //   const input = await screen.getByRole('textbox');
  //   expect(btn).toBeEnabled();
  //   await user.type(input, 'smth');
  //   await userEvent.click(btn);
  //   expect(input).toHaveValue();
  //   expect(btn).toBeEnabled();
  // });
});
