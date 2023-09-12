import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'types';

type Props = {
  name: Path<IFormValues>;
  label: string;
  register: UseFormRegister<IFormValues>;
  options: string[];
  required?: boolean;
  errMessage?: string;
};

export function SelectOptions({ register, options, name, errMessage, label = name }: Props) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        <span className="ml-8 mt-0 text-xs text-red-500">{errMessage}</span>
      </label>
      <select {...register(name)}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOptions;
