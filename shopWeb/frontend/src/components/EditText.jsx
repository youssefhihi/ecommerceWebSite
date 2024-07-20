import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
const EditText = ({ text, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(text);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        if(value.trim() === '') {
            toast.error('Text cannot be empty');
            return;
        }
        setIsEditing(false);
        onSave(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(value.trim() === '') {
                toast.error('Text cannot be empty');
                return;
            }
            setIsEditing(false);
            onSave(value);
        }
    };

    const handleChange = (event) => {       
        setValue(event.target.value);
    };

    return (
        <div className="group relative">
            {isEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="px-2 py-1 border rounded-md focus:outline-none focus:border-[#3cf23c] focus:ring-[#3cf23c] focus:ring-1"
                />
            ) : (
                <p onDoubleClick={handleDoubleClick} className="px-3  rounded-md cursor-pointer">
                    {value}
                </p>
            )}
                <span className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-l-3xl rounded-tr-3xl border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                    click to edit
                </span>
        </div>
    );
};

export default EditText;
