import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import '../Tailwind.css';
import CreateProduct from '../components/products/createProduct';
import { IoIosAddCircle } from "react-icons/io";
import GettingProducts from '../components/products/gettingProducts';

const Products = () => {
    const [createFormOpened, setCreateFormOpened] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const togglePopupCreate = () => {
        setCreateFormOpened(!createFormOpened);
    };

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
                    <div onClick={togglePopupCreate} className="text-white font-bold text-4xl p-1.5 cursor-pointer">
                        <IoIosAddCircle />
                    </div>
                </div>
                {createFormOpened && (
                    <div className={` ${createFormOpened ? '' : ''} transition-width duration-300`}>
                        <CreateProduct />
                    </div>
                )}
                <GettingProducts searchQuery={searchQuery} />
            </main>
        </div>
    );
};

export default Products;
