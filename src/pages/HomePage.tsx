import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
                <NavLink
                  to={'/'}
                  className="mx-4 my-2 block text-sm text-gray-700 hover:text-blue-200"
                  style={({ isActive }) => {
                    return {
                      borderBottom: isActive ? '2px solid #38BDF8' : '',
                    };
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/about-us'}
                  className="mx-4 my-2 block text-sm text-gray-700 hover:text-blue-200"
                  style={({ isActive }) => {
                    return {
                      borderBottom: isActive ? '2px solid #38BDF8' : '',
                    };
                  }}
                >
                  AboutUs
                </NavLink>
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
