import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Character, getCharacters } from 'rickmortyapi';
import Cards from '../components/cards/Cards';
import SearchBar from '../components/searchBar/SearchBar';

const characters = await getCharacters();

function MainPage() {
  const [data, setData]: [
    Character[] | undefined[],
    Dispatch<SetStateAction<Character[] | undefined[]>>
  ] = useState(Array(20));

  useEffect(() => {
    console.log(characters.data.results);
    if (characters.data.results) {
      setData(characters.data.results);
    }
  }, []);

  return (
    <div className="bg-white">
      <SearchBar />
      <Cards dataList={data} />
    </div>
  );
}

export default MainPage;
