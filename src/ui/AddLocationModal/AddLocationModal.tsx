'use client'
import React, { useState } from 'react';
import MapComponent from '../MapComponent/MapComponent';
interface MapModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (location: { lat: number; lng: number; name: string }) => void;
}

const AddLocationModal: React.FC<MapModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [locationName, setLocationName] = useState<string>('');

    const handleConfirm = () => {
        if (selectedCoords && locationName) {
            onConfirm({
                lat: selectedCoords.lat,
                lng: selectedCoords.lng,
                name: locationName,
            });
            setLocationName('');
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-green-800 rounded-lg p-4 w-full max-w-lg">
                    <h2 className="text-xl mb-4">Select Location on Map</h2>
                    <MapComponent onMarkerPlaced={setSelectedCoords} />

                    {selectedCoords && (
                        <div className="mt-4">
                            <p>
                                Coordinates: {selectedCoords.lat}, {selectedCoords.lng}
                            </p>
                            {/* Input for location name */}
                            <input
                                type="text"
                                className="mt-2 placeholder-black text-black w-full px-3 py-2 border bg-green-600 border-gray-300 rounded"
                                placeholder="Enter location name"
                                value={locationName}
                                onChange={(e) => setLocationName(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="flex justify-end space-x-4 mt-4">
                        <button className="bg-gray-400 text-white py-2 px-4 rounded" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className={`py-2 px-4 rounded ${selectedCoords && locationName ? 'bg-green-500' : 'bg-gray-500 cursor-not-allowed'
                                } text-white`}
                            onClick={handleConfirm}
                            disabled={!selectedCoords || !locationName} // Disable the button if no coordinates or name
                        >
                            Confirm Location
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddLocationModal;