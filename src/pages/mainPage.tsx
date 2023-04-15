/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cards from '../components/cards/Cards';
import Modal from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';
import SearchBar from '../components/searchBar/SearchBar';
import Spinner from '../components/spinner/Spinner';
import { useAppSelector } from '../hooks/redux';
import { rickAndMortyApi } from '../services/fetchAPI';
import { filterSlice } from '../store/reducers/FilterSlice';

function MainPage() {
  const dispatch = useDispatch();
  const { setPage } = filterSlice.actions;
  const { currentPage, searchStr } = useAppSelector((state) => state.FilterReducer);
  const { data, error, isLoading } = rickAndMortyApi.useGetCharactersBySearchQuery({
    page: currentPage,
    name: searchStr,
  });

  const [elementID, setElementID]: [
    number | undefined,
    Dispatch<SetStateAction<number | undefined>>
  ] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (el: number): void => {
    setElementID(el);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePage = (n: number) => {
    dispatch(setPage(n));
  };

  return (
    <div className="bg-white">
      <SearchBar />
      {isLoading && <Spinner />}
      {error && <p>Error to load info</p>}
      {data && data.results && <Cards dataList={data.results} handleClick={handleCardClick} />}
      {elementID && <Modal el={elementID} open={isOpen} handleClose={closeModal} />}
      {data && data.info?.pages !== 0 && (
        <Pagination
          currentPage={currentPage}
          pages={data.info?.pages || 1}
          count={data.info?.count || 1}
          handlePage={handlePage}
        />
      )}
    </div>
  );
}

export default MainPage;
