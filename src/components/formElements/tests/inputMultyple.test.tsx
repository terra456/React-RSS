import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'types';
import { afterEach } from 'vitest';
import InputMultyple, { InputProps } from '../inputMultyple';

afterEach(() => {
  cleanup();
});

const register: UseFormRegister<IFormValues> = (name: string) => {
  return {
    name: name,
    ref: React.createRef(),
    onChange: () => {},
    onBlur: () => {},
  };
};

const mock: InputProps = {
  type: 'checkbox',
  name: 'options',
  desc: 'some description for the block',
  options: ['one', 'two', 'three'],
  register: register,
};

describe('Checkbox render', () => {
  it('render checkbox input and label with mock values', async () => {
    render(<InputMultyple {...mock} />);
    const input = await screen.getAllByRole('checkbox');
    expect(await screen.getByText(/description/i)).toBeInTheDocument();
    expect(input[0]).not.toBeChecked();
  });

  it('checket all inputs', async () => {
    render(<InputMultyple {...mock} />);
    const input = await screen.getAllByRole('checkbox');
    expect(input[0]).not.toBeChecked();
    fireEvent.click(input[0]);
    fireEvent.click(input[1]);
    fireEvent.click(input[2]);
    expect(input[0]).toBeChecked();
    expect(input[1]).toBeChecked();
    expect(input[2]).toBeChecked();
    fireEvent.click(input[2]);
    expect(input[2]).not.toBeChecked();
  });

  it('select inputs type radio', async () => {
    render(<InputMultyple {...mock} type="radio" />);
    const input = await screen.getAllByRole('radio');
    expect(input[0]).not.toBeChecked();
    fireEvent.click(input[0]);
    expect(input[0]).toBeChecked();
    fireEvent.click(input[1]);
    fireEvent.click(input[2]);
    expect(input[0]).not.toBeChecked();
    expect(input[1]).not.toBeChecked();
    expect(input[2]).toBeChecked();
  });
});
