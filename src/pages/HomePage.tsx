import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchBar from '../components/searchBar/SearchBar';

class HomePage extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <>
        <header className="mx-auto flex max-w-2xl flex-wrap justify-between space-x-4 py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link className="block px-4 py-2 text-sm text-gray-700" to={'/'}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="block px-4 py-2 text-sm text-gray-700" to={'/about-us'}>
                  AboutUs
                </Link>
              </li>
            </ul>
          </nav>
          <SearchBar />
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
}

export default HomePage;
