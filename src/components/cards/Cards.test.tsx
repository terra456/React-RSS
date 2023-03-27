import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect } from 'vitest';
import { CardType } from '../../types';
import Cards from './Cards';

const cardsMock: CardType[] = [
  {
    year: '1213',
    imgSrc: './asstts/123.jpg',
    author: { en: 'Name Sername' },
    name: { en: 'string name test' },
    desc: 'some info abought the picture',
    likes: '2',
    dislikes: '1',
    watch: '3',
  },
];

describe('CardsList', () => {
  it('should display name of one of the card', () => {
    render(<Cards dataList={cardsMock} />);
    expect(screen.getByText(/abought/i)).toBeDefined();
  });
});
