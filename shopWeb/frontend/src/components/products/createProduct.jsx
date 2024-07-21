import React, { useState, useEffect } from 'react';
import '../../Tailwind.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import  BASE_URL  from '../../config';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';

const CreateProduct = () => {
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        quantity: '',
        description: '',
        price: '',
        brand: '',
        category: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };
    const handleDescriptionChange = (value) => {
        setFormData(prevData => ({
            ...prevData,
            description: value
        }));
    };
    

    return (
        <div className="p-4 w-full ">
            <form onSubmit={handleSubmit} className="bg-white drop-shadow-xl rounded-xl p-6">
                <div className=''>
                    <div className='grid gap-6'>
                        <div className="grid lg:grid-cols-2  lg:gap-20 ">
                            <label htmlFor="dropzone-file" className=" mx-auto cursor-pointer flex w-full max-w-48 flex-col items-center rounded-xl border-2 border-dashed border-[#3cf23c] bg-white p-3 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#3cf23c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>

                                <h2 className="mt-4 text-md font-medium text-gray-700 tracking-wide">Click to choose images</h2>

                                <p className="mt-2 text-sm text-gray-500 tracking-wide">Upload or drag & drop your files PNG, JPG, or GIF.</p>

                                <input 
                                    id="dropzone-file" 
                                    accept="image/*" 
                                    multiple 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleFileChange} 
                                />
                            </label>
                            <div className="grid lg:grid-rows-2   ">
                                <div className="relative z-0 mb-6 w-full group">
                                    <input 
                                        type="text" 
                                        name="title" 
                                        id="title" 
                                        className="block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-800 appearance-none dark:border-black dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                        placeholder=" " 
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                    <label 
                                        htmlFor="title" 
                                        className="absolute text-md text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Title
                                    </label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input 
                                        type="text" 
                                        name="brand" 
                                        id="brand" 
                                        className="block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-800 appearance-none dark:border-black dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                        placeholder=" " 
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                    <label 
                                        htmlFor="brand" 
                                        className="absolute text-md text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Brand
                                    </label>
                                </div>
                            </div>
                        </div>                          
                        <div className="grid lg:grid-cols-2  lg:gap-20 ">
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    id="quantity" 
                                    className="block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-800 appearance-none dark:border-black dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                    placeholder=" " 
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    required 
                                />
                                <label 
                                    htmlFor="quantity" 
                                    className="absolute text-md text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Quantity
                                </label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="text" 
                                    name="price" 
                                    id="price" 
                                    className="block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-800 appearance-none dark:border-black dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                    placeholder=" " 
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required 
                                />
                                <label 
                                    htmlFor="price" 
                                    className="absolute text-md text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Price
                                </label>
                            </div>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                                <select 
                                    name="category" 
                                    id="category" 
                                    className="block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-800 appearance-none dark:border-black dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option> 
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}                        
                                </select>
                                <label 
                                    htmlFor="category" 
                                    className="absolute text-md text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Category
                                </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <label 
                                htmlFor="description"
                                className='block mb-2 text-md font-medium text-gray-500 dark:text-black' 
                            >
                                Description
                            </label>
                            <ReactQuill
                                value={formData.description}
                                onChange={handleDescriptionChange}
                                className="h-48 bg-white"
                            />
                        </div>

                        


                       
                    <div className="flex justify-end w-full">  
                        <button 
                            type="submit" 
                            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            Save
                        </button>
                    </div>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
