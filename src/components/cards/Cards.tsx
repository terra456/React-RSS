import React from 'react';
import { CardType } from 'types';
import CardBlock from '../card/Card';
import SearchBar from '../searchBar/SearchBar';

class Cards extends React.Component {
  declare props: {
    dataList: CardType[];
  };
  constructor(props) {
    super(props);
  }

  render() {
    const images = this.props.dataList;
    return (
      <div className="bg-white">
        <SearchBar />
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {images.map((el, i) => {
              if (typeof el !== 'string') {
                return (
                  <div key={i + el.name.en} className="group relative">
                    <CardBlock {...el} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
