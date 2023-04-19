import AboutUs from './pages/AboutUs';
import AddCard from './pages/AddCard';
import MainPage from './pages/mainPage';
import NotFound from './pages/NotFound';

export interface RouteSchema {
  key: string;
  path: string;
  name: string;
  Component: React.ComponentType;
}

export const ROUTES: RouteSchema[] = [
  {
    key: 'main',
    path: '/',
    name: 'Home',
    Component: MainPage,
  },
  {
    key: 'add-card',
    path: '/add-card',
    name: 'Add new card',
    Component: AddCard,
  },
  {
    key: 'about-us',
    path: '/about-us',
    name: 'About Us',
    Component: AboutUs,
  },
  {
    key: 'not-found',
    path: '*',
    name: 'NotFound',
    Component: NotFound,
  },
];
