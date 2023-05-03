import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { afterEach } from 'vitest';
import { setupStore } from '../../store/store';
import CardForm from './CardForm';

afterEach(() => {
  cleanup();
});

describe('Checkbox render', () => {
  it('render checkbox input and label with mock values', async () => {
    render(
      <Provider store={setupStore()}>
        <CardForm />
      </Provider>
    );
    const input = await screen.getAllByRole('checkbox');
    expect(await screen.getByText(/Agree/i)).toBeInTheDocument();
    expect(await screen.getByRole('button')).toBeInTheDocument();
    expect(input[0]).not.toBeChecked();
  });

  it('send some information inputs', async () => {
    window.URL.createObjectURL = (file: Blob) => {
      file;
      return './test/smth.png';
    };
    const conteiner = render(
      <Provider store={setupStore()}>
        <CardForm />
      </Provider>
    );
    const form = await conteiner.getByTestId('form');
    const textInputs = await conteiner.getAllByRole('textbox');
    const btn = await conteiner.getByRole('button');
    fireEvent.change(textInputs[0], {
      target: { value: 'Name of the card' },
    });
    fireEvent.change(textInputs[1], {
      target: { value: 'Some Description' },
    });
    await fireEvent.change(await conteiner.getByRole('combobox'), {
      target: { value: 'Robot' },
    });
    expect(textInputs[0]).toHaveValue('Name of the card');
    expect(form).toHaveFormValues({
      name: 'Name of the card',
      desc: 'Some Description',
      selectValue: 'Robot',
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
    const genderInputs = await conteiner.getAllByTestId('gender');
    const statusInputs = await conteiner.getAllByTestId('status');
    const checkInputs = await conteiner.getAllByTestId('checkboxValue');
    const agreeInput = await conteiner.getByTestId('agree');
    fireEvent.click(genderInputs[0]);
    fireEvent.click(statusInputs[1]);
    userEvent.click(checkInputs[1]);
    userEvent.click(checkInputs[3]);
    userEvent.click(checkInputs[5]);
    userEvent.click(agreeInput);
    await userEvent.upload(
      await screen.getByTestId('file-upload'),
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    );
    expect(form).toHaveFormValues({
      name: 'Name of the card',
      date: '2020-05-24',
      desc: 'Some Description',
      selectValue: 'Robot',
      checkboxValue: false,
      status: 'Alive',
      gender: 'Female',
      file: 'C:\\fakepath\\chucknorris.png',
      agree: true,
    });
    expect(textInputs[0]).toHaveValue('Name of the card');
    await userEvent.click(btn);
    expect(btn).toBeDisabled();
  });
});
