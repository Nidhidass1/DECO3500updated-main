'use client'
import { LoadScript } from '@react-google-maps/api';
import React from 'react';

const GoogleMapsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyDaUm7hK4sFpUkE3TWYM3-xznRwd4x_XCU">
            {children}
        </LoadScript>
    );
};

export default GoogleMapsWrapper;