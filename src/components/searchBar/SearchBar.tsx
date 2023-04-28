import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { filterSlice } from '../../store/reducers/FilterSlice';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { searchStr } = useAppSelector((state) => state.FilterReducer);
  const { setSearch, clearSearch } = filterSlice.actions;
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleReset = () => {
    setSearchValue('');
  };

  const handleSubmit = (event: FormEvent) => {
    if (searchValue) {
      dispatch(setSearch(searchValue));
    }
    event.preventDefault();
  };

  useEffect(() => {
    if (searchStr) {
      setSearchValue(searchStr);
    }
  }, []);

  useEffect(() => {
    if (!searchValue) {
      dispatch(clearSearch());
    }
  }, [searchValue]);

  return (
    <form
      data-testid="search-form"
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
        <input
          data-testid="search-input"
          type="text"
          value={searchValue}
          onChange={handleChange}
          className="border-blue-gray-200 pr--20 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer mr--20 h-full w-full shrink-0 rounded-lg border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal transition-all placeholder-shown:border focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
        />
        <button
          data-testid="reset-search-btn"
          type="reset"
          name="reset-search"
          onClick={handleReset}
          className="text-gray absolute right-10 top-0 z-10 h-full select-none py-2 px-4 text-center align-middle transition-all hover:shadow-lg"
        >
          <i className="fas fa-xmark" />
        </button>
        <button
          data-testid="search-btn"
          type="submit"
          name="search"
          className="peer-placeholder-shown:bg-blue-gray-500 absolute right-0 top-0 z-10 h-full select-none rounded-r-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
        >
          <i className="fas fa-magnifying-glass" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
