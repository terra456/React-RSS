import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'types';
import { afterEach } from 'vitest';
import InputCheckBox, { Props } from '../inputCheckBox';

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

const mock: Props = {
  name: 'user',
  desc: 'user agree',
  register: register,
};

describe('Checkbox render', () => {
  it('render checkbox input and label with mock values', async () => {
    render(<InputCheckBox {...mock} />);
    const input = await screen.getByRole('checkbox');
    expect(await screen.getByText(/agree/i)).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it('checkbox focus', async () => {
    render(<InputCheckBox {...mock} />);
    const input = await screen.getByRole('checkbox');
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it('checked input', async () => {
    render(<InputCheckBox {...mock} />);
    const input = await screen.getByRole('checkbox');
    const lable = await screen.getByText(/agree/i);
    expect(input).not.toBeChecked();
    fireEvent.click(lable);
    expect(input).toBeChecked();
    fireEvent.click(input);
    expect(input).not.toBeChecked();
  });
});
