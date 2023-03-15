import { IconButton, Input } from '@material-tailwind/react';
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
    localStorage.setItem('searchStr', this.state.value);
    event.preventDefault();
  }

  componentDidUnmount(): void {
    const str = this.state.value;
    localStorage.setItem('searchStr', str);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="relative flex w-full max-w-[24rem]">
        <div className="w-72">
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            className="flex h-10 !rounded-r-none !border-t-blue-gray-200 focus:!border-t-blue-500"
            containerProps={{
              className: 'min-w-0',
            }}
          />
        </div>
        <IconButton
          type="submit"
          color="blue"
          disabled={!this.state.value}
          className="flex h-10 items-center rounded-l-none"
        >
          <i className="fas fa-magnifying-glass" />
        </IconButton>
      </form>
    );
  }
}

export default SearchBar;
