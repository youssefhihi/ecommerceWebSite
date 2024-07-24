import React from "react";
import '../../Tailwind.css';
import { IoMenu } from "react-icons/io5";
import { RiShoppingBasketLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.png';



const NavBar = () => {
    return (

        <nav className="fixed top-0 z-50 w-full backdrop-blur-md " >
           
            <ul className="flex items-center justify-between flex-wrap py-2 px-4">
                <li >
                    <div className="cursor-pointer text-black text-4xl  font-sans font-bold hover:text-gray-700">
                        <IoMenu />
                    </div>            
                </li>   
                <li className="">
                    <img src={logo} alt="logo" className=" w-28 object-fill "/>
                </li>
                <li className="relative flex space-x-2 items-center text-black text-4xl font-sans font-bold ">
                    <RiShoppingBasketLine />
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-white text-xs font-bold flex items-center justify-center">1</span>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;