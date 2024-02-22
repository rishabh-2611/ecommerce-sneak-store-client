import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import SignUp from './pages/auth/signup/SignUp.page';
import NotFound from './pages/auth/error/NotFound';
import SignIn from './pages/auth/signin/SignIn.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
