import React from 'react';
import { useRoutes } from 'react-router-dom';
import Header from './components/header/Header';
import { ROUTES } from './routes';

function App() {
  const element = useRoutes(ROUTES);

  return (
    <>
      <Header />
      {element}
    </>
  );
}

export default App;
