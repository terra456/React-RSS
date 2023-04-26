import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import Layout from './pages/Layout';
import { setupStore } from './store/store';

export function render(url: string) {
  const store = setupStore();
  console.log(url);
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <Layout />
      </StaticRouter>
    </Provider>
  );
}
