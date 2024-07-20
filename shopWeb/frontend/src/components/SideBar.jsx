import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import '../Tailwind.css';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
    const [profilePopup, setProfilePopup] = useState(false);
    const [sideBarOpened, setSideBarOpened] = useState(true); 

    const toggleProfilePopup = () => {
        setProfilePopup(!profilePopup);
    };

    const toggleSideBar = () => {
        setSideBarOpened(!sideBarOpened);
    };

    return (
        <>
        <nav className={`fixed  transform z-30 flex bg-gray- p-2 items-center justify-between h-16 px-5 transition-width duration-300 top-0 ${sideBarOpened ? 'left-60 w-[calc(100%-225px)]' : ' left-[60px] w-[calc(100%-55px)]'}`}>
            <div className='flex space-x-2'>
                    <div onClick={toggleSideBar} className='text-2xl text-[#3cf23c] hover:bg-gray-100 p-3 rounded-full cursor-pointer'>
                        <IoMenu className='text-3xl' />
                    </div>
                </div>

                <div className='relative flex items-center'>
                    <div className='relative'>
                        <img src='https://themewagon.github.io/dashmin/img/user.jpg' alt='admin' className='w-10 h-10 rounded-full' />
                        <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
                    </div>
                    <div
                        onClick={toggleProfilePopup}
                        className={`ml-2 cursor-pointer transform transition-transform ${profilePopup ? 'rotate-180' : ''}`}
                    >
                        <IoIosArrowDown />
                    </div>
                    {profilePopup && (
                        <div className='absolute top-12 right-0 bg-white border border-gray-200 rounded-md w-36 shadow-lg items-center'>
                            <ul>
                                <li>
                                    <Link
                                        to="/"
                                        className="block text-center w-full p-2 text-lg text-gray-900 hover:bg-gray-50 rounded-md"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className="block text-center w-full p-2 text-lg text-gray-900 hover:bg-gray-50 rounded-md"
                                    >
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/logout"
                                        className="block text-center w-full p-2 text-lg text-gray-900 hover:bg-gray-50 rounded-md"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <aside className={`h-screen ${sideBarOpened ? 'w-60' : 'w-16'} p-2 bg-white flex flex-col gap-3 transition-width duration-300`}>
                <div className='flex items-center justify-center'>
                    {sideBarOpened ? (
                        <p className="text-3xl font-semibold text-[#3cf23c] font-sans"> DashMin</p>
                    ) : (
                        <div className='text-2xl font-semibold text-[#3cf23c]'>
                            #
                        </div>
                    )}
                </div>
                {sideBarOpened && (
                <div className='relative flex flex-row items-center justify-center space-x-3 mt-4'>
                    <div className='relative'>
                        <img src='https://themewagon.github.io/dashmin/img/user.jpg' alt='admin' className='w-10 h-10 rounded-full' />
                        <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
                    </div>
                        <p className="text-xl font-semibold text-black">Youssef Hihi</p>
                </div>
                    )}
                <div className="mt-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="w-full flex items-center p-2 text-lg text-gray-900 hover:text-[#3cf23c] hover:bg-white hover:border-l-4 border-[#3cf23c] rounded-r-xl ease-in-out duration-300"
                            >
                                <MdOutlineDashboard className="text-2xl" />
                                {sideBarOpened && <span className="ml-3 whitespace-nowrap">Dashboard</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className="w-full flex items-center p-2 text-lg text-gray-900 hover:text-[#3cf23c] hover:bg-white hover:border-l-4 border-[#3cf23c] rounded-r-xl ease-in-out duration-300"
                            >
                                <FiUsers className="text-2xl" />
                                {sideBarOpened && <span className="ml-3 whitespace-nowrap">Users</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className="w-full flex items-center p-2 text-lg text-gray-900 hover:text-[#3cf23c] hover:bg-white hover:border-l-4 border-[#3cf23c] rounded-r-xl ease-in-out duration-300"
                            >
                                <AiOutlineProduct className="text-2xl" />
                                {sideBarOpened && <span className="ml-3 whitespace-nowrap">Products</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="w-full flex items-center p-2 text-lg text-gray-900 hover:text-[#3cf23c] hover:bg-white hover:border-l-4 border-[#3cf23c] rounded-r-xl ease-in-out duration-300"
                            >
                                <MdOutlineCategory className="text-2xl" />
                                {sideBarOpened && <span className="ml-3 whitespace-nowrap">Categories</span>}
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
