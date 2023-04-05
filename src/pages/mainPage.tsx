import React from 'react';
import Cards from '../components/cards/Cards';
import SearchBar from '../components/searchBar/SearchBar';

import images from '../assets/json/images.json';

function MainPage() {
  return (
    <div className="bg-white">
      <SearchBar />
      <Cards dataList={images} />
    </div>
  );
}

export default MainPage;
