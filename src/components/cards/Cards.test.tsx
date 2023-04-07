import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect } from 'vitest';
import Cards, { Props } from './Cards';

const props: Props = {
  handleClick: (el: number) => {
    el;
  },
  dataList: [
    {
      id: 361,
      name: 'Toxic Rick',
      status: 'Dead',
      species: 'Humanoid',
      type: "Rick's Toxic Side",
      gender: 'Male',
      origin: {
        name: 'Alien Spa',
        url: 'https://rickandmortyapi.com/api/location/64',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/27'],
      url: 'https://rickandmortyapi.com/api/character/361',
      created: '2018-01-10T18:20:41.703Z',
    },
  ],
};

describe('CardsList', () => {
  it('should display name of one of the card', () => {
    render(<Cards {...props} />);
    expect(screen.getByText(/toxic/i)).toBeDefined();
  });
});
