import React from 'react';

interface Props {
  name: string;
  desc?: string;
  error?: string;
  refLink: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>;
}

interface State {
  id: string;
}

class InputCheckBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: this.props.name.trim().split(' ')[0].toLowerCase(),
    };
  }

  render() {
    return (
      <div className="mt-4">
        <div className="flex h-6 items-center text-sm leading-6">
          <input
            id={this.state.id}
            ref={this.props.refLink}
            name={this.state.id}
            type="checkbox"
            className="h-4 w-4 rounded border-solid border-gray-500 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor={this.state.id} className="ml-3 font-medium text-gray-900">
            {this.props.desc ? this.props.desc : this.props.name}
          </label>
        </div>
        <p className="ml-8 mt-0 text-xs text-red-500">{this.props.error}</p>
      </div>
    );
  }
}
export default InputCheckBox;
