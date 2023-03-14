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
    localStorage.setItem('searchStr', this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SearchBar;
