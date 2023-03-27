import React from 'react';
import { CardType } from 'types';
import Cards from '../components/cards/Cards';
import SearchBar from '../components/searchBar/SearchBar';

import images from '../assets/json/images.json';

class MainPage extends React.Component {
  declare props: {
    dataList: CardType[];
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg-white">
        <SearchBar />
        <Cards dataList={images} />
      </div>
    );
  }
}

export default MainPage;
