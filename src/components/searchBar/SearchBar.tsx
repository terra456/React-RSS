import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../store/reducers/FilterSlice';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef('');
  const { setSearch } = filterSlice.actions;
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    if (searchValue) {
      dispatch(setSearch(searchValue));
    }
    event.preventDefault();
  };

  useEffect(() => {
    if (searchValue) {
      searchRef.current = searchValue;
    }
  }, [searchValue]);

  return (
    <form
      data-testid="search-form"
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-[24rem]"
    >
      <input
        data-testid="search-input"
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="block h-7 w-full rounded-md rounded-tr-none rounded-br-none border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6"
      />
      <button
        data-testid="search-btn"
        type="submit"
        name="search"
        disabled={!searchValue}
        className="w-15 flex h-10 items-center rounded-l-none"
      >
        <i className="fas fa-magnifying-glass" />
      </button>
    </form>
  );
}

export default SearchBar;
