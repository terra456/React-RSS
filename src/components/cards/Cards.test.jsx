import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import Cards from './Cards';

describe('CardsList', () => {
  it('should display name of one of the card', () => {
    render(<Cards />);
    expect(screen.getByText('Horsewoman')).toBeDefined();
  });
});
