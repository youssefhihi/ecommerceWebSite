import React from 'react';
import '../tailwind.css'; 
const Products = () => {
    const [products, setProducts] = React.useState([]);
  return (
    <>
    <h1 className="text-3xl text-blak font-bold underline">
        our products
    </h1>
    <div className="flex flex-wrap items-center justify-center ">
    {
        products.map((product) => {
               <div className='m-5 bg-slate-500'>
                <h1>
                    {product.id}
                </h1>
                <p>
                    {product.name}
                </p>
                <p>
                    {product.price}
                </p>
                <p>
                    {product.description}
                </p>
               </div>
        })
    }
    </div>
    </>
  );
}

export default Products;
