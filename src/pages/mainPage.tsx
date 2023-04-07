import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Character, getCharacter, getCharacters } from 'rickmortyapi';
import Cards from '../components/cards/Cards';
import Modal from '../components/modal/Modal';
import SearchBar from '../components/searchBar/SearchBar';

const characters = await getCharacters();

function MainPage() {
  const [data, setData]: [
    Character[] | undefined[],
    Dispatch<SetStateAction<Character[] | undefined[]>>
  ] = useState(Array(20));

  const [newData, setNewData]: [
    Character[] | undefined[],
    Dispatch<SetStateAction<Character[] | undefined[]>>
  ] = useState(Array(20));

  const [element, setElement]: [
    Character | undefined,
    Dispatch<SetStateAction<Character | undefined>>
  ] = useState(undefined);

  // const [pages, setPages] = useState(0);
  // const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    console.log(characters.data.results);
    if (characters.data.results) {
      setData(characters.data.results);
      setNewData(characters.data.results);
    }
    if (characters.data.info) {
      // setPages(characters.data.info.pages);
      // setCount(characters.data.info.count);
    }
  }, []);

  useEffect(() => {
    setIsOpen(true);
  }, [element]);

  useEffect(() => {
    if (searchStr && searchStr !== '') {
      searchStr.toLowerCase();
      const filteredData = data.filter(({ name, status, species, type, gender }) => {
        return (
          name.toLowerCase().includes(searchStr) ||
          status.toLowerCase().includes(searchStr) ||
          species.toLowerCase().includes(searchStr) ||
          type.toLowerCase().includes(searchStr) ||
          gender.toLowerCase().includes(searchStr)
        );
      });
      setNewData(filteredData);
    }
  }, [searchStr, data]);

  const handleCardClick = (el: number): void => {
    console.log(el);
    getCharacter(el).then((data) => {
      console.log(data);
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

  return (
    <div className="bg-white">
      <SearchBar handleSearch={handleSearch} />
      <Cards dataList={newData} handleClick={handleCardClick} />
      <Modal data={element} open={isOpen} handleClose={closeModal} />;
    </div>
  );
}

export default MainPage;
