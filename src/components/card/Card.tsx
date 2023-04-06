import React from 'react';
import { Character } from 'rickmortyapi';

function CardBlock(props: Character) {
  const { id, location, name, url, created, status, species, type, gender, origin, image } = props;
  return (
    <div
      id={id.toString()}
      className="min-h-90 h-90 lg:min-h-90 aspect-h-1 aspect-none w-full max-w-[26rem] flex-col overflow-hidden rounded-md bg-gray-200 shadow-lg group-hover:opacity-75 sm:h-full "
    >
      <div className="min-h-60 h-60 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-60">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="m-4 flex flex-col">
        <h3 className="text-lg text-gray-700">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{species}</p>
        <p className="mt-1 text-sm text-gray-500">{gender}</p>
      </div>
      <div className="m-4 flex flex-col">
        <p className="mt-1 text-sm text-gray-500">{location.name}</p>
      </div>
    </div>
  );
}

export default CardBlock;
