import React from 'react';
import { CardType } from 'types';

class CardBlock extends React.Component {
  info: CardType;
  constructor(props: CardType) {
    super(props);
    this.info = props;
  }

  render() {
    return (
      <div className=" min-h-90 h-90 lg:h-90 lg:min-h-90 aspect-w-1 aspect-h-1 aspect-none w-full max-w-[26rem] overflow-hidden rounded-md bg-gray-200 shadow-lg group-hover:opacity-75 ">
        <div className="min-h-60 aspect-w-1 aspect-h-1 h-60 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
          <img
            src={'./assets/images/mini/' + this.info.picture + '.jpg'}
            alt={this.info.name.en}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="m-4 flex flex-col">
          <h3 className="text-lg text-gray-700">{this.info.name.en}</h3>
          <h4 className="mt-1 text-sm text-gray-500">{this.info.author.en}</h4>
          <p className="mt-1 text-sm text-gray-500">{this.info.desc}</p>
        </div>
        <div className="flex items-center justify-items-start py-3 px-3">
          <p className="mr-3">
            <i className="fa fa-thumbs-up mr-1"></i>
            {this.info.likes}
          </p>
          <p>
            <i className="fa fa-thumbs-down  mr-1"></i>
            {this.info.dislikes}
          </p>
          <p color="gray" className="ml-auto flex gap-1">
            <i className="fas fa-eye fa-sm mt-2.5" />
            {this.info.watch}
          </p>
        </div>
      </div>
    );
  }
}

export default CardBlock;
