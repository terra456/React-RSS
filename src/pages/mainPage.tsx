/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Character, getCharacter } from 'rickmortyapi';
import Cards from '../components/cards/Cards';
import Pagination from '../components/pagination/Pagination';
import SearchBar from '../components/searchBar/SearchBar';
import Spinner from '../components/spinner/Spinner';
import { useAppSelector } from '../hooks/redux';
import { rickAndMortyApi } from '../services/fetchAPI';
import { filterSlice } from '../store/reducers/FilterSlice';

function MainPage() {
  const { setPage } = filterSlice.actions;
  const dispatch = useDispatch();
  const { currentPage, searchStr } = useAppSelector((state) => state.FilterReducer);
  const { data, error, isLoading } = rickAndMortyApi.useGetCharactersBySearchQuery({
    page: currentPage,
    name: searchStr,
  });

  // const [data, setData]: [
  //   Character[] | undefined,
  //   Dispatch<SetStateAction<Character[] | undefined>>
  // ] = useState();

  const [element, setElement]: [
    Character | undefined,
    Dispatch<SetStateAction<Character | undefined>>
  ] = useState();

  // const [pages, setPages] = useState(0);
  // const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // const [searchStr, setSearchStr] = useState('');

  // useEffect(() => {
  //   setCurrentPage(1);
  //   getCardData();
  // }, [searchStr]);

  // useEffect(() => {
  //   getCardData();
  // }, [currentPage]);

  useEffect(() => {
    setIsOpen(true);
  }, [element]);

  // async function getCardData() {
  //   const filters: CharacterFilter = {};
  //   if (searchStr) {
  //     filters.name = searchStr.toLowerCase();
  //   }
  //   if (currentPage !== 0) {
  //     filters.page = currentPage;
  //   }
  //   const characters = await getCharacters(filters);
  //   console.log(characters.data.results);
  //   if (characters.data.results) {
  //     setData(characters.data.results);
  //   }
  //   if (characters.data.info) {
  //     setPages(characters.data.info.pages);
  //     setCount(characters.data.info.count);
  //   }
  // }

  const handleCardClick = (el: number): void => {
    setIsOpen(true);
    getCharacter(el).then((data) => {
      setElement(data.data);
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (str: string) => {
    console.log(str);
    // setSearchStr(str);
  };

  const handlePage = (n: number) => {
    dispatch(setPage(n));
  };

  return (
    <div className="bg-white">
      <SearchBar handleSearch={handleSearch} />
      {isLoading && <Spinner />}
      {error && <p>Error to load info</p>}
      {data && data.results && <Cards dataList={data.results} handleClick={handleCardClick} />}
      {/* <Modal data={element} open={isOpen} handleClose={closeModal} /> */}
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
