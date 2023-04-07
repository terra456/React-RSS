import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Character, CharacterFilter, getCharacter, getCharacters } from 'rickmortyapi';
import Cards from '../components/cards/Cards';
import Modal from '../components/modal/Modal';
import SearchBar from '../components/searchBar/SearchBar';

function MainPage() {
  const [data, setData]: [
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
    (async () => {
      const filters: CharacterFilter = {
        name: searchStr.toLowerCase(),
      };
      const characters = await getCharacters(filters);
      console.log(characters.data.results);
      if (characters.data.results) {
        setData(characters.data.results);
      }
      if (characters.data.info) {
        // setPages(characters.data.info.pages);
        // setCount(characters.data.info.count);
      }
    })();
  }, [searchStr]);

  useEffect(() => {
    setIsOpen(true);
  }, [element]);

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
      <Cards dataList={data} handleClick={handleCardClick} />
      <Modal data={element} open={isOpen} handleClose={closeModal} />;
    </div>
  );
}

export default MainPage;
