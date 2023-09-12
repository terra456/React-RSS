import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'types';

export interface Props {
  name: keyof IFormValues;
  desc?: string;
  error?: string;
  register: UseFormRegister<IFormValues>;
}

function InputCheckBox({ name, desc, register, error }: Props) {
  const id = name.trim().split(' ')[0].toLowerCase();

  return (
    <div className="mt-4">
      <div className="flex h-6 items-center text-sm leading-6">
        <input
          id={id}
          data-testid={name}
          {...register(name)}
          name={name}
          type="checkbox"
          className="h-4 w-4 rounded border-solid border-gray-500 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor={id} className="ml-3 font-medium text-gray-900">
          {desc ? desc : name}
        </label>
      </div>
      <p className="ml-8 mt-0 text-xs text-red-500">{error}</p>
    </div>
  );
}
export default InputCheckBox;
