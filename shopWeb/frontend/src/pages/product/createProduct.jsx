import React, { useState, useEffect } from 'react';
import '../../Tailwind.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import  BASE_URL  from '../../config';
import SideBar from '../../components/SideBar';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import ImagesPreview from '../../components/ImagesPreview';


const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [previewImages, setPreviewImages] = useState([]);
    const [showImages, setShowImages] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        quantity: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        images: []
    });

    const toggleImages = () => {
		setShowImages(!showImages);
	};

   

    // useEffect(() => {
    //     if (Object.keys(errors).length > 0) {
    //         Object.values(errors).forEach(errorMessage => {
    //             toast.error(errorMessage);
    //         });
    //     }
    // }, [errors]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/categories`);
                const categoryOptions = response.data.map(category => ({
                    value: category._id,
                    label: category.name
                }));
                setCategories(categoryOptions);
                } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleRemovePreview = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });

        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
        const files = Array.from(e.target.files);
        const newPreviewImages = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                newPreviewImages.push(reader.result);
                if (newPreviewImages.length === files.length) {
                    setPreviewImages(prevImages => [...prevImages, ...newPreviewImages]);
                }
            };
            reader.readAsDataURL(file);
        });

        // Log files to see what was selected
        console.log('Files selected:', files);
        
    };




    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; 
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                for (let i = 0; i < formData.images.length; i++) {
                    data.append('images', formData.images[i]);
                }
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
             await axios.post(`${BASE_URL}/api/products/addProduct`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Product created successfully');
            setFormData({ title: '', quantity: '', description: '', price: '', brand: '', category: '', images: [] });
            setErrors({});
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error creating product';
            console.error('Error creating product:', error);
            toast.error(errorMessage);
        }
    };
    
    const handleDescriptionChange = (value) => {
        setFormData(prevData => ({
            ...prevData,
            description: value
        }));
    };
    const handleCategoryChange = (selectedOption) => {
        setFormData({
            ...formData,
            category: selectedOption ? selectedOption.value : ''
        });
    };
    
    const validateForm = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = 'Title is required';
        if (formData.title && formData.title.length < 3) formErrors.title = 'Title must be at least 3 characters long';
        if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) formErrors.quantity = 'Quantity must be a positive number';
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) formErrors.price = 'Price must be a positive number';
        if (!formData.category)  formErrors.category = 'category is required';
        if (!formData.description)  formErrors.description = 'Description is required';
        if (formData.description && formData.description.length < 15)  formErrors.description = 'Description must be at least 5 characters long';
        if (formData.images.length === 0) formErrors.images = 'Please upload at least one image';
    
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; 
    };
   
    
  
    return (
        <div className="flex h-screen">
        <SideBar />
        <main className="overflow-y-auto flex-1 bg-gray-50 pt-20 px-2 md:px-5 pb-4">
        {
            showImages && <ImagesPreview images={previewImages} onClose={toggleImages} onRemove={handleRemovePreview} />
        }
        <div className="p-4 w-full ">
            <form onSubmit={handleSubmit} className="bg-white drop-shadow-xl rounded-xl p-6">
                <div className=''>
                    <div className='grid gap-6'>
                        <div className="grid lg:grid-cols-2  lg:gap-20 ">
                            <div className=''>
                        {
                            previewImages.length > 0 &&
                            <div onClick={toggleImages} className=" cursor-pointer group relative hover:text-[#3cf23c] float-left ">
                                <FaEye />
                                <span className=" text-black absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-l-3xl rounded-tr-3xl border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                                            images
                                </span>
                            </div>
                        }
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
                            {errors.images && <p className="text-center  text-red-500 text-sm pt-2">{errors.images}</p>}
                            </div>
                            <div className="grid lg:grid-rows-2   ">
                                <div className="w-full">
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className={`peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-0 transition-all placeholder-shown:border-2 ${errors.title ? 'placeholder-shown:border-red-500' : 'placeholder-shown:border-black'}  placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-400`}
                                        placeholder=" " 
                                        type="text" 
                                        name="title" 
                                        id="title" 
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-400 before:border-blue-gray-200 peer-focus:before:!border-gray-400 after:border-blue-gray-200 peer-focus:after:!border-gray-400"
                                    >
                                        Title
                                    </label>
                                </div>
                                    {errors.title && <p className="text-red-500 text-sm p-1">{errors.title}</p>}
                                </div>  
                                <div className="w-full">
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input 
                                        type="text" 
                                        name="brand" 
                                        id="brand" 
                                        className={`peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-black placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-400`}
                                        placeholder=" " 
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                    />
                                    <label 
                                        htmlFor="brand" 
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-400 before:border-blue-gray-200 peer-focus:before:!border-gray-400 after:border-blue-gray-200 peer-focus:after:!border-gray-400"
                                    >
                                        Brand
                                    </label>
                                    </div>
                                </div> 
                            </div>
                        </div>                          
                        <div className="grid lg:grid-cols-2  lg:gap-20 ">
                            <div className="w-full">
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input 
                                        type="number" 
                                        name="quantity" 
                                        id="quantity" 
                                        className={`peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-0 transition-all placeholder-shown:border-2 ${errors.quantity ? 'placeholder-shown:border-red-500' : 'placeholder-shown:border-black'}  placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-400`}
                                        placeholder=" " 
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                    />
                                    <label 
                                        htmlFor="quantity" 
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-400 before:border-blue-gray-200 peer-focus:before:!border-gray-400 after:border-blue-gray-200 peer-focus:after:!border-gray-400"
                                    >
                                        Quantity
                                    </label>
                                </div>
                                {errors.quantity && <p className="text-red-500 text-sm p-1">{errors.quantity}</p>}
                            </div>
                            <div className="w-full">
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input 
                                        type="text" 
                                        name="price" 
                                        id="price" 
                                        className={`peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-0 transition-all placeholder-shown:border-2 ${errors.price ? 'placeholder-shown:border-red-500' : 'placeholder-shown:border-black'}  placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-400`}
                                        placeholder=" " 
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                    <label 
                                        htmlFor="price" 
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-400 before:border-blue-gray-200 peer-focus:before:!border-gray-400 after:border-blue-gray-200 peer-focus:after:!border-gray-400"
                                    >
                                        Price
                                    </label>
                                </div>
                                {errors.price && <p className="text-red-500 text-sm p-1">{errors.price}</p>}
                            </div>
                        </div>
                        <div className="w-full mb-8">
                            <div className="relative w-full min-w-[200px] h-10">
                                    <label 
                                        htmlFor="category" 
                                        className='block text-md font-medium text-gray-500 dark:text-black'
                                    >
                                        Category
                                    </label>

                                    <Select
                                        name="category"
                                        options={categories}
                                        noOptionsMessage={() => 'No categories found'}
                                        value={categories.find(option => option.value === formData.category)}
                                        onChange={handleCategoryChange}
                                        placeholder="Select Category"
                                        className={`w-full  `}
                                    />

                            </div>
                            {errors.category && <p className="text-red-500 text-sm p-1 pt-7">{errors.category}</p>}
                        </div>
                        <div className="w-full">
                            <div className="relative w-full min-w-[200px] h-48">
                                <label 
                                    htmlFor="description"
                                    className='block  text-md font-medium text-gray-500 dark:text-black' 
                                >
                                    Description
                                </label>
                                <ReactQuill
                                    value={formData.description}
                                    onChange={handleDescriptionChange}
                                    className=" h-full bg-white"
                                />
                            </div>
                            {errors.description && <p className="text-red-500 text-sm p-1 mt-20">{errors.description}</p>}
                        </div>                     
                        <div className="flex justify-end w-full mt-16">  
                        <button class=" w-1/3 cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-black  rounded-xl">
                            <span class="font-bold text-white text-xl relative z-10 group-hover:text-black duration-500">Blink</span>
                            <span class="absolute top-0 left-0 w-full bg-black duration-300 group-hover:-translate-x-full h-full"></span>
                            <span class="absolute top-0 left-0 w-full bg-black duration-300 group-hover:translate-x-full h-full"></span>                      
                            <span class="absolute top-0 left-0 w-full bg-black duration-300 delay-300 group-hover:-translate-y-full h-full"></span>
                            <span class="absolute delay-300 top-0 left-0 w-full bg-black duration-300 group-hover:translate-y-full h-full"></span>
                        </button>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer /> 
        </div>
        </main>
        </div>
    );
};

export default CreateProduct;
