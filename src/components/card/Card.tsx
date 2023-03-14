import React from 'react';
import { CardType } from 'types';

class Card extends React.Component {
  info: CardType;
  constructor(props: CardType) {
    super(props);
    this.info = props;
  }

  render() {
    return (
      <>
        <img src={'./assets/images/mini/' + this.info.picture + '.jpg'} alt={this.info.name.en} />
        <h3>{this.info.name.en}</h3>
        <p>{this.info.author.en}</p>
        <p>{this.info.year}</p>
        <p>{this.info.likes}</p>
        <p>{this.info.dislikes}</p>
        <p>{this.info.watch}</p>
      </>
    );
  }
}

export default Card;
