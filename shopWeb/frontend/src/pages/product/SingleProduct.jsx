import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config';
import axios from 'axios';

const SingleProduct = () => {
    const { SKU } = useParams(); // Get SKU from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products/singleProduct/${SKU}`);
                setProduct(response.data.SingleProduct);
                console.log(response.data);
                console.log(product);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
    }, [SKU]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={`${BASE_URL}/uploads/${product.images[0].url}`} alt={product.title} />
            <p>{product.description}</p>
            <p>{product.price} Dhs</p>
        </div>
    );
};

export default SingleProduct;
