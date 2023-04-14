import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
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
    const btn = await screen.getByRole('button');
    fireEvent.change(textInputs[0], {
      target: { value: 'Name of the card' },
    });
    fireEvent.change(textInputs[1], {
      target: { value: 'Some Description' },
    });
    await fireEvent.change(await screen.getByRole('combobox'), { target: { value: 'select2' } });
    expect(textInputs[0]).toHaveValue('Name of the card');
    expect(form).toHaveFormValues({
      name: 'Name of the card',
      desc: 'Some Description',
      selectValue: 'select2',
    });
    await userEvent.click(btn);
    expect(btn).toBeDisabled();
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
    await userEvent.upload(
      await screen.getByTestId('file-upload'),
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    );
    expect(screen.getByTestId('file-upload').files[0].name).toBe('chucknorris.png');
    expect(form).toHaveFormValues({
      name: 'Name of the card',
      date: '2020-05-24',
      desc: 'Some Description',
      selectValue: 'select2',
      checkboxValue: ['option2', 'option4'],
      radioValue: 'Dead',
      file: 'C:\\fakepath\\chucknorris.png',
      agree: true,
    });
    expect(textInputs[0]).toHaveValue('Name of the card');
    await userEvent.click(btn);
    expect(btn).toBeDisabled();
    expect(textInputs[0]).not.toHaveValue('Name of the card');
    expect(form).not.toHaveFormValues({
      name: 'Name of the card',
      date: '2020-05-24',
      desc: 'Some Description',
      selectValue: 'select2',
      checkboxValue: ['option2', 'option4'],
      radioValue: 'value1',
      file: 'C:\\fakepath\\chucknorris.png',
      agree: true,
    });
  });
});
