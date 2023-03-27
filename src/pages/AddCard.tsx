import React from 'react';
import { CardType } from 'types';
import CardForm, { State } from '../components/cardForm/CardForm';
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

  handleCardSubmit = (obj: State) => {
    const newCard: CardType = {
      year: obj.inputDate || '01.01.20',
      imgSrc: obj.file,
      author: { en: obj.selectValue || 'no' },
      name: { en: obj.inputName || 'no' },
      desc: obj.description,
      options: obj.checkboxValue,
      category: obj.radioValue,
    };
    this.setState({
      dataList: this.state.dataList.concat(newCard),
    });
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
