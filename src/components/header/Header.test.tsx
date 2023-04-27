import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('is navigation menu render', async () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(await screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('does links activating', async () => {
    render(<Header />, { wrapper: BrowserRouter });
    const linkHome = await screen.getByText(/Home/i);
    const linkAbout = await screen.getByText(/about us/i);
    await userEvent.click(linkAbout);
    expect(linkHome).not.toContainHTML('aria-current="page"');
    expect(linkAbout).toContainHTML('aria-current="page"');
    await userEvent.click(linkHome);
    expect(linkAbout).not.toContainHTML('aria-current="page"');
    expect(linkHome).toContainHTML('aria-current="page"');
  });
});
