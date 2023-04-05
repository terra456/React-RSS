import React from 'react';
import { CardType } from 'types';

function CardBlock(props: CardType) {
  const info = props;

  return (
    <div className="min-h-90 h-90 lg:min-h-90 aspect-h-1 aspect-none w-full max-w-[26rem] flex-col overflow-hidden rounded-md bg-gray-200 shadow-lg group-hover:opacity-75 sm:h-full ">
      <div className="min-h-60 h-60 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-60">
        <img
          src={
            info.picture
              ? './assets/images/full/' + info.picture + 'full.jpg'
              : info.imgSrc
              ? info.imgSrc
              : ''
          }
          alt={info.name.en}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="m-4 flex flex-col">
        <h3 className="text-lg text-gray-700">{info.name.en}</h3>
        <h4 className="mt-1 text-sm text-gray-500">{info.author.en}</h4>
        <p className="mt-1 text-sm text-gray-500">{info.desc}</p>
      </div>
      <div className="m-4 flex flex-col">
        <p className="mt-1 text-sm text-gray-500">{info.category}</p>
        <p className="mt-1 text-sm text-gray-500">
          {info.options?.map((el, i) => {
            return (
              <span key={el + i}>
                {el}
                {info.options && i !== info.options.length - 1 ? ', ' : ''}
              </span>
            );
          })}
        </p>
      </div>
      <div className="flex grow items-center justify-items-start place-self-end py-3 px-3">
        <p className="mr-3">
          <i className="fa fa-thumbs-up mr-1"></i>
          {info.likes}
        </p>
        <p>
          <i className="fa fa-thumbs-down  mr-1"></i>
          {info.dislikes}
        </p>
        <p color="gray" className="ml-auto flex gap-1">
          <i className="fas fa-eye fa-sm mt-2.5" />
          {info.watch}
        </p>
      </div>
    </div>
  );
}

export default CardBlock;
