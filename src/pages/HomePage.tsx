import SearchBar from '../components/searchBar/SearchBar';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <>
        <header>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/about-us'}>AboutUs</Link>
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
