import React from 'react';
import Card from '../card/Card';
import images from '../../assets/json/images.json';

class Cards extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Cards</h1>
        {images.map((el, i) => {
          if (typeof el !== 'string') {
            return (
              <div key={i + el.name.ru}>
                <Card {...el} />
              </div>
            );
          }
        })}
      </>
    );
  }
}

export default Cards;
