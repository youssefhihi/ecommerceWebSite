import React from "react";
import NavBar from "../../components/client/NavBar";
import './css/style.css'
import '../../Tailwind.css';
const Home = () => {
    return (
        <div className="">
            <NavBar />
            <section className="hero h-screen bg-cover bg-no-repeat flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl px-10  text-center  font-sans text-white mb-5">
                    Welcome! Let’s Make Shopping Fun and Easy
                    </h1>
                    <button className="border border-white rounded-xl hover:bg-[#ad5305] hover:text- text-opacity-95  px-5 py-3 text-white ease-in-out duration-300">
                        Shop
                    </button>
                </div>
            </section>
            <section className="bg-white flex flex-wrap gap-5 py-5 px-10 justify-center items-center">
                <div style={{ backgroundImage: 'url("chrome-extension://fcfmmagimfbdcliofodmmbndljmpkgdh/logo.png' }} className="rounded-full bg-cover bg-gray-200 w-48 h-48 items-center flex justify-center">
                    <p className="text-center text-3xl font-bold text-white">
                        category
                    </p>
                </div>              
            </section>
           <section className="">
             <p className="text-center text-3xl font-bold">Discover the best seller</p> 

           </section>
        </div>
    );
}

export default Home ;