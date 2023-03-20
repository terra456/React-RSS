import React from 'react';
import CardForm from '../components/cardForm/CardForm';

class AddCard extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
        <h1>Add new card</h1>
        <CardForm />
      </div>
    );
  }
}

export default AddCard;
