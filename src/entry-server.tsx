import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { setupStore } from './store/store';

export function render(url, context) {
  const store = setupStore();
  console.log(url);
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        {App()}
      </StaticRouter>
    </Provider>
  );
}
