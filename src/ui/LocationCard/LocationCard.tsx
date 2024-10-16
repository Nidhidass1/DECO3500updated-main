import React from 'react';
interface LocationCardProps {
    title: string;
    details: string;
}
const LocationCard: React.FC<LocationCardProps> = ({ title, details }) => {
    return (
        <div className="bg-gray-300 rounded-3xl p-2 mb-4 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-400 rounded-2xl flex-shrink-0">
                {/* Placeholder for image/icon */}
            </div>
            <div>
                <p className="text-black font-semibold">{title}</p>
                <p className="text-black">{details}</p>
            </div>
        </div>
    );
};

export default LocationCard;