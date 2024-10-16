'use client';

import React, { useState, useEffect, useRef } from 'react';
import AddLocationButton from '@/ui/AddLocationButton/AddLocationButton';
import LocationCard from '@/ui/LocationCard/LocationCard';
import AddLocationModal from '@/ui/AddLocationModal/AddLocationModal';
import { useRouter } from 'next/navigation';

// Utility function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};

const LocationPage = () => {
    const [locations, setLocations] = useState<{ name: string; lat: number; lng: number }[]>([]);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [lastNotificationTimes, setLastNotificationTimes] = useState<Record<string, number>>({});
    const router = useRouter();
    const notificationDelay = 0.5 * 60 * 1000; // 5 minutes in milliseconds
    const proximityRange = 500; // Range in meters to be considered "near"
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleAddLocation = () => {
        setIsMapOpen(true);
    };

    const handleConfirmLocation = (location: { lat: number, lng: number, name: string }) => {
        setLocations([...locations, location]);
        setIsMapOpen(false);
    };


    // Check if the user is near any location
    useEffect(() => {
        const checkProximity = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;

                        locations.forEach((location) => {
                            const distance = calculateDistance(latitude, longitude, location.lat, location.lng);
                            const now = Date.now();
                            const lastNotificationTime = lastNotificationTimes[location.name] || 0;
                            if (distance <= proximityRange && now - lastNotificationTime > notificationDelay) {

                                const result = confirm(`You are near ${location.name}. Do you want to message someone?`);
                                if (result) {
                                    router.push('/people')
                                }

                                // Update the last notification time for this location
                                setLastNotificationTimes((prevTimes) => ({
                                    ...prevTimes,
                                    [location.name]: now,
                                }));
                            }
                        });
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    }
                );
            }
        };

        // Set interval to check every 3 seconds
        intervalRef.current = setInterval(checkProximity, 3000);

        // Cleanup interval on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [locations, lastNotificationTimes]);

    return (
        <div className="flex flex-col flex-grow items-center">
            <AddLocationButton onClick={handleAddLocation} />

            {/* Location List */}
            <div className="w-full max-w-md mt-8">
                {locations.map((location, index) => (
                    <LocationCard
                        key={index}
                        title={location.name}
                        details={`details`}
                    />
                ))}
            </div>

            {/* Map Modal */}
            <AddLocationModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                onConfirm={handleConfirmLocation}
            />
        </div>
    );
};

export default LocationPage;