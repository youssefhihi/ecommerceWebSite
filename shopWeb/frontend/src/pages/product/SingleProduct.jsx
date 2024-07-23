import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import '../../Tailwind.css';
import { Link, useParams } from 'react-router-dom';
import BASE_URL from '../../config';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { IoStarSharp } from "react-icons/io5";
import DOMPurify from 'dompurify';
import './css/style.css';

const SingleProduct = () => {
    const { SKU } = useParams(); // Get SKU from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products/singleProduct/${SKU}`);
                setProduct(response.data.SingleProduct);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
    }, [SKU]);

  

    const sanitizedDescription = product ? DOMPurify.sanitize(product.description) : '';

    return (
        <div className="flex h-screen">
            <SideBar />
            <main className="overflow-y-auto flex-1 bg-white pt-20 px-2 md:px-5 pb-4">
                <div className=' w-full flex flex-col gap-6'>
                    <div className='flex flex-col md:flex-row bg-white shadow-xl rounded-xl  p-5'>
                        <div className='lg:w-1/2 h-full'>
                            {product && (
                                <Carousel showStatus={false} showThumbs={true} thumbWidth={50}>
                                    {product.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={`${BASE_URL}/uploads/${image.url}`} alt={product.title} className='w-full h-full object-fill' />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                        <div className='lg:w-full px-6 flex flex-col gap-10'>
                            <div className='flex flex-row gap-2 justify-between '>
                                <p className='text-3xl font-bold text-center'>{product && product.title}</p>
                                <div className={` ${product && product.quantity > 2 ? 'bg-[#26c526] ' : ' bg-[#df2121] '} px-2 pt-1.5 rounded-xl max-w-60 `}>
                                    <p className='text-md text-center text-white'>In Stock: {product && product.quantity}</p>
                                </div>
                            </div>
                            <p className='text-lg text-gray-800'>brand: <span className='text-gray-400'>{product && product.brand}</span></p>
                            <div className='flex space-x-1 items-start justify-start'>
                                <div className='flex space-x-2 p-2 text-yellow-300 text-2xl'>
                                    <IoStarSharp />
                                    <IoStarSharp />
                                    <IoStarSharp />
                                    <IoStarSharp />
                                    <IoStarSharp className='text-gray-300' />
                                </div>
                                <p className='text-md pt-2'>200 reviews</p>
                            </div>
                            <div className='flex space-x-2'>
                                <p className='text-2xl font-semibold'>
                                    {product && product.price} Dhs
                                </p>
                                <p className='text-lg text-gray-500 line-through pt-1'>
                                    {product && product.price} Dhs
                                </p>
                                <div className='bg-red-300 p-1 rounded-xl'>
                                    <p className='text-md text-center text-red-600'>
                                        40%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 bg-white shadow-xl rounded-xl'>
                        <p className='text-2xl font-semibold '>Details</p>
                        <div className='border-b-2 border-gray-200 mb-4'></div>
                        <div
                            className='desc lg:text-lg sm:text-sm md:text-md'
                            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                        />
                    </div>
                    <div className='p-5 bg-white shadow-xl rounded-xl'> 
                        <div className='flex flex-row justify-between'>          
                            <p className='text-2xl font-semibold '>Comments </p>
                            <Link to='/product/comments' className='text-md font-normal text-blue-500 hover:underline '>View all</Link>
                        </div>            
                        <div className='border-b-2 border-gray-200 mb-4'></div>
                        <div className='flex flex-row justify-between gap-4'>
                             <div className=' w-1/3 flex flex-col gap-4 justify-center'>
                                    <div className='flex flex-col gap-5 bg-gray-200 w-48 p-3 rounded-xl  mx-auto '>
                                        <p className='text-3xl font-normal text-center text-[#f6b01e]'>
                                            <span className='font-semibold'>4.2</span>/5
                                        </p>    
                                        <div class="flex text-2xl justify-center p-1 gap-1 text-[#f6b01e]">
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp className='text-gray-600' />
                                        </div>      
                                        <p className='text-lg text-center text-[#f6b01e] font-sans font-normal'>100 Review</p>
                                    </div>
                                    <div className='flex flex-col gap-5 items-center'>
                                        <div className='flex flex-row space-x-3 items-center'>
                                            <p className='text-md font-sans font-normal'>5</p>
                                            <div className='flex text-[#f6b01e] text-xl'>
                                            <IoStarSharp />
                                            </div>
                                            <p className='text-md font-sans font-normal'>(100) </p>
                                            <div className='relative w-28 h-2 bg-gray-200 rounded'>
                                            <div
                                                className='absolute top-0 left-0 h-full bg-[#f6b01e] rounded'
                                                style={{ width: `${10}%` }} 
                                            ></div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row space-x-3 items-center'>
                                            <p className='text-md font-sans font-normal'>4</p>
                                            <div className='flex text-[#f6b01e] text-xl'>
                                            <IoStarSharp />
                                            </div>
                                            <p className='text-md font-sans font-normal'>(100) </p>
                                            <div className='relative w-28 h-2 bg-gray-200 rounded'>
                                            <div
                                                className='absolute top-0 left-0 h-full bg-[#f6b01e] rounded'
                                                style={{ width: `${10}%` }} 
                                            ></div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row space-x-3 items-center'>
                                            <p className='text-md font-sans font-normal'>3</p>
                                            <div className='flex text-[#f6b01e] text-xl'>
                                            <IoStarSharp />
                                            </div>
                                            <p className='text-md font-sans font-normal'>(100) </p>
                                            <div className='relative w-28 h-2 bg-gray-200 rounded'>
                                            <div
                                                className='absolute top-0 left-0 h-full bg-[#f6b01e] rounded'
                                                style={{ width: `${10}%` }} 
                                            ></div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row space-x-3 items-center'>
                                            <p className='text-md font-sans font-normal'>2</p>
                                            <div className='flex text-[#f6b01e] text-xl'>
                                            <IoStarSharp />
                                            </div>
                                            <p className='text-md font-sans font-normal'>(100) </p>
                                            <div className='relative w-28 h-2 bg-gray-200 rounded'>
                                            <div
                                                className='absolute top-0 left-0 h-full bg-[#f6b01e] rounded'
                                                style={{ width: `${10}%` }} 
                                            ></div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row space-x-3 items-center'>
                                            <p className='text-md font-sans font-normal'>1</p>
                                            <div className='flex text-[#f6b01e] text-xl'>
                                            <IoStarSharp />
                                            </div>
                                            <p className='text-md font-sans font-normal'>(100) </p>
                                            <div className='relative w-28 h-2 bg-gray-200 rounded'>
                                            <div
                                                className='absolute top-0 left-0 h-full bg-[#f6b01e] rounded'
                                                style={{ width: `${10}%` }}  
                                            ></div>
                                            </div>
                                        </div>  
                                    </div>
                            </div>
                            <div className="border-l-2 border-gray-200 mx-auto"></div>          
                            <div className='flex flex-col gap-3 '>
                                {[...Array(3)].map((_, index) => (
                                <div key={index} className='w-full p-5 bg-gray-100 rounded-xl'>
                                    <div class="flex justify justify-between">
                                        <div class="flex gap-2">
                                            <div class="w-7 h-7 text-center rounded-full bg-red-500">J</div>
                                                <span>Jess Hopkins</span>
                                            </div>
                                        <div class="flex p-1 gap-1 text-orange-300">
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp className='text-gray-300' />
                                        </div>
                                    </div>
                                    <div>
                                        Gorgeous design! Even more responsive than the previous version. A pleasure to use!
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Feb 13, 2021</span>
                                            
                                    </div>
                                </div>
                                ))}
                            </div>
                            
                            
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
};

export default SingleProduct;
