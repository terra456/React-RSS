import React, { ChangeEvent, FormEvent } from 'react';

class SearchBar extends React.Component {
  state = { value: '' };
  constructor(props: string) {
    super(props);
    this.state = { value: localStorage.getItem('searchStr') || '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    console.log('Was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentWillUnmount(): void {
    const str = this.state.value;
    localStorage.setItem('searchStr', str);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="relative flex w-full max-w-[24rem]">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          className="block h-7 w-full rounded-md rounded-tr-none rounded-br-none border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          name="search"
          disabled={!this.state.value}
          className="w-15 flex h-10 items-center rounded-l-none"
        >
          <i className="fas fa-magnifying-glass" />
        </button>
      </form>
    );
  }
}

export default SearchBar;
