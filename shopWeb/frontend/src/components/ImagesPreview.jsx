import React from 'react';

const ImagesPreview = ({ images, onClose, onRemove }) => {

    if (!images || images.length === 0) {
        return null;
    }
    return (

        <div className=" border border-[#3cf23c] fixed top-100 right-2 z-50 t bg-white rounded-lg overflow-hidden transform transition-all sm:max-w-md sm:w-full p-2 ease-in-out duration-500">
            <div className='w-full'>           
                <button className="text-gray-500 hover:text-gray-800 float-right pr-4 text-3xl" onClick={onClose}>
                    &times;
                </button>
                <p className="text-lg font-semibold p-2 text-center hover:text-[#3cf23c]">Images Choosen</p>
                <ul className="grid grid-cols-2 gap-5 p-5">
                    {images.map((image, index) => (
                        <li key={index} className="relative">
                            <button onClick={() => onRemove(index)} className="absolute -top-1 right-1 text-xl text-black">
                                &times;
                            </button>
                            <img src={image} alt={`Image ${index + 1}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ImagesPreview;
  