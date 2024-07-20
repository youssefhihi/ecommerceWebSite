import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Tailwind.css';
import Dashboard from './pages/Dashboard';
import Categories from './pages/categories';
function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        </Routes>
    </BrowserRouter>
     </>
  );
}

export default App;
