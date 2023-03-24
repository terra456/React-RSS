import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import selectEvent from 'react-select-event';
import { afterEach } from 'vitest';
import AddCard from '../AddCard';

afterEach(() => {
  cleanup();
});

describe('Checkbox render', () => {
  it('send several cards', async () => {
    window.URL.createObjectURL = (file: Blob) => {
      return './test/chucknorris.png';
    };
    render(<AddCard />);
    const form = await screen.getByTestId('form');
    const textInputs = await screen.getAllByRole('textbox');
    fireEvent.change(textInputs[0], {
      target: { value: 'uniq value' },
    });
    fireEvent.change(textInputs[1], {
      target: { value: 'Some Description' },
    });
    fireEvent.change(await screen.getByAltText('date'), {
      target: { value: '2020-05-24' },
    });
    await selectEvent.select(screen.getByRole('combobox'), 'select2');
    const radioInputs = await screen.getAllByRole('radio');
    const checkInputs = await screen.getAllByRole('checkbox');
    fireEvent.click(radioInputs[0]);
    fireEvent.click(checkInputs[1]);
    fireEvent.click(checkInputs[3]);
    fireEvent.click(checkInputs[5]);
    await fireEvent.change(screen.getByLabelText(/upload/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
      },
    });
    await userEvent.click(await screen.getByRole('button'));
    expect(textInputs[0]).toHaveValue('');
    expect(await screen.getByText(/uniq/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);

    fireEvent.change(textInputs[0], {
      target: { value: 'sssooommmeee text' },
    });
    fireEvent.change(textInputs[1], {
      target: { value: 'Some Description' },
    });
    fireEvent.change(await screen.getByAltText('date'), {
      target: { value: '2020-12-24' },
    });
    await selectEvent.select(screen.getByRole('combobox'), 'select1');
    fireEvent.click(radioInputs[2]);
    fireEvent.click(checkInputs[1]);
    fireEvent.click(checkInputs[5]);
    await fireEvent.change(screen.getByLabelText(/upload/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'picture.png', { type: 'image/png' })],
      },
    });
    await userEvent.click(await screen.getByRole('button'));
    expect(screen.getAllByRole('img')).toHaveLength(2);

    fireEvent.change(textInputs[0], {
      target: { value: 'three text' },
    });
    fireEvent.change(textInputs[1], {
      target: { value: 'Important text' },
    });
    await selectEvent.select(screen.getByRole('combobox'), 'select1');
    fireEvent.click(radioInputs[2]);
    fireEvent.click(checkInputs[1]);
    fireEvent.click(checkInputs[2]);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    await fireEvent.change(screen.getByLabelText(/upload/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'image.png', { type: 'image/png' })],
      },
    });
    fireEvent.click(checkInputs[3]);
    expect(screen.getAllByRole('img')).toHaveLength(3);
    await userEvent.click(await screen.getByRole('button'));

    fireEvent.change(await screen.getByAltText('date'), {
      target: { value: '2020-12-24' },
    });
    fireEvent.click(checkInputs[5]);
    await userEvent.click(await screen.getByRole('button'));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});
