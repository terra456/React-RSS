import '@testing-library/jest-dom';
import FilterSliceReducer, { clearSearch, setPage, setSearch } from './FilterSlice';

describe('filter reducer', () => {
  it('with empty state set search', () => {
    expect(FilterSliceReducer(undefined, setSearch('word'))).toEqual({
      searchStr: 'word',
      currentPage: 1,
    });
  });

  it('set search', () => {
    expect(FilterSliceReducer({ searchStr: undefined, currentPage: 1 }, setSearch('word'))).toEqual(
      { searchStr: 'word', currentPage: 1 }
    );
  });

  it('set page', () => {
    expect(FilterSliceReducer({ searchStr: 'word', currentPage: 1 }, setPage(5))).toEqual({
      searchStr: 'word',
      currentPage: 5,
    });
  });

  it('clear search', () => {
    expect(FilterSliceReducer({ searchStr: 'word', currentPage: 10 }, clearSearch())).toEqual({
      searchStr: undefined,
      currentPage: 1,
    });
  });
});
