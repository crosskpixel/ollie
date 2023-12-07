

import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootContext } from './contexts/Root';
import { ContentRequireAccessToken } from './components/ContentRequireAccessToken';
import LoginPage from './pages/Login';
import DashboardContext from './contexts/dashboard/Dashboard.tsx';

const DashboardPage = React.lazy(() => import('./pages/Dashboard/index.tsx'));

export default function App() {
  
  const router = createBrowserRouter([
    {
        path: "/",
        element: <RootContext />,
        children: [
            {
                path:"login",
                element: <LoginPage />,
            },
            {
                path: "",
                element: <DashboardContext />,
                children: [
                    {
                      path: "dashboard",
                      element: <ContentRequireAccessToken>
                          <Suspense fallback={<div>Carregando...</div>}>
                              <DashboardPage />
                          </Suspense>
                      </ContentRequireAccessToken>
                    }
                ]
            },
        ],
    },
  ]);

  return <RouterProvider router={router} />;

}
