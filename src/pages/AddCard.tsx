import React from 'react';
import CardForm from '../components/cardForm/CardForm';
import Cards from '../components/cards/Cards';
import { useAppSelector } from '../hooks/redux';

function AddCard() {
  // const [dataList, setDataList] = useState(null);

  const { cards } = useAppSelector((state) => state.NewCardsReducer);

  return (
    <>
      <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
        <h1>Add new card</h1>
        <CardForm />
      </div>
      <div>{cards && <Cards dataList={cards} handleClick={() => {}} />}</div>
    </>
  );
}

export default AddCard;
