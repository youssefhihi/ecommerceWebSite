import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Tailwind.css';
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/categories';
import Products from './pages/admin/product/Products';
import CreateProduct from './pages/admin/product/createProduct';
import SingleProduct from './pages/admin/product/SingleProduct';
import Home from './pages/client/home';

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/singleProduct/:SKU" element={<SingleProduct />} /> 
        </Routes>
    </BrowserRouter>
     </>
  );
}

export default App;
