import React from 'react';

export interface Props {
  type: string;
  name: string;
  desc?: string;
  error?: string;
  array: Array<{
    name: string;
    refLink: React.RefObject<HTMLInputElement>;
  }>;
}

class InputMultyple extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <fieldset>
        <legend className="contents text-sm font-semibold leading-6 text-gray-900">
          {this.props.desc}
        </legend>
        <p className="ml-8 mt-0 text-xs text-red-500">{this.props.error}</p>
        <div className="mt-4">
          {this.props.array.map((el, i) => {
            const id = el.name.trim().split(' ')[0].toLowerCase();
            return (
              <div key={el.name + i} className="flex h-6 items-center text-sm leading-6">
                <input
                  id={id}
                  ref={el.refLink}
                  name={this.props.name}
                  type={this.props.type}
                  value={el.name}
                  className={
                    (this.props.type === 'checkbox' ? 'rounded ' : '') +
                    'h-4 w-4 border-solid border-gray-500 text-indigo-600 focus:ring-indigo-600'
                  }
                />
                <label htmlFor={id} className="ml-3 font-medium text-gray-900">
                  {el.name}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    );
  }
}
export default InputMultyple;
