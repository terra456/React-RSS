import React from 'react';

interface Props {
  name: string;
  desc?: string;
  error?: string;
  array: string[];
  refLink: React.RefObject<HTMLSelectElement>;
}

class SelectOptions extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const id = this.props.name.trim().split(' ')[0].toLowerCase();
    return (
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {this.props.desc}
          <span className="ml-8 mt-0 text-xs text-red-500">{this.props.error}</span>
        </label>
        <select
          id={id}
          ref={this.props.refLink}
          name="country"
          aria-invalid={this.props.error !== ''}
          className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {this.props.array.map((el, i) => {
            return <option key={i + el}>{el}</option>;
          })}
        </select>
      </div>
    );
  }
}
export default SelectOptions;
