import React, { useState } from 'react';
import SideBar from '../../../components/admin/SideBar';
import '../../../Tailwind.css';
import { IoIosAddCircle } from "react-icons/io";
import GettingProducts from '../../../components/admin/products/gettingProducts';
import { Link } from 'react-router-dom';

const Products = () => {
    const [searchQuery, setSearchQuery] = useState('');

  

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex h-screen">
            <SideBar />
            <main className="overflow-y-auto flex-1 bg-white pt-20 px-2 md:px-5 pb-4">
                <div className="flex justify-between bg-[#3cf23c] h-12 rounded-xl w-full mb-7">
                    <div className='flex space-x-3 p-2'>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="focus:outline-none py-2 px-3 rounded-lg text-black"
                        />
                    </div>
                    <div className='group relative'>
                        <div className="text-white font-bold text-4xl p-1.5 cursor-pointer">
                            <Link to="/product/create"  >
                                <IoIosAddCircle />
                            </Link>
                        </div>
                        <span className="absolute w-28 text-center -top-10 left-[50%] -translate-x-[70%] z-[30] origin-left scale-0 px-2 rounded-l-3xl rounded-tr-3xl border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Add Product
                        </span>
                    </div>
                </div>             
                <GettingProducts searchQuery={searchQuery} />
            </main>
        </div>
    );
};

export default Products;
