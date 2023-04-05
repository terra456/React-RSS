import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'types';

// interface IFormValues {
//   name: string;
//   Age: number;
// }

type InputProps = {
  type: string;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  errMessage?: string;
};

const InputString = ({ type, label, register, errMessage }: InputProps) => (
  <div className="col-span-6 sm:col-span-4">
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {label}
      <span className="ml-8 mt-0 text-xs text-red-500">{errMessage}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        {...register(label)}
        aria-invalid={errMessage ? 'true' : 'false'}
        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    ) : (
      <input
        type={type}
        alt={label}
        {...register(label)}
        aria-invalid={errMessage ? 'true' : 'false'}
        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    )}
  </div>
);
export default InputString;
