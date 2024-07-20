import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import EditText from '../components/EditText'; 
import { IoIosAddCircle } from "react-icons/io";
import BASE_URL from '../config'; 
import { MdDelete } from "react-icons/md";  
import '../Tailwind.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [popupCreate, setPopupCreate] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                toast.error('Error fetching categories');
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const updateCategory = async (id, newName) => {
        if (newName.trim() === '') {
            toast.error('Category name cannot be empty'); 
            return;
        }

        try {
            await axios.put(`${BASE_URL}/api/categories/updateCategory/${id}`, { name: newName });
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category._id === id ? { ...category, name: newName } : category
                )
            );
            toast.success('Category updated successfully'); 
        } catch (error) {
            toast.error('Error updating category');
            console.error('Error updating category:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/categories/deleteCategory/${id}`);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== id)
            );
            toast.success('Category deleted successfully'); 
        } catch (error) {
            toast.error('Error deleting category'); 
        }
    };

    const createCategory = async (event) => {
        event.preventDefault(); 

        if (newCategoryName.trim() === '') {
            toast.error('Category name cannot be empty'); 
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/categories/addCategory`, { name: newCategoryName });
            setCategories((prevCategories) => [...prevCategories, response.data]);
            setNewCategoryName(''); 
            togglePopupCreate(); 
            toast.success('Category created successfully'); 
        } catch (error) {
            toast.error('Error creating category'); 
        }
    };

    const handleInputChange = (event) => {
        setNewCategoryName(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const togglePopupCreate = () => {
        setPopupCreate(!popupCreate);
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex">
            <SideBar />
            <main className="flex-1 bg-white pt-20 px-2 md:px-5 pb-4">
                <div className="flex justify-between bg-[#3cf23c] h-12 rounded-xl w-full mb-7">
                    <div className='flex space-x-3 p-2'>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="focus:outline-none py-2 px-3 rounded-lg text-black"
                            value={searchQuery}
                            onChange={handleSearchChange} 
                        />
                    </div>
                    <div onClick={togglePopupCreate} className="text-white font-bold text-4xl p-1.5 cursor-pointer">
                        <IoIosAddCircle />
                    </div>
                </div>
                {popupCreate && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                        <div className="bg-white p-4 rounded-lg w-1/3">
                            <h2 className="text-lg hover:text-[#3cf23c] font-bold mb-4">Create Category</h2>
                            <form onSubmit={createCategory}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={newCategoryName}
                                        onChange={handleInputChange} 
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div className="flex justify-end mt-5">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Create
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                                        type="button"
                                        onClick={togglePopupCreate}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">#</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Name</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Products</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories && filteredCategories.map((category, index) => (
                            <tr key={category._id} className={index % 2 === 0 ? "bg-gray-200 text-center border-b" : "bg-white text-center border-b"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <EditText
                                        text={category.name}
                                        onSave={(newName) => updateCategory(category._id, newName)}
                                    />
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">11</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <div className="group relative">
                                        <button
                                            className="hover:bg-red-600 rounded-full text-2xl text-red-600 hover:text-white p-1 ease-in-out duration-300"
                                            onClick={() => deleteCategory(category._id)}
                                        >
                                            <MdDelete />
                                        </button>
                                        <span className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-l-3xl rounded-tr-3xl border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                                            Delete
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <ToastContainer /> 
        </div>
    );
};

export default Categories;
