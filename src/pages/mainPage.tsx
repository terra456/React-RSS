/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Character, CharacterFilter, getCharacter, getCharacters } from 'rickmortyapi';
import Cards from '../components/cards/Cards';
import Modal from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';
import SearchBar from '../components/searchBar/SearchBar';
import Spinner from '../components/spinner/Spinner';

function MainPage() {
  const [data, setData]: [
    Character[] | undefined,
    Dispatch<SetStateAction<Character[] | undefined>>
  ] = useState();

  const [element, setElement]: [
    Character | undefined,
    Dispatch<SetStateAction<Character | undefined>>
  ] = useState();

  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    setCurrentPage(1);
    getCardData();
  }, [searchStr]);

  useEffect(() => {
    getCardData();
  }, [currentPage]);

  useEffect(() => {
    setIsOpen(true);
  }, [element]);

  async function getCardData() {
    const filters: CharacterFilter = {};
    if (searchStr) {
      filters.name = searchStr.toLowerCase();
    }
    if (currentPage !== 0) {
      filters.page = currentPage;
    }
    const characters = await getCharacters(filters);
    console.log(characters.data.results);
    if (characters.data.results) {
      setData(characters.data.results);
    }
    if (characters.data.info) {
      setPages(characters.data.info.pages);
      setCount(characters.data.info.count);
    }
  }

  const handleCardClick = (el: number): void => {
    getCharacter(el).then((data) => {
      setElement(data.data);
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (str: string) => {
    console.log(str);
    setSearchStr(str);
  };

  const handlePage = (n: number) => {
    setCurrentPage(n);
  };

  return (
    <div className="bg-white">
      <SearchBar handleSearch={handleSearch} />
      {data !== undefined ? <Cards dataList={data} handleClick={handleCardClick} /> : <Spinner />}
      <Modal data={element} open={isOpen} handleClose={closeModal} />
      {pages !== 0 ? (
        <Pagination currentPage={currentPage} pages={pages} count={count} handlePage={handlePage} />
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MainPage;
