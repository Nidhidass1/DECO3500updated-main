'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const MapComponent: React.FC<{ onMarkerPlaced: (coordinates: { lat: number, lng: number }) => void }> = ({ onMarkerPlaced }) => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);
    const [hasSetInitialCenter, setHasSetInitialCenter] = useState(false);

    // Fetch real-time location
    useEffect(() => {
        const updateCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const newLocation = { lat: latitude, lng: longitude };

                        // Set the initial center only the first time location is fetched
                        if (!hasSetInitialCenter) {
                            setInitialCenter(newLocation);
                            setHasSetInitialCenter(true);
                        }

                        setCurrentLocation(newLocation);
                    },
                    (error) => {
                        console.error('Error fetching current location:', error);
                    }
                );
            }
        };

        // Update location every second
        const intervalId = setInterval(updateCurrentLocation, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [hasSetInitialCenter]);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation({ lat, lng });
            onMarkerPlaced({ lat, lng });
        }
    };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={initialCenter || { lat: 27.4773, lng: 153.0270 }} // Center on initial location or fallback to San Francisco
            zoom={18}
            onClick={handleMapClick}
        >
            {/* Marker for the user's real-time location */}
            {currentLocation && (
                <Marker
                    position={currentLocation}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Different icon for current location
                        scaledSize: new window.google.maps.Size(50, 50),
                    }}
                />
            )}

            {/* Marker for the selected location */}
            {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
    );
};

export default MapComponent;