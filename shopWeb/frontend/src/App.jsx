import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Tailwind.css';
import Dashboard from './pages/Dashboard';
import Categories from './pages/categories';
import Products from './pages/Products';
function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        </Routes>
    </BrowserRouter>
     </>
  );
}

export default App;
