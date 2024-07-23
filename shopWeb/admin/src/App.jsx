import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Tailwind.css';
import Dashboard from './pages/Dashboard';
import Categories from './pages/categories';
import Products from './pages/product/Products';
import CreateProduct from './pages/product/createProduct';
import SingleProduct from './pages/product/SingleProduct'; // Import your SingleProductPage component

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
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
