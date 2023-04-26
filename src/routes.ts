import type { RouteObject } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import AddCard from './pages/AddCard';
import Layout from './pages/Layout';
import MainPage from './pages/mainPage';
import NotFound from './pages/NotFound';

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        path: 'home',
        Component: MainPage,
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
      {
        path: 'add-card',
        Component: AddCard,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
];
