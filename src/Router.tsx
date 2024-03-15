import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import NotFound from './pages/auth/error/NotFound';
import SignUp from './pages/auth/signup/SignUp.page';
import SignIn from './pages/auth/signin/SignIn.page';
import { AddProductPage } from './pages/products/AddProduct.page';
import { ProductsPage } from './pages/products/Products.page';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products">
            <Route index element={<ProductsPage />} />
            <Route path="add" element={<AddProductPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
