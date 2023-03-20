import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach } from 'vitest';
import SearchBar from './SearchBar';

afterEach(() => {
  cleanup();
});

describe('Search Bar', () => {
  it('render input and button', async () => {
    render(<SearchBar />);
    expect(await screen.findByRole('textbox')).toBeEmpty();
    expect(await screen.findByRole('button')).toBeDisabled();
  });

  it('input focus', async () => {
    render(<SearchBar />);
    const input = await screen.getByRole('textbox');
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it('add text to input and enable button', async () => {
    render(<SearchBar />);
    const btn = await screen.getByRole('button');
    const input = await screen.getByRole('textbox');
    expect(btn).toBeDisabled();
    fireEvent.change(input, {
      target: { value: 'smth' },
    });
    expect(btn).toBeEnabled();
  });

  it('submit value', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const btn = await screen.getByRole('button');
    const input = await screen.getByRole('textbox');
    expect(btn).toBeEnabled();
    await user.type(input, 'smth');
    await userEvent.click(btn);
    expect(input).toHaveValue();
    expect(btn).toBeEnabled();
  });
});
