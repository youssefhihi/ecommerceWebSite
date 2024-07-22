import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GettingProducts = ({ searchQuery }) => {
    const [products, setProducts] = useState([]);

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
        <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b">
            <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Product</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Category</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Quantity</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Operations</th>
            </tr>
        </thead>
        <tbody>
            {filteredProducts.map((product, index) => (
                <tr
                    key={product._id}
                    className={index % 2 === 0 ? "bg-gray-200 text-center border-b" : "bg-white text-center border-b"}
                >
                    <td className="flex space-x-3 items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {/* Display product image if available */}
                        {product.images.length > 0 &&
                            <img src={`${BASE_URL}/uploads/${product.images[0].url}`} alt={product.title} className="w-10 h-10 rounded-full" />
                        }
                        <span>{product.title}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                        {/* Example operations: Edit and Delete buttons */}
                        <button className="text-blue-500 hover:text-blue-700">Edit</button>
                        <button onClick={() => deleteProduct(product._id)} className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};

export default GettingProducts;
