import React from 'react';
import SideBar from '../components/SideBar';
import '../Tailwind.css';
import CreateProduct from '../components/products/createProduct';

const Products = () => {
    return (
        <div className="flex h-screen">
            <SideBar />
            <main className=" overflow-y-auto flex-1 bg-white pt-20 px-2 md:px-5 pb-4">
                <CreateProduct />
            </main>
        </div>
    );
};

export default Products;