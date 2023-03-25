import React from 'react';
import { CardType } from 'types';
import CardForm, { CardFormType } from '../components/cardForm/CardForm';
import Cards from '../components/cards/Cards';

class AddCard extends React.Component {
  state: {
    dataList: CardType[];
  };
  constructor(props: string) {
    super(props);
    this.state = {
      dataList: [],
    };
    this.handleCardSubmit = this.handleCardSubmit.bind(this);
  }

  handleCardSubmit = (obj: CardFormType) => {
    const newCard = {
      year: obj.inputDate,
      imgSrc: obj.file,
      author: { en: obj.selectValue },
      name: { en: obj.inputName },
      desc: obj.description,
      options: obj.checkboxValue,
      category: obj.radioValue,
    };
    this.setState({
      dataList: this.state.dataList.concat(newCard),
    });
    console.log(this.state);
  };

  render() {
    return (
      <>
        <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
          <h1>Add new card</h1>
          <CardForm onFormSubmit={this.handleCardSubmit} />
        </div>
        <div>
          <Cards dataList={this.state.dataList} />
        </div>
      </>
    );
  }
}

export default AddCard;
