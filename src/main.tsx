import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

import './index.css';

import App from './App.tsx';
import SalesOverviewPage from './pages/SalesOverviewPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <h1>Welcome to TourZone</h1> },
      { path: 'sales', element: <SalesOverviewPage /> },
      { path: 'utilisation', element: <h1>Utilisation test</h1> },
      { path: 'balance', element: <h1>Balance test</h1> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
