import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';

class App extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
    );
  }
}

export default App;
