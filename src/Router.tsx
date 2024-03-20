import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import NotFound from './pages/auth/error/NotFound';
import SignUp from './pages/auth/signup/SignUp.page';
import SignIn from './pages/auth/signin/SignIn.page';
import { ProductsPage } from './pages/products/Products.page';
import SellerProtectedRoute from './pages/seller/SellerProtectedRoute';
import { SellerDashboardPage } from './pages/seller/dashboard/SellerDashboard.page';
import { SellerProductsPage } from './pages/seller/products/SellerProducts.page';
import { SellerAddProductPage } from './pages/seller/products/SellerAddProduct.page';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/seller" element={<SellerProtectedRoute />}>
            <Route path="dashboard" element={<SellerDashboardPage />} />
            <Route path="products">
              <Route path="" element={<SellerProductsPage />} />
              <Route path="add" element={<SellerAddProductPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
