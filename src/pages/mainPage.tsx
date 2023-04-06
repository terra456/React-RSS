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

  const [element, setElement]: [
    Character | undefined,
    Dispatch<SetStateAction<Character | undefined>>
  ] = useState();

  const [pages, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(characters.data.results);
    if (characters.data.results) {
      setData(characters.data.results);
    }
    if (characters.data.info) {
      console.log(characters.data.info);
      setPages(characters.data.info.pages);
      setCount(characters.data.info.count);
    }
  }, []);

  const handleCardClick = (el: number): void => {
    console.log(el);
    getCharacter(el).then((data) => {
      console.log(data);
      setElement(data.data);
      setIsOpen(true);
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white">
      <SearchBar />
      <Cards dataList={data} handleClick={handleCardClick} />
      <Modal data={element} open={isOpen} handleClose={closeModal} />;
    </div>
  );
}

export default MainPage;
