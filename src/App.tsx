import { useRoutes } from 'react-router-dom';
import { ROUTES } from './routes';

function App() {
  const element = useRoutes(ROUTES);

  return element;
}

export default App;
