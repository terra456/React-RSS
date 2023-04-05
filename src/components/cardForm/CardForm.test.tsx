import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import selectEvent from 'react-select-event';
import { IFormValues } from 'types';
import { afterEach } from 'vitest';
import CardForm from './CardForm';

afterEach(() => {
  cleanup();
});

const handleCardSubmit = (obj: IFormValues) => {
  render(
    <div>
      <p>{(obj.date, obj.file, obj.selectValue, obj.name)}</p>
    </div>
  );
};

describe('Checkbox render', () => {
  it('render checkbox input and label with mock values', async () => {
    render(<CardForm onFormSubmit={handleCardSubmit} />);
    const input = await screen.getAllByRole('checkbox');
    expect(await screen.getByText(/Agree/i)).toBeInTheDocument();
    expect(await screen.getByRole('button')).toBeInTheDocument();
    expect(input[0]).not.toBeChecked();
  });

  it('send some information inputs, validate and clear', async () => {
    window.URL.createObjectURL = (file: Blob) => {
      file;
      return './test/smth.png';
    };
    render(<CardForm onFormSubmit={handleCardSubmit} />);
    const form = await screen.getByTestId('form');
    const textInputs = await screen.getAllByRole('textbox');
    fireEvent.change(textInputs[0], {
      target: { value: 'Name of the card' },
    });
    fireEvent.change(textInputs[1], {
      target: { value: 'Some Description' },
    });
    await selectEvent.select(await screen.getByRole('combobox'), 'select2');
    expect(textInputs[0]).toHaveValue('Name of the card');
    expect(form).toHaveFormValues({
      name: 'Name of the card',
      desc: 'Some Description',
      nameSelection: 'select2',
    });
    expect(await screen.getByRole('button')).not.toBeDisabled();
    await userEvent.click(await screen.getByRole('button'));
    expect(await screen.getByRole('button')).toBeDisabled();
    expect(textInputs[0]).toHaveValue('Name of the card');
    expect(await screen.getByText(/empty/i)).toBeInTheDocument();
    expect(await screen.getByText(/add any picture/i)).toBeInTheDocument();
    expect(await screen.getByText(/You must agree the terms/i)).toBeInTheDocument();
    fireEvent.change(await screen.getByAltText('date'), {
      target: { value: '2020-05-24' },
    });
    const radioInputs = await screen.getAllByRole('radio');
    const checkInputs = await screen.getAllByRole('checkbox');
    fireEvent.click(radioInputs[0]);
    fireEvent.click(checkInputs[1]);
    fireEvent.click(checkInputs[3]);
    fireEvent.click(checkInputs[5]);
    expect(await screen.getByRole('button')).not.toBeDisabled();
    await fireEvent.change(screen.getByLabelText(/upload/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
      },
    });
    expect(textInputs[0]).not.toHaveValue('');
    await userEvent.click(await screen.getByRole('button'));
    expect(textInputs[0]).toHaveValue('');
  });
});
