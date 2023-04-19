import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';

function Header() {
  return (
    <header className="mx-auto flex max-w-2xl flex-wrap justify-between space-x-4 py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
      <nav>
        <ul className="flex space-x-4">
          {ROUTES.map(({ key, path, name }, i) => {
            if (path === '*') {
              return;
            }
            return (
              <li key={i + key}>
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return `mx-4 my-2 block text-sm text-gray-700 hover:text-blue-200 ${
                      isActive ? 'border-b-solid border-b-2 border-b-blue-400' : ''
                    }`;
                  }}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
