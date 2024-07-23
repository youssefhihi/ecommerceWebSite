import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaSadCry } from "react-icons/fa";
import { ImMenu } from "react-icons/im";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import {Link } from 'react-router-dom';



const GettingProducts = ({ searchQuery }) => {
    const [products, setProducts] = useState([]);
	const [isGridView, setIsGridView] = useState(false);
	const [isGridView2, setIsGridView2] = useState(true);
	const [Loading, setLoading] = useState(true);

	const toggleGridView2 = () => {
		setIsGridView2(true);
		setIsGridView(false);
	};

	const toggleGridView = () => {
		setIsGridView(true);
		setIsGridView2(false);
	};


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

	useEffect(() => {
		if(products.length > 0) setLoading(false);
	}, [products]);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/products/deleteProduct/${id}`);
            setProducts(products.filter(product => product._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
		<>
		<ToastContainer />

		<div className='hidden md:block md:flex md:justify-end md:gap-5'>
			<div className=' flex space-x-3 p-1 items-center justify-center rounded-md border border-black'>
				
				<div className='h-8 w-0.5 bg-black'></div>
				<div className={`cursor-pointer ${isGridView ? ' text-[#3cf23c]' : 'text-black'}`} onClick={toggleGridView}>
					<ImMenu className='text-4xl' />
				</div>
				<div className='h-8 w-0.5 bg-black'></div>
				<div className={`cursor-pointer ${isGridView2 ? ' text-[#3cf23c]' : 'text-black'}`} onClick={toggleGridView2}>
					<TfiLayoutGrid2Alt className='text-3xl' />
				</div>
			</div>
		</div>
		{ Loading && <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-xs md:max-w-4xl mx-auto">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse relative flex flex-col rounded-xl shadow-lg p-3 md:w-full mx-auto border border-white bg-white">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
            <svg
              viewBox="0 0 16 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
            >
              <path
                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
              ></path>
              <path
                d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
              ></path>
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
          <div className="flex items-center mt-4">
            <div>
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
		}
		{isGridView && (			
        <div className='flex flex-col gap-5   max-w-xs md:max-w-4xl mx-auto '>
            {filteredProducts.map((product, index) => (
                <div className=" md:h-64 relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3  w-full  mx-auto border border-white bg-white">
					<Link to={`/singleProduct/${product.SKU}`} className="w-full md:w-1/3 bg-white grid place-items-center">
					{product.images.length > 0 &&
						<img src={`${BASE_URL}/uploads/${product.images[0].url}`} alt={product.title} className="rounded-xl w-full h-full object-fit" />
					}
					</Link>
					<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3 justify-between ">
						<div className="flex justify-between item-center">
							<p className="text-gray-500 font-medium hidden md:block">{product.category.name}</p>
							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
									fill="currentColor">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								<p className="text-gray-600 font-bold text-sm ml-1">
									4.96
									<span className="text-gray-500 font-normal">(76 reviews)</span>
								</p>
							</div>
							<div className="">
								<FaHeart className="h-5 w-5 text-pink-500" />
							</div>
							<div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
								{product.category.name}</div>
						</div>
						<Link to={`/singleProduct/${product.SKU}`}className="font-black text-gray-800 md:text-3xl text-xl hover:underline">{product.title}</Link> 
						<p className='text-gray-500 '>Available in Stock: {product.quantity}</p>
						<p className="text-xl font-sans font-semibold text-gray-800">
							{product.price}  Dhs
						</p>
					</div>
				</div>
            ))}
        </div>
		)}
		{isGridView2 && (<div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-xs md:max-w-4xl mx-auto'>
				{filteredProducts.map((product, index) => (
					<div className=" relative flex flex-col rounded-xl shadow-lg p-3 md:w-full mx-auto border border-white bg-white">
						<Link to={`/singleProduct/${product.SKU}`} className="w-full  grid place-items-center">
						{product.images.length > 0 && (
								<img src={`${BASE_URL}/uploads/${product.images[0].url}`} alt={product.title} className="rounded-xl w-full h-full object-cover" />
							)}
						</Link>
						<div className="w-full bg-white flex flex-col space-y-2 p-3 justify-between">
							<div className="flex justify-between items-center">
								
								<div className="">
									<FaHeart className="h-5 w-5 text-pink-500" />
								</div>
								<div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
									{product.category.name}
								</div>
							</div>
							<Link to={`/singleProduct/${product.SKU}`} className="font-black text-gray-800 md:text-2xl text-xl">{product.title}</Link>
							<p className='text-gray-500 '>Available in Stock: {product.quantity}</p>
							<div className='flex justify-between'>
							<p className="text-xl font-sans font-semibold text-gray-800">
								{product.price} Dhs
							</p>
							<div className="flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									<p className="text-gray-600 font-bold text-sm ml-1">
										4.96
										<span className="text-gray-500 font-normal">(76 reviews)</span>
									</p>
								</div>
							</div>
						</div>
						</div>
				))}
			</div>
		)}
		</>
    );
};

export default GettingProducts;
