import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

function SearchBar() {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchStr') || undefined);
  const searchRef = useRef('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    // if (searchValue) {
    //   localStorage.setItem('searchStr', searchValue);
    // }
    event.preventDefault();
  };

  useEffect(() => {
    if (searchValue) {
      searchRef.current = searchValue;
    }
  }, [searchValue]);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchStr', searchRef.current);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full max-w-[24rem]">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="block h-7 w-full rounded-md rounded-tr-none rounded-br-none border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6"
      />
      <button
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
