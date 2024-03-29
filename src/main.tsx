import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import AboutUs from './pages/AboutUs';
import AddCard from './pages/AddCard';
import MainPage from './pages/mainPage';
import NotFound from './pages/NotFound';
import { setupStore } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'add-card',
        element: <AddCard />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
    ],
  },
]);

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
