import React from 'react';
import { Character } from 'rickmortyapi';
import CardBlock from '../card/Card';

export interface Props {
  dataList: Character[];
  handleClick: (el: number) => void;
}

function Cards({ dataList, handleClick }: Props) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {dataList.map((el, i) => {
          return (
            <div key={i + 'name'} className="group relative" onClick={() => handleClick(el.id)}>
              <CardBlock {...el} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
