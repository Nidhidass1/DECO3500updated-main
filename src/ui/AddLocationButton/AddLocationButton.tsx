'use client'
import React from 'react';

interface AddLocationButtonProps {
    onClick: () => void;
}

const AddLocationButton: React.FC<AddLocationButtonProps> = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onClick}
                className="mt-6 bg-gray-200 text-black p-3 rounded-full flex items-center justify-center w-12 h-12"
            >
                +
            </button>
            <p className="text-black mt-2">Add frequently smoking location to be notified</p>
        </div>
    );
};

export default AddLocationButton;