import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { ROUTES } from './routes';

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Outlet /> */}
        <Routes>
          {ROUTES.map((route) => (
            // eslint-disable-next-line react/jsx-key
            <Route {...route} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;
