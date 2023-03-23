import React from 'react';

interface Props {
  type: string;
  name: string;
  error?: string;
  refLink: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>;
}

interface State {
  id: string;
}

class InputString extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: this.props.name.trim().split(' ')[0].toLowerCase(),
    };
  }

  render() {
    return (
      <div className="col-span-6 sm:col-span-4">
        <label
          htmlFor={this.state.id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {this.props.name.toLocaleUpperCase()}
          <span className="ml-8 mt-0 text-xs text-red-500">{this.props.error}</span>
        </label>
        {this.props.type === 'textarea' ? (
          <textarea
            id={this.state.id}
            ref={this.props.refLink}
            name={this.props.name.toLowerCase().trim()}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <input
            id={this.state.id}
            ref={this.props.refLink}
            type={this.props.type}
            name={this.props.name.toLowerCase().trim()}
            aria-invalid={this.props.error !== ''}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        )}
      </div>
    );
  }
}
export default InputString;
