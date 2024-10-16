import Link from 'next/link';
import React from 'react';

const FooterNavigation = () => {
    return (
        <div className="bg-gray-200 p-4  flex flex-row gap-5 justify-around h-fit rounded-full ">
            <Link href={'/'} className="text-black flex justify-center place-items-center text-3xl h-10 w-10 border border-solid rounded-full border-black">&#x2302;</Link> {/* Home Icon */}
            <Link href={'/stats'} className="text-black flex justify-center place-items-center text-2xl h-10 w-10  border border-solid rounded-full border-black">&#9654;</Link> {/* Play Icon */}
            <Link href={'/streaks'} className="text-black flex justify-center place-items-center text-2xl h-10 w-10  border border-solid rounded-full border-black">&#128293;</Link> {/* Flame Icon */}
            <Link href={'/people'} className="text-black flex justify-center place-items-center text-2xl h-10 w-10  border border-solid rounded-full border-black">&#128101;</Link> {/* User Icon */}
            <Link href={'/locations'} className="text-black flex justify-center place-items-center text-2xl h-10 w-10  border border-solid rounded-full border-black">&#128506;</Link> {/* Location Icon */}
        </div>
    );
};

export default FooterNavigation;