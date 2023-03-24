import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach } from 'vitest';
import InputMultyple, { Props } from '../inputMultyple';

afterEach(() => {
  cleanup();
});

const mock: Props = {
  type: 'checkbox',
  name: 'options',
  desc: 'some description for the block',
  array: [
    {
      name: 'one',
      refLink: React.createRef(),
    },
    {
      name: 'two',
      refLink: React.createRef(),
    },
    {
      name: 'three',
      refLink: React.createRef(),
    },
  ],
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
