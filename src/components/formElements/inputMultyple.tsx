import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'types';

export type InputProps = {
  type: string;
  label?: string;
  name?: string;
  desc?: string;
  register: UseFormRegister<IFormValues>;
  options: string[];
  required?: boolean;
  errMessage?: string;
};

function InputMultyple({ type, name, desc, options, register, errMessage }: InputProps) {
  return (
    <fieldset>
      <legend className="contents text-sm font-semibold leading-6 text-gray-900">{desc}</legend>
      <p className="ml-8 mt-0 text-xs text-red-500">{errMessage}</p>
      <div className="mt-4">
        {options.map((el, i) => {
          const id = el.trim().split(' ')[0].toLowerCase();
          return (
            <div key={el + i} className="flex h-6 items-center text-sm leading-6">
              <input
                {...register(name)}
                id={id}
                type={type}
                value={el}
                className={
                  (type === 'checkbox' ? 'rounded ' : '') +
                  'h-4 w-4 border-solid border-gray-500 text-indigo-600 focus:ring-indigo-600'
                }
              />
              <label htmlFor={id} className="ml-3 font-medium text-gray-900">
                {el}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
export default InputMultyple;
