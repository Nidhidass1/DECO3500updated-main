import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <div className="p-4 flex justify-end items-center h-fit text-white">

            <Link href={'/'} className="text-2xl h-10 w-10 flex place-content-center place-items-center bg-white rounded-full border border-black border-solid">&#x1F464;</Link> {/* Placeholder for settings icon */}
        </div>
    );
};

export default Header;