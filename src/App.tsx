import React from 'react';
import Layout from './pages/Layout';
// import { Outlet, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css"></link>
        <title>My app</title>
      </head>
      <body>
        <Layout />
      </body>
    </html>
  );
}

export default App;
