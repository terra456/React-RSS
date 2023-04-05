import React, { useState } from 'react';
import { CardType, IFormValues } from 'types';
import CardForm from '../components/cardForm/CardForm';
import Cards from '../components/cards/Cards';

function AddCard() {
  const [dataList, setDataList] = useState([]);

  const handleCardSubmit = (obj: IFormValues) => {
    const newCard: CardType = {
      year: obj.date || '01.01.20',
      imgSrc: obj.fileSrc,
      author: { en: obj.selectValue || 'no' },
      name: { en: obj.name || 'no' },
      desc: obj.desc,
      options: obj.checkboxValue,
      category: obj.radioValue,
    };
    if (!dataList) {
      setDataList([newCard]);
    } else {
      const newData = dataList.concat(newCard);
      setDataList(newData);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
        <h1>Add new card</h1>
        <CardForm onFormSubmit={handleCardSubmit} />
      </div>
      <div>
        <Cards dataList={dataList} />
      </div>
    </>
  );
}

export default AddCard;
