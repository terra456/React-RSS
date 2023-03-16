import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('should have button', () => {
    render(<App />);
    expect(screen.getByRole('button')).toBeDefined();
  });
});
